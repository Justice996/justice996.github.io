### 被动侦察
1. 什么是被动侦察  
被动侦察（Passive reconnaissance）是指在网络安全和信息安全领域中，通过收集公开可用的信息而不直接与目标系统进行互动或发送任何请求的一种侦察技术。这种技术侧重于从外部收集数据和信息，以获取有关目标系统、网络或实体的信息，而无需直接与其进行交互。
被动侦察的方式可能包括但不限于以下内容：
搜索引擎探索： 使用搜索引擎，如 Google、Bing 等，搜索目标公司、域名或关键词，收集公开可用的信息，例如网站页面、子域名、员工名单等。
网络信息收集工具： 使用一些专门的工具或技术来收集目标网络的信息，例如 WHOIS 查询、域名枚举、网络映射工具等。
社交媒体和公开资源： 通过社交媒体平台、招聘网站、论坛以及公开的报告和新闻，搜集与目标组织、员工或系统相关的信息。
Passive DNS 查询： 通过查询公共 DNS 服务器的记录来查找域名与 IP 地址的关联。
被动侦察的重点在于通过搜集公开信息，不触发目标系统或网络的警报或日志，以避免暴露侦察行为。这些收集到的信息可以用于进一步的侦察活动，帮助黑客或安全专业人员了解目标系统并制定更有针对性的攻击或保护策略。在网络安全中，了解自己的信息暴露程度以及对手可能获取的信息非常重要，被动侦察是这个过程中的一部分。

2. 常用命令行工具
 - whois查询 WHOIS 服务器
 - nslookup查询DNS服务器
 - dig查询DNS服务器
 - 常用命令
    |  目标   | 命令行示例  |
    |:--------------------------------------------:|:--------------------------------------------:|
    | 查询 WHOIS 记录              | `whois tryhackme.com`                        |
    | 查询 DNS A 记录              | `nslookup -type=A tryhackme.com`             |
    | 在 DNS 服务器中查询 DNS MX 记录 | `nslookup -type=MX tryhackme.com 1.1.1.1`  |
    | 查询 DNS TXT 记录             | `nslookup -type=TXT tryhackme.com`          |
    | 查询 DNS A 记录              | `dig tryhackme.com A`                        |
    | 在 DNS 服务器中查询 DNS MX 记录 | `dig @1.1.1.1 tryhackme.com MX`            |
    | 查询 DNS TXT 记录             | `dig tryhackme.com TXT`                     |

3. 常用网站
   - [shodan]( https://www.shodan.io/ )是用来搜索网络空间中在线设备   
   使用指南 参考：[Shodan新手使用指南](https://blog.csdn.net/wxh0000mm/article/details/88884165)
   - [DNSdumpster.com](https://dnsdumpster.com/)是一个免费的域研究工具，可以发现与域相关的主机。从攻击者的角度查找可见主机是安全评估过程的重要组成部分   
      