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
```
