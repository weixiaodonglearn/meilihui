$(function(){
	$(window).load(function(){
		//获取cookie
			var cc=getCookie("shop-list");
			var oCookie=eval('['+ cc + ']');

		//cookie获取函数
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
		
		function setCookie(key,value,iDays,path){
			var day=new Date();
			day.setDate(day.getDate()+iDays);
			document.cookie=key+"="+value+";expires="+day+";path="+path;
		}
		
		
		//计算总价钱函数
			function amountMoney(){
				if(oCookie.length>0){
					var count=0;
					for(var i=0;i<oCookie.length;i++){
						count+=parseInt($(".counts-price").eq(i).find("span").text());
					}					
					$(".amount-money span").text(count);
					$(".shop-bag").text(oCookie.length);
					$(".shop-bag-money").text("￥"+count);
					return count;
				}else{
					return 0;
				}
			}
		
		//购物袋商品数量
			$(".shop-bag").text(oCookie.length);
		
		//判断cookie中商品信息存在不存在		
		if(oCookie.length>0){			
			for(var i=0;i<oCookie.length;i++){
				var imgSrc=document.getElementsByClassName("shop-bag-pic")[i].getElementsByTagName("img")[0];
				imgSrc.src=oCookie[i].src;
				$(".shop-list-wrap").eq(0).clone(true,true).appendTo($(".shop-list-content")).end().css("display","none");
				$(".shop-list-wrap").eq(i).css("display","block").find(".shop-bag-pic-inf b a").text(oCookie[i].tit).end().find(".shop-bag-pic-inf p a").text(oCookie[i].name).end().find(".shop-bag-pic-inf span").text("尺寸：" + oCookie[i].size).end().find(".single-price span").text(oCookie[i].price).end().find(".num-border input").val(oCookie[i].number).end().find(".counts-price span").text(oCookie[i].price*oCookie[i].number);		
				
			}
			amountMoney();
		}else{
			$(".shop-wrap").css("display","none");
			$(".no-shopping").css("display","block");
		};
		
		//购物袋商品总价格
			$(".shop-bag-money").text("￥" + amountMoney());
					
		//点击数量加减键
		$(".shop-list-content .num-reduce").each(function(i){
			$(this).click(function(){
				var num=parseInt($(this).next().find("input").val())-1;
				if(num<1){
					num=1;
				}
				$(this).next().find("input").val(num);
				var single=parseInt($(this).closest("li").siblings(".single-price").find("span").text());
				$(this).closest("li").siblings(".counts-price").find("span").text(num*single);
				amountMoney();
			});			
		});
		$(".shop-list-content .num-increase").each(function (i) {
			$(this).click(function () {
		    	var num=parseInt($(this).prev().find("input").val())+1;
				$(this).prev().find("input").val(num);
				var single=parseInt($(this).closest("li").siblings(".single-price").find("span").text());
				$(this).closest("li").siblings(".counts-price").find("span").text(num*single);
				amountMoney();
			});
		});	
		
				
		//点击X删除商品列表
		$(".delete-list").each(function(i){
			$(this).click(function(){
				$(this).next().css("display","block");
			});
			$(this).next().find(".button1").on("click",function(){
				//oCookie.splice(i,1);
				//console.log(cc)
				//setCookie("shop-list",oCookie,10,"/");
				$(this).closest("ul").remove();				
				amountMoney();
			})
			$(this).next().find(".button2").on("click",function(){
				$(this).closest(".up-delete-box").css("display","none");
			})
		});
	});
});
