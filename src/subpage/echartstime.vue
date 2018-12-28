<template>
    <div class="divbox">
        
        <Row style="height:100%;padding:1px">
          
          <Col span="15" style="height:99%;box-shadow: 0px 2px 4px rgba(0,0,0,0.2);position:relative;margin-right: 20px;">
              <div class="titletop" style="margin-bottom: 35px;">请配置考核报表自动配置时间</div>
              <div style="text-align:left;padding-left:20px">
              <RadioGroup v-model="vertical" vertical @on-change="changeleft">
                <Radio label="week">
                    <span>每周</span>
                    
                </Radio>
                <Radio label="month" style="margin-top:10px">
                    <span>每月</span>
                </Radio>
            </RadioGroup>

            <div style="position:absolute;top:102px;left:100px">
              <RadioGroup v-model="days">
                <Radio label="1"><span>周一</span></Radio>
                <Radio label="2"><span>周二</span></Radio>
                <Radio label="3"><span>周三</span></Radio>
                <Radio label="4"><span>周四</span></Radio>
                <Radio label="5"><span>周五</span></Radio>
                <Radio label="6"><span>周六</span></Radio>
                <Radio label="7"><span>周天</span></Radio>
            </RadioGroup>
            </div>
            
            <div style="position:absolute;top:95px;left:525px">
                <!-- <Select v-model="weektime" style="width:80px">
                    <Option v-for="item in modelweek" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
                <TimePicker format="HH:mm" placeholder="请选择时间" style="width: 112px" v-model="weektime"></TimePicker>
            </div>
            
            <div style="position:absolute;top:135px;left:100px">
            <DatePicker type="date" placeholder="请选择日期" style="width: 200px" v-model="mounthdate"></DatePicker>
            </div>

            <div style="position:absolute;top:135px;left:315px">
                <!-- <Select v-model="mounthtime" style="width:80px">
                    <Option v-for="item in modelmounth" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
                <TimePicker format="HH:mm" placeholder="请选择时间" style="width: 112px" v-model="mounthtime"></TimePicker>
            </div>

            <button   class="zhuanyixukes allow"  @click="allowtime">确认</button>
            </div>
          </Col>

          <Col span="8" style="box-shadow: 0px 2px 4px rgba(0,0,0,0.2);height:99%;">
              <div class="titletop">系统将在以下配置的时间自动生成考核报表</div>


              <div class="timelinebox">
                <Timeline>
              <Timeline-item v-for="(list,index) in selectAlldata" style="padding-bottom:40px;" :key="index">
                <img src="../../public/img/z1.png" slot="dot" />
                  <div class="timelinecont">
                    <p >{{list.translate}}</p>
                    <div class="exj3" @click="detelenum(list.id)">
                        删除
                    </div>
                  </div>
                 

              </Timeline-item>
          </Timeline>
              </div>
          </Col>
        </Row>
         
      <Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>您确定要删除吗</span>
        </p>
        <div style="text-align:center">
            <p>是否继续删除?</p>
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="error" size="large"   @click="deteleplot()">删除</Button>
        </div>
    </Modal>
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
          deteleid:'',
          modal2:false,
         selectAlldata:[],
         vertical:'week',
         days:'1',
         weektime:'',
         mounthtime:'',
         mounthdate:'',
         modelweek:[{
                        value: '1:00',
                        label: '1:00'
                    },
                    {
                        value: '2:00',
                        label: '2:00'
                    },
                    {
                        value: '3:00',
                        label: '3:00'
                    },
                    {
                        value: '4:00',
                        label: '4:00'
                    },
                    {
                        value: '5:00',
                        label: '5:00'
                    },
                    {
                        value: '6:00',
                        label: '6:00'
                    },{
                        value: '7:00',
                        label: '7:00'
                    },
                ],
          modelmounth:[{
                        value: '1:00',
                        label: '1:00'
                    },
                    {
                        value: '2:00',
                        label: '2:00'
                    },
                    {
                        value: '3:00',
                        label: '3:00'
                    },
                    {
                        value: '4:00',
                        label: '4:00'
                    },
                    {
                        value: '5:00',
                        label: '5:00'
                    },
                    {
                        value: '6:00',
                        label: '6:00'
                    },{
                        value: '7:00',
                        label: '7:00'
                    },
                ]
      }
    },
    created(){
    },
    mounted(){
        var h = document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(h)
         document.getElementsByClassName("divbox")[0].style.height = (h-180)+'px'
          this.$http.get("res/reportTaskCron/selectAll",{},res=>{
                      this.selectAlldata = res.data
                    },err=>{});
    },
    methods: {
       changeleft(val){
         if(val == 'month'){
           this.weektime = ''
           this.days = ''
         }else{
           this.mounthtime = ''
           this.mounthdate = ''
         }
       },
       detelenum(id){
        this.deteleid = id
        this.modal2 = true
       },
       deteleplot(){
         this.$http.delete("res/reportTaskCron/deleteCron?id="+this.deteleid,{},res=>{
                     this.$Message.info(res.message);
                     this.modal2 = false
                     this.$http.get("res/reportTaskCron/selectAll",{},res=>{
                      this.selectAlldata = res.data
                    },err=>{});
                    },err=>{});
       },
       allowtime(){
           if(this.vertical == 'week'){
                if(this.weektime&&this.days){
                  this.$http.post("res/reportTaskCron/saveCron",{cronType:'week',startDateStr:this.weektime,value:this.days},res=>{
                       this.$Message.info(res.message);
                       this.$http.get("res/reportTaskCron/selectAll",{},res=>{
                      this.selectAlldata = res.data
                    },err=>{});
                    },err=>{});
                }else{
                    this.$Message.error('选项未勾选完全');
                }
           }else if(this.vertical == 'month'){
                if(this.mounthtime&&this.mounthdate){
                    var time = this.mounthdate.toLocaleDateString()
                this.$http.post("res/reportTaskCron/saveCron",{cronType:'month',startDateStr:this.mounthtime,value:time},res=>{
                       this.$Message.info(res.message);
                       this.$http.get("res/reportTaskCron/selectAll",{},res=>{
                      this.selectAlldata = res.data
                    },err=>{});
                    },err=>{});
                }else{
                    this.$Message.error('选项未勾选完全');
                }
           }
       }
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
    .allow{
      padding: 5px 20px;
      position: absolute;
      top:290px;
      left: 40%;
      right: 0;
    }
</style>
