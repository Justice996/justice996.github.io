### 子域枚举

子域枚举是为域查找有效子域的过程，但我们为什么要这样做呢？我们这样做是为了扩大攻击面，尝试发现更多潜在的漏洞点。
我们将探索三种不同的子域枚举方法：暴力破解、OSINT（开源情报）和虚拟主机  

SSL/TLS 证书

当 CA（证书颁发机构）为域创建 SSL/TLS（安全套接字层/传输层安全）证书时，CA 会参与所谓的“证书透明度 (CT) 日志”。这些是为域名创建的每个 SSL/TLS 证书的可公开访问的日志。证书透明度日志的目的是阻止恶意和意外制作的证书被使用。我们可以利用此服务来发现属于某个域的子域，  https://crt.sh 和 https://ui.ctsearch.entrust.com/ui/ctsearchui 等网站 提供可搜索的证书数据库，显示当前的证书和历史结果。

1. 暴力枚举
 - 使用名为 dnsrecon 的工具来执行此操作  `dnsrecon -t brt -d acmeitsupport.thm`
 - 使用 Sublist3r 实现自动化 `./sublist3r.py -d acmeitsupport.thm`
2. 虚拟主机
  - `ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/namelist.txt -H "Host: FUZZ.acmeitsupport.thm" -u http://10.10.166.139 -fs {size}`