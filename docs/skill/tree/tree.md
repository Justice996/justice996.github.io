### 树
> 树是一种分层数据的抽象模型。现实生活中最常见的树的例子是家谱，或是公司的组织架构图。  


1. 二叉树和二叉搜索树
 > 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。这个定义有助于我们写出更高效地在树中插入、查找和删除节点的算法。
 > 二叉搜索树（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。
 
2. 创建二叉搜索树
 ```javascript
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
    return a<b? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }
      class Node{
        constructor(key){
            this.key = key; // 节点值
            this.left = null; // 左侧子节点引用
            this.right = null; // 右侧子节点引用
        }
      }
      // 二叉搜索树（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。
      class BinarySearchTree{
        constructor(compareFn = defaultCompare){
          this.compareFn = compareFn; // 用来比较节点值
          this.root = null; // Node类型的根节点
        }
        // 向树中插入一个新的键
        insert(key){
            // 尝试插入的树节点是否为第一个节点
            if(this.root == null){
              //创建一个Node类的实例并将它赋值给root属性来将root指向这个新节点
                this.root = new Node(key);
            }else{
                // 将节点添加到根节点以外的其他位置。在这种情况下，我们需要一个辅助方法（行{3}）来帮助我们做这件事，它的声明如下。
                // 如果树非空，需要找到插入新节点的位置。因此，在调用insertNode方法时要通过参数传入树的根节点和要插入的节点。
                this.insertNode(this.root,key);
            }
        }
        insertNode(node, key) {
          // 如果新节点的键小于当前节点的键 如果新节点的键小于当前节点的键
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) { 
        // 如果它没有左侧子节点
        if (node.left == null) { 
          // 就在那里插入新的节点
          node.left = new Node(key); 
        } else {
          // 如果有左侧子节点，需要通过递归调用insertNode方法 继续找到树的下一层
          this.insertNode(node.left, key); 
        }
      } else {
        // 如果节点的键比当前节点的键大，同时当前节点没有右侧子节点
        if (node.right == null) { 
          // 就在那里插入新的节点
          node.right = new Node(key); // {9}
        } else {
          // 如果有右侧子节点，同样需要递归调用insertNode方法，但是要用来和新节点比较的节点将会是右侧子节点（右侧节点子树）
          this.insertNode(node.right, key); // {10}
        }
      }
    }
    // 如何遍历 二叉搜索树

    //中序遍历 从最小到最大的顺序访问所有节点 中序遍历的一种应用就是对树进行排序操作
    inOrderTraverse(callback){
       // inOrderTraverse方法接收一个回调函数作为参数。回调函数用来定义我们对遍历到的每个节点进行的操作
      this.inOrderTraverseNode(this.root,callback);
    }
    inOrderTraverseNode(node,callback){
    console.trace();
      // 检查以参数形式传入的节点是否为null（这就是停止递归继续执行的判断条件，即递归算法的基线条件）
      if(node !=null){
        // 递归调用相同的函数来访问左侧子节点
        // debugger
        this.inOrderTraverseNode(node.left,callback);
        // 接着对根节点 进行一些操作（callback）
        callback(node.key); 
        // // 然后再访问右侧子节点
        this.inOrderTraverseNode(node.right,callback); 
      }
    }
      }
    const tree = new BinarySearchTree();
    tree.insert(11);
    tree.insert(7);
    tree.insert(15);
    tree.insert(5);
    tree.insert(3);
    tree.insert(9);
    tree.insert(8);
    tree.insert(10);
    tree.insert(13);
    tree.insert(12);
    tree.insert(14);
    tree.insert(20);
    tree.insert(18);
    tree.insert(25);
    tree.insert(6);
    console.log(tree);
    const printNode = console.log
    tree.inOrderTraverse(printNode)
```
