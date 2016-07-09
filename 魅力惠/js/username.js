$(function(){
	$(window).load(function(){
		//setCookie函数
		function setCookie(key,value,iDays,path){
			var day=new Date();
			day.setDate(day.getDate()+iDays);
			document.cookie=key+"="+value+";expires="+day+";path="+path;
		}
		//getCookie函数
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
		};
		//removeCookie函数
		function removeCookie(key){
			setCookie(key,"","-1","/");
		};
		
		var un=getCookie("username");
		if(un){
			$(".colorRed").text("我的账户").parent().next().next().find("a").text("退出").click(function(){
				removeCookie("username");
				return false;			
			});
			
		}
	});
});
