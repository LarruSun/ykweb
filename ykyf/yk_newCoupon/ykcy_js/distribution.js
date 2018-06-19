/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#distribution",
    data: {
        couponId:'',
        cardNO:'',//会员卡号
        useStatu:'',//状态 0:未使用  1:已使用
        sequence:'',//序列码
        couponsType:'',
        putMethod:'',//领取渠道(该字段同附上的注释说明)
        pageNum:'',
        pageSize:'',
        cur:1,
        all:1,
        orderList:[],
        quanOrder:[],
        user:''
    },
    methods:{
        getDatta(){
            var obj={};
            obj.couponId=this.couponId;
            obj.cardNO=this.cardNO;
            obj.useStatu=this.useStatu;
            obj.sequence=this.sequence;
            obj.couponsType=this.couponsType;
            obj.putMethod=this.putMethod;
            obj.pageNum=this.cur;
            obj.pageSize=8;

            
            this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getCouponReceiveuseListByCondition',obj,{emulateJSON:true,credentials: true}).then(function(res){
                // console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    var data=res.data.data;
                    this.all=data.pages;
                    this.orderList=data.list;
                }else{
                    alertErrors(res.data.message,1000);
                }
            });

        },


        listen(data){
            this.cur=data;
            this.getDatta();

        },
        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
        },
        search(){
            this.cur=1
            this.getDatta();
        }

    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    filters: {
        putMethodFilter(value){
            var obj={
                "DAODIANLINGQUAN":"到店领券",
                "HUIYUANSONGQUAN":"会员送券",
                "JIFENDUIQUAN":"积分兑券",
                "HAIBAOLINGQUAN":"海报领券"
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
        
    },
    created:function() {
        this.couponId=this.getUrlParam('id');
        console.log(this.couponId);

        //获取列表数据
        this.getDatta();
        //查询优惠券的信息
        var obj={};
        obj.couponId=this.couponId;
        this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getCouponById',obj,{emulateJSON:true,credentials: true}).then(function(res){
            // console.log(res)
            if(res.data.type=="success" || res.data.type=="SUCCESS"){
                this.quanOrder=res.data.data;
            }else{
                alertErrors(res.data.message,1000);
            }
        });


    }
});