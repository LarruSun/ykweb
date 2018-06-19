/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#launchList",
    data: {
        id:'',
        shopTf:'',
    },
    methods:{
        //到店领立即发布
        shopSubmit(){
            this.$http.post(couponApi+'/web/newcouponWeb/putCouponByInshop',{couponId:this.id},{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    alertSuccess('操作成功',1000);
                    setTimeout(()=>{window.location.href=`checkList.html?flag=ddlq`;})
                }else{
                    alertErrors(res.data.message,1000);
                }
            });


        },
        sure(){
            location.reload(true);
            $('#myModal').modal('hide')
        },
        checkList(){
           window.open('checkList.html')
        },
        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
        }

    },
    filters: {
    },
    watch:{
        
    },
    created:function() {
        this.id=this.getUrlParam('id');
        this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getPutListByCouponIdAndPutMethod',{couponId:this.id,putMethod:'DAODIANLINGQUAN'},{emulateJSON:true,credentials: true}).then(function(res){
            console.log(res)
            if(res.data.type=="success" || res.data.type=="SUCCESS"){
                this.shopTf=res.data.data;
                console.log(this.shopTf);
            }else{
                alertErrors(res.data.message,1000);
            }
        });
        
    
        // $('#myModals').modal()

    }
});