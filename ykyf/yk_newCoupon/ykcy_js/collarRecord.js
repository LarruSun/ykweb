/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#collarRecord",
    data: {

        cur:1,
        all:1,
        orderList:[]
    },
    methods:{
        search: function(){
            this.cur=1;
            var name = this.$refs.keywords.value,
                type = this.$refs.type.value,
                receive = this.$refs.receive.value;
            var data = {
                sequence: name,
                couponsType: type,
                putMethod: receive
            }
            this.getOrderlist(data);
        },
        listen(data){
            this.cur=data
            var name = this.$refs.keywords.value,
            type = this.$refs.type.value,
            receive = this.$refs.receive.value;
            var data = {
                sequence: name,
                couponsType: type,
                putMethod: receive
            }
            this.getOrderlist(data);
            // console.log(this.cur)
        },
        timeChange(n,$event){
        },
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    filters: {

    },
    watch:{
        
    },
    created:function() {
        this.getOrderlist = function(data){
            if(!data){
                var data = {
                    sequence: '',
                    couponsType: '',
                    putMethod: ''
                }
            }
            this.$http.post(
                couponApi+'/newcoupon/newcouponSev/get/getCouponReceiveuseListByCondition',
                {
                    sequence: data.sequence,
                    couponsType: data.couponsType,
                    putMethod: data.putMethod,
                    pageNum: this.cur,
                    pageSize: '8'
                },
                {
                    emulateJSON:true,
                    credentials: true
                }
            ).then(function(res){
                this.orderList = res.data.data.list;
                console.log(res.data.data)
                this.all=res.data.data.pages
            })
        }
        this.getOrderlist();
    }
});