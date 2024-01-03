### 树莓派4B安装nodejs

1. `curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -`   # 10.x是版本号可以改成你想安装的
2. `sudo apt install nodejs`
3. `nodejs` -v  # 大坑我安装的是20版本的node不知道为什么使用node不能运行 要使用nodejs
4. npm如果找不到可以执行
 `which npm`  我获取到的路径是`/usr/bin/npm` 
 获取到路径后 执行 alias npm='/usr/bin/npm'  
 之后用npm就可以运行了