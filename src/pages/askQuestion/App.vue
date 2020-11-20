<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
        <!-- <div class="aq_head">
            <img src="../../assets/right.png" alt="" @click="backTap">
            <p>常见问题</p>
        </div> -->
        <div class="aq_center">
            <div style="height:0.5rem"></div>
            <div class="aq_center_one">
                <p>平台认知问题</p>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="1、宝猪乐园是什么？能用来干什么？" name="1">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>麒麟趣玩是一家集合三方广告，帮您闲暇时间变现的一家三方共赢的综合平台。体验游戏、广告、任务等每天轻轻松松赚个零花钱，只要有恒心，完全可以月入上万哒！当然，升级为运营总监，邀请好友赚钱效应会更快！目前麒麟趣玩仅支持安卓手机版；iOS版本加紧推出中！</div>
                    </el-collapse-item>
                    <el-collapse-item title="2、金币是什么？" name="2">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>金币是用户在麒麟趣玩平台试玩游戏广告等奖励的佣金积分，用户可以通过平台升级为运营总监、试玩第三方游戏、应用、任务等等获取更多金币和加成奖励，金币本身无价值，鉴于用户劳动成本和时间成本，用户可通过【提现】入口将金币积分按汇率换算成人民币提现。正常价值换算【金币：人民币=10000:1】；</div>
                    </el-collapse-item>
                    <!-- <el-collapse-item title="3、金猪是什么？" name="3">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>金猪是宝猪乐园中的无实际价值的虚拟游戏币，可以通过金币兑换而来，不能提现和兑换金币；为使用户在平台获取更多娱乐性和活跃性，平台提供一些益智类竞猜小游戏、抽奖供用户选择【金猪：金币=10:1】；</div>
                    </el-collapse-item> -->
                    <el-collapse-item title="3、平台赚钱效益怎么样？怎么能够快速的赚钱？" name="3">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>只要认真做，一天在平台赚个几十上百是完全没问题的！您可以通过①做新手任务、看资讯、广告等赚钱；②通过平台快速赚赚快钱，任务超简单！③通过平台游戏深度任务赚大钱！④通过邀请好友赚钱，好友赚钱自己得奖励！想要快速赚钱，赚更多，可以升级为运营总监，邀请好友，享受推广收益、深度收益的叠加奖励！</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div style="height:0.3rem"></div>
            <!-- <div class="aq_center_one">
                <p>阅读资讯奖励</p>
                <el-collapse v-model="activeName1" accordion>
                    <el-collapse-item title="1、问：阅读资讯怎么获得奖励？" name="1">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>可通过3种方式在资讯方面获得奖励；1、阅读资讯15秒以上；2、浏览资讯列表中的广告，奖励是浏览资讯的双倍；3、通过微信、朋友圈等分享你喜欢的资讯，且你的好友点开你的分享链接；为防止非人为正常机刷问题，每日阅读资讯有最大限额哦。</div>
                    </el-collapse-item>
                    <el-collapse-item title="2、资讯出现闪退？" name="2">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>浏览资讯时，出现闪退，请先退出app后台进程，在【设置】-【应用管理】-【宝猪乐园】-【获取定位】中允许宝猪获取定位后重新登陆试试。</div>
                    </el-collapse-item>
                    <el-collapse-item title="3、分享资讯收益没收到？" name="3">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>1、分享不成功，或者没有微信好友点击你的资讯。建议分享到微信群或者QQ群等；2、可能是当日分享收益已达最高限额。</div>
                    </el-collapse-item>
                </el-collapse>
            </div> -->
            <!-- <div style="height:0.3rem"></div> -->
            <div class="aq_center_one">
                <p>登陆注册相关疑问</p>
                <el-collapse v-model="activeName2" accordion>
                    <el-collapse-item title="1、我的手机号获取不了短信验证码？" name="1">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>大部分比如139、138等开头的号段支持注册登陆，如果一直获取不了验证码可能是不兼容号码段的问题，请联系客服QQ：706306245解决；除此之外，用户如果频繁获取短信验证码也可能导致临时获取不了，请过一个小时或者联系客服QQ解决。</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div style="height:0.3rem"></div>
            <div class="aq_center_one">
                <p>提现问题</p>
                <el-collapse v-model="activeName3" accordion>
                    <el-collapse-item title="1、平台货币都可以提现么？" name="1">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>平台只有积分金币是唯一可兑换成人民币的，提现根据实际汇率兑换提现到微信或支付宝。</div>
                    </el-collapse-item>
                    <el-collapse-item title="2、提现需要做什么？" name="2">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>提现必要流程：绑定自己微信或支付宝账号，且账号经过手机号认证才能将金币提现。</div>
                    </el-collapse-item>
                    <el-collapse-item title="3、提现有门槛么？是否可立即到账？" name="3">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>没有，一元即可提现！提现视情况目前24小时内审核到账！（情况紧急则可联系客服）</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div style="height:0.3rem"></div>
            <div class="aq_center_one">
                <p>试玩游戏问题</p>
                <el-collapse v-model="activeName5" accordion>
                    <el-collapse-item title="1、游戏试玩收益没收到？" name="1">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>游戏试玩期间，下载的游戏APP请勿卸载！卸载导致没有试玩收益平台也很无奈哦！除此之外，试玩收益若未及时到账请刷新页面，或者等待一下。如若长时间未得到收益请联系客服QQ：706306245。</div>
                    </el-collapse-item>
                    <el-collapse-item title="2、进入游戏退出不了到app中怎么办？" name="2">
                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>安卓端通过麒麟趣玩下载游戏，同时通过app进入游戏后没有入口退出游戏时，请通过安卓手机物理按键退出麒麟趣玩app后重新进入。</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div style="height:0.3rem"></div>

<!--            <div class="aq_center_one">-->
<!--                <p>VIP相关问题</p>-->
<!--                <el-collapse v-model="activeName7" accordion>-->
<!--                    <el-collapse-item title="1、会员VIP用途？" name="1">-->
<!--                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>会员VIP是为有提升游戏加成奖励需求的高级用户设立的模式；为感谢会员VIP用户对平台的认可与支持，也将不定期赠送活跃宝箱给到会员作为回馈！</div>-->
<!--                    </el-collapse-item>-->
<!--                    <el-collapse-item title="2、会员VIP和运营总监的区别？" name="2">-->
<!--                        <div><span style="font-size:0.65rem;color:#FF2953;">答：</span>会员VIP是高级用户为提升游戏加成奖励而设定的（同时平台也会赠送一定奖励给用户）；而运营总监是用户为提升自身推广收益所升级的身份，享有对应推广权益。</div>-->
<!--                    </el-collapse-item>-->
<!--                </el-collapse>-->
<!--            </div>-->

            <div style="height:0.3rem"></div>
            <div class="aq_center_two">
                <p style="font-size:0.7rem;color:#3C3E5B;font-weight:bold;margin: 0 0 0.5rem 0.8rem;">联系我们</p>
                <div class="aq_center_two_inner">
                    <!-- <p>宝猪乐园官网：<span>www.bzlyplay.com</span></p> -->
                    <p>宝猪乐园官方客服客服QQ：<span>706306245；</span></p>
                    <p>宝猪乐园官方QQ群：<span>1051401027；</span></p>
                    <p>（客服工作时间：周一至周五，9:30～18:00，节假日休息） 友情提示：本平台不会以任何形式或原因向个人索取账号密码或者侵害个人积分或者虚拟币行为，如有可疑行为，请立即终止，注意维护自身利益安全！</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: '',
                activeName1: '',
                activeName2: '',
                activeName3: '',
                activeName4: '',
                activeName5: '',
                activeName6: '',
                activeName7: '',
            };
        },
        methods(){
        }

    }
</script>
<style scoped>
/* 标题头 */
p{
    margin: 0;
}
.aq_head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
}
.aq_head img{
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
}
.aq_head p{
    color: #2d2e38;
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
}
 /* .aq_center{
   margin-top: 2.2rem;
} */
.aq_center_one p{
    font-size: 0.7rem;
    color: #3C3E5B;
    font-weight: bold;
    margin: 0 0 0.5rem 0.8rem;
}
.el-collapse-item /deep/ .el-collapse-item__header{
    padding-left: 0.8rem;
    font-size: 0.65rem;
    color: #3C3E5B;
    margin-bottom: 0.2rem;
}
.el-collapse-item /deep/ .el-collapse-item__wrap{
    padding: 0.6rem 0.75rem 0 0.8rem;
}
.el-collapse-item /deep/ .el-collapse-item__content{
    padding-bottom: 0.6rem;
    line-height: 1rem;
}
.aq_center_one /deep/ .el-collapse{
    border-bottom: none;
}
.aq_center_two_inner{
    background-color: #fff;
    padding: 0.6rem 0.8rem 1.2rem 0.8rem;
    line-height: 1.1rem;
}
.aq_center_two_inner p{
    font-size: 0.65rem;
    color: #3C3E5B;
}
.aq_center_two_inner p:last-child{
    color: #9EA9BC;
    font-size: 0.6rem
}
.aq_center_two_inner span{
    font-size: 0.65rem;
    color: #FF2751;
}
</style>
