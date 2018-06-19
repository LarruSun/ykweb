
new Vue({
   el:"#app",
   data:{
        rechargeRecordArr:[  //充值记录

        ],
       smsPriceList:[  //充值记录

       ],
        pageSize:10, //每页条数
        cur:1,    //当前页码
        all:1,   //总页码
        selectAutoBuy:"",//自动充值选择条数
        selectPrice:""//自动充值jiage

   },
   components: {   //分页
           'vue-pagination': Vue.Pagination
   },
   methods:{
       listen: function (data) {  //分页
               this.cur = data;
               this.rechargeRecord();
        },
       getAutoRechargeInfo:function(obj){  //获取自动充值信息
           this.$http.post(pathApi + "/sms/get/getAutoRechargeInfo",obj,{emulateJSON:true,credentials:true}).then(function (res) {
           if(res.data.type=='success'){
               var autoBuy = res.data.data.autoBuy;
               if(autoBuy=="true"){
                   $('#isAutoReCharge').prop("checked","checked");
                   this.selectAutoBuy = res.data.data.num;
                   this.selectPrice= res.data.data.smsPriceId;
               }
            }
          })
       },
       getAccount:function(){
           this.$http.post(pathApi + "/open/user/get/getAccount",{},{emulateJSON:true,credentials:true}).then(function (res) {
               if(res.data.type=='success'){

                 $(".bamount").html(res.data.data.bAmount);
               }
           })
       },
       getSmsPrice:function(){  //获取短信价格
              this.$http.post(pathApi + "/sms/get/getSmsPrice",{},{emulateJSON:true,credentials:true}).then(function (res) {
                  if(res.data.type=='success'){
                        this.smsPriceList=res.data.data;
                  }
              })
       },
       reSearchRecord:function(){
            //alert(123);
           var obj={
               page:this.cur,
               pageSize:this.pageSize
           }
           this.rechargeRecord(obj);
       },
       rechargeRecord:function(obj){ //获取购买短信记录
            this.$http.post(pathApi + "/sms/get/rechargeRecord",obj,{emulateJSON:true,credentials:true}).then(function (res) {
                 if(res.data.type=='success'){
                     if(res.body.data.pageAll==0||res.body.data.pageAll==undefined){
                         this.all=1;
                     }else{
                         this.all = res.body.data.pageAll;
                     }
                     this.rechargeRecordArr=res.data.data.list;
                 }
            })
       },
       rechargeType:function(e){//选择是账户充值还是微信充值
           if(e == 0){
               $("#submitTop").removeAttr("data-target");
               $("#submitTop").text("确定");
           }
           if(e == 1){
               $("#submitTop").attr("data-target","#show2");
               $("#submitTop").text("下一步");
           }
       },
       smsRechargeTop:function(){//确认充值
           var total = $("#totalBuy").text();
           $("#sdPay").text(total);
           //充值使用哪个账户。0，本系统账户，1微信
           var topType = $('input:radio[name="form-field-radi"]:checked').val();
           var id =$("#idBuy").val();
           var price = $("#priceBuy").text();
           var total =$("#totalBuy").text();
           var num =$("#numBuy").text();
           var bamount =$("#bamount").text();
           $("#buyTotal").html(total);
           if(topType==0){
               if(parseFloat(total)>parseFloat(bamount)){
                   alertErrors("您的余额不足,请先充值");
                   return;
               }
           }
           var obj={
               rechargeType : topType,
               priceId:id,
               password:"123456"
           };
           this.$http.post(pathApi + "/sms/add/rechargeSms",obj,{emulateJSON:true,credentials:true}).then(function (res) {
               console.log(res.data);
               if(res.data.type=='success' || res.data.type=='SUCCESS' ){
                   if(topType==0){
                       alertSuccess(res.data.message);
                       //重新刷新充值记录
                       var obj={
                           page:this.cur,
                           pageSize:this.pageSize
                       }
                       this.rechargeRecord(obj);
                       this.getAccount();
                   }else{
                       var  qrcodeText=res.data.data.code_url;
                       $("#qrcode123").empty();

                       $("#qrcode123").qrcode({
                           render   : "canvas",
                           width: 150,
                           height:150,
                           text: qrcodeText
                       });
                   }

               }
           })
       },
       showRecharge:function(id,num,total,price){
           $("#idBuy").val(id);
           $("#priceBuy").text(price);
           $("#totalBuy").text(total);
           $("#numBuy").text(num);
       },
       saveAutoRecharge:function(){  //保存自动充值记录
           var active = "0";
           if($("#isAutoReCharge").is(":checked")){
               active="1";
           }else{
               active = "0"
           }
           var obj = {
               priceId:this.selectPrice,
               autoNum:this.selectAutoBuy,
               active:active
           }
           this.$http.post(pathApi + "/sms/edit/saveAutoRecharge",obj,{emulateJSON:true,credentials:true}).then(function (res) {
              console.log(res.data);
              if(res.data.type=='success'){
                    alertSuccess("保存成功");
              }
           })
       },

   },
   created:function(){
           this.listen(1);
           this.getSmsPrice();
            this.getAccount();
            this.getAutoRechargeInfo();
            this.reSearchRecord();
   },
   mounted:function(){

   },
   watch:{


   }

})
