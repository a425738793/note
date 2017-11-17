$(function() {

	if(localStorage.getItem("token")) {

		$(".login").html("欢迎，" + localStorage.getItem("username") + "<span class='quit'>退出</span>");

	} else {
		$(".login").html('<a href="login.html">登录</a><a href="register.html">注册</a>')
	}
	$("body").on('click', '.quit', function() {

		localStorage.clear();
		location.href = location.href;

	})
	$(".shopcar").click(function() {

		location.href = "shopcar.html"

	})
	$.get("http://h6.duchengjiu.top/shop/api_cat.php", function(data) {

		for(var i = 0; i < data.data.length; i++) {
			$("#nav .nav").append("<li><a href='list.html?cat_id=" + data.data[i].cat_id + "'>" + data.data[i].cat_name + "</a></li>")
		}

	})

	var str = location.search.substr(1);
	//				用分割方法得到 = 号两边内容
	var goodsId = str.split("=");
	//				用下标找到id的值
	console.log(goodsId[1]);

	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"data": {
			"goods_id": goodsId[1]
		},
		"dataType": "json",
		"success": function(data) {
			var obj = data;
			for(var i = 0; i < obj.data.length; i++) {
				$("#box").html('<div><img src="' + obj.data[0].goods_thumb + '" /><div class="info"><p class="bh">编号' + obj.data[0].goods_id + '</p><p class="xname">' + obj.data[0].goods_name + '</p><p class="xdesc">' + obj.data[0].goods_desc + ',' + obj.data[0].goods_desc + ',' + obj.data[0].goods_desc + '</p><p class="price">' + obj.data[0].price + '</p><span class="cart">加入购物车</span></div></div>');
			}
		}
	});

	$("#btn").click(function() {

		var str = $("#str").val();
		console.log(str);

		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php",
			"type": "GET",
			"data": {
				"goods_id": str
			},
			"dataType": "json",
			"success": function(data) {
				var obj = data;
				for(var i = 0; i < obj.data.length; i++) {
					$("#box").html('<div><img src="' + obj.data[0].goods_thumb + '" /><div class="info"><p class="bh">编号' + obj.data[0].goods_id + '</p><p class="xname">' + obj.data[0].goods_name + '</p><p class="xdesc">' + obj.data[0].goods_desc + ',' + obj.data[0].goods_desc + ',' + obj.data[0].goods_desc + '</p><p class="price">' + obj.data[0].price + '</p><span class="cart">加入购物车</span></div></div>');
				}

			}

		});

	});

	$("body").on('click', '.cart', function() {
		if(!localStorage.getItem("token")) {

			alert("登录后才可添加到购物车，请登录");
			location.href = "login.html#callback=" + location.href;
			return;

		}

		var goods_number = localStorage.getItem("cart" + goodsId[1]);

		goods_number = goods_number ? parseInt(goods_number) + 1 : 1;

		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
			"type": "POST",
			"data": {
				"goods_id": goodsId[1],
				"number": goods_number
			},
			"dataType": "json",
			"success": function(data) {
				//							console.log(data.message);	
				//							
				//							console.log(data);
				localStorage.setItem("cart" + goodsId[1], goods_number);

				console.log(localStorage.getItem("cart" + goodsId[1]));
				location.href = "shopcar.html"
			}
		})

		

	})

})