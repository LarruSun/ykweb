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
        listSurcharge:[
            [
                {
                    surchargeName:'',
                    total:'',
                }
            ]
        ],
        orderStatus:{
            'NONPAYMENT':'待支付',
            'ALREADYPAIDSTATUS':'已支付',
            'NONRECEIVEORDER':'待接单',
            'NONSENDGOODS':'待发货',
            'SENDGOODS':'已发货',
            'HASDONE':'已完成',
            'HASCLOSED':'已关闭'
        },
        afterStatus:{
            'applyStatus':'申请售后',
            'auditStatus':'已审核',
            'unrefundStatus':'待退款',
            'unauditStatus':'审核不通过',
            'cancelSalStatus':'售后取消',
            'refundOrder':'已退款',
        },
    },
    methods:{
        getOrderInfo:function(){
            var obj = {};
            let reg = `(^|&)orderId=([^&]*)(&|$)`
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.orderId = unescape(r[2]);
            }
            alertLoading("加载中...",30000);
            this.$http.post(cyApi+'/open/get/getOrderById',obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='SUCCESS' || res.body.type=='success'){
                    this.orderInfo=res.body.data;
                    this.foodList=res.body.data.sonOrder.prods;
                    this.listSurcharge=JSON.parse(res.body.data.sonOrder.surcharge);
                }
                alertHide();
            });
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
        this.getOrderInfo();
    }
});