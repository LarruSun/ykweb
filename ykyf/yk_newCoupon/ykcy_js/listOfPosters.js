/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#listOfPosters",
    data: {
        couponName:'',
        id:'',
        cur:1,
        all:1,
        orderList:[],
        ewmImg:'',
        ewmUrl:'',
        smallroutineQrcode:'',
        qrcode:'',
        //券详情的数据
        orderList1:[],
        posterName1:'',
    },
    methods:{
        listen(data){
            this.cur=data
            console.log(this.cur);
            var obj={};
            obj.posterName=this.couponName
            obj.pageNum=this.cur;
            obj.pageSize=8;
            this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getPosterListByCondition',obj,{emulateJSON:true,credentials: true}).then(function(res){
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
        search(){
            var obj={};
            obj.posterName=this.couponName
            obj.pageNum=1;
            obj.pageSize=8;
            this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getPosterListByCondition',obj,{emulateJSON:true,credentials: true}).then(function(res){
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
        //更改海报状态
        changeState(state){
            console.log(state);
            var obj={};
            obj.posterId=this.id;
            obj.statu=state;


            this.$http.post(couponApi+'/newcoupon/newcouponSev/edit/editPosterStatu',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    alertSuccess('操作成功');
                    location.reload(true);    
                }else{
                    alertErrors(res.data.message,1000);
                }
            });

        },
        //查看券详情
        quanXQ(id){
            this.$http.post(couponApi+'/newcoupon/newcouponSev/open/get/getPosterById',{posterId:id},{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    var data=res.data.data;
                    this.posterName1=data.posterName;

                    this.orderList1=data.couponList


                }else{
                    alertErrors(res.data.message,1000);
                }
            });
        },
        //点击查看二维码
        lookEwm(item){
      
            this.smallroutineQrcode=item.smallroutineQrcode
            this.qrcode=item.qrcode

            console.log(this.qrcode);
          
            $('#qrcodeTable').html(""); 
            jQuery('#qrcodeTable').qrcode({
                render   : "canvas",
                text	: this.qrcode,
                width: 200,  
                height: 200,
                typeNumber: -1,            
                correctLevel: QRErrorCorrectLevel.M,
                background: "#ffffff",    
                foreground: "#000000",    
                src: './../ykcy_images/logo_new2.png'   
            });
            
            
            var canvas = $('#qrcodeTable').find("canvas").get(0);
            console.log(canvas);  
            try {//解决IE转base64时缓存不足，canvas转blob下载  
                var blob = canvas.msToBlob();  
                navigator.msSaveBlob(blob, 'qrcode.jpg');  
            } catch (e) {//如果为其他浏览器，使用base64转码下载  
                    var url = canvas.toDataURL('image/jpeg');  
                    $("#downloadewm").attr('href', url);  
            }  

        },
        // 复制
        copyUrl(){
            var v1 = $('#imgUrlInput').select();
            document.execCommand("Copy"); // 执行浏览器复制命令
            alertSuccess("二维码连接已复制好，可贴粘。");
        },
 

    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
  
    watch:{
        
    },
    created:function() {
        var obj={};
        obj.posterName=this.couponName
        obj.pageNum=this.cur;
        obj.pageSize=8
        this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getPosterListByCondition',obj,{emulateJSON:true,credentials: true}).then(function(res){
            // console.log(res)
            if(res.data.type=="success" || res.data.type=="SUCCESS"){
                var data=res.data.data;
                this.all=data.pages;
                this.orderList=data.list;
            }else{
                alertErrors(res.data.message,1000);
            }
        });

    }
});