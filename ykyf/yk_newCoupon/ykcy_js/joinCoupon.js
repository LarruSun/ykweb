/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#joinCoupon",
    data: {
        dynamicTags: [],
        inputValue: '',
        param: {
            startTime: '',
            endTime: '',
            couponName: '',
            state:'all',
            tfState:'all',
            carState:'all'
        },
        cur:1,
        all:5,
        orderList1:[
            {'name':'ASDFGHJKLIJKLMM1','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM2','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM3','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM4','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM5','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM6','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM7','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},

        ],
        flag:'',
    },
    methods:{
        listen(data){
            this.cur=data
            console.log(this.cur)
        },
        getUrlParam(name){
            var str=window.location.search
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = str.substr(1).match(reg);
            if(r!=null)return decodeURI(r[2]); return null;
         },
         //关闭标签事件
         handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            for(var i=0;i<this.orderList.length;i++){
                if(tag==this.orderList[i].name){
                    $(".hidden-480 input[type='checkbox']")[i].checked=false;
                    break;
                }
            }
          },

          checks(e,index){
            // var selectDistribution=$(".hidden-480 input[type='checkbox']")[index].checked=true;//选中的内容
            // console.log(selectDistribution);
              console.log(e.target.checked);
              console.log(index);
              if(e.target.checked==true){
                this.dynamicTags.push(this.orderList[index].name);
              }else{
                this.dynamicTags.splice(index, 1);
              }
          }



    

    },
    components: {   //分页
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
        
    },
    created:function() {
        this.flag=this.getUrlParam('flag');
        // console.log(this.getUrlParam('flag'))
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

    }
});