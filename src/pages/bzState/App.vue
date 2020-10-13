<template>
    <div id="app" id="app" style="height: 100vh;background: #F64840;overflow: auto;position: relative;">
        <div class="bzs_head" @click="back">
            <img src="../../assets/enlighteningRight.png" />
            <p>宝猪天天送</p>
        </div>
        <div class="bzs_bg">
            <img src="../../assets/bzState/bzsbg.png" alt="">
        </div>
        <div class="bzs_block_one">
            <img src="../../assets/bzState/bgone.png" alt="">
        </div>
        <div class="bzs_block_imgs">
            <img src="../../assets/bzState/one.png" alt="">
            <img src="../../assets/bzState/two.png" alt="">
            <img src="../../assets/bzState/three.png" alt="">
            <img src="../../assets/bzState/four.png" alt="">
            <img src="../../assets/bzState/five.png" alt="">
            <img src="../../assets/bzState/six.png" alt="">
        </div>
        <div class="bzs_meiri">
            <img src="../../assets/bzState/meiri.png" alt="">
        </div>
        <div class="bzs_block_two">
            <div class="ranking_center">
                <div class="ranking_center_left">
                    <p>数据每小时更新一次</p>
                </div>
                <div class="ranking_center_right">
                    <!-- <img src="../../assets/refresh.png" alt="" :class="rotate ? 'go':'black'"> -->
                    <p @click="jump">查看历史数据</p>
                    <img src="../../assets/jiantou.png" alt="">
                </div>
            </div>
            <div class="ranking_bottom">
                <img src="../../assets/listBg.png" alt="">
            </div>
            <div class="table_title">
                <p style="margin-left:1.5rem;">用户</p>
                <p style="margin-left:1rem;">排名</p>
                <!-- <p style="margin-left:-0.5rem;">获得奖励</p> -->
                <p>累计赚取</p>
            </div>
            <div class="table_wrapper">
                <table style="background-color: #FFD9D7;">
                    <tbody>
                        <tr>
                            <td>
                                <img :src="my.imageUrl" alt="">
                                {{my.mobile}}
                            </td>
                            <td>{{my.rankOrder}}</td>
                            <td>{{my.coinBalance}}元</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody v-for="(item,index) in tableData">
                        <tr>
                            <td>
                                <img :src="item.imageUrl" alt="">
                                {{item.mobile}}
                            </td>
                            <td>{{item.rankOrder}}</td>
                            <!-- <td>{{item.num}}元</td> -->
                            <td>{{item.coinBalance}}元</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="bzs_huodong">
            <img src="../../assets/bzState/huodong.png" alt="">
        </div>
        <div class="bzs_block_three">
            <img src="../../assets/bzState/hdsj.png" alt="" style="margin-top:1.2rem;">
            <p><span>1、</span>每日(零点至23点59分59秒)当天统计发放一次奖励，至活动下线为止</p>
            <img src="../../assets/bzState/hdfw.png" alt="">
            <p><span>1、</span>试玩类奖励（含高额赚）</p>
            <img src="../../assets/bzState/jlsm.png" alt="">
            <p><span>1、</span>每日奖励一次冲榜前30名用户，每小时数据刷新一次；</p>
            <p><span>2、</span>累计赚取金额=试玩类奖励（含高额赚）；</p>
            <p><span>3、</span>奖励实际以金币形式发放；</p>
            <img src="../../assets/bzState/lqfs.png" alt="">
            <p style="margin-bottom:0.5rem;"><span>1、</span>每天活动奖励将于次日早上10点发放至宝猪乐园【账户中心】</p>
        </div>
        <div style="position: absolute;top: 63rem;">.</div>
        <div class="bzs_btn" @click="openRecruitBox">
            <img src="../../assets/bzState/btn.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData:{},
            historys:'',
            my:{}
        };
    },
    created(){
        this.token=APP.GetLocationParams("token");
        this.imei=APP.GetLocationParams("imei");
        this.getInfo()
    },
    methods: {
        getInfo(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                rankType:1
            }
            this.$get('/api/rankCoin/queryHisMy', parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    for(var i = 0;res.data.lRankCoins.length>i;i++){
                        res.data.lRankCoins[i].coinBalance = (res.data.lRankCoins[i].coinBalance / 10000).toFixed(2);
                    }
                    res.data.my.coinBalance = (res.data.my.coinBalance / 10000).toFixed(2);
                    this.tableData = res.data.lRankCoins;
                    this.historys = res.data.historys;
                    this.my = res.data.my;
                    if(res.data.my.rankOrder>30){
                        res.data.my.rankOrder = '未上榜';
                    }
                }
            });
        },
        jump(){
            if(this.historys == null || this.historys == 'null'){
                return;
            }else{
                window.location.href = '/historyData.html?historys='+this.historys;
            }
        },
        openRecruitBox(){
            let parameterData={
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/tpTaskInfo/getConductTask',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    if(res.data.isGame == 1){
                        if(this.isAndroid()){
                            window.android.togame();
                        }else if(this.isIos()){
                            window.gamesAction();
                        }
                    }else{}
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
};
</script>

<style scoped>
p{
    padding: 0;
    margin: 0;
}
.bzs_head{
    width: 100%;
    height: 2.2rem;
    background-color: #F64840;
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
}
.bzs_head img{
    height: 0.8rem;
    position: absolute;
    top: 0.7rem;
    left: 0.75rem;
}
.bzs_head p{
    color: #fff;
    font-size: 0.9rem;
    position: absolute;
    top: 0.45rem;
    left: 7.2rem;
}
.bzs_bg img{
    position: absolute;
    top: -1.2rem;
    width: 18rem;
}
.bzs_block_one img{
    position: absolute;
    top: 12.1rem;
    left: 0.8rem;
    width: 16.4rem;
}
.bzs_block_imgs img:nth-of-type(1){
    width: 14rem;
    position: absolute;
    top: 13rem;
    left: 2rem;
}
.bzs_block_imgs img:nth-of-type(2){
    position: absolute;
    top: 17.3rem;
    left: 2rem;
    width: 6.7rem;
    display: flex;
}
.bzs_block_imgs img:nth-of-type(3){
    position: absolute;
    top: 17.3rem;
    left: 9.2rem;
    width: 6.7rem;
    display: flex;
}
.bzs_block_imgs img:nth-of-type(4){
    position: absolute;
    top: 21.6rem;
    left: 2rem;
    width: 4.2rem;
    display: flex;
}
.bzs_block_imgs img:nth-of-type(5){
    position: absolute;
    top: 21.6rem;
    left: 6.8rem;
    width: 4.2rem;
    display: flex;
}
.bzs_block_imgs img:nth-of-type(6){
    position: absolute;
    top: 21.6rem;
    left: 11.6rem;
    width: 4.2rem;
    display: flex;
}
.bzs_meiri img{
    width: 6.6rem;
    position: absolute;
    top: 28.1rem;
    left: 5.7rem;
    z-index: 100;
}
.bzs_block_two{
    width: 16.4rem;
    background-color: #FCF5E2;
    position: absolute;
    top: 28.6rem;
    left: 0.8rem;
    border-radius: 0.4rem;
    height: 14.8rem;
    overflow: auto;
}
.ranking_center{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.2rem;
    margin-top: 1.2rem;
}
.ranking_center_left{
    display: flex;
    align-items: center;
}
.ranking_center_left p{
    font-size: 0.6rem;
    color: #F64840;
    margin: 0 0.2rem 0 0;
}
.ranking_center_right{
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    display: flex;
    align-items: center;
    padding: 0.1rem 0.45rem;
}
.ranking_center_right p{
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: 0;
}
.ranking_center_right img{
    width: 0.4rem;
    margin-left: 0.2rem;
}
.ranking_bottom {
    text-align: center;
    margin-top: 0.4rem;
}
.ranking_bottom img{
    width: 15.2rem;
    margin: 0 auto;
}
.table_title{
    display: flex;
    justify-content: space-around;
    color: #fff;
    padding: 0 1.2rem;
    margin-top: -1.8rem;
    font-size: 0.65rem;
}
.table_title p{
    margin: 0;
}
.table_wrapper{
    margin: 0.4rem auto 0.5rem auto;
    width: 14rem;
    height: 9.6rem;
    border: 1px solid #FC3632;
    overflow: auto;
    text-align: center;
    border-radius: 0 0 0.4rem 0.4rem;
}
table{
    border-collapse:collapse;
}
tbody td{
    border: 1px solid #FFBFBC;
}
tbody td:nth-of-type(1){
    width: 6.3rem;
    font-size: 0.6rem;
    color: #2D2E39;
    padding: 0.35rem 0;
}
tbody td:nth-of-type(1) img{
    width: 0.8rem;
    border-radius: 50%;
    height: 0.8rem;
    vertical-align: middle;
}
tbody td:nth-of-type(2){
    width: 2.2rem;
    font-size: 0.6rem;
    color: #FF2B48;
}
tbody td:nth-of-type(3){
    width: 5.1rem;
    font-size: 0.6rem;
    color: #FF2B48;
}
tbody td:nth-of-type(4){
    width: 4.5rem;
    font-size: 0.6rem;
    color: #FF2B48;
}
.bzs_huodong img{
    width: 6.6rem;
    position: absolute;
    top: 44.3rem;
    left: 5.7rem;
    z-index: 100;
}
.bzs_block_three{
    width: 14.4rem;
    background-color: #FCF5E2;
    position: absolute;
    top: 44.8rem;
    left: 0.8rem;
    border-radius: 0.4rem;
    padding: 0 1rem;
    /* margin-bottom: 4rem; */
}
.bzs_block_three img{
    width: 3.45rem;
    margin: 0.1rem 0 -0.2rem 0;
}
.bzs_block_three p{
    font-size: 0.6rem;
    color: #3E405D;
    /* margin-top: -0.2rem; */
}
.bzs_btn{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 2.8rem;
    z-index: 101;
}
.bzs_btn img{
    width: 16.4rem;
    margin: 0.3rem 0.8rem;
}
</style>
