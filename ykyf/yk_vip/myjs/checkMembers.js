/**
 * Created by xuwei on 2018/3/9.
 */
new Vue({
    el:'#checkMembersBody',
    data:{
        carddefinedId : '',
        cardList : [],
        list : [],
        phone : '',
        pageNum : 1,
        pageSize : 10,
        cur : 1,
        all : ''
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        getList() {
            this.$http.get(pathApi + '/member/memberCustomerListManagerByCarddefinedId' + this.getParam(),{credentials:true}).then(res => {
                if (res.data.type == 'success'){
                    this.list = res.data.data.memberCustomerList;
                    this.all = res.data.data.page;
                    this.cardList = res.data.data.cards[0].cards;
                }else {
                    alertErrors(res.data.message)
                }
            })
        },
        listen(val) {
            this.cur = val;
            this.pageNum = val;
            this.getList();
        },
        search(){
            this.pageNum = 1;
            this.getList();
        },
        getParam() {
            let arr = [];
            let param = {
                'carddefinedId' : this.carddefinedId,
                'pageNum' : this.pageNum,
                'pageSize' : this.pageSize,
                'phone' : this.phone
            };
            for (let k in param){
                if (param[k]){
                    arr.push(k + '=' + param[k])
                }
            }
            if (arr.length > 0){
                return '?' + arr.join('&');
            }else {
                return ''
            }
        },
    },
    created(){
        if (location.search.split('=').length > 1){
            this.customerId = location.search.split('=')[1];
            this.carddefinedId = location.search.split('=')[1];
            this.getList();
        }
    }
});