import{_ as e,o as n,c as s,d as i}from"./app-cea8d733.js";const u={},d=i(`<h2 id="《计算机是如何跑起来的》" tabindex="-1"><a class="header-anchor" href="#《计算机是如何跑起来的》" aria-hidden="true">#</a> 《计算机是如何跑起来的》</h2><ol><li>书中使用vbs实现的石头剪刀布代码，注意编码使用ANSI编码, win10下新建.vbs后缀文件，cv一下代码保存后双击即可运行<div class="language-vbs line-numbers-mode" data-ext="vbs"><pre class="language-vbs"><code> Dim gesture(2)
 gesture(0) = &quot;石头&quot;
 gesture(1) = &quot;剪刀&quot;
 gesture(2) = &quot;布&quot;
 wins = 0
 Randomize
 MsgBox &quot;石头剪刀布游戏 v1 by Justice&quot;
 For i = 1 To 5
 user = CInt(InputBox(&quot;0:石头、1：剪刀、2：布&quot;))
 computer = CInt(Rnd *2)
 s=&quot;玩家：&quot;&amp;gesture(user) &amp;&quot;计算机：&quot;&amp;gesture(computer)
 If user = computer Then
 MsgBox s&amp;&quot;...平局！&quot;
 ElseIf computer=(user+1) Mod 3 Then
 MsgBox s &amp; &quot;玩家获胜！&quot;
 wins = wins+1
 Else
 MsgBox s &amp;&quot;计算机获胜&quot;
 End If
 Next
 
 MsgBox &quot;玩家获胜次数：&quot;&amp; wins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,2),l=[d];function o(r,t){return n(),s("div",null,l)}const v=e(u,[["render",o],["__file","howComputersWork.html.vue"]]);export{v as default};
