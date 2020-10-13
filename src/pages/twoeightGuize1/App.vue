<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
        <div style="padding: 0 0.8rem">
            <div class="twoeightGz_head" v-show="isShow">
                <img @click="backTap" src="../../assets/enlighteningRight.png" alt="">
                <p>玩法介绍</p>
            </div>
            <div class="twoeightGz_content_top">
                <h2>游戏规则说明∶</h2>
                <p>游戏时间09:00至23:50，每5min一期，每天开奖179期；</p>
            </div>
            <div class="twoeightGz_content_bottom">
                <p>以下所有竞猜皆含竞猜金猪。</p>
                <p>每期PC28开奖球数共3粒（3个球数相加为特码）。</p>
                <p><span>两面∶</span>指单、双；大、小；大单、大双、小单、小双、极大、 极小；</p>
                <p><span>单、双∶</span>特码为双数叫双，如8、16；特码为单数叫单，如21、 27；</p>
                <p><span>大、小∶</span>开出之特码大于或等于14为大，小于或等于13为小；</p>
                <p><span>大单、大双∶</span>特码为双数且大于等于14叫大双，如16、24；特 码为单数且大于14叫大单，如15、27；</p>
                <p><span>小单、小双∶</span>特码为双数且小于13叫小双，如8、10；特码为单 数且小于等于13叫小单，如1、11；</p>
                <p><span>极大、极小∶</span>特码大于等于22小于等于27为极大，特码大于等 于0小于等于5为极小；</p>
                <p><span>特码 色波∶</span>以特码的颜色竞猜，开奖的颜色与竞猜的颜色相同， 视为猜中，颜色号码分布如下:</p>
                <p><span>绿波号码（1,4,7,10,16,19,22,25）
                    <br/>蓝波号码（2,5,8,11,17,20,23,26）
                    <br/>红波号码（3,6,9,12,15,18,21,24）</span></p>
                <p style="color:#9EA9BC">注意：若特码为00、13、14或27，所购买的球色则均为打和， 退还本金</p>
                <p style="margin-bottom:0.65rem"><span>豹子∶</span>前面3个球号位置的号码相同，即为猜中豹子。</p>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data:{
        return:{
            isShow:true
        }
    },
    created(){
        if(this.isAndroid){
            this.isShow = true;
        }else if(this.isIos){
            this.isShow = false;
        }
    },
    methods:{
        backTap(){
            if(this.isAndroid()){
                window.android.over();
            }else if(this.isIos()){
                window.backAction();
            }
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
.twoeightGz_head{
    width: 100%;
    height: 2.2rem;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B , #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B , #FF1370); /* 标准语法ie9标准的语法 */
}
.twoeightGz_head img{
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
}
.twoeightGz_head p{
    color: #fff;
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
}
.twoeightGz_content_top h2{
    font-size: 0.7rem;
    color: #4C546B;
    margin: 3.1rem 0 0.3rem 0;
}
.twoeightGz_content_top p{
    font-size: 0.6rem;
    color: #9EA9BC;
    margin-bottom: 0.8rem;
}
.twoeightGz_content_bottom span{
    color: #FE4436;
}
.twoeightGz_content_bottom p{
    color: #4C546B;
    font-size: 0.6rem;
    margin-bottom: 0.4rem;
}
</style>

