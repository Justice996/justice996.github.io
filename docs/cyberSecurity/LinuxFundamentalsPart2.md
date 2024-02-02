### linux常用命令2
1. 目录切换命令
```bash
   pwd #显示当前所在目录
   cd ~ #切换到主目录(home/pi),~可以省略不写
   cd dir #切换到指定文件夹 
   cd .. #切换到上一级目录
```

2. 文件展示命令

```bash
   ls #展示当前目录下所有的文件和文件夹(不包含隐藏文件)
   ls -a #展示当前目录下所有文件和文件夹(包含隐藏文件)
```

3. 文件操作命令
   - 创建文件
        ```bash
           touch file #创建文件file
           mkdir dir #创建目录dir
        ```
   - 查看文件
      ```bash
          cat file #查看文件file内容
          more file #查看文件file内容
          head file #查看文件file前十行
          tail file #查看文件file后十行
      ```
    - 删除文件
         ```bash
          rm file #s删除文件file
          rm -r dir 删除目录dir 
        ```
    - 重命名或移动
          ```bash
          mv file1 file2 #若file2不存在，则将file1改名为file2
                        #若file2存在 则file1覆盖掉原来的file2,并更名为file2
          mv file dir #将文件file移动到dir文件夹下 
          ```
4. 编辑器
  - nano编辑器
  ```bash
     nano file #使用nano编辑文件file,若文件不存在，则创建文件file
  ```
  - vi编辑器
      vi编辑器是linux和unix系统下的标准编辑器
      有三种模式：

        1. 插入模式(Insert mode): 在此模式下可以输入字符,按esc将回到命令模式
        2. 底行模式(Last line mode): 可以保存文件、退出vi、设置vi、查找等功能
        3. 命令模式(Command mode): 可以移动光标、删除字符等
     ```bash
     vi file #使用nvi编辑文件file,若文件不存在，则创建文件file
    ```

    vi常用命令

      - 命令模式下使用：
          1. :w  #保存文件 
          2. :q  #退出编辑器,如果文件已修改请使用以下命令
          3. :q! #退出编辑器且不保存
          4. :wq #退出编辑器且保存文件
          5. a #在当前光标位置向右添加文本
          6. i #在当前光标位置左边添加文本
          7. o #在当前行的下面新建一行
      
      - 插入模式下使用：
         esc #切换到命令行模式(不管用户处于何种模式,按下`Esc`键即可进入命令式。)

     - 底行模式 #命令模式下按`:`进入底行模式