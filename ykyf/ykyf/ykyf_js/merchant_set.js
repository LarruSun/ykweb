/**
 * Created by Administrator on 2018/1/18.
 */
//const _pathApi='http://yun.eaqul.com:9016';
//const  _pathApi='http://192.168.0.131:9016';
var pageData = {
    userState:''
}; //全局数据
//获取sessionStorage里面的userid
function getUserIdBySession(){
    var ykyf_userId=localStorage.getItem("ykyf_userId");
    return ykyf_userId;
}

//组件
const baseinfo = {
    template: `<div><table class="table">
    <thead><tr><td class="htd bge5" colspan="3">商家基本信息</td></tr></thead><tbody><tr><td width="105px">商家简称</td><td id="nickname">{{baseInfoData.baseName}}</td><td><span class="span_a color_04b0f7"><a href="javascript:void(0)" onclick="show_popup(\'#popup_edit_name\')">更改</a></span></td></tr>
    <tr><td>认证状态</td><td id="userState1">{{baseInfoData.baseState}}</td> <td id="userState2"><span class="span_a color_04b0f7" style="color: green" >
    <span v-if="baseInfoData.baseState==\'已认证\'"><router-link to="/baseState">查看</router-link></span>
    <span v-if="baseInfoData.baseState==\'未认证\'"><router-link to="/baseClasla">去认证</router-link></span>
    <span v-if="baseInfoData.baseState==\'认证中\'"><router-link to="/baseClaslaing">查看</router-link></span>
    <span v-if="baseInfoData.baseState==\'认证失败\'"><router-link to="/baseClaslafail">查看</router-link></span>
    </span></td></tr>
    <tr> <td>商家LOGO</td> <td style="vertical-align: middle"> <img v-bind:src="baseInfoData.baseLogo" alt="" class="table_logo" style="border:1px solid #ccc"> <span style="color:#ccc;padding-left:10px">图片建议尺寸：120像素*120像素，大小不超过5M</span> </td> <td> <span class="span_a color_04b0f7"> <a href="javascript:void(0)" onclick="show_popup(\'#popup_edit_logo\')">更改</a> </span> </td> </tr>
    <tr> <td width="105px">联系人</td> <td>{{baseInfoData.baseCont}}</td> <td width="80px"></td></tr>
    <tr><td width="105px">绑定手机</td> <td>{{baseInfoData.baseBind}}<span style="margin-left:20px;color: #ccc;">请谨慎操作</span></td> <td><a href="#"  style="color: #04b0f7;margin-right: 15px;">解绑</a></td> </tr>
    <tr><td>省市区</td> <td>{{baseInfoData.baseCity.province}}-{{baseInfoData.baseCity.city}}-{{baseInfoData.baseCity.area}}</td> <td><span class="span_a color_04b0f7"><a href="javascript:void(0)" onclick="show_popup(\'#popup_edit_city\')">更改</a></span></td> </tr>
    </tbody>
    </table>
            <div class="popup" id="popup_edit_city">
                <div class="popup_top" style="cursor: move;">
                    <span class="popup_close" onclick="hide_popup('#popup_edit_city')"></span>
                    <b class="popup_title">更改地区</b>
                </div>
                <div class="popup_main">
                    <div class="edit_body">
                        <div>省&nbsp;市&nbsp;区:</div>
                        <div class="city_chose" id="target" data-toggle="distpicker">
                            <select  class="province" ></select>
                            <select  class="city" ></select>
                            <select  class="area"></select>
                        </div>
                    </div>
                </div>
                <div class="popup_bottom align_center">
                    <input type="submit" value="保存" v-on:click="sureSave_edit_citys">
                    <input type="reset" value="取消" onclick="hide_popup('#popup_edit_city')">
                </div>
            </div>
    </div>`,
    data: function () {
        //var baseInfoData = pageData.baseInfoData;
        return {
            baseInfoData:{
                baseCity:{
                    province:'',
                    city:'',
                    area:''
                }
            }
        }
    },
    methods: {
        sureSave_edit_citys: function () {   //确认修改商家省市区
            var citys={
                addressProvince:$(".province").val(),
                addressCity:$(".city").val(),
                addressArea:$(".area").val()
            }
            this.$http.post(pathApi+"/main/edit/updateAddress",citys,{emulateJSON:true,credentials: true}).then(function(r){
                var resdata= r.data;
                if(resdata.errorCode=='success'){
                    alertSuccess(resdata.errorMsg,1500);
                    setTimeout(function(){
                        location.reload();
                    },100)
                }else{
                    alertErrors(resdata.errorMsg,1500);
                }
            })
        },
    },
    created: function () {

    },
    mounted: function () {
        var ykyf_userId=getUserIdBySession();
        var loginInfo;
        this.$http.post(pathApi+"/open/user/getUserById",{userId:ykyf_userId},{emulateJSON:true,credentials: true}).then(function(r){
            var resdata= r.data;
            loginInfo=resdata.data;
            console.log(resdata);
            if(resdata.errorCode=='success'){
                var userState;
                pageData.userState=loginInfo.userState;
                if(loginInfo.userState==0||loginInfo.userState==1){  //从未认证过
                    userState='未认证';
                }
                if(loginInfo.userState==2){
                    userState='认证中';
                }
                if(loginInfo.userState==3){
                    userState='已认证';
                }
                if(loginInfo.userState==4){
                    userState='认证失败';
                }

                this.baseInfoData.baseName=loginInfo.nickName;
                this.baseInfoData.baseState=userState;
                this.baseInfoData.baseLogo=loginInfo.businessLogo;
                this.baseInfoData.baseCont=loginInfo.contactName;
                this.baseInfoData.baseBind=loginInfo.loginName;
                this.baseInfoData.baseCity.province=loginInfo.addressProvince;
                this.baseInfoData.baseCity.city=loginInfo.addressCity;
                this.baseInfoData.baseCity.area=loginInfo.addressArea;

                var _this = this;
                $(".edit_name").val(loginInfo.nickName);
                $("#upimg").attr("src",loginInfo.businessLogo);
                $('#target').distpicker({
                    province:loginInfo.addressProvince,
                    city:loginInfo.addressCity,
                    district:loginInfo.addressArea,
                });
            }else{
                alertErrors(resdata.errorMsg,1500);
            }
        })
    }
};
const baseset = {
    template: `<div class="tab_main">
    <table class="content_table">
    <thead>
    <tr><td class="htd bge5">微信公众号</td><td class="htd bge5" style="text-align: right;"><a href="javascript:;" v-on:click="goto(weChat.WeChatUrl)" target="_blank">设置</a> </td> </tr>
    </thead>
    <tbody>
    <tr><td width="105">公众号头像：</td> <td style="border-right: 1px solid #ddd;"> <span><img style="width:48px;"  v-bind:src="weChat.WeChatHeadImg"></span> </td> </tr>
    <tr><td>公众号名称：</td> <td style="border-right: 1px solid #ddd;">{{weChat.WeChatNickName}}</td> </tr> </tbody> </table>
    <table class="content_table">
    <thead>
    <tr> <td class="htd bge5">微信小程序</td> <td class="htd bge5" style="text-align: right;"> <a href="javascript:;" v-on:click="goto(SmallRoutine.SmallRoutineUrl)"  target="_blank">设置</a> </td> </tr>
    </thead>
    <tbody>
    <tr> <td width="105">小程序头像：</td> <td style="border-right: 1px solid #ddd;"> <span><img style="width:48px;" v-bind:src="SmallRoutine.SmallRoutineHeadImg"></span> </td> </tr>
    <tr> <td>小程序名称：</td> <td style="border-right: 1px solid #ddd;">{{SmallRoutine.SmallRoutineNickName}}</td> </tr>
   </tbody>
    </table>
    <table class="content_table">
    <thead> <tr> <td class="htd bge5">短信设置</td> <td class="htd bge5" style="text-align: right;"> <a href="javascript:;" v-on:click="goto(SMS.SMSUrl)" target="_blank">设置</a> </td> </tr> </thead>
    <tbody>
    <tr> <td width="105">短信签名：</td> <td id="oqm" style="border-right: 1px solid #ddd;">{{SMS.signText}}</td> </tr>
    <tr> <td>短信余额</td> <td style="border-right: 1px solid #ddd;">{{SMS.indexlastDx}}</td> </tr>
    </tbody>
    </table>
    </div>`,
    data:function(){
        return {
             weChat:{
                 WeChatUrl:'',
                 WeChatHeadImg:'',
                 WeChatNickName:''
             },
              SmallRoutine:{
                  SmallRoutineUrl:'',
                  SmallRoutineHeadImg:'',
                  SmallRoutineNickName:''
              },
              SMS:{
                  SMSUrl:'',
                  signText:'',
                  indexlastDx:''
              }
        }
    },
    methods: {
         goto(url){
             console.log(pageData.userState)
             if(pageData.userState=='3'){
                 var html = ".html";
                 if(url.indexOf(html)>0){
                     window.open(path+url);//这里先去掉路径中的api
                 }else{
                     window.open(pathApi1+url);//微信公众号和小程序跳转后台方法   --  直接跳微服务方法 - 不带web
                 }
             }else{
                 alertErrors("未认证,请先去认证！",2000);
             }
         }
    },
    created(){
        this.$http.post(pathApi+"/main/setting/basicSettings",{},{emulateJSON:true,credentials:true}).then(function(r){
            var resdata= r.data;
            /**
             * if(BuyList[i].serviceName=='微信公众号'){
                            temObj.url='/wx/weChat/toWeChatMain?userId='+getUserIdBySession()+'&platform=ykyf';
                        }else if(BuyList[i].serviceName=='微信小程序'){
                           temObj.url='/wx/smallRoutine/toSmallRoutine?userId='+getUserIdBySession()+'&platform=ykyf';
                       }
             */

                //this.weChat.WeChatUrl=pathApi+resdata.data.WeChatUrl;
                this.weChat.WeChatUrl='/wx/weChat/toWeChatMain?userId='+getUserIdBySession()+'&platform=ykyf'
                this.weChat.WeChatHeadImg=resdata.data.WeChatHeadImg;
                this.weChat.WeChatNickName=resdata.data.WeChatNickName;
                //this.SmallRoutine.SmallRoutineUrl=pathApi+resdata.data.SmallRoutineUrl;
                this.SmallRoutine.SmallRoutineUrl='/wx/smallRoutine/toSmallRoutine?userId='+getUserIdBySession()+'&platform=ykyf'
                this.SmallRoutine.SmallRoutineHeadImg=resdata.data.SmallRoutineHeadImg;
                this.SmallRoutine.SmallRoutineNickName=resdata.data.SmallRoutineNickName;
                this.SMS.SMSUrl=resdata.data.SMSUrl;
                this.SMS.signText=resdata.data.signature.signText;
                this.SMS.indexlastDx=resdata.data.indexlastDx

        })
    }
}
const basepay = {
    template: ``,
    /**
     * <div class="tab_main">
     <table class="content_table">
     <thead> <tr> <td class="htd bge5">微信支付</td> <td class="htd bge5" style="text-align: right;"><a href="#">设置</a></td> </tr> </thead>
     <tbody>
     <tr> <td width="105">状态</td> <td>已开通</td> </tr>
     <tr> <td width="105">收款账户</td> <td><span>62558929299178</span><span style="margin-left:20px">林冲</span></td> </tr>
     </tbody>
     </table>
     <table class="content_table">
     <thead>
     <tr> <td class="htd bge5">支付宝</td> <td class="htd bge5" style="text-align: right;"><a href="#">设置</a></td> </tr>
     </thead>
     <tbody>
     <tr><td width="105">状态</td> <td>未开通</td> </tr>
     <tr><td width="105">收款账户</td> <td><span>无</span><span></span></td> </tr>
     </tbody>
     </table>
     </div>
     * @returns {{}}
     */
    data: function(){
          return {

          }
    },
    methods: {},
    created: function () {
          console.log('cao');
    }
}
const basestate = {
    template: '<table class="table"> ' +
    '<thead> <tr> <td class="htd bge5" colspan="2"><router-link to="/baseInfo"><img src="../ykyf_images/back_bg.png" alt=""></router-link>商家基本信息/商家认证信息</td> </tr> </thead> ' +
    '<tbody> ' +
    '<tr> <td width="105px">企业全称</td> <td>{{baseState.baseFullName}}</td> </tr> ' +
    '<tr> <td>营业执照编号</td> <td>{{baseState.baseLicenseNum}}</td> </tr> ' +
    '<tr> <td>营业执照</td> <td style="vertical-align: middle"> <img v-bind:src="baseState.baseLicenseImg" alt="" class="table_logo" style="border:1px solid #ccc;width:300px;height:240px;"> </td> </tr>' +
    '<tr> <td width="105px">真实姓名</td> <td>{{baseState.baseRealName}}</td> </tr> ' +
    '<tr> <td width="105px">法人身份证</td> <td><img v-bind:src="baseState.baseIdentify.faceImg" style="width:300px;height:240px;margin-right:20px;" alt=""><img v-bind:src="baseState.baseIdentify.backImg" style="width:300px;height:240px;" alt=""></td> </tr> ' +
    '</tbody> ' +
    '</table>',
    data: function(){
          return {
              baseState:{
                    baseFullName:'',
                    baseLicenseNum:'',
                    baseLicenseImg:'',
                    baseRealName:'',
                    baseIdentify:{
                        faceImg:'',
                        backImg:''
                    }
                }
          }
    },
    methods: {},
    created: function () {
        var ykyf_userId=getUserIdBySession();
        var loginInfo;
        this.$http.post(pathApi+"/open/user/getUserById",{userId:ykyf_userId},{emulateJSON:true,credentials:true}).then(function(r){
            var resdata= r.data;
            loginInfo=resdata.data;
            pageData.userState=loginInfo.userState;
            this.baseState.baseFullName=loginInfo.fullName;
            this.baseState.baseLicenseNum=loginInfo.businessLicenseNum;
            this.baseState.baseLicenseImg=loginInfo.businessLicenseScan;
            this.baseState.baseRealName=loginInfo.legalPersonName;
            this.baseState.baseIdentify.faceImg=loginInfo.contactCardImgSrc;
            this.baseState.baseIdentify.backImg=loginInfo.contactBackCardImgSrc;


        })
    }
}

/*--------去认证---------*/
const baserenzheng={
    template:`<div id="verify-verifyInfo" class="main_content_box" style="padding: 0px 0px 0px 13px; background: rgb(244, 245, 249);">
                        <div class="back_nav edit_over">
                            <router-link to="/baseInfo"><img class="back_nav_img" src="../ykyf_images/back_bg.png"  alt="返回上一页" ></router-link>商家基本信息 /商家认证
                        </div>
                        <table class="content_table system_page03_table" style="border:0;">
                            <tbody>
                            <tr>
                                <td>企业全称:</td>
                                <td>
                                    <input type="text" id="fullName" name="fullName" class="input_txt" style="width:340px" v-model='baseStateData.baseFullName' value="">
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="padding:10px">
                                    <p class="table_item_bottom">
                                        只支持中国大陆工商局或市场监督管理局登记的企业。请填写工商营业执照上的企业全称。
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>企业工商营业执照:</td>
                                <td>
                                    <label id="upImg_bts03_label" for="upImg_bts03">
                                        <span class="upImg_bts" style="width:180px;text-align:center;margin:10px;">上传营业执照	</span>
                                        <input class="upImg_btn" id="upImg_bts03" name="file" type="file" v-on:change="upbaseLicenseImg('#savedImg3')" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" >
                                    </label>
                                    <div>
                                        <img id="savedImg3" src="../ykyf_images/upimg2.png" style="margin:0 5px;width:300px;height:240px;">
                                        <span style="color:#afaeae">请在此处提交您的证件</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>工商营业执照号:</td>
                                <td>
                                    <input type="text" id="businessLicenseNum" name="businessLicenseNum" class="input_txt" style="width:340px" v-model='baseStateData.baseLicenseNum' value="">
                                </td>
                            </tr>
                            <tr>
                                <td width="180px">法人身份证姓名:</td>
                                <td>
                                    <input type="text" id="legalPersonName" name="legalPersonName" class="input_txt" style="width:340px" v-model='baseStateData.baseRealName' value="">
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="padding:10px">
                                    <p class="table_item_bottom">
                                        如果属于分公司则填写工商营业执照上明确的负责人，个体工商户请填写 经营者姓名，<br>
                                        合伙企业请填写合伙人姓名，个人独资企业请填写投资人姓名，企业法人的非法人分支机构填写负责人姓名，<br>
                                        均按照营业执照上填写。
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>法人身份证件:</td>
                                <td>
                                    <label id="upImg_bts01_label" for="upImg_bts01" style="margin-bottom: 10px;display: inline-block">
                                        <span class="upImg_bts" style="width:190px;margin-right:105px;margin-left:65px;text-align:center;">上传法人身份证（正面）</span>
                                        <input class="upImg_btn" id="upImg_bts01" name="file" type="file" v-on:change="baseIdentifyF('#savedImg1')" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                                    </label>
                                    <label id="upImg_bts02_label" for="upImg_bts02" style="margin-bottom: 10px;display: inline-block">
                                        <span class="upImg_bts" style="width:190px;text-align:center;">上传法人身份证（反面）</span>
                                        <input class="upImg_btn" id="upImg_bts02" name="file" type="file" v-on:change="baseIdentifyB('#savedImg2')" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                                    </label>
                                    <div>
                                        <img id="savedImg1" src="../ykyf_images/upimg2.png" style="width:300px;height:240px;">
                                        <img id="savedImg2" src="../ykyf_images/upimg2.png" style="margin:0 5px;width:300px;height:240px;">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="padding:10px">
                                    <p class="table_item_bottom">
                                        无居民身份证的内地居民可提交《临时居明身份证》，香港、澳门特别行政区，
                                        台湾居民提供当地有效身份证件。照片或扫描件必须包含身份证正反面，且内容清晰可见。
                                        格式要求：支持jpg,jpeg,gif,png格式照片，大小不超过2M。
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colspan="" style="padding:40px 0">
                                    <input type="submit" id="confirm_verifyInfo_next" v-on:click='submitRenZhenInfo' value="提交审核" style="width:200px">
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div class="popup" id="waiting" style='width: 650px;'>
                            <div class="popup_main" style="padding: 30px 30px 50px;text-align:center;">
                                <div class="edit">
                                    <span class="table_l_txt">上传中,请等待...</span>
                                </div>
                            </div>
                        </div>

                    </div>`,
    data:function(){
         return {
             baseStateData: {
                 baseFullName: '',   //企业全称
                 baseLicenseNum: '', //营业执照编号
                 baseLicenseImg: '', //营业执照
                 baseRealName: '',  //真实姓名
                 baseIdentify: {    //身份照
                     faceImg: '',  //正面
                     backImg: ''  //反面
                 }
             }
         }
    },
    methods:{
        upbaseLicenseImg:function(el){
            var inputThis=document.getElementById("upImg_bts03");
            this.upImg(inputThis,el,1);
        },
        baseIdentifyF:function(el){
            var inputThis=document.getElementById("upImg_bts01");
            this.upImg(inputThis,el,2);
        },
        baseIdentifyB:function(el){
            var inputThis=document.getElementById("upImg_bts02");
            this.upImg(inputThis,el,3);

        },
        upImg: function (inputThis,el,n) {    //上传预览图片
            var files = inputThis.files;
            var _this=this;
            if (files[0] != null) {
                if(files[0].type.indexOf('image')>=0){
                        var obj = new FileReader();
                        obj.readAsDataURL(files[0]);
                        obj.onload = function () {
                            $(el).attr("src", obj.result);
                            if(n==1){
                                _this.baseStateData.baseLicenseImg=files;

                            }
                            if(n==2){
                                _this.baseStateData.baseIdentify.faceImg=files;
                            }
                            if(n==3){
                                _this.baseStateData.baseIdentify.backImg=files;
                            }
                        }

                    lrz(files[0])
                        .then(function (rst) {
                            // 处理成功会执行
                            rst.file.name=rst.origin.name;
                            $(el).attr("src", rst.base64);
                            if(n==1){
                                _this.baseStateData.baseLicenseImg=rst.file;
                            }
                            if(n==2){
                                _this.baseStateData.baseIdentify.faceImg=rst.file;
                            }
                            if(n==3){
                                _this.baseStateData.baseIdentify.backImg=rst.file;
                            }
                        })
                        .catch(function (err) {
                            // 处理失败会执行
                        })
                        .always(function () {
                            // 不管是成功失败，都会执行
                        });

                }else{
                    alertErrors('请选择图片文件', 2000);
                }

            }
        },
        submitRenZhenInfo:function(){
            show_popup('#waiting');
            var flag=this.isCanSubmit();
            var _this=this;
            if(flag){
                var formData=new FormData();
                formData.append('fullName', _this.baseStateData.baseFullName);
                formData.append('businessLicenseScanFile', _this.baseStateData.baseLicenseImg, _this.baseStateData.baseLicenseImg.name);
                formData.append('businessLicenseNum', _this.baseStateData.baseLicenseNum);
                formData.append('legalPersonName', _this.baseStateData.baseRealName);
                formData.append('contactCardImgSrcFile', _this.baseStateData.baseIdentify.faceImg, _this.baseStateData.baseIdentify.faceImg.name);
                formData.append('contactBackCardImgSrcFile', _this.baseStateData.baseIdentify.backImg,_this.baseStateData.baseIdentify.backImg.name);
                this.$http.post(pathApi+"/main/edit/attestation",formData,{emulateJSON:true,credentials: true})
                   .then(function(r){
                       var resdata= r.data;
                       $(".popup_bg").hide();
                       alertSuccess(resdata.errorMsg,1500);
                       if(resdata.errorCode=='success'){ //修改成功,
                           setTimeout(function(){
                               window.location.href='../ykyf_html/merchant_set.html#/baseClaslaing';
                           },100)
                       }else{
                           alertErrors(resdata.errorMsg,1500);
                           setTimeout(function(){
                               window.location.href='../ykyf_html/merchant_set.html#/renzhengfail';
                           },100)
                       }
                   }).catch(function (result) {
                       $(".popup_bg").hide();
                       $("#waiting").hide();
                       alertErrors("网络异常!",2000);
                   })
            }
        },
        isCanSubmit:function(){
             if(this.baseStateData.baseFullName!=''&&this.baseStateData.baseLicenseNum!=''&&this.baseStateData.baseRealName!=''&&this.baseStateData.baseLicenseImg!=''&&this.baseStateData.baseIdentify.faceImg!=''&&this.baseStateData.baseIdentify.backImg!=''){
                 return true;
             }
             if(this.baseStateData.baseFullName==''){
                 alertErrors('请输入企业全称',1500);
                 return false;
             }
            if(this.baseStateData.baseLicenseImg==''){
                 console.log(this.baseStateData.baseLicenseImg)
                 alertErrors('请上传营业执照',1500);
                 return false;
            }
            if(this.baseStateData.baseLicenseNum==''){
                alertErrors('请填写营业执照编号',1500);
                return false;
            }
            if(this.baseStateData.baseRealName==''){
                alertErrors('请填写法人身份证姓名',1500);
                return false;
            }
            if(this.baseStateData.baseIdentify.faceImg==''){
                alertErrors('请上传法人身份证正面照',1500);
                return false;
            }
            if(this.baseStateData.baseIdentify.backImg==''){
                alertErrors('请上传法人身份证反面照',1500);
                return false;
            }
        }

    },
    created:function(){
        var ykyf_userId=getUserIdBySession();
        var loginInfo;
        this.$http.post(pathApi+"/open/user/getUserById",{userId:ykyf_userId},{emulateJSON:true,credentials:true}).then(function(r){
            var resdata= r.data;
            loginInfo=resdata.data;
            pageData.userState=loginInfo.userState;
            this.baseStateData.baseFullName=loginInfo.fullName;
            this.baseStateData.baseLicenseNum=loginInfo.businessLicenseNum;
            this.baseStateData.baseLicenseImg=loginInfo.businessLicenseScan;
            this.baseStateData.baseRealName=loginInfo.legalPersonName;
            this.baseStateData.baseIdentify.faceImg=loginInfo.contactCardImgSrc;
            this.baseStateData.baseIdentify.backImg=loginInfo.contactBackCardImgSrc;
            if(loginInfo.businessLicenseScan!=''){
                $("#savedImg3").attr("src",loginInfo.businessLicenseScan);
            }
            if(loginInfo.contactCardImgSrc!=''){
                $("#savedImg1").attr("src",loginInfo.contactCardImgSrc);
            }
            if(loginInfo.contactBackCardImgSrc!=''){
                $("#savedImg2").attr("src",loginInfo.contactBackCardImgSrc);
            }

        })
    }
}

/*----------认证中------------*/
const  renzhengzhong={
    template:`<div id="verify_waitVerify" class="main_content_box" style="padding:0 0 30px 13px;background:#f4f5f9;/* display: none; */">
                    <div class="back_nav edit_over">
                        <router-link to="/baseInfo"><img class="back_nav_img" src="../ykyf_images/back_bg.png"  alt="返回上一页" ></router-link>商家基本信息 /商家认证
                    </div>
                    <div class="system_02_2_4_m" style="margin-left:60px;">
                        <img src="../ykyf_images/m4.png" alt="" class="m4_png" style="left:-7px;top:-5px;">
                        <h3 style="margin-bottom:10px;">您已提交审核认证，请耐心等待审核。</h3>
                        恭喜您提交易快商家认证，您将获得免费参加基础培训的机会，我们的基础培训将在官方的QQ群里进行，希望您不要错过！基础培训QQ群号：601113320
                    </div>
                </div>`,
    data:function(){
         return {}
    },
    motheds:{

    },
    created:function(){

    }
}


/*----------认证中------------*/
const  renzhengfail={
    template:`<div id="verify_reVerify" class="main_content_box" style="padding:0 0 30px 13px;background:#f4f5f9;/* display: none; */">
                        <div class="back_nav edit_over">
                            <router-link to="/baseInfo"><img class="back_nav_img" src="../ykyf_images/back_bg.png"  alt="返回上一页" ></router-link>商家基本信息 /商家认证
                        </div>
                        <div class="system_02_2_4_m" style="margin-left:60px;">
                            <div>
                                <img src="../ykyf_images/mre4.png" alt="" class="m4_png" style="left:-7px;top:-5px;width: 50px;">
                                <h3 style="margin-bottom:10px;">很抱歉你的资料未通过审核。</h3>
                                具体原因：{{remark}}
                            </div>
                            <router-link to="/baseClasla"><a href="#"  style="color:blue;float: right; margin-top: -41px;margin-right: -145px;">重新提交</a></router-link>
                        </div>
                    </div>`,
    data:function(){
         return {
              remark:''
         }
    },
    motheds:{

    },
    created:function(){
        var ykyf_userId=getUserIdBySession();
        this.$http.post(pathApi+"/open/user/getUserById",{userId:ykyf_userId},{emulateJSON:true,credentials: true}).then(function(r){
            var resdata= r.data;
            loginInfo=resdata.data;
            pageData.userState=loginInfo.userState;
            if(resdata.errorCode=='success'){
               this.remark=loginInfo.remark

            }else{
                alertErrors(resdata.errorMsg,1500);
            }
        })
    }
}

//配置路由
const routes = [
    {path: '/baseInfo', component: baseinfo},
    {path: '/baseSet', component: baseset},
    {path: '/basePay', component: basepay},
    {path: '/baseState', component: basestate},
    {path:'/baseClasla',component:baserenzheng},
    {path:'/baseClaslaing',component:renzhengzhong},
    {path:'/baseClaslafail',component:renzhengfail},
    //重定向
    {path: '*', redirect: '/baseInfo'}
]
//生成路由实例
const router = new VueRouter({
    routes
})
//挂载到vue上
new Vue({
    router,
    el: '#main',
    data: {
        base: {
            baseInfoData: {     //基本信息
                baseName: '',  //商家简称
                baseState: '', //认证状态
                baseLogo: '',   //商家Logo
                baseCont: '',    //联系人
                baseBind: '', //绑定手机
                baseLogoFile:'',  //更改的商家LOGO图片
                baseCity: {
                    province: '',
                    city: '',
                    area: ''
                }           //省市区
            },
            baseSetData: {       //基本设置

            },
            basePayData: {      //支付/收款

            },
            baseStateData: {
                baseFullName: '',   //企业全称
                baseLicenseNum: '', //营业执照编号
                baseLicenseImg: '', //营业执照
                baseRealName: '',  //真实姓名
                baseIdentify: {    //身份照
                    faceImg: '',  //正面
                    backImg: ''  //反面
                }
            }
        }
    },
    methods: {
        addClass: function (e) {
            var _li = e.target;
            $(".menu_ban li").removeClass("on");
            $(_li).addClass("on");
        },
        sureSave_edit_name: function () {  //确认保存更改简介
             var newName=$(".edit_name").val();
             var p ={nickName:newName};
             this.$http.post(pathApi+"/main/edit/updateNickName",p,{emulateJSON:true,credentials: true}).then(function(r){
             var resdata= r.data;
             if(resdata.errorCode=='success'){ //修改成功,
                 alertSuccess(resdata.errorMsg,1500);
                 setTimeout(function(){
                     location.reload();
                 },100)

             }else{
                 alertErrors(resdata.errorMsg,1500);
             }
             })
        },
        sureSave_edit_logo: function () {   //确认保存商家logo
            var formData=new FormData();
            formData.append('businessLogoFile',this.base.baseInfoData.baseLogoFile,this.base.baseInfoData.baseLogoFile.name);
            this.$http.post(pathApi+"/main/edit/updateLogo",formData,{emulateJSON:true,credentials: true}).then(function(r){
                var resdata= r.data;
                if(resdata.errorCode=='success'){
                    alertSuccess(resdata.errorMsg,1500);
                    setTimeout(function(){
                       location.reload();
                    },100)
                }else{
                    alertErrors(resdata.errorMsg,1500);
                }
            })
        },
        sureSave_edit_unbind: function () {  //确认解绑
            console.log(6)
        },
        updataImg: function (e) {    //上传预览图片
            var files = e.target.files;
            var _this=this;
            lrz(files[0])
                .then(function (rst) {
                    // 处理成功会执行
                    console.log(rst);
                    rst.file.name=rst.origin.name;
                    $("#upimg").attr("src", rst.base64);
                    _this.base.baseInfoData.baseLogoFile=rst.file;

                })
                .catch(function (err) {
                    // 处理失败会执行
                })
                .always(function () {
                    // 不管是成功失败，都会执行
                });
        }

    },
    created: function () {


    },
    mounted: function () {


    }

})


