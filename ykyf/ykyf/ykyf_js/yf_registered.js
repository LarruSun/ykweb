/**
 * Created by Administrator on 2018/1/23.
 */
new Vue({
    el:'#register',
    data:{
        reshortName:'', //企业简称
        rephone:'',   //注册的手机号码
        revaliCode:'', //验证码
        remsgCode:'',  //短信验证码
        recontact:'',   //注册联系人
        repwd:'',       //注册密码
        reconpwd:'',    //确认密码
        recitys:{          //省市区
            province:'',
            city:'',
            area:''
        },
        checked:true
    },
    methods:{
        registerSubmit:function(){ //提交数据
            var isCanSubmit=this.registerVali();
            if(isCanSubmit){
                var p ={nickName:this.reshortName,loginName:this.rephone,veryCode:this.revaliCode,smsCode:this.remsgCode,contactName:this.recontact,password:this.repwd,addressProvince:this.recitys.province,addressCity:this.recitys.city,addressArea:this.recitys.area};
                this.$http.post(pathApi+"/open/user/register",p,{emulateJSON:true,credentials: true}).then(function(r){
                    var resdata= r.data;
                    if(resdata.errorCode=='success'){ //提交成功
                        alertSuccess("注册成功",1500)
                        setTimeout(function(){
                            window.location.href='./yf_login.html'
                        },1600)
                    }else{
                        alertErrors(resdata.message,1500);
                    }
                })
            }
        },
        getvaliCode:function(e){ //获取验证码
            e.target.src=chgUrl(pathApi1+"/verifyCode.jpeg");
        },
        getfomsgCode:function(e){ //获取短信
            var _target= e.target;
            if(myReg.mobile.test(this.rephone)){ //判断手机号是否正确r
                this.$http.post(pathApi+'/open/user/getYzm',{phone:this.rephone,code:'20'},{emulateJSON:true,credentials: true}).then(function(r){
                    var resdata= r.data;
                    console.log(resdata);
                    if(resdata.errorCode=='success'){ //发送成功
                        alertSuccess('短信验证码发送成功!',1500)
                    }else{
                        alertErrors(resdata.errorMsg,1500);
                    }
                });
            }else{
                if(this.rephone==''){
                    alertErrors("请先输入手机号码",1500);
                    $("#exampleInputName3").focus();
                }else{
                    alertErrors("请输入正确的手机格式",1500);
                    $("#exampleInputName3").focus();
                }
            }
        },
        registerVali:function(){ //注册验证
            if(this.reshortName!=''&&this.getCitysData()&&myReg.mobile.test(this.rephone)&&this.revaliCode!=''&&this.remsgCode!=''&&this.recontact!=''&&myReg.yfloginpwd.test(this.repwd)&&this.repwd==this.reconpwd){
                return true;
            }else{
                if(!this.reshortName!=''){
                    alertErrors("企业简称不能为空",1500);
                    $("#exampleInputName").focus();
                    return false;
                }
                if(!this.getCitysData()){
                    //alertErrors("请填写省市区",1500);
                    return false;
                }
                if(!myReg.mobile.test(this.rephone)){//手机号码不正确
                    alertErrors("请输入正确的手机格式",1500);
                    $("#exampleInputName3").focus();
                    return false;
                }
                if(!this.revaliCode!=''){
                    alertErrors("请输入验证码",1500);
                    $(".verify_3").focus();
                    return false;
                }
                if(!this.remsgCode!=''){
                    alertErrors("请输入短信验证码",1500);
                    $("#smsVerifyCode").focus();
                    return false;
                }
                if(!this.recontact!=''){
                    alertErrors("请输入联系人",1500);
                    $("#exampleposs4").focus();
                    return false;
                }
                if(!myReg.yfloginpwd.test(this.repwd)){
                    alertErrors("登录密码6-12个有效字符,以字母开头",1500);
                    $("#examplepos").focus();
                    return false;
                }
                if(!(this.repwd==this.reconpwd)){
                    alertErrors("两次密码不一致!",1500);
                    $("#examplepos2").focus();
                    return false;
                }
            }
        },
        getCitysData:function(){  //省市区验证
            if($(".province").val()!=''&&$(".city").val()!=''){
                this.recitys.province=$(".province").val();
                this.recitys.city=$(".city").val();
                this.recitys.area=$(".area").val();
                return true;
            }
            if($(".province").val()==''){
                alertErrors("请选择省",1500);
                return false
            }
            if($(".city").val()==''){
                alertErrors("请选择市",1500);
                return false
            }
            if($('.area').val()==''){
                alertErrors("请选择区",1500);
                return false
            }
        },
        isAgree:function(){
            console.log(this.checked)
        }
    },
    created:function(){
        $(".valiImg3").attr("src",chgUrl(pathApi1+"/verifyCode.jpeg"));
    }
})

$('#target').distpicker({
    province: '选择省',
    city: '选择市',
    district: '选择区'
}).distpicker('reset', true);
