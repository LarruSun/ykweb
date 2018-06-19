/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el:'#main-container',
    data:{
        initData:{
            afterSaleType:"",//售后类型 "JUSTREFUND"仅退款"REFUNDANDGOODS";//退款退货
            afterSaleStatus:"",//售后状态
            /*  "applyStatus";//售后申请
             "auditStatus";//已审核
             "unrefundStatus";//待退款
             "refundOrder";//已退款
             "unauditStatus";//审核不通过
             "cancelSalStatus";//售后取消
             */

            payType:"",//付款方式
            orderNO:"",//原单编号
            afterNo:"",//售后编号
            refundResult:"",//退款原因
            userName:"",//买家
            foodList:[],
            operatines:"",
            payTotal:"",
            refundType:"",
        },
        zifundSum:0,
        refundSum:'',
        orderState:'',
        orderInfo:{},
        payObj:{},//用于存放退款信息的对象
        saleStatus:[
            {
                afterSaleStatus:'applyStatus',
                desc:'售后申请',
                isClass:''
            },
            {
                afterSaleStatus:'auditStatus',
                desc:'已审核',
                isClass:''
            },
            {
                afterSaleStatus:'refundOrder',
                desc:'已完成',
                isClass:''
            },
            {
                afterSaleStatus:'unauditStatus',
                desc:'审核不通过',
                isClass:''
            },
            {
                afterSaleStatus:'cancelSalStatus',
                desc:'售后取消',
                isClass:''
            }
        ]
    },
    methods:{
        getInitData:function(){
            var _this=this;
            var obj = {};
            let reg = `(^|&)orderId=([^&]*)(&|$)`
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.orderId = unescape(r[2]);
                this.orderId = obj.orderId;
            }
            //详情的查询
            this.$http.post(cyApi+'/open/get/getOrderById',obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='success'||res.data.type=='SUCCESS') {
                    console.log(res.data.data)
                    this.orderInfo = res.data.data;
                    this.foodList=res.body.data.sonOrder.prods;
                    this.initData.afterSaleType=res.body.data.afterSaleOrders[0].afterSaleType;
                    this.initData.afterSaleStatus=res.body.data.afterSaleOrders[0].afterSaleStatus;
                    this.initData.payType=res.body.data.orderInfo;
                    this.initData.orderNO=res.body.data.orderNO;
                    this.initData.refundResult=res.body.data.afterSaleOrders[0].refundResult;
                    this.initData.userName = res.body.data.userName;
                    this.initData.foodList=res.body.data.sonOrder.prods;
                    this.initData.afterNo=""     //   res.body.data.orderInfoVos[0].eqaulSeq;
                    this.initData.operatines=res.body.data.operatines;
                    this.initData.payTotal=res.body.data.operatines;
                    // console.log(this.orderInfo)
                    //this.initData.refundType=res.body.afterSaleOrders[0].refundType;
                    this.getSaleStatusToReturn();


                    //费用的处理
                    var payArr=this.orderInfo.orderInfoVos
                    var payObj={
                        payMoney:0,
                        isALL:true,
                        tkMoney:[],
                        tkMoneySum:0,
                    }
                    for(var i=0;i<payArr.length;i++){
                        if(payArr[i].state=='已支付'){
                            payObj.payMoney+=payArr[i].ammount;
                        }else{
                            payObj.tkMoney.push(payArr[i].ammount);
                            payObj.tkMoneySum+=payArr[i].ammount
                        }
                    }
                    if(payObj.tkMoneySum!=payObj.payMoney){
                        payObj.isALL=false;
                    }
                    this.payObj=payObj
                    console.log(this.payObj);
                    // console.log(this.saleStatus)
                }
                // console.log(this.initData)
            });
            //已支付骑手费用的查询
            this.$http.post(cyApi+'/open/get/getOrderById',{'orderId' : this.orderId},{emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    var orderInfo=res.body.data;
                    // console.log(orderInfo);
                    if(! orderInfo.summaryOrderTakeOut || ! orderInfo.summaryOrderTakeOut.deliverFee){
                        this.zifundSum=(0).toFixed(2)
                    }else{
                        this.zifundSum=(orderInfo.summaryOrderTakeOut.deliverFee * 0.01).toFixed(2)
                    }                    
                }
            });
        },
        getSaleStatusToReturn:function(){
             var isClass='active';
             for(var i=0;i<this.saleStatus.length;i++){
                 this.saleStatus[i].isClass=isClass;
                 if(this.saleStatus[i].afterSaleStatus==this.initData.afterSaleStatus){
                     this.saleStatus[i].isClass=isClass;
                     isClass='';
                 }
             }
            return this.saleStatus;
        },
        refuse:function(){
            //同意售后
            this.$http.post(cyApi+'/edit/updateAfterSaleStatus',{"orderId":this.orderInfo.id,"status":'refuse'},
                {emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    location.reload(true);
                }else{
                    alert(res.data.message);
                }
            });
        },
        acept:function(){
            if(this.refundSum==0){
                alertErrors('操作失败，请输入正确的金额');
                // alert('操作失败，请输入正确的金额');
                return;
            }
            // return;
            //同意售后
            // amount
            var obj={
                "orderId":this.orderInfo.id,
                "status":'acept',
                'amount':this.refundSum*100
            }
            console.log(obj);
            this.$http.post(cyApi+'/edit/updateAfterSaleStatus',obj,
                {emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    location.reload(true);
                }else{
                    alert(res.data.message);
                }
            });
        },
        refund:function(){
            //同意售后
            this.$http.post(cyApi+'/edit/updateAfterSaleStatus',{"orderId":this.orderInfo.id,"status":'refund'},
                {emulateJSON:true,credentials: true}).then(function(res){

                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    location.reload(true);
                }else{
                    alert(res.data.message);
                }
            });
        },
        printTest:function(){
            var printBody = document.getElementById("home");

            var printBodyHTML = printBody.innerHTML;
            var printBodyHTML = printBody.innerHTML;
            var bodyHTML=document.body.innerHTML;
            document.body.innerHTML = printBodyHTML;
            window.print();
            document.body.innerHTML = bodyHTML;
        }
    },
    created:function(){
       this.getInitData();
    },
    mounted:function(){

    },
    watch:{
        refundSum(newvalue,oldvalue){
            // console.log(newvalue);
            // console.log((this.orderInfo.afterSaleOrders[0].refundAmount*0.01).toFixed(2))
            newvalue=newvalue.toString()
            //大于零小于总金额且只能为两位小数点
            if (newvalue  > (this.orderInfo.afterSaleOrders[0].refundAmount*0.01) || newvalue < 0 || (newvalue.length - newvalue.indexOf('.')-1>2 && newvalue.indexOf('.')!=-1) ) {
                alertErrors('请输入正确的金额');
                // alert('请输入正确的金额')
                this.refundSum=oldvalue
            }
        }

    }

})