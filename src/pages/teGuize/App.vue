<template>
    <div id="app" style="background: #D6E8FF;overflow-x: hidden;">
        <div class="tg_bg">
            <img src="../../assets/twoEight/te_bg.png" alt="">
        </div>
        <div class="tg_back" @click="backTab">
            <img src="../../assets/enlighteningRight.png" alt="">
        </div>
        <div class="tg_one">
            <p>幸运28规则</p>
            <img src="../../assets/twoEight/tg_font_bg.png" alt="">
            <p>幸运28全天24小时游戏，三分钟一期，系统每期会随机产生三个0-9之间的数字，三个数字相加即为宝猪28最终的开奖结果，范围0-27，共28个数号码，猜中即可获得奖励。</p>
            <img src="../../assets/twoEight/tg_num.png" alt="">
        </div>
        <div style="position: relative;top:-9.8rem;left:0.8rem;">
            <div class="tg_two">
                <p>幸运28怎么玩?</p>
                <img src="../../assets/twoEight/tg_font_bg.png" alt="">
                <img src="../../assets/twoEight/one.png" alt="">
                <img src="../../assets/twoEight/two.png" alt="">
                <img src="../../assets/twoEight/three.png" alt="">
                <img src="../../assets/twoEight/four.png" alt="">
                <img src="../../assets/twoEight/five.png" alt="">
                <img src="../../assets/twoEight/six.png" alt="">
            </div>
        </div>
        <div style="margin-top:-8rem;"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted() {
        $(function() {
            $(window).scroll(function() {
                var top = 0; //获取指定位置
                var scrollTop = $(window).scrollTop();  //获取当前滑动位置
                if(scrollTop > top){                 //滑动到该位置时执行代码
                    $(".tg_back").addClass("active");
                    }else{
                        $(".tg_back").removeClass("active");
                }
            })
        })
    },
    methods:{
        backTab(){
            if (this.isAndroid()) {
                window.android.over();
            } else if (this.isIos()) {
                window.backAction();
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
img{
    pointer-events: none;
}
.tg_bg{
    position: relative;
}
.tg_bg img{
    width: 18rem;
}
.tg_back{
    position: fixed;
    height: 2.2rem;
    top: 0rem;
    left: 0;
    right: 0;
    /* left: 0.75rem; */
    width: 100%;
}
.tg_back.active{
    background:rgb(89, 138, 255, 1);
    transition: background 1s;
    /* Firefox 4 */
    -moz-transition:background 1s;
    /* Safari and Chrome */
    -webkit-transition:background 1s;
    /* Opera */
    -o-transition:background 1s;
    z-index: 100;
}
.tg_back img{
    width: 0.5rem;
    height: 0.8rem;
    margin: 0.7rem 0 0 0.8rem;
}
/* 第一块 */
.tg_one{
    position: absolute;
    background-color: #fff;
    width: 16.4rem;
    border-radius: 0.4rem;
    left: 0.8rem;
    top: 13.3rem;
    height: 8.2rem;
}
.tg_one p:nth-of-type(1){
    position: absolute;
    top: -0.1rem;
    font-size: 0.7rem;
    color: #fff;
    left: 6.5rem;
    z-index: 99;
}
.tg_one img:nth-of-type(1){
    width: 8rem;
    position: absolute;
    top: -0.4rem;
    left: 4.2rem;
}
.tg_one p:nth-of-type(2){
    font-size: 0.7rem;
    color: #3C3E5B;
    padding: 1.7rem 0.8rem 0.6rem 0.8rem;
}
.tg_one img:nth-of-type(2){
    width: 7.5rem;
    margin: 0 0 0.6rem 4.45rem;
}
/* 第二块 */
.tg_two {
    background-color: #fff;
    width: 16.4rem;
    border-radius: 0.4rem;
}
.tg_two img{
    width: 12rem;
}
.tg_two p:nth-of-type(1){
    position: absolute;
    top: -0.1rem;
    font-size: 0.7rem;
    color: #fff;
    left: 6rem;
    z-index: 99;
}
.tg_two img:nth-of-type(1){
    width: 8rem;
    position: absolute;
    top: -0.35rem;
    left: 4.2rem;
}
.tg_two img:nth-of-type(2){
    width: 9.95rem;
    padding: 2rem 0 0.6rem 0.8rem;
}
.tg_two img:nth-of-type(3){
    width: 14.8rem;
    margin-left: 0.8rem;
}
.tg_two img:nth-of-type(4){
    width: 9.95rem;
    margin: 0.8rem;
}
.tg_two img:nth-of-type(5){
    width: 14.8rem;
    margin-left: 0.8rem;
}
.tg_two img:nth-of-type(6){
    width: 9.95rem;
    margin: 0.8rem;
}
.tg_two img:nth-of-type(7){
    width: 14.8rem;
    margin:0 0.8rem 0.8rem 0.8rem;
}
</style>

