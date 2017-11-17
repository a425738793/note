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
	$.get("http://h6.duchengjiu.top/shop/api_goods.php", function(data) {

		var obj = data;
		console.log(obj);
		for(var i = 0; i < data.data.length; i++) {

			$("#goodsUl").append('<li><img src="' + obj.data[i].goods_thumb + '" /><p class="name"><a href=detail.html?goods_id=' + obj.data[i].goods_id + '>' + obj.data[i].goods_name + '</a></p><p class="desc">' + obj.data[i].goods_desc + '</p><p class="price">' + obj.data[i].price + '元</p></li>');

		}

	})
	var str = location.search.substr(1);
	var page = 1; 
	var catId = str.split("=");
//	console.log(catId);

	$.get("http://h6.duchengjiu.top/shop/api_cat.php", function(data) {

		for(var i = 0; i < data.data.length; i++) {
			$("#nav .nav").append("<li><a href='list.html?cat_id=" + data.data[i].cat_id + "'>" + data.data[i].cat_name + "</a></li>")
		}

	})
	changePage(page);
	function changePage(page){
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page="+page+"&pagesize=10",
			"type": "GET",
			"data": {
				"cat_id": catId[1],
				
			},
			"dataType": "json",
			"success": function(response) {
				$("#goodsUl").html("");
				var obj = response;
				for(var j = 0;j<obj.page.page_count;j++){
							$("#ButtonCenter").append($('<span>' + (j+1) + '</span>' ));
						}
				for(var i = 0; i < obj.data.length; i++) {
	
					$("#goodsUl").append('<li><img src="' + obj.data[i].goods_thumb + '" /><p class="name"><a href=detail.html?goods_id=' + obj.data[i].goods_id + '>' + obj.data[i].goods_name + '</a></p><p class="desc">' + obj.data[i].goods_desc + '</p><p class="price">' + obj.data[i].price + '元</p></li>');
				}
			}
	
		})
	}
	$("#ButtonNext").click(function(){
				
		page++;
		$("#shop").html("");
		changePage(page);
		$("#ButtonCenter").css("margin-left",(page-2)*-52+"px");
		console.log($("#ButtonCenter").css("margin-left"));
		
	});
	$("#ButtonPrev").click(function(){
		
		page--;
		if (page<=1) {
			page = 1; 
//					$("#ButtonPrev").hide()
		}
		$("#shop").html("");
		changePage(page);
		$("#ButtonCenter").css("margin-left",(page-2)*-52+"px");
		console.log($("#ButtonCenter").css("margin-left"));
		
	})
	
	$("#ButtonCenter").click(function(event){
		event = event || window.event;
		
		var target = event.target ||event.srcElement;
//				console.log(target.nodeName);
		if (target.nodeName === "SPAN") {
			page = target.innerText;
			console.log(page);
			$("#shop").html("");
			changePage(page);
			
			$("#ButtonCenter").css("margin-left",(page-2)*-52+"px");
			
		}
		
	})	

	var timer = null;
	for(var i = 0; i < 20; i++) {
		$("<div class='move'></div>").appendTo($("body"));
	}
	$(".move").each(function(i) {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var left = Math.random() * $(window).width();
		var top = Math.random() * $(document).height();
		$(".move").eq(i).css({
			"width": 50,
			"height": 50,
			"background-color": "rgb(" + r + "," + g + "," + b + ")",
			"position": "absolute",
			"left": left,
			"top": top,
			"border-radius": "50%",
			"opacity": .3
		});
	})

	var arrL = [];
	var arrT = [];
	var l = 0;
	var t = 0;
	for(var j = 0; j < 20; j++) {
		l = Math.random()*10-5;
		t = Math.random()*10-5;
		if (l === 0) {
			l = Math.random()*10-5;
		}
		if (t === 0) {
			t = Math.random()*10-5;
		}
		
		arrL.push(l);
		arrT.push(t);
	}
	setInterval(function() {
		$(".move").each(function(i) {
			var nL = arrL[i] + parseInt($(".move").eq(i).css("left"));
			var nT = arrT[i] + parseInt($(".move").eq(i).css("top"));
			if(nL < 0) {
				nL = 0;
			}
			if(nL > $(window).width() - 50) {
				nL = $(window).width() - 50;
			}
			if(nT < 0) {
				nT = 0;
			}
			if(nT > $(document).height() - 50) {
				nT = $(document).height() - 50;
			}

			if(nL <= 0 || nL >= $(window).width() - 50) {
				arrL[i] = -arrL[i];
			}
			if(nT <= 0 || nT >= $(document).height() - 50) {
				arrT[i] = -arrT[i];
			}
			$(".move").eq(i).css({
				"left": nL,
				"top": nT
			})

		})

	}, 30)

})