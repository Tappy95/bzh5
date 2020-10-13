<template>
    <div id="app" style="height: 100vh;background: #FCBE43;overflow: auto;">
        <div class="ge_head">
            <img src="../../assets/right.png" alt="" @click="back">
            <p>砸金蛋</p>
            <p @click="jump">我的奖品</p>
        </div>
        <div style="position: relative;">
            <div class="ge_bg">
                <img src="../../assets/zjdBg.png" alt="">
            </div>
            <div class="ge_Hfont">
                <p>赢取百元红包，100%中奖</p>
            </div>
            <div class="ge_eggs">
                <!-- toggle(order,iValue,id){ -->
                <div @click="toggle(1)">
                    <img :src="this.i == 0 ? oneImg : fourImg" alt="">
                </div>
                <div @click="toggle(2)">
                    <img :src="this.ii == 0 ? twoImg : fiveImg" alt="">
                </div>
                <div @click="toggle(3)">
                    <img :src="this.iii == 0 ? threeImg : sixImg" alt="">
                </div>
            </div>
            <div class="ge_moneyWrapper">
                <div class="ge_money" v-for="(item,index) in eggs" :key="item.id">
                    <p>{{item.name}}{{item.pigCoin / 10000}}万/次</p>
                </div>
            </div>
            <div>
                <div class="ge_btn">
                    <img src="../../assets/anniubg.png" alt="">
                </div>
                <div class="ge_btn_inner">
                    <div>
                        <p>我的金猪</p>
                        <p>{{userCoinStr}}</p>
                        <p>({{eggInfo.useFrequency}}/{{eggInfo.totalFrequency}})</p>
                    </div>
                    <img src="../../assets/jinzhu.png" alt="">
                    <!-- <img src="../../assets/jia.png" alt=""> -->
                </div>
            </div>
        </div>

        <div class="ge_font_content">
            <div class="ge_font_content_title">
                <p>～砸蛋大作战～</p>
            </div>
            <div class="ge_font_content_inner">
                <p><span>1</span>用户需注册大于30天，才能拥有砸金蛋权限；</p>
                <p><span>2</span>累计平台实际VIP消费每多100元，永久获得每日砸金蛋一次。最高5次/日，次数每日重置；新用户初始0次/天。</p>
                <p><span>3</span>砸金蛋所获得奖励永久有效</p>
                <p><span>4</span>一旦成功参与游戏，支付的金猪不得以任何理由申请退回；</p>
                <p><span>5</span>不能通过不正当手段参与游戏，如有发现数据异常，我司有权收回通过作弊手段获得奖励；</p>
                <p><span>6</span>奖品将以卡号和卡密的形式发放至账户，请在“我的奖品”中查看</p>
                <p><span>7</span>本活动最终解释权归宝猪乐园所有。</p>
            </div>
        </div>

        <div class="ge_scroll">
            <div class="ge_scroll_font">
                <p>～中奖动态～</p>
            </div>
            <div class="ge_scroll_content">
                <div id="con1" ref="con1" :class="{anim:animate==true}">
                    <div class="ge_scroll_innder" v-for="(item,index) in scrollData">
                        <p>恭喜<span>{{item.mobile}}</span>获得了<span>{{item.obtainPigCoin / 10000}}万金猪积分兑换卡</span></p>
                    </div>
                </div>

            </div>
            <div style="position: relative;background-color: #fff;top: 17.4rem;width: 16.4rem;margin: 0 0.8rem;height: 1.5rem;"></div>
        </div>
        <!-- 弹窗 -->
        <div class="ge_box_one" v-show="isShow">
            <div class="ge_box_one_inner">
                <div class="ge_box_one_inner_bg">
                    <img src="../../assets/goldenEggs/bgone.png" alt="">
                </div>
                <div class="ge_box_one_inner_close">
                    <img src="../../assets/goldenEggs/close.png" alt="">
                </div>
                <div class="ge_box_one_inner_font">
                    <p>每日获得一张永久砸金蛋机会</p>
                </div>
                <div class="ge_box_one_inner_btn">
                    <img src="../../assets/goldenEggs/sure.png" alt="">
                    <img src="../../assets/goldenEggs/more.png" alt="">
                </div>
            </div>
        </div>
        <div class="ge_box_one" v-show="isShowBox">
            <div class="ge_box_one_inner">
                <div class="ge_box_one_inner_bg">
                    <img src="../../assets/goldenEggs/bgtwo.png" alt="">
                </div>
                <div class="ge_box_one_inner_close" @click="closeShowBox">
                    <img src="../../assets/goldenEggs/close.png" alt="">
                </div>
                <div class="ge_box_two_inner_font">
                    <p>赶快开通会员赢金猪</p>
                </div>
                <div class="ge_box_two_inner_btn" @click="closeShowBox">
                    <img src="../../assets/goldenEggs/surebtn.png" alt="">
                </div>
            </div>
        </div>
        <div class="ge_box_one" v-show="isShowBoxTwo">
            <div class="ge_box_three_inner">
                <div class="ge_box_one_inner_bg">
                    <img src="../../assets/goldenEggs/bgthree.png" alt="">
                </div>
                <div class="ge_box_one_inner_close" @click="closeShowBoxTwo">
                    <img src="../../assets/goldenEggs/close.png" alt="">
                </div>
                <div class="ge_box_three_inner_font">
                    <p>获得{{data / 10000}}万金猪积分兑换卡</p>
                </div>
                <!-- <div class="ge_box_three_inner_bgfont">
                    <img src="../../assets/goldenEggs/fontbg.png" alt="">
                    <p>积分:<span>450万金猪</span></p>
                </div> -->
                <div class="ge_box_three_inner_btn" @click="jump">
                    <img src="../../assets/goldenEggs/btn.png" alt="">
                </div>
                <div class="ge_box_three_inner_tips">
                    <p>请在我的奖品中查看</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            scrollData:{},
            animate:false,

            i:0,
            oneImg:require('../../assets/eggone.png'),
            fourImg:require('../../assets/eggsfour.png'),
            ii:0,
            twoImg:require('../../assets/eggtwo.png'),
            fiveImg:require('../../assets/eggsfive.png'),
            iii:0,
            threeImg:require('../../assets/eggthree.png'),
            sixImg:require('../../assets/eggssix.png'),

            isShow:false,
            isShowBox:false,
            isShowBoxTwo:false,
            eggInfo:{},
            eggs:{},
            userCoinStr:0,
            userCoin:0,
            firstId:0,
            secondId:0,
            thirdId:0,
            firstPigCoin:0,
            secondPigCoin:0,
            thirdPigCoin:0
        }
    },
    created(){
        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        this.interval = setInterval(this.scroll, 1500);
        this.getInfo();
        this.scrollList()
    },
    methods:{
        scroll(){
            let con1 = this.$refs.con1;
            this.animate = !this.animate;
            con1.style.marginTop = "-1.6rem";
            let that = this;
            this.isDestroyed = setTimeout(() => {
                that.scrollData.push(that.scrollData[0]);
                that.scrollData.shift();
                that.$refs.con1.style.marginTop = "0.45rem";
                that.animate = !that.animate;
            },1000);
        },
        toggle(order){
            let iValue = 0;
            let eggId = 0;
            let pigCoin = 0;
            if(order == 1){
                iValue = this.i;
                eggId = this.firstId;
                pigCoin = this.firstPigCoin;
            }else if(order == 2){
                iValue = this.ii;
                eggId = this.secondId;
                pigCoin = this.secondPigCoin;
            }else{
                iValue = this.iii;
                eggId = this.thirdId;
                pigCoin = this.thirdPigCoin;
            }
            if(iValue == 0){
                if(this.eggInfo.useFrequency >= this.eggInfo.totalFrequency){
                    this.$toast('今日砸金蛋次数不足');
                    return;
                }else{
                    this.start(eggId,pigCoin,order);
                }
            }else{
                this.$toast('请刷新之后再尝试');
            }
        },
        jump(){
            window.location.href = '/myPrize.html?token='+this.token+'&imei='+this.imei;
        },
        // 详情
        getInfo(){
            let parameterData = {
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/goldEggType/smashEggInfo',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.eggInfo = res.data;
                    this.eggs = res.data.list;
                    this.userCoin = res.data.pigCoin;
                    if(this.userCoin >= 100000000){
                        this.userCoinStr = (this.userCoin / 100000000).toFixed(0) +" 亿";
                    }else if(this.userCoin >= 10000){
                        this.userCoinStr = (this.userCoin / 10000).toFixed(0) +" 万";
                    }
                    this.firstId = res.data.list[0].id;
                    this.firstPigCoin = res.data.list[0].pigCoin;
                    this.secondId = res.data.list[1].id;
                    this.secondPigCoin = res.data.list[1].pigCoin;
                    this.thirdId = res.data.list[2].id;
                    this.thirdPigCoin = res.data.list[2].pigCoin;
                }
            })
        },
        // 砸金蛋
        start(eggId,pigCoin,orders){
            if(pigCoin > this.userCoin){
                this.isShowBox = true;
                return;
            }
            let parameterData = {
                token:this.token,
                imei:this.imei,
                typeId:eggId
            }
            this.$get('/api/goleEggOrder/smashEggs',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.isShowBoxTwo = true;
                    this.data = res.data;
                    this.userCoin = this.userCoin-pigCoin;
                    if(this.userCoin >= 100000000){
                        this.userCoinStr = (this.userCoin / 100000000).toFixed(0) +" 亿";
                    }else if(this.userCoin >= 10000){
                        this.userCoinStr = (this.userCoin / 10000).toFixed(0) +" 万";
                    }
                    this.eggInfo.useFrequency++;
                    if(orders == 1){
                        this.i = 1;
                    }else if(orders == 2){
                        this.ii = 1;
                    }else{
                        this.iii = 1;
                    }
                }else if(res.statusCode == '30025' || res.statusCode == 30025){
                    this.$toast(res.message);
                }
            })
        },
        closeShowBox(){
            this.isShowBox = false;
        },
        closeShowBoxTwo(){
            this.isShowBoxTwo = false;
        },
        // 滚动条
        scrollList(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
            }
            this.$get('/api/goleEggOrder/newsRoll',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.scrollData = res.data;
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
.ge_bg{
    margin-top: 2.2rem;
}
.ge_bg img{
    width: 18rem;
}
.ge_Hfont{
    width: 9.4rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #FE3D19;
    font-size: 0.65rem;
    color: #FFFB03;
    text-align: center;
    border-radius: 0.5rem;
    position: absolute;
    top: 7.65rem;
    left: 4.8rem;
}
.ge_eggs{
    display: flex;
    position: absolute;
    top: 9.9rem;
    left: 1.35rem;
}
.ge_eggs img{
    width: 4.6rem;
    height: 5.65rem;
    margin-right: 0.75rem;
}
.ge_moneyWrapper{
    display: flex;
    position: absolute;
    top: 16.4rem;
    left: 1.6rem;
}
.ge_money{
    width: 3.9rem;
    height: 1rem;
    line-height: 1rem;
    background-color: #C21C0F;
    font-size: 0.5rem;
    color: #FFD001;
    padding: 0.1rem;
    margin-right: 1.15rem;
    border-radius: 0.2rem;
    border: 1px solid #FFD001;
    text-align: center;
}
.ge_btn{
    position: absolute;
    top: 19.3rem;
    left: 6rem;
}
.ge_btn img{
    width: 6rem;
}
.ge_btn_inner{
    display: flex;
    align-items: center;
    position: absolute;
    top: 19.4em;
    left: 7rem;
    text-align: center;
    height: 2.5rem;
}
.ge_btn_inner img{
    width: 0.9rem;
    height: 0.9rem;
}
.ge_btn_inner img:nth-of-type(2){
    position: absolute;
    left: 4.2rem;
}
.ge_btn_inner div{
    width: 3.2rem;
}
.ge_btn_inner div p:nth-of-type(1){
    font-size: 0.45rem;
    color: #fff;
}
.ge_btn_inner div p:nth-of-type(2){
    font-size: 0.6rem;
    color: #FFFB03;
}
.ge_btn_inner div p:nth-of-type(3){
    font-size: 0.4rem;
    color: #fff;
}
.ge_font_content{
    position: relative;
}
.ge_font_content_title{
    width: 6.2rem;
    height: 1.6rem;
    line-height: 1.6rem;
    background-color: #FE9604;
    margin: 0 auto;
    border-radius: 0.2rem;
    font-size: 0.7rem;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 0.2rem;
    left: 5.9rem;
    z-index: 99;
}
.ge_font_content_inner{
    position: absolute;
    background-color: #fff;
    margin: 0 0.8rem;
    border-radius: 0.3rem;
    top: 0.6rem;
    padding: 1.6rem 0.6rem 0.8rem 0.6rem;
}
.ge_font_content_inner p{
    color: #9EA9BC;
    line-height: 1.1rem;
    font-size: 0.6rem;
}
.ge_font_content_inner span{
    background-color: #FE9604;
    font-size: 0.5rem;
    color: #fff;
    padding: 0 0.2rem;
    border-radius: 0.2rem;
    margin-right: 0.4rem;
}
.ge_scroll{
    position: relative;
}
.ge_scroll_font{
    width: 6.2rem;
    height: 1.6rem;
    line-height: 1.6rem;
    background-color: #FE9604;
    margin: 0 auto;
    border-radius: 0.2rem;
    font-size: 0.7rem;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 16.5rem;
    left: 5.9rem;
    z-index: 99;
}
.ge_scroll_content{
    width: 16.4rem;
    height: 7.95rem;
    overflow: hidden;
    position: absolute;
    background-color: #fff;
    margin: 0 0.8rem;
    border-radius: 0.3rem;
    top: 16.9rem;
    padding: 1.6rem 0 0.5rem 0;
    transition: all 0.5s;
}
.ge_scroll_innder{
    background-color: #FFF7E7;
    font-size: 0.6rem;
    margin: 0.6rem 1.2rem;
    border-radius: 0.3rem;
    padding: 0.1rem 0.65rem;
    text-align: center;
}
.ge_scroll_innder p{
    color: #FE9604;
}
.ge_scroll_innder span{
    color: #FE3D19;
}
#con1{
    padding: 0;
    height: 6.4rem;
}
.anim{
  transition: all 0.5s;
}
.ge_box_one{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 101;
}
.ge_box_one_inner{
    position: fixed;
    width: 13.6rem;
    top: 9.65rem;
    left: 2.2rem;
    border-radius: 0.4rem;
    text-align: center;
}
.ge_box_one_inner_bg img{
    width: 13.2rem;
}
.ge_box_one_inner_close img{
    position: absolute;
    top: 0.6rem;
    right: 1rem;
    width: 0.6rem;
    height: 0.6rem;
}
.ge_box_one_inner_font{
    /* width: 8.25rem; */
    height: 1rem;
    line-height: 1rem;
    background-color: #FE3D19;
    font-size: 0.55rem;
    color: #fff;
    border-radius: 0.5rem;
    position: absolute;
    top: 3.2rem;
    left: 2.9rem;
    padding: 0 0.2rem;
}
.ge_box_one_inner_btn{
    display: flex;
    position: absolute;
    top:5rem;
    left: 1rem;
}
.ge_box_one_inner_btn img{
    width: 5.8rem;
}
.ge_box_two_inner_font{
    height: 1rem;
    line-height: 1rem;
    background-color: #FE3D19;
    font-size: 0.55rem;
    color: #fff;
    border-radius: 0.5rem;
    position: absolute;
    top: 3.2rem;
    left: 3.8rem;
    padding: 0 0.2rem;
}
.ge_box_two_inner_btn img{
    width: 10.4rem;
    position: absolute;
    top:5rem;
    left: 1.6rem;
}
.ge_box_three_inner{
    position: fixed;
    width: 13.6rem;
    top: 6.65rem;
    left: 2.2rem;
    border-radius: 0.4rem;
    text-align: center;
}
.ge_box_three_inner_font{
    height: 1rem;
    line-height: 1rem;
    background-color: #FE3D19;
    font-size: 0.55rem;
    color: #fff;
    border-radius: 0.5rem;
    position: absolute;
    top: 3.2rem;
    left: 2.5rem;
    padding: 0 0.7rem;
}
.ge_box_three_inner_bgfont{
    position: absolute;
    top: 9.2rem;
    left: 4rem;
}
.ge_box_three_inner_bgfont img{
    width: 5.8rem;
}
.ge_box_three_inner_bgfont p{
    font-size: 0.55rem;
    color: #EF3479;
    position: absolute;
    top: 0.2rem;
    left: 0.4rem;
    width: 5rem;
}
.ge_box_three_inner_bgfont span{
    font-size: 0.55rem;
    color: #6516A1;
}
.ge_box_three_inner_btn img{
    width: 10.4rem;
    position: absolute;
    top:11.5rem;
    left: 1.6rem;
}
.ge_box_three_inner_tips{
    font-size: 0.55rem;
    color: #FE3D19;
    position: absolute;
    top: 14rem;
    left: 4rem;
}
</style>

