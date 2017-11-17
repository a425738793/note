$(function(){
	if(localStorage.getItem("token")) {

		$(".login").html("欢迎，" + localStorage.getItem("username") + "<span class='quit'>退出</span>");

	} else {
		$(".login").html('<a href="login.html">登录</a><a href="register.html">注册</a>')
	}

	$(".shopcar").click(function() {

		location.href = "shopcar.html"

	});
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
		if (l ===0) {
			l = Math.random()*10-5;
		}
		if (t ===0) {
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
	