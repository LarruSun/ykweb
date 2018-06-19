/**
 * Created by Administrator on 2017/4/9.
 */
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
    clickadd(".add_state0 .add_state_1 a");
    clickadd(".temp_t .add_state_1 a");
    clickadd(".temp_tt .add_state_1 a");


//Allck,ck互控函数
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
ckControl(".voucher_list .tbShow thead input",".voucher_list .tbShow tbody input");
ckControl(".Voucher_cModal .mditem table thead input",".Voucher_cModal .mditem table tbody input");
ckControl(".voucher_Cright .Cright_two_3 .scene .scene_input",".voucher_Cright .Cright_two_3 .scene .scene_son .scene_son_input");
ckControl(".promoting .clickAll thead input",".promoting .clickAll tbody input");
ckControl(".collect_stamps .tbShow thead input",".collect_stamps .tbShow tbody input");

//背景选择
$(".voucher_Cright .Cright_main_son1 .p1 .choseColor .bColor").click(function(){
    $(this).next().show();
    var that=$(this);
    $(".voucher_Cright .Cright_main_son1 .p1 .choseColor .colorList span").click(function(){
        $(this).parent().hide();
        var bg=$(this).css("background-color");
        that.children("span").css("background-color",bg);
        $("#yhQuan_temp2 .con").css("background-color",bg);
        var value = $(this).attr("value");
        $("#couponsColor").val(value);
        // var a= document.styleSheets[0].addRule('.con::before','background: red');
        //  console.log(a)
    })
});


//左右交互
function changeTxt(txt1,txt2){
    $(txt1).bind('keyup',function(){
        var cc=$(this).val();
        $(txt2).html(cc);
        //console.log(cc);
    })
}
changeNum("#remark","#remarkChiosed");
/*changeNum("#changecouponsName","#nameChiosed");*/

changeTxt("#tab_clone .guide3","#accordion .pl_text3");
changeTxt("#tab_clone .guide2","#accordion .pl_text2");
changeTxt("#tab_clone .guide","#accordion .pl_text");
changeTxt(".voucher_Cright .Cright_main_son2 .create_val",".voucher_Cleft .create_text");
changeTxt(".voucher_Cright .Cright_main_son3 .create_val_2",".voucher_Cleft .create_text_2");
changeTxt(".voucher_Cright .Cright_main_son4 .create_val_3",".voucher_Cleft .create_text_3");
changeTxt(".timeOther .voucher_time_data",".canUseTime .time_time");
changeTxt(".timeOther .voucher_time_data1",".canUseTime .time_time1");
changeTxt(".timeOther .voucher_time_data2",".canUseTime .time_time2");
changeTxt(".timeOther .voucher_time_data3",".canUseTime .time_time3");
changeTxt(".holds_name",".holds_her");
changeTxt(".holds_name1",".holds_her1");
changeTxt(".cover_text",".shadow_text_val");

$(function(){               //券（微信）
    $("#tab_clone .the_Custom_val").bind('keyup',function(){
        var cc=$(this).val();
        $("#accordion .the_Custom").html(cc);
        console.log(cc);
    });
    $(".the_Custom_val2").bind('keyup',function(){
        var cc=$(this).val();
        $("#accordion .the_Custom2").html(cc);
        console.log(cc);
    });
    $(".the_Custom_val3").bind('keyup',function(){
        var cc=$(this).val();
        $("#accordion .the_Custom3").html(cc);
        console.log(cc);
    });
    $("#tab_clone .guide3").bind('keyup',function(){
        var cc=$(this).val();
        $("#accordion .pl_text3").html(cc);
        console.log(cc);
    });
    $("#tab_clone .guide2").bind('keyup',function(){
        var cc=$(this).val();
        $("#accordion .pl_text2").html(cc);
        console.log(cc);
    });
    $("#tab_clone .guide").bind('keyup',function(){
        var cc=$(this).val();
        $("#accordion .pl_text").html(cc);
        console.log(cc);
    })
});


//计数器
function changeNum(txt1,txt2){
    $(txt1).bind('input propertychange',function(){
        var num= $(this).val();
        $(txt2).html(num.length);
    })
}


changeNum(".voucher_Cright .Cright_main_son2 .create_val",".voucher_Cright .Cright_main_son2 .chiosed");
changeNum(".holds_name1",".nbg");
changeNum(".holds_name2",".nbg2");

$(function(){               //券（微信）
    $(".the_Custom_val").bind('keyup',function(){
        var num= $(this).val();
        $(".mship_color1").html(num.length);
    })
    $(".the_Custom_val2").bind('keyup',function(){
        var num= $(this).val();
        $(".mship_color2").html(num.length);
    })
    $(".the_Custom_val3").bind('keyup',function(){
        var num= $(this).val();
        $(".mship_color3").html(num.length);
    })
    $(".guide").bind('keyup',function(){
        var num= $(this).val();
        $(".mship_color4").html(num.length);
    })
    $(".guide2").bind('keyup',function(){
        var num= $(this).val();
        $(".mship_color5").html(num.length);
    })
    $(".guide3").bind('keyup',function(){
        var num= $(this).val();
        $(".mship_color6").html(num.length);
    })
});

//show/hide
$(function(){
    $(".jianm input").click(function(){
        if($(this).prop('checked')){
            $(".tongyon").show();
            $(".expense").show('slow');
            $(".manman").show();
            $(".manman2").hide();
        }
    })
    $(".tongyong input").click(function(){
        $("#lowestConsume").val("");
        if($(this).prop('checked')){
            $(".tongyon").show();
            $(".expense").hide('slow');
            $(".manman").hide();
            $(".manman2").show();
        }
    })
})


function changeTime(txt1,txt2){          /*time交互*/
    $(txt1).bind('change',function(){
        var cc=$(this).val();
        $(txt2).html(cc);
    })
}
changeTime("#wei_datetime",".manage_create_time");
changeTime("#wei_datetime1",".manage_create_time2");


$(".voucher_Cright .Cright_main_son8  .voucher_otherTime label").click(function(){
    var n=$(this).index();
    if(n==0){
        $(".voucher_Cright .Cright_main_son8 .timeOther").hide();
    }
    if(n==2){
        $(".voucher_Cright .Cright_main_son8 .timeOther").show();
    }
    console.log(n)
});

//时间选择
$(".timeOther .height22 a").click(function(){
    $(this).parent().hide();
    $(this).parent().next().show();
    $(this).parent().next().find("label").eq(1).hide();
    $(".show_span").show();
    var that=$(this);
    $(" .timeOther .nextShow .addTime2").click(function(){
        if(that.parent().next().find("label").eq(1).css("display")=="none"){
            $(this).show();

            if(that.parent().next().find("label").eq(0).css("display")=="none"){
                that.parent().next().find("label").eq(0).show();
                $(".show_span").show();
                $("  .timeOther .nextShow .jar_a").css({ position:'absolute',left:'401px',top:'38px'});
                $(" .timeOther .nextShow_p_2").show();
            }else{
                that.parent().next().find("label").eq(1).show();
                $(".show_time").show();
            }
        }
        if(that.parent().next().find("label").eq(1).css("display")=="inline-block"){
            $(this).hide();
        }else{
            $(this).show();
        }
    })
    $(" .timeOther .nextShow .delTime").click(function(){
        var s= that.parent().next().find("label").eq(1).css("display");
        if(s=="inline-block"){
            that.parent().next().find("label").eq(1).hide();
            that.parent().next().find("label").eq(1).find("input").val("");
            $("  .timeOther .nextShow .addTime2").show();
            $(" .show_time").hide();
        }else{
            that.parent().next().find("label").eq(0).hide();
            that.parent().next().find("label").eq(0).find("input").val("");
            $("  .timeOther .nextShow .addTime2").show();
            $(".show_span").hide();
            $(" .timeOther .nextShow .jar_a").css({ position:'absolute',left:'46px',top:'33px'});
            $(" .timeOther .nextShow_p_2").hide();
        }

    })

});
//星期选择
$(function(){
    $(" .inright .control .control_time2").click(function(){
        if($(this).find('input').prop('checked')){
            $(" .inleft .time_all").html("全天");
        }else{
            $(" .inleft .time_all").html("");
        }
    });
    var workDay=["周一","周二","周三","周四","周五"];
    var inputs=document.getElementsByClassName("input");
    for(var i=0;i<inputs.length;i++){
        inputs[i].onclick=function(){
            var s="";
            $(" .control_time label").each(function(){
                if($(this).find("input").prop('checked')){
                    var text=$(this).find('span').text();
                    s+=text+" ";
                    var isworkDay=true;
                    for(var i=0;i<workDay.length;i++){
                        if(s.indexOf(workDay[i])<0){
                            isworkDay=false;
                        }
                    }
                    if(isworkDay){
                        s="工作日";
                    }else{

                    }
                }
                $("  .time_all").html(s);
            })
        }

    }
});
//门店选择
$(" .Cright_main_two .p5 .pmd label").click(function(){
    var n=$(this).index();
    if(n==1){
        $(".Cright_main_two .p5 .addCon").show();
    }else{
        $(".Cright_main_two .p5 .addCon").hide();
    }
})

//门店modal
//选中数量统计
//$(" .Voucher_cModal .modal-footer .total").html( $(" .Voucher_cModal .mditem tbody input").length);

$(" .Voucher_cModal .mditem thead input").click(function(){
    if($(this).prop("checked")){
        $(" .Voucher_cModal .modal-footer .chiosed").html($(" .Voucher_cModal .mditem tbody input").length);
        $(".Voucher_cModal .modal-footer .total").html( $(" .Voucher_cModal .mditem tbody input").length);
    }else{
        $(" .Voucher_cModal .modal-footer .chiosed").html("0");
        $(" .Voucher_cModal .modal-footer .total").html( $(".Voucher_cModal .mditem tbody input").length);
    }
})
//确定添加
$(" .Voucher_cModal .modal-footer .btn-primary").click(function(){
    var html="";
    $(" .Voucher_cModal .mditem tbody input").each(function(i,o){
        if($(this).prop("checked")){
            html+='<tr id='+$(this).val()+'><td>'+$(this).next().html()+'</td><td>'+$(this).parent().parent().next().html()+'</td><td><img src="../img/del.png" alt=""></td></tr>';
        }
    })
    $(" .addCon table tbody").html(html);
    if(html==""){
        $(" .addCon table").hide();
    }else{
        $(" .addCon table").show();
    }
    $(" .Voucher_cModal .mditem tbody input").each(function(i,o){
        $("#allShops").prop("checked",false);
        $(this).prop("checked",false);
    })
    //添加后的删除
    $(" .addCon table tbody img").click(function(){
        $(this).parent().parent().remove();
        if($(" .addCon table tbody").html()==""){
            $(" .addCon table").hide();
        }
    })

})


//微信卡券（包）
$(function(){
    $(".Cright_two_4 .tb_weixin label input").click(function(){
        // if($(this).prop("checked")){
        $(".Cright_main_two .p3").toggle();
        if($(this).prop("checked")){
            var token = $("#token").val();
            var userId = $("#userId").val();
            if(token==0){
                $("#syncText").hide();
                $("#context2").show();
                $("#alertDiv").show();
            }else{
                $("#alertDiv").hide();
                $("#context2").hide();
            }
        }
        // }
    })
});

function hideSync(){
    $("#alertDiv").hide();
    $("#context2").hide();
    $(".Cright_two_4 .tb_weixin label input").attr("checked",false);
    $(".Cright_main_two .p3").hide();
}
$(" .Cright_main_two .p3 .box .addRK a").click(function(){
    $(this).parent().hide();
    $(this).parent().next().show();
})
$(" .Cright_main_two .p3 .box .del").click(function(){
    $(this).parent().parent().hide();
    $(".Cright_main_two .p3 .box .addRK").show();
})
$(" .Cright_main_two .p3 .box .pp label").click(function(){
    var n=$(this).index()-1;
    $(" .Cright_main_two .p3 .box .chioseFile").hide().eq(n).show();
})

$(function(){
    var num1;
    var arr=$(".myModal_pu .vouchers_all .radio label");
    var len=$(".myModal_pu .vouchers_all .radio label").length;
    //console.log(arr[0]);
    for(var i=0;i<len;i++){
        arr[i].index=i;
        arr[i].onclick=function(){
            num1=this.index;
            console.log(num1);
        };
    }
    $("#btn2").click(function(){
        if(num1==0){
            $("#show2").modal("show");
        }
        if(num1==1){
            window.location.href='internetChannel.html';
        }
    })
});

//collect_stamps
$(function(){
    var num1;
    var arr=$(".know_up .collect .radio label");
    var len=$(".know_up .collect .radio label").length;
    //console.log(arr[0]);
    for(var i=0;i<len;i++){
        arr[i].index=i;
        arr[i].onclick=function(){
            num1=this.index;
            console.log(num1);
        };
    }
    $("#btn_true").click(function(){
        if(num1==0){
            $("#show_new2").modal("show");

        }
        if(num1==1){
            window.location.href='collect_internet.html';
        }
    })
});

//Voucher_holds
$(".voucher_holds .low_1 .low_2 label ").click(function(){
    var n=$(this).index();
    if(n==0){
        $(".holds_switch .vouchers_card .vouchers_card_1").show();
        $(".holds_switch .vouchers_card .vouchers_card_2").hide();
        $(".holds_switch .vouchers_card .vouchers_card_3").hide();
    }
    if(n==1){
        $(".holds_switch .vouchers_card .vouchers_card_1").hide();
        $(".holds_switch .vouchers_card .vouchers_card_2").show();
        $(".holds_switch .vouchers_card .vouchers_card_3").hide();
    }
    if(n==2){
        $(".holds_switch .vouchers_card .vouchers_card_1").hide();
        $(".holds_switch .vouchers_card .vouchers_card_2").hide();
        $(".holds_switch .vouchers_card .vouchers_card_3").show();
    }

})

//增加优惠券(券1)
$(function(){
    $(".voucher_holds .holds_right .vao_yhq .Voucher_card .card_del").click(function(){
        $(".voucher_holds .holds_right .vao_yhq .Voucher_card .card_box").hide();
        $(".voucher_holds .holds_right .vao_yhq .Voucher_card .card_box_1").show();
    })
});
$(function(){
    $("#myModal_choose .table tbody input").click(function(){
        var yhName=$(this).next().html();
        var yuk_num=$(this).parent().parent().next().find("span").html();
        var yuk_time=$(this).parent().parent().next().next().html();
        //console.log(yhName,yuk_num,yuk_time);
        $("#myModal_choose .choose_true").click(function(){
            $(".huew").html(yhName);
            $(".huew_num").html(yuk_num);
            $(".huew_time").html(yuk_time);
            $(".voucher_holds .holds_right .vao_yhq .Voucher_card .card_box_1").hide();
            $(".voucher_holds .holds_right .vao_yhq .Voucher_card .card_box").show();
        });
    });
});
//增加优惠券(券2)
$(function(){
    $(".voucher_holds .holds_right .vao_yhq .Voucher_card2 .card_del1").click(function(){
        $(".voucher_holds .holds_right .vao_yhq .Voucher_card2 .card_box2").hide();
        $(".voucher_holds .holds_right .vao_yhq .Voucher_card2 .card_boxs").show();
    })
});
$(function(){
    $("#myModal_choose2 .table tbody input").click(function(){
        var yhName=$(this).next().html();
        var yuk_num=$(this).parent().parent().next().find("span").html();
        var yuk_time=$(this).parent().parent().next().next().html();
        //console.log(yhName,yuk_num,yuk_time);
        $("#myModal_choose2 .choose_true").click(function(){
            $(".voucher_holds .holds_right .vao_yhq .Voucher_card2 .card_box2").show();
            $(".huew2").html(yhName);
            $(".huew_num2").html(yuk_num);
            $(".huew_time2").html(yuk_time);
            $(".voucher_holds .holds_right .vao_yhq .Voucher_card2 .card_boxs").hide();
        });
    });
});

$(function(){
    $("#show2 .use_big").bind('mouseenter mouseleave', function(){
        var n=$(this).index();
        $(".use_temp_yy").hide();
        $(this).children(".use_temp_yy").show();
    });
    $("#show_new2 .use_big").bind('mouseenter mouseleave', function(){
        var n=$(this).index();
        $(".use_temp_yy").hide();
        $(this).children(".use_temp_yy").show();
    });
})

//QQ选择
$(function(){
    //鼠标移动事件
    $(".firend_right_click .firend_click2 .all_label").hover(function(){
        $(this).parent().addClass("active_on");
        $(".firend_right_click .firend_click .all_label input").click(function(){
            $(".firend_right_click .firend_click .all_label input").each(function(){
                if($(this).prop("checked")){
                    $(this).show();
                }
            })
        })
        $(this).find("input").show();
    },function(){
        $(this).find("input").hide();
        $(this).parent().removeClass("active_on");
        $(".firend_right_click .firend_click2 .all_label input").each(function(){
            if($(this).prop("checked")){
                $(this).show();
                $(this).parent().parent().addClass("active_on");
            }
        })
    })

    $(" .firend_right_click .firend_click2 .all_label input").click(function(){
        $(".firend_box2").html("");
        $(".true_box2").html("");
        $(" .firend_right_click .firend_click2 .all_label input").each(function(){
            if($(this).prop("checked")){
                var html="";
                var tex=$(this).prev().text();
                //console.log(tex);
                html+='<div class="firend_son2">'
                    +'<span>'+tex+'<a href="#" class="delecf"><img src="'+webRoot+'/resources/images/coupons/dele.png" alt=""></a>'+'</span>'
                    +'</div>';
                $(html).appendTo($(".firend_box2"));
                //console.log($(".firend_box2"))
                $(this).parent().parent().addClass("active_on");
                $(this).show();
                var hhh="";
                $(".trle2").click(function(){
                    $(".true_box2").html("");
                    hhh=$(".firend_box2").html();
                    $(hhh).appendTo($(".true_box2"));
                    var num_all=$(".true_box2 .firend_son2").length;
                    $(".click_cs .num_all2").html(num_all);
                    $(".tone").hide();
                    $(".delecf").click(function(){
                        $(this).parent().parent().remove();
                        num_all=$(".true_box2 .firend_son2").length;
                        $(".click_cs .num_all2").html(num_all);
                        if(parseInt(num_all)==0){
                            $(".tone").show();
                        }
                    })

                })

            }

        })
        $(function(){
            if($(".true_box2").html("")){
                $(".tone").show()
            }else{
                $(".tone").hide()
            }
            console.log()
        })
        //统计数量
        var num=$(".firend_box2 .firend_son2").length;

        $(".firend_handle2 .media .cnum2").html(num);

        $(".delecf").click(function(){
            $(this).parent().parent().remove();
            num=$(".firend_box2 .firend_son2").length;
            $(".firend_handle2 .media .cnum2").html(num);
            $(".tone").show();
        })


        //清空
        $(".firend_handle2 .media .empty").click(function(){
            $(".firend_box2").html("");
            $(".true_box2").html("");
            num=$(".firend_box2 .firend_son2").length;
            $(".firend_handle2 .media .cnum2").html(num);
            $(" .firend_right_click .firend_click2 .all_label input").removeAttr("checked");
            $(" .firend_right_click .firend_click2 .all_label input").hide();
            $(" .firend_right_click .firend_click2").removeClass("active_on");
        })
    })
})

//Voucher_promote
$(function(){
    var num1;
    var arr=$(".all_sw");
    var len=$(".all_sw").length;
    //console.log(arr[0]);
    for(var i=0;i<len;i++){
        arr[i].index=i;
        arr[i].onclick=function(){
            num1=this.index;

        };
    }
    $(".all_sw").click(function(){
        if(num1==0){
            $(".who_other .click_cs").hide(); console.log(11111);
        }
        if(num1==1){
            $(".who_other .click_cs").show();
        }
    })
})
$(function(){
    var num1;
    var arr=$(".acboe input");
    var len=$(".acboe input").length;
    //console.log(arr[0]);
    for(var i=0;i<len;i++){
        arr[i].index=i;
        arr[i].onclick=function(){
            num1=this.index;
        };
        //console.log(num1);
    }
    $(" .acboe").click(function(){
        if(num1==0){
            $(".draw_1").html("领取");
            //console.log(n);
        }
        if(num1==1){
            $(".draw_1").html("核销");

        }
    })
})


$(document).ready(function(){
    var n = 2;
    var c=document.getElementsByClassName("clone_boxR2");
    c.flag=true;
    $("#va").click(function(){
        var v=$(".out_v");

        $('.clone_boxL_' + n + '').show();
        $('.clone_boxR' + n + '').show();
        c.flag=true;
        window.alert("提示最多添加两个");
        $("#va").css("display", "none");
        n++;
    });
    $(".out_v").click(function(){
        n--;
        if(c.flag){
            $(".clone_boxL_2").hide();
            $(".clone_boxR2").hide();
            $("#va").css("display", "block")
        }
    });
});

$(function(){
    $("#publishCount").mouseleave(function(){
        var money = $("#publishMoney").val();
        var count = $("#publishCount").val();
        var publishBudget = (money * count).toFixed(2);
        $("#publishBudget").html(publishBudget);
    });
    $("#publishMoney").mouseleave(function(){
        var money = $("#publishMoney").val();
        var count = $("#publishCount").val();
        var publishBudget = (money * count).toFixed(2);
        $("#publishBudget").html(publishBudget);
    });

    $(".i_dele .lj").click(function (){
        $(this).parent().parent().remove();

    })
})

//微信编辑
$(" .inright #clone_boxR .skip label").click(function(){
    var n = $(this).index();
    //console.log(n);
    if(n==1){
        $(" .inright #clone_boxR .skip_show .span3").show();
        $(" .inright #clone_boxR .skip_show .span5").hide();
        $(" .inright #clone_boxR  .skip_show .span6").hide();
    }
    if(n==2){
        $(" .inright #clone_boxR  .skip_show .span3").hide();
        $(" .inright #clone_boxR  .skip_show .span5").show();
        $(" .inright #clone_boxR  .skip_show .span6").hide();
    }
    if(n==3){
        $(" .inright #clone_boxR  .skip_show .span3").hide();
        $(" .inright #clone_boxR  .skip_show .span5").hide();
        $(" .inright #clone_boxR  .skip_show .span6").show();
    }
});

$(" .inright .skip2 label").click(function(){
    var n = $(this).index();
    //console.log(n);
    if(n==1){
        $(" .inright  .skip_show2 .span1").show();
        $(" .inright .skip_show2 .span2").hide();
        $(" .inright   .skip_show2 .span4").hide();
    }
    if(n==2){
        $(" .inright   .skip_show2 .span1").hide();
        $(" .inright   .skip_show2 .span2").show();
        $(" .inright   .skip_show2 .span4").hide();
    }
    if(n==3){
        $(" .inright .skip_show2 .span1").hide();
        $(" .inright .skip_show2 .span2").hide();
        $(" .inright .skip_show2 .span4").show();
    }
});
$(" .inright .skip3 label").click(function(){
    var n = $(this).index();
    console.log(n);
    if(n==1){
        $(" .inright  .skip_show3 .span7").show();
        $(" .inright .skip_show3  .span8").hide();
        $(" .inright   .skip_show3 .span9").hide();
    }
    if(n==2){
        $(" .inright   .skip_show3 .span7").hide();
        $(" .inright   .skip_show3 .span8").show();
        $(" .inright   .skip_show3 .span9").hide();
    }
    if(n==3){
        $(" .inright .skip_show3 .span7").hide();
        $(" .inright .skip_show3 .span8").hide();
        $(" .inright .skip_show3 .span9").show();
    }
});




$(function(){
    $(".order_time .order_bo a").bind('click',function(){
        $(this).siblings().removeClass("order_list_activ");
        $(this).addClass("order_list_activ");
    })

    var dd = new Date();
    var y = dd.getFullYear();//获取当前年份的日期
    var m = dd.getMonth()+1;
    var d = dd.getDate();
    var w = dd.getDay();
    if(m<10){
        m="0"+m;
    }
    if(d<10){
        d="0"+d;
    }

    $(".order_today").click(function(){
        $("#wei_datetime").val(y+"-"+m+"-"+d);
        $("#wei_datetime1").val(y+"-"+m+"-"+d);
        return y+"-"+m+"-"+d;
    })
    $(".order_today2").click(function(){
        var now = new Date();
        var date = new Date(now.getTime() - 1 * 24 * 3600 * 1000);
        var y1 = date.getFullYear();
        var m1 = date.getMonth() + 1;
        var d1 = date.getDate();
        if(m1<10){
            m1="0"+m1;
        }
        if(d1<10){
            d1="0"+d1;
        }

        $("#wei_datetime").val(y1+"-"+m1+"-"+d1);
        $("#wei_datetime1").val(y1+"-"+m1+"-"+d1);
        return y+"-"+m+"-"+d;
    })
    $(".order_today3").click(function(){
        var now = new Date();
        var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
        var y7 = date.getFullYear();
        var m7 = date.getMonth() + 1;
        var d7 = date.getDate();
        if(m7<10){
            m7="0"+m7;
        }
        if(d7<10){
            d7="0"+d7;
        }
        $("#wei_datetime").val(y7+"-"+m7+"-"+d7);
        $("#wei_datetime1").val(y+"-"+m+"-"+d);
        return y+"-"+m+"-"+d;
    })
    $(".order_today4").click(function(){
        var now = new Date();
        var date = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
        var y30 = date.getFullYear();
        var m30 = date.getMonth() + 1;
        var d30 = date.getDate();
        if(m30<10){
            m30="0"+m30;
        }
        if(d30<10){
            d30="0"+d30;
        }
        $("#wei_datetime").val(y30+"-"+m30+"-"+d30);
        $("#wei_datetime1").val(y+"-"+m+"-"+d);
        return y+"-"+m+"-"+d;
    })


});
})