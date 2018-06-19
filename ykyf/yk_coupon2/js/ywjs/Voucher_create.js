new Vue({
    el: '#main-container',
    data: {
        user: "",//商家信息
        shopList: [],
        shopListLength: "",
        newsItems: [],
        img: '',
        isAuth: 0,
        authUrl: ""
    },
    methods: {
        getUserInfo: function () {  //获取自动充值信息
            this.$http.post(webApi + "/index/get/getLoginUser", {}, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success') {
                    this.user = res.body.data;
                    this.user.remark = res.body.data.nickName + "回馈新老客户";
                    this.user.remarkLength = res.body.data.nickName.length + 6;
                } else {
                    alertErrors("商家信息获取失败");
                }
            })
        },
        getShopList: function () {
            var shopName = $("#shopName").val();
            var obj = {};
            obj.shopName = shopName;
            this.$http.post(webApi + "/main/get/getShopList", obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.data.type == 'success' || res.data.type == 'SUCCESS') {
                    this.shopList = res.body.data;
                    this.shopListLength = this.shopList.length;
                } else {
                    alertErrors("商家信息获取失败");
                }
            })

        },
        shopSelectCount: function (res) {
            var n = 0;
            $(".Voucher_cModal .mditem tbody input").each(function (i, o) {
                if ($(this).prop("checked")) {
                    n++;
                }
            })
            $(" .Voucher_cModal .modal-footer .chiosed").html(n);
            $(" .Voucher_cModal .modal-footer .total").html($(" .Voucher_cModal .mditem tbody input").length);
        },

        upbaseLicenseImg: function (el) {
            var inputThis = document.getElementById("upImg_bts03");
            this.upImg(inputThis, el, 1);
        },
        upImg: function (inputThis, el, n) {    //上传预览图片
            var files = inputThis.files;
            var _this = this;
            if (files[0] != null) {
                if (files[0].type.indexOf('image') >= 0) {
                    var obj = new FileReader();
                    obj.readAsDataURL(files[0]);
                    obj.onload = function () {
                        $(el).attr("src", obj.result);
                        if (n == 1) {
                            _this.img = files;
                        }
                    }

                    lrz(files[0])
                        .then(function (rst) {
                            // 处理成功会执行
                            rst.file.name = rst.origin.name;
                            $(el).attr("src", rst.base64);
                            if (n == 1) {
                                _this.img = rst.file;
                            }
                        })
                        .catch(function (err) {
                            // 处理失败会执行
                        })
                        .always(function () {
                            // 不管是成功失败，都会执行
                        });
                } else {
                    alertErrors('请选择图片文件', 2000);
                }

            }
        },

        btnPrimary: function () {
            var couponsWay = 0;// $("#createCouponsWay").val();//卡券方式
            var couponsType = 0;// $('input:radio[name="crad_type"]:checked').val();//卡券类型
            var couponsColor = $("#couponsColor").val();// 卡券颜色
            var couponsName = $("#couponsName").val();// 卡券名称
            if (couponsName.length == 0) {
                alertErrors('券名称不能为空', 2000);
                return;
            }
            var vouchers = $("#vouchers").val();// 代金券时 券的面额
            if (vouchers.length == 0) {
                alertErrors('券面额不能为空', 2000);
                return;
            }
            if (!this.isDouble(vouchers)) {
                alertErrors('券面额格式有误', 2000);
                return;
            }

            var limitLowestConsumeType = $(
                'input:radio[name="form-field-radio"]:checked').val();// 优惠券发放后使用限制是否有最低消费//$("#limitLowestConsumeType").val();
            var lowestConsume = limitLowestConsumeType == 0 ? 0 : $("#lowestConsume")
                .val();// 当发放的优惠券有最低消费限制时
            // 该字段代表最消费的金额
            if (limitLowestConsumeType != 0) {
                if (parseFloat(lowestConsume) < parseFloat(vouchers)) {
                    alertErrors('最低消费额不能低于优惠券金额', 2000);
                    return;
                }
                if (!this.isDouble(lowestConsume)) {
                    alertErrors('最低消费额格式有误', 2000);
                    return;
                }
            }

            var countNum = $("#countNum").val();// 卡券发放数量为限制时
            // 该参数代表限制的发放张数
            if (countNum.length == 0) {
                alertInfo('券总量不能为空', 2000);
                return;
            }

            var limitCountNumType = countNum == 0 ? 0 : 1;
            var startDate = $("#wei_datetime").val();// 有效期-开始日期
            var endDate = $("#wei_datetime1").val();// 有效期-结束日期
            if (startDate.length == 0 || endDate.length == 0) {
                alertErrors('有效期不能为空', 2000);
                return;
            }
            if(!this.CompareDate(endDate,startDate)){
                alertErrors('结束时间不能比开始时间早', 2000);
                return;
            }

            // 张/人 每个用户领券上限；如不填则默认为0表示无限制
            var receiveLimit = $("#receiveLimit").val() == "" ? 0 : $("#receiveLimit")
                .val();// $('input:radio[name="receive_GetTheLimit"]:checked').val();//消费领取限制
            // 商家id
            // var userId = $("#userId").val();
            // 可用时间段 全部时间段or部分时间
            var effectiveTimeType = $('input:radio[name="form-field-radio2"]:checked')
                .val();
            // 当为部分时间段时-时间段对应 星期几 周期
            var useWeekDays = "";
            if (effectiveTimeType == 1) {
                var WeekDays_Checked = $('input:checkbox[name="WeekDays"]:checked');
                for (i = 0; i < WeekDays_Checked.length; i++) {
                    useWeekDays = useWeekDays + WeekDays_Checked[i].value + ",";
                }
            }
            var periodTime = "";
            // 可用时间段
            if (!$(".voucher_time_data").val().length == 0) {
                if ($(".voucher_time_data1").val().length == 0) {
                    alertErrors('可用时间段不能为空', 2000);
                    return;
                }
                if (!this.isTime($(".voucher_time_data").val())
                    || !this.isTime($(".voucher_time_data1").val())) {
                    return;
                }

                periodTime = $(".voucher_time_data").val() + "-"
                    + $(".voucher_time_data1").val();
            }
            if (!$(".voucher_time_data2").val().length == 0) {
                if ($(".voucher_time_data3").val().length == 0) {
                    alertErrors('可用时间段不能为空', 2000);
                    return;
                }
                if (!isTime($(".voucher_time_data2").val())
                    || !isTime($(".voucher_time_data3").val())) {
                    return;
                }
                periodTime = periodTime + "," + $(".voucher_time_data2").val() + "-"
                    + $(".voucher_time_data3").val();
            }
            // 封面简介
            var remark = $("#remark").val();
            if (remark.length == 0) {
                alertErrors('封面简介不能为空', 2000);
                return;
            }
            // 使用场景
            var usageScenarios_Checked = $('input:checkbox[name="usageScenarios"]:checked');
            var usageScenarios = "";
            for (i = 0; i < usageScenarios_Checked.length; i++) {
                usageScenarios = usageScenarios + usageScenarios_Checked[i].value + ",";
            }

            // 适用门店
            var physicalStore = "";
            var physicalStore_Checked = $(" .addCon table tbody tr");
            for (i = 0; i < physicalStore_Checked.length; i++) {
                physicalStore = physicalStore + physicalStore_Checked[i].id + ",";
            }
            if ($('input:checkbox[name="allShops"]').is(':checked')) {
                physicalStore = physicalStore + 0;
            }

            var physicalStoreType = $('input:radio[name="md"]:checked').val();
            if (physicalStoreType == 0) {
                physicalStore = "";
                var physicalStoreIds = $('input:checkbox[name="shops"]');
                for (i = 0; i < physicalStoreIds.length; i++) {
                    physicalStore = physicalStore + physicalStoreIds[i].value + ",";
                }
            }

            var data = {};
            if (limitCountNumType == undefined) {
                limitCountNumType = 0;
            }

            var url = "";
            var syncTo = "";
            if ($("#isSyncWx").prop("checked")) {
                syncTo = 1;
                var type = $('input:radio[name="infType"]:checked').val();
                if (type == 2) {
                    url = $("#wylj").val();
                }
            } else {
                syncTo = 0;
            }

            // alertInfo('请稍候..', 10000000);
            var formData = new FormData();
            formData.append('useWeekDays', useWeekDays);
            formData.append('periodTime', periodTime);
            formData.append('couponsType', couponsType);
            formData.append('couponsColor', couponsColor);
            formData.append('couponsName', couponsName);
            formData.append('vouchers', vouchers);
            formData.append('limitCountNumType', limitCountNumType);
            formData.append('countNum', countNum);
            formData.append('limitLowestConsumeType', limitLowestConsumeType);
            formData.append('lowestConsume', lowestConsume);
            formData.append('startDate', startDate);
            formData.append('endDate', endDate);
            formData.append('receiveLimit', receiveLimit);
            formData.append('status', 0);
            formData.append('validityStatus', 0);

            formData.append('effectiveTimeType', effectiveTimeType);
            formData.append('usageScenarios', usageScenarios);
            formData.append('physicalStore', physicalStore);
            formData.append('remark', remark);

            formData.append('syncTo', syncTo);

            if (syncTo == 1) {
                formData.append('url', url);
                formData.append('ydy', $("#ydy").val());
                formData.append('rkmc', $("#rkmc").val());
            }
            formData.append('couponsImgs', this.img, this.img.name);

            this.$http.post(webApi + "/coupon/add/addCoupons", formData, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                alertHide();
                if (res.data.type == 'success') {
                    alertSuccess('添加成功', 2000);
                    window.location.href = "Voucher_list.html";
                } else if (res.data.type == 'noApi') {
                    alertErrors('您的公众号没有卡券接口权限，请到https://mp.weixin.qq.com上登录并添加卡券功能');
                } else {
                    alertErrors("添加失败");
                }
            })
        },

        CompareDate:function(d1,d2){
            return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
        },
        getAuthUrl: function (e) {
            this.getAuthInfo();
            var el = $(e.target);
            //如果已经授权，就不管了
            if (this.isAuth == 1) {
                return;
            }
            var isChecked = el.prop('checked');
            if (isChecked == false) {
                return;
            }
            this.$http.post(webApi + '/coupon/get/getAuthUrl', {}, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                var url = "https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid="+res.data.data.componentAppid+"&pre_auth_code="+res.data.data.code+"&redirect_uri="+res.data.data.url+"&auth_type=1";
                this.authUrl = url;
                $("#context2").show();
            });
        },
        openAuth:function(){
            window.open(this.authUrl);
        },

        getAuthInfo: function () {
            this.$http.post(webApi + "/coupon/get/getAuthInfo", {}, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type == 'success') {
                    this.isAuth = 1;
                    $("#context2").hide();
                } else {
                    this.isAuth = 0;
                }
            })
        },
        contextHide:function(){
            $("#context2").hide();
            this.getAuthInfo();
            if(this.isAuth==0){
                $(".Cright_two_4 .tb_weixin label input").attr("checked",false);
                $(".Cright_main_two .p3").hide();
            }
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
        this.getUserInfo();
        this.getShopList();
        this.getAuthInfo();
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