<template>
  <div id="app" style="height: 100vh;background:rgba(243,245,248,1);overflow: auto;">
    <div class="ge_head" @click="back">
      <img src="../../assets/right.png" alt="">
      <p>兑换记录</p>
      <p></p>
    </div>
    <div class="change-wrap">
       <div class="changeList">
         <div class="changeList-item" v-for="(item,index) in listData">
           <div class="c-dec">
             <p class="p1">
               <span>金猪兑换卡</span>
               <span>{{item.cardNumber}}</span>
             </p>
             <p class="p2">
               <span>{{item.exchangeTime | formatDate}}</span>
             </p>
           </div>
           <div class="c-jz">{{item.obtainPigCoin}}金猪</div>
         </div>
        </div>

        <div class="no-tip">
          <div class="li_ne"></div>
          <span>已到底部</span>
          <span v-if="this.listData.length <= 0">暂无数据</span>
          <div class="li_ne"></div>
        </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../utils/date.js'

  export default {
    data(){
      return{
        listData:{}
      }
    },
    created(){
      this.token = APP.GetLocationParams("token");
      this.imei = APP.GetLocationParams("imei");
      this.getInfo();
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
      },
    },
    methods: {
      getInfo() {
        let parameterData = {
          token: this.token,
          imei: this.imei,
          pageNum:1,
          pageSize:10
        }
        this.$get('/api/goleEggOrder/useList', parameterData).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            this.listData = res.data.list;
          }
        })
      },
      back(){
        window.history.go(-1);
      }
    }
  }
</script>

<style scoped>

  p{
    margin: 0;
    padding: 0;
  }
  .ge_head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.2rem;
    background-color: #fff;
    padding: 0 0.8rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .ge_head img{
    width: 0.5rem;
    height: 0.8rem;
  }
  .ge_head p:nth-of-type(1){
    font-size: 0.85rem;
    color: #484A65;
    margin-left: 1rem;
  }
  .ge_head p:nth-of-type(2){
    font-size: 0.7rem;
    color: #484A65;
  }

  .changeList{
   padding: 0 0.8rem;
    /*height: auto;*/
    /*position: relative;*/
    /*top: 2.2rem;*/
    /*border-top: 0.05rem solid rgba(238,238,238,1);*/
    background: rgba(255,255,255,1);
  }

  .change-wrap{
    /*padding: 0 0.8rem;*/
    height: auto;
    position: relative;
    top: 2.2rem;
    border-top: 0.05rem solid rgba(238,238,238,1);
    /*background: rgba(255,255,255,1);*/
  }

  .changeList .changeList-item{
    padding: 0.4rem 0;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-self: center;
    border-bottom:0.05rem solid rgba( 243,245,248,1);
  }

  .changeList .changeList-item:last-child{
    border: none;
  }

  .changeList .changeList-item .c-dec .p1{
    padding-bottom: 0.1rem;
  }

  .changeList .changeList-item .c-jz{
    display: flex;
    justify-content: center;
    align-content: center;
    align-self: center;

    font-size:0.7rem;
    font-weight:400;
    color:rgba(255,43,73,1);
  }

  .changeList .changeList-item .c-dec .p1 span:nth-child(1){
    font-size:0.7rem;
    font-weight:400;
    color:rgba(60,62,89,1);
    padding-right: 0.1rem;
  }

  .changeList .changeList-item .c-dec .p1 span:nth-child(2){
    font-size:0.55rem;
    font-weight:400;
    color:rgba(158,169,188,1);
  }

  .changeList .changeList-item .c-dec .p1 span:nth-child(1){
    font-size:0.7rem;
    font-weight:400;
    color:rgba(60,62,89,1);
    padding-right: 0.1rem;
  }



  .changeList .changeList-item .c-dec .p2 {
    font-size:0.55rem;
    font-weight:400;
    color:rgba(158,169,188,1);
    /*line-height: 0.6rem;*/
  }

  .changeList .changeList-item .c-dec .p2 span:nth-child(1){
    padding-right: 0.8rem;
  }

   .change-wrap .no-tip{
    width: 100%;
    height: auto;
     margin-top: 0.4rem;
     display: flex;
     justify-content: center;
     align-content: center;
     align-items: center;
     font-size:0.6rem;
     font-weight:400;
     color:rgba(160,169,186,1);
  }

  .change-wrap .no-tip span{
      margin: 0 0.4rem;
  }

  .change-wrap .no-tip .li_ne{
    width:1.6rem;
    height:0.05rem;
    background:rgba(219,224,230,1);
    border-radius:0.1rem;
  }


</style>

