<template>
   <div id="app" class="wrap" style="height: 100vh;overflow: auto">
     <!--<div class="friendWait-head">-->
       <!--<img src="../../assets/right.png" />-->
       <!--<p>更多任务</p>-->
     <!--</div>-->

     <div class="wrap_main">
       <div class="bg"></div>
        <div class="box">
          <div class="title_tip" v-if="localhref" style="position: absolute;
    top: -1.5rem;
    text-align: center;
    width: 100%;">
            <span class="color_1" style="background-color:#FF2A4A;padding: 4px 11px;
    border-radius: 500px;
    color: white;" @click="redown">下载APP</span>
          </div>
          <div class="title_tip">
            <span class="color_1">注册即送</span>
            <span class="color_2">1000</span>
            <img  src="../../assets/register_jinbi.png"/>
            <span class="color_1">!</span>
            <span class="color_1" style="margin-left: 0.2rem">撸完一波</span>
            <span class="color_2">就提现!</span>
          </div>

          <div class="user_input" style="margin-bottom:0.7rem">
            <img class="inpur_sig" src="../../assets/register_shouji.png"/>
            <input type="text" v-model="UserPhone" placeholder="请输入号码">
          </div>

          <div class="user_input" style="margin-bottom:0.7rem">
            <img class="inpur_sig" src="../../assets/register_shouji.png"/>
            <input type="password" v-model="password" placeholder="请输入密码">
          </div>

          <div class="user_input">
              <img class="inpur_sig" src="../../assets/register_yanzhengma.png"/>
              <input type="text" v-model="UserCode" placeholder="请输入验证码">
              <div @click="codeTime(1)" class="yan_Code">
                <span>{{codeStatus}}</span>
              </div>
          </div>

          <div class="btn_sure">
             <img @click="registerTap" src="../../assets/register_sure.png"/>
          </div>
          <div class="tip">
            邀请码: {{qrCode}}
            <!-- <span v-clipboard:copy="qrCode" v-clipboard:success="onCopy" v-clipboard:error="onCopy">复制</span> -->
            <span>复制</span>
          </div>
        </div>

       <div class="message">
         <div class="hand">
           <img src="../../assets/register_hand.png"/>
         </div>
         <div style="height: auto; background:rgba(255,228,177,1)">
             <div class="tip_img">
               <img src="../../assets/register_tip.png"/>
             </div>
             <div class="message_area">
               <div id="con1" ref="con1" :class="{anim:animate==true}">
                 <div class="item" v-for="(item,index) in scrollData">
                   <img src="../../assets/register_laba.png"/>
                   <span class="c_1">{{item.content}}</span>
                   <span class="c_2">{{item.goodsName}}</span>
                 </div>
               </div>
             </div>
             <div style="width: 100%;height: 0.5rem; background:rgba(255,245,226,1);"></div>
         </div>
         <div class="footer">
           <img src="../../assets/register_footer.png"/>
         </div>
         <!-- <div class="reg_foot">
           <div class="reg_foot_inner">
             <div class="reg_foot_left">
               <div class="reg_foot_left_img">
                 <img src="../../assets/channelDownload/channelDownload_baozhu.png" alt="">
               </div>
               <div class="reg_foot_left_title">
                 <p>宝猪乐园</p>
                 <p>一亿人都想玩的赚钱APP</p>
               </div>
             </div>
             <div class="reg_foot_right">
               <img @click="downTap" src="../../assets/channelDownload/channelDownload_load.png">
             </div>
           </div>
         </div> -->
       </div>
     </div>
     <div class="register_box" v-show="isShow" @touchmove.prevent>
       <div class="register_innderBox">
          <img src="../../assets/channelDownload/cover_tip.png" alt="" class="tip">
       </div>
     </div>
  </div>
</template>

<script type="text/javascript">
  // import { Toast } from 'mint-ui'
  import {formatDate} from '../../utils/date.js'
  // import Vue from 'vue'
  // import VueClipboard from 'vue-clipboard2'
  // Vue.use(VueClipboard)
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        UserPhone:"",
        password:"",
        UserCode:'',
        codeStatus:'获取验证码',
        countdown: 60,
        codeKey:'',
        qrCode:'',
        animate:false,
        scrollData:{},
        token:'',
        imei:'',
        isShow:true,
        termianlType:0,
        rehttp:'',
        localhref:''
      }
    },
    watch:{
    },
    created() {
      this.token = APP.GetLocationParams("token");
      this.imei = APP.GetLocationParams("imei");
      this.qrCode= APP.GetLocationParams("qrCode");
      this.getScroll();
      //this.getDownLoadUrl();
      this.interval = setInterval(this.scroll, 1500);
      if(this.isWeiXin()){
        //微信提示
        this.termianlType=1;
      }else if(this.isIos()){
        // Toast("IOS暂不支持！");
        this.isShow=false;
        this.termianlType=2;
      }else if(this.isAndroid()){
        this.isShow=false;
        this.termianlType=3;
      }else if(this.isQQ()){
        this.isShow=false;
        this.termianlType=4;
      }else{
        this.$toast("请使用移动端打开！");
        this.termianlType=5;
      }
      // localStorage.setItem('localhref','http://baidu.com')
      let localhref = localStorage.getItem('localhref')
      if(localhref){
        this.localhref = localhref
      }
      console.log(this.localhref)
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
      },
    },
    destroyed() {
      clearTimeout(this.isDestroyed);
      clearInterval(this.interval);
      localStorage.removeItem("localhref")
    },
    methods: {
      onCopy(e){
        this.$toast('复制成功');
      },
      // 复制失败
      onError(e){
        this.$toast('复制失败');
      },
      getScroll(){
        this.$get('/api/mLotteryOrder/orderNews').then(res => {
          if((res.statusCode+"").startsWith("2")){
            this.scrollData = res.data;
          }
        })
      },
      redown(){
        if(this.localhref != ''){
          window.location.href = this.localhref;
        }
      },
      getDownLoadUrl(){
        if(this.channelCode == null || this.channelCode == 'null' || this.channelCode == ''){
          this.channelCode = 'baozhu';
        }
        let pType = 1;
        if(this.isIos()){
          pType = 2;  //ios
        }
        let par = {
          pType:pType,
          channelCode: this.channelCode
        };
        this.$get("/api/mChannelInfo/getDownloadUrl", par).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
                localStorage.setItem('localhref',res.data)
            window.location.href = res.data;
          }
        });
      },
      //下载
      // downTap(){
      //   if(this.isIos()){
      //     Toast('苹果手机暂未开放');
      //     return false;
      //   }
      //     window.location.href=this.rehttp;
      // },
      scroll(){
        let con1 = this.$refs.con1;
        this.animate = !this.animate;
        con1.style.marginTop = "-1.6rem";
        let that = this;
        this.isDestroyed = setTimeout(() => {
          that.scrollData.push(that.scrollData[0]);
          that.scrollData.shift();
          that.$refs.con1.style.marginTop = "0.45rem";
          that.animate = !that.animate;
        },1000);
      },
      codeTime(num){
        if(this.countdown<60 && num==1){
          return false;
        }
        if(num==1){
          let pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          // let pattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
          if(!pattern.test(this.UserPhone)){
            this.$toast("请输入正确的手机号");
            return false;
          }
          this.getCode();
        }
        if(this.countdown==0){
          this.codeStatus='获取验证码'
          this.countdown=60;
          return false;
        }else{
          this.countdown--
          this.codeStatus=this.countdown+"s"
        }
        setTimeout(()=>{
          this.codeTime(0);
        },1000);
      },
      backTap(){
        window.history.go(-1);
      },
      jumpTap(){
        this.$router.replace({
          path: '/tworightSelect',
          query:{
            token:this.token,
            imei:this.imei,
            lotteryGroupId:this.datailData.lotteryGroupId,
            lotteryPlayedTplId:this.datailData.lotteryPlayedTplId,
            lotteryId:this.lotteryId
          }
        })
      },
      getCode() {
        let parameterData = {
          accountNum:this.UserPhone,
          ruleNum:20000,
          sendMode:1
        }
        this.$get('/push/validateCode/sendSmsCode', parameterData).then(res => {
          if((res.statusCode+"").startsWith("2")){
            if(res.data.res==true){
              this.$toast(res.data.message)
            }else {
              this.$toast(res.data.message)
            }
          }
        })
      },

      //点击注册
      registerTap(){
        // let pattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[01345678]|9[89])\d{8}$/;
        // let pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        // if(!pattern.test(this.UserPhone)){
        //   Toast("请输入正确的手机号")
        //   return false;
        // }
        if (!this.password){
          this.$toast("请输入密码")
          return false;
        }
        if (!this.UserCode){
          this.$toast("请输入验证码")
          return false;
        }
        let parameterData = {
          accountNum:this.UserPhone,
          ruleNum:20000,
          sendMode:1,
          code:this.UserCode
        }
        this.$get('/push/validateCode/validateSmsCode', parameterData).then(res => {
          if((res.statusCode+"").startsWith("2")){
            if(res.data.res==true){
              this.codeKey = res.data.codeKey;
              let parameter = {
                codeKey:res.data.codeKey,
                mobile:this.UserPhone,
                qrCode:this.qrCode,
                password:md5(this.password)
              }
              this.$get('/api/userInfo/regH5', parameter).then(res => {
                this.$toast(res.message);
                this.channelCode=res.data;
                this.getDownLoadUrl();
              })
            }else {
              this.$toast(res.data.message)
            }
          }
        })
      },
      //判断是安卓还是iOS

        isAndroid(){
            let u = navigator.userAgent, app = navigator.appVersion;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isAndroid == true ? true : false ;
        },
        isIos(){
            let u = navigator.userAgent, app = navigator.appVersion;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isiOS == true ? true : false ;
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
            let ifr = document.createElement('iframe');
            ifr.src = src;
            ifr.style.display = 'none';
            document.body.appendChild(ifr);
            window.setTimeout(function(){
                document.body.removeChild(ifr);
            },2000);
        },
        handleNextPage  ()  {
            let d = new Date();
            let t0 = d.getTime();
            // 判断是安卓还是ios
            if(this.isAndroid_ios()) {
                if(this.isWeiXin()) {
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
                if(this.openApp('myapp://')){
                    // this.openApp('msfacepay://');
                    this.openApp('myapp://"start')
                }else{
                    //由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
                    let delay = setInterval(function(){
                        let d = new Date();
                        let t1 = d.getTime();
                        if( t1-t0<3000 && t1-t0>2000){
                            window.location.href = this.rehttp;
                        }
                        if(t1-t0>=3000){
                            clearInterval(delay);
                        }
                    },1000);
                }
                // window.location.href = "msfacepay://";
                // window.setTimeout(function(){
                //  Alert.hint('暂未开通，敬请期待', 1500);
                //  // window.location.href = "https://itunes.apple.com/cn/app/id1419477919";//打开app下载地址，由app开发人员提供
                // },2000)
            }else {
                if(this.isWeiXin()) {
                    alert('IOS暂未开通，敬请期待', 3000)
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
                window.setTimeout(function(){
                    // window.location.href = "https://itunes.apple.com/cn/app/id1419477919";//打开app下载地址，由app开发人员提供
                },2000)
            }
        }
    }
  }
</script>
<style scoped>
  *{
    box-sizing: border-box;
  }
  .wrap{
    width: 100%;
    height: auto;
    position: relative;
  }

  .anim{
    transition: all 1s;
  }

  .friendWait-head{
    width: 100%;
    height: 2.2rem;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 9999;
  }
  .friendWait-head img{
    width: 0.5rem;
    height: 0.8rem;
    position: relative;
    margin-left: 0.75rem;
  }
  .friendWait-head p{
    font-size: 0.9rem;
    color:rgba(29,29,29,1);
    position: relative;
    margin-left: 5.95rem;
  }
  .wrap_main{
    width: 100%;
    height: 38.75rem;
    position: absolute;
    /*margin-top: 2.2rem;*/
  }
  .bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 38.75rem;
    background: url('../../assets/register_bg.png') no-repeat;
    background-size: 100% 100%;
    pointer-events: none;
  }

  .wrap_main .box{
    position: relative;
    width: 11.6rem;
    height: 10rem;
    margin: 10.9rem 3.2rem 5.75rem 3.2rem;
  }

  .wrap_main .box .title_tip{
    font-size:0.6rem;
    font-weight:400;
    color:rgba(60,62,91,1);
    text-align: center;
    width: 100%;
    height: 0.85rem;
    margin-bottom: 0.65rem;
  }
  .wrap_main .box .title_tip span
  {
    line-height: 0.85rem;
  }
  .wrap_main .box .title_tip .color_1{
     color:#3C3E5B
  }
  .wrap_main .box .title_tip img{
    width: 0.7rem;
    height: 0.7rem;
  }
  .wrap_main .box .title_tip .color_2{
    color:#FF2C55
  }

  .wrap_main .box .user_input{
    width: 11.6rem;
    height: 2.2rem;
    background:rgba(236,231,224,1);
    border-radius:0.4rem;
    display: flex;
    align-items: center;
  }

  .wrap_main .box .user_input input{
    background: none;
    width: 6.7rem;
    height: 2.2rem;
    margin-left: 0.4rem;
    outline: navajowhite;
    border:none;
    font-size: 0.7rem;
  }

  .wrap_main .box .user_input .inpur_sig{
    width: 0.5rem;
    height: 0.6rem;
    margin-left: 0.6rem;
  }

  .wrap_main .box .user_input:nth-child(1) {
    margin-bottom: 0.6rem;
  }
  .wrap_main .box .user_input:nth-child(2){
    margin-bottom: 0.7rem;
  }

  .wrap_main .box .user_input .yan_Code{
    width: 3.6rem;
    height: 1.6rem;
    background: url(../../assets/register_yan.png);
    background-size: 100% 100%;
    margin-right: 0.3rem;
    text-align: center;
    line-height: 1.6rem;
    color: #fff;
    font-size:0.6rem;
    /*padding: 0rem;*/
  }

  .wrap_main .box .btn_sure,.wrap_main .box .btn_sure img{
    width:12rem;
    height: 2.6rem;
  }

  .wrap_main .box .btn_sure{
    margin-top: 0.7rem;
  }

  .wrap_main .box .tip{
    text-align: center;
    font-weight:400;
    color:rgba(254,46,86,1);
   font-size: 0.6rem;
  }
  .wrap_main .box .tip span{
   vertical-align: middle;
    background-color: #eae9e7;
    font-size: 0.5rem;
    color: #A2ABBB;
    border: 0.01rem solid #C9CCD1;
    border-radius: 0.1rem;
    padding: 0.1rem 0.2rem;
  }

  .message{
    width:16.3rem;
    height: auto;
    position: absolute;
    bottom:0;
    left: 0.85rem;
  }

  .message .hand{
    width: 16.3rem;
    height: 1.4rem;
    margin-top: 0.3rem;
  }
  .message .hand img{
    width: 16.3rem;
    height: 1.4rem;
  }

  .message_area{
    width: 16.3rem;
    height: 6.4rem;
    background:rgba(255,245,226,1);
    overflow: hidden;
  }
  #con1{
    padding: 0;
    height: 6.4rem;
  }

  .message .footer,.message .footer img{
    width: 16.3rem;
    height: 1.25rem;
  }

  .message .footer img{
    display: block;
  }

  .message .message_area .item{
    margin: 0 auto;
    display: flex;
    justify-items: center;
    margin-bottom: 0.4rem;
  }

  .message .message_area .item {
    width: 13.4rem;
    height:1.6rem;
    background:rgba(255,228,177,1);
    border-radius:0.8rem;
    display: flex;
    align-items: center;
  }
  .message .message_area .item img{
    width: 0.6rem;
    height: 0.5rem;
    margin-left: 0.8rem;
    margin-right: 0.4rem;
  }

  .message .message_area .item span {
    font-weight:400;
    color:rgba(173,128,34,1);
    font-size:0.55rem;
    font-weight: 400;
  }

  .message .message_area .item span.c_1{
    color: #AD8022;
  }
  .message .message_area .item span.c_2{
    color:  #FF463E;
  }

  .message .tip_img{
    width: 16.3rem;
    height: 1.8rem;
    background:rgba(255,245,226,1);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .message .tip_img img{
    width: 5.05rem;
    height: 1rem;
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
  background-image: url("../../assets/register_bg.png");
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

.reg_foot{
  position: fixed;
  background:rgba(255,255,255,0.87);
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.4rem 0.8rem 0 0.8rem;
}
.reg_foot_inner{
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.reg_foot_left{
  display: flex;
}
.reg_foot_left_img img{
  width: 2rem;
  height: 2rem;
  margin-right: 0.4rem;
}
.reg_foot_left_title p:nth-of-type(1){
  font-size: 0.8rem;
  color: #440807;
  font-weight: bold;
}
.reg_foot_left_title p:nth-of-type(2){
  font-size: 0.6rem;
  color: #933132;
  font-weight: bold;
}
p{
  margin: 0;
  padding: 0;
}
.reg_foot_right img{
  width: 4.4rem;
  height: 1.8rem;
}
</style>
