/**
 * Created by Administrator on 2018/1/27.
 */
new Vue({
    el: '#app',
    data: {
        //初始页面的数据展示
        checked:false,
        chec:false,
        first:{},//初始页面的数据临时存放点展示
        dataId:[],//数据id
        cur: 1,//默认第一页
        all:1,//总页数
        msg:'',//数据展示
        loginName:'',
        //详情弹框页面的数据展示
        signatureData:'',
        signatureLogo:'',
        Eqaccount:'',
        Fcity1:'',
        Fcity2:'',
        Fcity3:'',
        contacts:'',
        Benelux:'',
        BusinessLicenseNumber:'',
        BusinessLicenseNumberimg:'',
        legalPerson:'',
        IDcard:'',
        IDcardF:'',
        page:'',
        count:'',
        submitData:{}
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
                pageNum:data
            };
            this.findList(obj)
        },
        checkedF:function(e){       //全选
            if(e.target.checked){
                $(".clickSon").prop("checked",true);
                console.log(this.first)
                var allId=this.first;
                for(var i=0;i<allId.length;i++){
                    this.dataId.push(allId[i].id);
                    //console.log(this.dataId)
                }
            }else{
                $(".clickSon").prop("checked",false);
                this.dataId=[];
            }

        },
        checkedSon:function(e){            //子按钮的单一数据
            this.dataId=[];
            var _this=this;
            $(".clickSon").each(function(){
                if($(this).prop("checked")){
                    $(".editDeptName").attr("name",e.id);
                    $(".editDeptDesc").val(e.deptDesc);
                    $(".editDeptName").val(e.deptName);
                    _this.dataId.push($(this).val());
                }
            })
            console.log(this.dataId);
            if(this.dataId.length==this.count){
                this.checked=true
            }else{
                this.checked=false
            }
        },
        signature:function(){      //判断是否选择了数据(查看详情)
            var len=this.dataId.length;
            if(len<1){
                $(".signature").attr("data-target","")
                alert("请选择一条数据");
                return ;
            }else if(len==1){
                $(".signature").attr("data-target", "#myModal_signature2");
                //console.log(obj);
                this.$http.get(_pathApi+'/op/get/userInfoDetail.do?userId='+this.dataId,{emulateJSON:true,credentials: true}).then(function(res) {
                    if (res.body.status== 400) {
                        console.log("请求失败!")
                    } else {
                        console.log("请求成功!")
                        //详情弹框页面的数据展示
                        this.signatureData = res.body.data.nickName;
                        this.signatureLogo = res.body.data.businessLogo;
                        this.Eqaccount = res.body.data.loginName;
                        this.Fcity1 = res.body.data.addressProvince;
                        this.Fcity2 = res.body.data.addressCity;
                        this.Fcity3 = res.body.data.addressArea;
                        this.contacts = res.body.data.contactName;
                        this.Benelux = res.body.data.fullName;
                        this.BusinessLicenseNumber = res.body.data.businessLicenseNum;
                        this.BusinessLicenseNumberimg = res.body.data.businessLicenseScan;
                        this.legalPerson = res.body.data.legalPersonName;
                        this.IDcard = res.body.data.contactCardImgSrc;
                        this.IDcardF = res.body.data.contactBackCardImgSrc;

                    }
                })
            }else{
                alert("请单一数据操作")
                $(".signature").attr("data-target", "");
                return
            }
        },
        submit:function(){//详情提交按钮接收的数据返回给后台
            var submitDataF={
                signatureData:this.signatureLogo
            }
            //console.log(submitDataF)
        },
        seach:function(){
            var obj={
                loginName:$(".seach").val(),
                pageNum:1,
                pageSize:10
            }
            this.findList(obj);
        },
        findList:function(obj){
            //console.log(obj);
            this.$http.post(_pathApi+'/op/get/verifyUserListManager.do',obj,{emulateJSON:true,credentials: true}).then(function(res){//初始页面的数据展示
                var topdata_=res.body.data;
                this.first=topdata_;
                this.all=eval('('+res.data.message+')').page;
                this.count = eval('('+res.data.message+')').count;
                if(!res.data.message){
                    this.all = 1;
                    this.count = 0;
                }
            });
        },
        editThis:function(){
            var userState = 3;
            if($(".uncheck").prop("checked")){
                userState = 4;
                if(!$(".remark").val()||$(".remark").val().trim()==""){
                    alert("备注不能为空！");
                    return false;
                }
            }
            this.$http.get(_pathApi+'/op/edit/verifyUser.do?userId='+this.dataId+'&userState='+userState+'&remark='+$(".remark").val(),{emulateJSON:true,credentials: true}).then(function(res) {
                if (res.body.status== 400) {
                    console.log("请求失败!")
                } else {
                    if(res.body.true){
                        location.reload(true);
                    }else{
                        location.href="../../../opLogin.html"
                    }

                }
            })
        },
        loding:function(){
        }
    },
    created:function() {
        var obj={
            pageSize:'10'
        };
        this.findList(obj);
    }
});
