/**
 * Created by Administrator on 2018/1/27.
 */

new Vue({
    el: '#app',
    data: {
        logging:'',//登录
        cryptogram:'',//密码
        account:'',//printf账号
        security :''//printf密码
    },
    methods:{
        getdataBypageId:function(){
            this.logging=$(".phoneNumber").val();
            this.cryptogram=$(".login_password").val();
            var lognID={
                accountName:this.logging,
                password:this.cryptogram
            };
            this.$http.post(_pathApi+'/op/login.do',lognID,{emulateJSON:true,credentials: true}).then(function(res){  //初始页面的数据展示
               // console.log(res.data);
                this.account=res.data.message;
                if(res.data.true==true){
                    if(res.data.type=="fail"){
                        alert(this.account)
                    }else if(res.data.type=="success"){
                        //console.log(res.body)
                        //console.log("iam here")
                        location.href="opEaqul/html/MerchantManagement.html"
                    }
                }else{
                    alert(this.account)
                }
            });
          $.cookie('opUser', this.logging,{path:"/opEaqul"}); //expires:设置有效期     //设置本地缓存
              //localStorage.getItem("opUser",);

        }
    },
    created:function() {

    }
});