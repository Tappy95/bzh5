<template>
    <div id="app" style="height: 100vh;background: #211989;overflow: auto;">
        <div class="zb_head">
            <img src="../../assets/right.png" alt="" @click="black">
            <p>达人周榜</p>
        </div>
        <div class="zb_bg">
            <img src="../../assets/zbbg.png" alt="">
        </div>
        <div class="zb_list">
            <div :class="activeClass == index ? 'zb_block':'active'" v-for="(item,index) in history" @click="getInfo(index)">
                <div class="zb_list_inner">
                    <!-- <p>第一周</p> -->
                    <p>{{item}}</p>
                </div>
            </div>
        </div>
        <div class="zb_line">
            <img src="../../assets/zbline.png" alt="">
        </div>
        <div class="zb_tb">
            <p style="margin-left:1.5rem;">昵称</p>
            <p style="margin-left:1.5rem;">排名</p>
            <p>累计邀请/人</p>
        </div>
        <div class="table_wrapper">
            <table>
                <tbody v-for="(item,index) in tableData">
                    <tr>
                        <td>
                            <img :src="item.profile" alt="">
                            {{item.aliasName}}
                        </td>
                        <td>{{item.rank}}</td>
                        <td>{{item.apprenticeCount}}人</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeClass:0,
            tableData:{}
        }
    },
    created(){
        this.history = APP.GetLocationParams('history').split(',');
        this.getInfo(this.activeClass)
    },
    methods:{
        black(){
            window.history.go(-1);
        },
        getInfo(index){
            let paramterData = {
                rankCycle:this.history[index]
            }
            this.$get('/api/rankDarenWeek/queryByCycel',paramterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    // this.listData = this.history;
                    this.tableData = res.data
                }
            })
            this.activeClass = index;
        }
    }
}
</script>
<style scoped>
p{
    margin: 0;
}
.zb_head{
    width: 100%;
    height: 2.2rem;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
}
.zb_head img{
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
}
.zb_head p{
    color: #000;
    font-size: 0.85rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
}
.zb_bg{
    margin-top: 2.2rem;
}
.zb_bg img{
    width: 18rem;
}
.zb_list{
    margin-top: -27rem;
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    padding-left: 0.6rem;
}
.zb_block{
    background-image: url('../../assets/zbbtn.png');
    background-size: cover;
    margin: 0 0.4rem 0 0;
    width: 5.95rem;
    height: 2.4rem;
    line-height: 2.4rem;
}
.active{
    border: 1px solid #fff;
    border-radius: 0.35rem;
    margin: 0.2rem 0.4rem 0 0;
    width: 5.55rem;
    height: 1.8rem;
    line-height: 1.8rem;
}
.zb_list_inner{
    text-align: center;
}
.zb_list_inner p{
    font-size: 0.65rem;
    color: #FFFB03;
}
.zb_line {
    text-align: center;
    margin-top: 0.3rem;
}
.zb_line img{
    width: 17.5rem;
    margin: 0 auto;
}
.zb_tb{
    display: flex;
    justify-content: space-around;
    color: #fff;
    padding: 0 1.2rem;
    margin-top: -1.8rem;
    font-size: 0.65rem;
}
.table_wrapper{
    margin: 0 0.82rem;
    width: 16.2rem;
    border: 1px solid #FC3632;
    text-align: center;
    border-radius: 0 0 0.4rem 0.4rem;
    margin-top: 0.3rem;
    background-color: #fff;
    display: inline-block;
}
table{
    border-collapse:collapse;
}
tbody td{
    border: 1px solid #F0F0F0;
}
tbody td:nth-of-type(1){
    width: 7.4rem;
    font-size: 0.6rem;
    color: #2D2E39;
    padding: 0.35rem 0;
}
tbody td:nth-of-type(1) img{
    width: 0.8rem;
    border-radius: 50%;
    height: 0.8rem;
    vertical-align: middle;
}
tbody td:nth-of-type(2){
    width: 2.2rem;
    font-size: 0.6rem;
    color: #FF2B48;
}
tbody td:nth-of-type(3){
    width: 6.55rem;
    font-size: 0.6rem;
    color: #FF2B48;
}
</style>
