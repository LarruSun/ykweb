
new Vue({
    el: '#tfqd_manage',
    data: {
        user: "",//商家信息
        countInfo:"",//优惠券概况
        yesTodayInfo:"",//昨日效果概况


    },
    methods: {
        getUserInfo:function(){  //获取自动充值信息
            this.$http.post(webApi + "/open/index/get/userInfo",{},{emulateJSON:true,credentials:true}).then(function (res) {
                if(res.body.errorCode=='success'){
                    this.user= res.body.data;
                }else {
                    alertErrors("商家信息获取失败");
                }
            })
        },
        getGeneralSurvey:function(){  //获取自动充值信息
            this.$http.post(webApi + "/coupon/get/getGeneralSurvey",{},{emulateJSON:true,credentials:true}).then(function (res) {
                if(res.data.type=='success'){
                    this.countInfo=res.data.data;
                }else{
                    alertErrors("优惠券概况信息获取失败");
                }
            })
        },
        getYesTodayInfo:function(){  //获取自动充值信息
            this.$http.post(webApi + "/coupon/get/getYesTodayInfo",{},{emulateJSON:true,credentials:true}).then(function (res) {
                if(res.data.type=='success'){
                    this.yesTodayInfo=res.data.data;
                }else{
                    alertErrors("优惠券概况信息获取失败");
                }
            })
        },
        getHighCharts:function(){  //获取自动充值信息
            this.$http.post(webApi + "/coupon/get/getHighCharts",{},{emulateJSON:true,credentials:true}).then(function (res) {
                if(res.data.type=='success'){
                    var series;
                    if(res.data.data.getInfo==null||res.data.data.getInfo==undefined){
                         series=[{
                            name: '总派发',
                            data: [0,0,0,0,0,0,0,0,0,0,0,0]
                        }, {
                            name: '总核销',
                            data: [0,0,0,0,0,0,0,0,0,0,0,0]
                        }];
                    }else{
                        series=[{
                            name: '总派发',
                            data: [res.data.data.getInfo.January,
                                res.data.data.getInfo.February,
                                res.data.data.getInfo.March,
                                res.data.data.getInfo.April,
                                res.data.data.getInfo.May,
                                res.data.data.getInfo.June,
                                res.data.data.getInfo.July,
                                res.data.data.getInfo.August,
                                res.data.data.getInfo.September,
                                res.data.data.getInfo.October,
                                res.data.data.getInfo.November,
                                res.data.data.getInfo.December]
                        }, {
                            name: '总核销',
                            data: [res.data.data.userInfo.January,
                                res.data.data.userInfo.February,
                                res.data.data.userInfo.March,
                                res.data.data.userInfo.April,
                                res.data.data.userInfo.May,
                                res.data.data.userInfo.June,
                                res.data.data.userInfo.July,
                                res.data.data.userInfo.August,
                                res.data.data.userInfo.September,
                                res.data.data.userInfo.October,
                                res.data.data.userInfo.November,
                                res.data.data.userInfo.December]
                        }];
                    }

                    $('#container').highcharts({
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: ' '
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        },
                        yAxis: {
                            title: {
                                text: '派发数量 (张)'
                            }
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true          // 开启数据标签
                                },
                                enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                            }
                        },
                        series: series
                    });
                }else{
                    alertErrors("优惠券发放和核销统计信息获取失败");
                }
            })
        },
    },
    created: function () {
        this.getUserInfo();
        this.getGeneralSurvey();
        this.getYesTodayInfo();
        this.getHighCharts();
    }
})