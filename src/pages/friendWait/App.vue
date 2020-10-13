<template>
    <div id="app" class="friendWait-bg">
        <div class="friendWait-head">
            <img src="../../assets/enlighteningRight.png" @click="back"/>
            <p>对战答题</p>
        </div>
        <div class="friendWait-content">
            <div class="friendWait-left">
                <p style="margin:0.8rem 0 0 0.8rem">{{mobile}}</p>
                <div class="friendWait-leftInner">
                    <img src="../../assets/startAgainstLeft.png" alt="">
                    <div class="friendWaitImg"><img :src="img" alt=""></div>
                    <p>0</p>
                </div>
            </div>
            <div class="friendWait-vs"><img src="../../assets/vs.png" alt=""></div>
            <div class="friendWait-right">
                <p>{{emeymobile}}</p>
                <div class="friendWait-rightInner">
                    <img src="../../assets/startAgainstRight.png" alt="">
                    <div class="friendWaitRightImg"><img :src="enemyimg" alt=""></div>
                    <p>0</p>
                </div>
            </div>
        </div>
        <div class="friendWait-foot">
            <div><img src="../../assets/waitFriendClock.png" alt=""></div>
            <p>{{content}}</p>
        </div>
        <div v-show="isShowBox" class="friendWait-box">
            <div class="friendWait-boxAgain" @click="stop">
                <p>好友已加入，选择退出则不退还金币，确认退出？</p>
                <div style="border:0.02rem solid #F2F2F2;"></div>
                <div class="friendWait-boxAgainInner">
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
            content:'已加入挑战 等待好友开启游戏....',
            emeymobile:'等待好友',

            enemyMoile:'',
            enemyMoileFull:'',
            role:'',
            mobile:'',
            entryCode:'',
            quesNum:'',
            fightId:'',
            token:'',
            imei:'',
            clock:null,
            isShowBox:false,
        }
    },
    created(){

        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        window.sessionStorage.setItem("token",this.token);
        window.sessionStorage.setItem("imei",this.imei);

        this.mobile = APP.GetLocationParams("mobile").substring(0,3)+"****"+APP.GetLocationParams("mobile").substring(7,11); // 我方号码
        this.enemyMoile = APP.GetLocationParams("enemyMoile").substring(0,3)+"****"+APP.GetLocationParams("enemyMoile").substring(7,11);// 对方号码
        this.enemyMoileFull = APP.GetLocationParams("enemyMoile");// 对方号码
        this.role = APP.GetLocationParams("role");
        this.quesTotal = APP.GetLocationParams("quesNum");
        this.fightId = APP.GetLocationParams("fightId");
        this.entryCode =  APP.GetLocationParams("entryCode");
        this.friendWaittart();
        this.enemyimg = APP.GetLocationParams("enemyimg");
        this.img = APP.GetLocationParams("img");
        // window.sessionStorage.setItem("enemyimg",this.enemyimg);
        // window.sessionStorage.setItem("img",this.img);
    },
    destroyed() {
        clearInterval(this.clock);
        this.clock = null;
    },
    mounted(){
        window.back = this.back
    },
    methods:{
        friendWaittart(){
            let time = 0;
            this.clock = window.setInterval(() => {
                 time++;
                if(time%2 == 0){
                    let parameterData = {
                        token:window.sessionStorage.getItem("token"),
                        imei:window.sessionStorage.getItem("imei"),
                        entryCode:this.entryCode
                    }
                    this.$get('/api/mFightingInfo/getStart',parameterData).then(res => {
                        if((res.statusCode+"").startsWith("2")){
                            if(res.data==1){
                                clearInterval(this.clock);
                                this.beginFright();
                            }
                        }
                    });
                    }
            },1000)
        },
        beginFright(){
          window.location.href = "/startAgainst.html?enemyMoile="+this.enemyMoileFull+'&role='+this.role+
                                '&mobile='+this.mobile+'&entryCode='+this.entryCode+'&quesNum='+ this.quesTotal+
                                '&fightId='+this.fightId+'&img='+this.img+'&enemyimg='+this.enemyimg;

            // this.$router.push({
            //     path:'/startAgainst',
            //     query:{
            //         enemyMoile:this.enemyMoileFull,
            //         role:this.role,
            //         mobile:this.mobile,
            //         entryCode:this.entryCode,
            //         quesNum:this.quesTotal,
            //         fightId:this.fightId,
            //         img:this.img,
            //         enemyimg:this.enemyimg,
            //     }
            // });
        },
        stop(){
            event.stopPropagation()
        },
        //选择返回 退出游戏
        back(){
            this.isShowBox = true
        },
        //继续等待
        returnSelfPage(){
            this.isShowBox = false
        },
        returnAgainst(){
            window.android.over();
            this.cancelRoom()
        },
        cancelRoom(){
            let parameterData = {
                token:window.sessionStorage.getItem("token"),
                imei:window.sessionStorage.getItem("imei"),
                entryCode:this.entryCode
            }
            this.$get('/api/mFightingInfo/cancelRoom',parameterData).then(res => {
            });
        },
    }
}
</script>

<style scoped>
/* 背景 */
.friendWait-bg{
    background-image: url('../../assets/againstBg.png');
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    width: 100%;
}
/* 返回头 */
.friendWait-head{
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.friendWait-head img{
    width: 0.5rem;
    height: 0.8rem;
    position: absolute;
    left: 0.75rem;
}
.friendWait-head p{
    font-size: 0.9rem;
    color: #fff;
}
/* vs对战 */
.friendWait-content{
    display: flex;
    justify-content: space-between;
}
/* 左边 */
.friendWait-left p{
    font-size: 0.6rem;
    color: #fff;
    margin-left: 0.8rem;
}
.friendWait-leftInner img{
    width: 7.4rem;
    height: 2.8rem;
    position: absolute;
    top: 4.4rem;
}
.friendWait-leftInner div{
    width: 2.2rem;
    height: 2.2rem;
    background-color: #D8D8D8;
    border-radius: 50%;
    border: 0.05rem solid #fff;
    position: absolute;
    top: 4.65rem;
    left: 0.9rem;
}
.friendWait-leftInner p{
    font-size: 1.2rem;
    font-weight: 500;
    position: absolute;
    top: 3.8rem;
    left: 3.5rem;
}
/* vs */
.friendWait-vs img{
    width: 2.65rem;
    height: 3.6rem;
    /* margin-top: 2.35rem; */
    position: absolute;
    top: 5rem;
    left: 7.5rem;
}
/* 右边 */
.friendWait-right p{
    font-size: 0.6rem;
    color: #fff;
    margin: 1.95rem 0 0.6rem 3rem;
}
.friendWait-rightInner img{
    width: 7.4rem;
    height: 2.8rem;
}
.friendWait-rightInner div{
    width: 2.2rem;
    height: 2.2rem;
    background-color: #D8D8D8;
    border-radius: 50%;
    border: 0.05rem solid #fff;
    position: absolute;
    top: 5.8rem;
    right: 0.9rem;
}
.friendWait-rightInner p{
    font-size: 1.2rem;
    font-weight: 500;
    position: absolute;
    top: 4.3rem;
    right: 4.5rem;
}
/* 答题内容 */
.friendWait-foot{
    width: 15.6rem;
    height: 17.4rem;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 0.3rem;
    text-align: center;
    margin-top: 1.4rem;
    padding-top: 0.8rem;
}
.friendWait-foot div:nth-of-type(1){
    width: 2.8rem;
    height: 2.8rem;
    line-height: 2.8rem;
    border: 0.2rem solid #5B64FF;
    border-radius: 50%;
    margin: 0 auto;
}
.friendWait-foot div:nth-of-type(1) img{
    width: 1.4rem;
    height: 1.5rem;
    margin-top: 0.65rem;
}
.friendWait-foot p{
    font-size: 1.2rem;
    color: #3C3E5B;
    font-weight: 600;
    margin-top: 2rem;
}

/* 邀请弹窗 */
.friendWait-box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
}
.friendWait-boxInner{
    position: fixed;
    background-color: #fff;
    bottom: 0;
    width: 100%;
    height: 8.1rem;
    border-radius: 0.4rem 0.4rem 0 0;
}
.friendWait-boxInner p{
    font-size: 0.7rem;
    color: #3C3E5B;
    text-align: center;
    margin-top: 0.8rem;
}
.friendWait-boxInnerGroup{
    display: flex;
    justify-content: space-around;
}
.friendWait-boxInnerGroup img{
    width: 2.4rem;
    height: 2.4rem;
    margin-top: 0.9rem;
}
.friendWait-boxInnerGroup p{
    margin-top: 0.4rem;
}
/* 提示弹框 */
.friendWait-boxAgain{
    position: fixed;
    background-color: #fff;
    width: 14.8rem;
    height: 6.25rem;
    top: 12.45rem;
    left: 1.6rem;
    border-radius: 0.4rem
}
.friendWait-boxAgain{
    font-size: 0.7rem;
    color: #3C3E5B;
}
.friendWait-boxAgain p{
    padding: 0 1.3rem;
    margin-top: 1.2rem;
}
.friendWait-boxAgain .friendWait-boxAgainInner{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.friendWait-boxAgainInner span{
    border: 0.04rem solid #F2F2F2;
    height: 2.2rem;
    margin-top: 0.1rem;
}
.friendWait-boxAgainInner div:nth-of-type(1){
    color: #9EA9BC;
}
.friendWaitImg img{
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    /* border: 0.05rem solid #fff; */
    position: absolute;
    top: 0rem;
    left: 0rem;
}
.friendWaitRightImg img{
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    /* border: 0.05rem solid #fff; */
    position: absolute;
    top: 0rem;
    right: 0rem;
}
</style>
