<template>
 <div>
  <div @click="showno">
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
        <ArcgisMap  @ip="ip" :propsmap='serachvalues' :maptime='model1'/>
        <img src="../../public/img/bigobj.png" :class="rightdialogshow?'iconobj':'iconobjs'" @click.stop="showrightdialog()"/>
        <div class="rightdialog" v-if="rightdialogshow">
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
        <div class="statusbox" @click.stop="funs()">
            <div class="top-box">
              <div  style="position:absolute;right:20px" @click.stop="statusdata = false">
              <img src="../../public/img/xxx.png"/>
            </div>
            <div>
              <button   class="zhuanyixuke" @click="delwarn" v-if="!move">清除警告</button>
              <button   class="zhuanyixukes" v-if="move" @click="movewarn">确认清除</button>
              <button   class="zhuanyixuke" v-if="move" @click="back">返回</button>
            </div>
              <div style="margin-left:30%">
                <i-input v-model="value"  style="width: 200px" placeholder="安装地址、路口名称"></i-input>
                <i-button type="primary" class="sure" @click="serach">搜索</i-button>
              </div>
            </div>
            <p v-if="timelinelist.length == 0&&this.levels == 2" style="padding:10px 0px;font-size:15px;color:#FE0302">暂无运行严重故障设备</p>
            <p v-if="timelinelist.length == 0&&this.levels == 1" style="padding:10px 0px;font-size:15px;color:#F4A750">暂无运行一般故障设备</p>
            <p v-if="timelinelist.length == 0&&this.levels == 0" style="padding:10px 0px;font-size:15px;color:#1DE509">暂无运行状态正常设备</p>
            <div class="timelinebox" v-if="timelinelist.length != 0">
              <Timeline>
              <Timeline-item v-for="(list,index) in timelinelist" :key="index">
                <!-- <p class="time">{{list.occurTimeHead}}</p>
                <p class="hour">{{list.occurTimeRoot}}</p> -->
                  <img src="../../public/img/16.png" slot="dot" v-if="list.isAlert == 2" />
                  <img src="../../public/img/17.png" slot="dot" v-if="list.isAlert == 0"/>
                  <img src="../../public/img/nono.png" slot="dot" v-if="list.nono"  @click="checknono(list.gatewayIp)"/>
                  <img src="../../public/img/19.png" slot="dot" v-if="list.isAlert == 4"  @click="checkicon(list.gatewayIp)"/>
                  <img src="../../public/img/18.png" slot="dot" v-if="list.isAlert == 1" />
                   <div class="timelinecont">
                    <div style="display: flex;width:100%;">
                        <p>安装地址：</p>
                        <span style="text-align:left;flex: 1">{{list.installAddress}}</span>
                      </div>
                   </div>
                   <div style="position:absolute;right:20px;top:0;cursor:pointer" @click.stop="ips(list.id)">
                     <img src="../../public/img/20.png" style="vertical-align:middle"/>
                     <span>查看详情</span>
                   </div>
                   <div class="timelinecont" style="margin-top:10px">
                      <p style="min-width:160px">路口名称：<span>{{list.crossVillage}}</span></p>
                      <p style="min-width:140px">设备IP：<span @click.stop="checkdevicelist(list.poleNo)" style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer">{{list.gatewayIp}}</span></p>
                      <div style="display: flex;min-width:200px;">
                          <p>项目名称：</p>
                          <span style="text-align:left;flex: 1">{{list.projectName}}</span>
                        </div>
                      <p style="min-width:150px;margin-left: 5px">线杆编号：<span>{{list.poleNo}}</span></p>
                   </div>
                  <p class="hadpro" style="margin-bottom:0;margin-top:10px">责任人：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="checkperson(list.maintenanceUserId)">{{list.userName}}</span></p>
                  <div class="hadpro"  style="width:100%;display:flex;margin-top:0" >
                     <!-- <p  v-if="list.description.length == 0" style="margin-top:10px">故障描述：
                                 <a  class="brspans" @click.stop="ips(list.id)" >无故障</a>
                        </p> -->
                    <div v-if="list.description">
                      <div v-for="(aa,index) in list.description" :key="index" style="margin-top: 15px;">
                          <div class="timelinecont" >
                            <p style="min-width:230px">告警类型：<span>{{aa.alertName}}</span></p>
                            <p style="min-width:230px">发生时间：<span>{{aa.occurTime}}</span></p>
                            <p style="min-width:150px">告警状态：<span v-if="aa.state == 0">待处理</span>
                            <span v-if="aa.state == 1">正在处理</span>
                            <span v-if="aa.state == 2">处理完成</span>
                            </p>
                            <p style="min-width:230px">工单编号：<span @click="gotodetal(aa.onDeal)" style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer">{{aa.onDeal}}</span></p>
                        </div>
                        <p style="margin-top: 2px;">故障描述：
                                 <a style="border:none" >{{aa.description}}</a>&nbsp;&nbsp;&nbsp;
                                 <a  class="brspans"  style="color:#1D60FE;margin-left:0;display:inline-block" @click.stop="tracing(aa.id)">事件追溯</a>
                        </p>
                        
                      </div>
                    </div>
        
                  </div>
                  <!-- <div class="timelinecont" style="margin-bottom:40px">
                       
                    <p style="min-width:180px;">是否开始处置：<span>{{list.onDeal}}</span></p>
                  </div> -->
              </Timeline-item>
                <TimelineItem >
                <img slot="dot" src="../../public/img/ending.png" />
                </TimelineItem>
              </Timeline>
            </div>
          </div>
        </div>


        <!-- 小屏幕秀 -->
        <transition name="fade">
          <div class="bigright2" v-show="bigrightshow2" transiton="fade">
            <div >
              <p class="detailpage" ><span @click.stop="bigtable">详情页面</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#1D60FE">网关运行状态总览</span></p>
              <img src="../../public/img/xxx.png" style="position:absolute;right:30px;top:20px"  @click.stop="closebright"/> 
            </div>

            <div class="smalltextbox">
              <button   class="zhuanyixukes" @click="sendwork" v-if="boolsend" style="position: absolute;right: 50px;top: 90px;">发送工单</button>
              <div >
                <span>安装地址：{{rightlist.installAddress}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>IP地址：{{rightlist.gatewayIp}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>路口/小区：{{rightlist.crossVillage}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>责任人：{{rightlist.maintenanceUser}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>联系方式：{{rightlist2.mobile}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>项目名称：{{rightlist.projectName}}</span>
              </div>
              <div v-for="(list,index) in rightlist2.safeEvent" :key="index" style="color:red">
                <span v-if="index == 0" style="min-width:70px">事件信息：</span>
                <span v-if="index != 0" style="min-width:70px;display: inline-block;"></span>
                <span>事件类型：安全事件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>发生时间：{{list.occurTime}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>事件描述：{{list.description}}</span>
              </div>
              <div v-for="lists in rightlist2.operationEvent" :key="lists.lan" style="color:red">
                <span  style="min-width:70px;display: inline-block;"></span>
                <span>端口号：{{lists.lan}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>终端IP：{{lists.ipAddr}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>终端类型：{{lists.deviceType}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>事件类型：安全事件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>发生时间：{{lists.occurTime}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>事件描述：{{lists.description}}</span>
              </div>
            </div>
            <div style="margin:10px 20px 40px 20px;box-sizing: border-box">
                <Row :gutter="16">
                  <Col span="12" >
                      <div class="chartone" style="height:250px">
                        <p style="text-align:left;border-left:4px solid #00FFFC;padding-left:10px">近一天在线状态</p>
                        <div style="height:95%;width:100%" id="myChartonline"></div>
                      </div>
                  </Col>
                  <Col span="6" >
                      <div class="chartone" style="height:250px">
                        <p style="text-align:left;border-left:4px solid #0048FF;padding-left:10px">近一天温度状态</p>
                        <div style="height:95%;width:100%" id="myCharttemperature"></div>
                      </div>
                  </Col>
                  <Col span="6" >
                        <div class="chartone" style="height:250px">
                          <p style="text-align:left;border-left:4px solid #9C00FF;padding-left:10px">近一天湿度状态</p>
                          <div style="height:95%;width:100%" id="myCharthumidity"></div>
                        </div>
                  </Col>
              </Row>

              <Row :gutter="16">
                  <Col span="12" style="margin-top:10px;display:flex;justify-content:space-between">
                    <div style="width:45%">
                      <div class="chartone" style="height:200px;">
                          <p style="text-align:left;border-left:4px solid #FF7E00;padding-left:10px">震动指标数</p>
                          <div style="height:95%;width:100%" id="myChartshake"></div>
                        </div>
                        <div class="chartone" style="height:230px;margin-top:10px" v-if="timeslist.runningTimes">
                          <p style="text-align:left;border-left:4px solid #0048FF;padding-left:10px" v-if="timeslist.line == 1">连续运行时长</p>
                          <p style="text-align:left;border-left:4px solid #0048FF;padding-left:10px" v-if="timeslist.line == 0">离线时长</p>
                          <div class="callinbox">
                            <span>{{timeslist.runningTimes.days}}</span>天
                            <span>{{timeslist.runningTimes.hours}}</span>小时
                            <span>{{timeslist.runningTimes.minutes}}</span>分钟
                            <span>{{timeslist.runningTimes.second}}</span>秒
                          </div>
                          <p style="text-align:left;border-left:4px solid #FF0000;padding-left:10px;margin-top:20px" v-if="timeslist.line == 1">上线时刻</p>
                          <p style="text-align:left;border-left:4px solid #FF0000;padding-left:10px;margin-top:20px" v-if="timeslist.line == 0">离线时刻</p>
                          <div class="callinboxs">
                            <span>{{timeslist.lineTimes.year}}</span>年
                            <span>{{timeslist.lineTimes.month}}</span>月
                            <span>{{timeslist.lineTimes.day}}</span>日
                          </div>
                          <div class="callinboxs" style="padding:0">
                            <span>{{timeslist.lineTimes.hours}}</span>时
                            <span>{{timeslist.lineTimes.minute}}</span>分
                            <span>{{timeslist.lineTimes.second}}</span>秒
                          </div>
                        </div>
                    </div>
                     <div style="width:52%;">
                      <div class="chartone" style="height:280px;">
                          <p style="text-align:left;border-left:4px solid #FF7E00;padding-left:10px">一周安全事件态势</p>
                          <div style="height:95%;width:100%" id="myCharrendWeek"></div>
                        </div>
                        <div class="chartone" style="height:150px;margin-top:10px">
                          <p style="text-align:left;border-left:4px solid #9C00FF;padding-left:10px">端口使用状况</p>
                          <div style="display:flex;padding:5px 20px;justify-content:space-between">
                              <div style="width:60px">
                                <img src="../../public/img/91.png" v-if="devicestate.LAN1 == '摄像机'"/>
                                <img src="../../public/img/92.png" v-if="devicestate.LAN1 == '电子围栏'"/>
                                <img src="../../public/img/93.png" v-if="devicestate.LAN1 == '交通卡口'"/>
                                <img src="../../public/img/94.png" v-if="devicestate.LAN1 == 'wifi嗅探'"/>
                                <img src="../../public/img/1234.png" v-if="devicestate.LAN1 == '智能电源'"/>
                                <p v-if="devicestate.LAN1 == '未使用'" style="color:#BEBEBE;line-height:28px">未使用</p>
                                <p>1<span v-if="devicestate.LAN1 != '未使用'">.{{devicestate.LAN1}}</span></p>
                              </div>
                              <div style="width:60px">
                                <img src="../../public/img/91.png" v-if="devicestate.LAN2 == '摄像机'"/>
                                <img src="../../public/img/92.png" v-if="devicestate.LAN2 == '电子围栏'"/>
                                <img src="../../public/img/93.png" v-if="devicestate.LAN2 == '交通卡口'"/>
                                <img src="../../public/img/94.png" v-if="devicestate.LAN2 == 'wifi嗅探'"/>
                                <img src="../../public/img/1234.png" v-if="devicestate.LAN2 == '智能电源'"/>
                                <p v-if="devicestate.LAN2 == '未使用'" style="color:#BEBEBE;line-height:28px">未使用</p>
                                <p>2<span v-if="devicestate.LAN2 != '未使用'">.{{devicestate.LAN2}}</span></p>
                              </div>
                              <div style="width:60px">
                                <img src="../../public/img/91.png" v-if="devicestate.LAN3 == '摄像机'"/>
                                <img src="../../public/img/92.png" v-if="devicestate.LAN3 == '电子围栏'"/>
                                <img src="../../public/img/93.png" v-if="devicestate.LAN3 == '交通卡口'"/>
                                <img src="../../public/img/94.png" v-if="devicestate.LAN3 == 'wifi嗅探'"/>
                                <img src="../../public/img/1234.png" v-if="devicestate.LAN3 == '智能电源'"/>
                                <p v-if="devicestate.LAN3 == '未使用'" style="color:#BEBEBE;line-height:28px">未使用</p>
                                <p>3<span v-if="devicestate.LAN3 != '未使用'">.{{devicestate.LAN3}}</span></p>
                              </div>
                              <div style="width:60px">
                                <img src="../../public/img/91.png" v-if="devicestate.LAN4 == '摄像机'"/>
                                <img src="../../public/img/92.png" v-if="devicestate.LAN4 == '电子围栏'"/>
                                <img src="../../public/img/93.png" v-if="devicestate.LAN4 == '交通卡口'"/>
                                <img src="../../public/img/94.png" v-if="devicestate.LAN4 == 'wifi嗅探'"/>
                                <img src="../../public/img/1234.png" v-if="devicestate.LAN4 == '智能电源'"/>
                                <p v-if="devicestate.LAN4 == '未使用'" style="color:#BEBEBE;line-height:28px">未使用</p>
                                <p>4<span v-if="devicestate.LAN4 != '未使用'">.{{devicestate.LAN4}}</span></p>
                              </div>
                          </div>
                          <div style="display:flex;padding:5px 20px;justify-content:space-between">
                              <div style="width:60px">
                                <img src="../../public/img/91.png" v-if="devicestate.LAN5 == '摄像机'"/>
                                <img src="../../public/img/92.png" v-if="devicestate.LAN5 == '电子围栏'"/>
                                <img src="../../public/img/93.png" v-if="devicestate.LAN5 == '交通卡口'"/>
                                <img src="../../public/img/94.png" v-if="devicestate.LAN5 == 'wifi嗅探'"/>
                                <img src="../../public/img/1234.png" v-if="devicestate.LAN5 == '智能电源'"/>
                                <p v-if="devicestate.LAN5 == '未使用'" style="color:#BEBEBE;line-height:28px">未使用</p>
                                <p>5<span v-if="devicestate.LAN5 != '未使用'">.{{devicestate.LAN5}}</span></p>
                              </div>
                              <div style="width:60px">
                                <img src="../../public/img/91.png" v-if="devicestate.LAN6 == '摄像机'"/>
                                <img src="../../public/img/92.png" v-if="devicestate.LAN6 == '电子围栏'"/>
                                <img src="../../public/img/93.png" v-if="devicestate.LAN6 == '交通卡口'"/>
                                <img src="../../public/img/94.png" v-if="devicestate.LAN6 == 'wifi嗅探'"/>
                                <img src="../../public/img/1234.png" v-if="devicestate.LAN6 == '智能电源'"/>
                                <p v-if="devicestate.LAN6 == '未使用'" style="color:#BEBEBE;line-height:28px">未使用</p>
                                <p>6<span v-if="devicestate.LAN6 != '未使用'">.{{devicestate.LAN6}}</span></p>
                              </div>
                              <div style="width:60px">
                                <img src="../../public/img/91.png" v-if="devicestate.LAN7 == '摄像机'"/>
                                <img src="../../public/img/92.png" v-if="devicestate.LAN7 == '电子围栏'"/>
                                <img src="../../public/img/93.png" v-if="devicestate.LAN7 == '交通卡口'"/>
                                <img src="../../public/img/94.png" v-if="devicestate.LAN7 == 'wifi嗅探'"/>
                                <img src="../../public/img/1234.png" v-if="devicestate.LAN7 == '智能电源'"/>
                                <p v-if="devicestate.LAN7 == '未使用'" style="color:#BEBEBE;line-height:28px">未使用</p>
                                <p>7<span v-if="devicestate.LAN7 != '未使用'">.{{devicestate.LAN7}}</span></p>
                              </div>
                              <div style="width:60px">
                                <img src="../../public/img/91.png" v-if="devicestate.LAN8 == '摄像机'"/>
                                <img src="../../public/img/92.png" v-if="devicestate.LAN8 == '电子围栏'"/>
                                <img src="../../public/img/93.png" v-if="devicestate.LAN8 == '交通卡口'"/>
                                <img src="../../public/img/94.png" v-if="devicestate.LAN8 == 'wifi嗅探'"/>
                                <img src="../../public/img/1234.png" v-if="devicestate.LAN8 == '智能电源'"/>
                                <p v-if="devicestate.LAN8 == '未使用'" style="color:#BEBEBE;line-height:28px">未使用</p>
                                <p>8<span v-if="devicestate.LAN8 != '未使用'">.{{devicestate.LAN8}}</span></p>
                              </div>
                          </div>
                        </div>
                    </div> 
                  </Col>
                  <Col span="12" style="margin-top:10px;">
                      <div class="chartone" style="height:440px">
                          <p style="text-align:left;border-left:4px solid #FF0084;padding-left:10px">各端口流量统计</p>
                          <div style="height:95%;width:100%" id="myChartkb"></div>
                        </div>
                  </Col>
              </Row>
            </div>
           <div style="width:200px;height:40px"></div>
          </div>
        </transition>





<transition name="fade">
        <div class="bigright" v-show="bigrightshow" transiton="fade"  @click.stop="fun()">
           <p class="detailpage" ><span style="color:#1D60FE">详情页面</span>&nbsp;&nbsp;&nbsp;&nbsp;<span  @click.stop="smalltable">网关运行状态总览</span></p>
           <img src="../../public/img/xxx.png" style="position:absolute;right:30px;top:20px"  @click.stop="closebright"/>
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
                    <img src="../../public/img/gg2.png" style="left:515px;" class="fixedimg"  v-if="devicetype.Wan == 1"/>
                    <img src="../../public/img/1.gif" style="left:515px;" class="fixedimg"  v-if="devicetype.Wan == 0"/>
                   
                   
                  <img src="../../public/img/wg.png"/>
                  <div class="detail-textbox" v-if="rightlist">
                      <p>安装地址：<span style="color:#1D60FE">{{rightlist.installAddress}}</span></p>
                      <div>
                        <span style="min-width:180px;width:50%">设备IP：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="checkdevicelist(rightlist.poleNo)">{{rightlist.gatewayIp}}</span></span>
                        <span style="margin-right:0">立杆号：<span style="color:#1D60FE">{{rightlist.poleNo}}</span></span>
                      </div>
                      <div>
                        <span style="min-width:180px;width:50%">经度：<span style="color:#1D60FE">{{rightlist.longitude}}</span></span>
                        <span style="margin-right:0">纬度：<span style="color:#1D60FE">{{rightlist.latitude}}</span></span>
                      </div>
                      <div>
                        <span style="min-width:198px;width:50%;margin-right:0">MAC地址：<span style="color:#1D60FE">{{rightlist.mac}}</span></span>
                        <span style="margin-right:0">责任人：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="checkperson(rightlist.maintenanceUserId)">{{rightlist.maintenanceUser}}</span></span>
                      </div>
                      <div>
                        <span >产权单位：<span style="color:#1D60FE">{{rightlist.ownerShipUnit}}</span></span>
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
                        <!-- <span>未使用端口：<span style="color:#1D60FE">{{typelist.notUsedPort}}</span></span> -->
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
                    <button   class="zhuanyixuke buttonback" @click="allowchangetypeback">返回</button>
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
                <span v-if="msglist.gatewayState==0" style="color:#FF5E5E">离线</span>
                <span v-if="msglist.gatewayState==1" style="color:#1D60FE">在线</span>
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
                <span style="color:#1D60FE">{{msglist.humidity}}%RH</span>
                <span v-if="msglist.humidity == ''" style="color:#FF5E5E">无法获取</span>
              </p>
              <!-- <p style="min-width:180px">流量检测：
                <span v-if="msglist.portFlowAlert==0" style="color:#1D60FE">正常</span>
                <span v-if="msglist.portFlowAlert==1" style="color:#FF5E5E">异常</span>
              </p> -->
              <p style="min-width:180px">震动干扰：
                <span v-if="msglist.shockAbnormal==1" style="color:#1D60FE">正常</span>
                <span v-if="msglist.shockAbnormal==0" style="color:#FF5E5E">异常({{msglist.shakeTimes}}次)</span>
              </p>
               <!-- <p v-if="rightlist.description" >故障描述：
                <span  class="brspan" v-for="aa in rightlist.description">{{aa}}<br /></span>
              </p> -->
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
           

           <div class="detail-title" v-if="wangguanshow">
                  <img src="../../public/img/gx.png"/>
                  <p>安全事件</p>
            </div>
            <p v-if="descriptiondata.length == 0&&wangguanshow" style="font-size:15px">暂无安全事件</p>
            <div  class="hadpro"  style="margin-top:40px;padding-left:40px" v-if="wangguanshow">
               <div v-for="(aa,index) in descriptiondata" :key="index" style="margin-top: 15px;">
                  <div class="timelinecont" >
                    <p style="min-width:230px">告警类型：<span>{{aa.alertName}}</span></p>
                    <p style="min-width:230px">发生时间：<span>{{aa.occurTime}}</span></p>
                    <p style="min-width:150px">告警状态：<span v-if="aa.state == 0">待处理</span>
                    <span v-if="aa.state == 1">正在处理</span>
                    <span v-if="aa.state == 2">处理完成</span>
                    </p>
                    <p style="min-width:230px">工单编号：<span @click="gotodetal(aa.onDeal)" style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer">{{aa.onDeal}}</span></p>
                </div>
                <p style="margin-top: 5px;margin-bottom:30px">故障描述：
                          <span style="color:rgb(255, 94, 94)" >{{aa.description}}</span>&nbsp;&nbsp;&nbsp;
                          <a  class="brspans"  style="color:#1D60FE;margin-left:0;display:inline-block" @click.stop="tracing(aa.id)">事件追溯</a>&nbsp;&nbsp;&nbsp;
                          <span v-if="aa.type == 'gatewayOfflineAlert'">分析报告：<a  class="brspans"  style="color:#1D60FE;margin-left:0;display:inline-block" @click.stop="see()">查看</a></span>
                </p>
                
              </div>
            </div>

            <div class="detail-title" >
                  <img src="../../public/img/gx.png"/>
                  <p>运维事件</p>
                </div>
                <p v-if="!alertshow" style="font-size:15px">暂无运维事件</p>
                 <div class="top-box"  v-if="alertshow">
                  <div>
                    <button   class="zhuanyixuke" @click="delwarns" v-if="!movealert">清除警告</button>
                    <button   class="zhuanyixukes" v-if="movealert" @click="movewarns">确认清除</button>
                    <button   class="zhuanyixuke" v-if="movealert" @click="backs">返回</button>
                  </div>
                 </div>
                <div  style="padding:20px 20px 0 20px" v-if="alertshow">
                  <Timeline>
                  <Timeline-item v-for="(list,index) in timelinelists" :key="index">
                      <img src="../../public/img/16.png" slot="dot" v-if="list.isAlert == 2" />
                      <img src="../../public/img/nono.png" slot="dot" v-if="list.nono"  @click="checknonos(list.id)"/>
                      <img src="../../public/img/19.png" slot="dot" v-if="list.isAlert == 4"  @click="checkicons(list.id)"/>
                      <img src="../../public/img/18.png" slot="dot" v-if="list.isAlert == 1" />
                      <div class="timelinecont">
                        <p style="min-width:120px">端口号：<span>{{list.lan}}</span></p>
                        <p style="min-width:180px">接入设备类型：<span>{{list.resType}}</span></p>
                        <p style="min-width:100px;margin-left: 5px">状态：<span>{{list.state?"处理中":"待处理"}}</span></p>
                        <p style="min-width:200px;margin-left: 5px">告警类型：<span>{{list.typeName}}</span></p>
                        <p style="min-width:210px;margin-left: 5px">发生时间：<span>{{list.occurTime}}</span></p>
                      </div>
                      <div style="display:flex;font-size:14px;margin-top:10px">
                        <div style="min-width:210px;text-align:left">
                            <p>接入设备IP地址：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="onetypelist(rightlist.poleNo,list.lan)">{{list.ipAddr}}</span></p>
                          </div>
                          
                        <!-- <div style="margin-left: 10px;min-width:400px;text-align:left">
                            <p>安装地址：<span style="color:#1D60FE;">{{list.installAddress}}</span></p>
                        </div> -->
                        <div>
                            <p>分析报告：<span style="color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="report(list)">查看</span></p>
                          </div>
                        
                      </div>
                      <div class="hadpro" style="margin-top:10px;margin-bottom:0">
                            <p>接入设备安装地址：<span style="color:#1D60FE;">{{list.installAddress}}</span></p>
                        </div>
                      <p class="hadpro" >故障描述：<a style="border:none;cursor:default">{{list.description}}</a></p>
                  </Timeline-item>
                  <TimelineItem >
                <img slot="dot" src="../../public/img/ending.png" />
                </TimelineItem>
                  </Timeline>
                </div>

            <div class="reportbox" style="width: 1000px;padding: 0 20px;padding-bottom: 20px;right: 10px;" v-if="wgeachrtsshow">
             <div class="detail-title" style="margin-top:0;">
                  <img src="../../public/img/23.png"/>
                  <p>事件分析</p>
                  <img src="../../public/img/xxx.png" @click.stop="closerebigmind" style="float:right;margin-top: 5px;margin-left: 843px;"/>
             </div>
             <div style="display:flex" >
                  <div style="width: 450px;height: 250px;" id="myCharts">

                  </div>
                  <div id="myChart" style="width: 450px;height: 250px;margin-left:20px" ></div>
             </div>
           
              <div  class="tablechangebox" v-if="this.dataone != []">
                    <i-table border :columns="columns1" :data="dataone" width="447"></i-table>
                    <p v-if="this.dataone.length > 0">分析建议：<span>{{dataone[0].description}}</span></p>
              </div>
      
 

                <div style="position:relative" >
                  <p class="roadstatus">路口状况</p>
                  <ArcgisMapsmall :propsname='data2' v-if="data2 != ''"/>
                  
                  <div  class="tablechangebox tablemoal">
                    <i-table border :columns="columns2" :data="data2" width="607"></i-table>
                    <p>分析建议：<span>{{datades.description}}</span></p>
                  </div>
                </div>
                <p class="epilog" >结论分析：<span>{{datades.finalDescription}}</span></p>
            </div>
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
              <TimelineItem ><p slot="dot"></p></TimelineItem>
          </Timeline>
          </div>
            


          <!-- 发送工单弹窗 -->
          <div class="workdetail" v-if="workdetailsend" style="padding:0">
             <Collapse   v-model="collegeIndex" >
              <Panel  v-for="(list,index) in newlists" :key="index" :name="(index+1)+''">
            <!-- <div v-for="(list,index) in newlists" :key="index"> -->
                <!-- <div class="detail-title" style="margin-top:10px;"> -->
                  <img src="../../public/img/num2.png" style="vertical-align:middle;margin-right:5px" v-if="(index+1)%2 == 0"/>
                  <img src="../../public/img/num.png" style="vertical-align:middle;margin-right:5px" v-if="(index+1)%2 != 0"/>工单编号 ({{list.comm.id}})
                <!-- </div> -->
                 
                <div class="content worksendbox" style="border:none" slot="content">
                  <div style="min-width:100%">
                  <img src="../../public/img/zzwg.gif" style="margin:0 auto;" >
                  </div>
                  <div style="min-width:30%">
                    <p>安全负责人：</p>
                    <span >{{list.comm.principals}}</span>
                  </div>
                  <div style="min-width:40%">
                    <p>单位名称：</p>
                    <span >{{list.comm.principalsCompany}}</span>
                  </div>
                  <div style="min-width:20%">
                    <p>联系方式：</p>
                    <span>{{list.comm.principalsPhone}}</span>
                  </div>
                  <div style="min-width:34%">
                    <p>项目名称：</p>
                    <span>{{list.comm.projectName}}</span>
                  </div>
                  <div style="min-width:36%">
                    <p>线杆编号：</p>
                    <span >{{list.comm.poleNo}}</span>
                  </div>
                   <div style="min-width:20%">
                    <p>紧急程度<span style="color:red">*</span>：</p>
                    <Radio-group :v-model="list.comm.id" @on-change="changelevel($event,list,newlists[index].device)" style="margin-top:0">
                      <Radio :label="bb.id" v-for="(bb,nums) in priorityName" :key="nums">
                          <span style="margin-right:10px;color:#FE3D3D" v-if="nums == 0">{{bb.priorityName}}</span>
                          <span style="margin-right:10px;color:#F6B36C" v-if="nums == 1">{{bb.priorityName}}</span>
                          <span style="margin-right:10px;color:#8DEC9B" v-if="nums == 2">{{bb.priorityName}}</span>
                      </Radio>
                  </Radio-group>
                  <span style="color:red;font-size:5px" v-if="checcklabel">请选择紧急程度</span>
                  </div>
                  
                </div>

                <!-- <div class="detail-title" style="margin-top:10px;" slot="content">
                  <p style="color:#1d60fe">设备信息</p>
                </div> -->

                <div class="content"  v-for="(aa,indexs) in list.device" :key="indexs" slot="content">
                    <div style="min-width:10%;position:relative" >
                      <img src="../../public/img/2142.png" v-if="aa.deviceType != '网关'"/>
                      <span style="position:absolute;left:7px;top:16px;color:#F6B46F">{{aa.devicePort}}</span>
                      <span style="position:absolute;left:0px;top:45px;color:#1D60FE" v-if="aa.deviceType != '网关'">{{aa.deviceType}}</span>
                      <!-- <span style="position:absolute;left:11px;top:45px;color:#1D60FE" v-if="aa.deviceType == '网关'">{{aa.deviceType}}</span> -->
                    </div>
                    
                    <!-- <div style="min-width:30%">
                      <p>设备类型：</p>
                      <span>{{aa.deviceType}}</span>
                    </div> -->
                    <div style="min-width:40%">
                      <p>故障设备MAC地址：</p>
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
                    <div style="min-width:90%;margin-left:10%;align-items:flex-start" >
                        <p >故障信息：</p>
                        <div style="display:block;width:100%;margin-top:0">
                        <div v-for="(list,num) in aa.detail" :key="num" style="margin-top:0">
                            <!-- <i-input type="textarea" :rows="4" :placeholder="list.alertDescription" style="width:50%;margin-right:10px" ></i-input><span style="margin-top:20px">检测时间：2018-11-05 09:40:58</span> -->
                            <span style="color:#ff3636">检测时间：{{list.monitorTime}}</span><span style="margin-left:15px;color:#ff3636">故障描述：{{list.descr}}</span>
                        </div>
                        </div>
                    </div>
                     <div style="min-width:90%;margin-left:10%">
                      <p>备注：</p>
                      <i-input type="textarea" :rows="4" placeholder="请输入..." v-model="aa.comment"></i-input>
                    </div>
                    <div style="min-width:90%;margin-left:10%">
                        <p>上传文件：</p>
                        <input type="file" multiple name="file" :id="aa.deviceMac" style="margin:20px 30px 20px 0;" @change="confirmupload(aa.deviceMac,index,indexs)"/> 
                    </div>
                   
            </div>


          





            </Panel>
    </Collapse>
            <div style="position:fixed;bottom:140px;left:50%">
            <button   class="zhuanyixukes" v-if="entersendwork" @click="aaaa">确认发送</button>
            <button   class="zhuanyixukes closebtn" @click="closedetails">关闭</button>
            </div>
          </div>




             
 
             
            




            <!-- <div style="height:400px;width:500px;"></div> -->


            </div>

            
        </div>
        </transition>

             <Modal
              v-model="modal1"
              title="事件追溯"
              width="550"
              >
              <p v-if="tracingdata.length == 0">无事件追溯</p>
              <p v-for="(list,index) in tracingdata" v-if="tracingdata.length > 0" :key="index">检测时间：{{list.createTime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事件内容：{{list.descr}}</p>
               <div slot="footer">
               </div>
          </Modal>
     </div>
       
      <!-- 点击ip弹窗 -->
             <ipDevice :workdetailshow="workdetailshow" :workdetaillist="workdetaillist" @closeworkdetailshow="closeworkdetailshow" @oldworkdata="oldworkdata" @changedata="changedata"/>
      <!-- 点击工单详情弹窗 -->
            <div class="workdetail" v-if="workdetail">
                <div class="detail-title" style="position: fixed;width: calc(70% - 50px);background: #fff;height:50px;margin-top:0">
                  <p>工单详情</p>
                </div>
                <div style="margin-top:70px">
                <div class="workdetail-top" v-for="(aaa,num) in remindlist" style="padding:5px 20px" :key="num">
                  <div class="workdetail-head" >
                    <img src="../../public/img/ct.png" style="margin-right:5px"/>
                    <p >催单时间：<span style="color:#1D60FE">{{aaa.remindTime}}</span></p>
                  </div>
                  <div class="workdetail-head">
                    <p >催单内容：<span style="color:#1D60FE">{{aaa.content}}</span></p>
                  </div>
                </div>
                </div>
                 <!-- <p class="workdetailtitle" style="margin-top: 10px">工单状态：<span style="color:#1D60FE">{{formlists.processStatus}}</span></p> -->
                 <div class="sendbox"  >
                   <img src="../../public/img/141.png"/>
                    流程信息
                 </div>
                 <div class="content" style="border:none;" >
                   <div style="min-width:20%">
                    <p>工单状态：</p>
                    <span>{{processlist.processStatus}}</span>
                  </div>
                  <div style="min-width:30%">
                    <p>当前处理人：</p>
                    <span>{{processlist.auditer}}</span>
                  </div>
                  <div style="min-width:40%">
                    <p>处理时间：</p>
                    <span>{{processlist.startTime}}</span>
                  </div>
                  <div style="min-width:100%">
                    <p>备注：</p>
                    <span>{{processlist.content}}</span>
                  </div>
                 </div>
                 <div class="sendbox" >
                   <img src="../../public/img/num.png"/>
                    派单信息
                 </div>
                 <div class="content" style="border:none;" v-for="(lists,index) in devicelist" :key="index">
                    <div style="min-width:100%">
                      <div style="display:block" >
                      <span style="font-size:16px">故障信息：</span>
                      <span v-for="(cc,indexs) in lists.detail"  :key="indexs" id="desrcspan" :style="indexs==0?'margin-left:0px':'margin-left:80px'">检测时间：{{cc.monitorTime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;故障描述：{{cc.descr}}<br /></span>
                      </div>
                    </div>
                    <div style="min-width:30%">
                      <p>端口号：</p>
                      <span  style="color:#F82A2A">{{lists.devicePort}}</span>
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
                 
                 <div style="position:fixed;top:6%;right:12%">
                 <button   class="zhuanyixukes" v-if="formlists.processStatus == '待确认'" @click="closetowork(formlists)">确认关闭工单</button>
                 <button   class="zhuanyixukes" v-if="formlists.processStatus == '待确认'" @click="backtowork(formlists)">退回</button>
                <button   class="zhuanyixukes closebtn" @click="closedetail">关闭</button>
                 </div>
            </div>

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

            <div class="reportbox" v-if="repoetshow">
                  <p class="detailpage">分析报告 <img src="../../public/img/xxx.png" @click.stop="closerebigmind" style="float:right;margin-top: 5px"/></p>
                  <div style="width: 450px;height: 250px;margin-left:65px" id="myCharts" ></div>
                  <div id="myChart" style="width: 450px;height: 250px;margin-left:65px" ></div>
                  <div  class="tablechangebox" v-if="this.dataone != []">
                  <i-table border :columns="columns1" :data="dataone" width="447"></i-table>
                  <p v-if="this.dataone.length > 0">分析建议：<span>{{dataone[0].description}}</span></p>
                  </div>
            </div>

            <div class="reportbox" style="width:640px;top:20%" v-if="timeOffsetAlertshow">
                  <p class="detailpage">事件偏移预警详情 <img src="../../public/img/xxx.png" @click.stop="timeOffsetAlertshow = false" style="float:right;margin-top: 5px"/></p>
                  <div class="offsetbox">
                     <p>预警信息：系统在<span >{{timeOffsetdata.currentTime}}</span>检测到摄像机 <span>{{timeOffsetdata.cameraTime}}</span>,请注意时间出现偏移</p>
                     <p style="margin:40px 0 20px 0px">系统时间：</p>
                     <div class="callinbox2" style="text-align:left">
                            <span>{{timeOffsetdata.currentYear}}</span>年
                            <span>{{timeOffsetdata.currentMonth}}</span>月
                            <span>{{timeOffsetdata.currentDay}}</span>日
                            <span>{{timeOffsetdata.currentHour}}</span>时
                            <span>{{timeOffsetdata.currentMin}}</span>分钟
                            <span>{{timeOffsetdata.currentS}}</span>秒
                    </div>
                     <p style="margin:40px 0 20px 0px">摄像机时间：</p>
                     <div class="callinbox" style="padding:0;text-align:left">
                            <span>{{timeOffsetdata.cameraYear}}</span>年
                            <span>{{timeOffsetdata.cameraMonth}}</span>月
                            <span>{{timeOffsetdata.cameraDay}}</span>日
                            <span>{{timeOffsetdata.cameraHour}}</span>时
                            <span>{{timeOffsetdata.cameraMin}}</span>分钟
                            <span>{{timeOffsetdata.cameraS}}</span>秒
                    </div>
                    <img src="../../public/img/1341.png" class="borderimg"/>
                    <p class="borderp">描述：时间偏移<span v-if="timeOffsetdata.diffDay">{{timeOffsetdata.diffDay}}天</span><span v-if="timeOffsetdata.diffHour">{{timeOffsetdata.diffHour}}时</span><span v-if="timeOffsetdata.diffMin">{{timeOffsetdata.diffMin}}分</span><span>{{timeOffsetdata.diffS}}秒</span></p>
                  </div>
            </div>


            <div class="reportbox" style="width:800px;" v-if="repoetmapshow">
                  <p class="detailpage">分析报告 <img src="../../public/img/xxx.png" @click.stop="closerebigmind" style="float:right;margin-top: 5px"/></p>
                  <div class="content" style="border:none">
                      <div  style="min-width:150px">
                        <p>立杆号：</p>
                        <span style="color: #696C6F;">{{rightlist.poleNo}}</span>
                      </div>
                      <div  style="min-width:150px">
                        <p>IP：</p>
                        <span style="color: #696C6F;">{{rightlist.gatewayIp}}</span>
                      </div>
                      <div style="min-width:380px">
                        <p>安装地址：</p>
                        <span style="color: #696C6F;">{{rightlist.installAddress}}</span>
                      </div>
                      <div  style="min-width:150px">
                        <p>经度：</p>
                        <span style="color: #696C6F;">{{rightlist.longitude}}</span>
                      </div>
                      <div style="min-width:172px">
                        <p>纬度：</p>
                        <span style="color: #696C6F;">{{rightlist.latitude}}</span>
                      </div>
                      <div style="min-width:160px">
                        <p>维护人员：</p>
                        <span style="color: #696C6F;">{{rightlist.maintenanceUser}}</span>
                      </div>
                     </div>
                   <div class="detail-text" style="margin:20px;min-height: 0px;">
                     <div style="left:75px;height:20px" class="fixedborder" v-if="reportlist.lan =='LAN8'"></div>
                        <img src="../../public/img/1.gif" style="left:59px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 2&&reportlist.lan =='LAN8'"/>
                        <img src="../../public/img/2.gif" style="left:59px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 1&&reportlist.lan =='LAN8'"/>
                        <p class="fixedtext" style="left:55px;bottom:20px" v-if="reportlist.lan =='LAN8'">摄像机</p>
                        <img src="../../public/img/1.gif" style="left:92px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 2&&reportlist.lan =='LAN7'"/>
                        <img src="../../public/img/2.gif" style="left:92px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 1&&reportlist.lan =='LAN7'"/>
                      <div style="left:110px;height:20px" class="fixedborder" v-if="reportlist.lan =='LAN7'"></div>
                        <p class="fixedtext" style="left:94px;bottom:20px" v-if="reportlist.lan =='LAN7'">摄像机</p>
                        <img src="../../public/img/1.gif" style="left:125px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 2&&reportlist.lan =='LAN6'"/>
                        <img src="../../public/img/2.gif" style="left:125px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 1&&reportlist.lan =='LAN6'"/>
                        <div style="left:142px;height:20px" class="fixedborder" v-if="reportlist.lan =='LAN6'"></div>
                        <p class="fixedtext" style="left:121px;bottom:20px" v-if="reportlist.lan =='LAN6'">摄像机</p>
                        <img src="../../public/img/1.gif" style="left:157px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 2&&reportlist.lan =='LAN5'"/>
                        <img src="../../public/img/2.gif" style="left:157px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 1&&reportlist.lan =='LAN5'"/>
                        <div style="left:174px;height:20px" class="fixedborder" v-if="reportlist.lan =='LAN5'"></div>
                        <p class="fixedtext" style="left:156px;bottom:20px" v-if="reportlist.lan =='LAN5'">摄像机</p>
                        <img src="../../public/img/1.gif" style="left:200px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 2&&reportlist.lan =='LAN4'"/>
                        <img src="../../public/img/2.gif" style="left:200px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 1&&reportlist.lan =='LAN4'"/>
                        <div style="left:215px;height:20px" class="fixedborder" v-if="reportlist.lan =='LAN4'"></div>
                        <p class="fixedtext" style="left:195px;bottom:20px" v-if="reportlist.lan =='LAN4'">摄像机</p>
                        <img src="../../public/img/1.gif" style="left:233px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 2&&reportlist.lan =='LAN3'"/>
                        <img src="../../public/img/2.gif" style="left:233px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 1&&reportlist.lan =='LAN3'"/>
                        <div style="left:250px;height:20px" class="fixedborder" v-if="reportlist.lan =='LAN3'"></div>
                        <p class="fixedtext" style="left:232px;bottom:20px" v-if="reportlist.lan =='LAN3'">摄像机</p>
                        <img src="../../public/img/1.gif" style="left:267px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 2&&reportlist.lan =='LAN2'"/>
                        <img src="../../public/img/2.gif" style="left:267px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 1&&reportlist.lan =='LAN2'"/>
                        <div style="left:285px;height:20px" class="fixedborder" v-if="reportlist.lan =='LAN2'"></div>
                        <p class="fixedtext" style="left:264px;bottom:20px" v-if="reportlist.lan =='LAN2'">摄像机</p>
                        <img src="../../public/img/1.gif" style="left:300px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 2&&reportlist.lan =='LAN1'"/>
                        <img src="../../public/img/2.gif" style="left:300px;width:35px;height:40px" class="fixedimgs" v-if="reportlist.isAlert == 1&&reportlist.lan =='LAN1'"/>
                        <div style="left:315px;height:20px" class="fixedborder" v-if="reportlist.lan =='LAN1'"></div>
                        <p class="fixedtext" style="left:298px;bottom:20px" v-if="reportlist.lan =='LAN1'">摄像机</p>
                      <img src="../../public/img/wg.png" style="width:400px;height:140px;margin-top: 25px;"/>
  
                       
                  </div>
                  <div style="display:flex;justify-content:space-between;padding:10px 40px;">
                    <div style="text-align:left;font-size:14px">
                          <p>IP地址：<span>{{reportlist.ipAddr}}</span></p>
                          <p style="margin-top:10px">设备名称：<span>摄像机</span></p>
                          <p style="margin-top:10px">安装地址：<span>{{reportlist.installAddress}}</span></p>
                    </div>
                    <div style="position:relative">
                    <ArcgisMapsmall :propsmap='datamap' v-if="datamap" style="position:static;height:150px;min-height:150px"/>
                    <p class="discription">{{datamap.discription}}</p>
                    </div>
              </div>
              </div>
   </div>
</template>
<script>
import ArcgisMap from "@/components/ArcgisMap";
import ArcgisMapsmall from "@/components/ArcgisMapsmall";
import ipDevice from "@/components/ipDevice";
import Vue from "vue";
// let echarts = require('echarts/lib/echarts');
export default {
  name: "safemanage",
  components: {
    ArcgisMap,
    ArcgisMapsmall,
    ipDevice
  },
  data() {
    return {
      processlist:[],
      alertshow:true,
      wgeachrtsshow:false,
      repoetshow:false,
      timeOffsetAlertshow:false,
      repoetmapshow:false,
      movealert:false,
      timelinelists:[],
      onetypelistlan:0,
      polenum:'',
      editorshow:true,
      devicestate:{},
      timeslist:{},
      bigrightshow2:false,
      tracingdata:[],
      modal1:false,
      timer:null,
      runtimer:null,
      mintime:60000,
      hadtime:true,
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
      rightdialogshow:true,
      checcklabel:false,
      datades:{},
      collegeIndex:'1',
      attachment:'',
      closetext:'',
      timeechartlist:[],
      workdetaillist:[],
      entersendwork:true,
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
      olddata:'',
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
      descriptiondata:[],
      columns1: [{title: '采样时间',key: 'creatTime', width:155,},
                {title: '网络延时',key: 'status',width:95,},
                {title: '丢包率',key: 'packetLoss',width:80,},
                 {title: '再ping一下',key:'ping',width:115,
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
                {title: '检测时间',key: 'gatewayStateUpdateTime',width:155,className:'updatetime'}
                ],
      data2: [],
      rightlist2:[],
    };
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
      "alert/warning/getAlertStatistics",
      {workType:'安全事件',requestModular:1},
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
                  if(value==1){
                  texts.push('在线');
                  }
                  else if (value ==0) {
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
						if(value.data[1]=="1")
							return "#8CC152";
						else if(value.data[1]=="0")
              return "#ED5565";
          }}
    },
    }]
        });
    },
    statusclick(index) {
      this.statusdata = true;
      this.rightdialogshow = false
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
      // console.log(this.timelinelist)
      this.timelinelist.forEach(el => {
        if (el.isAlert == 4) {
          el.description.forEach(data => { this.iplist = this.iplist.concat(data.id);})
        }
      });
      if(this.iplist.length > 0){
          this.$http.put("alert/warning/cleanAlert",{ alertIdListJson: this.iplist },res => {
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
          this.$http.get("alert/warning/getAlertStatistics",{workType:'安全事件',requestModular:1},res => {
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
      }else{
        this.$Message.error('请选择需要清除的警告');
      }
      
    },
    timers(i){
      clearInterval(this.timer)
      this.timer =  setInterval(() => { 
            this.$http.get(
              "alert/warning/getAlertStatistics",
              {workType:'安全事件',requestModular:1},
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
      this.statusdata = false
      // this.bigrightshow2 = false
      if(this.bigrightshow == true){
        this.bigrightshow = false
        this.getwayip = ''
         clearInterval(this.runtimer)
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
       this.$http.get("res/gis/getGatewayById?",{gatewayId:data},res=>{
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
          //安全事件信息
          this.$http.get("alert/warning/getDeviceInfo",{gateId:data,level:3,requestModular:1},res=>{
              this.descriptiondata = res.data[0].description
          },err=>{});

          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:data,requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
          },err=>{});

          // 信息栏信息
          this.$http.get("res/gis/getGatewayIndexAlert?",{gatewayIp:this.rightlist.gatewayIp},res=>{
              this.msglist = res.data
          },err=>{});

          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.rightlist.gatewayIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});

          //表格2
          this.$http.get("res/gis/getCrossGatewayByIp?",{gatewayIp:this.rightlist.gatewayIp},res=>{
              this.data2 = res.data.gateMapList
              this.datades = res.data
              this.data2.forEach (el=>{ if(el.isOnline == 1) { el.isOnline = '在线' }else{el.isOnline = '离线'}})
              // console.log(this.data2)
          },err=>{});

          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:data,workType:'安全事件'},res=>{
            if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:data,workType:'安全事件'},res=>{
            if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          

      },err=>{});
      this.$http.get("res/gis/getPortStatusByGatewayId?",{gatewayId:data},res=>{
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
     
       this.$http.get("res/gis/getGatewayById?",{gatewayId:data},res=>{
          this.rightlist = res.data
          //图表加载插口
           this.$http.get("res/resState/getLanDeviceType?",{gatewayId:data},res=>{
             this.LANshow = true
             this.devicetype = res.data
          },err=>{});

         //安全事件信息
          this.$http.get("alert/warning/getDeviceInfo",{gateId:data,level:3,requestModular:1},res=>{
              this.descriptiondata = res.data[0].description
          },err=>{});

          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:data,requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
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
          this.$http.get("res/gis/getGatewayIndexAlert?",{gatewayIp:this.rightlist.gatewayIp},res=>{
              this.msglist = res.data
          },err=>{});

          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.rightlist.gatewayIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});

          //表格2
          this.$http.get("res/gis/getCrossGatewayByIp?",{gatewayIp:this.rightlist.gatewayIp},res=>{
              this.data2 = res.data.gateMapList
              this.datades =  res.data
              this.data2.forEach (el=>{ if(el.isOnline == 1) { el.isOnline = '在线' }else{el.isOnline = '离线'}})
              // console.log(this.data2)
          },err=>{});

          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:data,workType:'安全事件'},res=>{
            if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:data,workType:'安全事件'},res=>{
            if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          

          setTimeout(() => {
          const el = document.querySelector(".detail-box");
          el.scrollTop = 0;
        },100)

      },err=>{});
      this.$http.get("res/gis/getPortStatusByGatewayId?",{gatewayId:data},res=>{
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
      this.$http.get("res/gis/getPortStatus?",{gatewayId:this.olddata},res=>{
          this.typelist = res.data
          if(res.data.teminalType == 2){
            this.type = '运维模式'
            this.phone = 'android'
          }else if(res.data.teminalType == 0){
             this.type = '工作模式'
             this.phone = 'apple'
          }
      },err=>{});
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
      this.checcklabel = false
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
        if(this.sendparam.length == this.newlists.length){
          this.entersendwork = true
        }
    },
    allowchangetype(){
      this.$http.put("res/gis/changePortStatus",{gatewayId:this.rightlist.id,portMap:this.changeobj},res=>{
        
      },err=>{});
      this.changeobj = {}
      this.typeone = true
      this.$http.get("res/gis/getPortStatusByGatewayId?",{gatewayId:this.olddata},res=>{
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
    boolping(){
      this.$Message.info('正在ping,请稍等');
      //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.rightlist.gatewayIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
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
        this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN6.deviceTypeCode,ipAddress:this.devicetype.LAN6.deviceIp},res=>{
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN6',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:this.olddata,port:'LAN6',requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
          },err=>{});
          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.devicetype.LAN6.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN6',workType:'安全事件'},res=>{
              if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN6',workType:'安全事件'},res=>{
              if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("res/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN6',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{lan:'LAN6',gatewayId:this.olddata},res=>{
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
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN5.deviceTypeCode,ipAddress:this.devicetype.LAN5.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
            //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN5',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
               
            }
          },err=>{}); 
          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:this.olddata,port:'LAN5',requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
          },err=>{});
          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.devicetype.LAN5.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN5',workType:'安全事件'},res=>{
              if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN5',workType:'安全事件'},res=>{
              if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("res/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN5',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{lan:'LAN5',gatewayId:this.olddata},res=>{
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
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN4.deviceTypeCode,ipAddress:this.devicetype.LAN4.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN4',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:this.olddata,port:'LAN4',requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
          },err=>{});
          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.devicetype.LAN4.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN4',workType:'安全事件'},res=>{
              if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN4',workType:'安全事件'},res=>{
              if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("res/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN4',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{lan:'LAN4',gatewayId:this.olddata},res=>{
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
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN3.deviceTypeCode,ipAddress:this.devicetype.LAN3.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN3',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:this.olddata,port:'LAN3',requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
          },err=>{});
          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.devicetype.LAN3.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN3',workType:'安全事件'},res=>{
              if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN3',workType:'安全事件'},res=>{
              if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("res/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN3',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{lan:'LAN3',gatewayId:this.olddata},res=>{
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
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN2.deviceTypeCode,ipAddress:this.devicetype.LAN2.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN2',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:this.olddata,port:'LAN2',requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
          },err=>{});
          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.devicetype.LAN2.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN2',workType:'安全事件'},res=>{
              if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN2',workType:'安全事件'},res=>{
              if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("res/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN2',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{lan:'LAN2',gatewayId:this.olddata},res=>{
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
        this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN1.deviceTypeCode,ipAddress:this.devicetype.LAN1.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN1',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:this.olddata,port:'LAN1',requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
          },err=>{});
          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.devicetype.LAN1.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
           //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN1',workType:'安全事件'},res=>{
              if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN1',workType:'安全事件'},res=>{
              if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("res/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN1',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{lan:'LAN1',gatewayId:this.olddata},res=>{
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
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN7.deviceTypeCode,ipAddress:this.devicetype.LAN7.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN7',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{});
          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:this.olddata,port:'LAN7',requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
          },err=>{});
          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.devicetype.LAN7.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN7',workType:'安全事件'},res=>{
              if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN7',workType:'安全事件'},res=>{
              if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("res/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN7',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{lan:'LAN7',gatewayId:this.olddata},res=>{
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
         this.$http.get("alert/warning/selectByDeviceTypeAndIp?",{deviceType:this.devicetype.LAN8.deviceTypeCode,ipAddress:this.devicetype.LAN8.deviceIp},res=>{
              // console.log(res)
              this.msgtypelist = res.data
          },err=>{});
          //发送工单按钮显示隐藏
          this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN8',onlyPort:1,workType:'安全事件',requestModular:1},res=>{
            if(res.data.alertId.length > 0){
                this.boolsend = true
                
            }
          },err=>{}); 
          //运维事件信息
          this.$http.get("alert/warning/getAlertByGatewayId",{gatewayId:this.olddata,port:'LAN8',requestModular:2},res=>{
              if(res.data.list.length>0){
                this.timelinelists = res.data.list
                this.alertshow = true
              }else{
                this.alertshow = false
              }
          },err=>{});
          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:this.devicetype.LAN8.deviceIp},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
          //当前工单
           this.$http.get("workflow/workflow/findFormListCurrent?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN8',workType:'安全事件'},res=>{
              if(res.data.form){
              this.nowworklist = res.data.form
            }else{
              this.nowworklist = []
            }
          },err=>{});

          //历史工单
          this.$http.get("workflow/workflow/findFormListHis?",{gatewayId:this.msgtypelist.gatewayId,lan:'LAN8',workType:'安全事件'},res=>{
              if(res.data.form){
              this.hisworklist = res.data.form
            }else{
              this.hisworklist = []
            }
          },err=>{});

          //通讯流图表
          this.$http.get("res/gis/getOnlineLanFlow?",{gatewayIp:this.rightlist.gatewayIp,lan:'LAN8',gatewayId:this.olddata},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{lan:'LAN8',gatewayId:this.olddata},res=>{
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
      this.checcklabel = false
       this.$refs.bright.style.overflow = "hidden"
       if(this.deviceValue == 0){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                this.workdetailsend = true
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 1){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN1',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                this.workdetailsend = true
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 2){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN2',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                this.workdetailsend = true
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 3){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN3',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                this.workdetailsend = true
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 4){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN4',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                this.workdetailsend = true
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 5){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN5',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                this.workdetailsend = true
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 6){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN6',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                this.workdetailsend = true
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 7){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN7',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                this.workdetailsend = true
              },err=>{});
          },err=>{});
       }else if(this.deviceValue == 8){
         this.$http.get("res/socGateway/getForWorkflow?",{gatewayId:this.olddata,port:'LAN8',onlyPort:0,workType:'安全事件',requestModular:1},res=>{
            for (let i = 0; i< res.data.workFlow.length;i++){
              this.$set(res.data.workFlow[i].comm,'workType','安全事件')
            }
              this.$http.post("workflow/workflow/initForm",{param:res.data.workFlow},res=>{
                this.newlists = res.data
                this.workdetailsend = true
              },err=>{});
          },err=>{});
       }
       
        
        //获取优先级id
       this.$http.get("workflow/common/findPriority",{},res=>{
            this.priorityName = res.data
          },err=>{});
     
      //  this.workdetailsend = true
      
    },
    gotodetal(id){
          this.workdetail = true
          this.$refs.bright.style.overflow = "hidden"

          //工单详情
          this.$http.get("workflow/workflow/findFormDetail?",{formId:id},res=>{
            //反馈信息
              this.feebacklist = res.data[0].feedback
            //催单信息
              this.remindlist = res.data[0].remind
            //派单信息故障
              this.devicelist = res.data[0].device
            //派单信息公有
              this.formlists = res.data[0].form
              //流程信息
            this.processlist = res.data[0].process
          },err=>{});
   
    },
    closedetail(){
          this.workdetail = false
          this.$refs.bright.style.overflow = "auto"
    },
    closedetails(){
          this.sendparam = []
          // this.entersendwork = false
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
        this.polenum = num
        this.onetypelistlan = 0
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
    closeworkdetailshow(data){
      this.workdetailshow = false
      this.$refs.bright.style.overflow = "auto"
    },
    aaaa(){
      if(this.sendparam.length == this.newlists.length){
           this.$http.post("workflow/workflow/startProcess",{param:this.sendparam},res=>{
           if(res.message == '派单成功'){
             this.$Message.info('派单成功');
             this.workdetailsend = false
             this.$refs.bright.style.overflow = "auto"
             this.backwgs()
           }
          },err=>{});
      }else{
        this.checcklabel = true
      }
     
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
    onetypelist(poleNos,lan){
      this.onetypelistlan = 1
      this.polenum = poleNos
      this.workdetailshow = true
      this.$refs.bright.style.overflow = "hidden"
      this.$http.get("res/pole/getPoleDeviceByNo?",{poleNo:poleNos,portName:lan},res=>{
               this.workdetaillist = res.data
          },err=>{});
    },
    allowchangetypeback(){
      this.changeobj = {}
      this.typeone = true
      this.$http.get("res/gis/getPortStatusByGatewayId?",{gatewayId:this.olddata},res=>{
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
    closebright(){
      this.getwayip = ''
      this.bigrightshow = false
      this.bigrightshow2 = false
      clearInterval(this.runtimer)
    },
    fun(){
      var cc=document.getElementsByClassName("bigright")[0];
      cc.style.cssText="z-index:100";
      var zz=document.getElementsByClassName("statusbox")[0];
      zz.style.cssText="z-index:20";
    },
    funs(){
      if(this.bigrightshow == true){
        var cc=document.getElementsByClassName("bigright")[0];
        cc.style.cssText="z-index:100";
        var zz=document.getElementsByClassName("statusbox")[0];
        zz.style.cssText="z-index:140";
      }
    },
    showrightdialog(){
       if(this.rightdialogshow == true){
         this.rightdialogshow = false
       }else{
         this.rightdialogshow = true
       }
    },
    breaktime(){
       this.hadtime = false
    },
    //事件追溯
    tracing(id){
      this.modal1 = true
       this.$http.get("alert/warning/selectEventByAlertId",{alertId:id},res=>{
               this.tracingdata = res.data
          },err=>{});
    },
    bigtable(){
      this.bigrightshow2 = false
      this.bigrightshow = true
      clearInterval(this.runtimer)
    },
    smalltable(){
      this.getwayip = ''
      this.bigrightshow = false
      this.bigrightshow2 = true
      this.$http.get("res/fullScreen/gatewayAlert",{gateId:this.olddata},res=>{
               this.rightlist2 = res.data[0]
                this.$http.get("res/fullScreen/alertTrendWeek?",{gatewayIp:this.rightlist2.gatewayIp},res=>{
                      this.rendWeek(res.data)
                },err=>{});

          },err=>{});

        this.$http.get("res/fullScreen/gatewayStatus?",{gatewayId:this.olddata},res=>{
                this.online(res.data.gatewayState)
            },err=>{});
        this.$http.get("res/fullScreen/gatewayTemphum?",{gatewayId:this.olddata,perfType:'temperature'},res=>{
                this.temperature(res.data.temperature,res.data.threshold)
            },err=>{});
        this.$http.get("res/fullScreen/gatewayTemphum?",{gatewayId:this.olddata,perfType:'humidity'},res=>{
                this.humidity(res.data.humidity,res.data.threshold)
            },err=>{});
        this.$http.get("res/fullScreen/gatewayShake?",{gatewayId:this.olddata,perf:'shake'},res=>{
               this.shake(res.data)
            },err=>{});
        this.$http.get("res/fullScreen/gatewayShake?",{gatewayId:this.olddata,perf:'running_times'},res=>{
               this.timeslist = res.data
               var that = this
               this.runtimer = setInterval(function () {
                 if (that.timeslist.runningTimes.second >= 0) {
                      that.timeslist.runningTimes.second = that.timeslist.runningTimes.second + 1
                    }
                    if (that.timeslist.runningTimes.second >= 60) {
                      that.timeslist.runningTimes.second = 0
                      that.timeslist.runningTimes.minutes = that.timeslist.runningTimes.minutes + 1
                    }
                    if (that.timeslist.runningTimes.minutes >= 60) {
                      that.timeslist.runningTimes.minutes = 0
                      that.timeslist.runningTimes.hours = that.timeslist.runningTimes.hours + 1
                    }
                    if (that.timeslist.runningTimes.hours >= 24) {
                      that.timeslist.runningTimes.hours = 0
                      that.timeslist.runningTimes.days = that.timeslist.runningTimes.days + 1
                    }
               },1000)
            },err=>{});
        this.$http.get("res/fullScreen/gatewayLanflow?",{gatewayId:this.olddata},res=>{
               this.devicekb(res.data)
            },err=>{});
        this.$http.get("res/fullScreen/gatewayPortDevice?",{gatewayId:this.olddata},res=>{
               this.devicestate = res.data
            },err=>{});
    },
    online(data){
        // 基于准备好的dom，初始化echarts实例
        let myCharts = this.$echarts.init(document.getElementById('myChartonline'))
        window.addEventListener("resize", function () {
          myCharts.resize();
        });
              // 绘制图表
              myCharts.setOption({
                  xAxis: {
            splitLine:'false',
                  name:'时间',
                  type:'time',
                  data: [],
          },
          tooltip: {
              trigger: "axis",
              formatter: function (params) {
                let date= new Date(params[0].data[0]).toLocaleString().replace(/:\d{1,2}$/,' '); //此为时间戳
                var res='<div><p>'+date+'</p></div>'
                for(var i=0;i<params.length;i++){
                    if(params[i].data[1] == 1){
                        params[i].data = '在线'
                    }else{
                        params[i].data = '离线'
                    }
                res+='<p>状态:'+params[i].data+'</p>'
                }
                return res;
                },
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
                  margin: 0,
                  axisTick: {
                      length: 0,
                      inside: true,
                      interval: 0,
                      show: false
                  },
                  
                  axisLabel: {
                      formatter: function (value) {
                        var texts = [];
                        if(value==1){
                        texts.push('在线');
                        }
                        else if (value ==0) {
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
                  if(value.data[1]=="1")
                    return "#8CC152";
                  else if(value.data[1]=="0")
                    return "#ED5565";
                }}
          }
          }, 
          //  {
          //       name: '',
          //       type: 'line',
          //       data: data,
          //       symbol: 'none',
          //       lineStyle: {
          //           normal: {
          //               color: '#59EE59',
          //               width: 1,
          //           }
          //       }
          //   }
          ]
              });
    },
    temperature(data,threshold){
         // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myCharttemperature'))
        window.addEventListener("resize", function () {
          myChart.resize();
        });
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
			    	type:'time',
            data: [],
            },
            tooltip: {
                trigger: "axis",
                // showDelay: 0,
                axisPointer: {
                    // type: "cross",
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        color:'#B8F2E8'
                    }
                }
            },
            grid:{
              left:30
            },
            yAxis: {
              name: '℃',
                // type: 'value',
                max: threshold+10,
                min:-40,
                splitNumber: 1,
                splitLine:{//去掉网格线
                    show:false
                },
                axisTick: {//去掉刻度
                    show: false
                }
            },
            series: [{
                // symbolSize: 4,
                name: '温度',
                data: data,
                type: 'line',
                lineStyle:{
                  color:'#6EDAB8',
                  width: 1,
                },
                itemStyle:{
                  color:'#6EDAB8',
                },
                markLine: {
                        symbol: ['none', 'none'],//去掉箭头
                        itemStyle: {
                            normal: {
                                lineStyle: { //全局的样式
                                    type: 'dashed',
                                    width: 1
                                }
                            }
                        },
                        data: [
                        {       label: {normal:{position:'middle',formatter:threshold+'℃警戒线'}},
                                yAxis: threshold, //平行于x轴且y轴值为6.5的标线
                                itemStyle: {
                                    normal: { color: '#F55959' } //线条颜色
                                }
                        },{       label: {normal:{position:'start',formatter:'-20 '}},
                                yAxis: -20, //平行于x轴且y轴值为6.5的标线
                                itemStyle: {
                                    normal: { color: '#F55959' } //线条颜色
                                }
                        }]

                },
                areaStyle: {color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: '#B8F2E8' // 0% 处的颜色
                      }, {
                          offset: 1, color: '#B8F2E8' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                  }}
              }]
            });
              
    },
    humidity(data,threshold){
         // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myCharthumidity'))
        window.addEventListener("resize", function () {
          myChart.resize();
        });
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
			    	name:'',
			    	type:'time',
            data: [],
        },
        tooltip: {
            trigger: "axis",
            // showDelay: 0,
            axisPointer: {
                // type: "cross",
                lineStyle: {
                    type: "dashed",
                    width: 1,
                    color:'#B8F2E8'
                }
            }
        },
        grid:{
          left:30
        },
        yAxis: {
          name: '%',
            type: 'value',
            max: function(value) { //设置y轴最大值
                return 120;
            },
            splitLine:{//去掉网格线
                show:false
            },
            axisTick: {//去掉刻度
                show: false
            }
        },
        series: [{
            // symbolSize: 4,
            name: '湿度',
            data: data,
            type: 'line',
            lineStyle:{
              color:'#6EDAB8',
              width: 1,
            },
            itemStyle:{
              color:'#6EDAB8',
            },
            markLine: {
                    symbol: ['none', 'none'],//去掉箭头
                    itemStyle: {
                        normal: {
                            lineStyle: { //全局的样式
                                type: 'dashed',
                                width: 1
                            }
                        }
                    },
                    data: [
                    {       label: {normal:{position:'middle',formatter:threshold+'%警戒线'}},
                            yAxis: threshold, //平行于x轴且y轴值为6.5的标线
                            itemStyle: {
                                normal: { color: '#F55959' } //线条颜色
                            }
                    }]

            },
            areaStyle: {color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0, color: '#B8F2E8' // 0% 处的颜色
                  }, {
                      offset: 1, color: '#B8F2E8' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
              }}
          }]
        });
              
    },
    shake(data){
      var aaa = [];

      for (var i = 0; i <= 180; i++) {
          var t = i / 180 * Math.PI;
          var r = 10;
          aaa.push([r, i]);
      }
      let myChart = this.$echarts.init(document.getElementById('myChartshake'))
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      myChart.setOption({
            tooltip: {
        formatter: '震动次数: '+data.shake
          },
          toolbox: {
              show: true,
              feature: {
                  // mark: {
                  //     show: true
                  // },
                  // restore: {
                  //     show: true
                  // },
                  // saveAsImage: {
                  //     show: true
                  // }
              }
          },
          polar: {
        "center": ["50%", "70%"], //整体的位置设置
              "radius": "120%",
      },
          angleAxis: {
        type: 'value',
        max: 360,
        startAngle: 180,
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        }
     },
     radiusAxis: {
        min: 0,
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        }
     },
        "series": [
          {
            "name": "指标",
            "type": "gauge",
            coordinateSystem: 'polar',
            zlevel:2,
            "startAngle": 180, //总的360，设置180就是半圆
            "endAngle": 0,
            min: 0,
            max: 5000,
            splitNumber: 1,
            "center": ["50%", "70%"], //整体的位置设置
            "radius": "120%",
            "axisLine": {
                "lineStyle": {
                    "width": 20, //柱子的宽度
                    "color": [[data.shakeFloat, "rgba(0,0,0,0.01)"], [1, "#dce3ec"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
                }
            },
            "axisTick": {
                "show": false
            },
            axisLabel: { //刻度标签
                              distance: -10,
                              color: '#C8C9CA',
                              fontSize: 12,
                          },
            "splitLine": {
                "show": false
            },
            "pointer": {
                "width": 5, //指针的宽度
                "length": "90%", //指针长度，按照半圆半径的百分比
                "color": "#000"
            },
            itemStyle: {
                    color: '#000'
                  },
            "title": {
                "show": true,
                "offsetCenter": [0, "25%"], //标题位置设置
                "textStyle": { //标题样式设置
                    "color": "#F99536",
                    "fontSize": 13,
                    "fontFamily": "微软雅黑",
                    "fontWeight": "bold"
                }
            },
            "detail": {
                "show": false
            },
            "data": [{ //显示数据
                "value": data.shake,
                "name": '震动次数:'+data.shake+'次'
            }]
        },
        {
        name: 'line',
        type: 'line',
        coordinateSystem: 'polar',
        zlevel:1,
        showSymbol: false,
        lineStyle: {
            normal: {
                width: 40,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0,
                        color: '#37C78B' // 0% 处的颜色
                    }, {
                        offset: 0.5,
                        color: '#F3E144' // 100% 处的颜色
                    }, {
                        offset: 1,
                        color: '#F76249' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        },
        data: aaa
      }
         ]
        });
    },
    devicekb(data){
      let myChart = this.$echarts.init(document.getElementById('myChartkb'))
        window.addEventListener("resize", function () {
          myChart.resize();
        });
         myChart.setOption({
           symbol: 'Kb',
           color: ['#F55959'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '{b}<br />{a}: {c}/kb'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : data.lan,
                    // data : ['刑事犯罪\n前科','刑事犯罪\n前科','LAN3\n电子围栏','LAN4\n电子围栏','LAN5\n电子围栏','LAN6\n电子围栏','LAN7\n电子围栏','LAN8\n电子围栏',],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {   name: 'Kb',
                    type : 'value',
                    scale: false,
                    min: 0,
                    max: function(value) { //设置y轴最大值
                    return value.max+200;
                    },
                    splitNumber: 1,
                    splitLine:{//去掉网格线
                        show:false
                    },
                    axisTick: {//去掉刻度
                        show: false
                    }
                }
            ],
            series : [
                {
                    name:'流量',
                    type:'bar',
                    barWidth: '60%',
                    data:data.flows
                }
            ]
         })
    },
    rendWeek(data){
       let myChart = this.$echarts.init(document.getElementById('myCharrendWeek'))
        window.addEventListener("resize", function () {
          myChart.resize();
        });
         myChart.setOption({
           tooltip: {
                trigger: 'axis'
            },
            legend: {
                top:10,
                data:['网关离线','端口插拔','流量异常','震动异常']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.day,
                // splitLine: {
                //         show: true,
                //         lineStyle: {
                //             // 使用深浅的间隔色
                //             color: ['#aaa', '#ddd']
                //         }
                //     },
            },
            yAxis: {
                type: 'value',
                // name: 'kg',
                min: 0,
                max: function(value) { //设置y轴最大值
                    return value.max+2;
                    },
                splitNumber: 1,
                axisTick: {
                        show: false
                    },
                axisLine: {
                        lineStyle: {
                            color: '#3f7fb2'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#000'
                        }
                    },
                    splitLine:{//去掉网格线
                        show:false
                    },

            },
            series: [
                {
                    name:'网关离线',
                    type:'line',
                    // stack: '总量',
                    data:data.gatewayOfflineAlert,
                    symbolSize:10,
                    itemStyle: {
                        normal: {
                            color: '#F04D4D',
                        }
                    }
                },
                {
                    name:'端口插拔',
                    type:'line',
                    // stack: '总量',
                    data:data.portFlowAlert,
                    symbol:'rect',
                    symbolSize:10,
                    itemStyle: {
                        normal: {
                            color: '#00B7EE',
                        }
                    }
                },
                {
                    name:'流量异常',
                    type:'line',
                    // stack: '总量',
                    data:data.illegalInvasionAlert,
                    symbol:'triangle',
                    symbolSize:10,
                    itemStyle: {
                        normal: {
                            color: '#ADE15F',
                        }
                    }
                },
                {
                    name:'震动异常',
                    type:'line',
                    // stack: '总量',
                    data:data.shockAbnormalAlert,
                    symbol:'diamond',
                    symbolSize:10,
                    itemStyle: {
                        normal: {
                            color: '#F7A945',
                        }
                    }
                },
            ]
         })
    },
    delwarns() {
      this.timelinelists.forEach(el => {
        if (el.isAlert != 0) {
          (el.nono = true), (el.isAlert = 5);
        }
      });
      this.movealert = true;
    },
    backs(){
      // 信息栏信息
      if(this.deviceValue != 0){
        this.$http.get("alert/warning/getAlertByGatewayId?",{gatewayId:this.olddata,requestModular: 2,port:'LAN'+this.deviceValue},res=>{
            
              this.timelinelists = res.data.list
              for (let i = 0; i < this.timelinelists.length; i++) {
             this.$set(this.timelinelists[i], "nono", false);
          }
          },err=>{});
      }else{
        this.$http.get("alert/warning/getAlertByGatewayId?",{gatewayId:this.olddata,requestModular: 2},res=>{
            
              this.timelinelists = res.data.list
              for (let i = 0; i < this.timelinelists.length; i++) {
             this.$set(this.timelinelists[i], "nono", false);
          }
          },err=>{});
      }
          
          this.movealert = false;
    },
    movewarns(){
        this.iplist = [];
      this.timelinelists.forEach(el => {
        if (el.isAlert == 4) {
          this.iplist = this.iplist.concat(el.id);
        }
      });
      console.log(this.timelinelists)
      if(this.iplist.length > 0){
          this.$http.put("alert/warning/cleanAlert",{alertIdListJson:this.iplist},res => {
          if(res.rel == true){
            this.$Message.success('清除警告成功');
            if(this.deviceValue != 0){
                  this.$http.get("alert/warning/getAlertByGatewayId?",{gatewayId:this.olddata,requestModular: 2,port:'LAN'+this.deviceValue},res=>{
                       if(res.data.list.length>0){
                          this.timelinelists = res.data.list
                          for (let i = 0; i < this.timelinelists.length; i++) {
                            this.$set(this.timelinelists[i], "nono", false);
                          }
                       }else{
                         this.timelinelists = []
                         this.alertshow = false
                       }
                    },err=>{});
                }else{
                  this.$http.get("alert/warning/getAlertByGatewayId?",{gatewayId:this.olddata,requestModular: 2},res=>{
                        if(res.data.list.length>0){
                          this.timelinelists = res.data.list
                          for (let i = 0; i < this.timelinelists.length; i++) {
                            this.$set(this.timelinelists[i], "nono", false);
                          }
                       }else{
                         this.timelinelists = []
                         this.alertshow = false
                       }
                    },err=>{});
            }
          this.movealert = false;

          }else if(res.rel == false){
            this.$Message.error('清楚警告失败');
          }
        },
        err => {}
      );
      }else{
        this.$Message.error('请选择需要清除的警告');
      }
    },
    checknonos(ip) {
      this.timelinelists.forEach(el => {
        if (el.id == ip) {
          (el.nono = false), (el.isAlert = 4);
        }
      });
    },
    checkicons(ip, imgcheck, status) {
      this.timelinelists.forEach(el => {
        if (el.id == ip ) {
          (el.nono = true), (el.isAlert = 5);
        }
      });
    },
    closerebigmind(){
      this.statustable = false
       this.repoetshow = false
       this.repoetmapshow = false
       this.wgeachrtsshow = false
       this.reportlist = []
    },
    //分析报告弹窗
    report(list){
      //通讯流图表
      if(list.alertType == 'deviationAlert'){
        this.reportlist = list
         this.$http.get("res/socGateway/getGatewayAndCamera",{cameraIp:list.ipAddr,gatewayId:this.olddata},res=>{
               this.datamap = res.data
               this.repoetmapshow = true
               this.repoetshow = false
               this.timeOffsetAlertshow = false
          },err=>{});
      }else if(list.alertType == 'timeOffsetAlert'){
               this.repoetmapshow = false
               this.repoetshow = false
         this.$http.get("alert/analysisReport/findTimeOffsetAlertDetailByIp",{ip:list.ipAddr},res=>{
               this.timeOffsetAlertshow = true
               this.timeOffsetdata = res.data
          },err=>{});
      }else{
        this.repoetmapshow = false
        this.timeOffsetAlertshow = false
        this.repoetshow = true
          this.$http.get("res/gis/getOnlineLanFlow?",{gatewayIp:list.ipAddr,lan:list.lan,gatewayId:list.gatewayId},res=>{
              this.drawLine(res.data.lanFlow)
          },err=>{});

          //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{lan:list.lan,gatewayId:list.gatewayId},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});

          //表格1
          this.$http.get("res/gis/getDevicePing?",{ipAddress:list.ipAddr},res=>{
              this.dataone = res.data
              this.dataone.forEach (el=>{ if(el.status == 1) { el.status = '通' }else{el.status = '不通'}})
          },err=>{});
      }     
    },
    see(){
      this.wgeachrtsshow = true
      //通讯状况表
          this.$http.get("res/gis/getGatewayState?",{gatewayId:this.olddata},res=>{
              this.drawLines(res.data.gatewayState)
          },err=>{});
    },
    oldworkdata(data){
       if(this.onetypelistlan == 1){
        this.$http.get("res/pole/getPoleDeviceByNo?",{poleNo:this.polenum,portName:'LAN'+this.deviceValue},res=>{
               this.workdetaillist = res.data
          },err=>{});
      }else{
        this.$http.get("res/pole/getPoleDeviceByNo?",{poleNo:this.polenum},res=>{
               this.workdetaillist = res.data
          },err=>{});
      }
    },
    changedata(data,index){
      this.workdetaillist[index].entity=data
      // console.log(data,index)
    }
  }
};
</script>
<style scoped>
.rightdialog {
  width: 260px;
  height: 340px;
  background: url("../../public/img/zzz.png")no-repeat center center/100% 100%;
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
  /* left: 0; */
  right: 0;
  /* margin: 0 auto; */
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
  width: 60px;
  padding: 0;
  border-radius: 0 4px 4px 0;
}
.timelinebox {
  padding: 20px;
  height: calc(100% - 74px);
  overflow: auto;
  padding-left: 30px;
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
  margin-bottom: 20px;
}
.hadpro a {
  color: #ff3636;
  border-bottom: 1px solid #1d60fe;
}
.time {
  position: absolute;
  left: -90px;
  top: -4pxpx;
  font-size: 14px;
}
.hour {
  position: absolute;
  left: -83px;
  top: 20px;
  font-size: 14px;
}

.bigright{
  min-width: 1100px;
  width: 62%;
  height: 100%;
  background:#fff;
  position: fixed;
  right: 0;
  top:60px;
  z-index: 200;
  transition: all 300ms;
}
.bigright2{
  min-width: 1200px;
  width: 90%;
  height: 100%;
  background:#fff;
  position: fixed;
  right: 0;
  top:60px;
  z-index: 200;
  transition: all 300ms;
  overflow: auto;
}
.fade-enter-active, .fade-leave-active {
  /* transition: opacity .5s */
}
.fade-enter, .fade-leave-active {
  transform: translate(500px,0px);
  /* opacity: 0 */
}
/* 详情 */
.detailpage{
  margin: 0px 20px;
  border-bottom: 1px solid #C7C7C7;
  font-size:16px;
  text-align: left;
  padding: 10px 0;
  cursor: pointer;
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
  cursor: pointer;
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
  width: calc(100% - 620px);
}
.detail-textbox div{
  margin-top: 15px;
}
.detail-textbox div span{
  display: inline-block;
}
.detail-textbox div span:first-child{
  /* margin-right: 10px; */
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
.content div  #desrcspan{
  color:#F82A2A;
  font-size:16px;
}
.iconobj{
  position: absolute;
  top: 55px;
  right: 260px;
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
.reportbox{
    top: 5%;
    /* left: 20%; */
    right: 150px;
    z-index: 99999;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.4) -2px 2px 8px;
    width: 600px;
    position: absolute;
    padding-bottom: 20px;
}
.fixedimgs{
    height: 40px;
    width: 35px;
    position: absolute;
    bottom: 75px;
}

</style>
