/**
 * Created by Administrator on 2018/2/1.
 */
new Vue({
    el:'#App',
    data:{
        cur: 1,//默认第一页
        all:1,//总页数
        templateList:'',
        typeList:'',
        count:0,//记录总数
        pageSize:10,
        templateName:'',
        selectedId:'',
        changeIsDefault:'',
        addObj:{//新增模板对象
            templateName:'',//模板名称
            couponsNum:'',//优惠券数量
            typeId:'',//模板类型id
            htmlAddress:'',//pc端地址
            mobileHtmlAddress:'',//手机端地址
            isDefault:'',//是否上架
            imageFile:'',//缩略图文件
        },
        editObj:{
            templateName:'',//模板名称
            couponsNum:'',//优惠券数量
            typeId:'',//模板类型id
            image:'',//缩略图
            htmlAddress:'',//pc端地址
            mobileHtmlAddress:'',//手机端地址
            isDefault:'',//是否上架
            imageFile:'',//缩略图文件
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
                templateName:this.templateName
            };
            this.getPageDate(param);
        },

        getPageDate:function(param){
            this.$http.post(_pathApi+"/op/coupons/get/getCouponsTemplateByName",param,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                var data=res.data.data;
                if(data!=null){
                    this.templateList=res.data.data.list;
                    this.all=res.data.data.pageAll;
                    this.count =res.data.data.countAll;
                    if(res.body.data.pageAll==0){
                        this.all = 1;
                        this.count = res.body.data.countAll;
                    }
                }

            })
        },

        getTemplateById(templateId){
            this.$http.post(_pathApi+"/op/coupons/get/getCouponsTemplateById",{couponsTemplateId:templateId},{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                var data=res.data.data;
                if(data!=null){
                    this.editObj=data;
                    console.log(data);
                }
            });
            this.getTypeList();
        },

        getTypeList:function(){
            this.$http.post(_pathApi+"/op/coupons/get/getAllCouponsTemplateType",{},{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                var data=res.data.data;
                if(data!=null){
                    this.typeList=data;
                }

            })
        },

        addCouponsTemplate:function(){
            var param=this.addObj;
            var flag=this.regCheck(param);
            if(param.imageFile==''){
                flag=false;
                alertErrors('模板缩略图不能为空',2000);
            }
            if(flag){
                var formData=new FormData();
                for(var i in param){
                    if(i=='imageFile'){
                        formData.append(i,param[i],param[i].name);
                    }else{
                        formData.append(i,param[i]);
                    }
                }
                this.$http.post(_pathApi+"/op/coupons/add/addCouponsTemplate",formData,{emulateJSON:true,credentials: true}).then(function(res){
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

        editCouponsTemplate:function () {
            var param=this.editObj;
            var flag=this.regCheck(param);
            if(flag){
                var formData=new FormData();
                for(var i in param){
                    if(i=='imageFile'){
                        if(param[i]!='')
                            formData.append(i,param[i],param[i].name);
                    }else{
                        formData.append(i,param[i]);
                    }
                }
                this.$http.post(_pathApi+"/op/coupons/edit/updateCouponsTemplate",formData,{emulateJSON:true,credentials: true}).then(function(res){
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

        changeTemplateStatu:function(){
            var param={
                couponsTemplateId:this.selectedId,
                isDefault:this.changeIsDefault
            };
            this.$http.post(_pathApi+"/op/coupons/edit/changeCouponsTemplateStatu",param,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                if(res.data.type=='success'){
                    alertSuccess(res.data.message,2000);
                    location.reload();
                }else{
                    alertErrors(res.data.message,2000);
                }
            })
        },

        regCheck:function(obj){  //新增服务的校验
            var flag=true;
            var must=[
                {name:"templateName",desc:'模板名称不能为空'},
                {name:"couponsNum",desc:'优惠券数量不能为空'},
                {name:"typeId",desc:'模板类型不能为空'},
                {name:"htmlAddress",desc:'web端HTML不能为空'},
                {name:"mobileHtmlAddress",desc:'phone端HTML不能为空'},
                {name:"isDefault",desc:'是否上架不能为空'}
            ]; //必填项
            for(var i=0;i<must.length;i++){
                if(obj[must[i].name]===''){
                    console.log(obj[must[i].name])
                    alertErrors(must[i].desc,2000);
                    flag=false;
                    return flag;
                }
            }
            return flag;
        },

        bindSelectedId:function (templateId) {
            this.selectedId=templateId;
        },

        bindChangeParam:function(templateId,changeIsDefault){
            this.selectedId=templateId;
            this.changeIsDefault=changeIsDefault;
        },

        deleteById:function () {
            this.$http.post(_pathApi+"/op/coupons/delete/deleteCouponsTemplateById",{couponsTemplateId:this.selectedId},{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                if(res.data.type=='success'){
                    alertSuccess(res.data.message,2000);
                    location.reload();
                }else{
                    alertErrors(res.data.message,2000);
                }
            })
        },

        getAddImg:function(e){
            var files = e.target.files;
            var _this=this;
            lrz(files[0],{quality:0.8})
                .then(function (rst) {
                    // 处理成功会执行
                    console.log(rst);
                    rst.file.name=rst.origin.name;
                    $("#upimg").attr("src", rst.base64);
                    _this.addObj.imageFile=rst.file;

                })
                .catch(function (err) {
                    // 处理失败会执行
                    console.log(err);
                })
                .always(function (msg) {
                    // 不管是成功失败，都会执行
                    console.log(msg)
                });
        },
        getEditImg:function(e){
            var files = e.target.files;
            var _this=this;
            lrz(files[0],{quality:0.8})
                .then(function (rst) {
                    // 处理成功会执行
                    console.log(rst);
                    rst.file.name=rst.origin.name;
                    _this.editObj.imageFile=rst.file;
                    $("#editimgid").attr("src", rst.base64);
                })
                .catch(function (err) {
                    // 处理失败会执行
                    console.log(err);
                })
                .always(function (msg) {
                    // 不管是成功失败，都会执行
                    console.log(msg)
                });
        },

    },
    created:function(){             //数据展示
        this.search();
    },
    watch:{
    }
})