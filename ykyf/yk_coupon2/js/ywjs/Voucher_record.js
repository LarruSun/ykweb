new Vue({
    el: '#main-container',
    data: {
        cur: 1,//默认第一页
        all:1,//总页数
        receiveList: [],
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods: {
        listen: function (data) {  //分页
            this.cur = data;
            this.getReceiveList(data);
        },
        getReceiveList:function (page) {
            var obj={};
            obj.page=page;
            obj.pageSize=10;
            obj.startDate=$("#wei_datetime2").val();
            obj.endDate=$("#wei_datetime3").val();
            obj.couponsName=$("#couponsName").val();
            obj.phone=$("#phone").val();
            this.$http.post(webApi + "/coupon/get/voucherRecord", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success') {
                    this.receiveList = res.body.data.list;
                    if(res.body.data.pageAll==0||res.body.data.pageAll==undefined){
                        this.all=1;
                    }else{
                        this.all = res.body.data.pageAll;
                    }
                } else {
                    alertErrors("优惠券领取信息获取失败");
                }
            })
        },
        timeChange(n){
            var dd = new Date();
            var y = dd.getFullYear();//获取当前年份的日期
            var m = dd.getMonth()+1;
            var d = dd.getDate();
            var w = dd.getDay();
            if(m<10){
                m="0"+m;
            }
            if(d<10){
                d="0"+d;
            }
            if(n==1){
                $("#wei_datetime2").val(y+"-"+m+"-"+d);
                $("#wei_datetime3").val(y+"-"+m+"-"+d);
            }
            if(n==2){
                var now = new Date();
                var date = new Date(now.getTime() - 1 * 24 * 3600 * 1000);
                var y1 = date.getFullYear();
                var m1 = date.getMonth() + 1;
                var d1 = date.getDate();
                if(m1<10){
                    m1="0"+m1;
                }
                if(d1<10){
                    d1="0"+d1;
                }

                $("#wei_datetime2").val(y1+"-"+m1+"-"+d1);
                $("#wei_datetime3").val(y1+"-"+m1+"-"+d1);
            }
            if(n==3){
                var now = new Date();
                var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
                var y7 = date.getFullYear();
                var m7 = date.getMonth() + 1;
                var d7 = date.getDate();
                if(m7<10){
                    m7="0"+m7;
                }
                if(d7<10){
                    d7="0"+d7;
                }
                $("#wei_datetime2").val(y7+"-"+m7+"-"+d7);
                $("#wei_datetime3").val(y+"-"+m+"-"+d);
            }
            if(n==4){
                var now = new Date();
                var date = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
                var y30 = date.getFullYear();
                var m30 = date.getMonth() + 1;
                var d30 = date.getDate();
                if(m30<10){
                    m30="0"+m30;
                }
                if(d30<10){
                    d30="0"+d30;
                }
                $("#wei_datetime2").val(y30+"-"+m30+"-"+d30);
                $("#wei_datetime3").val(y+"-"+m+"-"+d);
            }
            if(n==5){
                $("#wei_datetime2").val("");
                $("#wei_datetime3").val("");
            }
            this.getReceiveList(1);
        }
    },
    created: function () {
        this.getReceiveList(1);
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