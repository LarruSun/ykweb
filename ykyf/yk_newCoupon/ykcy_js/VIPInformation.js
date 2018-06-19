/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#VIPInformation",
    data: {
       orderData:[],
       cardNo:'',
       id:'',
    //    编辑基本信息的数据
       editData:{
            'id':'',
            'sex':'男',
            'birthday':'',
            'remark':''
       },
    // 积分操作的数据
        integralData:{
            'customerId':'',
            'total':'',
            'remark':''
        },
        //积分操作判断是赠送还是扣除得变量
        isGive:true,
    },
  
    methods:{
        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
        },
        // 点击修改按钮
        edit(){
            this.editData.id=this.id;
            this.editData.sex=this.orderData.sex;
            this.editData.birthday=this.orderData.birthday;
            this.editData.remark=this.orderData.remark;
            // console.log(123)
        },
        
        //确认修改信息
        editSave(){
            this.$http.post(vipApi+'/upCustomerBasicInformation',this.editData,{emulateJSON:true,credentials: true}).then(function(res){
                // console.log(res)
                if(res.data.type=='success' || res.data.type=='SUCCESS'){
                    alertSuccess('操作成功',1000);
                    setTimeout(()=>{javascript :history.back(-1)},500)
                    // location.reload(true);
                }else{
                    alertErrors(res.data.message);
                }
            });
    
        },
        //确认修改积分
        editIntegral(){
            console.log(this.isGive);
            this.integralData.customerId=this.id;
            if(this.isGive != true){
                this.integralData.total=(this.integralData.total)*(-1)
            }
            this.$http.post(vipApi+'/operationIntegral',this.integralData,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=='success' || res.data.type=='SUCCESS'){
                    alertSuccess('操作成功',1000);
                    setTimeout(()=>{javascript :history.back(-1)},500)
                    // location.reload(true);
                }else{
                    alertErrors(res.data.message);
                    // this.addData.minConsumeAmount=this.addData.minConsumeAmount*0.01;
                }
    
            });

        }

    },
    components: {   //分页
    },
    filters: {
    },
    watch:{
        
    },
    created:function() {
        
        
        // this.id=this.getUrlParam('id');
        this.cardNo=this.getUrlParam('cardNO');
        // console.log(this.cardNO);
        var obj = {
            cardNo:this.cardNo
        };
        this.$http.post(vipApi+'/getCustomerIdByCardNo',obj,{emulateJSON:true,credentials: true}).then(function(res){
            // console.log(res)
            if(res.data.type=='success' || res.data.type=='SUCCESS'){
                this.id=res.data.data;
                this.$http.post(vipApi+'/getMemberCustomerById',{id:this.id},{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res)
                    if(res.data.type=='success' || res.data.type=='SUCCESS'){
                        var data=res.data.data;
                        this.orderData=data;
                        console.log(this.orderData)
                    }else{
                        alertErrors(res.data.message);
                    }
        
                });



            }else{
                alertErrors(res.data.message);
            }

        });

    }
});