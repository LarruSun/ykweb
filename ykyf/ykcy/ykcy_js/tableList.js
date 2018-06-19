/**
 * Created by xuwei on 2018/4/10.
 */
new Vue({
    el: "#tableList",
    data: {
        eatArea: [],
        indexArea: 'all',
        areaId: '',
        status: '',
        deskName: '',
        cur : 1,
        all : '',
        modalTitle: '',
        saveKey: '',
        peopleNum: [1,2,3,4,5,6,7,8,9,10,11,12],
        pageNum: 1,
        tableList: [],
        form:{
            'name' : '',
            'orderNum' : ''
        },
        isAdd: false,
        updateId: '',
        statusNum:{
            'all': '',
            '0': '',
            '1': ''
        },
        qrCodeData: {},
        sortTableList: [],
        sortTableListData: []
    },
    components: {
        'vue-pagination': Vue.Pagination
    },
    methods:{
        getArea(){
            this.$http.get(ceshiApi + 'getCyDiningAreaListByShopId?shopId=' + this.shopId,{emulateJSON:true,credentials: true}).then(res => {
                if (res.data.type == 'success') {
                    this.eatArea = res.data.data;
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        getTable(status){
          this.$http.post(ceshiApi + 'getCyDiningTableList',{
              'shopId' : this.shopId,
              'status' : this.status || '',
              'areaId' : this.areaId || '',
              'deskName' : this.deskName || '',
              'page' : this.pageNum || '',
              'pageSize' : 10
          },{emulateJSON:true,credentials: true}).then(res => {
              if (res.data.type == 'success') {
                  this.tableList = res.data.data.list;
                  this.all = res.data.data.pageCount;
                  if(status!='1'){
                      this.statusNum['all'] = res.data.data.count;
                      this.statusNum['0'] = res.data.data.status0;
                      this.statusNum['1'] = res.data.data.status1;
                  }
              }else {
                  alertErrors(res.data.message);
              }
          })
        },
        save() {
            this.form.shopId = this.shopId;
            if (this.saveKey == 'addArea') {
                if (!this.form.name) {
                    alertErrors('请填写完整');
                    return
                }
                if(this.form.name.length > 12) {
                    alertErrors('餐区名不得大于12');
                    return
                }
                if(!this.form.orderNum){
                    this.form.orderNum = 999;
                }
                if (this.isAdd){
                    this.updateArea('addCyDiningArea');
                }else {
                    this.form.id = this.updateId;
                    this.updateArea('upCyDiningArea');
                }
                return
            }
            if (this.saveKey == 'deleteArea'){
                this.remove('delCyDiningArea').then(()=> {
                    this.getArea();
                    this.getTable();
                });
                return
            }
            if (this.saveKey == 'addTable'){
                if (!this.form.deskNum || !this.form.areaId || !this.form.mealsNum || !this.form.deskName) {
                    alertErrors('请填写完整');
                    return
                }
                if (this.form.deskNum.length > 6) {
                    alertErrors('桌号长度不能大于6');
                    return
                }
                let reg = /^[0-9a-zA-Z]+$/;
                if (!reg.test(this.form.deskNum)) {
                    alertErrors('桌号只能输入字母和数字');
                    return
                }
                if (this.form.deskName.length > 12) {
                    alertErrors('桌台别名长度不能大于12');
                    return
                }
                if(!this.form.orderNum) {
                    this.form.orderNum = 999;
                }
                if (this.isAdd){
                    this.updateArea('addCyDiningTable');
                }else {
                    this.form.id = this.updateId;
                    this.updateArea('upCyDiningTable');
                }
                return
            }
            if (this.saveKey == 'deleteTable'){
                this.remove('delCyDiningTable').then(()=> {
                    this.getTable();
                });
                return
            }
            if(this.saveKey == 'sortArea') {
                this.form = [];
                for (let i = 0; i < this.sortTableList.length; i++){
                    if (this.sortTableList[i].orderNum != this.sortTableListData[i].orderNum){
                        this.form[i] = this.sortTableList[i];
                    }
                }
                if (this.form.length <= 0){
                    alertInfo('未做修改');
                    $('#myModal').modal('hide');
                    return;
                }
                this.$http.post(ceshiApi + 'upTableListOrderNum',{'cyDiningTables':JSON.stringify(this.form)},{emulateJSON:true,credentials: true}).then(res => {
                    if (res.data.type == 'success') {
                        alertSuccess(res.data.message);
                        $('#myModal').modal('hide');
                        this.form = {};
                        this.getArea();
                    }else {
                        alertErrors(res.data.message);
                    }
                });
                return
            }
        },
        showModal(key,title,id){
            if(this.eatArea.length >= 50){
                alertErrors('目前系统最多只能添加50个餐区！');
                return
            }
            this.saveKey = key;
            this.modalTitle = title;
            if (id != undefined){
                this.isAdd = false;
                this.updateId = id;
                if (key == 'addArea'){
                    this.$http.get(ceshiApi + 'getAreaDataByAreaId?areaId=' + id,{emulateJSON:true,credentials: true}).then(res => {
                        if (res.data.type == 'success'){
                            this.form = {};
                            this.form.name = res.data.data.name;
                            this.form.orderNum = res.data.data.orderNum;
                        }else {
                            alertErrors(res.data.message);
                        }
                    });
                    return
                }
                if (key == 'addTable'){
                    this.$http.get(ceshiApi + 'getTableDataByTableId?tableId=' + id,{emulateJSON:true,credentials: true}).then(res => {
                        if (res.data.type == 'success'){
                            this.form = {};
                            this.form.deskNum = res.data.data.deskNum;
                            this.form.areaId = res.data.data.areaId;
                            this.form.mealsNum = res.data.data.mealsNum;
                            this.form.deskName = res.data.data.deskName;
                            this.form.orderNum = res.data.data.orderNum;
                        }else {
                            alertErrors(res.data.message);
                        }
                    });
                    return
                }
                if (key == 'sortArea') {
                    this.$http.get(ceshiApi + 'getTableListDataByAreaId?areaId=' + id,{emulateJSON:true,credentials: true}).then(res => {
                        if (res.data.type == 'success'){
                            this.sortTableList = res.data.data;
                            this.sortTableListData = JSON.parse(JSON.stringify(this.sortTableList));
                        }else {
                            alertErrors(res.data.message);
                        }
                    });
                    return
                }
                if (key == 'qrCord'){
                    this.$http.get(ceshiApi + 'getTableQrcode?tableId=' + id,{emulateJSON:true,credentials: true}).then(res => {
                        if (res.data.type =='success'){
                            this.qrCodeData = res.data.data;
                        }else {
                            alertErrors(res.data.message);
                        }
                    });
                    return
                }
            }else {
                this.form = {};
                this.isAdd = true;
            }
        },
        updateArea(url) {
            this.$http.post(ceshiApi + url,this.form,{emulateJSON:true,credentials: true}).then(res => {
                if (res.data.type == 'success') {
                    alertSuccess(res.data.message);
                    $('#myModal').modal('hide');
                    this.form = {};
                    this.getArea();
                    this.getTable();
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        remove(url) {
            return new Promise((resolve, reject)=> {
                this.$http.post(ceshiApi + url,{'id' : this.updateId},{emulateJSON:true,credentials: true}).then(res => {
                    if (res.data.type == 'success') {
                        alertSuccess(res.data.message);
                        $('#myModal').modal('hide');
                        resolve();
                    }else {
                        alertErrors(res.data.message);
                        reject();
                    }
                })
            })
        },
        clearTable() {
            this.$http.post(ceshiApi + 'clearCyDiningTable',{
                'areaId' : this.areaId,
                'shopId' : this.shopId
            },{emulateJSON:true,credentials: true}).then(res => {
                if (res.data.type == 'success') {
                    alertSuccess(res.data.message);
                    this.getTable();
                }else {
                    alertErrors(res.data.message);
                }
            })
        },
        downloadQrCord(imgSrc) {
            window.open(cyApi + '/downloadTableQrcode?url=' + imgSrc + '&name=' + this.qrCodeData.deskNum,"_self", "");
        },
        downloadQrCordTemplate(imgSrc) {
            window.open(cyApi + '/downloadTableQrcodeTemplate?areaName='+this.qrCodeData.areaName+'&url='+imgSrc+'&tableName='+this.qrCodeData.deskNum,"_self", "");
        },
        listen(val){
            this.cur = val;
            this.pageNum = val;
            this.getTable('1');
        },
        checkedArea(index,id){
            this.indexArea = index;
            this.areaId = id;
            this.status = '';
            this.cur = 1;
            this.pageNum = 1;
            this.getTable();
        },
        checkStatus(index){
            this.status = index;
            this.cur = 1;
            this.pageNum = 1;
            this.getTable('1');
        }
    },
    filters: {
    },
    created:function() {
        let param = window.location.search;
        if (param.indexOf('shopId') >= 0) {
            this.shopId = param.split("=")[1];
            this.getArea();
            this.getTable();
        }
    },
    mounted:function(){
    }
});