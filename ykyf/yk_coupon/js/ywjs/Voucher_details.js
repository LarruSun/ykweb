new Vue({
    el: '#main-container',
    data: {
        couponsInfo: "",//商家信息
        shopList: [],
        user:"",
    },
    methods: {
        getUserInfo: function () {  //获取自动充值信息
            this.$http.post(webApi + "/open/index/get/getLoginUser", {}, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success') {
                    this.user = res.body.data;
                } else {
                    alertErrors("商家信息获取失败");
                }
            })
        },
        getShopList: function (shops) {
            var obj = {};
            obj.shops = shops;
            this.$http.post(webApi + "/main/get/getShopListByIds", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success' || res.body.type == 'SUCCESS') {
                    this.shopList = res.body.data;
                } else {
                    alertErrors("门店信息获取失败");
                }
            })

        },
        getCoupons: function () {  //获取自动充值信息
            var obj = {};
            let reg = `(^|&)couponsId=([^&]*)(&|$)`
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.couponsId = unescape(r[2]);
            }
            this.$http.post(webApi + "/coupon/get/getCouponsById", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success') {
                    this.couponsInfo = res.body.data;
                    var physicalStores = res.body.data.physicalStore;
                    var physicalStore = physicalStores.split(",");
                    var shops="(";
                    for(var i=0;i<physicalStore.length;i++){
                        if(i<physicalStore.length-1){
                            shops = shops+"'"+physicalStore[i]+"',";
                        }else{
                            shops = shops+"'"+physicalStore[i]+"'";
                        }
                    }
                    shops=shops+")";
                    this.getShopList(shops);
                } else {
                    alertErrors("优惠券信息获取失败");
                }
            })
        },
        changeCount: function (e) {
            $(e.target).attr("data-dismiss","modal");
            $("#changenumremark").html("");
            var obj = {};
            obj.id = this.couponsInfo.id;
            var changeType = $('input:radio[name="form-field-radio-count"]:checked').val();
            obj.type=changeType;
            var count = $("#changenum").val();
            obj.count= count;
            var last = this.couponsInfo.countNum-this.couponsInfo.receiveNum;
            if(changeType==1 && last-count <1){
                $("#changenumremark").html("库存不能少于1");
                $(e.target).removeAttr("data-dismiss");
                return;
            }
            this.$http.post(webApi + "/coupon/edit/changeCount", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success') {
                    alertSuccess("券量修改成功");
                    location.reload();
                } else {
                    alertErrors("券量修改失败");
                }

            })

        },
        changeLimitGet(e){
            var el = $(e.target);
            el.attr("data-dismiss","modal");
            var number = $("#changeLimitGetNum").val();
            var obj={};
            obj.couponId=this.couponsInfo.id;
            obj.limitCount=number;
            this.$http.post(webApi + "/coupon/edit/changeLimitGet", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success') {
                    alertSuccess("领取限制修改成功");
                    location.reload();
                } else {
                    alertErrors("领取限制修改失败");
                    $(e.target).removeAttr("data-dismiss");
                }

            })

        },
        changeDate:function(e){
            var el = $(e.target);
            el.attr("data-dismiss","modal");
            var startDate = $("#wei_datetime").val();
            var endDate = $("#wei_datetime1").val();
            var oldEndDate = this.couponsInfo.endDate;
            if(this.couponsInfo.syncTo!=undefined &&
                this.couponsInfo.syncTo.indexOf("1")>=0 && new Date(endDate)<=new Date(oldEndDate)){
                alertErrors("已同步过微信的优惠券有效期只允许延长");
                $(e.target).removeAttr("data-dismiss");
                return;
            }

            var couponId = this.couponsInfo.id;
            var obj={};
            obj.startDate=startDate;
            obj.endDate=endDate;
            obj.couponId=couponId;
            this.$http.post(webApi + "/coupon/edit/changeDate", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success') {
                    alertSuccess("有效期修改成功");
                    location.reload();
                } else {
                    alertErrors("有效期修改失败");
                    $(e.target).removeAttr("data-dismiss");
                }
            })
        },

        isDouble: function (value) {
            if (value.length != 0) {
                reg = /^[0-9]+(.[0-9]{1,2})?$/;
                if (!reg.test(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        isTime: function (str) {
            var a = str.match(/^(\d{1,2})(:)?(\d{1,2})$/);
            if (a == null) {
                alertErrors('请输入正确的时间格式', 2000);
                return false;
            }
            if (a[1] >= 24 || a[3] >= 60 || str.length > 5 || str.indexOf(":") < 0
                || a[1].length != 2 || a[3].length != 2) {
                alertErrors('请输入正确的时间格式', 2000);
                return false;
            }
            return true;
        },

    },
    created: function () {
        this.getCoupons();
        this.getUserInfo();
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
})/**
 * Created by Administrator on 2018/3/2/002.
 */
