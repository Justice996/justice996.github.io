## 前端如何禁止浏览器缓存 vue

1. 在index.html中添加
``` html {4}
<meta http-equiv="Expires" content="0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-control" content="no-store,no-cache,must-revalidate">
<meta http-equiv="Cache" content="no-cache">
```
2. 在vue.config.js中添加配置
``` js
module.exports = {
    configureWebpack: {
      output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
           filename: `js/[name].[hash].${version}.js`,
           chunkFilename: `js/[id].[hash].${version}.js`
      },
      }
  },
```

***
参考文章:
 HTTP缓存机制详解，如何完全禁止浏览器缓存网页数据？<https://juejin.cn/post/7074924039348699167>

 RFC 7234 - Hypertext Transfer Protocol (HTTP/1.1): Caching<https://datatracker.ietf.org/doc/html/rfc7234>

 轻松理解HTTP缓存策略<https://segmentfault.com/a/1190000038562294>

 理解http浏览器的协商缓存和强制缓存<https://www.cnblogs.com/tugenhua0707/p/10807289.html>



