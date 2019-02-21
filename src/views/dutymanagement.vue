<template>
    <div style="padding-left: 260px;min-width: 1000px;padding-top: 60px">
        <div class="topbox">
            <img src="../../public/img/dutymanagement.png"/>&nbsp;&nbsp;当日值班
        </div>
        <div class="topboximg" style="padding:0">
            <div class="cardcontent">
               <div class="cardcontentop">
                 早班(07:00~15:00)
               </div>
               <div class="cardcontentmain">
                   <img src="../../public/img/timego.png" />
                   <div>
                      <p style="margin-left: 23px;">姓名：长得三</p>
                      <p>单位名称：长得三</p>
                      <p>联系方式：15201562158</p>
                   </div>
               </div>
            </div>
            <div class="cardcontent" >
                <div class="cardcontentop" style="background:#F4A77D">
                 中班(07:00~15:00)
               </div>
               <div class="cardcontentmain">
                   <img src="../../public/img/timego.png" />
                   <div>
                      <p style="margin-left: 23px;">姓名：长得三</p>
                      <p>单位名称：长得三</p>
                      <p>联系方式：长得三</p>
                   </div>
               </div>
            </div>
            <div class="cardcontent" >
                 <div class="cardcontentop" style="background:#7DC9F4">
                 晚班(07:00~15:00)
               </div>
               <div class="cardcontentmain">
                   <img src="../../public/img/timego.png" />
                   <div>
                      <p style="margin-left: 23px;">姓名：长得三</p>
                      <p>单位名称：长得三</p>
                      <p>联系方式：长得三</p>
                   </div>
               </div>
            </div>
        </div>
        <div class="topbox">
            <img src="../../public/img/dutymanagement.png"/>&nbsp;&nbsp;值班日志
        </div>
        <div  class="timelinebox" id="dutytimeline">
          <Timeline>
              <Timeline-item v-for="(list,index) in 2" :key="index">
                  <img src="../../public/img/16.png" slot="dot"  />
                  <div class="timelinecont">
                    <p><span>张三 </span>在<span> 2018/01/12 10:00:00 </span>填写了值班日志，内容为：<span>撒旦发射点发射点发生</span></p>
                  </div>
              </Timeline-item>
              </Timeline>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'dutymanagement',
    components: {
        
    },
    data () {
      return {
          
      }
    },
    created(){
    },
    mounted(){
    //   console.log(window.g.ApiUrl)
    },
    methods: {
      
    }
  }
</script>
<style scoped>
    .topbox{
    display: flex;
    text-align: left;
    padding: 10px;
    }
    .topboximg{
      display: flex;
      text-align: left;
      padding: 10px;
      margin-left: 50px;
    }
    .cardcontent {
    text-align: center;
    color: #717578;
    box-shadow: 0px 0px 10px #DAE3F0;
    width: 250px;
    height: 150px;
    margin-right: 30px;
    }
    .cardcontentop{
      height: 30px;
      background: #FF8383;
      color: #fff;
      line-height: 30px;
    }
    .cardcontentmain{
      position: relative;
    }
    .cardcontentmain img{
      position: absolute;
      left: 28px;
      top:32px;
    }
    .cardcontentmain div{
      position: absolute;
      left: 90px;
      top:20px;
    }
    .cardcontentmain div p{
      line-height: 25px;
    }
    .timelinebox {
      padding: 20px;
      height: calc(100% - 110px);
      overflow: auto;
      padding-left: 90px;
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
      border-bottom: 1px solid #1d60fe;
      cursor: pointer;
    }
    .timelinecont p span:last-child{
      color: #1d60fe;
      border:none;
      cursor: auto;
    }
</style>
