<template>
    <div id="app"  style="height: 100vh;background: #F2F5F8;overflow: auto;">
        <div class="lp_head" @click="jump">
            <img src="../../assets/xyz/right.png" alt="">
            <p>邀请明细</p>
        </div>
        <div style="height:3rem;background-color:#DF3132;margin-top:2.2rem"></div>
        <div class="id_content">
            <div class="ip_top">
                <div>
                    <p>累计收益(元)</p>
                    <p>{{wishMentorCount.income | keepTwoNum}}</p>
                </div>
                <div></div>
                <div>
                    <p>好友人数(人)</p>
                    <p>{{wishMentorCount.number}}</p>
                </div>
            </div>
            <div class="ip_cha_font">
                <div v-for="(item,index) in nav" :class="activeClass == index ? 'active' : 'nochange'" @click="change(index)">
                    <p>{{item.name}}</p>
                    <div></div>
                </div>
            </div>


        </div>
        <div style="background-color:#fff;">
            <div v-if="activeClass == 0" style="padding-top:0.4rem;">
                <table>
                    <thead>
                        <tr>
                            <th style="width: 5rem;">手机号</th>
                            <th style="width: 5rem;">奖励</th>
                            <th style="width: 6rem;">时间</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item,index) in listData">
                        <tr style="margin:0.65rem 0;">
                            <td style="font-size:0.6rem;color:#9EA9BC;">{{item.mobile}}</td>
                            <td style="font-size:0.6rem;color:#FF333D;">+{{item.contribution | keepTwoNum}}元</td>
                            <td style="font-size:0.6rem;color:#9EA9BC;">{{item.updateTime | formatDate}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="activeClass == 1" style="padding-top:0.4rem;">
                <table>
                    <thead>
                        <tr>
                            <th style="width: 8rem;">手机号</th>
                            <th style="width: 8rem;">时间</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item,index) in friendList">
                        <tr style="margin:0.65rem 0;">
                            <td style="font-size:0.6rem;color:#9EA9BC;">{{item.mobile}}</td>
                            <td style="font-size:0.6rem;color:#9EA9BC;">{{item.createTime | formatDate}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="id_nolist" v-if="listData.length<=0 && activeClass == 0" @click="jump">
            <img src="../../assets/xyz/meiyoushuju.png" alt="">
            <p>暂无数据，<span>去邀请</span></p>
        </div>
        <div class="id_nolist" v-if="friendList.length<=0 && activeClass == 1" @click="jump">
            <img src="../../assets/xyz/meiyoushuju.png" alt="">
            <p>暂无数据，<span>去邀请</span></p>
        </div>

    </div>
</template>
<script>
import {formatDate} from '../../utils/date.js'

export default {
    data(){
        return{
            nav:[
                {name:'获得奖励'},
                {name:'我的好友'},
            ],
            activeClass:0,
            wishMentorCount:{},
            listData:{},
            friendList:{}
        }
    },
    created(){
        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        this.getWishMentorCount();
        this.getWishRewardPage();
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
        },
        keepTwoNum:function(value){
            value = Number(value);
            return value.toFixed(2)
        }
    },
    mounted () {
        window.test = this.test;
        // window.watchVideo = this.watchVideo;
        // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
        window.history.pushState(null, null, document.URL);
        // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
        window.addEventListener("popstate", this.onBrowserBack, false);
    },
    destroyed() {
        // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
        window.removeEventListener("popstate", this.onBrowserBack, false);
    },
    watch: {
        // 弹框监听，当弹框显示的时候，pushState添加一个历史，供返回键使用
        PopupShow: {
            handler(newVal, oldVal) {
                if (newVal.Terms === true) {
                    window.history.pushState(null, null, document.URL);
                }
            },
            deep: true
        }
    },
    methods:{
        onBrowserBack(){
            this.jump();
        },
        jump(){
            // if(this.isAndroid()){
            //     window.android.over();
            // }else if(this.isIos()){
            //     // this.isShow = false;
            //     window.backAction();
            // }else{
            //     }
            window.location.href = '/xyzInvitePage.html?token='+this.token+'&imei='+this.imei;
        },
        change(index){
            this.activeClass = index;
            if(this.activeClass == 1){
                this.getWishNumberPage();
            }
        },
        // 收益统计
        getWishMentorCount(){
            let parameterData = {
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/mUserApprentice/wishMentorCount',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.wishMentorCount = res.data;
                }
            })
        },
        // 收益记录
        getWishRewardPage(){
            let parameterData = {
                pageSize : 50,
                pageNum : 1,
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/mUserApprentice/wishRewardPage',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data.list;
                }
            })
        },
        // 邀请好友列表
        getWishNumberPage(){
            let parameterData = {
                pageSize : 50,
                pageNum : 1,
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/mUserApprentice/wishNumberPage',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.friendList = res.data.list;
                }
            })
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
}
/* 标题头 */
.lp_head{
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #DF3132;
    position: fixed;
    z-index:100;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
}
.lp_head img{
    width: 0.5rem;
    height: 0.8rem;
    margin-left: 0.8rem;
}
.lp_head p{
    font-size: 0.85rem;
    color: #fff;
    margin-left: 6rem;
}
.id_content{
    background-color: #fff;
    border-radius: 0.45rem 0.45rem 0 0;
    margin-top: -0.7rem;
    padding: 0.8rem 0 0 0.8rem;
}
.ip_top{
    width: 13.95rem;
    /* margin: 0.8rem; */
    background-image: url('../../assets/xyz/Group.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    color: #fff;
    padding: 0.95rem 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ip_top div:nth-of-type(1){
    margin-left: 1rem;
}
.ip_top div:nth-of-type(3){
    margin-right: 1rem;
}
.ip_top div:nth-of-type(1) p:nth-of-type(1){
    font-size: 0.55rem;
    margin-bottom: 0.1rem;
}
.ip_top div:nth-of-type(1) p:nth-of-type(2){
    font-size: 1rem;
}
.ip_top div:nth-of-type(3) p:nth-of-type(1){
    font-size: 0.55rem;
    margin-bottom: 0.1rem;
}
.ip_top div:nth-of-type(3) p:nth-of-type(2){
    font-size: 1rem;
}
.ip_top div:nth-of-type(2){
    border: 1px solid #E4E2FB;
    height: 1.2rem;
}
.ip_cha_font{
    display: flex;
    justify-content: space-around;
    margin-top: 0.9rem;
}
.nochange{
    font-size: 0.7rem;
    color: #9EA9BC;
}
.active{
    font-size: 0.7rem;
    color: #FF333D;
}
.active div{
    border: 1px solid #FF333D;
}
table{
    text-align: center;
    padding: 0;
    margin: 0 auto;
    border-top:1px solid #E8E8E8;
    border-collapse:collapse;
}
thead th{
    border-bottom:1px solid #E8E8E8;
    font-size: 0.6rem;
    color: #3C3E5B;
    padding: 0.4rem 0;
}
tbody td{
    padding: 0.65rem 0 ;
    border-bottom:1px solid #E8E8E8;
}
.id_nolist{
    text-align: center;
    margin: 1.9rem auto 0 auto;
    font-size: 0.65rem;
    color: #A0A9BB;
}
.id_nolist img{
    width: 4.4rem;
    margin-bottom: 0.6rem;
}
.id_nolist span{
    color: #FF333D;
}
</style>

