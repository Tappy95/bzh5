<template>
    <div id="app" style="height: 100vh;overflow: auto">
        <div :class="isShow ? 'InvitationCode_bg1' : 'InvitationCode_bg'">
        <!-- <div class="InvitationCode_bg"> -->
            <!-- 背景图 -->
            <div class="InvitationCode-photo"><img src="../../assets/InvitationCodeBg.png" alt=""></div>
            <div class="inviteFriendsCode-content">
                <p>{{mobile}} 邀请你参加</p>
                <p>好友对战答题</p>
                <h2>邀请码：{{entryCode}}</h2>
                <img src="../../assets/InvitationCodeBtn.png" @click="downTap" />
            </div>
            <div class="inviteFriendsCode-footFont">如何进入好友对战？<br/> 安装并启动宝猪乐园，进入对战答题-好友对战，输入邀请码，即可和我一起玩。</div>
        </div>
        <div class="ic_box" v-show="isShow" @touchmove.prevent>
            <div class="ic_innderBox">
                <img src="../../assets/mengceng.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
//   import { Toast } from 'mint-ui'

export default {
    data(){
        return {
           entryCode:'',
           mobile:'',
           isShow:true
        }
    },
    created(){
        this.channelCode =APP.GetLocationParams("channelCode");
        this.mobile = APP.GetLocationParams("mobile").substring(0,3)+"****"+APP.GetLocationParams("mobile").substring(7,11); // 我方号码
        this.entryCode =  APP.GetLocationParams("entryCode");
        if(this.isWeiXin()){
        //微信提示
            Toast("请使用浏览器打开！");
            this.termianlType=1;
        }else if(this.isIos()){
            Toast("IOS暂不支持！")
            this.termianlType=2;
        }else if(this.isAndroid()){
            this.isShow=false;
            this.termianlType=3;
        }else{
            Toast("请使用移动端打开！");
            this.termianlType=4;
        }
    },
    methods:{
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
            if(/MicroMessenger/gi.test(navigator.userAgent)) {
                return true;
            }else {
                return false;
            }
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                return "weixin";
            } else if (ua.match(/QQ/i) == "qq") {
                return "QQ";
            }
            return false;
        },

        //下载
        downTap(){
            if(this.isAndroid()){
                let par = {
                    pType:1,  //安卓
                    channelCode: this.channelCode
                };
                this.$get("/api/mChannelInfo/getDownloadUrl", par).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                    window.location.href = res.data;
                    }
                });
            }else if(this.isIos()){
                let par = {
                    pType:2,  //ios
                    channelCode: this.channelCode
                };
                this.$get("/api/mChannelInfo/getDownloadUrl", par).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                    window.location.href = res.data;
                    }
                });
            }
            // let par = {
            //     channelCode:this.channelCode
            // }
            // this.$get('/api/mChannelInfo/getDownloadUrl',par).then(res => {
            //     if((res.statusCode+"").startsWith("2")){
            //         this.loadUrl = res.data
            //         window.location.href=this.loadUrl;
            //     }
            // })
        },
    },
    mounted(){
    }
}
</script>

<style scoped>
/* 背景色 */
.InvitationCode_bg{
    height: 100%;
    position: absolute;
    width: 100%;
    background-color: #FC452B;
    /* filter:blur(0.25rem); */
}
.InvitationCode_bg1{
    height: 100%;
    position: absolute;
    width: 100%;
    background-color: #FC452B;
    filter:blur(0.25rem);
}
.InvitationCode-photo img{
    width: 100%;
    max-width: 100%;
    position: absolute;
    z-index: 99;
}
.inviteFriendsCode-content{
    position: absolute;
    z-index: 101;
    width: 16.4rem;
    height: 12.45rem;
    background-color: #fff;
    border-radius: 0.4rem;
    top: 6.7rem;
    left: 0.8rem;
    text-align: center;
}
.inviteFriendsCode-content p:nth-of-type(1){
    font-size: 0.7rem;
    color: #9EA9BC;
    margin-top: 1.2rem;
}
.inviteFriendsCode-content p:nth-of-type(2){
    font-size: 0.8rem;
    color: #3C3E5B;
    margin-top: -0.2rem;
}
.inviteFriendsCode-content h2{
    font-size: 1.2rem;
    color: #3C3E5B;
}
.inviteFriendsCode-content img{
    width: 13.2rem;
    height: 2.2rem;
    margin-top: 0.6rem;
}
.inviteFriendsCode-footFont{
    position: absolute;
    z-index:100;
    font-size: 0.7rem;
    color: #fff;
    top: 20rem;
    margin: 0 1.6rem;
    line-height: 1rem;
}
/* 提示弹框 */
.ic_box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 101
}
.ic_innderBox{
  text-align: center;
}
.ic_box img{
  width:15.7rem;
  height: 11.5rem;
}
</style>

