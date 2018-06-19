/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#lookPoster",
    data: {
        
        posterName:'',//海报名称      
        introduction:'',//封面简介
        copywrite:'',//海报文案
        smallroutineQrcode:'',//小程序码
        couponIds:'',//优惠券id集（逗号隔开)
        imgUrl:'',
        id:'',
        dynamicTags: [],//优惠券数据

 


        wxImgUrl:"../ykcy_images/mbc.png",
        wxNickName:'',
        wxAddressCity:'',
        wxBusinessLogo:'',
        wxselectList:[],

        isShow:false,

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
        this.id=this.getUrlParam('id');



        // 取查看的数据

        this.$http.post(couponApi+'/newcoupon/newcouponSev/open/get/getPosterById',{posterId:this.id},{emulateJSON:true,credentials: true}).then(function(res){
            console.log(res)
            if(res.data.type=="success" || res.data.type=="SUCCESS"){
                var data=res.data.data;
                
                this.posterName=data.posterName;
                this.introduction=data.introduction;
                this.copywrite=data.copywrite;
                this.smallroutineQrcode=data.smallroutineQrcode;
                this.couponIds=data.couponIds;


                this.wxBusinessLogo=data.businessLogo;
                this.wxNickName=data.nickName;
                // if()
                if(data.image){
                    this.imgUrl=data.image;
                    this.wxImgUrl=data.image;
                }else{
                    this.wxImgUrl='../ykcy_images/mbc.png';
                }

                this.wxselectList=data.couponList
                this.isShow=true;


            }else{
                alertErrors(res.data.message,1000);
            }
        });
    }

        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

  
});