-----

-----

vite查看本地代理的实际地址，主要关注configure参数
```javascript  
  proxy: {
        '/aaa': {
          target: '',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/aaa/, ''),
          configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            const targetHost = proxyReq.getHeader('host');
            const path = proxyReq.path;
            const method = req.method;
            console.log(`[代理请求] ${method} ${req.url} → http://${targetHost}${path}`);
          });
        }
        },
      },
```

webpack中,这样会写入到请求头，在浏览器控制台响应头中可以看到x-real-url1参数
```javascript
"/xx": {
            target: 'http://xxx.xxx.xx.xx:xx',
            changeOrigin: true,
            //浏览器控制台查看
            onProxyRes(proxyRes, req, res) {
            //这里的req.url是经过路径重写后的url
                 const realUrl = new URL(req.url || '', 'http://xxx.xx.xx.xx:xx')?.href || '';
                 proxyRes.headers['x-real-url1'] = realUrl;
            },
            pathRewrite: {
                 '^/xxx': '/bbb'
            }
        }
```