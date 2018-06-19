/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#phonePoster",
    data: {
        
        posterName:'',//海报名称      
        introduction:'',//封面简介
        copywrite:'',//海报文案
        smallroutineQrcode:'',//小程序码
        couponIds:'',//优惠券id集（逗号隔开)
        id:'',

 


        wxImgUrl:"../ykcy_images/mbc.png",
        wxNickName:'',
        wxAddressCity:'',
        wxBusinessLogo:'',
        wxselectList:[],
        isShow:false

    },
    methods:{

    

        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
        },

        

    },


    watch:{

        
    },
    created:function() {
   
        this.id=this.getUrlParam('posterId');
     




        // //取logo
        // if(window.location.href.indexOf('/ykcy/ykcy_index.html') >= 0){
        //     this.hrefUrl='/ykyf/ykyf_html/server_my.html'
        // }
        // this.$http.post(cyApi+'/getShopById',{},{emulateJSON:true,credentials: true}).then(function(res){
        //     // console.log(res.data.data);
        //     this.wxNickName=res.data.data.nickName;
        //     this.wxAddressCity=res.data.data.addressCity;
        //     this.wxBusinessLogo=res.data.data.businessLogo;


        //     // this.user = res.data.data;
        // });

        // 取查看的数据

        this.$http.post(couponApi+'/newcoupon/newcouponSev/open/get/getPosterById',{posterId:this.id},{emulateJSON:true,credentials: true}).then(function(res){
            // alert(res);
            // console.log(res);
            if(res.data.type=="success" || res.data.type=="SUCCESS"){
                var data=res.data.data;
                console.log(data);
                this.posterName=data.posterName;
                this.introduction=data.introduction;
                this.copywrite=data.copywrite;
                this.smallroutineQrcode=data.smallroutineQrcode;
                this.couponIds=data.couponIds;
                this.wxBusinessLogo=data.businessLogo;
                this.wxNickName=data.nickName;

                if(data.image){
                    this.wxImgUrl=data.image;
                }else{
                    this.wxImgUrl='../ykcy_images/mbc.png';

                }
                this.wxselectList=data.couponList;
                this.isShow=true;
                document.title=this.posterName;

            }else{
                alert(res.data.message,1000);
            }
        });
    }

        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

  
});