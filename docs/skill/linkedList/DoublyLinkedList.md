### 双向链表
> 双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接；而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素。
 

```javascript
 function defaultEquals(a,b){
    return a===b;
  }
  class Node{
    constructor(element){
      this.element = element;
      this.next = undefined;
    }
  }
  class LinkedList {
    constructor(equalsFn = defaultEquals) {
      this.count= 0;
      this.head = undefined;
      this.equalsFn =equalsFn;
    }
    // 向链表中添加元素
    push(element){
      const node = new Node(element);
      let current;
      if(this.head == null){
        //向一个空链表中插入元素
        this.head = node;
      }else{
        //向一个非空链表中插入元素
        current =this.head;
        // 循环获取到最后一项
        while (current.next != null){
          current = current.next;
        }
        // 将指针指向新元素
        current.next = node;
      }
      // 链表长度加1
      this.count++;
    }

    // 根据位置从链表中移除元素
    removeAt(index){
      //判断index的合法性 不合法直接返回undefined
      if(index >=0 && index<this.count){
        // 创建对第一个元素的引用
        let current = this.head;
        if(index === 0){
          // 移除第一项
          this.head = current.next;
        }else{

          const previous = this.getElementAt(index - 1);
          current = current.next;
          previous.next = current.next;
        }
        this.count--;
        return current.element;
      }
      return undefined;
    }

    // 循环迭代列表直到目标位置
    getElementAt(index){
      // 判断传入的index是否合法
      if(index>=0 && index<= this.conut ){  //1
        let node = this.head; //2 初始化node变量 该变量会从链表的第一个元素head开始迭代整个链表
        for (let i = 0; i < index && node!=null; i++) { //3  结束循环时 node中保存的将是index位置元素的引用
          node = node.next; 
        }
        return node //4
      }
      return undefined; //5  如果不合法 返回undefined
    }
    // 往指定位置插入元素
    insert(element, index){
      if(index>=0 && index<=this.count){ //1 检查插入位置是否合法
        const node = new Node(element); //生成需要插入的数据
        if(index === 0 ){ //如果要在开头插入的话
          const current = this.head; //保存第一条数据
          node.next = current; //2 将第一条的指针指向第一条数据
          this.head = node; // 将head的引用指向 node
        }else{
          const previous = this.getElementAt(index - 1);//3 找到要插入的目标位置 表示需要插入元素的前一个位置
          const current = previous.next;//4 插入新元素位置之后的一个元素的引用
          node.next = current;//5  把新元素和当前元素连接起来
          previous.next = node;//6 让之前元素指向新元素
        }
        this.count++; // 链表长度＋1
        return true; // 返回新增成功
      }
      return false;
    }

    // 返回一个元素的位置
    indexOf(element){
      let current = this.head;   // 定义一个初始值 用于循环整个链表
      for(let i=0;i<this.count&&current !=null;i++){ //从索引0开始 直到链表长度为止
        if(defaultEquals(element,current.element)){  //验证当前节点元素和目标元素是否相等
          return i //如果相等 就返回当前索引
        }
        current = current.next; //将下一个链表节点指向current
      }
      return -1;
    }

    // 从链表移除指定元素
    remove(element){
        //找到指定元素在链表中的位置
        const index = this.indexOf(element);
        // 根据位置移除该元素
        return this.removeAt(index);
    }
    // 获取当前链表的长度
    size(){
      return this.count;
    }
    //返回当前链表是否为空
    isEmpty(){
      return this.size() === 0;
    }
    // 获取head
    getHead(){
      return this.head;
    }
    //将 LinkedList 对象转换成一个字符串
    toString(){
      if(this.head == null){
        return '';
      }else{
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 0; i < this.size() && current != null; i++) {
          objString = `${objString},${current.element}`
          current = current.next;
        }
        return objString;
      }
    }
  }
  
  //双向链表
  class DoublyNode extends Node {
    constructor(element, next,prev){
      super(element, next);
      this.prev = prev;
    }
  }
  
  class DoublyLinkedList extends LinkedList {
    constructor (equalsFn = defaultEquals){
      super(equalsFn);
      this.tail = undefined; //保存对链表最后一个元素的引用
    }
    // 双向链表添加元素
    insert(element,index){
      if(index>=0 && index <= this.count) {
        const node = new DoublyNode(element);
        let current = this.head;
        if(index === 0){ //如果是第一项
          if(this.head == null){
            this.head = node;
            this.tail = node;
          } else {
            node.next = this.head;
            current.prev = node;
            this.head = node;
          }
        }else if(index === this.count){ //如果是最后一项
            current = this.tail;
            current.next = node;
            node.prev = current;
            this.tail = node;
        }else{
          const previous = this.getElementAt(index - 1);
          current = previous.next;
          node.next = current;
          previous.next = node;
          current.prev = node;
          node.prev = previous;
        }
        this.count++;
        return true;
      }
      return false;
    }

    //双向链表从任意位置移除元素
    removeAt(index){
      //判断index是否合法
      if(index >=0 && index<this.count){
         let current = this.head;
         if(index === 0){
          this.head = current.next; //改变head的引用，将其从current改为下一个元素
          //如果只有一项 更新tail 
          if(this.count ===1){
            this.tail = undefined;
          }else{
            // 被删除元素的下一个元素的prev改为undefined 因为这个元素成为新的第一个元素
            this.head.prev = undefined;
          }
         } else if(index === this.count -1){
          //如果是最后一项
          current =this.tail; 
          //把tail的引用更新为双向链表中倒数第二个元素 删除最后一个元素
          this.tail = current.prev;
          //将倒数第二个元素的next指向undefined
          this.tail.next = undefined;
         }else{
          //从双向链表中间删除一个元素 
          //迭代双向链表 直到要找到的位置
          current = this.getElementAt(index);
          const previous = current.prev;
          //将前一个元素的next指向下一个元素
          previous.next = current.next;
          // 将下一个元素的prev指向前一个元素
          current.next.prev = previous;
         }
         this.count--;
         return current.element; // 返回删除的元素
      }
      return undefined;
    }
  }

```
