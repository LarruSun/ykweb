/**
 * Created by Administrator on 2018/1/31.
 */
const  pathApi=base+'/api';
const  webApi=base+'/api/web';
const  pathVue=base;
Vue.component('headd',{
    template:`    <div class="navbar-container" id="navbar-container">
                      <div class="navbar-header pull-left">
                          <a href="" class="navbar-brand">
                              <small>
                                  <img src="smallroutine_images/wxxcx.png" alt="" />
                                  <!--易快微信小程序-->
                              </small>
                          </a><!-- /.brand -->
                      </div><!-- /.navbar-header -->

                      <div class="navbar-header pull-right" role="navigation">
                          <ul class="nav ace-nav">
                              <li class="light-blue">
                                  <a data-toggle="dropdown" href="" class="dropdown-toggle">
                                      <img class="nav-user-photo" src="smallroutine_images/user.jpg" alt="" />
                                      <span class="user-info">
              									<small>欢迎您,</small>
                                          <span class="user_name">先生/女士</span>
              								</span>
                                      <i class="icon-caret-down"></i>
                                  </a>
                                  <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                                      <!--<li>
                                          <a href="#">
                                              <i class="icon-cog"></i>
                                              Settings
                                          </a>
                                      </li>

                                      <li>
                                          <a href="#">
                                              <i class="icon-user"></i>
                                              Profile
                                          </a>
                                      </li>

                                      <li class="divider"></li>-->

                                      <li>
                                          <a v-bind:href="pathVue+'/ykyf/ykyf_html/server_my.html'">
                                              <i class="icon-off"></i>
                                              退出
                                          </a>
                                      </li>
                                  </ul>
                              </li>
                          </ul><!-- /.ace-nav -->
                      </div><!-- /.navbar-header -->
                  </div><!-- /.container -->`,

})
new Vue({
   el:'#navbar'
})

Vue.component('sidebar',{
    template:` <div>
                  <ul class="nav nav-list">
                      <li  class="active">
                          <a href="" class="dropdown-toggle">
                              <i class="icon-desktop"></i>
                              <span class="menu-text"> 小程序管理 </span>
                          </a>
                          <ul class="submenu">
                              <li>
                                  <a href="smallroutine_index.html" class="smallroutine_set">
                                      <i class="icon-double-angle-right"></i>
                                      小程序设置
                                  </a>
                              </li>
                              <li>
                                  <a href="home_set.html" class="home_set">
                                      <i class="icon-double-angle-right"></i>
                                      主页设置
                                  </a>
                              </li>
                              <li>
                                  <a href="wechat_shipu.html" class="smallroutine_template">
                                      <i class="icon-double-angle-right"></i>
                                      小程序模板
                                  </a>
                              </li>
                          </ul>
                      </li>
                  </ul><!-- /.nav-list -->
                  <div class="sidebar-collapse" id="sidebar-collapse">
                      <i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
                  </div>
              </div>`,
                    data:function(){
                    },
                    methods:{

                    },
                    created:function(){
                        console.log(1456456)
                    },
                    mounted:function(){

                    }

})
/*
new Vue({
     el:'#sidebar'

})*/
