
//const cyApi='http://192.168.0.88:9101/web/cycy';
//const htmlPath='http://localhost:63342/easy-quikc-basic/eaqul-web/ykyf';

 const cyApi=base+'/api/web/cycy';
 const ceshiApi=base + '/api/web/cycy/';
 const htmlPath=base;
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
                                <!-- <li class="cyInd">
                                     <a v-bind:href="'../ykcy_html/cy_index.html'+hash" class="dropdown-toggle">
                                         <i class="icon-desktop"></i>
                                         <span class="menu-text"> 首页 </span>
                                     </a>
                                 </li>-->
                                 <li>
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-list"></i>
                                         <span class="menu-text"> 门店设置</span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                         <li class="cyremind">
                                             <a v-bind:href="'../ykcy_html/setup_warm.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 提醒设置
                                             </a>
                                         </li>
                                         <li class="tableList">
                                             <a v-bind:href="'../ykcy_html/tableList.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 桌台列表
                                             </a>
                                         </li>
                                         <!--<li>
                                             <a href="javascript:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 操作员
                                             </a>
                                         </li>-->
                                         <li class="cy_depart">
                                             <a v-bind:href="'../ykcy_html/cy_department.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 出品部门
                                             </a>
                                         </li>
                                         <li class="cy_printer">
                                             <a v-bind:href="'../ykcy_html/cy_printer.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 打印机
                                             </a>
                                         </li>
                                         <li class="cy_receipt">
                                             <a v-bind:href="'../ykcy_html/cy_receipt.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 小票设置
                                             </a>
                                         </li>
                                        
                                         <li class="cy_surcharge">
                                             <a v-bind:href="'../ykcy_html/cy_surcharge.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 附加费设置
                                             </a>
                                         </li>
                                         

                                         <li class="cy_selfDistribution">
                                             <a v-bind:href="'../ykcy_html/cy_selfDistribution.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 自营配送员
                                             </a>
                                         </li>


                                     </ul>
                                 </li>
                                 <li class="">
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-th-large"></i>
                                         <span class="menu-text"> 菜品管理 </span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                         <li class="cyfoodList">
                                             <a v-bind:href="'../ykcy_html/foodList.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 菜品列表
                                             </a>
                                         </li>
                                         <li class="cy_foodType">
                                             <a v-bind:href="'../ykcy_html/cy_foodType.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 菜品分类
                                             </a>
                                         </li>
                                         <!-- <li class="cysuitList">
                                             <a v-bind:href="'../ykcy_html/foodGroup.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 套餐组合
                                             </a>
                                         </li>
                                        <li>
                                             <a href="javascript:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 套餐分类
                                             </a>
                                         </li>-->
                                          <li class="foodstatus0">
                                            <a v-bind:href="'../ykcy_html/dishesPractices.html'+hash">
                                                <i class="icon-double-angle-right"></i>
                                                菜品做法
                                            </a>
                                        </li>
                                        <li class="foodstatus1">
                                            <a v-bind:href="'../ykcy_html/FoodIngredients.html'+hash">
                                                <i class="icon-double-angle-right"></i>
                                                菜品配料
                                            </a>
                                        </li>
                                        <li class="foodstatus2">
                                            <a v-bind:href="'../ykcy_html/FoodLabels.html'+hash">
                                                <i class="icon-double-angle-right"></i>
                                                菜品标签
                                            </a>
                                        </li>
                                        <li  class="foodstatus3">
                                            <a v-bind:href="'../ykcy_html/Foodremark.html'+hash">
                                                <i class="icon-double-angle-right"></i>
                                                菜品备注
                                            </a>
                                        </li>
                                        <li class="cybills">
                                             <a v-bind:href="'../ykcy_html/TakeFoodRecipes.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 菜谱设置
                                             </a>
                                         </li>
                                     </ul>
                                 </li>
                                <!-- <li>
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-columns"></i>
                                         <span class="menu-text"> 堂食管理 </span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                         <li>
                                             <a href="javascript:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 堂食设置
                                             </a>
                                         </li>
                                         <li>
                                             <a href="javascript:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 桌台列表
                                             </a>
                                         </li>
                                         <li>
                                             <a href="javascript:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 厅房列表
                                             </a>
                                         </li>
                                         <li>
                                             <a href="javascript:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 堂食菜谱
                                             </a>
                                         </li>
                                     </ul>
                                 </li>-->
                                <!-- <li>
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-signout"></i>
                                         <span class="menu-text"> 外卖管理 </span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                         <li class='setup_out'>
                                             <a href="../ykcy_html/setup_out.html">
                                                 <i class="icon-double-angle-right"></i>
                                                 外卖设置
                                             </a>
                                         </li>
                                         <li>
                                             <a href="javasctipt:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 外卖菜谱
                                             </a>
                                         </li>
                                         <li>
                                             <a href="javasctipt:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 菜谱投放
                                             </a>
                                         </li>
                                     </ul>
                                 </li>
                                 <li>
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-signout"></i>
                                         <span class="menu-text"> 外卖管理 </span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                        
                                         &lt;!&ndash;<li>
                                             <a href="javasctipt:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 外卖菜谱
                                             </a>
                                         </li>
                                         <li>
                                             <a href="javasctipt:;">
                                                 <i class="icon-double-angle-right"></i>
                                                 菜谱投放
                                             </a>
                                         </li>&ndash;&gt;
                                     </ul>
                                 </li>-->
                                 <li>
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-signout"></i>
                                         <span class="menu-text"> 订单管理 </span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                         <li class="eatIn">
                                             <a v-bind:href="'../ykcy_html/eatIn.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 堂食订单
                                             </a>
                                         </li>
                                         <li class="wmOrderList">
                                             <a v-bind:href="'../ykcy_html/wmOrderList.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 外卖订单
                                             </a>
                                         </li>
                                         <li class="applyForList">
                                             <a v-bind:href="'../ykcy_html/applyForList.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 售后订单
                                             </a>
                                         </li>
                                     </ul>
                                 </li>
                                 <li class="">
                                     <a href="#" class="dropdown-toggle">
                                         <i class="icon-th-large"></i>
                                         <span class="menu-text"> 移动门店管理 </span>
                                         <b class="arrow icon-angle-down"></b>
                                     </a>
                                     <ul class="submenu">
                                         <li class="eatInIndex">
                                             <a v-bind:href="'../ykcy_html/EatinHomePage.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 堂食主页
                                             </a>
                                         </li>
                                         <li class="takeIndex">
                                             <a v-bind:href="'../ykcy_html/TakeHomePage.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 外卖主页
                                             </a>
                                         </li>
                                         <li class='setup_out'>
                                             <a v-bind:href="'../ykcy_html/setup_out.html'+hash">
                                                 <i class="icon-double-angle-right"></i>
                                                 基本设置
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