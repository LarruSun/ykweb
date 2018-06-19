/**
 * Created by xuwei on 2018/3/5.
 */
new Vue({
    el:'#getRecordBody',
    filters:{
        formartDate(val){
            let date = new Date(val);
            return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
        },
        status(val){
            let list = { '-1' : '已删除' , '0' : '未激活' , '1' : '正在使用'};
            return list[val];
        }
    },
    data:{
        list : [],
        pageNum : 1,
        pageCount : '',
        cardName : '',
        cur : 1,
        all : ''
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        findMembers(){
            this.$http.get(pathApi + '/member/findMembers' + this.getParam(),{credentials: true}).then(res => {
                if(res.data.type=='success'){
                    this.all = res.body.data.page;
                    this.list = res.body.data.members;
                }
            })
        },
        listen(val) {
            this.cur = val;
            this.pageNum = val;
            this.findMembers();
        },
        search() {
            this.findMembers();
        },
        getParam() {
            let arr = [];
            let param = {
                'pageNum' : this.pageNum,
                'cardName' : this.cardName
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
        }
    },
    created(){
        this.findMembers();
    }
});
