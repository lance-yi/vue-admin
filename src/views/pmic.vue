<template>
    <div @click="showno" >
        <div style="position:absolute;top:90px;left:30%;z-index:99">
                <i-button type="primary" class="sure" @click.stop="breaktime" style="border-radius:4px" v-if="hadtime">刷新</i-button>
                <div @click.stop="breaktime">
                <Select v-model="model1" style="width:100px" v-if="!hadtime">
                    <Option v-for="item in timeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
                </div>
        </div>
        <div style="position:absolute;top:90px;left:50%;z-index:99">
                <i-input  v-model="serachvalue" placeholder="安装地址、路口名称" style="width: 200px" class="sousuo"></i-input>
                <i-button type="primary" class="sure" @click="serachroad">搜索</i-button>
        </div>
        <img src="../../public/img/bigobj2.png" :class="rightdialogshow?'iconobj':'iconobjs'" @click.stop="showrightdialog()"/>
        <div class="rightdialog" v-if="rightdialogshow">
            <div @click.stop="statusclick(0)">
              <img src="../../public/img/xx.png"/>
              <span>运行异常：</span>
              <span style="color:#FE0302;font-size:22px;">{{statuslist.errorCnt}}</span>
            </div>
            <div @click.stop="statusclick(1)">
              <img src="../../public/img/nomal.png"/>
              <span>运行正常：</span>
              <span style="color:#1DE509;font-size:22px">{{statuslist.nomalCnt}}</span>
            </div>
            <div @click.stop="statusclick(2)">
              <img src="../../public/img/alllist.png"/>
              <span>总数：</span>
              <span style="color:#1D60FE;font-size:22px;">{{statuslist.total}}</span>
            </div>
        </div>

        <!-- 运维表格弹窗 -->
      <div class="statusbox" style="width:60%;top:20%;z-index:2000;left:3%;min-width:1180px;padding-bottom:20px;min-height:70%" v-if="statustable" @click.stop="funs()">
        <p class="detailpage"><img src="../../public/img/xxx.png" @click.stop="closerebigmind" style="float:right;margin-top: 5px"/></p>
              <div style="margin-bottom:20px;margin-top:10px">
                <i-input  v-model="valuetable" placeholder="安装地址、路口名称" style="width: 200px" class="sousuo"></i-input>
                <i-button type="primary" class="sure" @click="serachtable" >搜索</i-button>
              </div>
            <div style="padding:0 20px">
             <i-table border stripe :columns="columns4" :data="data1"></i-table>
              <Page :total='totals' show-total class="fullpage" @on-change="changeliebiaopage" style="margin-top:20px" :current.sync="pages"></Page>
            </div>
      </div>

        <ArcgisMapspmic  :propsmap='serachvalues' @ip="ip" :maptime='model1'/>


<transition name="fade">
        <div class="bigright" v-show="bigrightshow" transiton="fade"  @click.stop="fun()">
           <p class="detailpage">详情页面</p>
           <img src="../../public/img/xxx.png" style="position:absolute;right:30px;top:20px"  @click.stop="closebright"/>
            <div class="detail-box" ref="bright">
                <div class="detail-title">
                  <img src="../../public/img/20.png"/>
                  <p>基本信息</p>
                </div>
           
                <div class="detail-text" >
                  
                  <img src="../../public/img/dy.png" class="detail-textimg"/>
                  <div v-if="lampdata.length > 0">
                  <img src="../../public/img/g.png" class="fixedimg" style="bottom:85px;left:12px" v-if="msgdata.res_state==1"/>
                  <img src="../../public/img/r.png" class="fixedimg" style="bottom:85px;left:12px" v-if="msgdata.res_state==0"/>

                  <img src="../../public/img/g.png" class="fixedimg" style="left:12px" v-if="lampdata[0].state==1"/>
                  <img src="../../public/img/r.png" class="fixedimg" style="left:12px" v-if="lampdata[0].state==0"/>
                  
                  <img src="../../public/img/g.png" class="fixedimg" style="left:27px" v-if="lampdata[1].state==1"/>
                  <img src="../../public/img/r.png" class="fixedimg" style="left:27px" v-if="lampdata[1].state==0"/>

                  <img src="../../public/img/g.png" class="fixedimg" style="left:43px" v-if="lampdata[2].state==1"/>
                  <img src="../../public/img/r.png" class="fixedimg" style="left:43px" v-if="lampdata[2].state==0"/>

                  <img src="../../public/img/g.png" class="fixedimg" style="left:58px" v-if="lampdata[3].state==1"/>
                  <img src="../../public/img/r.png" class="fixedimg" style="left:58px" v-if="lampdata[3].state==0"/>
                  </div>
                  <div style="left:26px;" class="fixedborder" ></div>
                    <div class="detail-textbox">
                      <p>安装地址：<span style="color:#1D60FE">{{rtopdata.install_address}}</span></p>
                      <div>
                        <span style="min-width:180px;width:40%">设备IP：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" >{{rtopdata.electric_ip}}</span></span>
                        <span style="margin-right:0">项目名称：<span style="color:#1D60FE">{{rtopdata.projectName}}</span></span>
                      </div>
                      <div>
                        <span style="min-width:180px;width:40%">经度：<span style="color:#1D60FE">{{rtopdata.longitude}}</span></span>
                        <span style="margin-right:0">纬度：<span style="color:#1D60FE">{{rtopdata.latitude}}</span></span>
                      </div>
                      <div>
                        <span style="min-width:180px;width:40%;">MAC地址：<span style="color:#1D60FE">{{rtopdata.mac}}</span></span>
                        <span style="margin-right:0">责任人：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer"  @click.stop="checkperson(rtopdata.maintenance_user_id)">{{rtopdata.userName}}</span></span>
                      </div>
                    </div>
              </div>
 

               <div class="detail-title" >
                  <img src="../../public/img/21.png"/>
                  <p>控制栏</p>
                </div>
               
               <div class="control" v-if="typeone">
                  <div v-if="usedlist.inUsed">
                        <span style="min-width:330px">已使用端口：<span style="color:#1D60FE">{{usedlist.inUsed}}</span></span>
                        <span>未使用端口：<span style="color:#1D60FE">{{usedlist.unUsed}}</span></span>
                        <button   class="zhuanyixuke typechange" @click="typeswitch">端口控制</button>
                  </div>
                </div>

               <div class="controls" v-if="!typeone">
                  <div class="switch">
                    <button   class="zhuanyixukes buttonpos" @click="allowchangetype">确认修改</button>
                    <button   class="zhuanyixuke buttonback" @click="allowchangetypeback">返回</button>
                    <p>端口开关：</p>
                  <div v-if="typelist.length > 0"> 
                      <div>
                        <span>1</span>
                        <i-switch size="large" @on-change="switchchange(1,$event)" v-model="typelist[0].PORT1 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                         <span>2</span>
                        <i-switch size="large" @on-change="switchchange(2,$event)" v-model="typelist[1].PORT2 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                        <span>3</span>
                        <i-switch size="large" @on-change="switchchange(3,$event)" v-model="typelist[2].PORT3 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                         <span>4</span>
                        <i-switch size="large" @on-change="switchchange(4,$event)" v-model="typelist[3].PORT4 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                      </div>
                  </div>
                </div>
              </div>

              <div class="detail-title">
                  <img src="../../public/img/66.png"/>
                  <p>信息栏</p>
              </div>
              <div class="controls msgbox" >
                <p style="min-width:180px">运行状态：
                  <span v-if="msgdata.res_state==0" style="color:#FF5E5E">离线</span>
                  <span v-if="msgdata.res_state==1" style="color:#1D60FE">在线</span>
                  </p>
                <p style="min-width:250px">电源终端连续运行时长：
                  <!-- <span v-if="msgdata.time==0" style="color:#FF5E5E">{{离线}}</span> -->
                  <span  style="color:#1D60FE">{{msgdata.time}}</span>
                </p>
              </div>

              <div class="detail-title">
                  <img src="../../public/img/yd.png"/>
                  <p>终端用电状态</p>
              </div>
              <div class="timelinebox">
                  <Timeline>
                  <Timeline-item v-for="(list,index) in electro" :key="index">
                       <img class="timelineimg" src="../../public/img/kk.png"/>
                       <p class="timelinetext" >{{list.name}}</p>
                      <img src="../../public/img/16.png" slot="dot" v-if="list.state == 0"/>
                      <img src="../../public/img/17.png" slot="dot" v-if="list.state == 1" />
                      <img slot="dot" src="../../public/img/ending.png" v-if="list.state == 2"/>
                      <div class="timelinecont">
                        <p style="min-width:100px">状态：
                          <span v-if="list.state == 1" style="margin-bottom:20px;display:inline-block">正常</span>
                          <span v-if="list.state == 0" >异常</span>
                          <span v-if="list.state == 2" style="margin-bottom:20px;display:inline-block">未启用</span>
                        </p>
                        <p style="min-width:100px" v-if="list.state != 2">电流：
                          <span v-if="list.electricCurrent == 1">正常</span>
                          <span v-if="list.electricCurrent == 0" >异常</span>
                        </p>
                        <p style="min-width:100px;margin-left: 5px"  v-if="list.state != 2">电压：
                          <span v-if="list.voltage == 1">正常</span>
                          <span v-if="list.voltage == 0" >异常</span>
                        </p>
                        <p style="min-width:210px;margin-left: 5px" v-if="list.state != 2">发生时间：<span>{{list.occurTime}}</span></p>
                      </div>
                      <div class="hadpro"  style="margin-bottom:20px;width:100%" v-if="list.state == 0">故障描述：<span style="color:red">{{list.description}}</span></div>
                  </Timeline-item>
                  <!-- <TimelineItem > -->
                <!-- <img slot="dot" src="../../public/img/ending.png" /> -->
                <!-- </TimelineItem> -->
                  </Timeline>
              </div>

              <div class="detail-title" v-if="msgdata.res_state==0">
                  <img src="../../public/img/yd.png"/>
                  <p>离线分析</p>
              </div>
               <div style="display:flex;position:relative" v-if="msgdata.res_state==0">
                  <div  class="tablechangebox tablemoal" style="margin-top:38px">
                    <i-table border :columns="columns2" :data="data2" width="517"></i-table>
                    <p>分析建议：<span>{{offlineDetaildata.offlineDetail}}</span></p>
                  </div>
                  <ArcgisMapspmicsmall :propsname='data2' v-if="data2 != ''"/>
                
              </div>
              <p class="epilog" v-if="msgdata.res_state==0">结论分析：<span>{{offlineDetaildata.analysisDetail}}</span></p>
            </div>
        </div>
</transition>

<!-- 点击责任人弹窗 -->
            <div v-if="personshow" class="workdetail">
              <div class="detail-title" style="margin-top:10px;">
                  <p style="color:#1d60fe"><img src="../../public/img/sss.png" style="vertical-align: middle;margin-right:5px"/>人员信息</p>
                </div>

              <div class="content worksendbox" style="border:none">
                <div style="min-width:30%">
                  <p>姓名：</p>
                  <span>{{usermsg.userName}}</span>
                </div>
                <div style="min-width:30%">
                  <p>APP ID：</p>
                  <span>{{usermsg.appId}}</span>
                </div>
                <div style="min-width:30%">
                  <p>单位名称：</p>
                  <span>{{usermsg.company}}</span>
                </div>
                <div style="min-width:30%">
                  <p>性别：</p>
                  <span style="color: #696C6F" v-if="usermsg.sex == 0">男</span>
                  <span style="color: #696C6F" v-if="usermsg.sex == 1">女</span>
                </div>
                <div style="min-width:30%">
                  <p>手机号：</p>
                  <span>{{usermsg.mobile}}</span>
                </div>
                <div style="min-width:30%">
                  <p>单位地址：</p>
                  <span>{{usermsg.companyAddress}}</span>
                </div>
                <div style="min-width:30%">
                  <p>年龄：</p>
                  <span>{{usermsg.age}}</span>
                </div>
                <div style="min-width:30%">
                  <p>邮箱号码：</p>
                  <span>{{usermsg.email}}</span>
                </div>
                <div style="min-width:30%">
                  <p>所属单位电话：</p>
                  <span>{{usermsg.companyPhone}}</span>
                </div>
                <div style="min-width:30%">
                  <p>身份证号：</p>
                  <span>{{usermsg.idCard}}</span>
                </div>
              </div>

                <div class="detail-title" style="margin-top:10px;">
                  <p style="color:#1d60fe"><img src="../../public/img/mmm.png" style="vertical-align: middle;margin-right:5px"/>证书信息</p>
                </div>

                 <div>
                    <div v-for="(certlist,index) in certmsg" class="content" style="position:relative" :key="index">
                      <p style="font-size: 16px;width:100%;margin-top:20px">证书编号：
                        <span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.certificateNo}}</span>
                        <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.certificateNo}}</span>
                        <span v-if="certlist.certificateStatus == 1" style="color:#F15F69;">{{certlist.certificateNo}}</span>
                      </p>
                      <div class="morecontent">
                        <p style="min-width: 15%">发证类型：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.certificateType}}</span>
                          <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.certificateType}}</span>
                          <span v-if="certlist.certificateStatus == 1" style="color:#F15F69;">{{certlist.certificateType}}</span>
                        </p>
                        <p style="min-width: 30%">授权设备类型：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.installType}}</span>
                          <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.installType}}</span>
                          <span v-if="certlist.certificateStatus == 1" style="color:#F15F69;">{{certlist.installType}}</span>
                        </p>
                        <p style="min-width: 35%">发证日期：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.applyTime}}</span>
                          <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.applyTime}}</span>
                          <span v-if="certlist.certificateStatus == 1" style="color:#F15F69;">{{certlist.applyTime}}</span>
                        </p>
                        <p style="min-width: 35%">证书失效日期：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.endTime}}</span>
                          <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.endTime}}</span>
                          <span v-if="certlist.certificateStatus == 1" style="color: #F15F69;">{{certlist.endTime}}</span></p>
                        <p style="min-width: 20%">证书状态：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">正常</span>
                          <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">过期</span>
                          <span v-if="certlist.certificateStatus == 1" style="color: #F15F69;">停用({{certlist.updateTime}})</span></p>
                      </div>
                      <img src="../../public/img/tingyong.png" class="timego" v-if="certlist.certificateStatus == 1" style="right:80px"/>
                      <img src="../../public/img/timego.png" class="timego" v-if="certlist.certificateStatus == 2"/>
                    </div>
                 </div>
                 <img src="../../public/img/xxx.png" style="position:absolute;right:20px;top:10px" @click.stop="closecard"/>
                 <!-- <button   class="zhuanyixukes closebtn" @click="closecard">关闭</button> -->
            </div>




    </div>
</template>
<script>
import ArcgisMapspmic from "@/components/ArcgisMapspmic";
import ArcgisMapspmicsmall from "@/components/ArcgisMapspmicsmall";
  export default {
    name: 'pmic',
    components: {
        ArcgisMapspmic,
        ArcgisMapspmicsmall
    },
    data () {
      return {
        totals:0,
        data2:[],
        columns2: [
                {title: '安装地址',key: 'install_address',width:150,className:'address'},
                {title: 'IP',key: 'electric_ip',width:120,},
                {title: '在线状态',key: 'res_state',width:90,
                   render:(h,params)=>{
                          let tmpStr = "";
                          if(params.row.alertStatus=="1"){
                            tmpStr='在线';
                          }else{
                            tmpStr="离线"
                          }
                          return h('span',{
                          },tmpStr)
                        }
                },
                {title: '检测时间',key: 'update_time',width:155,className:'updatetime'}
                ],
        timelinelists:[],
        typelist:[],
        typeone:true,
        getwayip:'',
        columns4:[{title: '安装地址',key: 'install_address'},
                  {title: 'IP地址',key: 'electric_ip',width: 110},
                  {title: '责任人',key: 'userName',width: 85},
                  {title: '项目名称',key: 'projectName',width: 150},
                  {title: '经度',key: 'longitude',width: 105},
                  {title: '纬度',key: 'latitude',width: 105},
                  //  {title: 'IP地址',key: 'deviceIp',width: 108,
                  //  render:(h,params)=>{
                  //         return h('span',{
                  //             style:{
                  //                padding:'0 10px',
                  //                display:'inline-block'
                  //             }
                  //         },params.row.deviceIp)
                  //       }
                  // },
                  {title: '故障发生时间',key: 'occurTime',width: 130},
                  {title: '电源状态',key: 'alertStatus',width:120,
                   render:(h,params)=>{
                          let tmpStr = "";
                          if(params.row.alertStatus=="0"){
                            tmpStr=params.row.description;
                          }else{
                            tmpStr="正常"
                          }
                          return h('span',{
                              style:{
                                 background: (params.row.alertStatus=="0")?"#EC626B":"#9CD875",
                                 color:'#fff',
                                 padding:'4px 12px',
                                 display:'inline-block',
                              }
                          },tmpStr)
                        }
                  },
                  {title: '详情',key: 'action',width:100,
                    render: (h, params) => {
                      return h('div', [
                          h('div', {
                              on: {
                                  click: () => {
                                    // console.log(params.row.formId)
                                    this.gotodetal(params.row.id)
                                  }
                              },
                              style:{color:'#1d60fe',cursor:'pointer'}
                          }, '查看详情')
                      ]);
                    }
                  }],
        isalert:'',
        offlineDetaildata:[],
        pages:'',
        data1:[],
        msgdata:[],
        rtopdata:[],
        valuetable:'',
        totalstype:'',
        statustable:false,
        levels: "",
        value:'',
        personshow:false,
        statuslist:[],
        rightdialogshow:true,
        serachvalue:'',
        serachvalues:'',
        hadtime:true,
        bigrightshow:false,
        model1:'两分钟',
        mintime:60000,
        timer:null,
        oldid:'',
        lampdata:[],
        usermsg:[],
        certmsg:[],
        usedlist:[],
        changeobj:{},
        typelist:[],
        electro:[],
        timeList:[{
                value: '两分钟',
                label: '两分钟'
            },{
                value: '五分钟',
                label: '五分钟'
            },{
                value: '十分钟',
                label: '十分钟'
            },{
                value: '半小时',
                label: '半小时'
            },],
      }
    },
    beforeDestroy() {
        if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
            clearInterval(this.timer); //关闭
        }
    },
    mounted() {
    // this.drawLine();
    // this.drawLines();
      this.$http.get(
        "res/socElectrical/selectElectricCnt",
        {},
        res => {
          this.statuslist = res.data;
        },
        err => {}
      );
      if(localStorage.getItem('breaktime')){
        this.model1 = localStorage.getItem('breaktime')
        if(localStorage.getItem('breaktime') == '两分钟'){
           this.timers(2)
        }else if(localStorage.getItem('breaktime') == '五分钟'){
           this.timers(5)
        }else if(localStorage.getItem('breaktime') == '十分钟'){
           this.timers(10)
        }else if(localStorage.getItem('breaktime') == '半小时'){
          this.timers(30)
        }
        
      }else{
        this.model1 = '两分钟'
        this.timers(2)
      }
      
    
      document.getElementsByClassName('detail-box')[0].addEventListener('scroll', this.handleScroll)
    },
    methods: {
      timers(i){
      clearInterval(this.timer)
      this.timer =  setInterval(() => { 
             this.$http.get(
        "res/socElectrical/selectElectricCnt",
        {},
        res => {
          this.statuslist = res.data;
        },
        err => {}
      );
        }, this.mintime*i)
    },
       showno(){
        this.hadtime = true
        if(localStorage.getItem('breaktime') != this.model1){
            localStorage.setItem('breaktime',this.model1);
            if(this.model1 == '两分钟'){
              this.timers(2)
            }else if(this.model1 == '五分钟'){
              this.timers(5)
            }else if(this.model1 == '十分钟'){
              this.timers(10)
            }else if(this.model1 == '半小时'){
              this.timers(30)
            }
        }else{
          localStorage.setItem('breaktime',this.model1);
        }
        this.statustable = false
        if(this.bigrightshow == true){
          this.bigrightshow = false
          this.getwayip = ''
        }else if(this.bigrightshow == false && this.getwayip !== ''){
          this.bigrightshow = true
        }
      },
      breaktime(){
       this.hadtime = false
      },
      serachroad(){
      // console.log(this.serachvalue)
        this.serachvalues = this.serachvalue
      },
      showrightdialog(){
        if(this.rightdialogshow == true){
          this.rightdialogshow = false
        }else{
          this.rightdialogshow = true
        }
      },
      closerebigmind(){
       this.statustable = false
      },
      statusclick(index) {
        this.pages = 1
        this.statustable = true
        this.value = "";
        if (index == 0) {
          this.$http.get("res/socElectrical/selectElectricDetailList?",{isAlert:0,current:1,pageSize:10},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
                this.isalert = 0
            },err=>{});
        } else if (index == 1) {
          this.$http.get("res/socElectrical/selectElectricDetailList?",{isAlert:1,current:1,pageSize:10},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
                this.isalert = 1
            },err=>{});
            
        } else if (index == 2) {
          this.$http.get("res/socElectrical/selectElectricDetailList?",{isAlert:'all',current:1,pageSize:10},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
                this.isalert = 2
            },err=>{});
        } 
      },
      //表格分页
    changeliebiaopage(i){
        if(this.isalert == 0){
          this.$http.get("res/socElectrical/selectElectricDetailList?",{isAlert:0,current:i,pageSize:10},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
                this.isalert = 0
            },err=>{});
         
        }else if(this.isalert == 1){
            this.$http.get("res/socElectrical/selectElectricDetailList?",{isAlert:1,current:i,pageSize:10},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
                this.isalert = 1
            },err=>{});
          
        }else if(this.isalert == 2){
             this.$http.get("res/socElectrical/selectElectricDetailList?",{isAlert:'all',current:i,pageSize:10},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
                this.isalert = 2
            },err=>{});
        } 
    },
    //表格上的搜索
      serachtable(){
        this.pages = 1
        if(this.isalert == 0){
             this.$http.get("res/socElectrical/selectElectricDetailList?",{isAlert:0,current:1,pageSize:10,param:this.valuetable},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
                this.isalert = 0
              },err=>{});
          }else if(this.isalert == 1){
            this.$http.get("res/socElectrical/selectElectricDetailList?",{isAlert:1,current:1,pageSize:10,param:this.valuetable},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
                this.isalert = 1
              },err=>{});
            
          }else if(this.isalert == 2){
            this.$http.get("res/socElectrical/selectElectricDetailList?",{isAlert:'all',current:1,pageSize:10,param:this.valuetable},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
                this.isalert = 2
              },err=>{});
          
           }
        },
      gotodetal(data){
        this.typeone = true
        this.oldid = data
        this.bigrightshow = true
        this.$http.get("res/socElectrical/selectElectricDetail?",{id:data},res=>{
                this.rtopdata = res.data
                //离线分析
              this.$http.get("res/socElectrical/selectOfflineAnalysis?",{id:data,latitude:this.rtopdata.latitude,longitude:this.rtopdata.longitude},res=>{
                    this.offlineDetaildata = res.data
                    this.data2 = res.data.res
                    },err=>{});
              // 终端用电状态
              this.$http.get("res/socElectrical/selectTerminalAlert?",{ip:this.rtopdata.electric_ip,electricId:data},res=>{
                    this.electro = res.data
                    },err=>{});
              //电源灯
              this.$http.get("res/socElectrical/getPowerLampStatus?",{ip:this.rtopdata.electric_ip,electricId:data},res=>{
                    if(res.rel == true){
                        this.lampdata = res.data
                    }
                    },err=>{});
              },err=>{});
        // 控制栏使用端口号
             this.$http.get("res/socElectrical/selectControlbar?",{id:data},res=>{
                  if(res.rel == true){
                    this.usedlist = res.data
                  }  
                    },err=>{});
        //信息栏
        this.$http.get("res/socElectrical/selectInformationbar?",{id:data},res=>{
              if(res.rel == true){
                   this.msgdata = res.data
              }
                    
                    },err=>{});
        setTimeout(function() {
          var cc=document.getElementsByClassName("bigright")[0];
          cc.style.cssText="z-index:100";
          var zz=document.getElementsByClassName("statusbox")[0];
          zz.style.cssText="z-index:20;min-height:70%";
        }, 100);
      },
      closebright(){
        this.getwayip = ''
        this.bigrightshow = false
      },
      fun(){
        var cc=document.getElementsByClassName("bigright")[0];
        cc.style.cssText="z-index:100";
        var zz=document.getElementsByClassName("statusbox")[0];
        zz.style.cssText="z-index:20;min-height:70%";
      },
      funs(){
          this.statustable = true
          if(this.bigrightshow == true){
          var cc=document.getElementsByClassName("bigright")[0];
          cc.style.cssText="z-index:100";
          var zz=document.getElementsByClassName("statusbox")[0];
          zz.style.cssText="z-index:140;min-height:70%";
        }
      },
      switchchange(i,val){
      if(val == false){
        var aa = 0
      }else if(val == true){
        var aa = 1
      }
      this.$set(this.changeobj, 'PORT'+i, aa)
    },
      allowchangetype(){
        // console.log(this.changeobj)
        this.$http.put("res/socElectrical/updateControlbarState",{id:this.oldid,portMap:this.changeobj},res=>{
            
        },err=>{});
      },
      allowchangetypeback(){
        this.typeone = true
        // 控制栏使用端口号
         this.$http.get("res/socElectrical/selectControlbar?",{id:this.oldid},res=>{
                    this.usedlist = res.data
                    },err=>{});
      },
      typeswitch(){
      this.$http.get("res/socElectrical/selectControlbarState?",{id:this.oldid},res=>{
          this.typelist = res.data
      },err=>{});
      this.typeone = false
    },
    closecard(){
      this.personshow = false
      this.$refs.bright.style.overflow = "auto"
    },
    checkperson(id){
         this.$http.get("oauth/certificate/getCertInfo",{userId:id},res=>{
          this.usermsg = res.data[0].userInfo
          if(res.data[0].certInfo[0] !== null){
            this.certmsg = res.data[0].certInfo
            this.certmsg.forEach (el=>{ if(el.certificateStatus == 0) {this.oldcertificateNo = el.certificateNo}})
          }
          this.personshow = true
          this.$refs.bright.style.overflow = "hidden"
      },err=>{});
    },
      ip(data){
        this.typeone = true
        this.getwayip = data
        this.oldid = data
        // console.log(data)
        // this.bigrightshow = true
        this.$http.get("res/socElectrical/selectElectricDetail?",{id:data},res=>{
                this.rtopdata = res.data
                //离线分析
              this.$http.get("res/socElectrical/selectOfflineAnalysis?",{id:data,latitude:this.rtopdata.latitude,longitude:this.rtopdata.longitude},res=>{
                    this.offlineDetaildata = res.data
                    this.data2 = res.data.res
                    },err=>{});
              // 终端用电状态
              this.$http.get("res/socElectrical/selectTerminalAlert?",{ip:this.rtopdata.electric_ip,electricId:data},res=>{
                    this.electro = res.data
                    },err=>{});
              //电源灯
              this.$http.get("res/socElectrical/getPowerLampStatus?",{ip:this.rtopdata.electric_ip,electricId:data},res=>{
                    if(res.rel == true){
                        this.lampdata = res.data
                    }
                    },err=>{});
              },err=>{});
        // 控制栏使用端口号
         this.$http.get("res/socElectrical/selectControlbar?",{id:data},res=>{
                    if(res.rel == true){
                    this.usedlist = res.data
                  }  
                    },err=>{});
        //信息栏
        this.$http.get("res/socElectrical/selectInformationbar?",{id:data},res=>{
                    if(res.rel == true){
                   this.msgdata = res.data
              }
                    },err=>{});
        
      }
    },
  }
</script>
<style scoped>
   .sure {
      height: 32px;
      border-radius: 0;
      background: #1d60fe;
      width: 60px;
      padding: 0;
      border-radius: 0 4px 4px 0;
    }
    .iconobj{
      position: absolute;
      top: 55px;
      right: 220px;
      z-index: 20;
      cursor: pointer;
    }
    .iconobjs{
      position: absolute;
      top: 55px;
      right: 0px;
      z-index: 20;
      cursor: pointer;
    }
    .rightdialog {
      width: 220px;
      height: 240px;
      background: rgba(0, 0, 0, 0.4);
      position: fixed;
      right: 0;
      top: 60px;
      z-index: 18;
      padding: 30px;
    }
    .rightdialog div {
      font-size: 15px;
      color: #fff;
      font-weight: bold;
      margin-bottom: 35px;
      text-align: left;
      cursor: pointer;
    }
    .rightdialog div span {
      display: inline-block;
      vertical-align: middle;
    }
    .rightdialog div img {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
    .rightdialog div span:last-child {
      text-shadow: #000 2px 2px 4px;
    }
    .statusbox {
      min-width: 950px;
      width: 65%;
      background: #fff;
      /* height: 65%; */
      position: absolute;
      top: 150px;
      left: 0;
      right: 0;
      margin: 0 auto;
      box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.4);
      z-index: 20;
    }
    .detailpage{
      margin: 0px 20px;
      font-size:16px;
      text-align: left;
      padding: 10px 0;
    }
    /* 详情 */
    .detail-box{
      margin:0 0px 0 40px; 
      overflow-y:auto;
      height: 1000px;
      padding-bottom: 400px;
    }
    .detail-title{
      display: flex;
      font-size: 15px;
      border-bottom: 1px solid #E5E5E5;
      height: 40px;
      align-items: center;
      margin-top: 20px;
    }
    .detail-title p{
      margin-left: 10px;
    }
    .bigright{
      min-width: 1000px;
      width: 62%;
      height: 100%;
      background:#fff;
      position: fixed;
      right: 0;
      top:60px;
      z-index: 200;
      transition: all 300ms;
    }
    .fade-enter-active, .fade-leave-active {
      /* transition: opacity .5s */
    }
    .fade-enter, .fade-leave-active {
      transform: translate(500px,0px);
      /* opacity: 0 */
    }
    .detail-text{
      display: flex;
      align-items: center;
      padding-top:20px;
      border-bottom: 2px solid #1D60FE;
      padding-bottom: 45px;
      margin-bottom: 20px;
      position: relative;
    }
    .detail-textimg{
      width: 433px;
      height: 165px;
    }
    .detail-textbox{
      text-align: left;
      font-size: 14px;
      margin-left: 45px;
      width:calc(100% - 453px);
    }
    .detail-textbox div{
      margin-top: 15px;
    }
    .detail-textbox div span{
      display: inline-block;
    }
    .detail-textbox div span:first-child{
      margin-right: 10px;
    }
    /* 控制栏 */
    .control{
      margin:40px 40px 60px 40px;
      text-align: left;
      font-size: 14px;
      position: relative;
    }
    .control div {
      margin-top: 30px;
    }
    .control div span{
      display: inline-block;
    }
    .typechange{
      position: absolute;
      right: 150px;
      top:0;
    }
    .controls{
      margin:40px;
      text-align: left;
      font-size: 14px;
      position: relative;
    }
    .controls p {
      font-size:14px;
    }
    .controls div span{
      font-size:14px;
    }
    .switch{
      margin-top:30px; 
      display: flex;
    }
    .switch p {
      font-size:14px;
    }
    .ivu-switch{
      margin-right: 20px;
      margin-left: 5px;
    }
    .buttonpos{
      position: absolute;
      left: 560px;
      bottom:0;
      min-width: 78px;
    }
    .buttonback{
      position: absolute;
      left: 660px;
      bottom:0;
      min-width: 78px;
    }
    .msgbox{
      display: flex;
      flex-wrap:wrap;
    }
    .msgbox p{
      margin-bottom: 20px;
    }
    .timelinebox {
      padding: 40px 140px 0px 110px;
      /* height: calc(100% - 74px); */
      overflow: auto;
    }
    .timelinecont {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .timelinecont p {
      text-align: left;
    }
    .timelinecont p span {
      color: #1d60fe;
    }
    .hadpro {
      font-size: 14px;
      text-align: left;
      margin-top: 10px;
      margin-bottom: 65px;
    }
    .hadpro a {
      color: #ff3636;
      /* border-bottom: 1px solid #1d60fe; */
    }
    .timelineimg {
      position: absolute;
      left: -82px;
      top: -3px;
      font-size: 14px;
    }
    .timelinetext {
      position: absolute;
      left: -76px;
      top: -2px;
      font-size: 14px;
      color:#1d60fe;
    }
    .roadstatus{
      color: #BDBDBD;
      text-align: left;
      margin-top: 60px;
    }
    .epilog{
      font-size: 16px;
      text-align: left;
      margin: 30px 0 10px 20%;
    }
    .epilog span{
      color: #ff3636;
    }
    .tablechangebox{
      margin-left:30px;
      margin-top:20px
    }
    .tablechangebox p{
      text-align: left;
      font-size: 13px;
      margin-top: 20px;
      font-weight: bold;
    }
    .tablechangebox p span{
      font-weight: normal;
      color: #1d60fe;
    }
    .workdetail{
      position: fixed;
      top:7%;
      background: #fff;
      width: 70%;
      left: 20%;
      padding: 0px 20px;
      box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.4);
      z-index: 9999999999;
      height: 80%;
      overflow-y: scroll;
      min-height: 500px;
    }
    .workdetail-top{
      padding: 20px;
      display: flex;
    }
    .workdetail-head{
      text-align: left;
      display: flex;
      font-size: 14px;
      margin-right: 20px;
    }
    .workdetailtitle{
      text-align: left;
      font-size: 14px;
      padding-left: 40px;
    }
    .content{
      display: flex;
      text-align: left;
      flex-wrap:wrap;
      padding: 0 40px;
      border-bottom: 1px solid #E5E5E5;
      padding-bottom: 20px;
      min-width: 800px;
    }
    .content div{
      margin-top: 25px;
      display: flex;
      align-items: center;
    }
    .content div p{
      font-size: 14px;
      min-width: 100px;
      text-align: right;
    }
    .content div span{
      color: #3C7FEE;
      font-size: 14px;
    }
    .worksendbox div span{
      color: #696C6F; 
    }
    .fixedborder{
      height:30px;
      border-right:2px solid #1D60FE;
      position:absolute;
      bottom:0;
    }
    .detail-text .fixedimg{
      position:absolute;
      bottom:67px;
      cursor: pointer;
    }
</style>
