/**
 * Created by Administrator on 2018/3/22.
 */
/**
 * Created by Administrator on 2018/2/5.
 */
new Vue({
    el: "#balanceRecordBody",
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    filters:{
        formartDate(val){
            let date = new Date(val);
            return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
        },
    },
    data: {
        list: [],
        cur : 1,
        all : '',
        userName: '',
        tradeTypeCode: '',
        tradeType: '',
        endTime: '',
        startTime: ''
    },
    methods:{
        getList(){
            function formartDate(val){
                if (val) {
                    let date = new Date(val);
                    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                }
            }
            let startTime = formartDate(this.startTime) || '';
            let endTime = formartDate(this.endTime) || '';
            this.$http.post(pathApi + '/member/listBalancByCarNoList',{'pageNum':this.cur,'tradeTypeCode' : this.tradeTypeCode,'tradeType' : this.tradeType,"userName": this.userName,"startTime" : startTime,'endTime': endTime},{emulateJSON:true,credentials: true}).then(res => {
                if(res.data.type == 'success') {
                    this.list = res.data.data.list;
                    this.all = res.data.data.pageCount;
                }
            })
        },
        listen(val) {
            this.cur = val;
            this.getList();
        }
    },
    watch:{

    },
    created:function() {
        this.getList();
    },
    mounted:function(){
    }
});