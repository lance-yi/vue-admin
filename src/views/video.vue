<template>
    <div style="padding-left: 260px;min-width: 1000px;padding-top: 60px">
        <div class="control-top">
                 <p>行政区域：</p>
                  <CheckboxGroup v-model="addresscode" @on-change="checkAllGroupChange">
                    <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选</Checkbox>
                    <Checkbox :label="list.areaCode" v-for="(list,index) in addcodelist" :key="index">
                        <span>{{list.areaName}}</span>
                    </Checkbox>
                  </CheckboxGroup>
        </div>
        <div class="control-top">
                 <p >安装地址：</p>
                 <i-input v-model="valueadd" placeholder="安装地址、IP、版本号、路口名称" style="width: 252px" ></i-input>
                 <p style="margin-left:31px">责任单位：</p>
                 <Select v-model="companylist" style="width:300px" multiple>
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <p style="margin-left:31px">项目名称：</p>
                 <Select v-model="projectname" style="width:300px" multiple>
                  <Option v-for="item in projectnamelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
        </div>
        <div class="control-top">
            <p>时间条件：
                      <Radio-group v-model="times"  @on-change="changetime($event)">
                        <Radio label="1">
                            <span>近一周</span>
                        </Radio>
                            <Radio label="自定义" >
                                <span></span>
                            </Radio>
                            <DatePicker   v-model="starttime" :options="startTimeOptions" @on-change="startTimeChange" format="yyyy/MM/dd" type="date" placement="bottom-end" placeholder="请选择开始日期" style="width: 200px"  :clearable="false"></DatePicker> — 
                            <DatePicker v-model="endtime" :options="endTimeOptions" @on-change="endTimeChange" format="yyyy/MM/dd" type="date" placement="bottom-end" placeholder="请选择结束日期" style="width: 200px" :clearable="false" ></DatePicker>
                    </Radio-group>
                  </p>
        </div>
        <div class="zhuanyixukes" style="width: 90px;margin: 0 auto;margin-top: 30px;" @click="serach">搜索</div>
        <div style="margin-right:20px;margin-top: 30px;">
        <i-table highlight-row stripe border :columns="columns1" :data="data1" ></i-table>
        </div>


        <div class="statusbox" v-if="echartsshow">
            <p class="detailpage"  style="text-align:center">摄像机视频状况<span style="color:#5386FE">（2018/11/12）</span><img src="../../public/img/xxx.png" @click.stop="echartsshow = false" style="position:absolute;right:20px;z-index: 2;top:20px"/></p>
            <div class="detail-title">
                  <img src="../../public/img/152.png"/>
                  <p>摄像机缺失统计</p>
            </div>
            <div style="height:300px;display:flex">
                <div id="echartsone" ></div>
                <div class="rightmain">
                    <img src="../../public/img/153.png" class="topimg"/>
                    <img src="../../public/img/154.png" class="bottomimg"/>
                    <p style="margin-bottom:15px">缺失统计</p>
                    <div class="maintext" v-for="(aa,index) in 8" :key="index">
                        <p>2018/11/12 06:00:00-09:00:00</p>
                        <p style="color:#999" v-if="index != 7">|</p>
                    </div>
                    <p style="margin-top:15px">总计缺失时长：<span style="color:#5386FE">20小时10分30秒</span></p>
                </div>
            </div>
            <div class="detail-title">
                  <img src="../../public/img/151.png"/>
                  <p>备录视频统计</p>
            </div>
            <div style="height:300px;display:flex">
                <div id="echartstwo" ></div>
                <div class="rightmain">
                    <img src="../../public/img/153.png" class="topimg" @click="bottomt"/>
                    <img src="../../public/img/154.png" class="bottomimg" @click="bottomb"/>
                    <p style="margin-bottom:15px">缺失统计</p>
                    <div class="maintext" v-for="(aa,index) in bottommainlist" :key="index" v-if="index >= (currentnew - 1) * 8 && index+1 <= (currentnew) * 8">
                        <span style="color:#999" v-if="!(index == 0 || index == (currentnew - 1)*8)">|</span>
                        <p >{{aa.finalTime}}</p>
                    </div>
                    <p style="position:absolute;bottom:-35px;left:80px">总计缺失时长：<span style="color:#5386FE">{{bottomlist.hour}}小时{{bottomlist.min}}分{{bottomlist.second}}秒</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import ArcgisMaplog from "@/components/ArcgisMaplog";
  export default {
    name: 'videomanage',
    components: {
        // ArcgisMaplog
    },
    data () {
      return {
          totalPages:0,
          currentnew:1,
          data2:[1,2,3,4],
          data1:[{userName:'大范甘迪发',name1:'1',name2:'1',name3:'0'},{userName:'但是',name1:'0',name2:'1',name3:'0'}],
          columns1:[],
          persontime:'',
          startTimeOptions: {
              disabledDate (date) {
                        return date && date.valueOf() > Date.now() ;
                    }
          }, //开始日期设置
          endTimeOptions: {
              disabledDate (date) {
                        return date && date.valueOf() > Date.now() ;
                    }
          }, //结束日期设置
          starttime: '', //开始日期model
          endtime: '',//结束日期model
          times:'1',
          projectnamelist:[{value:'sss',label:'sss'},{value:'szzzss',label:'szzzss'}],
          projectname:[],
          companylist:[],
          cityList: [],
          valueadd:'',
          addresscode:[],
          addcodelist:[],
          indeterminate: false,
          checkAll: false,
          echartsshow:false,
          bottomlist:[],
          bottommainlist:[],
      }
    },
    created(){
    },
    mounted(){
       this.columns1 = [ {title: '安装地址',key: 'userName'},
          {title: 'IP地址',key: 'userName',width:110,},
          {title: '项目名称',key: 'userName',width:100},
          {title: '行政区域',key: 'userName',width:80,},
          {title: '1',key: 'name1',width:30,
          render:(h,params)=>{
              return h('img',
              {attrs: 
              {src: (params.row.name1 == 1)?require('../../public/img/149.png'):require('../../public/img/150.png')},
              style:{'vertical-align':'middle',cursor:'pointer'},
              on: (params.row.name1 == 0)?{
                  click: () => {this.gotodetal(params.row.userName)}}:''
              },'img')}
              },
          {title: '2',key: 'name2',width:30,
          render:(h,params)=>{
              return h('img',{
                  attrs: 
                  {src: (params.row.name2 == 1)?require('../../public/img/149.png'):require('../../public/img/150.png')},style:{'vertical-align':'middle',cursor:'pointer'},
                   on: (params.row.name2 == 0)?{
                  click: () => {this.gotodetal(params.row.userName)}}:''
                 },'img')}
                  }
          ],
       this.$http.get("oauth/baseArea/selectAreaByParentCode?parentCode=420100",{},res=>{
              this.addcodelist = res.data
            },err=>{});
        this.$http.get("/oauth/dict/selectManagementUnit?",{dictCodes:'managementUnit'},res=>{
              this.cityList = res.data
            },err=>{});
    },
    methods: {
        handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.addresscode = ['420102','420103','420104','420105','420106','420107','420111','420112','420113','420114','420115','420116','420117','420118']
                } else {
                    this.addresscode = [];
                }
            },
       checkAllGroupChange (data) {
                if (data.length === 14) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
       changetime(val){
           if(val == '自定义'){
               
           }else{
               console.log(111)
              this.starttime = ''
              this.endtime = ''
           }
       },
       startTimeChange: function(e) { //设置开始时间
          console.log(e)
          this.starttime = e;
          this.endTimeOptions = {
          disabledDate: date => {
            let aa = new Date(this.starttime).valueOf() + 30 * 24 * 60 * 60 * 1000;
            let startTime = this.starttime ? new Date(this.starttime).valueOf() : '';
            return date && (date.valueOf() < startTime || date.valueOf() > Date.now() || date.valueOf() > aa);
            }
          }
        },
          endTimeChange: function(e) { //设置结束时间
          this.endtime = e;
          let bb = new Date(this.endtime).valueOf() - 30 * 24 * 60 * 60 * 1000;
          let endTime = this.endtime ? new Date(this.endtime).valueOf() : '';
          this.startTimeOptions = {
            disabledDate(date) {
               return date && date.valueOf() > endTime || date.valueOf() < bb || date.valueOf() > Date.now();
            }
          }
        },
        serach(){
            if(this.times == 1){

            }else{
                if(this.starttime == '' || this.endtime == ''){
                    this.$Message.error('请选择时间');
                }else{
                  console.log(this.starttime)
                }
                
            }
            
            this.columns1 = [ {title: '安装地址',key: 'userName'},
          {title: 'IP地址',key: 'userName',width:110,},
          {title: '项目名称',key: 'userName',width:100},
          {title: '行政区域',key: 'userName',width:80,},
          {title: '1',key: 'name1',width:30,render:(h,params)=>{return h('img',{attrs: {src: (params.row.name1 == 1)?require('../../public/img/149.png'):require('../../public/img/150.png')},style:{'vertical-align':'middle'},on: {click: () => {this.gotodetal(params.row.id)}}},'img')}},
          {title: '2',key: 'name2',width:30,render:(h,params)=>{return h('img',{attrs: {src: (params.row.name2 == 1)?require('../../public/img/149.png'):require('../../public/img/150.png')},style:{'vertical-align':'middle'},on: {click: () => {this.gotodetal(params.row.id)}}},'img')}},
           {title: '3',key: 'name3',width:30,render:(h,params)=>{return h('img',{attrs: {src: (params.row.name3 == 1)?require('../../public/img/149.png'):require('../../public/img/150.png')},style:{'vertical-align':'middle'},on: {click: () => {this.gotodetal(params.row.id)}}},'img')}}
          ]
            
        },
        gotodetal(name){
          this.currentnew=1
          this.echartsshow = true
          console.log(name)
          this.$http.get("res/ftpVideo/cameraVideoCoordinate?",{day:'2019-01-09',ipAddress:'192.168.8.63'},res=>{
              this.bottomlist = res.data
              this.bottommainlist = res.data.time.content
              this.totalPages = res.data.time.totalPages
            },err=>{});
        this.$http.get("res/ftpVideo/backupCameraVideo?",{day:'2019-01-09',ipAddress:'192.168.8.63'},res=>{
              setTimeout(() => {
            //   this.echartscamera()
              this.echartscamera2(res.data)
           }, 200);
            },err=>{});
          
        },
        //备录上一页
        bottomt(){
          if(this.currentnew == 1){
              this.$Message.info('已经是第一页了');
          }else{
             this.currentnew-- 
          }
        },
        //备录下一页
        bottomb(){
          if(this.currentnew == this.totalPages){
              this.$Message.info('已经是最后一页了');
          }else{
              this.currentnew++
          }
        },
        echartscamera(){
            let myChart = this.$echarts.init(document.getElementById('echartsone'))
            window.addEventListener("resize", function () {
            myChart.resize();
            });
            var date = '2016-08-09';
            var aa =  [{type: 'line',
                        lineStyle:{color:'#C1C1C1',type:'dashed'},
                        itemStyle:{opacity:'0'},
                        data: [{name: '均值1',value: ["2016-08-09 00:00:00", '缺失']}, 
                        { name: '均值2',value: ["2016-08-09 23:59:59", '缺失']}],
                    },
                    {
                        type: 'line',lineStyle:{color:'#C1C1C1',type:'dashed'},
                        itemStyle:{opacity:'0'},
                        data: [{name: '均值1',value: ["2016-08-09 00:00:00", '正常']}, 
                        {name: '均值2',value: ["2016-08-09 23:59:59", '正常']}],
                    },
                    {
                        type: 'line',
                        lineStyle:{color:'#00E115'},
                        data: [{ name: '均值1',value: ["2016-08-09 10:05:22", '正常']}, 
                        {name: '均值2',value: ["2016-08-09 15:05:22", '正常'] }],
                    },
                    {
                        type: 'line',
                        lineStyle:{color:'#E10000'},
                        data: [{name: '均值1',value: ["2016-08-09 02:05:22", '缺失']}, 
                        {name: '均值2',value: ["2016-08-09 04:05:22", '缺失']}],
                    },
                    
                ]
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                            formatter: '{c}'
                },
              xAxis: [{
                    type: 'time',
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    axisLabel: {
                        color: '#999',
                        // fontSize: 14
                    },
                    min: date + ' ' + '00:00:00',
                    max: date + ' ' + '23:59:59',
                    splitNumber: 10,
                    axisLabel: {
                        formatter: function(value) {
                            var date = new Date(value);
                            var h = date.getHours();
                            var m = date.getMinutes();
                            h = h < 10 ? '0' + h : h;
                            m = m === 0 ? m + '0' : m;
                            var time = h + ':' + m;
                            return time;
                        }
                    }
                }],
                yAxis: [{
                        type: 'category',
                        axisLine: {
                        lineStyle: {
                            color: '#999'
                            }
                        },
                        axisLabel: {
                            color: '#999',
                            // fontSize: 14
                        },
                        offset:0,
                        position:'left',
                        // name: 'AQI指数',
                        nameLocation: 'end',
                        nameGap: 20,
                        onZeroAsisIndex:0,
                        nameTextStyle: {
                            fontSize: 20
                        },
                        axisTick:{
                        alignWithLabel:true  
                        },
                        boundaryGap:false,
                        data:['', '缺失','正常','']
                    }
                ],
                series:aa
                        })
        },
        echartscamera2(data){
            let myChart = this.$echarts.init(document.getElementById('echartstwo'))
            window.addEventListener("resize", function () {
            myChart.resize();
            });
            var date = '2019-01-09'
            // var date = '2016-08-09';
            var aa =  [
                {
                        type: 'line',
                        // symbol: "roundRect",
                        lineStyle:{color: "#C1C1C1", type: "dashed"},
                        itemStyle:{opacity:"0"},
                        data: [{
                            name: '均值1',
                            value: ["2016-08-09 00:00:00", '备录']
                        }, {
                            name: '均值2',
                            value: ["2016-08-09 23:59:59", '备录']
                        }],

                    },
                    {
                        type: 'line',
                        // symbol: "roundRect",
                        lineStyle:{color:'#00E115'},
                        data: [{
                            name: '均值1',
                            value: ["2016-08-09 6:05:22", '备录']
                        }, {
                            name: '均值2',
                            value: ["2016-08-09 15:05:22", '备录']
                        }],

                    },
                    
                ]
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                            formatter: '{c}'
                },
              xAxis: [{
                    type: 'time',
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    axisLabel: {
                        color: '#999',
                        // fontSize: 14
                    },
                    min: date + ' ' + '00:00:00',
                    max: date + ' ' + '23:59:59',
                    splitNumber: 10,
                    axisLabel: {
                        formatter: function(value) {
                            var date = new Date(value);
                            var h = date.getHours();
                            var m = date.getMinutes();
                            h = h < 10 ? '0' + h : h;
                            m = m === 0 ? m + '0' : m;
                            var time = h + ':' + m;
                            return time;
                        }
                    }
                }],
                yAxis: [{
                        type: 'category',
                        axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                        },
                        axisLabel: {
                            color: '#999',
                            // fontSize: 14
                        },
                        offset:0,
                        position:'left',
                        // name: 'AQI指数',
                        nameLocation: 'end',
                        nameGap: 20,
                        onZeroAsisIndex:0,
                        nameTextStyle: {
                            fontSize: 20
                        },
                        axisTick:{
                        alignWithLabel:true  
                        },
                        boundaryGap:false,
                        data:['', '备录','']
                    }
                ],
                series:data
                        })
        }

    }
  }
</script>
<style scoped>
   .control-top{
      display: flex;
      margin-top: 20px;
      /* padding: 0 40px; */
      text-align: left;
    }
    .control-top p {
      font-size: 14px;
      min-width: 76px;
    }
    .ivu-checkbox-wrapper {
    cursor: pointer;
    font-size: 12px;
    display: inline-block;
    margin-right: 8px;
    min-width: 66px;
    margin-bottom: 10px;
    }
    .statusbox {
      width: 1040px;
      background: #fff;
      position: absolute;
      top: 8%;
      /* left: 0%; */
      right: 6%;
      /* margin: 0 auto; */
      box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.4);
      z-index: 1001;
      padding-bottom:20px;
      min-height:88%
    }
    .detailpage{
      margin: 0px 20px;
      font-size:16px;
      text-align: left;
      padding: 10px 0;
      color: #696C6F;
    }
    .detail-title{
    display: flex;
    font-size: 15px;
    border-bottom: 2px solid #979797;
    height: 40px;
    align-items: center;
    margin: 0 20px;
    }
    .detail-title p{
    margin-left: 10px;
    color: #696C6F;
    }
    #echartsone{
        width: 65%;
        height: 100%;
    }
    #echartstwo{
        width: 65%;
        height: 100%;
    }
    .rightmain{
        width: 35%;
        height: 100%;
        padding: 10px 20px 0px 0px;
        color: #696C6F;
        font-size: 13px;
        position: relative;
    }
    .maintext p{
        color: rgb(83, 134, 254);
            line-height: 15px;
    }
    .topimg{
        position: absolute;
        right: 45px;
        top: 45px;
    }
    .bottomimg{
       position: absolute;
        right: 45px;
        bottom: 32px;
    }
</style>
