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

	$("body").on('click', '.quit', function() {

		localStorage.clear();
		location.href = location.href;

	})
	aJax();

	function aJax() {

		$.ajax({
			"type": "get",
			"url": "http://h6.duchengjiu.top/shop/api_useraddress.php",
			"data": {
				"token": localStorage.token
			},
			"dataType": "json",
			"success": function(data) {

				var obj = data;
				if(obj.data.length === 0) {
					$("#addList").html("您还尚未添加收货地址，请点击右上角添加");
					return;
				}
				for(var i = 0; i < obj.data.length; i++) {
					var html = `<li class="address" addId="${obj.data[i].address_id}">
									寄送至：
									<span class="province">${obj.data[i].province}省</span>
									<span class="city">${obj.data[i].city}市</span>
									<span class="district">${obj.data[i].district}区</span>
									<span class="street">${obj.data[i].address}</span>
									<span class="address-name">${obj.data[i].address_name}</span>
									<span class="mobile">${obj.data[i].mobile}</span>
									<em class="del">删除</em>
								</li>`;
					$("#addList").html($("#addList").html() + html);
				}
				$(".del").click(function() {
					$(this).attr("addId")
					$.ajax({
						"type": "get",
						"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?status=delete&address_id=" + $(this).parent().attr("addId"),
						"dataType": "json",
						"data": {
							"token": localStorage.token
						},
						"success": function(data) {

							console.log(data);
							$("#addList").html("");
							aJax();
						}
					});
				})

				$(".address").click(function() {

					$(this).addClass("cur").siblings().removeClass("cur");

				})

			}

		});

	}

	$("#add").click(function() {

		$("#add-adds").show();

	});
	$("#over").click(function() {

		$("#add-adds").hide();

	});
	$("#add-btn").click(function() {

		var str = $("form").serialize();
		//		console.log(str);
		$.ajax({
			"type": "post",
			"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token + "&status=add",
			"data": str,
			"dataType": "json",
			"success": function(data) {
				alert(data.message);
				$("#addList").html("");
				aJax();
				$("#add-adds").hide();
			}
		});

	})

	var sum = location.search.substr(1);
	//	console.log(sum);
	var newSum = sum.split("=");
	//	console.log(newSum);
	$(".buttom .sum").html("共￥" + newSum[1]);

	$(".submit").click(function() {

		var addId = $(".cur").attr("addid");
		if(!addId) {
			alert("请选择收货地址");
			return;
		}

		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_order.php?token=" + localStorage.token + "&status=add",
			"type": "POST",
			"data": {
				"address_id": addId,
				"total_prices": newSum[1]
			},
			"dataType": "json",
			"success": function(response) {
				//				console.log(response);
				alert(response.message);
				location.href = "order.html";
			}

		})

	})

})