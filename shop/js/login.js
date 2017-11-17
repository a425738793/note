$(function() {
	var sec = 2;
	if(localStorage.getItem("token")) {
		$(".wrap").html($("<p class='onlogin'>您已登录，3秒后跳转到首页</p>"));
		setInterval(function() {
			$(".wrap").html($("<p class='onlogin'>您已登录，" + sec + "秒后跳转到首页</p>"));
			sec--;
			if(sec < 0) {
				location.href = "index.html";
			}
		}, 1000)

	}

	$("#login").click(function() {

		var un = $("#userNmae").val();
		var up = $("#userPassword").val();
		//				console.log(un,up);
		$.ajax({
			"type": "post",
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
			"data": {
				"status": "login",
				"username": un,
				"password": up
			},
			"dataType": "json",
			"success": function(data) {
				console.log(data);
//				localStorage.setItem("token", data.data.token);
				console.log(localStorage.getItem("token"));
				if(data.code === 0) {

					for(prop in data.data) {
						if(data.data.hasOwnProperty(prop)) {

							localStorage.setItem(prop, data.data[prop]);

						}

					}

					var callbackURL = location.hash.substr(10);
					if(callbackURL) {
						location.href = callbackURL;
						return;
					}

					$("body").html($("<div class='wrap'><p class='success-lo'>登录成功，3秒后跳转到首页</p></div>"));
					setInterval(function() {
						$(".wrap").html($("<p class='success-lo'>登录成功，" + sec + "秒后跳转到首页</p>"));
						sec--;
						if(sec < 0) {
							location.href = "index.html";
						}
					}, 1000)

				}else{

					if(data.code === 1000){
						alert('请输入正确的账号密码');
						return;
					}else{
						alert(data.message);
						return;
					}
					
				}

			}
		});

	})

	$(".reg").click(function() {
		location.href = "register.html"
	})

})