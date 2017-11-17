$(function() {

	$("#userNmae").blur(function() {
		var un = $("#userNmae").val();
		$("#un-info").removeClass().html("");
		$.ajax({
			"type": "post",
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
			"data": {
				"status": "check",
				"username": un
			},
			"dataType": "json",
			"success": function(data) {
				console.log(data);
				if(data.code === 0) {
					$("#un-info").addClass("success").html(data.message);
				} else {
					if(data.code === 1000) {
						$("#un-info").addClass("error").html("请输入合法用户名");
					} else {
						$("#un-info").addClass("error").html(data.message);
					}
					//							
				}
			}
		});
	})

	var sec = 2;
	$("#register").click(function() {
		var un = $("#userNmae").val();
		var up = $("#userPassword").val();
		//				console.log(un,up);
		$("#up-info").removeClass().html("");
		if(up.length < 6 || up.length > 20) {
			$("#up-info").addClass("error").html("请输入6~20位密码");
			return;
		}

		$.ajax({
			"type": "post",
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
			"data": {
				"status": "register",
				"username": un,
				"password": up
			},
			"dataType": "json",
			"success": function(data) {
				if(data.code === 0) {
					$("body").html($("<div class='wrap'><p class='success-reg'>恭喜注册成功，3秒后跳转到登录页</p></div>"));
					setInterval(function() {
						$(".wrap").html($("<p class='success-reg'>恭喜注册成功，" + sec + "秒后跳转到登录页</p>"));
						sec--;
						if(sec < 0) {
							location.href = "login.html";
						}
					}, 1000)

				} else {
					if(data.code === 1000) {
						$("#info").addClass("error").html("请输入合法用户名");
					} else {
						$("#up-info").addClass("error").html(data.message);
					}

				}
			}
		});

	})

	$(".log").click(function() {

		location.href = "login.html";

	})

})