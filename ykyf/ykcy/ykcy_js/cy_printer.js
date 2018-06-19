/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#main-container",
    data: {
        thisPrinter: {
            id: "",
            firmId: "",
            snNum: "",
            secretKey: "",
            printerName: "",
            printeType: "1",
            departmentId: "",
            orderType: [],
            number: "",
        },
        printerType: {
            0: '出品打印',
            1: '订单打印'
        },
        firmList: [],
        departMent: [],
        printerList: [],
        thisFirm: "",
        thisDepartMent: "",
        cur: 1,//默认第一页
        all: 1,//总页数
        thisPrinterId: "",
        shopId: location.href.split("=")[1]

    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods: {
        listen: function (data) {  //分页
            this.cur = data;
            this.getPrinterList(data)
        },
        test: function (id) {
            var obj = {};
            obj.title = "TEST";
            obj.id = id;
            this.$http.post(cyApi + '/add/testPrinter', obj,
                {emulateJSON: true, credentials: true}).then(function (res) {
                if (res.body.type == 'SUCCESS' || res.body.type == 'success') {
                    alertSuccess("打印成功", 3000);
                } else {
                    alertErrors(res.body.message, 3000);
                }
            });
        },
        getPrinterList: function (page) {
            var obj = {};
            if (page == undefined) {
                page = 1;
            }
            obj.page = page;
            obj.pageSize = 10;
            obj.seachName = $("#seachName").val();
            obj.shopId = this.shopId;
            this.$http.post(cyApi + '/get/getPrinterList', obj,
                {emulateJSON: true, credentials: true}).then(function (res) {
                if (res.body.type == 'SUCCESS' || res.body.type == 'success') {
                    this.printerList = res.body.data.list;
                    this.all = res.body.data.pageAll;
                }
            });
        },

        getFirmList: function () {
            this.$http.post(cyApi + '/get/getFirmList', {},
                {emulateJSON: true, credentials: true}).then(function (res) {
                console.log(res.data)
                if (res.body.type == 'SUCCESS' || res.body.type == 'success') {
                    this.firmList = res.body.data;
                }
            });
        },

        getDepartmentList: function () {
            var obj = {shopId: this.shopId};
            this.$http.post(cyApi + '/get/getDepartmentList', obj,
                {emulateJSON: true, credentials: true}).then(function (res) {
                console.log(res.data)
                if (res.body.type == 'SUCCESS' || res.body.type == 'success') {
                    this.departMent = res.body.data.departments;
                }
            });
        },

        getPrinterById: function (id, type) {
            if (type === 'edit') {
                $("#myModalLabel_rw").html("编辑打印机");
            }
            for (var i = 0; i < this.printerList.length; i++) {
                if (id === this.printerList[i].id) {
                    if (this.printerList[i].orderType !== undefined) {
                        this.thisPrinter = this.printerList[i];
                        this.thisPrinter.orderType = this.printerList[i].orderType.split(",");
                        this.thisDepartMent = this.printerList[i].departmentId;
                        this.thisFirm = this.printerList[i].firmId;
                    }
                    return;
                }
            }
        },
        setPrinterId: function (id) {
            this.thisPrinterId = id;
        },

        delPrinterById: function () {
            var obj = {};
            obj.id = this.thisPrinterId;
            this.$http.post(cyApi + '/delete/delPrinterById', obj,
                {emulateJSON: true, credentials: true}).then(function (res) {
                console.log(res.data)
                if (res.body.type == 'SUCCESS' || res.body.type == 'success') {
                    alertSuccess("删除成功", 3000);
                    location.reload();
                } else {
                    alertErrors("删除失败", 3000);
                }
            });
        },

        stopPrinterById: function () {
            var obj = {};
            obj.id = this.thisPrinterId;
            this.$http.post(cyApi + '/edit/stopPrinterById', obj,
                {emulateJSON: true, credentials: true}).then(function (res) {
                console.log(res.data)
                if (res.body.type == 'SUCCESS' || res.body.type == 'success') {
                    alertSuccess("停用成功", 2000);
                    location.reload();
                } else {
                    alertErrors("停用失败", 2000);
                }
            });

        },

        startPrinterById: function () {
            var obj = {};
            obj.id = this.thisPrinterId;
            this.$http.post(cyApi + '/edit/startPrinterById', obj,
                {emulateJSON: true, credentials: true}).then(function (res) {
                console.log(res.data)
                if (res.body.type == 'SUCCESS' || res.body.type == 'success') {
                    alertSuccess("应用成功", 2000);
                    location.reload();
                } else {
                    alertErrors("应用失败", 2000);
                }
            });

        },

        addPrinter1: function () {
            this.thisPrinter = {
                id: "",
                firmId: "",
                snNum: "",
                secretKey: "",
                printerName: "",
                printeType: "1",
                departmentId: "",
                orderType: [],
                number: "",
                shopId: this.shopId,
                status: "0"
            };
            this.thisFirm = "1";
            this.thisDepartMent = "";
            $("#myModalLabel_rw").html("新增打印机");
        },

        addPrint: function () {
            this.thisPrinter.firmId = this.thisFirm;
            this.thisPrinter.departmentId = this.thisDepartMent;
            if(this.thisPrinter.firmId==undefined || this.thisPrinter.firmId==''){
                this.thisPrinter.firmId=1;
            }
            var obj = {
                id: this.thisPrinter.id,
                firmId: this.thisPrinter.firmId,
                snNum: this.thisPrinter.snNum,
                secretKey: this.thisPrinter.secretKey,
                printerName: this.thisPrinter.printerName,
                printeType: this.thisPrinter.printeType,
                departmentId: this.thisPrinter.departmentId,
                number: this.thisPrinter.number,
                status: this.thisPrinter.status
            };
            var orderTypeCopy = this.thisPrinter.orderType;
            obj.orderType = orderTypeCopy.join(",");
            obj.shopId = this.shopId;
            if (this.thisPrinter.snNum === undefined || this.thisPrinter.snNum.length <= 0) {
                alertErrors("打印机sn号不能为空", 3000);
                return;
            }
            if (this.thisPrinter.secretKey === undefined || this.thisPrinter.secretKey.length <= 0) {
                alertErrors("打印机秘钥不能为空", 3000);
                return;
            }
            if (this.thisPrinter.id.length > 0) {
                this.$http.post(cyApi + '/edit/updatePrint', obj,
                    {emulateJSON: true, credentials: true}).then(function (res) {
                    console.log(res.data)
                    if (res.body.type === 'SUCCESS' || res.body.type === 'success') {
                        alertSuccess("修改成功", 3000);
                        location.reload();
                    } else {
                        this.thisPrinter.orderType = this.thisPrinter.orderType.split(",");
                        alertErrors(res.body.message, 3000);
                    }
                });
            } else {
                this.$http.post(cyApi + '/add/addPrint', obj,
                    {emulateJSON: true, credentials: true}).then(function (res) {
                    console.log(res.data)
                    if (res.body.type === 'SUCCESS' || res.body.type === 'success') {
                        alertSuccess("新增成功", 3000);
                        location.reload();
                    } else {
                        alertErrors(res.body.message, 3000);
                    }
                });
            }

        }
    },
    watch: {},
    created: function () {
        this.getPrinterList(1);
        this.getFirmList();
        this.getDepartmentList();
    }
});