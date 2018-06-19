/**
 * Created by Administrator on 2018/2/3.
 */
/**
 * Created by Administrator on 2018/2/3.
 */
new Vue({
    el:'#App',
    data:{
        cur: 1,//默认第一页
        all:1,//总页数
        msg:'',//数据展示
        checked:false,//全选按钮
        divisionalTable:[],//暂存所有数据
        businessName:'',//查询框
        dataId:[],//数据ID
        updateYwtemplate:{ //短信业务模板传给后台的数据
            templateName:'',
            text:'',
            variables:[],
            appkey:'2f3e5f8cb980f03ad77c231dd3fca85a',
            id:''
        }
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        listen: function (data) {  //分页
            this.cur = data;
            var obj={
                pageSize:10,
                page:data
            };
            this.getdata(obj)
        },
        checkedF:function(e){   //全选
            if(e.target.checked){
                $(".clickSon").prop("checked",true);
                var allId=this.divisionalTable
                for(var i=0;i<allId.length;i++){
                    this.dataId.push(allId[i].id)
                }
            }else{
                $(".clickSon").prop("checked",false);
                this.dataId=[];
            }
            console.log(this.dataId)
        },
        sonlist:function(e){    //单选
            this.dataId=[];
            var _this=this;
            $(".clickSon").each(function(){
                if($(this).prop("checked")){
                    _this.dataId.push($(this).val());
                }
            })
            if(this.dataId.length==this.count){
                this.checked=true
            }else{
                this.checked=false
            }
        },
        smsDel:function(){    //判断是否选择了数据   删除按钮
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据");
                $(".del").attr("data-target","")
                return
            }else{
                $(".del").attr("data-target","#myModal_divisionalManagementDele")
            }
        },
        delDept:function(){   // 删除提交按钮
            var obj={
                ids:this.dataId
            }
            console.log(obj)
            this.$http.post(_pathApi+"/sms/delete/delTemplate",obj,{emulateJSON:true,credentials:true}).then(function(res){
                if(res.data.type=="success"||res.data.type=="SUCCESS"){
                    alert("删除成功");
                }else{
                    alert(res.data.message);
                }
            })
            location.reload(true);
        },
        smsEdit:function(){//判断是否选择了数据   编辑按钮
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据");
                $(".smsEdit").attr("data-target","")
                return
            }else if(len==1){
                $(".smsEdit").attr("data-target","#myModal_divisionalManagementEdit");
                this.updateYwtemplate.id=this.dataId[0]; //获取编辑的记录的id
                var dd=this.getDataById(this.updateYwtemplate.id);
                    this.updateYwtemplate.appkey='2f3e5f8cb980f03ad77c231dd3fca85a',
                    this.updateYwtemplate.templateName=dd.templateName,
                    this.updateYwtemplate.text=dd.text,
                    this.updateYwtemplate.variables=dd.variables,
                    this.updateYwtemplate.id=dd.id
                //console.log(dd.id)
            }else{
                alert("请选择单一数据操作");
                $(".smsEdit").attr("data-target","")
                return
            }
        },
        EditDept:function(){  // 编辑提交按钮
            if(!this.checkForm()){
                return;
            }
            this.$http.post(_pathApi+"/sms/edit/updateTemplate",this.updateYwtemplate,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=="success"||res.data.type=="SUCCESS"){
                    alert("修改成功");
                    var obj={
                        page:1,
                        pageSize:10
                    }
                    this.getdata(obj);
                }else{
                    alert(res.data.message);
                }
            })
        },
        checkForm:function(){
            if(this.updateYwtemplate.templateName==undefined||this.updateYwtemplate.templateName.length==0){
                alert("短信模板名称不能为空");
                return false;
            }
            if(this.updateYwtemplate.text==undefined||this.updateYwtemplate.text.length==0){
                alert("短信内容不能为空");
                return false;
            }
            if(this.updateYwtemplate.variables==undefined||this.updateYwtemplate.variables.length==0){
                alert("变量不能为空");
                return false;
            }
            return true;
        },
        addTemp:function(){          //添加提交按钮
            if(!this.checkForm()){
                return;
            }
            var obj={
                templateName:this.updateYwtemplate.templateName,
                text:this.updateYwtemplate.text,
                variables:this.updateYwtemplate.variables,
                appkey:'2f3e5f8cb980f03ad77c231dd3fca85a'
            }
            this.$http.post(_pathApi+"/sms/add/addTemplate",obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=="success"||res.data.type=="SUCCESS"){
                    alert("新增成功");
                    var obj={
                        page:1,
                        pageSize:10
                    }
                    this.getdata(obj);
                }else{
                    alert(res.data.message);
                }
            })
        },
        seachthis:function(){   //查询
            this.businessName=$(".seach").val();
            var obj={
                page:1,
                pageSize:10,
                templateName:this.businessName
            }
            this.cur=1;
            this.getdata(obj);
        },
        getdata:function(obj){ //通过object的不同向后台请求不同的数据
            this.$http.post(_pathApi+"/sms/get/getTemplateList",obj,{emulateJSON:true,credentials: true}).then(function(res){
                this.divisionalTable=res.data.data.list;
                this.all=res.data.data.pageAll;
                this.count =res.data.data.countAll;
                if(res.body.data.pageAll==0){
                    this.all = 1;
                    this.count = res.body.data.countAll;
                }
                //console.log(res)
            })

        },
        getDataById:function(id){  //通过id查找对应的数据信息
            for(var i=0;i<this.divisionalTable.length;i++){
                if(id==this.divisionalTable[i].id){
                    return this.divisionalTable[i];
                }
            }
        }
    },
    created:function(){             //数据展示
        var obj={
            page:1,
            pageSize:10
        }
        this.getdata(obj);

    }
})