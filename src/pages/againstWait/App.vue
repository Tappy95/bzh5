<template>
    <div id="app" class="againstWait-bg">
        <div class="againstWait-head">
            <img src="../../assets/enlighteningRight.png" @click="back"/>
            <p>对战答题</p>
        </div>
        <div class="againstWait-content">
            <div>
                <img src="../../assets/wait.gif" alt="">
            </div>
            <p>正在为您匹配对手（{{content}}秒）</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            content:15,
            totalTime:15,
            time:0,
            clock:null
        }
    },
    created(){
        this.randomUser();
    },
    mounted(){
        window.back = this.back
    },
    destroyed() {
        clearInterval(this.clock);
        this.clock = null;
        this.cancelMatching();
    },
    methods:{
         randomUser(){
            this.content = this.totalTime
            this.clock = window.setInterval(() => {
                this.totalTime--;
                this.time++;
                this.content = this.totalTime
                if(this.totalTime%2 == 0){ // 没两秒执行一次
                    let parameterData = {
                        token:window.sessionStorage.getItem("token"),
                        imei:window.sessionStorage.getItem("imei"),
                        time:this.time
                    }
                    this.$get('/api/mFightingInfo/randomUser',parameterData).then(res => {
                        if((res.statusCode+"").startsWith("2")){
                            if(res.data.res==1){
                                clearInterval(this.clock);

                              window.location.href = "/startAgainst.html?enemyimg="+res.data.enemyImg+'&img='+res.data.img+
                                                    '&enemyMoile='+res.data.enemyMoile+'&mobile='+res.data.mobile+'&entryCode='+ res.data.entryCode+
                                                    '&quesNum='+res.data.quesNum+'&fightId='+res.data.fightId+'&role='+res.data.role;

                                // this.$router.push({
                                //     path:'/startAgainst',
                                //     query:{
                                //         enemyimg:res.data.enemyImg,
                                //         img:res.data.img,
                                //         enemyMoile:res.data.enemyMoile,
                                //         role:res.data.role,
                                //         mobile:res.data.mobile,
                                //         entryCode:res.data.entryCode,
                                //         quesNum:res.data.quesNum,
                                //         fightId:res.data.fightId
                                //     }
                                // });
                            }
                        }
                    });
                    if(this.content <= 0){
                        history.go(-1);
                    }
                }
            },1000)

        },
        cancelMatching(){
             let parameterData = {
                token:window.sessionStorage.getItem("token"),
                imei:window.sessionStorage.getItem("imei")
            }

            this.$get('/api/mFightingInfo/cancelMatching',parameterData).then(res => {
            });
        },
        back(){
            window.android.over();
            this.cancelMatching()
        }
    }
}
</script>

<style scoped>
/* 背景 */
.againstWait-bg{
    background-image: url('../../assets/againstBg.png');
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    width: 100%;
}
/* 返回头 */
.againstWait-head{
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.againstWait-head img{
    width: 0.5rem;
    height: 0.8rem;
    position: absolute;
    left: 0.75rem;
}
.againstWait-head p{
    font-size: 0.9rem;
    color: #fff;
}
/* 内容 */
.againstWait-content{
    text-align: center;
    margin-top: 4.8rem;
}
.againstWait-content img{
    width: 3.6rem;
    height: 3.6rem;
}
.againstWait-content p{
    font-size: 0.8rem;
    color: #fff;
}
</style>

