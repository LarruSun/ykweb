new Vue({
    el: "#main-container",
    data: {
        remindList:{},
        remindTypes:[],
        wxthird:{authorizerAppid:""},
        remind:"",
        remindType:[],
        wxNickName:"",
        wxUserName:"",
        shopId:location.href.split("=")[1],
        cur: 1,//默认第一页
        all:1,//总页数
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        reload:function(){
            location.reload();
        },
        listen: function (data) {  //分页
            // console.log(data)
            this.cur = data;
            this.getListReminds(data)
        },
        //确定添加事件
        addRemind:function(e){
            var chkValue='';
            $(e.target).attr("data-dismiss","modal");
            $("#myModal_add_bang .control-label input").each(function () {
                if($(this).prop("checked"))
                    chkValue+=$(this).attr("name")+",";
            })
            if(chkValue===''){
                alertErrors("请勾选提醒项");
                $(e.target).removeAttr("data-dismiss");
                return false;
            }
            if(!$(".addUserName").val()){
                alertErrors("请填写姓名");
                $(e.target).removeAttr("data-dismiss");
                return false;
            }
            if(!$(".addCellPhone").val()){
                alertErrors("请填写手机号");
                $(e.target).removeAttr("data-dismiss");
                return false;
            }
            if(!this.checkCellPhone($(".addCellPhone").val())){
                $(e.target).removeAttr("data-dismiss");
                return;
            }
            var adddata = {
                userName:$(".addUserName").val(),
                cellPhone:$(".addCellPhone").val(),
                shopId:this.shopId,
                chkValue:chkValue
            };
            this.$http.post(cyApi+'/add/cyRemind',adddata,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.message=='SUCCESS'||res.body.type=='SUCCESS'||res.body.type=='success'){
                    location.reload(true);
                }
            });
        },
        //获取二维码图片
        getQrcode:function(e){
            $("#qrcode").empty();
            var cyRemindeeId = $(e.target).attr("name");
            var appid = this.wxthird.authorizerAppid;
            var url = cyApi+"/open/remindToBound?cyRemindeeId="+cyRemindeeId+"&appid="+appid;
            $("#qrcode").qrcode({
                width:151,
                height:151,
                text:url
            })
            $('#myModal_er').modal('show');

        },
        // 设置
        edit:function(e){
            var cyRemindeeId = $(e.target).attr("name");
            this.remind = this.getRemind(cyRemindeeId);
            $('#myModal_out3').modal('show');
            console.log(this.remindType)
        },
        // 删除
        del:function(e){
            var cyRemindeeId = $(e.target).attr("name");
            this.remind = this.getRemind(cyRemindeeId);
            if(!this.remind.weChatName||this.remind.weChatName==''){
                alertErrors('未绑定微信！无法解绑');
            }else{
                $('#myModal_out').modal('show');
            }
        },
        // 确定添加事件
        update:function(e){
            $(e.target).attr("data-dismiss","modal");
            var userName = $("#updateUserName").val();
            var phone = $("#updateCellPhone").val();
            if(userName===undefined || userName.length<=0){
                alertErrors("姓名不能为空");
                $(e.target).removeAttr("data-dismiss");
                return;
            }
            if(phone===undefined || phone.length<=0){
                alertErrors("手机号不能为空");
                $(e.target).removeAttr("data-dismiss");
                return;
            }
            if(!this.checkCellPhone(phone)){
                $(e.target).removeAttr("data-dismiss");
                return;
            }
            var arr=[];
            for(var i=0;i<this.remindType.length;i++){
                arr[i]=this.remindType[i];
            }
            var str=arr.join(",");
            var obj={};
            obj.types=str;
            obj.remindId =this.remind.id;
            obj.userName = this.remind.userName;
            obj.cellPhone= this.remind.cellPhone;
            console.log(obj);
            this.$http.post(cyApi+'/update/remind',obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type==='SUCCESS'||res.data.type==='success'){
                    alertSuccess("设置成功");
                    $('#myModal_out3').modal('hide');
                    location.reload();
                }else{
                    alertErrors("设置失败");
                }
            });

        },
        
        delbound:function(){
            var obj={};
            obj.cyRemindeeId = this.remind.id;
            this.$http.post(cyApi+'/del/remind',obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type==='SUCCESS'||res.data.type==='success'){
                    alertSuccess("解绑成功");
                    location.reload();
                }else{
                    alertErrors("解绑失败");
                }
            });
        },
        getRemind:function(id){
            this.remindType=[];
            for(var i=0;i<this.remindList.length;i++){
                if(id==this.remindList[i].id){
                    for(var j=0;j<this.remindTypes.length;j++){
                        if(this.remindList[i].remindName.indexOf(this.remindTypes[j].remindName)>-1){
                            this.remindType.push(this.remindTypes[j].id);
                        }else{
                        }
                    }
                    return this.remindList[i];
                }
            }
        },
        checkCellPhone:function(phone) {
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!(myreg.test(phone))) {
                alertErrors("请输入正确的手机号!");
                return false;
            }else{
                return true;
            }
        },
        getListReminds:function(page){
            var obj={};
            if(page==undefined){
                page=1;
            }
            obj.page=page;
            obj.shopId=this.shopId;
            this.$http.post(cyApi+'/get/listReminds',obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type==='SUCCESS'||res.body.type==='success'){
                    this.remindList = res.data.data.remindlist;
                    this.remindTypes = res.data.data.remindTypes;
                    this.all = res.data.data.pageAll;
                    if(res.data.data.wxthird)
                        this.wxthird = res.data.data.wxthird;
                        this.wxNickName=res.data.data.wxNickName;
                        this.wxUserName=res.data.data.wxUserName;
                }
            });
        },
    },
    filters: {

    },
    watch:{

    },
    created:function() {
        this.getListReminds();
    }
});