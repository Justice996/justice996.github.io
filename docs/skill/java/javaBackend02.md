# Java 后端复习笔记（下）：数据层、事务与分布式一致性

> 接上篇《[Java 后端复习笔记（上）：语言基础与 Spring 核心](./javaBackend01.md)》。
>
> 上篇解决的是"**Java 和 Spring 是怎么回事**"；
> 这篇解决的是"**数据怎么进出的、出错了怎么办、多个系统之间怎么保持一致**"。
>
> 同样：所有代码都是我自己练手项目里的，与任何真实业务无关。

---

## 一、MyBatis：只写接口，不写实现

### 知识点清单

- [x] `@Mapper` 标在接口上，**不需要写实现类**
- [x] SQL 有两种来源：**注解** 或 **XML**
- [x] 运行时靠 **JDK 动态代理**生成实现（原理见上篇第五节）
- [x] 底层是 `Configuration.mappedStatements` 这个 **Map**
      key = `namespace + "." + id`，value = 这条 SQL 的全部信息

### 注解版：SQL 直接写在方法上

```java
@Mapper
public interface UserMapper {

    @Select("SELECT * FROM `user`")
    List<User> findAll();

    @Insert("INSERT INTO `user`(name, age, email) VALUES(#{name}, #{age}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id")     // ← 回填自增主键
    int insert(User user);
}
```

**`@Options` 解决什么问题**：插入成功后，我想拿到数据库生成的自增 id。
加了这两个参数，MyBatis 会把生成的 id **回填到 `user.id` 上**。

### XML 版：真实项目更常见

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.demo.UserMapperXml">      <!-- ① 接口全限定名 -->
    <select id="findAll" resultType="com.example.demo.User">   <!-- ② 方法名 -->
        SELECT * FROM `user`
    </select>
</mapper>
```

**两条铁律**（写错就报 `Invalid bound statement (not found)`）：

| | 必须等于 |
|---|---|
| `namespace` | **接口的全限定名** |
| 标签的 `id` | **方法名** |

### XML 放哪：两条路线

| 路线 | 做法 | 见得多不多 |
|---|---|---|
| **A** | 放 `resources/mapper/xxx.xml` + 配 `mybatis.mapper-locations` | 国内项目主流 |
| **B** | 放**和接口同包同名**的位置（`com/example/demo/UserMapper.xml`） | MyBatis 核心自带的规则，**零配置** |

> 📌 **我查过源码**：MyBatis 的 `MapperAnnotationBuilder.loadXmlResource()` 里是这么找的：
> ```java
> String xmlResource = type.getName().replace('.', '/') + ".xml";
> InputStream in = type.getResourceAsStream("/" + xmlResource);
> ```
> 所以"同包同名"是**核心自带的**，而路线 A 的 `mapper-locations` **在 Spring Boot 2.3.2 里根本没有默认值**
> （我反编译 `MybatisProperties.class` 确认过，字段没赋初值）。网上说"放 mapper/ 下会自动扫描"是不准确的。

### ⚠️ 一个必须记住的规则

> **同一个方法，不能既写注解又写 XML。**

因为两者最终都往**同一个 Map** 里塞：
- 注解版：`Configuration.mappedStatements.put("接口.方法名", SQL)`
- XML 版：也是同一个 key

key 撞了，MyBatis 底层用的 `StrictMap.put()` 会直接抛异常：

```
Mapped Statements collection already contains key com.example.demo.UserMapper.findAll
```

**→ 记法：注解和 XML 不是两条路，是"往同一个仓库的两个入口"。**

---

## 二、`#{}` 和 `${}`：这是安全红线

| 写法 | 底层行为 | 安全 |
|---|---|---|
| `#{name}` | 编译成 `?` 占位符，用 `PreparedStatement` 传参 | ✅ **安全** |
| `${name}` | **字符串直接拼接**进 SQL 文本 | ❌ **SQL 注入** |

```xml
<!-- ❌ 危险：用户输入 name = "x' OR '1'='1" 就完了 -->
SELECT * FROM `user` WHERE name = '${name}'

<!-- ✅ 安全 -->
SELECT * FROM `user` WHERE name = #{name}
```

**唯一必须用 `${}` 的场景**：列名、表名、排序字段这类"SQL 结构"不能当参数的地方。
这种时候**必须自己白名单校验**。

> 🔍 **读别人代码的小技巧**：搜 `${`。如果参数来自前端又没校验，那就是漏洞。

---

## 三、`@Param`：给参数贴名牌

### 为什么需要它

XML 是**文本文件**，它读不懂 Java 的参数名。

```java
List<User> search(@Param("name") String name, @Param("minAge") Integer minAge);
```
```xml
<if test="name != null"> AND name = #{name} </if>
```

MyBatis 靠 **`@Param("name")` 这个名牌**，才能在参数堆里找到"叫 name 的那个"。

### 拆开看：值和名字是两回事

```java
List<User> findByIds( @Param("ids")   List<Integer> ids );
//                    └── 名字 ──┘    └─── 参数（值）───┘
//                    你手写的字符串      Service 传进来的
```

- **值**是从 Service 传进来的
- **名字**是你写在注解里的**常量字符串**，不从任何地方传

**类比前端**：Vite 代理里配的 `'/aaa'`——那个名字也是你随手起的，
只要**前后端写法一致**就行。`@Param("ids")` 里的 `"ids"` 完全是同一回事。

### 不写 `@Param` 会怎样

MyBatis 只能用**默认名字**：

| 参数 | 不写 `@Param` 时 MyBatis 用的名字 |
|---|---|
| `List<Integer> ids` | **`list`** ← 魔法值 |
| `Integer[] ids` | **`array`** ← 魔法值 |
| 多个参数 | `param1` / `param2` / `arg0` / `arg1` |

> ⚠️ **诚实说明**：如果编译时保留了参数名（Maven 的 `-parameters` 编译参数，
> Spring Boot 的 parent 默认开着），**不写 `@Param` 有时也能跑**。
> 但那是**赌构建配置**，换个项目就崩。**实战一律写。**

---

## 四、MyBatis 动态 SQL：四个标签

| 标签 | 作用 | 解决的具体问题 |
|---|---|---|
| `<if test="条件">` | 条件成立才拼进去 | 可选查询条件 |
| `<where>` | 自动加 `WHERE`，并**吃掉开头多余的 AND/OR** | 拼出来的 SQL 变成 `WHERE AND age > 20` |
| `<set>` | 自动加 `SET`，并**吃掉末尾多余的逗号** | 拼出来的 SQL 变成 `SET name = ?, WHERE ...` |
| `<foreach>` | 遍历集合 | `IN (1,2,3)`、批量插入 |

### `<where>` + `<if>`：条件查询

```xml
<select id="search" resultType="com.example.demo.User">
    SELECT * FROM `user`
    <where>
        <if test="name != null and name != ''">
            AND name = #{name}
        </if>
        <if test="minAge != null">
            AND age &gt;= #{minAge}
        </if>
    </where>
</select>
```

**注意 `<if>` 里的 SQL 片段都以 `AND` 开头**，靠 `<where>` 把第一个多余的 `AND` 吃掉。

> ⚠️ **XML 里 `>` 和 `<` 要转义**：写成 `&gt;` `&lt;`，否则 XML 解析报错。

### `<set>` + `<if>`：只更新非空字段

```xml
<update id="updateSelective">
    UPDATE `user`
    <set>
        <if test="name != null and name != ''">name = #{name},</if>
        <if test="age != null">age = #{age},</if>
    </set>
    WHERE id = #{id}          <!-- ⚠️ 这条必须无条件，绝不能放进 <if> -->
</update>
```

**这里有个能删全表的坑**：

```xml
<!-- ❌ 千万别这样写 -->
<if test="id != null">WHERE id = #{id}</if>
```

如果 `id` 传了 null → **`WHERE` 整个消失** → `UPDATE user SET name = ?` → **全表被改**。

### `<foreach>`：批量与 IN 查询

```xml
<select id="findByIds" resultType="com.example.demo.User">
    SELECT * FROM `user`
    WHERE id IN
    <foreach collection="ids" item="a" open="(" separator="," close=")">
        #{a}
    </foreach>
</select>
```

**五个属性**：`collection`（集合名字）/ `item`（元素变量名）/ `open` / `close` / `separator`。

⚠️ **`collection` 填什么，取决于方法参数怎么写**：

| 方法参数 | `collection` 填 |
|---|---|
| `@Param("ids") List<Integer> ids` | **`ids`** ✅ 推荐 |
| `List<Integer> ids`（没写 `@Param`） | `list` ← 魔法值 |
| `Integer[] ids`（没写 `@Param`） | `array` ← 魔法值 |

---

## 五、⚠️ 一个"测试全绿但代码是错的"教训

**这件事我印象最深，因为它是我的真实经历。**

我写了一个搜索接口，要求「按 name **精确匹配**」。我写成了：

```xml
AND name LIKE #{name}          <!-- ❌ 我写的是 LIKE，不是 = -->
```

**然后我设计的 4 个测试用例，全部通过了。**

因为测试用的输入都是「普通名字」，而：

```
name LIKE '王五'   ≡   name = '王五'      ← 没有通配符时，两者行为完全一样！
```

**后来导师让我用 `name=%` 测了一下**：

```
用 name=% 测（没有任何人叫 %）  →  返回了全表 5 条 ❌
```

**没有人的名字叫 `%`，却把全表都查出来了。**

### 为什么？

**`LIKE` 的右边是「模式」，不是「值」**：

| 符号 | 含义 |
|---|---|
| `%` | 任意个字符（包括 0 个） |
| `_` | **恰好一个**字符 |

```
name =  '%'    → 找名字真的叫 % 的人       → 0 条
name LIKE '%'  → 找名字匹配模式「%」的人   → 所有名字都匹配 → 全表
```

### 教训

> **我设计的 4 个测试用例，全部通过了，代码仍然是错的。**
>
> 因为**那 4 个用例在数学上无法区分 `LIKE` 和 `=`**。
> **测试用例能区分的，才叫被验证过。不可区分的测试，等于没测。**

**修法**：需求是精确匹配就用 `=`。

```xml
AND name = #{name}       <!-- ✅ -->
```

**如果真要做模糊搜索**：通配符必须由**程序**加，而且用户输入里的 `%` `_` 还要转义。

```xml
AND name LIKE CONCAT('%', #{name}, '%')
```

---

## 六、SQL 补课（前端转后端最容易翻车的部分）

### `=` 不是 `==`

我一开始顺手写了 `AND name == #{name}`，直接语法错误。

**实测**：

```
SELECT 1 = 1    → 1
SELECT 1 == 1   → ERROR 1064: You have an error in your SQL syntax
```

**为什么编程语言要 `==` 而 SQL 用 `=`？**

| | 出身 | 结果 |
|---|---|---|
| **SQL** | 数学（关系代数） | 数学里 `=` 就是相等 → 直接用 `=` |
| **C 系语言** | 系统编程 | `=` 被**赋值**占了 → 只好再造一个 `==` |

### NULL 是最大的坑

```
SELECT NULL = NULL       → NULL     ← 不是 1！不是 true！
SELECT NULL IS NULL      → 1
```

**为什么？** NULL 的语义是「**未知**」。「未知值等于未知值」？→ **还是未知**。

**实战后果**：

```sql
-- ❌ 永远查不出任何东西，而且不报错
SELECT * FROM `user` WHERE phone = NULL

-- ✅ 正确
SELECT * FROM `user` WHERE phone IS NULL
```

**这个坑还会以另一种形式咬人**：`UPDATE ... WHERE id = #{id}` 当 `id` 是 null 时
→ `WHERE id = NULL` → **匹配 0 行** → 返回 `0`（**不报错，只是什么都没改**）。

> **这叫「静默失败」——比报错更可怕，因为调用方会以为成功了。**
> **解法：在 Java 层做校验，id 为空就直接抛异常（Fail Fast）。**

### 中文是 **3 个字节**

```
LENGTH('张三')        → 6      ← 字节数
CHAR_LENGTH('张三')   → 2      ← 字符数
```

**这个知识点我撞到过两次**：
1. MySQL 里 `LENGTH` 数字节、`CHAR_LENGTH` 数字符
2. Redis 里 `GET` 中文返回 `"\xe7\x8e\x8b\xe4\xba\x94"` —— 那其实就是 `王五` 的 6 个字节（UTF-8）

**顺带解释了一个困惑我的问题**：为什么 `VARCHAR(50)` 存 120 个中文会报
`Data too long`？—— 因为 `VARCHAR` 的单位是**字符**，超了就是超了。

> 💡 **Redis 那个转义的解法**：`redis-cli --raw`。
> redis-cli 在**终端**里会把不可打印字节转义成 `\xHH`，输出到**管道**时不转义。

### 运算符速查（SQL vs 前端）

| 含义 | **SQL** | Java / JS |
|---|---|---|
| 相等 | **`=`** | `==` |
| 不相等 | `<>` 或 `!=` | `!=` |
| 与 / 或 / 非 | `AND` / `OR` / `NOT` | `&&` / `\|\|` / `!` |
| 拼接字符串 | `CONCAT(a,b)` | `a + b` |
| 判断空值 | **`IS NULL`** | `== null` |
| 取第一个非空 | `COALESCE(a,b)` / `IFNULL(a,b)` | `a ?? b` |

> ⚠️ **注意**：MySQL 里 `'a' || 'b'` 结果是 **`0`**，不是 `'ab'`！
> `||` 在 MySQL 里默认是**逻辑或**，不是拼接。**拼接只认 `CONCAT()`。**

---

## 七、统一返回体与错误码

### 为什么要"套一层"

前面的接口我都是直接返回 `List<User>`，Spring 自动转 JSON。
但真实项目里，接口通常**永远套一层统一返回体**：

```json
{
  "code": 0,
  "message": "成功",
  "data": { ... },
  "timestamp": 1758600000000
}
```

**好处**：

| 好处 | 说明 |
|---|---|
| **前端统一处理** | axios 拦截器只认 `code` 和 `message`，不用每个接口写一遍判断 |
| **错误码集中管理** | 所有错误码在一个枚举里，不散落各处 |
| **HTTP 状态码永远是 200** | 业务失败不等于 HTTP 失败 |

**一个真实的结构**（简化版）：

```java
public class ApiResult<T> implements Serializable {
    private int code;              // ← 注意是 int，不是 String
    private String message;        // ← 不是 msg
    private T data;                // ← 用了泛型
    private long timestamp;

    public static <T> ApiResult<T> ok(T data) { ... }
    public static <T> ApiResult<T> error(IErrorCode code) { ... }

    public int getCode() { return code; }
    public void setCode(int code) { this.code = code; }
    // ... 其余 getter/setter
}
```

> 💡 **我踩过的坑**：我第一版是**猜**的——`code` 用了 `String`、字段叫 `msg`、
> 没有 `timestamp`。后来对照了一个写得更规范的同类实现，才发现三处都对不上。
> **教训：能看真的就别猜。**

### 错误码用枚举（enum）

```java
public enum ErrorCode implements IErrorCode {

    SUCCESS(0, "成功"),
    LACK_OF_PARAM(40001, "缺少入参"),
    NO_LOGIN(40100, "用户未登录");

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override public int getCode() { return code; }
    @Override public String getMessage() { return message; }
}
```

**枚举是什么**：一个「**只有固定几个选项**」的类型。前端类比 `<select>` 下拉框——
只能从列出来的几个里选。

```java
ErrorCode.NO_LOGIN.getCode()      // → 40100
```

### 为什么不用普通字符串常量

```java
String code = "3100";        // ← 少写一个 0，编译器完全不知道
```

**用枚举则编译期就报错**（没有这个选项）。

> 🎯 **枚举的核心价值：把「运行时的错」提前成「编译时的错」。**
> 这跟我那个 `LIKE` bug 是同一类问题——**能让编译器帮你抓的错，就别留给测试。**

### ⚠️ 但真实项目里常常有人不用枚举

```java
return ApiResult.error(50000, "系统异常");     // ← 直接写了个数字
```

**这个 50000 根本不在枚举里。** 有人图省事绕过枚举直接写魔法数字。

**→ 读代码时看到数字错误码，要意识到：它可能是"没人管"的。**

---

## 八、三个"bean"：这个词特别容易混

| 意思 | 指什么 |
|---|---|
| **Spring Bean** | 被 **Spring 容器管理**的对象（标了 `@Service` / `@Component` 的） |
| **JavaBean** | 一种**写法规范**：private 字段 + public getter/setter + 无参构造 |
| **`bean/` 目录** | 公司项目里的**文件夹名**，装的是**承载数据的类** |

**第三个为什么叫 bean？** 因为**符合第二个规范**。

### Bean vs VO

真实项目里常见这两个目录：

| | `bean/`（或 `entity` / `model`） | `vo/`（View Object） |
|---|---|---|
| 注释 | 「**对应表：T_XXX**」 | 「xxx 记录 VO」 |
| 字段数 | **整张表的字段** | **前端要的那几个** |
| 用途 | **接数据库查询结果** | **返回给前端** |

**数据流**：

```
数据库表（12 列）
    ↓ MyBatis 自动映射
Bean（12 字段）
    ↓ Service 加工：脱敏、拼名称……
VO（3 字段）
    ↓ Jackson 序列化
前端 JSON
```

### 🎯 一条实用规律

我把一个 Mapper XML 里所有查询的 `resultType` 看了一遍，发现：

| 查询 | 映到哪 |
|---|---|
| 查出来**还要 Service 加工**的 | **Bean** |
| 查出来**几乎直接返回给前端**的 | **VO** |

**→ 所以看到 SQL 里写 `SELECT s.name AS itemName`，那多半是直接映到 VO，
别名要对上 VO 的字段名。**

### Lombok：`@Data` 和 `@Slf4j`

```java
// 手写版：字段 + 一堆 getter/setter
public class UserVO {
    private String name;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

// Lombok 版：一行搞定
@Data
public class UserVO {
    private String name;
}
```

| 注解 | 自动生成 |
|---|---|
| `@Data` | 所有 getter / setter / toString / equals / hashCode |
| `@Slf4j` | `private static final Logger log = LoggerFactory.getLogger(本类.class);` |

**Lombok 也是一个"读者"**——它是**编译期处理器**，读到注解就往 `.class` 里塞代码。

> **又一次印证上篇那句：注解自己不干活，读者才干活。**

### ⚠️ Map 传数据的代价

老项目里常见用 `Map<String, Object>` 传数据，而不是用类：

```java
Map<String, Object> resultMap = new HashMap<>();
resultMap.put("userName", user.getName());
resultMap.put("userAge",  user.getAge());
```

**好处**：灵活，不用为每个查询建类。

**代价**（我自己踩过）：

```java
resultMap.put("userId", user.getPhone());     // ⚠️ key 是 userId，值是 phone
```

**编译器一声不吭。** 如果换成实体类：

```java
user.setUserId(user.getPhone());     // ← 类型不对，编译直接报错
```

**判断规则**：

| 场景 | 用 |
|---|---|
| 单表 CRUD、结构稳定 | **实体类 / VO**（更好） |
| 多表联查、报表、字段随需求变 | **Map**（务实） |

---

## 九、事务 `@Transactional`

### 一句话

> **`@Transactional` = 「这个方法里的数据库操作，要么全成功，要么全撤销」。**
> 术语叫**原子性（Atomicity）**。

### 我做的对比实验

```java
@Transactional
public void batchAdd() {
    userMapper.insert(u1);        // 第 1 条：正常，能插进去
    userMapper.insert(u2);        // 第 2 条：name 120 字符 > VARCHAR(50) → 报错
}
```

**实验结果**：

| | 结果 |
|---|---|
| **不加 `@Transactional`** | 第 1 条**留在库里**（脏数据） |
| **加了 `@Transactional`** | 第 1 条**也被撤销了** ✅ |

### 它怎么工作的

报错栈里能看到这两个东西：

```
XxxService$$EnhancerBySpringCGLIB      ← 类被"包"了一层代理
TransactionInterceptor                 ← 拦截器在干活
```

```
你调用 service.batchAdd()
      ↓ 被【代理对象】拦截
   TransactionInterceptor 先开事务（BEGIN）
      ↓ 才真正执行你的方法
   insert(u1) ✅
   insert(u2) ❌ 抛异常
      ↓
   回滚（ROLLBACK）→ u1 也被撤销
```

### ⚠️ 坑 1：默认只回滚 `RuntimeException`

**Java 的异常分两类**：

```
Throwable
├── Error
└── Exception
    ├── RuntimeException      ← 【非受检】编译器【不管】你处不处理
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   └── ...
    └── 其他 Exception         ← 【受检】编译器【强制】你处理
        ├── IOException
        ├── SQLException
        └── ...
```

**判断规则只有一句话**：**是不是 `RuntimeException` 的子类？**
是 → 非受检；不是 → 受检。

**实测（受检异常不处理的报错）**：

```
错误: 未报告的异常错误FileNotFoundException; 必须对其进行捕获或声明以便抛出
```

**Spring 默认只回滚 `RuntimeException` 和 `Error`。**
所以这段代码**不会回滚**：

```java
@Transactional                                  // ← 没写 rollbackFor
public void doSomething() throws IOException {
    mapper.insert(a);                           // 写成功
    throw new IOException("文件读取失败");        // 受检异常
}                                               // ❌ a 留在库里！
```

**→ 实战一律写**：

```java
@Transactional(rollbackFor = Exception.class)
```

### ⚠️ 坑 2：同类内自调用会失效

```java
@Service
public class XxxServiceImpl {

    @Transactional
    public void saveLogs(List<Log> logs) { ... }     // 有事务

    public void outer() {
        this.saveLogs(logs);      // ❌ 事务失效！
    }
}
```

**为什么？因为 `this` 不是代理对象。**

```
     ┌──────────── 代理对象（Spring 造的替身）────────────┐
外界 →│  TransactionInterceptor                            │
     │        ↓                                           │
     │  ┌────────── 真实对象（你写的类）──────────┐         │
     │  │  outer()                                │         │
     │  │    this.saveLogs()  ← ★ 从这开始，       │         │
     │  │                       已经在真实对象内部了        │
     │  │    saveLogs()       ← 没人开事务 ❌      │         │
     │  └────────────────────────────────────────┘         │
     └────────────────────────────────────────────────────┘
```

**我写了个最小演示验证（`SelfInvocationDemo.java`），实测结果**：

```
场景 A：从【外部】调用 proxy.saveLogs()
      ┌─ [代理] 开事务
        └─ saveLogs 方法体执行
      └─ [代理] 提交事务          ← ✅ 有事务

场景 B：【内部】用 this.saveLogs()
        └─ saveLogs 方法体执行     ← ❌ 没有事务

场景 C：【内部】用 self.saveLogs()
      ┌─ [代理] 开事务
        └─ saveLogs 方法体执行
      └─ [代理] 提交事务          ← ✅ 有事务
```

**两种解法**：

```java
// 解法 1：注入自己（拿回代理对象）
@Lazy                                        // 避免"自己注入自己"的循环依赖
@Autowired
private XxxServiceImpl self;

public void outer() {
    self.saveLogs(logs);        // ✅ 走代理了
}

// 解法 2（更推荐）：拆到另一个类
@Service
public class LogService {
    @Transactional(rollbackFor = Exception.class)
    public void saveLogs(List<Log> logs) { ... }
}
// → 跨类调用天然走代理，问题消失
```

### 什么时候该加，什么时候**不该**加

| 情况 | 加不加 |
|---|---|
| **多次本地写，全本地** | ✅ **必须加** |
| 单次写 | ⚠️ 可加可不加 |
| **跨越远程调用**（HTTP / RPC） | ❌ **不要加**（下面解释） |

---

## 十、Redis：一个"共享的大 Map + 过期时间"

### 一句话理解

> **前端的 LocalStorage** = 每个浏览器**各存各的**
> **后端的 Redis** = 所有后端服务**共享一个大 Map**，还能**设过期时间**

### 三个关键词

| 关键词 | 意思 |
|---|---|
| **共享** | 不是存在某台服务器上，**所有后端服务、所有用户请求**都能访问 |
| **大 Map** | 本质就是 key-value：`SET k v` / `GET k` |
| **过期时间** | 可以设"10 秒后自动删掉" ← **这是它和普通 Map 最大的区别** |

数据在内存里 → 毫秒级。

### 命令行玩一下

```bash
SET name 王五
GET name

SET code 8888 EX 10      # 10 秒后自动消失 ← 重点体验
TTL code                 # 还剩几秒
GET code                 # 等 11 秒 → (nil)，真的没了

EXISTS name              # 1 = 存在
DEL name

INCR counter             # 自增，计数器
INCR counter
GET counter              # 2
```

### 实测踩到的坑：中文显示成 `\xe7\x8e\x8b`

```
SET name 王五
GET name      →  "\xe7\x8e\x8b\xe4\xba\x94"     ← 看着像乱码
```

**其实数据是对的**：`\xe7\x8e\x8b` = `王`，`\xe4\xba\x94` = `五`，
合起来就是 `王五` 的 6 个 UTF-8 字节。

**原因**：`redis-cli` 在**终端**里会把不可打印字节转义成 `\xHH`；
**输出到管道时不转义**（所以管道里的输出看起来是正常的）。

**解法**：`redis-cli --raw`。

> **又一次撞到"中文 3 字节"这件事。**

### 实战：防重复提交

场景：用户点「提交」，同一手机号 60 秒内最多提交 3 次。

```java
public String receive(String mobile) {
    String key = "limit:submit:" + mobile;

    // ① 自增（key 不存在则创建为 1，返回自增后的值）
    Long count = redisTemplate.opsForValue().increment(key);

    // ② 只有第一次才设过期 ← 关键
    if (count != null && count == 1) {
        redisTemplate.expire(key, 60, TimeUnit.SECONDS);
    }

    // ③ 超限 → 拦住，并把【真实剩余秒数】告诉用户
    if (count != null && count > 3) {
        Long left = redisTemplate.getExpire(key, TimeUnit.SECONDS);
        return "已达上限，请 " + left + " 秒后再试";
    }
    return "第 " + count + " 次提交成功";
}
```

> 💡 **key 命名规范**：`业务前缀:标识:用户`。
> 因为 Redis 是**共享的**，key 起得太随意就会跟别的业务撞。

### ⚠️ 这里我又踩了一个"测试全绿"的 bug（三轮才修对）

| 版本 | 我写的 | 实测表现 | 怎么才能发现 |
|---|---|---|---|
| **v1** | `if (count == 0)` 才设过期 | **key 永不过期**（`TTL = -1`） | 只有**查 TTL** 或**等 60 秒** |
| **v2** | `count > 3` 时设过期 | 每次被拦都**重置 TTL** → 一直点就永远解锁不了 | 只有**查 TTL 是否递减** |
| **v3** | `count == 1` 时设过期 | ✅ 正确 | — |

**v1 的问题**：`INCR` 对不存在的 key **返回 1，永远不为 0** → 那段是**死代码**。
→ 结果：手机号被**永久锁死**，而表面行为**完全正常**（1-3 次成功、第 4 次被拦）。

**v2 的问题**：把 `expire` 挪到"被拦时"，结果每次被拦都刷新 TTL：

```
47 秒 → 点一次 → 60 秒     ← TTL 被重置了
```

**→ 提示写着"60 秒内最多 3 次"，但用户等满 60 秒再点，又被拦。提示在骗人。**

**沉淀下来的纪律**：

> **带过期时间的逻辑，必须补一条「查 TTL」的用例。**

---

## 十一、分布式一致性：为什么两个系统的状态会不同步

> **这一节是整份笔记里我认为最有价值的思考。**

### 问题是怎么冒出来的

代码里有个字段叫 `status`，表示一条业务记录的状态（比如"处理中 / 已完成"）。
但**同一个业务对象在另一个系统里也有状态**（比如商品的库存在库存系统里的状态）。

**我发现这两个状态经常对不上。为什么？**

### 根因：状态存在两个地方，而且没有机制能同时更新

```
本地数据库的 status                外部系统（库存系统）的状态
   （你能控制）                        （你控制不了）
        ↑                                    ↑
        └──── 没有任何机制能同时更新两边 ────┘
```

### ⚠️ 关键：**事务救不了**

```java
@Transactional
public void processOrder() {
    mapper.markProcessing(orderId);          // ① 本地数据库：标记「处理中」
    externalApi.deductBalance(userId, amt);  // ② 【远程 HTTP 调用】← 关键
    mapper.markDone(orderId);                // ③ 本地数据库：标记「已完成」
}
```

**假设第 ③ 步失败、事务回滚**：

| | 结果 |
|---|---|
| 本地 status | ✅ 回滚了 |
| **外部系统的库存** | ❌ **已经扣减了，回滚不回来** |

> 🎯 **`@Transactional` 只能回滚「本地数据库操作」。**
> **它对外部系统的"已经发生"，一点办法都没有。**

**而且更糟的是**：如果在事务里做远程调用，事务会**横跨几次 HTTP 请求**
→ 数据库连接和行锁被长时间占用 → **长事务** → 并发能力暴跌，还容易死锁。

**→ 所以正确做法是：不在事务里做远程调用。**

### 那怎么办？—— **放弃"时刻一致"，改要"最终一致"**

```
① 本地先记一个「中间态」               ← 承认"我正在处理，结果未知"
        ↓
② 调外部系统
   ├─ 成功        → 本地改成「已完成」     ← 一致了 ✅
   └─ 失败/超时    → 本地【留在中间态】     ← 不一致，但记下来了
        ↓
③ 定时任务兜底
   扫出「中间态」且超时的记录
   → 主动去外部系统问：「那件事到底成了吗？」
      ├─ 成了 → 本地补成「已完成」         ← 收敛
      └─ 没成 → 重试
```

**第 ③ 步的"主动去问"，本质就是「对账」。**

### 为什么"中间态"是必要的（不是 bug）

**没有中间态，你就无法区分「还没做」和「做了但不知道结果」。**

中间态 = 「**我正在处理，结果未知**」的显式标记。

### ⚠️ 对账任务必须「幂等」

**因为定时任务一定会被重复执行**：
- 跑一半服务器重启了
- 调度中心重试
- 手工点了一次"立即执行"

> **如果任务不幂等，重复执行就会重复发货、重复扣款。**

**实现幂等最常用的手法：不在代码里判断状态，而是在 SQL 的 `WHERE` 里带上状态。**

```sql
UPDATE biz_record
SET STATUS = '1'
WHERE ORDER_ID = #{orderId}
  AND STATUS = '3'          -- ⭐ 只有"还在处理中"的才改
```

**跑两遍会怎样？**

| | 执行前 status | `WHERE STATUS='3'` | 影响行数 |
|---|---|---|---|
| 第 1 遍 | 3 | ✅ 匹配 | **1 行**（3 → 1） |
| 第 2 遍 | 已是 1 | ❌ 不匹配 | **0 行**（什么也没发生） |

**→ 重复执行无副作用，这就是幂等。**

> **而且这个手法还顺便解决了并发问题**：靠数据库的行锁做原子判断，避免"先查后改"的竞态。

### 补偿任务的策略：**只往前推，不往后退**

对比两种失败：

| 失败发生在哪 | 处理 | 为什么 |
|---|---|---|
| **第一步就失败**（什么都还没发生） | **回滚** | **没有副作用**，可以安全退回 |
| **第二步失败**（对方的操作可能已生效） | **不回滚，留在中间态** | ⚠️ **不能退**——退了会造成"白送" |

### 一句话总结

> **两个系统之间，没有"同时成功或同时失败"。**
> **所以工程上的做法是：允许中间态存在，然后靠定时任务去"问清楚"并收敛。**

```
状态机（记录中间态）
   +
定时对账（主动去问）
   +
幂等（重复跑没事）
```

---

## 十二、读代码的方法：**抽骨架**

> 这是我读一个 1600 行的 Service 文件时总结出来的。

### 问题

我一开始**从第一行读到最后一行**，读了半小时还是懵。

后来发现问题不在我——**那个文件 1600 行，其中一个方法 178 行。**

### 解法：抽出骨架

不要逐行读，只抽三类行：

```
① 注释（很多开发者会把步骤编号写在注释里：// 1. // 2.）
② if / else / return（结构）
③ 关键的外部调用（xxxMapper. / xxxUtil. / xxxApi.）
```

**一条命令**：

```bash
sed -n '起始行,结束行p' 文件.java | grep -nE \
  "^\s*(//)|^\s*(if|else|return|for|try|catch)|ApiResult\.error|(Mapper|Util|Api|Service)\."
```

**效果**：178 行 → 压成 9 步。

```
1.    参数校验
1.1   解密参数 + 格式校验
2.    查记录
2.1   已经处理过了？（懒标记）
3.    查配置
4.    校验
4.1   CAS 抢占（防并发）
5.    执行主操作
      └ 失败 → 回滚 → return
6.    确认
7.    完成（改状态）
8.    组装返回
9.    发通知
```

**→ 读代码不是"从第一行读到第 178 行"，是"先看出它有几步，再决定哪几步值得细看"。**

### 一个提高 grep 命中率的教训

我有一次用 grep 找错误码，模式里只写了 `return`，结果**一个都没找到**。

因为错误是这样写的：

```java
res = ApiResult.error(50001, "xxx");     // ← 这行是【赋值】，不匹配 "return"
return res;                               // ← 只匹配到这行，看不出内容
```

**加上 `ApiResult\.error` 就找到了。**

> **教训：grep 的模式决定了你能看到什么。**
> **找不到东西时，先怀疑自己的搜索条件，别急着怀疑"代码里没有"。**

---

## 十三、这一篇的速查表

| 主题 | 最容易忘的一条 |
|---|---|
| MyBatis XML | `namespace` = 接口全限定名，`id` = 方法名；**同一个方法不能既有注解又有 XML** |
| `#{}` vs `${}` | **`#{}` 安全，`${}` 会 SQL 注入** |
| `@Param` | 给参数贴名牌；不写就用魔法值 `list`/`array` |
| 动态 SQL | `<where>` 吃多余 AND、`<set>` 吃末尾逗号、`WHERE` 主键**绝不能放进 `<if>`** |
| SQL 相等 | **`=` 不是 `==`** |
| SQL NULL | `NULL = NULL` 是 `NULL`，**必须用 `IS NULL`** |
| 中文 | UTF-8 **3 字节/字** |
| 统一返回体 | `code` / `message` / `data`；**HTTP 永远 200** |
| 枚举 | 把运行时的错提前成编译时的错 |
| Bean vs VO | bean 接数据库，VO 给前端 |
| `@Transactional` | 默认**只回滚 RuntimeException** → 写 `rollbackFor = Exception.class` |
| 自调用失效 | `this` 不是代理 → 用 `self` 注入，或**拆到另一个类** |
| Redis | 共享大 Map + 过期时间；key 要带业务前缀 |
| 一致性 | **事务管不了远程调用** → 中间态 + 对账 + 幂等 |
| 读代码 | **抽骨架**，别逐行读 |

---

## 十四、最后一句

> **从"能看懂"到"能改动"，中间隔着的不是更多语法，是几个关键判断：**
>
> - 这个错该在**编译期**抓，还是留给**运行时**？
> - 这段逻辑该放在**哪一层**？
> - 这个操作**失败了会怎样**，谁来收拾？
> - 这个状态**不同步**了，靠什么收敛？
>
> **语法是入门，判断才是能力。**

---

**上一篇**：《[Java 后端复习笔记（上）：语言基础与 Spring 核心](./javaBackend01.md)》
