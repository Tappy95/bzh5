<template>
  <div id="app" style="height: 100vh;background: #130D29;overflow: auto;">
        <div class="jf_header" v-show="isShowHead">
            <div @click="backTap" class="jf_header_left">
                <div><img src="../../assets/right.png" alt=""></div>
                <p>积分抽奖</p>
            </div>
            <p @click="openJFCJ">抽奖记录</p>
        </div>
        <div>
            <img src="../../assets/cjbg.jpg" alt="" class="cj_bg" :class="this.isIos() == true ? 'cj_bg1' : ''">
        </div>
        <div style="position:relative">
            <div class="cj_dt">
                <img src="../../assets/cjdt.png" alt="">
            </div>
        </div>
        <div style="position:relative">
            <div class="cj_tips">
                <p>剩余金猪：</p>
                <p>{{coin | filter}}</p>
                <img src="../../assets/jinzhu.png" alt="">
            </div>
        </div>
        <div style="position:relative">
            <div id="rotary-table" style="margin-top: 3.4rem;">
                <div class="award" v-for="(award,index) in awards" :class="['award'+index,{'active': index==current}]">
                    <img :src="award.imageUrl" alt="">
                    <!-- <p>{{award.id}}</p> -->
                </div>
                <div id="start-btn" @click="start">
                    <div class="start_top">
                        <p>消耗</p>
                        <p>{{tableData.expendPigCoin / 10000}}万</p>
                        <img src="../../assets/jinzhu.png" alt="">
                    </div>
                    <div class="start_bottom">({{userCount}}/{{tableData.timesOneday}})</div>
                </div>
            </div>
        </div>
        <div style="position:relative">
            <div class="cj_content">
                <div class="cj_title"><img src="../../assets/cjdongtai.png" alt=""></div>
                <div class="cj_inner">
                    <img src="../../assets/choujiangbg.png" alt="">
                </div>
                <div class="cj_scroll">
                    <div id="con1" ref="con1" :class="{anim:animate==true}">
                        <div class="item" v-for="(item,index) in listData">
                            <div class="trumpet"><img src="../../assets/laba.png" alt=""></div>
                            <div class="dt_font"><img src="../../assets/wenzi.png" alt=""></div>
                            <p>{{item.content}}</p>
                            <p>{{item.goodsName}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="position:relative">
            <div class="jf_bottom">
                <div class="cj_title"><img src="../../assets/jifenguize.png" alt=""></div>
                <div class="cj_inner">
                    <img src="../../assets/choujiangbg.png" alt="">
                </div>
                <div class="jf_bottom_font" v-html="remark"></div>
            </div>
        </div>
        <div class="popout_wrapper" v-show="isShow">
            <div class="popout_innder" @click="stop">
                <div class="popout_header">
                    <img src="../../assets/liwubg.png" alt="">
                </div>
                <div class="popout_content">
                    <p>恭喜你</p>
                    <div class="popout_content_center">
                        <p>恭喜您！抽到</p>
                        <p>{{goodsName}}</p>
                    </div>
                    <div class="popout_btn" @click="close">确定</div>
                    <!-- <span>请尽快到抽奖记录里设置邮寄地址否则无法寄出</span> -->
                </div>
                <div class="popout_bottom">
                    <img src="../../assets/liwubottom.png" alt="">
                </div>
            </div>
        </div>
        <div class="popout_wrapper" v-show="isShowZf" @click="closeSelf">
            <div class="popout_innder" @click="stop" style="background-color: #fff;">
                <input type="password" placeholder="请输入宝猪支付密码" v-model="payPassword">
                <div class="zf_font">
                    <p @click="forgetPW">忘记密码?</p>
                    <p @click="getSet">没有支付密码？去设置</p>
                </div>
                <div class="popout_btn" style="margin-bottom:1.5rem" @click="submitTap">确定</div>
            </div>
        </div>
        <div class="popout_wrapper" v-show="isShowAlert">
            <div class="popout_innder" style="background-color: #fff;">
                <div class="alert_font" id="alertFont">今日抽奖次数已用完！</div>
                <div class="alert_line"></div>
                <div class="alert_btn" @click="closeAlert">知道了~</div>
            </div>
        </div>
  </div>
</template>
<script>
// import { Toast } from 'mint-ui'
import md5 from 'js-md5'
export default {
    name: "choujiang",
    data() {
        return {
            current: 0,
            awards: [],
            speed: 200,
            diff: 15,
            award: {},
            time: 0,
            listData:{},
            animate:false,
            isShow:false,
            isShowZf:false,
            tableData:{},
            userCount:0,
            remark:'',
            coin:0,
            goodsName:'',
            isShowAlert:false,
            // payTrue:true,
            payPassword:'',
            selectId:'',
            clickFlag:1,
            isShowHead:true
        };
    },
    created(){
        this.token = APP.GetLocationParams("token") ||  window.sessionStorage.getItem("token");
        this.imei =  APP.GetLocationParams("imei") ||  window.sessionStorage.getItem("imei");
        this.getInfo();
        this.getCoin();
        this.getScroll();
        this.interval = setInterval(this.scroll, 2500);
        if(this.isAndroid()){
            this.isShowHead = true;
        }else if(this.isIos()){
            this.isShowHead = false;
        }
    },
    destroyed() {
        clearTimeout(this.isDestroyed);
        clearInterval(this.interval);
    },
    filters: {
        filter(n){
            var b=parseInt(n).toString();
            var len=b.length;
            if(len<=3){return b;}
            var r=len%3;
            return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
        }
    },
    mounted(){
        $("input").blur(function(){
            window.scrollTo(0,0);
        });//这样就会完美的解决这问题
        //原生javascript下
        // let input = document.getElementsByTagName('input');
        // input.onblur=function(){
        //     window.scrollTo(0,0);
        // }
    },
    methods: {
        getInfo(){
            let parameterData = {}
            let typeId = 0;
            this.$get('/api/mLotteryType/home', parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.tableData = res.data.mLotteryType;
                    this.awards = res.data.resultList;
                    // this.remark = res.data.mLotteryType.remark;
                    this.remark = res.data.mLotteryType.remark.replace(/\n|\r\n/g,"<br/>");
                    typeId = res.data.mLotteryType.id;
                    if(this.token == null || this.token == '' || this.token =='null'){
                        return false;
                    }
                    parameterData = {
                        token:this.token,
                        imei:this.imei,
                        typeId:typeId
                    }
                    this.$get('/api/mLotteryOrder/userOrderCount', parameterData).then(res => {
                        if((res.statusCode+"").startsWith("2")){
                            this.userCount = res.data
                        }
                    })
                }
            });

        },
        getCoin(){
            if(this.token == null || this.token == '' || this.token =='null'){
                return false;
            }
            let parameterData = {
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/userInfo/getUserPigCoin',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.coin = res.data.pigCoin;
                }
            });
        },
        getScroll(){
            let parameterData = {}
            this.$get('/api/mLotteryOrder/orderNews', parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data
                }
            })
        },
        getResult(passwordSign){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                typeId:this.tableData.id,
                password:passwordSign
            }
            this.$get('/api/mLotteryOrder/clickLottery', parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    // 减少金猪
                    this.getCoin();
                    let id = res.data.goods.id;
                    this.selectId = res.data.recordId;
                    for(let i = 0;i < this.awards.length;i++){
                        if(id == this.awards[i].id){
                            // 设置最后停留的地方
                            this.award = {
                                id: id,
                                imageUrl: res.data.goods.imageUrl
                            };
                        }
                    }
                    // 弹出框的值
                    this.goodsName = res.data.goods.goodsName;
                    this.userCount++;
                    this.move();; // 开始转转转
                }else if(res.statusCode == '30023' || res.statusCode == 30023){
                  this.$toast(res.message);
                    this.clickFlag = 1;
                    return false
                }else if(res.statusCode == '3000' || res.statusCode == 3000){
                  this.$toast(res.message);
                    this.clickFlag = 1;
                    return false
                }else if(res.statusCode == '5101' || res.statusCode == 5101){
                  this.$toast(res.message);
                    this.clickFlag = 1;
                    return false
                }else if(res.statusCode == '5102' || res.statusCode == 5102){
                  this.$toast(res.message);
                    this.clickFlag = 1;
                    return false
                }else if(res.statusCode == '5103' || res.statusCode == 5103){
                  this.$toast(res.message);
                    this.clickFlag = 1;
                    return false
                }
            })
        },
        // 开始抽奖
        start() {
            if(this.clickFlag == 1){
                this.clickFlag = 0;
            }else if(this.payPassword == ''){
                this.clickFlag = 0;
            }else{
                this.isShowAlert = true;
                let aFont = document.getElementById('alertFont');
                aFont.innerHTML= '请勿重复点击';
                return false;
            }
            if(this.token == null || this.token == '' || this.token =='null'){
                this.isShowAlert = true;
                let aFont = document.getElementById('alertFont');
                aFont.innerHTML= '请先登录';
                this.clickFlag = 1;
                return false;
            }
            if(this.tableData.expendPigCoin > this.coin){
                this.isShowAlert = true;
                let aFont = document.getElementById('alertFont');
                aFont.innerHTML= '余额不足';
                 this.clickFlag = 1;
                return false;
            }
            if(this.userCount >= this.tableData.timesOneday){
                this.isShowAlert = true;
                this.clickFlag = 1;
                return false;
            }
            this.isShowZf = true;
            this.payPassword = ''
        },
        move() {
            window.timeout = setTimeout(() => {
                this.current++;
                if (this.current > 11) {
                    this.clickFlag = 1;
                    this.current = 0;
                }
                if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
                    this.speed += this.diff;
                    if (
                        (Date.now() - this.time) / 1000 > 4 &&
                        this.award.id == this.awards[this.current].id
                    ) {
                        clearTimeout(window.timeout);
                        setTimeout(() => {
                            this.isShow = true
                            // alert("恭喜你，抽中了" + this.award.name);
                        }, 0);
                        return;
                    }
                } else {
                    this.speed -= this.diff;
                }
                this.move();
            }, this.speed);
        },
        scroll(){
            let con1 = document.getElementById('con1')
            this.animate = !this.animate;
            con1.style.marginTop = "-1.6rem";
            let that = this;
            this.isDestroyed = setTimeout(() => {
                that.listData.push(that.listData[0]);
                that.listData.shift();
                that.$refs.con1.style.marginTop = "0.45rem";
                that.animate = !that.animate;
            },1500);
        },
        stop(){
            event.stopPropagation()
        },
        close(){
            this.isShow = false;
            this.getCoin();
            this.getInfo()
            window.location.href = '/lotteryDetail.html?token='+this.token+'&imei='+this.imei+'&id='+this.selectId;
            // this.$router.push({
            //     path:'/lotteryDetail',
            //      query: {
            //         token:this.token,
            //         imei:this.imei,
            //         id:this.selectId
            //     }
            // })
        },
        closeAlert(){
            this.isShowAlert = false
        },
        //确定
        submitTap(){
            if (!this.payPassword){
              this.$toast('请输入宝猪支付密码');
                return false
            }
            this.isShowZf = false;
            let passwordSign = md5(this.payPassword);
            this.getResult(passwordSign); // 获取抽奖结果
            this.time = Date.now();
            this.speed = 250;
            this.diff = 15;
        },
        openJFCJ(){
            if (this.isAndroid()){
                window.android.toPigDrawLog();
            }

            // if(this.token == null || this.token == '' || this.token =='null'){
            //     this.isShowAlert = true
            //     let aFont = document.getElementById('alertFont')
            //     aFont.innerHTML= '请先登录'
            //     return false;
            // }
            // this.$router.push({
            //     path:'/lotteryList',
            //      query: {
            //         token:this.token,
            //         imei:this.imei
            //     }
            // })
        },
        backTap(){
          if (this.isAndroid()){
            window.android.over();
          }

        },
        closeSelf(){
            this.isShowZf = false;
        },
        forgetPW(){
            if(this.isAndroid()){
                window.android.toForgetPayPsw();
            }else if(this.isIos()){
                window.forgetPayPwdAction();
            }
        },
        getSet(){
            if(this.isAndroid()){
                window.android.toForgetPayPsw();
            }else if(this.isIos()){
                window.setPayPwdAction();
            }
        },
        //判断是安卓还是iOS
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
    }
};
</script>

<style scoped>
.jf_header{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.2rem;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
}
.jf_header_left{
    display: flex;
    align-items: center;
}
.jf_header img{
    height: 0.8rem;
    margin-left: 0.75rem;
}
.jf_header_left p{
    font-size: 0.9rem !important;
    color: #1D1D1D;
    margin-left: 5.8rem;
}
.jf_header p{
    font-size: 0.7rem;
    color: #3C3E5B;
    margin-right: 0.75rem;
}
.cj_bg {
    margin-top: 2.2rem;
    width: 17.85rem;
}
.cj_bg1{
    margin-top: 0;
    width: 17.85rem;
}
.cj_dt img{
    width: 15rem;
    position: absolute;
    top: -16.5rem;
    left: 1.4rem;
}
.cj_tips{
    /* width: 10rem; */
    display: flex;
    align-items: center;
    position: absolute;
    top: -24.7rem;
    left: 1.2rem;
    border-radius: 0.5rem;
    background-color: #9C7BFE;
    padding: 0.2rem;
}
.cj_tips p:nth-of-type(1){
    font-size: 0.5rem;
    color: #fff;
}
.cj_tips p:nth-of-type(2){
    font-size: 0.5rem;
    margin-right: 0.2rem;
    color: #FBD43A;
}
.cj_tips img{
    width: 0.6rem;
}

* {
    margin: 0;
    padding: 0;
    list-style: none;
    outline: none;
}
#rotary-table {
    margin-top: 3rem;
    width: 13rem;
    height: 13rem;
    position: absolute;
    top: -19rem;
    left: 2.3rem;
    margin: auto;
}
.award {
    width: 3.1rem;
    height: 3.1rem;
    line-height: 3.1rem;
    text-align: center;
    float: left;
    position: absolute;
    overflow: hidden;
    background-image: url('../../assets/cjimg.png');
    background-size: cover;
    background-position: center center;
    border-radius: 0.5rem;
}
.award img{
    width: 2.8rem;
    margin-top: 0.2rem;
}
.active {
    width: 3.15rem;
    height: 3.15rem;
    border: 0.1rem solid red;
    box-sizing: border-box;   /* 设置为内边框 */
}
.award0 {
    top: 0;
    left: 0;
}
.award1 {
    top: 0;
    left: 3.3rem;
}
.award2 {
    top: 0;
    right: 3.3rem;
}
.award3 {
    top: 0;
    right: 0;
}
.award4 {
    top: 3.3rem;
    right: 0;
}
.award5 {
    bottom: 3.3rem;
    right: 0;
}
.award6 {
    bottom: 0;
    right: 0;
}
.award7 {
    bottom: 0;
    right: 3.3rem;
}
.award8 {
    bottom: 0;
    left: 3.3rem;
}
.award9 {
    bottom: 0;
    left: 0;
}
.award10 {
    bottom: 3.3rem;
    left: 0;
}
.award11 {
    top: 3.3rem;
    left: 0;
}

#start-btn {
    position: absolute;
    top: 3.35rem;
    left: 3.3rem;
    width: 6.3rem;
    height: 6.3rem;
    text-align: center;
    /* background-color: coral; */
    background-image: url('../../assets/cjstart.png');
    background-size: cover;
    background-position: center center;
}
.start_top{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4.3rem 0 0.2rem 0;
}
.start_top p:nth-of-type(1){
    font-size: 0.6rem;
    color: #fff;
}
.start_top p:nth-of-type(2){
    font-size: 0.6rem;
    color: #FFCC00;
    margin-right: 0.2rem;
}
.start_top img{
    width: 0.7rem;
}
.start_bottom{
    font-size: 0.5rem;
    color:#fff;
}
.cj_content{
    position: absolute;
    top: 0.5rem;
}
.cj_title img{
    width: 5.35rem;
    position: relative;
    left: 6.5rem;
    z-index: 99;
}
.cj_inner img{
    width: 15.6rem;
    position: relative;
    top: -1.2rem;
    left: 1.2rem;
}
.cj_scroll{
    overflow: hidden;
    position: relative;
    top: -8.7rem;
    left: 2rem;
    width: 13.9rem;
    height: 5.8rem;
}
.cj_scroll p:nth-of-type(1){
    color: #555555;
    font-size: 0.45rem;
}
.cj_scroll p:nth-of-type(2){
    color: #FF2C47;
    font-size: 0.45rem;
}
.item{
    margin: 0 auto 0.4rem auto;
    display: flex;
    justify-items: center;
    height:1.6rem;
    background:#e4dbff;
    border-radius:0.8rem;
    align-items: center;
  }

.trumpet img{
    width: 0.4rem;
    margin: 0 0.2rem 0 0.5rem;
}
.dt_font img{
    width: 1.9rem;
    margin-right: 0.2rem;
}
.jf_bottom{
    position: absolute;
    top: 10.5rem;
}
.jf_bottom_font{
    position: absolute;
    top: 2rem;
    color: #000;
    font-size: 0.5rem;
    width: 14rem;
    left: 2rem;
    height: 5.5rem;
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6; */
    overflow: scroll;/*盒子溢出隐藏*/
}
.popout_wrapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 101;
}
.popout_innder{
    position: fixed;
    width: 13.6rem;
    top: 9.45rem;
    left: 2rem;
    border-radius: 0.4rem;
    text-align: center;
}
.popout_innder input{
    margin-top: 1.6rem;
    width: 11rem;
    height: 2.2rem;
    background-color: #F2F5F8;
    border-radius: 0.5rem;
    border:none;
    color: #9EA9BC;
    font-size: 0.7rem;
    padding-left: 0.5rem;
}
.popout_header img{
    width: 13.6rem;
    display:block;
}
.popout_bottom img{
    width: 13.6rem;
    display:block;
}
.popout_content{
    width: 13.6rem;
    background-color: #fff;
}
.popout_content p:nth-of-type(1){
    font-size: 0.8rem;
    color: #3C3E5B;
    font-weight: bold;
    padding: 0.3rem 0 0.2rem 0;
}
.popout_content_center{
    display: flex;
    justify-content: center;
    align-items: center;
}
.popout_content_center p:nth-of-type(1){
    color: #3C3E5B;
    font-size: 0.7rem;
    padding: 0;
}
.popout_content_center p:nth-of-type(2){
    color: #FF3352;
    font-size: 0.7rem;
}
.popout_content span{
    font-size: 0.5rem;
    color: #FF3352;
}
.popout_btn{
    text-align: center;
    width: 12rem;
    height: 2.2rem;
    line-height: 2.2rem;
    border-radius: 1rem;
    color: #fff;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);
    background: -o-linear-gradient(right, #FF3E2B , #FF1370);
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370);
    background: linear-gradient(to right, #FF3E2B , #FF1370);
    margin: 0.8rem auto 0 auto;
    font-size: 0.7rem;
}
.zf_font{
    display: flex;
    justify-content: space-around;
    font-size: 0.6rem;
    color: #9EA9BC;
    margin-top: 0.4rem;
}

.anim {
  transition: all 0.5s;
}
#con1 li {
  font-size: 0.7rem;
  list-style: none;
  color: #a2abbb;
}
.alert_font{
    font-size: 0.9rem;
    color: #FF3352;
    margin: 1.5rem auto;
}
.alert_line{
    border: 0.02rem solid #F7F7F7;
    margin: 0 0.5rem;
}
.alert_btn{
    font-size: 0.8rem;
    color: #3C3E59;
    margin: 0.5rem auto;
}
</style>
