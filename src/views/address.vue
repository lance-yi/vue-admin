<template>
    <div @click="showno" >
        <div style="position:absolute;top:90px;left:30%;z-index:29">
                <i-button type="primary" class="sure" @click.stop="breaktime" style="border-radius:4px" v-if="hadtime">刷新</i-button>
                <div @click.stop="breaktime">
                <Select v-model="model1" style="width:100px" v-if="!hadtime">
                    <Option v-for="item in timeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
                </div>
        </div>
        <div style="position:absolute;top:90px;left:50%;z-index:29">
                <i-input  v-model="serachvalue" placeholder="安装地址、路口名称" style="width: 200px" class="sousuo"></i-input>
                <i-button type="primary" class="sure" @click="serachroad">搜索</i-button>
        </div>
        <img src="../../public/img/100.png" :class="rightdialogshow?'iconobj':'iconobjs'" @click.stop="showrightdialog()"/>
        <div class="rightdialog" v-if="rightdialogshow">
            <div @click.stop="statusclick(0)">
              <img src="../../public/img/xx.png"/>
              <span>拆除点位：</span>
              <span style="color:#FE0302;font-size:22px;">{{statuslist.moveCnt}}</span>
            </div>
            <div @click.stop="statusclick(1)">
              <img src="../../public/img/101.png"/>
              <span>原址迁改：</span>
              <span style="color:#1DE509;font-size:22px">{{statuslist.orgCNT}}</span>
            </div>
            <div @click.stop="statusclick(2)">
              <img src="../../public/img/102.png"/>
              <span>异地迁改：</span>
              <span style="color:#1DE509;font-size:22px">{{statuslist.otherCNT}}</span>
            </div>
            <div @click.stop="statusclick(3)">
              <img src="../../public/img/103.png"/>
              <span>总点位数：</span>
              <span style="color:#1D60FE;font-size:22px;">{{statuslist.pointCnt}}</span>
            </div>
        </div>

        <!-- 运维表格弹窗 -->
      <div class="statusbox"  v-if="statustable" @click.stop="funs()">
         
        <p class="detailpage"><img src="../../public/img/xxx.png" @click.stop="closerebigmind" style="position:absolute;right:20px;z-index: 2;top:20px"/></p>
        <div style="padding-bottom:20px;border-bottom:1px solid #C3C3C3;margin:0 20px;display:flex">
          <div :class="this.checknum == 'name1'?'checknos':'checkno'" @click="checknums('name1')" style="position:relative;">
            <p>总点位数</p>
            <p>{{statuslist.pointCnt}}</p>
            <img src="../../public/img/107.png" style="width:128px;bottom:0;position:absolute;left:0" v-if="this.checknum == 'name1'"/>
          </div>
           <div :class="this.checknum == 'name2'?'checknos':'checkno'" @click="checknums('name2')" style="position:relative">
            <p>拆除点位</p>
            <p>{{statuslist.moveCnt}}</p>
            <img src="../../public/img/107.png" style="width:128px;bottom:0;position:absolute;left:0" v-if="this.checknum == 'name2'"/>
          </div>
           <div :class="this.checknum == 'name3'?'checknos':'checkno'" @click="checknums('name3')" style="position:relative">
            <p>原址迁改</p>
            <p>{{statuslist.orgCNT}}</p>
            <img src="../../public/img/107.png" style="width:128px;bottom:0;position:absolute;left:0" v-if="this.checknum == 'name3'"/>
          </div>
           <div :class="this.checknum == 'name4'?'checknos':'checkno'" @click="checknums('name4')" style="position:relative">
            <p>异地迁改</p>
            <p>{{statuslist.otherCNT}}</p>
            <img src="../../public/img/107.png" style="width:128px;bottom:0;position:absolute;left:0" v-if="this.checknum == 'name4'"/>
          </div>
        </div>
        <div style="margin-top:10px;margin-bottom:10px">
            <i-input  v-model="valuetable" placeholder="安装地址、路口名称" style="width: 200px" class="sousuo"></i-input>
            <i-button type="primary" class="sure" @click="serachtable" >搜索</i-button>
        </div>

        <div style="padding:0 20px" v-if="this.checknum == 'name1'">
              <i-table border stripe :columns="columns4" :data="data1"></i-table>
              <Page :total='totals' show-total class="fullpage" @on-change="changeliebiaopage" style="margin-top:20px" :current.sync="pages"></Page>
        </div>


        <div style="height:550px;overflow-y:auto;padding: 10px 20px 0px 20px" v-if="this.checknum != 'name1'">
            <div class="addressbox" v-for="(list,index) in datalist" :key="index">
              <p :class="index%2 ==0?'addp':'addps'">{{index+1}}</p>
              <div class="addiv">
                  <p style="top:135px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:247px" :title="list.res[0].installAddress">安装地址：{{list.res[0].installAddress}}</p>
                  <!-- <p style="top:130px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:247px" title="撒旦风口浪尖是快乐的附件是快乐的房间里见识到了开发建设开绿灯飞机">安装地址：撒旦风口浪尖是快乐的附件是快乐的房间里见识到了开发建设开绿灯飞机</p> -->
                  <p style="top:160px">立杆号：{{list.res[0].poleNo}}</p>
                  <p style="top:185px">网关IP地址：{{list.res[0].gatewayIp}}</p>
              </div>
              <div style="position:relative;margin: 0 30px 0 20px">
                   <p v-if="list.res[1].state == 1" style="top:-15px" class="linebox">类型：{{list.res[1].buildTypeName}}</p>
                   <p v-if="list.res[1].state == -1" style="top:-15px" class="linebox">类型：拆除</p>
                   <p style="top:10px" class="linebox">施工单位：{{list.res[1].constructionUnit}}</p>
                   <p style="top:30px" class="linebox">时间：{{list.res[1].createTime}}</p>
                <img src="../../public/img/123.png"/>
              </div>
              <div class="addivs">
                  <p style="top:127px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:200px" :title="list.res[1].placementPosition">放置地址：{{list.res[1].placementPosition}}</p>
              </div>
              <div style="position:relative;margin: 0 30px 0 20px" v-if="list.res[2]">
                   <p v-if="list.res[2].state == 1" class="linebox" style="top:-15px">类型：{{list.res[2].buildTypeName}}</p>
                   <p v-if="list.res[2].state == -1" class="linebox" style="top:-15px">类型：拆除</p>
                   <p class="linebox" style="top:10px">施工单位：{{list.res[2].constructionUnit}}</p>
                   <p class="linebox" style="top:30px">时间：{{list.res[2].createTime}}</p>
                <img src="../../public/img/123.png"/>
              </div>
              <div class="addiv" v-if="list.res[2]">
                  <p style="top:135px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:247px" :title="list.res[2].installAddress">安装地址：{{list.res[2].installAddress}}</p>
                  <p style="top:160px">立杆号：{{list.res[2].poleNo}}</p>
                  <p style="top:185px">网关IP地址：{{list.res[2].gatewayIp}}</p>
              </div>
              <div class="zhuanyixukes" style="margin-right:0;margin-left:35px" v-if="list.res[2]" @click="lookcontrail(list.res[1].resId)">查看轨迹</div>
              <div>
                <div class="zhuanyixukes" style="margin-right:0;margin-left:35px" v-if="!list.res[2]" @click="addressmove(list.res[1].id)">点位迁移</div>
                <div class="zhuanyixuke" style="margin-right:0;margin-left:35px;margin-top:20px" v-if="!list.res[2]" @click="lookcontrail(list.res[1].resId)">查看轨迹</div>
              </div>
            </div>
            </div>      
      </div>

        <ArcgisMapsaddress  :propsmap='serachvalues' @ip="ip" :maptime='model1' :num="removenum"/>


      <!-- 点位迁移 -->
       <div class="deteleaddbox" v-if="detecheck" @click.stop="detebox" style="z-index:500" >
          <p style="font-size:14px;border-bottom:1px solid #C9C9C9;padding-bottom:10px;position:relative">点位迁移<img src="../../public/img/xxx.png" style="position:absolute;right:0;top:5px" @click.stop="detecheck = false"/></p>
          <p style="text-align:left;font-size:14px;padding-top:10px;"><img src="../../public/img/101.png" style="width:17px;height:20px;vertical-align:middle"/> 原址</p>
          <div class="content">
            <div>
              <p>原安装地址：{{movedata[1].oldAddress.installAddress}}</p>
              <p>网关IP地址：{{movedata[1].oldAddress.gatewayIp}}</p>
              <p>项目名称：{{movedata[1].oldAddress.projectName}}</p>
            </div>
            <div>
              <p>原经度：{{movedata[1].oldAddress.longitude}}</p>
              <p>原纬度：{{movedata[1].oldAddress.latitude}}</p>
            </div>
          </div>
          <p style="text-align:left;font-size:14px;padding-top:30px;"><img src="../../public/img/109.png" style="width:17px;height:20px;vertical-align:middle"/> 拆除放置地址</p>
          <div class="content">
            <div>
              <p>放置地址：{{movedata[0].placePosition.placementPosition}}</p>
            </div>
            <div>
              <p>拆除施工单位：{{movedata[0].placePosition.constructionUnit}}</p>
            </div>
          </div>
          <div class="content" style="border-bottom:1px dashed #1D60FE;padding-bottom:10px">
            <div>
              <p>拆除时间：{{movedata[0].placePosition.createTime}}</p>
            </div>
          </div>
          <div style="position:relative">
            <img src="../../public/img/108.png"/>
            <span style="font-size:14px;position:absolute;top:20px;margin-left:10px;">迁改</span>
          </div>
          <p style="text-align:left;font-size:14px;padding-top:10px;"><img src="../../public/img/103.png" style="width:17px;height:20px;vertical-align:middle"/> 现址</p>
          <div class="content">
            <div>
              <p>放置地址&nbsp;&nbsp;&nbsp;
                <RadioGroup v-model="animal" @on-change="changelabel">
                  <Radio label="异地迁改"></Radio>
                  <Radio label="原地迁改"></Radio>
                </RadioGroup>
              </p>
            </div>
          </div>
          <div class="content" v-if="rebuildType">
            <div style="display:flex">
              <span>安装地址</span>&nbsp;&nbsp;&nbsp;
               <Cascader :data="cityList" trigger="hover" v-model="installadd" style="width: 200px;margin-left: 10px;"></Cascader>
               <i-input  v-model="installaddress" placeholder="" style="width: 300px;margin-left: 10px;" ></i-input>
            </div>
          </div>
          <!-- <div class="content" >
            <div>
              <span>网关IP地址</span>&nbsp;&nbsp;&nbsp;
              <i-input  v-model="gatewayip" placeholder="" style="width: 300px" ></i-input>
            </div>
          </div> -->
          <div class="content" >
            <div>
              <span>施工单位</span>&nbsp;&nbsp;&nbsp;
              <i-input  v-model="company" placeholder="" style="width: 300px;margin-left: 10px;margin-bottom: 10px;" ></i-input>
            </div>
          </div>
          <div class="content" v-if="rebuildType">
            <div style="margin-left:20px;margin-bottom:40px">
              <span style="font-size:14px;width:210px;display: inline-block">经度：{{lonnum}}</span>
              <span style="font-size:14px;">纬度：{{latnum}}</span>&nbsp;&nbsp;
              <!-- <img src="../../public/img/97.png" style="vertical-align: middle;padding-bottom: 1px;"/> -->
              <div class="zhuanyixukes" style="width:50px;display:inline-block;margin-left:30px" @click="jwmap">切换</div>
            </div>
          </div>
           <div class="zhuanyixukes" style="width: 90px;margin: 0 auto;" @click="allowmove">确认迁移</div>
       </div>

       <!-- 点位拆除 -->
       <div class="deteleaddbox" v-if="removecheck" style="min-width:800px" @click.stop="detebox">
          <p style="font-size:14px;border-bottom:1px solid #C9C9C9;padding-bottom:10px;position:relative"><img src="../../public/img/101.png" style="width:17px;height:20px;vertical-align:middle"/>点位拆除<img src="../../public/img/xxx.png" style="position:absolute;right:0;top:5px" @click.stop="removecheck = false"/></p>
          <div style="display:flex;align-items:center;padding:40px 20px">
            <div class="removebox">
              <div style="display:flex;align-items:top">
                  <p>原安装地址：</p><span style="flex:1;font-size:14px;line-height:30px">{{detaildata.installAddress}}</span>
              </div>
              <p>网关IP地址：{{detaildata.gatewayIp}}</p>
              <p>项目名称：{{detaildata.projectName}}</p>
              <p>经度：{{detaildata.longitude}}</p>
              <p>纬度：{{detaildata.latitude}}</p>
            </div>
            <div style="margin-right:10px;margin-bottom:40px">
              <img src="../../public/img/110.png"/>
            </div>
            <div>
              <div>
                <span>放置地址</span>&nbsp;&nbsp;&nbsp;
              <i-input  v-model="placePosition" placeholder="" style="width: 200px" ></i-input>
              </div>
              <div style="margin-top:20px">
                <span>施工单位</span>&nbsp;&nbsp;&nbsp;
                <i-input  v-model="constructionUnit" placeholder="" style="width: 200px" ></i-input>
              </div>
            </div>
          </div>
           <div class="zhuanyixukes" style="width: 90px;margin: 0 auto;" @click="allowremove">确认拆除</div>
       </div>

      <!-- 查看轨迹 -->
      <div class="deteleaddbox"  style="min-width:1280px" v-if="contrail" @click.stop="detebox">
        <p style="text-align:left;font-size:14px;border-bottom:1px solid #C9C9C9;padding-bottom:10px;position:relative">查看轨迹<img src="../../public/img/xxx.png" style="position:absolute;right:0;top:5px" @click.stop="contrail = false"/></p>
        <ArcgisMapsaddressmall  :propsmaps='dataId' />
        <div style="height:365px;overflow-y:auto;padding: 30px 20px 0px 20px" >
          <div class="addressbox" v-for="(list,index) in contraillist" :key="index" style="border-bottom:none">
              <div class="addiv">
                  <p style="top:135px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:247px" :title="list.res[0].installAddress">安装地址：{{list.res[0].installAddress}}</p>
                  <!-- <p style="top:130px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:247px" title="撒旦风口浪尖是快乐的附件是快乐的房间里见识到了开发建设开绿灯飞机">安装地址：撒旦风口浪尖是快乐的附件是快乐的房间里见识到了开发建设开绿灯飞机</p> -->
                  <p style="top:160px">立杆号：{{list.res[0].poleNo}}</p>
                  <p style="top:185px">网关IP地址：{{list.res[0].gatewayIp}}</p>
              </div>
              <div style="position:relative;margin: 0 30px 0 20px">
                   <p v-if="list.res[1].state == 1" style="top:-15px" class="linebox">类型：{{list.res[1].buildTypeName}}</p>
                   <p v-if="list.res[1].state == -1" style="top:-15px" class="linebox">类型：拆除</p>
                   <p style="top:10px" class="linebox">施工单位：{{list.res[1].constructionUnit}}</p>
                   <p style="top:30px" class="linebox">时间：{{list.res[1].createTime}}</p>
                <img src="../../public/img/123.png"/>
              </div>
              <div class="addivs">
                  <p style="top:127px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:200px">放置地址：{{list.res[1].placementPosition}}</p>
              </div>
              <div style="position:relative;margin: 0 30px 0 20px" v-if="list.res[2]">
                   <p v-if="list.res[2].state == 1" class="linebox" style="top:-15px">类型：{{list.res[2].buildTypeName}}</p>
                   <p v-if="list.res[2].state == -1" class="linebox" style="top:-15px">类型：拆除</p>
                   <p class="linebox" style="top:10px">施工单位：{{list.res[2].constructionUnit}}</p>
                   <p class="linebox" style="top:30px">时间：{{list.res[2].createTime}}</p>
                <img src="../../public/img/123.png"/>
              </div>
              <div class="addiv" v-if="list.res[2]">
                  <p style="top:135px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:247px" :title="list.res[2].installAddress">安装地址：{{list.res[2].installAddress}}</p>
                  <p style="top:160px">立杆号：{{list.res[2].poleNo}}</p>
                  <p style="top:185px">网关IP地址：{{list.res[2].gatewayIp}}</p>
              </div>
          </div>
        </div>      
      </div>
       <div v-if="jwshow" style="position:absolute;top:30%;left: 50%;z-index: 555;" @click.stop="jwshow = true">
         <img src="../../public/img/xxx.png" @click.stop="jwshow = false" style="position:absolute;top:5%;left: 95%;z-index: 555;"/>
          <ArcgisMapsaddresjw  @lats='lats' @lons='lons'/>
       </div>
       
      <!-- 点位详情 -->
      <Modal v-model="modal2" width="450" id="addressdetail">
        <p slot="header" style="height:40px;padding:10px 0px 10px 10px">
            <img src="../../public/img/103.png" style="vertical-align:middle"/>
            <span > 点位详情</span>
        </p>
        <div class="detailboxaddress">
          <div>
            <p>安装地址：</p>
            <span>{{detaildata.installAddress}}</span>
          </div>
          <div>
            <p>网关IP地址：</p>
            <span>{{detaildata.gatewayIp}}</span>
          </div>
          <div>
            <p>立杆号：</p>
            <span>{{detaildata.poleNo}}</span>
          </div>
          <div>
            <p>项目名称：</p>
            <span>{{detaildata.projectName}}</span>
          </div>
        </div>
        <div slot="footer" style="display:flex;padding: 0 80px;margin:20px 0">
            <div class="zhuanyixukes" style="width: 90px;margin: 0 auto;" @click="gotodetal(detaildata.id)">发起拆除</div>
            <div class="zhuanyixukes" style="width: 90px;margin: 0 auto;background:#22D1B6;border:none" @click="lookcontrail(detaildata.id)">拆除纪录</div>
        </div>
    </Modal>
  </div>
     
</template>
<script>
import ArcgisMapsaddress from "@/components/ArcgisMapsaddress";
import ArcgisMapsaddressmall from "@/components/ArcgisMapsaddressmall";
import ArcgisMapsaddresjw from "@/components/ArcgisMapsaddresjw";
import city from "../../src/util/city.js";
  export default {
    name: 'address-v',
    components: {
        ArcgisMapsaddress,
        ArcgisMapsaddressmall,
        ArcgisMapsaddresjw
    },
    data () {
      return {
        installaddress:'',
        cityList:city,
        latnum:'',
        lonnum:'',
        jwshow:false,
        gatewayip:'',
        company:'',
        placePosition:'',
        constructionUnit:'',
        detaildata:[],
        modal2:false,
        dataId:'',
        contraillist:[],
        contrail:false,
        removecheck:false,
        installadd:[],
        animal: '异地迁改',
        datalist:[],
        detecheck:false,
        checknum:'name1',
        totals:0,
        getwayip:'',
        columns4:[{title: '安装地址',key: 'installAddress'},
                  {title: 'IP地址',key: 'gatewayIp',width: 110},
                  {title: '责任人',key: 'userName',width: 85},
                  {title: '项目名称',key: 'projectName',width: 180},
                  {title: '经度',key: 'longitude',width: 105},
                  {title: '纬度',key: 'latitude',width: 105},
                  {title: '线杆编号',key: 'poleNo',width: 110},
                  {title: '详情',key: 'action',width:250,
                    render: (h, params) => {
                      return h('div', [
                          // h('div', {
                          //     on: {
                          //         click: () => {
                          //           // console.log(params.row.formId)
                          //           this.gotodetal(params.row.id)
                          //         }
                          //     },
                          //     style:{color:'#1d60fe',cursor:'pointer'}
                          // }, '查看详情')
                          h('img',{
                              attrs: {
                                    src: require('../../public/img/address.png')
                                },
                                style:{
                                 'vertical-align':'middle'
                                },
                                on: {
                                        click: () => {
                                           this.gotodetal(params.row.id)
                                        }
                                    }
                          },'img'),
                          h('span',{
                              style:{
                                color:'#4ACC8A',
                                'vertical-align':'middle',
                                 display:'inline-block',
                              },
                              on: {
                                        click: () => {
                                           this.gotodetal(params.row.id)
                                        }
                                    }
                          },'点位拆除'),
                           h('img',{
                              attrs: {
                                    src: require('../../public/img/xq.png')
                                },
                                style:{
                                 'vertical-align':'middle',
                                 'margin-left':'20px'
                                },
                                on: {
                                        click: () => {
                                           this.lookcontrail(params.row.id)
                                        }
                                    }
                          },'img'),
                          h('span',{
                              style:{
                                'vertical-align':'middle',
                                 display:'inline-block',
                              },
                              on: {
                                        click: () => {
                                            this.lookcontrail(params.row.id)
                                        }
                                    }
                          },'历史迁改纪录'),
                      ]);
                    }
                  }],
        pages:'',
        data1:[],
        valuetable:'',
        statustable:false,
        value:'',
        statuslist:[],
        rightdialogshow:true,
        serachvalue:'',
        serachvalues:'',
        hadtime:true,
        model1:'两分钟',
        timer:null,
        mintime:60000,
        oldid:'',
        removenum:0,
        rebuildType:true,
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
      this.$http.get("res/ponitMove/selectCountPoint",{},res => {
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
      
    
    },
    methods: {
      funs(){
          this.statustable = true
      },
      detebox(){
        if(this.statustable == true){
          this.statustable = true
        }  
      },
      timers(i){
      clearInterval(this.timer)
      this.timer =  setInterval(() => { 
            this.$http.get("res/ponitMove/selectCountPoint",{},res => {
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
        this.rightdialogshow = false
        this.value = "";
        if (index == 0) {
           this.checknum = 'name2'
           this.valuetable = ''
          this.$http.get("res/ponitMove/selectMoveRebuildList",{state:'-1'},res=>{
              this.datalist = res.data
            },err=>{});
        } else if (index == 1) {
          this.checknum = 'name3'
          this.valuetable = ''
           this.$http.get("res/ponitMove/selectMoveRebuildList",{state:'1',rebuildType:'0'},res=>{
              this.datalist = res.data
            },err=>{});
          
        } else if (index == 2) {
          this.checknum = 'name4'
          this.valuetable = ''
          this.$http.get("res/ponitMove/selectMoveRebuildList",{state:'1',rebuildType:'1'},res=>{
              this.datalist = res.data
            },err=>{});
          
        } else if (index == 3) {
          this.checknum = 'name1'
          this.valuetable = ''
          this.$http.get("res/ponitMove/selectAllPoint",{},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
            },err=>{});
        }  
      },
      //表格分页
    changeliebiaopage(i){
        if(this.checknum = 'name2'){
          
         
        }else if(this.checknum = 'name3'){
            
          
        }else if(this.checknum = 'name4'){
             
        }else if(this.checknum = 'name1'){
            this.$http.get("res/ponitMove/selectAllPoint",{current:i,pageSize:10},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
            },err=>{});
        }  
    },
    checknums(name){
      this.checknum = name
      if(name == 'name1'){
        this.valuetable = ''
         this.$http.get("res/ponitMove/selectAllPoint",{current:1,pageSize:10},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
            },err=>{});
      }else if(name == 'name2'){
        this.valuetable = ''
          this.$http.get("res/ponitMove/selectMoveRebuildList",{state:'-1'},res=>{
              this.datalist = res.data
            },err=>{});
      }else if(name == 'name3'){
       this.valuetable = ''
        this.$http.get("res/ponitMove/selectMoveRebuildList",{state:'1',rebuildType:'0'},res=>{
              this.datalist = res.data
            },err=>{});

      }else if(name == 'name4'){
        this.valuetable = ''
        this.$http.get("res/ponitMove/selectMoveRebuildList",{state:'1',rebuildType:'1'},res=>{
              this.datalist = res.data
            },err=>{});

      }
    },
    //表格上的搜索
      serachtable(){
        this.pages = 1
        if(this.checknum == 'name2'){
            this.$http.get("res/ponitMove/selectMoveRebuildList",{state:'-1',param:this.valuetable},res=>{
              this.datalist = res.data
            },err=>{});
          }else if(this.checknum == 'name3'){
            this.$http.get("res/ponitMove/selectMoveRebuildList",{state:'1',rebuildType:'0',param:this.valuetable},res=>{
              this.datalist = res.data
            },err=>{});
            
          }else if(this.checknum == 'name4'){
            this.$http.get("res/ponitMove/selectMoveRebuildList",{state:'1',rebuildType:'1',param:this.valuetable},res=>{
              this.datalist = res.data
            },err=>{});
          
           }else if(this.checknum == 'name1'){
             this.$http.get("res/ponitMove/selectAllPoint",{param:this.valuetable},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
            },err=>{});
          
           }
        },
      gotodetal(data){
        // this.detaildata.id = data
        this.placePosition=''
        this.constructionUnit = ''
        this.removecheck = true
        this.modal2 = false
        this.$http.get("res/ponitMove/selectResDetail",{resId:data},res=>{
            this.detaildata = res.data
            },err=>{});
      },
      //查看轨迹
      lookcontrail(id){
        this.dataId = id
        this.contrail = true
        this.$http.get("res/ponitMove/selectTrajectoryList",{resId:id},res=>{
                this.contraillist = res.data
            },err=>{});
      },
      //确认点位拆除
      allowremove(){
        if(this.constructionUnit == ''){
           this.$Message.error('请填写施工单位');
        }else{
          this.$http.post("res/ponitMove/ponintRemove",{resId:this.detaildata.id,placePosition:this.placePosition,constructionUnit:this.constructionUnit},res=>{
               this.$Message.success(res.message);
               this.removecheck = false
               this.removenum++
               this.$http.get("res/ponitMove/selectCountPoint",{},res => {this.statuslist = res.data;},
                err => {}
              );
               this.$http.get("res/ponitMove/selectAllPoint",{},res=>{
                this.data1 = res.data.list
                this.totals = res.data.total
            },err=>{});
            },err=>{});
        }
        
      },
      //点位迁移
      addressmove(id){
            this.latnum = ''
            this.lonnum = ''
            this.animal='异地迁改'
            this.rebuildType = true
            this.installadd = []
            this.$http.get('res/ponitMove/selectPonitInfo?id='+id,{},res=>{
              this.movedata = res.data
              this.detecheck = true
            },err=>{});
      },
      changelabel(name){
        if(name == '原地迁改'){
           this.rebuildType = false
           this.installadd = []
            this.latnum = ''
            this.lonnum = ''
        }else{
          this.rebuildType = true
        }
      },
      // 确认迁移
      allowmove(){
        var aa = false
          if(this.animal == '原地迁改'){
            var nn = 0
            this.installadd = []
            this.installaddress = ''
            this.latnum = ''
            this.lonnum = ''
            if(this.company == ''){
              var aa = false
              this.$Message.error('请填写施工单位');
            }else{
              var aa = true
            }
          }else{
            var nn = 1
            if(this.installadd.length == 0||this.installaddress == ''){
              var aa = false
              this.$Message.error('请填写安装地址');
            }else if(this.latnum == ''){
              var aa = false
              this.$Message.error('请选择经纬度');
            }else if(this.company == ''){
              var aa = false
              this.$Message.error('请填写施工单位');
            }else{
              var aa = true
            }
          }
          if( aa == true){
            this.$http.post('res/ponitMove/ponintMove',{
            "rebuildType":nn,
            areaName:this.installadd,
            "constructionUnit":this.company,
            "installAddress":this.installaddress,
            "resId":this.movedata[0].placePosition.resId,
            "id":this.movedata[0].placePosition.id,
            "latitude":this.latnum,
            "longitude":this.lonnum
          },res=>{
               this.$Message.success(res.message);
               this.detecheck = false
               this.$http.get("res/ponitMove/selectCountPoint",{},res => {this.statuslist = res.data;},
                err => {}
              );
              this.serachtable()

            },err=>{});
          }
          
      },
      ip(data){
        this.$http.get("res/ponitMove/selectResDetail",{resId:data},res=>{
            this.detaildata = res.data
            },err=>{});
        this.modal2 = true
        
      },
      jwmap(){
        this.jwshow = true
      },
      lats(data){
        // console.log(data)
        this.latnum = data
      },
      lons(data){
        // console.log(data)
        this.lonnum = data
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
      background: url(../../public/img/zzz.png) no-repeat center center/100% 100%;
      position: fixed;
      right: 0;
      top: 60px;
      z-index: 18;
      padding: 30px;
      border: 2px solid #13C7D9;
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
      width: 1350px;
      background: #fff;
      position: absolute;
      top: 15%;
      /* left: 0%; */
      right: 0%;
      /* margin: 0 auto; */
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
    }
    /* 点位迁改 */
    .addressbox{
      display: flex;
      padding: 0px 10px 30px 10px;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
      border-bottom: 1px solid #1d60fe;
    }
    .addp{
      color:#10DAD7;
      border:1px solid #10DAD7;
      border-radius:50%;
      font-size: 16px;
      padding: 5px 7px;
      line-height: 17px;
      margin-right: 10px;
      position:absolute;
      top:0;
      left: 0;
    }
    .addps{
      color:#1D60FE;
      border:1px solid #1D60FE;
      border-radius:50%;
      font-size: 16px;
      padding: 5px 7px;
      line-height: 17px;
      margin-right: 10px;
      position:absolute;
      top:0;
      left: 0;
    }
    .addiv{
      /* border:2px dashed #10DAD7;
      border-radius:4px; */
      /* padding: 10px; */
      /* text-align: left; */
      width: 247px;
      height: 247px;
      background: url(../../public/img/bb.png) no-repeat;
      position: relative;
    }
    .addivs{
      width: 200px;
      height: 200px;
      background: url(../../public/img/b.png) no-repeat;
      position: relative;
    }
    .addiv p{
      font-size: 13px;
      line-height: 30px;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .addivs p{
      font-size: 13px;
      line-height: 30px;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    /* 点位拆除 */
    .deteleaddbox{
      position:absolute;
      top:20%;
      left:0;
      right:0;
      margin:0 auto;
      min-width:700px;
      background:#fff;
      padding: 10px 20px 20px 20px;
      width:50%;
      z-index:500;
      box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.4);
    }
    .content{
      display: flex;
      justify-content: space-between;
      text-align: left;
      padding: 10px 20px 0px 20px;
    }
    .content div p{
      font-size: 14px;
      line-height: 30px;
    }
  .linebox{
    position:absolute;
    font-size: 13px;
    text-align:left;
  }
  .checkno{
    border:1px solid #707477;
    font-size: 14px;
    padding: 10px 0;
    border-radius: 4px;
    width:130px;
    margin-left:20px;
    cursor: pointer;
  }
  .checkno p{
    color: #696C6F;
  }
  .checkno span{
    color: #696C6F;
  }
  .checknos{
    border:1px solid #1D60FE;
    font-size: 14px;
    padding: 10px 0;
    border-radius: 4px;
    width:130px;
    margin-left:20px;
    cursor: pointer;
  }
  .checknos p{
    color: #1D60FE;
  }
  .checknos span{
    color: #1D60FE;
  }
  .removebox{
    text-align: left;
    width: 270px;
  }
  .removebox p {
    font-size: 14px;
    line-height: 30px;
  }
  .detailboxaddress div{
    padding: 10px;
    display: flex;
  }
  .detailboxaddress div p{
    min-width: 100px;
    text-align: right;
    line-height: 20px;
    font-size: 14px;
  }
  .detailboxaddress div span{
    font-size: 14px;
  }
</style>
