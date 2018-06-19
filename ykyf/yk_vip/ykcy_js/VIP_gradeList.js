/**
 * Created by Administrator on 2018/3/12.
 */
new Vue({
    el: "#VIP_gradeList",
    data: {
        id:'',
        cur:1,
        all:1,
        orderList:[
           
        ]

    },
    methods:{
        getData(){
            var url=`${vipApi}/MemberCardDefinedList?pageNum=${this.cur}&pageSize=${6}`;
            this.$http.get(url,{emulateJSON:true,credentials: true}).then(function(res){
                console.log(res);
                if(res.data.type=='success' || res.data.type=='SUCCESS'){
                    this.orderList=res.data.data.list;
                    this.all=res.data.data.page;
                    console.log()
                    console.log(this.orderList);
                }else{
                       alertErrors(res.data.message);
                }
    
            }) 
        },

        listen(data){
            this.cur=data
            this.getData();
        },
        //点击删除按钮
        delet(item){
            this.id=item.id
        },
        //确认删除
        sureDelete(){
            var obj={
                'cardDefinedId':this.id
            }
            this.$http.post(vipApi+'/delMemberCardDefinedById',obj,{emulateJSON:true,credentials: true}).then(function(res){           
                console.log(res);
               if(res.data.type=='success' || res.data.type=='SUCCESS'){
                   alertSuccess('操作成功',1000);
                   setTimeout(()=>{ location.reload(true);},1000)
               }else{
                   alertErrors(res.data.message);
               }
           });
            
        },
        //点击编辑按钮
        edit(item){
            window.location.href=`VIP_addGread.html?id=${item.id}`
        }


    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
   
    watch:{
        
    },
    created:function() {
       
        this.getData();
        // alertErrors('ssss');
        // alertSuccess('操作成功',1000);

    }
});