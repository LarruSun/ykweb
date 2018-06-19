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
        selectedId:'',
        addTypeObj:{//新增模板对象
            typeName:'',
            contain:''
        },
        editTypeObj:{
            typeName:'',
            contain:''
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
                templateName:_this.templateName
            };
            this.getPageDate(param);
        },

        search:function(){
            var param={
                pageSize:this.pageSize,
                page:1,
                typeName:this.typeName
            };
            this.getPageDate(param);
        },

        getPageDate:function(param){
            this.$http.post(_pathApi+"/op/coupons/get/getCouponsTemplateTypeByCondition",param,{emulateJSON:true,credentials: true}).then(function(res){
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

        getTypeById(typeId){
            this.$http.post(_pathApi+"/op/coupons/get/getCouponsTemplateTypeById",{couponsTemplateTypeId:typeId},{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                var data=res.data.data;
                if(data!=null){
                    this.editTypeObj=data;
                }
            })
        },

        addCouponsTemplateType:function(){
            var param=this.addTypeObj;
            var flag=true;
            if(param.typeName==''){
                flag=false;
                alertErrors('请输入类型名称',2000);
            }
            if(flag){
                this.$http.post(_pathApi+"/op/coupons/add/addCouponsTemplateType",param,{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res);
                    if(res.data.type=='success'){
                        alertSuccess(res.data.message,2000);
                        location.reload();
                    }else{
                        alertErrors(res.data.message,2000);
                    }
                })
            }
        },

        editCouponsTemplateType:function(){
            var param=this.editTypeObj;
            var flag=true;
            if(param.typeName==''){
                flag=false;
                alertErrors('请输入类型名称',2000);
            }
            if(flag){
                this.$http.post(_pathApi+"/op/coupons/edit/updateCouponsTemplateType",param,{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res);
                    if(res.data.type=='success'){
                        alertSuccess(res.data.message,2000);
                        location.reload();
                    }else{
                        alertErrors(res.data.message,2000);
                    }
                })
            }
        },

        bindSelected:function(typeId){
            this.selectedId=typeId;
        },

        deleteById(){
            this.$http.post(_pathApi+"/op/coupons/delete/deleteCouponsTemplateTypeById",{couponsTemplateTypeId:this.selectedId},{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                if(res.data.type=='success'){
                    alertSuccess(res.data.message,2000);
                    location.reload();
                }else{
                    alertErrors(res.data.message,2000);
                }
            })
        },
    },
    created:function(){             //数据展示
        this.search();
    },
    watch:{
    }
})