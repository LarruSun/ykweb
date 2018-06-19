/**
 * Created by Administrator on 2018/1/31.
 */

new Vue({   //忘记密码
    el:'#forgetyfPwd',
    data:{
        foPhone:'',
        fovaliCode:'',
        fomsgCode:'',
        fopwd:'',
        fonewpwd:''
    },
    methods:{
        getvaliCode:function(e){ //获取验证码
            e.target.src=chgUrl(pathApi1+"/verifyCode.jpeg");
        },
        getfomsgCode:function(e){ //获取短信
            var _target= e.target;
            if(myReg.mobile.test(this.foPhone)){ //判断手机号是否正确
                var _target= e.target;
                this.$http.post(pathApi+'/open/user/getYzm',{phone:this.foPhone,code:'20'},{emulateJSON:true,credentials: true}).then(function(r){
                    var resdata= r.data;
                    if(resdata.errorCode=='success'){ //发送成功
                        alertSuccess('短信验证码发送成功!',1500)
                    }else{
                        alertErrors(resdata.errorMsg,1500);
                    }
                },function(){

                });
            }else{
                if(this.foPhone==''){
                    alertErrors("请先输入手机号码",1500);
                    $("#exampleInputName").focus();
                }else{
                    alertErrors("请输入正确的手机格式",1500);
                    $("#exampleInputName").focus();
                }
            }
        },
        fosubmit:function(){
            var iscanSubmit=this.submitVali();
            if(iscanSubmit){
                var p ={loginName:this.foPhone,passWord:this.fopwd,veryCode:this.fovaliCode,smsCode:this.fomsgCode};
                this.$http.post(pathApi+"/open/user/updatePassWord",p,{emulateJSON:true,credentials: true}).then(function(r){
                    var resdata= r.data;
                    if(resdata.errorCode=='success'){ //提交成功
                        alertSuccess("修改密码成功",1500);
                        setTimeout(function(){
                            window.location.href='./yf_login.html'
                        },1500)
                    }else{
                        alertErrors(resdata.message,1500);
                    }
                })
            }
        },
        submitVali:function(e){//忘记密码的提交验证
            if(myReg.mobile.test(this.foPhone)&&this.fovaliCode!==''&&this.fomsgCode!==''&&myReg.yfloginpwd.test(this.fopwd)&&this.fopwd==this.fonewpwd){ //验证是否能提交数据
                return true;
            }else{
                if(!myReg.mobile.test(this.foPhone)){//手机号码不正确
                    alertErrors("请输入正确的手机格式",1500);
                    $("#exampleInputName").focus();
                    return false;
                }
                if(!this.fovaliCode!=''){
                    alertErrors("请填写验证码",1500);
                    $(".verify").focus();
                    return false;
                }
                if(!this.fomsgCode!=''){
                    alertErrors("请输入短信验证码",1500);
                    $("#forgetPwd_verifyCode").focus();
                    return false;
                }
                if(!myReg.yfloginpwd.test(this.fopwd)){
                    alertErrors("密码6-12个有效字符,以字母开头",1500);
                    $("#examplepos").focus();
                    return false;
                }
                if(!(this.fopwd==this.fonewpwd)){
                    alertErrors("两次密码不一致!",1500);
                    $("#examplepos2").focus();
                    return false;
                }
            }
        }
    },
    created:function(){
        $(".valiImg2").attr('src',chgUrl(pathApi1+"/verifyCode.jpeg"));

    }
})