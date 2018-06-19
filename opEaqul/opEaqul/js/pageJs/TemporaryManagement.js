
new Vue({
    el: '#app',
    data: {
        checked:false,
        first:{},//初始页面的数据临时存放点展示
        dataId:[],//数据id
        cur: 1,//默认第一页
        all:'',//总页数
        msg:'',//数据展示
        province:'',//省
        provinceSon:'',//市
        district:'',//区
        inputInquire:'',//商家简称
        inputInquirePhone:'',//商家号码
        listData:'',//数据总条数
        approvalHistoryData:{}//
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
        },
        inquire:function(){
            var inquireData={
                addressProvince:this.province,
                addressCity:this.provinceSon,
                addressArea:this.district,
                loginName:this.inputInquire,
                contactPhone:this.inputInquirePhone
            }
            this.getdataBypageId(inquireData);
        },
        checkedF:function(e){       //全选
            if(e.target.checked){
                $(".clickSon").prop("checked",true);
                var allId=this.first;
                for(var i=0;i<allId.length;i++){
                    this.dataId.push(allId[i].id);
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
            if(this.dataId.length==this.listData){
                this.checked=true
            }else{
                this.checked=false
            }
        },
        CertificationImmediately:function(){//认证
            var len=this.dataId.length;
            if(len<1){
                alert("请选择一条数据");
                $(".CertificationImmediately").attr("data-target", "");
                return ;
            }else if(len==1){
                $(".CertificationImmediately").attr("data-target", "#myModal_CertificationImmediately");
            }else{
                alert("请选择单一数据操作");
                $(".CertificationImmediately").attr("data-target", "");
                return ;
            }
        },
        Commit:function(){//提交
            var data=this.getOtherDataById(this.dataId,this.first,{"userState":''});
            this.$http.get(_pathApi+'/op/edit/stateOfTemporaryCustomer.do?userId='+this.dataId+'&userState=3',{emulateJSON:true,credentials: true}).then(function(res) {
            });
            location.reload(true);
        },
        getOtherDataById:function(arr1,arr2,oobj){//查找其他数据通过相同的id     arr1:存放需要的id;  arr2:需要查找的数据源 ;  obj:存放查找的对应属性
            var len1=arr1.length;
            var len2=arr2.length;
            var returnArr=[];
            for(var i=0;i<len1;i++){
                var theId=arr1[i];
                for(var j=0;j<len2;j++){
                    if(theId==arr2[j].id){
                        var obj={};
                        obj.userId=theId;
                        for(var k in oobj){
                            obj[k]=arr2[j][k];
                        }
                        returnArr.push(obj);
                        continue ;
                    }
                }
            }
            return returnArr;
        },
        getdataBypageId:function(obj){
            this.$http.post(_pathApi+'/op/get/temporaryUserListManager.do',obj,{emulateJSON:true,credentials: true}).then(function(res){  //获取分页数据
                this.first=res.data.data;
                this.all=eval('('+res.data.message+')').page;
                this.listData = eval('('+res.data.message+')').count;
                if(!res.data.message){
                    this.all = 1;
                    this.listData = 0;
                }
            });
        },
        approvalHistory:function(e) {
            var present = $(e.target).parent().parent().find(".clickSon").val();
            //console.log(present)
            $(".approvalHistory").attr("data-target", "#myModal_myModal_approvalHhistory");
            this.$http.get(_pathApi + '/op/get/showLogList.do?userId=' + present, {emulateJSON: true,credentials: true}).then(function (res) {//初始页面的数据展示
                this.approvalHistoryData = res.data.data;
                //console.log(res)
            })
        }
    },
    created:function() {
        var obj={
            pageSize:'10'
        };
        this.getdataBypageId(obj);
    }
})