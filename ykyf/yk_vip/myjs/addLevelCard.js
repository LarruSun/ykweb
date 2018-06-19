/**
 * Created by Administrator on 2018/3/7
 */
new Vue({
    el:'#addLevelCardBody',
    data:{
        customerId : '',
        backUrl : '',
        isDiyBg : 'false',
        couponList : [],
        formData : {
            'name' : '',
            'backgroundColor' : '#7e95c5',
            'file' : '',
            'activate' : false ,
            'freightFree' : true ,
            'couponId' : '',
            'remark1' : '',
            'remark2' : '',
            'remark3' : '',
            'remark4' : '',
            'remark5' : '',
            'consumeCount' : '',
            'consumeAmount' : '',
            'consumeIntegarl' : '',
            'discount' : '',
            'integral' : ''
        },
        colorList : ['#7e95c5','rgba(184, 206, 52, 0.88)','rgba(123, 63, 37, 0.79)','#2e8965','#4ebc30'],
        avatar : localStorage.getItem('ykyf_avatar'),
        nickName : localStorage.getItem('ykyf_nickName'),
        isDiscount : 1,
        isIntegral : 1,
        isCoupon : 1
    },
    watch : {
        isDiscount() {
            if (!this.isDiscount) {
                this.formData.discount = 10;
            }
        }
    },
    methods:{
        getLevelCard(){
            this.$http.get(pathApi + '/member/toEditMemberCard?memberCardDefinedId=' + this.customerId,{credentials:true}).then(res => {
                if (res.data.type == 'success'){
                    this.couponList = res.data.data.coupons.data.list;
                    let data = res.data.data.memberCardDefined;
                    if (data.backUrl){
                        this.isDiyBg = 'true';
                        this.backUrl = data.backUrl;
                    }else {
                        this.isDiyBg = 'false';
                    }
                    this.formData.name = data.name;
                    this.formData.backgroundColor = data.backgroundColor;
                    this.formData.activate = data.activate;
                    this.formData.freightFree = data.freightFree;
                    this.formData.couponId = data.couponId;
                    this.formData.remark1 = data.remark1;
                    this.formData.remark2 = data.remark2;
                    this.formData.remark3 = data.remark3;
                    this.formData.remark4 = data.remark4;
                    this.formData.remark5 = data.remark5;
                    this.formData.consumeCount = data.consumeCount;
                    this.formData.consumeAmount = data.consumeAmount;
                    this.formData.consumeIntegarl = data.consumeIntegarl;
                    this.formData.discount = data.discount;
                    this.formData.integral = data.integral;
                    this.formData.id = this.customerId;
                    if (!data.discount){
                        this.isDiscount = 0;
                    }
                    if (!data.integral){
                        this.isIntegral = 0;
                    }
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        bindBg(bg) {
            this.formData.backgroundColor = bg;
        },
        bindImg(event) {
            let file = event.target.files;
            if ( file[0] != null ){
                let reader = new FileReader();
                reader.readAsDataURL(file[0]);
                reader.onload = ()=> {
                    this.backUrl = reader.result;
                };
                lrz(file[0]).then(res => {
                    res.file.name = res.origin.name;
                    this.formData.file = res.file;
                })
            }
        },
        addCard() {
            let formData = this.formData;
            if (!formData.name){
                alertErrors("请填写卡名称");
                return
            }
            if (this.isDiscount){
                if (!formData.discount){
                    alertErrors("请填写会员折扣");
                    return
                }
            }
            if (Number(this.formData.discount) < 0 || Number(this.formData.discount) > 10){
                alertErrors("请填写正确的会员折扣");
                return
            }
            if (this.isIntegral){
                if (!formData.integral){
                    alertErrors("请填写赠送积分");
                    return
                }
            }
            if (!formData.remark1 && !formData.remark2 && !formData.remark3 && !formData.remark4 && !formData.remark5 ){
                alertErrors("请填写使用须知");
                return
            }
            // if (!formData.consumeCount && !formData.consumeAmount && !formData.consumeIntegarl ){
            //     alertErrors("请填写完整发放条件");
            //     return
            // }
            if (this.isDiyBg === 'true'){
                if(!formData.file&&this.backUrl==''){
                    alertErrors("请上传封面图片");
                    return
                }
                delete formData.backgroundColor
            }else {
                if(!formData.backgroundColor){
                    formData.backgroundColor="#7e95c5";
                    //alertErrors("请选择封面背景色");
                    //return
                }
                delete formData.file
            }
            let data = new FormData();
            for(let k in formData){
                if( k == 'file'){
                    data.append(k, formData[k], formData[k].name);
                    continue;
                }
                data.append(k , formData[k]);
            }
            this.$http.post(pathApi + '/member/editMemberCardDefined',data,{emulateJSON:true,credentials:true}).then(res => {
                if (res.data.type == 'success'){
                    alertSuccess(res.data.message);
                    setTimeout(()=>{
                        location.href='card_type.html';
                    },500);
                }else {
                    alertErrors(res.data.message);
                }
            })
        }
    },
    created(){
        if (location.search.split('=').length > 1){
            this.customerId = location.search.split('=')[1];
            this.formData.customerId = location.search.split('=')[1];
            this.getLevelCard();
        }else {
            this.$http.get(pathApi + '/member/getCoupons',{credentials:true}).then(res => {
                if (res.data.type == 'success'){
                    this.couponList = res.data.data.coupons.data.list;
                }else {
                    alertErrors(res.data.message);
                }
            })
        }
    }
});