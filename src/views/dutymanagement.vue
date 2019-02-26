<template>
    <div style="padding-left: 260px;min-width: 1000px;padding-top: 60px">
        <div class="topbox">
            <img src="../../public/img/dutymanagement.png"/>&nbsp;&nbsp;当日值班
        </div>
        <div class="topboximg" style="padding:0">
            <div class="cardcontent" v-for="(role,index) in roledata" :key="index">
               <div class="cardcontentop">
                 {{role.type}}
               </div>
               <div class="cardcontentmain">
                   <img src="../../public/img/timego.png" />
                   <div>
                      <p style="margin-left: 23px;">姓名：{{role.rtnlist[0].personName}}</p>
                      <p>单位名称：{{role.rtnlist[0].company}}</p>
                      <p>联系方式：{{role.rtnlist[0].phone}}</p>
                   </div>
               </div>
            </div>
            <!-- <div class="cardcontent" >
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
            </div> -->
        </div>
        <div class="topbox" style="border-top:1px solid #D5D5D5;margin-top:20px">
            <img src="../../public/img/dutymanagement.png"/>&nbsp;&nbsp;当月排班
            <div class="exj1" style="right:127px;top:-34px">
                    <img src="../../public/img/lie5.png"/>
                    值班方式管理
            </div>
            <div class="exj2" style="right:0px;top:-34px">
                    <img src="../../public/img/lie5.png"/>
                    批量排班管理
            </div>
        </div>
         <div id="calendar">
            <!-- 年份 月份 -->
            <div class="month">
                <ul>
                    <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
                    <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
                    <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                        <span class="choose-year">{{ currentYear }}</span>
                        <span class="choose-month">{{ currentMonth }}月</span>
                    </li>
                    <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
                </ul>
            </div>
            <!-- 星期 -->
            <ul class="weekdays">
                <li>周一</li>
                <li>周二</li>
                <li>周三</li>
                <li>周四</li>
                <li>周五</li>
                <li>周六</li>
                <li>周日</li>
            </ul>
            <!-- 日期 -->
            <ul class="days" v-if="dayshow">
                <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
                <li v-for="(dayobject,index) in days" :key="index" @click="changeclass(index,dayobject)" :class="changeindexs == index?'addclass':''">
                    <!--本月-->
                    <!--如果不是本月  改变类名加灰色-->

                    <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                    
                    <!--如果是本月  还需要判断是不是这一天-->
                    <span v-else style="position:absolute">
                        <!--今天  同年同月同日-->
                        <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()"
                            class="active">{{ dayobject.day.getDate() }}</span>
                        <span v-else>{{ dayobject.day.getDate() }}</span>
                        
                    </span>
                    <div class="rotabox" v-if="dayobject.day.getMonth()+1 == currentMonth&&dayobject.time.type == 'twoShifts'">
                          <p>早班：<span>{{dayobject.time.oneTime}}</span></p>
                          <p>晚班：<span>{{dayobject.time.threeTime}}</span></p>
                    </div>
                    <div class="rotabox" v-if="dayobject.day.getMonth()+1 == currentMonth&&dayobject.time.type == 'threeShifts'">
                          <p>早班：<span>{{dayobject.time.oneTime}}</span></p>
                          <p>中班：<span>{{dayobject.time.twoTime}}</span></p>
                          <p>晚班：<span>{{dayobject.time.threeTime}}</span></p>
                    </div>
                   <img src="../../public/img/bj1.png" class="editimg" v-if="dayobject.day.getMonth()+1 == currentMonth&&dayobject.time.type != ''&&changeindexs != index" />
                   <img src="../../public/img/bianji.png" class="editimg" v-if="dayobject.day.getMonth()+1 == currentMonth&&dayobject.time.type != ''&&changeindexs == index" />
                </li>
            </ul>
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
import moment from 'moment'; 
  export default {
    name: 'dutymanagement',
    components: {
        
    },
    data () {
      return {
        changeindexs:-1,
        dayshow:false,
        onedaytime:1,
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        dayslist:[],
        roledata:[],
      }
    },
    created(){
        let that = this;
        that.initData(null);
    },
    mounted(){
      this.$http.get("oauth/dutyEmployee/selectDutyDetailByMonth",{},res => {
        this.dayslist = res.data
         this.days.forEach((el,index) => {
            var t1=moment(el.day).format('YYYY-MM-DD');
                if(t1 == this.dayslist[0].date){
                  this.onedaytime = index
                }
              });
            for(var i = 0;i<this.dayslist.length;i++){
              var aa = i+this.onedaytime
              this.$set(this.days[aa],'time',this.dayslist[i])
            }
            this.dayshow = true 
          },
          err => {}
      );
      this.$http.get("oauth/dutyEmployee/selectDutyDetailByDay",{},res => {
            this.roledata = res.data
          },
          err => {}
      );
               
    },
    methods: {
       initData(cur) {
                    let that = this;
                    let leftcount = 0; //存放剩余数量
                    let date;
                    if (cur) {
                        date = new Date(cur);
                    } else {
                        let now = new Date();
                        let d = new Date(that.formatDate(now.getFullYear(), now.getMonth(), 1));
                        d.setDate(35);
                        date = new Date(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                    }
                    that.currentDay = date.getDate();
                    that.currentYear = date.getFullYear();
                    that.currentMonth = date.getMonth() + 1;
                    that.currentWeek = date.getDay(); // 1...6,0
                    if (that.currentWeek == 0) {
                        that.currentWeek = 7;
                    }
                    let str = that.formatDate(that.currentYear, that.currentMonth, that.currentDay);
                    that.days.length = 0;
                    // 今天是周日，放在第一行第7个位置，前面6个
                    //初始化本周
                    for (let i = that.currentWeek - 1; i >= 0; i--) {
                        let d = new Date(str);
                        d.setDate(d.getDate() - i);
                        let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                        dayobject.day = d;
                        that.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
                    }
                    //其他周
                    for (let i = 1; i <= 35 - that.currentWeek; i++) {
                        let d = new Date(str);
                        d.setDate(d.getDate() + i);
                        let dayobject = {};
                        dayobject.day = d;
                        that.days.push(dayobject);
                    }
                    

                },
                pickPre(year, month) {
                    this.dayshow = false
                    let that = this;
                    // setDate(0); 上月最后一天
                    // setDate(-1); 上月倒数第二天
                    // setDate(dx) 参数dx为 上月最后一天的前后dx天
                    let d = new Date(that.formatDate(year, month, 1));
                    d.setDate(0);
                    that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                    
                    // console.log(that.currentYear)
                    // console.log(that.currentMonth)
                    if(that.currentMonth<10){
                      var months = that.currentYear+'-0'+that.currentMonth
                    }else{
                      var months = that.currentYear+'-'+that.currentMonth
                    }
                    this.$http.get("oauth/dutyEmployee/selectDutyDetailByMonth",{month:months},res => {
                        this.dayslist = res.data
                        this.days.forEach((el,index) => {
                            var t1=moment(el.day).format('YYYY-MM-DD');
                                if(t1 == this.dayslist[0].date){
                                  this.onedaytime = index
                                }
                              });
                            for(var i = 0;i<this.dayslist.length;i++){
                              var aa = i+this.onedaytime
                              this.$set(this.days[aa],'time',this.dayslist[i])
                            }
                            this.dayshow = true 
                          },
                          err => {}
                      );
                },
                pickNext(year, month) {
                    this.dayshow = false
                    let that = this;
                    let d = new Date(that.formatDate(year, month, 1));
                    d.setDate(35);
                    that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                    if(that.currentMonth<10){
                      var months = that.currentYear+'-0'+that.currentMonth
                    }else{
                      var months = that.currentYear+'-'+that.currentMonth
                    }
                    this.$http.get("oauth/dutyEmployee/selectDutyDetailByMonth",{month:months},res => {
                        this.dayslist = res.data
                        this.days.forEach((el,index) => {
                            var t1=moment(el.day).format('YYYY-MM-DD');
                                if(t1 == this.dayslist[0].date){
                                  this.onedaytime = index
                                }
                              });
                            for(var i = 0;i<this.dayslist.length;i++){
                              var aa = i+this.onedaytime
                              this.$set(this.days[aa],'time',this.dayslist[i])
                            }
                            this.dayshow = true 
                          },
                          err => {}
                      );
                },
                pickYear(year, month) {
                    alert(year + "," + month);
                },
                // 返回 类似 2016-01-02 格式的字符串
                formatDate(year, month, day) {
                    let y = year;
                    let m = month;
                    if (m < 10) m = "0" + m;
                    let d = day;
                    if (d < 10) d = "0" + d;
                    return y + "-" + m + "-" + d
                },
                changeclass(index,obj){
                  if(obj.day.getMonth()+1 == this.currentMonth){
                    this.changeindexs = index
                  }
                }

    }
  }
</script>
<style scoped >
    .topbox{
    display: flex;
    text-align: left;
    padding: 10px;
    position: relative;
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
    .cardcontent:nth-child(2) .cardcontentop{
      background:#F4A77D;
    }
    .cardcontent:nth-child(3) .cardcontentop{
      background:#7DC9F4;
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
        position:absolute;
    }
    .exj2{
        border: 1px solid #FE9946;
        color: #FE9946;
        border-radius: 4px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        height: 25px;
        margin-right: 20px;
        cursor:pointer;
        position:absolute;
    }
    

/* 日历 */
    #calendar{
      padding: 0 40px;
    }
    .month {
        /* width: 92%; */
        height: 48px;
        border: 2px solid #FFFFFF;
        /* margin-left: 3%; */
        /* margin-top: 20px; */
    }

    .month ul {
        margin: 0;
        padding: 0;
        display: flex;
        margin-top: 11px;
        justify-content: space-between;
    }

    .year-month {
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .choose-year {
        padding: 0 20px;
        font-size: 16px;
        font-weight: 200;
    }

    .choose-month {
        text-align: center;
        font-size: 16px;
        font-weight: 200;
    }

    .arrow {
        width: 3%;
        height: 25px;
    }

    .arrow1 {
        /* background: url(1.png) no-repeat 0 0 /100% 100%; */
        margin-left: 44px;
    }

    .arrow2 {
        /* background: url(2.png) no-repeat 0 0 /100% 100%; */
        margin-right: 44px;
    }

    .month ul li {
        color: #999;
        font-size: 20px;
        text-transform: uppercase;
        letter-spacing: 3px;
        list-style: none;
    }

    .weekdays {
        margin: 0;
        color: #FFFFFF;
        /* background: #A4A7B0; */
        /* width: 96.6%; */
        /* margin-top: 26px; */
        height: 34px;
        line-height: 34px;
        /* margin-left: 2.2%; */
    }

    .weekdays li {
        display: inline-block;
        text-align: center;
        color: #11616f;
        font-size: 14px;
        font-weight: 100;
        width: 14.2%;
    }

    .days {
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        border-top: 1px solid #E8E8E8;
        border-right: 1px solid #E8E8E8;
    }

    .days li {
        list-style-type: none;
        display: inline-block;
        width: 14.2%;
        color: #616568;
        font-weight: 500;
        border-left: 1px solid #E8E8E8;
        border-bottom: 1px solid #E8E8E8;
        text-align: left;
        padding-left: 1%;
        font-size: 25px;
        height: 100px;
        position: relative;
    }

    .days li span span {
        height: 29.5px;
        width: 27px;
        line-height: 100px;
        display: inline-block;
    }

    .days li .class-30 {
        /* background: url(bg_30.png) no-repeat 0 0 /100% 100%; */
    }

    .days li .class-60 {
        /* background: url(bg_60.png) no-repeat 0 0 /100% 100%; */
    }

    .days li .class-3060 {
        /* background: url(bg_3060.png) no-repeat 0 0 /100% 100%; */
    }

    .days li .other-month {
        color: #B3BAC0;
        line-height: 100px
    }
    .rotabox{
      display: inline-block;
      font-size: 12px;
      margin-left: 22%;
      padding-top: 20px;
    }
    .rotabox p{
      line-height: 20px;
    }
    .rotabox p span{
      color: #1D60FE;
    }
    .editimg{
      position: absolute;
      right: 5px;
      top:5px;
      cursor: pointer;
    }
    .days .addclass{
      border: 1px solid #1D60FE;
    }
</style>
