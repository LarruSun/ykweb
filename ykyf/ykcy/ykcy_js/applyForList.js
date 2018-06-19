/**
 * Created by Administrator on 2018/3/13.
 */
new Vue({
    el:"#applyForList",
    data:{
        orderList:[],
        nums:[{name:'全部',num:0,status:''},{name:'申请售后',num:0,status:'applyStatus'},{name:'已审核',num:0,status:'auditStatus'},
               {name:'已完成',num:0,status:'refundOrder'},{name:'审核不通过',num:0,status:'unauditStatus'},{name:'售后取消',num:0,status:'cancelSalStatus'}],
        status:[{status:'applyStatus',status_msg:'申请售后',hclass:'label  label-important'},{status:'auditStatus',status_msg:'已审核',hclass:'label label-warning'},
                 {status:'unrefundStatus',status_msg:'已审核',hclass:'label label-warning'},{status:'unauditStatus',status_msg:'审核不通过',hclass:'label'},
                 {status:'cancelSalStatus',status_msg:'售后取消',hclass:'label label-inverse'},{status:'refundOrder',status_msg:'已完成',hclass:'label label-success'},
        ],
        orderTypes:{WMCATERING:'外卖订单',TSCATERING:'堂食订单'},
        cur: 1,//默认第一页
        all:1,//总页数
        pageSize:10, //每页总条数
        afterSaleType:'all',  //售后申请类型（查询）
        channelName:'all',  //渠道(查询)
        orderNo:'',  //售后编号
        orderStatus:'', //售后状态
        listTot:0,
        shopId:location.href.split("=")[1]
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        getInitData:function(create){
            var _this=this;
            var obj={
                page: _this.cur,//默认第一页
                pageSize:_this.pageSize, //每页总条数
                // afterSaleType:_this.afterSaleType,  //售后申请类型（查询）
                // channelName:_this.channelName,  //渠道(查询)
                orderNo:_this.orderNo,  //售后编号
                orderStatus:_this.orderStatus, //售后状态
                shopId:this.shopId
            }
            console.log(obj);
            this.$http.post(cyApi+'/get/afterSaleOrdersByShopId',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    this.orderList=res.data.data.orderList;
                    //this.all = res.data.data.count;
                }
            });
            this.$http.post(cyApi+'/get/afterNumsOrderByShop',{"shopId":this.shopId},{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    for(var i=0;i<this.nums.length;i++){
                        this.nums[i].num=res.data.data['num'+i];
                    }
                    if(create){
                        this.all = Math.ceil(this.nums[0].num/this.pageSize);
                    }
                }
            });
        },
        handleData:function(statu){
             for(var i=0;i<this.status.length;i++){
                 if(statu==this.status[i].status){
                     return this.status[i];
                 }
            }
        },
        listen:function (data) {  //分页
            console.log(data);
            this.cur = data;
            this.getInitData(false);
        },
        seachByStatus:function(item){
            this.orderStatus=item.status;
            this.cur = 1;
            this.listTot=item.num;
            this.all=Math.ceil(this.listTot/this.pageSize);
            this.getInitData(false);
        }
    },
    created:function(){
        this.getInitData(true);
    },
    mounted:function(){

    },
    filters: {
        data:function (input) {
            let date = new Date(input);
            Y = date.getFullYear() + '-';
            M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
            D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        }

    },
    watch:{


    }

})