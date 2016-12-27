function deleteArrItem(a, b) {
	for (var c in a) a[c] == b && a.splice(c, 1)
}
function subform() {
	var a = /^1[34578]{1}[0-9]{9}$/,
		b = $.trim($("#mobile").val());
	return a.test(b) ? "" == subposition || "" == subId ? (TC.ToastBox.show({
		msg: "请选择渠道来源",
		bottom: "50%"
	}), !1) : ($("#extendPosition").val(subposition), $("#extendWaysText").val(subId), !0) : (TC.ToastBox.show({
		msg: "请输入11位手机号码",
		bottom: "50%"
	}), !1)
}
var positionArr, idArr, subposition, subId;
!
function() {
	$.fn.channelEx = function(b) {
		curObj = b;
		var c = new a;
		c.init()
	};
	var a = function() {
			this.channelArr = [], this.channelnewArr = []
		};
	a.prototype = {
		rand: function(a, b) {
			var c = b - a + 1;
			return Math.floor(Math.random() * c + a)
		},
		getNewArr: function() {
			var a = _this.channelArr.length,
				b = _this.rand(0, a - 1),
				c = _this.channelArr.splice(b, 1);
			console.log(c[0].title), _this.channelnewArr.push({
				title: c[0].title
			})
		},
		init: function() {
			_this = this, $.ajax({
				url: context + "/qiandao/redis/extends/way",
				type: "get",
				dataType: "JSONP",
				data: {
					cityId: $("#cityId").val(),
					type: 1,
					tcjNum: "1"
				},
				success: function(a) {
					var b, c, d, e;
					alert(a.code);
					if (1e4 == a.code && a.result) {
						for ($("#channel-sec-tit").text(a.result.title.titleMap), _this.channelArr = a.result.content, b = _this.channelArr.length, c = "", d = 1; b >= d; d++) _this.getNewArr();
						for (e in _this.channelnewArr) c += "<li><span class='channel-li-span'>" + _this.channelnewArr[e].title + "</span></li>";
						$(curObj).append(c)
					} else window.location.href = context + "/qiandao/html/register/error.jsp"
				},
				error: function() {
					//window.location.href = context + "/qiandao/html/register/error.jsp"
				}
			})
		}
	}
}(), $("#channel").channelEx(document.getElementById("channel")), positionArr = [], idArr = [], subposition = "", subId = "", $("#channel").delegate("li", "click", function() {
	var a = $(this).index() + 1,
		b = $(this).text();
	$(this).hasClass("cur") ? ($(this).removeClass("cur"), deleteArrItem(idArr, b), deleteArrItem(positionArr, a)) : ($(this).addClass("cur"), positionArr.push(a), idArr.push(b)), positionArr.length > 0 ? $("#registerBtn").removeClass("registerBtn-gray").removeAttr("disabled") : $("#registerBtn").addClass("registerBtn-gray").attr("disabled", "disabled"), subposition = positionArr.join(","), subId = idArr.join("@#")
}), $("#tcjIndexForm").submit(function() {
	return subform()
});