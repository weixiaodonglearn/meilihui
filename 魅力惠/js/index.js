(function($){
	$(window).load(function(){
		//导航栏右侧效果
		$(".nav .right-nav").hover(function(){
			$(".right-nav .pop-up").delay(500).slideDown();
			t=setTimeout(function(){
				$(".right-nav .pop-up").stop().slideUp();
			},2000)
		},function(){
			$(".right-nav .pop-up").stop().slideUp(600);
		})
		$(".right-nav .pop-up").stop().on("mouseover",function(){
			clearTimeout(t)
		})
		$(".right-nav .pop-up span").on("click",function(){
			$(".right-nav .pop-up").css("display","none");
		});
		
		$(window).scroll(function(){
			//右侧二维码回到顶部出现消失
			
			if($(window).scrollTop() >= 800){
				$(".footer .returnTop a").css("display","block");
			}else{
				$(".footer .returnTop a").css("display","none");
			}
			
			//固定nav
			if($(window).scrollTop() >= $(".logo").offset().top+$(".logo").height()){
				$(".nav-wrap").addClass("nav-fixed");
			}else{
				$(".nav-wrap").removeClass("nav-fixed");			
			};		
			
			//改变content的margin-top
			var lastScrollTop=$(window).scrollTop();
			$(window).scroll(function(){
				window.nextScrollTop = $(window).scrollTop();
			})	
			if(
				parseInt($(".content-wrap").css("marginTop"))>=-20
				&& parseInt($(".content-wrap").css("marginTop"))<=500
			){
				if(lastScrollTop < window.nextScrollTop){
					var num=parseInt($(".content-wrap").css("marginTop"))+30;
					if(num>500){
						num=500;
					}
					$(".content-wrap").css("marginTop",num);
				}
				if(lastScrollTop > window.nextScrollTop){
					var num=parseInt($(".content-wrap").css("marginTop"))-20;
					if(num<-20){
						num=-20;
					}
					$(".content-wrap").css("marginTop",num);
				}				
			}							
		});
		
		//pic-module放大镜动画
		$(".pic-module dt").hover(function(){
			$(this).children(".mask").css("display","block");
			$(this).children("img").stop().animate({width:"340",margin:"-8"});
		},function(){
			$(this).children(".mask").css("display","none");
			$(this).children("img").stop().animate({width:"320",margin:"0"}); 
		})	
		
		//pic轮播图
		timer=setInterval(intervalFn,3000);
		var num=1;
		function intervalFn(){
			$(".today-new-list-right ul").animate({left:"-320"},function(){
				$(".today-new-list-right ul li:first").insertAfter($(".today-new-list-right ul li:last"));
				$(".today-new-list-right ul").css("left",0);
			});
			num=num%2;
			$(".today-new-list-right span").each(function(){
				$(this).css("backgroundColor","#fff");
			})
			$(".today-new-list-right span").eq(num).css("backgroundColor","red");
			num++;
		};
		//轮播图原点点击
		$(".today-new-list-right .dot1").on("click",function(){
			$()
			$(".today-new-list-right ul .dot1").before($(".today-new-list-right ul .dot2"));
			$(".today-new-list-right ul").css("left","-320px");
			$(".today-new-list-right ul").animate({left:"0"});
			num--;
			$(".today-new-list-right span").each(function(){
				$(this).css("backgroundColor","#fff");
			})
			$(this).css("backgroundColor","red");
		});
		$(".today-new-list-right .dot2").on("click",function(){
			$(".today-new-list-right ul .dot2").before($(".today-new-list-right ul .dot1"));
			$(".today-new-list-right ul").css("left","0px");
			$(".today-new-list-right ul").animate({left:"-320"});
			num++;
			$(".today-new-list-right span").each(function(){
				$(this).css("backgroundColor","#fff");
			})
			$(this).css("backgroundColor","red");
		});
		//轮播图点击向左向右箭头
		$(".today-new-list-right .toLeft").on("click",function(){
			$(".today-new-list-right ul li:first").before($(".today-new-list-right ul li:last"));
			$(".today-new-list-right ul").css("left","-320px");
			clearInterval(timer);
			$(".today-new-list-right ul").animate({left:"0"},function(){
					clearInterval(timer);
					timer=setInterval(intervalFn,3000);
			});			
		});
		$(".today-new-list-right .toRight").on("click",function(){
			clearInterval(timer);
			$(".today-new-list-right ul").animate({left:"-320"},function(){
				clearInterval(timer);
				timer=setInterval(intervalFn,3000);
				$(".today-new-list-right ul li:first").insertAfter($(".today-new-list-right ul li:last"));
				$(".today-new-list-right ul").css("left",0);				
			});
		});
		
		//活动即将开始  选项卡
		$(".readyStart ul li").on("click",function(){
			$(".readyStart ul li").css("borderBottomWidth","0px");
			$(this).css("borderBottomWidth","4px");
			$(".brand-wrap").css("display","none");
			$(".brand-wrap").eq($(this).index()).css("display","block");
		});
		

		
	});
})(jQuery);
