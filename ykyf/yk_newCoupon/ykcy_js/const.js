
//const cyApi='http://192.168.0.88:9101/web/cycy';
//const htmlPath='http://localhost:63342/easy-quikc-basic/eaqul-web/ykyf';

 const cyApi=base+'/api/web/cycy';
 const ceshiApi=base + '/api/web/cycy/';
 const htmlPath=base;
 const vipApi=base+'/api/web/member';


 const couponApi=base+'/api';

//navbar
Vue.component('headd',{
    template:` <div class="navbar-container" id="navbar-container">
                      <div class="navbar-header pull-left">

                          <a href="#" class="navbar-brand">
                              <small>
                                  <img src="../ykcy_images/logo_new2.png" width="25" alt="" />
                                  <span >易快餐饮</span>
                              </small>
                          </a>
                      </div>
                      <div class="navbar-header pull-right" role="navigation">
                          <ul class="nav ace-nav">
                              <li class="light-blue">
                                  <a data-toggle="dropdown" class="dropdown-toggle">
                                  <img v-bind:src="user.businessLogo" alt="" class="nav-user-photo">
                                      <span class="user-info">
                                          <small>欢迎,</small>{{user.nickName}}
                                      </span>
                                      <i class="icon-caret-down"></i>
                                  </a>
                                  <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                                     <!-- <li>
                                          <a href="#">
                                              <i class="icon-cog"></i>
                                              设置
                                          </a>
                                      </li>
                                      <li>
                                          <a href="#">
                                              <i class="icon-user"></i>
                                              用户资料
                                          </a>
                                      </li>-->
                                      <li class="divider"></li>
                                      <li>
                                         <a v-bind:href="htmlPath+hrefUrl">
                                              <i class="icon-off"></i>
                                              退出
                                          </a>
                                      </li>
                                  </ul>
                              </li>
                          </ul>
                      </div>
                  </div>`,
                data:function(){
                    return {
                        user:{},
                        hrefUrl:'/ykcy/ykcy_index.html'
                    }
                },
                methods:{
                    GetQueryString:function(name){
                        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                        var r = window.location.search.substr(1).match(reg);
                        if(r!=null)return  unescape(r[2]); return null;
                    }
                },
                created:function(){
                    if(window.location.href.indexOf('/ykcy/ykcy_index.html') >= 0){
                        this.hrefUrl='/ykyf/ykyf_html/server_my.html'
                    }
                    this.$http.post(cyApi+'/getShopById',{},
                        {emulateJSON:true,credentials: true}).then(function(res){
                        this.user = res.data.data;
                    });

                }
})
new Vue({
    el: '#navbar',
    data:function(){
    },
    methods:{

    },
    created:function(){
    }

})
//sidebar
Vue.component('sidebar',{
    template:`            <div>
                             <ul class="nav nav-list">
                                 <li>
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-list"></i>
                                         <span class="menu-text">优惠券列表</span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                         <li class="couponList">
                                             <a v-bind:href="'../ykcy_html/couponList.html'">
                                                 <i class="icon-double-angle-right"></i>
                                                 优惠券列表
                                             </a>
                                         </li>         
                                     </ul>
                                 </li>
                                



        
                                 <li>
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-signout"></i>
                                         <span class="menu-text"> 券投放列表 </span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                         
                                         
                                         <li class="launchList1">
                                             <a v-bind:href="'../ykcy_html/launchList1.html'">
                                                 <i class="icon-double-angle-right"></i>
                                                 券投放列表
                                             </a>
                                         </li>

                                     </ul>
                                 </li>





                                 <li class="">
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-th-large"></i>
                                         <span class="menu-text"> 领用记录 </span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                         
                                         <li class='collarRecord'>
                                             <a v-bind:href="'../ykcy_html/collarRecord.html'">
                                                 <i class="icon-double-angle-right"></i>
                                                 领用记录
                                             </a>
                                         </li>

                                     </ul>
                                 </li>
                             </ul>
                             <div class="sidebar-collapse" id="sidebar-collapse">
                                 <i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
                             </div>
                         </div>`,
    data:function(){
        return {
            hash:''
        }
    },
    methods:{
        GetQueryString:function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }
    },
    created:function(){
        this.hash='?shopId='+this.GetQueryString("shopId");
        // console.log(this.hash)

    }
})
new Vue({
    el: '#sidebar',
    data:function(){
        return {
             hash:'',
            shop:{}
        }
    },
    methods:{
        GetQueryString:function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }
    },
    created:function(){
        this.hash='?'+location.href.split("?")[1];
        this.hash='?'+this.GetQueryString("shopId");
    },
    mounted:function(){
      var sonpage=$("#sidebar").attr("sonpage");
      $("#sidebar li").removeClass("active");
      $('.'+sonpage).addClass("active");
      $("."+sonpage).parents('li').addClass("active");
    }

})

const switchWeek=function(param){  //周与数字对应转换
    if (param.indexOf(0) >= 0){
        param.splice(param.indexOf(0),1);
        param.push(7);
    }
    let week = { 1 : '周一' , 2 : '周二' , 3 : '周三' , 4 : '周四' , 5 : '周五' , 6 : '周六', 7 : '周日' };
    let str = [];
    let count = '';
    for (let i = 0; i < param.length; i++){
        for(let j in week){
            if (param[i] == j){
                str.push(week[j]);
                if (j - count == 1 && str.length > 1){
                    str.pop();
                    let newStr = str[str.length - 1].split('至');
                    str[str.length - 1] = newStr[0] + '至' + week[j];
                }
                count = j;
            }
        }
    }
    return str.join(',');
}