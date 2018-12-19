<template>
    <div style="padding-left: 260px;min-width: 1000px;padding-top: 60px" class="divbox">
        <div class="topbox">
           <button   class="zhuanyixukes" style="padding: 5px 20px;">摄像机报表</button>
           <!-- <button   class="zhuanyixuke" style="padding: 5px 20px;">摄像机报表</button>
           <button   class="zhuanyixuke" style="padding: 5px 20px;">摄像机报表</button>
           <button   class="zhuanyixuke" style="padding: 5px 20px;">摄像机报表</button> -->
        </div>
        <div class="mainbox">
          <div class="ploticonbox" v-if="aplotshow">
              <div class="iconbox" @click="checkplot(1)">
                 <div>
                  <img src="../../public/img/126.png" v-if="hadcol != 1"/>
                  <img src="../../public/img/129.png" v-if="hadcol == 1"/>
                 </div>
                 <div style="margin-left: 20px;text-align:left">
                  <p style="font-size:22px;font-weight: bold;" :class="hadcol == 1?'hadcolor':''">20%</p>
                  <p style="font-size:14px" :class="hadcol == 1?'hadcolor':''">在线率</p>
                 </div>
              </div>
              <div class="iconbox" @click="checkplot(2)">
                 <div>
                  <img src="../../public/img/130.png" v-if="hadcol != 2"/>
                  <img src="../../public/img/125.png" v-if="hadcol == 2"/>
                 </div>
                 <div style="margin-left: 20px;text-align:left">
                  <p style="font-size:22px;font-weight: bold;" :class="hadcol == 2?'hadcolor':''">5%</p>
                  <p style="font-size:14px" :class="hadcol == 2?'hadcolor':''">联网率</p>
                 </div>
              </div>
              <div class="iconbox" @click="checkplot(3)">
                 <div>
                  <img src="../../public/img/1301.png" v-if="hadcol != 3"/>
                  <img src="../../public/img/128.png" v-if="hadcol == 3"/>
                 </div>
                 <div style="margin-left: 20px;text-align:left">
                  <p style="font-size:22px;font-weight: bold;" :class="hadcol == 3?'hadcolor':''">20%</p>
                  <p style="font-size:14px" :class="hadcol == 3?'hadcolor':''">一机一档合格率</p>
                 </div>
              </div>
          </div>

          <div class="aplotbox">
              <div class="exj4" @click="plot" style="color:#1D60FE" v-if="aplotshow">
                    <img src="../../public/img/133.png"/>
                    图表模式
                </div>
                <div class="exj4" v-if="!aplotshow" @click="plot">
                    <img src="../../public/img/132.png"/>
                    图表模式
                </div>
                <div class="exj4" @click="liebiao" v-if="aplotshow">
                    <img src="../../public/img/131.png"/>
                    表格模式
                </div>
                <div class="exj4" style="color:#1D60FE" v-if="!aplotshow">
                    <img src="../../public/img/127.png"/>
                    表格模式
                </div>
          </div>
          
          <div class="exjlist" v-if="aplotshow">
              <div class="exj2" >
                    <img src="../../public/img/1242.png"/>
                    导出
                </div>
              <div class="exj1" v-if="hadcol == 2" @click="tasknum">
                    <img src="../../public/img/124.png"/>
                    各区域任务数分配
                </div>
          </div>

          <div class="exjlists" v-if="!aplotshow">
              <div class="exj2" >
                    <img src="../../public/img/1242.png"/>
                    导出
                </div>
              <div class="exj1" @click="tasknum">
                    <img src="../../public/img/124.png"/>
                    各区域任务数分配
                </div>
          </div>
         <div :class="aplotshow?'checkcom':'checkcoms'">
             <Select v-model="model10" multiple  placeholder="请选择责任单位"  @on-open-change="changecom" @on-change="channgecomlist">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
         </div>
          <div class="plotbox" v-if="aplotshow">
            <div id="camera"></div>
          </div>

          <div class="tablebox" v-if="!aplotshow">
           <!-- <Table :columns="columns11" :data="data10" border :height="hxnum"></Table> -->
           <Table :columns="columns11" :data="data10" border stripe></Table>
           <img src="../../public/img/134.png" class="theadimg"/>
          </div>
        </div>

        <Modal v-model="modal2" width="360" id="cameraaddnum">
            <p slot="header" style="color:#85A2FE;text-align:center">
                <span>填写说明：请填写各区域需接入的摄像机数量</span>
            </p>
            <div class="mainaddnum">
                <p><span>洪山区</span><InputNumber  :min="0" v-model="valuetable" style="width: 180px"></InputNumber></p>
                <!-- <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p>
                <p><span>洪山区</span><i-input v-model="valuetable"  style="width: 180px" ></i-input></p> -->
            </div>
            <div slot="footer" style="text-align:center">
                <button   class="zhuanyixukes" >确认配置</button>
            </div>
        </Modal>

        <div class="statusbox"  v-if="statustable" >
             <p class="detailpage">{{statustabletitle}}<img src="../../public/img/xxx.png" @click="statustable = false" style="position:absolute;right:20px;z-index: 2;top:20px"/></p>
             <div style="padding:20px" >
              <i-table border stripe :columns="columns4" :data="data2"></i-table>
             </div>
        </div>
        <div class="statusbox"  v-if="onegear" >
             <p class="detailpage">一机一档统计明细<img src="../../public/img/xxx.png" @click="onegear = false" style="position:absolute;right:20px;z-index: 2;top:20px"/></p>
             <div style="margin-top:20px;">
                 <span>检索条件：</span>
                 <RadioGroup v-model="term" @on-change="changeterm">
                    <Radio label="all">
                        <span>全部</span>
                    </Radio>
                    <Radio label="good">
                        <span>合格</span>
                    </Radio>
                    <Radio label="nogood">
                        <span>不合格</span>
                    </Radio>
                </RadioGroup>
             </div>
             <div style="padding:20px" >
              <i-table border stripe :columns="columns4" :data="data2"></i-table>
             </div>
        </div>
    </div>
</template>
<script>
// import ArcgisMaplog from "@/components/ArcgisMaplog";
  export default {
    name: 'analysis',
    components: {
        // ArcgisMaplog
    },
    data () {
      return {
          term:'all',
          statustable:false,
          valuetable:0,
          modal2:false,
            cityList: [
                {
                    value: '111',
                    label: 'New York'
                },
                {
                    value: '222',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
          model10: [],      
          hxnum:'',
          comchanges:0,
          hadcol:1,
          aplotshow:true,
          data1:['总数','在线数','在线率'],
          cameradata:[],
          columns4:[{title: '设备编码',key: 'installAddress',width: 160},
                  {title: '设备名称',key: 'electricIp',width: 110},
                  {title: '设备厂商',key: 'userName',width: 140},
                  {title: '行政区域',key: 'longitude',width: 100},
                  {title: '监控点位类型',key: 'latitude',width: 140},
                  {title: '安装地址',key: 'poleNo',width: 200},
                  {title: '经度',key: 'action',width:105,},
                  {title: '纬度',key: 'poleNo',width: 105},
                  {title: '摄像机位置类型',key: 'poleNo',width: 150},
                  {title: '监视方位',key: 'poleNo',width: 110},
                  {title: '安装时间',key: 'poleNo',width: 110},
                  {title: 'MAC地址',key: 'poleNo',width: 120},
                  {title: 'IPV4地址',key: 'poleNo',width: 120},
                  {title: '设备型号',key: 'poleNo',width: 110},
                  {title: '点位俗称',key: 'poleNo',width: 110},
                  {title: 'IPV6地址',key: 'poleNo',width: 120},
                  {title: '摄像机类型',key: 'poleNo',width: 110},
                  {title: '摄像机功能类型',key: 'poleNo',width: 150},
                  {title: '补光属性',key: 'poleNo',width: 110},
                  {title: '摄像机编码格式',key: 'poleNo',width: 150},
                  {title: '联网属性',key: 'poleNo',width: 110},
                  {title: '所属辖区公安机关',key: 'poleNo',width: 180},
                  {title: '管理单位',key: 'poleNo',width: 110},
                  {title: '管理单位联系方式',key: 'poleNo',width: 180},
                  {title: '录像保存天数',key: 'poleNo',width: 140},
                  {title: '设备状态',key: 'poleNo',width: 110},
                  {title: '所属部门/行业',key: 'poleNo',width: 150},
                  {
                        title: '操作',
                        key: 'name',
                        align: 'center',
                        width: 110,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    on: {
                                        click: () => {
                                        this.handleRowChange(params.row)
                                        }
                                    },
                                    style:{color:'#1d60fe',cursor:'pointer'}
                                }, '查看详情')
                            ]);
                        }
                    }
                  ],
          data2:[{'installAddress':'12345678987654321','userName':'山东黄金点击返回','action':'124.123456'}],
          columns11: [
                    {
                        title: '区域',
                        key: 'areaName',
                        align: 'center',
                        width: 149,
                        fixed: 'left',
                    },
                    {
                        title: '在线率',
                        align: 'center',
                        children: [
                            {
                                title: '总数',
                                key: 'taskNum',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                            on: {
                                                click: () => {
                                                    // console.log(params.row.formId)
                                                    this.gotoStatisticaldetal(params.row.areaName,1)
                                                }
                                            },
                                            style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                        }, params.row.taskNum)
                                    ]);
                                    }
                            },
                            {
                                title: '在线数',
                                key: 'onlineNum',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                            on: {
                                                click: () => {
                                                    // console.log(params.row.formId)
                                                    this.gotoStatisticaldetal(params.row.areaName,1)
                                                }
                                            },
                                            style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                        }, params.row.onlineNum)
                                    ]);
                                    }
                            },
                            {
                                title: '在线率',
                                key: 'onlineRate',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                        }, params.row.onlineRate+'%')
                                    ]);
                                    }
                            }
                        ]
                    },
                    {
                        title: '联网率',
                        align: 'center',
                        children: [
                            {
                                title: '接入任务数',
                                key: 'taskNum',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                            on: {
                                                click: () => {
                                                    // console.log(params.row.formId)
                                                    this.gotoStatisticaldetal(params.row.areaName,2)
                                                }
                                            },
                                            style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                        }, params.row.taskNum)
                                    ]);
                                    }
                            },
                            {
                                title: '联网数',
                                key: 'accessNum',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                            on: {
                                                click: () => {
                                                    // console.log(params.row.formId)
                                                    this.gotoStatisticaldetal(params.row.areaName,2)
                                                }
                                            },
                                            style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                        }, params.row.accessNum)
                                    ]);
                                    }
                            },
                            {
                                title: '联网率',
                                key: 'accessRate',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('div', {
                                        }, params.row.accessRate+'%')
                                    ]);
                                    }
                            }
                        ]
                    },
                    {
                        title: '一机一档合格率',
                        align: 'center',
                        children: [
                            {
                                title: '总数',
                                key: 'taskNum',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                            on: {
                                                click: () => {
                                                    // console.log(params.row.formId)
                                                    this.gotoStatisticaldetal(params.row.areaName,3)
                                                }
                                            },
                                            style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                        }, params.row.taskNum)
                                    ]);
                                    }
                            },
                            {
                                title: '合格数',
                                key: 'archGoodNum',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                            on: {
                                                click: () => {
                                                    // console.log(params.row.formId)
                                                    this.gotoStatisticaldetal(params.row.areaName,3)
                                                }
                                            },
                                            style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                        }, params.row.archGoodNum)
                                    ]);
                                    }
                            },
                            {
                                title: '合格率',
                                key: 'archGoodRate',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('div', {
                                            style:{color:'#515a6e',cursor:'default'}
                                        }, params.row.archGoodRate+'%')
                                    ]);
                                    }
                            }
                        ]
                    }
                ],
                data10: [],
                statustabletitle:'',
                onegear:false,

      }
    },
    created(){
    },
    mounted(){
        var h = document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(h)
      this.hxnum = (h-250)
      document.getElementsByClassName("divbox")[0].style.height = (h-20)+'px'
      this.$http.get("res/screenDisplay/cameraOverview",{},res=>{
              //底部摄像机在线状态
              this.echartscamera(res.data,this.data1)
              this.cameradata = res.data
            },err=>{});
    },
    methods: {
       checkplot(index){
           this.hadcol = index
           if(index == 1){
               this.data1 = ['总数','在线数','在线率']
               this.echartscamera(this.cameradata,this.data1)
           }else if(index == 2){
               this.data1 = ['接入任务数','已联网数','联网率']
               this.echartscamera(this.cameradata,this.data1)
           }else if(index == 3){
               this.data1 = ['总数','合格数','合格率']
               this.echartscamera(this.cameradata,this.data1)
           }
       },
       changecom(val){
         if(val == false){
            this.comchanges = 1
            console.log(this.model10)
         }else if(val == true){
            this.comchanges = 0
         }
       },
       channgecomlist(val){
          console.log(val)
       },
    //    任务数分配
       tasknum(){
          this.modal2 = true
          this.valuetable = 2
       },
       plot(){
         this.aplotshow = true
         setTimeout(() => {
              this.echartscamera(this.cameradata,this.data1)
           }, 100);
         
       },
    //    列表模式
       liebiao(){
         this.$http.get("report/report/findReport",{},res=>{
                this.data10 = res.data
                this.aplotshow = false
            },err=>{});
         
       },
       changeterm(val){
         console.log(val)
       },
       gotoStatisticaldetal(name,index){
          console.log(name)
          if(index == 1){
             this.statustable = true
             this.onegear = false
             this.statustabletitle = '在线统计明细'
          }else if(index == 2){
             this.statustable = true
             this.onegear = false
             this.statustabletitle = '联网统计明细'
          }else{
             this.onegear = true
             this.statustable = false
             this.term = 'all'
          }
       },
       echartscamera(data,title){
           var that = this
           var myChart = null;
        	var div_ = document.getElementById("camera");
        	div_.removeAttribute("_echarts_instance_");
        	myChart = this.$echarts.init(div_);
        // let myChart = this.$echarts.init(document.getElementById('camera'))
        window.addEventListener("resize", function () {
          myChart.resize();
        });
        myChart.setOption({
          // "backgroundColor": "#1c2e40",
          // "color": "#384757",
          "tooltip": {
            "trigger": "axis",
            "axisPointer": {
              "type": "cross",
              "crossStyle": {
                "color": "#384757"
              }
            }
          },
          "legend": {
            "data": [
              {
                "name": title[0],
                "icon": "circle",
                "textStyle": {
                  "color": "#7d838b"
                }
              },
              {
                "name": title[1],
                "icon": "circle",
                "textStyle": {
                  "color": "#7d838b"
                }
              },
              {
                "name": title[2],
                "icon": "circle",
                "textStyle": {
                  "color": "#7d838b"
                }
              }
            ],
            "top": "70",
            "textStyle": {
              "color": "#fff"
            }
          },
          "xAxis": [
            {
              "type": "category",
              "data": data.area,
              "axisPointer": {
                "type": "shadow"
              },
              "axisLabel": {
                "show": true,
                "textStyle": {
                  "color": "#696C6F"
                }
              }
            }
          ],
          "yAxis": [
            {
              "type": "value",
              "nameTextStyle": {
                "color": "#7d838b"
              },
              "min": 0,
              "max": data.max,
              "interval": data.interval,
              "axisLabel": {
                "show": true,
                "textStyle": {
                  "color": "#696C6F"
                }
              },
              "axisLine": {
                "show": true
              },
              "splitLine": {
                "show": false
                // "lineStyle": {
                //   "color": "#7d838b"
                // }
              }
            },
            {
              "type": "value",
              // "name": "完成率",
              "min": 0,
              "max": 100,
              "show": false,
              "axisLabel": {
                "show": false,
                "textStyle": {
                  "color": "#D4FFF9",
                },
                "formatter": '{value} %'
              }
            }
          ],
          "grid": {
            // "top": "20%"
              x:70,
              y:150,
              x2:50,
              y2:50,
          },
          "series": [
            {
              "name": title[0],
              "type": "bar",
              "data": data.all,
              "barWidth": "auto",
              "itemStyle": {
                "normal": {
                    "label": {
                              "show": true,
                              "textStyle": {
                                  "color": "#00F9FF"
                              },
                              "position": "top",
                          },
                  "color": {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 0,
                    "y2": 1,
                    "colorStops": [
                      {
                        "offset": 0,
                        "color": "rgba(105,147,255,1)"
                      },
                      {
                        "offset": 0.5,
                        "color": "rgba(105,147,255,1)"
                      },
                      {
                        "offset": 1,
                        "color": "rgba(105,147,255,1)"
                      }
                    ],
                    "globalCoord": false
                  }
                }
              }
            },
            {
              "name": title[1],
              "type": "bar",
              "data":data.online,
              "barWidth": "auto",
              "itemStyle": {
                "normal": {
                  "color": {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 0,
                    "y2": 1,
                    "colorStops": [
                      {
                        "offset": 0,
                        "color": "rgba(105,255,253,1)"
                      },
                      {
                        "offset": 0.5,
                        "color": "rgba(105,255,253,1)"
                      },
                      {
                        "offset": 1,
                        "color": "rgba(105,255,253,1)"
                      }
                    ],
                    "globalCoord": false
                  },
                  "label": {
                              "show": true,
                              "textStyle": {
                                  "color": "#00FF3B"
                              },
                              "position": "top",
                          }
                },
                
              },
              "barGap": "0"
            },
            {
              "name": title[2],
              "type": "line",
              "yAxisIndex": 1,
              "data":data.proportion,
              "itemStyle": {
                "normal": {
                  "color": "#E531A8",
                  "label": {
                              "show": true,
                              "textStyle": {
                                  "color": "#E531A8"
                              },
                              "position": "top",
                              "formatter": function(p) {
                                  return p.value+'%';
                              }
                          }
                }
              },
              "smooth": true
            }
          ]
              })
              myChart.on('click', function(param) {
                    console.log(param.name);
                    console.log(that.hadcol)
        })
         
      }
    }
  }
</script>
<style scoped>
   .topbox{
       display: flex;
       text-align: left;
       padding: 10px;
   }
   .mainbox{
       height: calc(100% - 50px);
       background: #F8F9FA;
       margin-right: 20px;
       box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
       margin-top: 5px;
       position: relative;
   }
   .ploticonbox{
        display: flex;
        width: 60%;
        position: absolute;
        left: 0;
        margin: 0 auto;
        right: 0;
        margin-top: 20px;
   }
   .iconbox{
        background: #fff;
        display: flex;
        width: 33.3%;
        padding: 20px 0 20px 20px;
        border-left: 1px solid #E6E6E6;
        cursor: pointer;
   }
   .iconbox:first-child{
       border-left: none;
   }
   .hadcolor{
       color: #1D60FE;
   }
   .aplotbox{
       display: flex;
       position: absolute;
       right: 0;
       top: 20px;
   }
   .exj4{
        display: flex;
        align-items: center;
        margin-right: 20px;
        color: #717578;
        cursor:pointer;
    }
    .exj4 img{
        margin-right: 5px;
    }
    .exjlist{
        position: absolute;
        right: 0;
        top:150px;
        display: flex;
    }
    .exjlists{
        position: absolute;
        right: 0;
        top:60px;
        display: flex;
    }
    .exjlist div img{
        margin-right: 5px;
    }
    .exjlists div img{
        margin-right: 5px;
    }
    .exj1{
        border: 1px solid #1D60FE;
        color: #1D60FE;
        border-radius: 4px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        height: 25px;
        margin-right: 20px;
        cursor:pointer;
        z-index:3;
    }
    .exj2{
        border: 1px solid #26BDD2;
        color: #26BDD2;
        border-radius: 4px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        height: 25px;
        margin-right: 20px;
        cursor:pointer;
        z-index:3;
    }
    /* 图表 */
    .plotbox{
        width: 100%;
        height: calc(100% - 130px);
        position: absolute;
        top: 130px;
    }
    #camera{
        width: 100%;
        height: 100%;
        z-index:2;
    }
    /* 列表 */
    .tablebox{
        width: 100%;
        height: calc(100% - 110px);
        position: absolute;
        top: 100px; 
        padding: 0 20px;
        z-index: 2;
        /* background: red; */
    }
    .theadimg{
        position: absolute;
        top: 1px;
        left: 21px;
        height: 79px;
        width: 148px;
    }
    .checkcom{
        position: absolute;
        top:150px;
        left: 20px;
        z-index:3;
    }
    .checkcoms{
        position: absolute;
        top:50px;
        left: 20px;
        z-index:3;
    }
    .ivu-select-dropdown-list{
        z-index: 3;
    }
    .mainaddnum{
        text-align: left;
        padding: 0 0 0 30px;
    }
     .mainaddnum p{
         margin-bottom: 10px;
     }
    .mainaddnum p span{
        display: inline-block;
        margin-right: 10px;
    }
    /* 明细列表 */
    .statusbox {
      width: 1350px;
      background: #fff;
      position: absolute;
      top: 15%;
      left: 0%;
      right: 0%;
      margin: 0 auto;
      box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.4);
      z-index: 30;
      padding-bottom:20px;
      min-height:70%
    }
    .detailpage{
      margin: 0px 20px;
      font-size:16px;
      text-align: left;
      padding: 10px 0;
      border-bottom:1px solid #C3C3C3
    }
</style>
