/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#addCoupon",
    data: {
        id:'',//id
        integer:'',//所需积分
        startDate:'',
        endDate:'',
        exchangeLimit:'1'//兑换期限 1：无限期；2：限期
    },
    methods:{
        sureSubmit(){
  
            if(!this.integer || this.integer==0){
                alertErrors('请填写正确的积分');
                return;
            }
            var obj={};
            obj.couponId=this.id;
            obj.integer=this.integer;
            obj.exchangeLimit=this.exchangeLimit;
            if(this.exchangeLimit==2){
                obj.startDate=this.startDate;
                obj.endDate=this.endDate;
            }
            console.log(obj);
            console.log(couponApi+'/web/newcouponWeb/putCouponByIntegral')
            // return;
            this.$http.post(couponApi+'/web/newcouponWeb/putCouponByIntegral',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    alertSuccess('操作成功');
                    setTimeout(()=>{ 
                        window.location.href=`checkList.html?flag=jfyh`;
                    },500)
                }else{
                    alertErrors(res.data.message,1000);
                }
            });
        },
        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
        }

    },
    components: {   //分页
    },

    watch:{
        integer(newValue,oldValue){
            if(newValue<0){
                alertErrors('积分必须大于零');
                this.integer=oldValue;
            }
        },
        startDate(newValue,oldValue){
            var startDate=new Date(newValue).getTime(); 
            var endDate=new Date(this.endDate).getTime(); 
            if(startDate>endDate){
                alertErrors('开始时间必须小于结束时间',2000);
                this.startDate=oldValue;
                return;
            }
        },

        endDate(newValue,oldValue){
            var startDate=new Date(this.startDate).getTime(); 
            var endDate=new Date(newValue).getTime(); 
            if(startDate>endDate){
                alertErrors('开始时间必须小于结束时间',2000);
                this.endDate=oldValue;
                return;
            }
        }




    },
    created:function() {
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);
        this.id=this.getUrlParam('id');

    }
});