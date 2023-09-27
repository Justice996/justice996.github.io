### 链表

> 链表储存有序的元素集合,但不同于数组,链表中的元素在内存中并不是连续放置的。
每个元素由一个储存元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成。
相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然而，
链表需要使用指针，因此实现链表时需要额外注意


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

    // 从链表中移除元素
    removeAt(index){
      //判断index的合法性 不合法直接返回undefined
      if(index >=0 && index<this.count){
        // 创建对第一个元素的引用
        let current = this.head;
        if(index === 0){
          // 移除第一项
          this.head = current.next;
        }else{

          let previous;
          for(let i = 0;i<index;i++){
            
            previous = current;
            current = current.next;
          }
          previous.next = current.next;
        }
        this.count--;
        return current.element;
      }
      return undefined;
    }
  }

  const list = new LinkedList();
  list.push(15);
  list.push(10);
  list.push(12);
  console.log(list);
```
