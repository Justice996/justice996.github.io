### 往githug提交代码，总是超时，可以配置代理

查看代理

```bash
   git config --global http.proxy
   git config --global https.proxy
```

设置代理

```bash
   git config --global http.proxy
   git config --global https.proxy
```

取消代理

```bash
   git config --global http.proxy 127.0.0.1:10808
   git config --global https.proxy 127.0.0.1:10808
```

需要自己有代理，然后才能配置。配置成功后就可以愉快的往github提价代码了！
