new Vue({
   el:"#app",
   data:{

       setList:[], //会员关怀提醒

   },
   methods:{
       openSet:function(e){
           var that = e.currentTarget;
           var active = $(that).nextAll().eq(1).attr("value");
           var remindText = $(that).nextAll().eq(2).attr("value");
           var text = $(that).nextAll().eq(3).attr("value");
           var setName = $(that).nextAll().eq(4).attr("value");
           var sendTime = $(that).nextAll().eq(5).attr("value");
           var setId = $(that).nextAll().eq(6).attr("value");
           $("#typeName_modelOne").html(setName);
           $("#setId").val(setId);
           if(active ==0){
               $("#checkBox_modelOne").removeAttr("checked");
           }
           if(active ==1){
               $("#checkBox_modelOne").prop("checked", "true");
           }
           //remainText 里没有 time
           if(remindText.indexOf("time") <= 0){
               var s = "";
               s =s+' <p>发送时间点</p>';
               s =s+' <span class="rq" style="color: #999;">'+remindText+'</span>';
               $("#sendTime").html(s);
           }else{
               var index = remindText.indexOf("time");
               var start = remindText.substring(0,index);
               var end = remindText.substring(index+4);
               var s = "";
               s= s+'<p>发送时间点</p>';
               s= s+' <label class=" activity_pula">'+start+' <select size="1"';
               s= s+' name="" aria-controls="sample-table-2" class="dataTable_select">';
               if(sendTime ==0){
                   s= s+' <option value="0" selected="selected">立刻</option>';
               }else{
                   s= s+' <option value="0">立刻</option>';
               }
               if(sendTime ==10){
                   s= s+' <option value="10" selected="selected">10分钟</option>';
               }else{
                   s= s+' <option value="10">10分钟</option>';
               }
               if(sendTime ==20){
                   s= s+' <option value="20" selected="selected">20分钟</option>';
               }else{
                   s= s+' <option value="20">20分钟</option>';
               }
               if(sendTime ==30){
                   s= s+' <option value="30" selected="selected">30分钟</option>';
               }else{
                   s= s+' <option value="30">30分钟</option>';
               }
               if(sendTime ==60){
                   s= s+' <option value="60" selected="selected">60分钟</option>';
               }else{
                   s= s+' <option value="60">60分钟</option>';
               }
               if(sendTime ==120){
                   s= s+' <option value="120" selected="selected">120分钟</option>';
               }else{
                   s= s+' <option value="120">120分钟</option>';
               }
               if(sendTime ==180){
                   s= s+' <option value="180" selected="selected">180分钟</option>';
               }else{
                   s= s+' <option value="180">180分钟</option>';
               }
               s= s+' </select> <span class="rq">'+end+'</span>';
               s= s+' </label>';
               $("#sendTime").html(s);
           }
           $("#text_modelOne").html(text);
       },
       smsSendSet:function(){
           this.$http.post(pathApi + "/sms/get/smsSendSet",{},{emulateJSON:true,credentials:true}).then(function (res) {
               console.log(res.data);
               this.setList=res.data.data;
               if(res.data.type=='success'){

               }
           })
       },
       saveSet:function(){
           var setId = $("#setId").val();
           var active = $("#checkBox_modelOne").is(':checked');
           var sendTime = $(".dataTable_select").find("option:selected").val();
           if(active == true ){
               active = 1;
           }else{
               active = 0;
           }
           if(sendTime==undefined){
               sendTime=0;
           }
           var data = {
               setId:setId,
               active:active,
               sendTime:sendTime
           };
           this.$http.post(pathApi + "/sms/edit/saveSet",data,{emulateJSON:true,credentials:true}).then(function (res) {
               this.setList=res.data.data;
               if(res.data.type=='success'){
                   alertSuccess("保存成功");
                   location.reload();
               }
           })
       }


   },
   created:function(){
        this.smsSendSet();
   },
   mounted:function(){

   },
   watch:{


   }


})