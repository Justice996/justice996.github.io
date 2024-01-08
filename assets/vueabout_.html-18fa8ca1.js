import{_ as e,o as t,c as i,d as n}from"./app-000d5f3e.js";const d={},s=n(`<h3 id="vue中变量名不能以-、-符开头" tabindex="-1"><a class="header-anchor" href="#vue中变量名不能以-、-符开头" aria-hidden="true">#</a> vue中变量名不能以 <code>_</code>、<code>$</code> 符开头</h3><p>文档中有介绍</p><blockquote><p>以 _ 或 $ 开头的 property 不会被 Vue 实例代理，因为它们可能和 Vue 内置的 property、API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些 property。</p></blockquote><p>如果想要使用需要用<code>$data.xxx</code>,xxx是变量名。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div id=&quot;app&quot;&gt;
	&lt;div v-if=&quot;$data.$test== 1&quot;&gt;&lt;div&gt;
	&lt;button @click=&quot;click&quot;&gt;&lt;/button&gt;
&lt;div&gt;

&lt;script&gt;
new Vue({
	e:&#39;#app&#39;,
	data:{
		$test:0
	},
	methods:{
		click(){
			this.$data.$test = 1
		}
	}
})
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),l=[s];function a(c,v){return t(),i("div",null,l)}const u=e(d,[["render",a],["__file","vueabout_.html.vue"]]);export{u as default};
