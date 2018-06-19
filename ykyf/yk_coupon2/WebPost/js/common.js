/**
 * Created by Administrator on 2017/2/5.
 * author : xiao zeng
 * email :510279293@qq.com
 */
//noVipmain
$(function(){
    $("#pageindex .isCare p span b").tap(function(){
        $(".isCare").hide();
    })
    $("#vipMa .popup_close").tap(function(){
        $("#vipMa").hide();
        $(".popup_bg").hide();
    })
    $("#pageindex .isCare p a").on("touchend",function(e){
        $("#vipMa").show();
        $(".popup_bg").show();
    })
})

//activeVipCard
$(function(){
    $("#pageacVipCard .fillBox02 .borbutton a").on("touchend",function(e){
        $("#pageacVipCard .fillBox02").hide();
        $("#pageacVipCard .fillBox").show();
        $(".popup_bg").show();
        $("#chosesex").show();
        e.preventDefault();
    })
    $("#chosesex .popup_close").on("touchend",function(e){
        $(".popup_bg").hide();
        $("#chosesex").hide();
        e.preventDefault();
    })
    $("#chosesex .popup_main p").on("touchend",function(e){
        var sex=$(this).html();
        $(".popup_bg").hide();
        $("#chosesex").hide();
        $(".fillBox .vipSex").val(sex);
        e.preventDefault();
    })
    $("#pageacVipCard .fillBox").hide();
    $("#pageacVipCard .fillBox .borbutton span").tap(function(e){
        var vipname=$(".fillBox .vipName").val();
        var vipSex=$(".fillBox .vipSex").val();
        $(".fillBox .vipName").focus(function(){
            $(".fillBox .color9d").css("color","#9d9d9d");
        })
        $(".fillBox .vipSex").focus(function(){
            $(".fillBox .color9d").css("color","#9d9d9d");
        })
        if(vipname!=''&&vipSex!=''){
            window.location.href="../index.html";
            $(".fillBox .color9d").css("color","#9d9d9d");
        }else{
            $(".fillBox .color9d").css("color","red");
        }
    });
    $("#pageacVipCard .vipSex").tap(function(e){
        $(".popup_bg").show();
        $("#chosesex").show();
        e.preventDefault();
    })
})

//charActive
$(function(){
    $("#charActive .content div dl i").tap(function(e){
        e.preventDefault();
        $("#charActive .content div dl i").removeClass("on");
        $("#charActive .topp i").removeClass("on");
        $(this).addClass("on");
        //window.location.href="payOnline.html"
    })
    $("#charActive .topp").on("touchend",function(e){
        $(this).find("i").addClass("on");
        $("#charActive .content div").find("i").removeClass("on");
        e.preventDefault();
    })
})


//dealRecord
$(function(){
    $("#dealRecord .content div p i").each(function(i,o){
        if(parseInt($(this).html())<0){
            $(this).css("color","red");
        }
    })
})

//Haddress
$(function(){
    $("#Haddress .del").on("touchend",function(e){
        e.preventDefault();
        $("#Haddress .popup_bg").show();
        $("#Haddress #deladdress").show();
        var that=$(this);
        $("#Haddress #deladdress .popup_main p span").on("touchend",function(e){
            $("#Haddress .popup_bg").hide();
            $("#Haddress #deladdress").hide();
            $(this).addClass("on").siblings().removeClass("on");
            if($(this).text()=="确定"){
                that.parent().parent().parent().remove();
            }
            console.log($("#Haddress .used").html());
            if($("#Haddress .used").html()==' '){
                console.log(1);
                $("#Haddress .content .used").hide();
            }
        })
    });
    $("#Haddress .content .isuse").on("touchend",function(e){
        e.preventDefault();
        $("#Haddress .content .isuse").find(".on").removeClass("ion");
        $("#Haddress .content .isuse").children("span").removeClass("yes").addClass("sy").html("使用");
        $(this).children(".bot").children(".on").addClass("ion");
        $(this).children("span").addClass("yes").removeClass("sy").html("");
    })
})

//jifen
$(function(){
    $("#jifen .content div p i").each(function(i,o){
        if(parseInt($(this).html())<0){
            $(this).css("color","red");
        }
    })
})

//jifenActive
$(function(){
    $("#jifenActive .content div").on("touchend",function(e){
        e.preventDefault();
        window.location.href="creditsExchange.html"
    })
})

//myorder
$(function(){
    $("#myorder .content p i").each(function(i,o){
        if($(this).html()==''){
            $(this).removeClass("ion");
        }else{
            $(this).addClass("ion");
        }
    })
    $("#myorder .content .itemBox").eq(0).show().siblings().hide();
    $("#myorder .content p span").on("touchend",function(e){
        e.preventDefault();
        $("#myorder .content .AllOrder").show();
        $(this).addClass("spanon").siblings().removeClass("spanon");
        var n=$(this).index();
        $("#myorder .content .itemBox").eq(n).show().siblings().hide();
    })
    $("#myorder .content .AllOrder a").on("touchend",function(e){
        e.preventDefault();
        $("#myorder .content p span").removeClass("spanon");
        $("#myorder .content .AllOrder").hide();
        $("#myorder .content .itemBox").show();
    })
})

//pay
$(function(){
    $("#pay").on("touchend",function(e){
        e.preventDefault();
        window.location.href="../index.html";
    })
})

//payomline
$(function(){
    var str='';
    $("#payOnline .content div p").on("touchend",function(e){
        e.preventDefault();
        $("#payOnline .content div p").removeClass("on");
        $(this).addClass("on");
        $("#payOnline .VRjianpan").hide();
        $("#payOnline .marBox").removeClass("marTop");
        if($(this).children("span").children("b").html()=="其他金额"){
            $("#payOnline .marBox").addClass("marTop");
            $("#payOnline .VRjianpan").show();
            str='';
            $("#payOnline .VRjianpan tr td input").val('');
        }else{

        }
    })
//VR键盘
    $("#payOnline .VRjianpan td:not(:first)").on("touchend",function(e){
        e.preventDefault();
        if($(this).attr("class")=="sure"){
            $("#payOnline .VRjianpan").hide();
            $("#payOnline .marBox").removeClass("marTop");
        }
        else if($(this).attr("class")=="del"){
            str=str.substring(0,str.length-1);
            $("#payOnline .VRjianpan tr td input").val(str);
        }
        else{
            str+=$(this).html();
            $("#payOnline .VRjianpan tr td input").val(str);
        }
    })
})

//quanCenter
$(function(){
    //ban 导航栏
    var $n;
    $("#quanCenter .content .banBox").hide();
    $("#quanCenter .content .banTit span").on("touchend",function(e){
        $("#quanCenter .content .banBox").show();
        $n=$(this).index();
        $(this).addClass("colorRed").siblings().removeClass("colorRed");
        $("#quanCenter .content .banBox .banItem").hide();
        $("#quanCenter .content .banBox .banItem").eq($n).show();
        $("#quanCenter .bg").show();
        e.preventDefault();
    })
    $("#quanCenter .content .banItem ul li").on("touchend",function(e){
        e.preventDefault();
        n= $(this).index();
        if($(this).parent().siblings().length==0){
            $("#quanCenter .content .banBox").hide();
            $("#quanCenter .bg").hide();
            $("#quanCenter .content .banTit span").eq($n).find("b").text($(this).text());
        }
        $(this).addClass("colorRed on").siblings().removeClass("colorRed on");
        $(this).parent().next().children("div").eq(n).show().siblings().hide();
        $("#quanCenter .content .banItem .ban1itemR div p span").on("touchend",function(e){
            e.preventDefault();
            $(this).parent().find("span").removeClass("colorRed");
            $(this).children("span").addClass("colorRed");
            $("#quanCenter .content .banBox").hide();
            $("#quanCenter .bg").hide();
            $("#quanCenter .content .banTit span").eq($n).find("b").text($(this).text());
        })
    })
    $("#quanCenter .bg").tap(function(e){
        $("#quanCenter .content .banBox").hide();
        $("#quanCenter .bg").hide();
        e.preventDefault();
    })
    $("#quanCenter .content .banItem .ban1itemR div").eq(0).show().siblings().hide();
//百分比
    $("#quanCenter .conBox div .bfB").each(function(i,o){
        var bfb=$(this).text();
        $(this).children("p").children("i").animate({width:bfb},400);
    })

//商品状态判断
    $("#quanCenter .conBox div a").each(function(i,o){
        var text=$(this).text();
        var str=$(this).parent().parent().parent().prev().prev().find("dt").text();
        var isZhe=str[str.length-1];
        if(text=='已抢完'){
            $(this).css({"background":"#a0a0a0"}).parent().css({"border-color":"#a0a0a0"}).parent().parent().prev().children("dd").css({"color":"#a0a0a0"}).children("p").css({"background":"#a0a0a0"}).children("i")
                .css({"background":"#a0a0a0"}).parent().parent().parent().prev().css({"color":"#a0a0a0"}).parent().css({"border-color":"#a0a0a0"});
        }
        if(text=="立即领取"){
            if(isZhe=="元"){
                $(this).css({"background":"#f56974"}).parent().css({"border-color":"#f56974"}).parent().parent().prev().children("dd").css({"color":"#f56974"}).children("p").css({"background":"#f7b2b7"}).children("i")
                    .css({"background":"#f56974"}).parent().parent().parent().prev().css({"color":"#f56974"}).parent().css({"border-color":"#f56974"});
            }
            if(isZhe=="折"){
                $(this).css({"background":"#69adf4"}).parent().css({"border-color":"#69adf4"}).parent().parent().prev().children("dd").css({"color":"#69adf4"}).children("p").css({"background":"#b5c6eb"}).children("i")
                    .css({"background":"#69adf4"}).parent().parent().parent().prev().css({"color":"#69adf4"}).parent().css({"border-color":"#69adf4"});
            }
        }
        if(text=="去使用"){
            $(this).css({"background":"#f56974"}).parent().css({"border-color":"#f56974"}).parent().parent().prev().children("dd").css({"color":"#f56974"}).children("p").css({"background":"#f7b2b7"}).children("i")
                .css({"background":"#f56974"}).parent().parent().parent().prev().css({"color":"#f56974"}).parent().css({"border-color":"#f56974"});
            $(this).parent().parent().parent().prev().prev().addClass("hasBg");
        }
    })
})


//surplusMoney
$(function(){
    $("#surplusMoney .content div p i").each(function(i,o){
        if(parseInt($(this).html())<0){
            $(this).css("color","red");
        }
    })
})

//unionMerchant
$(function(){
    //ban 导航栏
    var $n;
    $("#unionMerchant .content .banBox").hide();
    $("#unionMerchant .content .banTit span").on("touchend",function(e){
        $("#unionMerchant .content .banBox").show();
        $n=$(this).index();
        $(this).addClass("colorRed").siblings().removeClass("colorRed");
        $("#unionMerchant .content .banBox .banItem").hide();
        $("#unionMerchant .content .banBox .banItem").eq($n).show();
        $("#unionMerchant  .bg").show();
        e.preventDefault();
    })
    $("#unionMerchant .content .banItem ul li").on("touchend",function(e){
        e.preventDefault();
        n= $(this).index();
        if($(this).parent().siblings().length==0){
            $("#unionMerchant .content .banBox").hide();
            $("#unionMerchant .content .banTit span").eq($n).find("b").text($(this).text());
            $("#unionMerchant .content .banBox").hide();
            $("#unionMerchant  .bg").hide();
        }
        $(this).addClass("colorRed on").siblings().removeClass("colorRed on");
        $(this).parent().next().children("div").eq(n).show().siblings().hide();
        $("#unionMerchant .content .banItem .ban1itemR div p span").on("touchend",function(e){
            $(this).parent().find("span").removeClass("colorRed");
            $(this).children("span").addClass("colorRed");
            $("#unionMerchant .content .banBox").hide();
            $("#unionMerchant  .bg").hide();
            $("#unionMerchant .content .banTit span").eq($n).find("b").text($(this).text());
            e.preventDefault();
        })
    })
    $("#unionMerchant .bg").tap(function(e){
        $("#unionMerchant .content .banBox").hide();
        $("#unionMerchant  .bg").hide();
        e.preventDefault();
    })
    $("#unionMerchant .content .banItem .ban1itemR div").eq(0).show().siblings().hide();
})

//VipActive
$(function(){
    $("#VipActive .content .item").hide();
    $("#VipActive .content .item").eq(0).show();
    $("#VipActive .content p span").tap(function(e){
        e.preventDefault();
        $(this).addClass("on").siblings().removeClass("on");
        var n=$(this).index();
        $("#VipActive .content .item").hide();
        $("#VipActive .content .item").eq(n).show();
    })
    $("#VipActive .content .item div dl dt span").each(function(i,o){
        if($(this).html()=='充值优惠'){
            $(this).css({"color":"#ec8558","border-color":"#ec8558"})
        }
        if($(this).html()=="卡店联盟"){
            $(this).css({"color":"#4ec4c8","border-color":"#4ec4c8"})
        }
    })
    $("#VipActive .content .item div").tap(function(e){
        e.preventDefault();
        var v=$(this).children("dl").eq(0).children("dt").children("span").eq(0).html();
        if(v=='积分兑换'){
            window.location.href='jifenduihuan.html';
        }
        if(v=='充值优惠'){
            window.location.href='charyouhui.html';
        }
        if(v=='卡店联盟'){
            window.location.href='cardPartner.html';
        }
    })
})

//yhDetail
$(function(){
    //$("#yhDetail .content dl dd h2 img").on("touchend",function(e){
    //    e.preventDefault();
    //    $("#yhDetail .popup_bg").show();
    //    $("#yhDetail .popdel").show();
    //});
    //$("#yhDetail .popdel .cancelTel").on("touchend",function(e){
    //    e.preventDefault();
    //    $("#yhDetail .popup_bg").hide();
    //    $("#yhDetail .popdel").hide();
    //})
    telTap("#yhDetail .content dl dd h2 img");
})


//youhuijuan
$(function(){
    $("#youhuijuan .content .Use").hide();
    $("#youhuijuan .content .Use").eq(0).show();
    $("#youhuijuan .content .unUse dl h3").each(function(i,o){
        var str=$(this).html();
        str=str.substring(str.length-3,str.length);
        if(str=="优惠券"){
            $(this).next().children("span").css({"color":"#9faae8","border-color":"#9faae8"});
        }
    })
    $("#youhuijuan .content h1 span").on("touchend",function(e){
        e.preventDefault();
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
        var n=$(this).index();
        $("#youhuijuan .content .Use").hide();
        $("#youhuijuan .content .Use").eq(n).show();
    })
})

function telTap(str){
    $(str).tap(function(e){
        e.preventDefault();
        $(".alertPhone").show();
        $(".alertPhone .cancle").tap(function(e){
            e.preventDefault();
            $(".alertPhone").hide();
        })
    })
}

