### 集合

>集合是由一组无序且唯一（即不能重复）的项组成的。该数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。

```javascript
 class Set{
    constructor(){
      this.items = {};
    }
    //向集合添加一个新元素
    add(element){
      if(!this.has(element)){
         this.items[element] = element;
         return true
      }
      return false;
    }
    // 从集合移除一个元素
    delete(element){
      if(this.has(element)){
        delete this.items[element];
        return true;
      }
      return false;
    }
    // 如果元素在集合中,返回true 否则返回false
    has(element){
      return this.items.hasOwnProperty(element);
      // return Object.prototype.hasOwnProperty.call(this.items,element);
    }
    //移除集合中的所有元素
    clear(){
       this.items={};
    }
    //返回集合所包含元素的数量 他与数组的length属性类似
    size(){
      return Object.keys(this.items).length
    }
    sizeLancy(){
      let count = 0;
      for(let key in this.items){
        if(this.items.hasOwnProperty(key)){
          count++;
        }
      }
      return count;
    }
    // 返回一个包含集合中所有元素的数组
    values(){
       return Object.values(this.items);
    }
    valuesLegacy(){
      let values = [];
      for(let key in this.items){
        if(this.items.hasOwnProperty(key)){
          values.push(key);
        }
      }
      return values;
    }
    // 并集 返回一个包含两个集合中所有元素的新集合
    union(otherSet){
      const unionSet = new Set();
      this.values().forEach(value => unionSet.add(value));
      otherSet.values().forEach(value=>unionSet.add(value));
      return unionSet;
    }
    //不使用forEach和箭头函数
    unionLegacy(otherSet){
      const unionSet = new Set();

      let values = this.values();
      for(let i=0;i<values.length;i++){
        unionSet.add(values[i]);
      }

      values = otherSet.values();
      for(let i =0;i<values.lenth;i++){
        unionSet.add(values[i]);
      }
      return unionSet;
    }

    // 交集 
    intersection(otherSet){
      const intersectionSet = new Set();
      const values = this.values();

      for(let i=0;i<values.length;i++){
        if(otherSet.has(values[i])){
          intersectionSet.add(values[i]);
        }
      }
      return intersectionSet;
    }
    // 优化交集 减少迭代次数
    intersection1(otherSet){
        // 创建一个新的集合来存放intersection方法的返回结果 
        const intersectionSet = new Set();
        // 获取当前集合实例中的值
        const values = this.values();
        const otherValues = otherSet.values();
        //假设当前的集合元素较多 假设当前的集合元素较多
        let biggerSet = values;
        let smallerSet = otherValues;
        //判断两个集合的长度 谁短就遍历谁
        if(otherValues.length - values.length > 0){
            //如果另一个集合元素个数多于当前集合的话，我们就交换biggerSet和smallerSet的值
            biggerSet = otherValues;
            smallerSet = values;
        }
        // 迭代较小集合（行{7}）来计算出两个集合的共有元素并返回。
        smallerSet.forEach(value=>{
            if(biggerSet.includes(value)){
                intersectionSet.add(value);
            }
        });
        return intersectionSet
    }
    // 差集 集合A和集合B的差集表示为A - B
    // tips：我们不能像优化intersection方法一样优化difference方法，因为setA与setB之间的差集可能和setB与setA之间的差集不同。
    difference(otherSet){
        //创建结果集合
        const differenceSet = new Set();
        this.values().forEach(value=>{
            if(!otherSet.has(value)){
                differenceSet.add(value);
            }
        });
        return differenceSet;
    }
    // 子集 集合A是集合B的子集（或集合B包含集合A）
    isSubsetOf(otherSet){
        //验证当前Set实例的大小。如果当前实例中的元素比otherSet实例更多，它就不是一个子集 子集的元素个数需要小于或等于要比较的集合
        if(this.size()>otherSet.size()){
            return false;
        }
        // 假定当前实例是给定集合的子集
        let isSubset = true;
        // 迭代当前集合的所有元素
        this.values().every(value=>{
            // 验证这些元素也存在于otherSet中
            if(!otherSet.has(value)){
                //如果有任何元素不存在于otherSet中，就意味着它不是一个子集，返回false
                isSubset = false;
                return false;
            }
            // 如果所有元素都存在于otherSet中 返回true
            return true;
        });
        return isSubset;
    }
  }
  // 使用set类
  const set = new Set();
  set.add(1);
  console.log(set.values()); // 输出[1]
  console.log(set.has(1)); // 输出true
  console.log(set.size()); //输出1

  set.add(2);
  console.log(set.values()); // 输出[1,2]
  console.log(set.has(2)); // 输出 true
  console.log(set.size());// 输出2

  set.delete(1);
  console.log(set.values()); // 输出[2]

  set.delete(2);
  console.log(set.values()); //输出[]

  //测试并集
  const setA = new Set();
  setA.add(1);
  setA.add(2);
  setA.add(3);

  const setB = new Set();
  setB.add(3);
  setB.add(4);
  setB.add(5);
  setB.add(6);

  const unionAB = setA.union(setB);
  console.log(unionAB.values());
  
  //测试交集
  const setC = new Set();
  setC.add(1);
  setC.add(2);
  setC.add(3);

  const setD = new Set();
  setD.add(4);
  setD.add(2);
  setD.add(3);

  const intersectionCD = setC.intersection(setD);
  console.log(intersectionCD.values()); // 输出[2.3]

const setE = new Set();
setE.add(1);
setE.add(3);
setE.add(2);

const setF= new Set();
setF.add(4);
setF.add(3);
setF.add(2);
const differenceEF = setE.difference(setF);
console.log(differenceEF.values()); // 输出 [1]
console.log(setF.difference(setE).values()); // 输出 [4]

const setH = new Set();
setH.add(1);
setH.add(2);

const setI = new Set();
setI.add(1);
setI.add(2);
setI.add(3);

const setJ = new Set();
setJ.add(2);
setJ.add(3);
setJ.add(4);

console.log(setH.isSubsetOf(setI)); //true
console.log(setH.isSubsetOf(setJ)); //false
```
上面自己实现了一个Set类，也可以使用es6原生set实现集合运算，代码如下:  

```javascript
 // 使用原生Set模拟集合运算
       const setA = new Set();
       setA.add(1);
       setA.add(2);
       setA.add(3);
       const setB = new Set();
       setB.add(2);
       setB.add(3);
       setB.add(4);
    //模拟并集
    const union = (setA, setB)=>{
        const unionAb = new Set();
        setA.forEach(value => unionAb.add(value));
        setB.forEach(value => unionAb.add(value));
        return unionAb;
    }
    console.log(union(setA,setB)); // 输出Set(4) {1, 2, 3, 4}
    //模拟交集
    const intersection = (setA, setB)=>{
        const intersectionSet = new Set();
        setA.forEach(value=>{
            if(setB.has(value)){
                intersectionSet.add(value);
            }
        });
        return intersectionSet;
    };
    console.log(intersection(setA,setB)); // 输出 Set(2) {2, 3}
    // 模拟差集运算
    const difference = (setA,setB)=>{
         const differenceSet = new Set();
         setA.forEach(value=>{
            if(!setB.has(value)){
                differenceSet.add(value);
            }
         })
         return differenceSet;
    };
    console.log(difference(setA,setB));// 输出 Set(1) {1}

    //使用扩展运算符可以更简单的实现这些操作
    // ES2015的Set类支持向构造函数传入一个数组来初始化集合的运算，那么我们对setA使用扩展运算符（...setA）会将它的值转化为一个数组（展开它的值），然后对setB也这样做。
    //并集
    console.log(new Set([...setA,...setB]));
    // 交集
    //上面的代码同样将setA转化为了一个数组，并使用了filter方法，它会返回一个新数组，包含能通过回调函数检测的值——在本示例中验证了元素是否也存在于setB中。返回的数组会用来初始化结果集合。
    console.log(new Set([...setA].filter(x=>setB.has(x))));
    //差集 和交集类似 需要的是不存在于setB中的元素
    console.log(new Set([...setA].filter(x=>!setB.has(x))));
```
