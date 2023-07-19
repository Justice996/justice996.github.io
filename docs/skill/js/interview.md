## 前端面试题

1. CSS相关：
  - 各种选择器的优先级，看代码说出最后的样式结果
  - 怎么开启动画加速，底层原理是什么
  - css实现一个三角形，画一个每条线的线宽是1px的三角形呢？
  - 常见的水平垂直方式有几种
  - 标准盒模型和怪异盒模型的理解
  - Flex常见的属性  flex：1代表什么
  - Rem你是怎么做适配的
  - 媒体查询是什么
  - 首屏性能优化你是怎么做的
  - 说一下bfc bfc有什么优缺点
  - inline 元素中哪些属性生效：width、height、padding、margin
  - relative 元素是怎么定位的
  - flex布局怎么实现左边固定 右边自适应
  - 了解伪元素和伪类吗
  - 

2. JS 相关：
  - js有哪几种数据类型
  - 浏览器的重排和重绘
  - 闭包的优缺点
  - 标记垃圾回收
  - var如何模拟let
  - undefined == null 返回什么？为什么？<https://juejin.cn/post/6844904117723201544>
  - 什么是原型什么是原型链
  - 手写代码，实现继承，es5的构造函数那种继承。说一下每行代码为啥这么写
  - 为什么数组长度能任意变化？
  - 数组flat和flatMap区别
  - 怎么做文件上传和断点续传
  - 函数的 name 属性，看代码说输出，name 属性能手动修改吗
    ```js
    function a(){}
    a.name // "a"
    const a = function(){}
    a.name // ES5中为"", ES6 中为 "a"
    window.a = function(){}
    a.name // ES5中为"a", ES6 中为 ""
    const a = function b(){}
    a.name // "b"
    window.a = function b(){}
    a.name // "b"
    // 修改
    a.name = '1111'
    a.name // 不变，还是"b"
    ```
  - new 的过程中发生了什么，实现一个简单的 new，注意顺序
  - ES6 默认开启尾递归优化，其原理是什么，为什么能优化
  - 用 ES5 实现 const：defineProperty
  - 实现一个有节流效果的轮询函数
  - 实现一个类，其实例可以链式调用，它有一个 sleep 方法，可以 sleep 一段时间后再后续调用
    ```js
     const boy = new PlayBoy('Tom') 
     boy.sayHi().sleep(1000).play('王者').sleep(2000).play('跳一跳')
     // 输出
     // 大家好我是Tom
     // 1s 之后
     // 我在玩王者
     // 2s 之后
     // 我在玩跳一跳
    ```
   - async/await 的错误怎么捕获
   - 实现 Promise.all 和 Promise.race
   - 实现一个能顺利执行 next 中间件的函数：函数柯里化
   - Promise的原型方法、静态方法
   - 有数组var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];如果通过如下代码将其随机打乱顺序，是否可行？为什么
     arr.sort(function() { return Math.random() - 0.5 })
   - 箭头函数和普通函数有什么区别?
   - New操作符做了什么事情?
   - 说一下eventloop,为什么要引入宏任务和微任务 <https://segmentfault.com/a/1190000016278115>
   - 什么是闭包，闭包的作用是什么
   - Promise是什么?
   - Set 和 Map有什么区别？
   - map和foreach有什么区别?
   - localStorage  sessionStorage  cookies 有什么区别?
   - Es6常见的语法你知道哪一些
   - 哪些情况会导致内存泄漏
   - 说一下常见的检测数据类型的几种方式?
   - 说一下slice splice split 的区别?
   - 说一下怎么把类数组转换为数组?
   - 说一下数组如何去重,你有几种方法?
   - 说一下怎么取出数组最多的一项？
   - 说一下JSON.stringify有什么缺点？
   - 说一下for...in 和 for...of的区别?
   - 说一下类组件和函数组件的区别?
   - addEventListener 的执行顺序
   - ```js
        for (var i = 0; i < 6; i++) {
        setTimeout(() => {
        console.log(i);
        }, 1000);
        }
        
        // 问题1：输出结果是什么？为什么
        // 问题2：请改造成正确的输出
        // 问题3：请改造成 1->2->3->4->5 每个输出都等待 1s
     ``` 
   - 输出什么
     ```js
        var length = 10;
        function fn() {
          return this.length + 1;
        }
        var obj = {
          length: 5,
          test1: function() {
            return fn();
          }
        };
        obj.test2 = fn;
        
        console.log(obj.test1.call());
        console.log(obj.test1());
        console.log(obj.test2.call());
        console.log(obj.test2());
     ```


  - const arr1 = [1,2,3,4,5] const arr2 = arr1.push(6)为什么不违背设计原理
  - babel是怎么做到es6转es5的
  - webSocket通信如何处理安全性？
   

3. Vue相关:
   - 手写 h 函数实现
   - vue和js jq的区别
   - 如何理解数据驱动视图
   - 组件封装的原则
   - vue中diff算法的优缺点
   - Vue的生命周期是什么 每个钩子里面具体做了什么事情
   - 组件之间的传值有几种方式
   - Eventbus具体是怎么实现的
   - 父组件到子组件更新的方式是什么样的
   - vue2的双向绑定简单说一下？
   - Hash和history有什么区别 <https://juejin.cn/post/6993840419041706014>
   - v-model语法糖是怎么实现的
   - 虚拟 DOM 的好处：函数式编程模式、多端渲染
   - defineProperty的缺点是什么
   - 当我们在vue中同时对多个数据进行了操作，dom是更新多次还是更新一次?它是怎么知道我后续没有更新的操作了呢？如果我一个操作是正常的同步操作，另一个操作放在setTimeout里面，会更新几次？
   - Vue 的插件机制，底层原理是什么
   - Vue2 和 Vue3 响应式实现上的区别，为什么要改动
   - 写一个 Vue 输入框组件，有防抖功能，并处理父子组件传参
   - Vue router 路由守卫的钩子和使用场景
   - Vue nextTick 的用法和底层实现原理
   - Vue3 的优化点有哪些
   - Vue3 移除了 .native 事件修饰符，我们怎么去写原生事件？
   - Vue 中 computed 的设计动机以及底层实现
   - Vue 模板是如何编译的
   - Vue router 底层原理，不同模式的区别，history 路由刷新页面 404 的原因和解决方法
   - Vue 项目中的 Model 层设计
   - Vuex 中的变量打包之后存在哪里？和全局作用域中的变量有什么区别
   - Vue 中 CSS scoped 的原理
   - Vue 中 keep-alive 的实现原理，内部使用的缓存算法是什么，缓存的是什么，里面有哪些钩子
   - $set 的使用场景
   - 用过vue-router吗？比如说我们切换路由的时候，它是怎么实现组件的替换的？监听path怎么实现替换组件的？
   - Vuex有哪些基本属性?为什么 Vuex 的 mutation 中不能做异步操作?actions 和 mutations 的区别，actions 是直接修改状态吗
   - 计算属性和watch有什么区别?以及它们的运用场景?
   - 插槽是什么 怎么使用的
   - 自定义指令你是怎么用的
   - 怎么解决白屏问题
   - Vue的父子组件生命周期钩子函数执行顺序？
   - 说一下data为什么是一个函数而不是一个对象?
     JavaScript中的对象是引用类型的数据，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会发生变化。而在Vue中，我们更多的是想要复用组件，那就需要每个组件都有自己的数据，这样组件之间才不会相互干扰。所以组件的数据不能写成对象的形式，而是要写成函数的形式。数据以函数返回值的形式定义，这样当我们每次复用组件的时候，就会返回一个新的data，也就是说每个组件都有自己的私有数据空间，它们各自维护自己的数据，不会干扰其他组件的正常运行。
   - 说一下vue3.0你了解多少?
   - babel的工作流程，babel在traverser的时候使用了什么设计模式

4. webpack相关
    - webpack tree shaking 原理
    - webpack babel 配置：语法层面的和 API 层面的
    - webpack loader 和 plugin，有什么区别,实现原理
    - webpack执行流程和生命周期，让你实现一系列的生命周期怎么实现
    - webpack 打包过程
    - webpack 有哪些可优化的地方（构建速度和包体积），具体怎么优化
    - webpack的loader和plugin的,和有没有开发过loader和plugin

5. 网络相关
    - 输入 URL 之后发生了什么，HTML 文件中 CSS 文件和 JS 文件的加载顺序，会阻塞页面渲染吗
    - DNS 查询过程
    - DNS缓存流程
    - 七层网络协议
    - websocket 的好处，怎么建立连接，心跳机制怎么做，错误怎么处理
    - webRTC 和 WebAssembly 了解吗
    - websocket 和 轮询的区别
    - postMessage 使用场景
    - cookie 的有效时间设置为 0 会怎么样
    - PUT 方法的优点，什么时候用 PUT
    - HTTP2 的改进点
    - HTTP3 使用的传输层协议是什么，怎么保证可靠性
    - HTTPS 为什么安全
    - http和https的区别
    - https加密过程
    - 非对称加密和对称加密的区别
    - UDP和TCP有什么区别
    - content-length 的含义
    - http3 使用的 tcp 协议还是 udp
    - 三次握手是什么？每个过程的状态是什么？
    - 说一下常见的HTTP状态码?说一下状态码是302和304是什么意思？你在项目中出现过么？你是怎么解决的？

6. 算法
   - 二叉树层级遍历
   - 给一个目标值，输出该目标值在二叉树中的路径
   - 有效括号
   - 合并两个有序列表/有序数组
   - 计算JSON的深度
   - const arr = [12,3,34,12,13,12,12,34,45,[12,123,34,23,12,3,5,[212,24,35,45,45]]
把求这个数组里面出现次数最多的元素,把元素和出现次数返回

7. 其他
   - 工程化的理解和实践思路
   - webRTC里的stun和turn的区别？
   - 数据存在硬盘和存在内存的区别？
   - 说一下换肤怎么实现？
   - 请用代码实现防抖和节流函数?
   - 用代码封装一个函数方法，随机交换数组内的元素
   - 用代码封装一个方法实现一个对象(对象里的属性值包含Array、object、String、Number等数据类型)的深拷贝。
   - 简述对xss、sql汪入、csp、csr的理解。
   - 用代码写一个正则表达式判断字符串是否为有效url(兼容http(s)瑞口)
   - 项目中常用的性能优化方式有哪些?
   - 怎么解决跨域问题的，你是怎么配置的
   - 重绘和重排
   - 浏览器的性能监控你是怎么做的
   - Diff算法是什么  ：key = index 为什么不常用数组的下标作为index  加了它有什么好处
   - 虚拟列表你是怎么实现的
   - 说一下SPA单页面有什么优缺点？
   - 说一下前端登录的流程?
     初次登录的时候，前端调后调的登录接口，发送用户名和密码，后端收到请求，验证用户名和密码，验证成功，就给前端返回一个token，和一个用户信息的值，前端拿到token，将token储存到Vuex中，然后从Vuex中把token的值存入浏览器Cookies中。把用户信息存到Vuex然后再存储到LocalStroage中,然后跳转到下一个页面，根据后端接口的要求，只要不登录就不能访问的页面需要在前端每次跳转页面师判断Cookies中是否有token，没有就跳转到登录页，有就跳转到相应的页面，我们应该再每次发送post/get请求的时候应该加入token，常用方法再项目utils/service.js中添加全局拦截器，将token的值放入请求头中 后端判断请求头中有无token，有token，就拿到token并验证token是否过期，在这里过期会返回无效的token然后有个跳回登录页面重新登录并且清除本地用户的信息
   -  说一下前端权限管理怎么实现 <https://blog.csdn.net/weixin_40599109/article/details/113728974>
   - 说一下常见的git操作
   - 聊下跨域，如何发送 cookie
   - 技术选型是怎么考虑的
   - 团队管理是怎么考虑的，举一个 case
   - React 和 Vue 的对比
   - 现在有一个网页打开很慢，要怎么定位
   - 实现 EventEmitter
   - 项目上线之前，有什么优化点？（从编码到上线过程都可以答）？
   - 骨架屏的核心原理
   - 图片懒加载核心概念
   - 负载均衡原理
   - 怎么理解函数式编程和面向对象编程？
   - 说一下你最近在学习的新技术，怎么学的,用到项目里了吗？
   - 对微前端有了解不，讲一下微前端发展，iframe-singlePA-qiankun，沙箱隔离
   - 对前端可视化的理解
   - 如果让你设局一个UI组件库，你会考虑哪些方面
   - 工程化的理解和实践思路
   - html5新特性 webworker的原理
   - vite的优缺点
   - 哪些操作可以阻塞页面渲染？
   - 计算拿到document代码到首屏完成渲染的事件
  

参考文章： <https://juejin.cn/post/7088883914005184525>
<https://juejin.cn/post/7073869980411887652>
<https://anonymity94.github.io/articles/2022-inverview.html#%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8>
