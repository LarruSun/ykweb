/**
 * Created by xuwei on 2018/3/5.
 */
new Vue({
    el:'#cardTypeBody',
    data:{
        list1 : [],
        list2 : [],
        list3 : []
    },
    methods:{
        getCardType(){
            this.$http.get(pathApi + '/member/memberCardList',{emulateJSON:true,credentials: true}).then(res => {
                if(res.data.type=='success'){
                    let list = res.body.data;
                    for (let key in list){
                        if (list[key].type.typeName == '无门槛卡'){
                            this.list1 = list[key].cards;
                        }else if(list[key].type.typeName == '等级规则卡'){
                            this.list2 = list[key].cards;
                        }else if(list[key].type.typeName == '付费卡'){
                            this.list3 = list[key].cards;
                        }
                    }
                }else {
                    alertErrors(res.data.message);
                }
            })
        }
    },
    created(){
        this.getCardType();
    }
});
