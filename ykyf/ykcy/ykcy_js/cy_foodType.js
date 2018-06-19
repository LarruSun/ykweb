/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#main-container",
    data: {
        types:{},//暂存的所有数据
        checked:false,
        shopId:location.href.split("=")[1],
        typeId:'',
        type:{},
        foods:{},
        cur: 1,//默认第一页
        all:1,//总页数
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        listen: function (data) {  //分页
            // console.log(data)
            this.cur = data;
            this.getStoreList(data)
        },
        getStoreList:function(page){
            if(page==undefined){
                page=1;
            }
            var pdata = {
                page:page,
                typeName:$(".seachName").val(),
                shopId:this.shopId
            }
            console.log(pdata);
            this.$http.post(cyApi+'/get/listFoodTypesByShopId',pdata,{emulateJSON:true,credentials: true}).then(function(res){
                //分页没做
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    this.types = res.body.data.types;
                    this.all=res.body.data.pageAll;
                }
            });
        },
        seach:function(){
            this.getStoreList(1);

        },
        getTypeFoods:function(id){
            var data=this.getDataById(id);
            this.$http.post(cyApi+'/get/listFoodsByTypeId',{"typeId":id},{emulateJSON:true,credentials: true}).then(function(res){

                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    this.foods = res.body.data.foods;
                }
            });
        },
        getthis:function(id){
            var data=this.getDataById(id);
            this.type = data;
            $(".editName").val(data.name);
            $(".editDescript").val(data.descript);
            $(".editTypesort").val(data.typesort);
            this.typeId = data.id;
            console.log(data)
        },
        getNum:function(e){
            var num = $(e.target).val();
            if(num>999)
                num=999;
            else if(num<1)
                num=1;
            else if(num=='e')
                num=999;
            else
                num=num;
            $(e.target).val(num) ;
        }
        ,
        getDataById:function(id){
            for(var i=0;i<this.types.length;i++){
                if(id==this.types[i].id){
                    return this.types[i];
                }
            }
        },
        editFoodSort:function(){
            var foodds = [];
            for(var i=0;i<this.foods.length;i++){
               var obj = {};
               obj.id=this.foods[i].id;
               obj.attr1 = 1>this.foods[i].attr1?1:this.foods[i].attr1>999?999:this.foods[i].attr1=='e'?999:this.foods[i].attr1;
               foodds.push(obj);
            }
            this.$http.post(cyApi+'/edit/foodDefineSort',{"foods":JSON.stringify(foodds)},{emulateJSON:true,credentials: true}).then(function(res){

                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    location.reload(true)
                }
            });
        },
        addFoodType:function () {
            var addData = {
                name:$(".addName").val(),
                shopId:this.shopId,
                descript:$(".addDescript").val(),
                typesort:$(".addTypesort").val()
            }
            console.log(addData);
            this.$http.post(cyApi+'/add/foodType',addData,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    location.reload(true)
                }else{
                    alert(res.data.message);
                }
            });
        },
        editFoodType:function () {
            var editData = {
                name:$(".editName").val(),
                descript:$(".editDescript").val(),
                shopId:this.shopId,
                id:this.typeId,
                typesort:$(".editTypesort").val()
            }
            console.log(editData);
            this.$http.post(cyApi+'/edit/foodType',editData,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    location.reload(true)
                }else{
                    alert(res.data.message);
                }
            });
        },
        del:function(){
            var delData = {
                id:this.typeId
            }
            if(this.type.num>0){
                alert("请先删除该分类下的菜品！");
                location.reload(true);
                return false;
            }
            this.$http.post(cyApi+'/del/foodType',delData,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    location.reload(true)
                }else{
                    alert(res.data.message);
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
        }
    },
    watch:{

    },
    created:function() {
        this.getStoreList(1);
    }
});