/**
 * Created by xuwei on 2018/3/5.
 */
new Vue({
    el:'#customerDetailsBody',
    filters: {
    },
    data:{
        customerId:'',
        info: {},
        labelList : [],
        labelIds : [],
        cardList : [],
        cardId : '',
        cardName : '',
        payList : [],
        formData : {
            'province' : '',
            'city' : '',
            'area' : ''
        },
        cardNo: '',
        banlanceList : []
    },
    filters : {
        formatDate(date) {
            let newDate = new Date(date);
            return newDate.getFullYear() + '年' + (newDate.getMonth() + 1) + '月' + newDate.getDate() + '日'
        }
    },
    methods:{
        getDetails(){
            this.$http.get(pathApi + '/member/detailMemberCustomerById?id=' + this.customerId ,{credentials: true}).then(res => {
                if(res.data.type=='success'){
                    this.info = res.body.data;
                    this.labelList = res.data.data.labels;
                    let formData = res.body.data.memberCustomer;
                    this.formData.birthday = formData.birthday;
                    this.formData.userName = formData.userName;
                    this.formData.remark = formData.remark;
                    this.formData.id = formData.id;
                    this.formData.sex = formData.sex;
                    this.formData.province = formData.province;
                    this.formData.city = formData.city;
                    this.formData.area = formData.area;
                    $('.province').val(formData.province).trigger("change");
                    $('.city').val(formData.city).trigger("change");
                    $('.area').val(formData.area).trigger("change");
                    this.cardNo = formData.cardNo;
                    this.$http.get(pathApi + '/member/getMemberCustomerLabelRelation?customerId=' + this.customerId,{credentials: true}).then(res => {
                        if(res.data.type == 'success'){
                            this.labelIds = [];
                            for (let i in res.body.data){
                                this.labelIds.push(res.body.data[i].labelId);
                            }
                        }else {
                            alertErrors(res.data.message);
                        }
                    });
                    this.$http.get(pathApi + '/member/getMemberCustomerCard?customerId=' + this.customerId,{credentials: true}).then(res => {
                        if(res.data.type == 'success'){
                            this.cardId = res.data.data[0].id;
                            this.cardName = res.data.data[0].name;
                        }else {
                            alertErrors(res.data.message);
                        }
                    });
                    this.$http.get(pathApi + '/member/queryOrderListByMember?customerId=' + this.customerId,{credentials: true}).then(res => {
                        if(res.data.type == 'success'){
                            this.payList = res.data.data;
                        }else {
                            alertErrors(res.data.message);
                        }
                    });
                    this.$http.get(pathApi + '/member/ListBalancByCardNum?cardNum=' + this.cardNo,{credentials: true}).then(res => {
                        if(res.data.type == 'success'){
                            this.banlanceList = res.data.data;
                        }else {
                            alertErrors(res.data.message);
                        }
                    });
                }
            })
        },
        getCard(){
            this.$http.post(pathApi + "/member/MemberCardDefinedList",{},{emulateJSON:true,credentials: true}).then(res =>{
                if(res.data.type=='success'){
                    this.cardList = res.data.data;
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        addLabel(){
            let formData = new FormData();
            formData.append('labelids', this.labelIds);
            formData.append('customerId', this.customerId);
            this.$http.post(pathApi + '/member/saveMemberCustomerLabel',formData,{credentials: true}).then(res => {
                if(res.data.type == 'success'){
                    alertSuccess(res.data.message);
                    this.getDetails();
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        addVip() {
            let formData = new FormData();
            formData.append('cards', []);
            formData.append('customerId', this.customerId);
            formData.append('levelCard', this.cardId);
            this.$http.post(pathApi + '/member/saveMemberCustomerCard',formData,{credentials: true}).then(res => {
                if(res.data.type == 'success'){
                    alertSuccess(res.data.message);
                    this.getDetails();
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        updateInfo() {
            this.$http.post(pathApi + '/member/editCustomerBasicInformation',this.formData,{emulateJSON:true,credentials: true}).then(res => {
                if(res.data.type == 'success'){
                    alertSuccess(res.data.message);
                    this.getDetails();
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        getLabelName(label) {
            for (let i in this.labelList){
                if (label == this.labelList[i].id){
                    return this.labelList[i].labelName;
                }
            }
        },
        getCardName(label) {
            for (let i in this.cardList){
                if (label == this.cardList[i].id){
                    return this.cardList[i].name;
                }
            }
        }
    },
    created(){
        if (location.search.split('=').length > 1){
            this.customerId = location.search.split('=')[1];
            this.getDetails();
            this.getCard();
        }
    }
});