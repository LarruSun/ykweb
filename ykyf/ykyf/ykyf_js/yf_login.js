/**
 * Created by Administrator on 2018/1/23.
 */
new Vue({    //登录
    el:'#login',
    data:{
        phone:'',
        logPwd:'',
        checked:false,
        valiCode:''
    },
    methods:{
        forget:function(){ //忘记密码的切换
            window.location.href='./yf_editPassword.html'
        },
        signUp:function(){ //登录
            var isCansendData=this.loginVali();
            if(isCansendData){ //验证通过
                var p ={username:this.phone,password:this.logPwd,veryCode:this.valiCode,"remember-me":this.checked};
                this.$http.post(pathApi1+"/oauth2/login",p,{emulateJSON:true,credentials: true}).then(function(r){
                    var resdata= r.data;
                    console.log(resdata);
                    if(resdata.type=='success'){ //登陆成功,
                        localStorage.setItem("ykyf_userId",resdata.data.principal.user.id);
                        window.location.href='./ykyf_html/index_new.html'
                    }else{
                        alertErrors(resdata.message,1500);
                    }
                })
                this.remember();
            }
        },
        remember:function(){  //记住账号
            if(this.checked){
                var yflogin={username:this.phone,userpwd:this.logPwd};
                localStorage.setItem('yflogin',JSON.stringify(yflogin));
            }else{
                localStorage.removeItem('yflogin');
            }
        },
        getvaliCode:function(e){ //获取验证码
            e.target.src=chgUrl(pathApi1+"/verifyCode.jpeg");
        },
        loginVali:function(){ //登陆验证
            if(myReg.mobile.test(this.phone)&&myReg.yfloginpwd.test(this.logPwd)&&this.valiCode!==''){ //验证手机号是否正确
                return true;
            }else{
                if(!myReg.mobile.test(this.phone)){//手机号码不正确
                    alertErrors("请输入正确的手机格式",1500);
                    $("#exampleInputName2").focus();
                    return false;
                }
                if(!myReg.yfloginpwd.test(this.logPwd)){
                    alertErrors("登录密码6-12个有效字符,以字母开头",1500);
                    $("#inputPassword").focus();
                    return false;
                }
                if(!this.valiCode!=''){
                    alertErrors("验证码不能为空",1500);
                    $(".verify").focus();
                    return false;
                }
            }
        }
    },
    created:function(){//判断是否记住密码
        var yflogin=localStorage.getItem('yflogin')==null?false:JSON.parse(localStorage.getItem('yflogin'));
        if(yflogin){
            this.phone=yflogin.username;
            this.logPwd=yflogin.userpwd;
            this.checked=true;
        }
        $(".valiImg1").attr('src',chgUrl(pathApi1+"/verifyCode.jpeg"))
    }
})

