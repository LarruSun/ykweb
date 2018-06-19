/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#couponOrder",
    data: {
       id:'',
       orderList:[],
       flag:''
    },
    methods:{
        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
         }

    },
    components: {   //分页
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
        
    },
    created:function() {
        this.id=this.getUrlParam('id');
        this.flag=this.getUrlParam('flag');
        // console.log(this.flag);
        // console.log(this.id);
        var obj = {};
        obj.couponId=this.id;
        // console.log(obj)
        this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getCouponById',obj,{emulateJSON:true,credentials: true}).then(function(res){
            console.log(res)
            if(res.data.type=="success" || res.data.type=="SUCCESS"){
                var data=res.data.data;
                // this.all=data.pages;
                this.orderList=data;
                console.log(this.orderList);
            }else{
                alertErrors(res.data.message,1000);
            }
        });
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

    }
});