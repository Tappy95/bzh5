<template>
    <div id="app" style="height: 100vh;background: #9500FF;overflow-x: hidden;">
        <div style="position: relative;">
            <div class="as_bg">
                <img src="../../assets/jlsmBg.png" alt="">
            </div>
            <div class="as_back">
                <img src="../../assets/enlighteningRight.png" alt="" @click="backTap">
            </div>
            <div class="as_img">
                <img src="../../assets/jlsmone.png" alt="">
                <img src="../../assets/jlsmtwo.png" alt="">
                <img src="../../assets/jlsmthree.png" alt="">
                <img src="../../assets/jlsmfour.png" alt="">
                <img src="../../assets/jlsmfive.png" alt="">
            </div>
            <div class="as_font">
                <p><span>1</span>每月冲榜活动，主要限于用户在平台上金猪乐园中游戏赢取的积分统计，每次统计上月至月底金猪赢取数；</p>
                <p><span>2</span>活动期间，每月月底进行结算和派奖；</p>
                <p><span>3</span>排行榜按赢取金猪数进行排名，同数据时，越早达成，名次越靠前。</p>
                <p><span>4</span>奖励将通过【平台通知】告知用户。</p>
                <p><span>5</span>良性娱乐，禁止一切不法行为，最终解释权归平台所有；一经发现违规行为，平台有权不派发奖励。</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        backTap(){
            window.history.go(-1);
        }
    }
}
</script>

<style scoped>
p{
    margin: 0;
    padding: 0;
}
.as_bg{
    position: absolute;
}
.as_bg img{
    width: 18rem;
}
.as_back{
    position: absolute;
    top: 1rem;
    left: 0.75rem;
}
.as_back img{
    width: 0.5rem;
    height: 0.8rem;
}
.as_img{
    position: absolute;
}
.as_img img:nth-of-type(1){
    position: absolute;
    top: 2rem;
    left: 5.75rem;
    width: 6.5rem;
}
.as_img img:nth-of-type(2){
    position: absolute;
    width: 9.15rem;
    top: 4.5rem;
    left: 4.45rem;
}
.as_img img:nth-of-type(3){
    position: absolute;
    width: 15.9rem;
    top: 6rem;
    left: 1.2rem;
}
.as_img img:nth-of-type(4){
    position: absolute;
    width: 9.15rem;
    top: 16.8rem;
    left: 4.45rem;
}
.as_img img:nth-of-type(5){
    position: absolute;
    width: 15.9rem;
    top: 18.3rem;
    left: 1.2rem;
}
.as_font{
    position: absolute;
    font-size: 0.6rem;
    color: #fff;
    padding: 0 1.2rem;
    top: 29rem
}
.as_font span{
    background-color: #FC9328;
    border-radius: 0.1rem;
    padding: 0 0.2rem;
    margin-right: 0.4rem;
}
.as_font p{
    margin-bottom: 0.4rem;
}
</style>
