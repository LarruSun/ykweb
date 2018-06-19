/**
 * Created by Administrator on 2018/1/18.
 */
// popup start(弹窗效果)

//const  pathApi='http://192.168.0.131:9016';
//const pathApi='http://yun.eaqul.com:9016';
const _$path=base;

function resize(){
    $(".popup").each(function(){
        $(this).find(".popup_main").css("height","auto");
        var pupH=$(this).outerHeight(false),
            pup_t=$(this).find(".popup_top").outerHeight(true),
            pup_b=$(this).find(".popup_bottom").outerHeight(true);
       // $(this).find(".popup_main").css("height",pupH-pup_t-pup_b+"px");
    })
}
function show_popup(id){
    $(".popup_bg").show();
    $(id).show();
    var _this=$(id);
    _this.find(".popup_main").css("height","auto");
    var pupH=_this.outerHeight(false),
        pup_t=_this.find(".popup_top").outerHeight(true),
        pup_b=_this.find(".popup_bottom").outerHeight(true);
   // _this.find(".popup_main").css("height",pupH-pup_t-pup_b+"px");
}

function hide_popup(id){
    $(".popup_bg").hide();
    $(id).hide();
}

//move start(弹窗移动效果)
function objMove(control,obj){
    var pos={},lef,top,moveObj=false;
    $(control).css("cursor","move");
    $(control,$(obj)).on({
        "mousedown":function(e){
            moveObj=true;
            move_obj=$(this).closest(obj);
            pos.x=e.clientX;
            pos.y=e.clientY;
            o_lef=parseFloat(move_obj.css("left"));
            o_top=parseFloat(move_obj.css("top"));
            $(window).on({
                "mousemove":function(e){
                    if(!moveObj) return false;
                    move_obj.css({
                        "left":o_lef+e.clientX-pos.x,
                        "top":o_top+e.clientY-pos.y
                    })
                }
            })
        },
        "mouseup":function(){
            moveObj=false;
        }
    })
}
function wrapSize(){
    var d_h=$(document).height(),
        h_h=$(".header").outerHeight(true),
        f_h=$(".footer").outerHeight(true),
        m=parseInt($(".main").css("marginTop"))+parseInt($(".main").css("marginBottom"))+40;
    $(".main ").css('min-height',d_h-h_h-f_h-m+"px");
}
(function(){
    resize();
    $(window).resize(function(){
        resize();
    });
    objMove(".popup_top",".popup");
    wrapSize();
})()

/*登录注册正则 */
var myReg={
    mobile:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}|(17[0-9]{1})))+\d{8})$/,
    yfloginpwd:/^[a-zA-Z](\w){5,20}$/
}

/*获取图片验证码函数*/
function chgUrl(url){
    var timestamp = (new Date()).valueOf();
    if((url.indexOf("&")>=0)){
        url = url + "×tamp=" + timestamp;
    }else{
        url = url + "?timestamp=" + timestamp;
    }
    return url;
}

//获取sessionStorage里面的userid
function getUserIdBySession(){
    var ykyf_userId=localStorage.getItem("ykyf_userId");
    return ykyf_userId;
}

/*------公共底部组件------*/
Vue.component('foot', {
    template: '<div class="footer"><div class=""><a id="toMiitbeian" href="javascript:void(0)"><p>Copyright@2016.Shen Zhen eaqul technology co.,ltd.All Rights Reserved.</p> <p>粤ICP备16098581号-1</p> </a></div></div>'
})
// 创建根实例
new Vue({
    el: '#foot'
})
/*------公共头部组件-----*/
Vue.component('headd', {
    template: '<div class="header clear_fix content_based_t">' +
    '<div class="content_based "><div class="header_l float_l">' +
    '<img src="../../resources/common/images/logo.png" class="logo">' +
    '<span class="header_l_message">易快智能云服务平台</span></div>' +
    '<div class="header_r float_r clear_fix">' +
    '<div class="user_message float_l clear_fix">' +
    '<div class="user_ico float_l"><img style="width:48px;height:48px;" v-bind:src="loginInfo.businessLogo"></div>' +
    '<div class="user_names float_r"> ' +
    '<span class="user_status status_y" v-if="loginInfo.userState==\'已认证\'"><b style="color:#8b8be8;margin-right:6px;">V{{loginInfo.level}}</b>{{loginInfo.userState}}</span>' +
    '<span style="background: #999;padding: 0 7px;color: #fff;" v-if="loginInfo.userState==\'未认证\'"><b style="color:#8b8be8;margin-right:6px;"></b>{{loginInfo.userState}}</span>' +
    '<span class="user_status status_y" v-if="loginInfo.userState==\'认证中\'"><b style="color:#8b8be8;margin-right:6px;">V{{loginInfo.level}}</b>{{loginInfo.userState}}</span>' +
    '<span class="user_status status_y" v-if="loginInfo.userState==\'认证失败\'"><b style="color:#8b8be8;margin-right:6px;">V{{loginInfo.level}}</b>{{loginInfo.userState}}</span>' +
    '<p>{{loginInfo.nickName}}<a href="message.html" class="user_items"></a></p></div></div><input type="button" value="退出" class="logout float_r" v-on:click="exit"></div></div></div>',
    data: function () {
        /*        return {
         level:1,  //等级
         nickName:1, //商家简称
         businessLogo:2, //商家logo
         userState:2     //认证状态
         };*/
        return {
            loginInfo: {
                level: 0,  //等级
                nickName: '', //商家简称
                businessLogo: '', //商家logo
                userState: '未认证'     //认证状态
            }
        };
    },
    methods: {
        exit: function () {
            this.$http.post(pathApi1 + "/signOut", {}, {emulateJSON: true, credentials: true}).then(function (r) {
                console.log(r)
                if(r.data.type=='success'){
                    window.location.href = '../yf_login.html'
                }
            })
           // window.location.href = '../yf_login.html'
        }
    },
    created: function () {
        var loginInfo;
        this.$http.post(pathApi + "/open/user/getUserById", {userId: getUserIdBySession()}, {
            emulateJSON: true,
            credentials: true
        }).then(function (r) {
            var resdata = r.data;
            loginInfo = resdata.data;
            if (resdata.errorCode == 'success') { //登陆成功,
                this.$http.post(pathApi + "/open/index/get/getLoginUser", {}, {
                    emulateJSON: true,
                    credentials: true
                }).then(function (r) {
                    loginInfo = r.body.data;
                    if (r.body.type == 'success') { //登陆成功,
                        var userState = '未认证';
                        if (loginInfo.userState == 0) {  //从未认证过
                            userState = '未认证';
                            $(".indpopup_bg").show();
                            $("#gotoRenzheng").show();

                        }
                        if (loginInfo.userState == 1) {  //从未认证过
                            userState = '未认证';
                        }
                        if (loginInfo.userState == 2) {  //从未认证过
                            userState = '认证中';
                        }
                        if (loginInfo.userState == 3) {  //从未认证过
                            userState = '已认证';
                        }
                        if (loginInfo.userState == 4) {  //从未认证过
                            userState = '认证失败';
                        }
                        this.loginInfo.level = loginInfo.level,  //等级
                            this.loginInfo.nickName = loginInfo.nickName, //商家简称
                            this.loginInfo.businessLogo = loginInfo.businessLogo, //商家logo
                            this.loginInfo.userState = userState     //认证状态
                    } else {
                        alertErrors(r.body.errorMsg, 1500);
                    }
                })
            }
        })
    }
})

new Vue({
     el:'#head',

})


/*-------公共组件侧边栏--------*/
/*Vue.component('leftban',{
    template:'<div><h3 class="slide_title slide_titles list_index leftTiT nav_index"><a href="index_new.html">首页</a></h3>' +
                    '<h3 class="slide_title slide_titles list_serve leftTiT">功能与服务</h3>'+
                    '<ul class="slide_main">' +
                    '<li class="on leftTiT"><a href="javascript:;">我的服务</a></li>' +
                    '<li class="on leftTiT"><a href="javascript:;">服务商城</a></li>' +
                    '</ul>' +
                    '<h3 class="slide_title slide_titles list_facility">设备管理</h3>' +
                    '<ul class="slide_main">' +
                    '<li class="on leftTiT"><a href="javascript:;">我的设备</a></li>' +
                    '<li class="on leftTiT"><a href="#">设备商城</a></li>' +
                    '</ul>' +
                    '<h3 class="slide_title slide_titles list_account">我的帐户</h3>' +
                    '<ul class="slide_main">' +
                    '<li class="on leftTiT"><a href="javascript:;">帐户总览</a></li>' +
                    '<li class="on leftTiT"><a href="javascript:;">交易记录</a></li>' +
                    '</ul>' +
                    '<h3 class="slide_title slide_titles list_set">系统设置</h3>' +
                    '<ul class="slide_main">' +
                    '<li class="on leftTiT nav_merchant"><a href="merchant_set.html">商家设置</a></li>' +
                    '<li class="on leftTiT"><a href="javascript:;">系统设置</a></li>' +
                    '<li class="on leftTiT"><a href="javascript:;">门店管理</a></li>' +
                    '</ul>' +
                    '<h3 class="slide_title slide_titles list_message leftTiT">我的消息</h3></div>',
    data:function(){
        var banData=90;
        return banData;
    },
    methods:{

    },
    created:function(){
        console.log(this.banData);
        this.$http.post("http://192.168.0.131:9016/main/getMenu").then(function(r){
            var resdata= r.data;
            if(resdata.errorCode=='success'){
                 console.log(resdata);
                 console.log(this.banData)
            }else{
                alertErrors(resdata.errorMsg,1500);
            }
        })
    },
    mounted:function(){
        var whoOn=$("#leftNav").attr("sonpage");
        $("."+whoOn).addClass('selected');
    }
})

new Vue({
    el:'#leftNav',
    data:{

    }
})*/


function leftBan(){
    $.ajax({
        url: pathApi + '/main/getMenu',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            var Ban = '';
            for (var i = 0; i < data.data.length; i++) {


                if (data.data[i].name == '首页') {
                    Ban += '<h3 class="slide_title slide_titles list_index leftTiT nav_index"><a href="index_new.html">首页</a></h3>';
                    if (data.data[i].childList != 'false' && data.data[i].childList.length > 0) {  //如果有子菜单
                        var ul = '<ul class="slide_main">';
                        for (var k = 0; k < data.data[i].childList.length; k++) {
                            ul += '<li class="on leftTiT"><a href="javascript:;">' + data.data[i].childList[k].name + '</a></li>'
                        }
                        ul += '</ul>';
                        Ban += ul;
                    }
                }
                if (data.data[i].name == '功能与服务') {
                    Ban += '<h3 class="slide_title slide_titles list_serve leftTiT "><a href="javascript:;">功能与服务</a></h3>';
                    if (data.data[i].childList != 'false' && data.data[i].childList.length > 0) {  //如果有子菜单
                        var ul = '<ul class="slide_main">';
                        for (var k = 0; k < data.data[i].childList.length; k++) {
                            if (data.data[i].childList[k].name == '我的服务') {
                                ul += '<li class="on leftTiT  nav_server"><a href="server_my.html">' + data.data[i].childList[k].name + '</a></li>';
                                continue;
                            }
                            if (data.data[i].childList[k].name == '服务商城') {
                                ul += '<li class="on leftTiT  nav_server_mall"><a href="server_mall.html">' + data.data[i].childList[k].name + '</a></li>';
                                continue;
                            }
                            ul += '<li class="on leftTiT"><a href="javascript:;">' + data.data[i].childList[k].name + '</a></li>'
                        }
                        ul += '</ul>';
                        Ban += ul;
                    }
                }
                if (data.data[i].name == '设备管理') {
                    Ban += '<h3 class="slide_title slide_titles list_facility"><a href="javascript:;">设备管理</a></h3>';
                    if (data.data[i].childList != 'false' && data.data[i].childList.length > 0) {  //如果有子菜单
                        var ul = '<ul class="slide_main">';
                        for (var k = 0; k < data.data[i].childList.length; k++) {
                            if (data.data[i].childList[k].name == '我的设备') {
                                ul += '<li class="on leftTiT  equipment_my"><a href="equipment_my.html">' + data.data[i].childList[k].name + '</a></li>';
                                continue;
                            }
                            ul += '<li class="on leftTiT"><a href="javascript:;">' + data.data[i].childList[k].name + '</a></li>'
                        }
                        ul += '</ul>';
                        Ban += ul;
                    }
                }
                if (data.data[i].name == '我的帐户') {
                    Ban += '<h3 class="slide_title slide_titles list_account"><a href="javascript:;">我的帐户</a></h3>';
                    if (data.data[i].childList != 'false' && data.data[i].childList.length > 0) {  //如果有子菜单
                        var ul = '<ul class="slide_main">';
                        for (var k = 0; k < data.data[i].childList.length; k++) {
                            ul += '<li class="on leftTiT"><a href="javascript:;">' + data.data[i].childList[k].name + '</a></li>'
                        }
                        ul += '</ul>';
                        Ban += ul;
                    }
                }
                if (data.data[i].name == '设置') {
                    Ban += '<h3 class="slide_title slide_titles list_set"><a href="javascript:;">设置</a></h3>';
                    if (data.data[i].childList != 'false' && data.data[i].childList.length > 0) {  //如果有子菜单
                        var ul = '<ul class="slide_main">';
                        for (var k = 0; k < data.data[i].childList.length; k++) {
                            if (data.data[i].childList[k].name == '商家设置') {
                                ul += '<li class="on leftTiT nav_merchant"><a href="merchant_set.html">' + data.data[i].childList[k].name + '</a></li>';
                                continue;
                            }
                            if (data.data[i].childList[k].name == '门店管理') {
                                ul += '<li class="on leftTiT storeManagement"><a href="storeManagement.html">' + data.data[i].childList[k].name + '</a></li>';
                                continue;
                            }
                            ul += '<li class="on leftTiT"><a href="javascript:;">' + data.data[i].childList[k].name + '</a></li>'
                        }
                        ul += '</ul>';
                        Ban += ul;
                    }
                }
                if (data.data[i].name == '我的消息') {
                    Ban += '<h3 class="slide_title slide_titles list_message leftTiT message_my"><a href="message_my.html">我的消息</a></h3>';
                    if (data.data[i].childList != 'false' && data.data[i].childList.length > 0) {  //如果有子菜单
                        var ul = '<ul class="slide_main">';
                        for (var k = 0; k < data.data[i].childList.length; k++) {
                            ul += '<li class="on leftTiT"><a href="javascript:;">' + data.data[i].childList[k].name + '</a></li>'
                        }
                        ul += '</ul>';
                        Ban += ul;
                    }
                }

            }
            console.log(Ban)
            $("#leftNav").html(Ban);
            var whoOn = $("#leftNav").attr("sonpage");
            $("." + whoOn).addClass('selected');
        },
        error: function () {

        }
    })
}



