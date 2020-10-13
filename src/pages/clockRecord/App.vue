<template>
    <div id="app" style="height: 100vh;background: #F2F5F8;overflow: auto;">
        <div class="cr_head" @click="back">
            <img src="../../assets/right.png" />
            <p>打卡记录</p>
        </div>
        <div class="cr_bg">
            <img src="../../assets/clockbg.png" alt="">
        </div>
        <div class="cr_top">
            <div>
                <p>累计参与(金币)</p>
                <p>{{(clockinCount.payCoin)}}</p>
            </div>
            <div>
                <p>累计赚取(金币)</p>
                <p>{{clockinCount.rewardCoin}}</p>
            </div>
            <div>
                <p>连续打卡(天)</p>
                <p>{{clockinCount.days}}</p>
            </div>
        </div>
        <div>
            <div class="cr_title">
                <p>打卡详情</p>
            </div>
            <div class="cr_nodata" v-if="this.listData.length<=0">
                <img src="../../assets/meiyourenwumianban.png" alt="">
                <p>暂无打卡记录</p>
            </div>
            <!-- height:78vh;overflow: auto; -->
            <div style="background-color: #ffff;">
                <div class="cr_list" v-for="(item,index) in listData">
                    <p style="width:4.35rem;">{{item.checkinTime}}</p>
                    <div style="width:3.35rem;">
                        <!-- 状态1待打卡，2打卡成功，3打卡失败 -->
                        <p v-if="item.state == 1">打卡中…</p>
                        <p style="color:#5ED23A;" v-if="item.state == 2">打卡成功</p>
                        <p style="color:#FF848A" v-if="item.state == 3">打卡失败</p>
                    </div>
                    <p style="color:#5ED23A;width:7.9rem;text-align: right;" v-if="item.state == 2">{{item.rewardCoin}}</p>
                    <p style="color:#FF333D;width:7.9rem;text-align: right;" v-if="item.state == 3">{{item.rewardCoin}}</p>
                    <p style="color:#FF333D;width:7.9rem;text-align: right;" v-if="item.state == 1"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            clockinCount:{
                payCoin:'0',
                rewardCoin:'0',
                days:'0'
            },
            listData:{}
        };
    },
    created(){
        this.token =APP.GetLocationParams("token")
        this.imei=APP.GetLocationParams("imei");
        this.getClockinCount();
        this.getInfo();
    },
    methods: {
        getInfo(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                pageNum:1,
                pageSize:50
            }
            this.$get('/api/checkinLog/userList', parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data.list;
                    for(var i = 0;res.data.list.length>i;i++){
                        if(res.data.list[i].rewardCoin == '0' || res.data.list[i].rewardCoin == 0){
                            res.data.list[i].rewardCoin = '待奖励';
                        }else{
                            if(res.data.list[i].state == 2){
                                res.data.list[i].rewardCoin = '+'+res.data.list[i].rewardCoin+'金币';
                            }else if(res.data.list[i].state == 3){
                                res.data.list[i].rewardCoin = res.data.list[i].rewardCoin+'金币';
                            }
                        }
                    }
                }
            });
        },
        getClockinCount(){
            let parameterData = {
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/checkinLog/clockinCount', parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.clockinCount = res.data;
                    if(res.data.payCoin == 0 || res.data.payCoin == '0'){
                        this.clockinCount.payCoin = res.data.payCoin;
                    }else{
                        this.clockinCount.payCoin = (res.data.payCoin / 10000).toFixed(2)+'W';
                    }
                    if(res.data.rewardCoin == 0 || res.data.rewardCoin == '0'){
                        this.clockinCount.rewardCoin = res.data.rewardCoin;
                    }else{
                        this.clockinCount.rewardCoin = (res.data.rewardCoin / 10000).toFixed(2)+'W';
                    }
                }
            });
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
.cr_head{
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
.cr_head img{
    height: 0.8rem;
    position: absolute;
    top: 0.7rem;
    left: 0.75rem;
}
.cr_head p{
    color: #000;
    font-size: 0.9rem;
    position: absolute;
    top: 0.45rem;
    left: 7.2rem;
}
.cr_bg{
    background-color: #fff;
}
.cr_bg img{
    width: 16.8rem;
    margin: 2.65rem 0 0 0.6rem;
}
.cr_top{
    width: 16.8rem;
    display: flex;
    justify-content: space-around;
    color: #fff;
    margin: -3.6rem 0 1.2rem 0.6rem;
    text-align: center;
}
.cr_top div p:nth-of-type(1){
    font-size: 0.55rem;
    margin-bottom: 0.2rem;
}
.cr_top div p:nth-of-type(2){
    font-size: 1rem;
}
.cr_title{
    font-size: 0.7rem;
    color: #3C3E5B;
    background-color: #fff;
    height: 2.05rem;
    line-height: 2.05rem;
    padding-left: 0.6rem;
    border-bottom: 1px solid #E8E8E8;
}
.cr_nodata{
    text-align: center;
}
.cr_nodata img{
    width: 4.4rem;
    margin: 0.8rem 0 0 0.4rem;
}
.cr_nodata p{
    font-size: 0.6rem;
    color: #B1BAC8;
}
.cr_list{
    width: 15.6rem;
    font-size: 0.6rem;
    color: #9EA9BC;
    display: flex;
    height: 2.05rem;
    line-height: 2.05rem;
    align-items: center;
    padding: 0 0.6rem;
    border-bottom: 1px solid #E8E8E8;
    margin: 0 0.6rem;
    justify-content: space-between;
}
</style>
