/**
 * Created by Administrator on 2018/1/27.
 */

new Vue({
    el:'#App',
    data:{
        cur: 1,//默认第一页
        all:1,//总页数
        msg:'',
        dataId:[],//单数据ID合集
        divisionalTable:'',
        deptList:"",
        section:'',//部门
        section_input:'',//find
        role_model:'',//find
        page:'',
        count:'',
        chec:false,
        divisionalSet:{
            Dname:'',
            numberEmployees:"3",
            describe:'',
            creationTime:'2017-12-25 15:47:28'
        },
        clickID:[]
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        listen: function (data) {  //分页
            this.cur = data;

            this.seach(data,10);
            //  console.log(data)
        },
        signature:function(){//判断是否选择了数据
            var chec = false;
            $(".table_all tbody tr td").find("input").each(function(){
                if($(this).prop("checked")){
                    chec = true;
                }
            });

            if(!chec){
                $(".signature").attr("data-target","#myModal_dataSelection")
            }else{
                $(".signature").attr("data-target","#myModal_divisionalManagementEdit")
            }
        },
        createPerson:function(){//添加数据
            this.divisionalTable.push(this.divisionalSet);//添加到页面
            this.divisionalSet={ // 添加完divisionalSet对象后，重置divisionalSet对象
                Dname:'',
                numberEmployees:"3",
                describe:'',
                creationTime:'2017-12-25 15:47:28'
            };
            this.$http.post("../../json/divisional.json",this.divisionalSet).then(function(res){//返回到后台数据的接口

            })
        },
        sonlist:function(e){
            this.dataId=[];
            var _this=this;
            $(".clickSon").each(function(){
                if($(this).prop("checked")){
                    _this.dataId.push($(this).val());
                    _this.clickID=e.id;
                    $(".editUserName").val(e.userName);
                    $(".editAccountName").val(e.accountName);
                    $(".editPassword").val(e.password);
                    $(".editPassword").attr("name",e.password);
                    $(".editPassword2").val(e.password);
                    $(".editPhone").val(e.phone);
                    $(".editDept").val(e.deptId);
                    //console.log(this.clickID)
                }
            })
            console.log(this.dataId);
            if(this.dataId.length==this.listData){
                this.checked=true
            }else{
                this.checked=false
            }

        },
        edit:function(){//判断是否选择了数据
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据");
                $(".edita").attr("data-target","")
                return
            }else if(len==1){
                $(".edita").attr("data-target","#operationsManagementEidt")
            }else{
                alert("请选择单一数据操作");
                $(".edita").attr("data-target","")
                return
            }
        },
        dela:function(){//判断是否选择了数据
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据");
                $(".dela").attr("data-target","")
                return
                // $(".dela").attr("data-target","#myModal_dataSelection")
            }else if(len==1){
                $(".dela").attr("data-target","#operationsManagementDele")
            }else{
                alert("请选择单一数据操作");
                $(".dela").attr("data-target","")
                return
            }
        },
        edita:function(){
            var oldPassword="";
            if(!$(".editUserName").val()||$(".editUserName").val().trim()==""){
                alert("运营人员姓名不能为空")
                return false;
            }
            if(!$(".editAccountName").val()||$(".editAccountName").val().trim()==""){
                alert("登陆人员账号不能为空")
                return false;
            }
            if(!$(".editPassword").val()||$(".editPassword").val().trim()==""){
                alert("登陆密码不能为空")
                return false;
            }
            if($(".editPassword").val().length<6){
                alert("登陆密码少于6位")
                return false;
            }
            if(!$(".editPassword2").val()||$(".editPassword2").val().trim()==""){
                alert("重复密码不能为空")
                return false;
            }
            if($(".editPassword").val()!=$(".editPassword2").val()){
                alert("密码不一致")
                return false;
            }
            if($(".editPassword").val()==$(".editPassword").attr("name")){
                oldPassword = $(".editPassword").attr("name");
            }
            if(!$(".editDept").val()||$(".editDept").val().trim()==""){
                alert("请选择部门")
                return false;
            }
            if(!$(".editPhone").val()||$(".editPhone").val().trim()==""){
                alert("手机号码不能为空")
                return false;
            }
            var editData={
                yyUserId:this.clickID,
                userName:$(".editUserName").val(),
                accountName:$(".editAccountName").val(),
                password:$(".editPassword").val(),
                password2:$(".editPassword2").val(),
                deptId:$(".editDept").val(),
                phone:$(".editPhone").val(),
                oldPassword:oldPassword
            };
            this.$http.post(_pathApi+"/op/edit/yyUser.do",editData,{emulateJSON:true,credentials: true}).then(function(res){

                location.reload(true);
            })
        },
        addyyUser:function(){
            if(!$(".addUserName").val()||$(".addUserName").val().trim()==""){
                alert("运营人员姓名不能为空")
                return false;
            }
            if(!$(".addAccountName").val()||$(".addAccountName").val().trim()==""){
                alert("登陆人员账号不能为空")
                return false;
            }
            if(!$(".addPassword").val()||$(".addPassword").val().trim()==""){
                alert("登陆密码不能为空")
                return false;
            }
            if($(".addPassword").val().length<6){
                alert("登陆密码少于6位")
                return false;
            }
            if(!$(".addPassword2").val()||$(".addPassword2").val().trim()==""){
                alert("重复密码不能为空")
                return false;
            }
            if($(".addPassword").val()!=$(".addPassword2").val()){
                alert("密码不一致")
                return false;
            }
            if(!$(".addDept").val()||$(".addDept").val().trim()==""){
                alert("请选择部门")
                return false;
            }
            if(!$(".addPhone").val()||$(".addPhone").val().trim()==""){
                alert("手机号码不能为空")
                return false;
            }
            var addData={
                userName:$(".addUserName").val(),
                accountName:$(".addAccountName").val(),
                password:$(".addPassword").val(),
                password2:$(".addPassword2").val(),
                deptId:$(".addDept").val(),
                phone:$(".addPhone").val()
            };
            this.$http.post(_pathApi+"/op/add/yyUser.do",addData,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=="fail"){
                    alert(res.body.message)
                }else{
                    location.reload(true);
                }

            })
        },
        delyyUser:function(){
            this.$http.get(_pathApi+"/op/delete/yyUser.do?yyUserId="+this.clickID,{emulateJSON:true,credentials: true}).then(function(res){
                // console.log(res);
                location.reload(true);
            })
        },
        seach:function(page,pageSize){
           // console.log(pageSize)
            var deptId = $(".dept").val();
            var role = $(".role").val();
            var phone = $(".phone").val();
            this.$http.get(_pathApi+"/op/get/yyUserListManager.do?deptId="+deptId+"&phone="+phone+"&pageNum="+page+"&pageSize="+pageSize,{emulateJSON:true,credentials: true}).then(function(res){
                //console.log(res);
                this.divisionalTable=res.body.data;
                if(res.body.message){
                    this.all = 1;
                    this.listData = 0;
                    if(!res.data.massage){
                        this.all=eval('('+res.data.message+')').page;
                        this.listData = eval('('+res.data.message+')').count;
                    }
                }
            })
        },
        seachthis:function(){
            this.seach(1,10);
        }
    },
    created:function(){
        var obj={
            pageSize:'10'
        };
        this.seach(1,10);
        this.$http.get(_pathApi+"/op/get/deptListManager.do?&page=1&pageSize=10",{emulateJSON:true,credentials: true}).then(function(res){
            //获取部门列表
            this.deptList = res.body.data;
            //console.log(res)
        })

    }
})