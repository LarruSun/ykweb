/**
 * Created by zyj on 2018/3/13/013.
 */

new Vue({
    el: "#app",
    data: {
        orderStatus:{
            '' : '全部',
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
        takeoutStatus: {
            '' : '全部',
            "DAIJIEDAN": "待接单",
            "DAIQUHUO": "待取货",
            "PEISONGZHONG": "配送中",
            "YISONGDA": "已送达",
            "YIQUXIAO": "已取消",
            "YICHANG": "异常",
            "YIGUOQI": "已过期"
        },
        shopId:location.href.split("=")[1],// || 'f592e263d6b640f1bfc792f8a2738790',
        orderList:[],
        loadContent: '点击加载更多',
        page: 1,
        pageSize: 15,
        pageCount: '',
        startTime: '',
        endTime: '',
        orderType: '',
        takeoutType: ''
    },
    methods:{
        touchStart(event){
            if (this.page == this.pageCount) {
                return
            }
            this.page = this.page + 1;
            this.getListOrder();
        },
        filterList() {
            this.page = 1;
            this.orderList = [],
            this.getListOrder();
        },
        goInfo(id) {
            location.href = 'orderInfo.html?orderId=' + id
        },
        getPageData:function(){
            if(this.shopId==null || this.shopId=="" || this.shopId==undefined){
                alert("请先绑定提醒设置...");
                return false;
            }
            this.getListOrder();
        },
        getListOrder:function(){
            let data = {
                page: this.page,
                pageSize: this.pageSize,
                shopId: this.shopId,
                orderType: "WMCATERING",
                takeoutStatus: this.takeoutType,
                orderStatus: this.orderType,
                startTime: this.formartTime(this.startTime),
                endTime: this.formartTime(this.endTime)
            };
            this.loadContent = '加载中';
            this.$http.post(base+'/api/web/wechatWeb/open/get/getListOrder',data,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    this.orderList= [...this.orderList,...res.data.data.orderList];
                    this.pageCount = res.data.data.allPage;
                    if (this.page == this.pageCount || this.pageCount == 0) {
                        this.loadContent = '加载完毕';
                    }else {
                        this.loadContent = '点击加载更多';
                    }
                }
            });
        },
        formartTime(val) {
            if (!val) {
                return ''
            }
            let date = new Date(val);
            Y = date.getFullYear() + '-';
            M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
            D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return Y + M + D;
        }
    },
    filters:{
        price:function (val) {
            return (new Number(val)).toFixed(2);
        },
        getTakeoutStatus(val) {
            let takeoutStatus = {
                "DAIJIEDAN": "待接单",
                "DAIQUHUO": "待取货",
                "PEISONGZHONG": "配送中",
                "YISONGDA": "已送达",
                "YIQUXIAO": "已取消",
                "YICHANG": "异常",
                "YIGUOQI": "已过期"
             };
            return takeoutStatus[val]
        },
        getStatus(val) {
            let orderStatus = {
                'NONPAYMENT':'待支付',
                'ALREADYPAIDSTATUS':'已支付',
                'NONRECEIVEORDER':'待接单',
                'NONSENDGOODS':'待发货',
                'SENDGOODS':'已发货',
                'HASDONE':'已完成',
                'HASCLOSED':'已关闭',
                "CANCEL":'已取消',
                "REFUSE":'已拒绝'
            };
            return orderStatus[val]
        },
        formartTime(val) {
            let date = new Date(val);
            Y = date.getFullYear() + '-';
            M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
            D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            m = date.getMinutes()  < 10 ? '0' + date.getMinutes() : date.getMinutes();
            return Y + M + D + h + m;
        }
    },
    created:function() {
        this.getPageData();
    }
});