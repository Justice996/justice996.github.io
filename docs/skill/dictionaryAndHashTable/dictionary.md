### 字典
> 字典是以[键，值]的形式来存储元素。字典也称作映射、符号表或关联数组。

```javascript
 function defaultToString(item) {
            if(item === null){
                return 'NULL';
            }else if(item === undefined){
                return 'UNDEFINED'
            }else if(typeof item === 'string' || item instanceof String){
                return `${item}`
            }
            return item.toString();
        }
        class ValuePair {
            constructor(key,value){
                this.key = key;
                this.value = value;
            }
            toString(){
                return `[#${this.key}:${this.value}]`
            }
        }
      class Dictionary{
        constructor(toStrFn = defaultToString){
            this.toStrFn = toStrFn;
            this.table = {};
        }
        // 检测一个键是否在字典中
        hasKey(key){
          return this.table[this.toStrFn(key)] != null;
        }
        // 向字典中添加新元素 如果key已经存在,那么已存在的value会被新值覆盖
        set(key,value){
          if(key !=null && value !=null){
            const tableKey =this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key,value);
            return true;
          }
          return false;
        }
        // 从字典中移除一个值
        remove(key){
            if(this.hasKey(key)){
                delete this.table[this.toStrFn(key)];
                return true;
            }
            return false;
        }
        // 从字典中检索一个值
        get(key){
            const valuePair = this.table[this.toStrFn(key)];
            return valuePair ==null? undefined:valuePair.value;
        }
        get1(key){
            if(this.hasKey(key)){
                return this.table[this.toStrFn(key)];
            }
            return undefined;
        }

        keyValues(){
            return Object.values(this.table);
        }
        // 如果浏览器不支持Object.values方法 则可以用以下代码代替
        keyValues1(){
          const valuePairs =[];
          // 迭代了table对象的所有属性
          for(const k in this.table){
            // 判断保证key是存在
            if(this.hasKey(k)){
                // 将table对象中的valuePair加入结果数组
                valuePairs.push(k);
            }
          }
          return valuePairs;
        }
        // 将table对象中的valuePair加入结果数组
        keys(){
          return this.keyValues().map(valuePair=>valuePair.key)
        }
        // 不使用map实现
        keys1(){
          const keys = [];
          const valuePairs = this.keyValues();
          for (let i = 0; valuePairs.length; i++) {
            keys.push(valuePairs[i].key);
          }
        }
        // values方法返回一个字典包含的所有值构成的数组
        values(){
          return this.keyValues().map(valuePair=>valuePair.value)
        }
        // 迭代数据结构中每个值
       forEach(callbackFn){
        // 获取字典中所有valuePair构成的数组
        const valuePairs = this.keyValues();
        // 迭代每个valuePair
        for(let i=0;i<valuePairs.length;i++){
            // 执行以参数形式传入forEach方法的callbackFn函数
            const result = callbackFn(valuePairs[i].key,valuePairs[i].value);
            // 如果回调函数返回了false，我们会中断forEach方法的执行
            if(result === false){
                //打断正在迭代valuePairs的for循环
                break;
            }
        }

       }
       // 返回字典中的值的个数
       size(){
        return Object.keys(this.table).length;
       }
       // 检验字典是否为空
       isEmpty(){
        return this.size() ===0;
       }
       // 清空字典内容
       clear(){
        this.table = {};
       }
       //将字典转化成字符串返回
       toString(){
        // 如果字典为空，返回一个空字符串
        if(this.isEmpty()){
            return '';
        }
        const valuePairs = this.keyValues();
        // 将第一个valuePair加入结果字符串
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 0; i < valuePairs.length; i++) {
            // 如果数组中还有值，将其加入结果字符串
            objString = `${objString},${valuePairs[i].toString()}`;  
        }
        return objString;
       }
      }

      // 使用dictionary类
      const dictionary = new Dictionary();
      dictionary.set('Gan','gan@emil.com');
      dictionary.set('John','john@emil.com');
      dictionary.set('Tyrion','tyrion@emil.com');

      console.log(dictionary.hasKey('Gan'));
      console.log(dictionary.size());

      console.log(dictionary.keys());
      console.log(dictionary.values());
      console.log(dictionary.get('Tyrion'));
      dictionary.remove('John');
      
      console.log(dictionary.keys());
      console.log(dictionary.values());
      console.log(dictionary.keyValues());
      dictionary.forEach((k,v)=>{
        console.log('forEach:',`key:${k},value:${v}`);
      });
```
