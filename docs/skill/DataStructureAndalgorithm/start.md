### 开始
一共15章 
第一、二章简单介绍了js基础语法，略读一下

- 第三章数组 (前面略读了一下，看不下去了，明日再看,没有等到明日，今日继续)
   1. 利用数组求斐波那契数列
     ```javascript
      const arr=[];
      arr[1]=1;
      arr[2]=1;
      for(let i=3;i<20;i++){
        arr[i] = arr[i-2]+arr[i-1];
      }
      for(let i=1;i<arr.length;i++){
        console.log(arr[i]);
      }
   ```
  2. 在数组开头插入元素
  ```js
        Array.prototype.insertFirstPosition = function(value){
        for(let i = this.length;i>=0;i--){
        this[i]=this[i-1];
        }
        this[0]=value;
        }
        const numbers = [1,2,4]
        numbers.insertFirstPosition(-1);
        console.log(numbers);
  ```
  3.删除数组的第一个元素
   ```js
     let numbers = [1,2,3,4,5];
     Array.prototype.reIndex = function(myArray){
      const newArr = [];
      for(let i=0;i<myArray.length;i++){
        if(myArray[i]!==undefined){
          newArr.push(myArray[i])
        }
      }
      return newArr;
    }
  
    Array.prototype.removeFirstPosition = function(){
      for (let i = 0; i < this.length; i++) {
        this[i]=this[i+1];
      }
      return this.reIndex(this)
    };
    numbers = numbers.removeFirstPosition();
    console.log(numbers);
  ```
  4. 遍历二维数组
    ```js
          let averageTemp = [];
    // day 1
    averageTemp[0] = [];
    averageTemp[0][0] = 72;
    averageTemp[0][1] = 75;
    averageTemp[0][2] = 79;
    averageTemp[0][3] = 79;
    averageTemp[0][4] = 81;
    averageTemp[0][5] = 81;
    // day 2
    averageTemp[1] = [];
    averageTemp[1][0] = 81;
    averageTemp[1][1] = 79;
    averageTemp[1][2] = 75;
    averageTemp[1][3] = 75;
    averageTemp[1][4] = 73;
    averageTemp[1][5] = 73;
    console.log(averageTemp);
    function printMatrix(myMatrix){
      for(let i = 0; i<myMatrix.length;i++){
        for(let j=0;j<myMatrix[i].length;j++){
          console.log(myMatrix[i][j]);
        }
      }
    }
    printMatrix(averageTemp);
   console.table(averageTemp); //它会显示一个更加友好的输出结果
  ```
  5. js数组常用方法
  ![pic](https://jsd.cdn.zzko.cn/gh/Justice996/picx-images-hosting@master/DataStructureAndalgorithm/1695260589327.kfxpwsgtrl8.webp)
  6. 数组合并concat方法，concat方法可以向一个数组传递数组、对象或是元素。数组会按照该方法传入的参数顺序连接指定数组。
    ```js
      const zero = 0;
      const positiveNumbers = [1,2,3];
      const negativeNumber = [-3,-2,-1];
      let numbers= negativeNumber.concat(zero,positiveNumbers);
      console.log(numbers);
    ```
   7. 迭代器函数
     every some foreach map fifter reduce

   8. ES2015和ES2016新增的数组方法
      ![1695263963200](https://jsd.cdn.zzko.cn/gh/Justice996/picx-images-hosting@master/DataStructureAndalgorithm/1695263963200.40wce4zodes0.webp)

   9.栈数据结构
     - 使用js数组实现
       ```js
                 class Stack{
                 constructor() {
                 this.items = [];
                 }
                 push(element){
                 return this.items.push(element)
                 }
                 pop(){
                 this.items.pop();
                 }
                 peek(){
                 return this.items[this.items.length-1]
                 }
                 isEmpty(){
                 return this.items.length === 0;
                 }
                 size(){
                 return this.items.length;
                 }
                 clear(){
                 this.items = []
                 }
                 };
                 const stack = new Stack();
                 console.log(stack.isEmpty());
                 stack.push(5);
                 stack.push(8);
                 console.log(stack.peek());
                 stack.push(11);
                 console.log(stack.size());
                 console.log(stack.isEmpty());
                 stack.push(15);
                 stack.pop();
                 stack.pop();
                 console.log(stack.size());
       ```

     - 使用js对象实现
       ```js
       class Stack {
       constructor() {
       this.count = 0;
       this.items = {};
       }
       push(element){
       this.items[this.count] = element;
       this.count++;
       console.log(this.count,this.items);
       }
       size(){
       return this.count;
       }
       isEmpty(){
       return this.count ===0;
       }
       pop(){
       if(this.isEmpty()){return undefined};
       this.count--;
       console.log(this.count);
       const result = this.items[this.count];
       delete this.items[this.count];
       return result;
       }
       peek(){
       //访问栈顶元素
       if(this.isEmpty()){
       return undefined;
       }
       return this.items[this.count - 1];
       }
       clear(){
       // 直接重置
       this.items ={};
       this.count = 0;
       return this.items;
       }
       clear1(){
       // 按照后入先出的方式重置
       while(this.isEmpty()){
       this.pop()
       }
       console.log(this.items);
       }
       toString(){
       //返回字符串
       if(this.isEmpty()){
       return '';
       }
       let objString = `${this.items[0]}`;
       for(let i = 1;i<this.count;i++){
       objString = `${objString},${this.items[i]}`
       }
       return objString;
       }
       };
       const stack = new Stack();
       stack.push(5);
       stack.push(8);
       stack.push(11);
       stack.push(33);
    
           console.log(Object.getOwnPropertyNames(stack));
           console.log(Object.keys(stack));
           console.log(stack.items);
    
           console.log(stack.toString());
           // 二进制转换为十进制
       function decimalToBinary(decNumber){
         const remStack = new Stack();
         let number = decNumber;
         let rem;
         let binaryString = ''
    
         while (number>0){
           rem = Math.floor(number%2);
           remStack.push(rem);
           number = Math.floor(number/2);
         }
         while(!remStack.isEmpty()){
           binaryString += remStack.pop().toString();
         }
         return binaryString;
       }
       console.log(decimalToBinary(233));
       console.log(decimalToBinary(10));
       console.log(decimalToBinary(1000));
       console.log(decimalToBinary(8.1));
       ```
