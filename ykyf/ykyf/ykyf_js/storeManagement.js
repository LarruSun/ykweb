/**
 * Created by Administrator on 2018/2/5.
 */
new Vue({
    el: "#storeManagement",
    data: {
        shopData:{},//暂存的所有数据
        checked:false,
        item:'', //要删除的门店item
        display:true
    },
    methods:{
        getStoreList:function(){
            var pdata = {
                provice: $("#storeManagement .province").val(),
                city: $("#storeManagement .city").val(),
                district: $("#storeManagement .area").val(),
                branch_name: $("#storeManagement .branch_name").val()
            }
            console.log(pdata);
            this.$http.post(pathApi+'/system/shop/storesManage',pdata,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='success') {
                    // shopData = res.body.data;
                    console.log(res.data);
                    if(res.data.data!=null){
                        this.shopData = res.data.data;
                        if(this.shopData.length>=1){
                            this.display = false;
                        }
                    }
                }
            });
        },
        seach:function(){
            this.getStoreList()
        },
        sureDelStore:function(){ //确认删除门店
            this.$http.post(pathApi+'/system/shop/deleteBranchShop',{shopId:this.item.id},{emulateJSON:true,credentials: true}).then(function(res){
                if(res.body.type=='success') {
                    if(res.data.type=='success'){
                       // this.shopData = res.data.data;
                        console.log(res.data);
                        hide_popup('#popup_isdelthisshop');
                        location.reload();
                    }
                }
            });
        },
        delStore:function(id){  //删除门店吗？
             show_popup('#popup_isdelthisshop');
             this.delStoreId=id;
             this.item=this.getItemByid(id);
        },
        getItemByid:function(id){ //根据id查找指定item
           for(var i=0;i<this.shopData.length;i++){
               if(id==this.shopData[i].id){
                   return this.shopData[i];
               }
           }
        }
    },
    watch:{

    },
    created:function() {
        this.getStoreList();
    },
    mounted:function(){
        $('#target').distpicker({
            province: '选择省',
            city: '选择市',
            district: '选择区'
        }).distpicker('reset', true);
    }
});