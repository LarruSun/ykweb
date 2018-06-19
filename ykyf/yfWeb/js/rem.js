/**
 * Created by xuwei on 2018/5/10.
 */
window.onload=function(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    var deviceWidth = document.documentElement.clientWidth;
    if(deviceWidth > 750) deviceWidth = 750;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}
