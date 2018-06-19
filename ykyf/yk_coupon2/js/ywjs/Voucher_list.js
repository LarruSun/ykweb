new Vue({
    el: '#main-container',
    data: {
        cur: 1,//默认第一页
        all:1,//总页数
        countInfo: "",//商家信息
        couponsList: [],
        couponsInfo: "",
        bamount:"",
        couponsId:""
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods: {
        listen: function (data) {  //分页
            this.cur = data;
            this.getCouponsList("",data,10);
        },
        getCountInfo: function () {  //获取自动充值信息
            var obj = {};
            var status = $("select[name='sample-table-2_length']").find("option:selected").val();
            if (status != "") {
                obj.status = status;
            }
            obj.couponsName = $("#couponsName").val();
            this.$http.post(webApi + "/coupon/get/getCountInfo", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    this.countInfo = res.body.data;
                } else {
                    alertErrors("有效期状态获取失败");
                }
            })
        },
        copyCoupons:function(id){
            var obj = {};
            obj.couponId=id;
            obj.couponsName=$("#newCouponsName").val();
            obj.startDate=$("#newStartDate").val();
            obj.endDate=$("#newEndDate").val();
            this.$http.post(webApi + "/coupon/add/copyCoupon", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    alertSuccess("复制优惠券成功");
                } else {
                    alertErrors("复制优惠券失败");
                }
                location.reload();
            })
        },
        loseEfficacy: function (id) {
            var obj = {};
            obj.couponId = id;
            this.$http.post(webApi + "/coupon/edit/loseEfficacy", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    alertSuccess("优惠券失效成功");
                } else {
                    alertErrors("优惠券失效失败");
                }
                location.reload();
            })

        },
        getCoupons: function (id) {  //获取自动充值信息
            var obj = {};
            obj.couponsId = id;
            this.$http.post(webApi + "/coupon/get/getCouponsById", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    this.couponsInfo = res.body.data;
                } else {
                    alertErrors("优惠券信息获取失败");
                }
            })
        },
        changeCount: function (id) {
            var obj = {};
            obj.id = id;
            var changeType = $('input:radio[name="form-field-radio-changeCount"]:checked').val();
            obj.type=changeType;
            var count = $("#numchangeNum").val();
            obj.count=count;
            var last = this.couponsInfo.countNum-this.couponsInfo.receiveNum;
            if(changeType==1 && last-count <1){
                alertErrors("库存不能少于1");
                return;
            }

            this.$http.post(webApi + "/coupon/edit/changeCount", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    alertSuccess("券量修改成功");
                } else {
                    alertErrors("券量修改失败");
                }
                location.reload();
            })

        },
        getBamount:function(id){
            this.couponsId=id;
            this.getCoupons(id);
            this.$http.post(webApi + "/open/user/get/getAccount", {}, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    this.bamount=res.data.data.bAmount.toFixed(2);
                } else {
                    alertErrors("获取余额失败");
                }
            })
        },
        publishOk:function(){
            var money = $("#publishMoney").val();
            var count = $("#publishCount").val();
            var publishBudget = (money * count).toFixed(2);

            var bamount = $("#bamount").html();
            bamount = bamount.replace(/,/g,"");//g 的意义是：执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
            bamount = new Number(bamount)
            if(bamount<publishBudget){
                alertErrors("您得余额不足，请充值");
                return;
            }
            var money = $("#publishMoney").val();
            var count = $("#publishCount").val();
            var publishcountLast =  this.couponsInfo.countNum-this.couponsInfo.receiveNum;
            if(Number(count) > Number(publishcountLast)){
                alertErrors("推广数量不能超出限制"+publishcountLast+"张");
                return;
            }
            var publishType =  $('input:radio[name="form-field-radio11"]:checked').val();
            var recommendedLanguage = $("#recommendedLanguage").val();
            var data={};
            data.id= this.couponsId;
            data.money=money;
            data.count=count;
            data.publishType=publishType;
            data.recommendedLanguage=recommendedLanguage;
            data.password="123456";
            this.$http.post(webApi + "/coupon/edit/publishOk", data, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    alertSuccess("推广成功");
                    location.reload();
                } else {
                    alertErrors("推广失败");
                }
            })
        },
        stopPublish:function(id){
            var obj={};
            obj.id=id;
            obj.password="123456";
            this.$http.post(webApi + "/coupon/edit/stopPublish", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success'||res.data.type == 'SUCCESS') {
                    alertSuccess("停止推广成功");
                    location.reload();
                } else {
                    alertErrors("停止推广失败");
                }
            })
        },
        getCouponsList: function (validStatus, page, pageSize) {  //获取自动充值信息
            var obj = {};
            var status = $("select[name='sample-table-2_length']").find("option:selected").val();
            if (status != "") {
                obj.status = status;
            }
            if (validStatus != null && validStatus != undefined) {
                obj.validStatus = validStatus;
            }else{
                obj.validStatus = $(".red").attr("value");
            }
            if (pageSize == undefined) {
                pageSize = 10;
            }
            if (page == undefined) {
                page = 1;
            }
            obj.page = page;
            obj.pageSize = pageSize;
            obj.couponsName = $("#couponsName").val();
            this.$http.post(webApi + "/coupon/get/getCouponsList", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    this.couponsList = res.data.data.list;
                    if(res.body.data.pageAll==0||res.body.data.pageAll==undefined){
                        this.all=1;
                    }else{
                        this.all = res.body.data.pageAll;
                    }
                } else {
                    alertErrors("优惠券列表获取失败");
                }
            })
        },
        getPageInfo: function () {
            this.getCountInfo();
            this.getCouponsList();
        }

    },
    created: function () {
        this.getPageInfo();
    },
    mounted: function () {
        //日期
        $(".form_datetime").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            showMeridian: true,
            pickerPosition: "bottom-left",
            language: 'zh-CN',//中文，需要引用zh-CN.js包
            startView: 2,//月视图
            minView: 2,//日期时间选择器所能够提供的最精确的时间选择视图
            today: "今天",
        });

    },
})