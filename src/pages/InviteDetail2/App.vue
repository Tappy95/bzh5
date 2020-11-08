<template>
  <div id="app" style="background: #F2F5F8;overflow: auto;height:100vh">
    <div class="in_back">
      <img src="../../assets/right.png" @click="backTap"/>
      <p>合伙人详情</p>
    </div>
    <div style="position: relative;">
      <div class="in_top">
        <img src="../../assets/yqmxbg.png" alt="">
      </div>
      <div class="in_flex">
        <div>
          <p>累计收益(金币)</p>
          <p>{{total_reward | keepTwoNum}}</p>
        </div>
        <div></div>
        <div>
          <p>合伙人数(人)</p>
          <p>{{partner_count}}</p>
        </div>
      </div>
    </div>

    <div class="id_nav">
      <div v-for="(item,index) in nav" :class="status == item.id ? 'activeTog' : ''" class="font_height">
        <span @click="toggle(item.id)">{{item.text}}</span>
        <div :class="status == item.id ? 'id_line' : ''"></div>
      </div>
    </div>

    <div style="margin-top:10.1rem;" v-if="this.status == 1">
      <!-- <div style="margin-top:7.6rem;"> -->
      <div>
        <table>
          <thead>
          <tr>
            <th>日期</th>
            <th>活跃合伙人数</th>
            <th>一级收益</th>
            <th>二级收益</th>
          </tr>
          </thead>
          <div style="height:1.4rem"></div>
          <tbody v-for="(item,index) in listData">
          <tr>
            <td>{{item.updateTime | formatDate}}</td>
            <td>{{item.apprenticeCount}}人</td>
            <td>
              <!-- <p>{{(item.firstReward + item.secondReward) / 10000}}元</p> -->
              <!--                                <p>{{item.total | keepTwoNum}}金币</p>-->
              <p>{{item.firstReward}}金币</p>
              <!-- <p>首个+{{item.firstReward / 10000 | keepTwoNum}}元</p>
              <p>后续+{{item.secondReward / 10000 | keepTwoNum}}元</p> -->
            </td>
            <!--                            <td>{{item.per | keepTwoNum}}金币</td>-->
            <td>{{item.secondReward}}金币</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="this.status == 2" style="margin-top:12.5rem;" v-show="isShow">
      <div class="searchDiv">
        <!--                <input type="text" placeholder="请输入所要查找的有效ID" v-model="accountId">-->
        <!--                <p @click="searchData(0)" class="ui-button">搜索</p>-->
        <div class="li">
          <div>{{sum_1}}<img src="./../../assets/jinqian.png" alt=""
                                                            style="width:0.7rem;height:0.7rem;vertical-align:middle;margin-left:0.2rem"></div>
          <div @click="searchData(1)" class="ui-button">一级</div>
        </div>
        <div class="li">
          <div>{{sum_2}}<img src="./../../assets/jinqian.png" alt=""
                                                            style="width:0.7rem;height:0.7rem;vertical-align:middle;margin-left:0.2rem"></div>
          <div @click="searchData(2)" class="ui-button">二级</div>
        </div>
        <div class="li">
          <div>{{sum_3}}<img src="./../../assets/jinqian.png" alt=""
                                                            style="width:0.7rem;height:0.7rem;vertical-align:middle;margin-left:0.2rem"></div>
          <div @click="searchData(3)" class="ui-button">二级以下</div>
        </div>
      </div>
      <div style ="padding-top:1rem">

        <table>
          <thead>
          <tr>
            <th>流水ID</th>
            <th>好友层级</th>
            <th>奖励时间</th>
            <th>奖励</th>
          </tr>
          </thead>
          <div style="height:2.3rem;"></div>
          <div style="
    font-size: 0.6rem;
    color: rgb(158, 169, 188);
    text-align: center;
    background-color: #f2f5f8;
    width: 100%;
    border: 1px solid #f2f5f8;
    padding: 0.8rem 0 0 4.5rem;" v-if="this.tableData.length <= 0 || this.tableData.length == null">
            <p>未搜索到相关ID</p>
          </div>
          <tbody v-for="(item,index) in tableData">
          <tr>
            <td>{{item.id}}</td>
            <td>{{item.friend_floor}}</td>
            <td>
              <p>{{item.reward_time | formatDate}}</p>
            </td>
            <td style="color:#FF3352;">+{{item.reward}}<img src="./../../assets/jinqian.png" alt=""
                                                            style="width:0.7rem;height:0.7rem;vertical-align:middle;margin-left:0.2rem">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
    import {formatDate} from '../../utils/date.js'

    export default {
        data() {
            return {
                drPeopleNum: '1',
                drReward: '20000',
                listData: {
                    drReward: '0',
                    drPeopleNum: '0',
                    updateTime: '0',
                    apprenticeCount: '0',
                    firstReward: '0',
                    secondReward: '0',
                    total: '0',
                    per: '0'
                },
                nav: [
                    {
                        id: 1,
                        text: '每日总表'
                    }
                    // {
                    //     id: 2,
                    //     text: '团队奖励明细'
                    // },
                ],
                status: 1,
                isShow: true,
                tableData: {},
                sum_1: 0,
                sum_2: 0,
                sum_3: 0,
                total_reward:0,
                partner_count:0
            }
        },
        //过滤器
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },
            keepTwoNum: function (value) {
                value = Number(value);
                return value.toFixed(2);
            }
        },
        created() {
            this.token = APP.GetLocationParams("token");
            this.imei = APP.GetLocationParams("imei");
            this.drPeopleNum = APP.GetLocationParams("drPeopleNum");
            this.drReward = APP.GetLocationParams("drReward");
            this.getInfo();
        },
        methods: {
            backTap() {
                // window.history.go(-1);
                window.location.href = '/generalizeDetails.html?token=' + this.token + '&imei=' + this.imei;
            },
            toggle(id) {
                this.status = id;
                if (this.status == 1) {
                    this.getInfo();
                } else {
                    this.getList();
                }
            },
            getInfo() {
                let parameterData = {
                    token: this.token,
                    imei: this.imei,
                    pageSize: 50,
                    pageNum: 1
                }
                this.$get('/py/partner/agent_detail', parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        this.listData = res.data.list;
                        this.partner_count = res.data.partner_count;
                        this.total_reward = res.data.total_reward;
                        // for (let i = 0; i < this.listData.length; i++) {
                        //     // this.listData[i].total = (res.data.list[i].firstReward + res.data.list[i].secondReward)/10000;
                        //     if (this.listData[i].apprenticeCount == 0) {
                        //         this.listData[i].per = this.listData[i].total;
                        //     } else {
                        //         this.listData[i].per = this.listData[i].total / this.listData[i].apprenticeCount;
                        //     }
                        // }
                    }
                })
            },
            getList(value) {
                let parameterData = {
                    accountId: this.accountId,
                    token: this.token,
                    imei: this.imei,
                    pageSize: 50,
                    pageNum: 1,
                    friend_floor: value
                };
                this.$get('/py/partner/team_detail', parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        this.tableData = res.data.list;
                        this.sum_1 = res.data.sum_1;
                        this.sum_2 = res.data.sum_2;
                        this.sum_3 = res.data.sum_3;
                    }
                })
            },
            searchData(value) {
                this.getList(value);
            }
        }
    }
</script>

<style scoped>
  p {
    margin: 0;
  }
  .li{
    text-align: center;
  }
  .ui-button {
    color: #fff !important;
    border-radius: 10rem;
    width: 5rem;
    background-color: #d860f8;
    text-align: center;
    font-size: 1rem;
  }

  .ui-button:hover {
    background-color: #5948eb;
  }

  .in_back {
    background-color: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 2.2rem;
    color: #434561;
    font-size: 0.9rem;
    z-index: 99;
  }

  .in_back img {
    width: 0.5rem;
    margin-left: 0.75rem;
    height: 0.8rem;
  }

  .in_back p {
    margin-left: 6.5rem;
    font-size: 0.65rem;
  }

  .in_top {
    position: fixed;
    top: 2.2rem;
    background-color: #fff;
    padding: 0.4rem;
  }

  .in_top img {
    width: 17.15rem;
    height: 4.4rem;
  }

  .in_flex {
    position: fixed;
    top: 3.9rem;
    display: flex;
    color: #fff;
    left: 1.6rem;
  }

  .in_flex div:nth-of-type(1) {
    width: 5rem;
  }

  .in_flex div:nth-of-type(1) p:nth-of-type(1) {
    font-size: 0.6rem;
  }

  .in_flex div:nth-of-type(1) p:nth-of-type(2) {
    font-size: 1.2rem;
  }

  .in_flex div:nth-of-type(2) {
    border: 1px solid #fff;
    margin-left: 2.35rem;
    opacity: 0.4;
  }

  .in_flex div:nth-of-type(3) {
    margin-left: 0.8rem;
    width: 5rem;
  }

  .in_flex div:nth-of-type(3) p:nth-of-type(1) {
    font-size: 0.6rem;
  }

  .in_flex div:nth-of-type(3) p:nth-of-type(2) {
    font-size: 1.2rem;
  }

  .id_nav {
    margin-top: 8rem;
    display: flex;
    justify-content: space-around;
    font-size: 0.7rem;
    color: #9EA9BC;
    position: fixed;
    top: -0.4rem;
    background-color: #fff;
    width: 100%;
    height: 2.5rem;
    line-height: 1.3rem;
  }

  .id_line {
    text-align: center;
    height: 0.1rem;
    width: 1.2rem;
    background: #FF3352;
    margin: 0 auto;
    border-radius: 0.15rem;
  }

  .activeTog {
    color: #FF3352;
  }

  .font_height {
    margin-top: 0.4rem;
  }

  table {
    background-color: #fff;
    border-collapse: collapse;
  }

  table tr {
    border-bottom: 1px solid #E8E8E8;
  }

  table th {
    font-size: 0.65rem;
    color: #3C3E5B;
    width: 4.6rem;
    padding: 0.25rem 0 0.25rem 0;
  }

  table td {
    width: 4.6rem;
    text-align: center;
    font-size: 0.6rem;
    color: #9EA9BC;
    padding: 0.35rem 0;
  }

  thead {
    position: fixed;
    background-color: #fff;
  }

  /* th */
  .searchDiv {
    position: fixed;
    z-index: 100;
    top: 7.9rem;
    left: 0;
    right: 0;
    margin-top: 2.2rem;
    display: flex;
    background-color: #fff;
    /* height: 5rem; */
    padding: 0.4rem;
    justify-content: space-between;
    align-items: center;
  }

  .searchDiv input {
    width: 8.4rem;
    height: 1.6rem;
    border: none;
    background-color: #F2F4F7;
    border-radius: 0.4rem;
    background-image: url('../../assets/fangdajing.png');
    background-repeat: no-repeat;
    padding-left: 2rem;
    background-size: 1rem 1rem;
    background-position: left 0.6rem top 0.3rem;
  }

  .searchDiv p {
    font-size: 0.65rem;
    color: #3C3E59;
  }
</style>

