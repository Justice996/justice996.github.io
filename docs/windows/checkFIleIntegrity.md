### Windows自带工具本地验证文件完整性

```bash
  $ certutil -hashfile  <文件名>  <hash类型>
  //举例
  $ certutil -hashfile  word.txt  sha256 
```

参考文章：[Windows自带工具本地验证文件md5，sha256值](https://blog.csdn.net/qq_42936379/article/details/134022001)