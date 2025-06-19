import{_ as n,c as e,d as a,o as i}from"./app-CoLZFvGU.js";const t={};function p(l,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h2 id="《计算机是如何跑起来的》" tabindex="-1"><a class="header-anchor" href="#《计算机是如何跑起来的》"><span>《计算机是如何跑起来的》</span></a></h2><ol><li>书中使用vbs实现的石头剪刀布代码，注意编码使用ANSI编码, win10下新建.vbs后缀文件，cv一下代码保存后双击即可运行<div class="language-vbs line-numbers-mode" data-highlighter="shiki" data-ext="vbs" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-vbs"><span class="line"><span> Dim gesture(2)</span></span>
<span class="line"><span> gesture(0) = &quot;石头&quot;</span></span>
<span class="line"><span> gesture(1) = &quot;剪刀&quot;</span></span>
<span class="line"><span> gesture(2) = &quot;布&quot;</span></span>
<span class="line"><span> wins = 0</span></span>
<span class="line"><span> Randomize</span></span>
<span class="line"><span> MsgBox &quot;石头剪刀布游戏 v1 by Justice&quot;</span></span>
<span class="line"><span> For i = 1 To 5</span></span>
<span class="line"><span> user = CInt(InputBox(&quot;0:石头、1：剪刀、2：布&quot;))</span></span>
<span class="line"><span> computer = CInt(Rnd *2)</span></span>
<span class="line"><span> s=&quot;玩家：&quot;&amp;gesture(user) &amp;&quot;计算机：&quot;&amp;gesture(computer)</span></span>
<span class="line"><span> If user = computer Then</span></span>
<span class="line"><span> MsgBox s&amp;&quot;...平局！&quot;</span></span>
<span class="line"><span> ElseIf computer=(user+1) Mod 3 Then</span></span>
<span class="line"><span> MsgBox s &amp; &quot;玩家获胜！&quot;</span></span>
<span class="line"><span> wins = wins+1</span></span>
<span class="line"><span> Else</span></span>
<span class="line"><span> MsgBox s &amp;&quot;计算机获胜&quot;</span></span>
<span class="line"><span> End If</span></span>
<span class="line"><span> Next</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> MsgBox &quot;玩家获胜次数：&quot;&amp; wins</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,2)]))}const r=n(t,[["render",p]]),c=JSON.parse('{"path":"/read/howComputersWork.html","title":"","lang":"zh-CN","frontmatter":{"description":"《计算机是如何跑起来的》 书中使用vbs实现的石头剪刀布代码，注意编码使用ANSI编码, win10下新建.vbs后缀文件，cv一下代码保存后双击即可运行","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-08-02T10:19:55.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://github.com/Justice996/read/howComputersWork.html"}],["meta",{"property":"og:site_name","content":"Justice的博客"}],["meta",{"property":"og:description","content":"《计算机是如何跑起来的》 书中使用vbs实现的石头剪刀布代码，注意编码使用ANSI编码, win10下新建.vbs后缀文件，cv一下代码保存后双击即可运行"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-02T10:19:55.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-02T10:19:55.000Z"}]]},"git":{"createdTime":1690971595000,"updatedTime":1690971595000,"contributors":[{"name":"justice","username":"justice","email":"1393080039@qq.com","commits":1,"url":"https://github.com/justice"}]},"readingTime":{"minutes":0.54,"words":161},"filePathRelative":"read/howComputersWork.md","excerpt":"","autoDesc":true}');export{r as comp,c as data};
