/**
 * Created by Administrator on 2018/2/27.
 */
new Vue({
    el: "#app",
    data: {
        shopData:{}, //暂存的所有数据
        checked:false,
        user:{}
    },
    methods:{
        getStoreList:function(){
            var pdata = {
                branch_name: $(".branch_name").val()
            }
            console.log(pdata); 
            this.$http.post(cyApi+'/loginIndex',pdata,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(111);
                if(res.body.type=='success'||res.body.type=='SUCCESS') {
                    // shopData = res.body.data;
                    console.log(res.data);
                    if(res.data.data!=null){
                        this.shopData = res.body.data.shops;
                        this.user = res.body.data.user;
                    }

                }
            });
        },
        seach:function(){
            this.getStoreList()
        }
    },
    watch:{

    },
    created:function() {
        this.getStoreList();
    }
});