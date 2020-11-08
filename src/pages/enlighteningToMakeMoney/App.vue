<template>
  <div id="app" style="height: 100vh;background: #211989;overflow: auto;">
    <!-- 背景图 -->
    <!-- <div class="enlighteningMoney-head">
      <img src="../../assets/enlighteningHead.png"/>
    </div> -->

    <!-- 返回 -->
    <div class="enlighteningMoney-left" @click="naviteTap" v-show="isShow">
      <img src="../../assets/enlighteningRight.png" class="eml_img"/>
      <p>邀请好友</p>
    </div>

    <!-- <div class="em_img">
        <img src="../../assets/etht.png" alt="">
    </div> -->
    <div class="et_imgsy">
      <img src="../../assets/yqhysy.png" alt="">
    </div>
    <div class="et_scroll">
      <div class="et_scroll_left">
        <div>
          <!-- <img :src="listData.photo" alt=""> -->
          <img src="../../assets/lllico.png" alt="">
        </div>
        <div>
          <p>麒麟身份：{{listData.roleType}}<span>{{listData.highRole}}</span></p>
          <p>邀请码：{{listData.qrCode}}</p>
        </div>
      </div>
      <!-- <div class="et_scroll_right" v-clipboard:copy="listData.qrCode"
          v-clipboard:success="onCopy"
          v-clipboard:error="error">复制邀请码</div> -->
      <div class="et_scroll_right copy_qrcode" @click="copyQrcode">复制邀请码</div>
    </div>

    <div class="enlighteningMoney-title">
      <div class="enlighteningMoney-titleLeft" @click="rewardTap">
        <p>{{listData.teamBenefit}}</p>
        <div><img src="../../assets/award.png" alt=""></div>
      </div>
      <div class="enlighteningMoney-titleLine"></div>
      <div class="enlighteningMoney-titleRight" @click="rewardTap">
        <p>{{listData.apprentice}}</p>
        <div><img src="../../assets/prentice.png" alt=""></div>
      </div>
    </div>
    <div class="et_toggle">
      <div class="game_toggle">
        <div v-for="(item,index) in nav" :key="index" :class="status == item.id ? 'activeTog' : ''"
             class="game_toggle_inner">
          <span @click="toggle(item.id)">{{item.text}}</span>
          <div class="game_line"></div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="this.status == 1" class="em_scroll">
        <div class="ptyq">
          <div class="ptyq_top_font">
            <img src="../../assets/morejl.png" alt="">
            <p @click="openGZPT">规则详情 >></p>
          </div>
          <div class="ptyq_top_img">
            <img src="http://qiniu.shouzhuan518.com/axiaoqilin.png" alt="">
          </div>
        </div>
        <div class="ptyq_center_img">
          <img src="../../assets/yqhy.png" alt="">
          <img src="../../assets/yqhytips.png" alt="">
          <p><span>1</span>邀请您的家人、朋友、同学、同事的成功率更高；</p>
          <p><span>2</span>分享3个以上微信群/qq群,邀请成功率提升100%；</p>
          <p><span>3</span>可以告诉您的朋友: 1元即可提现；</p>
          <p><span>4</span>面对面邀请，帮助好友注册，也能提升成功率；</p>
          <p><span>5</span>你邀请好友时候，简单教一下您的朋友如何赚钱，您可以获取更多奖励。</p>
          <!-- <img :src="item" alt="" v-for="item in inviteImg"> -->
        </div>
        <div style="height:2.8rem"></div>
      </div>

      <div v-if="this.status == 2" class="em_scroll" style="width:100%;">
        <div class="yqdr">
          <div class="yqdr_inner">
            <img src="../../assets/yqjl.png" alt="" style="width: 4.3rem;">
            <div class="yqdr_inner_right">
              <img src="../../assets/wenhao.png" alt="">
              <p @click="openOne">邀请规则</p>
            </div>

          </div>
          <img src="http://qiniu.shouzhuan518.com/ajinqilin.png" alt="" style="width:16.3rem">
          <!-- <p style="font-size:0.7rem;color:#9EA9BC;margin:0;">好友完成首个任务奖励师傅1.5元，之后每完成一个游戏任务奖励师傅1元(限高额赚、游戏试玩任务)7.5元封顶！</p> -->
<!--          <img :src="schemeImg[1]" alt="" style="width:16.8rem">-->
          <!-- <p class="yqdr_tips">若需推广合作，请联系商务<span>QQ:1501305376</span></p>
          <img src="../../assets/sjyqdr.png" alt="" @click="openOne" v-if="listData.roleType != '邀请达人'"> -->
        </div>
        <div class="ptyq_center_img">
<!--          <img src="../../assets/yqhy.png" alt="">-->
<!--          <img src="../../assets/yqhytips.png" alt="">-->
          <p><span>达成条件</span></p>
          <p><span>1</span>*推广总的的效人数50人以上（直接推广）；</p>
          <p><span>2</span>*团队日活跃值不低于50（活跃值指用户完成任务的数值，每获得一次金币奖励，即完成一个活跃值）；</p>
          <p><span>3</span>*团队周活跃值不低于350,也可直接购买永久合伙权益；</p>
<!--          <p><span>4</span>面对面邀请，帮助好友注册，也能提升成功率；</p>-->
<!--          <p><span>5</span>你邀请好友时候，简单教一下您的朋友如何赚钱，您可以获取更多奖励。</p>-->
          <!-- <img :src="item" alt="" v-for="item in inviteImg"> -->
        </div>
        <div style="height:2.8rem"></div>
<!--        <div class="ranking">-->
<!--          <div class="ranking_head">-->
<!--            <div class="ranking_title">-->
<!--              <div class="ranking_titbg">-->
<!--                <img src="../../assets/daren.png" alt="">-->
<!--              </div>-->
<!--              <div class="ranking_gz">-->
<!--                <img src="../../assets/guize.png" alt="">-->
<!--                <p @click="openRule">冲榜规则</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <p class="fontone">{{date}}</p>-->
<!--            <p class="fonttwo">当期达人邀请总数：{{count}}人</p>-->
<!--          </div>-->

<!--          <div class="ranking_center">-->
<!--            <div class="ranking_center_left">-->
<!--              <p @click="jump">查看历史排行榜</p>-->
<!--              <img src="../../assets/jiantou.png" alt="">-->
<!--            </div>-->
<!--            <div class="ranking_center_right" @click="refresh">-->
<!--              <img src="../../assets/refresh.png" alt="" :class="rotate ? 'go':'black'">-->
<!--              <p>刷新</p>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="ranking_bottom">-->
<!--            <img src="../../assets/listBg.png" alt="">-->
<!--          </div>-->
<!--          <div class="table_title">-->
<!--            <p style="margin-left:1.5rem;">昵称</p>-->
<!--            <p style="margin-left:1.5rem;">排名</p>-->
<!--            <p>累计邀请/人</p>-->
<!--          </div>-->
<!--          <div class="table_wrapper">-->
<!--            <table>-->
<!--              <tbody v-for="(item,index) in tableData" :key="index">-->
<!--              <tr>-->
<!--                <td>-->
<!--                  <img :src="item.profile" alt="">-->
<!--                  {{item.aliasName}}-->
<!--                </td>-->
<!--                <td>{{item.rank}}</td>-->
<!--                <td>{{item.apprenticeCount}}人</td>-->
<!--              </tr>-->
<!--              </tbody>-->
<!--            </table>-->
<!--          </div>-->
<!--        </div>-->
        <div style="height:3.8rem"></div>

      </div>

      <div v-if="this.status == 3" class="em_scroll">
        <div>
          <div class="zyzj">
            <div class="ptyq_top_font">
              <img src="../../assets/ktVip.png" alt="">
              <p @click="openyyxq">规则详情 >></p>
            </div>
            <div class="ptyq_top_img">
              <img src="http://qiniu.shouzhuan518.com/ayuqilin.png" alt="">
            </div>
            <!-- <div class="yyzj_btn">
                <img src="../../assets/yyzjbtn.png" alt="" v-if="listData.roleType == '小猪猪' && listData.isRenewal==2" @click="toPay(listData.price,2)">
                <img src="../../assets/xufei.png" alt="" v-if="listData.roleType == '小猪猪' && listData.isRenewal==1" @click="toPay(listData.price,1)">
            </div> -->
          </div>
          <div class="ptyq_center_img">
<!--            <img src="../../assets/yqhy.png" alt="">-->
<!--            <img src="../../assets/yqhytips.png" alt="">-->
            <p><span>达成条件</span></p>
            <p><span>1</span>*推广总的的效人数500人以上（直接推广）；</p>
            <p><span>2</span>*团队日活跃值不低于2000（活跃值指用户完成任务的数值，每获得一次金币奖励，即完成一个活跃值）；</p>
            <p><span>3</span>*团队周活跃值不低于15000,也可直接购买永久合伙权益；</p>
<!--            <p><span>4</span>面对面邀请，帮助好友注册，也能提升成功率；</p>-->
<!--            <p><span>5</span>你邀请好友时候，简单教一下您的朋友如何赚钱，您可以获取更多奖励。</p>-->
            <!-- <img :src="item" alt="" v-for="item in inviteImg"> -->
          </div>
          <div style="height:2.8rem"></div>
        </div>
      </div>

    </div>

    <div class="em_box_one" v-if="isShowBoxOne">
      <div class="gzxq_inner">
        <div class="gz_head">
          <img src="../../assets/gzxq.png" alt="">
        </div>
        <div class="gz_close" @click="closeOne">
          <img src="../../assets/closeother.png" alt="">
        </div>
        <div style="height:1.5rem"></div>
        <div class="em_box_one_content">
          <div>金麒麟：</div>
          <p><span>1</span>当期周期:7天；</p>
          <p><span>2</span>邀请好友通过任务赚,游戏赚,视频赚获得金币时,金麒麟获得好友收益的20%;</p>
          <p><span>3</span>邀请好友的徒弟通过任务赚,游戏赚,视频赚获得金币时,金麒麟获得徒孙收益的7.5%;</p>
          <p><span>3</span>邀请下级用户成为金麒麟时,金麒麟获得其等级收益的15%-40%;</p>
          <!-- <p><span>4</span>普通邀请长效收益叠加（达人同时享受普通邀请奖励，除注册提现1元奖励外）</p> -->
          <div>申请条件:</div>
          <p><span>1</span>周期内直接邀请人数达到10人,下属周期内活跃度达到100；</p>
          <div>申请方式:</div>
          <p><span>1</span>添加客服QQ：1501305376,即可申请。或通过周期结算自动成为金麒麟</p>
          <div>注意事项:</div>
          <p><span>1</span>成为金麒麟后，连续7天内，人数低于30人将被取消达人资格，可重新申请；</p>
          <p><span>2</span>周期内未达标的金麒麟无法获得此等级收益；</p>
          <p><span>3</span>周期内未达标的金麒麟,团队建制保留,收益保留,无法入账；</p>
          <p><span>4</span>刷量等非正常手段作弊，均严肃处理；</p>
          <p><span>5</span>活动最终解释权归平台所有；</p>
          <!-- <img :src="item" alt="" v-for="item in darenRewardImg"> -->
        </div>
        <div class="gz_btn">
          <p @click="closeOne">知道了</p>
        </div>
        <div style="height:0.2rem"></div>
      </div>
    </div>

    <div class="qqbox" v-if="isShowQQBox">
      <div class="qqbox_inner">
        <img src="../../assets/closeother.png" alt="" @click="closeQQBox">
        <p>申请邀请达人，请联系商务</p>
        <p>QQ：{{qq}}</p>
        <div v-clipboard:copy="qq"
             v-clipboard:success="onCopyQQ"
             v-clipboard:error="errorQQ">
          复制QQ
        </div>
      </div>
    </div>

    <div class="gzxq" v-if="isShowGZ">
      <div class="gzxq_inner_new">
        <div class="gz_head">
          <img src="../../assets/gzxq.png" alt="">
        </div>
        <div class="gz_close" @click="closeGZ">
          <img src="../../assets/closeother.png" alt="">
        </div>
        <div style="height:1.5rem"></div>
        <div class="gz_con_new">
          <p class="gz_con_one">玉麒麟：</p>
          <p class="gz_con_three">奖励模式：获得直属一级用户收益的20%,获得直属二级及二级以下的用户收益的8%,下级用户出现金麒麟或玉麒麟,获得等级收入的15%-40%；</p>
          <p class="gz_con_one">申请模式：</p>
          <p class="gz_con_two">申请条件：联系客服开通QQ:1501305376:；</p>
<!--          <p class="gz_con_three">奖励模式：直推1个用户开通高额赚VIP，奖励现金350元，间接推1个用户开通高额赚VIP ，奖励50元。；</p>-->
          <p class="gz_con_one">注意事项：</p>
          <p class="gz_con_two">严重警告：刷量等非正常手段作弊，均严肃处理；</p>
          <p class="gz_con_three">活动最终解释权归平台所有；</p>
          <!-- <img :src="item" alt="" v-for="item in teamRewardImg"> -->
        </div>
        <div class="gz_btn_new">
          <p @click="closeGZ">知道了</p>
        </div>
        <div style="height:0.2rem"></div>
      </div>
    </div>

    <div class="gzxq" v-if="isShowGZPT">
      <div class="gzxq_inner">
        <div class="gz_head">
          <img src="../../assets/gzxq.png" alt="">
        </div>
        <div class="gz_close" @click="closeGZPT">
          <img src="../../assets/closeother.png" alt="">
        </div>
        <div style="height:1.5rem"></div>
        <div class="gz_con">
          <img :src="item" alt="" v-for="(item, index) in ordinaryRewardImg" :key="index">
        </div>
        <div class="gz_btn">
          <p @click="closeGZPT">知道了</p>
        </div>
        <div style="height:0.2rem"></div>
      </div>
    </div>
    <div class="drgz" v-show="isShowRule">
      <div class="drgz_inner">
        <div class="dr_head"><img src="../../assets/drgz.png" alt=""></div>
        <div class="dr_close" @click="closeRule"><img src="../../assets/drguanbi.png" alt=""></div>
        <div class="dr_con">
          <p>奖金等级表</p>
          <img src="../../assets/drxq.png" alt="">
        </div>
      </div>
    </div>
    <div style="height:2.8rem;"></div>
    <!-- 按钮 -->
    <div class="enlighteningMoney-btn">
      <p @click="openRecruitBox(2,3)">立即收徒赚钱</p>
      <!-- <img src="../../assets/enlighteningBtn.png"  @click="openRecruitBox(2,3)"/> -->
    </div>
  </div>
</template>
<script>
    // import recruitBox from '../../components/popupBox/recruitBox'
    // import $ from 'jquery'
    // import { Toast } from 'mint-ui'
    // import Vue from 'vue'
    // import VueClipboard from 'vue-clipboard2'
    // Vue.use(VueClipboard)
    import Clipboard from 'clipboard';

    export default {
        data() {
            return {
                isShow: true,
                token: '',//token值
                imei: '',
                nav: [
                    {id: 1, text: '普通邀请'},
                    {id: 2, text: '二级代理'},
                    {id: 3, text: '一级代理'},
                ],
                status: 1,
                isShowBoxOne: false,
                isShowQQBox: false,
                qq: '1501305376',
                isShowGZ: false,
                isShowGZPT: false,
                listData: {},
                ordinaryRewardImg: {},
                inviteImg: {},
                teamRewardImg: {},
                darenRewardImg: {},
                schemeImg: {},
                isShowRule: false,
                tableData: {},
                date: '',
                count: '0',
                history: "",
                rotate: false
            }
        },
        // components:{
        //     recruitBox
        // },
        created() {
            this.token = APP.GetLocationParams("token");
            this.imei = APP.GetLocationParams("imei");
            this.qrCode = APP.GetLocationParams("qrCode");
            // this.getInfo();
            this.getMsg();
            this.getTable();
            if (this.isAndroid()) {
                this.isShow = true;
            } else if (this.isIos()) {
                this.isShow = false;
            }
        },
        mounted() {
            $(function () {
                $(window).scroll(function () {
                    var top = 0; //获取指定位置
                    var scrollTop = $(window).scrollTop();  //获取当前滑动位置
                    if (scrollTop > top) {                 //滑动到该位置时执行代码
                        $(".enlighteningMoney-left").addClass("active");
                    } else {
                        $(".enlighteningMoney-left").removeClass("active");
                    }
                })
            })
        },
        methods: {
            copyQrcode() {
                let _this = this
                let clipboard = new Clipboard('.copy_qrcode', {
                    text: function () {
                        return _this.listData.qrCode
                    }
                })
                clipboard.on('success', function () {
                    _this.$toast('复制成功');
                    clipboard.destroy()
                })
                clipboard.on('error', function () {
                    _this.$toast('复制失败，请手动复制');
                    clipboard.destroy()
                })
            },
            toggle(id) {
                this.status = id;
            },
            openOne() {
                this.isShowBoxOne = true;
            },
            closeOne() {
                this.isShowBoxOne = false;
            },
            openQQBox() {
                this.isShowQQBox = true;
                // this.isShowBoxOne = false;
            },
            closeQQBox() {
                this.isShowQQBox = false;
            },
            openyyxq() {
                this.isShowGZ = true;
            },
            closeGZ() {
                this.isShowGZ = false;
            },
            openGZPT() {
                this.isShowGZPT = true;
            },
            closeGZPT() {
                this.isShowGZPT = false;
            },
            openRule() {
                this.isShowRule = true;
            },
            closeRule() {
                this.isShowRule = false;
            },
            // getInfo(){
            //     let parameterData={
            //         token:this.token,
            //         imei:this.imei
            //     }
            //     this.$get('/api/lCoinChange/getApprenticeReward',parameterData).then(res =>{
            //         if((res.statusCode+"").startsWith("2")){

            //             this.reward = res.data.reward;

            //         }
            //     })
            // },
            toPay(price, isRenewal) {
                window.android.toPay(this.listData.price, this.listData.isRenewal);
            },
            getMsg() {
                let parameterData = {
                    token: this.token,
                    imei: this.imei
                }
                this.$get('/py/partner/index', parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        if (res.data.roleType == 1) {
                            res.data.roleType = '小麒麟';
                        } else if (res.data.roleType == 2) {
                            res.data.roleType = '金麒麟';
                        } else if (res.data.roleType == 3) {
                            res.data.roleType = '玉麒麟';
                        } else {
                            res.data.roleType = '邀请达人';
                        }

                        if (res.data.highRole == 1) {
                            res.data.highRole = '普通用户';
                        } else if (res.data.highRole == 2) {
                            res.data.highRole = '二级代理';
                        } else {
                            res.data.highRole = '一级代理';
                        }

                        this.ordinaryRewardImg = res.data.ordinaryRewardImg.split(',');
                        this.inviteImg = res.data.inviteImg.split(',');
                        this.teamRewardImg = res.data.teamRewardImg.split(',');
                        this.darenRewardImg = res.data.darenRewardImg.split(',')
                        this.schemeImg = res.data.schemeImg.split(',')
                        this.listData = res.data;
                    }
                })
            },
            getTable() {
                this.$get('/api/rankDarenWeek/queryFlist').then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        this.date = res.data.date;
                        this.count = res.data.count;
                        this.tableData = res.data.list;
                        this.history = res.data.history;
                    }
                })
            },
            jump() {
                if (this.history == null || this.history == 'null') {
                    return;
                } else {
                    window.location.href = '/zhoubang.html?history=' + this.history
                    // this.$router.push({
                    //     path:'zhoubang',
                    //     query:{
                    //         history:this.history
                    //     }
                    // })
                }
            },
            refresh() {
                this.getTable();
                this.rotate = !this.rotate;
            },

            // close(){
            //     this.isShow = false
            // },
            //我的奖励跳转
            rewardTap() {
                window.location.href = '/generalizeDetails.html?token=' + this.token + '&imei=' + this.imei + '&teamBenefit=' + this.listData.teamBenefit + '&apprentice=' + this.listData.apprentice + '&qrCode=' + this.qrCode;
                // this.$router.push({
                // path:'/generalizeDetails',
                // query:{
                //     token:this.token,//token值
                //     imei:this.imei,
                //     teamBenefit:this.listData.teamBenefit,
                //     apprentice:this.listData.apprentice
                // }
                // });
            },

            //跳回安卓APP
            naviteTap() {
                window.android.over();
            },
            openRecruitBox(i, m) {
                let parameterData = {
                    token: this.token,
                    imei: this.imei
                }
                this.$get('/api/userInfo/queryBaseInfo', parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        if (this.isAndroid()) {
                            window.android.inviteFriend(res.data.qrCode);
                        } else if (this.isIos()) {
                            window.shareAction(res.data.qrCode);
                        }
                    }
                })
                // window.android.inviteFriend('https://h5.bzlyplay.com/#/register?qrCode='+this.qrCode);
                //   window.android.inviteFriend('https://h5.bzlyplay.com/#/drainageLinks');
            },
            onCopy(e) {
                this.$toast('复制成功');
            },
            // 复制失败
            error(e) {
                this.$toast('复制失败');
            },
            onCopyQQ(e) {
                this.$toast('复制成功');
                this.isShowQQBox = false;
                this.isShowBoxOne = false;
            },
            // 复制失败
            errorQQ(e) {
                this.$toast('复制失败');
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
        }
    }

</script>

<style scoped>
  /* 返回箭头 */
  .enlighteningMoney-left {
    position: fixed;
    /* left: 0.75rem; */
    display: flex;
    align-items: center;
    vertical-align: middle;
    width: 100%;
  }

  .eml_img {
    margin-left: 0.75rem;
    width: 0.5rem;
    height: 0.8rem;
  }

  .enlighteningMoney-left.active {
    background: rgb(33, 25, 137, 1);
    transition: background 1s;
    /* Firefox 4 */
    -moz-transition: background 1s;
    /* Safari and Chrome */
    -webkit-transition: background 1s;
    /* Opera */
    -o-transition: background 1s;
    z-index: 100;
  }

  .enlighteningMoney-left p {
    font-size: 0.75rem;
    color: #fff;
    margin-left: 6.5rem;
  }

  /* 横幅 */
  .em_img img {
    position: absolute;
    top: 7rem;
    width: 18rem;
    height: 5.25rem;
  }

  .et_imgsy img {
    position: absolute;
    top: 5.5rem;
    left: 5.6rem;
    width: 6.75rem;
    z-index: 99;
  }

  .et_scroll {
    position: absolute;
    top: 2.8rem;
    left: 0.8rem;
    display: flex;
    align-items: center;
    width: 16.4rem;
    justify-content: space-between;
    /* height: 1.7rem; */
  }

  .et_scroll_left {
    display: flex;
    /* align-items: center; */
  }

  /* .et_scroll_left div:nth-of-type(1){
      width: 1.2rem;
      margin-right: 0.4rem;
  } */
  .et_scroll_left img {
    width: 2rem;
    height: 2rem;
    margin-right: 0.6rem;
    border-radius: 50%;
  }

  .et_scroll_left p {
    margin: 0;
  }

  .et_scroll_left div:nth-of-type(2) p:nth-of-type(1) {
    font-size: 0.55rem;
    color: #fff;
    margin-bottom: 0.2rem;
  }

  .et_scroll_left div:nth-of-type(2) p:nth-of-type(2) {
    font-size: 0.55rem;
    color: #FFEB2E;
  }

  .et_scroll_left span {
    background-color: #FF4F44;
    border-radius: 0.1rem;
    height: 0.65rem;
    line-height: 0.65rem;
    padding: 0.1rem;
    margin-left: 0.2rem;
  }

  .et_scroll_right {
    /* width: 1.85rem; */
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    font-size: 0.5rem;
    color: #20158E;
    background-color: #FFEB2E;
    border-radius: 0.2rem;
    padding: 0.1rem;
  }

  /* 顶部背景图 */
  .enlighteningMoney-head img {
    height: 16.3rem;
    width: 100%;
    max-width: 100%;
    position: absolute;
  }

  /* 横条 */
  .enlighteningMoney-title {
    display: flex;
    justify-content: space-around;
    height: 4rem;
    background-color: #fff;
    border-radius: 0.5rem;
    position: absolute;
    top: 6.1rem;
    left: 0.8rem;
    right: 0.8rem;
  }

  .enlighteningMoney-title p {
    margin: 0;
    text-align: center;
  }

  .enlighteningMoney-title img {
    width: 2.9rem;
  }

  .enlighteningMoney-titleLeft p:nth-of-type(1) {
    font-size: 1rem;
    margin-top: 0.8rem;
    color: #FF3C2E;
    margin-bottom: 0.2rem;
  }

  .enlighteningMoney-titleLine {
    border: 0.04rem solid #EBEBEB;
    height: 1.5rem;
    margin: auto 0;
  }

  .enlighteningMoney-titleRight p:nth-of-type(1) {
    font-size: 1rem;
    margin-top: 0.8rem;
    color: #FF3C2E;
    margin-bottom: 0.2rem;
  }

  /* 按钮 */
  .enlighteningMoney-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2.8rem;
    line-height: 2.8rem;
    z-index: 999;
    background-color: #fff;
    border-top: 1px solid #F0F0F0;
  }

  .enlighteningMoney-btn p {
    width: 16.35rem;
    font-size: 0.7rem;
    color: #fff;
    text-align: center;
    border-radius: 1.1rem;
    background: -webkit-linear-gradient(left, #FF3E2B, #FF1370); /* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B, #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B, #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B, #FF1370); /* 标准语法ie9标准的语法 */
    height: 2.2rem;
    line-height: 2.2rem;
    margin: 0.3rem auto;
  }

  .et_toggle {
    position: absolute;
    top: 10.8rem;
  }

  .game_toggle {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    width: 18rem;
    height: 2.45rem;
    line-height: 1.3rem;
    font-size: 0.65rem;
    color: #9EA9BC;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .game_toggle .activeTog {
    color: #3C3E5B;
    font-weight: 600;
  }

  .activeTog .game_line {
    text-align: center;
    height: 0.2rem;
    width: 1.2rem;
    background: #673CFF;
    margin: 0 auto;
    border-radius: 0.15rem;
  }

  .game_toggle_inner {
    margin-top: 0.4rem;
  }

  .em_scroll {
    position: absolute;
    background-color: #fff;
    top: 13.2rem;
  }

  .ptyq {
    width: 15.55rem;
    background-color: #EFF5FB;
    padding: 0.55rem;
    border-radius: 0.4rem;
    margin: 0 0 0.8rem 0.8rem;
  }

  .zyzj {
    width: 15.55rem;
    background-color: #FFF6F6;
    padding: 0.55rem;
    border-radius: 0.4rem;
    margin: 0 0 0.8rem 0.8rem;
  }

  .yyzj_btn img {
    width: 10.75rem;
    margin: 0.6rem 2.6rem 0 2.6rem;
  }

  .ptyq_top_font {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.45rem;
  }

  .ptyq_top_font p {
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: 0;
  }

  .ptyq_top_font img {
    width: 10.65rem;
  }

  .ptyq_top_img img {
    width: 15.55rem;
  }

  .ptyq_center_img {
    /* padding: 0 0.8rem; */
  }

  .ptyq_center_img img:nth-of-type(1) {
    width: 18rem;
  }

  .ptyq_center_img img:nth-of-type(2) {
    width: 4.6rem;
    margin: 0.85rem 0 0.4rem 1.2rem;
  }

  .ptyq_center_img p {
    margin: 0;
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: 0 1.2rem 0.4rem 1.2rem;
  }

  .ptyq_center_img span {
    font-size: 0.5rem;
    color: #fff;
    background-color: #FEBC06;
    padding: 0 0.2rem;
    margin-right: 0.2rem;
  }

  .ranking_head {
    text-align: center;
  }

  .ranking_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ranking_titbg img {
    width: 7.05rem;
    margin-left: 5.45rem;
  }

  .fontone {
    width: 5.9rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: #FF605F;
    font-size: 0.55rem;
    color: #fff;
    border-radius: 0.45rem;
    margin: 0.2rem auto;
  }

  .fonttwo {
    font-size: 0.5rem;
    color: #FF605F;
    margin: 0 auto 0.75rem auto;
  }

  .ranking_gz {
    display: flex;
    align-items: center;
    margin-right: 1.2rem;
  }

  .ranking_gz img {
    width: 0.7rem;
    height: 0.7rem;
  }

  .ranking_gz p {
    font-size: 0.55rem;
    color: #FF605F;
    margin: 0;
  }

  .ranking_center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.2rem;
  }

  .ranking_center_left {
    display: flex;
    align-items: center;
  }

  .ranking_center_left p {
    font-size: 0.6rem;
    color: #A3AEBF;
    margin: 0 0.2rem 0 0;
  }

  .ranking_center_left img {
    width: 0.3rem;
  }

  .ranking_center_right {
    border-radius: 0.8rem;
    border: 1px solid #FF605F;
    display: flex;
    align-items: center;
    padding: 0.1rem 0.45rem;
  }

  .ranking_center_right p {
    font-size: 0.55rem;
    color: #FF605F;
    margin: 0;
  }

  .ranking_center_right img {
    width: 0.6rem;
    margin-right: 0.2rem;
  }

  .ranking_bottom {
    text-align: center;
    margin-top: 0.2rem;
    /* position: relative; */
  }

  .ranking_bottom img {
    width: 17.5rem;
    margin: 0 auto;
  }

  .table_title {
    display: flex;
    justify-content: space-around;
    color: #fff;
    padding: 0 1.2rem;
    margin-top: -1.8rem;
    font-size: 0.65rem;
  }

  .table_title p {
    margin: 0;
  }

  .table_wrapper {
    margin: 0 auto;
    width: 16.2rem;
    height: 12.15rem;
    border: 1px solid #FC3632;
    overflow: auto;
    text-align: center;
    border-radius: 0 0 0.4rem 0.4rem;
    margin-top: 0.3rem;
  }

  /* .table_wrapper img{
      width: 0.8rem;
  } */
  table {
    border-collapse: collapse;
  }

  tbody td {
    border: 1px solid #F0F0F0;
  }

  tbody td:nth-of-type(1) {
    width: 7.4rem;
    font-size: 0.6rem;
    color: #2D2E39;
    padding: 0.35rem 0;
  }

  tbody td:nth-of-type(1) img {
    width: 0.8rem;
    border-radius: 50%;
    height: 0.8rem;
    vertical-align: middle;
  }

  tbody td:nth-of-type(2) {
    width: 2.2rem;
    font-size: 0.6rem;
    color: #FF2B48;
  }

  tbody td:nth-of-type(3) {
    width: 6.55rem;
    font-size: 0.6rem;
    color: #FF2B48;
  }

  .yqdr {
    width: 16.8rem;
    background-color: #f5f2ff;
    border-radius: 0.4rem;
    margin: 0 0 0.6rem 0.6rem;
  }

  .yqdr_inner_right {
    display: flex;
    align-items: center;
  }

  .yqdr_inner_right img {
    width: 0.6rem;
    height: 0.6rem;
    margin-right: 0.1rem;
  }

  .yqdr_inner_right p {
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: 0;
  }

  .yqdr_tips {
    font-size: 0.5rem;
    color: #3C3E5B;
    text-align: center;
  }

  .yqdr_tips span {
    font-size: 0.5rem;
    color: #FF4437;
  }

  .yqdr_inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0.8rem;
  }

  .em_box_one {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }

  .em_box_one_content {
    padding: 0 0.8rem;
    height: 18rem;
    overflow: scroll;
  }

  .em_box_one_content div {
    font-size: 0.7rem;
    color: #3C3E5B;
    font-weight: bold;
  }

  .em_box_one_content p {
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: 0.25rem 0.65rem 0.25rem 0.4rem;
  }

  .em_box_one_content span {
    font-size: 0.5rem;
    background-color: #9203FA;
    color: #fff;
    padding: 0 0.2rem;
    border-radius: 0.1rem;
    text-align: center;
    margin: 0 0.4rem 0 0;
  }

  .qqbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }

  .qqbox_inner {
    position: relative;
    top: 13.15rem;
    left: 1.8rem;
    background-color: #fff;
    width: 14.35rem;
    height: 7.45rem;
    border-radius: 0.4rem;
    text-align: center;
  }

  .qqbox_inner img {
    position: absolute;
    top: 0.4rem;
    right: 0.5rem;
  }

  .qqbox_inner p:nth-of-type(1) {
    padding-top: 1.4rem;
    font-size: 0.65rem;
    color: #3C3E5B;
    margin: 0;
  }

  .qqbox_inner p:nth-of-type(2) {
    font-size: 0.65rem;
    color: #FF3C2E;
    margin: 0;
  }

  .qqbox_inner div {
    width: 8.75rem;
    height: 2.25rem;
    font-size: 0.65rem;
    color: #fff;
    border-radius: 1.15rem;
    line-height: 2.25rem;
    background: -webkit-linear-gradient(left, #FF3E2B, #FF1370); /* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B, #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B, #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B, #FF1370); /* 标准语法ie9标准的语法 */
    margin: 0.8rem auto 0 auto;
  }

  .gzxq {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }

  .gzxq_inner {
    position: relative;
    top: 4.6rem;
    left: 0.8rem;
    background-color: #fff;
    width: 16.35rem;
    border-radius: 0.4rem;
  }

  .gzxq_inner_new {
    position: relative;
    top: 9rem;
    left: 0.8rem;
    background-color: #fff;
    width: 16.35rem;
    border-radius: 0.4rem;
  }

  .gz_head img {
    width: 6.6rem;
    position: absolute;
    top: -0.5rem;
    left: 5rem;
  }

  .gz_close img {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .gz_con {
    padding: 0 0.8rem;
    height: 18rem;
    overflow: auto;
  }

  .gz_con_new {
    padding: 0 0.8rem;
    /* height: 10rem; */
    overflow: auto;
  }

  .gz_con_new p {
    /* margin: 0; */
  }

  .gz_con p {
    margin: 0;
  }

  .gz_con_one {
    font-size: 0.7rem;
    color: #3C3E5B;
    font-weight: bold;
    margin: 0.4rem 0 0.2rem 0;
  }

  .gz_con_two {
    font-size: 0.6rem;
    color: #F55856;
    margin: 0 0 0.2rem 0;
  }

  .gz_con_three {
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: 0;
  }

  .gz_con img {
    width: 14.75rem;
  }

  .gz_btn {
    background-color: #fff;
  }

  .gz_btn p {
    text-align: center;
    width: 8.75rem;
    height: 2.2rem;
    line-height: 2.2rem;
    font-size: 0.65rem;
    color: #fff;
    border-radius: 1.15rem;
    margin: 0.3rem auto 0 auto;
    background: -webkit-linear-gradient(left, #FF3E2B, #FF1370); /* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B, #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B, #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B, #FF1370); /* 标准语法ie9标准的语法 */
  }

  .gz_btn_new p {
    text-align: center;
    width: 8.4rem;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 0.65rem;
    color: #fff;
    border-radius: 1.15rem;
    margin: 1.2rem auto 0.8rem auto;
    background: -webkit-linear-gradient(left, #FF3E2B, #FF1370); /* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B, #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B, #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B, #FF1370); /* 标准语法ie9标准的语法 */
  }

  .drgz {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }

  .drgz_inner {
    position: relative;
    top: 3.6rem;
    left: 0.8rem;
    background-color: #fff;
    width: 16.35rem;
    height: 23.5rem;
    border-radius: 0.4rem;
    /* overflow: auto; */
  }

  .dr_close img {
    width: 0.6rem;
    position: absolute;
    top: 0.5rem;
    right: 0.6rem;
  }

  .dr_head img {
    width: 6.6rem;
    position: absolute;
    top: -0.5rem;
    left: 5rem;
  }

  .dr_con {
    text-align: center;
    padding-top: 1.4rem;
  }

  .dr_con p {
    font-size: 0.7rem;
    color: #3C3E5B;
    margin: 0 0 0.4rem 0;
    font-weight: 600;
  }

  .dr_con img {
    width: 14.8rem;
  }

  .go {
    transform: rotate(360deg);
    transition: all 2s;
  }

  .black {
    position: relative;
  }
</style>

