<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
        <div class="mp_head" @click="back">
            <img src="../../assets/right.png" alt="">
            <p>我的奖品</p>
        </div>
        <div class="mp_toggle">
            <div v-for="(item,index) in nav" :class="status == item.id ? 'active' : ''" class="mp_toggle_inner">
                <span @click="toggle(item.id)">{{item.text}}</span>
                <div class="mp_line"></div>
            </div>
        </div>
        <!-- 全部 -->
        <div class="mp_list" v-for="(item,index) in listData" v-if="status==1" @click="jump(item.id)">
            <div class="mp_list_left">
                <p>{{item.obtainPigCoin / 10000}}万金猪兑换卡
                    <span class="mp_spantop" v-if="item.state == 1">未使用</span>
                    <span class="mp_spanbottom" v-if="item.state == 2">已使用</span>
                </p>
                <p>卡号：{{item.cardNumber}}</p>
            </div>
            <div class="mp_list_right">
                <p>{{item.obtainPigCoin / 10000}}万</p>
                <img src="../../assets/jinzhu.png" alt="">
                <img src="../../assets/rightTab.png" alt="">
            </div>
        </div>
        <!-- 未使用 -->
        <div class="mp_list" v-for="(item,index) in listData" v-if="status==2 && item.state == 1" @click="jump(item.id)">
            <div class="mp_list_left">
                <p>{{item.obtainPigCoin / 10000}}万金猪兑换卡
                    <span class="mp_spantop" v-if="item.state == 1">未使用</span>
                    <!-- <span class="mp_spanbottom" v-if="item.state == 2">已使用</span> -->
                </p>
                <p>卡号：{{item.cardNumber}}</p>
            </div>
            <div class="mp_list_right">
                <p>{{item.obtainPigCoin / 10000}}万</p>
                <img src="../../assets/jinzhu.png" alt="">
                <img src="../../assets/rightTab.png" alt="">
            </div>
        </div>
        <!-- 已使用 -->
        <div class="mp_list" v-for="(item,index) in listData" v-if="status==3 && item.state == 2" @click="jump(item.id)">
            <div class="mp_list_left">
                <p>{{item.obtainPigCoin / 10000}}万金猪兑换卡
                    <!-- <span class="mp_spantop" v-if="item.state == 1">未使用</span> -->
                    <span class="mp_spanbottom" v-if="item.state == 2">已使用</span>
                </p>
                <p>卡号：{{item.cardNumber}}</p>
            </div>
            <div class="mp_list_right">
                <p>{{item.obtainPigCoin / 10000}}万</p>
                <img src="../../assets/jinzhu.png" alt="">
                <img src="../../assets/rightTab.png" alt="">
            </div>
        </div>

        <div class="mp_nomsg" v-if="this.listData.length <= 0 || this.listData.length == null">
            <img src="../../assets/meiyourshuju.png" alt="">
            <p>您还没有金猪兑换卡，赶快去参加金猪砸金蛋！</p>
            <div @click="jumppage">开始砸金蛋</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nav:[
                {id:1, text:'全部'},
                {id:2, text:'未使用'},
                {id:3, text:'已使用'},
            ],
            status:1,
            listData:{}
        }
    },
    created(){
        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        this.getInfo();
    },
    methods:{
        toggle(id){
            this.status = id;
        },
        // 详情
        getInfo(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                pageNum:1,
                pageSize:100
            }
            this.$get('/api/goleEggOrder/appList',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data.list;
                }
            })
        },
        jump(id){
            window.location.href = '/eggDetails.html?id='+id+'&token='+this.token+'&imei='+this.imei;
        },
        back(){
            // window.history.go(-1);
            self.location=document.referrer;
        },
        jumppage(){
            window.location.href = '/goldenEggs.html?token='+this.token+'&imei='+this.imei;
        }
    }
}
</script>

<style scoped>
p{
    margin: 0;
}
/* 标题头 */
.mp_head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index:100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    /* border-bottom: 1px solid #EFEFEF; */
}
.mp_head img{
    width: 0.5rem;
    height: 0.8rem;
    margin-left: 0.8rem;
}
.mp_head p{
    color: #1D1D1D;
    font-size: 0.85rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
    margin-left: 6.2rem;
}
.mp_toggle{
    margin-top: 2.2rem;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    height: 2.2rem;
    line-height: 1.1rem;
    font-size: 0.7rem;
    color: #9EA9BC;
    border-bottom: 0.05rem solid #EEEEEE;
}
.mp_toggle .active{
    color: #FF3259;
}
.active .mp_line{
    text-align: center;
    height: 0.1rem;
    width: 1.2rem;
    background: red;
    margin: 0 auto;
}
.mp_toggle_inner{
    margin-top: 0.4rem;
}
.mp_list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid #EEEEEE;
    padding: 0.5rem 0.8rem;
}
.mp_list_left p:nth-of-type(1){
    font-size: 0.7rem;
    color: #3C3E59;
    margin-bottom: 0.1rem;
}
.mp_list_left p:nth-of-type(2){
    font-size: 0.6rem;
    color: #9EA9BC;
}
.mp_spantop{
    width: 1.9rem;
    background-color: #ff8798;
    font-size: 0.5rem;
    color: #fff;
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
}
.mp_spanbottom{
    width: 1.9rem;
    background-color: #c8ced9;
    font-size: 0.5rem;
    color: #fff;
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
}
.mp_list_right{
    display: flex;
    align-items: center;
}
.mp_list_right p{
    font-size: 0.7rem;
    color: #FF2B48;
}
.mp_list_right img:nth-of-type(1){
    width: 0.9rem;
    height: 0.9rem;
    margin: 0 0.15rem;
}
.mp_nomsg{
    text-align: center;
}
.mp_nomsg{
    text-align: center;
}
.mp_nomsg img{
    width: 6.2rem;
    margin: 2rem 0 0.8rem 0;
}
.mp_nomsg p{
    font-size: 0.7rem;
    color: #9EA9BC;
}
.mp_nomsg div{
    width: 7.5rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.7rem;
    color: #fff;
    margin: 1.2rem auto 0 auto;
    border-radius: 0.3rem;
    letter-spacing: 0.1rem;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF3E2B , #FF1370); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF3E2B , #FF1370); /* 标准语法ie9标准的语法 */
}
</style>

