<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
        <!-- <div class="wr_head">
            <img src="../../assets/right.png" alt="">
            <p>提现记录</p>
        </div> -->
        <scroller :on-refresh="refresh" :on-infinite="infinite" :noDataText="noDataText">
            <!-- <div style="margin-top:2.2rem"></div> -->
            <div class="wr_list" v-for="(item,index) in listData" v-if="listData.length>0">
                <div class="wc_list_left">
                    <p>{{item.state}}<span v-if="item.cashType == 2">提现任务</span></p>
                    <p>{{item.creatorTime | formatDate}}</p>
                    <p v-if="item.state == '提现失败'">{{item.remarks}}</p>
                </div>
                <div class="wc_list_right">
                    <p v-if="item.state == '提现失败'">+{{item.actualAmount | keepTwoNum}}元</p>
                    <p v-else style="color:#01CF40;">
                        <!-- <span>{{item.flowType}}</span> -->
                        -{{item.actualAmount | keepTwoNum}}元
                    </p>
                </div>
            </div>
            <div v-if="nolist" class="wr_nolist" style="margin-top: 5rem;color: #3C3E59;font-size: 1rem;text-align: center;">
                <img src="../../assets/meiyourshuju.png" alt="">
                <p>你还没有提现记录哦，赶紧参加游戏去！</p>
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
        this.token =APP.GetLocationParams("token")
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
            this.$get('/api/lUserExchangeCash/h5List',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    for(var i = 0;i<res.data.list.length;i++){
                        if(res.data.list[i].state == '1'){
                           res.data.list[i].state = '审核中'
                        }else if(res.data.list[i].state == '2'){
                           res.data.list[i].state = '提现成功'
                        }else if(res.data.list[i].state == '3'){
                           res.data.list[i].state = '提现失败'
                        }else if(res.data.list[i].state == '4'){
                           res.data.list[i].state = '提现异常'
                        }else{
                           res.data.list[i].state = '提现通过'
                        }
                        if(res.data.list[i].flowType == '1'
                        ){
                           res.data.list[i].flowType = '+'
                        }else{
                           res.data.list[i].flowType = '-'
                        }
                    }
                   this.total=res.data.total;
                    if(res.data.list.length>0){
                        if(res.data.total>10){
                            this.noDataText = ""
                              this.isPull=true
                        }else{
                            this.noDataText = "没有更多了"
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
            this.nolist = false; // 提现
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
                this.$get('/api/lUserExchangeCash/h5List',parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        for(var i = 0;i<res.data.list.length;i++){
                            if(res.data.list[i].state == '1'){
                                res.data.list[i].state = '审核中'
                            }else if(res.data.list[i].state == '2'){
                                res.data.list[i].state = '提现成功'
                            }else if(res.data.list[i].state == '3'){
                                res.data.list[i].state = '提现失败'
                            }else if(res.data.list[i].state == '4'){
                                res.data.list[i].state = '提现异常'
                            }else{
                                res.data.list[i].state = '提现通过'
                            }

                            if(res.data.list[i].flowType == '1'
                            ){
                                res.data.list[i].flowType = '+'
                            }else{
                                res.data.list[i].flowType = '-'
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
.wr_head{
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
.wr_head img{
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
}
.wr_head p{
    color: #2d2e38;
    font-size: 0.8rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
}
.wr_list{
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.02rem solid #F2F2F2;
    padding: 0.45rem 0.8rem 0.4rem 0.8rem;
}
.wc_list_left p:nth-of-type(1){
    font-size: 0.7rem;
    color: #3C3E59;
    margin-bottom: 0.1rem;
    display: flex;
    align-items: center;
}
.wc_list_left p:nth-of-type(2){
    font-size: 0.65rem;
    color: #9EA9BC;
}
.wc_list_left p:nth-of-type(3){
    margin-top: 0.1rem;
    font-size: 0.65rem;
    color: #9EA9BC;
    width: 12rem;
}
.wc_list_left span{
    font-size: 0.45rem;
    color: #fff;
    border-radius: 0.1rem;
    padding: 0.1rem;
    margin-left: 0.2rem;
    background-color: #FF2B49;
}
.wc_list_right p{
    font-size: 0.8rem;
    color: #FF2B49;
}
.wr_nolist{
    margin-top: 5rem;
    color: #3C3E59;
    font-size: 1rem;
    text-align: center;
}
.wr_nolist img{
    width: 6.2rem;
    height: 3.8rem;
    margin-bottom: 0.8rem;
}
.wr_nolist p{
    font-size: 0.7rem;
    color: #9EA9BC;
}
</style>
