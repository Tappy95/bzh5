<template>
  <div id="app" style="background:rgba(3,167,255,1);overflow:auto;height:100vh;position: relative">
    <!-- 返回 -->
    <!--<div class="ml_back">-->
      <!--<img src="../../assets/bzwkBack.png" @click="backTap"/>-->
      <!--<p>新人赚钱攻略</p>-->
    <!--</div>-->
    <div class="bg_img"></div>
    <div class="wrap">
      <div class="center">
      <div class="top_box">
        <div class="tip_img">
           <img src="../../assets/strategy/tip_img.png"/>
        </div>
        <div class="dec">
          <p>希望你能先定一个能达到的小目标,比如挣它2个亿，一亿金币；一亿金猪！</p>
          <p>毕竟在这里，你所有的行为都能产生金钱的价值！</p>
        </div>
        <div class="sign_box">
          <span>一元即可提现</span>
        </div>
      </div>
      <div class="money_tip"></div>
        <div class="tab_box">
          <div class="tav_nav">
            <div @click="navTap(item.id)" v-for="item in navList" class="item" :class="navId==item.id?'active':''">
              <span>{{item.text}}</span>
              <div class="line"></div>
            </div>
          </div>

          <transition name="fadebox">
            <div class="box_1"  v-if="navId==1">
            <div class="tab_img">
              <img class="tab_1_tip" src="../../assets/strategy/tab_1_tip.png"/>
            </div>

            <div class="tab_text txt-suo">
              嫌麻烦？但想快速把钱赚到手？那赶紧去【快速赚】做任务吧？每个人任务0.4-1.6元不等；小编亲测，做完至少
              <span>立赚27.93元</span>
              ！！！每天起床每个任务花个三分钟！ 所有做的任务都在<span>【正在进行】</span>中哦！
            </div>
            <div class="tab_1">
              <div class="tab_1_wrap">
                <img class="tip" src="../../assets/strategy/pointer.png"/>
                <div>进入<span>【快速赚】</span>列表，进入详情领取任务！</div>
              </div>
              <!--<div class="tab_1_img1"></div>-->
              <div class="tab_1_img2"></div>

            </div>
            <div  @click="fastTap" class="tab_1_btn" style="margin-bottom: 0.6rem">
              前往快速赚
            </div>
          </div>
          </transition>

          <transition name="fadebox">
             <div class="box_2" v-if="navId==2" >
            <div class="tab_img">
              <img class="tab_2_tip" src="../../assets/strategy/tab_2_tip.png"/>
            </div>
            <div class="disflex kuang" >
              <div class="text_si" style="padding-top: 0.4rem">
                  <div class="sign_index"><p>1</p></div>
                  <div class="sign_text">
                    在<span>【首页】</span>的<span>【赚钱专区】</span>中，你可以参与答题赚中，通过系统匹配<span>【答题对战】</span>、
                    邀请好友进行<span>【好友对战】</span>、也可以<span>【出题】</span>来赢取金币！用 你的智慧每次至少能斩获<span>500金币</span>！
                  </div>
              </div>
              <div class="img_x">
                <img class="tab2_img2" style="" src="../../assets/strategy/tab2_img2.png"/>
              </div>

              <div class="text_si">
                <div class="sign_index"><p>2</p></div>
                <div class="sign_text">
                  另有免费抽奖，新手福利中抽奖就送<span>2000金币</span>哦<span>【简单赚】</span>
                  短短3分钟至少能获得<span>2500金币+2万5金猪</span>！还有更多加成奖励等你拿！
                </div>
              </div>

              <div class="text_si">
                <div class="sign_index"><p>3</p></div>
                <div class="sign_text">
                  进入资讯内容页，选择您喜欢的资讯阅读和分享；
                </div>
              </div>

              <div class="img_x">
                <img class="tab2_img4" style="" src="../../assets/strategy/tab2_img4.png"/>
              </div>

              <div class="img_x">
                <img class="tab2_img3" style="" src="../../assets/strategy/tab2_img3.png"/>
              </div>

              <div class="text_si">
                <div class="sign_index"><p>4</p></div>
                <div class="sign_text">
                  浏览一片文章至少获得<span>100金币</span>，分享一篇资讯<span>200金币</span>，浏览一篇资讯列表广告至少获
                  <span>500金币</span>！
                  <span class="tips">（部分用户手机型号可能存在导致分享拿不到奖励的问题正在修复中）</span>
                </div>
              </div>

              <div class="text_si">
                <div class="sign_index"><p>5</p></div>
                <div class="sign_text">
                  在资讯顶部可以查看您当天资讯相关赚取的金币数额哦！
                </div>
              </div>

              <div class="img_x" >
                <img class="tab2_img5" style="margin-bottom: 0.8rem" src="../../assets/strategy/tab2_img5.png"/>
              </div>
            </div>
          </div>
          </transition>

          <transition name="fadebox">
          <div class="box_3" v-if="navId==3">
            <div class="tab_img">
              <img class="tab_3_tip" src="../../assets/strategy/tab_3_tip.png"/>
            </div>

            <div class="box_3_center">
             <div class="box_3_dec">
               进入签到赚，点击红包仅进行签到，查看签到规则，进行每日签到，完成任务后，即可领取红包奖励！
             </div>
              <div class="img_x">
                <img class="tab3_img1" style="" src="../../assets/strategy/tab3_img1.png"/>
              </div>
              <div class="box_3_dec">
                觉得赚的不够？那就去做 <span>更多游戏任务</span>
                吧！月入上万不遥远！大家都很努力！购买试玩加成，奖励加成更高！
              </div>

              <div class="img_x">
                <img class="tab3_img2" style="" src="../../assets/strategy/tab3_img2.png"/>
              </div>

              <div class="box_3_dec" style="margin-top: 0.8rem">
                如下图，进入游戏详情，查看奖励，点击下载进行任务！每完成一步任务将获得对应奖励！
                <span>奖励统一以金币的形式发放（可提现）</span>
              </div>

              <div class="img_x">
                <img class="tab3_img3" style="" src="../../assets/strategy/tab3_img3_1.png"/>
              </div>

              <div class="img_x">
                <img class="tab3_img4" style="" src="../../assets/strategy/tab3_img4.png"/>
              </div>

              <div class="text_si" style="width: 100%;">
                <div class="sign_index"><p>4</p></div>
                <div class="sign_text">
                  下载后根据要求试玩游戏，
                 <span>完成试玩任务后回到【宝猪乐园】app，点击对应任务的领取键领取奖励！
                   （若不能领取，请点刷新按钮退出重新进入 ，若还不能请稍后再试或联系客服！）</span>
                </div>
              </div>

              <div @click="siginTap" class="tab_1_btn" style="margin-bottom: 0.6rem">
                前往签到赚
              </div>

            </div>
          </div>
          </transition>
          <transition name="fadebox">
          <div class="box_4" v-if="navId==4">
            <div class="tab_img">
              <img class="tab_4_tip" src="../../assets/strategy/tab_4_tip.png"/>
            </div>
            <div class="box4_text">
              <div class="title">
                <p>是不是想要一种不劳而获的赚钱效果？</p>
                <p class="p">我给您算一笔账！</p>
              </div>

              <div>
                  <div class="box_4_dix">
                    <div class="dix_index">1</div>
                      <div class="dix_dec">
                        邀请一位有效好友1元奖励，好友仅仅做平台游戏中最简单的那一个任务，算实际最低0.4元，自己获得20%提成，平台至少有200+游戏数量。
                      </div>
                    <div class="dengshi">1+0.4*200*20%=17元</div>
                  </div>
              </div>

              <div>
                <div class="box_4_dix">
                  <div class="dix_index">2</div>
                  <div class="dix_dec">
                    邀请人数多了，最低标准一个人购买VIP20元，一年偶尔续费一次玩游戏平均算5次：
                  </div>
                  <div class="dengshi">20*2%*5=2元</div>
                </div>
              </div>

              <div>
                <div class="box_4_dix" style="display:flex;height: 1rem">
                  <div class="dix_index">3</div>
                  <div class="dix_dec">
                    平均好友最低等级达到4级，赚<span>30元(30万金币)</span>;
                  </div>
                  <div class="dengshi" ></div>
                </div>
              </div>
              <div>

              <div class="box_4_dix" >
                <div class="dix_index">4</div>
                <div class="dix_dec">
                  此外，活跃用户加成券送不停，邀请多了，深度试玩好友将对自己产生的贡献呈指数增长！一个用户总体最低给自己贡献<span>50元！</span>
                </div>
                <div class="dengshi left">那么100个好友，100*50=5000元!</div>
              </div>
              </div>

            </div>
            <div class="box_4_show">
              <div class="list">
                <div class="pic">
                  <img class="tab_4_tip" src="../../assets/strategy/box_4_show_img1.png"/>
                </div>
                <div class="dec" @click="shareTap">
                   分享
                </div>
              </div>
              <div class="list">
                <div class="pic">
                  <img class="tab_4_tip" src="../../assets/strategy/box_4_show_img2.png"/>
                </div>
                <div class="dec"  @click="shareTap">
                  升级
                </div>
              </div>
            </div>

            <div class="box_4_detail">
              <div class="title"> 邀请详情入口</div>
              <div class="img_detail_1"></div>
              <div class="img_detail_2"></div>
            </div>
          </div>
          </transition>
          <transition name="fadebox">
          <div class="box_5" v-if="navId==5">
            <div class="tab_img">
              <img class="tab_5_tip" src="../../assets/strategy/tab_tip_5.png"/>
            </div>

            <div class="tab_text">
              金猪能干什么？只要您有足够的金猪，就能抽大奖！抽话费！还在等什么？别人能行，你为什么不能？
            </div>

            <div class="tab_1" style="margin-bottom: 0.4rem">
              <div class="tab_1_wrap">
              <img class="tip" src="../../assets/strategy/pointer.png"/>
                <div> 进入<span>【金猪乐园】</span>，进入<span>【积分抽奖】</span>、<span>【积分商城】</span></div>
              </div>

              <div class="tab_5_img1"></div>
              <div class="tab_5_img2"></div>
              <div class="tab_5_img3"></div>
              <div class="tab_5_img4"></div>



            </div>
          </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        navId:1,
        navList:[
          {id:1,text:'快速赚'},
          {id:2,text:'福利赚'},
          {id:3,text:'签到赚'},
          {id:4,text:'邀请赚'},
          {id:5,text:'金猪赚'}
        ],
      }
    },
    methods:{
      backTap(){
        window.history.go(-1)
      },
      navTap(id){
        this.navId =id;
      },
      //快速赚
      fastTap(){
       if (APP.isAndroid) {
         window.android.fast();
       }
        if (APP.isIPhone) {
       }
        // if (this.Utils.isIPhone) {
        // }
      },
      //签到赚
      siginTap(){
        if (APP.isAndroid) {
          window.android.sigin();
        }
        if (APP.isIPhone) {
          // console.log("isIPhone")
        }
      },
      //邀请赚（升级 分享）
      shareTap(){
        if (APP.isAndroid) {
          window.android.share();
        }
        if (APP.isIPhone) {
          // console.log("isIPhone")
        }
      },
      // isAndroid() {
      //     let u = navigator.userAgent,
      //         app = navigator.appVersion;
      //     let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      //     let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      //     return isAndroid == true ? true : false;
      // },
      // isIos() {
      //     let u = navigator.userAgent,
      //         app = navigator.appVersion;
      //     let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      //     let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      //     return isiOS == true ? true : false;
      // },

    }
  }
</script>

<style scoped>
  .fadebox-enter-active,
  .fadebox-leave-active {
    transition: all 0.3s linear;
    transform: translate3D(0, 0, 0);
  }

  .fadebox-enter,
  .fadebox-leave-active {
    transform: translate3D(100%, 0, 0);
  }

  .txt-suo{
    text-indent: 0.8rem;
  }
  p{
    margin: 0;
  }
  .ml_back{
    background:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 2.2rem;
    color: #fff;
    font-size: 0.8rem;
    z-index: 9999;
  }
  .ml_back img{
    width: 0.5rem;
    margin-left: 0.75rem;
    height: 0.8rem;
  }
  .ml_back p{
    margin-left: 5.5rem;
    font-size: 0.9rem;
    color: #000;
  }

  .ml_head_left img{
    width: 2.2rem;
    height: 2.2rem;
    margin: 0.8rem 0.4rem 0.8rem 0.8rem;
  }
  .ml_head_font p:nth-of-type(1){
    font-size: 0.7rem;
    color:rgba(0,0,0,1);
    margin-bottom: 0.2rem;
  }


  .bg_img{
    position: absolute;
    top: 0;
    left: 0;
    /*margin-top: 2.2rem;*/
    width: 100%;
    height: 44.35rem;
    background: url("../../assets/strategy/strategy_bg.png") no-repeat;
    background-size:cover;
  }
  .wrap{
    width: auto;
    height: auto;
    position: relative;
    /*margin-top: 2.2rem;*/
  }
    /*position: relative;*/
    /*margin-top: 2.2rem;*/
    /*width: 100%;*/
    /*height: 44.35rem;*/
    /*background: url("../../assets/strategy/strategy_bg.png") no-repeat;*/
    /*background-size:cover;*/


  .wrap .center{
    margin: 0 auto;
    position: relative;
    top: 4.9rem;

  }

  .top_box{
    width: 16.4rem;
    height: 5.5rem;
    position: relative;
    margin: 0 auto;
    background:rgba(255,255,255,1);
    border-radius:0.4rem;
  }
  .top_box .tip_img{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .top_box .tip_img img{
    width: 7rem;
    height: 0.85rem;
    margin-top: 0.8rem;
  }

  .top_box .dec{
    padding: 0.35rem 0.95rem 0.8rem 0.95rem;
  }

  .top_box .dec p{
    font-size:0.65rem;
    font-weight:400;
    color:rgba(60,62,91,1);
  }

  .top_box .sign_box{
    width: 4.55rem;
    height: 1.7rem;
    position: absolute;
    right: -0.8rem;
    bottom: -0.9rem;
    background: url("../../assets/strategy/sign_box_bg.png") no-repeat;
    background-size:cover;
    text-align: center;
    line-height: 1.6rem;
  }

  .top_box .sign_box span{
    font-size:0.6rem;
    font-weight:500;
    color:rgba(255,47,47,1);
  }

  .money_tip{
    width: 10.5rem;
    height: 0.9rem;
    position: relative;
    margin: 1.35rem auto auto auto;
    background: url("../../assets/strategy/forMoney.png") no-repeat;
    background-size: cover;
  }

  .tab_box{
    position: relative;
    margin:0.5rem auto 0.8rem auto;
    width: 16.4rem;
    height: auto;
    background:rgba(255,255,255,1);
    border-radius:0.4rem;
    padding-bottom: 0.2rem;
  }

  .tab_box .tav_nav{
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    padding: 0.75rem 0.6rem 0.6rem 0.6rem;
  }

  .tab_box .tav_nav .item{
    position: relative;
  }

  .tab_box .tav_nav .item span{
    font-size:0.65rem;
    font-weight:400;
    color:rgba(158,169,188,1);
    /*transition: all .35s;*/
  }

  .tab_box .tav_nav .item .line{
    width:1.1rem;
    height:0.2rem;
    background:rgba(64,131,245,1);
    border-radius:0.15rem;
    margin-top: 0.2rem;
     margin: 0 auto;
    transition: all .5s;
    opacity: 0;
  }

  .tab_box .tav_nav .item.active span{
    font-size:0.75rem;
    color:rgba(60,62,91,1)
  }

  .tab_box .tav_nav .item.active .line{
    opacity: 1;
  }

  .tab_box .tab_img{
     width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    margin-bottom: 0.65rem;
  }

  .tab_box .tab_img img.tab_1_tip{
    width: 9.4rem;
    height: 0.85rem;
  }


  .tab_box .tab_img img.tab_2_tip{
    width: 13.75rem;
    height: 0.95rem;
  }


  .tab_box .tab_text{
    font-weight:400;
    color:rgba(60,62,91,1);
    font-size: 0.6rem;
    padding: 0 0.65rem 0.15rem 0.8rem;
    line-height: 1rem;
  }
  .tab_box .tab_text span{
    color: #FF302F;
    line-height: 1rem;
  }

  .tab_1{
    width:14.8rem;
    /*height:18.4rem;*/
    background:rgba(239,245,251,1);
    border-radius:0.3rem;
    margin: 0 auto;
    padding-bottom: 0.4rem;
  }

  .box_1{
    /*padding-bottom: 0.4rem;*/
  }
  .tab_1 .tab_1_wrap{
    padding: 0.4rem;
    font-size:0.6rem;
    font-weight:400;
    color:rgba(60,62,91,1);
    line-height:1rem;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    /*margin-bottom: 0.9rem;*/
  }

  .tab_1 .tab_1_wrap span
  {
    color: #FF2F2F;
  }

  .tab_1 .tab_1_wrap img.tip{
    width: 0.5rem;
    height: 0.5rem;
    margin-top: 0.25rem;
    margin-right: 0.3rem;
  }


  .tab_1  .tab_1_img1{
    width: 14rem;
    height: 3.7rem;
    background: url("../../assets/strategy/tab_1_img2.png") no-repeat;
    background-size: cover;
    margin: auto auto 0.4rem auto;
  }

  .tab_1  .tab_1_img2{
    width: 14rem;
    height:16.2rem;
    background: url("../../assets/strategy/tab_1_img1.png") no-repeat;
    background-size: cover;
    margin: auto auto 0.4rem auto;
  }


  .tab_1_btn{
     width: 14rem;
    height: 2.2rem;
    background: url("../../assets/strategy/tab_1_btn.png") no-repeat;
    background-size: cover;
    font-size:0.8rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0.6rem auto auto auto;
    text-align: center;
    line-height: 2.2rem;
  }

  .kuang{
    width: 14.8rem;
    /*height: 37.4rem;*/
    background: rgba(239,245,251,1);
    border-radius: 0.3rem;
    margin: auto auto 0.8rem auto;
    /*padding-bottom: 0.8rem;*/
  }

  .disflex{
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-content: space-between;*/
    /*padding: 0.4rem;*/

  }

  .sign_index{
   width: 0.6rem;
    height: 0.6rem;
    background:rgba(64,131,245,1);
    text-align: center;
    color: #fff;
    font-size: 0.5rem;
    margin-right: 0.2rem;
    float: left;
    line-height: 0.6rem;
  }
  .sign_index p{
    line-height: 0.7rem;
  }

  .sign_text{
    width: 13.5rem;
    font-size:0.6rem;
    font-weight:400;
    color:rgba(60,62,91,1);
    line-height:1rem;
    float: left;
    margin-top: -0.2rem;
  }

  .text_si{
    width: 14rem;
    height: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    /*margin-bottom: 0.4rem;*/
    margin: 0 auto;
    padding-bottom: 0.4rem;
  }

  .sign_text span{
    color: #FD3031;
  }

  .img_x{
    /*width: 14rem;*/
    width: auto;
    height: auto;
    margin-bottom: 0.4rem;
    display: flex;
    justify-content: center;
    align-content: center;
  }
 .img_x .tab2_img2{
    width: 14rem;
    height: 7.75rem;
    margin: 0 auto;
   display: block;
  }

  .img_x .tab2_img3
  {
    display: block;
    /*width: 100%;*/
    /*width: 280px;*/
    /*height: 108px;*/
    width: 14rem;
    height: 5.4rem;
    margin: 0 auto;
  }

  .img_x .tab2_img4
  {
    display: block;
    width: 14rem;
   height: 3.05rem;
    margin: 0 auto;
  }

  .img_x .tab2_img5
  {
    display: block;
    width: 14rem;
    height: 3.1rem;
    margin: 0 auto;
  }


  .sign_text span.tips{
    font-size: 0.5rem;
    font-weight:400;
    /*color:rgba(60,62,91,1);*/
    color: #A2ABBB;
  }

  .tab_3_tip{
    width: 13.9rem;
    height: 0.95rem;
    margin: 0 auto;
  }

  .box_3{
    width: 14.8rem;
    margin: 0 auto;
    padding-bottom: 0.4rem;
  }

  .box_3_center{
    width:14.8rem;
    margin: 0 auto;
    /*padding: 0.4rem;*/
    background:rgba(239,245,251,1);
    border-radius:0.3rem;
    padding-bottom: 0.2rem;
  }
  .box_3_dec{
    font-size:0.6rem;
    font-weight:400;
    color:rgba(60,62,91,1);
    line-height:1rem;
    margin-bottom: 0.4rem;
    padding: 0.4rem;
  }

  .box_3_dec span{
    color: #FF2F2F;
  }



  .img_x .tab3_img1{
     width: 14rem;
    height: 9.55rem;
    display: block;
  }

  .img_x .tab3_img2{
    width: 14rem;
    height: 21.1rem;
    display: block;
  }

  .img_x .tab3_img3{
    width: 14rem;
    height: 12.1rem;
    display: block;
  }

  .img_x .tab3_img4{
    width: 6.8rem;
    height: 13.3rem;
    display: block;
  }

  .tab_4_tip{
    width: 9.9rem;
    height: 0.95rem;
  }

  .box4_text{
    width: 14.8rem;
    /*height: 17.4rem;*/
    background:rgba(239,245,251,1);
    border-radius:0.3rem;
    margin: 0 auto;
    /*padding: 0.4rem;*/
  }


  .box_4{
    padding-bottom: 0.4rem;
  }
  .box4_text .title{
    padding: 0.4rem;
    font-size:0.6rem;
    font-weight:400;
    color:rgba(60,62,91,1);
    line-height:1rem;
  }

  .box4_text .title .p{
    margin-top: 0.4rem;
  }

  .box_4_dix{
    /*display: flex;*/
    /*justify-content:space-between;*/
    /*align-content: space-between;*/
    /*align-content: center;*/
    padding: 0.4rem 0.4rem 0 0.4rem;
    position: relative;
  }

  .box_4_dix .dix_index{
    position:absolute;
    width:0.7rem;
    height:0.7rem;
    background:rgba(64,131,245,1);
    border-radius:50%;
    color: #fff;
    line-height: 0.7rem;
    font-size: 0.55rem;
    text-align: center;
    float: left;
  }

  .box_4_dix .dix_dec{
    font-size:0.6rem;
    font-weight:400;
    color:rgba(60,62,91,1);
    line-height:1rem;
    float: right;
    padding-left: 1rem;
    margin-bottom: 0.4rem;
    margin-top: -0.1rem;
  }

  .box_4_dix .dix_dec span{
    color: #ff4d51;
  }

  .dengshi{
    font-size:0.6rem;
    font-weight:400;
    color:rgba(254,48,49,1);
    line-height:1rem;
    text-align: center;
    /*padding: 0 0.4rem;*/
  }

  .dengshi.left{
    padding-left: 1rem;
    padding-bottom: 0.8rem;
  }

  .box_4_show {
    width: 14.8rem;
    margin: 0 auto;
    height: auto;
    margin-top: 1rem;
    margin-bottom: 0.8rem;
  }

  .box_4_show .list{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
  }

  .box_4_show .list:nth-child(1) .pic{
    width: 10.8rem;
    height: 1.7rem;
  }

  .box_4_show .list:nth-child(1) .pic img{
    width: 10.8rem;
    height: 1.7rem;
    display: block;
  }


  .box_4_show .list:nth-child(2) .pic{
    width: 6.65rem;
    height: 1.7rem;
  }

  .box_4_show .list:nth-child(2) .pic img{
    width: 6.65rem;
    height: 1.7rem;
    display: block;
  }

  .box_4_show .list:nth-child(1) .dec{
    width: 3.2rem;
    height: 1.4rem;
    background: url("../../assets/strategy/box_4_show_bg1.png") no-repeat;
    background-size: cover;
    font-size:0.65rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:1.4rem;
    text-align: center;
  }

  .box_4_show .list:nth-child(2) .dec{
    width: 3.2rem;
    height: 1.4rem;
    background: url("../../assets/strategy/box_4_show_bg2.png") no-repeat;
    background-size: cover;
    font-size:0.65rem;
    font-weight:400;
    color:rgba(60,62,91,1);
    line-height:1.4rem;
    text-align: center;
  }

  .box_4_show .list:nth-child(1){
    margin-bottom: 1.2rem;
  }

  .box_4_detail{
    width:14.8rem;
    height:26.75rem;
    background:rgba(239,245,251,1);
    border-radius:0.3rem;
    margin: 0 auto;
  }

  .box_4_detail .title{
    font-size:0.6rem;
    font-weight:500;
    color:rgba(60,62,91,1);
    line-height:1rem;
    padding: 0.4rem 0 0.4rem 0.6rem;

  }

  .box_4_detail .img_detail_1{
    width: 14rem;
    height: 7.75rem;
    background: url("../../assets/strategy/box_4_detail_img1.png") no-repeat;
    background-size: cover;
    margin: auto auto 0.4rem auto;

  }

  .box_4_detail .img_detail_2{
    width: 14rem;
    height: 16rem;
    background: url("../../assets/strategy/box_4_detail_img2.png") no-repeat;
    background-size: cover;
    margin: auto auto 0.4rem auto;

  }

  .tab_5_tip{
    width: 7.25rem;
    height: 0.9rem;
  }

  .tab_5_img1{
    width: 14rem;
    height: 3.65rem;
    background: url("../../assets/strategy/tab_5_img1.png") no-repeat;
    background-size: cover;
    margin: auto auto 0.45rem auto;
  }

  .tab_5_img2{
    width: 14rem;
    height: 3.95rem;
    background: url("../../assets/strategy/tab_5_img2.png") no-repeat;
    background-size: cover;
    margin: auto auto 0.4rem auto;
  }

  .tab_5_img3{
    width: 14rem;
    height: 19.4rem;
    background: url("../../assets/strategy/tab_5_img3.png") no-repeat;
    background-size: cover;
    margin: auto auto 0.4rem auto;
  }
  .tab_5_img4{
    width: 14rem;
    height: 9.95rem;
    background: url("../../assets/strategy/tab_5_img4.png") no-repeat;
    background-size: cover;
    margin:0 auto;
  }



</style>

