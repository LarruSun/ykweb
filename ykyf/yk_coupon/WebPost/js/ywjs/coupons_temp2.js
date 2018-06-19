
new Vue({
    el: '#app',
    data: {
        user: "",//商家信息
        couponsInfo: "",
        postInfo: "",
        backgroundImgStyle:{
            background: 'url(https://yun.eaqul.com/yk_coupon/WebPost/images/bg.png)'
        },
        backgroundMusicUrl:'https://yun.eaqul.com/yk_coupon/voice/live.mp3',

    },
    methods: {
        getCouponsInfoByPlayId: function () {
            var obj = {};
            let reg = `(^|&)posterId=([^&]*)(&|$)`
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                obj.playBillId = unescape(r[2]);
            }
            this.$http.post(webApi + '/coupon/open/get/getCouponsInfoByPlayId', obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                console.log(res);
                if (res.body.type = 'success') {
                    this.user = res.body.data.user;
                    this.postInfo = res.body.data.post;
                    if (res.body.data.list != undefined) {
                        this.couponsInfo = res.body.data.list;
                    }

                    this.setDomAttr(this.postInfo);
                    this.init();
                    this.flowerFlay();

                    this.getJssdk();
                } else {
                    alertErrors("获取信息失败");
                }
            });
        },
        audioListener:function () {
            var musicC = document.querySelector(".music-c");
            var musicnote = document.querySelector(".music-note");
            var audio = document.querySelector("audio");
            if (audio.paused) {
                audio.play();
                musicnote.style.display = "block";
                musicC.style.animationPlayState = "running";
            } else {
                audio.pause();
                musicnote.style.display = "none";
                musicC.style.animationPlayState = "paused";
            }
        },

        flowerFlay:function(){
            var d="<div class='snow'><img src='../images/flower01.png' alt=''><div>"
            setInterval(function(){
                var f=$(document).width();
                var e=Math.random()*f-100;
                var o=0.3+Math.random();
                var fon=10+Math.random()*30;
                var l = e - 100 + 200 * Math.random();
                var k=2000 + 5000 * Math.random();
                $(d).clone().appendTo(".swiper-container").css({
                    left:e+"px",
                    top:0,
                    opacity:o,
                    "font-size":fon,
                    "z-index":8,
                    "position":"absolute"
                }).animate({
                    top:"400px",
                    left:-l+"px",
                    opacity:0.1,
                },k,"linear",function(){$(this).remove()})
            },1000)
        },

        setDomAttr: function (obj) {
            var img = JSON.parse(obj.img);
            var quan = JSON.parse(obj.quan);
            var txt = JSON.parse(obj.txt);
            var posterImg = document.getElementsByClassName('poster-img'); //图片
            var posterQuanT = document.getElementsByClassName("poster-quan"); //优惠券
            var posterTxt = document.getElementsByClassName("poster-txt"); //文本
            //var iframeBg = document.querySelector('.iframeBg'); //背景图
            var pageName = document.querySelector(".pageName"); //页面title
            //var bgMusic = document.querySelector(".bgMusic"); //页面背景音乐
            $(pageName).html(obj.posterName); //设置页面title
            if (obj.backgroundImg != '') { //设置页面背景图
                //$(iframeBg).css("background", 'url(' + obj.backgroundImg + ')');
                this.backgroundImgStyle.background='url('+obj.backgroundImg+')';
            }
            if (obj.backgroundMusic != '') { //设置背景音乐
                var backgroundMusic = JSON.parse(obj.backgroundMusic);
                //$(bgMusic).attr("src", backgroundMusic.musicUrl);
                this.backgroundMusicUrl=backgroundMusic.musicUrl;
            }
            for (var i = 0; i < img.length; i++) { //设置图片
                var anim = img[i].anim;
                if (anim && anim != '') {
                    $(posterImg).eq(img[i].ind).parent().attr('swiper-animate-effect', anim);
                }
            }
            for (var i = 0; i < quan.length; i++) { //设置优惠券
                var anim = quan[i].anim;
                /*var vouchers = quan[i].vouchers;
                var lowestConsume = quan[i].lowestConsume;*/
                if (anim != undefined && anim != '') {
                    $(posterQuanT).eq(quan[i].ind).find(".item").attr('swiper-animate-effect', anim);
                }
                /*if (vouchers != undefined && vouchers != '') {
                    $(posterQuanT).eq(quan[i].ind).find(".vouchers").html(vouchers);
                }
                if (lowestConsume != undefined) {
                    $(posterQuanT).eq(quan[i].ind).find(".lowestConsume").html(lowestConsume);
                }*/
            }
            for (var i = 0; i < txt.length; i++) {
                var anim = txt[i].anim;
                var fontsize = txt[i].fontsize;
                var fontmargin = txt[i].fontmargin;
                var fontlineheight = txt[i].fontlineheight;
                var fonttxt = txt[i].txt;
                var fontcolor = txt[i].fontcolor;
                if (fonttxt && fonttxt != '') {
                    $(posterTxt).eq(txt[i].ind).find("p").html(txt[i].txt);
                }
                if (anim && anim != '') {
                    var dom = $(posterTxt).eq(txt[i].ind).find("p").attr('swiper-animate-effect', anim);
                }
                if (fontsize && fontsize != '') {
                    var dom = $(posterTxt).eq(txt[i].ind).find("p").css("font-size", fontsize);
                }
                if (fontcolor && fontcolor != '') {
                    var dom = $(posterTxt).eq(txt[i].ind).find("p").css("color", fontcolor);
                }
                if (fontmargin && fontmargin != '') {
                    var dom = $(posterTxt).eq(txt[i].ind).find("p").css("letter-spacing", fontmargin)
                }
                if (fontlineheight && fontlineheight != '') {
                    var dom = $(posterTxt).eq(txt[i].ind).find("p").css("line-height", fontlineheight)
                }
            }

        },

        init: function () {
            var swiper = new Swiper(".swiper-container", {
                "direction": "vertical",
                "autoplay": 5000,
                "pagination": ".swiper-pagination",
                "effect": "coverflow",
                onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
                    swiperAnimateCache(swiper); //隐藏动画元素
                    swiperAnimate(swiper); //初始化完成开始动画
                },
                onSlideChangeEnd: function (swiper) {
                    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                }
            });
        },

        getJssdk: function () {
            var targetUrl = location.href.split("#")[0];
            var obj = {};
            obj.url_ = targetUrl;
            obj.userId = this.user.id;
            this.$http.post(webApi + '/user/open/getJSSDK', obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type = 'success') {
                    var msg = res.body.data;
                    wx.config({
                        debug: false,
                        appId: msg.appId,
                        timestamp: msg.timestamp,
                        nonceStr: msg.nonceStr,
                        signature: msg.signature,
                        jsApiList: ['addCard']
                    });
                } else {
                    alertErrors("获取信息失败");
                }
            });

        },
        toGetCoupon: function (e) {
            document.querySelector("audio").pause();
            var dom=e.target;
            var card_id = $(dom).attr("value");
            var obj = {};
            obj.userId = $(dom).attr("user-id");
            obj.card_id = card_id;
            this.$http.post(webApi + '/user/open/coupon/getJSSDK', obj, {
                emulateJSON: true,
                credentials: true
            }).then(function (res) {
                if (res.body.type = 'success') {
                    var msg = res.body.data;
                    var data = {};
                    data.timestamp = msg.timestamp;
                    data.nonce_str = msg.nonceStr;
                    data.outer_str = this.postInfo.id;
                    data.signature = msg.signature;
                    this.wxAddCard(data, card_id);
                } else {
                    alertErrors("获取信息失败");
                }
            });
        },
        wxAddCard: function (data, card_id) {
            wx.ready(function () {
                wx.addCard({
                    cardList: [{
                        cardId: card_id,
                        cardExt: JSON.stringify(data)

                    }], // 需要添加的卡券列表
                    success: function (res) {
                        var cardList = res.cardList; // 添加的卡券列表信息
                    }
                });
                wx.error(function (res) {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            })
        }
    },
    created: function () {
        this.getCouponsInfoByPlayId();
    }

})