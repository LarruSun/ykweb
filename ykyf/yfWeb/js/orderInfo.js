/**
 * Created by zyj on 2018/3/13/013.
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
            'refundOrder':'已退款'
        },
        orderId: '',
        showModal: false,
        isShowModal: false,
        isShowRefundModal: false,
        shopId: '',
        takeOut: '',
        surcharge: [],
        discountInfo: {},
        amount: '',
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
                    this.shopId = res.body.data.merchantId;
                    this.takeOut = res.body.data.summaryOrderTakeOut.takeout_type;
                    this.defaultTakeOut = res.body.data.summaryOrderTakeOut.takeout_type;
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
        returnOrder:function(){
            var obj = {};
            let reg = `(^|&)orderId=([^&]*)(&|$)`;
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.orderId = unescape(r[2]);
            }
            this.$http.post(cyApi+'/open/update/refuseUpdateWmOrderStatus',obj,
                {emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='SUCCESS' || res.body.type=='success'){
                    alertSuccess("操作成功");
                    location.reload();
                }else{
                    alertErrors(res.body.message);
                }
            });
        },
        changeTakeOut(){
            let obj = {
                orderId : this.orderId,
                takeout_type: this.takeOut
            };
            if (this.defaultTakeOut == this.takeOut) {
                this.hideModal();
                return;
            }
            this.$http.post(base + '/api/web/wechatWeb/open/edit/changeTakeOut',obj,{emulateJSON:true,credentials: true}).then(res => {
                if(res.body.type=='SUCCESS' || res.body.type=='success'){
                    alertSuccess("操作成功");
                    location.reload();
                }else{
                    alertErrors(res.body.message);
                }
            })
        },
        accept:function(){
            var obj = {};
            let reg = `(^|&)orderId=([^&]*)(&|$)`
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.orderId = unescape(r[2]);
            }
            this.$http.post(cyApi+'/open/edit/wmOrderStatus',obj,
                {emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='SUCCESS' || res.body.type=='success'){
                    alertSuccess(res.body.message);
                    location.reload();
                }else{
                    alertErrors(res.body.message);
                }
            });
        },
        acept:function(){
            this.$http.post(cyApi+'/open/update/refuseUpdateWmOrderStatus',{
                orderId: this.orderId
            },{emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='SUCCESS' || res.body.type=='success'){
                    alertSuccess("退款成功");
                    this.getOrderInfo();
                    this.hideModal();
                }else{
                    alertErrors(res.body.message);
                }
            });
        },
        changeDispatch() {
            this.showModal = true;
            this.isShowModal = true;
        },
        hideModal() {
            this.showModal = false;
            this.isShowModal = false;
            this.isShowRefundModal = false;
        },
        getDispatch() {
          this.$http.post(cyApi + '/open/get/getWMTakeout',{shopId: this.shopId},{emulateJSON:true,credentials: true}).then(res => {
              if (res.data.type == 'success'){
                this.dispatchList = res.data.data.EnumTakeOut;
                if (this.orderInfo.summaryOrderTakeOut.takeout_type) {
                    this.takeOutType = res.data.data.EnumTakeOut[this.orderInfo.summaryOrderTakeOut.takeout_type];
                }
              }
          });
        },
        showRefundModal() {
            this.isShowRefundModal = true;
            this.showModal = true;
        }
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