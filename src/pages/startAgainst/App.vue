<template>
    <div id="app" class="startAgainst-bg">
        <div class="startAgainst-head">
            <img src="../../assets/enlighteningRight.png" @click="back"/>
            <p>对战答题</p>
        </div>
        <div class="startAgainst-content">
            <div class="startAgainst-left">
                <p>{{mobile}}</p>
                <div class="startAgainst-leftInner">
                    <img src="../../assets/startAgainstLeft.png" alt="">
                    <div><img :src="img" alt=""></div>
                    <p>{{myScore}}</p>
                </div>
            </div>
            <div class="startAgainst-vs"><img src="../../assets/vs.png" alt=""></div>
            <div class="startAgainst-right">
                <p style="position: absolute;right: 0.5rem;">{{enemyMoile}}</p>
                <div class="startAgainst-rightInner">
                    <img src="../../assets/startAgainstRight.png" alt="">
                    <div><img :src="enemyimg" alt=""></div>
                    <p>{{enemyScore}}</p>
                </div>
            </div>
        </div>
        <div :class="boxLength==1 ? 'startAgainst-foot' : 'startAgainst-foot startAgainst-footContent'">
            <div class="startAgainst-circle"><p>{{content}}</p></div>
            <div class="startAgainst-footInner" v-show="this.ready">
                <h2>第{{quesNum}}题</h2>
                <p>-{{question.questionTypeName}}-</p>
                <p>{{quesNum}}/{{quesTotal}}</p>
            </div>
            <!-- 题目内容 -->
            <div class="startAgainst-topic" v-show="this.begin">
                <p>{{question.question}}</p>
                <!--<div v-for="(item,index) in answerData" :class="item.isCorrect==myselect ? 'greenBtn' : ''" @click="answer(item.ansId,item.isCorrect)" id="changeDiv">-->
                    <!--{{item.answer}}-->
                <!--</div>-->
              <div v-for="(item,index) in answerData" class="whiteBtn bj"  @click="answer(item.ansId,item.isCorrect,index)" id="changeDiv">
                {{item.answer}}
              </div>
            </div>
            <div>

            </div>
        </div>

        <div v-show="isShowBox" class="startAgainst-box">
            <div class="startAgainst-boxAgain" @click="stop">
                <p>挑战进行中，选择退出则不退还金币，确认退出？</p>
                <div style="border:0.02rem solid #F2F2F2;"></div>
                <div class="startAgainst-boxAgainInner">
                    <div @click="returnSelfPage">继续挑战</div>
                    <span></span>
                    <div @click="returnAgainst">不要金币了</div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            ready:true,
            begin:false,
            boxLength:1,

            mobile:'',
            enemyMoile:'',
            role:'',
            quesTotal:'',
            fightId:'',
            entryCode:'',

            quesNum:1,
            content: '',  // 按钮里显示的内容
            totalTime: 0,
            question:{
                question:'',
                countTime:'',
                qId:'',
                questionTypeName:'',
                score:''
            },
            answerData:{},
            time:0, // 答题时间
            isCorrect:'', // 是否正确（1-正确 2-错误）
            enemyScore:0, // 对方分数
            myScore:0, // 我的分数
            enemyimg:'', // 对方头像
            img:'', // 我方头像

            getScoreIntervalClock:null, // 获取分数定时
            waitIntervalClock:null, // 等待页面定时
            answerIntervalClock:null, // 答题页面定时
            getScoreIntervalClockLastQuest:null,
            isAnswer:false,
            lastQuest:false,
            isVictory:'',
            reward:'',
            fightingType:'',
            active:-1,
            isShowBox:false,
        }
    },
    created(){
        this.token = APP.GetLocationParams("token") || window.sessionStorage.getItem("token");
        this.imei = APP.GetLocationParams("imei") || window.sessionStorage.getItem("imei");
        this.mobile = APP.GetLocationParams("mobile").substring(0,3)+"****"+APP.GetLocationParams("mobile").substring(7,11); // 我方号码
        this.enemyMoile = APP.GetLocationParams("enemyMoile").substring(0,3)+"****"+APP.GetLocationParams("enemyMoile").substring(7,11);// 对方号码
        this.role = APP.GetLocationParams("role");
        this.quesTotal = APP.GetLocationParams("quesNum");
        this.fightId = APP.GetLocationParams("fightId");
        this.entryCode = APP.GetLocationParams("entryCode");
        this.enemyimg = APP.GetLocationParams("enemyimg");
        this.img = APP.GetLocationParams("img");
        this.getQuestion();
        this.waitInterval();
        // this.cancelMatching()
    },
    // methods里面定义的方法, 需要赋值给window,挂载到mounted
    mounted(){
        window.back = this.back
    },
    destroyed() {
        clearInterval(this.waitIntervalClock);
        clearInterval(this.answerIntervalClock);
        clearInterval(this.getScoreIntervalClock);
        clearInterval(this.getScoreIntervalClockLastQuest);
        this.getScoreIntervalClockLastQuest = null;
        this.getScoreIntervalClock = null;
        this.answerIntervalClock = null;
        this.waitIntervalClock = null;
    },
    methods:{
        //等待页面定时器
        waitInterval(){
            this.content = 2;
            let totalTime = 2;
            this.waitIntervalClock =  window.setInterval(() => {
                 totalTime--;
                 this.content = totalTime;
                 if(totalTime <= 0){
                    clearInterval(this.waitIntervalClock);
                    this.waitIntervalClock = null;
                    // 显示题目
                    this.ready = false;
                    this.begin = true;
                    this.boxLength = 2;
                    this.time = new Date().getTime();
                    // 调用答题倒计时
                    this.answerInterval();
                    this.isAnswer =false;
                 }
            },1000);
        },
        // 答题定时器
        answerInterval(){
            this.content = this.question.countTime;
            let totalTime  = this.content;
            this.answerIntervalClock =  window.setInterval(() => {
                 totalTime--;
                 this.content = totalTime;
                 if(totalTime == 0){
                    clearInterval(this.answerIntervalClock);
                    this.answerIntervalClock = null;
                   // 自动提交答案
                   if(!this.isAnswer){
                       this.answer(-1,2);
                    //    if(!this.lastQuest){
                    //        this.getQuestion();
                    //    }
                   }
                    // 回到等待答题的页面
                    // this.ready = true;
                    // this.begin = false;
                    // this.boxLength = 1;
                    // this.waitInterval();
                 }
            },1000);
        },
        jumptoFinish(){
            clearInterval(this.waitIntervalClock);
            clearInterval(this.answerIntervalClock);
            clearInterval(this.getScoreIntervalClock);
            clearInterval(this.getScoreIntervalClockLastQuest);
            this.getScoreIntervalClockLastQuest = null;
            this.getScoreIntervalClock = null;
            this.answerIntervalClock = null;
            this.waitIntervalClock = null;

          window.location.href = "/againstGrade.html?fightId="+this.fightId+'&enemyScore='+this.enemyScore+
                                '&myScore='+this.myScore+'&mobile='+this.mobile+'&enemyMoile='+ this.enemyMoile+
                                '&isVictory='+this.isVictory+'&reward='+this.reward+'&fightingType='+this.fightingType+
                                '&enemyimg='+this.enemyimg+'&img='+this.img;

            // this.$router.push({
            //     path:"/againstGrade",
            //     query:{
            //         fightId:this.fightId,
            //         enemyScore:this.enemyScore, // 对方分数
            //         myScore:this.myScore, // 我的分数
            //         mobile:this.mobile,
            //         enemyMoile: this.enemyMoile ,
            //         isVictory:this.isVictory,
            //         reward:this.reward,
            //         fightingType:this.fightingType,
            //         enemyimg:this.enemyimg,
            //         img:this.img
            //     }
            // });
        },
        getQuestion(){
            let parameterData = {
                token:window.sessionStorage.getItem("token"),
                imei:window.sessionStorage.getItem("imei"),
                entryCode:this.entryCode,
                num:this.quesNum,
                role:this.role,
                fightId:this.fightId
            }
            this.$get('/api/mFightingInfo/getQuestion',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.question = res.data.question;
                    this.answerData =res.data.answer;
                }
            })
        },
        // 提交答案
        answer(ansId,isCorrect,index){
            if(this.isAnswer){
                return ;
            }
            if(ansId != -1){
                //改变样式
                var arr=new Array()
                arr=document.getElementsByClassName("bj");
                if(isCorrect==1){
                    arr[index].style.backgroundColor= "#21E194";
                }else{
                    arr[index].style.backgroundColor= "#FF4B29";
                }
            }
            this.isAnswer = true;
            clearInterval(this.answerIntervalClock);
            this.answerIntervalClock = null;
            // 判断是否正确，改变样式
            let parameterData = {
                token:this.token,
                imei:this.imei,
                entryCode:this.entryCode,
                num:this.quesNum,
                fightId:this.fightId,
                role:this.role,
                questionId:this.question.qId,
                answerId:ansId,
                isCorrect:isCorrect,
                quesScore:this.question.score,
                setTime:this.question.countTime,
                answerTime:new Date().getTime()-this.time
            }
            this.$get('/api/mFightingInfo/subResult',parameterData).then(res => {
                if(ansId == -1){ // 自动提交
                    this.quesNum++;
                    // 触发每秒获取对方结果定时器
                    this.getScoreInterval();
                }else{
                    if((res.statusCode+"").startsWith("2")){
                        this.quesNum++;
                        this.myScore = res.data.score;
                        // 触发每秒获取对方结果定时器
                        this.getScoreInterval();
                    }
                }
            });
        },
        // 获取分数定时器
        getScoreInterval(){
            let getScoreTime = this.content;
            this.getScoreIntervalClock = window.setInterval(() => {
                getScoreTime--;
                if(getScoreTime == 0 ){
                    clearInterval(this.getScoreIntervalClock);
                    this.getScoreIntervalClock = null;
                }
                this.getScore(getScoreTime);
            },1000);
        },
        // 查看对方分数
        getScore(getScoreTime){
            let parameterData = {
                //token:'e8371f21e1850f4dde718c4b068ab4a4',
                token:window.sessionStorage.getItem("token"),
                imei:window.sessionStorage.getItem("imei"),
                role:this.role,
                getScoreTime:getScoreTime,
                entryCode:this.entryCode,
                fightId:this.fightId
            }
            if(this.quesNum > this.quesTotal){
                this.lastQuest = true;
            }
            this.$get('/api/mFightingInfo/getEnemyScore',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    // 如果获取到了数据，则关闭改定时器
                    if(res.data.enemyScore > -1){
                        // 取消定时器：getScoreIntervalClock
                        clearInterval(this.getScoreIntervalClock);
                        //初始样式
                        var arr=new Array()
                        arr=document.getElementsByClassName("bj");
                        for(var i=0;i<arr.length;i++){
                          arr[i].style.backgroundColor= "#fff";
                        }
                        this.getScoreIntervalClock = null;
                        this.enemyScore = res.data.enemyScore;
                        if(this.lastQuest){
                            this.isVictory=res.data.isVictory;
                            this.reward=res.data.reward;
                            this.fightingType=res.data.fightingType;
                            this.jumptoFinish();
                        }else{
                            this.ready = true;
                            this.begin = false;
                            this.boxLength = 1;
                            this.getQuestion();
                            this.waitInterval();
                        }
                    }else{
                         if(this.lastQuest){
                            clearInterval(this.getScoreIntervalClock);
                            this.getScoreIntervalClock = null;

                            // 最后一题，重新设置定时器
                            this.getScoreIntervalClockLastQuest = window.setInterval(() => {
                                getScoreTime--;
                                this.getEnemyScoreFor(getScoreTime);
                            },1000);
                        }
                        if(getScoreTime == 0){
                            clearInterval(this.getScoreIntervalClock);
                            this.getScoreIntervalClock = null;
                            this.ready = true;
                            this.begin = false;
                            this.boxLength = 1;
                            this.getQuestion();
                            this.waitInterval();
                        }
                    }
                }
            });

        },
        getEnemyScoreFor(getScoreTime){
            let parameterData = {
                //token:'e8371f21e1850f4dde718c4b068ab4a4',
                token:window.sessionStorage.getItem("token"),
                imei:window.sessionStorage.getItem("imei"),
                role:this.role,
                getScoreTime:getScoreTime,
                entryCode:this.entryCode,
                fightId:this.fightId
            }
            this.$get('/api/mFightingInfo/getEnemyScore',parameterData).then(res => {
                if(res.data.enemyScore == -1){

                }else{
                    clearInterval(this.getScoreIntervalClockLastQuest);
                    this.getScoreIntervalClockLastQuest = null;
                    this.isVictory=res.data.isVictory;
                    this.reward=res.data.reward;
                    this.fightingType=res.data.fightingType;
                    this.jumptoFinish();
                }
            });
        },
        back(){
            this.isShowBox = true
        },
        //继续挑战
        returnSelfPage(){
            this.isShowBox = false
        },
        returnAgainst(){
            window.android.over();
            this.cancelMatching()
            // var pageName = sessionStorage.getItem('pageName');

            //  let parameterData = {
            //     token:window.sessionStorage.getItem("token"),
            //     imei:window.sessionStorage.getItem("imei")
            // }

            // this.$get('/api/mFightingInfo/cancelMatching',parameterData).then(res => {
            //     if(pageName = 'againstTheProblemSolving'){
            //         this.$router.push({
            //             path: '/againstTheProblemSolving',
            //             // query:{
            //             //     coin : window.sessionStorage.setItem("coin",this.coin),
            //             //     token:window.sessionStorage.setItem("token",this.token),
            //             //     imei:window.sessionStorage.setItem("imei",this.imei),
            //             //     // fightingType:window.sessionStorage.getItem("fightingType"),
            //             // }
            //         })
            //         this.getCoin()
            //     }else if(pageName = 'againstTheProblemSolvingTwo'){
            //         this.$router.push({
            //             path: '/againstTheProblemSolvingTwo',
            //             // query:{
            //             //     coin : window.sessionStorage.getItem("coin"),
            //             //     token:window.sessionStorage.getItem("token"),
            //             //     imei:window.sessionStorage.getItem("imei"),
            //             //     fightingType:window.sessionStorage.getItem("fightingType"),
            //             // }
            //         })
            //         this.getCoin()
            //     }
            // });
        },
        stop(){
            event.stopPropagation()
        },
        getCoin(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
            }
            this.$get('/api/userInfo/getUserCoin',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.coin = res.data
                }
            })
        },
        cancelMatching(){
             let parameterData = {
                token:window.sessionStorage.getItem("token"),
                imei:window.sessionStorage.getItem("imei")
            }

            this.$get('/api/mFightingInfo/cancelMatching',parameterData).then(res => {
            });
        },
    }
}
</script>

<style scoped>
/* 背景 */
.startAgainst-bg{
    background-image: url('../../assets/againstBg.png');
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    width: 100%;
}
/* 返回头 */
.startAgainst-head{
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.startAgainst-head img{
    width: 0.5rem;
    height: 0.8rem;
    position: absolute;
    left: 0.75rem;
}
.startAgainst-head p{
    font-size: 0.9rem;
    color: #fff;
}
/* vs对战 */
.startAgainst-content{
    display: flex;
    justify-content: space-between;
}
/* 左边 */
.startAgainst-left p{
    font-size: 0.6rem;
    color: #fff;
    margin-left: 0.8rem;
}
.startAgainst-leftInner img{
    width: 7.4rem;
    height: 2.8rem;
    position: absolute;
    top: 4.2rem;
}
.startAgainst-leftInner div img{
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    /* border: 0.05rem solid #fff; */
    position: absolute;
    top: 4.4rem;
    left: 0.9rem;
}
.startAgainst-leftInner p{
    font-size: 1.2rem;
    font-weight: 500;
    position: absolute;
    top: 3.6rem;
    left: 3.5rem;
}
/* vs */
.startAgainst-vs img{
    width: 2.65rem;
    height: 3.6rem;
    /* margin-top: 2.35rem; */
    position: absolute;
    top: 5rem;
    left: 7.5rem;
}
/* 右边 */
.startAgainst-right p{
    font-size: 0.6rem;
    color: #fff;
    margin: 1.95rem 0 0.6rem 3rem;
}
.startAgainst-rightInner img{
    width: 7.4rem;
    height: 2.8rem;
    position: absolute;
    top: 5.45rem;
    right: 0;
}
.startAgainst-rightInner div img{
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    /* border: 0.05rem solid #fff; */
    position: absolute;
    top: 5.7rem;
    right: 0.9rem;
}
.startAgainst-rightInner p{
    font-size: 1.2rem;
    font-weight: 500;
    position: absolute;
    top: 4.2rem;
    right: 4.5rem;
}
/* 答题内容 */
.startAgainst-foot{
    width: 15.6rem;
    height: 17.4rem;
    background-color: #fff;
    border-radius: 0.3rem;
    text-align: center;
    padding-top: 0.8rem;
    position: absolute;
    top: 10rem;
    left: 1.25rem;
}
.startAgainst-footContent{
    width: 15.6rem;
    height: 20.2rem;
    background-color: #fff;
    border-radius: 0.3rem;
    text-align: center;
    padding-top: 0.8rem;
    position: absolute;
    top: 9rem;
    left: 1.25rem;
}
/* 圆 */
.startAgainst-foot .startAgainst-circle{
    width: 2.8rem;
    height: 2.8rem;
    line-height: 2.8rem;
    border: 0.2rem solid #5B64FF;
    border-radius: 50%;
    margin: 0 auto;
}
.startAgainst-foot div:nth-of-type(1) p{
    margin: 0 auto;
    color: #3C3E5B;
    font-size: 1.2rem;
    font-weight: 600;
}
.startAgainst-footInner p{
    margin: 0;
    font-size: 0.8rem;
    color: #9EA9BC;
    letter-spacing:0.1rem;
}
.startAgainst-footInner h2{
    font-size: 1.2rem;
    color: #3C3E5B;
    margin: 2rem 0 0.1rem 0;
}
/* 题目内容 */
.startAgainst-topic p{
    font-size: 0.8rem;
    color: #3C3E5B;
    margin: 0.9rem 1.8rem 0.8rem 1.8rem;
}

.startAgainst-topic .whiteBtn{
    width: 11.5rem;
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #fff;
    margin: 0 auto 0.8rem auto;
    border-radius: 1rem;
    font-size: 0.8rem;
    color: #3C3E5B;
    border: 0.05rem solid #E1E1E1;
}
.startAgainst-topic .whiteBtn.classA1{
  background-color: #1d7bff;
}
.startAgainst-topic .whiteBtn.classA2{
  background-color: #1d7bff;
}
.startAgainst-topic .whiteBtn.classA3{
  background-color: #1d7bff;
}
.startAgainst-topic .whiteBtn.classA4{
  background-color: #1d7bff;
}
.startAgainst-topic .whiteBtn.classB1{
  background-color: #21e194;
}
.startAgainst-topic .whiteBtn.classB2{
  background-color: #21e194;
}
.startAgainst-topic .whiteBtn.classB3{
  background-color: #21e194;
}
.startAgainst-topic .whiteBtn.classB4{
  background-color: #21e194;
}

/* 邀请弹窗 */
.startAgainst-box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
}

/* 提示弹框 */
.startAgainst-boxAgain{
    position: fixed;
    background-color: #fff;
    width: 14.8rem;
    height: 6.25rem;
    top: 12.45rem;
    left: 1.6rem;
    border-radius: 0.4rem
}
.startAgainst-boxAgain{
    font-size: 0.7rem;
    color: #3C3E5B;
}
.startAgainst-boxAgain p{
    padding: 0 1.3rem;
    margin-top: 1.2rem;
}
.startAgainst-boxAgain .startAgainst-boxAgainInner{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.startAgainst-boxAgainInner span{
    border: 0.04rem solid #F2F2F2;
    height: 1.8rem;
    margin: 0.1rem 0 0 0.5rem;
}
.startAgainst-boxAgainInner div:nth-of-type(1){
    color: #9EA9BC;
    margin-left: 1rem;
}
.startAgainst-boxAgainInner div:nth-of-type(2){
    margin-right: 1rem;
}
</style>

