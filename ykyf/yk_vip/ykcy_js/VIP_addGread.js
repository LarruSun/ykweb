/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#VIP_addGread",
    data: {
        imgsrc:"../ykcy_images/camera.png",
        flag:'',
        minConsumeAmount:'',//最低消费
        addData:{
            'id':'',
            'name':'',
            'discount':'',//会员折扣卡
            'minConsumeAmount':'',//最低消费
            'level':'',//等级
            'remark1':'',
            'remark2':'',
            'remark3':'',
            'remark4':'',
            'remark5':'',
        }
    },
    methods:{
        sbumit(){
            if(this.addData.name.length=='' || this.addData.level=='' || this.addData.discount=='' || this.minConsumeAmount==''){
                alertErrors('请将信息填写完整',1000);
                return;
            }
            this.addData.minConsumeAmount=this.minConsumeAmount*100;
            this.$http.post(vipApi+'/editMemberCardDefined',this.addData,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                if(res.data.type=='success' || res.data.type=='SUCCESS'){
                    alertSuccess('操作成功',1000);
                    window.location.href=`VIP_gradeList.html`;
                    // setTimeout(()=>{window.location.href=`VIP_details.html`})
                }else{
                    alertErrors(res.data.message);
                    this.addData.minConsumeAmount=this.addData.minConsumeAmount*0.01;
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
        //会员等级名称的判断
        ['addData.name'](newvalue,oldvalue){
            if(this.addData.name.length>16){
                alertErrors('会员等级名称不能大于16位');
                this.addData.name=oldvalue;
            }
        },
        //会员等级的判断
        ['addData.level'](newvalue,oldvalue){
            if(this.addData.level<0){
                alertErrors('会员等级不能小于0');
                this.addData.level=oldvalue;
                return;
            }
            if(parseInt(newvalue) != newvalue && newvalue != ''){
                alertErrors('会员等级只能为整数');
                this.addData.level=parseInt(oldvalue)
            }
        },
        //折扣的判断
        ['addData.discount'](newvalue,oldvalue){
            if(this.addData.discount>9.9){
                alertErrors('请填写1-9.9之间的数字');
                this.addData.discount=oldvalue;
                return;
            }
            newvalue=newvalue.toString()
            //大于零小于总金额且只能为两位小数点
            if (newvalue<0 || (newvalue.length - newvalue.indexOf('.')-1>1 && newvalue.indexOf('.')!=-1) ) {
                alertErrors('请输入正确折扣');
                this.addData.discount=oldvalue
            }
        },
        // 最低消费输入判断
        minConsumeAmount(newvalue,oldvalue){
            newvalue=newvalue.toString()
            //大于零小于总金额且只能为两位小数点
            if (newvalue<0 || (newvalue.length - newvalue.indexOf('.')-1>2 && newvalue.indexOf('.')!=-1) ) {
                alertErrors('请输入正确的金额');
                this.minConsumeAmount=oldvalue
            }
        },




        
    },
    created:function() {
        this.flag=this.getUrlParam('flag');
        this.addData.id=this.getUrlParam('id')
        
        
        //如果进入的是编辑界面则获取数据
        if(this.addData.id){
            var obj={
                'memberCardDefinedId':this.addData.id
            }
            console.log(obj);
            this.$http.post(vipApi+'/toEditMemberCard',obj,{emulateJSON:true,credentials: true}).then(function(res){
                // console.log(res);
                if(res.data.type=='success' || res.data.type=='SUCCESS'){
                    var data=res.data.data.memberCardDefined;
                    this.addData.name=data.name;
                    this.addData.level=data.level;
                    this.minConsumeAmount=data.minConsumeAmount*0.01;
                    this.addData.discount=data.discount;
                    this.addData.remark1=data.remark1;
                    this.addData.remark2=data.remark2;
                    this.addData.remark3=data.remark3;
                    this.addData.remark4=data.remark4;
                    this.addData.remark5=data.remark5;                  
                }else{
                    alertErrors(res.data.message);
                }
            });
        }


    }
});