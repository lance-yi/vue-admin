<template>
    <div style="padding-left: 260px;min-width: 1000px;padding-top: 60px">
        <div class="log-box">
            <div class="detail-title">
                  <img src="../../public/img/serach.png"/>
                  <p>搜索栏</p>
            </div>
            <div class="sscheck-box">
                 <button   class="zhuanyixukes soso" @click="soso">搜索</button>
              <div style="min-width:600px">
                  <span>网关名称：{{serachvalues}}</span>
                  <div style="position:absolute;top:-36px;right:10%">
                      <i-input  v-model="serachvalue" placeholder="安装地址、路口名称" style="width: 300px" class="sousuo" ></i-input>
                      <i-button type="primary" class="sure"  @click="serachs(serachvalue)">搜索</i-button>
                  </div>
                  
                  <p>日志类型：
                      <Radio-group v-model="logtype" >
                        <Radio :label="all">
                            <span>全部</span>
                        </Radio>
                            <Radio label="portOperate">
                                <span>端口日志</span>
                            </Radio>
                            <Radio label="gatewayRunning">
                                <span>网关运行日志</span>
                            </Radio>
                            <Radio label="personOperate">
                                <span>人员操作日志</span>
                            </Radio>
                            <Radio label="platForm">
                                <span>平台日志</span>
                            </Radio>
                    </Radio-group>
                  </p>
                  <p>日志时间：
                      <Radio-group v-model="times"  @on-change="changetime($event)">
                        <Radio label="1">
                            <span>近一天</span>
                        </Radio>
                            <Radio label="7">
                                <span>近一周</span>
                            </Radio>
                            <Radio label="30">
                                <span>近一月</span>
                            </Radio>
                            <Radio label="自定义" >
                                <span>自定义</span>
                            </Radio>
                             <DatePicker :value="value2" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择开始和结束日期" style="width: 200px" v-if="!hadtimeshow" @on-change="changetimes"></DatePicker>
                            <!-- <span style="margin-left:10px;color:#1d60fe;cursor: pointer;" @click="hadtime" v-if="hadtimeshow">自定义</span> -->
                            <!-- <InputNumber  v-model="hadtimes" placeholder="天数" style="width: 200px" class="sousuo"  v-if="!hadtimeshow" :max="365" :min="1"></InputNumber> -->
                    </Radio-group>
                  </p>
                   <p>日志状态：
                      <Radio-group v-model="status" >
                        <Radio label="nomal">
                            <span>正常</span>
                        </Radio>
                            <Radio label="nono">
                                <span>异常</span>
                            </Radio>
                    </Radio-group>
                  </p>
              </div>
              <ArcgisMaplog  @ip="ip" :propsmap='serachvaluedata' />
            </div>
        </div>
        <div class="detail-title" style="margin-left:50px;margin-bottom:20px" v-if="msgboxshow">
                  <img src="../../public/img/uuu.png"/>
                  <p>信息栏</p>
            </div>
        <div class="timelinebox">
              <Timeline>
              <Timeline-item v-for="(list,index) in logdata" :key="index">
  
                    <p class="msg" v-if="list.gatewayRunning">网关运行日志</p>
                    <p class="time" v-if="list.gatewayRunning">{{list.gatewayRunning.ResPerfMongo.date}}</p>
                    <p class="hour" v-if="list.gatewayRunning">{{list.gatewayRunning.ResPerfMongo.time}}</p>
                    <img src="../../public/img/16.png" slot="dot" v-if="list.gatewayRunning && list.gatewayRunning.state == 0" />
                    <img src="../../public/img/17.png" slot="dot" v-if="list.gatewayRunning && list.gatewayRunning.state == 1"/>
                    <div v-if="list.gatewayRunning" style="min-height: 90px;">
                        <div class="timelinecont" >
                            <p >IP地址：<span>{{list.gatewayRunning.ResPerfMongo.ipAddress}}</span></p>
                            <p >端口启用数量：<span>{{list.gatewayRunning.ResPerfMongo.portNum}}</span></p>
                            <p >WIFI状态：<span>{{list.gatewayRunning.ResPerfMongo.wifiState?'打开':'关闭'}}</span></p>
                            
                            <!-- <p >网关时间：<span>{{list.gatewayRunning.ResPerfMongo.gatewayTime}}</span></p> -->
                            <p >经度：<span>{{list.gatewayRunning.ResPerfMongo.longitude}}</span></p>
                            <p >纬度：<span>{{list.gatewayRunning.ResPerfMongo.latitude}}</span></p>
                            <p >在线时长：<span>{{list.gatewayRunning.ResPerfMongo.runningTimes}}</span></p>
                            <p >震动干扰：<span v-if="list.gatewayRunning.ResPerfMongo.shake <= 100">{{list.gatewayRunning.ResPerfMongo.shake}}次</span>
                            <span v-if="list.gatewayRunning.ResPerfMongo.shake > 100" style="color:#E60012">{{list.gatewayRunning.ResPerfMongo.shake}}次</span>
                            </p>
                            <p >温度：<span v-if="list.gatewayRunning.ResPerfMongo.temperature <= 70">{{list.gatewayRunning.ResPerfMongo.temperature}}℃</span>
                            <span v-if="list.gatewayRunning.ResPerfMongo.temperature > 70" style="color:#E60012">{{list.gatewayRunning.ResPerfMongo.temperature}}℃</span>
                            </p>
                            <p >湿度：<span v-if="list.gatewayRunning.ResPerfMongo.humidity <= 60">{{list.gatewayRunning.ResPerfMongo.humidity}}%</span>
                            <span v-if="list.gatewayRunning.ResPerfMongo.humidity >60" style="color:#E60012">{{list.gatewayRunning.ResPerfMongo.humidity}}%</span>
                            </p>
                        </div>
                        <div class="wglogbox" v-for="(lists,index) in list.gatewayRunning.listPort" :key="index">
                            <p >{{lists.port}}端口 </p>
                            <span style="margin-left:20px;min-width:170px">接入设备类型：{{lists.deviceType?lists.deviceType:'无'}}</span>
                            <span style="margin-left:30px" v-if="lists.deviceType&&lists.status == 1">状态：正常</span>
                            <span style="margin-left:30px;" v-if="lists.deviceType&&lists.status == 0">状态：<span style="color:#E60012">异常</span></span>
                            <span style="margin-left:30px" v-if="lists.deviceType">速率：<span v-if="lists.rate<= 1000&&lists.rate != 0">{{lists.rate}}KB/s</span>
                            <span v-if="lists.rate> 1000||lists.rate == 0" style="color:#E60012">{{lists.rate}}KB/s</span>
                            </span>
                            <span style="margin-left:30px" v-if="lists.deviceType">流量：<span v-if="lists.lanFlow<= 100000&&lists.lanFlow != 0">{{lists.lanFlow}}KB</span>
                            <span v-if="lists.lanFlow > 100000 || lists.lanFlow == 0" style="color:#E60012">{{lists.lanFlow}}KB</span>
                            </span>
                        </div>
                    </div>

               
                     <p class="msg" v-if="list.platForm" style="left:-86px">平台日志</p>
                     <p class="time" v-if="list.platForm">{{list.platForm.date}}</p>
                     <p class="hour" v-if="list.platForm">{{list.platForm.time}}</p>
                     <img src="../../public/img/nono.png" slot="dot" v-if="list.platForm"/>
                     <div v-if="list.platForm">
                        <div class="timelinecont" style="margin-bottom:50px">
                            <p >操作类型：<span>{{list.platForm.operateType}}</span></p>
                            <p >操作人：<span>{{list.platForm.user}}</span></p>
                            <p >证书编号：<span>{{list.platForm.certificateNo}}</span></p>
                            <p >操作内容：<span>{{list.platForm.operateContent}}</span></p>
                            <!-- <p >操作时间：<span>{{list.platForm.operateTime}}</span></p> -->
                        </div>
                    </div>
                    
                    <p class="msg" v-if="list.personOperate" style="left:-104px">人员操作日志</p>
                    <p class="time" v-if="list.personOperate">{{list.personOperate.date}}</p>
                    <p class="hour" v-if="list.personOperate">{{list.personOperate.time}}</p>
                    <img src="../../public/img/nono.png" slot="dot" v-if="list.personOperate"/>
                    <div v-if="list.personOperate">
                        <div class="timelinecont" style="margin-bottom:50px">
                            <p >设备类型：<span v-if="list.personOperate.externalDeviceType == 'camera'">摄像机</span>
                            <span v-if="list.personOperate.externalDeviceType == 'gateway'">网关</span>
                            <span v-if="list.personOperate.externalDeviceType == 'electronicFence'">电子围栏</span>
                            <span v-if="list.personOperate.externalDeviceType == 'electric'">智能电源</span>
                            <span v-if="list.personOperate.externalDeviceType == 'wifiSniffing'">wifi嗅探</span>
                            <span v-if="list.personOperate.externalDeviceType == 'onu'">onu</span>
                            </p>
                            <p >IP地址：<span>{{list.personOperate.externalDeviceIp}}</span></p>
                            <p >操作人：<span>{{list.personOperate.operatUser}}</span></p>
                            <p >操作内容：<span>{{list.personOperate.content}}</span></p>
                        </div>
                    </div>

                    <p class="msg" v-if="list.portOperate" style="left:-87px">端口插拔</p>
                    <p class="time" v-if="list.portOperate">{{list.portOperate.date}}</p>
                    <p class="hour" v-if="list.portOperate">{{list.portOperate.time}}</p>
                    <img src="../../public/img/16.png" slot="dot" v-if="list.portOperate && list.state == 0" />
                    <img src="../../public/img/17.png" slot="dot" v-if="list.portOperate && list.state == 1"/>
                    <div v-if="list.portOperate">
                        <div class="timelinecont" style="margin-bottom:50px">
                            <p style="min-width:150px">IP地址：<span>{{list.portOperate.gatewayIp}}</span></p>
                            <p >证书编号：<span>{{list.portOperate.certificateNo}}</span></p>
                            <p >操作人：<span>{{list.portOperate.userName}}</span></p>
                            <p v-if="list.state == 1">安全运维网关 端口{{list.portOperate.lan}} 发生许可操作</p>
                            <p v-if="list.state == 0">安全运维网关 端口{{list.portOperate.lan}} <span style="color:#E60012">发生非许可操作</span></p>
                            <p >操作内容：
                                <span v-if="list.state == 1">{{list.portOperate.descr}}</span>
                                <span style="color:E60012" v-if="list.state == 0">{{list.portOperate.descr}}</span>
                            </p>
                        </div>
                    </div>


              </Timeline-item>
              </Timeline>
            </div>
         <Page :total='total' show-total style="margin-bottom:50px" @on-change="changeliebiaopage" :current.sync="pages" v-if="msgboxshow"></Page>
    </div>
</template>
<script>
import ArcgisMaplog from "@/components/ArcgisMaplog";
  export default {
    name: 'log',
    components: {
        ArcgisMaplog
    },
    data () {
      return {
          value2:[],
          serachvaluedata:'',
          all:'',
          msgboxshow:false,
          hadtimeshow:true,
          serachvalue:'',
          logtype:'',
          status:'nomal',
          hadtimes:0,
          oldtime:'',
          logdata:[],
          oldip:'',
          total:0,
          times:'1',
          timedata:'',
          state:'',
          pages:'',
          serachvalues:'',
          persontime:[],
      }
    },
    created(){
    },
    mounted(){
    //   console.log(window.g.ApiUrl)
    },
    methods: {
       serachs(val){
           this.serachvaluedata = val
       },
       changetime(val){
           if(val == '自定义'){
               this.hadtimeshow = false
           }else{
               this.hadtimeshow = true
           }
           this.hadtimes = 0
       },
       changetimes(val){
          this.persontime = val
       },
       ip(data){
           this.oldip = data
           this.$http.get("res/gis/getGatewayById?",{gatewayId:data},res=>{
             this.serachvalues = res.data.installAddress
          },err=>{});
        //   this.$http.get("log/logOverView/findAll",{gatewayId:data},res=>{
        //       this.logdata = res.data[0].listAll
        //       this.total= res.data[0].total
        //       this.msgboxshow = true
        //      console.log(res)
        //   },err=>{});
       },
       changeliebiaopage(i){
        this.$http.get("log/logOverView/findAll",{pageNum:i,pageSize:10,gatewayId:this.oldip,logTime:this.timedata,logState:this.state,logType:this.logtype},res=>{
          this.logdata = res.data[0].listAll
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        },err=>{
        })
      },
       soso(){
           this.pages = 1
          if(this.hadtimeshow == true){
              this.timedata = this.times
          }else{
              this.timedata = ''
          }
          if(this.status == 'nomal'){
              this.state = 1
          }else{
              this.state = 0
          }
          if(this.serachvalue == ''){
              this.oldip = ''
          }
          this.$http.get("log/logOverView/findAll",{gatewayId:this.oldip,logTime:this.timedata,logState:this.state,logType:this.logtype,pageSize:10,pageNum:1,startTime:this.persontime[0],endTime:this.persontime[1]},res=>{
              if(res.data.length == 0){
                  this.logdata = []
                  this.msgboxshow = false
                  this.$Message.info('搜索不到相关日志');
              }else{
                    this.$Message.info(res.message);
                    this.logdata = res.data[0].listAll
                    this.total= res.data[0].total
                    this.msgboxshow = true
              }
            
             console.log(res)
          },err=>{});
       }
    }
  }
</script>
<style scoped>
   .log-box{
       margin: 10px 50px;
       border-bottom: 2px solid #1d60fe;
       /* background: red; */
   }
   .detail-title{
        display: flex;
        font-size: 15px;
        /* border-bottom: 1px solid #E5E5E5; */
        height: 40px;
        align-items: center;
        margin-top: 20px;
    }
    .detail-title p{
        margin-left: 10px;
    }
    .sscheck-box{
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    .sscheck-box div{
        text-align: left;
    }
    .sscheck-box div p{
        font-size: 14px;
        margin-top: 30px;
    }
    .sscheck-box div span{
        font-size: 14px
    }
    .soso{
        position: absolute;
        bottom: 30px;
        left: 360px;
        padding: 5px 20px;
    }
    .timelinebox {
    padding: 20px 0;
    height: calc(100% - 74px);
    overflow: auto;
    padding-left: 150px;
    padding-right: 50px;
    }
    .timelinecont {
    display: flex;
    /* justify-content:  flex-start; */
    flex-wrap:wrap;
    font-size: 14px;
    }
    .timelinecont p {
    text-align: left;
    min-width: 100px;
    margin-bottom: 10px;
    margin-right: 30px;
    }
    .timelinecont p span {
    color: #1d60fe;
    }
    .wglogbox{
      display: flex;
      font-size: 14px;
      text-align: left;
      margin-top: 10px;
    }
    .wglogbox span {
    color: #1d60fe;
    }
    .wglogbox:last-child{
        margin-bottom: 30px;
    }
    .time {
    position: absolute;
    left: -100px;
    top: 22px;
    font-size: 14px;
    }
    .hour {
    position: absolute;
    left: -83px;
    top: 45px;
    font-size: 14px;
    }
    .msg{
    position: absolute;
    left: -105px;
    top: 0px;
    font-size: 14px;  
    }
    .sure {
    height: 32px;
    border-radius: 0;
    background: #1d60fe;
    width: 60px;
    padding: 0;
    border-radius: 0 4px 4px 0;
    }
</style>
