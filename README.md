# cordova 插件的angularjs 封装

## $properKvstore
加密键值对存储

```javascript
//存储健值对
//参数1：存储对应的文件名
//参数2：存储的键值对对象，键与值都是string类型
$properKvstore
			.kvSets('default', {
				'name': '我是沈东生',
				'date': '2015-12-06'
			})
			.then(function(success) {
				// success
				alert("save kv success!");
			}, function(error) {
				alert(error);
			});
//获取保存的键值对象
//参数1 存储对应的文件名
//参数2 要获取的键数组
//返回对应的键值对数组
$properKvstore
			.kvGets('default', ['name', 'date'])
			.then(function(success) {
				// success
				alert(success.name + " " + success.date);
			}, function(error) {
				alert(error);
			});	
```

## $properProperpush
推送相关接口

```javascript
//推送相关参数
var params={
  		"appId":"isj",
  		"pushUrl":"http://192.168.1.141:8080/properpush",
  		"secretKey":"b2024e00064bc5d8db70fdee087eae4f",
  		"xiaomi":{
  			"theAppid":"2882303761517501901",
  			"theAppkey":"5591750110901"
  		}
  	};
//初始化推送
  	$properProperpush.init(params).then(function(success){
  		
  		//获取设备信息，type:android,ios ；  uniqueId:设备的唯一标识 ；jsonStr:设备的其它信息对应的json字符串（操作系统版本，厂商等），android,ios对应的类型不一样
  		//可以用uniqueId上传到服务器，做设备校验使用
		$properProperpush.getDeviceInfo().then(function(success){
			console.log
					('type:'+success.type+',uniqueId:'+success.uniqueId+",jsonsStr:"+success.jsonStr);
		},function(error){alert("error:"+error);});
  		
  		//设备与某个用户绑定，这时，向该设备发送推送时，会发送到该设备
  		var userInfo={"userid":"sds","otherInfo":"沈东生"};
  		$properProperpush.bindUserid(userInfo);
  		//取消设备与用户的绑定关系
  		//$properProperpush.unBindUserid();
  		
  	},function(error){alert("error:"+error);});
  	
  	//打开notification的回调接口
  	function onOpenNotification(event){
  		//event.properAlert=='true',
  		//说明是在ios设备上，当前应用程序正在打开状态，这时不会发送通知到状态栏
  		//而是直接在程序里接收到通知，这时，可以在程序里显示一个alert,说明收到通知了
  		if(event.properAlert){
  			alert("ios 收到alert 通知"+JSON.stringify(event.properCustoms));
  		}else{
  			//点击状态栏的通知，进入程序
  			alert("打开notification通知"+JSON.stringify(event.properCustoms));
  		}
  		//event.properCustoms ，推送时自定义的键值对
  		//properCustoms 固定的系统键值对：
  		//_proper_userid 通知对应的userid
  		//_proper_title 通知的标题
  		//_proper_content 通知的正文
  		
  	}
  	//添加打开通知的事件
  	document.addEventListener("Properpush.openNotification", onOpenNotification, false);

	//推送本地设置角标及通知
	//badgeNumber:角标数，=0时，清空角标,>0设置角标; title:通知标题, content:通知内容, customDic：通知对应的自定义键值对
	//设置角标及通知
	$properProperpush.sendBadgeNotification(12,'haha','this is the content',{'k1':'k1','k2':'k2'});
	//title，content,customDic不传时，则只设置角标，不发送通知
	$properProperpush.sendBadgeNotification(13);

  	//push end
```
