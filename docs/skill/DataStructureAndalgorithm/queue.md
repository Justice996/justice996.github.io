### JS实现队列
> 队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。

```js
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
// 使用队列
const queue = new Queue();
console.log(queue.isEmpty());
queue.enqueue('tom');
queue.enqueue('jack');
console.log(queue.toString());
queue.enqueue('Aney');
console.log(queue.toString());
console.log(queue.size());
console.log(queue.isEmpty());
queue.dequeue();
queue.dequeue();
console.log(queue.toString());
console.log(queue.peek());
```
