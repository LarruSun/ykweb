/**
 * Created by xuwei on 2018/3/1.
 */
new Vue({
    el:'#appBody',
    data:{
        list : [],
        cardList : [],
        formData : {
            'sex' : '男',
            'isVIP' : 0
        },
        customerId : '',
        cardId : [],
        param: {
            'platformCode': '',
            'isVIP' : '',
            'phone' : '',
            'pageNum' : 1,
            'pageSize' : 10
        },
        cur : 1,
        all : ''
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination,
    },
    methods:{
        getInitData(){
            this.$http.post(pathApi + "/member/memberCustomerListManager" + this.getParam(), {},{emulateJSON:true,credentials: true}).then(res =>{
                if(res.data.type=='success'){
                    if (res.data.data){
                        this.list = res.data.data.memberCustomerList;
                        this.all = res.data.data.page;
                    }
                }else {
                    alertErrors(res.data.message);
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
        addClient(){
            this.$http.post(pathApi + '/member/addMemberCustomer',this.formData,{emulateJSON:true,credentials: true}).then(res => {
                if(res.data.type == 'success'){
                    this.formData = {};
                    this.getInitData();
                    alertSuccess(res.data.message);
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        search(){
            this.param.pageNum = 1;
            this.cur = 1;
            this.getInitData();
        },
        listen(val) {
            this.cur = val;
            this.param.pageNum = val;
            this.getInitData();
        },
        getParam() {
            let arr = [];
            for (let k in this.param){
                if (this.param[k]){
                  arr.push(k + '=' + this.param[k])
                }
            }
            if (arr.length > 0){
                return '?' + arr.join('&');
            }else {
                return ''
            }
        }
    },
    created(){
        this.getInitData();
        this.getCard();
    }
});