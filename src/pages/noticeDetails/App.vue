<template>
    <div id="app">
        <div class="nd_head">
            <img src="../../assets/right.png" alt="" @click="back">
            <p>公告详情</p>
        </div>
        <div class="nd_title">
            <p>{{listData.noticeTitle}}</p>
            <p>{{listData.releaserTime | formatDate}}</p>
            <img :src="listData.imgUrl" alt="" @click="jump(listData.id)" v-if="listData.imgUrl != null || listData.imgUrl != 'null' || listData.imgUrl == ''" class="nd_img" :class="listData.imgUrl == null || listData.imgUrl == '' || listData.imgUrl == 'null'? 'active' : ''">
        </div>
        <div class="nd_content">
            {{listData.noticeContent}}
        </div>
    </div>
</template>
<script>
import {formatDate} from '../../utils/date.js'

export default {
    data(){
        return{
            listData:{
                noticeTitle:'',
                releaserTime:0,
                imgUrl:'',
                noticeContent:''
            },
            noticeId:''
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
        }
    },
    created(){
        this.token =APP.GetLocationParams("token");
        this.imei=APP.GetLocationParams("imei");
        this.getInfo(APP.GetLocationParams("id"));
        this.read(APP.GetLocationParams("id"));
    },
    methods:{
        getInfo(id){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                id:id
            }
            this.$get('/api/appNotice/appInfo',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    this.listData = res.data;
                }
            })
        },
        back(){
            self.location=document.referrer;
            // window.history.go(-1);
        },
        read(id){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                noticeId:id
            }
            this.$get('/api/noticeUser/add',parameterData).then(res =>{
                if((res.statusCode+"").startsWith("2")){
                }
            })
        },
        jump(id){
            let parameterData = {
                token:this.token,
                imei:this.imei,
                id:id
            }
            this.$get('/api/appNotice/appInfo',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    window.location.href = res.data.linkAddress;
                }
            })
        }
    }
}
</script>

<style scoped>
p{
    margin: 0;
}
/* 标题头 */
.nd_head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EFEFEF;
}
.nd_head img{
    width: 0.5rem;
    height: 0.8rem;
    margin-left: 0.8rem;
}
.nd_head p{
    color: #1D1D1D;
    font-size: 0.85rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
    margin-left: 6rem;
}
.nd_title{
    margin-top: 2.2rem;
    text-align: center;
}
.nd_title p:nth-of-type(1){
    font-size: 0.8rem;
    color: #1D1D1D;
    padding: 0.6rem 0 0.4rem 0;
}
.nd_title p:nth-of-type(2){
    font-size: 0.6rem;
    color: #9EA9BC;
    padding-bottom: 0.6rem;
}
.nd_img{
    width: 16.4rem;
    height: 3.3rem;
    pointer-events: none;
}
.active{
    display:none;
}
.nd_content{
    padding: 0.2rem 0.8rem 0.8rem 0.8rem;
    font-size: 0.7rem;
    color: #9EA9BC;
}
</style>
