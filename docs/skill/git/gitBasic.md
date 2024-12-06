## git的基本使用

1. 将远程仓库克隆到本地
  git clone https://gitee.com/用户个性地址/HelloGitee.git

2. git config --global user.name "你的名字或昵称"
   git config --global user.email "你的邮箱"
3. git add . #将当前目录所有文件添加到git暂存区
 git commit -m "my first commit" #提交并备注提交信息
 git push origin master #将本地提交推送到远程仓库  git push origin master --force 强制提交
4. 强制上传
 git push -u origin master -f


### 多人协作的工作模式
1. 首先，可以尝试用git push origin <branch-name>推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！
5. 如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。


### 配置简略命令
例如 ``` git lg``` 

```
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```


[Git Cheat Sheet](https://liaoxuefeng.com/books/git/conclusion/git-cheat-sheet.pdf)