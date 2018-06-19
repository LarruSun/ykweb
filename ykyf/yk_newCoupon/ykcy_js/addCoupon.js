/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#addCoupon",
    data: {
        startDate:'',
        endDate:'',
        lowestConsume:'',
        vouchers:'',
        searchData:{
                'id':'',
                'couponsName':'',
                'couponsType':'1',//券类型
                'vouchers':0,//面额
                'discount':'',//打几折
                'countNum':'',//券发放数量
                'receiveLimit':'',//没人限领
                'startDate':'',//开始时间
                'endDate':'',//结束时间
                'adaptShop':'0',//使用门店信息
                'foodRange':'0',//适用菜品 
                'useLimit':'1',  //  使用限制1：不可与其他优惠同享   2：可与其他优惠同享
                'lowestConsume':'0'//最小金额使用数量
        },
       id:'',
    },  
    methods:{
        submit(){
            //或区时间数据
            this.searchData.startDate=this.startDate;
            this.searchData.endDate=this.endDate;
          
           
            // 清空代金券或者折扣券数据
            if(this.searchData.couponsType==1){//代金券则清空折扣
                this.searchData.discount='';//清空折扣券
                this.searchData.vouchers=this.vouchers*100;  //面额的获取
            }else if(this.searchData.couponsType==2){//折扣券则清空代金券数据
                this.searchData.vouchers='';//清空传输的数据
                this.vouchers='';//清空页面显示的数据
            }

            //获取最小订单金额限制数据
            if(this.searchData.lowestConsume!=0){
                if(!this.lowestConsume || this.lowestConsume==0){
                    alertErrors('请填写购物满金额',1000);
                    return;
                }
                this.searchData.lowestConsume=this.lowestConsume*100
            }

            //数据类型转换
            if( this.searchData.vouchers!=''){
                this.searchData.vouchers=Number( this.searchData.vouchers)//面额
            }
            this.searchData.countNum=Number( this.searchData.countNum)//发放数量
            this.searchData.receiveLimit=Number( this.searchData.receiveLimit)//没人限领取


            //数据的检测
            if(this.searchData.countNum=='' || this.searchData.receiveLimit=='' || this.searchData.couponsName=='' || this.searchData.startDate=='' || this.searchData.endDate==''){
                alertErrors('请将信息填写完整');
                return;
            }
            if(this.searchData.vouchers=='' && this.searchData.couponsType==1){
                alertErrors('请将信息填写完整');
                return;
            }
            if(this.searchData.discount=='' && this.searchData.couponsType==2   ){
                alertErrors('请将信息填写完整');
                return;
            }
            // console.log(this.searchData.lowestConsume);
            // if(this.searchData.lowestConsume == ''){
            //     alertErrors('请将信息填写完整4');
            //     return;
            // }
          
            //请求的发送
            // console.log(this.searchData);
            // return;
            // var api='http://192.168.20.126:9101';
            // couponApi
            // console.log(api+'/newcoupon/newcouponSev/get/getCouponById');
            this.$http.post(couponApi+'/newcoupon/newcouponSev/edit/saveCoupon',this.searchData,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    alertSuccess('操作成功',1000);
                    setTimeout(()=>{window.location.href=`couponList.html`;},500)
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
        },
        //时间戳转日期
        getDay(input){
            var d = new Date(input);
            var year = d.getFullYear();
            var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth()+1) : '' + (d.getMonth()+1);
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
            var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
            var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
            return year + '-' + month + '-' + day;
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

        //名称的判断
        ['searchData.couponsName'](newvalue,oldvalue){

            if(this.searchData.couponsName.length>30){
                alertErrors('优惠券名称不能超过30个字');
                this.searchData.couponsName=oldvalue;
                return;
            }

        },
        //折扣的判断
        ['searchData.discount'](newvalue,oldvalue){
            if(!this.searchData.discount){
                return
            }
            if(this.searchData.discount>9.9){
                alertErrors('请填写1-9.9之间的数字');
                this.searchData.discount=oldvalue;
                return;
            }
            newvalue=newvalue.toString()
            //大于零小于总金额且只能为两位小数点
            if (newvalue<0 || (newvalue.length - newvalue.indexOf('.')-1>1 && newvalue.indexOf('.')!=-1) ) {
                alertErrors('请输入正确折扣');
                this.searchData.discount=oldvalue
            }
        },
        //面额的判断
        vouchers(newvalue,oldvalue){
            newvalue=newvalue.toString()
            //大于零小于总金额且只能为两位小数点
            if (newvalue<0 || (newvalue.length - newvalue.indexOf('.')-1>2 && newvalue.indexOf('.')!=-1) ) {
                alertErrors('请输入正确的金额');
                this.vouchers=oldvalue
            }
        },
        //发放数量的判断
        ['searchData.countNum'](newvalue,oldvalue){
            if(this.searchData.countNum<0){
                alertErrors('发放数量不能小于0');
                this.searchData.countNum=oldvalue;
                return;
            }
            if(parseInt(newvalue) != newvalue && newvalue != ''){
                alertErrors('发放数量只能为整数');
                this.searchData.countNum=parseInt(oldvalue)
            }
        },
        //没人限只领张数的判断
        ['searchData.receiveLimit'](newvalue,oldvalue){
            if(this.searchData.receiveLimit<0){
                alertErrors('没人限只领张数不能小于0');
                this.searchData.receiveLimit=oldvalue;
                return;
            }
            if(parseInt(newvalue) != newvalue && newvalue != ''){
                alertErrors('没人限只领张数只能为整数');
                this.searchData.receiveLimit=parseInt(oldvalue)
            }
        },
        //没人限只领张数的判断
        ['searchData.receiveLimit'](newvalue,oldvalue){
            if(this.searchData.receiveLimit<0){
                alertErrors('没人限只领张数不能小于0');
                this.searchData.receiveLimit=oldvalue;
                return;
            }
            if(parseInt(newvalue) != newvalue && newvalue != ''){
                alertErrors('没人限只领张数只能为整数');
                this.searchData.receiveLimit=parseInt(oldvalue)
            }
        },
        //购物满的判断
        lowestConsume(newvalue,oldvalue){
            newvalue=newvalue.toString()
            //大于零小于总金额且只能为两位小数点
            if (newvalue<0 || (newvalue.length - newvalue.indexOf('.')-1>2 && newvalue.indexOf('.')!=-1) ) {
                alertErrors('请输入正确的金额');
                this.lowestConsume=oldvalue
            }
        },     
        //开始时间
        startDate(newValue,oldValue){
            //判断是否小于当前日期
            var starTime=new Date(newValue); 
            var nowTime = new Date();
            if(starTime.getMonth()<nowTime.getMonth() ||starTime.getDate()<nowTime.getDate() || starTime.getFullYear()<nowTime.getFullYear()){
                alertErrors('时间不能小于当日',2000);
                this.startDate=oldValue;
                return;
            }
            //判断是否大于开始时间
            starTime=new Date(newValue).getTime(); 
            var  endTime=new Date(this.endDate).getTime(); 
            if(starTime>endTime){
                alertErrors('开始时间必须小于结束时间',2000);
                this.startDate=oldValue;
                return;
            }
        },
        //结束时间
        endDate(newValue,oldValue){
            //判断是否小于当前日期
            var endTime=new Date(newValue);
            var nowTime = new Date();
            if(endTime.getMonth()<nowTime.getMonth() ||endTime.getDate()<nowTime.getDate() || endTime.getFullYear()<nowTime.getFullYear()){
                alertErrors('时间不能小于当日',2000);
                this.endDate=oldValue;
                return;
            }
            //判断是否小于开始时间
            var starTime=new Date(this.startDate).getTime(); 
            endTime=new Date(newValue).getTime(); 
            if(starTime>endTime){
                alertErrors('开始时间必须小于结束时间',2000);
                this.endDate=oldValue;
                return;
            }
        }


    },
    created:function() {
        if(this.getUrlParam('id')){
            this.searchData.id=this.getUrlParam('id');
            this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getCouponById',{couponId:this.getUrlParam('id')},{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    var data=res.data.data;
                    //初始化数据
                    this.searchData=data;//总数据
                    this.startDate=this.searchData.startDate;
                    this.endDate=this.searchData.endDate;
                    this.vouchers=this.searchData.vouchers*0.01;
                    //判断是否是购物满
                    if(this.searchData.lowestConsume!=0){
                        this.lowestConsume=this.searchData.lowestConsume*0.01;
                        this.searchData.lowestConsume=1;
                    }
                }else{
                    alertErrors(res.data.message,1000);
                }
            });
        }

        //时间的初始化化
        var now = new Date().getTime();
        var end=now+ (1000*60*60*24*7);

        this.startDate=this.getDay(now);
        this.endDate=this.getDay(end);

        
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

    }
});