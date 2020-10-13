<template>
    <div id="app" style="overflow: auto;">
        <div class="against-bg">
            <div class="against-head">
                <img src="../../assets/enlighteningRight.png" @click="back"/>
                <p>对战答题</p>
            </div>
            <div class="against-pic"><img src="../../assets/againstPhoto.png"/></div>
            <div class="against-content">
                <p>500-5000金币入场</p>
                <div><input type="text" v-model="input" style="border: none;background-color: inherit;outline:none;" autofocus="autofocus"></div>
                <p>我的账户：{{coin}}金币</p>
                <div>
                    <img src="../../assets/againstBtn.png" alt="" @click="partakeAnswer" v-if="submitShow">
                    <img src="../../assets/submit.png" alt="" @click="inviteFriend" v-else>
                </div>
                <div>1、系统匹配一位用户进行对战。<br/>
                    2、每次参与答题最低花费500金币。<br/>
                    3、获胜方赠送双倍金币；失败方扣除报名的金币。<br/>
                    4、账户金币低于参与答题金币时，不可参与答题。</div>
            </div>

        </div>
        <!-- 对战次数用完 -->
        <!-- <div class="time-finish" v-show="isShow">
            <div class="time-finishInner" @click="stop">
                <p>当日答题次数已满，明天再来啊</p>
                <div style="border:0.02rem solid #F2F2F2;"></div>
                <div @click="closeTimeFinish">我知道了</div>
            </div>
        </div> -->
        <!-- 金币不够 -->
        <div  class="time-finish" v-show="coinNotEnoughBut">
            <div class="money-inner" @click="stop">
                <h2>金币不足</h2>
                <p>本次答题，最少需要500金币，你可通过其他游戏赚取金币</p>
                <div style="border:0.02rem solid #F2F2F2;"></div>
                <div class="money-btn">
                    <p @click="coinNotEnough">我知道了</p>
                    <!-- <p>赚金币</p> -->
                </div>
            </div>
        </div>
        <div  class="time-finish" v-show="coinNotRightBtn">
            <div class="money-inner" @click="stop">
                <h2>金币数量不足或过多</h2>
                <p>本次答题，金币最低500，最高5000</p>
                <div style="border:0.02rem solid #F2F2F2;"></div>
                <div class="money-btn">
                    <p @click="coinNotRight">我知道了</p>
                    <!-- <p>赚金币</p> -->
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
            input:'',
            token:'',
            imei:'',
            img:'',
            coin:0,
            fightingType:1, // 对战类型1好友对战 2 随机匹配
            submitShow:true,
            coinNotEnoughBut:false,
            coinNotRightBtn:false
        }
    },
    created(){
        this.token =APP.GetLocationParams("token");
        this.imei=APP.GetLocationParams("imei");
        if(this.token == null){
           this.token = window.sessionStorage.getItem("token");
        }else{
            window.sessionStorage.setItem("token",this.token);
        }
        if(this.imei == null){
           this.imei = window.sessionStorage.getItem("imei");
        }else{
            window.sessionStorage.setItem("imei",this.imei);
        }
        this.fightingType = APP.GetLocationParams("fightingType");
        if(this.fightingType == 1){
            this.submitShow = false;
        }
        window.sessionStorage.setItem("fightingType",this.fightingType);
        this.getCoin()
    },
    mounted(){
    //   $("input").trigger("click").focus()
        window.back = this.back
    },
    methods:{
       partakeAnswer(){
            if(parseInt(this.input) < parseInt(500) || parseInt(this.input) > parseInt(5000)){
                this.coinNotRight();
                return;
            }
            if(parseInt(this.input) > parseInt(this.coin)){
                this.coinNotEnough();
                return;
            }
            let parameterData = {
                token:this.token,
                imei:this.imei,
                coin:this.input
            }
            this.$get('/api/mFightingInfo/partakeAnswer',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    // this.$router.push({
                    //     path: '/againstWait'
                    // })
                    window.location.href = '/againstWait.html'
                }
            })
        },
        inviteFriend(){
            if(parseInt(this.input) < parseInt(500) || parseInt(this.input) > parseInt(5000)){
                this.coinNotRight();
                return;
            }
            if(parseInt(this.input) > parseInt(this.coin)){
                this.coinNotEnough();
                return;
            }
            let parameterData = {
                token:this.token,
                imei:this.imei,
                initiatorCoin:this.input,
                img:this.img
            }

            this.$get('/api/mFightingInfo/foundRoom',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    let mobile = res.data.mobile;
                    let entryCode = res.data.entryCode;
                    let img = res.data.img;
                    // console.log("http://localhost:8080/#/InvitationCode?mobile="+mobile+"&entryCode="+entryCode);
                    window.location.href ='/waitFriends.html?mobile='+mobile+'&entryCode='+entryCode+'&img='+img
                    // this.$router.push({
                    //     path: '/waitFriends',
                    //     query:{
                    //        mobile:mobile,
                    //        entryCode:entryCode,
                    //        img:img,
                    //     }
                    // })
                }
            })
        },
        back(){
          window.android.over();
        },
        // 对战次数用完弹框
        // closeTimeFinish(){
        //     this.isShow = false
        // },
        // 金币不足
        coinNotEnough(){
            if(this.coinNotEnoughBut ){
                this.coinNotEnoughBut = false
            }else{
                this.coinNotEnoughBut = true;
            }
        },  // 金币不足
        coinNotRight(){
            if(this.coinNotRightBtn){
                this.coinNotRightBtn = false;
            }else{
                this.coinNotRightBtn = true;
            }
        },
        // 阻止事件冒泡
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
        }
    }
}
</script>

<style scoped>
/* 背景 */
.against-bg{
    background-image: url('../../assets/againstBg.png');
    background-size: 100% 100%;
    height: 100%;
    position: fixed; /*苹果不兼容*/
    width: 100%;
}
/* 返回头 */
.against-head{
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.against-head img{
    width: 0.5rem;
    height: 0.8rem;
    position: absolute;
    left: 0.75rem;
}
.against-head p{
    font-size: 0.9rem;
    color: #fff;
}
/* 黄色小图标 */
.against-pic{
    text-align: center;
    margin-top: 2.05rem;
}
.against-pic img{
    width: 4.4rem;
    height: 4.4rem;
}
/* 内容 */
.against-content{
    width: 15.6rem;
    height: 20.95rem;
    background-color: #fff;
    border-radius: 0.4rem;
    margin: -3.5rem auto 0 auto;
    text-align: center;
}
.against-content p{
    margin: 0;
}
.against-content p:nth-of-type(1){
    font-size: 0.7rem;
    color: #9EA9BC;
    padding: 4.4rem 0 0.4rem 0;
}
.against-content div:nth-of-type(1){
    width: 11.6rem;
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #EAEDF2;
    margin: 0 auto;
    border-radius: 0.3rem;
    font-size: 0.8rem;
    color: #3C3E5B;
    font-weight: 600;
}
.against-content p:nth-of-type(2){
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: 0.4rem 0 0.8rem 0;
}
.against-content img{
    width: 13.2rem;
    height: 2.2rem;
}
.against-content div:nth-of-type(3){
    font-size: 0.7rem;
    color: #9EA9BC;
    text-align: left;
    margin: 1rem 1.2rem 0 1.2rem;
}
/* 对战次数用完 */
.time-finish{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.6);
}
.time-finishInner{
    position: fixed;
    top: 12.45rem;
    left: 1.6rem;
    background-color: #fff;
    width: 14.8rem;
    height: 5.65rem;
    border-radius: 0.4rem;
    text-align: center;
}
.time-finishInner p{
    font-size: 0.7rem;
    color: #3C3E5B;
    margin: 1.2rem 0 1.2rem 0;
}
.time-finishInner div:nth-of-type(2){
    width: 4.8rem;
    font-size: 0.7rem;
    color: #9EA9BC;
    height: 1.5rem;
    margin: 0.45rem auto 0 auto;
}
/* 金币用完 */
.money-inner{
    position: fixed;
    background-color: #fff;
    top: 12.45rem;
    left: 1.6rem;
    border-radius: 0.4rem;
    text-align: center;
    width: 14.8rem;
    /* height: 5.65rem; */
}
.money-inner h2{
    font-size: 0.8rem;
    color: #3C3E5B;
}
.money-inner p{
    font-size: 0.7rem;
    color: #9EA9BC;
    padding: 0 0.8rem;
    text-align: left;
    line-height: 1rem;
}
.money-btn{
    display: flex;
    justify-content: space-around;
}
.money-btn p:nth-of-type(2){
    color: #F3572A;
}
</style>

