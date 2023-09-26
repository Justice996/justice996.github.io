##  做微信公众号 ，扫二维码关注公众号并获取用户-逻辑
>扫二维码关注公众号并获取用户-逻辑：<http://www.demodashi.com/demo/16402.html> <br/>
微信扫码登录能用代码  <https://www.cnblogs.com/10zhan/p/17081299.html><br/>
关注取消事件回调位置 <https://blog.csdn.net/shenshao_8/article/details/127407075><br/>
提交基础信息，就会当场样子接口<https://www.freesion.com/article/63071075721/><br/>
要提前写完验证代码<https://www.cnblogs.com/txw1958/p/weixin-qrcode-with-parameters.html><br/>
回调细节-<https://www.likecs.com/show-200165.html><br/>
Token验证例子微信扫码<http://demo.616zf.com/api/wx/valid>
---

准备工作<br/>
准备公众号及配置<br/>
本文用测试公众号进行配置举例子

---

>接口文档
获取access_token
文档：获取access_token
生成临时带参二维码
临时带参二维码方式进行生成二维码，再采用微信事件回调进行用户信息获取。
带参二维码生成文档：生成带参二维码
用户事件回调
用户在进行扫码或其他事件，微信会进行事件回调。
微信事件回调文档：微信事件回调
获取用户详细信息
获取用户详细信息：获取用户详细信息
程序目录
![44ae262d901fe79a8ef90a0f96fa21c](https://cdn.jsdelivr.net/gh/Justice996/picx-images-hosting@master/44ae262d901fe79a8ef90a0f96fa21c.35dqrj1q0ew0.webp)
![636440686be7d9d63bd5ec76a8645a4](https://cdn.jsdelivr.net/gh/Justice996/picx-images-hosting@master/636440686be7d9d63bd5ec76a8645a4.6n1dk9el5bc0.webp)
---

```php
获取access_token
    /**
     * @param $appid
     * @param $appsecret
     *
     * @return mixed
     * 获取token
     */
    protected function getToken($appid, $appsecret)
    {
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" . $appid . "&secret=" . $appsecret;
        $token = request_get($url);
        $token = json_decode(stripslashes($token));
        $arr = json_decode(json_encode($token), true);
        $access_token = $arr['access_token'];
        return $access_token;
    }
获取二维码ticket
/**
     * 获取关注二维码ticket
     * @param     $ACCESS_TOKEN
     * @param     $fqid
     * @param int $type
     *
     * @return bool|string
     */
    protected function getQrcodeurl($ACCESS_TOKEN, $fqid, $type = 1)
    {
        $url = self::$qrcode_url . 'access_token=' . $ACCESS_TOKEN;
        if ($type == 1) {
            //生成永久二维码
            $qrcode = '{"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_str": ' . $fqid . '}}}';
        } else {
            //生成临时二维码
            $qrcode = '{"expire_seconds": 604800, "action_name": "QR_STR_SCENE", "action_info": {"scene": {"scene_str": ' . $fqid . '}}}';
        }
        $result = http_post_data($url, $qrcode);
        $oo = json_decode($result[1]);
        if (empty($oo->ticket)) {
            return false;
        }
        if (!$oo->ticket) {
            $this->ErrorLogger('getQrcodeurl falied. Error Info: getQrcodeurl get failed');
            exit();
        }
        $url = self::$qrcode_get_url . 'ticket=' . $oo->ticket . '';
        echo $oo->ticket;
        return $url;
    }
/**
* 保存二维码到服务器
* 可直接进行展示不进行存储，看业务需求
*
* @param $url
* @param $filestring
*
* @return bool|string
*/
protected function DownLoadQr($url, $filestring)
{
if ($url == "") {
return false;
}
$filename = $filestring . rand(0, 99999999999) . '.jpg';
ob_start();
readfile($url);
$img = ob_get_contents();
ob_end_clean();
/*if (!file_exists('/public/qrcode/' . $filename)) {
touch('/public/qrcode/' . $filename);
}*/
$file = PUBLIC_PATH . 'qrcode/' . $filename;
$fp2 = fopen($file, "a");
if (fwrite($fp2, $img) === false) {
$this->ErrorLogger('dolwload image falied. Error Info: 无法写入图片');
exit();
}
fclose($fp2);
return '/public/qrcode/' . $filename;
}
/**
* 微信事件推送接收方法
*/
public function responseMsg()
{
$postStr = isset($GLOBALS['HTTP_RAW_POST_DATA']) ? $GLOBALS['HTTP_RAW_POST_DATA'] : file_get_contents("php://input");
if (!empty($postStr)) {
$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
// 微信消息类型
$RX_TYPE = trim($postObj->MsgType);
switch ($RX_TYPE) {
case "text":
// 文本消息
$resultStr = $this->handleText($postObj);
break;
case "event":
// 事件推送
$resultStr = $this->handleEvent($postObj);
break;
default:
$resultStr = "Unknow msg type: " . $RX_TYPE;
break;
}
echo $resultStr;
} else {
echo "";
exit;
}
}
/**
* 微信文本消息
* @param $postObj
*/
public function handleText($postObj)
{
$fromUsername = $postObj->FromUserName;
$toUsername = $postObj->ToUserName;
$keyword = trim($postObj->Content);
$time = time();
$textTpl = "<xml>
<ToUserName><![CDATA[%s]]></ToUserName>
<FromUserName><![CDATA[%s]]></FromUserName>
<CreateTime>%s</CreateTime>
<MsgType><![CDATA[%s]]></MsgType>
<Content><![CDATA[%s]]></Content>
<FuncFlag>0</FuncFlag>
</xml>";
if (!empty($keyword)) {
$msgType = "text";
$contentStr = "欢迎您关注";
$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
echo $resultStr;
} else {
echo "请输入...";
}
}
/**
* 获取时间消息并解析相应参数
* 提供数据简单推送(自动回复)
* @param $object
*
* @return string
*/
public function handleEvent($object)
{
$contentStr = "";
switch ($object->Event) {
case "subscribe":
$contentStr = "感谢您关注【测试账号】";
$openid = (string)$object->FromUserName; //数据类型转换为字符串
$refer_id = explode('_', $object->EventKey); //$object->EventKey返回的是qrsence_1232313这种类型
$this->createuserinfo($openid, $refer_id[1]);//获取用户信息
break;
case "SCAN":
$contentStr = "您已关注过，谢谢！";
$openid = (string)$object->FromUserName; //数据类型转换为字符串
$refer_id = explode('_', $object->EventKey); //$object->EventKey返回的是qrsence_12213213这种类型
$this->createuserinfo($openid, $refer_id[0]);//获取用户信息
break;
}
$resultStr = $this->responseText($object, $contentStr);
return $resultStr;
}
/**
* 微信文本消息
* @param $postObj
*/
public function handleText($postObj)
{
$fromUsername = $postObj->FromUserName;
$toUsername = $postObj->ToUserName;
$keyword = trim($postObj->Content);
$time = time();
$textTpl = "<xml>
<ToUserName><![CDATA[%s]]></ToUserName>
<FromUserName><![CDATA[%s]]></FromUserName>
<CreateTime>%s</CreateTime>
<MsgType><![CDATA[%s]]></MsgType>
<Content><![CDATA[%s]]></Content>
<FuncFlag>0</FuncFlag>
</xml>";
if (!empty($keyword)) {
$msgType = "text";
$contentStr = "欢迎您关注";
$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
echo $resultStr;
} else {
echo "请输入...";
}
}
/**
* 获取时间消息并解析相应参数
* 提供数据简单推送(自动回复)
* @param $object
*
* @return string
*/
public function handleEvent($object)
{
$contentStr = "";
switch ($object->Event) {
case "subscribe":
$contentStr = "感谢您关注【测试账号】";
$openid = (string)$object->FromUserName; //数据类型转换为字符串
$refer_id = explode('_', $object->EventKey); //$object->EventKey返回的是qrsence_1232313这种类型
$this->createuserinfo($openid, $refer_id[1]);//获取用户信息
break;
case "SCAN":
$contentStr = "您已关注过，谢谢！";
$openid = (string)$object->FromUserName; //数据类型转换为字符串
$refer_id = explode('_', $object->EventKey); //$object->EventKey返回的是qrsence_12213213这种类型
$this->createuserinfo($openid, $refer_id[0]);//获取用户信息
break;
}
$resultStr = $this->responseText($object, $contentStr);
return $resultStr;
}
```
