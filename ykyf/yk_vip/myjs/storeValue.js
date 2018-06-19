/**
 * Created by Administrator on 2018/3/22.
 */
/**
 * Created by Administrator on 2018/2/5.
 */
new Vue({
    el: "#storeValueBody",
    data: {
        list: [],
        form: {
            rechargeDenomination: ''
        }
    },
    methods:{
        getList() {
            this.$http.get(pathApi + '/member/getMemberRechargeDenominationSettings',{emulateJSON:true,credentials: true}).then(res => {
                console.log(res);
                if(res.data.type == 'success') {
                    this.list = res.data.data;
                }
            })
        },
        bindId(val,val1) {
            this.form.id = val;
            this.form.rechargeDenomination = val1;
        },
        save() {
            this.$http.post(pathApi + '/member/editMemberRechargeDenominationSettings',this.form,{emulateJSON:true,credentials: true}).then(res => {
                if(res.data.type == 'success') {
                    alert(res.data.message);
                    this.getList();
                }else  {
                    alert(res.data.message);
                }
            })
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