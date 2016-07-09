$(function(){
	$(window).load(function(){
		//图片切换
		var number=0;
		$(".product-view-small-pic li").on("click",function(){
			number=$(this).index();
			$(".product-view-banner img").css("display","none").eq(number).css("display","block");			
		});
		$(".product-view-banner .btn-toLeft").on("click",function(){
			number--;
			if(number<=1){
				$(this).css("display","none");
			}
			$(".product-view-banner .btn-toRight").css("display","block");
			$(".product-view-banner img").css("display","none").eq(number).css("display","block");	
		});
		$(".product-view-banner .btn-toRight").on("click",function(){
			number++;
			if(number>=3){
				$(this).css("display","none");
			}
			$(".product-view-banner .btn-toLeft").css("display","block");
			$(".product-view-banner img").css("display","none").eq(number).css("display","block");	
		});
		
		//数量加减
		var num=1;
		$(".number-reduce").on("click",function(){
			num--;
			if(num<=0){
				num=0;
			}
			$(".number-border input").val(num);
			$(".counts-price span").text(num * $(".single-price span").text());
		});
		$(".number-increase").on("click",function(){
			num++;
			$(".number-border input").val(num);
			$(".counts-price span").text(num * $(".single-price span").text());
		});
		
		//调用倒计时函数
			countDown("2016/7/9 10:00:00")
			
		//倒计时函数
		function countDown(time){		
			var end_date=new Date(time).getTime();					
			var timer=setInterval(function (){
				var sys_time=(end_date - new Date().getTime())/1000;	
				if(sys_time > 1){	
					var sys_day=Math.floor((sys_time/3600)/24);
					var sys_hour=Math.floor((sys_time/60/60)%24);
					var sys_minute=Math.floor((sys_time/60)%60);
					var sys_second=Math.floor(sys_time%60);
					$(".countdown-day b").text(sys_day<10?"0"+sys_day:sys_day);
					$(".countdown-hour b").text(sys_hour<10?"0"+sys_hour:sys_hour);
					$(".countdown-minute b").text(sys_minute<10?"0"+sys_minute:sys_minute);
					$(".countdown-second b").text(sys_second<10?"0"+sys_second:sys_second);
				}else{
					clearInterval(timer);
				}
			},1000);		
		}
		
		//尺寸选择
		$(".product-size-chose li a").on("click",function(){
			$(".product-size span").text("");
			$(".product-size-chose li a").removeClass("size-bg");
			$(this).addClass("size-bg");
		});
		
		//cookie函数
		function setCookie(key,value,iDays,path){
			var day=new Date();
			day.setDate(day.getDate()+iDays);
			document.cookie=key+"="+value+";expires="+day+";path="+path;
		}
		
		function removeCookie(key){
			setCookie(key,"","-1","/");
		}
		//加入购物车
			//图片路径
		var srcImg=document.getElementById("imgSrc").src;
		var arr=[];
		$(".add-shop-bag a").on("click",function(){
			var value={src:srcImg,name:$(".product-name").text(),tit:$(".product-inf-tit h2").text(),size:$(".size-bg").text(),number:$(".number-border input").val(),price:$(".product-price .price").text()};
			arr.push(JSON.stringify(value));
			console.log(arr)
			//添加cookie
			setCookie("shop-list",arr,10,"/");		
		});	
	});
});
