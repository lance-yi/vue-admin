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
                  <img src="../../public/img/115.png"/>
                 </div>
                 <div style="margin-left: 20px;text-align:left">
                  <p style="font-size:22px;font-weight: bold;" :class="hadcol == 1?'hadcolor':''">20%</p>
                  <p style="font-size:14px" :class="hadcol == 1?'hadcolor':''">在线率</p>
                 </div>
              </div>
              <div class="iconbox" @click="checkplot(2)">
                 <div>
                  <img src="../../public/img/115.png"/>
                 </div>
                 <div style="margin-left: 20px;text-align:left">
                  <p style="font-size:22px;font-weight: bold;" :class="hadcol == 2?'hadcolor':''">5%</p>
                  <p style="font-size:14px" :class="hadcol == 2?'hadcolor':''">联网率</p>
                 </div>
              </div>
              <div class="iconbox" @click="checkplot(3)">
                 <div>
                  <img src="../../public/img/115.png"/>
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
              <div class="exj1" v-if="hadcol == 2">
                    <img src="../../public/img/124.png"/>
                    各区域任务分配
                </div>
          </div>

          <div class="exjlists" v-if="!aplotshow">
              <div class="exj2" >
                    <img src="../../public/img/1242.png"/>
                    导出
                </div>
              <div class="exj1">
                    <img src="../../public/img/124.png"/>
                    各区域任务分配
                </div>
          </div>

          <div class="plotbox" v-if="aplotshow">
            <div id="camera"></div>
          </div>

          <div class="tablebox" v-if="!aplotshow">
           <!-- <Table :columns="columns11" :data="data10" border :height="hxnum"></Table> -->
           <Table :columns="columns11" :data="data10" border ></Table>
           <img src="../../public/img/134.png" class="theadimg"/>
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
          hxnum:'',
          hadcol:1,
          aplotshow:true,
          data1:['总数','在线数','在线率'],
          cameradata:[],
          columns11: [
                    {
                        title: '区域',
                        key: 'name',
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
                                key: 'age',
                                align: 'center',
                            },
                            {
                                title: '在线数',
                                key: 'age',
                                align: 'center',
                            },
                            {
                                title: '在线率',
                                key: 'age',
                                align: 'center',
                            }
                        ]
                    },
                    {
                        title: '联网率',
                        align: 'center',
                        children: [
                            {
                                title: '接入任务数',
                                key: 'age',
                                align: 'center',
                            },
                            {
                                title: '联网数',
                                key: 'age',
                                align: 'center',
                            },
                            {
                                title: '联网率',
                                key: 'age',
                                align: 'center',
                            }
                        ]
                    },
                    {
                        title: '一机一档合格率',
                        align: 'center',
                        children: [
                            {
                                title: '总数',
                                key: 'age',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', {
                                            on: {
                                                click: () => {
                                                    // console.log(params.row.formId)
                                                    this.gotodetal(params.row.id)
                                                }
                                            },
                                            style:{color:'#1d60fe',cursor:'pointer','border-bottom':'1px solid #1d60fe'}
                                        }, params.row.age)
                                    ]);
                                    }
                            },
                            {
                                title: '合格数',
                                key: 'age',
                                align: 'center',
                            },
                            {
                                title: '合格率',
                                key: 'age',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('div', {
                                            style:{color:'#515a6e',cursor:'default'}
                                        }, params.row.age)
                                    ]);
                                    }
                            }
                        ]
                    }
                ],
                data10: [{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'},{'age':100,'name':'洪山区'}]

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
       plot(){
         this.aplotshow = true
         setTimeout(() => {
              this.echartscamera(this.cameradata,this.data1)
           }, 100);
         
       },
       liebiao(){
         this.aplotshow = false
       },
       echartscamera(data,title){
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
        top:70px;
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
        top: 110px; 
        padding: 0 20px;
        /* background: red; */
    }
    .theadimg{
        position: absolute;
        top: 1px;
        left: 21px;
        height: 79px;
        width: 148px;
    }
</style>
