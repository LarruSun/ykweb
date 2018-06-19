/**
 * Created by Administrator on 2018/1/31.
 */
const pathApi=base+'/api';
const webApi=base+'/api/web';
const path=base;

function getUserIdBySession(){
    var ykyf_userId=localStorage.getItem("ykyf_userId");
    return ykyf_userId;
}

Vue.component('headd', {   //头部temp
    template: `<div class="navbar-container" id="navbar-container">
        <div class="navbar-header pull-left">
            <a href="#" class="navbar-brand">
                <small>
                    <img src="../img/name.png"  alt="" />
                </small>
            </a>
        </div>
        <div class="navbar-header pull-right" role="navigation">
            <ul class="nav ace-nav">
                <li class="light-blue">
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle">
                        <span class="user-info">
                            <small style="margin-top: 10px;"> {{dataReturn.userName}} </small>
                        </span>
                        <i class="icon-caret-down"></i>
                    </a>
                    <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                        <li>
                            <a href="#">
                                <i class="icon-cog"></i>
                                设置
                            </a>
                        </li>
                        <li>
                            <a v-bind:href="path+'/ykyf/ykyf_html/server_my.html'">
                                <i class="icon-off"></i>
                                退出
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>`,
    data: function () {
        return {
            dataReturn: {
                userName: '456'//用户名
            }
        }
    },
    created: function () {

    },
    methods:{
        secede:function(){
        }
    },
    mounted:function(){
        var ykyf_userId=getUserIdBySession();
        this.$http.post(webApi+"/open/user/getUserById",{userId:ykyf_userId},{emulateJSON:true,credentials:true}).then(function(r){
            var resdata= r.data;
            var loginInfo=resdata.data;
            if(resdata.errorCode=='success'){ //登陆成功,
                this.dataReturn.userName=loginInfo.nickName;
                console.log(this.dataReturn.userName)
            }else{
                //alertErrors(resdata.errorMsg,1500);
            }
        })
    }
})

// 创建根实例
new Vue({
    el: '#head'
})