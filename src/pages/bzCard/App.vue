<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow-x: hidden;">
        <!-- <div class="bzCard-head">
            <img src="../../assets/right.png" />
            <p>宝猪会员</p>
        </div> -->
        <div class="bzCard-content" v-if="listData.length>0">
            <div class="bzCard-content-one" :key="item.id" v-for="(item,index) in listData" :class="item.status == 1 ? '' : 'bzCard-content-two'">
                <div>
                    <p class="bacard_font" :class="item.status == 1 ? '' : 'bacard_font_two'">{{item.name}}</p>
                    <p>有效期至{{item.expireTime}}</p>
                </div>
                <div>
                    <img :src="item.logo" alt="" v-if="item.status == 1">
                    <img :src="item.overdueImg" alt="" v-if="item.status == 2">
                </div>
            </div>
            <div style="width:7.8rem"></div>
        </div>
        <div style="margin-top:3.5rem;text-align:center" v-else>
            <img src="../../assets/cardbg.png" alt="" style="width:5.1rem;">
            <p style="font-size:0.8rem;color:#3C3E59">暂时没有卡券</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            listData:[],
            token:'',
            imei:''
        }
    },
    created(){
        this.token =APP.GetLocationParams("token")
        this.imei=APP.GetLocationParams("imei")
        this.getInfo()
    },
    methods:{
        getInfo(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
            }
            this.$get('/api/lUserVip/queryMyVipsRecord',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data
                }
            })
        }
    }
}
</script>

<style scoped>
.bzCard-head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
}
.bzCard-head img{
    height: 0.8rem;
    position: absolute;
    top: 0.7rem;
    left: 0.75rem;
}
.bzCard-head p{
    color: #000;
    font-size: 0.9rem;
    position: absolute;
    top: -0.4rem;
    left: 7.2rem;
}
.bzCard-content{
    margin-top: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: #F3F5F8;
}
.bzCard-content p{
    margin: 0;
}
.bzCard-content-one img{
    width: 1.4rem;
}
.bzCard-content-one{
    width: 7.8rem;
    height: 3.6rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-left: 0.1rem;
    border-radius: 0.4rem;
    margin-bottom: 0.4rem;
    background-size: contain;
    background-position: center center;
    background-image: url('../../assets/cardimg.png')
}
.bzCard-content-two{
    width: 7.8rem;
    height: 3.6rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-left: 0.1rem;
    border-radius: 0.4rem;
    margin-bottom: 0.4rem;
    background-size: cover;
    background-position: center center;
    background-image: url('../../assets/lose.png')
}
.bzCard-content-one .bacard_font{
    color: #000;
    font-size: 0.7rem;
    /* font-weight: bold; */
    margin-bottom: 0.1rem;
}
.bzCard-content-one .bacard_font_two{
    color: #8F91A1;
    font-size: 0.7rem;
    /* font-weight: bold; */
    margin-bottom: 0.1rem;
}
.bzCard-content-one div:nth-of-type(1) p:nth-of-type(2){
    color: #9EA9BC;
    font-size: 0.5rem;
}
</style>
