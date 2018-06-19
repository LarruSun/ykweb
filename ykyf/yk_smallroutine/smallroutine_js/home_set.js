new Vue({
    el: '#main-container',
    data: {
        smallRoutineInfo:{},
        templateList:[],
        thisSmallRoutine:{},
        user:{}
    },
    methods: {
        getUserInfo:function(){  //获取自动充值信息
            this.$http.post(webApi + "/open/index/get/userInfo",{},{emulateJSON:true,credentials:true}).then(function (res) {
                if(res.body.type=='success'){
                    this.user= res.body.data;
                }else {
                    alertErrors("商家信息获取失败");
                }
            })
        },
        getSmallRoutineInfo:function(){
            this.$http.post(webApi + "/smallRoutine/get/getSmallRoutineInfo", {}, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success'||res.body.type == 'SUCCESS') {
                    if(res.body.data.isAuth=='false'){
                        window.open(pathVue + '/ykyf/ykyf_html/smallroutine_authorization.html?userId='+res.data.data.userId+'_ykyf');
                        alertErrors("您还未授权小程序");
                    }
                    this.smallRoutineInfo=res.body.data;
                } else {
                    alertErrors("小程序信息获取失败");
                }
            })
        },
        getTemplateList:function(page){
            var obj={};
            obj.page=1;
            obj.pageSize=10;
            this.$http.post(webApi + "/smallRoutine/get/getTemplateList", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success'||res.body.type == 'SUCCESS') {
                    this.templateList=res.body.data.list;
                } else {
                    alertErrors("小程序列表获取失败");
                }
            })
        },
        submitCheck:function(){
            var obj={};
            obj.wxTemplateId=this.thisSmallRoutine.wxTemplateId;
            obj.version=this.thisSmallRoutine.version;
            obj.oldId=this.smallRoutineInfo.id;
            obj.nowId=this.thisSmallRoutine.nowId;
            this.$http.post(webApi + "/smallRoutine/edit/submitCheck", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success'||res.body.type == 'SUCCESS') {
                    alertErrors("小程序提交成功");
                    location.reload();
                } else {
                    alertErrors(res.body.message,2000);
                }
            })
        },
        bind:function(wxTemplateId,version,nowId){
            this.thisSmallRoutine.wxTemplateId=wxTemplateId;
            this.thisSmallRoutine.version=version;
            this.thisSmallRoutine.nowId=nowId;
        }



    },
    created: function () {
        this.getUserInfo();
        this.getSmallRoutineInfo();
        this.getTemplateList(1);
    },

})