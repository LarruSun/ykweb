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
        selectId:'',
        changeIsValid:0,
        addTemplate:{//新增模板对象
            template_name:'',
            template_type:'',
            url:'',
            isValid:'',
            wxTemplateId:'',
            showImgFile:'',//上传的图片文件
        },
        editTemplate:{
            id:'',
            template_name:'',
            template_type:'',
            url:'',
            showImg:'',
            isValid:'',
            wxTemplateId:'',
            showImgFile:'',//上传的图片文件
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
            this.$http.post(_pathApi+"/smallRoutine/get/getTemplateListByCondition",param,{emulateJSON:true,credentials: true}).then(function(res){
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

        getTypeList:function(){
            this.$http.post(_pathApi+"/smallRoutine/get/getTemplateTypeListByParentTypeName",{},{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                var data=res.data.data;
                if(data!=null){
                    this.typeList=data;
                }

            })
        },

        getTemplateById:function(templateId){
            if(templateId==''){
                alertErrors("系统异常",2000);
                location.reload();
            }else{
                this.$http.post(_pathApi+"/smallRoutine/get/getTemplateById",{templateId:templateId},{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res);
                    var data=res.data.data;
                    if(data!=null){
                        this.editTemplate=data;
                        console.log(this.editTemplate);
                    }

                })
                this.getTypeList();
            }
        },

        addSmallRoutineTemplate:function(){
            var param=this.addTemplate;
            var flag=this.regCheck(param);
            if(param.showImgFile==''){
                flag=false;
                alertErrors('模板缩略图不能为空',2000);
            }
            if(flag){
                var formData=new FormData();
                for(var i in param){
                    if(i=='showImgFile'){
                        formData.append(i,param[i],param[i].name);
                    }else{
                        formData.append(i,param[i]);
                    }
                }
                this.$http.post(_pathApi+"/smallRoutine/add/addTemplete",formData,{emulateJSON:true,credentials: true}).then(function(res){
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

        editSmallRoutineTemplate:function () {
            var param=this.editTemplate;
            var flag=this.regCheck(param);
            if(flag){
                var formData=new FormData();
                for(var i in param){
                    if(i=='showImgFile'){
                        if(param[i]!='')
                        formData.append(i,param[i],param[i].name);
                    }else{
                        formData.append(i,param[i]);
                    }
                }
                this.$http.post(_pathApi+"/smallRoutine/edit/editTemplate",formData,{emulateJSON:true,credentials: true}).then(function(res){
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
                templateId:this.selectId,
                isValid:this.changeIsValid
            };
            this.$http.post(_pathApi+"/smallRoutine/edit/changeTemplateStatu",param,{emulateJSON:true,credentials: true}).then(function(res){
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
                {name:"template_name",desc:'模板名称不能为空'},
                {name:"template_type",desc:'模板类型不能为空'},
                {name:"url",desc:'模板HTML名称不能为空'},
                {name:"wxTemplateId",desc:'开放平台端模板ID不能为空'},
                {name:"isValid",desc:'是否上架不能为空'}
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
            this.selectId=templateId;
        },

        bindChangeParam:function(templateId,isValid){
            this.selectId=templateId;
            this.changeIsValid=isValid;
        },

        deleteById:function () {
            this.$http.post(_pathApi+"/smallRoutine/delete/deleteTemplateById",{templateId:this.selectId},{emulateJSON:true,credentials: true}).then(function(res){
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
                    _this.addTemplate.showImgFile=rst.file;

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
                    _this.editTemplate.showImgFile=rst.file;
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
        var param={
            page:1,
            pageSize:this.pageSize
        }
        this.getPageDate(param);
    },
    watch:{
    }
})