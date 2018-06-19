/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#couponList",
    data: {
        startTime:"",
        endTime:'',
        searchData: {
            'couponsName':'',
            'couponsType':'',
            'putStatu':'',//券状态	
            'startDate':'',
            'endDat':'',
            'statu':'',//券状态    
            'pageNum':1,
            'pageSize':8,
        },
        cur:1,
        all:5,
        orderList:[],
        id:'',

    },
    methods:{
        getData(){
            console.log(this.searchData);
            //   var api='http://192.168.20.126:9101';
            this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getCouponListByCondition',this.searchData,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    var data=res.data.data;
                    this.all=data.pages;
                    this.orderList=data.list;
                    // console.log(this.orderList);
                }else{
                    alertErrors(res.data.message,1000);
                }
            });
        },


        search(){
            this.searchData.startDate=this.startDate;
            this.searchData.endDat=this.endDat;
            this.searchData.pageNum=1;//清空页码
            this.getData();
        },
        listen(data){
            this.searchData.pageNum=data;
            this.getData();
        },
        //确定删除和作废
        suerDelet(state){
            var obj={};
            obj.couponId=this.id;
            obj.statu=state;//2：作废操作  3：删除操作
            console.log(obj)
            this.$http.post(couponApi+'/newcoupon/newcouponSev/edit/updateCouponStatu',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    alertSuccess('操作成功');
                    setTimeout(()=>{ location.reload(true);},1000)
                }else{
                    alertErrors(res.data.message,1000);
                }
            });
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
        this.getData();

       
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

    }
});