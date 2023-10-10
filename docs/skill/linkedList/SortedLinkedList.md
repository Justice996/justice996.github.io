### 有序链表

> 有序链表是指保持元素有序的链表结构。除了使用排序算法之外，我们还可以将元素插入到正确的位置来保证链表的有序性。

```javascript
// 有序链表
  const Compare = {
    LESS_THAN:-1,
    BIGGER_THAN:1
  }
  /***
   * 用于比较元素的函数
   * 如果元素有相同的引用，它就返回0（行{1}）。如果第一个元素小于第二个元素，它就返回-1，反之则返回1。
  */
  function defaultCompare(a,b){
    if(a === b){
      return 0;
    }
    return a>b? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }
  class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare){
      super(equalsFn);
      this.compareFn = compareFn;
    }
    //有序链表新增
    insert(element,index = 0){
      if(this.isEmpty()){
        //如果有序链表为空，我们可以直接调用LinkedList的insert方法并传入0作为index
          return super.insert(element,0);
      }
      //获取要插入的位置 以保证链表的有序性
      const pos = this.getIndexNextSortedElement(element);
      //使用之前链表的插入方法
      return super.insert(element,pos);
    }

    getIndexNextSortedElement(element){
      let current = this.head;
      let i = 0;
      for(;i<this.size()&&current;i++){
        const comp =this.compareFn(element,current.element);
        if(comp === Compare.LESS_THAN){
          return i;
        }
        current = current.next;
      }
      return i;
    }
  }
```
