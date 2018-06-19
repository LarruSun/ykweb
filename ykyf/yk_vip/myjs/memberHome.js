/**
 * Created by xuwei on 2018/3/5.
 */
new Vue({
    el:'#memberHomeBody',
    filters:{
        formartDate(val){
            let date = new Date(val);
            return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
        }
    },
    data:{
        formData : {
            'title' : '',
            'funcs' : [],
            'type' : 'CY',
            'iscustom' : false,
            'customTitle' : ''
        },
        'imgUrl' : ''
    },
    methods:{
        getMemberHome(){
            this.$http.get(pathApi + '/member/toSetCustomerIndex',{credentials: true}).then( res => {
                if (res.data.type == 'success'){
                    this.formData.Page = res.data.data.pageId;
                    this.formData.title = res.data.data.title;
                    this.formData.createTime = res.data.data.createTime;
                    this.formData.type = res.data.data.type || 'CY';
                    if (this.formData.funcs){
                        this.formData.funcs = res.data.data.funcs.split(',');
                    }else {
                        this.formData.funcs = [];
                    }
                    this.formData.iscustom = res.data.data.iscustom === 'false' ? false : true;
                    this.imgUrl = res.data.data.customImg;
                    if (this.formData.iscustom){
                        this.formData.customTitle = res.data.data.customTitle;
                        this.formData.customImg = res.data.data.customImg;
                        this.formData.customUrl = res.data.data.customUrl;
                    }
                }
            })
        },
        save() {
            let formData = Object.assign({},this.formData);
            if (!formData.title){
                alertErrors('请填写完整表单');
                return
            }
            if (formData.customTitle){
                if (formData.customTitle){
                    formData.iscustom = true;
                }else {
                    formData.iscustom = false;
                    alertErrors('请填写完整表单');
                    return
                }
            }else {
                formData.iscustom = false;
            }
            formData.funcs = formData.funcs.join(',');
            let data  = new FormData();
            for(let k in formData){
                data.append(k , formData[k]);
            }
            if(formData.Page){
                this.$http.post(pathApi + '/member/updTemplatePageVal',data,{emulateJSON:true,credentials: true}).then(res => {
                    if (res.data.type = 'success'){
                        alertSuccess(res.data.message);
                    }else {
                        alertErrors(res.data.message);
                    }
                })
            }else {
                this.$http.post(pathApi + '/member/saveTempPageVal',data,{emulateJSON:true,credentials: true}).then(res => {
                    if (res.data.type = 'success'){
                        alertSuccess(res.data.message);
                    }else {
                        alertErrors(res.data.message);
                    }
                })
            }
        },
        deleteIcon() {
            this.$delete(this.formData,'customTitle');
            this.$delete(this.formData,'customImg');
            this.$delete(this.formData,'customUrl');
            this.imgUrl = '';
            this.formData.iscustom = false;
        },
        bindImg(event){
            let file = event.target.files;
            if (file[0]){
                let reader = new FileReader();
                reader.readAsDataURL(file[0]);
                reader.onload = ()=> {
                    this.imgUrl = reader.result
                };
                lrz(file[0]).then(res => {
                    res.file.name = res.origin.name;
                    this.formData.customImg = res.file;
                })
            }
        }
    },
    created(){
        this.getMemberHome();
    }
});
