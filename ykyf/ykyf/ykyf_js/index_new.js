/**
 * Created by Administrator on 2018/1/18.
 */
/*function gotorenzheng(){
     window.location.href='../ykyf_html/merchant_set.html#/baseClasla'
}*/
//const _pathApi='http://yun.eaqul.com:9016';
//const _pathApi='http://192.168.0.131:9016';

var userinfo={
     template:`<div class="index_new_item_user index_new_item float_l clear_fix">
                        <div class="index_new_item_user_top clear_fix" style="position:relative;">
                            <div class="float_l item_user_ico">
                                <img v-bind:src="userInfo.businessLogo" style="border-radius:50%;" >
                            </div>
                            <div class="float_l item_user_mess" style="max-width: 338px;margin-top: -7px;">
                                <div class="item_user_title">
                                    <b class="item_user_name" style="cursor:pointer;">
                                        <span  href="javascript:void(0)">{{userInfo.nickName}}</span>
                                    </b>
                                    <div style="position:absolute;right: 0px;top: 14px;border: 1px solid #ddd;padding: 0px 9px;border-radius: 2px;">
                                        <span style="margin-left: -7px;font-size: 20px;color: #0ab2f7;">V{{userInfo.level}}</span>
                                    </div>
                                    <div class="item_user_lock" style="display:inline-block;margin-left:16px;">
                                        {{userInfo.contactPhone}}
                                    </div>
                                </div>
                                <div v-if="userInfo.userState==\'3\'">
                                    <img src="../ykyf_images/u32.png" class="" style="margin-top: 1px;">
                                    <p style="display: inline-block;margin-top: 10px;">企业已认证</p>
                                </div>
                                <div v-else-if="userInfo.userState==\'4\'">
                                    <p style="display: inline-block;margin-top: 10px;">企业认证失败</p>
                                </div>
                                <div v-else-if="userInfo.userState==\'2\'">
                                    <p style="display: inline-block;margin-top: 10px;">企业认证中</p>
                                </div>
                                <div v-else>
                                    <p style="display: inline-block;margin-top: 10px;">企业未认证</p>
                                </div>
                            </div>
                        </div>
                        <div class="index_new_item_user_bottom" style="padding: 15px 0px 15px 50px;">
                            <div class="item_user_data_list">
                                <span class="data_list1">开通服务:<em>{{userInfo.serverNum}}</em></span>
                                <span class="data_list2">设备数量:<em>{{userInfo.deviceNum}}</em></span>
                                <span class="data_list3">线下门店:<em>{{userInfo.shopNum}}</em></span>
                            </div>
                        </div>
                    </div>`,
     data:function(){
          return {
               userInfo:{
                    userState:'',//认证状态
                    businessLogo:'',
                    nickName:'',
                    level:'',
                    contactPhone:'',
                    serverNum:'',
                    deviceNum:'',
                    shopNum:'',
                    account:''
               }
          }
     },
     mounted:function(){
        
          this.$http.post(pathApi+"/open/index/get/userInfo",{},{emulateJSON:true,credentials: true}).then(function(r){
               var resdata= r.data;
               console.log(resdata);
               localStorage.setItem("ykyf_avatar",resdata.data.businessLogo);
               localStorage.setItem("ykyf_nickName",resdata.data.nickName);
<<<<<<< .mine
               if(resdata.errorCode=='success'){ //提交成功   
                var userInfo=resdata.data;
||||||| .r3545
               if(resdata.errorCode=='success'){ //提交成功
                    var userInfo=resdata.data;
=======
               if(resdata.type=='success'){ //提交成功
                    var userInfo=resdata.data;
>>>>>>> .r4165
                    this.userInfo.userState=userInfo.userState;
                    this.userInfo.businessLogo=userInfo.businessLogo;
                    this.userInfo.nickName=userInfo.nickName;
                    this.userInfo.level=userInfo.level;
                    this.userInfo.contactPhone=userInfo.contactPhone;
                    this.userInfo.serverNum=userInfo.serverNum;
                    this.userInfo.deviceNum=userInfo.deviceNum;
                    this.userInfo.shopNum=userInfo.shopNum;
                    this.userInfo.account=userInfo.account;
                    $("#account").html(this.userInfo.account);
               }else{

               }
          })
     }
}

var hotServers={    
     template:`<div class="index_new_item_type index_new_item float_r">
                        <div class="item_title">热门服务<a href="server_my.html" class="more color_04b0f7">更多></a></div>
                        <ul class="new_item_type clear_fix">
                            <li v-for="item in hotList" v-on:click="goto(item.url,item.status)">
                                <div class="item_type_ico">
                                    <img v-bind:src="item.serviceImg">
                                </div>
                                <p>{{item.serviceName}}</p>
                            </li>
                        </ul>
                    </div>`,
     data(){
         return{
               hotList:[],  //热门服务列表
               userState1:''   //是否认证  3认证

         }
     },
     methods:{
          getHotServers:function(){
               this.$http.post(pathApi+"/open/index/get/userInfo",{},{emulateJSON:true,credentials: true}).then(function(r){
                    var resdata= r.data;
                    if(resdata.type=='success'){  //数据请求成功
                         this.hotList=resdata.data.RMFW;
                         this.userState1=resdata.data.userState;
                    }
               })
          },
          goto(url,status){
               if(this.userState1=='3'||this.userState1==3){
                    if(status==1){
                         var html = ".html";
                         if(url.indexOf(html)>0){
                              window.open(path+url);//这里先去掉路径中的api
                         }else{
                              window.open(pathApi1+url);//微信公众号和小程序跳转后台方法   --  直接跳微服务方法 - 不带web
                         }
                    }else{
                         alertErrors("该服务已下架！",2000);
                    }
              }else{
                    alertErrors("未认证,请先去认证！",2000);
              }

          }
     },
     created(){
          this.getHotServers();
     },
     mounted(){

     }
}


new Vue({
     el:'#indApp',
     components:{
          'hotservers':hotServers,
          'userinfo':userinfo
     },
     data:{
          bAmount:'',  //账户余额
     },
     methods:{
          changeLeval:function(e){
               var flag=e.target.value;
               hide_popup('#gotoRenzheng');
               this.$http.post(pathApi+"/main/updateUserState",{},{emulateJSON:true,credentials: true}).then(function(r){
                    var resdata= r.data;
                    if(resdata.errorCode=='success'){ //提交成功

                    }else{

                    }
               })
               // console.log(goto);
               if(flag=="去认证"){
                    window.location.href='../ykyf_html/merchant_set.html#/baseClasla'
               }
          },
          getAccount(){
               this.$http.post(pathApi + "/open/user/get/getAccount",{},{emulateJSON:true,credentials:true}).then(function (res) {
                    console.log(res);
                    if(res.data.type=='success'){
                         this.bAmount=res.data.data.bAmount;
                    }
               });
          }
     },
     created(){
          this.getAccount();
     }
})
