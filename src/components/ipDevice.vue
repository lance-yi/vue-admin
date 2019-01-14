<template>
  <div class="workdetail" v-if="workdetailshow" @click.stop="workdetailshow = true">
    <div v-if="jwshow" style="position:absolute;top:43%;right: 0%;z-index: 555;" @click.stop="jwshow = true">
         <img src="../../public/img/xxx.png" @click.stop="jwshow = false" style="position:absolute;top:5%;left: 95%;z-index: 555;"/>
          <ArcgisMapsaddresjw  @lats='lats' @lons='lons'/>
       </div>
              <Tabs active-key="0" @on-click="editorshow = true,jwshow = false">
                <Tab-pane :label="list.portName ?list.deviceType+'('+list.portName+')':list.deviceType" :key="index" v-for="(list,index) in workdetaillist">
                  <div class="detail-title" style="margin-top:10px;">
                    <img src="../../public/img/20.png"/>
                    <p >基本信息</p>
                  </div>
                  <img src="../../public/img/xiaowg.png" style="position:absolute;top:-10px;width: 120px;" v-if="list.deviceType == '安全网关'"/>
                  <img src="../../public/img/dianzi.png" style="position:absolute;top:-6px" v-if="list.deviceType == '电子围栏'"/>
                  <img src="../../public/img/wifi.png" style="position:absolute;top:-6px" v-if="list.deviceType == 'wifi嗅探'"/>
                  <img src="../../public/img/shexiang.png" style="position:absolute;top:-6px" v-if="list.deviceType == '摄像机'"/>
                  <img src="../../public/img/139.png" style="position:absolute;top:-6px;width: 100px;" v-if="list.deviceType == '智能电源'"/>


                  <div class="content" style="border:none;" v-if="list.deviceType == 'wifi嗅探' || list.deviceType == '电子围栏'">
                    <div style="min-width:30%">
                        <p>编码：</p>
                        <span v-if="editorshow">{{list.entity.snCode}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.snCode" :placeholder="list.entity.snCode" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>品牌：</p>
                        <span v-if="editorshow">{{list.entity.manufacturer}}</span>
                        <Select v-model="list.entity.manufacturer" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.manufacturer" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>安装位置：</p>
                        <span v-if="editorshow">{{list.entity.installAddress}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.installAddress" :placeholder="list.entity.installAddress" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>维护人员：</p>
                        <span v-if="editorshow">{{list.entity.maintenanceUser}}</span>
                        <Select v-model="list.entity.maintenanceUserId" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in userlist.maintenanceUser" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>管理单位：</p>
                        <span v-if="editorshow">{{list.entity.managementUnit}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.managementUnit" :placeholder="list.entity.managementUnit" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>IP地址：</p>
                        <span >{{list.entity.ipAddress}}</span>
                        <!-- <Input v-if="!editorshow" v-model="list.entity.ipAddress" :placeholder="list.entity.ipAddress" style="width: 160px;margin-top: 0" /> -->
                      </div>
                      <div style="min-width:30%">
                        <p>MAC地址：</p>
                        <span v-if="editorshow">{{list.entity.mac}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.mac" :placeholder="list.entity.mac" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>附件：</p>
                        <span style="border-bottom:1px solid #1D60FE;cursor:pointer;margin-right:20px" @click="download(down)" v-for="(down,index) in list.entity.enclosureUrl" :key="index">{{down}}</span>
                      </div>
                      <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:10px;right:0%"  @click="edit" v-if="editorshow">编辑</button>
                      <button   class="zhuanyixuke"  style="padding:5px 30px;position:absolute;top:10px;right:105px"   v-if="!editorshow" @click="backeditor(index)">返回</button>
                       <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:10px;right:0%"   v-if="!editorshow" @click="saveeditor(list,index)">保存</button>
                  </div>

                  <div class="content" style="border:none;" v-if="list.deviceType == '安全网关'">
                    <div style="min-width:30%">
                        <p>中心端地址：</p>
                        <span v-if="editorshow">{{list.entity.centPortAddress}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.centPortAddress" :placeholder="list.entity.centPortAddress" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>本机地址：</p>
                        <span v-if="editorshow">{{list.entity.localAddress}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.localAddress" :placeholder="list.entity.localAddress" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>网关序列号：</p>
                        <span v-if="editorshow">{{list.entity.snCode}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.snCode" :placeholder="list.entity.snCode" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>网关IP：</p>
                        <span >{{list.entity.gatewayIp}}</span>
                        <!-- <Input v-if="!editorshow" v-model="list.entity.gatewayIp" :placeholder="list.entity.gatewayIp" style="width: 160px;margin-top: 0" /> -->
                      </div>
                      <div style="min-width:30%">
                        <p>MAC地址：</p>
                        <span v-if="editorshow">{{list.entity.mac}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.mac" :placeholder="list.entity.mac" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>经度：</p>
                        <span v-if="editorshow">{{list.entity.longitude}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.longitude" :placeholder="list.entity.longitude" style="width: 160px;margin-top: 0" @on-focus="jwmap(index)"/>
                      </div>
                      <div style="min-width:30%">
                        <p>纬度：</p>
                        <span v-if="editorshow">{{list.entity.latitude}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.latitude" :placeholder="list.entity.latitude" style="width: 160px;margin-top: 0" @on-focus="jwmap(index)"/>
                      </div>
                      <div style="min-width:30%">
                        <p>地址掩码：</p>
                        <span v-if="editorshow">{{list.entity.addressMask}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.addressMask" :placeholder="list.entity.addressMask" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>安装地址：</p>
                        <span v-if="editorshow">{{list.entity.installAddress}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.installAddress" :placeholder="list.entity.installAddress" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>管理单位：</p>
                        <span v-if="editorshow">{{list.entity.managementUnit}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.managementUnit" :placeholder="list.entity.managementUnit" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>维护人员：</p>
                        <span v-if="editorshow">{{list.entity.maintenanceUser}}</span>
                        <Select v-model="list.entity.maintenanceUserId" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in userlist.maintenanceUser" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>网关名称：</p>
                        <span v-if="editorshow">{{list.entity.gatewayName}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.gatewayName" :placeholder="list.entity.gatewayName" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>网关版本号：</p>
                        <span v-if="editorshow">{{list.entity.gatewayVersion}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.gatewayVersion" :placeholder="list.entity.gatewayVersion" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>系统时间：</p>
                        <span v-if="editorshow">{{list.entity.systemTime}}</span>
                        <DatePicker v-if="!editorshow" type="datetime" placeholder="选择时间" style="width: 160px;margin-top:0"  placement="top" @on-change="time"></DatePicker>
                      </div>
                      <div style="min-width:30%">
                        <p>出场时间：</p>
                        <span v-if="editorshow">{{list.entity.factoryTime}}</span>
                        <!-- <Input v-if="!editorshow" v-model="list.entity.factoryTime" :placeholder="list.entity.factoryTime" style="width: 160px;margin-top: 0" /> -->
                        <DatePicker v-if="!editorshow" type="datetime" placeholder="选择时间" style="width: 160px;margin-top:0"  placement="top" @on-change="times"></DatePicker>
                      </div>
                      <div style="min-width:30%">
                        <p>设备厂商：</p>
                        <span v-if="editorshow">{{list.entity.manufacturer}}</span>
                        <!-- <Input v-if="!editorshow" v-model="list.entity.manufacturer" :placeholder="list.entity.manufacturer" style="width: 160px;margin-top: 0" /> -->
                        <Select v-model="list.entity.manufacturer" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.manufacturer" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      </div>
                      <!-- <div style="min-width:30%">
                        <p>终端状态：</p>
                        <span v-if="list.entity.gatewayStatus  == 0">异常</span>
                        <span v-if="list.entity.gatewayStatus  == 1">正常</span>
                      </div> -->
                      <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:10px;right:0%"  @click="edit" v-if="editorshow">编辑</button>
                      <button   class="zhuanyixuke"  style="padding:5px 30px;position:absolute;top:10px;right:105px"   v-if="!editorshow" @click="backeditor(index)">返回</button>
                       <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:10px;right:0%"   v-if="!editorshow" @click="saveeditor(list,index)">保存</button>
                  </div>


                  

                  <div class="content" style="border:none;" v-if="list.deviceType == '智能电源'">
                    <div style="min-width:30%">
                        <p>子网掩码：</p>
                        <span v-if="editorshow">{{list.entity.addressMask}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.addressMask" :placeholder="list.entity.addressMask" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>行政区域：</p>
                        <span v-if="editorshow">{{list.entity.areaCode}}</span>
                        <Select v-model="list.entity.areaCode" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in arealist.areaCode" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>证书编号：</p>
                        <span v-if="editorshow">{{list.entity.certNum}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.certNum" :placeholder="list.entity.certNum" style="width: 160px;margin-top: 0" />
                      </div>
                      <!-- <div style="min-width:30%">
                        <p>证书登录密码：</p>
                        <span>{{list.entity.certPasswd}}</span>
                      </div> -->
                      <div style="min-width:30%">
                        <p>路口名称：</p>
                        <span v-if="editorshow">{{list.entity.crossVillage}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.crossVillage" :placeholder="list.entity.crossVillage" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>设备型号：</p>
                        <span v-if="editorshow">{{list.entity.devModel}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.devModel" :placeholder="list.entity.devModel" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>电源IP：</p>
                        <span >{{list.entity.electricIp}}</span>
                        <!-- <Input v-if="!editorshow" v-model="list.entity.electricIp" :placeholder="list.entity.electricIp" style="width: 160px;margin-top: 0" /> -->
                      </div>
                      <div style="min-width:30%">
                        <p>安装地址：</p>
                        <span v-if="editorshow">{{list.entity.installAddress}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.installAddress" :placeholder="list.entity.installAddress" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>安装地址详情：</p>
                        <span v-if="editorshow">{{list.entity.installAddressDetail}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.installAddressDetail" :placeholder="list.entity.installAddressDetail" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>端口数量：</p>
                        <span v-if="editorshow">{{list.entity.lanNum}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.lanNum" :placeholder="list.entity.lanNum" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>纬度：</p>
                        <span v-if="editorshow">{{list.entity.latitude}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.latitude" :placeholder="list.entity.latitude" style="width: 160px;margin-top: 0" @on-focus="jwmap(index)"/>
                      </div>
                      <div style="min-width:30%">
                        <p>经度：</p>
                        <span v-if="editorshow">{{list.entity.longitude}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.longitude" :placeholder="list.entity.longitude" style="width: 160px;margin-top: 0" @on-focus="jwmap(index)"/>
                      </div>
                      <div style="min-width:30%">
                        <p>MAC地址：</p>
                        <span v-if="editorshow">{{list.entity.mac}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.mac" :placeholder="list.entity.mac" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>责任人：</p>
                        <span v-if="editorshow">{{list.entity.maintenanceUser}}</span>
                        <Select v-model="list.entity.maintenanceUserId" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in userlist.maintenanceUser" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>责任人联系方式：</p>
                        <span v-if="editorshow">{{list.entity.maintenanceUserPhone}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.maintenanceUserPhone" :placeholder="list.entity.maintenanceUserPhone" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>负责单位：</p>
                        <span v-if="editorshow">{{list.entity.managementUnit}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.managementUnit" :placeholder="list.entity.managementUnit" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>负责单位电话：</p>
                        <span v-if="editorshow">{{list.entity.managementUnitPhone}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.managementUnitPhone" :placeholder="list.entity.managementUnitPhone" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>设备厂商：</p>
                        <span v-if="editorshow">{{list.entity.manufacturer}}</span>
                        <Select v-model="list.entity.manufacturer" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.manufacturer" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>电源类型：</p>
                        <span v-if="editorshow">{{list.entity.teminalType}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.teminalType" :placeholder="list.entity.teminalType" style="width: 160px;margin-top: 0" />
                      </div>
                     <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:10px;right:0%"  @click="edit" v-if="editorshow">编辑</button>
                      <button   class="zhuanyixuke"  style="padding:5px 30px;position:absolute;top:10px;right:105px"   v-if="!editorshow" @click="backeditor(index)">返回</button>
                       <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:10px;right:0%"   v-if="!editorshow" @click="saveeditor(list,index)">保存</button>
                  </div>

                  <div class="content" style="border:none;" v-if="list.deviceType == '摄像机'">
                    <div style="min-width:30%">
                        <p>设备名称：</p>
                        <span v-if="editorshow">{{list.entity.cameraName}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.cameraName" :placeholder="list.entity.cameraName" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>设备厂商：</p>
                        <span v-if="editorshow">{{list.entity.manufacturer}}</span>
                        <Select v-model="list.entity.manufacturer" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.manufacturer" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>设备型号：</p>
                        <span v-if="editorshow">{{list.entity.model}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.model" :placeholder="list.entity.model" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>安装地址：</p>
                        <span v-if="editorshow">{{list.entity.installAddress}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.installAddress" :placeholder="list.entity.installAddress" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>行政区域：</p>
                        <span v-if="editorshow">{{list.entity.areaCode}}</span>
                        <Select v-model="list.entity.areaCode" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in arealist.areaCode" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>国标编码：</p>
                        <span v-if="editorshow">{{list.entity.nationnalId}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.nationnalId" :placeholder="list.entity.nationnalId" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>摄像机编码格式：</p>
                        <span v-if="editorshow">{{list.entity.cameraCode}}</span>
                        <Select v-model="list.entity.cameraCode" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.cameraCode" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>安装时间：</p>
                        <span v-if="editorshow">{{list.entity.installTime}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.installTime" :placeholder="list.entity.installTime" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>补光类型：</p>
                        <span v-if="editorshow">{{list.entity.lightingType}}</span>
                        <Select v-model="list.entity.lightingType" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.lightingType" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>摄像机类型：</p>
                        <span v-if="editorshow">{{list.entity.cameraType}}</span>
                        <Select v-model="list.entity.cameraType" multiple style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.cameraType" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>录像保存天数：</p>
                        <span v-if="editorshow">{{list.entity.videoSaveDays}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.videoSaveDays" :placeholder="list.entity.videoSaveDays" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>联网属性：</p>
                        <span v-if="editorshow">{{list.entity.networkProperties?'未联网':'已联网'}}</span>
                        <Select v-model="list.entity.networkProperties" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.networkProperties" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>IPv4地址：</p>
                        <span >{{list.entity.ipAddress}}</span>
                        <!-- <Input v-if="!editorshow" v-model="list.entity.ipAddress" :placeholder="list.entity.ipAddress" style="width: 160px;margin-top: 0" /> -->
                      </div>
                      <div style="min-width:30%">
                        <p>MAC地址：</p>
                        <span v-if="editorshow">{{list.entity.mac}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.mac" :placeholder="list.entity.mac" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>IPv6地址：</p>
                        <span v-if="editorshow">{{list.entity.ipv6Address}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.ipv6Address" :placeholder="list.entity.ipv6Address" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>设备状态：</p>
                        <span v-if="editorshow">{{list.entity.deviceStatus?'异常':'正常'}}</span>
                        <Select v-model="list.entity.deviceStatus" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.deviceStatus" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>监控点位类型：</p>
                        <span v-if="editorshow">{{list.entity.pointType}}</span>
                        <Select v-model="list.entity.pointType" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.pointType" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>监控方位：</p>
                        <span v-if="editorshow">{{list.entity.cameraPosition}}</span>
                        <Select v-model="list.entity.cameraPosition" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.cameraPosition" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>点位名称：</p>
                        <span v-if="editorshow">{{list.entity.pointName}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.pointName" :placeholder="list.entity.pointName" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>维护人员：</p>
                        <span v-if="editorshow">{{list.entity.maintenanceUser}}</span>
                       <Select v-model="list.entity.maintenanceUserId" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in userlist.maintenanceUser" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                  </div>

                  <div class="detail-title" style="margin-top:10px;" v-if="list.deviceType == '摄像机'">
                    <img src="../../public/img/position.png"/>
                    <p >位置属性</p>
                  </div>
                  <div class="content" style="border:none;" v-if="list.deviceType == '摄像机'">
                      <div style="min-width:30%">
                        <p>经度：</p>
                        <span v-if="editorshow">{{list.entity.longitude}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.longitude" :placeholder="list.entity.longitude" style="width: 160px;margin-top: 0" @on-focus="jwmap(index)"/>
                      </div>
                      <div style="min-width:30%">
                        <p>纬度：</p>
                        <span v-if="editorshow">{{list.entity.latitude}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.latitude" :placeholder="list.entity.latitude" style="width: 160px;margin-top: 0" @on-focus="jwmap(index)"/>
                      </div>
                      <div style="min-width:30%">
                        <p>管理单位：</p>
                        <span v-if="editorshow">{{list.entity.managementUnit}}</span>
                        <Select v-model="list.entity.managementUnit" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.managementUnit" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:30%">
                        <p>是否上报：</p>
                        <span v-if="editorshow">{{list.entity.isReport?"否":"是"}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.isReport" :placeholder="list.entity.isReport" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>所属辖区公安机关：</p>
                        <span v-if="editorshow">{{list.entity.deptId}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.deptId" :placeholder="list.entity.deptId" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:30%">
                        <p>管理单位联系方式：</p>
                        <span v-if="editorshow">{{list.entity.managementPhone}}</span>
                        <Input v-if="!editorshow" v-model="list.entity.managementPhone" :placeholder="list.entity.managementPhone" style="width: 160px;margin-top: 0" />
                      </div>
                      <div style="min-width:100%">
                        <p>摄像机功能类型：</p>
                        <span v-if="editorshow">{{list.entity.cameraFunctionType}}</span>
                        <Select v-model="list.entity.cameraFunctionType" style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.cameraFunctionType" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:100%">
                        <p>摄像机位置类型：</p>
                        <span v-if="editorshow">{{list.entity.cameraPositionType}}</span>
                       <Select v-model="list.entity.cameraPositionType" multiple style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.cameraPositionType" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <div style="min-width:100%">
                        <p>所属部门行业：</p>
                        <span v-if="editorshow">{{list.entity.industry}}</span>
                        <Select v-model="list.entity.industry" multiple  style="width:160px;margin-top:0" v-if="!editorshow" placement="top">
                          <Option v-for="item in meun.industry" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </div>
                      <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:10px;right:0%"  @click="edit" v-if="editorshow">编辑</button>
                      <button   class="zhuanyixuke"  style="padding:5px 30px;position:absolute;top:10px;right:105px"   v-if="!editorshow" @click="backeditor(index)">返回</button>
                       <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:10px;right:0%"   v-if="!editorshow" @click="saveeditor(list,index)">保存</button>
                  </div>



                </Tab-pane>
                <!-- <Tab-pane label="标签二" key="key2">标签二的内容</Tab-pane> -->
            </Tabs>
            <img src="../../public/img/xxx.png" style="position:absolute;right:20px;top:10px" @click="closecard"/>
            <!-- <button   class="zhuanyixukes closebtn" @click="closecard">关闭</button> -->
            </div>

        
</template>

<script>
import ArcgisMapsaddresjw from "@/components/ArcgisMapsaddresjw";
export default {
  name: 'ipDevice',
  components: {
        ArcgisMapsaddresjw
    },
  props: {
    workdetailshow:{type:Boolean,},
    workdetaillist:{type:Array,}
  },
  data () {
    return {
      jwindex:0,
      latnum:'',
      lonnum:'',
      jwshow:false,
      arealist:[],
      meun:[],
      userlist:[],
      newdata:[],
      editorshow:true,
      olddata:[],
      vvv: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
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
    }
  },
//   watch:{
//         workdetailshow:{
//           handler: function(val,odlval) {
//               console.log(val)
//             //   this.workdetailshow = val
//           },
//           deep:true
//         },
      
//       },
  mounted(){
      
    },
  methods:{
    closecard(){
        this.jwshow = false
        this.editorshow = true
        this.$emit('closeworkdetailshow','false');
    },
    saveeditor(list,index){
      this.jwshow = false
      if(list.deviceType == '安全网关'){
        this.$http.post("res/socGateway/update",list.entity,res=>{
          this.$Message.info(res.message);
          setTimeout(() => {
              this.$emit('oldworkdata',this.olddata);
           }, 200);
          },err=>{ });
           
      }else if(list.deviceType == '摄像机'){
        this.$http.post("res/camera/edit",list.entity,res=>{
          this.$Message.info(res.message);
          setTimeout(() => {
              this.$emit('oldworkdata',this.olddata);
           }, 200);
          },err=>{});
  
           
      }else if(list.deviceType == 'wifi嗅探'){
        this.$http.post("res/WifiSniffing/edit",list.entity,res=>{
          this.$Message.info(res.message);
           setTimeout(() => {
              this.$emit('oldworkdata',this.olddata);
           }, 200);
          },err=>{});

          
      }else if(list.deviceType == '电子围栏'){
        this.$http.post("res/ElectronicFence/edit",list.entity,res=>{
          this.$Message.info(res.message);
          setTimeout(() => {
              this.$emit('oldworkdata',this.olddata);
           }, 200);
          },err=>{});
             

      }else if(list.deviceType == '智能电源'){
        this.$http.post("res/socElectrical/editElectrical",list.entity,res=>{
          this.$Message.info(res.message);
          setTimeout(() => {
              this.$emit('oldworkdata',this.olddata);
           }, 200);
          },err=>{});
             

      }
      setTimeout(() => {
               this.editorshow = true
           }, 200);

    },
    backeditor(index){
      this.$emit('oldworkdata',this.olddata);
      this.editorshow = true
      this.jwshow = false
    },
    edit(){
      this.olddata = this.workdetaillist
      this.$http.get("res/socGateway/getDeviceDic?pageKey=resources",{},res=>{
           this.meun = res.data
          },err=>{});
      this.$http.get("oauth/userMaintain/selectUser",{},res=>{
           this.userlist = res.data
          },err=>{});
      this.$http.get("oauth/baseArea/selectAreaByParentCodeEdit",{parentCode:420100},res=>{
           this.arealist = res.data
          },err=>{});
          this.editorshow = false
    },
    times(val){
      if(this.workdetaillist[0].deviceType == '安全网关'){
          this.workdetaillist[0].entity.factoryTime = val
      }
       
    },
    time(val){
      if(this.workdetaillist[0].deviceType == '安全网关'){
       this.workdetaillist[0].entity.systemTime = val
      }
    },
    jwmap(index){
        this.jwindex = index
        this.jwshow = true
      },
      lats(data){
        this.workdetaillist[this.jwindex].entity.latitude = data.toString()
        this.latnum = data
      },
      lons(data){
        console.log(data)
        this.workdetaillist[this.jwindex].entity.longitude = data.toString()
        this.lonnum = data
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
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
</style>
