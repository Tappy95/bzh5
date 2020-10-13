<template>
    <div id="app" style="height: 100vh;background: #F2F5F8;overflow: auto;">
        <div class="crs_head" @click="back">
            <img src="../../assets/right.png" />
            <p>打卡规则</p>
        </div>
        <div class="crs_font">
            <h3 style="margin-top:3.1rem;">早起打卡规则</h3>
            <p>早起打卡是宝猪乐园推出的一款促进用户养成早起目标的活动。用户支付1w金币即可参与次日活动，如在次日早晨6:30-8:30成功打卡，可获得1w-100w的随机金币奖励，还可以养成早起的好习惯。</p>
            <h3>打卡流程及要求</h3>
            <p><span>1、</span>支付1w打卡保证金，即可获得次日早起打卡机会。所有用户支付1w金币的打卡保证金，即进入次日打卡奖金池里面。</p>
            <p><span>2、</span>次日早晨6:30-8:30成功打卡的用户，可随机瓜分当日奖金池内的全部奖金，瓜分奖金最低1w金币；最高100w金币奖励，瓜分奖金包含1w打卡保证金；瓜分奖金将在第二天12点之后直接转入到您的账户余额上面；</p>
            <p><span>3、</span>如果错过次日打开时间，可在打卡当日8:30-11:00使用补签券，使用成功后视为当日打卡成功，可参与随机瓜分当日奖金；</p>
            <p><span>4、</span>如果错过次日打开时间并且未使用补签券的用户，视为打卡失败；打开失败不可瓜分当日奖金池奖金；所支付的1w打卡保证金将不予退回，作为其他挑战成功用户的奖励；</p>
            <p><span>5、</span>用户支付保证金后即为报名成功，报名成功后无法取消比赛；</p>
            <p><span>6、</span>若全部参加的用户无一成功打卡或者参与活动的用户次日全部完成打卡，则参与支付的1w金币将转入到您的账户余额内，不进行随机奖金瓜分；</p>
            <p><span>7、</span>同一账号每天只有一次参与机会。涉嫌违规参与早起打卡的用户，宝猪平台将取消您的参与活动资格，并收回您已获得相关打卡奖励。</p>
            <h3>其他说明</h3>
            <p><span>1、</span>如有疑问，请联系宝猪客服QQ：1501305376；</p>
            <p><span>2、</span>活动最终解释权归宝猪乐园平台所有。</p>
            <h3>补签券</h3>
            <p><span>1、</span>支付1w金币参与早起打卡的用户，在次日早晨没有按时打卡，可在当日上午8:30-11:00使用补签券；成功使用补签券视为打卡成功，可随机瓜分奖金池内的奖金；</p>
            <p><span>2、</span>补签券可通过邀请好友方式获得；好友注册成功，并成为您的下级，您可获得一张补签券，每人每天最多获得1张补签券（非邀请达人）；</p>
            <p><span>3、</span>每张补签券有限期为一天；</p>
            <p style="margin-bottom:2rem;"><span>4、</span>好友成为您的下级，系统会自动发放一张补签券到您的账户。</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
    },
    methods: {
        back(){
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
};
</script>

<style scoped>
p{
    padding: 0;
    margin: 0;
}
.crs_head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
}
.crs_head img{
    height: 0.8rem;
    position: absolute;
    top: 0.7rem;
    left: 0.75rem;
}
.crs_head p{
    color: #000;
    font-size: 0.9rem;
    position: absolute;
    top: 0.4rem;
    left: 7.2rem;
}
.crs_font{
    padding: 0 0.6rem;
}
.crs_font h3{
    font-size: 0.7rem;
    color: #4C546B;
    margin: 0.4rem 0 0.2rem 0;
}
.crs_font p{
    font-size: 0.6rem;
    color: #9EA9BC;
    line-height: 0.9rem;
}
</style>
