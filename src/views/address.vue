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
        <img src="../../public/img/100.png" :class="rightdialogshow?'iconobj':'iconobjs'" @click.stop="showrightdialog()"/>
        <div class="rightdialog" v-if="rightdialogshow">
            <div @click.stop="statusclick(0)">
              <img src="../../public/img/xx.png"/>
              <span>拆除点位：</span>
              <span style="color:#FE0302;font-size:22px;">{{statuslist.errorCnt}}</span>
            </div>
            <div @click.stop="statusclick(1)">
              <img src="../../public/img/101.png"/>
              <span>原址迁改：</span>
              <span style="color:#1DE509;font-size:22px">{{statuslist.nomalCnt}}</span>
            </div>
            <div @click.stop="statusclick(2)">
              <img src="../../public/img/102.png"/>
              <span>异地迁改：</span>
              <span style="color:#1DE509;font-size:22px">{{statuslist.nomalCnt}}</span>
            </div>
            <div @click.stop="statusclick(3)">
              <img src="../../public/img/103.png"/>
              <span>总点位数：</span>
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

        <ArcgisMapsaddress  :propsmap='serachvalues' @ip="ip" :maptime='model1'/>









    </div>
</template>
<script>
import ArcgisMapsaddress from "@/components/ArcgisMapsaddress";
// import ArcgisMapspmicsmall from "@/components/ArcgisMapspmicsmall";
  export default {
    name: 'address-v',
    components: {
        ArcgisMapsaddress,
        // ArcgisMapspmicsmall
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
                  {title: '项目名称',key: 'projectName',width: 180},
                  {title: '经度',key: 'longitude',width: 90},
                  {title: '纬度',key: 'latitude',width: 90},
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
                  {title: '工单状态',key: 'alertStatus',width:120,
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
                  {title: '详情',key: 'action',width:70,
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
    // beforeDestroy() {
    //     if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
    //         clearInterval(this.timer); //关闭
    //     }
    // },
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
      //   if(localStorage.getItem('breaktime') == '两分钟'){
      //      this.timers(2)
      //   }else if(localStorage.getItem('breaktime') == '五分钟'){
      //      this.timers(5)
      //   }else if(localStorage.getItem('breaktime') == '十分钟'){
      //      this.timers(10)
      //   }else if(localStorage.getItem('breaktime') == '半小时'){
      //     this.timers(30)
      //   }
        
      // }else{
      //   this.model1 = '两分钟'
      //   this.timers(2)
      }
      
    
    },
    methods: {
       showno(){
        this.hadtime = true
        if(localStorage.getItem('breaktime') != this.model1){
        //     localStorage.setItem('breaktime',this.model1);
        //     if(this.model1 == '两分钟'){
        //       this.timers(2)
        //     }else if(this.model1 == '五分钟'){
        //       this.timers(5)
        //     }else if(this.model1 == '十分钟'){
        //       this.timers(10)
        //     }else if(this.model1 == '半小时'){
        //       this.timers(30)
        //     }
        // }else{
        //   localStorage.setItem('breaktime',this.model1);
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
        
      },


   
    
      ip(data){
        
        
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
      top: 60px;
      right: 220px;
      z-index: 20;
      cursor: pointer;
    }
    .iconobjs{
      position: absolute;
      top: 60px;
      right: 0px;
      z-index: 20;
      cursor: pointer;
    }
    .rightdialog {
      width: 220px;
      height: 270px;
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
      margin-bottom: 25px;
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
