new Vue({
    el: '#main-container',
    data: {
        couponsInfo:{},
        user:{}
    },
    methods: {
        getCoupons: function () {  //获取自动充值信息
            var obj = {};
            let reg = `(^|&)couponsId=([^&]*)(&|$)`
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.couponsId = unescape(r[2]);
            }
            this.$http.post(webApi + "/coupon/get/voucherBj", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    this.couponsInfo = res.body.data.coupon;
                    this.user = res.body.data.user;
                } else {
                    alertErrors("优惠券信息获取失败");
                }
            })
        },
        submitWx:function(){
          var url=$("#url").val();
            var rkmc=$("#rkmc").val();
            var ydy=$("#ydy").val();
            var obj = {};
            let reg = `(^|&)couponsId=([^&]*)(&|$)`
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.couponId = unescape(r[2]);
            }
            obj.url = url;
            obj.rkmc = rkmc;
            obj.ydy=ydy;
            this.$http.post(webApi + "/coupon/edit/submitWx", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    alertSuccess("微信同步成功");
                    window.location.href = "Voucher_list.html";
                } else {
                    alertErrors("微信同步失败");
                }
            })

        },

    },
    created: function () {
        this.getCoupons();
    },

})