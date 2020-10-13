<template>
    <div id="app" class="againstGrade-bg">
        <div class="againstGrade-head">
            <img src="../../assets/enlighteningRight.png" @click="back"/>
            <p>对战答题</p>
        </div>
        <div class="againstGrade-photo">
            <img src="../../assets/againstGradePhoto.png" alt="" v-if="this.isVictory == 1" />
            <img src="../../assets/againstGradeFail.png" alt="" v-if="this.isVictory == 2" />
            <img src="../../assets/draw.png" alt="" v-if="this.isVictory == 3" />
        </div>
        <div class="againstGrade-tips">
            <p v-if="this.isVictory == 1">胜利</p>
            <p v-if="this.isVictory == 2">失败</p>
            <p v-if="this.isVictory == 3">平局</p>
        </div>
        <div class="againstGrade-content">
            <div class="againstGrade-contentInner">
                <div class="againstGrade-contentLeftInner">
                    <div><img :src="img" alt=""></div>
                    <div class="againstGrade-inside">
                        <p>{{mobile}}</p>
                        <span id="left" :class="this.isVictory == 2 ? 'leftChange' : 'rightChange'"></span>
                        <p>{{myScore}}</p>
                    </div>
                </div>

                <div class="againstGrade-contentRightInner">
                    <div class="againstGrade-insideRight">
                        <p>{{enemyMoile}}</p>
                        <span id="right" :class="this.isVictory == 2 ? 'leftChange' : 'rightChange'"></span>
                        <p>{{enemyScore}}</p>
                    </div>
                    <div><img :src="enemyimg" alt=""></div>
                </div>
            </div>
            <div class="againstGrade-font">
                <!-- 失败 isShowContent = 1 -->
                <!-- 随机-成功isShowContent == 2 -->
                <!-- 好友-成功 isShowContent == 3-->
                <p v-if="isShowContent == 1" style="color: #9EA9BC;">很遗憾，未获得奖励</p>
                <p v-if="isShowContent == 2">恭喜获得{{reward}}金币！</p>
                <p v-if="isShowContent == 3">恭喜获得一次抽奖机会！</p>
                <p v-if="isShowContent == 4">恭喜抽到{{getCoin}}金币！</p>
            </div>
            <img v-if="isShowContent != 3" src="../../assets/againstGradeBtn.png" alt="" @click="goOn"/>
            <img v-else src="../../assets/botton.png" alt="" @click="choujiang"/>
        </div>
        <div class="againstGrade-rectangle">
            <div id="rectangleLeft" :style="{width:getRectangle}"></div>
            <div id="rectangleRight" :style="{width:getRectangle}"></div>
            <!-- <img src="../../assets/rectangleOne.png" alt="" v-if="this.enemyScore>this.myScore">
            <img src="../../assets/rectangleTwo.png" alt="" v-if="this.enemyScore==this.myScore">
            <img src="../../assets/rectangleThree.png" alt="" v-if="this.enemyScore<this.myScore"> -->
        </div>
        <!-- 弹窗 -->
        <div class="againstGrade-box" v-show="isShowBox">
            <div class="againstGrade-boxInner" @click="stop">
                <p>恭喜</p>
                <p style="color:#9EA9BC;margin:1rem 0 0.5rem 0">抽到{{getCoin}}金币！</p>
                <div style="border:0.02rem solid #F2F2F2;"></div>
                <div @click="close">收下了</div>
            </div>
        </div>
        <!-- 平局显示 -->
        <div  v-if="isShowContent == 5" class="drawFont">本次对决不消耗金币</div>
        <div v-show="isShowTipBox" class="again-box">
            <div class="again-boxAgain" @click="stopBox">
                <p>确认退出？</p>
                <div style="border:0.02rem solid #F2F2F2;"></div>
                <div class="again-boxAgainInner">
                    <div @click="returnSelfPage">继续挑战</div>
                    <span></span>
                    <div @click="returnAgainst">退出</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // isShow:true,
            isShowTipBox:false,
            isShowBox:false,
            isShowContent:1,
            isVictory:'',
            reward:'',
            fightingType:'',
            mobile:'',
            enemyMoile:'',
            myScore:'',
            enemyScore:'',
            fightId:'',
            getCoin:0,
            coin:0,
            enemyimg:'',
            img:''
        }
    },
    created(){
        this.mobile = APP.GetLocationParams("mobile"); // 我方号码
        this.fightId = APP.GetLocationParams("fightId"); // 我方号码
        this.enemyMoile = APP.GetLocationParams("enemyMoile");// 对方号码
        this.enemyScore = APP.GetLocationParams("enemyScore");
        this.myScore = APP.GetLocationParams("myScore");
        this.isVictory = APP.GetLocationParams("isVictory");
        this.reward = APP.GetLocationParams("reward");
        this.fightingType = APP.GetLocationParams("fightingType"); // 抽奖
        this.enemyimg = APP.GetLocationParams("enemyimg");
        this.img = APP.GetLocationParams("img");
        this.coin = window.sessionStorage.getItem("coin");
        if(this.isVictory == 2){ // 失败
            // this.isShow = false;
            // this.isShowImg = false;
            this.isShowContent == 1
        }else if(this.isVictory == 3){
            this.isShowContent = 5
        }else{
            if(this.fightingType == 1){ // 好友对战，抽金币
                this.isShowContent=3;
            }else{ // 随机对战，得金币
                this.isShowContent=2;
                this.coin = parseInt(this.coin) + parseInt(this.reward);
            }
        }
    },
    mounted (){
        this.getRectangle()
        window.back = this.back
    },
    methods:{
        getRectangle(){
            var rl = document.getElementById('rectangleLeft')
            var rr = document.getElementById('rectangleRight')
            if(this.myScore<this.enemyScore){
                rl.style.width=40+'%'
                rr.style.width=60+'%'
            }else if(this.myScore>this.enemyScore){
                rl.style.width=60+'%'
                rr.style.width=40+'%'
            }else if(this.myScore==this.enemyScore){
                rl.style.width=50+'%'
                rr.style.width=50+'%'
            }
            if(this.myScore==0 && this.enemyScore!=0){
                rl.style.width=0+'%'
                rr.style.width=100+'%'
            }
            if(this.enemyScore==0 && this.myScore!=0){
                rl.style.width=100+'%'
                rr.style.width=0+'%'
            }
        },
        close(){
            this.isShowBox = false
        },
        stop(){
            event.stopPropagation()
        },
        // againChallenge(){
        //     this.$router.push({
        //         path:'/againstTheProblemSolving',
        //         query:{
        //             coin : this.coin,
        //             token:window.sessionStorage.getItem("token"),
        //             imei:window.sessionStorage.getItem("imei"),
        //             fightingType:this.fightingType
        //         }
        //     })
        // },
        choujiang(){
             let parameterData = {
                token:window.sessionStorage.getItem("token"),
                imei:window.sessionStorage.getItem("imei"),
                fightId:this.fightId
            }
            this.$get('/api/mFightingInfo/luckDraw',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.getCoin = res.data;
                    this.isShowBox = true;
                    this.isShowContent = 4;
                    this.coin = parseInt(this.coin) + parseInt(this.getCoin);
                }
            })
        },
        goOn(){
            var pageName = sessionStorage.getItem('pageName');
            if(pageName = 'againstTheProblemSolving'){
              //跳转
              window.location.href = '/againstTheProblemSolving.html';
              // this.$router.push({
              //       path: '/againstTheProblemSolving',
              //       // query:{
              //       //     coin : window.sessionStorage.getItem("coin"),
              //       //     token:window.sessionStorage.getItem("token"),
              //       //     imei:window.sessionStorage.getItem("imei"),
              //       //     fightingType:window.sessionStorage.getItem("fightingType"),
              //       // }
              //   })
                this.getcoin()

            }else if(pageName = 'againstTheProblemSolvingTwo'){
              window.location.href = '/againstTheProblemSolvingTwo.html';
                // this.$router.push({
                //     path: '/againstTheProblemSolvingTwo',
                //     // query:{
                //     //     coin : window.sessionStorage.getItem("coin"),
                //     //     token:window.sessionStorage.getItem("token"),
                //     //     imei:window.sessionStorage.getItem("imei"),
                //     //     fightingType:window.sessionStorage.getItem("fightingType"),
                //     // }
                // })
                this.getcoin()
            }
        },
        getcoin(){
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
        stopBox(){
            event.stopPropagation()
        },
        //选择返回 退出游戏
        back(){
            this.isShowTipBox = true
        },
        //继续等待
        returnSelfPage(){
            this.isShowTipBox = false
            this.goOn()
        },
        returnAgainst(){
            window.android.over();
        }
    }
}
</script>

<style scoped>
/* 背景 */
.againstGrade-bg{
    background-image: url('../../assets/againstBg.png');
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    width: 100%;
}
/* 返回头 */
.againstGrade-head{
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.againstGrade-head img{
    width: 0.5rem;
    height: 0.8rem;
    position: absolute;
    left: 0.75rem;
}
.againstGrade-head p{
    font-size: 0.9rem;
    color: #fff;
}
/* 冠军图 */
.againstGrade-photo{
    text-align: center;
    margin-top: 2.05rem;
}
.againstGrade-photo img{
    width: 4.4rem;
    height: 4.4rem;
    padding-bottom: 0.5rem;
}
/* 小提示 */
.againstGrade-tips{
    margin: 0;
    font-size: 0.9rem;
    color: #3C3E5B;
    text-align: center;
}
.againstGrade-tips p{
    margin: 0;
}
/* 内容 */
.againstGrade-content{
    width: 15.6rem;
    height: 20.95rem;
    background-color: #fff;
    margin: -4.5rem auto 0 auto;
    border-radius: 0.4rem;
    text-align: center;
}
.againstGrade-contentInner {
    display: flex;
    justify-content: space-between;
    position: relative; /*relative*/
    top: 6.6rem;
}
/* 左边 */
.againstGrade-contentLeftInner{
    display: flex;
    position: absolute;
    left: 0.8rem;
    /* margin-left: 0.8rem; */
}
.againstGrade-contentLeftInner div:nth-of-type(1) img{
    width: 1.95rem;
    height: 1.95rem;
    background-color: #D8D8D8;
    border-radius: 50%;
    position: absolute;
    top: 0.1rem;
    left: -0.1rem;
    border: 0.05rem solid #D8D8D8;
}
.againstGrade-inside p{
    margin: 0;
}
.againstGrade-inside p:nth-of-type(1){
    font-size: 0.6rem;
    color: #3C3E5B;
    position: absolute;
    left: 2.2rem;
    top: -0.2rem;
    /* margin: 0 0 -0.3rem 0.8rem; */
}
.againstGrade-inside p:nth-of-type(2){
    font-size: 0.9rem;
    color: #FF6F58;
    position: absolute;
    top: 1.5rem;
    left: 2.2rem;
    /* margin: 0 0 0 -1.2rem; */
}
/* #left{
    border: 0.3rem solid #FF6F58;
    display: inline-block;
    width: 3.65rem;
    border-radius: 0.4rem 0 0 0.4rem;
    background-color: #FF6F58;
    margin-left: 0.4rem;
    position: absolute;
    top: 0.8rem;
    left: 2.2rem;
} */
/* 右边 */
.againstGrade-contentRightInner{
    display: flex;
    /* margin-right: 0.8rem; */
    position: absolute;
    left: 8.5rem;
    text-align: right;
}
.againstGrade-contentRightInner div:nth-of-type(2) img{
    width: 1.95rem;
    height: 1.95rem;
    background-color: #D8D8D8;
    border-radius: 50%;
    position: absolute;
    left: 4.5rem;
    top: 0.1rem;
    border: 0.05rem solid #D8D8D8;
}
.againstGrade-insideRight p:nth-of-type(1){
    font-size: 0.6rem;
    color: #3C3E5B;
    /* margin: 0 0.8rem -0.3rem 0; */
    position: absolute;
    top: -0.8rem;
    left: 0.6rem;
    /* text-align: right; */
}
.againstGrade-insideRight p:nth-of-type(2){
    font-size: 0.9rem;
    color: #1D7BFF;
    position: absolute;
    top: 0.6rem;
    left: 2.6rem;
    /* margin: 0 0 0 1.2rem; */
}
/* #right{
    border: 0.3rem solid #1D7BFF;
    display: inline-block;
    width: 5rem;
    border-radius: 0 0.4rem 0.4rem 0;
    background-color: #1D7BFF;
    margin-left: 0.4rem;
    position: absolute;
    top: 0.8rem;
    left: -1.3rem;
}
#leftChange{
    width: 3.65rem;
}
#rightChange{
    width: 2rem;
} */
/* 提示 */
.againstGrade-font{
    font-size: 1.2rem;
    font-weight: 600;
    position: absolute;
    left: 0;
    right: 0;
    top:18rem;
    color: #FF7E4C;
}
/* 按钮 */
.againstGrade-content img{
    width: 13.2rem;
    height: 2.2rem;
    position: absolute;
    left: 2.5rem;
    right: 0;
    top:22rem;
}
/* 弹窗 */
.againstGrade-box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.6);
}
.againstGrade-boxInner{
    position: fixed;
    top: 12.45rem;
    left: 1.6rem;
    background-color: #fff;
    width: 14.8rem;
    height: 6.8rem;
    border-radius: 0.4rem;
    text-align: center;
}
.againstGrade-boxInner p{
    font-size: 0.7rem;
    color: #3C3E5B;
    margin: 1.2rem 0 0 0;
}
.againstGrade-boxInner div:nth-of-type(2){
    width: 4.8rem;
    font-size: 0.7rem;
    color: #9EA9BC;
    height: 1.5rem;
    margin: 0.8rem auto 0 auto;
}
/* 矩形 */
.againstGrade-rectangle{
    width: 9.2rem;
    height: 0.4rem;
    position: absolute;
    top: 13.6rem;
    left: 4.5rem;
    display: flex;
    justify-content: space-between;
}
/* .againstGrade-rectangle img{
    width: 9.2rem;
    height: 0.4rem;
    position: absolute;
    top: 13.6rem;
    left: 4.5rem;
} */
#rectangleLeft{
    background-color: #FF6F58;
}
#rectangleRight{
    background-color: #1D7BFF;
}
.drawFont{
    position: absolute;
    font-size: 0.7rem;
    color: #9EA9BC;
    top: 11rem;
    left: 5.7rem;
}

/* 提示弹框 */
.again-box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
}
.again-boxAgain{
    position: fixed;
    background-color: #fff;
    width: 14.8rem;
    /* height: 6.25rem; */
    top: 12.45rem;
    left: 1.6rem;
    border-radius: 0.4rem;
    text-align: center;
}
.again-boxAgain{
    font-size: 0.7rem;
    color: #3C3E5B;
}
.again-boxAgain p{
    padding: 0 1.3rem;
    margin-top: 1.2rem;
}
.again-boxAgain .again-boxAgainInner{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.again-boxAgainInner span{
    border: 0.04rem solid #F2F2F2;
    height: 2rem;
    margin: 0.1rem 0.5rem 0 0;
}
.again-boxAgainInner div:nth-of-type(1){
    color: #9EA9BC;
    margin-left: 1rem;
}
.again-boxAgainInner div:nth-of-type(2){
    margin-right: 1.5rem;
}
</style>

