### Metasploit基本使用

1. 是什么
Metasploit 是使用最广泛的开发框架。Metasploit 是一个强大的工具，可以支持渗透测试的所有阶段，从信息收集到后利用。
Metasploit 是一个流行的开源渗透测试框架，旨在帮助安全专业人员执行网络安全评估和渗透测试。它由 Rapid7 公司维护和支持。Metasploit 具有广泛的功能，可用于开发、测试和执行针对计算机系统的安全漏洞的攻击，以评估其安全性。
该框架包含大量漏洞利用模块、Payloads（有效载荷）、Shellcodes（Shell代码）和其他工具，这些工具可用于发现、利用和修复计算机系统中的安全漏洞。Metasploit 具有易于使用的界面，同时也提供了一个强大的命令行接口，允许安全专业人员自定义和执行各种网络安全测试。
Metasploit 框架是一组工具，可用于信息收集、扫描、利用、利用开发、后利用等。虽然 Metasploit 框架的主要用途集中在渗透测试领域，但它对于漏洞研究和漏洞利用开发也很有用。
Metasploit 框架的主要目的是使安全测试更有效和更简单，并且它也被广泛用于安全培训、安全意识提高和研究方面。
2. 版本
Metasploit 有两个主要版本：
Metasploit Pro：商业版本，有助于任务的自动化和管理。该版本有图形用户界面（GUI）。
Metasploit Framework：从命令行运行的开源版本。安装在最常用的渗透测试 Linux 发行版上。

3. 主要组件
    - msfconsole：主命令行界面。
    - Modules：支持模块，例如漏洞利用、扫描器、有效负载等。
    - Tools：有助于漏洞研究、漏洞评估或渗透测试的独立工具。其中一些工具包括msfvenom、pattern_create 和pattern_offset。我们将在本模块中介绍 msfvenom，但pattern_create 和pattern_offset 是在漏洞利用开发中有用的工具。

4. 模块  
   使用 Metasploit Framework 时，主要与 Metasploit 控制台进行交互。可以使用 `msfconsole `命令从终端启动它。  
   在深入了解模块之前，有必要澄清一些经常出现的概念：漏洞、利用和有效载荷。    
     - 利用（Exploit）：利用目标系统上存在的漏洞的一段代码。
     - 漏洞(Vulnerability)：影响目标系统的设计、编码或逻辑缺陷。利用漏洞可能导致泄露机密信息或允许攻击者在目标系统上执行代码。
     - 有效载荷(Payload) :利用会利用漏洞(An exploit will take advantage of a vulnerability.)。但是，如果我们希望利用能够产生我们想要的结果（获取对目标系统的访问权限、读取机密信息等），我们需要使用有效载荷。有效载荷是将在目标系统上运行的代码。  


   以下是各模块类别及其所包含的模块列表。这些信息供参考，但您将通过 Metasploit 控制台（msfconsole）与它们进行交互。
     - Auxiliary(辅助模块)
         这里包含任何支持模块，如扫描器、爬虫和模糊测试器。
     - Encoders（编码器）
          编码器允许您对利用和有效载荷进行编码，希望基于签名的防病毒解决方案可能会忽略它们。  
     - Evasion（规避）
         虽然编码器会对有效载荷进行编码，但不应将其视为直接尝试规避防病毒软件。然而，“规避”模块将尝试以更多或更少成功的方式进行规避。  
     - Exploits（利用模块）
         按目标系统整齐地组织的利用模块。
     - NOPs（无操作）
        NOPs（No OPeration）实际上什么也不做。它们在 Intel x86 CPU 家族中以 0x90 表示，CPU 将在一个周期内不执行任何操作。它们通常用作缓冲区，以实现一致的有效载荷大小。
     - Payloads（有效载荷）
        有效载荷是将在目标系统上运行的代码。有四个不同的目录： 
        - Adapters
        - Singles
        - Stagers
        - Stages  
        Metasploit 有一种微妙的方式来帮助您识别单一（也称为“内联”）有效载荷和分段有效载荷。
    - Post（后期）
     在上述渗透测试过程的最后阶段，后期模块将会很有用。如果希望进一步熟悉这些模块，您可以在 Metasploit 安装的 modules 文件夹下找到它们.   

5. Msfconsole 基本命令  
  
    - `msfconsole` 启动msfconsole  
    - `ls` 列出使用该命令启动 Metasploit 的文件夹的内容  
    - `ping` 发送 ping  
    - `clear` 清除终端屏幕  
    - `help` help 命令可以单独使用，也可以用于特定命令例如`help set`  
    - `history` 查看之前输入的命令  
    - tab 支持制表符补全  
    - `use` 切换上下文 例如`use exploit/windows/smb/ms17_010_eternalblue`,`use` 也可以使用搜索结果行开头的命令后跟数字来选择要使用的模块  
    - `show options` 打印与我们选择的漏洞相关的选项,该show 命令可以在任何上下文中使用，后跟模块类型（辅助、有效负载、漏洞利用等）以列出可用模块。例如`show payloads`,如果在 msfconsole 提示符下使用，该show 命令将列出所有模块。  
    - `back` 离开上下文  
    - `info` 在其上下文中键入命令来获取有关任何模块的更多信息,您可以info 在 msfconsole 提示符下使用后跟模块路径的命令（例如`info exploit/windows/smb/ms17_010_eternalblue`）。信息不是帮助菜单；而是帮助菜单。它将显示模块的详细信息，例如作者、相关来源等  
    - `search` 最有用的命令之一,此命令将在 Metasploit 框架数据库中搜索与给定搜索参数相关的模块。您可以使用 CVE 编号、漏洞名称（eternalblue、heartbleed 等）或目标系统进行搜索，命令的输出 search 提供了每个返回模块的概述。您可能会注意到“名称”列已经提供了比模块名称更多的信息。您可以看到模块的类型（辅助、漏洞利用等）和模块的类别（扫描仪、管理、Windows、Unix 等）。您可以通过命令 use 后跟结果行开头的数字来使用搜索结果中返回的任何模块。（例如use 0 代替use auxiliary/admin/smb/ms17_010_command）  
    - `set PARAMETER_NAME VALUE` 设置参数  
    - `unset` 使用该命令清除任意参数值例如`rhosts`或使用该命令清除所有设置的参数`unset all`  
    - `setg` 设置将用于所有模块的值, 使用方式与 set 命令类似  
    - `unsetg` 清除任何设置的值  
    - `exploit` 启动模块 （该 exploit 命令可以不带任何参数使用，也可以使用“ -z”参数。该exploit -z 命令将在会话打开后立即运行漏洞利用程序并将其置于后台。）  
    - `check` 这将检查目标系统是否容易受到攻击而不利用它  
    - `sessions` 命令来查看现有会话(一旦漏洞被成功利用，就会创建一个会话。这是目标系统和Metasploit之间建立的通信通道。),要与任何会话交互，您可以使用该sessions -i 命令，后跟所需的会话号。(例如:session -i 2)  
    - `background` 使会话提示符后台化并返回到 msfconsole 提示符 

6. Metasploit具有数据库功能，可以简化项目管理并避免设置参数值时可能出现的混乱
  - `systemctl start postgresql` 启动数据库
  - `msfdb init`  然后初始化 Metasploit 数据库
  - `db_status` 检查数据库状态(启动 msfconsol后才能使用)
  - `workspace` 列出可用的工作区(首次启动时，您应该位于默认工作区,`-a`参数添加工作区或使用该参数删除工作区`-d`,切换工作区，workspace后面加工作区的名称。`-h`命令列出该workspace 命令的可用选项)。  
  - ` db_nmap -sV -p- 10.10.12.229`  如果您使用如下所示运行Nmapdb_nmap扫描，所有结果都将保存到数据库中。  
  - `hosts`  现在，您可以分别使用和 命令获取与目标系统上运行的主机和服务相关的信息services ,hosts -h和 命令services -h可以帮助您更加熟悉可用的选项,一旦主机信息存储在数据库中，您就可以使用命令`hosts -R `将此值添加到 RHOSTS 参数中。  

7. 工作流程
  - 我们将使用漏洞扫描模块通过use auxiliary/scanner/smb/smb_ms17_010命令查找潜在的 MS17-010 漏洞。  
  - 我们使用设置 ROSTS 值hosts -R。
  - 我们已键入 show options以检查所有值是否已正确分配。（在本例中，10.10.138.32是我们之前使用命令扫描到的IP地址db_nmap）  
  - 设置完所有参数后，我们使用run or exploit 命令启动漏洞利用程序。