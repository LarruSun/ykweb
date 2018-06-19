/**
 * Created by xuwei on 2018/3/16.
 */
new Vue({
    el: "#main-container",
    data: {
        receiptTitle: "",
        shopId:'',
        tabIndex: 0,
    },
    methods: {
        testTikcet: function () {
            var title = this.receiptTitle;
            if (title.length > 20) {
                alertErrors('长度不能大于20');
                return
            }
            var obj = {};
            obj.title = title;
            obj.shopId = this.shopId;
            obj.type = this.tabIndex;
            this.$http.post(cyApi + '/add/testTikcet', obj,
                {emulateJSON: true, credentials: true}).then(function (res) {
                if (res.body.type == 'SUCCESS' || res.body.type == 'success') {
                    alertSuccess("打印成功");
                } else {
                    alertErrors(res.body.message);
                }
            });

        },
        apply: function () {
            var title = this.receiptTitle;
            if (title.length > 20) {
                alertErrors('长度不能大于20');
                return
            }
            var obj = {};
            obj.title = title;
            obj.shopId = this.shopId;
            obj.type = this.tabIndex;
            this.$http.post(cyApi + '/add/applyTikcet', obj,
                {emulateJSON: true, credentials: true}).then(function (res) {
                if (res.body.type == 'SUCCESS' || res.body.type == 'success') {
                    alertSuccess("应用成功");
                } else {
                    alertErrors(res.body.message);
                }
            });
        },
        switchTab(val){
            this.tabIndex = val;
            this.getTicket(val);
        },
        getTicket(val){
            this.$http.post(ceshiApi + 'get/getTikcet',{
                'type' : val,
                'shopId' : this.shopId
            },{emulateJSON: true, credentials: true}).then(res => {
                if (res.data.type == 'success') {
                    this.receiptTitle = res.data.data.title;
                }else {
                    alertErrors(res.data.message);
                }
            })
        }
    },
    watch: {},
    created: function () {
        let param = window.location.search;
        if (param.indexOf('shopId') >= 0) {
            this.shopId = param.split("=")[1];
            this.getTicket('0');
        }
    }
});