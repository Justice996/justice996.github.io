##  《计算机是如何跑起来的》

1. 书中使用vbs实现的石头剪刀布代码，注意编码使用ANSI编码,
win10下新建.vbs后缀文件，cv一下代码保存后双击即可运行
   ```vbs    
    Dim gesture(2)
    gesture(0) = "石头"
    gesture(1) = "剪刀"
    gesture(2) = "布"
    wins = 0
    Randomize
    MsgBox "石头剪刀布游戏 v1 by Justice"
    For i = 1 To 5
    user = CInt(InputBox("0:石头、1：剪刀、2：布"))
    computer = CInt(Rnd *2)
    s="玩家："&gesture(user) &"计算机："&gesture(computer)
    If user = computer Then
    MsgBox s&"...平局！"
    ElseIf computer=(user+1) Mod 3 Then
    MsgBox s & "玩家获胜！"
    wins = wins+1
    Else
    MsgBox s &"计算机获胜"
    End If
    Next
    
    MsgBox "玩家获胜次数："& wins
    ```
