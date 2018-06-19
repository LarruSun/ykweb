/**
 * Created by Administrator on 2018/2/5.
 */
//地图加载


new Vue({
    el: '#newStoreManagement',
    data: {
        shopData:{},//暂存的所有数据
        checked:false,
        province:'',
        city:'',
        area:'',
        parentType:[],
        sonType:[],
        classType:["美食","江浙菜"],
        shopId:'',
        createType:'新建',
        Vmap:'',
        imgList: [],
        size: 0,
        longitude:'',
        latitude:''
    },
    methods:{
       saveStore:function () {
           var vThis=this;
           var savedata = {
               branch_name:$(".branch_name").val(),
               business_name:'',//用户名
               province:$(".province").val(),
               city:$(".city").val(),
               district:$(".district").val(),
               address:$(".address").val(),
               telephone:$(".telephone").val(),
               categories:$(".parentClassType").val()+","+$(".sonClassType").val(),
               offset_type:7,//7代表高德地图
               longitude:vThis.longitude,//坐标
               latitude:vThis.latitude,
               imgUrl:vThis.imgList, //图片地址
               oldimg:'' //修改时的旧图片
           }
           if(this.shopId != ''){
               savedata.id = this.shopId;
           }
           if(this.checkRedata(savedata)){
               var formData= new FormData();
               for(var key in savedata){
                    if(key=='imgUrl'){
                        for(var i=0;i<savedata[key].length;i++){
                             console.log(savedata[key][i]);
                             if(savedata.imgUrl[i].file){
                                 formData.append('imgUrl', savedata.imgUrl[i].file,savedata.imgUrl[i].file.name);
                             }else{
                                 formData.append('oldimg',savedata.imgUrl[i]);
                             }
                         }
                    }else{
                        formData.append(key, savedata[key]);
                    }
               }
               console.log(savedata)

               this.$http.post(pathApi+'/system/shop/addBranchShop',formData,{emulateJSON:true,credentials: true}).then(function(res){
                   console.log(res);
                   if(res.data.type=='success'){
                       alertSuccess('门店创建成功!',1500)
                       location.href="../ykyf_html/storeManagement.html"
                   }else{
                       alertErrors(res.data.message,1500)
                   }
               });
           }
       },
        CityMap:function(){
            console.log(this.Vmap)
            var str = $(".province").val() + $(".city").val()+$(".district").val()+$("#tipinput").val();
            var _this=this;
            var s=this.Vmap.placeSearch.search(str,function(stu,res){
                _this.longitude=res.poiList.pois[0].location.lng;
                _this.latitude=res.poiList.pois[0].location.lat;
            });
        },
        upImgs:function(e) { //
            //清除地图上所有覆盖物
           console.log(e)
        },
        checkRedata:function(data){
           var ckArr=[{name:'branch_name',msg:'门店名称不能为空!'},{name:'telephone',msg:'门店电话不能为空!'},{name:'categories',msg:'门店类目不能为空!'},{name:'imgUrl',msg:'请上传门店照片'},
               {name:'province',msg:'请选择省市区'},{name:'address',msg:'请填写详细地址'}];
            var flag=true;
           for(var i=0;i<ckArr.length;i++){
               if(data[ckArr[i].name]==''){
                   flag=false;
                   alert(ckArr[i].msg)
                   return flag;
               }
           }
            return flag;
        },
        changType:function(e){
           var classType = $(e.target).val();
            this.$http.post(pathApi+'/system/shop/findShopClassTypeByParent',{"parent":classType},{emulateJSON:true,credentials: true}).then(function(res){
                this.sonType = res.data.data;
            });
        },
        initPage:function(){
            var url = location.search;
            if(url.indexOf("?")!=-1){
                var shopId =url.split("=")[1];
                this.shopId = shopId;
                this.createType = '编辑'
                this.$http.post(pathApi+'/system/shop/selectBranchShopById',{shopId:shopId},{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res.data.data)
                    var imgArr=res.data.data.shop.imgUrl.split(",");
                    this.imgList=imgArr;

                    this.province = res.data.data.shop.province;
                    this.city = res.data.data.shop.city;
                    this.area = res.data.data.shop.district;
                    for(var i=0;i<res.data.data.classTypes.length;i++){
                        if(res.data.data.classTypes[i].parent_id==null){
                            this.parentType.push(res.data.data.classTypes[i])
                        }
                    }
                    this.sonType = res.data.data.sonClassTypes;
                    this.classType = res.data.data.shop.categories.split(",");
                    this.shopData = res.data.data.shop;
                    console.log(this.classType);
                    // $(".branch_name").val(res.data.data.shop.branch_name);
                    // $(".telephone").val(res.data.data.shop.telephone)
                    //
                    // $(".address").val(res.data.data.shop.address)
                    console.log(this.parentType)
                    $('#target').distpicker({
                        province: this.province,
                        city: this.city,
                        district: this.area
                    });

                    this.CityMap();

                });
            }else{
                this.$http.post(pathApi+'/system/shop/toAddBranchShop',{},{emulateJSON:true,credentials: true}).then(function(res){
                    console.log(res.data.data.classTypes)
                    for(var i=0;i<res.data.data.classTypes.length;i++){
                        if(res.data.data.classTypes[i].parent_id==null){
                            this.parentType.push(res.data.data.classTypes[i])
                        }else if(res.data.data.classTypes[i].parent_id==this.parentType[0].id){
                            this.sonType.push(res.data.data.classTypes[i])
                        }
                    }
                    $('#target').distpicker({
                        province: '选择省',
                        city: '选择市',
                        district: '选择区'
                    }).distpicker('reset', true);
                });
            }
        },
        //多图上传vue插件
        fileChange(el) {
            if (!el.target.files[0].size) return;
            this.fileList(el.target);
            el.target.value = ''
        },
        fileList(fileList) {
            if(fileList.files.length+this.imgList.length<4){
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                    //判断是否为文件夹
                    if (files[i].type != '') {
                        this.fileAdd(files[i]);
                    } else {
                        //文件夹处理
                        this.folders(fileList.items[i]);
                    }
                }
            }else{
                alert("最多上传3张！");
            }

        },
        //文件夹处理
        folders(files) {
            let _this = this;
            //判断是否为原生file
            if (files.kind) {
                files = files.webkitGetAsEntry();
            }
            files.createReader().readEntries(function (file) {
                for (let i = 0; i < file.length; i++) {
                    if (file[i].isFile) {
                        _this.foldersAdd(file[i]);
                    } else {
                        _this.folders(file[i]);
                    }
                }
            })
        },
        foldersAdd(entry) {
            let _this = this;
            entry.file(function (file) {
                _this.fileAdd(file)
            })
        },
        fileAdd(file) {
            //总大小
            this.size = this.size + file.size;
            //判断是否为图片文件
            if (file.type.indexOf('image') == -1) {
                file.src = 'wenjian.png';
                this.imgList.push({
                    file
                });
            }else {
                if(this.imgList.length<4){
                    var reader = new FileReader();
                    reader.vue = this;
                    var _this=this;
                    reader.readAsDataURL(file);
                    reader.onload = function (){
                        lrz(file)
                            .then(function (rst) {
                                // 处理成功会执行
                                console.log(rst)
                                rst.file.name=rst.origin.name;
                                rst.file.src =  rst.base64;
                                var file=rst.file;
                                _this.imgList.push({
                                    file
                                });
                            })
                            .catch(function (err) {
                                // 处理失败会执行
                            })
                            .always(function () {
                                // 不管是成功失败，都会执行
                            });
                        console.log(_this.imgList)
                    }
                }else{
                    alert("最多上传3张！")
                }
            }
        },
        fileDel(index) {
            //this.size = this.size - this.imgList[index].file.size;//总大小
            this.imgList.splice(index, 1);
        },
        bytesToSize(bytes) {
            if (bytes === 0) return '0 B';
            let k = 1000, // or 1024
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },

    },
    watch:{

    },
    created:function() {

    },
    mounted:function(){
        this.initPage();
        this.Vmap=new aliMap();
        var _this=this;
        AMap.event.addListener(this.Vmap.auto, "select", function(e){
            console.log(e)
            _this.Vmap.placeSearch.setCity(e.poi.adcode);
            _this.Vmap.placeSearch.search(e.poi.name);  //关键字查询查询
           // _this.CityMap();
            if(e.poi.location!=undefined){
                _this.Vmap.geocoder.getAddress([e.poi.location.lng,e.poi.location.lat], function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                            $(".province").val(result.regeocode.addressComponent.province).trigger("change");
                            var city=result.regeocode.addressComponent.city==''?$(".city option").eq(1).val():result.regeocode.addressComponent.city
                            $(".city").val(city).trigger("change");
                            $(".district").val(result.regeocode.addressComponent.district).trigger("change");
                        _this.CityMap();
                    }
                });
            }else{
                alert("无法获取该地址的经纬度,请核对详细地址!");
            }

        });
    }
});

function aliMap(){
     this.map=new AMap.Map("container", {
         resizeEnable: true,
         center: [116.403322, 39.900255],//地图中心点
         zoom: 13 //地图显示的缩放级别
     });
     this.autoOptions={
         input: "tipinput"
     };
    this.auto=new AMap.Autocomplete(this.autoOptions);
    this.placeSearch=new AMap.PlaceSearch({
        map: this.map
    });
    this.geocoder=new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
    });
}
aliMap.prototype={
    init:function(){

    }
}