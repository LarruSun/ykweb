
//新增的左右交互（weixin_bianji.html）
function changeTxt(txt1,txt2){          /*左右交互*/
    $(txt1).bind('keyup',function(){
        var cc=$(this).val();
        $(txt2).html(cc);
    })
}
changeTxt(".vip_wei_val",".huiya");
changeTxt(".eml_a","#lyny_a");

$("  .p5 .pmd label").click(function(){
    var n=$(this).index();
    if(n==1){
        $(" .p5 .addCon").show();
    }else{
        $(" .p5 .addCon").hide();
    }
})

//全选按钮
jQuery(function($) {
	    var clickAarr=$(".clickAll");
	    for(var i=0;i<clickAarr.length;i++){
	    	clickAarr[i].index=i;
	    }
		$('.clickAll').on('click' , function(){
			var that = this;
			var n=this.index;
			console.log(n);
			$('.table_all').eq(n).find('tr > td:first-child input:checkbox')
			.each(function(){
				this.checked = that.checked;
				$(this).closest('tr').toggleClass('selected');
			})


		});
	})

jQuery(function($) {
	$('table th input:checkbox').on('click' , function(){
		var that = this;
		$(this).closest('table').find('tr > td:first-child input:checkbox')
		.each(function(){
			this.checked = that.checked;
			$(this).closest('tr').toggleClass('selected');
		});

	});
})
function ckControl(ck1,ck2){
    //Allck控制ck
    var that=$(ck1);
    $(ck1).click(function(){
        var isChose=that.prop("checked");
        if(isChose){
            $(ck2).each(function(i,o){
                $(this).prop("checked","true");
            })
        }else{
            $(ck2). removeAttr("checked");
        }
    })
    //ck控制Allck
    var isCk=false;
    $(ck2).click(function(){
        $(ck2).each(function(i,o){
            if(!$(this).prop("checked")){
                isCk=false;
                return isCk;
            }else{
                isCk=true;
                return isCk;
            }
        })
        if(isCk){
            $(ck1).prop("checked","true");
        }else{
            $(ck1).removeAttr("checked");
        }
    })
}
ckControl(".check_all",".check_son");


$(function(){
    var arr=$(".add");
    var len=arr.length;
    for(var i=0;i<len;i++){
        //arr[i].flag=true;
        arr[i].index=i;
    }
    $(".add").bind({"click":function(){
        if($(this).html()=="加入"){
            $("#Llist").append($(this).prev().clone(true).attr("id","ids"+this.index));
            $(this).css('color','#999').html("已加入>")
        }else{
            $("#Llist").find("#ids"+this.index).remove();
            $(this).css('color','#000').html("加入")
        }
    }

    },"#Rlist .ccc")

})

/*日期*/

$(function(){
    function changeTxt(txt1,txt2){          /*time交互*/
        $(txt1).bind('change',function(){
            var cc=$(this).val();
            $(txt2).html(cc);
        })
    }
    changeTxt("#datetime",".create_time");
    changeTxt("#datetime_1",".create_time_1");
})

//temp_bj
$(function(){
    $(".Cright_m .p1 .choseColor .bColor").click(function(){
        $(this).next().show();
        var that=$(this);
        $(".Cright_m .p1 .choseColor .colorList span").click(function(){
            $(this).parent().hide();
            var bg=$(this).css("background-color");
            that.children("span").css("background-color",bg);
            
            $(" .te_jar_back").css("background-color",bg);
        })
    });
});
$(function(){
    var num;
    var index_=$(".Cright_m .radio label input");
    var length_=$(".Cright_m .radio label input").length;
    for(var i=0;i<length_;i++){
        index_[i].index=i;
        index_[i].onclick=function(){
            num=this.index;
            console.log(num);
        }

    }
    $(".Cright_m .radio label input").click(function(){
        if(num==0) {
            $(this).parent().next().show();
            $(".hhl_b .kojer").show();
            $(".Cright_m .topp").hide();
            $(".Cright_m .explain").hide();
            $(".hhl_b .te_jar_img_B").hide();

        }
        if(num==1) {
            $(this).parent().next().show();
             $(".hhl_b .te_jar_img_B").show();
            $(this).parent().parent().next().show();
            $(".Cright_m .p1").hide();
            $(".hhl_b .kojer").hide();
        }
    });

});


//左右交互
function changeLR(txt1,txt2){
    $(txt1).bind('keyup',function(){
        var cc=$(this).val();
        $(txt2).html(cc);
        //console.log(cc);
    })
}
changeLR(".vip_price_text",".vip_price_show_s");
//changeLR(".integral_in_text",".integral_in_text_show");
changeLR(".holds_top_son2 .holds_name",".temp_jr .temp_left .holds_her");
//changeLR(".holds_top_son2 .holds_nam",".temp_jr .temp_left .holds_her2");
changeLR(".temp_right .custom .custom_icona_val",".temp_jr .temp_left .custom_icona");
changeLR(".temp2_right .custom .custom_icona_val2",".temp_jr .temp_left .custom_a2");

//图标删除
$(function(){
   $(".temp_jr .temp_right .custom_dele").click(function(){
       $(this).parent().parent().hide();
       $(".temp_right .custom .custom_icona_val").html(" ");
       $(".temp_jr .temp_right .add_custom").show();
       $(".temp_jr .temp_left .separate_other").hide();

   });
    $(".temp_jr .temp_right .add_custom").click(function(){
        $(this).hide();
       $(".temp_jr .custom_hide").show();
        $(".temp_jr .temp_left .separate_other").show();
    });
});

$(function(){
    $(".temp_jr .temp2_right .custom_dele").click(function(){
        $(this).parent().parent().hide();
        $(".temp2_right .custom .custom_icona_val").html(" ");
        $(".temp_jr .temp2_right .add_custom").show();
        $(".temp_jr .temp_left .custom_img").hide();

    });
    $(".temp_jr .temp2_right .add_custom").click(function(){
        $(this).hide();
        $(".temp_jr .custom_hide").show();
        $(".temp_jr .temp_left .custom_img").show();
    });
});


//计数器
function changeNum(txt1,txt2){
    $(txt1).bind('keyup',function(){
        var num= $(this).val();
        $(txt2).html(num.length);
    })
}
changeNum(" .custom .custom_icona_val2",".haha2");
//状态选择
$(function(){
    function clickadd(add1){
        $(add1).bind('click',function(){
            $(this).siblings().removeClass("red");
            $(this).addClass("red");
            // console.log(this);
        })
    }
    clickadd(".add_state .add_state_1 a");
})



$(function(){
    $(".order_list .order_time .order_bo a").bind('click',function(){
        $(this).siblings().removeClass("order_list_activ");
        $(this).addClass("order_list_activ");
        console.log($(this))
    })

});
$(".order_today").click(function(){
    var dd = new Date();
    var y = dd.getFullYear();//获取当前年份的日期
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();//获取当天日期
    var w = dd.getDay();//获取当前星期的日期
    $("#wei_datetime").val(y+"-"+m+"-"+d);
    $("#wei_datetime1").val(y+"-"+m+"-"+d);
    return y+"-"+m+"-"+d;
})
$(".order_today2").click(function(){
    var dd = new Date();
    var y = dd.getFullYear();//获取当前年份的日期
    var m = dd.getMonth()+1;//获取当前月份的日期
    var yesterday = dd.getDate()-1;//获取昨天日期
    var d = dd.getDate();//获取当天日期
    var w = dd.getDay();//获取当前星期的日期
    $("#wei_datetime").val(y+"-"+m+"-"+yesterday);
    $("#wei_datetime1").val(y+"-"+m+"-"+d);
    return y+"-"+m+"-"+d;
})
$(".order_today3").click(function(){
    var dd = new Date();
    var y = dd.getFullYear();//获取当前年份的日期
    var m = dd.getMonth()+1;//获取当前月份的日期
    var week = dd.getDate()-7;//获取当昨天日期
    var d = dd.getDate();//获取当昨天日期
    var w = dd.getDay();//获取当前星期的日期
    $("#wei_datetime").val(y+"-"+m+"-"+week);
    $("#wei_datetime1").val(y+"-"+m+"-"+d);
    return y+"-"+m+"-"+d;
})
$(".order_today4").click(function(){
    var dd = new Date();
    var y = dd.getFullYear();//获取当前年份的日期
    var m = dd.getMonth()+1;//获取当前月份的日期
    var m2 = dd.getMonth();//获取上月份的日期
    var month = dd.getDate()+1;//获取当昨天日期
    var d = dd.getDate();//获取当天日期
    var w = dd.getDay();//获取当前星期的日期
    $("#wei_datetime").val(y+"-"+m2+"-"+month);
    $("#wei_datetime1").val(y+"-"+m+"-"+d);
    return y+"-"+m+"-"+d;
})
$(function(){
    var num1;
    var arr= $(".activate_label  label input");
    var len=$(".activate_label  label input").length;
    for(var i=0;i<len;i++){
        arr[i].index=i;
        arr[i].onclick=function(){
            num1=this.index;
            console.log(num1);
            if(num1==0){
                $(".activate").hide();
            }
            if(num1==1){
                $(".activate").show();
            }
        };
    }
});
