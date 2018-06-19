/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#VIP_setIntegral",
    data: {
        amount:'',
        id:''


    },
    methods:{
        submit(){
            if(this.amount==''){
                alertErrors('请将信息填写完整');
                return
            }
            var obj={};
            obj.amount=this.amount
            obj.id=this.id
            console.log(obj);
            this.$http.post(vipApi+'/upMemberIntegralSettingById',obj,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res)
                if(res.data.type=='success' || res.data.type=='SUCCESS'){
                    alertSuccess('操作成功',1000);
                    location.reload(true);
                }else{
                    alertErrors(res.data.message);
                }
    
            });
        },
        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
         },

    },
    components: {   //分页
    },
    filters: {
        data: function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = d.getMonth() + 1 < 10 ? '0' + d.getMonth() : '' + d.getMonth();
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
            var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
            var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        },
    },
    watch:{
        amount(newvalue,oldvalue){
            newvalue=newvalue.toString()
            //大于零小于总金额且只能为两位小数点
            if (newvalue<0 || (newvalue.length - newvalue.indexOf('.')-1>2 && newvalue.indexOf('.')!=-1) ) {
                alertErrors('请输入正确的金额');
                this.amount=oldvalue
            }
        }
    },
    created:function() {

        this.$http.get(vipApi+'/getMemberIntegralSettingByUserId',{emulateJSON:true,credentials: true}).then(function(res){
            console.log(res.data.data)

            if(res.data.type=='success' || res.data.type=='SUCCESS'){
                this.amount=res.data.data.memberIntegralSetting.amount*0.01;
                this.id=res.data.data.memberIntegralSetting.id
            }else{
                alertErrors(res.data.message);
            }

        });
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

    }
});