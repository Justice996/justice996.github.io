### 图
> 图是网络结构的抽象模型。图是一组由边连接的节点（或顶点）。学习图是重要的，因为任何二元关系都可以用图来表示。


```javascript
 class Graph {
        // 构造函数可以接受一个参数表示图是否有向 默认是无向的
        constructor(isDirected=false){
          this.isDirected = isDirected;
          // 用一个数组来储存图中所有顶点的名字
          this.vertices = [];
          //用一个字典来存储邻接表(字典会使用顶点的名字作为键，邻接顶点作为值)
          this.adjList = new Dictionary();
        }
        //向图中添加一个新的顶点
        addVertex(v){
            //顶点不在图中时我们将该顶点添加到顶点列表中
          if(!this.vertices.includes(v)){
            // 将该顶点添加到顶点列表中
            this.vertices.push(v);
            //并在邻接表中,设置顶点v作为键对应的字典值为一个空数组
            this.adjList.set(v,[]);
          }
        }
        //添加顶点之间的边 接收两个顶点作为参数 也就是要建立连接的两个顶点
        addEdge(v,w){
            // 在连接顶点之前，需要验证顶点是否存在于图中
            if(!this.adjList.get(v)){
                // 如果顶点v不存在于图中，要将它们加入顶点列表
                this.addVertex(v);
            }
            if(!this.adjList.get(w)){
                // 如果顶点w不存在于图中，要将它们加入顶点列表
                this.addVertex(w)
            }
            // 通过将w加入到v的邻接表中，我们添加了一条自顶点v到顶点w的边
            this.adjList.get(v).push(w);
            if(!this.isDirected){
                // 本章中大多数的例子都是基于无向图的，我们需要添加一条自w到v的边
                this.adjList.get(w).push(v);
            }
        }
        // 返回顶点列表
        getVertices(){
            return this.vertices;
        }
        // 返回邻接表
        getAdjList(){
            return this.adjList;
        }
        toString(){
            let s = '';
            // 迭代vertices数组列表，将顶点的名字加入字符串中
            for(let i = 0;i<this.vertices.length;i++){
                s+=`${this.vertices[i]}->`;
                // 取得该顶点的邻接表
                const neighbors = this.adjList.get(this.vertices[i]);
                // 迭代该邻接表
                for(let j=0;j<neighbors.length;j++){
                    // 将相邻顶点加入我们的字符串
                   s+=`${neighbors[j]}`;
                }
                // 给我们的字符串添加一个换行符
                s+='\n';
            }
            return s;
        }
    }

    //字典类
    function defaultToString(item) {
            if(item === null){
                return 'NULL';
            }else if(item === undefined){
                return 'UNDEFINED'
            }else if(typeof item === 'string' || item instanceof String){
                return `${item}`
            }
            return item.toString();
        }
        class ValuePair {
            constructor(key,value){
                this.key = key;
                this.value = value;
            }
            toString(){
                return `[#${this.key}:${this.value}]`
            }
        }
      class Dictionary{
        constructor(toStrFn = defaultToString){
            this.toStrFn = toStrFn;
            this.table = {};
        }
        // 检测一个键是否在字典中
        hasKey(key){
          return this.table[this.toStrFn(key)] != null;
        }
        // 向字典中添加新元素 如果key已经存在,那么已存在的value会被新值覆盖
        set(key,value){
          if(key !=null && value !=null){
            const tableKey =this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key,value);
            return true;
          }
          return false;
        }
        // 从字典中移除一个值
        remove(key){
            if(this.hasKey(key)){
                delete this.table[this.toStrFn(key)];
                return true;
            }
            return false;
        }
        // 从字典中检索一个值
        get(key){
            const valuePair = this.table[this.toStrFn(key)];
            return valuePair ==null? undefined:valuePair.value;
        }
        get1(key){
            if(this.hasKey(key)){
                return this.table[this.toStrFn(key)];
            }
            return undefined;
        }

        keyValues(){
            return Object.values(this.table);
        }
        // 如果浏览器不支持Object.values方法 则可以用以下代码代替
        keyValues1(){
          const valuePairs =[];
          // 迭代了table对象的所有属性
          for(const k in this.table){
            // 判断保证key是存在
            if(this.hasKey(k)){
                // 将table对象中的valuePair加入结果数组
                valuePairs.push(k);
            }
          }
          return valuePairs;
        }
        // 将table对象中的valuePair加入结果数组
        keys(){
          return this.keyValues().map(valuePair=>valuePair.key)
        }
        // 不使用map实现
        keys1(){
          const keys = [];
          const valuePairs = this.keyValues();
          for (let i = 0; valuePairs.length; i++) {
            keys.push(valuePairs[i].key);
          }
        }
        // values方法返回一个字典包含的所有值构成的数组
        values(){
          return this.keyValues().map(valuePair=>valuePair.value)
        }
        // 迭代数据结构中每个值
       forEach(callbackFn){
        // 获取字典中所有valuePair构成的数组
        const valuePairs = this.keyValues();
        // 迭代每个valuePair
        for(let i=0;i<valuePairs.length;i++){
            // 执行以参数形式传入forEach方法的callbackFn函数
            const result = callbackFn(valuePairs[i].key,valuePairs[i].value);
            // 如果回调函数返回了false，我们会中断forEach方法的执行
            if(result === false){
                //打断正在迭代valuePairs的for循环
                break;
            }
        }

       }
       // 返回字典中的值的个数
       size(){
        return Object.keys(this.table).length;
       }
       // 检验字典是否为空
       isEmpty(){
        return this.size() ===0;
       }
       // 清空字典内容
       clear(){
        this.table = {};
       }
       //将字典转化成字符串返回
       toString(){
        // 如果字典为空，返回一个空字符串
        if(this.isEmpty()){
            return '';
        }
        const valuePairs = this.keyValues();
        // 将第一个valuePair加入结果字符串
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 0; i < valuePairs.length; i++) {
            // 如果数组中还有值，将其加入结果字符串
            objString = `${objString},${valuePairs[i].toString()}`;  
        }
        return objString;
       }
      }
const graph = new Graph();
// 创建了一个数组，包含所有想添加到图中的顶点
const myVertices = ['A','B','C','D','E','F','G','H','I'];
// 遍历myVertices数组并将其中的值逐一添加到我们的图中
for(let i = 0;i<myVertices.length;i++){
    graph.addVertex(myVertices[i])
}
// 添加想要的边
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A','D');
graph.addEdge('C','D');
graph.addEdge('C','G');
graph.addEdge('D','G');
graph.addEdge('D','H');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('E','I');
console.log(graph.toString());
```
