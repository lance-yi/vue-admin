<template>
    <div class="bigbox">
      <p class="toptitle">武汉公安综合安全运维系统</p>
      <span class="toptime">数据更新日期：{{timedata}}&nbsp;<img src="../../public/img/116.png" style="vertical-align: middle"/></span>
      <div class="maintop">
         <div class="top-left">
           <p class="titletop">事件统计</p>
           <p class="titletops">安全事件：<span>{{conutlist.safeAlert}}</span> 条</p>
           <p class="titletops">运维事件：<span>{{conutlist.optionAlert}}</span> 条</p>
            <div class="threemsg" v-for="(list,index) in conutlist.latelyAlert" :key="index">
              <p style="display:flex;justify-content: flex-start">
                <span style="min-width:70px"><span class="oneicon"></span>安装地址：</span><span>{{list.installAddress}}</span>
              </p>
              <p style="margin-left:23px">
                <span >IP地址：{{list.ipAddr}}</span>
              </p>
              <p style="display:flex;margin-left:10px;justify-content: flex-start">
                <span style="min-width:60px">故障描述：</span><span >{{list.occurTime}}&nbsp;&nbsp;&nbsp;{{list.description}}</span>
              </p>
            </div>
         </div>
         <div class="top-right">
           <div style="display:flex;text-align:left;z-index:2">
            <div style="margin-left:10px;position:relative;cursor: pointer;" @click.stop="mapcheck(1)">
              <img src="../../public/img/24.png" v-if="mapchecks != 1"/>
              <img src="../../public/img/25.png" v-if="mapchecks == 1"/>
              <p style="position:absolute;font-size:14px;top: 7px;left: 12px;">地图总览</p>
              <p style="position:absolute;font-size:14px;top: 7px;left: 12px;color:#10FFF0" v-if="mapchecks == 1">地图总览</p>
            </div>
            <div style="margin-left:10px;position:relative;cursor: pointer;" @click.stop="mapcheck(2)">
              <img src="../../public/img/24.png" v-if="mapchecks != 2"/>
              <img src="../../public/img/25.png" v-if="mapchecks == 2"/>
              <p style="position:absolute;font-size:14px;top: 7px;left: 12px;">网关总览</p>
              <p style="position:absolute;font-size:14px;top: 7px;left: 12px;color:#10FFF0" v-if="mapchecks == 2">网关总览</p>
            </div>
            <div style="margin-left:10px;position:relative;cursor: pointer;"  @click.stop="mapcheck(3)">
              <img src="../../public/img/24.png" v-if="mapchecks != 3"/>
              <img src="../../public/img/25.png" v-if="mapchecks == 3"/>
              <p style="position:absolute;font-size:14px;top: 7px;left: 12px;">电源总览</p>
              <p style="position:absolute;font-size:14px;top: 7px;left: 12px;color:#10FFF0" v-if="mapchecks == 3">电源总览</p>
            </div>
           </div>
           <div class="mapdiv" v-if="mapchecks == 1">
              <ArcgisMapbig />
           </div>
           <div class="allnum" v-if="mapchecks == 1">
              <div id="echartsqq" >
              </div>
           </div>
           <div class="thermodynamic" v-if="mapchecks == 2">
              <div id="thermodynamicwg" ></div>
           </div>
           <div class="thermodynamics" v-if="mapchecks == 3">
              <div id="thermodynamicpmic" ></div>
           </div>
           <div class="runstatic" v-if="mapchecks == 2">
              <div id="echartsrunstatic" ></div>
           </div>
           <div class="pmicrunstatic" v-if="mapchecks == 3">
              <div id="echartspmicrunstatic" ></div>
           </div>
         </div>
      </div>
      <div class="maincenter">
         <div class="center-left">
            <div id="abnormalcount" ></div>
         </div>
         <div class="centers">
            <div id="device" ></div>
         </div>
         <div class="center-right">
            <div id="handle" ></div>
         </div>
      </div>
      <div class="mainbottom">
         <div id="camera" ></div>
      </div>
    </div>
</template>
<script>
import whjson from '../../public/wuhan.json'
import ArcgisMapbig from "@/components/ArcgisMapbig";
  export default {
    name: 'bigscreenshow',
    components: {
        ArcgisMapbig
    },
    data () {
      return {
          timer:null,
          mintime:60000,
          mapchecks:1,
          conutlist:[],
          cameradata:[],
          allnumdata1:[],
          allnumdata2:[],
          timedata:'',
      }
    },
    beforeDestroy() {
        if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
            clearInterval(this.timer); //关闭
        }
    },
    mounted(){
      this.new()
      this.timers()
    },
    methods: {
      timers(){
            this.timer =  setInterval(() => { 
                    this.new();
                }, this.mintime*1)
        },
      mapcheck(index){
         if(index == 1){
           this.mapchecks = 1
           setTimeout(() => {
              this.echartsallnum(this.allnumdata1,this.allnumdata2)
           }, 100);
           
         }else if(index == 2){
           this.mapchecks = 2
           setTimeout(() => {
              this.echartsruns(this.allnumdata1)
              this.echartsthermodynamic(this.allnumdata1)
           }, 100);
           
         }else if(index == 3){
           this.mapchecks = 3
           setTimeout(() => {
              this.echartspmicruns(this.allnumdata2)
              this.echartsthermodynamicpmic(this.allnumdata2)
           }, 100);
         }
      },
      new(){
        this.$http.get("res/screenDisplay/cameraOverview",{},res=>{
              //底部摄像机在线状态
              this.echartscamera(res.data)
              this.timedata=res.data.currentTime.date
            },err=>{});

        this.$http.get("res/screenDisplay/particular",{},res=>{
              //异常统计图表
              this.echartsabnormalcount(res.data)
            },err=>{});

        this.$http.get("res/screenDisplay/device",{},res=>{
              //接入设备统计图表
              this.echartsdevice(res.data)
            },err=>{});
        this.$http.get("res/screenDisplay/workFlow",{},res=>{
              //故障处理情况图表
              this.echartshandle(res.data)
            },err=>{});
        this.$http.get("res/screenDisplay/statistics",{},res=>{
              this.conutlist = res.data
            },err=>{});
        this.$http.get("res/screenDisplay/gatewayOverview",{},res=>{
             this.allnumdata1 = res.data
                this.$http.get("res/screenDisplay/electricOverview",{},res=>{
                  this.allnumdata2 = res.data
                  this.echartsallnum(this.allnumdata1,this.allnumdata2)
                },err=>{});
            },err=>{});
         
         
      },
      echartsthermodynamicpmic(data){
          var myChart = null;
        	var div_ = document.getElementById("thermodynamicpmic");
        	div_.removeAttribute("_echarts_instance_");
        	myChart = this.$echarts.init(div_);
        //  let myChart = this.$echarts.init(document.getElementById('echartsrunstatic'))
         window.addEventListener("resize", function () {
          myChart.resize();
         });
         this.$echarts.registerMap('wuhan', whjson);
          myChart.setOption({
              tooltip: {
                  trigger: 'item',
                  formatter: '{b}:{c}'
              },
              toolbox: {
                  show: false,
              },
              // visualMap: {
              //     min: 800,
              //     max: 50000,
              //     text:['High','Low'],
              //     realtime: false,
              //     calculable: true,
              //     bottom:50,
              //     textStyle:{
              //         color:"#00eaff"
              //     },
              //     inRange: {
              //         color: ['lightskyblue','yellow', 'orangered']
              //     }
              // },
              series: [
                  {
                      name: '重点人员在汉活动情况',
                      type: 'map',
                      mapType: 'wuhan', // 自定义扩展图表类型
                      roam:true,
                      zoom:'1.2',
                      itemStyle:{
                          normal: {
                          color: '#fff',
                          borderColor: 'rgba(62, 187, 185, 1)',
                          borderWidth: 1,
                          areaColor: {
                              type: 'radial',
                              x: 0.5,
                              y: 0.5,
                              r: 0.8,
                              colorStops: [{
                                  offset: 0,
                                  color: 'rgba(13,25,58, 0)' // 0% 处的颜色
                              }, {
                                  offset: 1,
                                  color: 'rgba(47,79,79, .2)' // 100% 处的颜色
                              }],
                              globalCoord: false // 缺省为 false
                          },
                          shadowColor: 'rgba(62, 187, 185, 1)',
                          // shadowColor: 'rgba(255, 255, 255, 1)',
                          shadowOffsetX: -2,
                          shadowOffsetY: 2,
                          shadowBlur: 10
                      },
                      emphasis: {
                          areaColor: '#389BB7',
                          borderWidth: 0,
                      }
                      },
                      label:{
                          normal:{
                            //  show: true,
                              textStyle:{
                                  color:"#fff"
                              },
                          },
                          emphasis: {
                                show: true,
                                textStyle: {
                                    color: '#57DC90'
                                }
                            }
                      },
                      data:data.areaStatics,
                      // 自定义名称映射
                      nameMap: {
                          'Central and Western': '江岸区',
                          'Eastern': '江汉区',
                          'Islands': '硚口区',
                          'Kowloon City': '汉阳区',
                          'Kwai Tsing': '武昌区',
                          'Kwun Tong': '洪山区',
                          'North': '青山区',
                          'Sai Kung': '东西湖区',
                          'Sha Tin': '蔡甸区',
                          'Sham Shui Po': '江夏区',
                          'Southern': '黄陂区',
                          'Tai Po': '新洲区',
                          'Tsuen Wan': '汉南区'
                      }
                  }
              ]
          });
      },
      echartsthermodynamic(data){
        // console.log(whjson)
        var myChart = null;
        	var div_ = document.getElementById("thermodynamicwg");
        	div_.removeAttribute("_echarts_instance_");
        	myChart = this.$echarts.init(div_);
        //  let myChart = this.$echarts.init(document.getElementById('echartsrunstatic'))
         window.addEventListener("resize", function () {
          myChart.resize();
         });
         this.$echarts.registerMap('wuhan', whjson);
          myChart.setOption({
              tooltip: {
                  trigger: 'item',
                  formatter: '{b}:{c}'
              },
              toolbox: {
                  show: false,
              },
              // visualMap: {
              //     min: 800,
              //     max: 50000,
              //     text:['High','Low'],
              //     realtime: false,
              //     calculable: true,
              //     bottom:50,
              //     textStyle:{
              //         color:"#00eaff"
              //     },
              //     inRange: {
              //         color: ['lightskyblue','yellow', 'orangered']
              //     }
              // },
              series: [
                  {
                      name: '重点人员在汉活动情况',
                      type: 'map',
                      mapType: 'wuhan', // 自定义扩展图表类型
                      roam:true,
                      zoom:'1.2',
                      itemStyle:{
                          normal: {
                          color: '#fff',
                          borderColor: 'rgba(62, 187, 185, 1)',
                          borderWidth: 1,
                          areaColor: {
                              type: 'radial',
                              x: 0.5,
                              y: 0.5,
                              r: 0.8,
                              colorStops: [{
                                  offset: 0,
                                  color: 'rgba(13,25,58, 0)' // 0% 处的颜色
                              }, {
                                  offset: 1,
                                  color: 'rgba(47,79,79, .2)' // 100% 处的颜色
                              }],
                              globalCoord: false // 缺省为 false
                          },
                          shadowColor: 'rgba(62, 187, 185, 1)',
                          // shadowColor: 'rgba(255, 255, 255, 1)',
                          shadowOffsetX: -2,
                          shadowOffsetY: 2,
                          shadowBlur: 10
                      },
                      emphasis: {
                          areaColor: '#389BB7',
                          borderWidth: 0,
                      }
                      },
                      label:{
                          normal:{
                            //  show: true,
                              textStyle:{
                                  color:"#fff"
                              },
                          },
                          emphasis: {
                                show: true,
                                textStyle: {
                                    color: '#57DC90'
                                }
                            }
                      },
                      data:data.areaStatics,
                      // 自定义名称映射
                      nameMap: {
                          'Central and Western': '江岸区',
                          'Eastern': '江汉区',
                          'Islands': '硚口区',
                          'Kowloon City': '汉阳区',
                          'Kwai Tsing': '武昌区',
                          'Kwun Tong': '洪山区',
                          'North': '青山区',
                          'Sai Kung': '东西湖区',
                          'Sha Tin': '蔡甸区',
                          'Sham Shui Po': '江夏区',
                          'Southern': '黄陂区',
                          'Tai Po': '新洲区',
                          'Tsuen Wan': '汉南区'
                      }
                  }
              ]
          });
      },
      echartsruns(data){
          var myChart = null;
        	var div_ = document.getElementById("echartsrunstatic");
        	div_.removeAttribute("_echarts_instance_");
        	myChart = this.$echarts.init(div_);
        //  let myChart = this.$echarts.init(document.getElementById('echartsrunstatic'))
         window.addEventListener("resize", function () {
          myChart.resize();
         });
          myChart.setOption({
            "title": {
            "text": "各区域网关运行状态",
            "left": "10",
            "top": "0",
            "textStyle": {
              "color": "#D4FFF9",
              "fontSize":"14"
            }
          },
            legend: {
                top: 20,
                right:20,
                textStyle:{
                    color:'#fff',
                },
                data: ['故障', '总数']
            },
            tooltip: {
                //trigger(触发类型)，可选'item','axis','none'
                trigger: 'axis',
                axisPointer: {
                    //指示器类型,可选'line','shadow','cross'
                    type: 'shadow'
                },
            },
            //echarts图表的相对于容器的布局,
            grid: {
            // "top": "20%"
              x:60,
              y:50,
              x2:10,
              y2:30,
          },
            xAxis: [{
                type: 'value',
                splitLine: {
                    show: false,
                },
                max:data.totalCount[0],
                //axisTick 坐标轴刻度相关设置
                axisTick: {
                    show: true
                },
                //axixLine 坐标轴轴线相关设置
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                    }
                },
                //axisLabel 坐标轴刻度标签的相关设置
                axisLabel: {
                    show: true,
                }
            }, ],
            yAxis: [{
                type: 'category',
                data:data.area,
                // axisLabel: {
                //     show: false,
                //     color: '#fff',
                //     fontSize: 14,
                // },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false
                },
            }, {
                type: 'category',
                data: [],
                axisLabel: {
                    show: false,
                    color: '#fff',
                    fontSize: 14,
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false
                },
            }, ],
            series: [{
                    name: '故障',
                    type: 'bar',
                    data: data.alert,
                    barWidth: '20',
                    z: 2,
                    itemStyle: {
                        normal: {
                        // barBorderRadius: 50,
                        color: 'rgb(247,92,61)',
                        label: {
                                "show": true,
                                "position": ['100%', '20%'],
                                color: '#000',
                                fontSize:14,
                                formatter: function(p) {
                                    return p.value;
                                }
                            }
                        }  
                    },
                },
                {   
                    name: '总数',
                    type: 'bar',
                    data: data.all,
                    barWidth: '20',
                    // barGap 不同系列的柱间距离
                    barGap: '-100%',
                    z: 1,
                    itemStyle: {
                        //barBorderRadius bar圆角半径
                        // barBorderRadius: 50,
                        normal: {
                        // barBorderRadius: 50,
                        color: 'rgb(13,255,235)',
                        // label: {
                        //         "show": true,
                        //         position: ["400","20%"],
                        //         color: 'rgb(13,255,235)',
                        //         fontSize:14,
                        //         formatter: function(p) {
                        //             return p.value;
                        //         }
                        //     }
                        }  
                    },
                },
                {

                    type: 'bar',
                    yAxisIndex: 1,
                    // barGap: '-100%',
                    data: data.totalCount,
                    barWidth: '20',
                    z: 0,
                    itemStyle: {
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
                        "color": "rgba(22,139,147,0.2)"
                      },
                      {
                        "offset": 0.5,
                        "color": "rgba(20,132,141,0.5)"
                      },
                      {
                        "offset": 1,
                        "color": "rgba(20,145,151,0.8)"
                      }
                    ],
                      "globalCoord": false
                    },
                  
                  }
                    },
                },
            ]
          })
      },
      echartspmicruns(data){
         var myChart = null;
        	var div_ = document.getElementById("echartspmicrunstatic");
        	div_.removeAttribute("_echarts_instance_");
        	myChart = this.$echarts.init(div_);
        //  let myChart = this.$echarts.init(document.getElementById('echartsrunstatic'))
         window.addEventListener("resize", function () {
          myChart.resize();
         });
          myChart.setOption({
            "title": {
            "text": "各区域电源运行状态",
            "left": "10",
            "top": "0",
            "textStyle": {
              "color": "#D4FFF9",
              "fontSize":"14"
            }
          },
            legend: {
                top: 20,
                right:20,
                textStyle:{
                    color:'#fff',
                },
                data: ['故障', '总数']
            },
            tooltip: {
                //trigger(触发类型)，可选'item','axis','none'
                trigger: 'axis',
                axisPointer: {
                    //指示器类型,可选'line','shadow','cross'
                    type: 'shadow'
                },
            },
            //echarts图表的相对于容器的布局,
            grid: {
            // "top": "20%"
              x:60,
              y:50,
              x2:10,
              y2:30,
          },
            xAxis: [{
                type: 'value',
                splitLine: {
                    show: false,
                },
                max:data.totalCount[0],
                //axisTick 坐标轴刻度相关设置
                axisTick: {
                    show: true
                },
                //axixLine 坐标轴轴线相关设置
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                    }
                },
                //axisLabel 坐标轴刻度标签的相关设置
                axisLabel: {
                    show: true,
                }
            }, ],
            yAxis: [{
                type: 'category',
                data:data.area,
                // axisLabel: {
                //     show: false,
                //     color: '#fff',
                //     fontSize: 14,
                // },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false
                },
            }, {
                type: 'category',
                data: [],
                axisLabel: {
                    show: false,
                    color: '#fff',
                    fontSize: 14,
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false
                },
            }, ],
            series: [{
                    name: '故障',
                    type: 'bar',
                    data: data.alert,
                    barWidth: '20',
                    z: 2,
                    itemStyle: {
                        normal: {
                        // barBorderRadius: 50,
                        color: 'rgb(247,92,61)',
                        label: {
                                "show": true,
                                "position": ['100%', '20%'],
                                color: '#000',
                                fontSize:14,
                                formatter: function(p) {
                                    return p.value;
                                }
                            }
                        }  
                    },
                },
                {   
                    name: '总数',
                    type: 'bar',
                    data: data.all,
                    barWidth: '20',
                    // barGap 不同系列的柱间距离
                    barGap: '-100%',
                    z: 1,
                    itemStyle: {
                        //barBorderRadius bar圆角半径
                        // barBorderRadius: 50,
                        normal: {
                        // barBorderRadius: 50,
                        color: 'rgb(13,255,235)',
                        // label: {
                        //         "show": true,
                        //         position: ["400","20%"],
                        //         color: 'rgb(13,255,235)',
                        //         fontSize:14,
                        //         formatter: function(p) {
                        //             return p.value;
                        //         }
                        //     }
                        }  
                    },
                },
                {

                    type: 'bar',
                    yAxisIndex: 1,
                    // barGap: '-100%',
                    data: data.totalCount,
                    barWidth: '20',
                    z: 0,
                    itemStyle: {
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
                        "color": "rgba(22,139,147,0.2)"
                      },
                      {
                        "offset": 0.5,
                        "color": "rgba(20,132,141,0.5)"
                      },
                      {
                        "offset": 1,
                        "color": "rgba(20,145,151,0.8)"
                      }
                    ],
                      "globalCoord": false
                    },
                  
                  }
                    },
                },
            ]
          })
      },
      echartsallnum(data1,data2){
          var myChart = null;
        	var div_ = document.getElementById("echartsqq");
        	div_.removeAttribute("_echarts_instance_");
        	myChart = this.$echarts.init(div_);
        //  let myChart = this.$echarts.init(document.getElementById('echartsqq'))
         window.addEventListener("resize", function () {
          myChart.resize();
         });
         myChart.setOption({
           "title": [{
            "text": "安全运维网关",
            "left": "center",
            "top": "10",
            "textStyle": {
              "color": "#D4FFF9",
              "fontSize":"16"
            }
          },{
            "text": "总   数："+data1.total,
            "left": "center",
            "top": "157",
            "textStyle": {
              "color": "#10FFF0",
              "fontSize":"14"
            }
          },{
            "text": "故障数："+data1.alertGateway,
            "left": "center",
            "top": "180",
            "textStyle": {
              "color": "#10FFF0",
              "fontSize":"14"
            }
          },{
            "text": "智能电源终端",
            "left": "center",
            "top": "238",
            "textStyle": {
              "color": "#D4FFF9",
              "fontSize":"16"
            }
          },{
            "text": "总   数："+data2.total,
            "left": "center",
            "top": "380",
            "textStyle": {
              "color": "#10FFF0",
              "fontSize":"14"
            }
          },{
            "text": "故障数："+data2.alertElectric,
            "left": "center",
            "top": "403",
            "textStyle": {
              "color": "#10FFF0",
              "fontSize":"14"
            }
          }],
          series: [{
              type: 'liquidFill',
              data: [data1.proportion, data1.proportion],
              radius: '110',
              // 水球颜色
              color: ['#A24B44','#FC3F3B'],
              center: ['50%', '100'],
              // outline  外边
              outline: {
                  // show: false
                  borderDistance: 2,
                  itemStyle: {
                      borderWidth: 2,
                      borderColor: '#01EEFC',
                  },
              },
              label: {
                  normal: {
                      // textStyle: {
                          color: '#fff',
                          // insideColor: 'yellow',
                          fontSize: 16
                      // }
                  }
              },
              // 内图 背景色 边
              backgroundStyle: {
                  color: 'rgba(4,24,74,0.8)',
                  // borderWidth: 5,
                  // borderColor: 'red',
              }
          },{
              type: 'liquidFill',
              //data: [0.6, 0.5, 0.4, 0.3],
              data: [data2.proportion, data2.proportion],
              radius: '110',
              // 水球颜色
              color: ['#FC3F3B', '#A24B44'],
              center: ['50%', '320'],
              // outline  外边
              outline: {
                  // show: false
                  borderDistance: 2,
                  itemStyle: {
                      borderWidth: 2,
                      borderColor: '#02EFB7',
                  },
              },
              label: {
                  normal: {
                      textStyle: {
                          color: '#fff',
                          // insideColor: 'yellow',
                          fontSize: 16
                      }
                  }
              },
              // 内图 背景色 边
              backgroundStyle: {
                  color: 'rgba(4,24,74,0.8)',
                  // borderWidth: 5,
                  // borderColor: 'red',
              }
          }]
         })
      },
      echartshandle(data){
        var myRate1 = data.defaultWorkflowTotal;
        let myChart = this.$echarts.init(document.getElementById('handle'))
         window.addEventListener("resize", function () {
          myChart.resize();
        });
         myChart.setOption({
            title: [{
              text: '故障处理情况',
              "left": "10",
              "top": "10",
              "textStyle": {
                "color": "#D4FFF9",
                "fontSize":"14"
              }
            },{
                x: "16%",
                bottom: 5,
                text: '已处理',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 12,
                    color: "#fff"
                },
            }, {
                x: "46%",
                bottom: 5,
                text: '工单数量',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 12,
                    color: "#fff"
                },
            }, {
                x: "76%",
                bottom: 5,
                text: '未处理',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 12,
                    color: "#fff"
                },
            }],
            tooltip: {
                show: true,
            },
            series: [{
                type: 'gauge',
                center: ['50%', '55%'], // 默认全局居中  
                radius: '50%',
                splitNumber: 5, //刻度数量
                min: 0,
                max: myRate1,
                startAngle: 200,
                endAngle: -20,
                clockwise: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        shadowBlur: 0,
                        color: [
                            [1, '#03B7C9']
                        ]
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#03B7C9',
                        width: 1
                    },
                    length: -5,
                    splitNumber: 5
                },
                splitLine: {
                    show: true,
                    length: -8,
                    lineStyle: {
                        color: '#03B7C9',
                    }
                },
                axisLabel: {
                    distance: -20,
                    textStyle: {
                        color: "#03B7C9",
                        fontSize: "10",
                        fontWeight: "bold"
                    }
                },
                pointer: { //仪表盘指针
                    show: 0
                },
                detail: {
                    show: false
                },
                data: [{
                    name: "",
                    value: myRate1
                }]
            }, {
                startAngle: 200,
                endAngle: -20,
                type: 'gauge',
                center: ['50%', '55%'], // 默认全局居中  
                radius: '45%',
                min: 0,
                max: myRate1,
                splitNumber: 0,
                axisLine: { // 坐标轴线  
                    lineStyle: {
                        color: [
                            [0.66, '#dddddd'],
                            [1, '#dddddd']
                        ], // 属性lineStyle控制线条样式  
                        width: 1
                    }
                },


                axisLabel: { // 坐标轴小标记  
                    textStyle: { // 属性lineStyle控制线条样式  
                        fontWeight: 'bolder',
                        fontSize: 10,
                        color: 'rgba(30,144,255,0)',
                    }
                },
                splitLine: { // 分隔线  
                    length: 8, // 属性length控制线长  
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式  
                        width: 0,
                        color: '#444'
                    }
                },
                pointer: { // 分隔线 指针  
                    color: '#666666',
                    width: 0,
                    length: 230
                },
                detail: {
                    show: false
                },

            }, {
                name: '工单数量',
                type: 'gauge',
                startAngle: 200,
                endAngle: -20,
                radius: '40%',
                center: ['50%', '55%'], // 默认全局居中  

                min: 0,
                max: myRate1,

                axisLine: {
                    show: false,
                    lineStyle: {
                        width: 10,
                        shadowBlur: 0,
                        color: [
                            [0.2, '#00FAFC'],
                            [0.4, '#3BD542'],
                            [0.6, '#E3F424'],
                            [0.8, '#7E48DA'],
                            [1, '#E531A8']
                        ]
                    }
                },
                axisTick: {
                    show: false,

                },
                splitLine: {
                    show: false,
                    length: 20,
                },

                axisLabel: {
                    show: false
                },
                pointer: {
                    show: true,
                    "width": 3, //指针的宽度
                    "length": "90%", //指针长度，按照半圆半径的百分比
                },
                detail: {
                    show: true,
                    offsetCenter: [0, "140%"],
                    color: '#fff',
                    borderWidth:1,
                    borderColor:"#03B7C9",
                    borderRadius:4,
                    padding: [3, 4],
                    textStyle: {
                        fontSize: 12
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#03B7C9",

                    }
                },
                data: [{
                    value: data.count
                }]
            }, {
                type: 'gauge',
                center: ['20%', '55%'], // 默认全局居中  
                radius: '35%',
                splitNumber: 5, //刻度数量
                min: 0,
                max: myRate1,
                endAngle: 45,
                clockwise: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        shadowBlur: 0,
                        color: [
                            [1, '#03B7C9']
                        ]
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#03B7C9',
                        width: 1
                    },
                    length: -5,
                    splitNumber: 5
                },
                splitLine: {
                    show: true,
                    length: -8,
                    lineStyle: {
                        color: '#03B7C9',
                    }
                },
                axisLabel: {
                    distance: -20,
                    textStyle: {
                        color: "#03B7C9",
                        fontSize: "10",
                        fontWeight: "bold"
                    }
                },
                pointer: { //仪表盘指针
                    show: 0
                },
                detail: {
                    show: false
                },
                data: [{
                    name: "",
                    value: myRate1
                }]
            }, {
                type: 'gauge',
                center: ['20%', '55%'], // 默认全局居中  
                radius: '30%',
                min: 0,
                max: myRate1,
                endAngle: 45,
                splitNumber: 0,
                axisLine: { // 坐标轴线  
                    lineStyle: {
                        color: [
                            [0.66, '#dddddd'],
                            [1, '#dddddd']
                        ], // 属性lineStyle控制线条样式  
                        width: 1
                    }
                },


                axisLabel: { // 坐标轴小标记  
                    textStyle: { // 属性lineStyle控制线条样式  
                        // fontWeight: 'bolder',
                        // fontSize: 16,
                        color: 'rgba(30,144,255,0)',
                    }
                },
                splitLine: { // 分隔线  
                    length: 10, // 属性length控制线长  
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式  
                        width: 0,
                        color: '#444'
                    }
                },
                pointer: { // 分隔线 指针  
                    color: '#666666',
                    width: 0,
                    length: 230
                },
                detail: {
                    show: false
                },

            }, {
                name: '已处理',
                type: 'gauge',
                endAngle: 45,
                radius: '25%',
                center: ['20%', '55%'], // 默认全局居中  

                min: 0,
                max: myRate1,

                axisLine: {
                    show: false,
                    lineStyle: {
                        width: 10,
                        shadowBlur: 0,
                        color: [
                            [0.2, '#00FAFC'],
                            [0.4, '#3BD542'],
                            [0.6, '#E3F424'],
                            [0.8, '#7E48DA'],
                            [1, '#E531A8']
                        ]
                    }
                },
                axisTick: {
                    show: false,

                },
                splitLine: {
                    show: false,
                    length: 20,

                },

                axisLabel: {
                    show: false
                },
                pointer: {
                    show: true,
                    "width": 3, //指针的宽度
                    "length": "90%", //指针长度，按照半圆半径的百分比
                },
                detail: {
                    show: true,
                    offsetCenter: [0, '230%'],
                    color: '#fff',
                    borderWidth:1,
                    borderColor:"#03B7C9",
                    borderRadius:4,
                    padding: [3, 4],
                    textStyle: {
                        fontSize: 12
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#03B7C9",

                    }
                },
                data: [{
                    value: data.fbCount
                }]
            }, {
                type: 'gauge',
                center: ['80%', '55%'], // 默认全局居中  
                radius: '35%',
                splitNumber: 5, //刻度数量
                min: 0,
                max: myRate1,
                startAngle: 140,
                endAngle: -45,
                clockwise: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        shadowBlur: 0,
                        color: [
                            [1, '#03B7C9']
                        ]
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#03B7C9',
                        width: 1
                    },
                    length: -5,
                    splitNumber: 5
                },
                splitLine: {
                    show: true,
                    length: -8,
                    lineStyle: {
                        color: '#03B7C9',
                    }
                },
                axisLabel: {
                    distance: -20,
                    textStyle: {
                        color: "#03B7C9",
                        fontSize: "10",
                        fontWeight: "bold"
                    }
                },
                pointer: { //仪表盘指针
                    show: 0
                },
                detail: {
                    show: false
                },
                data: [{
                    name: "",
                    value: myRate1
                }]
            }, {
                type: 'gauge',
                center: ['80%', '55%'], // 默认全局居中  
                radius: '30%',
                min: 0,
                max: 1000,
                startAngle: 140,
                endAngle: -45,
                splitNumber: 0,
                axisLine: { // 坐标轴线  
                    lineStyle: {
                        color: [
                            [0.66, '#dddddd'],
                            [1, '#dddddd']
                        ], // 属性lineStyle控制线条样式  
                        width: 1
                    }
                },


                axisLabel: { // 坐标轴小标记  
                    textStyle: { // 属性lineStyle控制线条样式  
                        // fontWeight: 'bolder',
                        // fontSize: 16,
                        color: 'rgba(30,144,255,0)',
                    }
                },
                splitLine: { // 分隔线  
                    length: 10, // 属性length控制线长  
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式  
                        width: 0,
                        color: '#444'
                    }
                },
                pointer: { // 分隔线 指针  
                    color: '#666666',
                    width: 0,
                    length: 230
                },
                detail: {
                    show: false
                },

            }, {
                name: '未处理',
                type: 'gauge',
                startAngle: 140,
                endAngle: -45,
                radius: '25%',
                center: ['80%', '55%'], // 默认全局居中  

                min: 0,
                max: myRate1,

                axisLine: {
                    show: false,
                    lineStyle: {
                        width: 10,
                        shadowBlur: 0,
                        color: [
                            [0.2, '#00FAFC'],
                            [0.4, '#3BD542'],
                            [0.6, '#E3F424'],
                            [0.8, '#7E48DA'],
                            [1, '#E531A8']
                        ]
                    }
                },
                axisTick: {
                    show: false,

                },
                splitLine: {
                    show: false,
                    length: 20,

                },

                axisLabel: {
                    show: false
                },
                pointer: {
                    show: true,
                    "width": 3, //指针的宽度
                    "length": "90%", //指针长度，按照半圆半径的百分比
                },
                detail: {
                    show: true,
                    offsetCenter: [0, '230%'],
                    color: '#fff',
                    borderWidth:1,
                    borderColor:"#03B7C9",
                    borderRadius:4,
                    padding: [3, 4],
                    textStyle: {
                        fontSize: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#03B7C9",

                    }
                },
                data: [{
                    value: data.remindCount
                }]
            }]
         })
      },
      echartsdevice(data){
        let myChart = this.$echarts.init(document.getElementById('device'))
         window.addEventListener("resize", function () {
          myChart.resize();
        });
        myChart.setOption({
            title: {
              text: '接入设备统计',
              "left": "10",
              "top": "10",
              "textStyle": {
                "color": "#D4FFF9",
                "fontSize":"14"
              }
            },
            tooltip: {
                //trigger(触发类型)，可选'item','axis','none'
                trigger: 'axis',
                axisPointer: {
                    //指示器类型,可选'line','shadow','cross'
                    type: 'shadow'
                },
            },
            "grid": {
            // "top": "20%"
              x:50,
              y:60,
              x2:50,
              y2:30,
          },
            xAxis: {
                data: data.nameList,
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": '#D4FFF9',
                    },
                },
                "axisLabel": {
                "show": true,
                "textStyle": {
                  "color": "#D4FFF9"
                },
                
              }
            },
            yAxis: {
                type: 'value',
                // data: data.nameList,
                // axisLabel: {
                //     show: false,
                //     color: '#fff',
                //     fontSize: 14,
                // },
                min: 0,
                max: function(value) { //设置y轴最大值
                    return value.max+20;
                },
                splitNumber:5,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#D4FFF9',
                    },
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#D4FFF9',
                    },
                },
            },
            series: [{
                type: 'bar',
                data:data.countList,
                "barMaxWidth": 35,
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
                        "color": "rgba(0,249,255,1)"
                      },
                      {
                        "offset": 0.5,
                        "color": "rgba(1,192,255,1)"
                      },
                      {
                        "offset": 1,
                        "color": "rgba(2,139,255,1)"
                      }
                    ],
                    "globalCoord": false
                  }
                }
              }
            }]
        })
         
      },
      echartsabnormalcount(data){
         let myChart = this.$echarts.init(document.getElementById('abnormalcount'))
         window.addEventListener("resize", function () {
          myChart.resize();
        });
          myChart.setOption({
            "title": {
            "text": "异常统计",
            "left": "10",
            "top": "10",
            "textStyle": {
              "color": "#D4FFF9",
              "fontSize":"14"
            }
          },
            //  backgroundColor: '#08254F',
            // tooltip（提示框组件）
            tooltip: {
                //trigger(触发类型)，可选'item','axis','none'
                trigger: 'axis',
                axisPointer: {
                    //指示器类型,可选'line','shadow','cross'
                    type: 'shadow'
                },
            },
            //echarts图表的相对于容器的布局,
            grid: {
            // "top": "20%"
              x:100,
              y:35,
              x2:50,
              y2:40,
          },
            xAxis: [{
                type: 'value',
                splitLine: {
                    show: false,
                },
                //axisTick 坐标轴刻度相关设置
                axisTick: {
                    show: true
                },
                max: data.maxList[1],
                //axixLine 坐标轴轴线相关设置
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#D4FFF9',
                    }
                },
                //axisLabel 坐标轴刻度标签的相关设置
                axisLabel: {
                    show: true,
                }
            }, ],
            yAxis: [{
                type: 'category',
                data: data.nameList,
                // axisLabel: {
                //     show: false,
                //     color: '#fff',
                //     fontSize: 14,
                // },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false
                },
            }, {
                type: 'category',
                data: [],
                axisLabel: {
                    show: false,
                    color: '#fff',
                    fontSize: 14,
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false
                },
            }, ],
            series: [{
                    type: 'bar',
                    data: data.countList,
                    barWidth: '30%',
                    z: 2,
                    itemStyle: {
                    normal: {
                    // barBorderRadius: 50,
                        //color: 'rgba(20,134,143)',
                        "color": {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 0,
                    "y2": 1,
                    "colorStops": [
                      {
                        "offset": 0,
                        "color": "rgba(22,139,147,0.2)"
                      },
                      {
                        "offset": 0.5,
                        "color": "rgba(20,132,141,0.5)"
                      },
                      {
                        "offset": 1,
                        "color": "rgba(20,145,151,0.8)"
                      }
                    ],
                    "globalCoord": false
                  },
                        label: {
                                "show": true,
                                "position": ['100%', '0%'],
                                color: '#D4FFF9',
                                // fontSize:14,
                                formatter: function(p) {
                                    return p.value;
                                }
                            }
                        }  
                    },
                },
                {

                    type: 'bar',
                    yAxisIndex: 1,
                    // barGap: '-100%',
                    data: data.maxList,
                    barWidth: '30%',
                    z: 0,
                    itemStyle: {
                        // barBorderRadius: 50,
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
            ]
          })
      },
      echartscamera(data){
        let myChart = this.$echarts.init(document.getElementById('camera'))
        window.addEventListener("resize", function () {
          myChart.resize();
        });
        myChart.setOption({
            "title": {
            "text": "摄像机在线率统计",
            "left": "10",
            "top": "10",
            "textStyle": {
              "color": "#D4FFF9",
              "fontSize":"14"
            }
          },
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
                "name": "总数",
                "icon": "circle",
                "textStyle": {
                  "color": "#7d838b"
                }
              },
              {
                "name": "在线数",
                "icon": "circle",
                "textStyle": {
                  "color": "#7d838b"
                }
              },
              {
                "name": "在线率",
                "icon": "circle",
                "textStyle": {
                  "color": "#7d838b"
                }
              }
            ],
            "top": "10",
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
                  "color": "#D4FFF9"
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
                  "color": "#D4FFF9"
                }
              },
              "axisLine": {
                "show": true
              },
              "splitLine": {
                "lineStyle": {
                  "color": "#7d838b"
                }
              }
            },
            {
              "type": "value",
              // "name": "完成率",
              "min": 0,
              "max": 100,
              "show": true,
              "axisLabel": {
                "show": true,
                "textStyle": {
                  "color": "#D4FFF9",
                },
                "formatter": '{value} %'
              }
            }
          ],
          "grid": {
            // "top": "20%"
              x:50,
              y:50,
              x2:100,
              y2:50,
          },
          "series": [
            {
              "name": "总数",
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
                        "color": "rgba(0,249,255,1)"
                      },
                      {
                        "offset": 0.5,
                        "color": "rgba(1,192,255,1)"
                      },
                      {
                        "offset": 1,
                        "color": "rgba(2,139,255,1)"
                      }
                    ],
                    "globalCoord": false
                  }
                }
              }
            },
            {
              "name": "在线数",
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
                        "color": "rgba(0,255,50,1)"
                      },
                      {
                        "offset": 0.5,
                        "color": "rgba(0,255,157,1)"
                      },
                      {
                        "offset": 1,
                        "color": "rgba(0,255,175,1)"
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
              "name": "在线率",
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

      }
    }
  }
</script>
<style scoped>
  .bigbox{
      position:fixed;
      z-index: 2000000;
      background: url(../../public/img/bigs.png) no-repeat center center/100% 100%;
      width: calc(100% + 260px);
      height:100%;
      margin-left: -260px;
      overflow-y: auto;
  }
  .toptitle{
      color: #D1FCF6;
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
  }
  .toptime{
      text-align: right;
      color: #D1FCF6;
      font-size: 12px;
      width: 100%;
      display: inline-block;
      padding-right: 20px;
  }
  
  /* 上部分图表 */
  .maintop{
      width: 100%;
      height: 492px;
      /* background: red; */
      padding: 10px 10px 0px 10px; 
      display: flex;
  }
  .top-left{
    width:25%;
    height:100%;
    padding: 20px;
    background: url(../../public/img/all.png) no-repeat center center/100% 100%;
  }
  .maintop p {
    color: #D4FFF9;
    text-align: left;
    padding-left: 10px;
  }
  .titletop{
    font-size: 14px;
    font-weight: bold;
  }
  .titletops{
    font-size: 14px;
    margin-top: 20px;
  }
  .titletops span{
    color: rgb(12, 255, 234);
    font-size: 20px;
    font-weight: bold;
  }
  .threemsg{
    text-align: left;
    margin-top: 30px;
  }
  .threemsg span{
    color: #D4FFF9;
    font-size: 12px;
    display:inline-block;
    line-height: 20px;
  }
  .oneicon{
    width:5px;
    height:5px;
    background:rgb(12, 255, 234);
    border-radius:50%;
    margin-right: 5px;
  }
  .top-right{
    width:calc(75% - 10px);
    height:100%;
    padding: 10px;
    margin-left: 10px;
    background: url(../../public/img/bbbb.png) no-repeat center center/100% 100%;
    position: relative;
  }
  /* 球状图 */
  .allnum{
    position: absolute;
    width: 20%;
    height: 460px;
    right: 10px;
    top: 10px;
    background: url(../../public/img/bbbb.png) no-repeat center center/100% 100%;
  }
  #echartsqq{
    width:100%;
    height: 100%;
  }
  .pmicrunstatic{
    width: 40%;
    height: 460px;
    position: absolute;
    right: 10px;
    top: 10px;
    /* background: red */
  }
  #echartspmicrunstatic{
    width:100%;
    height: 100%;
  }
  .runstatic{
    width: 40%;
    height: 460px;
    position: absolute;
    right: 10px;
    top: 10px;
    /* background: red */
  }
  #echartsrunstatic{
    width:100%;
    height: 100%;
  }
  /* 热力图 */
  .thermodynamic{
    width: calc(60% - 20px);
    height: 410px;
    position: absolute;
    left: 20px;
    top: 60px;
    /* background: red; */
  }
  .thermodynamics{
    width: calc(60% - 20px);
    height: 410px;
    position: absolute;
    left: 20px;
    top: 60px;
    /* background: red; */
  }
  #thermodynamicwg{
    width:100%;
    height: 100%;
  }
  #thermodynamicpmic{
    width:100%;
    height: 100%;
  }
  /* 中间部分 */
  .maincenter{
      width: calc(100% - 20px);
      /* background: tan; */
      display: flex;
      margin: 10px;
  }
  .center-left{
    width: 35%;
    height: 214px;
    background: url(../../public/img/center.png) no-repeat center center/100% 100%;
  }
  #abnormalcount{
       width:100%;
       height: 100%;
   }
   .centers{
     width: 30%;
     height: 214px;
     margin-left: 10px;
     background: url(../../public/img/center.png) no-repeat center center/100% 100%;
   }
   #device{
     width:100%;
     height: 100%;
   }
   .center-right{
     width: calc(35% - 20px);
     height: 214px;
     margin-left: 10px;
     background: url(../../public/img/center.png) no-repeat center center/100% 100%;
   }
   #handle{
     width:100%;
     height: 100%;
   }
  /* 下部分 */
  .mainbottom{
      width: calc(100% - 20px);
      height: 234px;
      margin: 10px; 
      background: url(../../public/img/bb1.png) no-repeat center center/100% 100%;
  }
   #camera{
       width:100%;
       height: 100%; 
   }
   .mapdiv{
      position: absolute;
      width: calc(80% - 40px);
      height: 410px;
      left: 20px;
      top: 60px;
      z-index:1;
   }
</style>
