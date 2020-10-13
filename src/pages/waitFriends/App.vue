<template>
    <div id="app" class="waitFriends-bg">
        <div class="waitFriends-head">
            <img src="../../assets/enlighteningRight.png" @click="back"/>
            <p>对战答题</p>
        </div>
        <div class="waitFriends-content">
            <div class="waitFriends-left">
                <p>{{mobile}}</p>
                <div class="waitFriends-leftInner">
                    <img src="../../assets/startAgainstLeft.png" alt="">
                    <div class="waitFriendsImg"><img :src="img" alt=""></div>
                    <p>0</p>
                </div>
            </div>
            <div class="waitFriends-vs"><img src="../../assets/vs.png" alt=""></div>
            <div class="waitFriends-right">
                <p style="position: absolute;right: 0.8rem;">{{emeymobile}}</p>
                <div class="waitFriends-rightInner">
                    <img src="../../assets/startAgainstRight.png" alt="">
                    <div class="waitFriendsRightImg"><img :src="enemyimg" alt=""></div>
                    <p>0</p>
                </div>
            </div>
        </div>
        <div class="waitFriends-foot">
            <div><img src="../../assets/waitFriendClock.png" alt=""></div>
            <p>{{content}}</p>
            <p style="margin:0;font-size:0.7rem;font-weight:normal;color: #3C3E5B;">房间号：{{entryCode}}</p>
            <div>
                <img src="../../assets/waitFriendBtn.png" alt=""  @click="openRecruitBox" v-if="inviteShow">
                <img src="../../assets/againstBtn.png" alt="" @click="beginFright" v-else>
            </div>
        </div>
        <div v-show="isShowBox" class="waitFriends-box">
            <div class="waitFriends-boxAgain" @click="stop">
                <p>等待好友加入中，选择解散则好友无法进入，确认解散？</p>
                <div style="border:0.02rem solid #F2F2F2;"></div>
                <div class="waitFriends-boxAgainInner">
                    <div @click="returnSelfPage">继续等待</div>
                    <span></span>
                    <div @click="returnAgainst">确认解散</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isShow:false,
            isShowBox:false,
            content:'等待好友的加入...',
            emeymobile:'等待好友',
            inviteShow:true,

            enemyMoile:'',
            enemyMoileFull:'',
            role:'',
            mobile:'',
            mobileFull:'',
            entryCode:'',
            quesNum:'',
            fightId:'',
            clock:null,
            enemyimg:'',
            img:''
        }
    },
    created(){
        this.mobile = APP.GetLocationParams('mobile').substring(0,3)+"****"+APP.GetLocationParams('mobile').substring(7,11); // 我方号码
        this.mobileFull = APP.GetLocationParams('mobileFull');
        this.entryCode = APP.GetLocationParams('entryCode');
        this.waitFriend();
        this.enemyimg = APP.GetLocationParams('enemyimg');
        this.img = APP.GetLocationParams('img');
    },
    mounted(){
        window.back = this.back
    },
    destroyed() {
        clearInterval(this.clock);
        this.clock = null;
    },
    methods:{
        openRecruitBox(){
            window.android.inviteFriend('https://web.shouzhuan518.com/#/InvitationCode?mobile='+this.mobile+'&entryCode='+this.entryCode);
        },
        stop(){
            event.stopPropagation()
        },
        waitFriend(){
            let time = 1;
            this.clock = window.setInterval(() => {
                time++;
                if(time%2 == 0){
                    let parameterData = {
                        token:window.sessionStorage.getItem("token"),
                        imei:window.sessionStorage.getItem("imei"),
                        entryCode:this.entryCode
                    }
                    this.$get('/api/mFightingInfo/seeRoom',parameterData).then(res => {
                        if((res.statusCode+"").startsWith("2")){
                            if(res.data.res==1){
                                clearInterval(this.clock);
                                this.inviteShow = false;
                                this.content='好友已加入，请开始挑战吧！';
                                this.enemyMoileFull=res.data.enemyMoile,
                                this.enemyMoile = this.enemyMoileFull.substring(0,3)+"****"+this.enemyMoileFull.substring(7,11);// 对方号码
                                this.role=res.data.role,
                                this.entryCode=res.data.entryCode,
                                this.quesNum=res.data.quesNum,
                                this.fightId=res.data.fightId,
                                this.img=this.img,
                                this.enemyimg=res.data.enemyImg
                            }
                            if(res.data.res==3){
                                window.location.href = '/againstTheProblemSolving.html'
                                // this.$router.push({
                                //     path:'/againstTheProblemSolving'
                                // })
                            }
                        }
                    });
                }
            },1000)

        },
        beginFright(){
            let parameterData = {
                token:window.sessionStorage.getItem("token"),
                imei:window.sessionStorage.getItem("imei"),
                entryCode:this.entryCode
            }
            this.$get('/api/mFightingInfo/startFighting',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    if(res.data==1){
                        window.location.href = '/startAgainst.html?enemyimg='+this.enemyimg+'&img='+this.img+'&enemyMoile='+this.enemyMoileFull+'&role='+this.role+'&mobile='+this.mobile+'&entryCode='+this.entryCode+'&quesNum='+this.quesNum+'&fightId='+this.fightId
                        // this.$router.push({
                        //     path:'/startAgainst',
                        //     query:{
                        //         enemyimg:this.enemyimg,
                        //         img:this.img,
                        //         enemyMoile:this.enemyMoileFull,
                        //         role:this.role,
                        //         mobile:this.mobileFull,
                        //         entryCode:this.entryCode,
                        //         quesNum:this.quesNum,
                        //         fightId:this.fightId
                        //     }
                        // });
                    }
                }
            });
        },
        back(){
            this.isShowBox = true
        },
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
.waitFriends-bg{
    background-image: url('../../assets/againstBg.png');
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    width: 100%;
}
.waitFriends-head{
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.waitFriends-head img{
    width: 0.5rem;
    height: 0.8rem;
    position: absolute;
    left: 0.75rem;
}
.waitFriends-head p{
    font-size: 0.9rem;
    color: #fff;
}
.waitFriends-content{
    display: flex;
    justify-content: space-between;
}
.waitFriends-left p{
    font-size: 0.6rem;
    color: #fff;
    margin-left: 0.8rem;
}
.waitFriends-leftInner img:nth-of-type(1){
    width: 7.4rem;
    height: 2.8rem;
    position: absolute;
    top: 4.2rem;
}
.waitFriends-leftInner .waitFriendsImg img{
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: 0.05rem solid #fff;
    position: absolute;
    top: 4.4rem;
    left: 0.9rem;
}
.waitFriends-leftInner p{
    font-size: 1.2rem;
    font-weight: 500;
    position: absolute;
    top: 3.6rem;
    left: 3.5rem;
}
.waitFriends-vs img{
    width: 2.65rem;
    height: 3.6rem;
    position: absolute;
    top: 5rem;
    left: 7.5rem;
}
.waitFriends-right p{
    font-size: 0.6rem;
    color: #fff;
    margin: 1.95rem 0 0.6rem 3rem;
}
.waitFriends-rightInner img:nth-of-type(1){
    width: 7.4rem;
    height: 2.8rem;
    position: absolute;
    top: 5.45rem;
    right: 0rem;
}
.waitFriends-rightInner .waitFriendsRightImg img{
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: 0.05rem solid #fff;
    position: absolute;
    top: 5.7rem;
    right: 0.9rem;
}
.waitFriends-rightInner p{
    font-size: 1.2rem;
    font-weight: 500;
    position: absolute;
    top: 4.2rem;
    right: 4.5rem;
}
.waitFriends-foot{
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
.waitFriends-foot div:nth-of-type(1){
    width: 2.8rem;
    height: 2.8rem;
    line-height: 2.8rem;
    border: 0.2rem solid #5B64FF;
    border-radius: 50%;
    margin: 0 auto;
}
.waitFriends-foot div:nth-of-type(1) img{
    width: 1.4rem;
    height: 1.5rem;
    margin-top: 0.65rem;
}
.waitFriends-foot p{
    font-size: 1.2rem;
    color: #3C3E5B;
    font-weight: 600;
    margin-top: 2rem;
}
.waitFriends-foot div:nth-of-type(2) img{
    width: 13.2rem;
    margin-top: 3.2rem;
}
.waitFriends-box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
}
.waitFriends-boxInner{
    position: fixed;
    background-color: #fff;
    bottom: 0;
    width: 100%;
    height: 8.1rem;
    border-radius: 0.4rem 0.4rem 0 0;
}
.waitFriends-boxInner p{
    font-size: 0.7rem;
    color: #3C3E5B;
    text-align: center;
    margin-top: 0.8rem;
}
.waitFriends-boxInnerGroup{
    display: flex;
    justify-content: space-around;
}
.waitFriends-boxInnerGroup img{
    width: 2.4rem;
    height: 2.4rem;
    margin-top: 0.9rem;
}
.waitFriends-boxInnerGroup p{
    margin-top: 0.4rem;
}
.waitFriends-boxAgain{
    position: fixed;
    background-color: #fff;
    width: 14.8rem;
    height: 6.25rem;
    top: 12.45rem;
    left: 1.6rem;
    border-radius: 0.4rem
}
.waitFriends-boxAgain{
    font-size: 0.7rem;
    color: #3C3E5B;
}
.waitFriends-boxAgain p{
    padding: 0 1.3rem;
    margin-top: 1.2rem;
}
.waitFriends-boxAgain .waitFriends-boxAgainInner{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.waitFriends-boxAgainInner span{
    border: 0.04rem solid #F2F2F2;
    height: 2.2rem;
    margin-top: 0.1rem;
}
.waitFriends-boxAgainInner div:nth-of-type(1){
    color: #9EA9BC;
}
</style>
