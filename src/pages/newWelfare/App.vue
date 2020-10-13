<template>
    <div id="app" style="background: #2F23B3;overflow: auto;">
        <!-- 背景图 -->
        <div class="nw_head">
          <img src="../../assets/newWelfareBg.png"/>
        </div>

        <!-- 返回 -->
        <div class="nw_left">
            <img src="../../assets/enlighteningRight.png" class="eml_img" @click="backTap"/>
            <p></p>
        </div>
        <!-- 当前任务 -->
        <div class="dqrw_content">
            <div class="dqrw_con_left"><img src="../../assets/jinxing.png" alt=""></div>
            <div class="dqrw_con_title"><img src="../../assets/dqrw.png" alt=""></div>
            <div class="dqrw_con_inner" v-for="(item,index) in presentList">
                <div class="dqrw_con_inn_top">
                    <div class="dqrw_con_inn_left">
                        <!-- <img src="../../assets/xsflone.png" alt=""> -->
                        <img :src="item.task_img" alt="">
                    </div>
                    <div class="dqrw_con_inn_center">
                        <div class="dqrw_conInner_top">
                            <p>{{item.task_name}}</p>
                            <img src="../../assets/jinzhu.png" alt="" v-if="item.icon_type == 2">
                            <img src="../../assets/jinbi.png" alt="" v-if="item.icon_type == 3">
                        </div>
                        <div class="dqrw_conInner">
                            <p>奖励</p>
                            <p>+{{item.reward}}</p>
                            <img src="../../assets/jinbi.png" alt="">
                            <p>{{item.reward/10000 | keepTwoNum}}元</p>
                        </div>
                    </div>
                    <div class="dqrw_con_inn_right">
                        <!-- 领取福利按钮 已完成未领取 -->
                        <img src="../../assets/xsflbtn.png" alt="" v-if="item.isComplete == 1" @click="getWelfare(item.id,item.reward)">
                        <!-- 开始任务按钮 未完成未领取 -->
                        <img src="../../assets/stbtn.png" alt=""  v-if="item.isComplete == 0" @click="getTask(item.id)">
                    </div>
                </div>

                <div class="dqrw_con_inn_bottom">{{item.remarks}}</div>
            </div>
        </div>
        <!-- 任务列表 -->
        <div class="rwlb_content">
            <div class="rwlb_con_title"><img src="../../assets/renwu.png" alt=""></div>
            <div class="rwlb_con_inner" v-for="(item,index) in taskList">
                <div class="rwlb_con_inn_top">
                    <div class="rwlb_con_inn_left">
                        <!-- <img src="../../assets/xsflone.png" alt=""> -->
                        <img :src="item.task_img" alt="">
                    </div>
                    <div class="rwlb_con_inn_center">
                        <div class="rwlb_conInner_top">
                            <p>{{item.task_name}}</p>
                            <img src="../../assets/jinzhu.png" alt="" v-if="item.icon_type == 2">
                            <img src="../../assets/jinbi.png" alt="" v-if="item.icon_type == 3">
                        </div>
                        <div class="rwlb_conInner">
                            <p>奖励</p>
                            <p>+{{item.reward}}</p>
                            <img src="../../assets/jinbi.png" alt="" v-if="item.reward_unit == 1">
                            <p>{{item.reward/10000 | keepTwoNum}}元</p>
                        </div>
                    </div>
                    <div class="rwlb_con_inn_right">
                        <img src="../../assets/startrw.png" alt="">
                    </div>
                </div>

                <div class="rwlb_con_inn_bottom">{{item.remarks}}</div>
            </div>
            <!-- 任务列表已做完 -->
            <div class="rwlb_al" v-if="taskList.length==0">
                <div>任务列表已做完</div>
                <div @click="open">更多赚钱任务</div>
            </div>
        </div>
        <!-- 已完成 -->
        <div class="ywc_content">
            <div class="ywc_con_title"><img src="../../assets/ywc.png" alt=""></div>
            <div class="ywc_con_inner" v-for="(item,index) in endList">
                <div class="ywc_con_inn_top">
                    <div class="ywc_con_inn_left">
                        <!-- <img src="../../assets/xsflone.png" alt=""> -->
                        <img :src="item.fulfil_task_img" alt="">
                    </div>
                    <div class="ywc_con_inn_center">
                        <div class="ywc_conInner_top">
                            <p>{{item.task_name}}</p>
                            <img src="../../assets/jinzhu.png" alt="" v-if="item.icon_type == 2">
                            <img src="../../assets/jinbi.png" alt="" v-if="item.icon_type == 3">
                        </div>
                        <div class="ywc_conInner">
                            <p>奖励</p>
                            <p>+{{item.reward}}</p>
                            <img src="../../assets/jinbi.png" alt="">
                            <p>{{item.reward/10000 | keepTwoNum}}元</p>
                        </div>
                    </div>
                    <div class="ywc_con_inn_right">
                        <p>已完成</p>
                        <!-- <img src="../../assets/xsflbtn.png" alt=""> -->
                    </div>
                </div>

                <div class="ywc_con_inn_bottom">{{item.remarks}}</div>
            </div>
        </div>
        <div style="height:1rem"></div>
        <div class="ywc_popup" v-show="isShow">
            <div class="ywc_popup_inner">
                <div style="position: relative">
                    <img src="../../assets/hongbao.png" alt="">
                    <p>获得<span>{{coin}}金币</span></p>
                    <img src="../../assets/haode.png" alt="" @click="close">
                </div>
            </div>
        </div>
        <!-- <img src="../../assets/rwcard.png" alt="">
        <img src="../../assets/rwdd.png" alt="">
        <img src="../../assets/rwzz.png" alt=""> -->
    </div>
</template>
<script>
// import $ from 'jquery'
// import { Toast } from 'mint-ui'

export default {
    data(){
        return{
            presentList:[],
            taskList:[],
            endList:[],
            isShow:false,
            coin:0,
            isType:false,//ios 安卓判断
            // isShowStart:true,
            // isShowGet:false
            // isShowStart:false,
            // isShowGet:true
            passbook:''
        }
    },
    created(){
        this.token =APP.GetLocationParams("token") ||  window.sessionStorage.getItem("token");
        this.imei =APP.GetLocationParams("imei") ||  window.sessionStorage.getItem("imei");
        this.getTaskList();
      if (this.isAndroid) {
       this.isType =true
      } else if (this.isIos) {
        this.isType =false
      }
    },
    filters: {
        keepTwoNum:function(value){
            value = Number(value);
            return value.toFixed(2);
        }
    },
    computed: {
        // presentList: function () {
        //     return this.items.slice(0, 10)
        // }
    },
    mounted() {
        $(function() {
            $(window).scroll(function() {
                var top = 0; //获取指定位置
                var scrollTop = $(window).scrollTop();  //获取当前滑动位置
                if(scrollTop > top){                 //滑动到该位置时执行代码
                    $(".nw_left").addClass("active");
                }else{
                    $(".nw_left").removeClass("active");
                }
            })
        })
    },
    methods:{
        // 获取列表
        getTaskList(){
            let parameterData = {
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/mTaskInfo/appNoviceListNew',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.passbook = res.data.passbook;
                    for(var i = 0;i<res.data.task.length;i++){
                        if(res.data.task[i].id==14 && res.data.task[i].isComplete==0 && this.passbook==0){
                            continue;
                        }
                        if(res.data.task[i].isComplete == 0){
                            // this.complete = res.data.task[0].isComplete;
                            // 进行中
                            if(this.presentList.length == 0){
                                this.presentList = this.presentList.concat(res.data.task[i]);
                                // this.isShowGet = false;
                                // this.isShowStart = true;
                            }else{
                                let sort = this.presentList[0].sort;
                                if(sort == res.data.task[i].sort){
                                     this.presentList = this.presentList.concat(res.data.task[i]);
                                }else{
                                    // 未开始
                                    this.taskList = this.taskList.concat(res.data.task[i]);
                                }
                            }
                        }else { // 已完成
                            if(res.data.task[i].isReceive == 2){
                                // 已领取
                                this.endList = this.endList.concat(res.data.task[i]);
                            }else{
                                // 未领取
                                this.presentList = this.presentList.concat(res.data.task[i]);
                                // this.isShowGet = true;
                                // this.isShowStart = false;
                            }
                        }
                    }
                }
            })
        },
        // 开始任务
        getTask(id){
            this.presentList = [];
            this.taskList = [];
            this.endList = [];
            if(id == 15){

              if (this.isType){
                window.android.toChange();
              } else {

              }


                // this.$router.push({
                //     path:'/twoeightDhjz',
                //     query:{
                //         token:this.token,
                //         imei:this.imei
                //     }
                // })
                this.getTaskList();
            }else if(id == 16){

              if (this.isType){
                window.android.toGame();
              } else {

              }



                // this.$router.push({
                //     path:'/tworightSelect',
                //     query:{
                //         token:this.token,
                //         imei:this.imei,
                //         lotteryId:1,
                //         lotteryTypeId:1,
                //         lotteryGroupId:1,
                //         lotteryPlayedTplId:1,
                //         lotteryGrabId:1,
                //         lotteryName:'PC蛋蛋'
                //     }
                // })
                this.getTaskList();
            }else if(id == 12){

              if (this.isType){
                window.android.toWelfare();
              } else {

              }



                let parameterData = {
                    token:this.token,
                    imei:this.imei
                }
                this.$get('/api/lUserTask/welfareTask',parameterData).then(res =>{
                    if((res.statusCode+"").startsWith("2")){

                    }else{
                        // Toast(res.message);
                    }
                })
                this.getTaskList();

                // this.isShowStart = false;
                // this.isShowGet = true;
                //调app方法
            }else if(id == 14){
              if (this.isType){
                window.android.toPlay();
              } else {

              }



                //调app方法
                this.getTaskList();
            }

        },
        //领取福利
        getWelfare(id,reward){
            this.isShow = true;
            this.presentList = [];
            this.taskList = [];
            this.endList = [];
            let parameterData = {
                token:this.token,
                imei:this.imei,
                id:id
            }
            this.$get('/api/lUserTask/userReceiveTask',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.coin = reward;
                }else{
                  this.$toast(res.message);
                }
            })
            this.getTaskList();
        },
        close(){
            this.isShow = false;
            this.getTaskList();
            this.presentList = [];
            this.taskList = [];
            this.endList = [];
        },
        backTap(){
          if (this.isType){
            window.android.over();
          } else {

          }

        },
        open(){
          if (this.isType){
            window.android.toOtherTask();
          } else {

          }


            // this.$router.push({
            //     path:'/taskDistributing',
            //     query:{
            //         token:this.token,
            //         imei:this.imei
            //     }
            // })
        },
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
    },
}
</script>

<style scoped>

/* 顶部背景图 */
.nw_head img{
    height: 11.5rem;
    width: 100%;
    max-width: 100%;
    /* position: absolute; */
}
/* 返回 */
.nw_left{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    /* background:rgb(47, 35, 179, 1);
    z-index: 100; */
}
.eml_img{
    margin-left: 0.75rem;
    width: 0.5rem;
    height: 0.8rem;
}
.nw_left.active{
    background:rgb(47, 35, 179, 1);
    transition: background 1s;
    /* Firefox 4 */
    -moz-transition:background 1s;
    /* Safari and Chrome */
    -webkit-transition:background 1s;
    /* Opera */
    -o-transition:background 1s;
    z-index: 100;
}
.dqrw_content{
    position: relative;
    background-color: #FAE9A6;
    width: 16.4rem;
    border-radius: 0.4rem;
    margin-left: 0.8rem;
    padding-bottom: 0.01rem;
}
.dqrw_con_left img{
    width: 2.9rem;
    height: 2.9rem;
}
.dqrw_con_title img{
    width: 8.6rem;
    position: absolute;
    top: 0.6rem;
    left: 4rem;
}
.dqrw_con_inner{
    background-color: #fff;
    height: 3.8rem;
    width: 14.8rem;
    border-radius: 0.4rem;
    margin: -1rem 0 1.5rem 0.8rem;
    box-shadow:0.1rem 0.1rem 0.4rem #FFDB4F;
    -moz-box-shadow:0.1rem 0.1rem 0.4rem #FFDB4F;
    -webkit-box-shadow:0.1rem 0.1rem 0.4rem #FFDB4F;
    position: relative;
}
.dqrw_con_inn_top{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 1rem;
}
.dqrw_con_inn_bottom{
    font-size: 0.5rem;
    color: #FBB11B;
    background-color: #F1F1F1;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 14.8rem;
    border-radius: 0 0 0.4rem 0.4rem;
}
.dqrw_con_inn_left img{
    width: 1.6rem;
    margin-left: 0.2rem;
}
.dqrw_conInner_top{
    display: flex;
    align-items: center;
}
.dqrw_conInner_top p{
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: -0.2rem 0.2rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 单行文字溢出打点 */
}
.dqrw_conInner_top img{
    width: 0.8rem;
    height: 0.8rem;
}
.dqrw_conInner{
    display: flex;
    align-items: center;
}
.dqrw_conInner p:nth-of-type(1){
    font-size: 0.7rem;
    color: #4A2120;
    margin: 0;
}
.dqrw_conInner p:nth-of-type(2){
    font-size: 0.7rem;
    color: #FE3C2E;
    margin: 0 0.3rem 0 0;
}
.dqrw_conInner img{
    width:0.8rem;
    height: 0.8rem;
    margin-right: 0.4rem;
}
.dqrw_conInner  p:nth-of-type(3){
    /* width: 1.6rem; */
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #FF3C2E;
    color: #fff;
    border-radius: 0.2rem;
    font-size: 0.5rem;
    margin: 0;
    padding: 0 0.1rem;
}
.dqrw_con_inn_right img{
    width: 2.8rem;
}

.rwlb_content{
    background-color: #F2F5F8;
    width: 16.4rem;
    border-radius: 0.4rem;
    margin: 0.5rem 0 0 0.8rem;
    padding-bottom: 0.1rem;
}
.rwlb_con_title img{
    width: 8.6rem;
    margin: 0.8rem 0 1.8rem 4rem;
}
.rwlb_con_inner{
    background-color: #fff;
    height: 3.8rem;
    width: 14.8rem;
    border-radius: 0.4rem;
    margin: -1rem 0 1.5rem 0.8rem;
    box-shadow:0.1rem 0.1rem 0.4rem #DBDBDB;
    -moz-box-shadow:0.1rem 0.1rem 0.4rem #DBDBDB;
    -webkit-box-shadow:0.1rem 0.1rem 0.4rem #DBDBDB;
    position: relative;
}
.rwlb_con_inn_top{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 1rem;
}
.rwlb_con_inn_bottom{
    font-size: 0.5rem;
    color: #FBB11B;
    background-color: #F1F1F1;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 14.8rem;
    border-radius: 0 0 0.4rem 0.4rem;
}
.rwlb_con_inn_left{
    width: 12%;
}
.dqrw_con_inn_left{
    width: 12%;
}
.ywc_con_inn_left{
    width: 12%;
}
.rwlb_con_inn_left img{
    width: 1.6rem;
    margin-left: 0.2rem;
}
.rwlb_con_inn_center{
    width: 60%;
}
.dqrw_con_inn_center{
    width: 60%;
}
.ywc_con_inn_center{
    width: 60%;
}
.rwlb_conInner_top{
    display: flex;
    align-items: center;
}
.rwlb_conInner_top p{
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: -0.2rem 0.2rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 单行文字溢出打点 */
}
.rwlb_conInner_top img{
    width: 0.8rem;
    height: 0.8rem;
}
.rwlb_conInner{
    display: flex;
    align-items: center;
}
.rwlb_conInner p:nth-of-type(1){
    font-size: 0.7rem;
    color: #4A2120;
    margin: 0;
}
.rwlb_conInner p:nth-of-type(2){
    font-size: 0.7rem;
    color: #FE3C2E;
    margin: 0 0.3rem 0 0;
}
.rwlb_conInner  p:nth-of-type(3){
    /* width: 1.6rem; */
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #FF3C2E;
    color: #fff;
    border-radius: 0.2rem;
    font-size: 0.5rem;
    margin: 0;
    padding: 0 0.1rem;
}
.rwlb_conInner img{
    width:0.8rem;
    height: 0.8rem;
    margin-right: 0.4rem;
}
.rwlb_con_inn_right{
    width: 20%;
}
.dqrw_con_inn_right{
    width: 20%;
}
.ywc_con_inn_right{
    width: 20%;
}
.rwlb_con_inn_right img{
    width: 2.8rem;
}
/* 任务列表已做完 */
.rwlb_al{
    text-align: center;
    margin-top: -1.5rem;
}
.rwlb_al div:nth-of-type(1){
    font-size: 0.6rem;
    color: #9EA9BC;
}
.rwlb_al div:nth-of-type(2){
    font-size: 0.5rem;
    color: #FF3B3B;
    border: 0.1rem solid #FF3B3B;
    width: 4.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    border-radius: 0.8rem;
    margin: 0.8rem auto;
}

.ywc_content{
    background-color: #D9D9D9;
    width: 16.4rem;
    border-radius: 0.4rem;
    margin: 0.5rem 0 0 0.8rem;
    padding-bottom: 0.1rem;
    color: #9EA9BC;
}
.ywc_con_title img{
    width: 8.6rem;
    margin: 0.8rem 0 1.8rem 4rem;
}
.ywc_con_inner{
    background-color: #EDEDED;
    height: 3.8rem;
    width: 14.8rem;
    border-radius: 0.4rem;
    margin: -1rem 0 1.5rem 0.8rem;
    box-shadow:0.1rem 0.1rem 0.4rem #DBDBDB;
    -moz-box-shadow:0.1rem 0.1rem 0.4rem #DBDBDB;
    -webkit-box-shadow:0.1rem 0.1rem 0.4rem #DBDBDB;
    position: relative;
}
.ywc_con_inn_top{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 1rem;
}
.ywc_con_inn_bottom{
    font-size: 0.5rem;
    background-color: #F1F1F1;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 14.8rem;
    border-radius: 0 0 0.4rem 0.4rem;
}
.ywc_con_inn_left img{
    width: 1.6rem;
    margin-left: 0.2rem;
}
.ywc_conInner_top{
    display: flex;
    align-items: center;
}
.ywc_conInner_top p{
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: -0.2rem 0.2rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 单行文字溢出打点 */
}
.ywc_conInner_top img{
    width: 0.8rem;
    height: 0.8rem;
}
.ywc_conInner{
    display: flex;
    align-items: center;
}
.ywc_conInner p:nth-of-type(1){
    font-size: 0.7rem;
    margin: 0;
}
.ywc_conInner p:nth-of-type(2){
    font-size: 0.7rem;
    margin: 0 0.3rem 0 0;
}
.ywc_conInner  p:nth-of-type(3){
    /* width: 1.6rem; */
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #d9d9d9;
    color: #9EA9BC;
    border-radius: 0.2rem;
    font-size: 0.5rem;
    margin: 0;
    padding: 0 0.1rem;
}
.ywc_conInner img{
    width:0.8rem;
    height: 0.8rem;
    margin-right: 0.4rem;
}
/* .ywc_con_inn_right img{
    width: 2.8rem;
} */
.ywc_con_inn_right p{
    font-size: 0.6rem;
    color: #9EA9BC;
}
.ywc_popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 101;
}
.ywc_popup_inner{
    position: fixed;
    top: 5.45rem;
    left: 2.1rem;
}
.ywc_popup_inner img:nth-of-type(1){
    width: 13.5rem;
    height: 16.2rem;
}
.ywc_popup_inner img:nth-of-type(2){
    position: absolute;
    width: 9.6rem;
    height: 3rem;
    bottom: 0.6rem;
    left: 2.5rem;
}
.ywc_popup_inner p{
    position: absolute;
    top: 0.5rem;
    left: 1.8rem;
    font-size: 1.4rem;
    color: #fff;
}
.ywc_popup_inner span{
    color: #FEEA02;
}
</style>
