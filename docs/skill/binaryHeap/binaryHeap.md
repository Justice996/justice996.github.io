### 二叉堆
> 二叉堆是计算机科学中一种非常著名的数据结构，由于它能高效、快速地找出最大值和最小值，常被应用于优先队列。它也被用于著名的堆排序算法中。

二叉堆的特性:  
❑ 它是一棵完全二叉树，表示树的每一层都有左侧和右侧子节点（除了最后一层的叶节点），并且最后一层的叶节点尽可能都是左侧子节点，这叫作结构特性。  
❑ 二叉堆不是最小堆就是最大堆。最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值。所有的节点都大于等于（最大堆）或小于等于（最小堆）每个它的子节点。这叫作堆特性。




```javascript

const Compare = {
        LESS_THAN: -1,
        BIGGER_THAN: 1
    }
    function defaultCompare(a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
    }
    function reverseCompare(compareFn){
        return (a,b) =>compareFn(b,a);
    }
    // 交换函数 交换数组中的两个值的位置
    function swap(array,a,b){
        const temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }
    //用es6实现交换
    const swap1 = (array,a,b)=>[array[a],array[b]] = [array[b],array[a]];
    // 创建最小堆类
    class  MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }
  getLeftIndex(index) {
    return (2 * index) + 1;
  }
  getRightIndex(index) {
    return (2 * index) + 2;
  }
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() <= 0;
  }
  clear() {
    this.heap = [];
  }
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
  insert(value) {
    if (value != null) {
      const index = this.heap.length;
      this.heap.push(value);
      this.siftUp(index);
      return true;
    }
    return false;
  }
  siftDown(index) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN
    ) {
      element = left;
    }
    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN
    ) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }
  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN
    ) {
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.siftDown(0);
    return removedValue;
  }
  heapify(array) {
    if (array) {
      this.heap = array;
    }
    const maxIndex = Math.floor(this.size() / 2) - 1;
    for (let i = maxIndex; i >= 0; i--) {
      this.siftDown(i);
    }
    return this.heap;
  }
  getAsArray() {
    return this.heap;
  }
}

class MaxHeap extends MinHeap{
    constructor(compareFn = defaultCompare){
        super(compareFn);
        this.compareFn = reverseCompare(compareFn);
    }
}
    // const heap = new MinHeap();
    // heap.insert(2);
    // heap.insert(3);
    // heap.insert(4);
    // heap.insert(5);
    // console.log(heap.insert(1));
    // console.log(heap)
    // console.log('Heap size',heap.size());
    // console.log('heap is empty',heap.isEmpty());
    // console.log('heap min value',heap.findMinimum());


    const heap1 = new MinHeap();
    for (let i = 1; i < 10; i++) {
        heap1.insert(i);
    }
    console.log(heap1.getAsArray())
    console.log('Extract minimum: ', heap1.extract());
    console.log(heap1.getAsArray());

    console.log('-------------------');
    const maxHeap = new MaxHeap();
    maxHeap.insert(2);
    maxHeap.insert(3)
    maxHeap.insert(4)
    maxHeap.insert(5)


    maxHeap.insert(1)
console.log('MaxHeap size: ', maxHeap.size());
console.log('MaxHeap min value: ', maxHeap.findMinimum());



function heapify(array, index, heapSize, compareFn) {
  let largest = index;
  const left = (2 * index) + 1;
  const right = (2 * index) + 2;
  if (left < heapSize && compareFn(array[left], array[index]) > 0) {
    largest = left;
  }
  if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
    largest = right;
  }
  if (largest !== index) {
    swap(array, index, largest);
    heapify(array, largest, heapSize, compareFn);
  }
}
// 堆排序算法
function heapSort(array, compareFn = defaultCompare){
    let heapSize = array.length;
    buildMaxHeap(array, compareFn);
    while (heapSize>1) {
        swap(array,0,--heapSize);
        heapify(array,0,heapSize,compareFn);
    }
    return array;
}

function buildMaxHeap(array, compareFn){
    for(let i = Math.floor(array.length/2);i>=0;i -=1){
        heapify(array,i,array.length,compareFn);
    }
    return array;
}


const array = [7,6,3,5,4,1,2];
console.log(array);
console.log(heapSort(array));
```
