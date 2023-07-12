## php基础
获取代码执行时间:<br>
>$stime=microtime(true);<br>
中间是代码运行逻辑<br>
$etime=microtime(true);//获取程序执行结束的时间<br>
$total=$etime-$stime;  //计算差值
echo "<br />当前页面执行时间为：{$total} 秒";<br>
可以用于调试性能

 ---

php调用接口 
  <https://blog.xiaohuwei.cn/amp/279.html>
  <https://www.jb51.net/article/72552.htm>

```php
$url = "http://www.php100.com/logo.gif";
$ch = curl_init();
curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT,10);
$img = curl_exec($ch);
```

---

php 获取今日、昨日、上周、本月的起始时间戳和结束时间戳的方法
<https://www.cnblogs.com/rainblack/p/4924581.html>

---
32位随机字符串

```php
$token=md5(time().mt_rand(0,1000));
```
---
php 获取客户访问接口ip
```php
$ip=get_client_ip();
```

---

判断 PHP 接口当前域名是http还是https
```php
$http_type = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) 
&& $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')) ? 'https://' : 'http://';
halt($http);
```

---

php 获取今日、昨日、上周、本月的起始时间戳和结束时间戳的方法
<https://www.cnblogs.com/rainblack/p/4924581.html>

---
新增id获取
```php
Db::name('user')->insert($data);
$userId = Db::name('user')->getLastInsID();
```

---
fastadmin 页面访问思路:
控制器的if ($this->request->isAjax()) {}
外边代码
->js->view->控制器if ($this->request->isAjax()) {}里边代码->view
