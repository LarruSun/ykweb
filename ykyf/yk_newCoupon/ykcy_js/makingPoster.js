/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#makingPoster",
    data: {
        dialogImageUrl: '',
        dialogVisible:false,
        posterName:'美宜佳',//海报名称
        introduction:'',//封面简介
        copywrite:'吃货价到，马上点餐优惠折扣，识别就有',//海报文案
        smallroutineQrcode:'',//小程序码
        couponIds:'',//优惠券id集（逗号隔开)
        passPic:'',//海报图
        imgUrl:'../ykcy_images/camera.png',
        id:'',



        wxImgUrl:"../ykcy_images/mbc.png",
        wxNickName:'',
        wxAddressCity:'',
        wxBusinessLogo:'',
        wxselectList:[],

        
        dynamicTags: [],//选中的标签里面的数据
        orderList1:[],//表格内所有内容
        selectId:[],//选中的ID
        cur:1,
        all:5,
        isShow:false
    },
    methods:{
        listen(data){
            this.cur=data;
            this.getDate();
            console.log(this.cur)
        },
        getDate(){
            var obj={};
            obj.statu=1;
            obj.pageNum=this.cur;
            obj.pageSize=8
            this.$http.post(couponApi+'/newcoupon/newcouponSev/get/getCouponListByCondition',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    this.all=res.data.data.pages;
                    this.orderList1=res.data.data.list;
                    console.log(this.orderList1)
                    setTimeout(()=>{
                        //清空所有的勾勾
                        for(var j=0;j<this.orderList1.length;j++){
                            $(".hidden-480 input[type='checkbox']")[j].checked=false;
                        }
                        if(this.selectId.length != 0){
                            var arr=[];
                            for(var i=0;i<this.selectId.length;i++){
                                for(var j=0;j<this.orderList1.length;j++){
                                    if(this.selectId[i]==this.orderList1[j].id){
                                        arr.push(j)
                                    }
                                } 
                            }
                            //吧选中的勾上
                            for(var i=0;i<arr.length;i++){
                                $(".hidden-480 input[type='checkbox']")[arr[i]].checked=true;

                            }                         
                        }
                    },50);
                }else{
                    alertErrors(res.data.message,1000);
                }
            });
        },
        //关闭标签事件
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            for(var i=0;i<this.orderList1.length;i++){
                if(tag==this.orderList1[i].couponsName){
                    $(".hidden-480 input[type='checkbox']")[i].checked=false;
                    this.selectId.splice(i, 1);               
                    this.wxselectList.splice(i, 1);
                    break;
                }
            }
        },
        checks(e,index){
            // var selectDistribution=$(".hidden-480 input[type='checkbox']")[index].checked=true;//选中的内容
            // console.log(selectDistribution);
            if(e.target.checked==true){
                if(this.dynamicTags.length>=4){
                    alertErrors('最多只能选中4条',1000);
                    $(".hidden-480 input[type='checkbox']")[index].checked=false;
                    return;
                }
                this.dynamicTags.push(this.orderList1[index].couponsName);
                this.selectId.push(this.orderList1[index].id);

                var obj={};
                obj.vouchers=this.orderList1[index].vouchers;
                obj.discount=this.orderList1[index].discount;
                obj.couponsType=this.orderList1[index].couponsType;
                this.wxselectList.push(obj);
            }else{
                //循环找下标
                for(var i=0;i<this.dynamicTags.length;i++){
                    //所有数据中的第index个名字等于第i个选中内容的元素则锁定下标进行删除
                    if(this.orderList1[index].couponsName==this.dynamicTags[i]){
                        index=i;
                        break;
                    }
                }
                this.dynamicTags.splice(index, 1);
                this.selectId.splice(index, 1);
                this.wxselectList.splice(index, 1);
            }
        },

        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
        },

        joinyjq(){
            this.getDate()
            $('#joinyhq').modal('show');
        },
        delet(index){
            this.dynamicTags.splice(index, 1);
            this.selectId.splice(index, 1);
            this.wxselectList.splice(index, 1);
        },
        sureSubmit(){
            //检测数据的合理性
            if(this.posterName==''){
                alertErrors('请填写海报名称',1000);
                return;
            };
            if(this.introduction==''){
                alertErrors('请填写封面简介',1000);
                return;
            };
            if(this.selectId.length==0){
                alertErrors('请至少选择优一张惠券',1000);
                return;
            };




            var obj={};
            var str=''
            for(var i=0;i<this.dynamicTags.length;i++){
                str+=this.selectId[i]+','
            }
            str=str.slice(0,str.length-1);
            // console.log(str);
            // console.log(this.selectId);
            var formData = new FormData();
            formData.append('imageFile',this.passPic,this.passPic.name);
                
            formData.append('posterName',this.posterName);
            formData.append('introduction',this.introduction);
            formData.append('smallroutineQrcode',this.smallroutineQrcode);  
            formData.append('copywrite',this.copywrite);   
            formData.append('couponIds',str);





            // obj.imageFile=this.passPic;
            // obj.posterName=this.posterName;
            // obj.introduction=this.introduction;
            // obj.smallroutineQrcode=this.smallroutineQrcode;
            // obj.couponIds=str;
            // obj.copywrite=this.copywrite;
            // // obj.couponIds=str;
            
            // console.log(obj);
            this.$http.post(couponApi+'/web/newcouponWeb/putCouponByPoster',formData,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=="success" || res.data.type=="SUCCESS"){
                    alertSuccess('操作成功',1000);
                    setTimeout(()=>{window.location.href=`listOfPosters.html`;},500)

                }else{
                    alertErrors(res.data.message,1000);
                }
            });


        },
        codeLength(str){
            var l = str.length;
            var blen = 0;
            for(i=0; i<l; i++) {
            if ((str.charCodeAt(i) & 0xff00) != 0) {
                blen ++;
            }
                blen ++;
            }
                return blen        
        },



        //element传图片
        beforeAvatarUpload(file){
            console.log('选择了图片');
            var r=new FileReader();
            r.readAsDataURL(file);
            r.onload=(obj)=>{
                this.imgUrl=obj.target.result;
                this.wxImgUrl=obj.target.result;
            }
            this.passPic=file;//直接把passPic传给后台
            // console.log(file);
        },
        handleRemove(file, fileList) {
            console.log('移除图片')
            this.wxImgUrl="../ykcy_images/mbc.png",
            console.log(fileList);

        },
        lookImg(file) {
            console.log('查看图片')
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //原生传图片
        imageChangeValids(el){//input里面的change事件
            var inputThis=document.getElementById("fileid");
            this.passPic=inputThis.files[0];//直接把passPic传给后台就可以
            this.viewPicture(this.passPic);
        },
        viewPicture(pic){
            if(!pic){
                this.imgUrl='../ykcy_images/camera.png';
                this.wxImgUrl='../ykcy_images/mbc.png';
                return;
            }
            console.log(pic);
            if(pic.type.indexOf('image')<0){
                alertErrors('请选择图片文件', 2000);
                return;
            }
            if(pic.size > 5 * 1024 * 1024){
                alertErrors('图片不能大于5M');
                return;
            }
            var r=new FileReader();
            r.readAsDataURL(pic);
            r.onload=(obj)=>{
                this.imgUrl=obj.target.result;
                this.wxImgUrl=obj.target.result;
            }
        },
        

        
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
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
        posterName(newValue,oldValue){
            if(this.codeLength(newValue)>16){
                alertErrors('不能大于16个字符',1000);
                this.posterName=oldValue;

            }
        },
        introduction(newValue,oldValue){
            if(this.codeLength(newValue)>30){
                alertErrors('不能大于30个字符',1000);
                this.introduction=oldValue;

            }
        },
        copywrite(newValue,oldValue){
            if(this.codeLength(newValue)>36){
                alertErrors('不能大于36个字符',1000);
                this.copywrite=oldValue;
            }
        },
        
    },
    created:function() {
        this.id=this.getUrlParam('id');


        //取二维码
        // this.$http.post(couponApi+'/smallroutine/smallRoutineSet/open/get/getReceiveCenterQrcode',{couponId:this.id},{emulateJSON:true,credentials: true}).then(function(res){
        //     // console.log(res)
        //     if(res.data.type=="success" || res.data.type=="SUCCESS"){
        //         // $('#myModal').modal('show')
        //         this.smallroutineQrcode=res.data.data;
        //         console.log(this.smallroutineQrcode);
        //     }else{
        //         alertErrors(res.data.message,1000);
        //     }
        // });


        //取logo
        if(window.location.href.indexOf('/ykcy/ykcy_index.html') >= 0){
            this.hrefUrl='/ykyf/ykyf_html/server_my.html'
        }
        this.$http.post(cyApi+'/getShopById',{},{emulateJSON:true,credentials: true}).then(function(res){
            if(res.data.type=="success" || res.data.type=="SUCCESS"){
                // console.log(res.data);
                this.wxNickName=res.data.data.nickName;
                this.wxAddressCity=res.data.data.addressCity;
                this.wxBusinessLogo=res.data.data.businessLogo;
                this.isShow=true;
            }else{
                alertErrors(res.data.message,1000);
            }

            // this.user = res.data.data;
        });


        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

    }
});