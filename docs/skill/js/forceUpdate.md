## vue中的$forceUpdate

官方文档中的定义:
> 迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

---
$forceUpdate就是重新``render``有些变量不在``data``上，但要这个变量更新的时候，重新（render），从而渲染虚拟DOM,注意这个时候并不是重新加载组件。<br/>
结合vue的生命周期，调用``$forceUpdate``后只会触发``beforeUpdate``和``updated``这两个钩子函数，不会触发其他的钩子函数。它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件，即强制更新因某些原因并未渲染到页面的，已经改变的，应该被渲染到页面的数据
data里的某个变量层次太深，更新的时候没有自动触发render。

---

1. 主要用来解决强制刷新视图和数据
2. 结合vue生命周期，调用$forceUpdate后会触发beforeUpdate和updated这两个钩子函数，不会触发其他钩子函数。

---
使用场景：
1. 数据层次太多， 数据修改了，但页面没有重新渲染；
2. 如果在vue的data中没有进行声明，给没声明的属性赋值（即非响应式的），不会引起vue实例的重新渲染。

>参考文章:$forceUpdate的使用详解<https://blog.csdn.net/muzidigbig/article/details/124247215><br/>
        vue中 $forceUpdate的使用解析<https://www.ibashu.cn/news/show_306296.html>
