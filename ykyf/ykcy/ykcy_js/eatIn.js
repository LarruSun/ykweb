/**
 * Created by xuwei on 2018/4/10.
 */
new Vue({
    el: "#main-container",
    data: {
        cur: 1,//默认第一页
        all:1,//总页数
        orderList:[],
        countInfo:{},
        shopId:'',
        param: {
            startTime: '',
            endTime: '',
            status: 'all',
            orderNo: '',
            payType: '',
            type: ''
        },
        list: [],
        countInfo: {},
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        listen: function (val) {  //分页
            this.cur = val;
            this.getList();
        },
        changRed:function(val){
            this.param.status = val;
            this.cur = 1;
            this.getList('1');
        },
        getList(val){
            if (new Date(this.param.endTime).getTime() < new Date(this.param.startTime).getTime()) {
                alertErrors('时间错误');
                return
            }
            console.log(this.cur);
            this.$http.post(cyApi + '/getTSListOrder',{
                page: this.cur,
                pageSize: 10,
                startTime: this.param.startTime,
                endTime: this.param.endTime,
                orderStatus: this.param.status,
                orderType: this.param.type,
                orderNo: this.param.orderNo,
                payType: this.param.payType,
                shopId: this.shopId
            },{emulateJSON:true,credentials: true}).then(res => {
                if (res.data.type == 'success') {
                    console.log(res);
                    this.list = res.data.data.orderList;
                    this.all = res.data.data.pageCount;
                    if (val != '1') {
                        this.countInfo = res.data.data.query;
                    }
                }
            });
        },
    },
    filters: {
        formartTime(param) {
            let date = new Date(param);
            Y = date.getFullYear() + '-';
            M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
            D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        orderStatus(param) {
            let statusList = {
                "NONPAYMENT" : '待付款',
                "NONRECEIVEORDER" : '待接单',
                "HASDONE" : '已完成',
                "HASCLOSED" : '已关闭',
                "CANCEL" : '已取消'
            };
            return statusList[param]
        },
        orderType(param) {
            let statusList = {
                "TSBUFFER" : '堂食扫码',
                "TSORDER" : '堂食点餐',
                "TSAPPOINTMENT" : '堂食预约'
            };
            return statusList[param]
        }
    },
    created:function() {
        function formartDate(param) {
            let date = new Date(param);
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return Y + M + D;
        }
        this.param.startTime = formartDate(new Date().getTime());
        this.param.endTime = formartDate(new Date().getTime());
        let param = window.location.search;
        if (param.indexOf('shopId') >= 0) {
            this.shopId = param.split("=")[1];
            this.getList();
        }
    },
    mounted:function(){
    },
    watch:{
        startTime() {
        }
    }
});