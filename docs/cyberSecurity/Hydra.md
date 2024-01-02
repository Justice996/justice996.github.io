### Hydra 
1. 是什么
Hydra是一款密码破解工具，广泛用于暴力破解各种网络服务的登录密码。它能够尝试多种不同的用户名和密码组合来尝试登录到服务，如SSH、FTP、HTTP等，并可根据指定的字典文件或自定义的密码列表进行尝试。

2. 常用参数

    | 选项              | 解释                                       |
    |-------------------|--------------------------------------------|
    | -l username       | 提供登录名                                  |
    | -P WordList.txt   | 指定要使用的密码列表                        |
    | server service    | 设置要攻击的服务器地址和服务                |
    | -s PORT           | 在非默认服务端口号的情况下使用              |
    | -V 或 -vV         | 显示正在尝试的用户名和密码组合              |
    | -d                | 如果详细输出没有帮助，则显示调试输出        |
  
3. 命令示例  
`hydra -l username -P wordlist.txt server service`  
`hydra -l lazie -P /usr/share/wordlists/rockyou.txt 10.10.246.233 imap` 


