import{_ as n,o as s,c as a,d as e}from"./app-cea8d733.js";const i={},t=e(`<h3 id="laravel框架关联表-一对多" tabindex="-1"><a class="header-anchor" href="#laravel框架关联表-一对多" aria-hidden="true">#</a> laravel框架关联表 一对多</h3><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">/*
 * 关联表 一对多
 * has_one（或has_many）:外键在子关联对象中
 *
 * belongsto 外键在你父联对象中

 */</span><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">Cshangdetail</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">hasOne</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;Cshangdetail&#39;</span><span class="token punctuation">,</span>  <span class="token string single-quoted-string">&#39;user_id&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解读:has_one（或has_many） user_id 和 前面 类名不一样， belongsto user_id 和 前面 类名一样，</p>`,3),l=[t];function c(o,p){return s(),a("div",null,l)}const r=n(i,[["render",c],["__file","search.html.vue"]]);export{r as default};
