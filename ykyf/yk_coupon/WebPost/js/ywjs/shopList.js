new Vue({
    el: '#goodsList',
    data: {
        shopList: [],//商家列表
    },
    methods: {
        getShopList:function () {
            var obj = {};
            let reg = `(^|&)couponsId=([^&]*)(&|$)`
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.couponsId  = unescape(r[2]);
            }
            this.$http.post(pathApi + '/coupon/open/get/getShopListByCouponsId', obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if(res.body.type='success'){
                    this.shopList=res.body.data;
                }else{
                    alertErrors("获取门店信息失败");
                }
            });
        },
        phoneCall:function(phone){
            window.location.href = 'tel:'+phone;
        }
    },
    created: function () {
        this.getShopList();
    }

})