/**
 * Created by Administrator on 2018/4/10.
 */


new Vue({
    el: "#app",
    data: {
        foodList:[],
        orderInfo:{
            sonOrder:{
                currentOrderNum:"",

            },
            orderNO:"",
            afterSaleOrders:[
                [
                    {cancelResult:''}
                ]
            ],

        },
        orderStatus:{
            'NONPAYMENT':'待支付',
            'ALREADYPAIDSTATUS':'已支付',
            'NONRECEIVEORDER':'待接单',
            'NONSENDGOODS':'待发货',
            'SENDGOODS':'已发货',
            'HASDONE':'已完成',
            'HASCLOSED':'已关闭',
            "TEMPORARY":'暂态',
            "CANCEL": '已取消',
            "REFUSE": '已拒绝'
        },
        afterStatus:{
            'applyStatus':'申请售后',
            'auditStatus':'已审核',
            'unrefundStatus':'待退款',
            'unauditStatus':'审核不通过',
            'cancelSalStatus':'售后取消',
            'refundOrder':'已退款',
        },
        orderId: 'db522c0284f84e5b8ec2b258e40665f5',
        tuikuanTime:0,
        times:'0分 0秒',
        showModal: false,
        amount: '',
        surcharge: [],
        discountInfo: {},
        takeOutType: ''
    },
    methods:{
        getOrderInfo:function(){
            alertLoading("加载中...",30000);
            this.$http.post(cyApi+'/open/get/getOrderById',{
                orderId: this.orderId
            },{emulateJSON:true,credentials: true}).then(function(res){
                alertHide();
                if(res.body.type=='SUCCESS' || res.body.type=='success'){
                    this.orderInfo=res.body.data;
                    this.foodList=res.body.data.sonOrder.prods;
                    this.tuikuanTime=res.body.data.afterSaleOrders[0].afterSaleDate;
                    this.shopId = res.body.data.merchantId;
                    this.setTime();
                    this.getDispatch();
                    if (res.body.data.sonOrder.surcharge){
                        this.surcharge = JSON.parse(res.body.data.sonOrder.surcharge);
                    }
                    if (res.body.data.summaryOrderDiscounts.length > 0){
                        this.discountInfo = res.body.data.summaryOrderDiscounts[0];
                    }
                }
            });
        },
        refuse:function(){
            //拒绝售后
            var obj = {
                orderId: this.orderId,
                status: 'refuse'
            };
            this.$http.post(cyApi+'/open/edit/updateAfterSaleStatusFromPhone',obj,
                {emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    alertSuccess("已拒绝售后");
                    this.getOrderInfo();
                }else{
                    alertErrors(res.body.message);
                }
            });
        },
        acept:function(){
            //同意售后
            if (parseFloat(this.amount * 100) > this.orderInfo.payTotal) {
                alertErrors("金额不能大于订单金额");
                return
            }else if(this.amount <= 0){
                alertErrors("请输入正确的金额");
                return
            }
            let obj = {
                orderId: this.orderId,
                amount: (this.amount * 100).toFixed(0),
                status: 'acept'
            };
            this.$http.post(cyApi+'/open/edit/updateAfterSaleStatusFromPhone',obj,
                {emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    alertSuccess("已同意售后");
                    this.showModal = false;
                    this.getOrderInfo();
                }else{
                    alertErrors(res.body.message);
                }
            });
        },
        getDispatch() {
            this.$http.post(cyApi + '/open/get/getWMTakeout',{shopId: this.shopId},{emulateJSON:true,credentials: true}).then(res => {
                if (res.data.type == 'success'){
                    if (this.orderInfo.summaryOrderTakeOut.takeout_type) {
                        this.takeOutType = res.data.data.EnumTakeOut[this.orderInfo.summaryOrderTakeOut.takeout_type];
                        console.log(this.takeOutType)
                    }
                }
            });
        },
        setTime:function(){
            var that=this;
            setInterval(function(){
                that.times=that.formTime(new Date().getTime()-that.tuikuanTime);
                console.log(that.times);
            },1000)
        },
        formTime:function(val){
            var date3=val  //时间差的毫秒数
            //计算出相差天数
            var days=Math.floor(date3/(24*3600*1000))
            //计算出小时数
            var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000))
            //计算相差分钟数
            var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000))
            //计算相差秒数
            var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
            var seconds=Math.round(leave3/1000)
            //console.log(" 相差 "+days+"天 "+hours+"时 "+minutes+"分 "+seconds+"秒 ")
            var result="";
            if(days!=0){
                result+=days+"天 "
            }
            if(hours!=0){
                result+=hours+"时 "
            }
            result+=minutes+"分 "+seconds+"秒 "
            return result;
        },
    },
    filters:{
        price:function (val) {
            return (new Number(val)).toFixed(2);
        }
    },
    watch:{

    },
    created:function() {
        let param = window.location.search;
        if (param.indexOf('orderId') >= 0) {
            this.orderId = param.split("=")[1];
            this.getOrderInfo();
        }else {
            alertErrors("找不到订单");
        }
    }
});