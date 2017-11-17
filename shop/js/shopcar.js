$(function() {
	$.ajax({
		"type": "get",
		"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
		"dataType": "json",
		"success": function(data) {
			console.log(data);
			var obj = data;
			var html = '';
			var goodId = []
			if(obj.data.length >= 1) {
				for(var i = 0; i < obj.data.length; i++) {
					html += '<div class="list"><div class="pic"><input type="checkbox" name="shop" id="shop" class="shop"  /><input type="hidden" class="goodsId" value="' + obj.data[i].goods_id + '"><img src="' + obj.data[i].goods_thumb + '"/></div><div class="info">' + obj.data[i].goods_name + '</div><div class="price">' + obj.data[i].goods_price + '</div><div class="number"><button class="reduce">-</button><input type="text" name="number" class="number-shop" value="' + obj.data[i].goods_number + '" /><button class="add">+</button></div><div class="money">' + obj.data[i].goods_number * obj.data[i].goods_price + '</div><div class="con">删除</div></div>'
				}
				$(".content").html(html);
			} else {
				$(".content").html("当前没有添加商品");
			}

		}
	});

	var inx = 0;
	$("#all").click(function() {
		inx = inx == 0 ? 1 : 0;
		if(inx == 1) {
			$(this).prop("checked", true);
			$(".content .shop").prop("checked", true);
			//			console.log($(".content .shop").prop("checked"))
		} else if(inx == 0) {
			$(this).prop("checked", false);
			$(".content .shop").prop("checked", false);
			//			console.log($(".content .shop").prop("checked"))
		}

		changeTxt()

	})

	$("body").on("click", ".con", function() {

		var goodsId = $(this).siblings(".pic").children(".goodsId").val();
		console.log(goodsId);
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
			"type": "POST",
			"data": {
				"goods_id": goodsId,
				"number": 0
			},
			"dataType": "json",
			"success": function(data) {
				console.log(data.message);
				localStorage.setItem("cart"+goodsId,0);
				$.ajax({
					"type": "get",
					"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
					"dataType": "json",
					"success": function(data) {
						console.log(data);
						var obj = data;
						var html = '';
						var goodId = []
						if(obj.data.length >= 1) {
							for(var i = 0; i < obj.data.length; i++) {
								html += '<div class="list"><div class="pic"><input type="checkbox" name="shop" id="shop" class="shop"  /><input type="hidden" class="goodsId" value="' + obj.data[i].goods_id + '"><img src="' + obj.data[i].goods_thumb + '"/></div><div class="info">' + obj.data[i].goods_name + '</div><div class="price">' + obj.data[i].goods_price + '</div><div class="number"><button class="reduce">-</button><input type="text" name="number" class="number-shop" value="' + obj.data[i].goods_number + '" /><button class="add">+</button></div><div class="money">' + obj.data[i].goods_number * obj.data[i].goods_price + '</div><div class="con">删除</div></div>'

							}
							$(".content").html(html);
						} else {
							$(".content").html("当前没有添加商品");
						}

					}
				});

			}
		})

	})

	$("body").on("click", ".add", function() {

		var newval = parseInt($(this).siblings(".number-shop").val()) + 1
		if(newval >= 1 && newval <= 10) {
			$(this).siblings(".number-shop").val(newval);
			$(this).parent().siblings(".money").html(newval * $(this).parent().siblings(".price").html());
		} else {
			return;
		}
		changeTxt()

	})

	$("body").on("click", ".reduce", function() {

		var newval = parseInt($(this).siblings(".number-shop").val()) - 1
		if(newval >= 1 && newval <= 10) {
			$(this).siblings(".number-shop").val(newval);
			$(this).parent().siblings(".money").html(newval * $(this).parent().siblings(".price").html());
		} else {
			return;
		}

		changeTxt()
	})

	$("body").on("click", ".shop", function() {

		changeTxt()
	})
	$("body").on("blur", ".number-shop", function() {
		if($(this).val() > 10) {
			$($(this)).val(10);
		}
		if($($(this)).val() < 1) {
			$($(this)).val(1);
		}

	})

	$(".del").click(function() {

		$(".content .shop").each(function(i) {

			if($(this).is(":checked")) {

				var goodsId = $(this).siblings(".goodsId").val();
				console.log(goodsId);
				$.ajax({
					"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
					"type": "POST",
					"data": {
						"goods_id": goodsId,
						"number": 0
					},
					"dataType": "json",
					"success": function(data) {
						localStorage.setItem("cart"+goodsId,0);
						
						$.ajax({
							"type": "get",
							"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
							"dataType": "json",
							"success": function(data) {
								console.log(data);
								var obj = data;
								var html = '';
								var goodId = []
								if(obj.data.length >= 1) {
									for(var i = 0; i < obj.data.length; i++) {
										html += '<div class="list"><div class="pic"><input type="checkbox" name="shop" id="shop" class="shop"  /><input type="hidden" class="goodsId" value="' + obj.data[i].goods_id + '"><img src="' + obj.data[i].goods_thumb + '"/></div><div class="info">' + obj.data[i].goods_name + '</div><div class="price">' + obj.data[i].goods_price + '</div><div class="number"><button class="reduce">-</button><input type="text" name="number" class="number-shop" value="' + obj.data[i].goods_number + '" /><button class="add">+</button></div><div class="money">' + obj.data[i].goods_number * obj.data[i].goods_price + '</div><div class="con">删除</div></div>'
									}
									$(".content").html(html);
								} else {
									$(".content").html("当前没有添加商品");
								}

							}
						});

					}
				})

			}

		})

		$(".cur em").eq(0).text(0);
		$(".cur em").eq(1).text("￥0");

	})

	function changeTxt() {

		var sum = 0;
		var money = 0;
		$(".shop").each(function(i) {
			if($(this).is(":checked")) {

				sum += parseInt($(".list .number-shop").eq(i).val());
				money += parseInt($(".list .money").eq(i).text());

			}

		})

		$(".cur em").eq(0).text(sum);
		$(".cur em").eq(1).text("￥" + money);

	}
	$(".over").click(function() {

		var sum = $(".cur em").eq(1).text().substr(1);
		console.log(sum);
		location.href = "settle.html?sum=" + sum;
	})
})