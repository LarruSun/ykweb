/**
 * Created by Administrator on 2018/1/29.
 */
Vue.component('my-component', {   //头部temp
    template:`<div class="navbar-container" id="navbar-container">
        <div class="navbar-header pull-left">
            <a href="#" class="navbar-brand">
                <small>
                    <img src="../../opEaqul_common/opEaqul_common_images/logo_new2.png" width="25" alt="" />
                    <span >易快云服管理系统</span>
                </small>
            </a><!-- /.brand -->
        </div><!-- /.navbar-header -->
        <div class="navbar-header pull-right" role="navigation">
            <ul class="nav ace-nav">
                <li class="light-blue">
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle">
                        <img class="nav-user-photo" src="../../opEaqul_common/opEaqul_common_images/user.jpg" alt="Jason's Photo" />
                        <span class="user-info">
                            <small>欢迎,</small><span v-model="userName">{{userName}}</span>
                        </span>
                        <i class="icon-caret-down"></i>
                    </a>
                    <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                        <!--<li>-->
                            <!--<a href="#">-->
                                <!--<i class="icon-cog"></i>-->
                                <!--设置-->
                            <!--</a>-->
                        <!--</li>-->
                        <li>
                            <a href="#" @click="secede">
                                <i class="icon-off"></i>
                                退出
                            </a>
                        </li>
                    </ul>
                </li>
            </ul><!-- /.ace-nav -->
        </div><!-- /.navbar-header -->
    </div><!-- /.container -->`,
    data:function(){
         return {
              dataReturn:{
                  userName:''//用户名
              }
         }
    },
    methods:{
        secede:function(){//退出跳转
            this.$http.get(_pathApi+'/op/loginOut.do',{emulateJSON:true,credentials: true}).then(function(res) {
                location.href="../../../opLogin.html"
            })
            $.cookie('opUser',null,{path:"/opEaqul"});
        },
    },
    created:function(){
        var getUsertName=$.cookie("opUser");
        this.userName=getUsertName
        //console.log(ss);
    }
})

// 创建根实例
new Vue({
    el: '#titleApp'
})