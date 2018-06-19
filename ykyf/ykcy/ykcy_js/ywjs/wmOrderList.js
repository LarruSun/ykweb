new Vue({
    el: "#main-container",
    data: {
        cur: 1,//默认第一页
        all:1,//总页数
        orderList:[],
        countInfo:{},
        // distributionInfo:{},
        shopId:location.href.split("=")[1],
        wei_datetime2:'',
        wei_datetime3:'',
        orderStatus:'all'//默认获取所有状态的数据
        
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        listen: function (data) {  //分页
            console.log(data)
            this.cur = data;
            this.getdata(data)
        },
        getdata:function(page){
            var obj={};
            if(page==undefined){
                page=1;
            }
            obj.page=page;
            obj.pageSize = 10;
            obj.startTime=this.wei_datetime2;
            obj.endTime=this.wei_datetime3;
            obj.orderStatus=this.orderStatus;//状态
            obj.orderType="WMCATERING";
            obj.shopId = this.shopId
          //  obj.orderType=$("select[name='sample-table-2_orderType'] option:selected").val();
            obj.payType=$("select[name='sample-table-2_payType'] option:selected").val();//支付方式
            // console.log($("select[name='sample-table-2_orderType'] option:selected").val());//订单类型
            // console.log($("input[name='searchOrder']").val());//订单类型
            // console.log(obj)
            this.$http.post(cyApi+'/get/getListOrder',obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    console.log(res);
                    this.orderList=res.data.data.orderList;
                }
            });
        },
        //点击不同状态获取数据
        changRed:function(e){
            this.orderStatus = $(e.target).attr("name");//获取点击的状态          
            $(e.target).addClass("red").siblings().removeClass("red")//更改样式
            this.all = Math.ceil($(e.target).attr("name1")/10);//计算总页数
            // console.log(this.orderStatus);
            this.getdata(this.cur);//数据获取
        },
        getCountInfo:function(createtime){
            // console.log('123')
            var obj={};
            obj.startTime=this.wei_datetime2;
            obj.endTime=this.wei_datetime3;
            // this.orderStatus=$(".red").attr("name");
            
            obj.orderStatus=this.orderStatus;
            obj.orderType="WMCATERING";
            obj.shopId = this.shopId
            // console.log(obj); 
            //  obj.orderType=$("select[name='sample-table-2_orderType'] option:selected").val();
            obj.payType=$("select[name='sample-table-2_payType'] option:selected").val();
            this.$http.post(cyApi+'/get/numsOrderByShop',obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    // console.log(res.data.data)
                    console.log(res);
                    this.countInfo=res.data.data[0];
                    this.all = Math.ceil(res.data.data[0].num0/10);//计算总页数
                    // console.log(this.all);
                  
                }
            });
        },
        //获取当前页的数据
        getPageDate(){
            // var orderStatu = $(".red").attr("name");
            this.getCountInfo();//获取状态的数据
            this.getdata(this.cur);//获取当前页面的数据
        },

        timeChange(n,$event){
            if($event){
                $($event.target).addClass('order_list_activ').siblings().removeClass('order_list_activ');
            }
            var dd = new Date();
            var y = dd.getFullYear();//获取当前年份的日期
            var m = dd.getMonth() + 1;
            var d = dd.getDate();
            var w = dd.getDay();
            if (m < 10) {
                m = "0" + m;
            }
            if (d < 10) {
                d = "0" + d;
            }
            if (n == 1) {
                this.wei_datetime2=y + "-" + m + "-" + d;
                this.wei_datetime3 = y + "-" + m + "-" + d;
            }
            if (n == 2) {
                var now = new Date();
                var date = new Date(now.getTime() - 1 * 24 * 3600 * 1000);
                var y1 = date.getFullYear();
                var m1 = date.getMonth() + 1;
                var d1 = date.getDate();
                if (m1 < 10) {
                    m1 = "0" + m1;
                }
                if (d1 < 10) {
                    d1 = "0" + d1;
                }
                this.wei_datetime2=y1 + "-" + m1 + "-" + d1;
                this.wei_datetime3 = y1 + "-" + m1 + "-" + d1;
            }
            if (n == 3) {
                var now = new Date();
                var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
                var y7 = date.getFullYear();
                var m7 = date.getMonth() + 1;
                var d7 = date.getDate();
                if (m7 < 10) {
                    m7 = "0" + m7;
                }
                if (d7 < 10) {
                    d7 = "0" + d7;
                }
                this.wei_datetime2=y7 + "-" + m7 + "-" + d7;
                this.wei_datetime3=y + "-" + m + "-" + d;
            }
            if (n == 4) {
                var now = new Date();
                var date = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
                var y30 = date.getFullYear();
                var m30 = date.getMonth() + 1;
                var d30 = date.getDate();
                if (m30 < 10) {
                    m30 = "0" + m30;
                }
                if (d30 < 10) {
                    d30 = "0" + d30;
                }
                this.wei_datetime2=y30 + "-" + m30 + "-" + d30;
                this.wei_datetime3=y + "-" + m + "-" + d;
            }
            if (n == 5) {
                this.wei_datetime2=''
                this.wei_datetime2=''
            }
            this.getPageDate();

        }
    },
    filters: {
        data: function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        },
        getNum:function(num){
            return num.toFixed(2)
        }
    },
    watch:{

    },
    created:function() {
        //this.getCountInfo(true);
      
    },
    mounted:function(){
        this.timeChange(1,$('.order_list_activ')[0]);

    }
});