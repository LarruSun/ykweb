      // JavaScript Document

      //提示成功消息.

      function alertSuccess(info, timer) {
        showDialog({
          type: 4,
          msg: info,
          timer: timer
        });
      }

      //提示info消息.

      function alertInfo(info, timer) {
        showDialog({
          type: 1,
          msg: info,
          timer: timer
        });
      }

      //提示错误消息.

      function alertErrors(info, timer) {
        showDialog({
          type: 5,
          msg: info,
          timer: timer
        });
      }

      //提示加载消息.

      function alertLoading(info, timer) {
        showDialog({
          type: 6,
          msg: info,
          timer: timer
        });
      }
	  
	  //提示框隐藏
	  function alertHide(){
	  	ZENG.msgbox.hide();
	  }



      function showDialog(o) {
        o = o ? o : {};
        var defaults = {
          msg: "",
          type: 1,
          timer: 1000,
          callBack: function() {},
          beforeCheck: function() {}
        };
        o = $.extend(true, defaults, o);

        //在弹出之前回调
        o.beforeCheck();

        //显示对话框
        ZENG.msgbox.show(o.msg, o.type, o.timer);
        //减去提示框的高度 54px
        $("#q_Msgbox").css({
          top: $(window).height() / 2 - 54
        });

        //在提示框完成之后回调.
        setTimeout(function() {
          o.callBack();
        }, o.timer);
      }
	  

      //确认删除

      function confirmDel(o) {
        o = o ? o : {};
        var defaults = {
		  url:"del.post",
		  timer: 5000,
          title: "系统提示",
          msg: "你确认进行删除操作吗?",
		  lodingMsg:"正在进行删除操作，请稍后...",
		  paraments:{},
          callback: function() {},
		  clickCallback:function(r){},
          preHandle: function() {}
        };
        o = $.extend(true, defaults, o);
        o.preHandle();
        console.log($.messager);
        $.confirm(o.title, o.msg, function(r) {
		   o.clickCallback(r);
		   if(r){
			    alertLoading(o.lodingMsg, varLoadingMaxWaitTime);
				var requestURL = getOperUrl(o.url);
				$.post(requestURL, o.paraments, function(resp) {
				  if (resp.status == "y") {
					alertSuccess(resp.msg, o.timer);
					setTimeout(function() {
					  o.callback(resp); //回调
					}, o.timer);
				  }//end if
				}); //end getJson
		   }
        });
      }