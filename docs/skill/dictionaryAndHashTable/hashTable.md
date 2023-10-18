### 散列表

> 散列算法的作用是尽可能快地在数据结构中找到一个值。在之前的章节中，你已经知道如果要在数据结构中获得一个值（使用get方法），需要迭代整个数据结构来找到它。如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后返回值在表中的地址



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
    // 创建散列表
    class HashTable {
        constructor(toStrFn = defaultToString){
            this.toStrFn = toStrFn;
            this.table = {};
        }
        // 散列函数
        loseloseHash(key){
            // 检验key是否是一个数。如果是，直接将其返回
          if(typeof key === 'number'){
            return key
          }

          //给定一个key参数，我们就能根据组成key的每个字符的ASCII码值的和得到一个数。
          // 将key转换为一个字符串
          const tableKey = this.toStrFn(key);
          let hash = 0; //存储这个总和
          // 遍历key并将从ASCII表中查到的每个字符对应的ASCII值加到hash变量中
          for (let i = 0; i < tableKey.length; i++) {
            // String 的 charCodeAt() 方法返回一个整数，表示给定索引处的 UTF-16 码元，其值介于 0 和 65535 之间
            hash += tableKey.charCodeAt(i);
          }
          // 返回hash值。为了得到比较小的数值，我们会使用hash值和一个任意数做除法的余数（%）
          // 这可以规避操作数超过数值变量最大表示范围的风险。
          return hash % 37;
        }
        hashCode(key){
            return this.loseloseHash(key);
        }
        // 向散列表增加一个新的项(也能更新散列表)
        put(key, value){
            // 检验key和value是否合法
            if(key !=null && value != null){
                // 用所创建的hashCode函数在表中找到一个位置
                const position = this.hashCode(key);
                // 用key和value创建一个ValuePair实例
                this.table[position] = new ValuePair(key,value);
                return true;
            }
            // 如果不合法就返回false 表示这个值没有被添加（或更新）
            return false;
        }
        // 根据键值从散列表中移除值
        remove(key){
          // 获取hash
          const hash = this.hashCode(key);
          // 在hash的位置获取到valuePair
          const valuePair = this.table[hash];
          // 如果valuePair不是null或undefined
          if(valuePair != null){
            // 就使用JavaScript的delete运算符将其删除
            delete this.table[hash];
            return true;
          }
          return false;
        }
        // 返回根据键值检索到的
        get(key){
          const valuePair = this.table[this.hashCode(key)];
          return valuePair ==null?undefined:valuePair.value;
        }
        // HashTable和Dictionary类很相似。不同之处在于在Dictionary类中，我们将valuePair保存在table的key属性中（在它被转化为字符串之后），而在HashTable类中，我们由key（hash）生成一个数，并将valuePair保存在hash位置（或属性）
    }
    const hash = new HashTable();
    hash.put('Gandalf','gandalf@email.com');
    hash.put('John','johnsnow@email.com');
    hash.put('Tyrion','tyrion@emial.com');

    console.log(hash.hashCode('Gandalf')+' - Gandalf'); // 19 - Gandalf
    console.log(hash.hashCode('John')+ '- John'); // 29- John
    console.log(hash.hashCode('Tyrion')+ '- Tyrion'); // 16- Tyrion

    console.log(hash.get('Gandalf')); // gandalf@email.com
    console.log(hash.get('Loiane')); // undefined

    hash.remove('Gandalf');
    console.log(hash.get('Gandalf'));// undefined
```
有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称其为冲突。  
例如：  
```javascript
 const hash = new HashTable();
    hash.put('Ygritte', 'ygritte@email.com');
    hash.put('Jonathan', 'jonathan@email.com');
    hash.put('Jamie', 'jamie@email.com');
    hash.put('Jack', 'jack@email.com');
    hash.put('Jasmine', 'jasmine@email.com');
    hash.put('Jake', 'jake@email.com');
    hash.put('Nathan', 'nathan@email.com');
    hash.put('Athelstan', 'athelstan@email.com');
    hash.put('Sue', 'sue@email.com');
    hash.put('Aethelwulf', 'aethelwulf@email.com');
    hash.put('Sargeras', 'sargeras@email.com');
    console.log(hash.hashCode('Ygritte')); // 4
    console.log(hash.hashCode('Jonathan')); // 5
    console.log(hash.hashCode('Jamie')); // 5
    console.log(hash.hashCode('Jack')); // 7
    console.log(hash.hashCode('Jasmine'));// 8
    console.log(hash.hashCode('Jake')); // 9
    console.log(hash.hashCode('Nathan'));// 10
    console.log(hash.hashCode('Athelstan'));// 7
    console.log(hash.hashCode('Sue'));// 5
    console.log(hash.hashCode('Aethelwulf'));// 5
    console.log(hash.hashCode('Sargeras')); // 10
    // 散列值相同时 后面的值会覆盖前面的值 如何解决这个问题
    console.log(hash.toString()); // 4=>[#Ygritte:ygritte@email.com],5=>[#Aethelwulf:aethelwulf@email.com],7=>[#Athelstan:athelstan@email.com],8=>[#Jasmine:jasmine@email.com],9=>[#Jake:jake@email.com],10=>[#Sargeras:sargeras@email.com]

```
有两种方法可以解决这个冲突：  

 方法一 分离链接
 >分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的最简单的方法，但是在HashTable实例之外还需要额外的存储空间。
```javascript
    // 声明HashTableSeparateChaining的基本结构
    class HashTableSeparateChaining{
        constructor(toStrFn = defaultToString){
          this.toStrFn = toStrFn;
          this.table = {};
        }
        loseloseHash(key){
            // 检验key是否是一个数。如果是，直接将其返回
          if(typeof key === 'number'){
            return key
          }

          //给定一个key参数，我们就能根据组成key的每个字符的ASCII码值的和得到一个数。
          // 将key转换为一个字符串
          const tableKey = this.toStrFn(key);
          let hash = 0; //存储这个总和
          // 遍历key并将从ASCII表中查到的每个字符对应的ASCII值加到hash变量中
          for (let i = 0; i < tableKey.length; i++) {
            // String 的 charCodeAt() 方法返回一个整数，表示给定索引处的 UTF-16 码元，其值介于 0 和 65535 之间
            hash += tableKey.charCodeAt(i);
          }
          // 返回hash值。为了得到比较小的数值，我们会使用hash值和一个任意数做除法的余数（%）
          // 这可以规避操作数超过数值变量最大表示范围的风险。
          return hash %37;
        }
        hashCode(key){
            return this.loseloseHash(key);
        }
        //实现put 向散列表增加一个新的项(也能更新散列表)
        put(key,value){
          if(key !==null && value != null){
            const position = this.hsaCode(key);
            // 验证要加入新元素的位置是否已经被占据
            if(this.table[position] == null){
                // 如果是第一次向该位置加入元素，在该位置上初始化一个LinkedList类的实例
                this.table[position] = new LinkList();
            }
            // 向LinkedList实例中添加一个ValuePair实例
            this.table[position].push(new ValuePair(key, value));
            return true;
          }
          return false;
        }
        // 返回根据键值检索到的
        get(key){
          const position = this.hashCode(key);
          // 在position位置检索linkedList
          const linkedList = this.table[position];
          // 检验是否存在linkedList实例
          if(linkedList !=null && !linkedList.isEmpty()){
            // 获取链表表头的引用
            let current = linkedList.getHead();
            // 迭代这个链表来寻找我们需要的元素
            while (current != null){
                // 通过current.element.key来获得Node链表的key属性，并通过比较它来确定它是否就是我们要找的键
                if(current.element.key === key){
                    //  如果key值相同，就返回Node的值
                    return current.element.value;
                }
                // 如果不相同，就继续迭代链表，访问下一个节点
                current = current.next;
            }
          }
          // 如果没有返回undefined
          return undefined;
        }
        // 根据键值从散列表中移除值
        remove(key){
            const position = this.hashCode(key);
            const linkedList = this.table[position];
            if(linkedList != null && !linkedList.isEmpty()){
              let current = linkedList.getHead();
              while(current !=null){
                if(current.element.key === key){
                    linkedList.remove(current.element);
                    // 如果链表为空了（链表中不再有任何元素了），就使用delete运算符将散列表的该位置删除，这样搜索一个元素的时候，就可以跳过这个位置了
                    if(linkedList.isEmpty()){
                        delete this.table[position];
                    }
                    return true;
                }
                current = current.next;
              }
            }
            return false;
        }
        
    }
```
方法二：线性探查
>之所以称作线性，是因为它处理冲突的方法是将元素直接存储到表中，而不是在单独的数据结构中。当想向表中某个位置添加一个新元素的时候，如果索引为position的位置已经被占据了，就尝试position+1的位置。如果position+1的位置也被占据了，就尝试position+2的位置，以此类推，直到在散列表中找到一个空闲的位置。想象一下，有一个已经包含一些元素的散列表，我们想要添加一个新的键和值。我们计算这个新键的hash，并检查散列表中对应的位置是否被占据。如果没有，我们就将该值添加到正确的位置。如果被占据了，我们就迭代散列表，直到找到一个空闲的位置。
```javascript
// 方法二 线性探查
    class HashTableLinearProbing{
        constructor(toStrFn = defaultToString){
          this.toStrFn = toStrFn;
          this.table = {};
        }
        loseloseHash(key){
            // 检验key是否是一个数。如果是，直接将其返回
          if(typeof key === 'number'){
            return key
          }

          //给定一个key参数，我们就能根据组成key的每个字符的ASCII码值的和得到一个数。
          // 将key转换为一个字符串
          const tableKey = this.toStrFn(key);
          let hash = 0; //存储这个总和
          // 遍历key并将从ASCII表中查到的每个字符对应的ASCII值加到hash变量中
          for (let i = 0; i < tableKey.length; i++) {
            // String 的 charCodeAt() 方法返回一个整数，表示给定索引处的 UTF-16 码元，其值介于 0 和 65535 之间
            hash += tableKey.charCodeAt(i);
          }
          // 返回hash值。为了得到比较小的数值，我们会使用hash值和一个任意数做除法的余数（%）
          // 这可以规避操作数超过数值变量最大表示范围的风险。
          return hash %37;
        }
        hashCode(key){
            return this.loseloseHash(key);
        }
        //实现put 向散列表增加一个新的项(也能更新散列表)
        put(key,value){
          if(key !==null && value != null){
            const position = this.hsaCode(key);
            // 验证要加入新元素的位置是否已经被占据
            if(this.table[position] == null){
                // 如果没有元素存在（这是最简单的场景），就在这个位置添加新元素
                this.table[position] = new ValuePair(key,value);
            }else{
                let index = position+1;
                while (this.table[index]!=null) {
                    index++;
                }
                //直到找到一个没有被占据的位置。然后将值分配到该位置。
                this.table[index] = new ValuePair(key,value);
            }
            return true;
          }
          return false;
        }
        // 返回根据键值检索到的
        get(key){
          const position = this.hashCode(key);
          // 检验是否存在这个键
          if(this.table[position] != null){
            //  检查值是否就是原始位置上的值
            if(this.table[position].key === key){
                // 是就直接返回
                return this.table[position].value;
            }
            // 不是就继续向下找 +1 +1
            let index =position+1;
            // 按位置递增的顺序查找散列表上的元素直到找到我们要找的元素，或者找到一个空位置
            while (this.table[index]!=null && this.table[index].key!==key) {
                index++;
            }
            // 验证元素的键是否是我们要找的键
            if (this.table[index]!=null && this.table[index].key===key) {
                // 是就直接返回
                return this.table[position].value;
            }
          }
          // 如果这个键不存在，说明要查找的值不在散列表中，因此可以返回undefined
          return undefined;
        }
        // 根据键值从散列表中移除值
        remove(key){
          const position = this.hashCode(key);
          // 检验是否存在这个键
          if(this.table[position] != null){
            //  检查值是否就是原始位置上的值
            if(this.table[position].key === key){
                // 是就直接返回
                delete this.table[position];
                this.verifyRemoveSideEffect(key,position);
                return true;
            }
            // 不是就继续向下找 +1 +1
            let index =position+1;
            // 按位置递增的顺序查找散列表上的元素直到找到我们要找的元素，或者找到一个空位置
            while (this.table[index]!=null && this.table[index].key!==key) {
                index++;
            }
            // 验证元素的键是否是我们要找的键
            if (this.table[index]!=null && this.table[index].key===key) {
                // 是就直接返回
                delete this.table[position];
                this.verifyRemoveSideEffect(key,index);
                return true;
            }
          }
          // 如果这个键不存在，说明要查找的值不在散列表中，无法删除 就得返回false
          return false;
        }
        // 由于我们不知道在散列表的不同位置上是否存在具有相同hash的元素，需要验证删除操作是否有副作用。
        // 如果有，就需要将冲突的元素移动至一个之前的位置，这样就不会产生空位置（行{2}和行{4}）。
        // 要完成这项工作，我们将会创建一个工具方法，声明如下。
        // verifyRemoveSideEffect方法接收两个参数：被删除的key和该key被删除的位置
        verifyRemoveSideEffect(key, removedPosition){
            // 获取被删除的key的hash值
          const hash = this.hashCode(key);
          // 从下一个位置开始迭代散列表
          let index = removedPosition + 1;
          // 直到找到一个空位置
          //当迭代随后的元素时，我们需要计算当前位置上元素的hash值（行{4}）。如果当前元素的hash值小于或等于原始的hash值（行{5}）或者当前元素的hash值小于或等于removedPosition（也就是上一个被移除key的hash值），表示我们需要将当前元素移动至removedPosition的位置（行{6}）。移动完成后，我们可以删除当前的元素（因为它已经被复制到removedPosition的位置了）。我们还需要将removedPosition更新为当前的index，然后重复这个过程。
          while(this.table[index] != null){
            const posHash = this.hashCode(this.table[index].key); //{4}
            if(posHash <= hash || posHash <= removedPosition){ //{5}
              this.table[removedPosition] = this.table[index]; //{6}
              delete this.table[index];
              removedPosition = index;
            }
            index++;
          }
        }
    }
    
```

我们也可以通过修改不同的散列函数来降低散列值重复的可能，例如另一个可以实现的、比lose lose更好的散列函数是djb2。
>注: 一个表现良好的散列函数是由几个方面构成的：插入和检索元素的时间（即性能），以及较低的冲突可能性。
```javascript
    // 一个更好的散列函数
    function djb2HashCode(key){
      const tableKey = toStrFn(key); //将键转化为字符串之后
      let hash = 5381; // djb2HashCode方法包括初始化一个hash变量并赋值为一个质数（行{2}——大多数实现都使用5381）
      for(let i=0;i<tableKey.length;i++){ //迭代参数key
        hash = (hash * 33)+tableKey.charCodeAt(i); //将hash与33相乘 并和当前迭代到的字符的ASCII码值相加。
      }
      return hash % 1013; // 将使用相加的和与另一个随机质数相除的余数
    }
```
