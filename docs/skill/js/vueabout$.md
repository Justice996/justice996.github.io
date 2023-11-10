### vue中变量名不能以 ```_```、```$``` 符开头

文档中有介绍
>  以 _ 或 $ 开头的 property 不会被 Vue 实例代理，因为它们可能和 Vue 内置的 property、API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些 property。  

如果想要使用需要用```$data.xxx```,xxx是变量名。

```
<div id="app">
	<div v-if="$data.$test== 1"><div>
	<button @click="click"></button>
<div>

<script>
new Vue({
	e:'#app',
	data:{
		$test:0
	},
	methods:{
		click(){
			this.$data.$test = 1
		}
	}
})
</script>
```
