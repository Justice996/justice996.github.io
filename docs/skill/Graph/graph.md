### 图
> 图是网络结构的抽象模型。图是一组由边连接的节点（或顶点）。学习图是重要的，因为任何二元关系都可以用图来表示。

一个图G=(V, E)由以下元素组成。  
❑ V：一组顶点  
❑ E：一组边，连接V中的顶点  

图的一些术语:  
1. 由一条边连接在一起的顶点称为```相邻顶点```,一个顶点的度是其相邻顶点的数量。  
2. ```路径```是顶点v 1, v2,…, vk的一个连续序列，其中vi和vi+1是相邻的，简单路径要求不包含重复的顶点。如果图中不存在环，则称该图是无环的。如果图中每两个顶点间都存在路径，则该图是连通的。
3. 如果图中每两个顶点间在双向上都存在路径，则该图是强连通的。例如，C和D是强连通的，而A和B不是强连通的。
4. 图还可以是未加权的（目前为止我们看到的图都是未加权的）或是加权的
5. 邻接表由图中每个顶点的相邻顶点列表所组成。

用邻接表的方式实现图数据结构:  
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
// // 创建了一个数组，包含所有想添加到图中的顶点
const myVertices = ['A','B','C','D','E','F','G','H','I'];
// // 遍历myVertices数组并将其中的值逐一添加到我们的图中
for(let i = 0;i<myVertices.length;i++){
    graph.addVertex(myVertices[i])
}
// // 添加想要的边
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
// console.log(graph.toString());


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



// 当要标注已经访问过的顶点时，我们用三种颜色来反映它们的状态。❑ 白色：表示该顶点还没有被访问。❑ 灰色：表示该顶点被访问过，但并未被探索过。❑ 黑色：表示该顶点被访问过且被完全探索过。
const Colors = {
    WHITE:0,
    GREY:1,
    BLACK:2
}
// 初始化每个顶点的颜色
const initializeColor = vertices =>{
    const color = {};
    for(let i=0;i<vertices.length;i++){
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
}
// 广度优先搜索
const breadthFirstSearch = (graph,startVertex,callback)=>{
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    // 用initializeColor将color数组初始化为白色
    const color = initializeColor(vertices);
    // 声明和创建一个queue实例
    const queue = new Queue();
    // breadthFirstSearch方法接收一个图实例和顶点作为算法的顶点作为算法的起始点,将此顶点入队列
    queue.enqueue(startVertex);
    // 如果队列非空
    while(!queue.isEmpty()){
        // 我们将通过出队列操作从队列中移除一个顶点
        const u = queue.dequeue();
        // 取得一个包含其所有邻点的邻接表
        const neighbors = adjList.get(u);
        // 该顶点将被标注为灰色，表示我们发现了它
        color[u] = Colors.GREY;
        // 对于u的每个邻点，我们取得其值（该顶点的名字——行{9}）
        for(let i = 0;i<neighbors.length;i++){
            const w = neighbors[i];
            // 如果它还未被访问过(颜色为白色—)
            if(color[w] === Colors.WHITE){
                // 则将其标注为我们已经发现了它（颜色设置为灰色)
                color[w] = Colors.GREY;
                //并将这个顶点加入队列
                queue.enqueue(w);
            }

        }
        // 当完成探索该顶点和其相邻顶点后，我们将该顶点标注为已探索过的（颜色设置为黑色——行{13}）。
        color[u] = Colors.BLACK;
        // 如果我们传递了回调函数（行{14}），就会用到它。
        if(callback){
            callback(u);
        }
    }
}
// 使用BFS寻找最短路径
const BFS =(graph,startVertex)=>{
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();
    const distances = {}; //声明数组distances来表示距离
    const predecessors = {};// 声明predecessors数组（行{2}）来表示前溯点
    queue.enqueue(startVertex);
    // 遍历图中的每一个顶点
    for (let i = 0; i < vertices.length; i++) {
        // 用0来初始化数组distances
        distances[vertices[i]]=0;
        // 用null来初始化数组predecessors
        predecessors[vertices[i]] = null;
    }
    while(!queue.isEmpty()){
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for(let i=0;i<neighbors.length;i++){
            const w = neighbors[i];
            if(color[w] === Colors.WHITE){
                color[w] = Colors.GREY;
                distances[w] = distances[u] +1;
                // 当我们发现顶点u的邻点w时，则设置w的前溯点值为u
                predecessors[w] = u;
                queue.enqueue(w);
            }
        }
        color[u] = Colors.BLACK
    }
    return {
        distances,
        predecessors
    }
}
class Stack {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(element){
        this.items[this.count] = element;
        this.count++;
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


const printVertex = value=>console.log('Visited vertex:'+value);
breadthFirstSearch(graph,myVertices[0],printVertex);

const shortestPathA = BFS(graph,myVertices[0]);
console.log(shortestPathA);
//  获取顶点A到图中其他顶点的最短路径
const fromVertex = myVertices[0];
for (let i = 1; i < myVertices.length; i++) {
    const toVertex = myVertices[i];
    const path = new Stack();
    for(let v = toVertex;v!==fromVertex;v=shortestPathA.predecessors[v]){
        path.push(v);
    }
    path.push(fromVertex);
    let s = path.pop();
    while(!path.isEmpty()){
        s+= '-'+path.pop();
    }
    console.log(s);
}
```
2023-11-06看到这里的时候几乎已经要放弃了，感觉树和图太难了，希望能不放弃，加油！
