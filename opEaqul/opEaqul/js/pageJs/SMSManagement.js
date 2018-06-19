/**
 * Created by Administrator on 2018/2/2.
 */
/**
 * Created by Administrator on 2018/2/1.
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
        count:'',//数据总条数
        updateYwtemplate:{ //短信业务模板传给后台的数据
            id:'',
            type:'',
            typeName:'',
            templateId:'',
            name:'',
            remindText:'',
            status:'',
            isDefault:''
        }
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        listen: function (data) {  //分页
            // console.log(data)
            this.cur = data;
            var obj={
                pageSize:10,
                page:data
            };
            this.getdata(obj)
            //console.log(data)
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
            //console.log(this.dataId);
        },
        smsDel:function(){    //判断是否选择了数据   删除按钮
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据");
                $(".smsDel").attr("data-target","")
                return
            }else{
                $(".smsDel").attr("data-target","#myModal_divisionalManagementDele")
            }
            console.log(this.dataId)
        },
        delDept:function(){   // 删除提交按钮
            var obj={
                ids:this.dataId
            }
            //console.log(obj)
            this.$http.post(_pathApi+"/sms/delete/deleteYwtemplate",obj,{emulateJSON:true,credentials:true}).then(function(res){
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
                    this.updateYwtemplate.id=dd.id,
                    this.updateYwtemplate.type=dd.type,
                    this.updateYwtemplate.typeName=dd.typeName,
                    this.updateYwtemplate.templateId=dd.templateId,
                    this.updateYwtemplate.name=dd.name,
                    this.updateYwtemplate.remindText=dd.remindText,
                    this.updateYwtemplate.status=dd.status,
                    this.updateYwtemplate.isDefault=dd.isDefault
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
            this.$http.post(_pathApi+"/sms/edit/updateYwtemplate",this.updateYwtemplate,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=="success"||res.data.type=="SUCCESS"){
                    alert("修改成功");
                }else{
                    alert(res.data.message);
                }
            })
            location.reload(true);
        },
        smsAdd:function(){     //添加提交按钮
            if(!this.checkForm()){
                return;
            }
            var obj={
                id:this.updateYwtemplate.id,
                type:this.updateYwtemplate.type,
                typeName:this.updateYwtemplate.typeName,
                templateId:this.updateYwtemplate.templateId,
                name:this.updateYwtemplate.name,
                remindText:this.updateYwtemplate.remindText,
                status:this.updateYwtemplate.status,
                isDefault:this.updateYwtemplate.isDefault
            }
           // console.log(obj)
            this.$http.post(_pathApi+"/sms/add/addYwtemplate",obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=="success"||res.data.type=="SUCCESS"){
                    alert("新增成功");
                }else{
                    alert(res.data.message);
                }
            })
            location.reload(true);
        },
        checkForm:function(){
            if(this.updateYwtemplate.type==undefined||this.updateYwtemplate.type.length==0){
                alert("业务类型id不能为空");
                return false;
            }
            if(this.updateYwtemplate.typeName==undefined||this.updateYwtemplate.typeName.length==0){
                alert("业务类型名称不能为空");
                return false;
            }
            if(this.updateYwtemplate.templateId==undefined||this.updateYwtemplate.templateId.length==0){
                alert("短信模板ID不能为空");
                return false;
            }
            if(this.updateYwtemplate.name==undefined||this.updateYwtemplate.name.length==0){
                alert("业务名称不能为空");
                return false;
            }
            if(this.updateYwtemplate.remindText==undefined||this.updateYwtemplate.remindText.length==0){
                alert("提示语不能为空");
                return false;
            }
            if(this.updateYwtemplate.status==undefined||this.updateYwtemplate.status.length==0){
                alert("是否上架不能为空");
                return false;
            }
            if(this.updateYwtemplate.isDefault==undefined||this.updateYwtemplate.isDefault.length==0){
                alert("是否默认开启不能为空");
                return false;
            }
            return true;
        },
        seachthis:function(){   //查询
            this.businessName=$(".seach").val();
            var obj={
                page:1,
                name:this.businessName,
                pageSize:'10'
            }
            this.cur=1
            this.getdata(obj);
        },
        getdata:function(obj){ //通过object的不同向后台请求不同的数据
            debugger
            this.$http.post(_pathApi+"/sms/get/getYwtemplate",obj,{emulateJSON:true,credentials: true}).then(function(res){
                //debugger
                this.divisionalTable=res.body.data.list;
                this.all=res.body.data.pageAll;
                this.count =res.body.data.countAll;
                if(res.body.data.pageAll==0){
                    this.all = 1;
                    this.count = res.body.data.countAll;
                }
                console.log(this.all,this.count)
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
            page:'1',
            pageSize:"10"
        }
        this.getdata(obj);
    },
    watch:{
    }
})