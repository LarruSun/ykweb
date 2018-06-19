/**
 * Created by Administrator on 2018/1/31.
 */
function getUserIdBySession(){
    var ykyf_userId=localStorage.getItem("ykyf_userId");
    return ykyf_userId;
}
new Vue({
    el:'#server_my',
    data:{
         baseServers:[
/*             {
                 bServerName:'短信管理',
                 bServerTime:'永久',
                 bServerImg:'../ykyf_images/server_wx.png'
             }*/
         ],
         addServers:[
/*             {
                 bServerName:'微信小程序',
                 bServerTime:'2017-12-01', //有效期至
                 bServerImg:'../ykyf_images/server_xcx.jpg',  //服务logo
                 isOverTime:true         //是否过期
             },
             {
                 bServerName:'微信公众号',
                 bServerTime:'2017-12-29',
                 bServerImg:'../ykyf_images/server_wx.png',
                 isOverTime:false
             }*/
         ]
    },
    methods:{
        goto:function(item){
           if(this.userState=='未认证'){
                alertErrors('未认证,请先去认证', 2018);
           }else{
               console.log(this.userState);
               if(item.isOverTime){ //已过期
                  $(".popup_bg").show();
                  $("#popup_k_2").show();
                  this.serid=item.serviceId;
               }else{     //未过期
                   var html = ".html";
                   if(item.url.indexOf(html)>0){
                    //    window.open(path+item.url);//这里先去掉路径中的api
                       window.open(path+item.url);//这里先去掉路径中的api
                   }else{
                       window.open(pathApi1+item.url);//微信公众号和小程序跳转后台方法   --  直接跳微服务方法 - 不带web
                   }
               }
           }
        },
        gotoBuy:function(){
              window.location.href='server_mall.html#/buydetail?serverId='+this.serid;
        }
    },
    created:function(){
        this.$http.post(pathApi+"/service/myServiceList",{},{emulateJSON:true,credentials: true}).then(function(r){
            var resdata= r.data;
            console.log(resdata);
            if(resdata.type=='success'){ //拿到数据
                var listData=resdata.data;
                var BaseList=listData.yyServices; //获取基础服务数据
                var BuyList=listData.serviceBuys; //获取服务数据
                   for(var i=0;i<BaseList.length;i++){
                          var temObj={};
                          temObj.id=BaseList[i].id;
                          temObj.serviceId=BaseList[i].serviceId;
                          temObj.bServerName=BaseList[i].serviceName;
                          temObj.bServerTime='永久';
                          temObj.bServerImg=BaseList[i].serviceImg;
                          temObj.url=BaseList[i].url;
                       if(BaseList[i].serviceName=='微信公众号'){
                           temObj.url='/wx/weChat/toWeChatMain?userId='+getUserIdBySession()+'&platform=ykyf';
                       }else if(BaseList[i].serviceName=='微信小程序'){
                           temObj.url='/wx/smallRoutine/toSmallRoutine?userId='+getUserIdBySession()+'&platform=ykyf';
                       }
                          this.baseServers.push(temObj);
                   }
                   console.log(this.baseServers);
                   for(var i=0;i<BuyList.length;i++){
                        var temObj={};
                        temObj.id=BuyList[i].id;
                        temObj.serviceId=BuyList[i].serviceId;
                        temObj.bServerName=BuyList[i].serviceName;
                        temObj.bServerTime=BuyList[i].overdueTime.split(" ")[0]==''?'永久':BuyList[i].overdueTime.split(" ")[0];
                        temObj.bServerImg=BuyList[i].serviceImg;
                        temObj.url=BuyList[i].url;
                        if(BuyList[i].status=="1"){
                            temObj.isOverTime=false;
                        }else{
                            temObj.isOverTime=true;
                        }
                        if(BuyList[i].serviceName=='微信公众号'){
                            temObj.url='/wx/weChat/toWeChatMain?userId='+getUserIdBySession()+'&platform=ykyf';
                        }else if(BuyList[i].serviceName=='微信小程序'){
                           temObj.url='/wx/smallRoutine/toSmallRoutine?userId='+getUserIdBySession()+'&platform=ykyf';
                       }
                        this.addServers.push(temObj);
                   }

                //this.baseServers=this.baseServers.length>0?this.baseServers:this.addServers;
                this.baseServers;
                this.addServers;

            }else{

            }
        })

        var ykyf_userId=getUserIdBySession();
        var loginInfo;
        this.$http.post(pathApi+"/open/user/getUserById",{userId:ykyf_userId},{emulateJSON:true,credentials:true}).then(function(r){
            var resdata= r.data;
            loginInfo=resdata.data;
            if(resdata.errorCode=='success'){ //登陆成功,
                var userState='未认证';
                if(loginInfo.userState==3){  //从未认证过
                    userState='已认证';
                }else{
                    userState='未认证';
                 }

                this.userState=userState;
            }else{
                alertErrors(resdata.errorMsg,1500);
            }
        })
    },
    mounted: function () {

    }
})