<template>
    <div id="app" style="background: #F2F5F8;overflow: auto;height:100vh">
        <!-- 返回 -->
        <div class="gd_back">
            <img src="../../assets/right.png" @click="backTap"/>
            <p>邀请明细</p>
        </div>
        <div style="background-color:#fff;padding-left: 0.9rem;">
            <div class="gd_top">
                <div class="gd_top_font">
                    <p>我的团队总收益</p>
                </div>
                <div class="gd_top_money">
                    <p>{{listData.teamBenefit}}</p>
                    <img src="../../assets/jinbi.png" alt="">
                </div>
            </div>
        </div>
        <!-- <div style="background-color:#1B2233;height:1rem"></div> -->

        <div class="gd_center" v-if="listData.isiIndirectProfit==1">
            <p>额外分成:<span>{{listData.additionalProfit}}</span></p>
            <img src="../../assets/jinbi.png" alt="">
        </div>
        <!-- <div style="background-color:#F2F5F8">
            <div class="gd_bottom">
                <div class="gd_bottom_title"><p>直属运营总监</p></div>
                <div class="gd_bottom_conten">
                    <div class="gd_bottom_left">
                        <p>人数</p>
                        <p>{{listData.directPeopleNum}}</p>
                    </div>
                    <div class="gd_bottom_right">
                        <p style="margin: 0.75rem 0 0.3rem 0;">收益</p>
                        <div class="gd_bottom_right_inner">
                            <p>{{listData.directProfit}}</p>
                            <img src="../../assets/jinbi.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- <div style="background-color:#F2F5F8">
            <div class="gd_bottom">
                <div class="gd_bottom_title"><p>间推运营总监</p></div>
                <div class="gd_bottom_conten">
                    <div class="gd_bottom_left">
                        <p>人数</p>
                        <p>{{listData.indirectPeopleNum}}</p>
                    </div>
                    <div class="gd_bottom_right">
                        <p style="margin: 0.75rem 0 0.3rem 0;">收益</p>
                        <div class="gd_bottom_right_inner">
                            <p>{{listData.indirectProfit}}</p>
                            <img src="../../assets/jinbi.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div> -->


        <div style="background-color:#F2F5F8" @click="openID">
            <div class="gd_bottom">
                <div class="gd_bottom_title_last">
                    <p style="margin-left:7rem">团队详情</p>
                    <div class="gd_font">
                        <p>详情</p>
                        <img src="../../assets/rightBtn.png" alt="">
                    </div>
                </div>
                <div class="gd_bottom_conten">
                    <div class="gd_bottom_left">
                        <p>人数</p>
                        <p>{{listData.drPeopleNum}}</p>
                    </div>
                    <div class="gd_bottom_right">
                        <p style="margin: 0.75rem 0 0.3rem 0;">收益</p>
                        <div class="gd_bottom_right_inner">
                            <p>{{listData.drReward}}</p>
                            <img src="../../assets/jinbi.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div style="background-color:#F2F5F8" @click="openPD">
            <div class="gd_bottom">
                <div class="gd_bottom_title_last">
                    <p style="margin-left:6rem">合伙人、小客服</p>
                    <div class="gd_font">
                        <p>详情</p>
                        <img src="../../assets/rightBtn.png" alt="">
                    </div>
                </div>
                <div class="gd_bottom_conten">
                    <div class="gd_bottom_left">
                        <p>人数</p>
                        <p>{{listData.highVipCount}}</p>
                    </div>
                    <div class="gd_bottom_right">
                        <p style="margin: 0.75rem 0 0.3rem 0;">收益</p>
                        <div class="gd_bottom_right_inner">
                            <p>{{listData.highVipAmount}}</p>
                            <img src="../../assets/jinbi.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div> -->


        <!-- <div style="background-color:#F2F5F8" @click="openPage">
            <div class="gd_bottom">
                <div class="gd_bottom_title_last">
                    <p style="margin-left:6.1rem">普通行为贡献</p>
                    <div class="gd_font">
                        <p>详情</p>
                        <img src="../../assets/rightBtn.png" alt="">
                    </div>
                </div>
                <div class="gd_bottom_conten">
                    <div class="gd_bottom_left">
                        <p>人数<span>(含达人、合伙人)</span></p>
                        <p>{{listData.ordinaryPeopleNum}}</p>
                    </div>
                    <div class="gd_bottom_right">
                        <p style="margin: 0.75rem 0 0.3rem 0;">收益</p>
                        <div class="gd_bottom_right_inner">
                            <p>{{listData.ordinaryProfit}}</p>
                            <img src="../../assets/jinbi.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div style="height:2rem"></div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            listData:{
                teamBenefit:'1',
                additionalProfit:'2',
                directPeopleNum:'3',
                directProfit:'4',
                indirectPeopleNum:'5',
                indirectProfit:'6',
                ordinaryPeopleNum:'7',
                ordinaryProfit:'8',
                drPeopleNum:'9',
                drReward:'10',
                highVipCount:'11',
                highVipAmount:'12'
            },
            reward:'13'
        }
    },
    created(){
        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        this.qrCode=APP.GetLocationParams("qrCode");
        this.getInfo()
    },
    methods:{
        backTap(){
            window.location.href = '/enlighteningToMakeMoney.html?token='+this.token+'&imei='+this.imei+'&qrCode='+this.qrCode;
            // self.location=document.referrer;
        },
        getInfo(){
            let parameterData = {
                token:this.token,
                imei:this.imei
            }
            this.$get('/py/partner/reward_detail',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data;
                    this.reward = res.data.reward;
                }
            })
        },
        openID(){
            window.location.href = '/InviteDetail.html?token='+this.token+'&imei='+this.imei+'&drPeopleNum='+this.listData.drPeopleNum+'&drReward='+this.listData.drReward;
        },
        openPage(){
            window.location.href = '/myReward.html?token='+this.token+'&imei='+this.imei+'&reward='+this.reward;
        },
        openPD(){
            window.location.href = '/partnerDetails.html?token='+this.token+'&imei='+this.imei;
        }
    }
}
</script>

<style scoped>
p{
    margin: 0;
}
.gd_back{
    background-color: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 2.2rem;
    color: #434561;
    font-size: 0.9rem;
}
.gd_back img{
    width: 0.5rem;
    margin-left: 0.75rem;
    height: 0.8rem;
}
.gd_back p{
    margin-left: 6.5rem;
    font-size: 0.75rem;
}
.gd_top{
    width: 16.1rem;
    height: 5.1rem;
    margin-top: 2.2rem;
    background-image: url('../../assets/gdbg.png');
    background-size: cover;
    background-position: center center;
    border-radius:0.8rem;
}
.gd_top_font p{
    font-size: 0.6rem;
    color: #fff;
    margin-left: 1.2rem;
    padding-top: 1.2rem;
}
.gd_top_money{
    display: flex;
    align-items: baseline;
}
.gd_top_money p{
    font-size: 1.2rem;
    color: #fff;
    margin: 0.5rem 0.2rem 0 1.2rem;
    font-weight: bold;
}
.gd_top_money img{
    width: 0.8rem;
    height: 0.8rem;
}
.gd_center{
    background-color: #FFFBDF;
    display: flex;
    align-items: center;
    padding: 0.3rem 0;
    justify-content: center;
}
.gd_center p{
    color: #F49E22;
    font-size: 0.6rem;
}
.gd_center span{
    color: #EA4543;
}
.gd_center img{
    width: 0.65rem;
    height: 0.65rem;
    margin-left: 0.2rem;
}
.gd_bottom{
    width: 16.4rem;
    margin: 0.6rem auto 0 auto;
}
.gd_bottom_title{
    height: 1.6rem;
    line-height: 1.6rem;
    background-color: #FE6D5F;
    color: #fff;
    font-size: 0.65rem;
    text-align: center;
    border-radius: 0.4rem 0.4rem 0 0;
}
.gd_bottom_title_last{
    height: 1.6rem;
    line-height: 1.6rem;
    background-color: #FE6D5F;
    color: #fff;
    font-size: 0.7rem;
    text-align: center;
    border-radius: 0.4rem 0.4rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.gd_bottom_title_last div{
    display: flex;
    align-items: center;
    /* margin-left: 4.5rem; */
}
.gd_bottom_conten{
    display: flex;
    justify-content: space-around;
    background-color: #FFF;
    border-radius: 0 0 0.3rem 0.3rem;
    text-align: center;
}
.gd_bottom_left{
    width: 7.5rem;
}
.gd_bottom_right{
    width: 7.5rem;
}
.gd_bottom_left p:nth-of-type(1){
    font-size: 0.65rem;
    color: #3C3E5B;
    margin: 0.75rem 0 0.3rem 0;
}
.gd_bottom_left p:nth-of-type(2){
    font-size: 0.9rem;
    color: #EA4543;
    margin-bottom: 0.8rem;
}
.gd_bottom_left span{
    font-size: 0.5rem;
    color: #EA4543;
}
.gd_bottom_right  p{
    font-size: 0.65rem;
    color: #3C3E5B;
}
.gd_bottom_right_inner{
    display: flex;
    align-items: baseline;
    justify-content: center;
}
.gd_bottom_right_inner p{
    font-size: 0.9rem;
    color: #EA4543;
    margin-right: 0.2rem;
}
.gd_bottom_right_inner img{
    width: 0.7rem;
    height: 0.7rem;
}
.gd_font p{
    font-size: 0.6rem
}
.gd_font img{
    width: 0.4rem;
    margin: 0 0.4rem;
}
</style>
