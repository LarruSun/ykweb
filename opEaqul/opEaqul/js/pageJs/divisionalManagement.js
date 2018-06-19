/**
 * Created by Administrator on 2018/1/27.
 */

new Vue({
    el:'#App',
    data:{
        checked:false,
        cur: 1,//默认第一页
        all:'',//总页数
        msg:'',//数据展示
        divisionalTable:'',//初始页面的数据临时存放点展示
        dataId:[],//数据id
        listData:"",
        page:'',
        count:'',
        chec:false,
        deptNum:0,
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
            var obj={
                pageSize:10,
                pageNum:data
            }
            this.seach(data,10)
        },
        signature:function(){//判断是否选择了数据
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据");
                 $(".signature").attr("data-target","")
                return ;
            }else if(len==1){
                $(".signature").attr("data-target","#myModal_divisionalManagementEdit")
            }else{
                alert("请选择单一数据操作");
                $(".signature").attr("data-target","")
                return ;
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
//            checkedF:function(e){       //全选
//                // console.log(e.target.checked);
//                if(e.target.checked){
//                    $(".clickSon").prop("checked",true);
//                    var allId=this.divisionalTable;
//                    for(var i=0;i<allId.length;i++){
//                        this.dataId.push(allId[i].id);
//                    }
//                }else{
//                    $(".clickSon").prop("checked",false);
//                    this.dataId=[];
//                }
//            },
        sonlist:function(e){
            this.dataId=[];
            var _this=this;
            $(".clickSon").each(function(){
                if($(this).prop("checked")){
                    _this.dataId.push($(this).val());
                    _this.clickID=e.id;
                    _this.deptNum = e.yyUsersNumber;
                    $(".editDeptName").attr("name",e.id);
                    $(".editDeptDesc").val(e.deptDesc);
                    $(".editDeptName").val(e.deptName);
                    //console.log(_this.deptNum)
                }
            })
            //console.log(this.dataId);
            if(this.dataId.length==this.listData){
                this.checked=true
            }else{
                this.checked=false
            }

        },
        edita:function(){//编辑
            var editData={
                deptId:$(".editDeptName").attr("name"),
                deptName:$(".editDeptName").val(),
                deptDesc:$(".editDeptDesc").val()
            };
            this.$http.post(_pathApi+"/op/edit/dept.do",editData,{emulateJSON:true,credentials: true}).then(function(res){
                location.reload(true);
            })
        },
        addDept:function(){//新增
            var addData={
                deptName:$(".addDeptName").val(),
                deptDesc:$(".addDeptDesc").val()
            };
            this.$http.post(_pathApi+"/op/add/dept.do",addData,{emulateJSON:true,credentials: true}).then(function(res){
                location.reload(true);
            })
        },
        del:function(){//判断是否选择了数据   （删除按钮）
            var len=this.dataId.length;
            if(len<1){
                // alert("请选择一条数据");
                $(".del").attr("data-target","#myModal_dataSelection")
                return ;
            }else if(len>1){
                alert("请选择单一数据操作");
            }else if(this.deptNum>0){
                $(".del").attr("data-target","#myModal_yyUser")
            }else if(len==1){
                $(".del").attr("data-target","#myModal_divisionalManagementDele")
            }
            //console.log(this.deptNum)
        },
        delDept:function(){
            this.$http.get(_pathApi+"/op/delete/dept.do?deptId="+this.clickID,{emulateJSON:true,credentials: true}).then(function(res){
                // console.log(res);
                location.reload(true);
            })
        },
        seach:function(page,pageSize){
            var deptName = $(".seach").val();
            var obj={
                deptName:deptName,
                pageNum:page,
                pageSize:pageSize
            }
            this.$http.post(_pathApi+"/op/get/deptListManager.do",obj,{emulateJSON:true,credentials: true}).then(function(res){
                this.divisionalTable=res.body.data;
                this.all=eval('('+res.data.message+')').page;
                this.listData = eval('('+res.data.message+')').count;
                if(!res.data.message){
                    this.all = 1;
                    this.listData = 0;
                }
                //console.log(this.divisionalTable)
            })
        },
        seachthis:function(){
            this.seach(1,10);
        }
    },
    created:function(){
        this.seach(1,10);
    }
})
