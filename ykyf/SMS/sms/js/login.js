
new Vue({
    el: '#app',
    data: {
        first: '',//初始页面的数据临时存放点展示
        haveSign:'',//是否有签名
        signStatu:'',//签名审核状态
        signText:'',//签名内容
        smsRemain:'',//剩余数量
        sendNum:'',//总发送
        successNum:'',//成功到达
        failNum:'',//发送失败
        reviseCount:0,  //已修改次数

        signTexts:'' //申请的签名内容

    },
    methods: {
        signUpSubmit:function(){
            if(this.reviseCount>=5){
                alertErrors("修改次数已达限制，请联系管理员");
                return;
            }
           if(this.checkedSignText()){
               this.$http.post(pathApi + "/sms/add/addSign",{signText:this.signTexts},{emulateJSON:true,credentials:true}).then(function (res) {
                   if(res.data.type=='success'){
                      location.reload();
                   }else{
                       alertErrors(res.data.message);
                   }

               })
           }
        },
        checkedSignText:function(){
            if(this.signTexts.length>2&&this.signTexts.length<9){
                return true;
            }else{
                alert("签名不成功");
                return false;
            }
        }
    },
    created: function () {
        this.$http.post(pathApi + "/sms/get/getIndexData",{},{emulateJSON:true,credentials:true}).then(function (res) {
            console.log(res.data);
            if(res.data.type=='success'){
                this.first = res.data.data;
                this.haveSign=res.data.data.haveSign;
                this.signStatu=res.data.data.signStatu;
                this.signText=res.data.data.signText;
                this.smsRemain=res.data.data.smsRemain;
                this.sendNum=res.data.data.sendNum;
                this.successNum=res.data.data.successNum;
                this.failNum=res.data.data.failNum;
                this.reviseCount=res.data.data.reviseCount;
            }
        })
    }
})