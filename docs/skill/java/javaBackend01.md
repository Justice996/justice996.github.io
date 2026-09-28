# Java 后端复习笔记（上）：语言基础与 Spring 核心

> 这是一份**给自己复习用**的笔记，不是教程。
>
> 背景：8 年前端，因为公司要做全栈项目，从 2026-08 开始系统学 Java + Spring Boot。
> 目标不是"成为后端大神"，是**能读懂真实项目、能在 AI 帮助下交付业务功能**。
>
> 这份笔记只记录**我自己踩过的坑和真正想通了的点**——不抄文档，只写"我当时是怎么理解的"。
>
> 用到的代码都是我自己练手项目里的，与任何真实业务无关。

---

## 一、为什么我要学 Java（一句话背景）

公司后端是 Spring Boot + MyBatis + MySQL + Redis 的微服务架构。
我作为前端，需要**读懂后端接口的链路**，并在需要时能改动。

所以我的学习目标是三个层次：

1. **能看懂** —— 给一个接口，能找到它对应的代码
2. **能讲清** —— 用自己的话说出这条链路做了什么
3. **能改动** —— 在 AI 帮助下加一个字段、改一个条件

---

## 二、面向对象基础

### 知识点清单

- [x] 类 = 模板，对象 = 按模板造出来的实例
- [x] `private` 字段 + `public` getter/setter = **封装**
- [x] `this` 指向"当前这个对象自己"
- [x] `Integer` 是对象，`int` 是基本类型
- [x] 两个类在同一个目录（默认包）下，不用 `import` 就能互相引用

### 我写的第一个类

```java
public class User {

    private Integer id;          // ← private：外面不能直接改
    private String name;
    private Integer age;

    public Integer getId() {     // ← getter：只能通过它读
        return id;
    }

    public void setId(Integer id) {   // ← setter：只能通过它写
        this.id = id;                 // ← this.id 是字段，id 是参数
    }
}
```

### `this` 到底指什么

这是我一开始最晕的地方。

```java
public void setName(String name) {
    this.name = name;
}
//  ↑ 字段      ↑ 参数
```

- `name`（右边）→ **参数**，别人传进来的那个
- `this.name`（左边）→ **这个对象自己的字段**

**记忆法**：`this` = "我自己的"。
`this.name = name` 读作"**我自己的 name，等于你给我的 name**"。

### `Integer` vs `int`（踩过一次坑）

| | `int` | `Integer` |
|---|---|---|
| 是什么 | 基本类型（不是对象） | **对象**（包装类） |
| 能为 null 吗 | ❌ 不能 | ✅ **能** |
| 用在哪 | 简单计算 | 实体类字段、集合元素 |

**为什么用 `Integer` 当字段？**
因为数据库里的字段**可能是 NULL**。如果字段是 `int`，就没法表示"这个值不存在"。

**⚠️ 会咬人的地方**：`Integer` 可能是 `null`，直接拿去运算会 **NPE（空指针异常）**

```java
Integer age = null;
int x = age + 1;      // 💥 NullPointerException
```

**→ 所以判空必须写，不能省。**

---

## 三、集合与 Lambda

### 知识点清单

- [x] `List` 有序可重复，`Map` 是键值对
- [x] `Map` 用 `entrySet()` 遍历
- [x] Lambda 写起来像前端的箭头函数
- [x] **`HashMap` 是无序的**（实测验证过）

### 实测：HashMap 无序

我写了个程序验证，输出顺序和我放进去的顺序不一样：

```java
Map<String, Integer> map = new HashMap<>();
map.put("张三", 20);
map.put("李四", 22);

map.forEach((k, v) -> System.out.println(k + " → " + v));
// 输出顺序不保证和 put 的顺序一致
```

> **这个坑在真实接口里会咬人**：如果前端依赖字段顺序，用 `HashMap` 就是不稳定的。

### Lambda 对照前端

```java
// Java
list.forEach(item -> System.out.println(item));

// 等价的 JS
// list.forEach(item => console.log(item))
```

**箭头换成 `->`，其余几乎一样。** 这是有前端基础的人学 Java 最没障碍的地方。

---

## 四、注解：**注解自己不干活，读者才干活**

> 这是整个 Spring 学习里**最重要的一句话**，没有之一。

### 知识点清单

- [x] 注解是 Java 5 引入的**原生机制**
- [x] Spring 的注解是**建立在 Java 原生注解之上**的
- [x] 注解自己不做任何事，是**读它的那个角色**在干活
- [x] 注解可以"组合"（元注解）

### 我做的实验：把 `@Override` 删掉

```java
public class User {
    @Override
    public String toString() {      // ← 正确覆写
        return "User";
    }
}
```

如果把方法名拼错：

```java
@Override
public String toStrng() {           // ← 拼错了
    return "User";
}
```

**结果**：

| | 编译器反应 |
|---|---|
| **有 `@Override`** | ❌ **报错**（"方法未覆写父类方法"） |
| **删掉 `@Override`** | ✅ 编译通过（但你的方法永远调不到） |

**→ 这就是"注解自己不干活"的证明**：
`@Override` 自己什么都不做，**是编译器读到它之后才去检查**。

### 注解的"读者"一览

| 注解 | 谁读它 | 读完干什么 |
|---|---|---|
| `@Override` | **编译器** | 检查有没有真的覆写父类方法 |
| `@Service` | **Spring** | 创建这个类的实例，放进容器 |
| `@Resource` | **Spring** | 把依赖对象塞进字段 |
| `@RestController` | **Spring MVC** | 标记为接口控制器，返回值转 JSON |
| `@Transactional` | **Spring 的拦截器** | 在方法前后开事务 / 提交 / 回滚 |
| `@Slf4j` | **Lombok 的编译期处理器** | 自动生成一行 `log` 字段 |

### 组合注解：`@RestController` 其实是两个

我反编译看了 `spring-web` 的源码，常量池里明确引用了：

```
@RestController 里包含：
  @Controller
  @ResponseBody
```

**所以这两段完全等价**：

```java
@RestController
public class XxxController { }
```
```java
@Controller
@ResponseBody
public class XxxController { }
```

| 注解 | 作用 |
|---|---|
| `@Controller` | 告诉 Spring：**这个类是 Web 控制器** |
| `@ResponseBody` | 告诉 Spring：**返回值直接当响应体（JSON），别去找页面** |

> **为什么会有 `@ResponseBody`？**
> 因为 Spring MVC 的老本行是**做网页**——方法返回字符串 `"success"`，默认行为是去找 `success.jsp` 渲染。
> 而现在几乎全是前后端分离，所以 Spring 4 干脆造了个 `@RestController` 把两个合并了。

**→ 这让我理解了一件事：框架的设计是被使用场景推着走的。老写法保留了，新写法是后来的简化。**

---

## 五、接口与"假实现"：为什么没有实现类也能调用

### 知识点清单

- [x] 接口 = **一份合同**（只写"有什么"，不写"怎么做"）
- [x] 实现类 = 签了合同、真的提供方法体的类
- [x] **JDK 动态代理** = 运行时现场造一个"假实现"
- [x] `Mapper` 接口没有实现类，但方法能调到数据库

### 问题是怎么来的

我写的 `UserMapper` 是这样的：

```java
@Mapper
public interface UserMapper {
    List<User> findAll();          // ← 没有方法体，只有分号
}
```

**但 `userMapper.findAll()` 真的能查到数据库。** 实现类在哪？

### 答案：JDK 动态代理

MyBatis 在**运行时**用 JDK 自带的 `java.lang.reflect.Proxy` **现场造了一个类**出来。

我写了个最小演示验证这件事（`ProxyDemo.java`）：

```java
UserMapper mapper = (UserMapper) Proxy.newProxyInstance(
        UserMapper.class.getClassLoader(),       // 类加载器
        new Class<?>[]{ UserMapper.class },      // 要假装成谁
        new InvocationHandler() {                // 被调用时干什么
            public Object invoke(Object proxy, Method method, Object[] args) {
                String key = "UserMapper." + method.getName();   // ← 拼出 key
                String sql = sqlMap.get(key);                    // ← 去 Map 里查
                // ... 执行 SQL
            }
        });
```

**运行结果（真的跑出来了）**：

```
它的真实类名     : $Proxy0
它是 UserMapper 吗: true
它有 .java 源文件吗: 没有 —— 它是 JVM 运行时现场生成的
```

**注意 `$Proxy0` 这个名字**——它不是我写的类，硬盘上也找不到 `$Proxy0.class`，它只存在于运行时的内存里。

### 这个机制解释了三个现象

| 现象 | 原因 |
|---|---|
| 改了 XML **必须重启**才生效 | SQL 是**启动时**读进大 Map 的，之后运行时只是**查 Map** |
| 代理性能好，不是每次都读磁盘 | 查内存 Map，不是读文件 |
| **同一个方法不能既写注解又写 XML** | 两边都往**同一个 Map** 里塞同一个 key，会撞 |

### 接口存在的意义

`UserService` 里注入的字段类型是**接口**：

```java
private final UserMapper userMapper;      // ← 接口类型，不是实现类
```

**→ 调用方不需要知道"背后是谁"。** 换个实现，调用方一行都不用改。

---

## 六、依赖注入：对象是"被塞进来"的，不是自己 new 的

### 知识点清单

- [x] Spring 启动时会扫描注解，创建对象（**Bean**），放进容器
- [x] 需要某个对象时，Spring 帮你"塞"进来 → **依赖注入（DI）**
- [x] **构造器注入**（推荐）vs **字段注入**（老项目常见）
- [x] `@Autowired` 按类型找，`@Resource` **先按字段名找，找不到再按类型**

### 我做的破坏实验

我写了一个 Service 和一个 Controller，`Controller` 的构造器里要一个 `Service`：

```java
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {     // ← 我没写 new
        this.userService = userService;
    }
}
```

**我没写 `new UserService()`，它是从哪来的？**

→ **Spring 创建的，然后注入进构造方法。**

**破坏实验**：把 `@Service` 注掉，看会怎样：

```
启动失败：required a bean of type 'UserService' that could not be found
```

**→ 证明了这个对象确实是 Spring 给的，不是凭空出现的。**

### 两种注入方式的对比

| | **构造器注入**（推荐） | **字段注入**（老项目常见） |
|---|---|---|
| 写法 | 写构造方法 | 直接在字段上加注解 |
| 能加 `final` | ✅ | ❌ |
| 好测试 | ✅ `new X(mock)` 就行 | ❌ 要用反射 |
| 循环依赖 | **启动就报错**（早暴露） | 能绕过去，但埋坑 |
| Spring 官方 | **推荐** | 不推荐 |

```java
// 构造器注入
private final UserService userService;
public UserController(UserService userService) {
    this.userService = userService;
}
// ⚠️ 注意：只有一个构造方法时，连 @Autowired 都可以不写

// 字段注入
@Resource
private UserService userService;
```

### `@Autowired` 和 `@Resource` 的区别（重要）

我一开始以为这俩只是"名字不同"。**不是。**

| | `@Autowired` | `@Resource` |
|---|---|---|
| 出身 | **Spring 自己的** | **Java 标准**（JDK 自带，在 `rt.jar` 里） |
| 默认查找 | **按类型** | **先按字段名 → 找不到再按类型** |
| 指定名字 | 要配 `@Qualifier("名字")` | 直接 `@Resource(name="名字")` |

**这个区别会咬人**：如果字段名和 Bean 名字对不上

```java
@Resource
private UserMapper UserMapper;     // ← 字段名首字母大写（不规范）

// 执行过程：
//   ① 按字段名找 "UserMapper"  → 找不到（真实 Bean 名是 userMapper）
//   ② 回退到按类型找           → 找到了 → 侥幸跑通
```

**如果用的是 `@Autowired`（直接按类型），这个大小写问题根本不会出现。**

> **教训**：能跑 ≠ 写对了。有些代码是靠"回退机制"兜住的，换个环境就崩。

---

## 七、Spring Boot 的分层

### 三层各自的职责

```
Controller   只负责 HTTP：取参数、返回响应
    ↓
Service      业务逻辑：判断、组合、事务边界
    ↓
Mapper       只负责数据库：SQL 怎么写
```

### 为什么 Controller 不该直接调 Mapper

**技术上完全可以。** Spring 不管你有几层。

但企业里几乎都写 Service，理由是：

| 理由 | 说明 |
|---|---|
| **事务边界** | `@Transactional` 应该加在 Service 上。Controller 的职责是 HTTP，不是定义"一件事"的边界 |
| **复用** | 同一个业务逻辑可能被 HTTP 接口、定时任务、消息消费者调用。写在 Controller 里别人就用不了 |
| **职责分离** | Controller 不该知道"底层用的是什么存储"——换实现不该改调用方 |
| **团队约定** | 接手项目时，大家的共同语言是"业务逻辑去 Service 找" |

### 关于"要不要 Service"的务实判断

| 情况 | 要不要 |
|---|---|
| 单表单次查询、只有一个入口 | ❌ 技术上可以省 |
| 一个操作里有**多次**数据库调用 | ✅ **必须有**（要事务） |
| 逻辑**不止一个入口**会用 | ✅ **必须有** |
| 里面有**业务规则** | ✅ **必须有** |

**但即使第一条，企业里通常还是写**——因为需求会长，而且风格要统一。

### Service 的"接口 + 实现"模式

老项目里常见这样的结构：

```
service/
  UserService.java          ← 接口：只有方法声明
  impl/
    UserServiceImpl.java    ← 实现：真正干活的
```

**为什么要拆两个文件？**

1. **调用方只依赖接口**（跟 `UserMapper` 一个道理，换实现不用改调用方）
2. **一个接口可以有多个实现**（正式版 / Mock 版）
3. **团队规范**（国内项目普遍要求这么做）

> ⚠️ **网上常说"为了用 JDK 动态代理"——这条在 Spring Boot 里已经弱化了**
> （Spring Boot 2.x 默认用 CGLIB，不是 JDK 代理）。**真正还成立的是上面 1 和 2。**

---

## 八、这一阶段我踩过的坑（速查）

| 坑 | 教训 |
|---|---|
| `Integer` 是 null 直接运算 | **NPE**。判空不能省 |
| 以为 `HashMap` 有序 | 它是**无序**的，接口返回字段顺序不稳定 |
| 以为注解"会做事" | **注解自己不干活，读者才干活** |
| 以为 `@Resource` 和 `@Autowired` 一样 | **查找策略不同**（名字 vs 类型） |
| 字段名大小写随意 | `@Resource` 先按名字找，**靠回退机制兜住是运气** |
| 以为 Controller 直接调 Mapper "也能跑" | 能跑，但**事务边界没了** |

---

## 九、一句话总结这一篇

> **Java 学到这里，我最大的收获不是语法，是一个思维转变：**
>
> **以前看框架代码像看魔法；现在知道每个"魔法"背后都有一个具体的"读者"在干活——编译器、Spring、Lombok、或者一个运行时代理。**
>
> **找到那个读者，魔法就消失了。**

---

**下一篇**：《Java 后端复习笔记（下）：数据层、事务与分布式一致性》
（MyBatis / SQL / 统一返回体 / Bean 与 VO / 事务 / Redis / 一致性）
