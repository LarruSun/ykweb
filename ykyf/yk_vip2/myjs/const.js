/**
 * Created by Administrator on 2018/2/26.
 */
//const  pathApi='http://192.168.0.149:9016/api';
//const  path='http://192.168.0.149:9016';
const pathApi=base+'/api/web';
const pathApi1=base+'/api';
const path=base;
Vue.component('headd',{
    template:`<div class="navbar-container" id="navbar-container">
        <div class="navbar-header pull-left">
            <a href="#" class="navbar-brand">
                <small>
                    <img src="../images/img/logo.png"  alt="" />
                    会员管理
                </small>
            </a>
        </div>
        <div class="navbar-header pull-right" role="navigation">
            <ul class="nav ace-nav">
                <li class="light-blue">
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle">
                        <img :src="avatar" alt="" width="30" style="border-radius: 50%">
                        <span class="user-info">
                            <small style="margin-top: 10px;">{{name}}</small>
                        </span>
                        <i class="icon-caret-down"></i>
                    </a>
                    <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                        <!--<li>
                            <a href="#">
                                <i class="icon-cog"></i>
                                设置
                            </a>
                        </li>-->
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
    data() {
        return {
            name: localStorage.getItem('ykyf_nickName'),
            avatar: localStorage.getItem('ykyf_avatar'),
        }
    }
})
new Vue({
    el:'#navbar',

})