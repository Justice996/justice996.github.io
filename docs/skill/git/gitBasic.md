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
