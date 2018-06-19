/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#sendingCoupons",
    data: {
        couponId:'',
        lever:'-1',
        cardNOs:'',//投放的卡号
        cardNo:'',//搜索的卡号
        inforData:[],//会员等级信息
        carData:[],//搜索出来的卡信息,
        selectCarData:[],
        data: [
            {'key':1,'label':'123','disabled':false},
            {'key':2,'label':'1234','disabled':false},
            {'key':3,'label':'125','disabled':false},
            {'key':4,'label':'1236','disabled':false},
            {'key':5,'label':'1237','disabled':false},
        
        ],
        // value1:[]
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
        this.couponId=this.getUrlParam('id');
        this.$http.post(couponApi+'/web/newcouponWeb/getMemberCardLeverList',{couponId:this.id},{emulateJSON:true,credentials: true}).then(function(res){
            console.log(res)
            if(res.data.type=="success" || res.data.type=="SUCCESS"){
                this.inforData=res.data.data.list;
                console.log(this.inforData);
            }else{
                alertErrors(res.data.message,1000);
            }
        });
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

    },
    methods:{
        search(){
       
            var obj={};
            obj.cardNo=this.cardNo;
        
            // console.log(this.cardNo);
            this.$http.post(couponApi+'/web/newcouponWeb/getCardNoList',obj,{emulateJSON:true,credentials: true}).then(function(res){
                // console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    //判断是否有数据
                    if(res.data.data){
                        this.carData=res.data.data;
                        //数据组装
                        for(var i=0;i<this.carData.length;i++){
                            this.carData[i].label=this.carData[i].cardNO;
                            this.carData[i].key=i;
                            this.carData[i].disabled=false;
                        }
                        console.log(this.carData);
                    }else{
                        alertErrors(res.data.message,1000);
                    }
                }else{
                    alertErrors(res.data.message,1000);
                }
            });
        },

        sureSend1(){
            // console.log(this.lever);
            var obj={};
            obj.lever=this.lever;
            obj.couponId=this.couponId;
            console.log(obj);
            this.$http.post(couponApi+'/web/newcouponWeb/putCouponByMember',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    alertSuccess('操作成功',1000);
                    setTimeout(()=>{ 
                        window.location.href=`checkList.html?flag=hysq`;
                    },500)
                }else{
                    alertErrors(res.data.message,1000);
                }
            });
        },

        sureSend2(){
            var obj={};
            obj.couponId=this.couponId;
            console.log(this.selectCarData);
            var str='';
            for(var i=0;i<this.selectCarData.length;i++){
                var index=this.selectCarData[i];
                str += this.carData[index].cardNO +','
            }
            str=str.slice(0,str.length-1);
            obj.cardNOs=str;
  
            this.$http.post(couponApi+'/web/newcouponWeb/putCouponByMember',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    alertSuccess('操作成功',1000);
                    setTimeout(()=>{ 
                        window.location.href=`checkList.html?flag=hysq`;
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
    }
});