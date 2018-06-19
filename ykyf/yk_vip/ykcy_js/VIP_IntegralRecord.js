/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#VIP_IntegralRecord",
    data: {
        startTime:'',
        endTime:'',
        searchData: {
            'startTime': '',//开始时间
            'endTime': '',//结束时间
            'userId':'',//操作人员
            'cardNo':'',//卡号
            'pageNum':'',//第几页
            'pageSize':8//一页多少条
        },
        cur:1,
        all:8,
        orderList:[],
        orderSM:[]//操作说明

    },
    methods:{
        getData(){
          
            // this.searchData.pageSize=this.all;

            // console.log(this.searchData);
            // return;


            this.$http.post(vipApi+'/getIntegralRecordList',this.searchData,{emulateJSON:true,credentials: true}).then(function(res){
                // console.log(res.data.data);
                if(res.data.type=='success' || res.data.type=='SUCCESS'){

                    var data=res.data.data;
                    // console.log(data);
                    this.all=data.page;
                    // console.log(res.data.data)
                    this.alls=data.page;
                    this.orderSM=data.userIdUserNameList;    
                    this.orderList=data.memberIntegralRecordList;


                    for(var i=0;i<this.orderList.length;i++){
                        for(var j=0;j<this.orderSM.length;j++){
                            // console.log(this.orderSM[j].userId);
                            if(this.orderList[i].userId==this.orderSM[j].userId){
                                this.orderList[i].name=this.orderSM[j].userName
                            }
                        }
                    }
                    // console.log(this.orderList);    
                    // console.log(this.orderList)
                                 
                }else{
                    alertErrors(res.data.message);
                }
            });
        },
        search(){
            this.searchData.startTime=this.startTime;
            this.searchData.endTime=this.endTime;
            this.searchData.pageNum='';
            this.getData();
        },
        listen(data){
            this.cur=data;
            this.searchData.pageNum=data;
            console.log(this.searchData);
                this.getData();
            // console.log(this.cur)
        },
        getTime(d){
            // var d = new Date(value);
            var year = d.getFullYear();
            var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1): '' + d.getMonth() + 1;
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();          
            return year + '-' + month + '-' + day;
        },

    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    filters: {
        // data: function (input) {
        //     var d = new Date(input);
        //     var year = d.getFullYear();
        //     var month = d.getMonth() + 1 < 10 ? '0' + d.getMonth() : '' + d.getMonth();
        //     var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        //     var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
        //     var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
        //     var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
        //     return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        // },

        orders(input,data){
            console.log(input);
            console.log(data)
            // console.log(this.orderList)

            return input
        }
    },
    watch:{
        startTime(newValue,oldValue){
            var startTime=new Date(newValue).getTime(); 
            var endTime=new Date(this.endTime).getTime(); 
            if(startTime>endTime){
                alertErrors('开始时间必须小于结束时间',2000);
                this.startTime=oldValue;
                return;
            }
        },

        endTime(newValue,oldValue){
            var startTime=new Date(this.startTime).getTime(); 
            var endTime=new Date(newValue).getTime(); 
            if(startTime>endTime){
                alertErrors('开始时间必须小于结束时间',2000);
                this.endTime=oldValue;
                return;
            }
        }
    },
    created:function() {
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

        this.getData();
        //初始化时间
        // var data=new Date();
        // this.startTime=this.getTime(data);
        // this.endTime=this.getTime(data);

    }
});