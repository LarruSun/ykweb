/**
 * Created by xuwei on 2018/4/16.
 */
new Vue({
    el: "#main-container",
    data: {
        list : [],
        foodList: [],
        foodListId: [],
        menuId: ''
    },
    methods:{
        getBill:function(id){
            this.menuId = id;
            this.$http.post(ceshiApi+'getCyMenuFoodByMenuId',{'cyMenuId': id},{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='success'){
                    let data = res.data.data;
                    let list = [];
                    for(let i = 0; i < data.length; i++) {
                        list.push(data[i].foodDefineId);
                    }
                    this.foodListId = list;
                }else {
                    alertErrors(res.data.message);
                }
            });
        },
        save:function(){
            let foodListId = '';
            if (this.foodListId.length == 0) {
                foodListId = '';
            }else if(this.foodListId.length == 1) {
                foodListId = this.foodListId[0];
            }else {
                foodListId = this.foodListId.join(',');
            }
            this.$http.post(ceshiApi + 'upCyMenuFood',{'cyMenuId' : this.menuId,'foodIds' : foodListId},{emulateJSON:true,credentials: true}).then(function(res){
                if (res.data.type == 'success') {
                    alertSuccess(res.data.message);
                    this.getList();
                    $('#myModal_EditMenu').modal('hide');
                }else {
                    alertErrors(res.data.message);
                }
            });
        },
        getList() {
            this.$http.post(ceshiApi+'cyMenuList',{shopId:this.shopId},{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='success'){
                    this.list = res.data.data.cyMenuList;
                }
            });
        },
        getFood() {
            this.$http.post(ceshiApi+'getCyFoodAndFoodTypeForShopId',{shopId:this.shopId},{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='success'){
                    this.foodList = res.data.data.cyFoodTypeList;
                }
            });
        }
    },
    filters: {
        data: function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        },
        getNum:function(typeids){
            if(null==typeids)
                return 0;
            else
                return typeids.split(",").length;

        },
    },
    created:function() {
        let param = window.location.search;
        if (param.indexOf('shopId') >= 0) {
            this.shopId = param.split("=")[1];
            this.getList();
            this.getFood();
        }
    }
});
