$(function() {

	if(localStorage.getItem("token")) {

		$(".login").html("欢迎，" + localStorage.getItem("username") + "<span class='quit'>退出</span>");

	} else {
		$(".login").html('<a href="login.html">登录</a><a href="register.html">注册</a>')
	}

	$(".shopcar").click(function() {

		location.href = "shopcar.html"

	})

	$.get("http://h6.duchengjiu.top/shop/api_cat.php", function(data) {

		for(var i = 0; i < data.data.length; i++) {
			$("#nav .nav").append("<li><a href='list.html?cat_id=" + data.data[i].cat_id + "'>" + data.data[i].cat_name + "</a></li>")
		}

	})

	$.get("http://h6.duchengjiu.top/shop/api_goods.php", function(data) {

		var obj = data;
		for(var i = 0; i < data.data.length; i++) {

			$("#goodsUl").append('<li><img src="' + obj.data[i].goods_thumb + '" /><p class="name"><a href=detail.html?goods_id=' + obj.data[i].goods_id + '>' + obj.data[i].goods_name + '</a></p><p class="desc">' + obj.data[i].goods_desc + '</p><p class="price">' + obj.data[i].price + '元</p></li>');

		}

	})

	fun();

	function fun() {
		var $height = $(window).height();
		var $change = ($height - $(".side").outerHeight()) / 2 + $(window).scrollTop();
		$(".side").stop(true).animate({
			"top": $change
		}, 1000);
	}
	//					$(window).scroll(fun);
	$(window).resize(fun);
	$(window).scroll(function() {
		if($(window).scrollTop() > 0) {
			$("#top").show();
		} else {
			$("#top").hide();
		}
		fun();
	});

	$("#top").click(function() {
		$("html body").animate({
			"scrollTop": 0
		}, 1000)
	})

	var index = 0;
	var timer = null;

	function change() {
		//				index ++;
		//				if (index === $(".lb li").length) {
		//					index = 0;
		//				}
		$(".lb li").fadeOut(1500);
		$(".lb li").eq(index).fadeIn(1500);
		$(".con li").removeClass("cur");
		$(".con li").eq(index).addClass("cur");
	}
	timer = setInterval(function() {
		index++;
		if(index === $(".lb li").length) {
			index = 0;
		}
		change();
	}, 3000);
	$(".leftbtn").click(function() {
		if($(".lb li").is(":animated")) {
			return;
		}
		index--;
		if(index < 0) {
			index = $(".lb li").length - 1;
		}

		change();
	});
	$(".rightbtn").click(function() {
		if($(".lb li").is(":animated")) {
			return;
		}
		index++;
		if(index === $(".lb li").length) {
			index = 0;
		}

		change();
	});
	$(".con li").click(function() {
		index = $(this).index();
		change();

	});
	$(".wrap").mouseenter(function() {
		clearInterval(timer);
	});
	$(".wrap").mouseleave(function() {
		timer = setInterval(function() {
			index++;
			if(index === $(".lb li").length) {
				index = 0;
			}
			change();
		}, 3000);
	});

	$("#sbtn").click(function() {
		window.location.href = "detail.html?goods_id=" + $("#txt").val();
	});

	$("body").on('click', '.quit', function() {

		localStorage.clear();
		location.href = location.href;

	})
})