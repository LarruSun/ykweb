/**
 * Created by Administrator on 2018/2/1.
 */
new Vue({
    el:'#App',
    data:{
        cur: 1,//默认第一页
        all:1,//总页数
        typeList:'',
        count:0,//记录总数
        pageSize:10,
        typeName:'',
        selectId:'',
        addTemplateType:{
            typeName:'',
            description:'',
        },
        editTemplateType:{
            id:'',
            typeName:'',
            description:'',
        },
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        listen(data){
            this.cur = data;
            var _this=this;
            var param={
                pageSize:_this.pageSize,
                page:data,
                typeName:_this.typeName
            };

            this.getData(param);
        },

        search:function(){
            var param={
                pageSize:this.pageSize,
                page:1,
                typeName:this.typeName
            };
            this.getData(param);
        },

        getData:function(param){
            this.$http.post(_pathApi+"/smallRoutine/get/getTemplateTypeListByCondition",param,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                var data=res.data.data;
                if(data!=null){
                    this.typeList=res.data.data.list;
                    this.all=res.data.data.pageAll;
                    this.count =res.data.data.countAll;
                    if(res.body.data.pageAll==0){
                        this.all = 1;
                        this.count = res.body.data.countAll;
                    }
                }

            })
        },

        getDataById:function(typeId){
            if(typeId=='' || typeId==undefined){
                alertErrors("数据获取异常",2000);
            }else{
                this.$http.post(_pathApi+"/smallRoutine/get/getTemplateTypeById",{templateTypeId:typeId},{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res);
                    if(res.data.data!=null){
                        this.editTemplateType=res.data.data;
                    }
                })
            }
        },

        bindSelectedId:function(typeId){
            this.selectId=typeId;
        },

        deleteById:function(){
            var typeId=this.selectId;
            if(typeId=='' || typeId==undefined){
                alertErrors("数据获取异常",2000);
            }else{
                this.$http.post(_pathApi+"/smallRoutine/delete/deleteTemplateTypeById",{templateTypeId:typeId},{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res);
                    if(res.data.type=="success"){
                        alertSuccess(res.data.message,2000);
                        location.reload();
                    }else{
                        alertErrors(res.data.message,2000);
                    }
                })
            }
        },

        addSmallRoutineTemplateType:function(){
            if(this.addTemplateType.typeName=='' || this.addTemplateType.typeName=='小程序模板'){
                alertErrors("请输入正确的类型名称",2000);
                //$("#myModal_divisionalManagementAdd").modal('show');
            }else{
                this.$http.post(_pathApi+"/smallRoutine/add/addTempleteType",this.addTemplateType,{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res);
                    if(res.data.type=="success"){
                        alertSuccess(res.data.message,2000);
                        location.reload();
                    }else{
                        alertErrors(res.data.message,2000);
                    }
                })
            }
        },

        editSmallRoutineTemplateType:function(){
            if(this.editTemplateType.typeName=='' || this.editTemplateType.typeName=='小程序模板'){
                alertErrors("请输入正确的类型名称",2000);
                //$("#myModal_divisionalManagementAdd").modal('show');
            }else{
                this.$http.post(_pathApi+"/smallRoutine/edit/editTemplateType",this.editTemplateType,{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res);
                    if(res.data.type=="success"){
                        alertSuccess(res.data.message,2000);
                        location.reload();
                    }else{
                        alertErrors(res.data.message,2000);
                    }
                })
            }
        },

    },
    created:function(){             //数据展示
        this.search();
    },
    watch:{
    }
})