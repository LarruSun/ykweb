/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#VIP_customerList",
    data: {
        id:'',
        alls:1,
        starTime:'',
        endTime:'',
        inforState:'',
        param: {
            'phone':'',//手机/名称
            'level':'',//等级
            'consumeTimeStart':'',//交易开始时间
            'consumeTimeEnd':'',//(交易结束时间)
            'totalConsumeStart':'',//交易额1
            'totalConsumeEnd':'',//交易额2
            'totalCountStart':'',//交易笔数1
            'totalCountEnd':'',//交易笔数2
            'pageNum':1,//第几页
            'pageSize':5//一页多少条
        },
        orderList:[]
    },
    methods:{
        getData(){
            // console.log(111);
            // var obj=this.param;
            this.param.consumeTimeStart=this.starTime;
            this.param.consumeTimeEnd=this.endTime;
            console.log(this.param);
            this.$http.post(vipApi+'/getMemberCustomerList',this.param,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='success' || res.data.type=='SUCCESS'){
                    var data=res.data.data
                    // console.log(res.data.data)
                    this.alls=data.page;
                    this.orderList=data.memberCustomerList;
                    this.inforState=data.MemberCardDefinedList;
                    // this.inforState.unshift({'name':'全部','level':''});
                    // console.log(this.inforState)
                    // console.log(this.orderList);
                }else{
                    alertErrors(res.data.message);
                }
            });
        },
        search(){
            this.getData();
        },
        gotoXQ(item){
            console.log(item);
            window.location.href=`VIP_details.html?id=${item.id}`
        },
        listen(data){
            this.param.pageNum=data
            this.getData()
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
        data: function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = d.getMonth() + 1 < 10 ? '0' + d.getMonth() : '' + d.getMonth();
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
            var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
            var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        },
    },
    watch:{
        starTime(newValue,oldValue){
            var starTime=new Date(newValue).getTime(); 
            var endTime=new Date(this.endTime).getTime(); 
            if(starTime>endTime){
                alertErrors('开始时间必须小于结束时间',2000);
                this.starTime=oldValue;
                return;
            }
        },

        endTime(newValue,oldValue){
            var starTime=new Date(this.starTime).getTime(); 
            var endTime=new Date(newValue).getTime(); 
            if(starTime>endTime){
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
        // this.starTime=this.getTime(data);
        // this.endTime=this.getTime(data);

      
        
        
    }
});