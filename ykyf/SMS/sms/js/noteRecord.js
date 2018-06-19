/**
 * Created by Administrator on 2018/1/27.
 */
new Vue({
    el: '#app',
    data: {
         initData:[],
         rangeDay:'',
         startDate:'',
         endDate:'',
         statu:'',
         pageSize:10,
         cur:1,
         all:1
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        listen: function (data) {  //分页
            this.cur = data;
            var obj={
                startDate:$("#wei_datetime").val(),
                endDate:$("#wei_datetime1").val(),
                statu:this.statu,
                page:data,
                pageSize:10
            };
            this.seach(obj);
        },
        submit:function(){//详情提交按钮接收的数据返回给后台
              var _this=this;
              var obj={
                 startDate:$("#wei_datetime").val(),
                 endDate:$("#wei_datetime1").val(),
                 statu:_this.statu,
                 page:_this.cur,
                 pageSize:10
              };
              console.log(obj);
              _this.startDate=$("#wei_datetime").val();
              _this.endDate=$("#wei_datetime1").val();
              this.seach(obj);
        },
        seach:function(obj){
             this.$http.post(pathApi + "/sms/get/sendRecord",obj,{emulateJSON:true,credentials:true}).then(function (res) {
                if(res.data.type=='success'){
                     console.log(res);
                     this.initData=res.data.data.list;
                    //总页数
                    if(res.body.data.pageAll==0||res.body.data.pageAll==undefined){
                        this.all=1;
                    }else{
                        this.all = res.body.data.pageAll;
                    }
                }
            })
        },
        GetDateStr:function(AddDayCount){
            var dd = new Date();
            dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;//获取当前月份的日期
            m=m<10?'0'+m:m;
            var d = dd.getDate();
            d=d<10?'0'+d:d;
            return y+"-"+m+"-"+d;
        },
        rangeDayChange:function(){
            if(this.rangeDay!=''){
                var startDate=this.GetDateStr(-this.rangeDay);
                var endDate=this.GetDateStr(0);
                $("#wei_datetime").val(startDate);
                $("#wei_datetime1").val(endDate);
            }
        }

    },
    created:function() {
          this.submit();
    },
    mounted:function(){
        //日期
        $(".form_datetime").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            showMeridian: true,
            pickerPosition: "bottom-left",
            language: 'zh-CN',//中文，需要引用zh-CN.js包
            startView: 2,//月视图
            minView: 2,//日期时间选择器所能够提供的最精确的时间选择视图
            today: "今天",
        });

    },
    watch:{

    }
});
