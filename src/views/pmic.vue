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
      <div class="statusbox" style="width:60%;top:20%;z-index:2000;height:70%;left:3%;min-width:1180px" v-if="statustable" @click.stop="statustable = true,bigrightshow = false,getwayip=''">
        <p class="detailpage"><img src="../../public/img/xxx.png" @click.stop="closerebigmind" style="float:right;margin-top: 5px"/></p>
              <div style="margin-bottom:20px;margin-top:10px">
                <i-input  v-model="valuetable" placeholder="安装地址、路口名称" style="width: 200px" class="sousuo"></i-input>
                <i-button type="primary" class="sure" @click="serachtable" >搜索</i-button>
              </div>
            <div style="padding:0 20px">
             <i-table border stripe :columns="columns4" :data="data1"></i-table>
              <!-- <Page :total='totals' show-total class="fullpage" @on-change="changeliebiaopage"></Page> -->
            </div>
      </div>

        <ArcgisMapspmic  :propsmap='serachvalues'/>
    </div>
</template>
<script>
import ArcgisMapspmic from "@/components/ArcgisMapspmic";
  export default {
    name: 'pmic',
    components: {
        ArcgisMapspmic
    },
    data () {
      return {
        columns4:[{title: '安装地址',key: 'formId'},
                  {title: 'IP地址',key: 'principals',width: 110},
                  {title: '责任人',key: 'projectName',width: 85},
                  {title: '项目名称',key: 'projectName',width: 180},
                  {title: '经度',key: 'projectName',width: 90},
                  {title: '纬度',key: 'projectName',width: 90},
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
                  {title: '故障发生时间',key: 'time',width: 130},
                  {title: '工单状态',key: 'processStatus',width:120,
                   render:(h,params)=>{
                          // let tmpStr = "";
                          // if(params.row.processStatus=="0"){
                          //   // tmpStr="正常";
                          // }else if(params.row.processStatus=="1"){
                          //   // tmpStr="正常";
                          // }
                          return h('span',{
                              style:{
                                 background: (params.row.processStatus=="正常")?"#EC626B":"#9CD875",
                                 color:'#fff',
                                 padding:'4px 12px',
                                 display:'inline-block',
                              }
                          },params.row.processStatus)
                        }
                  },
                  {title: '详情',key: 'action',width:70,
                    render: (h, params) => {
                      return h('div', [
                          h('div', {
                              on: {
                                  click: () => {
                                    // console.log(params.row.formId)
                                    this.gotodetal(params.row.formId)
                                  }
                              },
                              style:{color:'#1d60fe',cursor:'pointer'}
                          }, '查看详情')
                      ]);
                    }
                  }],
        data1:[{'formId':'武汉市洪山区光谷大道光谷企业天地','processStatus':'正常','projectName':'30.123456','time':'2012/01/01 12:00:00','principals':'192.168.111.110'},
        {'formId':1,'processStatus':'电流不正常'}
        ],
        valuetable:'',
        totalstype:'',
        statustable:false,
        levels: "",
        value:'',
        statuslist:[],
        rightdialogshow:true,
        serachvalue:'',
        serachvalues:'',
        hadtime:true,
        bigrightshow:false,
        model1:'两分钟',
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
    created(){
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
    
    
      // document.getElementsByClassName('detail-box')[0].addEventListener('scroll', this.handleScroll)
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
        this.statustable = true
        this.value = "";
        if (index == 0) {
         
        } else if (index == 1) {
         
        } else if (index == 2) {
          
        } 
      },
    //表格上的搜索
      serachtable(){
        if(this.totalstype == ''){
            // this.$http.get("/workflow/workflow/findFormListCurrent",{interval:this.changetimedata,param:this.valuetable,workType:'运维事件'},res=>{
            //   if(res.data.form){
            //      this.data1 = res.data.form
            //      this.totals = res.data.total
            //   }else{
            //     this.data1 = []
            //     this.totals = 0
            //   }
            // },err=>{});
          }else if(this.totalstype == 'feedback'){
            // this.$http.get("/workflow/workflow/findFormListCurrent",{interval:this.changetimedata,param:this.valuetable,interactive:'feedback',workType:'运维事件'},res=>{
            //   if(res.data.form){
            //      this.data1 = res.data.form
            //      this.totals = res.data.total
            //   }else{
            //     this.data1 = []
            //     this.totals = 0
            //   }
            // },err=>{});
          }else if(this.totalstype == 'detail'){
          // this.$http.get("/workflow/workflow/findFormListCurrent",{interval:this.changetimedata,param:this.valuetable,interactive:'detail',workType:'运维事件'},res=>{
          //  if(res.data.form){
          //      this.data1 = res.data.form
          //      this.totals = res.data.total
          //   }else{
          //     this.data1 = []
          //     this.totals = 0
          //   }
          // },err=>{});
           }
        },
      gotodetal(address){
         console.log(address)
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
      height: 65%;
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
</style>
