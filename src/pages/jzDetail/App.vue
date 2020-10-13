<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
        <!-- <div class="jzmx_head">
            <img src="../../assets/right.png" alt="">
            <p>金猪明细</p>
        </div> -->
        <scroller :on-refresh="refresh" :on-infinite="infinite" :noDataText="noDataText">
            <!-- <div style="margin-top:2.2rem"></div> -->

            <div class="jzmx_content" v-for="(item,index) in listData">
                <div>
                    <div class="jzmx_con_left">
                        <p class="jzmx_con_left_p">{{item.changedType}}</p>
                        <div class="jzmx_con_left_div" v-if="item.remarks != ''">
                            <p>{{item.remarks}}</p>
                        </div>
                    </div>
                    <div class="jzmx_con_left_time">
                        <p>{{item.changedTime | formatDate}}</p>
                    </div>
                </div>
                <div class="jzmx_con_right">
                    <p><span>{{item.flowType}}</span>{{item.amount}}</p>
                    <p>{{item.pigBalance | NumFormat}}</p>
                </div>
            </div>
            <div class="jzmx_nolist" style="margin: 5rem auto 0 auto;color: #3C3E59;font-size: 1rem;text-align: center;" v-if="nolist">
                <img src="../../assets/meiyourshuju.png" alt="">
                <p>你还没有金猪明细哦，赶紧参加游戏去！</p>
            </div>
        </scroller>
    </div>
</template>
<script>
import {formatDate} from '../../utils/date.js'
// import mint from '../../css/mint-ui.css'
export default {
    data(){
        return{
            listData:{},
            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
            noDataText:'',
            total:0,
            nolist:false,
            isInfo: true,
            isPull:false,
            par:1,
            initpage: true
        }
    },
    created(){
        this.token =APP.GetLocationParams("token");
        this.imei=APP.GetLocationParams("imei");
        this.getRecordInfo()
    },
    //过滤器
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
        },
        keepTwoNum:function(value){
            value = Number(value);
            return value.toFixed(2)
        },
        NumFormat: function (value) {
            if(!value) return ''
            value = value.toFixed(0)
            var intPart = Number(value).toFixed(0) // 获取整数部分
            var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
            var floatPart = ''// 预定义小数部分
            var value2Array = value.split('.')
            // =2表示数据有小数位
            if(value2Array.length === 2) {
                floatPart = value2Array[1].toString() // 拿到小数部分
                if(floatPart.length === 1) { // 补0,实际上用不着
                return intPartFormat + '.' + floatPart + '0'
                } else {
                return intPartFormat + '.' + floatPart
                }
            } else {
                return intPartFormat + floatPart
            }
        }
    },
    methods:{
        // 提现记录
        getRecordInfo(){
            let parameterData = {
                pageSize : this.pageSize,
                pageNum : this.currentPage,
                token:this.token,
                imei:this.imei,
                changedType:3,
                // token:'4099ac907466a9a6be506560a0e84b20',
                // imei:'866135038704620'
            }
            this.$get('/api/lPigChange/list',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    for(var i = 0;i<res.data.list.length;i++){
                        if(res.data.list[i].changedType == '1'){
                           res.data.list[i].changedType = '宝猪会员';
                        }else if(res.data.list[i].changedType == '2'){
                           res.data.list[i].changedType = '提现';
                        }else if(res.data.list[i].changedType == '3'){
                           res.data.list[i].changedType = '任务';
                        }else if(res.data.list[i].changedType == '4'){
                           res.data.list[i].changedType = '游戏试玩奖励';
                        }else if(res.data.list[i].changedType == '5'){
                           res.data.list[i].changedType = '金币兑换获得';
                        }else if(res.data.list[i].changedType == '6'){
                           res.data.list[i].changedType = '游戏竞猜';
                        }else if(res.data.list[i].changedType == '7'){
                           res.data.list[i].changedType = 'vip救济金猪'
                        }else if(res.data.list[i].changedType == '8'){
                           res.data.list[i].changedType = '金猪抽奖';
                        }else if(res.data.list[i].changedType == '9'){
                           res.data.list[i].changedType = '抽奖退回';
                        }else if(res.data.list[i].changedType == '10'){
                           res.data.list[i].changedType = '竞猜退回';
                        }else if(res.data.list[i].changedType == '11'){
                           res.data.list[i].changedType = '团队长赠送';
                        }else if(res.data.list[i].changedType == '12'){
                            res.data.list[i].changedType = '每日救济金猪';
                        }else if(res.data.list[i].changedType == '13'){
                            res.data.list[i].changedType = '砸金蛋';
                        }else if(res.data.list[i].changedType == '14'){
                            res.data.list[i].changedType = '使用金蛋';
                        }else if(res.data.list[i].changedType == '15'){
                            res.data.list[i].changedType = '金猪排行日榜奖励';
                        }else if(res.data.list[i].changedType == '16'){
                            res.data.list[i].changedType = '兑换心愿值';
                        }else if(res.data.list[i].changedType == '17'){
                            res.data.list[i].changedType = '抽奖奖励金猪';
                        }else{
                            res.data.list[i].changedType = '其他';
                        }

                        if(res.data.list[i].flowType == '1'
                        ){
                           res.data.list[i].flowType = '+';
                        }else{
                           res.data.list[i].flowType = '-';
                        }

                        if(res.data.list[i].pigBalance == '' || res.data.list[i].pigBalance == '0' || res.data.list[i].pigBalance == null || res.data.list[i].pigBalance == 'null'){
                            res.data.list[i].pigBalance = ''
                        }
                    }
                   this.total=res.data.total;
                    if(res.data.list.length>0){
                        if(res.data.total>10){
                            this.noDataText = ""
                              this.isPull=true
                        }else{
                            // this.noDataText = "没有更多了"
                           this.isPull=false
                        }
                        this.listData = res.data.list
                    }else{
                        this.isPull=false;
                        this.nolist=true;
                    }
                }else{
                    this.isPull=false;
                    this.nolist=true;
                //     // this.$message({type:'error',message:res.message,duration:3000})
                }
            })
        },
        // 上拉加载
        infinite(done){
            this.currentPage = 1;
            this.noDataText = "";
            this.nolist = false;
            setTimeout(()=> {
                if(this.isPull){
                    this.currentPage++;
                }
                if(this.listData.length>=this.total){
                    if(this.listData.length!=0){
                        this.noDataText = "没有更多了"
                    }
                    done(true)
                    return
                }
                let parameterData = {
                    pageSize : this.pageSize,
                    pageNum : this.currentPage,
                    token:this.token,
                    imei:this.imei,
                    changedType: 3
                }
                this.$get('/api/lPigChange/list',parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        for(var i = 0;i<res.data.list.length;i++){
                            if(res.data.list[i].changedType == '1'){
                                res.data.list[i].changedType = '宝猪会员';
                            }else if(res.data.list[i].changedType == '2'){
                                res.data.list[i].changedType = '提现';
                            }else if(res.data.list[i].changedType == '3'){
                                res.data.list[i].changedType = '任务';
                            }else if(res.data.list[i].changedType == '4'){
                                res.data.list[i].changedType = '游戏试玩奖励';
                            }else if(res.data.list[i].changedType == '5'){
                                res.data.list[i].changedType = '金币兑换获得';
                            }else if(res.data.list[i].changedType == '6'){
                                res.data.list[i].changedType = '游戏竞猜';
                            }else if(res.data.list[i].changedType == '7'){
                                res.data.list[i].changedType = 'vip救济金猪';
                            }else if(res.data.list[i].changedType == '8'){
                                res.data.list[i].changedType = '金猪抽奖';
                            }else if(res.data.list[i].changedType == '9'){
                                res.data.list[i].changedType = '抽奖退回';
                            }else if(res.data.list[i].changedType == '10'){
                                res.data.list[i].changedType = '竞猜退回';
                            }else if(res.data.list[i].changedType == '11'){
                                res.data.list[i].changedType = '团队长赠送';
                            }else if(res.data.list[i].changedType == '12'){
                                res.data.list[i].changedType = '每日救济金猪';
                            }else if(res.data.list[i].changedType == '13'){
                                res.data.list[i].changedType = '砸金蛋';
                            }else if(res.data.list[i].changedType == '14'){
                                res.data.list[i].changedType = '使用金蛋';
                            }else if(res.data.list[i].changedType == '15'){
                                res.data.list[i].changedType = '金猪排行日榜奖励';
                            }else if(res.data.list[i].changedType == '16'){
                                res.data.list[i].changedType = '兑换心愿值';
                            }else if(res.data.list[i].changedType == '17'){
                                res.data.list[i].changedType = '抽奖奖励金猪';
                            }else{
                                res.data.list[i].changedType = '其他';
                            }
                            if(res.data.list[i].flowType == '1'
                            ){
                            res.data.list[i].flowType = '+';
                            }else{
                            res.data.list[i].flowType = '-';
                            }

                            if(res.data.list[i].pigBalance == '' || res.data.list[i].pigBalance == '0' || res.data.list[i].pigBalance == null || res.data.list[i].pigBalance == 'null'){
                                res.data.list[i].pigBalance = ''
                            }
                        }
                        if (res.data.list.length > 0) {
                            if (this.currentPage > 1) {
                                this.total=res.data.total;
                                this.listData = this.listData.concat(res.data.list)
                            }
                            if(this.listData.length>=this.total){
                                this.noDataText = "没有更多了";
                            }else{
                                this.noDataText = "";
                            }
                    } else {
                        this.nolist = true;
                        this.noDataText = "";
                    }
                    } else {
                        this.nolist = true;
                        this.noDataText = "";
                    }
                })
                    done(true)
            },1000);

        },
        // 下拉刷新
        refresh(done){
            this.currentPage = 1;
            this.isPull = false;
            this.noDataText ="";
            this.nolist=false;
            this.total = 0;

            this.listData = {};
            this.getRecordInfo();
            done(true)

        },
    }
}
</script>

<style scoped>
p{
    margin: 0;
}
/* 标题头 */
.jzmx_head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 0.02rem solid #F2F2F2;
}
.jzmx_head img{
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
}
.jzmx_head p{
    color: #2d2e38;
    font-size: 0.8rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
}
.jzmx_content{
    /* margin-top: 2.2rem; */
    display: flex;
    align-items: center;
    padding: 0.45rem 0.8rem 0.4rem 0.8rem;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 0.02rem solid #F2F2F2;
}
.jzmx_con_left{
    display: flex;
}
.jzmx_con_left .jzmx_con_left_p{
    font-size: 0.7rem;
    color: #3C3E59;
    margin-right: 0.4rem;
}
.jzmx_con_left .jzmx_con_left_div{
    /* width: 1.95rem; */
    text-align: center;
    border-radius: 0.1rem;
    padding: 0.05rem 0.2rem;
    background: -webkit-linear-gradient(left, #E8A342,#FFD886);
    background: -o-linear-gradient(right, #E8A342,#FFD886);
    background: -moz-linear-gradient(right, #E8A342,#FFD886);
    background: linear-gradient(to right, #E8A342,#FFD886);
}
.jzmx_con_left .jzmx_con_left_div p{
    font-size: 0.5rem;
    color: #fff;
}
.jzmx_con_left_time{
    font-size: 0.54rem;
    color: #9EA9BC;
    margin-top: 0.1rem;
}
.jzmx_con_right{
    text-align: right;
}
.jzmx_con_right p:nth-of-type(1){
    font-size: 0.8rem;
    color: #FF2B49;
}
.jzmx_con_right p:nth-of-type(2){
    font-size: 0.65rem;
    color: #9EA9BC;
    margin-top: 0.1rem;
}
.jzmx_nolist{
    margin: 5rem auto 0 auto;
    color: #3C3E59;
    font-size: 1rem;
    text-align: center;
}
.jzmx_nolist img{
    width: 6.2rem;
    height: 3.8rem;
    margin-bottom: 0.8rem;
}
.jzmx_nolist p{
    font-size: 0.7rem;
    color: #9EA9BC;
}
</style>

