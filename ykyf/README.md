网址：https://yun.lolola.cn/ykyf/进入登录界面
1:ykfy:
    yf_login.html(登录主界面)  登录信息保存在localStorage里面   key为:'ykyf_userId'
    yf_editPassword.html（忘记密码）
    yf_registered.html（注册密码）

    登录后跳转到ykyf_html文件夹里面  通过window.location.href='./ykyf_html/index_new.html'跳转

        index_new.html（主页） 
            左侧菜单栏：在tool.js中利用leftBan函数读取数据生成并在主页中引入  在此用A标签跳转页面
            右侧：上(组件  在index-new.js中生成)，中下
        server_my.html（我的服务）
            左侧菜单栏：在tool.js中利用leftBan函数读取数据生成并在主页中引入  在此用A标签跳转页面
            右侧：基础服务和增值服务两大模块用v-for生成  通过后台返回的路径（装在item中）并 window.open(path+item.url)跳转
        server_mall.html（服务商城）
            左侧菜单栏：在tool.js中利用leftBan函数读取数据生成并在主页中引入  在此用A标签跳转页面
            右侧 路由两个组件，buylist组件（默认显示组件） buydetail组件（点击后显示的组件） 通过路由传参实现显示不同页面  在server_mall.js文件里面
        equipment_my.html（我的设备）（待完善）
            左侧菜单栏：在tool.js中利用leftBan函数读取数据生成并在主页中引入  在此用A标签跳转页面
        merchant_set.html（商家设置）
            左侧菜单栏：在tool.js中利用leftBan函数读取数据生成并在主页中引入  在此用A标签跳转页面
            右侧：路由跳转 在 merchant_set.js中
        storeManagement.html（门店管理）window.location.href='storeManagement.html'跳转到门店编辑
            newStoreManagement.html（门店编辑）
        smallroutine_authorSuccess.html（授权成功提示页面）

    js的引用总结：

2:ykcy:
    ykcy_index.html（主界面）
        头部:headd组件 在const.js文件中
        中部分：
        最下面：for循环  然后用a跳转到foodList_add.html页面  并通过url传值，在foodList_add.html通过正则分割出值

        foodList_add.html
            头部： headd组件 在const.js文件中
            左侧：sidebar组件在const.js文件中
        


