<template>
    <div class="divbox">
        
        <Row style="height:100%;padding:1px">
          <Col span="8" style="margin-right: 20px;height:99%;box-shadow: 0px 2px 4px rgba(0,0,0,0.2);">
              <div class="titletop">111111111111111111</div>


              <div class="timelinebox">
                <Timeline>
              <Timeline-item v-for="(list,index) in 20" style="padding-bottom:40px;" :key="index">
                <img src="../../public/img/z1.png" slot="dot" />
                  <div class="timelinecont">
                    <p >四道口附近三块大陆封锁</p>
                    <div class="exj3" @click="detele" >
                        删除
                    </div>
                  </div>
                 

              </Timeline-item>
          </Timeline>
              </div>
          </Col>
          <Col span="15" style="height:99%;box-shadow: 0px 2px 4px rgba(0,0,0,0.2);">
              <div class="titletop">111111111111111111</div>
          </Col>
        </Row>
         
            
          

        


       


       




       
       
    </div>
</template>
<script>
// import TreeGrid from '@/components/treeGrid2.0'
  export default {
    name: 'echartstime',
    components: {
        // TreeGrid
    },
    data () {
      return {
         
      }
    },
    created(){
    },
    mounted(){
        var h = document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(h)
         document.getElementsByClassName("divbox")[0].style.height = (h-180)+'px'
    },
    methods: {
       
    }
  }
</script>
<style scoped>
   .titletop{
     font-size: 14px;
     text-align: left;
     padding: 20px;
   }
   .timelinebox{
      margin-top: 40px;
      padding-left: 20px;
      overflow-y: auto;
      padding-top: 7px;
      height: 80%;
    }
    .timelinecont{
      position: relative;
    }
    .timelinecont p {
      text-align: left;
    }
    .exj3{
        border: 1px solid #EF3543;
        color: #EF3543;
        border-radius: 4px;
        padding: 0 8px;
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        height: 25px;
        margin-right: 20px;
        cursor:pointer;
        position: absolute;
        right: 10px;
        top:0;
    }
</style>
