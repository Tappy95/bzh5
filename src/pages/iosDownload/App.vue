<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow-x: hidden;overflow-y: scroll;">
        <div class="dl_bg"><img src="../../assets/iosbg.png" alt=""></div>
        <div class="dl_con">
            <div class="dl_con_inner">
                <div class="first_img">
                    <img src="../../assets/first.png" alt="">
                    <img src="../../assets/firstFont.png" alt="">
                </div>
                <div class="sec_img" @click="countDown"><img src="../../assets/firstBtn.png" alt=""></div>
                <div class="th_font">
                    <p>1、若未安装成功，点击此按钮从新安装</p>
                    <p>2、若您的iOS版宝猪乐园无法正常体验，请卸载后从新下载安装；原版本不卸载会影响正常使用！</p>
                </div>
            </div>
            <div class="dl_con_sec">
                <div class="sec_top">
                    <img src="../../assets/sec.png" alt="">
                    <img src="../../assets/secfont.png" alt="">
                </div>
                <div class="sec_bottom">
                    <img src="../../assets/iostips.png" alt="">
                    <img src="../../assets/iostipstwo.png" alt="">
                </div>
                <div class="sec_btn">
                    <a href="http://192.168.3.38:9989/1.mobileprovision"><img src="../../assets/xinren.png" alt="" v-show="isShowOne"></a>
                    <div v-show="isShowTwo">
                        <img src="../../assets/huise.png" alt="">
                        <p>{{time}}s后点击该按钮信任</p>
                    </div>
                </div>
                <div class="sec_font" @click="open">
                    <p>若点击“信任”无法跳转，查看“<span>信任步骤</span>”设置信任</p>
                </div>
            </div>
            <div class="dl_con_tri">
                <div class="tri_top">联系我们</div>
                <div class="tri_bottom">
                    <div>
                        <p>客服QQ：</p>
                        <p>1501305376</p>
                    </div>
                    <div style="margin-left:4.75rem">
                        <p>宝猪QQ群：</p>
                        <p>155496279</p>
                    </div>
                </div>
            </div>

        </div>
        <div style="height:0.8rem;margin-top: 26rem;"></div>

        <div class="dl_box" v-show="isShow">
            <div class="dl_box_inner">
                <div class="dl_box_head"><img src="../../assets/dlbox.png" alt=""></div>
                <div class="dl_box_close" @click="close"><img src="../../assets/closeother.png" alt=""></div>
                <div class="dl_box_con">
                    <mt-swipe :auto="3000">
                        <mt-swipe-item><img src="../../assets/stepone.png" alt=""></mt-swipe-item>
                        <mt-swipe-item><img src="../../assets/steptwo.png" alt=""></mt-swipe-item>
                        <mt-swipe-item><img src="../../assets/stepthree.png" alt=""></mt-swipe-item>
                        <mt-swipe-item><img src="../../assets/stepfour.png" alt=""></mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>

        <div class="register_box" v-show="isShowBox" @touchmove.prevent>
            <div class="register_innderBox">
                <img src="../../assets/iosmengceng.png" alt="" class="tip">
            </div>
        </div>

    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
// import { Toast } from "mint-ui";

export default {
    data(){
        return{
            isShow:false,
            time:'10',
            isShowOne:false,
            isShowTwo:true,
            isShowBox:true,
            termianlType:0
        }
    },
    created(){
        this.channelCode = APP.GetLocationParams("channelCode");
        this.downTap();
        if(this.isIos()) {
            this.isShowBox = false;
            if(this.isWeiXin() || this.isQQ()){
                this.isShowBox = true;
            }
            this.termianlType = 2;
        } else if (this.isAndroid()) {
            this.isShowBox = false;
            this.termianlType = 3;
        }else {
            Toast("请使用移动端打开！");
            this.termianlType = 4;
        }
    },
    methods:{
        downTap(){
            if(this.isAndroid()){
                let par = {
                    pType:1,  //安卓
                    channelCode: this.channelCode
                };
                this.$get("/api/mChannelInfo/getDownloadUrl", par).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        this.loadUrl = res.data;
                    }
                });
            }else if(this.isIos()){
                let par = {
                    pType:2,  //ios
                    channelCode: this.channelCode
                };
                this.$get("/api/mChannelInfo/getDownloadUrl", par).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        this.loadUrl = res.data;
                    }
                });
            }
        },
        open(){
            this.isShow = true;
        },
        close(){
            this.isShow = false;
        },
        countDown(){
            window.location.href = this.loadUrl;
            this.time = 10;
            var count = setInterval( () =>{
                this.time--;
                if(this.time == 0){
                    this.isShowTwo = false;
                    this.isShowOne = true;
                    clearInterval(count);
                }
            },1000)
        },
        //判断是安卓还是iOS
        isAndroid() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isAndroid == true ? true : false;
        },
        isIos() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isiOS == true ? true : false;
        },
        //判断是否微信或QQ
        isWeiXin() {
            var ua = navigator.userAgent.toLowerCase();
            if (/MicroMessenger/gi.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return "weixin";
            } else if (ua.match(/QQ/i) == "qq") {
                return "QQ";
            }
            return false;
        },
        isQQ(){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/QQ/i)=='qq'){
                return true;
            }else{
                return false;
            }
        },
        openApp(src) {
            // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
            // 否则打开a标签的href链接
            let ifr = document.createElement("iframe");
            ifr.src = src;
            ifr.style.display = "none";
            document.body.appendChild(ifr);
            window.setTimeout(function() {
                document.body.removeChild(ifr);
            }, 2000);
        },
        handleNextPage() {
            let d = new Date();
            let t0 = d.getTime();
            // 判断是安卓还是ios
            if (this.isAndroid_ios()) {
                if (this.isWeiXin()) {
                // 引导用户在浏览器中打开
                // alert('请在浏览器中打开本链接', 3000);
                return;
                }
                // var ua = window.navigator.userAgent;
                // var uad2 = window.navigator.userAgent.toLowerCase();
                // if (uad2.indexOf(" qq") > -1 && uad2.indexOf("mqqbrowser") < 0) {
                // //qq内置浏览器
                //     alert('请在浏览器中打开本链接', 3000);
                //     return;
                // }
                //Android
                if (this.openApp("myapp://")) {
                // this.openApp('msfacepay://');
                this.openApp('myapp://"start');
                } else {
                //由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
                let delay = setInterval(function() {
                    let d = new Date();
                    let t1 = d.getTime();
                    if (t1 - t0 < 3000 && t1 - t0 > 2000) {
                    window.location.href =
                        "https://a.app.qq.com/o/simple.jsp?pkgname=com.micang.baozhu";
                    }
                    if (t1 - t0 >= 3000) {
                    clearInterval(delay);
                    }
                }, 1000);
                }
                // window.location.href = "msfacepay://";
                // window.setTimeout(function(){
                //  Alert.hint('暂未开通，敬请期待', 1500);
                //  // window.location.href = "https://itunes.apple.com/cn/app/id1419477919";//打开app下载地址，由app开发人员提供
                // },2000)
            } else {
                if (this.isWeiXin()) {
                alert("IOS暂未开通，敬请期待", 3000);
                // window.location.href = 'https://itunes.apple.com/cn/app/id1419477919'
                return;
                }
                //IOS
                // window.location.href = 'msfacepay://'
                // if(openApp('msfacepay://')){
                //     openApp('msfacepay://');
                // }else{
                //     var delay = setInterval(function(){
                //         var d = new Date();
                //         var t1 = d.getTime();
                //         if( t1-t0<3000 && t1-t0>2000){
                //             alert('请下载APP');
                //             window.location.href = "https://itunes.apple.com/cn/app/id1419477919";
                //         }
                //         if(t1-t0>=3000){
                //             clearInterval(delay);
                //         }
                //     },1000);
                // }
                //iOS不支持iframe打开APP
                window.location.href = "msfacepay://";
                window.setTimeout(function() {
                // window.location.href = "https://itunes.apple.com/cn/app/id1419477919";//打开app下载地址，由app开发人员提供
                }, 2000);
            }
        }


    }
}
</script>
<style scoped>
p{
    margin: 0;
}
.dl_bg img{
    width: 18rem;
}
.dl_con{
    position: relative;
}
.dl_con_inner{
    width: 15.6rem;
    height: 8.5rem;
    background-color: #fff;
    position: absolute;
    top: -3.5rem;
    left: 0.6rem;
    padding: 0.7rem 0.6rem 0 0.6rem;
    border-radius: 0.4rem;
}
.first_img{
    display: flex;
    align-items: center;
}
.first_img img:nth-of-type(1){
    width: 0.9rem;
    margin-right: 0.4rem;
}
.first_img img:nth-of-type(2){
    width: 5.7rem;
}
.sec_img img{
    width: 12rem;
    margin: 0.7rem 0 0 2rem;
}
.th_font{
    font-size: 0.55rem;
    color: #9EA9BC;
}
.th_font p:nth-of-type(1){
    margin-bottom: 0.2rem;
}
.dl_con_sec{
    width: 15.6rem;
    height: 12.95rem;
    background-color: #fff;
    position: absolute;
    top: 6.2rem;
    left: 0.6rem;
    padding: 0.7rem 0.6rem 0 0.6rem;
    border-radius: 0.4rem;
}
.sec_top{
    display: flex;
    align-items: end;
    margin-bottom: 0.4rem;
}
.sec_top img:nth-of-type(1){
    width: 0.9rem;
    margin-right: 0.4rem;
}
.sec_top img:nth-of-type(2){
    width: 13.65rem;
}
.sec_bottom{
    display: flex;
    align-items: end;
}
.sec_bottom img{
    width: 7.4rem;
}
.sec_bottom img:nth-of-type(1){
    margin-right: 0.4rem;
}
.sec_btn img{
    width: 12rem;
    margin: 0.7rem 0 0 2rem;
}
.sec_btn p{
    position: absolute;
    bottom: 3.5rem;
    font-size: 0.7rem;
    color: #fff;
    left: 5.2rem;
}
.sec_font{
    font-size: 0.6rem;
    color: #3C3E59;
    text-align: center;
}
.sec_font span{
    font-size: 0.6rem;
    color: #15A5FE;
}
.dl_con_tri{
    width: 15.6rem;
    /* height: 5.5rem; */
    background-color: #fff;
    position: absolute;
    top: 20.4rem;
    left: 0.6rem;
    padding: 0.7rem 0.6rem;
    border-radius: 0.4rem;
}
.tri_top{
    text-align: center;
    width: 3.6rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #FF3423;
    border-radius: 0.1rem;
    font-size: 0.6rem;
    color: #FFF;
    margin-bottom: 0.75rem;
}
.tri_bottom{
    display: flex;
}
.tri_bottom p:nth-of-type(1){
    font-size: 0.55rem;
    color: #9EA9BC;
    margin-bottom: 0.3rem;
}
.tri_bottom p:nth-of-type(2){
    font-size: 0.7rem;
    color: #3C3E59;
}

/* 弹框 */
.dl_box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99;
}
.dl_box_inner{
    position: relative;
}
.dl_box_head img{
    position: absolute;
    top: 3.8rem;
    left: 5.8rem;
    width: 6.35rem;
    z-index:99;
}
.dl_box_close img{
    position: absolute;
    top: 4.6rem;
    right: 1.4rem;
    z-index:99;
}
.dl_box_con{
    position: absolute;
    background-color: #fff;
    width: 15.2rem;
    top: 4.3rem;
    left: 0.8rem;
    border-radius: 0.4rem;
    height:17.6rem;
    text-align: center;
    padding: 1.2rem 0.6rem;
}
.dl_box_con img{
    width: 15.85rem;
}
/* 提示弹框 */
.register_box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 9999;
}
.register_innderBox{
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  background-position: center top;
  background-size: cover;
  overflow: hidden;
}
.register_box .register_innderBox .tip {
  width: 15.7rem;
  height: 11.5rem;
  margin: 0.6rem auto auto 1.1rem;
  z-index: 10;
}
.register_box .register_innderBox::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: -1;
  background-image: url("../../assets/iosbg.png");
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -ms-filter: blur(20px);
  -o-filter: blur(20px);
  filter: blur(20px);
  margin: -30px;
}
.register_box img{
  width:106vw;
  height: 100vh;
}
</style>
