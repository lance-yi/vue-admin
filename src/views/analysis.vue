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
                  <p style="font-size:22px;font-weight: bold;" :class="hadcol == 1?'hadcolor':''">{{find3Ratedata.accessRate}}%</p>
                  <p style="font-size:14px" :class="hadcol == 1?'hadcolor':''">在线率</p>
                 </div>
              </div>
              <div class="iconbox" @click="checkplot(2)">
                 <div>
                  <img src="../../public/img/130.png" v-if="hadcol != 2"/>
                  <img src="../../public/img/125.png" v-if="hadcol == 2"/>
                 </div>
                 <div style="margin-left: 20px;text-align:left">
                  <p style="font-size:22px;font-weight: bold;" :class="hadcol == 2?'hadcolor':''">{{find3Ratedata.onlineRate}}%</p>
                  <p style="font-size:14px" :class="hadcol == 2?'hadcolor':''">联网率</p>
                 </div>
              </div>
              <div class="iconbox" @click="checkplot(3)">
                 <div>
                  <img src="../../public/img/1301.png" v-if="hadcol != 3"/>
                  <img src="../../public/img/128.png" v-if="hadcol == 3"/>
                 </div>
                 <div style="margin-left: 20px;text-align:left">
                  <p style="font-size:22px;font-weight: bold;" :class="hadcol == 3?'hadcolor':''">{{find3Ratedata.archGoodRate}}%</p>
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
              <div class="exj2" @click="educetable">
                    <img src="../../public/img/1242.png"/>
                    导出
                </div>
              <div class="exj1" v-if="hadcol == 2" @click="tasknum">
                    <img src="../../public/img/124.png"/>
                    各区域任务数分配
                </div>
          </div>

          <div class="exjlists" v-if="!aplotshow">
              <div class="exj2" @click="educetable">
                    <img src="../../public/img/1242.png" />
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
                <p v-for="(list,index) in taskdata" :key="index"><span style="width:50px">{{list.areaName}}</span><InputNumber  :min="0" v-model="list.num" style="width: 180px" :precision="0"></InputNumber></p>
            </div>
            <div slot="footer" style="text-align:center">
                <button   class="zhuanyixukes" @click="allowdeploy">确认配置</button>
            </div>
        </Modal>



        <Modal v-model="modalmain" width="800" id="cameraaddnum">
            <p slot="header" style="text-align:left;color:#696C6F">
                <span>详情</span>
            </p>
            <div class="mainaddnum">
              <div><span>设备编码：{{maindata.nationnalId}}</span><span>设备名称：{{maindata.cameraName}}</span></div>
              <div><span>设备厂商：{{maindata.manufacturer}}</span><span>行政区域：{{maindata.areaName}}</span></div>
              <div ><span>监控点位类型：{{maindata.pointType}}</span><div style="display:inline-block;word-wrap: break-word;word-break: normal;width:388px">安装地址：{{maindata.installAddress}}</div></div>
              <div><span>经度：{{maindata.longitude}}</span><span>纬度：{{maindata.latitude}}</span></div>
              <div><span>摄像机位置类型：{{maindata.cameraPositionType}}</span><span>监视方位：{{maindata.cameraPosition}}</span></div>
              <div><span>安装时间：{{maindata.installTime}}</span><span>MAC地址：{{maindata.mac}}</span></div>
              <div><span>IPV4地址：{{maindata.ipAddress}}</span><span>IPV6地址：{{maindata.ipv6Address}}</span></div>
              <div><span>设备型号：{{maindata.model}}</span><span>点位俗称：{{maindata.pointName}}</span></div>
              <div><span>摄像机类型：{{maindata.cameraType}}</span><span>摄像机功能类型：{{maindata.cameraFunctionType}}</span></div>
              <div><span>补光属性：{{maindata.lightingType}}</span><span>摄像机编码格式：{{maindata.cameraCode}}</span></div>
              <div><span>联网属性：{{maindata.network_properties}}</span><span>所属辖区公安机关：{{maindata.deptId}}</span></div>
              <div><span>管理单位：{{maindata.managementUnit}}</span><span>管理单位联系方式：{{maindata.managementPhone}}</span></div>
              <div><span>录像保存天数：{{maindata.videoSaveDays}}</span><span>设备状态：{{maindata.deviceStatus}}</span></div>
              <div><span>所属部门/行业：{{maindata.industry}}</span><span v-if="maindata.isReport == 0" >是否上报：否</span><span v-if="maindata.isReport == 1" >是否上报：是</span></div>
            </div>
            <div slot="footer" style="text-align:center">
                <button   class="zhuanyixukes" @click="modalmain = false" style="padding: 5px 20px;">确认</button>
            </div>
        </Modal>


         <Modal v-model="modalmains" width="840" id="cameraaddnum">
            <p slot="header" style="text-align:left;color:#696C6F">
                <span>详情</span>
            </p>
            <div class="mainaddnum" v-if="modalmains">
              <div><span>设备编码：<em :class="maindata.nationnalId.state == 0?'errotext':''">{{maindata.nationnalId.value}}</em></span><span>设备名称：<em :class="maindata.cameraName.state == 0?'errotext':''">{{maindata.cameraName.value}}</em></span></div>
              <div><span>设备厂商：<em :class="maindata.manufacturer.state == 0?'errotext':''">{{maindata.manufacturer.value}}</em></span><span>行政区域：<em :class="maindata.areaName.state == 0?'errotext':''">{{maindata.areaName.value}}</em></span></div>
              <div ><span>监控点位类型：<em :class="maindata.pointType.state == 0?'errotext':''">{{maindata.pointType.value}}</em></span><div style="display:inline-block;word-wrap: break-word;word-break: normal;width:388px">安装地址：<em :class="maindata.installAddress.state == 0?'errotext':''">{{maindata.installAddress.value}}</em></div></div>
              <div><span>经度：<em :class="maindata.longitude.state == 0?'errotext':''">{{maindata.longitude.value}}</em></span><span>纬度：<em :class="maindata.latitude.state == 0?'errotext':''">{{maindata.latitude.value}}</em></span></div>
              <div><span>摄像机位置类型：<em :class="maindata.cameraPositionType.state == 0?'errotext':''">{{maindata.cameraPositionType.value}}</em></span><span>监视方位：<em :class="maindata.cameraPosition.state == 0?'errotext':''">{{maindata.cameraPosition.value}}</em></span></div>
              <div><span>安装时间：<em :class="maindata.installTime.state == 0?'errotext':''">{{maindata.installTime.value}}</em></span><span>MAC地址：<em :class="maindata.mac.state == 0?'errotext':''">{{maindata.mac.value}}</em></span></div>
              <div><span>IPV4地址：<em :class="maindata.ipAddress.state == 0?'errotext':''">{{maindata.ipAddress.value}}</em></span><span>IPV6地址：<em :class="maindata.ipv6Address.state == 0?'errotext':''">{{maindata.ipv6Address.value}}</em></span></div>
              <div><span>设备型号：<em :class="maindata.model.state == 0?'errotext':''">{{maindata.model.value}}</em></span><span>点位俗称：<em :class="maindata.pointName.state == 0?'errotext':''">{{maindata.pointName.value}}</em></span></div>
              <div><span>摄像机类型：<em :class="maindata.cameraType.state == 0?'errotext':''">{{maindata.cameraType.value}}</em></span><span>摄像机功能类型：<em :class="maindata.cameraFunctionType.state == 0?'errotext':''">{{maindata.cameraFunctionType.value}}</em></span></div>
              <div><span>补光属性：<em :class="maindata.lightingType.state == 0?'errotext':''">{{maindata.lightingType.value}}</em></span><span>摄像机编码格式：<em :class="maindata.cameraCode.state == 0?'errotext':''">{{maindata.cameraCode.value}}</em></span></div>
              <div><span>联网属性：<em :class="maindata.network_properties.state == 0?'errotext':''">{{maindata.network_properties.value}}</em></span><span>所属辖区公安机关：<em :class="maindata.deptId.state == 0?'errotext':''">{{maindata.deptId.value}}</em></span></div>
              <div><span>管理单位：<em :class="maindata.managementUnit.state == 0?'errotext':''">{{maindata.managementUnit.value}}</em></span><span>管理单位联系方式：<em :class="maindata.managementPhone.state == 0?'errotext':''">{{maindata.managementPhone.value}}</em></span></div>
              <div><span>录像保存天数：<em :class="maindata.videoSaveDays.state == 0?'errotext':''">{{maindata.videoSaveDays.value}}</em></span><span>设备状态：<em :class="maindata.deviceStatus.state == 0?'errotext':''">{{maindata.deviceStatus.value}}</em></span></div>
              <div><span>所属部门/行业：<em :class="maindata.industry.state == 0?'errotext':''">{{maindata.industry.value}}</em></span><span v-if="maindata.isQualified.value == 'true'" >是否合格：合格</span><span v-if="maindata.isQualified.value == 'false'" >是否合格：<em class="errotext">不合格</em></span></div>
            </div>
            <div slot="footer" style="text-align:center">
                <button   class="zhuanyixukes" @click="modalmains = false" style="padding: 5px 20px;">确认</button>
            </div>
        </Modal>

        <div class="statusbox"  v-if="statustable" >
             <p class="detailpage">{{statustabletitle}}<img src="../../public/img/xxx.png" @click="statustable = false" style="position:absolute;right:20px;z-index: 2;top:20px"/></p>
             <div style="margin-top:20px;" v-if="statustabletitle == '在线率统计明细'">
                 <span>检索条件：</span>
                 <RadioGroup v-model="allnum" @on-change="changeallnum">
                    <Radio label="all">
                        <span>总数</span>
                    </Radio>
                    <Radio label="online">
                        <span>在线数</span>
                    </Radio>
                    <Radio label="unline">
                        <span>离线数</span>
                    </Radio>
                </RadioGroup>
             </div>
             <div style="padding:20px" >
              <i-table border stripe :columns="columns4" :data="data2" class="longtable"></i-table>
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
              <i-table border stripe :columns="columns5" :data="data2" class="longtable"></i-table>
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
          allnum:'',
          modalmain:false,
          term:'all',
          statustable:false,
          valuetable:0,
          modal2:false,
          cityList: [],
          model10: [],      
          hxnum:'',
          comchanges:0,
          hadcol:1,
          aplotshow:true,
          data1:['总数','在线数','在线率'],
          cameradata:[],
          columns4:[{title: '设备编码',key: 'nationnalId',width: 180,align: 'center'},
                  {title: '设备名称',key: 'cameraName',width: 110,align: 'center'},
                  {title: '设备厂商',key: 'manufacturer',width: 140,align: 'center'},
                  {title: '行政区域',key: 'areaName',width: 100,align: 'center'},
                  {title: '监控点位类型',key: 'pointType',width: 140,align: 'center',},
                  {title: '安装地址',key: 'installAddress',width: 200,align: 'center',},
                  {title: '经度',key: 'longitude',width:105,align: 'center',},
                  {title: '纬度',key: 'latitude',width: 105,align: 'center',},
                  {title: '摄像机位置类型',key: 'cameraPositionType',width: 150,align: 'center',},
                  {title: '监视方位',key: 'cameraPosition',width: 110,align: 'center',},
                  {title: '安装时间',key: 'installTime',width: 160,align: 'center',},
                  {title: 'MAC地址',key: 'mac',width: 140,align: 'center',},
                  {title: 'IPV4地址',key: 'ipAddress',width: 120,align: 'center',},
                  {title: '设备型号',key: 'model',width: 110,align: 'center',},
                  {title: '点位俗称',key: 'pointName',width: 110,align: 'center',},
                  {title: 'IPV6地址',key: 'ipv6Address',width: 220,align: 'center',},
                  {title: '摄像机类型',key: 'cameraType',width: 110,align: 'center',},
                  {title: '摄像机功能类型',key: 'cameraFunctionType',width: 150,align: 'center',},
                  {title: '补光属性',key: 'lightingType',width: 110,align: 'center',},
                  {title: '摄像机编码格式',key: 'cameraCode',width: 150,align: 'center',},
                  {title: '联网属性',key: 'network_properties',width: 110,align: 'center',},
                  {title: '所属辖区公安机关',key: 'deptId',width: 180,align: 'center',},
                  {title: '管理单位',key: 'managementUnit',width: 110,align: 'center',},
                  {title: '管理单位联系方式',key: 'managementPhone',width: 180,align: 'center',},
                  {title: '录像保存天数',key: 'videoSaveDays',width: 140,align: 'center',},
                  {title: '设备状态',key: 'deviceStatus',width: 110,align: 'center',},
                  {title: '所属部门/行业',key: 'industry',width: 150,align: 'center',},
                  {title: '是否上报',key: 'isReport',width: 100,align: 'center',
                    render:(h,params)=>{
                          let tmpStr = "";
                          if(params.row.isReport=="0"){
                            tmpStr="否";
                          }else{
                            tmpStr="是"
                          }
                          return h('span',{
                              style:{
                                 background: (params.row.isReport=="0")?"#EC626B":"#9CD875",
                                 color:'#fff',
                                 padding:'4px 12px',
                                 display:'inline-block',
                              }
                          },tmpStr)
                        }
                  },
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
          columns5:[{title: '设备编码',key: 'nationnalId',width: 180,align: 'center',
                    render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.nationnalId.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.nationnalId.value)
                        }
                  },
                  {title: '设备名称',key: 'cameraName',width: 110,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.cameraName.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.cameraName.value)
                        }
                  },
                  {title: '设备厂商',key: 'manufacturer',width: 140,align: 'center',
                    render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.manufacturer.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.manufacturer.value)
                        }
                  },
                  {title: '行政区域',key: 'areaName',width: 100,align: 'center',
                    render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.areaName.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.areaName.value)
                        }
                  },
                  {title: '监控点位类型',key: 'pointType',width: 140,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.pointType.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.pointType.value)
                        }
                  },
                  {title: '安装地址',key: 'installAddress',width: 200,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.installAddress.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.installAddress.value)
                        }
                  },
                  {title: '经度',key: 'longitude',width:105,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.longitude.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.longitude.value)
                        }
                  },
                  {title: '纬度',key: 'latitude',width: 105,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.latitude.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.latitude.value)
                        }
                  },
                  {title: '合格不合格',key: 'isQualified',width: 120,align: 'center',
                   render:(h,params)=>{
                       let tmpStr = "";
                          if(params.row.isQualified == true){
                            tmpStr="合格"
                          }else{
                            tmpStr="不合格"
                          }
                          return h('span',{
                              style:{
                                 color:(params.row.isQualified == false)?"#EC626B":"#515a6e",
                              }
                          },tmpStr)
                        }
                  },
                  {title: '摄像机位置类型',key: 'cameraPositionType',width: 150,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.cameraPositionType.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.cameraPositionType.value)
                        }
                  },
                  {title: '监视方位',key: 'cameraPosition',width: 110,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.cameraPosition.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.cameraPosition.value)
                        }
                  },
                  {title: '安装时间',key: 'installTime',width: 160,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.installTime.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.installTime.value)
                        }
                  },
                  {title: 'MAC地址',key: 'mac',width: 140,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.mac.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.mac.value)
                        }
                  },
                  {title: 'IPV4地址',key: 'ipAddress',width: 120,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.ipAddress.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.ipAddress.value)
                        }
                  },
                  {title: '设备型号',key: 'model',width: 110,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.model.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.model.value)
                        }
                  },
                  {title: '点位俗称',key: 'pointName',width: 110,align: 'center',
                    render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.pointName.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.pointName.value)
                        }
                  },
                  {title: 'IPV6地址',key: 'ipv6Address',width: 220,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.ipv6Address.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.ipv6Address.value)
                        }
                  },
                  {title: '摄像机类型',key: 'cameraType',width: 110,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.cameraType.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.cameraType.value)
                        }
                  },
                  {title: '摄像机功能类型',key: 'cameraFunctionType',width: 150,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.cameraFunctionType.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.cameraFunctionType.value)
                        }
                  },
                  {title: '补光属性',key: 'lightingType',width: 110,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.lightingType.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.lightingType.value)
                        }
                  },
                  {title: '摄像机编码格式',key: 'cameraCode',width: 150,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.cameraCode.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.cameraCode.value)
                        }
                  },
                  {title: '联网属性',key: 'network_properties',width: 110,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.network_properties.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.network_properties.value)
                        }
                  },
                  {title: '所属辖区公安机关',key: 'deptId',width: 180,align: 'center',
                    render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.deptId.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.deptId.value)
                        }
                  },
                  {title: '管理单位',key: 'managementUnit',width: 110,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.managementUnit.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.managementUnit.value)
                        }
                  },
                  {title: '管理单位联系方式',key: 'managementPhone',width: 180,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.managementPhone.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.managementPhone.value)
                        }
                  },
                  {title: '录像保存天数',key: 'videoSaveDays',width: 140,align: 'center',
                    render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.videoSaveDays.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.videoSaveDays.value)
                        }
                  },
                  {title: '设备状态',key: 'deviceStatus',width: 110,align: 'center',
                    render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.deviceStatus.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.deviceStatus.value)
                        }
                  },
                  {title: '所属部门/行业',key: 'industry',width: 150,align: 'center',
                   render:(h,params)=>{
                          return h('span',{
                              style:{
                                 color:(params.row.industry.state=="0")?"#EC626B":"#515a6e",
                              }
                          },params.row.industry.value)
                        }
                  },
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
                                        this.handleone(params.row)
                                        }
                                    },
                                    style:{color:'#1d60fe',cursor:'pointer'}
                                }, '查看详情')
                            ]);
                        }
                    }
                  ],
          data2:[],
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
                                key: 'accessNum',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                            on: {
                                                click: () => {
                                                    // console.log(params.row.formId)
                                                    this.gotoStatisticaldetal(params.row.areaCode,1)
                                                }
                                            },
                                            style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                        }, params.row.accessNum)
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
                                                    this.gotoonlinenum(params.row.areaCode,1)
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
                                // render: (h, params) => {
                                //     return h('div', [
                                //         h('span', {
                                //             on: {
                                //                 click: () => {
                                //                     // console.log(params.row.formId)
                                //                     this.gotoStatisticaldetal(params.row.areaCode,2)
                                //                 }
                                //             },
                                //             style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                //         }, params.row.taskNum)
                                //     ]);
                                //     }
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
                                                    this.gotoStatisticaldetal(params.row.areaCode,2)
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
                                key: 'accessNum',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                            on: {
                                                click: () => {
                                                    // console.log(params.row.formId)
                                                    this.gotoStatisticaldetal(params.row.areaCode,3)
                                                }
                                            },
                                            style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                        }, params.row.accessNum)
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
                                                    this.gotogoodnum(params.row.areaCode,3)
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
                modalmains:false,
                maindata:[],
                areacode:'',
                comlistdata:[],
                taskdata:[],
                find3Ratedata:[],
      }
    },
    created(){
    },
    mounted(){
        var h = document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(h)
      this.hxnum = (h-250)
      document.getElementsByClassName("divbox")[0].style.height = (h-20)+'px'
      this.online()
      this.$http.get("/report/report/selectManagementUnit?",{dictCodes:'managementUnit'},res=>{
              this.cityList = res.data
            },err=>{});
      this.$http.get("/report/report/find3Rate?managementUnit="+this.comlistdata,{},res=>{
            this.find3Ratedata = res.data[0]
            },err=>{});
    },
    methods: {
        // 在线率
        online(){
          this.$http.get("report/report/findReportCount?managementUnit="+this.comlistdata,{type:1,state:'online'},res=>{
              this.echartscamera(res.data,this.data1)
              this.cameradata = res.data
            },err=>{});
        },
        // 联网率
        access(){
          this.$http.get("report/report/findReportCount?managementUnit="+this.comlistdata,{type:1,state:'access'},res=>{
              this.echartscamera(res.data,this.data1)
              this.cameradata = res.data
            },err=>{});
        },
        // 一机一档合格率
       archgood(){
          this.$http.get("report/report/findReportCount?managementUnit="+this.comlistdata,{type:1,state:'archGood'},res=>{
              this.echartscamera(res.data,this.data1)
              this.cameradata = res.data
            },err=>{});
        },
       checkplot(index){
           this.hadcol = index
           if(index == 1){
               this.data1 = ['总数','在线数','在线率']
               this.online()
           }else if(index == 2){
               this.data1 = ['接入任务数','已联网数','联网率']
               this.access()
           }else if(index == 3){
               this.data1 = ['总数','合格数','合格率']
               this.archgood()
           }
       },
       changecom(val){
         if(val == false){
            this.comchanges = 1
         }else if(val == true){
            this.comchanges = 0
         }
       },
       channgecomlist(val){
          this.comlistdata = val
           if(this.hadcol == 1){
            //    this.data1 = ['总数','在线数','在线率']
               this.online()
           }else if( this.hadcol == 2){
            //    this.data1 = ['接入任务数','已联网数','联网率']
               this.access()
           }else if( this.hadcol == 3){
            //    this.data1 = ['总数','合格数','合格率']
               this.archgood()
           }
           this.$http.get("report/report/findReport?managementUnit="+this.comlistdata,{},res=>{
                this.data10 = res.data
            },err=>{});

            this.$http.get("/report/report/find3Rate?managementUnit="+this.comlistdata,{},res=>{
                    this.find3Ratedata = res.data[0]
                    },err=>{});

       },
    //    任务数分配
       tasknum(){
          this.modal2 = true
          this.valuetable = 2
          this.$http.get("report/report/selectTaskNum",{},res=>{
               this.taskdata = res.data
            },err=>{});
       },
       plot(){
         this.aplotshow = true
         setTimeout(() => {
              this.echartscamera(this.cameradata,this.data1)
           }, 100);
         
       },
    //    列表模式
       liebiao(){
         this.aplotshow = false
         this.$http.get("report/report/findReport?managementUnit="+this.comlistdata,{},res=>{
                this.data10 = res.data
                
            },err=>{});
         
       },
       //修改一机一档检索条件
       changeterm(val){
         if(val == 'all'){
           this.$http.get("/report/report/countRecordDetial?managementUnit="+this.comlistdata,{state:'',areaCode:this.areacode},res=>{
                this.data2 = res.data
            },err=>{});
         }else if(val == 'good'){
            this.$http.get("/report/report/countRecordDetial?managementUnit="+this.comlistdata,{state:'1',areaCode:this.areacode},res=>{
                this.data2 = res.data
            },err=>{});
         }else if(val == 'nogood'){
             this.$http.get("/report/report/countRecordDetial?managementUnit="+this.comlistdata,{state:'0',areaCode:this.areacode},res=>{
                this.data2 = res.data
            },err=>{});
         }
       },
       //修改在线率检索条件
       changeallnum(val){
         if(val == 'all'){
           this.$http.get("report/report/findReportForm?managementUnit="+this.comlistdata,{areaCode:this.areacode,state:''},res=>{
                this.data2 = res.data
            },err=>{});
         }else if(val == 'online'){
            this.$http.get("report/report/findReportForm?managementUnit="+this.comlistdata,{areaCode:this.areacode,state:'1'},res=>{
                this.data2 = res.data
            },err=>{});
         }else if(val == 'unline'){
             this.$http.get("report/report/findReportForm?managementUnit="+this.comlistdata,{areaCode:this.areacode,state:'0'},res=>{
                this.data2 = res.data
            },err=>{});
         }
       },
       //在线数明细
       gotoonlinenum(areaCode,index){
          this.$http.get("report/report/findReportForm?managementUnit="+this.comlistdata,{areaCode:areaCode,state:1},res=>{
                this.data2 = res.data
                this.allnum = 'online'
                this.statustabletitle = '在线率统计明细'
                this.statustable = true
                this.areacode = areaCode
            },err=>{});
       },
       //一机一档合格数
       gotogoodnum(areaCode,index){
           this.term = 'good'
             this.$http.get("/report/report/countRecordDetial?managementUnit="+this.comlistdata,{state:'1',areaCode:areaCode},res=>{
                this.data2 = res.data
                this.onegear = true
                this.areacode = areaCode
            },err=>{});
       },
       gotoStatisticaldetal(areaCode,index){
           this.areacode = areaCode
          if(index == 1){
             this.statustable = true
             this.onegear = false
             this.statustabletitle = '在线率统计明细'
             this.allnum = 'all'
             this.$http.get("report/report/findReportForm?managementUnit="+this.comlistdata,{areaCode:areaCode,state:''},res=>{
                this.data2 = res.data
            },err=>{});
          }else if(index == 2){
             this.statustable = true
             this.onegear = false
             this.statustabletitle = '联网率统计明细'
             this.$http.get("report/report/findReportForm?managementUnit="+this.comlistdata,{areaCode:areaCode,state:''},res=>{
                this.data2 = res.data
            },err=>{});
          }else{
             this.onegear = true
             this.statustable = false
             this.term = 'all'
             this.$http.get("/report/report/countRecordDetial?managementUnit="+this.comlistdata,{state:'',areaCode:areaCode},res=>{
                this.data2 = res.data
            },err=>{});
          }
       },
       handleRowChange(data){
          this.modalmain = true
          this.maindata = data
       },
       handleone(data){
          this.modalmains = true
          this.maindata = data
       },
       //确认配置
       allowdeploy(){
          var aa = 1
          var that = this
          this.taskdata.forEach ((el,index)=>{if(el.num == null){aa = 2}}) 
          if(aa == 2){
            this.$Message.error('各区域任务数请填写完整');
          }else{
            this.$http.put("report/report/updateReportTaskNum",this.taskdata,{},res=>{
            },err=>{});
                
               

               setTimeout(function() {
                 //更新列表
               that.$http.get("report/report/findReport?managementUnit="+that.comlistdata,{},res=>{
                that.data10 = res.data
                that.$Message.info('更新成功')
                that.modal2 = false
                },err=>{});
                //更新联网率
                that.access()
                that.$http.get("/report/report/find3Rate",{managementUnit:that.comlistdata},res=>{
                    that.find3Ratedata = res.data[0]
                    },err=>{});
                }, 500);
               
          } 
         
       },
    //    导出表格
       educetable(){
         window.location.href=this.$http.root+'/report/report/downloadExcle';
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
              "data": data[0],
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
              "max": function(value) { //设置y轴最大值
                    return value.max+20;
                },
            //   "interval": data.interval,
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
              "data": data[3],
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
              "data":data[1],
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
              "data":data[2],
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
    .mainaddnum div span:first-child{
        width:350px;
    }
    .mainaddnum div span{
        display: inline-block;
        line-height: 35px;
        font-size: 13px;
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
    .errotext{
        color: #EC626B;
    }
    em{
        font-style:normal;
    }
</style>
