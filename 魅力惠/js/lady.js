(function($){
	$(window).load(function(){
		//随机生成四位的验证码函数
		function identifyingCode(){
			var arr=[],str=new String();
			//生成数字，加进数组中
			for(var i=0,j=0;i<10;i++,j++){
				arr[j]=i;
			}
			//生成字母，加进数组中
			for(var i=97,j=10;i<123;i++,j++){
				arr[j]=String.fromCharCode(i);
			}
			for(var i=0;i<4;i++){
				str+=arr[parseInt(Math.random()*36)];
			}
			return str;
		};
		$(".code-value").text(function(){
			return identifyingCode();
		});
		$(".code-value").parent().on("click",function(){
			console.log(111)
			$(this).children().text(function(){				
				return identifyingCode();				
			});
		});
		
		function textInput(){
			$(".error-user").text(function(){
					if($(".username").val().length==0){
						return "请输入已验证的手机号或邮箱";
					}else if($(".username").val().match(/^1\d{10}$/) 
					|| $(".username").val().match(/^\w+@\w+(\.\w+)+$/i)){
						return "";
					}else{
						return "请输入正确的手机号或邮箱";
					}				
			});	
			
			if($(".username").val().length==0){
					$(".error-user").text("请输入已验证的手机号或邮箱");
			}else if($(".pwd").val().length==0){
					$(".error-pwd").text("请输入密码");
			}else{
				$(".error-pwd").text("");
			};
			
			if($(".username").val().length==0){
					$(".error-user").text("请输入已验证的手机号或邮箱");
			}else if($(".pwd").val().length==0){
					$(".error-pwd").text("请输入密码");
			}else if($(".code").val() != $(".code-value").val()){
				$(".error-code").text("请输入正确的验证码");
			}else{
				$(".error-code").text("");
			};
		};
			var isTrue=true;
			//验证用户名
			$(".username").blur(function(){		
				$(".error-user").text(function(){
					if($(".username").val().length==0){
						return "请输入已验证的手机号或邮箱";
					}else if($(".username").val().match(/^1\d{10}$/) 
					|| $(".username").val().match(/^\w+@\w+(\.\w+)+$/i)){
						isTrue=true;
						return "";
					}else{
						isTrue=false;
						return "请输入正确的手机号或邮箱";
					}				
				});			

			});
			//验证密码
			$(".pwd").blur(function(){
				if($(".username").val().length==0){
						$(".error-user").text("请输入已验证的手机号或邮箱");
						isTrue=false;
				}else if($(".pwd").val().length==0){
						$(".error-pwd").text("请输入密码");
						isTrue=false;
				}else{
					$(".error-pwd").text("");
					isTrue=true;
				}
			});
			//验证验证码
			$(".code").blur(function(){
				if($(".username").val().length==0){
						$(".error-user").text("请输入已验证的手机号或邮箱");
						isTrue=false;
				}else if($(".pwd").val().length==0){
						$(".error-pwd").text("请输入密码");
						isTrue=false;
				}else if($(".code").val() != $(".code-value").text()){
					$(".error-code").text("请输入正确的验证码");
					isTrue=false;
				}else{
					$(".error-code").text("");
					isTrue=true;
				}
			});
			
		//点击会员登录时调用textInput函数
		$(".login-sure a").on("click",function(){
			textInput();
			
			
		});
		
		//点击下次登录密码改变背景颜色
		var isDown=true;
		$(".auto-login p span").on("click",function(){
			if(isDown){
				$(this).css("backgroundColor","#000");
				isDown=false;
			}else{
				$(this).css("backgroundColor","transparent");
				isDown=true;
			}
		});
		
		//注册页面
			//验证密码强度
			
			$(".pwd").keyup(function(){
				var count=0;
				if($(this).val().length < 6){
					$(".error-pwd").text("密码长度不能少于六位");
				}
				if($(this).val().length == 0){
					$("#pwd-strong").css("display","none");
				}else{
					$("#pwd-strong").css("display","block");
				}
				if($(this).val().match(/\d+/)){
					count++;
				}
				if($(this).val().match(/[a-zA-Z]+/)){
					count++;
				}
				if($(this).val().match(/[^a-zA-Z0-9]+/)){
					count++;
				}
				if(count==1){
					$("#pwd-strong li:first").css("background","#000").nextAll().css("background","#929292");
					if($(".pwd").val().length >= 6){
						$(".error-pwd").text("密码较弱，建议设置多种字符组成的复杂密码");
					}
				}
				if(count==2){
					$("#pwd-strong li").eq(2).prevAll().css("background","#000").end().css("background","#929292");
					if($(".pwd").val().length >= 6){
						$(".error-pwd").text("");
					}
				}
				if(count==3){
					$("#pwd-strong li").eq(2).css("background","#000");
				}
			});
			//验证确认密码
			$(".again-pwd").blur(function(){
				if($(".again-pwd").val() != $(".pwd").val()){
					$(".error-again-pwd").text("密码和确认密码不一致，请重新输入");
					isTrue=false;
				}else{
					$(".error-again-pwd").text("");
					isTrue=true;
				}
			});
			
			//点击注册将用户名和密码加进购物车
			$(".login-sure a").click(function(){
				if(isTrue){
					setCookie("username",$(".username").val(),10,"/");
					setCookie("password",$(".pwd").val(),10,"/");
				}else{
					console.log("登录信息不正确");
					return false;
				}
			});
			//cookie函数
			function setCookie(key,value,iDays,path){
				var day=new Date();
				day.setDate(day.getDate()+iDays);
				document.cookie=key+"="+value+";expires="+day+";path="+path;
			};
			
			function getCookie(key){
				var str=document.cookie;
				var arr1=str.split("; ");
				for(var i in arr1){
					var arr2=arr1[i].split("=");
					if(key==arr2[0]){
						return arr2[1];
					}
				}
				return "";			
			}
	});
})(jQuery);
