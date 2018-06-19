/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#launchList1",
    data: {
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
        orderList:[
            {'name':'ASDFGHJKLIJKLMM','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},
            {'name':'ASDFGHJKLIJKLMM','lx':'已使用','price':'到店领券','time':'88888888','state':'2018-03-30 12:35:35','count':'2018-03-30 12:35:35'},

        ]
    },
    methods:{

        checkList(){
           window.open('checkList.html')
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


    }
});