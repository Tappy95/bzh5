<template>
  <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
    <!--<div class="accountDetails-head">-->
    <!--<router-link to="">-->
    <!--<img src="../../assets/right.png" alt="">-->
    <!--</router-link>-->
    <!--<p>账户明细</p>-->
    <!--</div>-->

    <!-- <div class="accountDetails-btn">
        <p>金币</p>
        <p>零钱</p>
        <p>提现记录</p>
    </div> -->

    <scroller :on-refresh="refresh" :on-infinite="infinite" :noDataText="noDataText">
      <!-- <mt-navbar v-model="selected" style="margin:0 0 0.4rem 0">
          <mt-tab-item id="1">金币</mt-tab-item>
          <mt-tab-item id="2">零钱</mt-tab-item>
          <mt-tab-item id="3">提现记录</mt-tab-item>
      </mt-navbar> -->
      <mt-tab-container v-model="selected">
        <!-- 金币 -->
        <mt-tab-container-item id="1">
          <div v-for="(item,index) in listMoneyData" v-if="listMoneyData.length>0 && selected==1">
            <div class="accountDetails-content">
              <div class="accountDetails-contentOne">
                <div class="ac_left">
                  <p>{{item.changedType}}</p>
                  <div>{{item.remarks}}</div>
                </div>
                <p class="ac_time">{{item.changedTime | formatDate}}</p>
                <p style="font-size:0.65rem;color:#9EA9BC;width: 12rem" v-if="item.changedType == '提现退回'">
                  {{item.reason}}</p>
              </div>
              <div class="accountDetails-contentTwo">
                <p><span>{{item.flowType}}</span>{{item.amount}}</p>
                <p>{{item.coinBalance | NumFormat}}</p>
              </div>
            </div>
            <div class="accountDetails-footBaseline"></div>
          </div>
        </mt-tab-container-item>
        <!-- 零钱 -->
        <!-- <mt-tab-container-item id="2">
            <div v-for="(item,index) in listData" v-if="listData.length>0 && selected==2">
                <div class="accountDetails-content">
                    <div class="aclq_left">
                        <p>{{item.changedType}}</p>
                        <p>{{item.changedTime | formatDate}}</p>
                    </div>
                    <div class="aclq_right">
                        <p><span>{{item.flowType}}</span>{{item.amount}}元</p>
                    </div>
                </div>
                <div class="accountDetails-footBaseline"></div>
            </div>
        </mt-tab-container-item> -->
        <!-- 提现记录 -->
        <!-- <mt-tab-container-item id="3">
            <div v-for="(item,index) in listRecordData" v-if="listRecordData.length>0 && selected==3">
                <div class="accountDetails-content">
                    <div class="accountDetails-display">
                        <div class="accountDetails-img" style="height:1.6rem;line-height:1.6rem;">
                            <img src="../../assets/weixin.png" alt="" v-if="isShowWx">
                            <img src="../../assets/zfb.png" alt="" v-if="isShowZfb">
                        </div>
                        <div class="accountDetails-contentOne" style="margin:-0.2rem 0 0 0.4rem">
                            <p>{{item.accountType}}</p>
                            <p>{{item.changedTime | formatDate}}</p>
                        </div>
                    </div>
                    <div class="accountDetails-contentTwo">
                        <p><span>{{item.flowType}}</span>{{item.amountM | keepTwoNum}}元</p>
                    </div>
                </div>
                <div class="accountDetails-footBaseline"></div>
            </div>
        </!-->
      </mt-tab-container>
      <div v-if="nolist && selected==1" class="ac_nomsg">
        <img src="../../assets/meiyourshuju.png" alt="">
        <p>你还没有帐变明细哦，赶紧参加游戏去！</p>
      </div>
      <!-- <div  class="ac_nomsg" v-if="nolist && selected==2">
          <img src="../../assets/meiyourshuju.png" alt="">
          <p>你还没有零钱明细哦，赶紧参加游戏去！</p>
      </div> -->
      <!-- <div style="margin-top: 5rem;color: #3C3E59;font-size: 1rem;text-align: center;" v-if="nolist && selected==3">暂无数据</div> -->
    </scroller>
  </div>
</template>
<script>
    import {formatDate} from '../../utils/date.js'
    // import mint from '../../css/mint-ui.css'

    export default {
        data() {
            return {
                selected: '1',
                listData: {},
                listMoneyData: {},
                // listRecordData:{},
                isShowWx: false,
                isShowZfb: false,
                token: '',
                imei: '',
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                noDataText: '',
                total: 0,
                nolist: false,
                isInfo: true,
                isPull: false,
                par: 1,
                initpage: true
            }
        },
        created() {

            //从APP跳转中获取token
            this.token = APP.GetLocationParams("token")
            this.imei = APP.GetLocationParams("imei");
            this.getApprenticeList();//金币
            // this.getInfo() //零钱
            // this.getRecordInfo() //提现记录
        },

        watch: {
            selected(val, oldVal) {
                this.isPull = false;
                this.total = 0;
                this.currentPage = 1;
                this.nolist = false;
                if (val == 1) {
                    this.getApprenticeList()//金币
                } else if (val == 2) {
                    this.getInfo()//零钱
                } else {
                    this.getRecordInfo() //提现记录
                }
            },
        },
        //过滤器
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
            },
            keepTwoNum: function (value) {
                value = Number(value);
                return value.toFixed(2)
            },
            NumFormat: function (value) {
                if (!value) return ''
                value = value.toFixed(0)
                var intPart = Number(value).toFixed(0) // 获取整数部分
                var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                var floatPart = ''// 预定义小数部分
                var value2Array = value.split('.')
                // =2表示数据有小数位
                if (value2Array.length === 2) {
                    floatPart = value2Array[1].toString() // 拿到小数部分
                    if (floatPart.length === 1) { // 补0,实际上用不着
                        return intPartFormat + '.' + floatPart + '0'
                    } else {
                        return intPartFormat + '.' + floatPart
                    }
                } else {
                    return intPartFormat + floatPart
                }
            }

        },
        methods: {
            // 零钱
            getInfo() {
                let parameterData = {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    token: this.token,
                    imei: this.imei,
                    // token:'4099ac907466a9a6be506560a0e84b20',
                    // imei:'866135038704620'
                }
                this.$get('/api/lBalanceChange/list', parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        for (var i = 0; i < res.data.list.length; i++) {
                            if (res.data.list[i].changedType == '1') {
                                res.data.list[i].changedType = '充值'
                            } else if (res.data.list[i].changedType == '2') {
                                res.data.list[i].changedType = '提现'
                            } else if (res.data.list[i].changedType == '3') {
                                res.data.list[i].changedType = '推荐好友'
                            } else if (res.data.list[i].changedType == '4') {
                                res.data.list[i].changedType = '参与打卡'
                            } else if (res.data.list[i].changedType == '5') {
                                res.data.list[i].changedType = '打卡成功'
                            } else if (res.data.list[i].changedType == '6') {
                                res.data.list[i].changedType = '购买会员'
                            } else if (res.data.list[i].changedType == '7') {
                                res.data.list[i].changedType = '团队长赠送'
                            } else {
                                res.data.list[i].changedType = '其他'
                            }

                            if (res.data.list[i].flowType == '1') {
                                res.data.list[i].flowType = '+'
                            } else {
                                res.data.list[i].flowType = '-'
                            }
                        }
                        this.total = res.data.total;
                        if (res.data.list.length > 0) {
                            if (res.data.total > 10) {
                                this.noDataText = ""
                                this.isPull = true
                            } else {
                                // this.noDataText = "没有更多了"
                                this.isPull = false
                            }
                            this.listData = res.data.list
                        } else {
                            this.isPull = false;
                            this.nolist = true;
                        }
                    } else {
                        this.isPull = false;
                        this.nolist = true;
                        // this.$message({type:'error',message:res.message,duration:3000})
                    }
                })
            },
            // 提现记录
            getRecordInfo() {
                let parameterData = {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    token: this.token,
                    imei: this.imei,
                    changedType: 3,
                    // token:'4099ac907466a9a6be506560a0e84b20',
                    // imei:'866135038704620'
                }
                this.$get('/api/lCoinChange/list', parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        for (var i = 0; i < res.data.list.length; i++) {
                            if (res.data.list[i].accountType == '1') {
                                res.data.list[i].accountType = '微信'
                                this.isShowWx = true
                            } else {
                                res.data.list[i].accountType = '支付宝'
                                this.isShowZfb = true
                            }
                            if (res.data.list[i].flowType == '1'
                            ) {
                                res.data.list[i].flowType = '+'
                            } else {
                                res.data.list[i].flowType = '-'
                            }
                        }
                        this.total = res.data.total;
                        if (res.data.list.length > 0) {
                            if (res.data.total > 10) {
                                this.noDataText = ""
                                this.isPull = true
                            } else {
                                // this.noDataText = "没有更多了"
                                this.isPull = false
                            }
                            this.listRecordData = res.data.list
                        } else {
                            this.isPull = false;
                            this.nolist = true;
                        }
                    } else {
                        this.isPull = false;
                        this.nolist = true;
                        // this.$message({type:'error',message:res.message,duration:3000})
                    }
                })
            },
            // 金币
            getApprenticeList() {
                let parameterData = {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    token: this.token,
                    imei: this.imei
                    // token:'4099ac907466a9a6be506560a0e84b20',
                    // imei:'866135038704620'
                }
                this.$get('/api/lCoinChange/list', parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        for (var i = 0; i < res.data.list.length; i++) {
                            if (res.data.list[i].changedType == '1') {
                                res.data.list[i].changedType = '答题'
                            } else if (res.data.list[i].changedType == '2') {
                                res.data.list[i].changedType = '每日红包'
                            } else if (res.data.list[i].changedType == '3') {
                                res.data.list[i].changedType = '提现'
                            } else if (res.data.list[i].changedType == '4') {
                                res.data.list[i].changedType = '推荐用户'
                            } else if (res.data.list[i].changedType == '5') {
                                res.data.list[i].changedType = '徒弟贡献金额'
                            } else if (res.data.list[i].changedType == '6') {
                                res.data.list[i].changedType = '宝猪会员'
                            } else if (res.data.list[i].changedType == '7') {
                                res.data.list[i].changedType = '游戏试玩奖励'
                            } else if (res.data.list[i].changedType == '10') {
                                res.data.list[i].changedType = '系统任务'
                            } else if (res.data.list[i].changedType == '8') {
                                res.data.list[i].changedType = '好友升级奖励'
                            } else if (res.data.list[i].changedType == '9') {
                                res.data.list[i].changedType = '新人注册奖励'
                            } else if (res.data.list[i].changedType == '11') {
                                res.data.list[i].changedType = '出题'
                            } else if (res.data.list[i].changedType == '12') {
                                res.data.list[i].changedType = '闯关解锁金额'
                            } else if (res.data.list[i].changedType == '13') {
                                res.data.list[i].changedType = '阅读资讯'
                            } else if (res.data.list[i].changedType == '14') {
                                res.data.list[i].changedType = '提现退回'
                            } else if (res.data.list[i].changedType == '15') {
                                res.data.list[i].changedType = '好友升级奖励'
                            } else if (res.data.list[i].changedType == '16') {
                                res.data.list[i].changedType = '升级运营总监赠送'
                            } else if (res.data.list[i].changedType == '17') {
                                res.data.list[i].changedType = '间接分成奖励'
                            } else if (res.data.list[i].changedType == '18') {
                                res.data.list[i].changedType = '好友额外分成'
                            } else if (res.data.list[i].changedType == '19') {
                                res.data.list[i].changedType = '阅读广告奖励'
                            } else if (res.data.list[i].changedType == '20') {
                                res.data.list[i].changedType = '分享资讯'
                            } else if (res.data.list[i].changedType == '21') {
                                res.data.list[i].changedType = '签到赚奖励'
                            } else if (res.data.list[i].changedType == '22') {
                                res.data.list[i].changedType = '额外奖励'
                            } else if (res.data.list[i].changedType == '23') {
                                res.data.list[i].changedType = '高额赚获得'
                            } else if (res.data.list[i].changedType == '24') {
                                res.data.list[i].changedType = '达人首次奖励'
                            } else if (res.data.list[i].changedType == '25') {
                                res.data.list[i].changedType = '达人后续奖励'
                            } else if (res.data.list[i].changedType == '26') {
                                res.data.list[i].changedType = '阅读小说'
                            } else if (res.data.list[i].changedType == '27') {
                                res.data.list[i].changedType = '达人邀请周榜奖励'
                            } else if (res.data.list[i].changedType == '28') {
                                res.data.list[i].changedType = '高额赚提成'
                            } else if (res.data.list[i].changedType == '29') {
                                res.data.list[i].changedType = '每日红包任务'
                            } else if (res.data.list[i].changedType == '30') {
                                res.data.list[i].changedType = '观看视频'
                            } else if (res.data.list[i].changedType == '31') {
                                res.data.list[i].changedType = '小游戏奖励'
                            } else if (res.data.list[i].changedType == '32') {
                                res.data.list[i].changedType = '打卡消耗'
                            } else if (res.data.list[i].changedType == '33') {
                                res.data.list[i].changedType = '打卡奖励'
                            } else if (res.data.list[i].changedType == '34') {
                                res.data.list[i].changedType = '金币排行日榜奖励'
                            } else if (res.data.list[i].changedType == '35') {
                                res.data.list[i].changedType = '合伙人一级直属用户贡献'
                            } else if (res.data.list[i].changedType == '36') {
                                res.data.list[i].changedType = '合伙人二级直属用户贡献'
                            } else if (res.data.list[i].changedType == '37') {
                                res.data.list[i].changedType = '闯关助力'
                            } else if (res.data.list[i].changedType == '38') {
                                res.data.list[i].changedType = '合伙人二级以下直属用户贡献'
                            } else if (res.data.list[i].changedType == '39') {
                                res.data.list[i].changedType = '代理推广收益分成'
                            } else if (res.data.list[i].changedType == '40') {
                                res.data.list[i].changedType = '徒孙贡献金额'
                            } else if (res.data.list[i].changedType == '41') {
                                res.data.list[i].changedType = '好友开通VIP奖励'
                            } else if (res.data.list[i].changedType == '42') {
                                res.data.list[i].changedType = '团队开通VIP奖励'
                            } else {
                                res.data.list[i].changedType = '其他'
                            }

                            if (res.data.list[i].flowType == '1'
                            ) {
                                res.data.list[i].flowType = '+'
                            } else {
                                res.data.list[i].flowType = '-'
                            }

                            if (res.data.list[i].coinBalance == '' || res.data.list[i].coinBalance == '0' || res.data.list[i].coinBalance == null || res.data.list[i].coinBalance == 'null') {
                                res.data.list[i].coinBalance = ''
                            }
                        }
                        // res.data.list = res.data.list.filter(item => {
                        //     if (item.remarks != '每日工资提现') {
                        //         return item
                        //     }
                        // });
                        this.total = res.data.total;
                        if (res.data.list.length > 0) {
                            if (res.data.total > 10) {
                                this.noDataText = ""
                                this.isPull = true
                            } else {
                                // this.noDataText = "没有更多了"
                                this.isPull = false
                            }

                            this.listMoneyData = res.data.list
                        } else {
                            this.isPull = false;
                            this.nolist = true;
                        }
                    } else {
                        this.isPull = false;
                        this.nolist = true;
                        // this.$message({type:'error',message:res.message,duration:3000})
                    }
                })
            },
            // 上拉加载
            infinite(done) {
                // this.currentPage = 1;
                this.noDataText = "";
                this.nolist = false;
                if (this.selected == 2) { // 零钱
                    setTimeout(() => {
                        if (this.isPull) {
                            this.currentPage++;
                        }
                        if (this.listData.length >= this.total) {
                            if (this.listData.length != 0) {
                                this.noDataText = "没有更多了"
                            }
                            done(true)
                            return
                        }
                        let parameterData = {
                            pageSize: this.pageSize,
                            pageNum: this.currentPage,
                            token: this.token,
                            imei: this.imei
                        }
                        this.$get('/api/lBalanceChange/list', parameterData).then(res => {
                            if ((res.statusCode + "").startsWith("2")) {
                                if (res.data.list.length > 0) {
                                    if (this.currentPage > 1) {
                                        for (var i = 0; i < res.data.list.length; i++) {
                                            if (res.data.list[i].changedType == '1') {
                                                res.data.list[i].changedType = '充值'
                                            } else if (res.data.list[i].changedType == '2') {
                                                res.data.list[i].changedType = '提现'
                                            } else if (res.data.list[i].changedType == '3') {
                                                res.data.list[i].changedType = '推荐好友'
                                            } else if (res.data.list[i].changedType == '4') {
                                                res.data.list[i].changedType = '参与打卡'
                                            } else if (res.data.list[i].changedType == '5') {
                                                res.data.list[i].changedType = '打卡成功'
                                            } else if (res.data.list[i].changedType == '6') {
                                                res.data.list[i].changedType = '购买会员'
                                            } else {
                                                res.data.list[i].changedType = '其他'
                                            }

                                            if (res.data.list[i].flowType == '1') {
                                                res.data.list[i].flowType = '+'
                                            } else {
                                                res.data.list[i].flowType = '-'
                                            }
                                        }
                                        this.total = res.data.total;
                                        this.listData = this.listData.concat(res.data.list)
                                    }
                                    // if(this.listData.length>=this.total){
                                    //     this.noDataText = "没有更多了";
                                    // }else{
                                    //     this.noDataText = "";
                                    // }
                                }
                                // else {
                                //     this.nolist = true;
                                //     this.noDataText = "";
                                // }
                            } else {
                                // this.nolist = true;
                                this.noDataText = "没有更多了";
                            }
                        })
                        done(true)
                    }, 1000);
                } else if (this.selected == 1) { //金币
                    setTimeout(() => {
                        if (this.isPull) {
                            this.currentPage++;
                        }
                        if (this.listMoneyData.length >= this.total) {
                            if (this.listMoneyData.length != 0) {
                                this.noDataText = "没有更多了"
                            }
                            done(true)
                            return
                        }

                        let parameterData = {
                            pageSize: this.pageSize,
                            pageNum: this.currentPage,
                            token: this.token,
                            imei: this.imei
                        }
                        this.$get('/api/lCoinChange/list', parameterData).then(res => {
                            if ((res.statusCode + "").startsWith("2")) {
                                for (var i = 0; i < res.data.list.length; i++) {
                                    if (res.data.list[i].changedType == '1') {
                                        res.data.list[i].changedType = '答题'
                                    } else if (res.data.list[i].changedType == '2') {
                                        res.data.list[i].changedType = '每日红包'
                                    } else if (res.data.list[i].changedType == '3') {
                                        res.data.list[i].changedType = '提现'
                                    } else if (res.data.list[i].changedType == '4') {
                                        res.data.list[i].changedType = '推荐用户'
                                    } else if (res.data.list[i].changedType == '5') {
                                        res.data.list[i].changedType = '好友贡献'
                                    } else if (res.data.list[i].changedType == '6') {
                                        res.data.list[i].changedType = '宝猪会员'
                                    } else if (res.data.list[i].changedType == '7') {
                                        res.data.list[i].changedType = '游戏试玩奖励'
                                    } else if (res.data.list[i].changedType == '10') {
                                        res.data.list[i].changedType = '系统任务'
                                    } else if (res.data.list[i].changedType == '8') {
                                        res.data.list[i].changedType = '好友升级奖励'
                                    } else if (res.data.list[i].changedType == '9') {
                                        res.data.list[i].changedType = '新人注册奖励'
                                    } else if (res.data.list[i].changedType == '11') {
                                        res.data.list[i].changedType = '出题'
                                    } else if (res.data.list[i].changedType == '12') {
                                        res.data.list[i].changedType = '闯关解锁金额'
                                    } else if (res.data.list[i].changedType == '13') {
                                        res.data.list[i].changedType = '阅读资讯'
                                    } else if (res.data.list[i].changedType == '14') {
                                        res.data.list[i].changedType = '提现退回'
                                    } else if (res.data.list[i].changedType == '15') {
                                        res.data.list[i].changedType = '好友升级奖励'
                                    } else if (res.data.list[i].changedType == '16') {
                                        res.data.list[i].changedType = '升级运营总监赠送'
                                    } else if (res.data.list[i].changedType == '17') {
                                        res.data.list[i].changedType = '间接分成奖励'
                                    } else if (res.data.list[i].changedType == '18') {
                                        res.data.list[i].changedType = '好友额外分成'
                                    } else if (res.data.list[i].changedType == '19') {
                                        res.data.list[i].changedType = '阅读广告奖励'
                                    } else if (res.data.list[i].changedType == '20') {
                                        res.data.list[i].changedType = '分享资讯'
                                    } else if (res.data.list[i].changedType == '21') {
                                        res.data.list[i].changedType = '签到赚奖励'
                                    } else if (res.data.list[i].changedType == '22') {
                                        res.data.list[i].changedType = '额外奖励'
                                    } else if (res.data.list[i].changedType == '23') {
                                        res.data.list[i].changedType = '高额赚获得'
                                    } else if (res.data.list[i].changedType == '24') {
                                        res.data.list[i].changedType = '达人首次奖励'
                                    } else if (res.data.list[i].changedType == '25') {
                                        res.data.list[i].changedType = '达人后续奖励'
                                    } else if (res.data.list[i].changedType == '26') {
                                        res.data.list[i].changedType = '阅读小说'
                                    } else if (res.data.list[i].changedType == '27') {
                                        res.data.list[i].changedType = '达人邀请周榜奖励'
                                    } else if (res.data.list[i].changedType == '28') {
                                        res.data.list[i].changedType = '高额赚提成'
                                    } else if (res.data.list[i].changedType == '29') {
                                        res.data.list[i].changedType = '每日红包任务'
                                    } else if (res.data.list[i].changedType == '30') {
                                        res.data.list[i].changedType = '观看视频'
                                    } else if (res.data.list[i].changedType == '31') {
                                        res.data.list[i].changedType = '小游戏奖励'
                                    } else if (res.data.list[i].changedType == '32') {
                                        res.data.list[i].changedType = '打卡消耗'
                                    } else if (res.data.list[i].changedType == '33') {
                                        res.data.list[i].changedType = '打卡奖励'
                                    } else if (res.data.list[i].changedType == '34') {
                                        res.data.list[i].changedType = '金币排行日榜奖励'
                                    } else if (res.data.list[i].changedType == '35') {
                                        res.data.list[i].changedType = '合伙人一级直属用户贡献'
                                    } else if (res.data.list[i].changedType == '36') {
                                        res.data.list[i].changedType = '合伙人二级直属用户贡献'
                                    } else if (res.data.list[i].changedType == '37') {
                                        res.data.list[i].changedType = '闯关助力'
                                    } else if (res.data.list[i].changedType == '38') {
                                        res.data.list[i].changedType = '合伙人二级以下直属用户贡献'
                                    } else if (res.data.list[i].changedType == '39') {
                                        res.data.list[i].changedType = '代理推广收益分成'
                                    } else if (res.data.list[i].changedType == '40') {
                                        res.data.list[i].changedType = '徒孙贡献金额'
                                    } else {
                                        res.data.list[i].changedType = '其他'
                                    }

                                    if (res.data.list[i].flowType == '1'
                                    ) {
                                        res.data.list[i].flowType = '+'
                                    } else {
                                        res.data.list[i].flowType = '-'
                                    }
                                }
                                if (res.data.list.length > 0) {
                                    if (this.currentPage > 1) {
                                        this.total = res.data.total;
                                        this.listMoneyData = this.listMoneyData.concat(res.data.list)
                                    }
                                    if (this.listMoneyData.length >= this.total) {
                                        this.noDataText = "没有更多了";
                                        this.isPull = false;
                                    } else {
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
                    }, 1000);
                } else if (this.selected == 3) { // 提现
                    setTimeout(() => {
                        if (this.isPull) {
                            this.currentPage++;
                        }
                        if (this.listRecordData.length >= this.total) {
                            if (this.listRecordData.length != 0) {
                                this.noDataText = "没有更多了"
                            }
                            done(true)
                            return
                        }
                        let parameterData = {
                            pageSize: this.pageSize,
                            pageNum: this.currentPage,
                            token: this.token,
                            imei: this.imei,
                            changedType: 3
                        }
                        this.$get('/api/lCoinChange/list', parameterData).then(res => {
                            if ((res.statusCode + "").startsWith("2")) {
                                for (var i = 0; i < res.data.list.length; i++) {
                                    if (res.data.list[i].accountType == '1') {
                                        res.data.list[i].accountType = '微信'
                                        this.isShowWx = true
                                    } else {
                                        res.data.list[i].accountType = '支付宝'
                                        this.isShowZfb = true
                                    }
                                    if (res.data.list[i].flowType == '1'
                                    ) {
                                        res.data.list[i].flowType = '+'
                                    } else {
                                        res.data.list[i].flowType = '-'
                                    }
                                }
                                if (res.data.list.length > 0) {
                                    if (this.currentPage > 1) {
                                        this.total = res.data.total;
                                        this.listRecordData = this.listRecordData.concat(res.data.list)
                                    }
                                    if (this.listRecordData.length >= this.total) {
                                        this.noDataText = "没有更多了";
                                    } else {
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
                    }, 1000);
                }
            },
            // 下拉刷新
            refresh(done) {
                this.currentPage = 1;
                this.isPull = false;
                this.noDataText = "";
                this.nolist = false;
                this.total = 0;
                if (this.selected == 1) {//金币
                    this.listMoneyData = {};
                    this.getApprenticeList();
                    done(true)
                } else if (this.selected == 2) {//零钱
                    this.listData = {};
                    this.getInfo();
                    done(true)
                } else if (this.selected == 3) {//零钱
                    this.listRecordData = {};
                    this.getRecordInfo();
                    done(true)
                }
            },
        }
    }
</script>

<style scoped>
  /* 标题头 */
  p {
    margin: 0;
  }

  .accountDetails-head {
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
  }

  .accountDetails-head img {
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
  }

  .accountDetails-head p {
    color: #2d2e38;
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
  }

  /* 内容 */
  .accountDetails-content {
    /* height: 3rem; */
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0.8rem;
  }

  .accountDetails-contentOne p {
    margin: 0;
  }

  .ac_left p {
    font-size: 0.7rem;
    color: #3C3E59;
    margin-right: 0.4rem;
    /* margin: 0.4rem 0 0.1rem 0; */
  }

  .accountDetails-contentOne .ac_time {
    font-size: 0.65rem;
    color: #9EA9BC;
  }

  .ac_left {
    display: flex;
    align-items: center;
    /* margin: 0.5rem 0 0.2rem 0; */
  }

  .ac_left div {
    /* width: 1.95rem; */
    /* height: 0.7rem; */
    font-size: 0.5rem;
    color: #fff;
    border-radius: 0.1rem;
    background: -webkit-linear-gradient(left, #E8A342, #FFD886);
    background: -o-linear-gradient(right, #E8A342, #FFD886);
    background: -moz-linear-gradient(right, #E8A342, #FFD886);
    background: linear-gradient(to right, #E8A342, #FFD886);
  }

  .aclq_left {
    margin-top: 0.5rem;
  }

  .aclq_left p:nth-of-type(1) {
    font-size: 0.7rem;
    color: #3C3E59;
    margin-bottom: 0.2rem;
  }

  .aclq_left p:nth-of-type(2) {
    font-size: 0.65rem;
    color: #9EA9BC;
  }

  .aclq_right {
    font-size: 0.8rem;
    color: #FF2B49;
    line-height: 3rem;
  }

  .accountDetails-contentTwo {
    /* display: flex;
    align-items: center; */
    /* margin-top: 0.5rem; */
  }

  .accountDetails-contentTwo p:nth-of-type(1) {
    font-size: 0.8rem;
    color: #FF2B49;
    margin-bottom: 0.2rem;
    text-align: right;
  }

  .accountDetails-contentTwo p:nth-of-type(2) {
    font-size: 0.65rem;
    color: #9EA9BC;
    text-align: right;
  }

  .accountDetails-contentTwo img {
    /* width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.4rem; */
  }

  /* 组件 */
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #FF2B49 !important;
    color: #FF2B49 !important;
  }

  .mint-navbar .mint-tab-item {
    color: #9EA9BC;
    font-size: 0.8rem;
  }

  /* 提现记录 */
  .accountDetails-display {
    display: flex;
    align-items: center;
  }

  .accountDetails-img img {
    width: 1.6rem;
    height: 1.6rem;
  }

  /* 底线 */
  .accountDetails-footBaseline {
    border: 0.04rem solid #F2F2F2;
  }

  .ac_nomsg {
    margin-top: 5rem;
    color: #3C3E59;
    font-size: 1rem;
    text-align: center;
  }

  .ac_nomsg img {
    width: 6.2rem;
    height: 3.8rem;
    margin-bottom: 0.8rem;
  }

  .ac_nomsg p {
    font-size: 0.7rem;
    color: #9EA9BC;
  }
</style>

