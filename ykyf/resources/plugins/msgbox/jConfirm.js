/*
 * jQuery Plugin : jConfirmAction
 * 
 * tc
 */
(function($){

	jQuery.fn.jConfirmAction = function (options) {
		
		var theOptions = jQuery.extend ({
			question: "Are You Sure ?",
			yesAnswer: "Yes",
			cancelAnswer: "Cancel",
			id:"id",
			url:"url"
		}, options);
		
		return this.each (function () {
				thisHref = $(this).attr('href');
				if($(this).next('.question').length <= 0)
					$(this).after('<div class="question">'+theOptions.question+'<br/> <span class="yes">'+theOptions.yesAnswer+'</span><span class="cancel">'+theOptions.cancelAnswer+'</span></div>');
				var o = $(this).next('.question');
				//开confirm窗口
				o.animate({opacity: 1}, 300);
				//绑定确定按钮事件
				$('.yes').bind('click', function(){
					alertLoading("正在删除中...",36000);
					$.ajax({
						type : "POST",
						async : false,
						dataType : "json",
						url : theOptions.url,
						data:{id:theOptions.id},
						success: function(data){
							if (data != null) {
								if(data.state=="true"){
									alertSuccess(data.message,2000);
									$(".cancel").click();
									initPage();
								}else{
									alertErrors(data.message,2000);
								}
							}
						}
					});
				});
				//绑定取消按钮事件
				$('.cancel').bind('click', function(){
					$(this).parents('.question').fadeOut(300, function() {
						$(this).remove();
					});
				});
		});
	}
	
})(jQuery);