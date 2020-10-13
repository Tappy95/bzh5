<template>
    <div id="app" style="height: 100vh;background: #F5493F;overflow: auto;">
        <div class="zb_head">
            <img src="../../assets/right.png" alt="" @click="black">
            <p>历史数据</p>
        </div>
        <div class="hd_tips">
            <p>数据保留最近7天</p>
        </div>
        <div class="zb_list">
            <div :class="activeClass == index ? 'zb_block':'active'" v-for="(item,index) in historys" @click="getInfo(index)">
                <div class="zb_list_inner">
                    <p>{{item}}</p>
                </div>
            </div>
        </div>
        <div class="zb_tb">
            <p style="margin-left:2rem;">用户</p>
            <p style="margin-left:-0.8rem;">排名</p>
            <p style="margin-left:-2.5rem;">获得奖励</p>
            <p style="margin-left:-2.9rem;">累计赚取</p>
        </div>
        <div class="table_wrapper">
            <table>
                <tbody v-for="(item,index) in tableData">
                    <tr>
                        <td>
                            <img :src="item.imageUrl" alt="">
                            {{item.mobile}}
                        </td>
                        <td>{{item.rankOrder}}</td>
                        <td>{{item.rewardAmount}}</td>
                        <td>{{item.coinBalance}}元</td>
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
        this.historys = APP.GetLocationParams('historys').split(',');
        this.getInfo(this.activeClass)
    },
    methods:{
        black(){
            window.history.go(-1);
        },
        getInfo(index){
            let paramterData = {
                rankType:1,
                rankDate:this.historys[index],
                pageNum:1,
                pageSize:30
            }
            this.$get('/api/rankCoin/listF',paramterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    for(var i = 0;res.data.list.length>i;i++){
                        res.data.list[i].coinBalance = (res.data.list[i].coinBalance / 10000).toFixed(2);
                        if(res.data.list[i].rewardAmount == '0' || res.data.list[i].rewardAmount == 0){
                            res.data.list[i].rewardAmount = '待派奖';
                        }else{
                            res.data.list[i].rewardAmount = (res.data.list[i].rewardAmount / 10000).toFixed(2)+'元';
                        }
                    }
                    this.tableData = res.data.list
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
.hd_tips{
    margin: 2.8rem 0 0 12rem;
    font-size: 0.55rem;
    color: #FCF5E2;
}
.zb_list{
    margin-top: 0.5rem;
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    padding-left: 0.8rem;
}
.zb_block{
    margin: 0 0.6rem 0 0;
    width: 4.4rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border-radius: 0.2rem;
    background-color: #FFE351;
}
.active{
    margin: 0 0.6rem 0 0;
    background-color: #FCF5E2;
    width: 4.4rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border-radius: 0.2rem;
}
.zb_list_inner{
    text-align: center;
}
.zb_list_inner p{
    font-size: 0.7rem;
    color: #F5493F;
}
.zb_tb{
    display: flex;
    color: #fff;
    padding: 0 0.8rem;
    margin-top: 1rem;
    font-size: 0.65rem;
    justify-content: space-around;
}
.table_wrapper{
    margin: 0 0.8rem;
    width: 14.8rem;
    /* height: 21.6rem; */
    height: 72vh;
    text-align: center;
    border-radius: 0.4rem;
    margin-top: 0.3rem;
    background-color: #fff;
    display: inline-block;
    padding: 0 0.8rem;
    overflow: auto;
}
table{
    border-collapse:collapse;
}
tbody tr{
    height: 2.2rem;
}
tbody td{
    border-bottom: 1px solid #F0F0F0;
}
tbody td:nth-of-type(1){
    width: 5.8rem;
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
    width: 3rem;
    font-size: 0.6rem;
    color: #FF2B48;
}
tbody td:nth-of-type(4){
    width: 3.3rem;
    font-size: 0.6rem;
    color: #FF2B48;
}
</style>
