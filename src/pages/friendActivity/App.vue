<template>
    <div id="app" style="height: 43rem;background: #F2F4F7;overflow: auto;">
        <div class="fa-head" @click="back">
            <img src="../../assets/right.png"/>
            <p>好友活跃度</p>
        </div>
        <div class="fa_bg">
            <img src="../../assets/friendWait/bg.png" alt="">
        </div>
        <div class="font_right">
            <p>{{listData.today}}</p>
        </div>
        <div class="font_center">
            <p class="font_center_top">{{listData.score}}<span>分</span></p>
            <div class="font_center_bottom">
                <p>比昨天{{listData.updownStatus}}{{listData.updownScore}}分</p>
                <img src="../../assets/friendWait/arrows.png" alt="" v-if="this.listData.updownStatus == '下降'">
                <img src="../../assets/friendWait/up.png" alt="" v-if="this.listData.updownStatus != '下降'">
            </div>
        </div>
        <div class="fa_box_top">
            <div>
                <p style="background-color:#36D489" v-if="this.listData.score >= 40 && this.listData.score <=100">{{title}}</p>
                <p style="background-color:#FFC11F" v-if="this.listData.score >= 20 && this.listData.score <=39">{{title}}</p>
                <p style="background-color:#FF1F1F" v-if="this.listData.score <= 19">{{title}}</p>
            </div>
            <div>
                <p style="color:#36D489" v-if="this.listData.score >= 40 && this.listData.score <=100">{{tips}}</p>
                <p style="color:#FFC11F" v-if="this.listData.score >= 20 && this.listData.score <=39">{{tips}}</p>
                <p style="color:#FF1F1F" v-if="this.listData.score <= 19">{{tips}}</p>
                <p>{{remark}}</p>
            </div>
        </div>
        <div class="fa_box_center">
            <div class="fa_box_cen_head">
                <img src="../../assets/friendWait/wenhao.png" alt="">
                <p>什么是活跃度？</p>
            </div>
            <div>
                <p>1、活跃度是为了让好友活跃搞得师傅获得更丰厚得奖励和vip特权,同时减少推广能力差和质量差的师傅得奖励！</p>
                <p>2、当师傅的好友数达到一定人数时，好友活跃度会自动开启，并且每日会给出好友活跃度评分。</p>
                <p>3、活跃度时根据好友在平台每日做任务的情况来评估的！</p>
                <p>4、好友活跃度每日凌晨1点更新</p>
            </div>
        </div>
        <div class="fa_box_bottom">
            <div class="fa_box_cen_head">
                <img src="../../assets/friendWait/wenhao.png" alt="">
                <p>好友活跃度低会怎么样</p>
            </div>
            <div>
                <p>1、好友活跃度较低的师傅，可督促好友有空多做做任务或者新手一批活跃度高的好友来提高整体好友质量恢复倒正常水平。</p>
                <p>2、若提现时活跃度在40分以下，将会面临打折的情况。例如只有35分，提现100元，到账80元；不同分数打着情况如下：</p>
            </div>
            <div class="fa_img">
                <img src="../../assets/friendWait/img.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            listData:{
                updownStatus:''
            },
            title:'',
            tips:'',
            remark:''
        }
    },
    created(){
        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        this.getInfo();
    },
    methods:{
        getInfo(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
            }
            this.$get('/api/userActivity/myActivity',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                    if(res.data.updownStatus == 1){
                        res.data.updownStatus = '上升';
                    }else{
                        res.data.updownStatus = '下降';
                    }

                    if(res.data.score >= 80){
                        this.title = '极好';
                        this.tips = '好友质量极好';
                        this.remark = '太棒了，您的好友质量极好，提现到账100%，借着势头多邀请点，你的用户质量杠杠的';
                    }else if(res.data.score <= 79 && res.data.score >=60){
                        this.title = '不错';
                        this.tips = '好友质量不错';
                        this.remark = '很不错，您的好友质量不错，提现到账100%，继续保持！';
                    }else if(res.data.score <= 59 && res.data.score >=40){
                        this.title = '还行';
                        this.tips = '好友质量还行';
                        this.remark = '还可以，您的好友质量还行，提现到账100%，继续保持！好友多做任务就能保持活力哦';
                    }else if(res.data.score <= 39 && res.data.score >=30){
                        this.title = '一般';
                        this.tips = '好友质量一般';
                        this.remark = '马马虎虎，您的好友质量一般，提现到账80%，好友活跃度再跌就尴尬了';
                    }else if(res.data.score <= 29 && res.data.score >=20){
                        this.title = '偏差';
                        this.tips = '好友质量偏差';
                        this.remark = 'hold住啊，您的好友质量偏差，提现到账60%，注意了哦！要督促好友多做任务，多活跃';
                    }else if(res.data.score <= 19 && res.data.score >=10){
                        this.title = '不行';
                        this.tips = '好友质量不行';
                        this.remark = '该加把劲了，您的好友质量不行，提现到账40%，继续加油！督促好友多多活跃，多做任务';
                    }else if(res.data.score < 10){
                        this.title = '极差';
                        this.tips = '好友质量极差';
                        this.remark = '太可惜了，您的好友质量极差，提现到账20%，督促好友做多多做游戏任务可以提高活跃值哦';
                    }
                    this.listData = res.data;
                }
            })
        },
        back(){
            if(this.isAndroid()){
                window.android.over();
            }else if(this.isIos()){
                // window.backAction();
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
}
</script>

<style scoped>
p{
    padding: 0;
    margin: 0;
}
/* 返回头 */
.fa-head{
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
}
.fa-head img{
    width: 0.5rem;
    height: 0.8rem;
    position: absolute;
    left: 0.75rem;
}
.fa-head p{
    font-size: 0.85rem;
    color: #000;
}
.fa_bg{
    position: relative;
    margin-top: 2.2rem;
}
.fa_bg img{
    width: 18rem;
    height: 6.9rem;
}
.font_right{
    position: absolute;
    top: 3rem;
    right: 0;
    height: 0.8rem;
    background-color: #e32150;
    font-size: 0.5rem;
    color: #fff;
    border-radius: 0.45rem 0 0 0.45rem;
    padding: 0.1rem 0.1rem 0.1rem 0.3rem;
    line-height: 0.8rem;
}
.font_center{
    position: absolute;
    top: 3.5rem;
    left: 7.25rem;
}
.font_center_top{
    font-size: 2.4rem;
    color: #fff;
    margin-bottom: 0.2rem;
}
.font_center_top span{
    font-size: 0.8rem;
}
.font_center_bottom{
    text-align: center;
    border-radius: 0.45rem;
    margin-left: -1rem;
    display: flex;
    font-size: 0.5rem;
    color: #3C3D5A;
    padding: 0 0.1rem 0 0.4rem;
    background: -webkit-linear-gradient(left, #FFAC52 , #FFCC94);/* 针对于谷歌苹果浏览器 Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FFAC52 , #FFCC94); /* 针对于欧鹏浏览器Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FFAC52 , #FFCC94); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FFAC52 , #FFCC94); /* 标准语法ie9标准的语法 */
    align-items: center;
}
.fa_box_top{
    position: absolute;
    top: 8rem;
    left: 0.6rem;
    background-color: #fff;
    width: 16.8rem;
    height: 4rem;
    border-radius: 0.4rem;
    display: flex;
    align-items: center;
    /* padding: 0.65rem 0; */
}
.fa_box_top div:nth-of-type(1) p{
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 50%;
    background-color: #36D489;
    color: #fff;
    margin: 0 0.6rem 0 1.2rem;
    font-size: 0.8rem;
    font-weight: bold;
}
.fa_box_top p:nth-of-type(1){
    color: #16BC6D;
    font-size: 0.7rem;
    margin-bottom: 0.1rem;
}
.fa_box_top p:nth-of-type(2){
    color: #A0A9BB;
    font-size: 0.55rem;
    margin-right: 0.8rem;
}
.fa_box_center{
    position: absolute;
    top: 12.5rem;
    left: 0.6rem;
    width: 15.6rem;
    height: 7.9rem;
    border-radius: 0.4rem;
    background-color: #fff;
    padding: 0.6rem;
    font-size: 0.6rem;
    color: #A0A9BB;
}
.fa_box_cen_head{
    display: flex;
    align-items: center;
}
.fa_box_cen_head img{
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.4rem;
}
.fa_box_cen_head p{
    font-size: 0.7rem;
    color: #3C3D5A;
    margin-bottom: 0.4rem;
}
.fa_box_center div:nth-of-type(2) p{
    line-height: 0.9rem;
}
.fa_box_bottom{
    position: absolute;
    top: 22.1rem;
    left: 0.6rem;
    width: 15.6rem;
    height: 18rem;
    border-radius: 0.4rem;
    background-color: #fff;
    font-size: 0.6rem;
    color: #A0A9BB;
    padding: 0.6rem;
}
.fa_img img{
    width: 15.6rem;
}
.fa_box_bottom div:nth-of-type(2) p{
    line-height: 1rem;
}
</style>
