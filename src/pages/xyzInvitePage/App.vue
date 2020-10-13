<template>
    <div id="app" style="height: 100vh;background: #E8321D;overflow: auto;">
        <div class="lp_head" @click="back" v-show="isShow">
            <img src="../../assets/xyz/right.png" alt="">
            <p>邀请</p>
        </div>
        <div>
            <img src="../../assets/xyz/yaoqing.png" alt="" class="ip_bg" :class="this.isIos() ? 'ip_bg_active' : ''">
        </div>
        <div class="ip_top" @click="jump">
            <div>
                <p>{{wishMentorCount.number}}人</p>
                <img src="../../assets/xyz/wodeyaoqing.png" alt="">
            </div>
            <div class="ip_top_line"></div>
            <div>
                <p>{{wishMentorCount.income | keepTwoNum}}元</p>
                <img src="../../assets/xyz/leiji.png" alt="">
            </div>
        </div>
        <div class="ip_chakan" @click="jump">
            <img src="../../assets/xyz/chakanxiangqing.png" alt="">
            <!-- <div>
                <p>查看详情</p>
                <img src="../../assets/gengduobaise.png" alt="">
            </div> -->
        </div>
        <div class="ip_content">
            <div class="ip_con_one">
                <p>我的邀请码：<span>{{listData.qrCode}}</span></p>
                <div v-clipboard:copy="listData.qrCode" v-clipboard:success="onCopy" v-clipboard:error="error">复制</div>
            </div>
            <div class="ip_con_two">
                <div class="ip_inner_one">
                    <img src="../../assets/xyz/yaoqingshuoming.png" alt="">
                    <img src="../../assets/xyz/youxiaohaoyou.png" alt="" v-show="isShowTips">
                </div>
                <div class="ip_inner_two">
                    <div @click="open">
                        <p>1、每邀请一个有效好友，您可获得<span>3元</span>现金奖励。</p>
                        <img src="../../assets/xyz/wenhao.png" alt="">
                    </div>
                    <div>
                        <p>2、邀请好友收益将以零钱的形式发放至账户余额。</p>
                    </div>
                </div>
            </div>

            <div class="ip_three">
                <div class="ip_three_inner_one">
                    <img src="../../assets/xyz/yaoqinghaoyou.png" alt="">
                </div>
                <div class="ip_three_inner_two">
                    <div>
                        <img src="../../assets/xyz/one.png" alt="">
                        <P>1、点击立即邀请</P>
                    </div>
                    <div>
                        <img src="../../assets/xyz/two.png" alt="">
                        <P>2、好友下载注册</P>
                    </div>
                </div>
                <div class="ip_three_inner_two">
                    <div>
                        <img src="../../assets/xyz/three.png" alt="">
                        <P>3、好友参与抽奖</P>
                    </div>
                    <div>
                        <img src="../../assets/xyz/four.png" alt="">
                        <P>4、获得零钱奖励</P>
                    </div>
                </div>
            </div>
        </div>
        <div @click="share" class="ip_btn_wrapper">
            <p class="ip_btn">立即邀请</p>
        </div>

    </div>
</template>
<script>

export default {
    data(){
        return{
            num:'819928',
            listData:{},
            wishMentorCount:{
                number:0,
                income:0
            },
            isShow:true,
            isShowTips:false
        }
    },
    created(){
        if(this.isAndroid()){
            // window.android.over();
        }else if(this.isIos()){
            this.isShow = false;
            // window.backAction();
        }
        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        this.getWishMentorCount();
        this.getList();
    },
    filters: {
        keepTwoNum:function(value){
            value = Number(value);
            return value.toFixed(2)
        }
    },
    destroyed() {
        // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
        window.removeEventListener("popstate", this.refresh, false);
    },
    watch: {
        // 弹框监听，当弹框显示的时候，pushState添加一个历史，供返回键使用
        PopupShow: {
            handler(newVal, oldVal) {
                if (newVal.Terms === true) {
                    window.history.pushState(null, null, document.URL);
                }
            },
            deep: true
        }
    },
    mounted () {
        window.refresh = this.refresh;
        // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
        window.history.pushState(null, null, document.URL);
        // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
        window.addEventListener("popstate", this.refresh, false);
    },
    methods:{
        refresh(){
            // window.location.href = '/luckyPig.html?token='+this.token;
            // self.location=document.referrer;
            this.back();
        },
        back(){
            if(this.isAndroid()){
                window.android.over();
            }else if(this.isIos()){
                // this.isShow = false;
                window.backAction();
            }
        },
        open(){
            this.isShowTips = !this.isShowTips;
        },
        // 收益统计
        getWishMentorCount(){
            let parameterData = {
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/mUserApprentice/wishMentorCount',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.wishMentorCount = res.data;
                }
            })
        },
        // 邀请码
        getList(){
            let parameterData={
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/mFissionScheme/schemeImg',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data;
                }
            })
        },
        jump(){
            window.location.href = '/xyzInviteDetail.html?token='+this.token+'&imei='+this.imei;
        },
        share(){
            if(this.isAndroid()){
                window.android.inviteFriend();
            }else if(this.isIos()){
                window.shareAction();
            }
        },
        // 复制成功
        onCopy(e) {
            this.$toast("复制成功");
        },
        // 复制失败
        error(e) {
            this.$toast("复制失败");
        },
        //判断是安卓还是iOS
        isIos() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            // let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isiOS == true ? true : false;
        },
        isAndroid() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
            // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isAndroid == true ? true : false;
        },
    }
}
</script>

<style scoped>
p{
    margin: 0;
}
/* 标题头 */
.lp_head{
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #DF3132;
    position: fixed;
    z-index:100;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
}
.lp_head img{
    width: 0.5rem;
    height: 0.8rem;
    margin-left: 0.8rem;
}
.lp_head p{
    font-size: 0.85rem;
    color: #fff;
    margin-left: 7rem;
}
.ip_bg {
    width: 18rem;
    margin-top: 2.2rem;
}
.ip_bg_active {
    width: 18rem;
    margin-top: 0;
}
.ip_top{
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    width: 16.35rem;
    margin: -0.8rem 0 0 0.8rem;
    border-radius: 0.4rem;
    text-align: center;
    font-size: 0.95rem;
    color: #FF3C2E;
    padding: 1.1rem 0;
}
.ip_top img{
    width: 3rem;
    margin-top: 0.35rem;
}
.ip_top_line{
    border: 1px solid #E4E2FB;
    height: 1.2rem;
}
.ip_top div:nth-of-type(1){
    margin-left: 1rem;
}
.ip_top div:nth-of-type(3){
    margin-right: 1rem;
}
.ip_chakan{
    position: relative;
}
.ip_chakan img{
    width: 5.8rem;
    position:absolute;
    top:-0.7rem;
    left:6.2rem;
}
/* .ip_chakan div:nth-of-type(2){
    display: flex;
    align-items: center;
    font-size: 0.6rem;
    color: #fff;
    position: absolute;
    top: -0.6rem;
    left: 7.6rem;
}
.ip_chakan div:nth-of-type(2) img{
    width: 0.2rem;
    height: 0.4rem;
    margin-left: 0.1rem;
} */
.ip_content{
    background-color: #fff;
    margin-top: 1.5rem;
    border-radius: 0.6rem 0.6rem 0 0;
    padding: 0.1rem 0 3rem 0;
}
.ip_con_one{
    background-image: url('../../assets/xyz/ipbg.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    width: 15.35rem;
    margin: 0.8rem 0 0 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
}
.ip_con_one p{
    color: #fff;
    font-size: 0.7rem;
}
.ip_con_one span{
    font-size: 0.9rem;
    color: #FFEB2E;
}
.ip_con_one div{
    font-size: 0.5rem;
    color: #20158E;
    border-radius: 0.2rem;
    background-color: #FFEB2E;
    padding: 0.2rem;
}
.ip_con_two{
    width: 14.75rem;
    background-color: #FFF6F6;
    padding: 0.6rem 0.8rem;
    margin: 0.4rem 0 0 0.8rem;
}
.ip_inner_one{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ip_inner_one img:nth-of-type(1){
    width: 2.85rem;
}
.ip_inner_one img:nth-of-type(2){
    width: 6.45rem;
}
.ip_inner_two{
    line-height: 1rem;
}
.ip_inner_two div:nth-of-type(1){
    display: flex;
    align-items: center;
    font-size: 0.6rem;
    color: #40494D;
}
.ip_inner_two div:nth-of-type(1) span{
    font-size: 0.7rem;
    color: #FF2E46;
}
.ip_inner_two div:nth-of-type(1) img{
    width: 0.6rem;
    height: 0.6rem;
}
.ip_inner_two div:nth-of-type(2){
    font-size: 0.6rem;
    color: #40494D;
}
.ip_three{
    text-align: center;
}
.ip_three_inner_one img{
    width: 7.9rem;
    margin: 0.6rem 0 1.4rem 0;
}
.ip_three_inner_two{
    display: flex;
    justify-content: space-around;
}
.ip_three_inner_two img{
    width: 4.4rem;
}
.ip_three_inner_two p{
    font-size: 0.65rem;
    color: #3C3E5B;
    margin: 0.2rem 0 1rem 0;
}
.ip_btn_wrapper{
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0.7rem;
    color: #fff;
    text-align: center;
    padding: 0.6rem 0;
}
.ip_btn{
    border-radius: 1.1rem;
    width: 16.35rem;
    height: 2.2rem;
    line-height: 2.2rem;
    margin: 0 auto;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B , #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B , #FF1370); /* 标准语法ie9标准的语法 */
}
</style>

