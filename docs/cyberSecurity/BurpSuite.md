### Burp Suite 基本使用
1.是什么
- 从本质上讲，Burp Suite 是一个基于 Java 的框架，旨在作为进行 Web 应用程序渗透测试的综合解决方案。它已成为对 Web 和移动应用程序进行实际安全评估的行业标准工具，包括那些依赖于应用程序编程接口(API)的应用程序。
- 简而言之，Burp Suite 捕获并支持对浏览器和 Web 服务器之间的所有 HTTP/HTTPS 流量进行操作。这一基本功能构成了框架的支柱。通过拦截请求，用户可以灵活地将它们路由到 Burp Suite 框架内的各种组件。

2. 切换导航快捷键  

|  快捷键   | 标签 | 
|  :----:  | :----:  |
| `Ctrl + Shift + D`  | Dashboard |
| `Ctrl + Shift + T`  | Target tab |
| `Ctrl + Shift + P`  | Proxy tab |
| `Ctrl + Shift + I`  | Intruder tab |
| `Ctrl + Shift + R`  | Repeater tab |

3.Intruder 是 Burp Suite 的内置模糊测试工具，允许自动修改请求并通过输入值的变化进行重复测试。