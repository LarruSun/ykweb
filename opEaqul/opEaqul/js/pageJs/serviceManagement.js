/**
 * Created by Administrator on 2018/2/1.
 */
function isString(obj){ //判断对象是否是字符串
  return Object.prototype.toString.call(obj) === "[object String]";
}
new Vue({
    el:'#App',
    data:{
        listManager:[],  //服务信息列表
        cur: 1,//默认第一页
        all:1,//总页数
        pageSize:10, //每页总条数
        msg:'',//数据展示
        myAddSon:[],
        isShow:false,
        addSon:'',
        ckInput:[], //选中的input框
        editObj:{},  //编辑服务的暂存对象
        addObj:{
           serviceName:'',  //服务名
           basicService:'1', //是否基础服务，1为是0为不是
           serviceType:'',  //服务类型
           supplierId:'',   // 供应商id
           orderNum:'',  //排序num
           busId:'',  //业务id
           url:'',  //url地址
           serviceImg:'',// 服务图片
          // rowId:'',   //判断是否是已购买 只用用于页面判断
           status:'',  // 状态 1上架:下架0
           serviceDesc:'', //服务功能概要
           profit:'',  // 分佣比例
           permissionCode:'', //服务号
           functionIntroduction:'',  //功能介绍
           vipLimit:'0', //购买级别限制
           priceMonth:[  // 价格/月
              {
                 price:'',
                 month:''
              },
              {
                 price:'',
                 month:''
              }
           ]
        },    //新增服务的暂存对象
        serType:[],  //服务类型
        supplierList:[],  //供应商列表
        functionList:[],  //功能介绍数组
        busTypeList:[],  //业务类型列表
        isEdit:'',   //判断是否是编辑

        editArr:[    //修改的
           {
             name:'123',
             desc:'fyusdgfj'
           },
           {
             name:'123234',
             desc:'fyusdg3w434fj'
           }
        ],
        addArr:[
           {
             functionName:'',
             introduction:''
           }
        ]
    },
    components: {   //分页
        'vue-pagination': Vue.Pagination
    },
    methods:{
        listen: function (data) {  //分页
            // console.log(data)
            this.cur = data;
            var _this=this;
            var obj={
                pageSize:_this.pageSize,
                pageNum:data,
                status:$(".serStatus").val(),
                serviceName:$(".serSeach").val()
            };
            console.log(obj);
            this.serviceListManager(obj)
        },
        addiIntroductions:function(type){  //添加功能及介绍(修改)
            if(type==1){     //编辑
                if(this.editArr.length<2){
                       var obj={
                         functionName:'',
                         introduction:''
                       };
                       this.editArr.push(obj);
                }else{
                     alert("最多添加两个！");
                }
            }
            if(type==0){  //新增
                if(this.addArr.length<2){
                       var obj={
                          functionName:'',
                          introduction:''
                       };
                       this.addArr.push(obj);
                }else{
                     alert("最多添加两个！");
                }

            }
            //console.log(this.isShow)
        },
        serviceListManager:function(obj){  //服务信息列表的接口
              console.log(obj)
              this.$http.post(_pathApi+"/opService/serviceListManager",obj,{emulateJSON:true,credentials: true}).then(function(res){
              console.log(res);
                  this.listManager=res.data.data.yyServiceList;
                  this.supplierList=res.data.data.supplierList;
                  this.functionList=res.data.data.functionList;
                  this.busTypeList=res.data.data.busTypeList;
                  console.log(res.data.data);
                  this.all=eval('('+res.data.message+')').page;

              })

        },
        editManagementModel:function(e){  //编辑服务触发模态框
          $(e.target).attr("data-target","")
           var cklen=this.ckInput.length;
           if(cklen==1){
               this.editObj=this.getServerBySerId(this.ckInput[0]);
               this.isEdit=1;
               console.log(this.editObj);
               this.editArr=this.editObj.functionIntroduction.length>0?JSON.parse(this.editObj.functionIntroduction):[];

               console.log(this.editObj.priceMonth)
               if(isString(this.editObj.priceMonth)){
                  this.editObj.priceMonth=this.editObj.priceMonth.length>0?JSON.parse(this.editObj.priceMonth):[];
               }
               $("#editimgid").attr("src",this.editObj.serviceImg);
               $(e.target).attr("data-target","#myModal_divisionalManagementEdit");

           }else{
               alert("请选择一条数据");
           }

        },
        addManagementModel:function(){//新增服务触发模态框
            this.isEdit=0;
        },
        upManagementModel:function(e){  //服务上线触发模态框
           console.log(this.ckInput);
           $(e.target).attr("data-target","")
            var cklen=this.ckInput.length;
            if(cklen==1){
                 $(e.target).attr("data-target","#myModal_topThread");

            }else{
                alert("请选择一条数据");
            }
        },
        downManagementModel:function(e){ //服务下线触发模态框
           console.log(this.ckInput);
           $(e.target).attr("data-target","")
            var cklen=this.ckInput.length;
            if(cklen==1){
                 $(e.target).attr("data-target","#myModal_tapeout")

            }else{
                alert("请选择一条数据");
            }
        },
        editManagement:function(){  //编辑服务
            var flag=this.regCheck(this.editObj);
            if(flag){
                  var _this=this;
                  var extObj=$.extend({},_this.editObj);
                  extObj.functionIntroduction=JSON.stringify(this.editArr);//
                  extObj.priceMonth=JSON.stringify(this.editObj.priceMonth);//
                  var formData=new FormData();
                  for(var i in this.addObj){
                      if(i=='serviceImg'){
                          formData.append( i,extObj[i],extObj[i].name);
                      }else{
                        formData.append(i,extObj[i]);
                      }

                  }
                  formData.append("id",extObj.id);
                  this.$http.post(_pathApi+"/opService/editYYService",formData,{emulateJSON:true,credentials: true}).then(function(res){
                     if(res.data.type=='success'){
                         location.reload();
                     }else{
                         alert(res.data.message);
                     }
                     //this.all=res.data.
                  })
            }
               console.log(this.editObj);
        },
        addManagement:function(e){  //新增服务
           var flag=this.regCheck(this.addObj);
           if(flag){
                 var _this=this;
                 var extObj=$.extend({},_this.addObj);  //jq浅拷贝(有必要，解决以下转成字符串后遍历问题)
                 extObj.functionIntroduction=JSON.stringify(this.addArr);//
                 extObj.priceMonth=JSON.stringify(this.addObj.priceMonth);//
                 var formData=new FormData();
                 for(var i in this.addObj){
                     if(i=='serviceImg'){
                        console.log( _this.addObj[i]);
                        formData.append(i,extObj[i],extObj[i].name);
                     }else{
                        formData.append(i,extObj[i]);
                     }
                 }
                 this.$http.post(_pathApi+"/opService/addYYService",formData,{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res);
                    if(res.data.type=='success'){
                        location.reload();
                    }
                    //this.all=res.data.
                 })
           }
        },
        upManagement:function(){  //服务上线
              this.updownService(1)
        },
        downManagement:function(){ //服务下线
              this.updownService(0)
        },
        ckAll:function(e){  //父选子
             var _this=this;
             _this.ckInput=[];
             if(e.target.checked){
                 $(".clickSon").each(function(){
                    this.checked=true;
                     _this.ckInput.push(this.value);
                 })
                 console.log(_this.ckInput)
             }else{
                 $(".clickSon").each(function(){
                    this.checked=false;
                     _this.ckInput=[];
                 })
             }
        },
        sonlist:function(){ //子选父
            var _this=this;
            _this.ckInput=[];
            $(".clickSon").each(function(){
                if(this.checked){
                   _this.ckInput.push(this.value);
                }
             })
             if(this.ckInput.length==this.listManager.length){
                $(".clickAll").prop("checked",true);
             }else{
                $(".clickAll").prop("checked",false);
             }
        },
        updownService:function(status){ //服务上下线接口status:1上架,0下架
               var _this=this;
               var obj={
                   yyServiceId:_this.ckInput[0],
                   status:status
               }
               console.log(obj);
               this.$http.post(_pathApi+"/opService/modifyStatusOfYYService",obj,{emulateJSON:true,credentials: true}).then(function(res){
                   console.log(res);
                   if(res.data.type=='success'){
                       location.reload();
                   }
                   //this.all=res.data.
               })
        },
        seachServer:function(){ //查询服务接口
             var obj={
                 status:$(".serStatus").val(),
                 serviceName:$(".serSeach").val()
             }
             this.serviceListManager(obj);
        },
        getServerBySerId:function(serId){  //通过serid查询对应的数据
             var temObj={};
             for(var i=0;i<this.listManager.length;i++){
                 if(serId==this.listManager[i].id){
                    for(var k in this.listManager[i]){
                        temObj[k]=this.listManager[i][k];
                    }
                    return temObj;
                 }
             }
        },
        ievent:function(data){
            console.log(data);
            if(this.isEdit==1){  //编辑
                   for(var i=0;i<this.editArr.length;i++){
                       if(data==this.editArr[i]){
                           this.editArr.splice(i,1);
                       }
                   }
            }else{
                 for(var i=0;i<this.addArr.length;i++){
                     if(data==this.addArr[i]){
                         this.addArr.splice(i,1);
                     }
                 }
            }
        },
        getAddImg:function(e){
            var files = e.target.files;
            var _this=this;
            lrz(files[0],{quality:0.8})
                .then(function (rst) {
                    // 处理成功会执行
                    console.log(rst);
                    rst.file.name=rst.origin.name;
                    $("#upimg").attr("src", rst.base64);
                    _this.addObj.serviceImg=rst.file;

                })
                .catch(function (err) {
                    // 处理失败会执行
                     console.log(err);
                })
                .always(function (msg) {
                    // 不管是成功失败，都会执行
                     console.log(msg)
                });
        },
        getEditImg:function(e){
            var files = e.target.files;
            var _this=this;
            lrz(files[0],{quality:0.8})
                .then(function (rst) {
                    // 处理成功会执行
                    console.log(rst);
                    rst.file.name=rst.origin.name;
                    _this.editObj.serviceImg=rst.file;
                     $("#editimgid").attr("src", rst.base64);
                })
                .catch(function (err) {
                    // 处理失败会执行
                    console.log(err);
                })
                .always(function (msg) {
                    // 不管是成功失败，都会执行
                    console.log(msg)
                });
        },
        addPriceMonth:function(edit){  //添加 月/价格
             if(edit==0){
               if(this.addObj.priceMonth.length<3){
                      var obj={
                          price:'',
                          month:''
                      }
                      this.addObj.priceMonth.push(obj);
               }else{
                   alert("最多添加3个");
               }
             }else{
                if(this.editObj.priceMonth.length<3){
                    var obj={
                        price:'',
                        month:''
                    }
                    this.editObj.priceMonth.push(obj);
                }else{
                    alert("最多添加3个");
                }
             }

        },
        delPriceMonth:function(item,edit){
             if(edit==0){
                 for(var i=0;i<this.addObj.priceMonth.length;i++){
                     if(item==this.addObj.priceMonth[i]){
                         this.addObj.priceMonth.splice(i,1);
                         return ;
                     }
                 }
             }else{
                 for(var i=0;i<this.editObj.priceMonth.length;i++){
                     if(item==this.editObj.priceMonth[i]){
                         this.editObj.priceMonth.splice(i,1);
                         return ;
                     }
                 }
             }
        },
        regCheck:function(obj){  //新增服务的校验
               var flag=true;
               var must=[
                   {name:"serviceName",desc:'服务名不能为空'},
                   {name:"basicService",desc:'基础服务不能为空'},
                   {name:"serviceType",desc:'服务类型不能为空'},
                   {name:"supplierId",desc:'供应商不能为空'},
                   {name:"orderNum",desc:'排序号不能为空'},
                   {name:"busId",desc:'业务不能为空'},
                   {name:"status",desc:'状态不能为空'},
                   {name:"serviceImg",desc:'服务图片不能为空'},
                   {name:"url",desc:'url地址不能为空'},
                   {name:"profit",desc:'分佣比例不能为空'}
                   ]; //必填项
               for(var i=0;i<must.length;i++){
                   if(obj[must[i].name]==''){
                      alert(must[i].desc);
                      flag=false;
                      return flag;
                   }
               }
               if(flag){  //通过了第一层验证，下面判断第二层验证(如果不是基础服务，需要填写开通条件和规格)；
                    if(obj.basicService==0){  //不是基础服务
                        for(var k=0;k<obj.priceMonth.length;k++){  //校验月份与价格
                              if(!myReg.number.test(obj.priceMonth[k].month)||!myReg.price.test(obj.priceMonth[k].price)){
                                 alert("请填写正确的规格与价格");
                                 flag=false;
                                 return flag;
                              }
                        }
                        if(obj.priceMonth.length<1){
                             alert("请至少填写一个产品规格");
                             flag=false;
                             return flag;
                        }
                    }
               }
               return flag;
        }
    },
    created:function(){
        var _this=this;
        var obj={
            pageNum:_this.cur,
            pageSize:_this.pageSize,
            status:$(".serStatus").val(),
            serviceName:$(".serSeach").val()
        }
        console.log(obj);
        this.serviceListManager(obj);
    }
})