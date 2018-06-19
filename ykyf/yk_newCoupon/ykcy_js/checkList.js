/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#checkList",
    data: {
        cur:1,
        all:5,
        orderList: [],
        flag:'',
        putId:'',
        integerExchangeId:'',
        startTime:'',
        endTime:'',

        putMethod:{
            'ddlq':'DAODIANLINGQUAN',
            'hysq':'HUIYUANSONGQUAN',
            'jfyh':'JIFENDUIQUAN',
        }
    },
    methods:{
        search: function(){
            var name = this.$refs.keywords.value,
                startDate = this.$refs.startDate.value,
                endDate = this.$refs.endDate.value,
                type = this.$refs.type.value,
                stauts = this.$refs.status.value;
            console.log(this)
            var data = {
                name: name,
                startDate: startDate,
                endDate: endDate,
                type: type,
                stauts: stauts,
                pageNum: 1,
                pageSize: '8'
            }
            this.getOrderlist(data);
        },
        getData: function(item){
           this.putId = item.putId;
           this.integerExchangeId = item.integerExchangeId;
        },

        alertSuccess: function(e){
            var api='';
            var obj={};
          
            if(this.flag =="jfyh"){
                api=couponApi +'/newcoupon/newcouponSev/edit/updateIntegralExchangeStatu'//积分
                obj.integerExchangeId=this.integerExchangeId
                obj.statu=2
            }else{
                api = couponApi+'/newcoupon/newcouponSev/edit/editPutStatu'
                obj.putId=this.putId
                obj.statu=2
            }

            
            // console.log(obj);
        
            this.$http.post(
                api,
                obj,
                {
                    emulateJSON:true,
                    credentials: true
                }
            ).then(function(res){
                console.log(res)
                if(res.data.type == 'success'){
                    location.reload(true);
                    // this.getOrderlist();
                }
            })
        },
        listen(data){
            this.cur=data;
            this.getOrderlist();
            // console.log(this.cur)
        },
        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
         }
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    filters: {
        judge: function(val){
            if(val == null){
                return 0
            }else{
                return val
            }
        },
        putMethodFilter(value){
            var obj={
                "ddlq":"到店领券",
                "hysq":"会员送券",
                "jfyh":"积分兑券",
                "hblq":"海报领券"
            }
            for(var key in obj){
                if(value==key){
                    return obj[key];
                }
            }

            return value;
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
        this.flag=this.getUrlParam('flag');
        var api='';
        if(this.flag =="jfyh"){
            api=couponApi +'/newcoupon/newcouponSev/get/getCouponIntegralPutList'//积分
        }else{
            api = couponApi+'/newcoupon/newcouponSev/get/getCouponPutList'
        }
        console.log(api);

        this.getOrderlist = function(data){
            if(!data){
                var data = {
                    name: '',
                    startDate: '',
                    endDate: '',
                    type: '',
                    stauts: ''
                }
            }
            this.$http.post(
                api,
                {
                    couponsName: data.name,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    couponsType: data.type,
                    putMethod: this.putMethod[this.flag],
                    statu: data.stauts,
                    pageNum: this.cur,
                    pageSize: '8'
                },
                {
                    emulateJSON:true,
                    credentials: true
                }
            ).then(function(res){
                console.log(res);
                this.orderList = res.data.data.list;
                this.all=res.data.data.pages;
                console.log(res.data.data.list)
            })
        }
        this.getOrderlist();
 
        // console.log(this.getUrlParam('flag'))
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);
    }
});