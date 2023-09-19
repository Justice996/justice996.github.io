### 开始
一共15章 
第一、二章简单介绍了js基础语法，略读一下

- 第三章数组 (前面略读了一下，看不下去了，明日再看,没有等到明日，今日继续)
   1.利用数组求斐波那契数列
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
