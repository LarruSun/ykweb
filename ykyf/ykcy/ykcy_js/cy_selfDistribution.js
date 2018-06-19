/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#main-container",
    data: {
        selfDistributionData:[//总数据
            // {'name':'a','phone':13970714121,'timer':'2018-04-08 12:13:53'},
            // {'name':'b','phone':13970714121,'timer':'2018-04-08 12:13:53'},
            // {'name':'c','phone':13970714121,'timer':'2018-04-08 12:13:53'},
            // {'name':'d','phone':13970714121,'timer':'2018-04-08 12:13:53'},
            // {'name':'e','phone':13970714121,'timer':'2018-04-08 12:13:53'},
            // {'name':'f','phone':13970714121,'timer':'2018-04-08 12:13:53'}
        ],
        selfDistributionName:'',//用户输入的姓名（双向绑定的数据）
        selfDistributionPhone:'',//用户输入的手机号码（双向绑定的数据）
        shopId:location.href.split("=")[1],
        index:'',
        page:1,
        allPage:1

    },
    methods:{
        //数据请求
        getList:function(){
            var pdata = {
                shopId:this.shopId,
                page:this.page,
                type:'TAKEOUTMAN'
            };
            var url=ceshiApi+'get/listPersonnelAllocation';
            // console.log(pdata);
            // console.log(url);
            this.$http.post(url,pdata,{emulateJSON:true,credentials: true}).then(function(res){
                var datas=res.data
                console.log(datas)
                if(datas.type=='success'){
                    this.allPage=datas.data.pageAll;//页数
                    this.selfDistributionData=datas.data.list//当前页的数据
                    if(this.selfDistributionData.length==0){
                        this.selfDistributionData[0]='目前无自营配送人员，请新增自营配送员';
                        return;
                    }
                    //按照时间排序
                    // this.selfDistributionData=this.selfDistributionData.sort(this.px('updateTime'))
                    console.log(this.selfDistributionData)


                }
            });
        },
        //添加/修改配送人员请求接口
        addList:function(isAdd){
            var pdata = {
                shopId:this.shopId,
                name:this.selfDistributionName,
                phone:this.selfDistributionPhone,
                type:'TAKEOUTMAN'
            };
            //如果是编辑则多加入一个id号
            if(!isAdd){pdata.id=this.selfDistributionData[this.index].id};
            var url=ceshiApi+'add/personnelAllocation';
            // console.log(pdata);
            this.$http.post(url,pdata,{emulateJSON:true,credentials: true}).then(function(res){
                // console.log(res.data.type)
                if(res.data.type=='success'){
                    alertSuccess('操作成功',1000);
                    this.getList();//数据请求进行页面刷新
                    this.selfDistributionName=''
                    this.selfDistributionPhone=''
                    this.getList();
                    // location.reload(true);
                }else{
                    alertErrors('操作失败，网络异常！',3000)
                }
            });
        },
        //删除配送人员请求接口
        deleList:function(i){
            var pdata = {id:i};
            var url=ceshiApi+'del/cyPersonnelAllocationById';
            // console.log(pdata);
            // console.log(url);
            this.$http.post(url,pdata,{emulateJSON:true,credentials: true}).then(function(res){
                // console.log(res.data.type)
                if(res.data.type=='success'){
                    alertSuccess("操作成功",1000);
                    // location.reload(true);
                    this.getList();

                    // this.selfDistributionData.splice(this.index,1);
                }else{
                    alertErrors('操作失败，网络异常！',3000)
                }

            });
        },
        ///////////////////////////////////////////////////
        //确定添加配送人员
        addSelfDistribution:function(e){
            if(!this.testPhone(this.selfDistributionPhone,this.selfDistributionName)){return;}
            this.addList(true);
        },
        //确定编辑
        editSelfDistribution:function(){
            //检测数据的合理性
            if(!this.testPhone(this.selfDistributionPhone,this.selfDistributionName)){return;}
            this.addList(false);
        },
        //确定删除
        deleSelfDistribution:function(){
            this.deleList(this.selfDistributionData[this.index].id);          
        },
        //弹窗之间传递数据
        passMessage(index){
            //让编辑框显示所选的数据
            // if(this.selfDistributionName=='' || this.selfDistributionPhone==''){
                this.selfDistributionName=this.selfDistributionData[index].name;
                this.selfDistributionPhone=this.selfDistributionData[index].phone;
            // }
            //传递下表
            this.index=index;
        },
        //点击新增配送人员,清楚绑定的数据
        add(){
            this.selfDistributionName='';
            this.selfDistributionPhone='';
        },
        //分页
        listen(page){
            this.page=page;
            console.log('第'+this.page+'页')
            this.getList();
        },
        // 手机号码格式检测
        testPhone(str,str1){
            if(str=='' || str1==''){
                alertErrors("操作失败！请填写姓名和手机号码",3000);
                return false;
            };
            /*手机验证正则 */
            var myReg={
                // 13 15 17 18
                mobile:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}|(17[0-9]{1})))+\d{8})$/,
            };
            if(!myReg.mobile.test(str)){//手机号码不正确
                alertErrors("操作失败！请输入正确的手机格式",4000);
                return false;
            };
            return true;
        },
        //获取当前时间
        getTimer(){
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1 < 10 ? '0' + d.getMonth() : '' + d.getMonth();
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
            var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
            var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        },
        // px(key){
        //     return function(obj1,obj2){
        //         var a = obj1[key];
        //         var b = obj2[key];
        //         return b - a;
        //     }
        //     // 调用：arr.sort(px('updateTime'))
        // }

    },
    components: {   //分页组件的注册
        'vue-pagination': Vue.Pagination
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
        selfDistributionName(newValue,oldValue){
            if(newValue.length==0){
                return;
            }
            //正则表达式
            var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");
            if(!reg.test(newValue))
            {
                alertErrors("请输入中文、数字和英文！",2000);
                this.selfDistributionName=oldValue;
            }
            if(newValue.length>6){
                alertErrors("姓名长度不能大于6位",2000);
                this.selfDistributionName=oldValue;
            }
        },
        selfDistributionPhone(newValue,oldValue){
            //长度为零 表示用户刚开始输入或者全部清空，不进行验证
            if(newValue.length==0){
                return;
            }
            var reg = new RegExp(/^[\d]+$/g)
            if(!reg.test(newValue)){
                alertErrors("只能输入数字",2000);
                this.selfDistributionPhone=oldValue;
            }
            if(newValue.length>11){
                alertErrors("电话号码长度不能大于11位",2000);
                this.selfDistributionPhone=oldValue;
            }

        }
    },
    created:function() {
        this.getList();
    }
});