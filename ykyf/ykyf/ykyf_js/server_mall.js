/**
 * Created by Administrator on 2018/1/31.
 */
function getUserIdBySession(){
    var ykyf_userId=localStorage.getItem("ykyf_userId");
    return ykyf_userId;
}
var fdata;
const  buydetail={
    template:`<div>
                        <div class="back_nav" >
                            <router-link to="/buyList">
                             <img class="back_nav_img" src="../ykyf_images/back_bg.png" id="backser_n" alt="返回上一页">服务商城/{{serverInfo.serverName}}
                            </router-link>
                        </div>
                        <div class="main_content_box">
                            <div class="content_solid clear_fix clasla_t">
                                <div class="content_solid_l float_l clasla_t_l">
                                    <dl>
                                        <dt><img v-bind:src="serverInfo.serverImgUrl" alt="" class="vip_ico"></dt>
                                        <input class="easyFind" type="hidden" value="9" name="serviceId" id="serviceId">
                                        <dd><b>{{serverInfo.serverName}}</b><br>
                                            <!-- <span>未开通</span> -->
                                            <span>{{serverInfo.serverStatus}}</span>
                                        </dd>
                                    </dl>
                                    <p v-if="serverInfo.serverStatus=='已开通'" class="useTimes">有效期至:<span class="provider_name">{{serverInfo.overdueTime}}</span></p>
                                </div>
                                <div class="content_solid_r float_r clasla_t_c">
                                    <h3 class="title">价格</h3>
                                    <p class="deadline">
                                        <span  v-for="(item,index) in serverInfo.serverPriceArr" v-bind:class="index==0?'on':''" :data-ins="index"  v-on:click="chose">{{item.price}}元/{{item.month}}月</span>
                                    </p>
                                </div>
                                <div class="clasla_t_r">
                                    <a v-bind:href='serverInfo.url' target="_blank"><input v-if="serverInfo.serverStatus=='已开通'" type="button" value="查看功能" class="submit"  id="searchService"></a>
                                    <input v-if="serverInfo.overdueStatus=='0'" id="open"  type="button" value="开通" class="submit" v-on:click="bugInput" >
                                    <input v-if="serverInfo.overdueStatus=='1'" type="button" value="续费" class="submit" v-on:click="bugInput">
                                    <p  v-show="serverInfo.userLeval<serverInfo.serverRequest.server_conditions" style="color:red;font-size:12px;text-align:left;">商家级别不够,无法开通</p>
                                </div>
                            </div>
                            <div class="content_solid">
                                <div class="content_solid_main">
                                    <h3 class="title">开通条件</h3>
                                    <div>
                                        <p><span><i>•</i>商家级别:</span>
                                            <span class="spr">V{{serverInfo.serverRequest.server_conditions}}级别</span>
                                        </p>
                                    </div>
                                    <h3 class="title">功能介绍</h3>
                                    <div>
                                        <p>{{serverInfo.serverRequest.server_introduce}}</p>
                                    </div>
                                    <div v-if='serverInfo.serverRequest.server_main.length>0'>
                                        <h3 class="title">主要功能</h3>
                                        <div v-for="item in serverInfo.serverRequest.server_main">
                                                <p><span><i>•</i>{{item.functionName}}</span><b></b><span class="spr">{{item.introduction}}</span></p>
                                        </div>
                                    </div>
                                    <div>
                                   </div>
                                </div>
                            </div>
                        </div>

                    </div>`,
    data:function(){
        return {
               serverInfo:{
                   serverName:'微信公众号',
                   serverImgUrl:'../ykyf_images/server_wx.png',
                   serverStatus:'未开通',
                   overdueTime:'', //有效期
                   userLeval:'0',  //商家级别
                   overdueStatus:'',  //是否过期
                   url:'',
                   serverPriceArr:[
/*                       {
                           mouth:'1',
                           price:'0.01'
                       }*/
                   ],
                   serverRequest:{
                       server_conditions:'', //开通条件
                       server_introduce:'利用电子优惠券吸引更多的新用户，回馈老客户',
                       server_main:[

                       ]
                   },
                   backData:{   //返回后台的数据
                       serviceId:'',   //购买的服务id
                       month:'',    //服务月份
                       price:''    //服务价格
                   }

               }
        }
    },
    methods:{
        bugInput:function(e){  //开通按钮
            if(this.isCanBuy()){
                     show_popup('#popup_k_2');
                     if($(e.target).val()=='开通'){
                         $(".fname").attr("isxf",0)
                     }
                     if($(e.target).val()=='续费'){
                         $(".fname").attr("isxf",1)
                     }
                     this.$http.post(pathApi + "/open/user/get/getAccount",{},{emulateJSON:true,credentials:true}).then(function (res) {
                         if(res.data.type=='success'){
                             $(".red").html(res.data.data.bAmount);
                         }
                     });
                     var _this=this;
                     var obj={
                         serviceId:_this.serverInfo.backData.serviceId,
                         month:_this.serverInfo.backData.month,
                         price:_this.serverInfo.backData.price*100
                     }
                     this.$http.post(pathApi+"/service/initBuy",obj,{emulateJSON:true,credentials: true}).then(function(r){
                         var resdata= r.data;
                         if(resdata.type=='success'){ //数据请求成功
                              $(".fname").html(resdata.data.serviceName);
                              $(".format").html(resdata.data.month);
                              $(".total").html(resdata.data.price*0.01);
                              $("#readyPay").html(resdata.data.price*0.01);
                              $(".shouldPay").html(resdata.data.price*0.01);
                              $(".fname").attr("serverId",this.serverInfo.backData.serviceId);
                         }else{

                         }
                     })
            }else{

            }

        },
        xufei:function(){   //续费

        },
        seeFun:function(){  //查看功能

        },
        isCanBuy:function(){
            if(this.serverInfo.userLeval>=this.serverInfo.serverRequest.server_conditions){  //用户级别大于开通级别
                 if(!this.userState){
                     alertErrors('未认证,请先认证',1500);
                 }
                 return this.userState;
            }else{
                 alertErrors('级别不够',1500);
                 return false
            }

        },
        chose:function(e){  //选价格
            $(e.target).addClass('on').siblings().removeClass("on");
            var ind=$(e.target).data("ins");
            this.getPriceByInd(ind);

            //$("")
        },
        getPriceByInd:function(ind){
            var serverPriceArr=this.serverInfo.serverPriceArr;
            this.serverInfo.backData.month=serverPriceArr[ind].month;
            this.serverInfo.backData.price=serverPriceArr[ind].price;
        }

    },
    created:function(){
        this.$http.post(pathApi+"/open/user/getUserById",{userId:getUserIdBySession()},{emulateJSON:true,credentials:true}).then(function(r){
            var loginInfo;
            var resdata= r.data;
            loginInfo=resdata.data;
            if(resdata.errorCode=='success'){ //登陆成功,
                var userState='未认证';
                if(loginInfo.userState==3){  //从未认证过
                    userState='已认证';
                    // return true;
                }else{
                    userState='未认证';
                }
                this.userState=userState=='已认证'?true:false;
            }else{
                alertErrors(resdata.errorMsg,1500);
            }
        })
    },
    mounted: function () {
        var serverId=this.$route.query.serverId //服务id号
        this.$http.post(pathApi+"/service/getServiceDetail",{serviceId:serverId},{emulateJSON:true,credentials: true}).then(function(r){
            var resdata= r.data;
            var serData=resdata.data;
            if(resdata.type=='success'){ //数据请求成功
                this.serverInfo.serverName=serData.yyService.serviceName;
                this.serverInfo.serverImgUrl=serData.yyService.serviceImg;
                this.serverInfo.serverStatus=serData.yyService.rowId==1?'已开通':'未开通';
                this.serverInfo.overdueTime=serData.overdueShowTime.split(' ')[0];

                this.serverInfo.serverPriceArr=JSON.parse(serData.yyService.priceMonth);
                this.serverInfo.serverRequest.server_conditions=serData.yyService.vipLimit;
                this.serverInfo.serverRequest.server_introduce=serData.yyService.serviceDesc;
                this.serverInfo.serverRequest.server_main=JSON.parse(serData.yyService.functionIntroduction);
                this.serverInfo.userLeval=serData.userLevel;
                this.serverInfo.overdueStatus=serData.overdueStatus; //0过期
                var html = ".html";
                if(serData.yyService.url.indexOf(html)>0){
                    this.serverInfo.url=path+serData.yyService.url;//这里先去掉路径中的api
                }else{
                    this.serverInfo.url=pathApi+serData.yyService.url;
                }
                if(serData.yyService.serviceName=='微信公众号'){
                    this.serverInfo.url=pathApi1+'/wx/weChat/toWeChatMain.do?userId='+getUserIdBySession()+'&platform=ykyf';
                }else if(serData.yyService.serviceName=='微信小程序'){
                    this.serverInfo.url=pathApi1+'/wx/smallRoutine/toSmallRoutine.do?userId='+getUserIdBySession()+'&platform=ykyf';
                }
                this.serverInfo.backData.month=this.serverInfo.serverPriceArr[0].month;
                this.serverInfo.backData.price=this.serverInfo.serverPriceArr[0].price;
                this.serverInfo.backData.serviceId=serverId;


            }else{

            }
        })

    }
}

const buylist={
    template:`<div class="listData_box">
                        <h3 class="list_data_title">你可以添加下列需要的服务，让你的店铺更智能，提高用户体验</h3>
                            <div class="listData_list" v-for="item in bug_serverList">
                            <router-link  :to="{path:'/buydetail',query: {serverId:item.serverId}}">
                                <div class="listData_ico float_l">
                                    <img  v-bind:src="item.serverImgUrl" alt="">
                                    <input class="easyFind" type="hidden" value="7" name="7" id="7">
                                </div>
                                <div class="float_r listData_list_r">
                                    <div class="listData_title">
                                         <span class="price">价格:<em>{{item.serverPrice.price}}</em>元/<em>{{item.serverPrice.month}}</em>月
                                         </span><b>{{item.serverName}}</b> <span class="spane">
                                         </span>
                                     </div>
                                    <div class="listData_message clear_fix">
                                        <div class="float_l listData_message_l">
                                            <p>{{item.serverDesc}}</p>
                                        </div>
                                        <div class="float_r listData_message_r" >
                                            <span v-if="item.serverAdded=='已添加'">已添加</span>
                                        </div>
                                    </div>
                                </div>
                                 </router-link>
                                <!-- </a>  -->
                            </div>
                    </div>`,
    data:function(){
        return {
             bug_serverList:[
/*                 {
                     serverName:'微信公众号',
                     serverPrice:'0.01',
                     serverDesc:'商家可快捷方便的使用',
                     serverImgUrl:'../ykyf_images/server_wx.png',
                     serverId:'1',
                     serverAdded:'已添加'
                 },
                 {
                     serverName:'微信小程序',
                     serverPrice:'0.01',
                     serverDesc:'用于小程序的服务',
                     serverImgUrl:'../ykyf_images/server_xcx.jpg',
                     serverId:'2',
                     serverAdded:''
                 }*/

             ]
        }

    },
    motheds:{

    },
    created:function(){
        this.$http.post(pathApi+"/service/mallServiceList",{},{emulateJSON:true,credentials: true}).then(function(r){
            var resdata= r.data;
            console.log(resdata);
            if(resdata.type=='success'){ //获取数据成功
                var listData=resdata.data;
                var BaseList=listData.yyServices; //获取基础服务数据
                for(var i=0;i<BaseList.length;i++){
                    var temObj={};
                    temObj.serverName=BaseList[i].serviceName;
                    temObj.serverId=BaseList[i].id;
                    temObj.serverImgUrl=BaseList[i].serviceImg;
                    temObj.serverDesc=BaseList[i].serviceDesc;
                    temObj.serverAdded=BaseList[i].rowId==1?'已添加':'';
                    temObj.serverPrice=JSON.parse(BaseList[i].priceMonth)[0];
                    console.log(temObj);
                    this.bug_serverList.push(temObj);
                }

            }else{

            }
        })
    }
}

//配置路由
var routes = [
    {path: '/buyDetail', component: buydetail},
    {path: '/buyList', component: buylist},
    //重定向
    {path: '*', redirect: '/buyList'}
]
//生成路由实例
var router = new VueRouter({
    routes
})


new Vue({
    router,
    el: '#server_mall',
    data: {
        picked:0,
    },
    methods: {
        next:function(){
            if(this.picked==0){ //账户余额支付
                hide_popup('#popup_k_2')
                show_popup('#popup_k_3')
            }
            if(this.picked==1){ //微信支付
                hide_popup('#popup_k_2')
                show_popup('#popup_k_4')
                var obj={
                   serviceId:$(".fname").attr("serverId"),
                   price: $(".total").html()*100,
                   month:$(".format").html(),
                   password:$(".yuepaypwd").val(),
                   isxf:$(".fname").attr("isxf")
                }
                this.$http.post(pathApi+"/service/wxPaySetOrder",obj,{emulateJSON:true,credentials: true}).then(function(r){
                    var resdata= r.data;
                    console.log(resdata);
                    if(resdata.type=='success'){
                        $("#qrcode").empty();
                        $("#qrcode").qrcode({width: 150,height: 150,correctLevel:0,text: resdata.data.code_url});
                        //MQTT
                        var has_had_focus = false;
                        var pipe = function(el_name, send) {


                            var print = function(m, p) {
                                p = (p === undefined) ? '' : JSON.stringify(p);
                                console.log(m + ' ' + p);

                            };
                            return print;
                        };

                        var print_first = pipe('#first', function(data) {
                            //client.send('/topic/test', {"content-type":"text/plain"}, data);
                        });


                        // var ws = new WebSocket('wss://yun.eaqul.com:15671/wss');
                        var ws = new SockJS('https://yun.eaqul.com:15671/stomp')
// Init Client
                        var client = Stomp.over(ws);
// SockJS does not support heart-beat: disable heart-beats
                        client.heartbeat.outgoing = 0;
                        client.heartbeat.incoming = 0;

                        client.debug = pipe('#second');

// Declare on_connect
                        var on_connect = function(x) {
                            client.subscribe("/exchange/payexchange/"+resdata.data.eaqulSeq, function(d) {
                                //有消息
                                if("success"==d.body){
                                    location.reload();
                                }

                                print_first(d.body);
                            });
                        };

// Declare on_error
                        var on_error =  function() {
                            console.log(new Date());
                            // alert("error date"+new Date());
                            console.log('error');
                        };

// Conect to RabbitMQ
                        client.connect('eaqul', 'eaqul.com', on_connect, on_error, '/');
                    }else{
                        alertErrors(resdata.message,2000);
                    }


                })


            }
        },
        yuePay:function(){  //余额支付
           var obj={
               serviceId:$(".fname").attr("serverId"),
               price: $(".total").html()*100,
               month:$(".format").html(),
               password:$(".yuepaypwd").val(),
               isxf:$(".fname").attr("isxf")
           }
            console.log(obj);
            this.$http.post(pathApi+"/service/yeBuy",obj,{emulateJSON:true,credentials: true}).then(function(r){
                var resdata= r.data;
                if(resdata.type=='success'){ //获取数据成功
                    // var str='';
                    // var msg='';
                    // var tobj={
                    //     serviceId:$(".fname").attr("serverId"),
                    //     month:$(".format").html(),
                    // }
                    // if($(".fname").attr("isxf")==0){
                    //     str='/service/addServiceBuy';
                    //     msg='购买服务成功';
                    // }
                    // if($(".fname").attr("isxf")==1){
                    //     str='/service/updateServiceBuy';
                    //     msg='服务续费成功';
                    // }
                    // hide_popup('#popup_k_3');
                    // alertSuccess(msg,3000);
                    // this.$http.post(pathApi+str,tobj,{emulateJSON:true,credentials: true}).then(function(r){
                    //     var resdata= r.data;
                    // })
                    alertSuccess(resdata.message,2000);
                    setTimeout(function(){
                        location.reload();
                    },900)
                }else{
                    alertErrors(resdata.message,3000);
                }
            })
        },
        wxPayOk:function(){
              location.reload();
        }
    },
    created: function () {

    },
    mounted: function () {

    }

})


