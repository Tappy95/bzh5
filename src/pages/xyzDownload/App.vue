<template>
  <div id="app" style="height: 100vh;overflow: auto;background-color:#f64645;">
    <!--<div class="jf_header">-->
    <!--<div @click="backTap"><img src="../../assets/right.png" alt=""></div>-->
    <!--<p>金猪乐园</p>-->
    <!--<p></p>-->
    <!--</div>-->
    <div class="wrap">
      <div class="list_1">
        <img src="../../assets/xyzbga.png" />
      </div>
      <div class="list_2">
        <img
          class="btn-gif"
          @click="downTap"
          src="../../assets/dtBtn.gif"
        />
        <!-- <img src="../../assets/channelDownload/channelDownload_2.jpg" /> -->
      </div>
      <!-- <div class="list_3">
        <img src="../../assets/channelDownload/channelDownload_3.jpg" />
      </div>
      <div class="list_4">
        <img src="../../assets/channelDownload/channelDownload_4.jpg" />
      </div>
      <div class="list_5">
        <img src="../../assets/channelDownload/channelDownload_5.jpg" />
      </div> -->
      <!-- <div class="list_qq">
        <div class="conent">
          <span class="span1">官方QQ：</span>
          <img src="../../assets/channelDownload/channelDownload_qq.png" />
          <span
            class="span2"
            v-clipboard:copy="qq"
            v-clipboard:success="onCopy"
            v-clipboard:error="error"
          >{{qq}}</span>
        </div>
      </div> -->
      <div class="footer" v-show="isShowLoad">
        <div class="center">
          <div class="left">
            <div class="img_div">
              <img src="../../assets/channelDownload/channelDownload_baozhu.png" />
            </div>
            <div class="text">
              <p class="title">宝猪乐园</p>
              <p class="tip">一亿人都想玩的赚钱APP</p>
            </div>
          </div>
          <div class="right">
            <img src="../../assets/channelDownload/channelDownload_load.png" />
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="cd_box" v-show="isShowBox" @touchmove.prevent>
      <div class="cd_box_inner">
        <div class="cd_inner_img">
          <img src="../../assets/cdbox.png" alt />
        </div>
        <div class="cd_close" @click="close"><img src="../../assets/guanbi.png" alt=""></div>
        <div class="cd_inner_con">
          <p>
            注册下载APP签到领
            <span>26</span>红包
          </p>
          <div>
            <input type="text" placeholder="请输入注册手机号" id="phone" v-model="UserPhone" @click="inputFocus"/>
            <div class="cd_flex">
              <input type="text" placeholder="短信验证码" id="code" v-model="UserCode"/>
              <div @click="codeTime(1)">{{codeStatus}}</div>
            </div>
          </div>
          <div class="cd_btn">
            <img src="../../assets/cdbtn.png" alt />
          </div>
        </div>
      </div>
    </div> -->
    <div class="register_box" v-if="isShow" @touchmove.prevent>
      <div class="inner">
        <img class="tip" src="../../assets/mengcengBg.png" />
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { formatDate } from "../../utils/date.js";

export default {
  data() {
    return {
      isShow: true,
      isShowBox: false,
      isShowLoad:false,
      isShowTrue:false,
      channelCode: '',
      loadUrl: '',
      qq: 1501305376,
      termianlType: 0,
      codeStatus: "获取验证码",
      countdown: 60,
      UserPhone: '',
      UserCode:'',
      codeKey:'',
      par:''
    };
  },
  watch: {},
  created() {
    this.token=APP.GetLocationParams("token");
    this.imei=APP.GetLocationParams("imei");
    this.channelCode = APP.GetLocationParams("channelCode");
    this.getparm();
    if(this.isWeiXin()){
      //微信提示
      this.termianlType=1;
    }else if(this.isQQ()){
      this.isShow=false;
      this.termianlType=2;
    }else if(this.isIos()){
      this.isShow=false;
      this.termianlType=3;
    }else if(this.isAndroid()){
      this.isShow=false;
      this.termianlType=4;
    }else{
      Toast("请使用移动端打开！");
      this.termianlType=5;
    }
  },

  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:sss");
    }
  },
  methods: {
    inputFocus(){
      $(window).scroll(function() {
          var top = 0; //获取指定位置
          var scrollTop = $(window).scrollTop();  //获取当前滑动位置
          if(scrollTop > top){                 //滑动到该位置时执行代码
              $(".cd_box").addClass("active");
          }else{
              $(".cd_box").removeClass("active");
          }
      })
    },
    onCopy(e) {
      this.$toast("复制成功");
    },
    // 复制失败
    error(e) {
      this.$toast("复制失败");
    },
    close(){
      this.isShowBox = false;
    },

    getparm(){
      if(this.isAndroid()){
        this.par = 1;
      }else if(this.isIos()){
        this.par = 2;
      }
      let parameterData = {
        pType:this.par,
        channelCode: this.channelCode
      };
      this.$get("/wish/mChannelInfo/getDownloadUrl", parameterData).then(res => {
        if ((res.statusCode + "").startsWith("2")) {
          this.loadUrl = res.data;
        }
      });
    },
    //下载
    downTap() {
      window.location.href = this.loadUrl;
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
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
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
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

img {
  display: block;
}

.jf_header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2.2rem;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
.jf_header img {
  height: 0.8rem;
  margin-left: 0.75rem;
}
.jf_header p:nth-of-type(1) {
  font-size: 0.9rem;
  color: #1d1d1d;
  /*margin-left: 1.4rem;*/
}
.jf_header p:nth-of-type(2) {
  font-size: 0.7rem;
  color: #3c3e5b;
  margin-right: 0.75rem;
}
.wrap {
  width: 100%;
  height: auto;
  position: relative;
}

.sky {
  width: 100%;
  height: 0.6rem;
  background-color: #df2437;
}
.list_1 {
  width: 100%;
  height: auto;
  position: relative;
}

.list_2 {
  position: relative;
}

.list_2 .btn-gif {
  position: absolute;
    left: 4.2rem;
    margin: auto;
    width: 10rem;
    /* height: 2.5rem; */
    top: -10.2rem;
}

.list_1 img:nth-child(1),
.list_2 img,
.list_3 img,
.list_4 img,
.list_5 img,
.list_6 img {
  width: 100%;
}
.list_1 img:nth-child(1),.list_2 img:nth-child(2),
.list_3 img,
.list_4 img,
.list_5 img,
.list_6 img {
  width: 100%;
  pointer-events: none;
}

.list_1 img.btn-gif {
  position: absolute;
  bottom: 0;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2.8rem;
  background: rgba(255, 255, 255, 0.87);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0.4rem 0.8rem;
}

.footer .center {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: space-between;
}

.footer .center .left {
  width: auto;
  height: 2rem;
}
.footer .center .left .img_div {
  width: 2rem;
  height: 2rem;
  float: left;
  margin-right: 0.4rem;
}

.footer .center .left img {
  width: 2rem;
  height: 2rem;
}

.footer .center .right,
.footer .center .right img {
  width: 4.4rem;
  height: 1.8rem;
}

p {
  margin: 0;
  padding: 0;
}
.footer .center .left .text {
  /*width: 6.7rem;*/
  height: 2rem;
  float: left;
}

.footer .center .left p.title {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(68, 8, 7, 1);
  margin: 0.1rem;
}
.footer .center .left p.tip {
  font-size: 0.6rem;
  font-weight: 500;
  color: rgba(147, 49, 50, 1);
}

.list_qq {
  width: 100%;
  height: 5rem;
  background-color: #df2437;
  padding-top: 0.6rem;
}

.list_qq .conent {
  width: 100%;
  height: 0.7rem;
  background-color: #df2437;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.list_qq .conent .span1 {
  font-size: 0.6rem;
  font-weight: 500;
  color: rgba(255, 244, 223, 1);
  float: left;
  text-align: center;
}

.list_qq .conent .span2 {
  font-size: 0.6rem;
  font-weight: 500;
  color: rgba(255, 225, 0, 1);
  float: left;
}

.list_qq .conent img {
  width: 0.5rem;
  height: 0.55rem;
  float: left;
  margin-left: 0.4rem;
  margin-right: 0.2rem;
}

/* 提示弹框 */
.register_box {
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

.register_box .inner {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  background-position: center top;
  background-size: cover;
  overflow: hidden;
}

.register_box .inner .tip {
  width: 15.7rem;
  height: 11.5rem;
  margin: 0.6rem auto auto 1.1rem;
  z-index: 10;
}

.register_box .inner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: -1;
  background-image: url("../../assets/xyzbga.png");
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
.cd_box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  /* z-index: 9999; */
}
.active {
  position: fixed;
  top: -2.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  /* z-index: 9999; */
}
.cd_box_inner {
  position: relative;
  /* top: 13.15rem;
    left: 1.8rem;
    background-color: #fff;
    width: 14.35rem;
    height: 7.45rem;
    border-radius: 0.4rem;
    text-align: center; */
}
.cd_inner_img img {
  width: 18rem;
  /* height: 21.3rem; */
  position: absolute;
  top: 2rem;
  pointer-events: none;
}
.cd_close img{
  width: 1.1rem;
  position: absolute;
  top: 2.5rem;
  right: 2.6rem;
}
.cd_inner_con p {
  position: absolute;
  top: 11.9rem;
  left: 5.1rem;
  font-size: 0.55rem;
  color: #fff;
}
.cd_inner_con span {
  font-size: 0.55rem;
  color: #fff700;
}
#phone {
  width: 11.6rem;
  height: 2rem;
  border: none;
  border-radius: 0.2rem;
  position: absolute;
  top: 12.95rem;
  left: 3.1rem;
  font-size: 0.65rem;
  color: #9ea9bc;
  padding-left: 0.6rem;
}
.cd_flex {
  display: flex;
  position: absolute;
  top: 15.4rem;
  left: 3.1rem;
}
#code {
  width: 7.3rem;
  height: 2rem;
  border: none;
  border-radius: 0.2rem;
  font-size: 0.65rem;
  color: #9ea9bc;
  padding-left: 0.6rem;
}
.cd_flex div {
  width: 3.9rem;
  height: 2rem;
  background-color: #ffd664;
  font-size: 0.65rem;
  color: #7c1c00;
  line-height: 2rem;
  text-align: center;
  border-radius: 0.2rem;
  margin-left: 0.3rem;
}
.cd_btn img {
  width: 11.6rem;
  position: absolute;
  top: 18rem;
  left: 3.1rem;
}
.show_box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.show_box_inner{
  background-color: #fff;
  position: absolute;
  top: 11rem;
  left: 1.6rem;
  width: 14.8rem;
  border-radius: 0.4rem;
  text-align: center;
}
.show_font{
  font-size: 0.7rem;
  color: #3C3E5B;
  padding: 0.8rem 0;
}
.show_line{
  border: 1px solid #F2F2F2;
}
.show_dis{
  display: flex;
  /* padding: 0.6rem 0; */
  justify-content: space-around;
}
.show_dis span{
  border: 1px solid #F2F2F2;
}
.show_dis p:nth-of-type(1){
  font-size: 0.7rem;
  color: #9EA9BC;
  padding: 0.6rem 0;
  margin-left: 1.5rem;
}
.show_dis p:nth-of-type(2){
  font-size: 0.7rem;
  color: #FF3654;
  padding: 0.6rem 0;
  margin-right: 1.5rem;
}
</style>
