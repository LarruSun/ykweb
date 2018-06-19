/**
 * Created by Administrator on 2018/1/27.
 */

new Vue({
    el: '#app',
    data: {
        cur: 1,//默认第一页
        all:'',//总页数
        msg:'',
        //初始页面的数据展示
        listData:'',//数据总条数
        listDataSon:'',//每页数据条数
        checked:false,
        data_all:[],
        levels: '',//级别
        status:'',//状态
        province:'',//省
        provinceSon:'',//市
        inputInquire:'',//input框
        record:'',//记录
        checkedSon_model:[],
        first:{},//数据临时存放
        dataId:[],//数据id
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
        submitData:{}
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
            this.getdataBypageId(obj)
            //  console.log(data)
        },
        signature:function(){      //判断是否选择了数据
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据")
                $(".signature").attr("data-target", "");
                return
            }else if(len==1){
                $(".signature").attr("data-target", "#myModal_signature");
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
        checkedF:function(e){   //全选
            if(e.target.checked){
                $(".clickSon").prop("checked",true);
                var allId=this.first
                for(var i=0;i<allId.length;i++){
                    this.dataId.push(allId[i].id)
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
                    _this.dataId.push($(this).val());
                }
            })
            if(this.dataId.length==this.listData.count){
                this.checked=true
            }else{
                this.checked=false
            }
        },
        submit:function(){   //详情提交按钮接收的数据返回给后台
            var submitDataF={
                signatureData:this.signatureLogo
            }
        },
        startUsing:function(){     //启用判断
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据")
                $(".startUsing").attr("data-target", "");
                return
            }else{
                $(".startUsing").attr("data-target", "#myModal_startUsing");
            }
        },
        startUsingSubmit:function(){       //启用提交
            var userId_str=this.dataId.join(",");
            //console.log(obj);
            this.$http.get(_pathApi+'/op/edit/stateOfCustomer.do?userId='+userId_str+'&isActive=1',{emulateJSON:true,credentials: true}).then(function(res) {
            })
            location.reload(true);
        },
        blockUp:function(){    //停用
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据")
                $(".blockUp").attr("data-target", "");
                return
            }else{
                $(".blockUp").attr("data-target", "#myModal_blockUp");
            }
        },
        blockUpSubmit:function(){//停用提交
            var userId_str=this.dataId.join(",");
            this.$http.get(_pathApi+'/op/edit/stateOfCustomer.do?userId='+userId_str+"&isActive=0",{emulateJSON:true,credentials: true}).then(function(res) {

            })
            location.reload(true);
        },
        inquire:function(){  //查询
            var inquireData={
                level:this.levels,
                isActive:this.status,
                addressProvince:this.province,
                addressCity:this.provinceSon,
                loginName:this.inputInquire,
            }
            this.getdataBypageId(inquireData);
        },
        getdataBypageId:function(obj){  //获取分页数据
            //console.log(obj);
            this.$http.post(_pathApi+'/op/get/userListManager.do',obj,{emulateJSON:true,credentials: true}).then(function(res){  //初始页面的数据展示
                this.first=res.data.data;
                this.all=eval('('+res.data.message+')').page;
                this.count = eval('('+res.data.message+')').count;
                if(!res.data.message){
                    this.all = 1;
                    this.count = 0;
                }
            });
        }
    },
    created:function() {
        var obj={
            pageSize:'10'
        };
        this.getdataBypageId(obj);

    }
});
