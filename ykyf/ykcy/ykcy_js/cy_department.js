/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#main-container",
    data: {
        types:{},//暂存的所有数据
        checked:false,
        shopId:'',
        departmentId:'',
        departments:{},
        shopId:location.href.split("=")[1]
    },
    methods:{
        getStoreList:function(){
            var pdata = {
                shopId:this.shopId,
                page:1
            }
            console.log(pdata);
            this.$http.post(cyApi+'/get/listDepartment',pdata,{emulateJSON:true,credentials: true}).then(function(res){
                //分页没做
                console.log(res)
                this.departments = res.data.data.departments;
                console.log(this.departments)
            });
        },
        seach:function(){
            this.getStoreList();

        },
        getthis:function(id){
            var data=this.getDataById(id);
            this.type = data;
            $(".editName").val(data.deptName);
            $(".editFloor").val(data.floor);
            this.departmentId = data.id;
            console.log(data)
        },
        getDataById:function(id){
            for(var i=0;i<this.departments.length;i++){
                if(id==this.departments[i].id){
                    return this.departments[i];
                }
            }
        },
        addDepartment:function () {
            var addData = {
                name:$(".addName").val(),
                floor:$(".addFloor").val(),
                shopId:this.shopId
            }
            console.log(addData);
            this.$http.post(cyApi+'/add/cyDepartment',addData,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    location.reload(true)
                }else{
                    alert(res.data.message);
                    location.href="../../yf_index.html";
                }
            });
        },
        editDepartment:function () {
            var editData = {
                name:$(".editName").val(),
                floor:$(".editFloor").val(),
                shopId:this.shopId,
                id:this.departmentId
            }
            console.log(editData);
            this.$http.post(cyApi+'/add/cyDepartment',editData,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    location.reload(true)
                }else{
                    alert(res.data.message);
                }
            });
        },
        del:function(){
            var delData = {
                id:this.departmentId
            }
            if(this.type.printerNum>0||this.type.foodNum){
                alert("请先删除该分类下的菜品及打印机！");
                location.reload(true);
                return false;
            }
            this.$http.post(cyApi+'/del/cyDepartment',delData,{emulateJSON:true,credentials: true}).then(function(res){
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
        this.getStoreList();
    }
});