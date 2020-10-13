<template>
  <div id="app" class="wrap" style="background:rgba(243,245,248,1); width: 100vw; height: 100vh;overflow: auto">
    <div class="myReward-head" >
      <img @click="backTap" src="../../assets/right.png" alt="">
      <p>奖品详情</p>
    </div>

    <div class="wrap-conent" v-if="lotterytype">
        <div class="list">
          <div class="pictrue">
            <img :src="datailData.imageUrl" />
          </div>
          <div class="dec">
            <span>{{datailData.goodsName}}</span>
            <span v-if="datailData.status==1">审核中</span>
            <span v-if="datailData.status==2">拒绝</span>
            <span v-if="datailData.status==3">待发货</span>
            <span v-if="datailData.status==4">已发货</span>
          </div>
        </div>
      <div class="card-box">
        <div class="item">
          <span>卡号:</span>
          <div class="card-num" :class="datailData.status!=4?'bgColor':''">
            <div v-if="datailData.status==4">{{datailData.expressCompany}}</div>
          </div>
          <!--<div class="copy" v-if="copyTrue">复制</div>-->
          <div class="copy" v-if="copyTrue"
               v-clipboard:copy="datailData.expressCompany"
               v-clipboard:success="onCopy"
               v-clipboard:error="error">
            复制</div>
        </div>
        <div class="item">
          <span>卡密:</span>
          <div class="card-num" :class="cardPassword?'':'bgColor'">
           <div>{{cardPassword}}</div>
          </div>

          <div class="copy" v-if="copyTrue"
               v-clipboard:copy="cardPassword"
               v-clipboard:success="onCopy"
               v-clipboard:error="error">
            复制</div>
        </div>
      </div>
      <div class="explain"  v-if="explainTrue">
       <div>
         特别说明：由于现在的卡密采购风险隐患很多，为尽可能保障蛋蛋和蛋友双方的权益，
         我们选择较为安全保险的正规渠道商家订货，相对来说，卡密奖品采购成本较高、订货周期较长
         ，所以抽奖金蛋价略高，介意的蛋友请选择其他直充类话费奖品！
       </div>
        <br/>
        <!--<br/>-->
        <div>
          每天凌晨准时抢抽！限抢50张！<br/>
          抽奖说明（必看）：<br/>
          1、手机卡密奖品为限量抽奖，手机充值类别每人每天限抽一种且一张；奖品为先抽中，再下单采购的方式，我们将于2-3个工作日内尽快发货，但如遇渠道商货源缺货情况，会有延时或取消发货情况，敬请谅解；<br/>
          2、发货后会发送手机短信提示，请保持认证手机畅通；<br/>
          3、奖品发货后必须于2天内查看使用，2天后再查看的卡密出现任何问题PC蛋蛋不承担任何责任；<br/>
          4、手机卡密奖品我们只承诺做话费充值使用，个人进行第三方平台充值支付出现的任何问题需自行承担风险；<br/>
          5、手机卡密有效期为60天，请在卡密有效期内使用！逾期将无法充值，抽奖金蛋无法退还！<br/>
          6、如果出现卡密错误无法使用的情况，请点此提交相关信息，我们会在2-3个工作日帮你处理。<br/>
        </div>
        <br/>
        <div>
          【产品介绍】：<br>
          全国移动话费卡是中国移动通信提供的GSM数字移动电话网的服务. 用户无需缴纳入网费和月基本费，无需每月去中国移动通信营业厅交费，无需担心话费透支， 随处购买， 便捷使用，支持全国漫游。
        </div>
        <br/>
        <div>
          使用范围：全国范围（港澳台除外） <br/>
          使用方法：<br/>
          第一步：拨免费充值电话<span class="phone">13800138000</span>。<br/>
          第二步：根据语音提示输入卡号和密码。 <br/>
          客服热线：{{hotType}}
        </div>
      </div>
        <div class="box-password" transition="boxanimate" :class="payTrue?'h':''"  >
          <transition name="fade1">
           <div class="bg" v-if="payTrue"  @click="closeTap"></div>
          </transition>
          <transition name="boxanimate">
            <div v-if="payTrue"  class="center">
               <div class="password">
                  <input type="password"  v-model="payPassword" placeholder="请输入宝猪支付密码"/>
               </div>
                <div class="forget">
            <span @click="forgetTap">忘记密码？</span>
            <span @click="forgetTap">没有支付密码？去设置</span>
          </div>
            <div class="sure" @click="submitTap">确定</div>
          </div>
          </transition>
        </div>
      <div v-if="datailData.status==1" class="codebtn codebgCannel">提取卡密</div>
      <div @click="payTrue=true" v-if="datailData.status==4 && sign==true" class="codebtn codebgSure">提取卡密</div>
    </div>
  </div>
</template>


<script type="text/javascript">
  // import { Toast } from 'mint-ui'
  import md5 from 'js-md5'
  // import Vue from 'vue'
  // import VueClipboard from 'vue-clipboard2'

  // Vue.use(VueClipboard)
  export default {
    data() {
      return {
        id:'',
        token:'',
        imei:'',
        datailData:{},//详情数据
        lotterytype:false,//1:实物，2:虚拟
        copyTrue:false,//是否可复制
        explainTrue:false,//说明
        payPassword:'',//支付密码
        payTrue:false,////支付弹窗
        sign:true,
        cardPassword:'',
        paysuo:false,
        hotType:''//话费类型
      }
    },

    watch:{

    },
    created() {
      this.token = APP.GetLocationParams("token") ||  window.sessionStorage.getItem("token");
      this.imei = APP.GetLocationParams("imei") ||  window.sessionStorage.getItem("imei");
      this.id = APP.GetLocationParams("id") ||  window.sessionStorage.getItem("id");
      this.listDtail()
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
      },
    },
    methods: {
      //复制成功
      onCopy(e){
        this.$toast('复制成功');
      },
      // 复制失败
      error(e){
        this.$toast('复制失败');
      },
      backTap(){
        window.history.go(-1);
      },
      //确定
      submitTap(){
        if (!this.payPassword){
          this.$toast('请输入宝猪支付密码');
          return false
        }
        let passwordSign = md5(this.payPassword);
        let parameterData = {
          token:this.token,
          imei:this.imei,
          id:this.id,
          payPassword:passwordSign
        }
        this.$get('/api/mLotteryOrder/getCardPassword', parameterData).then(res => {
          if((res.statusCode+"").startsWith("2")){
            this.cardPassword = res.data;
            this.copyTrue =true;
            this.explainTrue = true;
            this.sign = false;
            this.payTrue = false;
            this.$toast(res.message);
            this.paysuo = true
          }else {
            this.$toast(res.message);
          }
        })
      },
     //详情信息
      listDtail() {
        let parameterData = {
          token:this.token,
          imei:this.imei,
          id:this.id,
        }
        this.$get('/api/mLotteryOrder/appQueryOne', parameterData).then(res => {
          if((res.statusCode+"").startsWith("2")){
            if (res.data.lotterySort==2){
              this.lotterytype=true;
            }

            if(res.data.goodsName.indexOf("移动") != -1){
               this.hotType  = '10086'
            }else if(res.data.goodsName.indexOf("联通") != -1){
              this.hotType  = '10010'
            }else if(res.data.goodsName.indexOf("电信") != -1){
              this.hotType  = '10000'
            }
            this.datailData = res.data;
          }
        })
      },

      //忘记密码 跳转安卓android页面
      forgetTap(){
        window.android.toForgetPayPsw()
      },
      closeTap(){
        this.payTrue = false;
        this.paysuo = true
      }
    },
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  p{
    margin: 0;
  }
  img{
    display: block;
  }
  .myReward-head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
  }
  .myReward-head img{
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
  }
  .myReward-head p{
    color: #2d2e38;
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
  }

  .wrap-conent{
    width: 100%;
    height: auto;
    position: relative;
    top: 2.2rem;
    left: 0;
  }

  .wrap-conent .list{
    width: 100%;
    height: 4.25rem;
    border-top: 0.05rem solid rgba(239,239,239,1);
    background:rgba(255,255,255,1);
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
    padding: 0.75rem 0.8rem 0.65rem 1.2rem;
  }

  .wrap-conent .list .pictrue,
  .wrap-conent .list .pictrue img{
    width: 2.8rem;
    height: 2.8rem;
  }

  .wrap-conent .list .dec{
    width: 12.4rem;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;

  }

  .wrap-conent .list .dec span:nth-child(1){
    color:rgba(60,62,91,1);
    font-size: 0.8rem;

  }

  .wrap-conent .list .dec span:nth-child(2){
    color:rgba(158,169,188,1);
    font-size: 0.7rem;
  }

  .card-box{
       width: 100%;
       height: auto;
       padding: 0.75rem 0 0 1.2rem;
       display: inline-block;
     }

  .card-box .item {
    width: 100%;
    height: 1rem;
    float: left;
  }
  .card-box .item:nth-child(1){
    margin-bottom: 0.8rem;
  }

  .card-box .item span{
    font-size:0.7rem;
    font-weight:400;
    color:rgba(172,182,198,1);
    float: left;
  }

  .card-box .item .card-num{
    width:6.65rem;
    height:1rem;
    float: left;
    margin-left: 0.3rem;
    color:#3C3E5B;
    font-size: 0.7rem;
    line-height: 1rem;
  }

  .card-box .item .copy{
    width:2.15rem;
    height:1rem;
    background:rgba(255,255,255,1);
    border-radius:0.2rem;
    border:1px solid rgba(223,225,227,1);
    float: left;
    font-size:0.6rem;
    font-weight:400;
    color:rgba(177,186,201,1);
    text-align: center;
    line-height: 1rem;
    margin-left: 0.4rem;
  }


  .bgColor {
    background: rgba(216, 216, 216, 1);

  }
  .codebtn{
    width:16.4rem;
    height:2.2rem;
    border-radius:4px;
    position: fixed;
    /*top: 0;*/
    left: 0;
    right: 0;
    margin: auto;
    bottom: 1.6rem;
    font-size:0.8rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 2.2rem;
  }

  .codebgCannel{
    background:rgba(186,186,186,1);
  }

  .codebgSure{
    background:rgba(186,186,186,1); background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);
    background: -o-linear-gradient(right, #FF3E2B , #FF1370);
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370);
    background: linear-gradient(to right, #FF3E2B , #FF1370);
  }

  .explain{
    width:15.7rem;
    height:auto;
    background:rgba(230,234,238,1);
    border-radius:0.2rem;
    margin: 1.15rem auto auto auto;
    padding: 0.8rem;
    font-size:0.55rem;
    font-weight:400;
    color:rgba(60,62,91,1);
    line-height: 0.8rem;
    margin-bottom: 1.75rem;
  }

  .explain .phone{
    color:rgba(255,51,82,1);
  }


  .box-password{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content:center;
    align-content: center;
    align-items: center;
    z-index: -999;
    transition: all 0.5s;
    -webkit-transition:all .5s;
    -moz-transition:all .5s;
    -ms-transition:all .5s;
    -o-transition:all .5s;
  }

  .h{
    z-index: 999;
  }
   .bg{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background:rgba(41,41,41,0.54);
    z-index: 100;
   }

  .box-password .center{
    width:13.6rem;
    height:9.65rem;
    background:rgba(255,255,255,1);
    border-radius:0.4rem;
    padding: 1.6rem 0.8rem 1.2rem 0.8rem;
    z-index: 101;
  }

  .box-password .center .password{
    width:12rem;
    height:2.2rem;
    background:rgba(242,245,248,1);
    border-radius:0.2rem;
    margin-bottom: 0.4rem;
  }

  .box-password .center .password input{
    width: 100%;
    height: 2.2rem;
    outline: none;
    border: none;
    font-weight:400;
    color:rgba(158,169,188,1);
    font-size: 0.7rem;
    background:rgba(242,245,248,1);
    padding-left: 0.8rem;
    border-radius:0.2rem;
  }

  .box-password .center .password input::-webkit-input-placeholder{
    font-weight:400;
    color:rgba(158,169,188,1);
    font-size: 0.7rem;
  }
  .box-password .center .password input::-moz-placeholder{
    font-weight:400;
    color:rgba(158,169,188,1);
    font-size: 0.7rem;
  }
  .box-password .center .password input:-ms-input-placeholder{
    font-weight:400;
    color:rgba(158,169,188,1);
    font-size: 0.7rem;
  }

  .box-password .center .forget{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
    font-size:0.6rem;
    font-weight:400;
    color:rgba(158,169,188,1);
    margin-bottom: 1.2rem;
  }

  .box-password .center .sure {
    width: 12rem;
    height: 2.2rem;
    border-radius: 1.1rem;
    background:rgba(186,186,186,1); background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);
    background: -o-linear-gradient(right, #FF3E2B , #FF1370);
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370);
    background: linear-gradient(to right, #FF3E2B , #FF1370);
    font-size:0.7rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 2.2rem;
    box-shadow: 2px 3px 8px 2px #E6E6E6;
    -webket-box-shadow: 2px 3px 8px 2px #E6E6E6;
    -moz-box-shadow: 2px 3px 8px 2px #E6E6E6;
    -o-box-shadow: 2px 3px 8px 2px #E6E6E6;
  }

  .fade1-enter-active, .fade1-leave-active {
    -webkit-transition:all .5s;
    -moz-transition:all .5s;
    -ms-transition:all .5s;
    -o-transition:all .5s;
  }
  .fade1-enter, .fade1-leave-to {
    opacity: 0;
  }

  .boxanimate-enter-active, .boxanimate-leave-active {
    transition: all .5s;
    -webkit-transition:all .5s;
    -moz-transition:all .5s;
    -ms-transition:all .5s;
    -o-transition:all .5s;
  }
  .boxanimate-enter, .boxanimate-leave-to {
    transform: scale(0);
    -moz-transform: scale(0);
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
  }


</style>
