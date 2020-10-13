<template>
    <div id="app" style="height: 100vh;background: #8C15E4;overflow: auto;">
        <div style="position: relative;">
            <div class="tl_bg">
                <img src="../../assets/phbBg.png" alt="">
            </div>
            <div class="tl_title">
                <img src="../../assets/enlighteningRight.png" alt="" @click="over">
                <div class="tl_title_inner">
                    <div>!</div>
                    <p @click="jump">奖励说明</p>
                </div>
            </div>
            <div class="tl_font">{{startStr}}-{{endStr}}</div>
            <div class="tl_head">
                <img src="../../assets/phbHead.png" alt="">
            </div>

            <!-- <div class="tl_phb_left" :class="['tl_phb_left'+index]" v-for="(item,index) in topData" v-if="item.rankOrder < 4">
                <div class="tl_phb_left_img">
                    <img :src="item.imageUrl" alt="">
                    <img src="../../assets/numOne.png" alt="" v-if="index==1">
                    <img src="../../assets/numTwo.png" alt="" v-if="index==0">
                    <img src="../../assets/numThree.png" alt="" v-if="index==2">
                </div>
                <div class="tl_phb_left_font">
                    <p>{{item.mobile}}</p>
                    <div class="tl_phb_left_fontinner">
                        <img src="../../assets/jinzhu.png" alt="">
                        <p>{{item.pigBalance / 10000}}万</p>
                    </div>
                </div>
            </div> -->

            <!-- 第二 -->
            <div class="tl_phb_left">
                <div class="tl_phb_left_img">
                    <img :src="topData.imageUrl" alt="">
                    <img src="../../assets/numTwo.png" alt="">
                </div>
                <div class="tl_phb_left_font">
                    <p>{{topData.mobile}}</p>
                    <div class="tl_phb_left_fontinner">
                        <img src="../../assets/jinzhu.png" alt="">
                        <p>{{topData.pigBalance}}</p>
                    </div>
                </div>
            </div>

            <!-- 第一 -->
            <div class="tl_phb_left1">
                <div class="tl_phb_left_img">
                    <img :src="cenData.imageUrl" alt="">
                    <img src="../../assets/numOne.png" alt="">
                </div>
                <div class="tl_phb_left_font">
                    <p>{{cenData.mobile}}</p>
                    <div class="tl_phb_left_fontinner">
                        <img src="../../assets/jinzhu.png" alt="">
                        <p>{{cenData.pigBalance}}</p>
                    </div>
                </div>
            </div>

            <!-- 第三 -->
            <div class="tl_phb_left2">
                <div class="tl_phb_left_img">
                    <img :src="secData.imageUrl" alt="">
                    <img src="../../assets/numThree.png" alt="">
                </div>
                <div class="tl_phb_left_font">
                    <p>{{secData.mobile}}</p>
                    <div class="tl_phb_left_fontinner">
                        <img src="../../assets/jinzhu.png" alt="">
                        <p>{{secData.pigBalance}}</p>
                    </div>
                </div>
            </div>

            <div>
                <div class="tl_list">
                    <div v-for="(item,index) in listData" class="tl_list_inner" v-if="item.rankOrder > 3">
                        <div class="tl_list_left">
                            <p>{{item.rankOrder}}</p>
                            <img :src="item.imageUrl" alt="">
                            <p>{{item.mobile}}</p>
                        </div>
                        <div class="tl_list_right">
                            <img src="../../assets/jinzhu.png" alt="">
                            <p>{{item.pigBalance}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style="position: absolute;top: 36rem;background-color: rgb(140, 21, 228);width: 100%;height: 2.2rem;margin-top: 0.5rem;"></div>

            <div class="tl_bottom">
                <div class="tl_bottom_left">
                    <p>我的名次：<span>{{rankOrder}}</span></p>
                    <p>累计赢取金猪：<span>{{(pigBalance /10000).toFixed(2)}} 万</span></p>
                </div>
                <div class="tl_bottom_right" @click="over">我要赚金猪</div>
            </div>

        </div>

    </div>
</template>
<script>

export default {
    data(){
        return{
            topData:{
                imageUrl:'',
                mobile:'',
                pigBalance:''
            },
            cenData:{
                imageUrl:'',
                mobile:'',
                pigBalance:''
            },
            secData:{
                imageUrl:'',
                mobile:'',
                pigBalance:''
            },
            listData:{},
            startStr:'',
            endStr:'',
            rankOrder:'暂未上榜',
            pigBalance:'0',

            currentPage: 1,
            pageSize: 100
        }
    },

    created(){
        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        this.getList();
        this.getInfo();
    },
    methods:{
        //列表
        getList(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                rankType:3,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            }
            this.$get('/api/rankPig/listF',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data.list;
                    for(var i = 0;i<res.data.list.length;i++){
                        if(res.data.list[i].pigBalance >= 100000000){
                            res.data.list[i].pigBalance = (res.data.list[i].pigBalance / 100000000).toFixed(2) +" 亿";
                        }else if(res.data.list[i].pigBalance >= 10000){
                            res.data.list[i].pigBalance = (res.data.list[i].pigBalance / 10000).toFixed(2) +" 万";
                        }
                        if(res.data.list[i].rankOrder==1){
                            this.cenData = res.data.list[i];
                        }else if(res.data.list[i].rankOrder==2){
                            this.topData = res.data.list[i];
                        }else if(res.data.list[i].rankOrder==3){
                            this.secData = res.data.list[i];
                        }
                    }
                }
            })
        },
        // 我的
        getInfo(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                rankType:3
            }
            this.$get('/api/rankPig/queryMyRank',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.startStr = res.data.startStr;
                    this.endStr = res.data.endStr;
                    if(res.data.lRankPigSimple.rankOrder > 100){
                        this.rankOrder = '暂未上榜';
                    }else{
                        this.rankOrder = res.data.lRankPigSimple.rankOrder + '名';
                    }
                    this.pigBalance = res.data.lRankPigSimple.pigBalance;
                }
            })
        },
        jump(){
            // this.$router.push({
            //     path:'/awardState'
            // })
            window.location.href = '/awardState.html';
        },
        over(){
            if(this.isAndroid()){
                window.android.over();
            }else if(this.isIos()){
                window.goBackAction();
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
}
</script>

<style scoped>
p{
    margin: 0;
    padding: 0;
}
.tl_bg{
    /* position: relative; */
}
.tl_bg img{
    width: 18rem;
}
.tl_title{
    display: flex;
    align-items: center;
    position: absolute;
    top: 2rem;
    padding: 0 0.75rem;
}
.tl_title_inner{
    display: flex;
    margin-left: 12.2rem;
    color: #fff;
    font-size: 0.7rem;
    align-items: center;
}
.tl_title_inner div{
    width: 0.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-right: 0.2rem;
}
.tl_font{
    position: absolute;
    font-size: 0.7rem;
    color: #fff;
    top: 4.3rem;
    left: 6.35rem;
}
.tl_title img{
    width: 0.5rem;
    height: 0.8rem;
}
.tl_head{
    position: absolute;
    top: 9rem;
    left: 0.8rem;
}
.tl_head img{
    width: 16.4rem;
}
.tl_phb_left{
    position: absolute;
    text-align: center;
    top: 11rem;
    left: 0.8rem;
    width: 5.5rem;
}
.tl_phb_left0{
    /* top: 11rem;
    left: 1.75rem; */
}
.tl_phb_left1{
    position: absolute;
    text-align: center;
    top: 10.5rem;
    left: 6.3rem;
    width: 5.4rem;
}
.tl_phb_left2{
    position: absolute;
    text-align: center;
    top: 11rem;
    left: 11.8rem;
    width: 5.5rem;
}
.tl_phb_left_img img:nth-of-type(1){
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
}
.tl_phb_left_img img:nth-of-type(2){
    width: 1.6rem;
    position: absolute;
    top:1.5rem;
    left: 3rem;
}
.tl_phb_left1 .tl_phb_left_img img:nth-of-type(1){
    width: 2.8rem;
    height: 2.8rem;
}
.tl_phb_left1 .tl_phb_left_img img:nth-of-type(2){
    width: 1.6rem;
    position: absolute;
    top: 2.1rem;
    left: 3rem;
}
.tl_phb_left_font{
    font-size: 0.6rem;
    color: #2D2E39;
}
.tl_phb_left_fontinner{
    display: flex;
    align-items: center;
    justify-content: center;
}
.tl_phb_left_fontinner img{
    width: 0.6rem;
    height: 0.6rem;
    margin-right: 0.1rem;
}
.tl_phb_left_fontinner p{
    font-size: 0.6rem;
    color: #FF2B48;
}
.tl_phb_left1 .tl_phb_left_fontinner p{
    font-size: 0.65rem;
    color: #FF2B48;
}
.tl_list{
    width: 16.4rem;
    height: 20.35rem;
    position: absolute;
    background-color: #fff;
    margin: 0 0.8rem;
    top: 15.7rem;
    overflow-y: scroll;
    border-radius: 0 0 0.3rem 0.3rem;
}
.tl_list_inner{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.65rem;
}
.tl_list_left{
    display: flex;
    align-items: center;
}
.tl_list_left img{
    width: 1.65rem;
    height: 1.65rem;
    border-radius: 50%;
    margin-right: 0.45rem;
}
.tl_list_left p:nth-of-type(1){
    font-size: 0.6rem;
    color: #9EA9BC;
    margin: 0 0.2rem 0 .8rem;
    width: 1.4rem;
}
.tl_list_left p:nth-of-type(2){
    font-size: 0.6rem;
    color: #2D2E39;
}
.tl_list_right{
    display: flex;
    align-items: center;
}
.tl_list_right img{
    width: 0.6rem;
    height: 0.6rem;
}
.tl_list_right p{
    font-size: 0.65rem;
    color: #FF2B48;
    margin: 0 0.8rem 0 0.1rem;
}
.tl_bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 2.4rem;
    padding: 0 0.8rem;
}
.tl_bottom_left{
    font-size: 0.6rem;
    color: #9EA9BC;
}
.tl_bottom_left p:nth-of-type(1) span{
    color: #2D2E39;
}
.tl_bottom_left p:nth-of-type(2) span{
    color: #FF2B48;
}
.tl_bottom_right{
    width: 4.85rem;
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 0.6rem;
    color: #fff;
    border-radius: 1rem;
    text-align: center;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B , #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B , #FF1370); /* 标准语法ie9标准的语法 */
}

</style>

