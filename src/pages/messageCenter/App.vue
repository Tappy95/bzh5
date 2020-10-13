<template>
    <div id="app" style="height: 100vh;background: #F3F5F8;overflow: auto;">
        <div class="messageCenter-head">
            <img src="../../assets/right.png" alt="" @click="back">
            <p>通知公告</p>
            <p @click="showBox" v-show="isShow==1">全部已读</p>
            <p @click="showBox" v-show="isShow==2">全部已读</p>
        </div>
        <scroller :on-refresh="refresh" :on-infinite="infinite" :noDataText="noDataText">
            <div class="messageCenter-title">
                <div @click="isShowTap(1)" :class="isShow==1 ? 'messageCenter-titleLeft' : 'messageCenter-titleRight'">
                    通知
                    <div class="mc_line" v-if="isShow==1"></div>
                </div>
                <div @click="isShowTap(2)" :class="isShow==2 ? 'messageCenter-titleLeft' : 'messageCenter-titleRight'">
                    公告
                    <div class="mc_line" v-if="isShow==2"></div>
                </div>
            </div>
            <div class="messageCenter-foot">
                <!-- 通知 -->
                <div v-if="isShow==1 && listData.length>0" v-for="(item,index) in listData" @click="jumpInform(item.id)">
                    <mt-cell-swipe
                        :right="[
                            {
                            content: '删除',
                            style: { background: '#FF3A58', color: '#fff'},
                            handler: () => Delete(item.id)
                            }
                        ]">
                        <div class="messageCenter-footInner">
                            <div class="mf_tips">
                                <div class="messageCenter-footInnerLeft" style="padding-top: 0.7rem;">
                                    <p>{{item.informTitle}}</p>
                                    <p>{{item.pushTime | formatDate}}</p>
                                </div>
                                <div class="mf_unread">
                                    <img src="../../assets/weidu.png" alt="" v-if="item.isRead == 1">
                                </div>

                            </div>
                            <div class="messageCenter-footInnerRight" style="margin-top: 0.3rem;line-height: 0.9rem;">{{item.informContent}}</div>
                        </div>
                    </mt-cell-swipe>
                    <div class="messageCenter-footBaseline"></div>
                </div>
                <!-- 公告 -->
                <div v-if="isShow==2 && apprenticeList.length>0" v-for="(item,index) in apprenticeList" @click="jump(item.id)">
                    <div class="messageCenter-footInner">
                        <div class="mf_tips">
                            <div class="messageCenter-footInnerLeft">
                                <p>{{item.noticeTitle}}</p>
                                <p>{{item.createrTime | formatDate}}</p>
                            </div>
                            <div class="mf_unread">
                                <img src="../../assets/weidu.png" alt="" v-if="item.isRead == 1">
                            </div>
                        </div>
                        <div class="messageCenter-footInnerRight">{{item.noticeContent}}</div>
                    </div>
                    <div class="messageCenter-footBaseline"></div>
                </div>
            </div>
            <!-- <div class="mc_box" v-show="isShowBox">
                <div class="mc_boxinner" @click="stop">
                    <p>将所有消息标为已读？</p>
                    <div style="border:0.02rem solid #F2F2F2;"></div>
                    <div class="mc_tips">
                        <div @click="readAll">标为已读</div>
                        <span></span>
                        <div @click="close">取消</div>
                    </div>
                </div>
            </div> -->
            <!-- <div class="mc_box" v-show="isShowDel">
                <div class="mc_boxinner" @click="stopBox">
                    <p>将删除改消息，是否继续？</p>
                    <div style="border:0.02rem solid #F2F2F2;"></div>
                    <div class="mc_tips">
                        <div @click="deleteSection(id)">确定</div>
                        <span></span>
                        <div @click="closeBox">取消</div>
                    </div>
                </div>
            </div> -->
            <div style="margin-top: 5rem;color: #3C3E59;font-size: 1rem;text-align: center;" v-if="isShow==1 && nolisttz">暂无数据</div>
            <div style="margin-top: 5rem;color: #3C3E59;font-size: 1rem;text-align: center;" v-if="isShow==2 && nolist">暂无数据</div>
        </scroller>

    </div>
</template>
<script>
import {formatDate} from '../../utils/date.js'
import mint from '../../css/mint-ui.css'
import ele from '../../css/eleStyle.css'
// import { Toast } from 'mint-ui'

export default {
    data(){
        return {
            isShow:true,
            // isShowBox:false,
            // isShowDel:false,
            listData:{},
            apprenticeList:{},
            token:'',
            imei:'',
            nolist:false,
            nolisttz:false,

            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
            noDataText:'',
            total:0,
            nolist:false,
            nolisttd:false,
            isInfo: true,
            isPull:false,
            par:1
        }
    },
    created(){
      //从APP跳转中获取token
        this.token =APP.GetLocationParams("token");
        this.imei=APP.GetLocationParams("imei");
    //   if (this.token){
        this.getInfo();
        // this.getApprenticeList()
    //   }
    },
    //过滤器
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
        }
    },
    // mounted(){
    //     if(this.isIos()){
    //         window.backAction()= this.backAction();
    //     }
    // },
    methods:{
        back(){
            if(this.isAndroid()){
                window.android.over();
            }else if(this.isIos()){
                window.backAction();
            }
        },
        Delete(id) {
            this.$confirm('将删除改消息，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                // customClass: 'messageBox-prompt-test',
                center: true
            })
            .then(() => {
                this.delData(id)
            })
            .catch(() => {
                //   this.$message({ type: 'info', message: '已取消删除' })
            })
        },
        delData(id) {
            let parameterData = {
                token:this.token,
                imei:this.imei,
                id:id
            }
            this.$get('/api/appInform/appDelete',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")) {
                  this.$toast('删除成功！')
                  this.currentPage = 1;
                    // this.$message({ type: 'success', message: '删除成功！' })
                    this.getInfo()
                    } else {
                    }
            })
        },

        // showBox(){
        //     this.isShowBox = true;
        // },
        // close(){
        //     this.isShowBox = false;
        // },
        showBox() {
            this.$confirm('将所有消息标为已读？', '提示', {
                confirmButtonText: '标为已读',
                cancelButtonText: '取消',
                type: 'warning',
                // customClass: 'messageBox-prompt-test',
                center: true
            })
            .then(() => {
                this.readAll()
            })
            .catch(() => {
                //   this.$message({ type: 'info', message: '已取消删除' })
            })
        },
        readAll(){
            if(this.isShow == 1){
                if(this.listData.length == 0 || this.listData.length == '' || this.listData.length == 'null' || this.listData.length == null){
                  this.$toast('没有可以标为已读的消息！');
                }else{
                    let parameterData = {
                        token:this.token,
                        imei:this.imei,
                    }
                    this.$get('/api/appInform/wholeRead',parameterData).then(res => {
                        if((res.statusCode+"").startsWith("2")){
                          this.$toast(res.message);
                            this.getInfo();
                        }
                    })
                }
            }else{
                if(this.apprenticeList.length == 0 || this.apprenticeList.length == '' || this.apprenticeList.length == 'null' || this.apprenticeList.length == null){
                  this.$toast('没有可以标为已读的消息！');
                }
                else{
                    let parameterData = {
                        token:this.token,
                        imei:this.imei,
                    }
                    this.$get('/api/noticeUser/addList',parameterData).then(res => {
                        if((res.statusCode+"").startsWith("2")){
                          this.$toast(res.message);
                            this.getApprenticeList();
                        }
                    })
                }

            }

        },
        //公告详情
        jump(id){
            window.location.href = '/noticeDetails.html?token='+this.token+'&imei='+this.imei+'&id='+id;
            // this.$router.push({
            //     path:'/noticeDetails',
            //     query:{
            //         token:this.token,
            //         imei:this.imei,
            //         id:id
            //     }
            // })
        },
        //通知详情
        jumpInform(id){
            window.location.href = '/mesDetails.html?token='+this.token+'&imei='+this.imei+'&id='+id;
            // this.$router.push({
            //     path:'/mesDetails',
            //     query:{
            //         token:this.token,
            //         imei:this.imei,
            //         id:id
            //     }
            // })
        },
        // 通知
        getInfo(){
            this.isShow == 1;
            let parameterData = {
                pageSize : this.pageSize,
                pageNum : this.currentPage,
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/appInform/appList',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    if(res.data.list.length>0){
                        this.listData = res.data.list;
                      if (res.data.total>10) {
                        this.isPull = true
                      }
                    }else{
                        this.listData = {};
                        this.nolisttz = true
                    }
                  this.total=res.data.total;

                }else{
                    this.nolisttz=true;
                    // this.$message({type:'error',message:res.message,duration:3000})
                }
            })
        },
        // 公告
        getApprenticeList(){
            this.isShow == 2;
            let parameterData = {
                pageSize : this.pageSize,
                pageNum : this.currentPage,
                token:this.token,
                imei:this.imei
            }
            this.$get('/api/appNotice/appList',parameterData).then(res => {
                if((res.statusCode+"").startsWith("2")){
                    if(res.data.list.length>0){
                        this.apprenticeList = res.data.list
                      if (res.data.total>10) {
                        this.isPull = true
                      }
                    }else{
                        this.apprenticeList = {};
                        this.nolist = true
                    }
                  this.totalCount=res.data.total;
                }else{
                    this.nolist=true;
                    // this.$message({type:'error',message:res.message,duration:3000})
                }
            })
        },
        isShowTap(par){
            this.listData = {};
            this.apprenticeList={};
            this.nolist=false;
            this.nolisttd =false;
            this.noDataText = "";
            this.isPull=false;
            this.total=0;
            this.par=par;
            this.currentPage=1;
            this.pageSize=10;

            this.isShow = par
            if (this.isShow == 1) {
                this.getInfo()
            }else{
                this.getApprenticeList()
            }

        },
        infinite(done) {
            this.noDataText = "";
            this.nolist = false;
            if(this.par==1){
                setTimeout(()=> {
                if(this.isPull){
                    this.currentPage++
                }
                if(this.listData.length>=this.total){
                    if(this.listData.length!=0){
                    this.noDataText = "已到底部"
                    }
                    done(true)
                    return
                }
                let parameterData = {
                        pageSize : this.pageSize,
                        pageNum : this.currentPage,
                        token:this.token,
                        imei:this.imei
                    }
                    this.$get('/api/appInform/appList',parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        if (res.data.list.length > 0) {
                            if (this.currentPage > 1) {
                                this.total=res.data.total;
                                this.listData = this.listData.concat(res.data.list)
                            }
                            if(this.listData.length>=this.total){
                                this.noDataText = "已到底部";
                                this.isPull = false

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
            }else{
                setTimeout(()=> {
                if(this.isPull){
                    this.currentPage++
                }
                if(this.apprenticeList.length>=this.total){
                    if(this.apprenticeList.length!=0){
                    this.noDataText = "已到底部"
                    }
                    done(true)
                    return
                }
                let parameterData = {
                    pageSize : this.pageSize,
                    pageNum : this.currentPage,
                    token:this.token,
                    imei:this.imei
                }
                this.$get('/api/appNotice/appList',parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                    if (res.data.list.length > 0) {
                        if (this.currentPage > 1) {
                            this.totalCount=res.data.total;
                            this.apprenticeList = this.apprenticeList.concat(res.data.list)
                        }
                        if(this.apprenticeList.length>=this.total){
                            this.noDataText = "已到底部";
                          this.isPull = false
                        }else{
                            this.noDataText = "";
                        }
                    } else {
                        this.nolisttd = true;
                        this.noDataText = "";
                    }
                    } else {
                        this.nolisttd = true;
                        this.noDataText = "";
                    }
                })
                done(true)
                },1000);
            }
        },
        refresh(done) {
            this.currentPage = 1;
            this.isPull = false;
            this.noDataText ="";
            this.nolist=false;
            this.total = 0;
            if(this.isShow == 1){
                this.listData = {};
                this.getInfo();
                done(true)
            }else if (this.isShow == 2){
                this.apprenticeList = {};
                this.getApprenticeList();
                done(true)
            }
        },
        isIos() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            // let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isiOS == true ? true : false;
        },
        //判断是安卓还是iOS
        isAndroid() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
            // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isAndroid == true ? true : false;
        },
        // stop(){
        //     event.stopPropagation();
        // },
}}
</script>

<style scoped>
p{
    margin: 0;
}
/* 标题头 */
.messageCenter-head{
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #EFEFEF;
}
.messageCenter-head img{
    width: 0.5rem;
    height: 0.8rem;
    margin-left: 0.8rem;
}
.messageCenter-head p:nth-of-type(1){
    color: #1D1D1D;
    font-size: 0.85rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
    margin-left: 1rem;
}
.messageCenter-head p:nth-of-type(2){
    color: #1D1D1D;
    font-size: 0.7rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
    margin-right: 0.8rem;
}
.messageCenter-head p:nth-of-type(3){
    color: #1D1D1D;
    font-size: 0.7rem;
    text-align: center;
    margin: 0;
    line-height: 2.2rem;
    margin-right: 0.8rem;
}
/* 切换 */
.messageCenter-title{
    margin-top:2.2rem;
    height: 2.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.7rem;
    background-color: #fff;
}
.messageCenter-titleLeft{
    width: 5.5rem;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    color: #FF3352;
}
.mc_line{
    width:1.1rem;
    height:0.2rem;
    background:#FF3352;
    border-radius:0.15rem;
    margin-top: 0.2rem;
     margin: 0 auto;
    transition: all .5s;
}
.messageCenter-titleRight{
    width: 5.5rem;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    color: #9EA9BC;
}
/* 底部 */
.messageCenter-foot{
    margin-top: 0.4rem;
}
.messageCenter-footInner{
    height: 4rem;
    background-color: #fff;
    width: 100%;
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
}
.messageCenter-footInner p{
    margin: 0;
}
.mf_tips{
    display: flex;
    justify-content: space-between;
}
.mf_unread img{
    width: 1.45rem;
    height: 1.45rem;
    /* width: 0;
    height: 0;
    border-top: 1.45rem solid red;
    border-left: 1.45rem solid transparent;
    background-color: #FF3A58;
    font-size: 0.45rem;
    color: #fff; */
}
.messageCenter-footInnerLeft{
    margin: 0 0.8rem;
    padding-top: 0.4rem;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
}
.messageCenter-footInnerLeft p:nth-of-type(1){
    width: 5.2rem;
    font-size: 0.8rem;
    color: #3C3E5B;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;    /* 单行文字溢出打点 */
}
.messageCenter-footInnerLeft p:nth-of-type(2){
    font-size: 0.7rem;
    color: #9EA9BC;
    margin-top: 0.2rem;
}
.messageCenter-footInnerRight{
    margin: 0.1rem 0.8rem;
    font-size: 0.7rem;
    color: #9EA9BC;
    overflow: hidden;
    height: 2rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;  /*行数*/
    -webkit-box-orient: vertical;
    letter-spacing: 0.04rem;
}
/* 底线 */
.messageCenter-footBaseline{
    border: 0.04rem solid #F2F2F2;
}
/* 弹框 */
.mc_box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: -120rem;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999 !important;
}
.mc_boxinner{
    position: fixed;
    background-color: #fff;
    width: 14.8rem;
    /* height: 6.25rem; */
    top: 12.45rem;
    left: 1.6rem;
    border-radius: 0.4rem;
    text-align: center;
}
.mc_boxinner p:nth-of-type(1){
    font-size: 0.8rem;
    color: #3C3E5B;
    margin: 1.2rem 0;
}
.mc_tips{
    font-size: 0.7rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.mc_tips span{
    border: 0.04rem solid #F2F2F2;
    height: 2rem;
    margin: 0.1rem 0.5rem 0 0;
}
.mc_tips div:nth-of-type(1){
    margin-left: 1rem;
    color: #FF3352;
}
.mc_tips div:nth-of-type(2){
    color: #9EA9BC;
    margin-right: 1.5rem;
}
</style>

