<template>
  <div @click="showno">

    <div style="position:absolute;top:90px;left:50%;z-index:99">
                <i-input  v-model="serachvalue" placeholder="安装地址、路口名称" style="width: 200px" class="sousuo"></i-input>
                <i-button type="primary" class="sure" @click="serachroad">搜索</i-button>
            </div>
        <ArcgisMap  @ip="ip" :propsmap='serachvalues' />
        <div class="rightdialog">
            <div @click.stop="statusclick(0)">
              <img src="../../public/img/xx.png"/>
              <span>运行严重故障：</span>
              <span style="color:#FE0302;font-size:22px;">{{statuslist.seriousAlertSize}}</span>
            </div>
            <div @click.stop="statusclick(1)">
              <img src="../../public/img/y.png"/>
              <span>运行一般故障：</span>
              <span style="color:rgb(254,222,10);font-size:22px;">{{statuslist.normalAlertSize}}</span>
            </div>
            <div @click.stop="statusclick(2)">
              <img src="../../public/img/nomal.png"/>
              <span>运行状态正常：</span>
              <span style="color:#1DE509;font-size:22px">{{statuslist.nomalSize}}</span>
            </div>
            <div @click.stop="statusclick(3)">
              <img src="../../public/img/obj.png"/>
              <span>安全接入网关总数：</span>
              <span style="color:#1D60FE;font-size:22px">{{statuslist.allSize}}</span>
            </div>
        </div>
      <div v-if="statusdata" @click.stop="statusdata = true,bigrightshow = false,getwayip=''">

        <!-- 点击右侧选择状态后弹窗 -->
        <div class="statusbox">
            <div class="top-box">
            <div>
              <button   class="zhuanyixuke" @click="delwarn" v-if="!move">清除警告</button>
              <button   class="zhuanyixukes" v-if="move" @click="movewarn">确认清除</button>
              <button   class="zhuanyixuke" v-if="move" @click="back">返回</button>
            </div>
              <div style="margin-left:30%">
                <i-input v-model="value" placeholder="" style="width: 200px" ></i-input>
                <i-button type="primary" class="sure" @click="serach">搜索</i-button>
              </div>
            </div>

            <div class="timelinebox">
              <Timeline>
              <Timeline-item v-for="(list,index) in timelinelist" :key="index">
                <p class="time">{{list.occurTimeHead}}</p>
                <p class="hour">{{list.occurTimeRoot}}</p>
                  <img src="../../public/img/16.png" slot="dot" v-if="list.isAlert == 2" />
                  <img src="../../public/img/17.png" slot="dot" v-if="list.isAlert == 0"/>
                  <img src="../../public/img/nono.png" slot="dot" v-if="list.nono"  @click="checknono(list.gatewayIp)"/>
                  <img src="../../public/img/19.png" slot="dot" v-if="list.isAlert == 4"  @click="checkicon(list.gatewayIp)"/>
                  <img src="../../public/img/18.png" slot="dot" v-if="list.isAlert == 1" />
                  <div class="timelinecont">
                    <p style="min-width:140px">设备IP：<span>{{list.gatewayIp}}</span></p>
                    <div style="display: flex;min-width:200px;margin-left: 10px">
                        <p>安装地址：</p>
                        <span style="text-align:left;flex: 1">{{list.installAddress}}</span>
                      </div>
                    <div style="display: flex;min-width:200px;margin-left: 10px">
                        <p>项目名称：</p>
                        <span style="text-align:left;flex: 1">{{list.projectName}}</span>
                      </div>
                    <p style="min-width:150px;margin-left: 5px">线杆编号：<span>{{list.poleNo}}</span></p>
                    <p style="min-width:180px;margin-left: 5px">是否开始处置：<span>{{list.onDeal}}</span></p>
                  </div>
                  <p class="hadpro" @click.stop="ips(list.id)">故障描述：<a>{{list.description}}</a></p>
              </Timeline-item>
              </Timeline>
            </div>
          </div>
        </div>


<transition name="fade">
        <div class="bigright" v-show="bigrightshow" transiton="fade" @click.stop="bigrightshow = true" >
           <p class="detailpage">详情页面</p>
            <div class="detail-box" ref="bright">
                <div class="detail-title">
                  <img src="../../public/img/20.png"/>
                  <p>基本信息</p>
                </div>

                <div class="detail-text" v-if="LANshow">
                  <div style="left:50px;" class="fixedborder" v-if="wangguanshow"></div>
                  <div style="left:22px;width:60px" class="fixedimg" @click="backwgs"></div>
                  <div style="left:110px;" class="fixedborder" v-if="laneig"></div>
                    <p class="fixedtext" style="left:85px;" v-if="laneig">{{devicetype.LAN8.deviceType}}</p>
                    <img src="../../public/img/1.gif" style="left:88px;" class="fixedimg" v-if="devicetype.LAN8 != '' && devicetype.LAN8.alert == 2" @click="checklaneig"/>
                    <img src="../../public/img/2.gif" style="left:88px;" class="fixedimg" v-if="devicetype.LAN8 != '' && devicetype.LAN8.alert == 1" @click="checklaneig"/>
                    <img src="../../public/img/gg2.png" style="left:88px;" class="fixedimg" v-if="devicetype.LAN8 != '' && devicetype.LAN8.alert == 0" @click="checklaneig"/>
                   <div style="left:160px;" class="fixedborder" v-if="lanseven"></div>
                    <p class="fixedtext" style="left:135px;" v-if="lanseven">{{devicetype.LAN7.deviceType}}</p>
                    <img src="../../public/img/1.gif" style="left:138px;" class="fixedimg" v-if="devicetype.LAN7 != '' && devicetype.LAN7.alert == 2" @click="checklansrven"/>
                    <img src="../../public/img/2.gif" style="left:138px;" class="fixedimg" v-if="devicetype.LAN7 != '' && devicetype.LAN7.alert == 1" @click="checklansrven"/>
                    <img src="../../public/img/gg2.png" style="left:138px;" class="fixedimg" v-if="devicetype.LAN7 != '' && devicetype.LAN7.alert == 0" @click="checklansrven"/>
                   <div style="left:210px;" class="fixedborder" v-if="lansix"></div>
                    <p class="fixedtext" style="left:185px;" v-if="lansix">{{devicetype.LAN6.deviceType}}</p>
                    <img src="../../public/img/1.gif" style="left:188px;" class="fixedimg" v-if="devicetype.LAN6 != '' && devicetype.LAN6.alert == 2" @click="checklansix"/>
                    <img src="../../public/img/2.gif" style="left:188px;" class="fixedimg" v-if="devicetype.LAN6 != '' && devicetype.LAN6.alert == 1" @click="checklansix"/>
                    <img src="../../public/img/gg2.png" style="left:188px;" class="fixedimg" v-if="devicetype.LAN6 != '' && devicetype.LAN6.alert == 0" @click="checklansix"/>
                   <div style="left:260px;" class="fixedborder" v-if="lanfive"></div>
                    <p class="fixedtext" style="left:235px;" v-if="lanfive">{{devicetype.LAN5.deviceType}}</p>
                    <img src="../../public/img/1.gif" style="left:237px;" class="fixedimg" v-if="devicetype.LAN5 != '' && devicetype.LAN5.alert == 2" @click="checklanfive"/>
                    <img src="../../public/img/2.gif" style="left:237px;" class="fixedimg" v-if="devicetype.LAN5 != '' && devicetype.LAN5.alert == 1" @click="checklanfive"/>
                    <img src="../../public/img/gg2.png" style="left:237px;" class="fixedimg" v-if="devicetype.LAN5 != '' && devicetype.LAN5.alert == 0" @click="checklanfive"/>
                   <div style="left:320px;" class="fixedborder" v-if="lanfour"></div>
                    <p class="fixedtext" style="left:295px;" v-if="lanfour">{{devicetype.LAN4.deviceType}}</p>
                    <img src="../../public/img/1.gif" style="left:298px;" class="fixedimg" v-if="devicetype.LAN4 != '' && devicetype.LAN4.alert == 2" @click="checklanfour"/>
                    <img src="../../public/img/2.gif" style="left:298px;" class="fixedimg" v-if="devicetype.LAN4 != '' && devicetype.LAN4.alert == 1" @click="checklanfour"/>
                    <img src="../../public/img/gg2.png" style="left:298px;" class="fixedimg" v-if="devicetype.LAN4 != '' && devicetype.LAN4.alert == 0" @click="checklanfour"/>
                   <div style="left:370px;" class="fixedborder" v-if="lanthree"></div>
                   <p class="fixedtext" style="left:345px;" v-if="lanthree">{{devicetype.LAN3.deviceType}}</p>
                    <img src="../../public/img/1.gif" style="left:348px;" class="fixedimg" v-if="devicetype.LAN3 != '' && devicetype.LAN3.alert == 2" @click="checklanthree"/>
                    <img src="../../public/img/2.gif" style="left:348px;" class="fixedimg" v-if="devicetype.LAN3 != '' && devicetype.LAN3.alert == 1" @click="checklanthree"/>
                    <img src="../../public/img/gg2.png" style="left:348px;" class="fixedimg" v-if="devicetype.LAN3 != '' && devicetype.LAN3.alert == 0" @click="checklanthree"/>
                   <div style="left:420px;" class="fixedborder" v-if="lantwo"></div>
                   <p class="fixedtext" style="left:395px;" v-if="lantwo">{{devicetype.LAN2.deviceType}}</p>
                    <img src="../../public/img/1.gif" style="left:398px;" class="fixedimg" v-if="devicetype.LAN2 != '' && devicetype.LAN2.alert == 2" @click="checklantwo"/>
                    <img src="../../public/img/2.gif" style="left:398px;" class="fixedimg" v-if="devicetype.LAN2 != '' && devicetype.LAN2.alert == 1" @click="checklantwo"/>
                    <img src="../../public/img/gg2.png" style="left:398px;" class="fixedimg" v-if="devicetype.LAN2 != '' && devicetype.LAN2.alert == 0" @click="checklantwo"/>
                   <div style="left:470px;" class="fixedborder" v-if="lanone"></div>
                    <p class="fixedtext" style="left:445px;" v-if="lanone">{{devicetype.LAN1.deviceType}}</p>
                    <img src="../../public/img/1.gif" style="left:448px;" class="fixedimg" v-if="devicetype.LAN1 != '' && devicetype.LAN1.alert == 2" @click="checklanone"/>
                    <img src="../../public/img/2.gif" style="left:448px;" class="fixedimg" v-if="devicetype.LAN1 != '' && devicetype.LAN1.alert == 1" @click="checklanone"/>
                    <img src="../../public/img/gg2.png" style="left:448px;" class="fixedimg" v-if="devicetype.LAN1 != '' && devicetype.LAN1.alert == 0" @click="checklanone"/>
                   
                   
                  <img src="../../public/img/wg.png"/>
                  <div class="detail-textbox">
                      <p>安装地址：<span style="color:#1D60FE">{{rightlist.installAddress}}</span></p>
                      <div>
                        <span style="min-width:200px;width:50%">设备IP：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="checkdevicelist(rightlist.poleNo)">{{rightlist.gatewayIp}}</span></span>
                        <span style="margin-right:0">立杆号：<span style="color:#1D60FE">{{rightlist.poleNo}}</span></span>
                      </div>
                      <div>
                        <span style="min-width:200px;width:50%">经度：<span style="color:#1D60FE">{{rightlist.longitude}}</span></span>
                        <span style="margin-right:0">纬度：<span style="color:#1D60FE">{{rightlist.latitude}}</span></span>
                      </div>
                      <div>
                        <span style="min-width:200px;width:50%">mac地址：<span style="color:#1D60FE">{{rightlist.mac}}</span></span>
                        <span style="margin-right:0">责任人：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="checkperson(rightlist.maintenanceUserId)">{{rightlist.maintenanceUser}}</span></span>
                      </div>
                  </div>
                </div>
              
                <div style="position:relative;margin-bottom:65px" v-if="backwg">
                  <button   class="zhuanyixukes backwg" @click="backwgs">返回网关</button>
                </div>
                

                <div class="detail-title"  v-if="wangguanshow">
                  <img src="../../public/img/21.png"/>
                  <p>控制栏</p>
                </div>
                <div v-if="wangguanshow">
                <div class="control" v-if="typeone">
                  <p>终端模式：<span style="color:#1D60FE">{{type}}</span></p>
                  <div>
                        <span style="min-width:430px">已使用端口：<span style="color:#1D60FE">{{typelist.usedPort}}</span></span>
                        <span>未使用端口：<span style="color:#1D60FE">{{typelist.notUsedPort}}</span></span>
                        <button   class="zhuanyixuke typechange" @click="typeswitch">模式切换</button>
                  </div>
                </div>

                <div class="controls" v-if="!typeone">
                  <div class="control-top">
                    <p>终端模式：</p>
                     <Radio-group v-model="phone" @on-change="changetypes($event)" >
                      <Radio label="apple">
                          <span>工作模式</span>
                      </Radio>
                      <Radio label="android">
                          <span>运维模式</span>
                      </Radio>
                  </Radio-group>
                  </div>
                  <div class="switch">
                    <button   class="zhuanyixukes buttonpos" @click="allowchangetype">确认修改</button>
                    <button   class="zhuanyixukes buttonback" @click="allowchangetypeback">返回</button>
                    <p>端口开关：</p>
                    <div>
                      <div>
                        <span>LAN1</span>
                        <i-switch size="large" @on-change="switchchange(1,$event)" v-model="typelist.LAN1 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                         <span>LAN2</span>
                        <i-switch size="large" @on-change="switchchange(2,$event)" v-model="typelist.LAN2 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                        <span>LAN3</span>
                        <i-switch size="large" @on-change="switchchange(3,$event)" v-model="typelist.LAN3 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                         <span>LAN4</span>
                        <i-switch size="large" @on-change="switchchange(4,$event)" v-model="typelist.LAN4 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                      </div>

                      <div style="margin-top:30px">
                        <span>LAN5</span>
                        <i-switch size="large" @on-change="switchchange(5,$event)" v-model="typelist.LAN5 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                         <span>LAN6</span>
                        <i-switch size="large" @on-change="switchchange(6,$event)" v-model="typelist.LAN6 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                        <span>LAN7</span>
                        <i-switch size="large" @on-change="switchchange(7,$event)" v-model="typelist.LAN7 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                         <span>LAN8</span>
                        <i-switch size="large" @on-change="switchchange(8,$event)" v-model="typelist.LAN8 == 1?true:false">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                      </div>
                </div>
              </div>
          
                



             </div>
             
                  
            </div>
            <div class="detail-title">
                  <img src="../../public/img/66.png"/>
                  <p>信息栏</p>
            </div>
            <div class="controls msgbox" v-if="wangguanshow">
              <p style="min-width:180px">运行状态：
                <span v-if="msglist.gatewayState==1" style="color:#FF5E5E">异常</span>
                <span v-if="msglist.gatewayState==0" style="color:#1D60FE">正常</span>
                </p>
              <p style="min-width:250px">终端连续运行时长：
                <span style="color:#1D60FE">{{msglist.runningTimes}}</span>
                <span v-if="msglist.runningTimes == ''" style="color:#FF5E5E">已离线</span>
              </p>
              <p style="min-width:180px">当前温度：
                <span style="color:#1D60FE">{{msglist.temperature}}℃</span>
                <span v-if="msglist.temperature == ''" style="color:#FF5E5E">无法获取</span>
              </p>
              <p style="min-width:180px">当前湿度：
                <span style="color:#1D60FE">{{msglist.humidity}}℃</span>
                <span v-if="msglist.humidity == ''" style="color:#FF5E5E">无法获取</span>
              </p>
              <p style="min-width:180px">流量检测：
                <span v-if="msglist.portFlowAlert==1" style="color:#1D60FE">正常</span>
                <span v-if="msglist.portFlowAlert==0" style="color:#FF5E5E">异常</span>
              </p>
              <p style="min-width:180px">震动干扰：
                <span v-if="msglist.shockAbnormal==1" style="color:#1D60FE">正常</span>
                <span v-if="msglist.shockAbnormal==0" style="color:#FF5E5E">异常</span>
              </p>
            </div>

            <div class="controls msgbox" v-if="!wangguanshow">
              <div v-if="msgtypelist.deviceName != '摄像机'">
                <p style="min-width:150px" >编码：<span>{{msgtypelist.snCode}}</span></p>
                <p style="min-width:150px" >品牌：<span>{{msgtypelist.manufacturer}}</span></p>
                <div style="display: flex;min-width:300px;padding:0;margin-right:20px">
                  <p style="margin-right:0">安装地址：</p>
                  <span style="text-align:left;flex: 1;color: #1D60FE;">{{msgtypelist.installAddress}}</span>
                </div>
                <p style="min-width:200px" >维护人员：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="checkperson(msgtypelist.maintenanceUserId)">{{msgtypelist.maintenanceUser}}</span></p>
              </div>
              <div style="margin-top:20px" v-if="msgtypelist.deviceName != '摄像机'">
                <p style="min-width:150px" >管理单位：<span>{{msgtypelist.managementUnit}}</span></p>
                <p style="min-width:150px" >IP地址：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="onetypelist(msgtypelist.poleNo)">{{msgtypelist.ipAddress}}</span></p>
                <p style="min-width:300px">MAC地址：<span>{{msgtypelist.mac}}</span></p>
              </div>

              <div v-if="msgtypelist.deviceName == '摄像机'">
                <p style="min-width:200px" >设备名称：<span>{{msgtypelist.cameraName}}</span></p>
                <p style="min-width:200px" >品牌：<span>{{msgtypelist.manufacturer}}</span></p>
                <p style="min-width:200px" >国标编码：<span>{{msgtypelist.nationnalId}}</span></p>
                <p style="min-width:200px" >维护人员：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="checkperson(msgtypelist.maintenanceUserId)">{{msgtypelist.maintenanceUser}}</span></p>
                
              </div>
              <div style="margin-top:20px" v-if="msgtypelist.deviceName == '摄像机'">
                <p style="min-width:200px" >IPv4地址：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="onetypelist(msgtypelist.poleNo)">{{msgtypelist.ipAddress}}</span></p>
                <p style="min-width:200px">MAC地址：<span>{{msgtypelist.mac}}</span></p>
               
              </div>
            </div>



             <div class="detail-title">
                  <img src="../../public/img/23.png"/>
                  <p>事件分析</p>
            </div>
            <div style="display:flex">
                  <div style="width: 450px;height: 250px;" id="myCharts">

                  </div>
                  <div id="myChart" style="width: 450px;height: 250px;margin-left:20px" v-if="!wangguanshow"></div>
            </div>

            <div  class="tablechangebox" v-if="this.dataone != []">
                  <i-table border :columns="columns1" :data="dataone" width="447"></i-table>
                  <p>分析建议：<span>是的粉红色的弗兰克加速度快了附件是离开的附件是离开的房间里水电费健康了圣诞节快乐</span></p>
            </div>

                <div style="position:relative" v-if="wangguanshow">
                  <p class="roadstatus">路口状况</p>
                  <ArcgisMapsmall :propsname='data2' v-if="data2 != ''"/>
                  
                  <div  class="tablechangebox tablemoal">
                    <i-table border :columns="columns2" :data="data2" width="607"></i-table>
                    <p>分析建议：<span>是的粉红色的弗兰克加速度快了附件是离开的附件是离开的房间里水电费健康了圣诞节快乐</span></p>
                  </div>
                </div>
                <p class="epilog" v-if="wangguanshow">结论分析：<span>度快了附件是离开的附件是离开的房</span></p>
                <button   class="zhuanyixukes" @click="sendwork" v-if="boolsend" style="margin-top:36px">发送工单</button>
            
             
             
             

             <div class="detail-title" v-if="this.nowworklist.length>0" style="margin-top:40px;">
                  <img src="../../public/img/worknum.png"/>
                  <p>当前工单</p>
            </div>
            <div class="content-box" v-if="this.nowworklist.length>0">
            <div class="content" v-for="(list,index) in nowworklist" :key="index">
              <div style="min-width:250px">
                <p>工单状态：</p>
                <span>{{list.processStatus}}</span>
              </div>
               <div style="min-width:270px">
                <p>工单编号：</p>
                <span style="border-bottom:1px solid #1D60FE;cursor:pointer;" @click="gotodetal(list.formId)">{{list.formId}}</span>
              </div>
               <div style="min-width:100px">
                <p>责任人：</p>
                <span>{{list.principals}}</span>
              </div>
              <div style="min-width:150px">
                <p>电话：</p>
                <span>{{list.principalsPhone}}</span>
              </div>
              <div style="min-width:250px">
                <p>反馈内容：</p>
                <span>{{list.feedbackContent}}</span>
              </div>
               <div style="min-width:270px">
                <p>承若解决时间：</p>
                <span>{{list.promiseResolveTime}}</span>
              </div>
               <div style="min-width:100px">
                <p>是否催单：</p>
                <span v-if="list.remindTimes != 0">是</span>
                <span v-if="list.remindTimes == 0">否</span>
              </div>
            </div>
           </div>


           <div class="detail-title" v-if="this.hisworklist.length>0">
                  <img src="../../public/img/hist.png"/>
                  <p>历史工单</p>
            </div>

          <div class="historywork" v-if="this.hisworklist.length>0">
            <Timeline>
              <Timeline-item v-for="(hislist,index) in hisworklist" style="padding-bottom:40px;" :key="index">
                <div  slot="dot" class="iconhis">{{index+1}}</div>
                  <div class="timelinecont">
                    <p style="min-width:270px">工单编号：<span style="border-bottom:1px solid #1D60FE;cursor:pointer;" @click="gotodetal(hislist.formId)">{{hislist.formId}}</span></p>
                    <p style="min-width:220px;margin-left: 5px">责任人：<span>{{hislist.principals}}</span></p>
                    <p style="min-width:220px;margin-left: 5px">联系电话：<span>{{hislist.principalsPhone}}</span></p>
                    <div style="display: flex;min-width:200px;margin-left: 10px">
                        <p>故障描述：</p>
                        <span style="text-align:left;flex: 1;color:#1d60fe">{{hislist.detail}}</span>
                      </div>
                  </div>
                  <div class="timelinecont" style="margin-top:20px;">
                    <p style="min-width:270px">处理时长：<span>{{hislist.intervaTime}}</span></p>
                    <p style="min-width:220px;margin-left: 5px">派单时间：<span>{{hislist.createTime}}</span></p>
                    <p style="min-width:220px;margin-left: 5px">关单时间：<span>{{hislist.updateTime}}</span></p>
                    <div style="display: flex;min-width:200px;margin-left: 10px">
                        <p>反馈内容：</p>
                        <span style="text-align:left;flex: 1;color:#1d60fe">{{hislist.feedbackContent}}</span>
                      </div>
                  </div>

              </Timeline-item>
          </Timeline>
          </div>
            <!-- 点击工单详情弹窗 -->
            <div class="workdetail" v-if="workdetail">
                <div class="detail-title" style="margin-top:10px;">
                  <p>工单详情</p>
                </div>

                <div class="workdetail-top">
                  <div class="workdetail-head" v-if="this.remindlist">
                    <img src="../../public/img/ct.png" style="margin-right:5px"/>
                    <p v-if="this.remindlist">催单时间：<span style="color:#1D60FE">{{remindlist.remindTime}}</span></p>
                  </div>
                  <div class="workdetail-head">
                    <p v-if="this.remindlist">催单内容：<span style="color:#1D60FE">{{remindlist.content}}</span></p>
                  </div>
                </div>
                 <p class="workdetailtitle">工单状态：<span style="color:#1D60FE">{{formlists.processStatus}}</span></p>

                 <div class="sendbox" >
                   <img src="../../public/img/num.png"/>
                    派单信息
                 </div>
                 <div class="content" style="border:none;" v-for="(lists,index) in devicelist" :key="index">
                    <div style="min-width:100%">
                      <p style="font-size:16px">故障描述：</p>
                      <span style="color:#F82A2A;font-size:16px;">{{lists.detail}}</span>
                    </div>
                    <div style="min-width:30%">
                      <p>端口号：</p>
                      <span>{{lists.devicePort}}</span>
                    </div>
                    <div style="min-width:30%">
                      <p>设备类型：</p>
                      <span>{{lists.deviceType}}</span>
                    </div>
                    <div style="min-width:30%">
                      <p>安装地址：</p>
                      <span>{{lists.deviceInstallAddress}}</span>
                    </div>
                    <div style="min-width:30%">
                      <p>故障MAC地址：</p>
                      <span>{{lists.deviceMac}}</span>
                    </div>
                    <div style="min-width:30%">
                      <p>设备IP地址：</p>
                      <span>{{lists.deviceIp}}</span>
                    </div>
                    <div style="min-width:100%">
                      <p>附件：</p>
                      <span style="border-bottom:1px solid #1D60FE;cursor:pointer;margin-right:20px" @click="download(down)" v-for="(down,index) in lists.attachment" :key="index">{{down}}</span>
                    </div>
                  </div>

                  <div class="content" style="border:none;">
                    <div style="min-width:30%">
                        <p>工单编号：</p>
                        <span>{{formlists.formId}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>线杆编号：</p>
                        <span>{{formlists.poleNo}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>紧急程度：</p>
                        <span>{{formlists.priority}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>安全负责人：</p>
                        <span>{{formlists.principals}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>手机号：</p>
                        <span>{{formlists.principalsPhone}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>项目名称：</p>
                        <span>{{formlists.projectName}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>安全负责单位名称：</p>
                        <span>{{formlists.principalsCompany}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>派单时间：</p>
                        <span>{{formlists.createTime}}</span>
                      </div>
                      <div style="min-width:100%" v-if="formlists.processStatus == '待确认'">
                        <p>说明：</p>
                         <i-input type="textarea" :rows="4" v-model="closetext"></i-input>
                      </div>
                      <input type="file" multiple name="file"  style="margin:10px 30px" ref="closefile" @change="flieupload" v-if="formlists.processStatus == '待确认'"/> 
                  </div>

                 <div class="sendbox"  v-if="feebacklist.length>0">
                   <img src="../../public/img/fg.png"/>
                    反馈信息
                 </div>
                 <div class="content" style="border:none;" v-for="(list,index) in feebacklist" :key="index">
                  <div style="min-width:20%">
                    <p>反馈人：</p>
                    <span>{{list.person}}</span>
                  </div>
                  <div style="min-width:40%">
                    <p>反馈时间：</p>
                    <span>{{list.feedbackTime}}</span>
                  </div>
                  <div style="min-width:30%">
                    <p>承诺解决时长：</p>
                    <span>{{list.promiseResolveTime}}</span>
                  </div>
                  <div style="min-width:30%">
                    <p>反馈具体内容：</p>
                    <span>{{list.content}}</span>
                  </div>
                 </div>
                 <button   class="zhuanyixukes" v-if="formlists.processStatus == '待确认'" @click="closetowork(formlists)">确认关闭工单</button>
                 <button   class="zhuanyixukes" v-if="formlists.processStatus == '待确认'" @click="backtowork(formlists)">退回</button>
                <button   class="zhuanyixukes closebtn" @click="closedetail">关闭</button>
            </div>


          <!-- 发送工单弹窗 -->
          <div class="workdetail" v-if="workdetailsend" style="padding:0">
             <Collapse   v-model="collegeIndex">
              <Panel  v-for="(list,index) in newlists" :key="index" :name="(index+1)+''">
            <!-- <div v-for="(list,index) in newlists" :key="index"> -->
                <!-- <div class="detail-title" style="margin-top:10px;"> -->
                  <img src="../../public/img/num2.png" style="vertical-align:middle;margin-right:5px" v-if="(index+1)%2 == 0"/>
                  <img src="../../public/img/num.png" style="vertical-align:middle;margin-right:5px" v-if="(index+1)%2 != 0"/>工单编号 ({{list.comm.id}})
                <!-- </div> -->

                <div class="content worksendbox" style="border:none" slot="content">
                  <div style="min-width:40%">
                    <p>安全负责人：</p>
                    <span >{{list.comm.principals}}</span>
                  </div>
                  <div style="min-width:30%">
                    <p>项目名称：</p>
                    <span>{{list.comm.projectName}}</span>
                  </div>
                  <div style="min-width:20%">
                    <p>联系方式：</p>
                    <span>{{list.comm.principalsPhone}}</span>
                  </div>
                  <div style="min-width:40%">
                    <p>安全负责人单位名称：</p>
                    <span >{{list.comm.principalsCompany}}</span>
                  </div>
                   <div style="min-width:30%">
                    <p>紧急程度：</p>
                    <Radio-group :v-model="list.comm.id" @on-change="changelevel($event,list,newlists[index].device)" style="margin-top:0">
                      <Radio :label="bb.id" v-for="(bb,nums) in priorityName" :key="nums">
                          <span style="margin-right:10px;color:#FE3D3D" v-if="nums == 0">{{bb.priorityName}}</span>
                          <span style="margin-right:10px;color:#F6B36C" v-if="nums == 1">{{bb.priorityName}}</span>
                          <span style="margin-right:10px;color:#8DEC9B" v-if="nums == 2">{{bb.priorityName}}</span>
                      </Radio>
                  </Radio-group>
                  </div>
                  <div style="min-width:20%">
                    <p>线杆编号：</p>
                    <span >{{list.comm.poleNo}}</span>
                  </div>
                </div>

                <!-- <div class="detail-title" style="margin-top:10px;" slot="content">
                  <p style="color:#1d60fe">设备信息</p>
                </div> -->

                <div class="content"  v-for="(aa,indexs) in list.device" :key="indexs" slot="content">
                    <div style="min-width:10%;position:relative" >
                      <img src="../../public/img/2142.png"/>
                      <span style="position:absolute;left:7px;top:16px;color:#F6B46F">{{aa.devicePort}}</span>
                      <span style="position:absolute;left:0px;top:45px;color:#1D60FE" v-if="aa.deviceType != '网关'">{{aa.deviceType}}</span>
                      <span style="position:absolute;left:11px;top:45px;color:#1D60FE" v-if="aa.deviceType == '网关'">{{aa.deviceType}}</span>
                    </div>
                    <!-- <div style="min-width:30%">
                      <p>设备类型：</p>
                      <span>{{aa.deviceType}}</span>
                    </div> -->
                    <div style="min-width:40%">
                      <p>故障MAC地址：</p>
                      <span  style="color:#696C6F">{{aa.deviceMac}}</span>
                    </div>
                    <div style="min-width:40%">
                      <p>设备IP地址：</p>
                      <span  style="color:#696C6F">{{aa.deviceIp}}</span>
                    </div>
                     <div style="min-width:90%;margin-left:10%">
                      <p>安装地址：</p>
                      <span style="color:#696C6F">{{aa.deviceInstallAddress}}</span>
                    </div>
                    <div style="min-width:90%;margin-left:10%">
                        <p>故障描述：</p>
                        <i-input type="textarea" :rows="4" :placeholder="aa.detail"  v-model="aa.detail"></i-input>
                    </div>
                   <input type="file" multiple name="file" :id="aa.deviceMac" style="margin:20px 30px;padding-left:10%" @change="confirmupload(aa.deviceMac,index,indexs)"/> 
            </div>


          





            </Panel>
    </Collapse>
            <button   class="zhuanyixukes" v-if="entersendwork" @click="aaaa">确认发送</button>
            <button   class="zhuanyixukes closebtn" @click="closedetails">关闭</button>
          </div>




              <!-- 点击责任人弹窗 -->
            <div v-if="personshow" class="workdetail">
              <div class="detail-title" style="margin-top:10px;">
                  <p style="color:#1d60fe">人员信息</p>
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
                  <p style="color:#1d60fe">证书信息</p>
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
                      <img src="../../public/img/timego.png" class="timego" v-if="certlist.certificateStatus == 2"/>
                    </div>
                 </div>
                 <button   class="zhuanyixukes closebtn" @click="closecard">关闭</button>
            </div>
 
             <!-- 点击ip弹窗 -->
            <div class="workdetail" v-if="workdetailshow">
              <Tabs active-key="0">
                <Tab-pane :label="list.portName ?list.deviceType+'('+list.portName+')':list.deviceType" :key="index" v-for="(list,index) in workdetaillist">
                  <div class="detail-title" style="margin-top:10px;">
                    <p >基本信息</p>
                  </div>
                  <div class="content" style="border:none;" v-if="list.deviceType == 'wifi嗅探' || list.deviceType == '电子围栏'">
                    <div style="min-width:30%">
                        <p>编码：</p>
                        <span>{{list.entity.snCode}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>品牌：</p>
                        <span>{{list.entity.manufacturer}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>安装位置：</p>
                        <span>{{list.entity.installAddress}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>维护人员：</p>
                        <span>{{list.entity.maintenanceUser}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>管理单位：</p>
                        <span>{{list.entity.managementUnit}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>IP地址：</p>
                        <span>{{list.entity.ipAddress}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>MAC地址：</p>
                        <span>{{list.entity.mac}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>附件：</p>
                        <span style="border-bottom:1px solid #1D60FE;cursor:pointer;margin-right:20px" @click="download(down)" v-for="(down,index) in list.entity.enclosureUrl" :key="index">{{down}}</span>
                      </div>
                  </div>

                  <div class="content" style="border:none;" v-if="list.deviceType == '安全网关'">
                    <div style="min-width:30%">
                        <p>中心端地址：</p>
                        <span>{{list.entity.centPortAddress}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>本机地址：</p>
                        <span>{{list.entity.localAddress}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>网关序列号：</p>
                        <span>{{list.entity.snCode}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>网关IP：</p>
                        <span>{{list.entity.gatewayIp}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>MAC地址：</p>
                        <span>{{list.entity.mac}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>经度：</p>
                        <span>{{list.entity.longitude}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>纬度：</p>
                        <span>{{list.entity.latitude}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>地址掩码：</p>
                        <span>{{list.entity.addressMask}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>安装地址：</p>
                        <span>{{list.entity.installAddress}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>管理单位：</p>
                        <span>{{list.entity.managementUnit}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>维护人员：</p>
                        <span>{{list.entity.maintenanceUser}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>网关名称：</p>
                        <span>{{list.entity.gatewayName}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>用户名：</p>
                        <span>{{list.entity.mac}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>出场编码：</p>
                        <span>{{list.entity.mac}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>系统时间：</p>
                        <span>{{list.entity.systemTime}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>出场时间：</p>
                        <span>{{list.entity.factoryTime}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>设备厂商：</p>
                        <span>{{list.entity.mac}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>终端状态：</p>
                        <span>{{list.entity.mac}}</span>
                      </div>
                  </div>


                  <div class="content" style="border:none;" v-if="list.deviceType == '摄像机'">
                    <div style="min-width:30%">
                        <p>设备名称：</p>
                        <span>{{list.entity.cameraName}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>设备厂商：</p>
                        <span>{{list.entity.manufacturer}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>设备型号：</p>
                        <span>{{list.entity.model}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>安装地址：</p>
                        <span>{{list.entity.installAddress}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>行政区域：</p>
                        <span>{{list.entity.areaCode}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>国标编码：</p>
                        <span>{{list.entity.nationnalId}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>摄像机编码格式：</p>
                        <span>{{list.entity.cameraCode}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>安装时间：</p>
                        <span>{{list.entity.installTime}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>补光类型：</p>
                        <span>{{list.entity.lightingType}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>摄像机类型：</p>
                        <span>{{list.entity.cameraType}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>录像保存天数：</p>
                        <span>{{list.entity.videoSaveDays}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>联网属性：</p>
                        <span >{{list.entity.networkProperties?'未联网':'已联网'}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>IPv4地址：</p>
                        <span>{{list.entity.ipAddress}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>MAC地址：</p>
                        <span>{{list.entity.mac}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>IPv6地址：</p>
                        <span>{{list.entity.ipv6Address}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>设备状态：</p>
                        <span>{{list.entity.deviceStatus?'异常':'正常'}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>监控点位类型：</p>
                        <span>{{list.entity.pointType}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>监控方位：</p>
                        <span>{{list.entity.cameraPosition}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>点位名称：</p>
                        <span>{{list.entity.pointName}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>维护人员：</p>
                        <span>{{list.entity.maintenanceUser}}</span>
                      </div>
                  </div>

                  <div class="detail-title" style="margin-top:10px;" v-if="list.deviceType == '摄像机'">
                    <p >基本信息</p>
                  </div>
                  <div class="content" style="border:none;" v-if="list.deviceType == '摄像机'">
                      <div style="min-width:30%">
                        <p>经度：</p>
                        <span>{{list.entity.longitude}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>纬度：</p>
                        <span>{{list.entity.latitude}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>管理单位：</p>
                        <span>{{list.entity.managementUnit}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>是否上报：</p>
                        <span>{{list.entity.isReport?"否":"是"}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>所属辖区公安机关：</p>
                        <span>{{list.entity.deptId}}</span>
                      </div>
                      <div style="min-width:30%">
                        <p>管理单位联系方式：</p>
                        <span>{{list.entity.managementPhone}}</span>
                      </div>
                      <div style="min-width:100%">
                        <p>摄像机功能类型：</p>
                        <span>{{list.entity.cameraFunctionType}}</span>
                      </div>
                      <div style="min-width:100%">
                        <p>摄像机位置类型：</p>
                        <span>{{list.entity.cameraPositionType}}</span>
                      </div>
                      <div style="min-width:100%">
                        <p>所属部门行业：</p>
                        <span>{{list.entity.industry}}</span>
                      </div>
                  </div>



                </Tab-pane>
                <!-- <Tab-pane label="标签二" key="key2">标签二的内容</Tab-pane> -->
            </Tabs>
            <button   class="zhuanyixukes closebtn" @click="closecard">关闭</button>
            </div>




            <!-- <div style="height:400px;width:500px;"></div> -->


            </div>

            
        </div>
        </transition>
  </div>

</template>
<script>
import ArcgisMap from "@/components/ArcgisMap";
import ArcgisMapsmall from "@/components/ArcgisMapsmall";
import Vue from "vue";
// let echarts = require('echarts/lib/echarts');
export default {
  name: "safemanage",
  components: {
    ArcgisMap,
    ArcgisMapsmall
  },
  data() {
    return {
      collegeIndex:'1',
      attachment:'',
      closetext:'',
      timeechartlist:[],
      workdetaillist:[],
      entersendwork:false,
      sendparam:[],
      deviceValue:0,
      workdetailshow:false,
      usermsg:[],
      certmsg:[],
      personshow:false,
      boolsend:false,
      entersend:{},
      sendworkshow:false,
      formIdlist:'',
      priorityName:[],
      newlists:[],
      workdetailsend:false,
      formlists:[],
      devicelist:[],
      feebacklist:[],
      remindlist:[],
      workdetail:false,
      olddata:[],
      hisworklist:[],
      nowworklist:[],
      device:[],
      serachvalue:'',
      serachvalues:'',
      msgtypelist:[],
      backwg:false,
      wangguanshow:true,
      lanone:false,
      lantwo:false,
      lanthree:false,
      lanfour:false,
      lanfive:false,
      lansix:false,
      lanseven:false,
      laneig:false,
      LANshow:false,
      devicetype:[],
      msglist:[],
      changeobj:{},
      phone:'',
      opendata:true,
      opendatas:false,
      typeone:true,
      bigrightshow:false,
      move: false,
      statusdata: false,
      value: "",
      levels: "",
      level:'cc',
      ss: "",
      statuslist: [],
      timelinelist: [],
      iplist: [],
      getwayip:'',
      rightlist:[],
      type:'',
      typelist:[],
      columns1: [{title: '采样时间',key: 'creatTime', width:155,},
                {title: '网络延时',key: 'status',width:95,},
                {title: '丢包率',key: 'packetLoss',width:80,},
                 {title: '在ping一下',key:'ping',width:115,
              render: (h, params) => {
                    return h('div', [
                        h('div', {
                            on: {
                                click: () => {
                                  this.boolping()
                                }
                            }
                        }, 'ping')
                    ]);
                  }
                 }
                ],
      dataone: [],
      columns2: [{title: '设备类型',key: 'deviceType', width:90,},
                {title: 'IP',key: 'gatewayIp',width:120,},
                {title: '安装地址',key: 'installAddress',width:150,className:'address'},
                {title: '在线状态',key: 'isOnline',width:90,},
                {title: '检测时间',key: 'updateTime',width:155,className:'updatetime'}
                ],
      data2: []
    };
  },

  mounted() {
    // this.drawLine();
    this.drawLines();
    this.$http.get(
      "alert/warning/getAlertStatistics",
      {workType:'安全事件'},
      res => {
        this.statuslist = res.data;
      },
      err => {}
    );
    document.getElementsByClassName('detail-box')[0].addEventListener('scroll', this.handleScroll)
  },
  methods: {
    drawLine(data){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))

        var mytime24 = new Array();
			var i=0;
			var ttt=1533139200000;
			for(;i<23;i++){
				mytime24.push([ttt,'']);//传入value的值为‘’则该值点不会显示在图表中
				ttt=ttt+3600000;
 
			}//生成24小时的时间范围数组数据。
        // 绘制图表
        myChart.setOption({
            xAxis: {
            splitLine:'false',
			    	name:'时间',
			    	type:'time',
            data: [],
    },
    title: {
        subtext: "通讯流量状况"
    },
    tooltip: {
        trigger: "axis",
        showDelay: 0,
        axisPointer: {
            type: "cross",
            lineStyle: {
                type: "dashed",
                width: 1
            }
        }
    },
    grid:{
      left:55
    },
    yAxis: {
      name: 'kb',
        type: 'value',
         max: function(value) { //设置y轴最大值
             return value.max + 30;
         }
    },
    series: [{
        symbolSize: 4,
        data: data,
        type: 'line'
    }]
        });
    },
    drawLines(data){
        // 基于准备好的dom，初始化echarts实例
        let myCharts = this.$echarts.init(document.getElementById('myCharts'))
        // 绘制图表
        myCharts.setOption({
            xAxis: {
       splitLine:'false',
			    	name:'时间',
			    	type:'time',
            data: [],
    },
    title: {
        subtext: "网络状况"
    },
    tooltip: {
        trigger: "axis",
        showDelay: 0,
        axisPointer: {
            type: "cross",
            lineStyle: {
                type: "dashed",
                width: 1
            }
        }
    },
    grid:{
      left:55
    },
    yAxis: {
        type: 'value',
          scale: false,
            min: 0,
            max: 1,
            splitNumber: 1,
            margin: 20,
            axisTick: {
                length: 0,
                inside: true,
                interval: 0,
                show: false
            },
            
            axisLabel: {
                formatter: function (value) {
                  var texts = [];
                  if(value==0){
                  texts.push('在线');
                  }
                  else if (value ==1) {
                  texts.push('离线');
                  }
                  return texts;
                  },
                textStyle: {
                    color: "#333"
                },
                margin: 5
            }
    },
    series: [{
        data: data,
        symbolSize: 4,
        type: 'scatter',
        itemStyle:{
					normal:{color:function(value){
						if(value.data[1]=="0")
							return "#8CC152";
						else if(value.data[1]=="1")
              return "#ED5565";
          }}
    },
    }]
        });
    },
    statusclick(index) {
      this.statusdata = true;
      this.value = "";
      if (index == 0) {
        this.$http.get(
          "alert/warning/getDeviceInfo?&param=",
          { level: 2,requestModular:1 },
          res => {
            this.timelinelist = res.data;
            this.levels = 2;
            this.move = false;
            for (let i = 0; i < this.timelinelist.length; i++) {
              this.$set(this.timelinelist[i], "nono", false);
            }
          },
          err => {}
        );
      } else if (index == 1) {
        this.$http.get(
          "alert/warning/getDeviceInfo?&param=",
          { level: 1 ,requestModular:1 },
          res => {
            this.timelinelist = res.data;
            this.levels = 1;
            this.move = false;
            for (let i = 0; i < this.timelinelist.length; i++) {
              this.$set(this.timelinelist[i], "nono", false);
            }
          },
          err => {}
        );
      } else if (index == 2) {
        this.$http.get(
          "alert/warning/getDeviceInfo?&param=",
          { level: 0 ,requestModular:1 },
          res => {
            this.timelinelist = res.data;
            this.levels = 0;
            this.move = false;
            for (let i = 0; i < this.timelinelist.length; i++) {
              this.$set(this.timelinelist[i], "nono", false);
            }
          },
          err => {}
        );
      } else if (index == 3) {
        this.$http.get(
          "alert/warning/getDeviceInfo?&param=",
          { level: 4 ,requestModular:1 },
          res => {
            this.timelinelist = res.data;
            this.levels = 4;
            this.move = false;
            for (let i = 0; i < this.timelinelist.length; i++) {
              this.$set(this.timelinelist[i], "nono", false);
            }
          },
          err => {}
        );
      }
    },
    serach() {
      this.$http.get(
        "/alert/warning/getDeviceInfo?",
        { param: this.value, level: this.levels,requestModular:1  },
        res => {
          this.timelinelist = res.data;
          this.levels = this.levels;
          for (let i = 0; i < this.timelinelist.length; i++) {
            this.$set(this.timelinelist[i], "nono", false);
          }
        },
        err => {}
      );
    },
    checkicon(ip, imgcheck, status) {
      this.timelinelist.forEach(el => {
        if (el.gatewayIp == ip) {
          (el.nono = true), (el.isAlert = 5);
        }
      });
    },
    checknono(ip) {
      this.timelinelist.forEach(el => {
        if (el.gatewayIp == ip) {
          (el.nono = false), (el.isAlert = 4);
        }
      });
    },
    delwarn() {
      this.timelinelist.forEach(el => {
        if (el.isAlert != 0) {
          (el.nono = true), (el.isAlert = 5);
        }
      });
      this.move = true;
    },
    back() {
      this.$http.get(
        "alert/warning/getDeviceInfo?",
        { level: this.levels, param: this.value,requestModular:1  },
        res => {
          this.timelinelist = res.data;
          for (let i = 0; i < this.timelinelist.length; i++) {
            this.$set(this.timelinelist[i], "nono", false);
          }
        },
        err => {}
      );
      this.move = false;
    },
    movewarn() {
      this.iplist = [];
      this.timelinelist.forEach(el => {
        if (el.isAlert == 4) {
          this.iplist.push(el.gatewayIp);
        }
      });
      if(this.iplist.length > 0){
          this.$http.put("alert/warning/cleanAlert",{ gatewayIpList: this.iplist },res => {
          if(res.rel == true){
            this.$Message.success('清除警告成功');
            this.$http.get( "alert/warning/getDeviceInfo?",{ level: this.levels, param: this.value,requestModular:1  },res => {
              this.timelinelist = res.data;
              for (let i = 0; i < this.timelinelist.length; i++) {
                this.$set(this.timelinelist[i], "nono", false);
              }
            },
            err => {}
          );
          this.$http.get("alert/warning/getAlertStatistics",{workType:'安全事件'},res => {
            this.statuslist = res.data;
          },
          err => {}
        );
          this.move = false;

          }else if(res.rel == false){
            this.$Message.error('清楚警告失败');
          }
        },
        err => {}
      );
      }
      
    },
    
    showno(){
      this.statusdata = false
      if(this.bigrightshow == true){
        this.bigrightshow = false
         this.getwayip = ''
      }else if(this.bigrightshow == false && this.getwayip !== ''){
        this.bigrightshow = true
      }
    },
    ip(data){
      // this.bigrightshow = true
      this.deviceValue = 0
      this.olddata = data
      this.device=[]
      this.data2 = []
      this.lansix = false
      this.lanone = false
      this.lantwo = false
      this.lanseven = false
      this.laneig = false
      this.wangguanshow = true
      this.lanfive = false
      this.lanthree = false
      this.lanfour = false
      this.getwayip = data
      this.typeone = true
       this.$http.get("gis/gis/getGatewayById?",{gatewayId:data},res=>{
          this.rightlist = res.data
          //图表加载插口
           this.$http.get("res/resState/getLanDeviceType?",{gatewayId:data},res=>{
             this.LANshow = true
             this.devicetype = res.data
          },err=>{});


         //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:data,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
            }else{
                this.boolsend = false
            }
          },err=>{});


          // 信息栏信息
          this.$http.get("gis/gis/getGatewayIndexAlert?",{gatewayIp:this.rightlist.gatewayIp},res=>{
              this.msglist = res.data
          },err=>{});

          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.rightlist.gatewayIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});

          //表格2
          this.$http.get("gis/gis/getCrossGatewayByIp?",{gatewayIp:this.rightlist.gatewayIp},res=>{
              this.data2 = res.data
              this.data2.forEach (el=>{ if(el.isOnline == 0) { el.isOnline = '在线' }else{el.isOnline = '离线'}})
              // console.log(this.data2)
          },err=>{});

          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:data,workType:'安全事件'},res=>{
            if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:data,workType:'安全事件'},res=>{
            if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});

      },err=>{});
      this.$http.get("gis/gis/getPortStatus?",{gatewayId:data},res=>{
          this.typelist = res.data
          if(res.data.teminalType == 2){
            this.type = '运维模式'
            this.phone = 'android'
          }else if(res.data.teminalType == 0){
             this.type = '工作模式'
             this.phone = 'apple'
          }
      },err=>{});

        setTimeout(() => {
          const el = document.querySelector(".detail-box");
          el.scrollTop = 0;
        },100)

    },
    ips(data){
      // this.statusdata = false
      this.bigrightshow = true
      this.deviceValue = 0
      this.olddata = data
      this.device=[]
      this.data2 = []
      this.lansix = false
      this.lanone = false
      this.lantwo = false
      this.lanseven = false
      this.laneig = false
      this.wangguanshow = true
      this.lanfive = false
      this.lanthree = false
      this.lanfour = false
      this.getwayip = data
      this.typeone = true
       this.$http.get("gis/gis/getGatewayById?",{gatewayId:data},res=>{
          this.rightlist = res.data
          //图表加载插口
           this.$http.get("res/resState/getLanDeviceType?",{gatewayId:data},res=>{
             this.LANshow = true
             this.devicetype = res.data
          },err=>{});


         //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:data,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
            }else{
                this.boolsend = false
            }
            
          },err=>{});


          // 信息栏信息
          this.$http.get("gis/gis/getGatewayIndexAlert?",{gatewayIp:this.rightlist.gatewayIp},res=>{
              this.msglist = res.data
          },err=>{});

          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.rightlist.gatewayIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});

          //表格2
          this.$http.get("gis/gis/getCrossGatewayByIp?",{gatewayIp:this.rightlist.gatewayIp},res=>{
              this.data2 = res.data
              this.data2.forEach (el=>{ if(el.isOnline == 0) { el.isOnline = '在线' }else{el.isOnline = '离线'}})
              // console.log(this.data2)
          },err=>{});

          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:data,workType:'安全事件'},res=>{
            if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:data,workType:'安全事件'},res=>{
            if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});

          setTimeout(() => {
          const el = document.querySelector(".detail-box");
          el.scrollTop = 0;
        },100)

      },err=>{});
      this.$http.get("gis/gis/getPortStatus?",{gatewayId:data},res=>{
          this.typelist = res.data
          if(res.data.teminalType == 2){
            this.type = '运维模式'
            this.phone = 'android'
          }else if(res.data.teminalType == 0){
             this.type = '工作模式'
             this.phone = 'apple'
          }
      },err=>{});
      
    },
    typeswitch(){
      this.typeone = false
    },
    switchchange(i,val){
      if(val == false){
        var aa = 0
      }else if(val == true){
        var aa = 1
      }
      this.$set(this.changeobj, 'LAN'+i, aa)
    },
    changetypes(val){
      if(val == 'apple'){
        this.$set(this.changeobj, 'teminalType', 0)
      }else if(val == 'android'){
        this.$set(this.changeobj, 'teminalType', 2)
      }
    },
    changelevel(val,list,device){
      // console.log(val)
      var sendwork = {}
        this.$set(sendwork, "formKey","deviceMaintain")
        this.$set(sendwork, "formId",list.comm.id)
        this.$set(sendwork, "priority",val)
        this.$set(sendwork, "device",device)
        if(this.sendparam.length==0){
          this.sendparam.push(sendwork)
        }else{
        var num = 0
          for (let i=0; i< this.sendparam.length; i++){
            console.log(this.sendparam[i].formId)
            if(list.comm.id == this.sendparam[i].formId){
              this.$set(this.sendparam[i], "priority",val)
            }else {
              num++
            
            }
          }
          if(num == this.sendparam.length){
                this.sendparam.push(sendwork)
          }
        }
        console.log(this.sendparam)
        if(this.sendparam.length == this.newlists.length){
          this.entersendwork = true
        }
    },
    allowchangetype(){
      this.$http.put("gis/gis/changePortStatus",{gatewayId:this.rightlist.id,portMap:this.changeobj},res=>{
        
      },err=>{});
    },
    boolping(){
      this.$Message.info('正在ping,请稍等');
      //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.rightlist.gatewayIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
    },
    checklansix(){
      this.deviceValue = 6
      this.boolsend = false
        this.backwg = true
        this.lansix = true
        this.lanone = false
        this.lantwo = false
        this.lanseven = false
        this.laneig = false
        this.wangguanshow = false
        this.lanfive = false
        this.lanthree = false
        this.lanfour = false
        this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN6.deviceType,ipAddress:this.devicetype.LAN6.deviceIp},res=>{
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN6',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 

          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.devicetype.LAN6.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN6',workType:'安全事件'},res=>{
              if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN6',workType:'安全事件'},res=>{
              if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("gis/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN6',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{lan:'LAN6',gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});
    },
    checklanfive(){
       this.deviceValue = 5
      this.boolsend = false
      this.backwg = true
        this.lanfive = true
        this.lanthree = false
        this.lanfour = false
        this.lansix = false
        this.lanone = false
        this.lantwo = false
        this.lanseven = false
        this.laneig = false
        this.wangguanshow = false
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN5.deviceType,ipAddress:this.devicetype.LAN5.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
            //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN5',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
               
            }
          },err=>{});  
          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.devicetype.LAN5.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN5',workType:'安全事件'},res=>{
              if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN5',workType:'安全事件'},res=>{
              if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("gis/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN5',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{lan:'LAN5',gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});
    },
    checklanfour(){
      this.deviceValue = 4
      this.boolsend = false
      this.backwg = true
        this.lanfour = true
        this.lansix = false
        this.lanfive = false
        this.lanone = false
        this.lantwo = false
        this.lanseven = false
        this.laneig = false
        this.lanthree = false
        this.wangguanshow = false
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN4.deviceType,ipAddress:this.devicetype.LAN4.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN4',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          
          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.devicetype.LAN4.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN4',workType:'安全事件'},res=>{
              if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN4',workType:'安全事件'},res=>{
              if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("gis/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN4',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{lan:'LAN4',gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});
    },
    checklanthree(){
      this.deviceValue = 3
      this.boolsend = false
      this.backwg = true
        this.lanthree = true
        this.lanfour = false
        this.lansix = false
        this.lanfive = false
        this.lanone = false
        this.lantwo = false
        this.lanseven = false
        this.laneig = false
        this.wangguanshow = false
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN3.deviceType,ipAddress:this.devicetype.LAN3.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN3',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{});  
          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.devicetype.LAN3.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN3',workType:'安全事件'},res=>{
              if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN3',workType:'安全事件'},res=>{
              if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("gis/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN3',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{lan:'LAN3',gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});

    },
    checklantwo(){
      this.deviceValue = 2
      this.boolsend = false
      this.backwg = true
        this.lantwo = true
        this.lanthree = false
        this.lanfour = false
        this.lansix = false
        this.lanfive = false
        this.lanone = false
        this.lanseven = false
        this.laneig = false
        this.wangguanshow = false
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN2.deviceType,ipAddress:this.devicetype.LAN2.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN2',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.devicetype.LAN2.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN2',workType:'安全事件'},res=>{
              if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN2',workType:'安全事件'},res=>{
              if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("gis/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN2',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{lan:'LAN2',gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});
    },
    checklanone(){
      this.deviceValue = 1
      this.boolsend = false
      this.backwg = true
        this.lanone = true
        this.lantwo = false
        this.lanthree = false
        this.lanfour = false
        this.lansix = false
        this.lanfive = false
        this.lanseven = false
        this.laneig = false
        this.wangguanshow = false
        this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN1.deviceType,ipAddress:this.devicetype.LAN1.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN1',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.devicetype.LAN1.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
           //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN1',workType:'安全事件'},res=>{
              if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN1',workType:'安全事件'},res=>{
              if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("gis/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN1',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{lan:'LAN1',gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});
    },
    checklansrven(){
      this.deviceValue = 7
      this.boolsend = false
      this.backwg = true
        this.lanseven = true
        this.lanone = false
        this.lantwo = false
        this.lanthree = false
        this.lanfour = false
        this.lansix = false
        this.lanfive = false
        this.laneig = false
        this.wangguanshow = false
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN7.deviceType,ipAddress:this.devicetype.LAN7.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN7',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.devicetype.LAN7.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN7',workType:'安全事件'},res=>{
              if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN7',workType:'安全事件'},res=>{
              if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("gis/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN7',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{lan:'LAN7',gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});
    },
    checklaneig(){
      this.deviceValue = 8
      this.boolsend = false
      this.backwg = true
        this.laneig = true
        this.lanseven = false
        this.lanone = false
        this.lantwo = false
        this.lanthree = false
        this.lanfour = false
        this.lansix = false
        this.lanfive = false
        this.wangguanshow = false
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN8.deviceType,ipAddress:this.devicetype.LAN8.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN8',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //表格1
          this.$http.get("gis/gis/getDevicePing?",{ipAddress:this.devicetype.LAN8.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 0) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN8',workType:'安全事件'},res=>{
              if(res.data){
              this.nowworklist = res.data
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN8',workType:'安全事件'},res=>{
              if(res.data){
              this.hisworklist = res.data
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("gis/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN8',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("gis/gis/getGatewayState?",{lan:'LAN8',gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});
          
    },
    backwgs(){
      this.ip(this.olddata)
        this.typeone = true
        this.backwg = false
        this.laneig = false
        this.lanseven = false
        this.lanone = false
        this.lantwo = false
        this.lanthree = false
        this.lanfour = false
        this.lansix = false
        this.lanfive = false
        this.wangguanshow = true
        
    },
    serachroad(){
      // console.log(this.serachvalue)
      this.serachvalues = this.serachvalue
        
    },
    //发送工单
    sendwork(){
      this.workdetailsend = true
       this.$refs.bright.style.overflow = "hidden"
       if(this.deviceValue == 0){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
             
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 1){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN1',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 2){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN2',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 3){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN3',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 4){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN4',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 5){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN5',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 6){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN6',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 7){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN7',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 8){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN8',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                
              },err=>{});
          },err=>{});
       }
       
        
        //获取优先级id
       this.$http.get("workflow/common/findPriority",{},res=>{
            this.priorityName = res.data
          },err=>{});
     

      
    },
    gotodetal(id){
          this.workdetail = true
          this.$refs.bright.style.overflow = "hidden"

          //工单详情
          this.$http.get("workflow/workflow/findFormDetail?",{formId:id},res=>{
            //反馈信息
              this.feebacklist = res.data[0].feedback
            //催单信息
              this.remindlist = res.data[0].remind[0]
            //派单信息故障
              this.devicelist = res.data[0].device
            //派单信息公有
              this.formlists = res.data[0].form
          },err=>{});
   
    },
    closedetail(){
          this.workdetail = false
          this.$refs.bright.style.overflow = "auto"
    },
    closedetails(){
          this.sendparam = []
          this.entersendwork = false
          this.$refs.bright.style.overflow = "auto"
          this.formIdlist = ''
          for (let i = 0; i< this.newlists.length;i++){
            this.formIdlist += this.newlists[i].comm.id + ","
          }
          this.formIdlist = this.formIdlist.substring(0,this.formIdlist.length-1)
          var that = this
          this.$http.delete("workflow/workflow/deleteFormByFormId/"+that.formIdlist,{},res=>{
            this.workdetailsend = false
          },err=>{});
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
    checkdevicelist(num){
        this.workdetailshow = true
        this.$refs.bright.style.overflow = "hidden"
        this.$http.get("res/pole/getPoleDeviceByNo?",{poleNo:num},res=>{
          this.workdetaillist = res.data
          },err=>{});
    },
    closecard(){
      this.personshow = false
      this.workdetailshow = false
      this.$refs.bright.style.overflow = "auto"
    },
    aaaa(){
      this.$http.post("workflow/workflow/startProcess",{param:this.sendparam},res=>{
           if(res.message == '派单成功'){
             this.$Message.info('派单成功');
             this.workdetailsend = false
             this.$refs.bright.style.overflow = "auto"
             this.backwgs()
           }
          },err=>{});
    },
    confirmupload(deviceMac){
          var files = document.getElementById(deviceMac).files
          var formData = new FormData(); 
        //追加文件数据  
          for(var i=0;i<files.length;i++){    
                formData.append("files["+i+"]", files[i],files[i].name);  
          } 
          this.$http.post("workflow/file/upload",formData,res=>{
              this.newlists.forEach((items,index)=>{
            items.device.forEach((item,indexs)=>{
              if(deviceMac == item.deviceMac){
                this.$set(item,"attachment",res.data)
              }  
            })
          })
          },err=>{});
          
    },
    download(down){
       window.location.href=this.$http.root+'/workflow/file/downLoad?filePath='+down+'&isOnLine=false';
    },
    flieupload(){
       let files = this.$refs.closefile.files
        let formData = new FormData()
        //追加文件数据  
          for(var i=0;i<files.length;i++){    
                formData.append("files["+i+"]", files[i],files[i].name);  
          } 
        this.$http.post("workflow/file/upload",formData,res=>{
                this.attachment = res.data
          },err=>{});
          
    },
    backtowork(list){
       this.$http.post("/workflow/workflow/completeProcess ",{formKey:'deviceMaintain',formId:list.formId,taskId:list.taskId,outcome:'back',attachment:this.attachment,comment:this.closetext},res=>{
           if(res.rel == true){
             this.$Message.info(res.message);
             this.workdetail = false
             this.$refs.bright.style.overflow = "auto"
              this.backwgs()
           }
          },err=>{});
    },
    closetowork(list){
       this.$http.post("/workflow/workflow/completeProcess ",{formKey:'deviceMaintain',formId:list.formId,taskId:list.taskId,outcome:'pass',attachment:this.attachment,comment:this.closetext},res=>{
           if(res.rel == true){
             this.$Message.info(res.message);
             this.workdetail = false
             this.$refs.bright.style.overflow = "auto"
              this.backwgs()
           }
          },err=>{});
    },
    onetypelist(poleNos){
      this.workdetailshow = true
      this.$refs.bright.style.overflow = "hidden"
      this.$http.get("res/pole/getPoleDeviceByNo?",{poleNo:poleNos,portName:'LAN'+this.deviceValue},res=>{
               this.workdetaillist = res.data
          },err=>{});
    },
    allowchangetypeback(){
      this.typeone = true
      this.$http.get("gis/gis/getPortStatus?",{gatewayId:this.olddata},res=>{
          this.typelist = res.data
          if(res.data.teminalType == 2){
            this.type = '运维模式'
            this.phone = 'android'
          }else if(res.data.teminalType == 0){
             this.type = '工作模式'
             this.phone = 'apple'
          }
      },err=>{});
    }
  }
};
</script>
<style scoped>
.rightdialog {
  width: 260px;
  height: 340px;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  right: 0;
  top: 60px;
  z-index: 99;
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
.top-box {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  margin: 0px 20px;
  padding: 20px 0;
  text-align: left;
}
.sure {
  height: 32px;
  border-radius: 0;
  background: #1d60fe;
  width: 40px;
  padding: 0;
  border-radius: 0 4px 4px 0;
}
.timelinebox {
  padding: 20px;
  height: calc(100% - 74px);
  overflow: auto;
  padding-left: 150px;
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
  margin-top: 20px;
  margin-bottom: 65px;
}
.hadpro a {
  color: #ff3636;
  border-bottom: 1px solid #1d60fe;
}
.time {
  position: absolute;
  left: -90px;
  top: 17px;
  font-size: 14px;
}
.hour {
  position: absolute;
  left: -83px;
  top: 40px;
  font-size: 14px;
}

.bigright{
  min-width: 1000px;
  width: 62%;
  height: 100%;
  background:#fff;
  position: fixed;
  right: 0;
  top:60px;
  z-index: 100;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
/* 详情 */
.detailpage{
  margin: 0px 20px;
  border-bottom: 1px solid #C7C7C7;
  font-size:16px;
  text-align: left;
  padding: 10px 0;
}
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
.detail-text{
  display: flex;
  align-items: center;
  padding-top:20px;
  border-bottom: 2px solid #1D60FE;
  padding-bottom: 60px;
  margin-bottom: 20px;
  position: relative;
}
.detail-text img{
  width: 600px;
  height: 200px;
}
.fixedborder{
  height:30px;
  border-right:2px solid #1D60FE;
  position:absolute;
  bottom:0;
}
.detail-text .fixedimg{
  height:60px;
  width: 48px;
  position:absolute;
  bottom:80px;
}
.detail-text .fixedtext{
  position:absolute;
  bottom: 31px;
  font-size: 14px;
}

.detail-textbox{
  text-align: left;
  font-size: 14px;
  margin-left: 30px;
  width: calc(100% - 620px)
}
.detail-textbox div{
  margin-top: 20px;
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
.controls{
  margin:40px 40px 60px 40px;
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
.typechange{
  position: absolute;
  right: 150px;
  top:0;
}
.control-top{
  display: flex;
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
.roadstatus{
  color: #BDBDBD;
  text-align: left;
  margin-top: 60px;
}
.backwg{
  position: absolute;
  right: 40px;
}
.msgbox div{
  display: flex;
  padding: 0 40px;
}
.msgbox div p{
  font-size: 14px;
  margin-right: 20px;
}
.msgbox div p:last-child{
   margin-right: 0px;
}
.msgbox div p span{
  color: #1D60FE;
  display: inline-block;
  font-size: 14px;
}
.epilog{
  font-size: 16px;
  text-align: left;
  margin: 30px 0 10px 20%;
}
.epilog span{
  color: #ff3636;
}
.content-box div:last-child{
  border-bottom: none;
    padding-bottom: 0;
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
.historywork{
  margin: 20px 40px;
  position: relative;
}
.iconhis{
  border: 1px solid  #00A0E9;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: #F8CA9E;
}
.historywork .ivu-timeline-item-tail{
  left: -5px;
  position:absolute;
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
.sendbox{
  text-align: left;
  font-size: 14px;
  padding-left: 20px;
  /* border-left: 5px solid #22BCD1; */
  margin-top: 60px;
  border-bottom: 1px solid #E5E5E5;
  padding-bottom: 10px;
}
.sendbox img{
  vertical-align: middle;
  margin-right: 5px;
}
.closebtn{
  background: #B5B5B5;
  margin-bottom: 40px;
  border: none;
  padding:5px 20px;
  margin-top: 20px;
}
.ivu-upload-list{
 width: 500px;
}
.ivu-upload-select{
  margin-left: 30px;
}
.ivu-btn-ghost{
  color: #1d60fe;
}
.timego{
  position: absolute;
  left:845px;
  top:8px;
}
</style>
