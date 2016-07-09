$(function(){
	$(window).load(function(){
		//判断收货人姓名是否为空
		$("#recesiver").blur(function(){
			if($("#recesiver").val().match(/^$/)){
				$(".error-recisiver").text("请输入收货人姓名");
			}else{
				$(".error-recisiver").text("");
			}
		});
		//判断手机号码
		$("#phone").blur(function(){
			if($("#phone").val().match(/^$/)){
				$(".error-phone").text("手机号码不能为空");
			}else if($("#phone").val().match(/^1{1}\d{10}$/)){
				$(".error-phone").text("");
			}else{
				$(".error-phone").text("请输入正确的手机号码");
			}
		});
		//选择所在地区
		$(".select").each(function(i){
			$(this).click(function(){
				$(".select").next().css("display","none");
				$(this).next().css("display","block");
			});
		});
		$(".select-list-top span").each(function(){
			$(this).click(function(){
				$(this).parent().parent().css("display","none");
			});
		});
		$(".select-province-list ul li").click(function(){
			$(this).parent().parent().css("display","none");
			$(".province").text($(this).text());
			if($(this).text()=="北京"){
				$(".select-city-list ul").css("display","none").eq(0).css("display","block");
			}
			if($(this).text()=="河南"){
				$(".select-city-list ul").css("display","none").eq(1).css("display","block");
			}
		});
		$(".select-city-list ul li").click(function(){
			$(this).parent().parent().css("display","none");
			$(".city").text($(this).text());
			if($(this).text()=="郑州"){
				$(".select-county-list ul").css("display","none").eq(0).css("display","block");
			}
			if($(this).text()=="开封"){
				$(".select-county-list ul").css("display","none").eq(1).css("display","block");
			}
			if($(this).text()=="平顶山"){
				$(".select-county-list ul").css("display","none").eq(2).css("display","block");
			}
		});
		$(".select-county-list ul li").click(function(){
			$(this).parent().parent().css("display","none");
			$(".county").text($(this).text());
		});
		//判断收货地址
		$("#address").blur(function(){
			if($("#address").val().match(/^$/)){
				$(".error-address").text("请输入详细地址");
			}else{
				$(".error-address").text("");
			}
		});
		//判断邮政编码
		$("#postcode").blur(function(){
			if($("#postcode").val().match(/^$/)){
				$(".error-postcode").text("请输入邮政编码");
				$(".error-postcode").css("color","#db2726")
			}else if($("#postcode").val().match(/^[1-9]\d{5}$/)){
				$(".error-postcode").text("错误的邮编可能导致派送延迟或无法送达，请谨慎填写");
				$(".error-postcode").css("color","#000");
			}else{
				$(".error-postcode").text("请输入正确的邮政编码");
				$(".error-postcode").css("color","#db2726")
			}
		});
		//付款方式选项卡
		$(".pay-nav span").click(function(){
			$(".pay-nav span").css({"borderColor":"#999","backgroundColor":"#f2f2f2","color":"#999"}).eq($(this).index()).css({"borderColor":"#000","backgroundColor":"#fff","color":"#000"}).next().css("borderLeftColor","#000");
			$(".pay-method-choose").css("display","none").eq($(this).index()).css("display","block");
		});
		//发票
		$(".need-ticket input").click(function(){
			$(".ticket-left").css("display","block");
		});
		$(".no-ticket input").click(function(){
			$(".ticket-left").css("display","none");
		});
		//获取cookie
			var cc=getCookie("shop-list");
			var oCookie=eval('['+ cc + ']');
			for(var i=0;i<oCookie.length;i++){
				var imgSrc=document.getElementsByClassName("shop-bag-pic")[i].getElementsByTagName("img")[0];
				imgSrc.src=oCookie[i].src;
				$(".order-list-wrap").eq(0).clone(true,true).appendTo($(".order-list-content")).end().css("display","none");
				$(".order-list-wrap").eq(i).css("display","block").find(".shop-bag-pic-inf b a").text(oCookie[i].tit).end().find(".shop-bag-pic-inf p a").text(oCookie[i].name).end().find(".shop-bag-pic-inf span").text("尺寸："+oCookie[i].size).end().find(".single-price span").text(oCookie[i].price).end().find(".num-border input").val(oCookie[i].number).end().find(".counts-price span").text(oCookie[i].price*oCookie[i].number);				
			};
		//调用cookie函数
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
		//点击数量加减键
		$(".order-list-content .num-reduce").each(function(i){
			$(this).click(function(){
				var num=parseInt($(this).next().find("input").val())-1;
				if(num<1){
					num=1;
				}
				$(this).next().find("input").val(num);
				var single=parseInt($(this).closest("li").siblings(".single-price").find("span").text());
				$(this).closest("li").siblings(".counts-price").find("span").text(num*single);
				allMoney();
			});			
		});
		$(".order-list-content .num-increase").each(function (i) {
			$(this).click(function () {
		    	var num=parseInt($(this).prev().find("input").val())+1;
				$(this).prev().find("input").val(num);
				var single=parseInt($(this).closest("li").siblings(".single-price").find("span").text());
				$(this).closest("li").siblings(".counts-price").find("span").text(num*single);
				allMoney();
			});
		});	
		allMoney();
		//计算总价钱函数
			function allMoney(){
				if(oCookie.length>0){
					var count=0;
					for(var i=0;i<oCookie.length;i++){
						count+=parseInt($(".counts-price").eq(i).find("span").text());
					}					
					$(".ticket-right p").first().find("span").text("￥"+count);
					$(".shoule-pay span").text("￥"+count);
					$(".shop-bag").text(oCookie.length);
					$(".shop-bag-money").text("￥"+count);
					//return count;
				}else{
					return 0;
				}
			}
		
		
		
	});
});
