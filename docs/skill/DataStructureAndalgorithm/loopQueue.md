### 循环队列

>循环队列的一个例子就是击鼓传花游戏（hot potato）。在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈、结束游戏。重复这个过程，直到只剩一个孩子（胜者）。
> 我先使用了之前的队列代码，后面创建了hotPotato函数实现了这个游戏

```javascript
  /***
   * 创建队列
  */
 class Queue{
  constructor(){
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  // 向队列添加元素
  enqueue(element){
    this.items[this.count] = element;
    this.count++;
  }
  // 删除队列元素
  dequeue(){
    if(this.isEmpty()){
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  // 查看队头元素
  peek(){
    if(this.isEmpty()){
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  // 检查队列是否为空
  isEmpty(){
    return this.size() ===0;
  }
  //队列中有多少元素
  size(){
    return this.count - this.lowestCount;
  }
  //清空队列
  claer(){
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  toString(){
    if(this.isEmpty()){
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount+1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString;
  }
 }
/***
 * 实现击鼓传花游戏
*/
function hotPotato(elementsList,num){
  const queue = new Queue();
  const elimitatedList = []; //被淘汰列表

  for(let i =0;i<elementsList.length;i++){
    queue.enqueue(elementsList[i]); //将所有人加入队列
  }
//开始游戏 只剩一个人的时候游戏结束
  while (queue.size()>1) {
    for(let i =0;i<num;i++){
      console.log(i);
      queue.enqueue(queue.dequeue()); // 将没有被淘汰的再次插入队尾
    }
    elimitatedList.push(queue.dequeue()); //淘汰的列表
  }

  return {
    eliminated:elimitatedList,
    winner:queue.dequeue() //队列中只剩一个的时候就是获胜者
  }
}
const names = ['John', 'Jack','Camila', 'Ingrid', 'Carl'];
    const result = hotPotato(names, 7);
    console.log(result);
    result.eliminated.forEach(name => {
      console.log(`${name}在击鼓传花游戏中被淘汰。`);
    });

    console.log(`胜利者： ${result.winner}`);
```
