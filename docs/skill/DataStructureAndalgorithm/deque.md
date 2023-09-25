### 双端队列(deuqe,或称double-ended queue)

> 在计算机科学中，双端队列的一个常见应用是存储一系列的撤销操作。
> 每当用户在软件中进行了一个操作，该操作会被存在一个双端队列中（就像在一个栈里）。
> 当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被从后面移除了。
> 在进行了预先定义的一定数量的操作后，最先进行的操作会被从双端队列的前端移除。
> 由于双端队列同时遵守了先进先出和后进先出原则，可以说它是把队列和栈相结合的一种数据结构。

```js
/****
  * 创建deque类
  * 
 */
class Deque{
  constructor(){
    this.count = 0; // 队列中元素的数量
    this.lowestCount = 0; // lowestCount用于跟踪队列中第一个元素的索引  
    this.items = {};  // 存储队列元素的对象
  }
    // toString方法，将队列中的元素转化为字符串返回  
  toString(){
    if(this.isEmpty()){
      return '';
    }
     // 初始化字符串为第一个元素  
    let objString = `${this.items[this.lowestCount]}`;
       // 遍历队列中的其他元素，添加到字符串中  
    for (let i = this.lowestCount+1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString;
  }
    // 检查队列是否为空
  isEmpty(){
    return this.size() ===0;
  }
  //队列中有多少元素
  size(){
    return this.count - this.lowestCount;
  }
  addBack(element){
    //往队列尾部插入数据
    this.items[this.count] = element;
    this.count++;
  }
  addFront(element) {
    //往队列前端插入数据
    if(this.isEmpty()){
      this.addBack(element);
    }else if (this.lowestCount>0){
      this.lowestCount--;
      this.items[this.lowestCount]=element;
    }else{
      for(let i = this.count; i>0;i--){
        this.items[i] = this.items[i-1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }
  removeFront(){
    //移除前端第一条数据
    if(this.isEmpty()){
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  removeBack(){
    // 移除队列中最后一条数据
    if(this.isEmpty()){
      return undefined;
    }
    console.log(this.lowestCount);
    const result = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return result;
  }
}
 const deque = new Deque();
 console.log(deque.isEmpty());  // true
 deque.addBack('John');
 deque.addBack('Jack');
console.log(deque.toString());  // John,Jack
deque.addBack('caday');
console.log(deque.toString());   // John,Jack,caday
console.log(deque.size()); // 3
console.log(deque.isEmpty());  // false
console.log(deque.toString());  // Jack,caday
deque.removeFront();
console.log(deque.removeBack());  // caday
console.log(deque.toString()); // Jack
deque.addFront('John');
console.log(deque.toString());  // John,Jack
console.log(deque.size());   // 2
```
