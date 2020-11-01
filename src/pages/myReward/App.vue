<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
        <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
        <div class="myReward-head" v-if="isWeb" @click="back">
            <!--<router-link to="">-->
              <img src="../../assets/right.png" alt="">
            <!--</router-link>-->
            <p>我的奖励</p>
        </div>
        <scroller :on-refresh="refresh" :on-infinite="infinite" :noDataText="noDataText">
        <!-- <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
            <div class="myReward-title">
                <!-- <div @click="isShow=true" :class="isShow ? 'myReward-titleLeft myReward-titleRightBorder' : 'myReward-titleRight myReward-titleRightBorder'">我的奖励</div>
                <div @click="isShow=false" :class="isShow ? 'myReward-titleRight myReward-titleLeftBorder' : 'myReward-titleLeft myReward-titleLeftBorder'">我的徒弟</div> -->

                <div @click="isShowTap(1)" :class="isShow ==1 ? 'myReward-titleLeft myReward-titleRightBorder' : 'myReward-titleRight myReward-titleRightBorder'">我的奖励</div>
                <div @click="isShowTap(2)" :class="isShow==2 ? 'myReward-titleLeft myReward-titleLeftBorder' : 'myReward-titleRight myReward-titleLeftBorder'">我的好友</div>
            </div>
            <div class="myReward-content">
                <div v-if="isShow==1">
                    <p>{{reward}}<img src="../../assets/jinbi.png" alt=""></p>
                    <p>累计奖励金额</p>
                </div>
                <div v-if="isShow==2">
                    <p>{{apprentice}}<span style="font-size:0.7rem;"></span></p>
                    <p>累计好友人数</p>
                </div>
            </div>
            <div class="myReward-foot">
                <div v-if="listData.length>0 && isShow==1" v-for="(item,index) in listData" :key="index">
                    <div class="myReward-footInner">
                        <div class="myReward-footInnerLeft">
                            <p>徒弟贡献</p>
                            <p>{{item.changedTime | formatDate}}</p>
                        </div>
                        <div class="myReward-footInnerRight">+{{item.amount}} <img src="../../assets/jinbi.png" alt="" style="width:0.8rem;height:0.8rem;margin: 0;"></div>
                    </div>
                    <div class="myReward-footBaseline"></div>
                </div>
                <div v-if="apprenticeList.length>0 && isShow==2" v-for="(item,index) in apprenticeList" :key="index">
                    <div class="myReward-footInner">
                        <div class="myReward-footInnerSecondLeft">
                            <div><img src="../../assets/myRrwardHead.png"/></div>
                            <div>
                                <p>{{item.apprenticeMobile}} <span v-if="item.apprenticeType == 2">(达人邀请)</span></p>
                                <p>{{item.createTime | formatDate}}</p>
                            </div>
                        </div>
                        <div class="myReward-footInnerRight">累计贡献 {{item.contribution}}金币</div>
                    </div>
                    <div class="myReward-footBaseline"></div>
                </div>
            </div>
            <div>
                <div class="myReward-Block-none"  v-if="nolist && isShow==1">
                    <img src="../../assets/myRrwardHeadOne.png" alt="" style="width: 5.5rem;height: 3.55rem;">
                    <!-- <p>暂时没有奖励记录</p> -->
                    <div @click="open"><img src="../../assets/myRrwardBtn.png" alt=""></div>
                </div>
                <div class="myReward-Block-none"  v-if="nolisttd && isShow==2">
                    <img src="../../assets/myRrwardHeadTwo.png" alt="" style="width: 2.8rem;height: 3.5rem;">
                    <!-- <p>暂未收徒</p> -->
                    <div @click="open"><img src="../../assets/myRrwardBtn.png" alt=""></div>
                </div>
            </div>
        <!-- </mt-loadmore> -->
        </scroller>
        <!-- <recruitBox v-show="isShowFrame" @clickit="close"></recruitBox> -->

    </div>
</template>
<script>
// import recruitBox from '../../components/popupBox/recruitBox'
import {formatDate} from '../../utils/date.js'
// import Vue from 'vue'
// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)
export default {
    data(){
        return {
            isShow:true,
            isShowFrame:false,
            listData:{},
            apprenticeList:{},
            isWeb:true,
            token:'',
            imei:'',
            reward:'0',
            apprentice:"0",

            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
            noDataText:'',
            total:0,
            nolist:false,
            nolisttd:false,
            isInfo: true,
            isPull:false,
            par:1
        }
    },
    // components:{
    //     recruitBox,
    // },
    created(){
        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        this.apprentice = APP.GetLocationParams("apprentice");
        this.reward = APP.GetLocationParams("reward");
        // this.apprentice = this.$route.query.apprentice;
        // this.reward = this.$route.query.reward;
        // this.token = this.$route.query.token;
        // this.imei = this.$route.query.imei;
        this.getInfo()
    },
    filters: {
        formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
        }
    },
    methods:{
        open() {
            if(this.isAndroid()){
                window.android.inviteFriend('https://web.shouzhuan518.com/#/register?qrCode='+this.qrCode);
            }else if(this.isIos()){
                window.shareAction('https://web.shouzhuan518.com/#/register?qrCode='+this.qrCode);
            }
            // this.isShowFrame = true
            // window.android.inviteFriend('https://web.bzlyplay.com/#/register?qrCode='+this.qrCode);
        },
        close(){
            this.isShowFrame = false
        },
        getInfo(){
            this.isShow =1;
            this.apprenticeList =[]
            let parameterData = {
                pageSize : this.pageSize,
                pageNum : this.currentPage,
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/lCoinChange/getApprenticeRewardDetail',parameterData).then(res => {

                if((res.statusCode+"").startsWith("2")){
                    if(res.data.list.length>0){
                        if(res.data.total>10){
                            this.noDataText = ""
                              this.isPull=true
                        }else{
                            this.noDataText = "没有更多了"
                           this.isPull=false
                        }
                        this.total=res.data.total;
                        this.listData = res.data.list
                    }else{
                        this.isPull=false;
                        this.nolist=true;
                    }

                }else{
                     this.isPull=false;
                     this.nolist=true;
                }
            })
        },
        getApprenticeList(){
            this.isShow =2;
            this.listData =[]
            let parameterData = {
                pageSize : this.pageSize,
                pageNum : this.currentPage,
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/mUserApprentice/list',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    if(res.data.list.length>0){
                        if(res.data.total>10){
                            this.noDataText = ""
                            this.isPull=true
                        }else{
                            this.noDataText = "没有更多了"
                            this.isPull=false
                        }
                        this.total=res.data.total;
                        this.apprentice = res.data.total;
                        this.apprenticeList = res.data.list
                    }else{
                        this.isPull=false;
                        this.nolisttd=true;
                    }
                }else{
                    this.isPull=false;
                    this.nolisttd=true;
                }
            })
        },
        back(){
            window.location.href = '/generalizeDetails.html?token='+this.token+'&imei='+this.imei;
            // history.go(-1)
        },
        infinite(done) {
            this.noDataText = "";
            this.nolist = false;
            if(this.par==1){
                setTimeout(()=> {
                if(this.isPull){
                    this.currentPage++
                }
                if(this.listData.length>=this.total){
                    if(this.listData.length!=0){
                    this.noDataText = "没有更多了"
                    }
                    done(true)
                    return
                }
                let parameterData = {
                        pageSize : this.pageSize,
                        pageNum : this.currentPage,
                        token:this.token,
                        imei:this.imei
                    }
                    this.$get('/api/lCoinChange/getApprenticeRewardDetail',parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                    if (res.data.list.length > 0) {
                        if (this.currentPage > 1) {
                        this.total=res.data.total;
                        this.listData = this.listData.concat(res.data.list)
                        }
                        if(this.listData.length>=this.total){
                        this.noDataText = "没有更多了";
                        }else{
                        this.noDataText = "";
                        }
                    } else {
                        this.nolist = true;
                        this.noDataText = "";
                    }
                    } else {
                    this.nolist = true;
                    this.noDataText = "";
                    }
                })
                done(true)
                },1000);
            }else{
                setTimeout(()=> {
                if(this.isPull){
                    this.currentPage++
                }
                if(this.apprenticeList.length>=this.total){
                    if(this.apprenticeList.length!=0){
                    this.noDataText = "没有更多了"
                    }
                    done(true)
                    return
                }
                let parameterData = {
                    pageSize : this.pageSize,
                    pageNum : this.currentPage,
                    token:this.token,
                    imei:this.imei
                }
                this.$get('/api/mUserApprentice/list',parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                    if (res.data.list.length > 0) {
                        if (this.currentPage > 1) {
                            this.total=res.data.total;
                            this.apprenticeList = this.apprenticeList.concat(res.data.list)
                        }
                        if(this.apprenticeList.length>=this.total){
                            this.noDataText = "没有更多了";
                        }else{
                            this.noDataText = "";
                        }
                    } else {
                        this.nolisttd = true;
                        this.noDataText = "";
                    }
                    } else {
                        this.nolisttd = true;
                        this.noDataText = "";
                    }
                })
                done(true)
                },1000);
            }

        },
        refresh(done) {
            this.currentPage = 1;
            this.isPull = false;
            this.noDataText ="";
            this.nolist=false;
            this.total = 0;
            if(this.isShow == 1){
                this.listData = {};
                this.getInfo();
                done(true)
            }else if (this.isShow == 2){
                this.apprenticeList = {};
                this.getApprenticeList();
                done(true)
            }
        },
        isShowTap(par){
            this.listData = {};
            this.apprenticeList={};
            this.nolist=false;
            this.nolisttd =false;
            this.noDataText = "";
            this.isPull=false;
            this.total=0;
            this.par=par;
            this.currentPage=1;

            this.pageSize=10;
            this.isShow = par
            if (par == 1) {
                this.getInfo()
            }else{
                this.getApprenticeList()
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

}}
</script>

<style scoped>
p{
    margin: 0;
}
.myReward-head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
}
.myReward-head img{
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
}
.myReward-head p{
    color: #2d2e38;
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
}
.myReward-title{
    margin-top:2.2rem;
    height: 2.2rem;
    display: flex;
    justify-content: center;
    font-size: 0.7rem;
    background-color: #fff;
}
.myReward-titleLeft{
    width: 5.5rem;
    height: 1.6rem;
    line-height: 1.6rem;
    /* background-color: #F3572A; */
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B , #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B , #FF1370); /* 标准语法ie9标准的语法 */
    text-align: center;
    border: 0.05rem solid #FF2A4C;
    color: #fff;
}
.myReward-titleRight{
    width: 5.5rem;
    height: 1.6rem;
    line-height: 1.6rem;
    background-color: #fff;
    text-align: center;
    border: 0.05rem solid #FF2A4C;
    color: #FF2A4C;
}
.myReward-titleRightBorder{
    border-radius: 0.2rem 0 0 0.2rem;
}
.myReward-titleLeftBorder{
    border-radius: 0 0.2rem 0.2rem 0;
}
.myReward-content{
    height: 5.25rem;
    background-color: #fff;
    text-align: center;
    margin-top: 0.4rem;
}
.myReward-content p{
    margin: 0;
    color: #3C3E5B;
}
.myReward-content p:nth-of-type(1){
    font-size: 1.2rem;
    font-weight: bold;
    padding-top: 1.2rem;
    margin-right: 0.3rem;
}
.myReward-content p:nth-of-type(1) img{
    width: 0.8rem;
}
.myReward-content p:nth-of-type(2){
    font-size: 0.7rem;
    padding-top: 0.2rem;
}
.myReward-foot{
    margin-top: 0.4rem;
}
.myReward-footInner{
    height: 3.2rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.myReward-footInner p{
    margin: 0;
}
.myReward-footInnerLeft{
    margin-left: 0.8rem;
}
.myReward-footInnerLeft p:nth-of-type(1){
    font-size: 0.7rem;
    color: #3C3E5B;
}
.myReward-footInnerLeft p:nth-of-type(2){
    font-size: 0.6rem;
    color: #9EA9BC;
    margin-top: 0.2rem;
}
.myReward-footInnerRight{
    margin-right: 0.8rem;
    font-size: 0.7rem;
    color: #FF2A4C;
}
.myReward-footInner img{
    width: 2rem;
    height: 2rem;
    margin: 0 0.4rem 0 0.8rem;
}
.myReward-footInnerSecondLeft{
    display: flex;
}
.myReward-footInnerSecondLeft p:nth-of-type(1){
    font-size: 0.7rem;
    color: #3C3E5B;
}
.myReward-footInnerSecondLeft p:nth-of-type(2){
    font-size: 0.6rem;
    color: #9EA9BC;
    margin-top: 0.2rem;
}
.myReward-footInnerSecondLeft span{
    font-size: 0.5rem;
    color: #FF2A4C;
}
.myReward-footBaseline{
    border: 0.04rem solid #F2F2F2;
}
.myReward-Block-none{
    text-align: center;
}
.myReward-Block-none img{
    /* width: 2.8rem;
    height: 3.5rem; */
    margin-top: 1.85rem;
}
/* .myReward-Block-none p{ */
    /* font-size: 0.7rem;
    color: #9EA9BC;
    margin: 0.8rem 0 1.2rem 0; */
/* } */
.myReward-Block-none div img{
    width: 14.8rem;
    height: 2.2rem;
}
</style>

