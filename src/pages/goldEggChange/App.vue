<template>
  <div id="app" style="height: 100vh;background:rgba(243,245,248,1);overflow: auto;">
    <div class="ge_head">
      <img src="../../assets/right.png" alt="" @click="back">
      <p>激活兑换卡</p>
      <p @click="jump">兑换记录</p>
    </div>
    <div class="change-wrap">
      <div class="my-id"><span>我的用户ID： {{myID}}</span></div>
      <div class="chang-center">
        <div class="used-type">
          <div class="types1">
            <span>使用账号：</span>
            <span>{{listData.mobile}}（ID:{{listData.accountId}}）</span>
          </div>
          <div v-show="isShow" @click="usedType(1)" class="types2">为好友使用</div>
          <div v-show="isAmend" class="types2" @click="usedType(2)">修改</div>
        </div>

        <div class="carNum">
          <div class="list">
            <div class="list-titles">卡 &nbsp;&nbsp;&nbsp;号：</div>
            <div class="list-inputs">
              <input placeholder="请输入兑换卡卡号" v-model="cardNum"></input>
            </div>
          </div>
          <div class="list">
            <div class="list-titles">卡 &nbsp;&nbsp;&nbsp;密：</div>
            <div class="list-inputs">
              <input placeholder="请输入兑换卡卡密" v-model="cardPassword"></input>
            </div>
          </div>
        </div>

        <div class="sear"><span @click="openCard">查询兑换卡卡号</span></div>
        <div class="gec_btn">
          <p @click="amendPassword">转换卡密</p>
          <p class="btn" @click="userEgg">确认使用</p>
        </div>

      </div>
      <div class="change-tip">
        <div class="change-tip-title">获得金猪技巧</div>
        <div class="change-tip-item">
          <span>1、</span>
          <span>金猪兑换卡主要通过砸金蛋生成；</span>
        </div>

        <div class="change-tip-item">
          <span>2、</span>
          <span>金猪兑换卡为游戏道具，仅限游戏使用；</span>
        </div>
        <div class="change-tip-item">
          <span>3、</span>
          <span>使用金猪兑换卡前，可以查询该兑换卡是否可用;</span>
        </div>
        <div class="change-tip-item">
          <span>4、</span>
          <span>每张兑换卡仅可转换一次卡密，请谨慎使用。</span>
        </div>
      </div>

    </div>

    <div class="diag" v-show="diagFriends">
      <div class="box1">
        <div class="b-wrap">
          <div class="titles">好友ID</div>
          <div class="input-div">
            <input v-model="userId" placeholder="请输入好友ID"></input>
          </div>
          <div class="error-tip">
            <span v-show="noId">好友ID不存在</span>
         </div>
         <div class="box1-btn bgcolor" @click="usedFrieds">为好友使用</div>
        </div>
        <div class="b-close">
          <img @click="close1()"  src="../../assets/msgClose.png" alt="closebox">
        </div>
      </div>
    </div>

    <div class="diag" v-show="diaCard">
      <div class="box1 card">
        <div class="b-wrap">
          <div class="titles">查询卡号</div>
          <div class="card-tip">兑换卡卡号</div>
          <div class="input-div">
            <input placeholder="请输入金猪兑换卡卡号" v-model="cardNumber"></input>
          </div>
          <div class="result-tip">查询结果</div>
          <div :class="Srusult==1?'result-tip-succ':'result-tip-error'">
            <span v-if="Srusult==1">激活兑换卡有效，使用可获得{{pigCoin}}W金猪奖励</span>
            <span v-if="Srusult==2">激活兑换卡无效</span>
            </div>

          <!-- <div class="result-tip-error" ><span>激活兑换卡无效</span></div> -->
          <div class="box1-btn bgcolor" @click="usedCard">确定</div>
        </div>
        <div class="b-close" @click="closeDiaCard">
          <img src="../../assets/msgClose.png" alt="closebox">
        </div>
      </div>
    </div>

    <div class="diag" v-show="diaBg" @click="closeSelf">
      <div class="box2" v-show="diaSucc" @click="stop">
        <div class="imgs"> <img src="../../assets/success-1.png" alt="closebox"></div>
        <div class="t1">激活成功</div>
        <div class="t2">金猪已到账</div>
      </div>
      <div class="box2" v-show="diaErr" @click="stop">
        <div class="imgs"> <img src="../../assets/error-1.png" alt="closebox"></div>
        <div class="t1">激活失败</div>
        <div class="t2">激活卡无效或卡密错误</div>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="gec_box" v-show="isShowBox">
      <div class="gec_box_inner">
        <img src="../../assets/chenggong.png" alt="">
        <p>卡密转化成功</p>
        <p>请在"<span>我的奖品</span>"中查看</p>
        <div @click="jumpPage">查看</div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return{
        myID:'',
        // token: 'b0dac77e1622b65df8ff9b8b7064df46',
        // imei: '868602045871237',
        userId:'',
        diagFriends:false,
        noId:false,
        isShow:true,
        isAmend:false,
        listData:{
          mobile:'0',
          accountId:'0'
        },
        diaCard:false,
        cardState:false,
        succError:false,
        Srusult:'',
        pigCoin:0,
        diaBg:false,
        diaSucc:false,
        diaErr:false,
        isShowBox:false
      }
    },
    created(){
      this.token = APP.GetLocationParams("token");
      this.imei = APP.GetLocationParams("imei");
      this.getInfo()
    },
    methods: {
      jump() {
        window.location.href = '/goldEggsChangeList.html?token='+this.token+'&imei='+this.imei;
      },
      jumpPage(){
        window.location.href = '/myPrize.html?token='+this.token+'&imei='+this.imei;
      },

      //为好友使用
      usedType(taps){
        this.diagFriends = true;

      },
      openCard(){
        this.diaCard = true;
      },
      closeDiaCard(){
        this.diaCard = false;
      },
      // 用户
      usedFrieds(){
        if(!this.userId){
          this.$toast('请输入好友ID！');
          return;
        }
        var pattern = /^[0-9]*$/;
        if (!pattern.test(this.userId)) {
          this.$toast('好友ID错误！');
          return;
        }

        let parameterData = {
          token: this.token,
          imei: this.imei,
          accountId:this.userId
        }
        this.$get('/api/userInfo/isUser', parameterData).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            if (res.data.res==1){
              this.listData = res.data;
              this.noId =false;
              this.isShow = false;
              this.isAmend = true;
              this.diagFriends = false;
            }else if (res.data.res==2){
              this.noId =true
            }
          }
        })
      },
      // 卡号
      usedCard(){
        if(!this.cardNumber){
          this.$toast('请输入卡号！');
          return;
        }
        let parameterData = {
          token: this.token,
          imei: this.imei,
          cardNumber:this.cardNumber
        }
        this.$get('/api/goleEggOrder/isCard', parameterData).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            this.pigCoin = res.data.pigCoin;
            if (res.data.res == 1){
              this.Srusult = 1;
              //  this.diaCard = false;
            }else if (res.data.res == 2){
              this.Srusult = 2;
            }
          }
        })
      },
      // 确认使用
      userEgg(){
        if(!this.cardNum){
          this.$toast('请输入卡号！');
          return;
        }
        var reg = new RegExp(/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/);
        if(!reg.test(this.cardNum)){
          this.$toast('请输入正确卡号或卡密！');
          return;
        }
        if(!this.cardPassword){
          this.$toast('请输入卡密！');
          return;
        }

        let parameterData = {
          token: this.token,
          imei: this.imei,
          accountId:this.listData.accountId,
          cardNumber:this.cardNum,
          cardPassword:this.cardPassword
        }
        this.$get('/api/goleEggOrder/activationCard', parameterData).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            if (res.data==1){
              this.diaBg = true;
              this.diaSucc = true;
              this.diaErr = false;
            }else if (res.data==2){
              this.diaBg = true;
              this.diaErr = true;
              this.diaSucc = false;
            }
          }
        })
      },
      close1() {
        this.diagFriends = false
      },
      stop(){
          event.stopPropagation();
      },
      closeSelf(){
        this.diaBg = false;
      },
      getInfo(){
        let parameterData = {
          token: this.token,
          imei: this.imei,
        }
        this.$get('/api/userInfo/zjdUser', parameterData).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            this.listData.mobile = res.data.mobile;
            this.listData.accountId = res.data.accountId;
            this.myID = res.data.accountId;
          }
        })
      },
      // 修改卡密
      amendPassword(){
        if(!this.cardNum){
          this.$toast('请输入卡号！');
          return;
        }
        var reg = new RegExp(/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/);
        if(!reg.test(this.cardNum)){
          this.$toast('请输入正确卡号或卡密！');
          return;
        }
        if(!this.cardPassword){
          this.$toast('请输入卡密！');
          return;
        }
        let parameterData = {
          token: this.token,
          imei: this.imei,
          accountId:this.listData.accountId,
          cardNumber:this.cardNum,
          cardPassword:this.cardPassword
        }
        this.$get('/api/goleEggOrder/modifyPassword', parameterData).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            if(res.data.statusCode == 2000 || res.data.statusCode == '2000'){
              this.isShowBox = true;
            }else{
              // 30027 激活卡已使用
              // 3020用户不存在
              this.$toast(res.data.message);
            }
          }else{
          }
        })
      },
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
  }
</script>

<style scoped>
  .bgcolor{
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B , #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B , #FF1370); /* 标准语法ie9标准的语法 */
  }

  p{
    margin: 0;
    padding: 0;
  }
  .ge_head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.2rem;
    background-color: #fff;
    padding: 0 0.8rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .ge_head img{
    width: 0.5rem;
    height: 0.8rem;
  }
  .ge_head p:nth-of-type(1){
    font-size: 0.85rem;
    color: #484A65;
    margin-left: 1rem;
  }
  .ge_head p:nth-of-type(2){
    font-size: 0.7rem;
    color: #484A65;
  }

  .change-wrap{
    width: 100%;
    height: auto;
    position: relative;
    top: 2.2rem;
  }

 .change-wrap .my-id{
    width: 100%;
   height:1.6rem;
   line-height: 1.6rem;
  }

  .change-wrap .my-id span{
    margin-left: 0.8rem;
    font-size:0.6rem;
    font-weight:400;
    color:rgba(158,169,188,1);
  }
  .change-wrap .chang-center {
    width: 100%;
    height: auto;
    background: rgba(255,255,255,1);
    padding: 0 0.8rem 1.2rem 0.8rem;
    box-sizing: border-box;
  }

  .change-wrap .chang-center .used-type{
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-self: center;
    margin-bottom: 1.1rem;
  }

  .change-wrap .chang-center .used-type .types1{
    padding-top: 0.3rem;
    box-sizing: border-box;
  }
  .change-wrap .chang-center .used-type .types1 span:nth-child(1){
    font-size:0.6rem;
    font-weight:400;
    color:rgba(158,169,188,1);

  }

  .change-wrap .chang-center .used-type .types1 span:nth-child(2){
    font-size:0.5rem;
    font-weight:400;
    color:rgba(72,74,101,1);
  }
  .change-wrap .chang-center .used-type .types2{
    width:3.6rem;
    height:1.1rem;
    border-radius:0.55rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    font-size:0.55rem;
    text-align: center;
    line-height: 1.1rem;
    margin-top: 0.45rem;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B , #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B , #FF1370); /* 标准语法ie9标准的语法 */
  }

  .change-wrap .chang-center .carNum{
    width: 100%;
    height: auto;
  }

  .change-wrap .chang-center .carNum .list{
    width: 100%;
    height: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-content: center;
  }

  .change-wrap .chang-center .carNum .list .list-titles{
    width: 3.1rem;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size:0.7rem;
    font-weight:400;
    color:rgba(158,169,188,1);
  }

  .change-wrap .chang-center .carNum .list:nth-child(1){
    margin-bottom: 0.6rem;
  }

  .change-wrap .chang-center .carNum .list .list-inputs{
    width: 13.15rem;
    height: 1.6rem;
    border-radius:0.1rem;
    border:1px solid rgba(238,238,238,1);
    background:rgba(243,245,248,1);
  }

  .change-wrap .chang-center .carNum .list .list-inputs input{
    width: 12.9rem;
    height: 1.5rem;
    outline: none;
    font-size: 0.6rem;
    color:rgba(158,169,188,1);
    padding-left: 0.25rem;
    outline: none;
    border: none;
    box-shadow: none;
    background:rgba(243,245,248,1);

  }

.change-wrap .chang-center .carNum .list .list-inputs input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
   font-size: 0.6rem;
    color:rgba(158,169,188,1);
}
.change-wrap .chang-center .carNum .list .list-inputs input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  font-size: 0.6rem;
    color:rgba(158,169,188,1);
}
.change-wrap .chang-center .carNum .list .list-inputs input::-moz-placeholder { /* Mozilla Firefox 19+ */
   font-size: 0.6rem;
    color:rgba(158,169,188,1);
}
.change-wrap .chang-center .carNum .list .list-inputs input::-ms-input-placeholder { /* Internet Explorer 10-11 */
  font-size: 0.6rem;
    color:rgba(158,169,188,1);
}


  .change-wrap .chang-center .sear{
    padding: 0.6rem 0 1.7rem 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
   font-size:0.6rem;
    font-weight:400;
    color:rgba(158,169,188,1);
    /* cursor: pointer; */
  }
  .gec_btn{
    display: flex;
    justify-content: space-between;
  }
  .gec_btn p:nth-of-type(1){
    width:8rem;
    height:2.2rem;
    font-size:0.7rem;
    font-weight:400;
    border-radius: 0.2rem;
    line-height: 2.2rem;
    text-align: center;
    background-color: #FFA52E;
    color: #fff;
  }
  .gec_btn p:nth-of-type(2){
    width:8rem;
    height:2.2rem;
    font-size:0.7rem;
    font-weight:400;
    border-radius: 0.2rem;
    line-height: 2.2rem;
    text-align: center;
    color: #fff;
    /*margin-bottom: 1.2rem;*/
    color:rgba(255,255,255,1);
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B , #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B , #FF1370); /* 标准语法ie9标准的语法 */
  }

  .change-wrap  .change-tip{
    /*width: 100%;*/
    box-sizing: border-box;
    margin: 0.8rem;
    color: #9EA9BC;
  }

  .change-tip-title{
    font-size:0.65rem;
    font-weight:400;
    color:rgba(158,169,188,1);
    margin-bottom: 0.4rem;
  }

  .change-tip-item {
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-self: center;
    font-size: 0.6rem;
    margin-bottom: 0.4rem;
    line-height: 0.85rem;
  }
  .change-tip-item span:nth-child(1){
    margin-right: 0.1rem;
  }

  .diag{
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    background:rgba(41,41,41,0.54);
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-content: center;*/
    /*align-self: center;*/
  }

  .diag .box1{
    width: 13.6rem;
    height: 11.85rem;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -5.925rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .diag .box2{
    width: 10.6rem;
    height: 9.45rem;
    position: relative;
    margin: 0 auto;
    margin: 0 auto;
    top: 50%;
    margin-top: -4.725rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border-radius: 0.4rem;


    box-sizing: border-box;
  }
  .diag .box2 .imgs{
    display: flex;
    justify-content: center;
    align-content: center;
    align-self: center;
  }

  .diag .box2 .imgs img{
    width: 2.2rem;
    height: 2.2rem;
    padding-top: 2.4rem;
   padding-bottom: 0.4rem;
    margin: 0 auto;
  }

  .diag .box2 .t1{
    font-size:0.8rem;
    font-weight:400;
    color:rgba(60,62,91,1);
    padding-bottom: 0.1rem;
    text-align: center;
  }

  .diag .box2 .t2{
    font-size:0.6rem;
    font-weight:400;
    color:rgba(158,169,188,1);
    text-align: center;
  }

  .diag .box1.card{
    width: 13.6rem;
    height: 14.15rem;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -7.075rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .diag .box1 .b-wrap {
    padding: 0.8rem 0.8rem 1.2rem 0.8rem;
    /*width: 100%;*/
    height: 9.65rem;
    background:rgba(255,255,255,1);
    border-radius:0.4rem;
    box-sizing: border-box;
  }

  .diag .box1.card .b-wrap {
    height: 11.95rem;
  }

  .diag .box1 .b-wrap .titles{
    font-size:0.7rem;
    font-weight:400;
    padding-bottom: 0.6rem;
    /*padding: 0.8rem 0 0.6rem 0;*/
    color:rgba(72,74,101,1);
    text-align: center;
  }

  .diag .box1 .b-wrap.card .titles{
    padding-bottom: 0.5rem;
  }

  .diag .box1 .b-wrap .input-div{
    /* width: 100%; */
    height: 2rem;
    background:rgba(242,245,248,1);
    font-size:0.65rem;
    padding-left: 0.6rem;
    font-weight:400;
    color:rgba(158,169,188,1);
    margin-bottom: 0.2rem;
    border-radius: 0.2rem;
  }

  .diag .box1.card  .b-wrap .input-div{
    margin-bottom: 0.6rem;
  }

  .diag .box1.card .card-tip{
    font-size:0.65rem;
    font-weight:400;
    color:rgba(158,169,188,1);
    margin-bottom: 0.2rem;
  }

  .diag .box1 .b-wrap .input-div input{
    width: 95%;
    height: 1.7rem;
    outline: none;
    box-shadow: none;
    border: none;
    color:rgba(158,169,188,1);
    background:rgba(242,245,248,1);
     font-size:0.65rem;
  }


.diag .box1 .b-wrap .input-div input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
     font-size:0.65rem;
    /* padding-left: 0.6rem; */
    font-weight:400;
    color:rgba(158,169,188,1);
}
.diag .box1 .b-wrap .input-div input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    font-size:0.65rem;
    /* padding-left: 0.6rem; */
    font-weight:400;
    color:rgba(158,169,188,1);
}
.diag .box1 .b-wrap .input-div input::-moz-placeholder { /* Mozilla Firefox 19+ */
    font-size:0.65rem;
    /* padding-left: 0.6rem; */
    font-weight:400;
    color:rgba(158,169,188,1);
}
.diag .box1 .b-wrap .input-div input::-ms-input-placeholder { /* Internet Explorer 10-11 */
    font-size:0.65rem;
    /* padding-left: 0.6rem; */
    font-weight:400;
    color:rgba(158,169,188,1);
}


  .diag .box1 .b-wrap .error-tip{
    height: 0.85rem;
    font-size:0.6rem;
    font-weight:400;
    color:rgba(255,56,53,1);
    margin-bottom: 0.8rem;
  }

  .diag .box1 .b-wrap .box1-btn{
     height: 2.2rem;
    width: 100%;
    font-size:0.7rem;
    line-height: 2.2rem;
    text-align: center;
    font-weight:400;
    color:rgba(255,255,255,1);
    border-radius:1.1rem;
    margin-top: 1rem;
  }

  .diag .box1 .b-wrap .result-tip{
    font-size:0.65rem;
    font-weight:400;
    color:rgba(158,169,188,1);
    margin-bottom: 0.2rem;
  }

  .diag .box1 .b-wrap .result-tip-succ{
    font-size:0.65rem;
    font-weight:400;
    color:rgba(23,191,123,1);
    margin-bottom: 0.8rem;
    height: 0.9rem;
  }

  .diag .box1 .b-wrap .result-tip-error{
    font-size:0.65rem;
    font-weight:400;
    color:rgba(255,74,72,1);
    margin-bottom: 0.8rem;
    height: 0.9rem;
  }

  .b-close{
    display: flex;
    justify-content: center;
    align-content: center;
    align-self: center;
  }

  .b-close img{
    width: 1.6rem;
    height: 1.6rem;
    display: block;
    margin-top: 0.6rem;
  }
  .gec_box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 101;
  }
  .gec_box_inner{
    position: fixed;
    width: 10.6rem;
    height: 10.85rem;
    top: 5.75rem;
    left: 3.7rem;
    border-radius: 0.4rem;
    text-align: center;
    background-color: #fff;
  }
  .gec_box_inner img{
    width: 2.2rem;
    margin-top: 2.4rem;
  }
  .gec_box_inner p:nth-of-type(1){
    font-size: 0.8rem;
    color: #3C3E5B;
    margin: 0.4rem 0 0 0;
  }
  .gec_box_inner p:nth-of-type(2){
    font-size: 0.6rem;
    color: #9EA9BC;
    margin-top: 0.1rem;
  }
  .gec_box_inner span{
    font-size: 0.6rem;
    color: #FF1F5F;
  }
  .gec_box_inner div{
    width: 7.5rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.7rem;
    color: #fff;
    margin: 0.8rem auto 0 auto;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B , #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B , #FF1370); /* 标准语法ie9标准的语法 */
    border-radius: 1rem;
  }



</style>

