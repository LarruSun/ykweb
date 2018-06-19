/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#main-container",
    data: {
        disableType:false,
        types:[],
        type:{
            content:"",
            id:"",
            joinDiscount:"",
            joinOrder: "",
            method:"0",
            shopId:location.href.split("=")[1],
            surchargeName:"",
            tableName:'',
            updateTime:'',
            updaterId:""

        },//暂存的所有数据
        checked:false,
        shopId:location.href.split("=")[1],
        departmentId:'',
        departments:{},
        mothodContent:"元",
        content:0,
        form: {
            'method' : 0
        },
        orderTypeList: [],
        isAdd: false,
        systemSur: false
    },
    methods:{
        getStoreList:function(){
            var pdata = {
                shopId:this.shopId
            };
            this.$http.post(ceshiApi+'/get/listSurcharge',pdata,{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS' || res.data.type=='success'){
                    this.departments = res.data.data.surcharges;
                }else{
                    alertErrors(res.data.data.message);
                }
            });
        },
        getNum:function(e){
            var num = $(e.target).val();
            if(num=='e'||num<0||num=='')
                $(e.target).val(0)
        },
        getDataById:function(id){
            for(var i=0;i<this.departments.length;i++){
                if(id==this.departments[i].id){
                    return this.departments[i];
                }
            }
        },
        addModal(){
            this.isAdd = true;
            this.form = {'method' : 0 };
            this.orderTypeList = [];
            this.systemSur = false;
        },
        getThis(id) {
            this.isAdd = false;
            this.addId = id;
            this.$http.post(ceshiApi + '/get/cySurcharge',{'id' : id},{emulateJSON:true,credentials: true}).then(res => {
                if (res.data.type == 'success') {
                    this.form.surchargeName = res.data.data.surchargeName;
                    this.form.method = res.data.data.method;
                    if (res.data.data.method == '1') {
                        this.form.content = res.data.data.content;
                    }else {
                        this.form.content = res.data.data.content * 0.01;
                    }
                    if (res.data.data.orderType == '0') {
                        this.orderTypeList = [1,2];
                    }else {
                        this.orderTypeList = [res.data.data.orderType];
                    }
                    this.systemSur = res.data.data.systemSur;
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        getMothod:function(e) {
            var method = $(e.target).val();
            if (method=="0")
                this.mothodContent = "元";
            else if(method=="1")
                this.mothodContent = "%";
            else if(method=="2")
                this.mothodContent = "元/人"
            }
        ,
        addDepartment:function () {
                let form = Object.assign({},this.form);
                form.shopId = this.shopId;
                if (!form.surchargeName || !form.content || this.orderTypeList.length <= 0){
                    alertErrors('请填写完整');
                    return
                }
                if(form.surchargeName.length > 6){
                    alertErrors('附加费名称不能大于6个字符');
                    return
                }
                if(this.form.method == '1') {
                    if (this.form.content <= 0 || this.form.content > 99) {
                        alertErrors('按比例计算方式只支持正整数（1-99）');
                        return
                    }
                }
                if (this.orderTypeList.length == 2){
                    form.orderType = 0
                }else if(this.orderTypeList.length == 1){
                    form.orderType = this.orderTypeList.join(',')
                }
                if (form.method != '1') {
                    form.content = form.content * 100;
                }
            if (this.isAdd) {
                this.$http.post(ceshiApi+'/add/cySurcharge',form,{emulateJSON:true,credentials: true}).then(function(res){
                    if(res.data.type=='SUCCESS'||res.data.type=='success'){
                        alertSuccess(res.data.message);
                        this.getStoreList();
                        $('#myModal_fen').modal('hide');
                    }else{
                        alertErrors(res.data.message)
                    }
                });
            }else {
                form.id = this.addId;
                this.$http.post(ceshiApi + '/add/cySurcharge',form,{emulateJSON:true,credentials: true}).then(res => {
                    if(res.data.type=='SUCCESS'||res.data.type=='success'){
                        alertSuccess(res.data.message);
                        this.getStoreList();
                        $('#myModal_fen').modal('hide');
                    }else{
                        alertErrors(res.data.message)
                    }
                })
            }
        },
        remove() {
            this.$http.post(ceshiApi +'/del/cySurcharge',{'id' : this.addId},{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    alertSuccess(res.data.message);
                    this.getStoreList();
                    $('#myModal_remove').modal('hide');
                }else{
                    alertErrors(res.data.message)
                }
            });
        },
        setStatus(id ,status) {
            this.$http.post(ceshiApi +'/edit/cySurchargeStatu',{'id' : id,'statu' : status == '1' ? '2' : '1'},{emulateJSON:true,credentials: true}).then(function(res){
                if(res.data.type=='SUCCESS'||res.data.type=='success'){
                    alertSuccess(res.data.message);
                    this.getStoreList();
                }else{
                    alertErrors(res.data.message)
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