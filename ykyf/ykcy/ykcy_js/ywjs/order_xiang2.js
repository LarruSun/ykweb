new Vue({
    el: "#main-container",
    data: {
        foodList:[],
        orderInfo:{
            sonOrder:{currentOrderNum:1},
            summaryOrderTakeOut:{takeout_type:''}
        },
        orderId:'',
        shopId:'',
        discount:'无',
        allPrice:0,
        count:1,
        orderState:'',
        //时间的处理
        orderTimes:{//    
            'orderTime':{
                'DAIJIEDAN':'',//发单时间：DAIJIEDAN（待接单）
                'DAIQUHUO':'',//接单时间：DAIQUHUO（待取货
                'YIQUHUO':'',//取货时间：YIQUHUO (已取货) 
                'YISONGDA':''//送达时间：YISONGDA（已送达）
            },
            'topTime':{
                'NONRECEIVEORDER':'',//已支付（待接单）
                'NONSENDGOODS':'',//待发货
                'SENDGOODS':'',//已发货
                'HASDONE':'',//已完成
                'HASCLOSED':''//已经关闭
            }
        },
        afterSaleOrders:[],//售后订单信息
        // 更改配送的数据
        distribution:'ZIYING_TAKEOUT',//更改配送中单选框选中配送模式
        psyData:[
            {'name':'商家配送','phone':''}
        ],//配送员信息
        //再次发布信息
        sheng:['广东省','江西省','云南省'],
        shi:['深圳市','广州市','东莞市'],
        qu:['宝安区','福田区','龙岗区'],
        psFlag:true,
        // selectDistribution:'请选择',//更改配送中下拉列表选择的配送模式 
        //再次发布的数据
        // againReleaseCity:'广东省',//再次发布中下拉框选中的城市
        // againReleaseAdd:'',//再次发布中输入的城市
        // againReleasePhone:''//再次发布中输入的手机号码

    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        getdata:function(){
            var obj = {};
            let reg = `(^|&)orderId=([^&]*)(&|$)`
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.orderId = unescape(r[2]);
                // obj.orderId = '032adc093d6d413f94e5c85abb7156f7';
                this.orderId = obj.orderId;
            }
            // obj.orderId='3a8881501d4546fe97fcc6e6f6a9df46'
            // console.log(obj)
            this.$http.post(cyApi+'/open/get/getOrderById',obj,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    this.orderInfo=res.body.data;
                    console.log(this.orderInfo);
                    // console.log(this.orderInfo.status)
                    this.foodList=res.body.data.sonOrder.prods;
                    this.orderState=this.orderInfo.status;//订单状态（待支付  已支付。。。。）
                    this.afterSaleOrders=this.orderInfo.afterSaleOrders;//售后订单

                    // 头部时间的处理   待支付   已支付（待接单）   代发货   已发货  已完成
                    for(var i=0;i<this.orderInfo.orderLogs.ORDER.length;i++){
                        var state=this.orderInfo.orderLogs.ORDER[i].orderStatus;
                        if(state=='HASCLOSED' || state=='TEMPORARY'){//已经关闭
                            this.orderTimes.topTime.HASCLOSED=parseInt(this.orderInfo.orderLogs.ORDER[i].updateTime);
                        }else{
                            this.orderTimes.topTime[state]=parseInt(this.orderInfo.orderLogs.ORDER[i].updateTime);
                        }

                    }
                    ////////////////////////////////////////////
                    // 订单时间处理
                    // console.log(this.orderInfo.orderLogs.TAKEOUT);
                    for(var i=0;i<this.orderInfo.orderLogs.TAKEOUT.length;i++){
                        var key=this.orderInfo.orderLogs.TAKEOUT[i].takeout_status
                        this.orderTimes.orderTime[key]=parseInt(this.orderInfo.orderLogs.TAKEOUT[i].push_time);
                    }
                    console.log(this.orderTimes)


                    // console.log(this.orderInfo.summaryOrderTakeOut);

                    //无数据时候的兼容
                    if(this.orderInfo.summaryOrderTakeOut==null){
                        console.log('空的');
                        this.orderInfo.summaryOrderTakeOut={
                            'cancel_from':'',
                            'cancel_reason':'',
                            'carrier_driver_id':'',
                            'carrier_driver_name':'',
                            'carrier_driver_phone':'',
                            'id':'',
                            'order_id':'',
                            'push_time':'',
                            'takeout_status':'',
                            // 'takeout_status_description':'',
                            'takeout_type':'ZIYING_TAKEOUT'
                            // 'takeout_type':''
                        }
                    }


                    for(var i in this.foodList){
                        this.allPrice+=this.foodList[i].prodAllPrice
                    }
                    this.discount = this.orderInfo.summaryOrderDiscounts?this.orderInfo.summaryOrderDiscounts[0].detial:'无';
                }
            });
        },
        acept:function(){
            this.$http.post(cyApi+'/open/edit/wmOrderStatus',{orderId:this.orderId},
                {emulateJSON:true,credentials: true}).then(function(res){
                console.log(res.data)
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    alertSuccess('操作成功',1000);
                   location.reload(true);
                }
                // else{
                //     if(res.data.data.message){
                //         alertErrors(res.data.data.message)
                //     }else{
                //         alertErrors('操作失败，网络错误！')
                //     }
                // }
            });
        },
        refuse:function(){
            this.$http.post(cyApi+'/open/update/refuseUpdateWmOrderStatus',{orderId:this.orderId},
                {emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res);
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    location.reload(true);
                }else{
                    if(res.data.message){
                        alertErrors(res.data.message,3000)
                    }else{
                        alertErrors('操作失败，网络错误！')
                    }
                }
            });
        },
        printTest:function(){
            var printBody = document.getElementById("home");

            var printBodyHTML = printBody.innerHTML;
            var printBodyHTML = printBody.innerHTML;
            var bodyHTML=document.body.innerHTML;
            document.body.innerHTML = printBodyHTML;
            window.print();
            document.body.innerHTML = bodyHTML;
        },
        //取消订单
        cancelOrder(){
            alertSuccess('操作成功(取消订单)',1000);
        },
        //点击再次发布的按钮
        againFB(){
            //城市地址的分割
            var address=this.orderInfo.address
            
            this.sheng.length=0;
            this.sheng.push(address.substring(0,address.indexOf("省")+1))
            
            this.shi.length=0;
            this.shi.push(address.substring(address.indexOf("省")+1,address.indexOf("市")+1))
           
            this.qu.length=0;
            this.qu.push(address.substring(address.indexOf("市")+1,address.indexOf("区")+1))

            $("#againRelease input[name='phone']").val(this.orderInfo.phone)

        },
        // 确认再次发布订单
        againRelease(){
            // console.log(this.orderInfo.summaryOrderTakeOut.takeout_type);
            // return;
            var sheng=$("#againRelease select[name='sheng'] option:selected").val();
            var shi=$("#againRelease select[name='shi'] option:selected").val();
            var qu=$("#againRelease select[name='qu'] option:selected").val();
            var xxAdd=$("#againRelease input[name='xxAdd']").val();
            var phone=$("#againRelease input[name='phone']").val();
            if(!this.testPhone(phone,xxAdd)){
                return;
            }
        
            var obj={
                'orderId':this.orderId,
                'address':sheng+ shi + qu + xxAdd ,
                'phone':phone,
                'takeoutMode':this.orderInfo.summaryOrderTakeOut.takeout_type
            }
            console.log(obj)
            // return;
            this.$http.post(cyApi+'/open/edit/wmOrderStatus',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    alertSuccess('操作成功',1000);
                    location.reload(true);
                }else{
                    if(res.body.message && res.body.message!=''){
                        alertErrors(res.body.message,3000);
                    }else{
                        alertErrors('操作失败',1000);
                    }
                }
            });
        },
        // 点击更改派送或选择配送员
        changePS(){
            // console.log('ss');
            //获取对应的配送员
            if(this.psyData.length == 1){

                var obj={
                    'shopId':this.shopId
                }
                console.log(obj)
                this.$http.post(cyApi+'/get/listTakeoutMan',obj,{emulateJSON:true,credentials: true}).then(function(res){
                    if(res.body.type=='SUCCESS'||res.body.type=='success'){
                        console.log(res.data.data);
                        this.psyData=res.data.data;
                    }
                });
            }
        },
        //确认更改配送模式
        replaceDistribution(){
            var id='';
            if(this.distribution == 'ZIYING_TAKEOUT'){//如果选择自营配送
                var selectIndex=$("#replaceDistribution select[name='isSelect'] option:selected")[0].index//选中的中下表
                var selectDistribution=$("#replaceDistribution select[name='isSelect'] option:selected").val();//选中的内容
                if(this.distribution=='' || selectIndex==0 || selectDistribution=='商家配送'){//如果是商家配送或者没选择
                   id=''
                }else{//如果选择了自营配送员配送
                    id=this.psyData[selectIndex-1].id
                }

            }
            var obj={
                'orderId':this.orderId,
                'takeoutMode':this.distribution,
                'courierId':id
            }
            // console.log(obj)
            // return;
            this.$http.post(cyApi+'/open/edit/wmOrderStatus',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.body.type=='SUCCESS'||res.body.type=='success'){
                    alertSuccess('操作成功',1000);
                    location.reload(true);
                }else{
                    if(res.body.message && res.body.message!=''){
                        alertErrors(res.body.message,3000);
                    }else{
                        alertErrors('操作失败',1000);
                    }
                }
            });
            // console.log(this.distribution +' ，'+selectDistribution);
        },
        //再次发布中选择城市的事件
        selectSheng(e){
            console.log(e.target.value);
        },
        selectShi(e){console.log(e.target.value)},
        selectQu(e){console.log(e.target.value)},
        
        testPhone(str,str1){
            if(str=='' || str1==''){
                alertErrors("操作失败！请填写详细地址和手机号码",3000);
                return false;
            };
            /*手机验证正则 */
            var myReg={
                mobile:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}|(17[0-9]{1})))+\d{8})$/,
            };
            if(!myReg.mobile.test(str)){//手机号码不正确
                alertErrors("操作失败！请输入正确的手机格式",4000);
                return false;
            };
            return true;
        },
        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
         }

    },
    filters: {
        data: function (input) {
            if(input==''){
                return input;
            }
            var d = new Date(input);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
            
        },
        psgs(input){
            switch (input){
                case 'ZIYING_TAKEOUT':
                    return '商家配送'
                case 'DADA_TAKEOUT':
                    return '达达'
                case 'FENGNIAO_TAKEOUT':
                    return '蜂鸟'
                default:
                    return ''
            }

        },
        pslx(input){
            switch (input){
                case 'ZIYING_TAKEOUT':
                    return '自营配送'
                case 'DADA_TAKEOUT':
                case 'FENGNIAO_TAKEOUT':
                return '第三方配送'
            default:
                return ''
            }

        },
        ddlx(input){
            switch (input){
                case 'TSCATERING':
                    return '堂食自助'
                case 'WMCATERING':
                    return '外卖配送'
                default:
                    return ''
            }

        },
        changeMoney(input){
            // console.log(input)
            if(input=='' || input==undefined || input==null){
                return input
            }
            return (input*0.01).toFixed(2)
        },
        changeDistance(input){
            if(input=='' || input==undefined || input==null){
                return input
            }
            if(input<1000){
                return input+' 米'
            }else{
                return (input*0.001).toFixed(3) + ' 千米'
            }
        }   
       
    },
    watch:{
        distribution(newvalue,oldvalue){
            console.log(newvalue)
            if(newvalue=='ZIYING_TAKEOUT'){
                this.psFlag=true
            }else{
                this.psFlag=false;
            }
        },
        // againReleaseCity(newvalue,oldvalue){
        //     console.log(newvalue)
        // }
    },
    created:function() {
        // this.orderId=this.getUrlParam('orderId')
        this.shopId=this.getUrlParam('shopId')
        this.getdata();
    }
});
