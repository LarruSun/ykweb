/**
 * Created by xuwei on 2018/4/10.
 */
new Vue({
    el: "#orderDetailBody",
    data: {
        orderId: '',
        data: {},
        list: [],
        eaqulSeq: '',
        sum: 0,
        orderStatus: 1,
        refundSum: '',
        // zifundSum:'',//支付骑手的配送费
        refundData: [],
        items:[{
            title:'开单',description:'',status:'finish'
        },{
            title:'待付款',description:'',status:''
        },{
            title:'完成',description:'',status:''
        }]
    },
    methods:{
        getDetail() {
            //详情的查询
            this.$http.post(cyApi + '/getTSOrderById',{'orderId' : this.orderId},{emulateJSON:true,credentials: true}).then(res => {
                if(res.data.type == 'success') {
                    this.data = res.data.data;
                    this.list = res.data.data.sonOrder.prods;
                    this.refundSum=(this.data.payTotal * 0.01).toFixed(2)
                    // console.log(this.data);
                    if(res.data.data.orderInfoVos.length > 0){
                        this.eaqulSeq = res.data.data.orderInfoVos[0].eaqulSeq;
                    }
                    let sum = 0;
                    this.list.forEach((item) => {
                        sum += item.prodAllPrice;
                    });
                    this.sum = sum;
                    let orderStatus = {
                        'NONPAYMENT':2,
                        'HASDONE':3
                    };
                    this.orderStatus = orderStatus[res.data.data.status] || 1;
                    this.refundData = res.data.data.afterSaleOrders;
                    this.items[0].description = this.formartDate(res.data.data.createDate);
                    if(res.data.data.payDate){
                        this.items[1].description = this.formartDate(res.data.data.payDate);
                        this.items[2].description = this.formartDate(res.data.data.payDate);
                        this.items[1].status = 'finish';
                        this.items[2].status = 'finish';
                    }
                }
            });
            //已支付骑手费用的查询
            // this.$http.post(cyApi+'/open/get/getOrderById',{'orderId' : this.orderId},{emulateJSON:true,credentials: true}).then(function(res){
            //     if(res.body.type=='SUCCESS'||res.body.type=='success'){
            //         var orderInfo=res.body.data;
            //         // console.log(orderInfo);
            //         if(! orderInfo.summaryOrderTakeOut || ! orderInfo.summaryOrderTakeOut.summaryOrderTakeOut){
            //             this.zifundSum=(0).toFixed(2)
            //         }else{
            //             this.zifundSum=(orderInfo.summaryOrderTakeOut.summaryOrderTakeOut * 0.01).toFixed(2)
            //         }
                  
            //     }
            // });
        },
        formartDate(param) {
            let date = new Date(param);
            Y = date.getFullYear() + '-';
            M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
            D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        refund() {
            if(this.refundSum==0){
                alertErrors('操作失败，请输入正确的金额');
                return;
            }
            this.$http.post(cyApi + '/tuiKuanTSOrder',{orderId: this.orderId, amount: parseInt(this.refundSum * 100)},{emulateJSON:true,credentials: true}).then(res => {
                if (res.data.type == 'success'){
                    alertSuccess(res.data.message);
                    $('#myModal').modal('hide');
                    this.getDetail();
                }else {
                    alertErrors(res.data.message);
                }
            })
        }
    },
    filters: {
    },
    created:function() {
        let param = window.location.search;
        if (param.indexOf('orderId') >= 0) {
            let data = param.split("&")[1];
            this.orderId  = data.split("=")[1];
            this.getDetail();
        }
    },
    mounted:function(){
    },
    watch:{
        refundSum(newvalue,oldvalue){
            newvalue=newvalue.toString()
            //大于零小于总金额且只能为两位小数点
            if (newvalue * 100 > this.data.payTotal || newvalue * 100 < 0 || (newvalue.length - newvalue.indexOf('.')-1>2 && newvalue.indexOf('.')!=-1) ) {
                alertErrors('请输入正确的金额');
                this.refundSum=oldvalue
            }
        }
    }
});