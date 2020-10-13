<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
        <div class="egg_head" @click="back">
            <img src="../../assets/right.png" alt="">
            <p>详情</p>
        </div>
        <div class="egg_top">
            <p>{{listData.obtainPigCoin / 10000}}万金猪兑换卡</p>
            <img src="../../assets/weishiyong.png" alt="" v-if="listData.state==1">
            <img src="../../assets/yishiyong.png" alt="" v-if="listData.state==2">
        </div>
        <div>
            <div class="egg_card">
                <div class="egg_cardLeft">
                    <p>卡号：</p>
                </div>
                <div class="egg_cardRight">
                    <p>{{listData.cardNumber}}</p>
                    <p v-clipboard:copy="listData.cardNumber"
            v-clipboard:success="onCopy"
            v-clipboard:error="error">复制</p>
                </div>
            </div>

            <div class="egg_card">
                <div class="egg_cardLeft">
                    <p>卡密：</p>
                </div>
                <div class="egg_cardRight">
                    <p v-if="showCardPassword == 1">{{listData.cardPassword}}</p>
                    <p style="background-color:#D8D8D8;height:1.1rem;width:6.65rem" v-if="showCardPassword == 2"></p>
                    <p v-clipboard:copy="listData.cardPassword"
            v-clipboard:success="onCopypw"
            v-clipboard:error="errorpw">复制</p>
                </div>
            </div>
        </div>

        <div class="egg_btn" @click="open" v-if="showCardPassword == 2">提取卡密</div>

        <div class="egg_box" v-show="isShow" @click="closeDia">
            <div class="egg_boxInner" @click="stop">
                <input type="password" placeholder="请输入宝猪支付密码" v-model="password">
                <div class="egg_boxfont">
                    <p @click="forgetPW">忘记密码？</p>
                    <p @click="getSet">没有支付密码？去设置</p>
                </div>
                <div class="egg_boxBtn" @click="getPassword">确定</div>
            </div>
        </div>

    </div>
</template>
<script>
import md5 from 'js-md5'

export default {
    data(){
        return{
            isShow:false,
            listData:{},
            cardNumber:'',
            cardPassword:'',
            password:'',
            showCardPassword:2
        }
    },
    created(){
        this.token = APP.GetLocationParams("token");
        this.imei = APP.GetLocationParams("imei");
        this.id = APP.GetLocationParams("id");
        this.getInfo();
    },
    methods:{
        open(){
            this.isShow = true;
        },
        close(){
        },
        // 复制成功
        onCopy(e) {
            this.$toast("复制成功");
        },
        // 复制失败
        error(e) {
            this.$toast("复制失败");
        },
        // 复制成功
        onCopypw(e) {
            this.$toast("复制成功");
        },
        // 复制失败
        errorpw(e) {
            this.$toast("复制失败");
        },
        // 详情
        getInfo(){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                id:this.id
            }
            this.$get('/api/goleEggOrder/appInfo',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data;
                    if(this.listData.state == 2){
                        this.showCardPassword = 1;
                    }
                }
            })
        },
        getPassword(){
            if(this.password == ''){
                this.$toast('请输入支付密码！');
                return;
            }
            let parameterData = {
                token:this.token,
                imei:this.imei,
                id:this.id,
                payPassword:md5(this.password)
            }
            this.$get('/api/goleEggOrder/extractPassword',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.data = res.data;
                    this.listData.cardPassword = res.data;
                    this.showCardPassword = 1;
                    this.isShow = false;
                    this.$toast(res.message);
                }else if(res.statusCode == '30023' || res.statusCode == 30023){
                    this.$toast(res.message);
                }
            })
        },
        back(){
            window.history.go(-1);
        },
        forgetPW(){
            if(this.isAndroid()){
                window.android.toForgetPayPsw();
            }else if(this.isIos()){
                // window.forgetPayPwdAction();
            }
        },
        getSet(){
            if(this.isAndroid()){
                window.android.toForgetPayPsw();
            }else if(this.isIos()){
                // window.setPayPwdAction();
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
        stop(){
            event.stopPropagation();
        },
        closeDia(){
            this.isShow = false;
        }
    }
}
</script>

<style scoped>
p{
    margin: 0;
}
/* 标题头 */
.egg_head{
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
    border-bottom: 1px solid #EFEFEF;
}
.egg_head img{
    width: 0.5rem;
    height: 0.8rem;
    margin-left: 0.8rem;
}
.egg_head p{
    color: #1D1D1D;
    font-size: 0.85rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
    margin-left: 7rem;
}
.egg_top{
    margin-top: 2.2rem;
    background-color: #fff;
    display: flex;
    padding: 0.6rem 0.8rem;
    align-items: center;
    justify-content: space-between;
}
.egg_top img{
    width: 2rem;
    height: 2rem;
}
.egg_top p{
    font-size: 0.8rem;
    color: #484A65;
}
.egg_card{
    margin: 0.8rem 0 0 0.75rem;
}
.egg_cardLeft p{
    font-size: 0.8rem;
    color: #484A65;
    margin-bottom: 0.4rem;
}
.egg_cardRight{
    display: flex;
    align-items: center;
}
.egg_cardRight p:nth-of-type(1){
    font-size: 0.7rem;
    color: #9EA9BC;
    margin-right: 0.4rem;
}
.egg_cardRight p:nth-of-type(2){
    /* width: 2.1rem; */
    font-size: 0.6rem;
    color: #fff;
    padding: 0 0.2rem;
    height: 1rem;
    border-radius: 0.2rem;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);
    background: -o-linear-gradient(right, #FF3E2B , #FF1370);
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370);
    background: linear-gradient(to right, #FF3E2B , #FF1370);
}
.egg_btn{
    width: 16.4rem;
    height: 2.2rem;
    line-height: 2.2rem;
    position: fixed;
    right: 0;
    left: 0.8rem;
    bottom: 1rem;
    border-radius: 0.3rem;
    color: #fff;
    font-size: 0.7rem;
    text-align: center;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);
    background: -o-linear-gradient(right, #FF3E2B , #FF1370);
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370);
    background: linear-gradient(to right, #FF3E2B , #FF1370);
}
.egg_box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
}
.egg_boxInner{
    position: fixed;
    background-color: #fff;
    top: 9.9rem;
    left: 2.2rem;
    border-radius: 0.4rem;
    text-align: center;
    width: 13.6rem;
}
.egg_boxInner input{
    outline: none;
    border: none;
    background-color: #F2F5F8;
    width: 12rem;
    height: 2.2rem;
    margin-top: 1.6rem;
    font-size: 0.7rem;
    padding-left: 0.8rem;
}
.egg_boxfont{
    display: flex;
    font-size: 0.6rem;
    color: #9EA9BC;
    justify-content: space-between;
    padding: 0.4rem 0.8rem 0 0.8rem;
}
.egg_boxBtn{
    width: 12rem;
    height: 2.2rem;
    text-align: center;
    font-size: 0.7rem;
    color: #fff;
    line-height: 2.2rem;
    border-radius: 1rem;
    margin: 0.8rem auto;
    background: -webkit-linear-gradient(left, #FF3E2B , #FF1370);
    background: -o-linear-gradient(right, #FF3E2B , #FF1370);
    background: -moz-linear-gradient(right, #FF3E2B , #FF1370);
    background: linear-gradient(to right, #FF3E2B , #FF1370);
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #A0A9BB;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #A0A9BB;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #A0A9BB;
}
input::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #A0A9BB;
}
</style>

