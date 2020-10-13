<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
        <!-- <div class="growthValue-head">
            <img src="../../assets/right.png" />
            <p>宝珠成长值</p>
        </div> -->
        <div class="growthValue-top">
            <h2>成长值说明</h2>
            <p><span>1</span>玩家通过游戏试玩可以获得成长值。</p>
            <p><span>2</span>玩家所获得的成长值与玩家所完成任务获得金币数相等。游戏试玩中每个游戏都有对应的成长值，试玩的等级越高，获得成长值越多。</p>
            <p><span>3</span>游戏试玩中每完成一步最多可奖励10000成长值(即超过10000仅发放10000成长值)。</p>
            <p><span>4</span>游戏充值返利、额外赠送的奖励如冲级排名奖，不奖励成长值。</p>
        </div>
        <div class="growthValue-img"><img src="../../assets/gValue.png" alt=""></div>
        <div class="growthValue-bottom">说明：<br>
        成长等级越高，通过游戏试玩所能获得的额外金猪奖励就越高。<br>
        0-2级-加送0%金猪<br>
        3-5级-加送3%金猪<br>
        6-8级-加送5%金猪<br>
        9-12级-加送8%金猪</div>
    </div>
</template>
<style scoped>
/* 标题头 */
.growthValue-head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
}
.growthValue-head img{
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
}
.growthValue-head p{
    color: #2d2e38;
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
}
/* 内容 */
.growthValue-top{
    margin-top: 0.8rem;
    padding: 0 0.8rem;
}
.growthValue-top h2{
    font-size: 0.8rem;
}
.growthValue-top p{
    font-size: 0.7rem;
    color: #9EA9BC;
}
.growthValue-top span{
    margin-right:0.2rem;
    color:#fff;
    width:0.8rem;
    height:0.8rem;
    background-color:#F0C17A;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.55rem;
}
.growthValue-img img{
    width: 16.4rem;
    height: 13.2rem;
    padding: 0 0.8rem;
}
.growthValue-bottom{
    font-size: 0.7rem;
    color: #9EA9BC;
    padding: 0.2rem 0.8rem 0.8rem 0.8rem;
}
</style>
