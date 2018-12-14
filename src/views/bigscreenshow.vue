<template>
    <div class="bigbox">
      <p class="toptitle">武汉公安综合安全运维系统</p>
      <span class="toptime">数据更新日期：圣诞节是可敬的开始交肯德基</span>
      <div class="maintop">

      </div>
      <div class="maincenter">
         2222
      </div>
      <div class="mainbottom">
         <div id="camera" ></div>
      </div>
    </div>
</template>
<script>
// import ArcgisMaplog from "@/components/ArcgisMaplog";
  export default {
    name: 'bigscreenshow',
    components: {
        // ArcgisMaplog
    },
    data () {
      return {
          cameradata:[],
      }
    },
    created(){
    },
    mounted(){
        this.$http.get("res/screenDisplay/cameraOverview",{},res=>{
              this.echartscamera(res.data)
            },err=>{});
      
    },
    methods: {
      echartscamera(data){
        let myChart = this.$echarts.init(document.getElementById('camera'))
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
        "show": true,
        "axisLabel": {
          "show": true,
          "textStyle": {
            "color": "#D4FFF9",
          }
        }
      }
    ],
    "grid": {
      "top": "20%"
        // x:50,
        // y:50,
        // x2:100,
        // y2:50,
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
      height: 45%;
      /* background: red; */
      padding: 10px; 
  }
  /* 中间部分 */
  .maincenter{
      width: 100%;
      height: 25%;
      /* background: tan; */
      padding: 10px; 
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
       height: 100%;;  
   }
</style>
