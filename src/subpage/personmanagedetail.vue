<template>
  <div style="padding-left: 260px;min-width: 1000px;">
    <div class="centerbox">
      <div class="title">
        <p>外场维护人员 <img src="../../public/img/big.png"/><span>页面详情</span></p>
      </div>
    </div>
    <div class="detailbox">
       <div class="checkperson"  v-if="personshow">
         <p>人员信息</p>
         <img src="../../public/img/9.png"/>
         <img src="../../public/img/22.png" id="checkone" style="border:none;border-radius: 0"/>
       </div>

      <div class="checkperson" v-if="!personshow" @click="renyuan">
        <p style="color: #676867;font-size: 14px">人员信息</p>
        <img src="../../public/img/8.png" style="border:none"/>
      </div>

      <div class="lines">
        <div></div>
        <div></div>
      </div>
      <div class="checkperson"  v-if="!personshow">
        <p style="color: #22BCD1">授权设备</p>
        <img src="../../public/img/10.png"/>
        <img src="../../public/img/33.png" id="checkone2" style="border:none;border-radius: 0"/>
      </div>



      <div class="checkperson" v-if="personshow" @click="shebei">
        <p style="color: #676867;font-size: 14px">授权设备</p>
        <img src="../../public/img/11.png" style="border:none"/>
      </div>

    </div>


    <div class="personbox" v-if="personshow">
      <div class="topline"></div>
      <div  class="msgtitle">人员信息</div>
      <i-button type="primary">修改</i-button>
      <div class="content">
        <div>
          <p>姓名：<span>{{usermsg.userName}}</span></p>
        </div>
        <div>
          <p>APP ID：<span>{{usermsg.appId}}</span></p>
        </div>
        <div>
          <p>单位名称：<span>{{usermsg.company}}</span></p>
        </div>
        <div>
          <p>性别：<span style="color: #696C6F" v-if="usermsg.sex == 0">男</span>
            <span style="color: #696C6F" v-if="usermsg.sex == 1">女</span>
          </p>
        </div>
        <div>
          <p>手机号：<span>{{usermsg.mobile}}</span></p>
        </div>
        <div>
          <p>单位地址：<span>{{usermsg.companyAddress}}</span></p>
        </div>
        <div>
          <p>年龄：<span>{{usermsg.age}}</span></p>
        </div>
        <div>
          <p>邮箱号码：<span>{{usermsg.email}}</span></p>
        </div>
        <div>
          <p>所属单位电话：<span>{{usermsg.companyPhone}}</span></p>
        </div>
        <div>
          <p>身份证号：<span>{{usermsg.idCard}}</span></p>
        </div>
      </div>
    </div>



    <div class="personbox" v-if="personshow">
      <div  class="msgtitle" style="border-left: 5px solid #1DD4FB">证书信息</div>
      <div class="contents">
        <div v-for="certlist in certmsg" class="forbox">
          <p style="font-size: 16px">证书编号：
            <span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.certificateNo}}</span>
            <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.certificateNo}}</span>
          </p>
          <div class="morecontent">
            <p>发证类型：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.certificateType}}</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.certificateType}}</span>
            </p>
            <p>授权设备类型：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.installType}}</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.installType}}</span>
            </p>
            <p>发证日期：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.applyTime}}</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.applyTime}}</span>
            </p>
            <p>证书有效时期：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.startTime}} 至 {{certlist.endTime}}</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.startTime}} 至 {{certlist.endTime}}</span></p>
            <p>证书状态：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">正常</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">过期</span></p>
          </div>
          <img src="../../public/img/timego.png" class="timego" v-if="certlist.certificateStatus == 2"/>
        </div>
      </div>
    </div>



    <div class="personbox" v-if="!personshow">
      <div class="topline"></div>
      <div  class="msgtitle" style="border-left: 5px solid #1DD4FB">设备信息</div>
      <div class="buttons">
        <button   class="zhuanyixuke" v-if="moveallowshow" @click="move">转移许可</button>
          <button   class="zhuanyixukes" v-if="!moveallowshow" @click="move">返回</button>
        <button  @click="removeallow"   :class="removeallowshow ? 'yichuxuke' : 'yichuxukes'" v-if="!moves">移除许可</button>
          <button  @click="moveallow"   class='yichuxukes' v-if="moves">确认移除</button>
      </div>
        <div class="contents">
            <div class="morecontent">
                <p>姓名：<span>{{usermsg.userName}}</span></p>
                <p>单位名称：<span>{{usermsg.company}}</span></p>
                <p>手机号：<span>{{usermsg.mobile}}</span></p>
                <p>单位地址：<span>{{usermsg.companyAddress}}</span></p>
            </div>
            <div  class="forbox" v-for="(list,index) in devicelist" :key="index">
                <div class="morecontent">
                   <div style="display: flex">
                       <Checkbox v-model="list.isCheck" v-if="!removeallowshow"  @on-change="checkAllGroupChange()"></Checkbox>
                       <p>设备IP：<span>{{list.gatewayIp}}</span></p>
                   </div>
                    <p>安装地址：是否会的撒华枫科技士大夫艰苦和思考角度</p>
                    <p>项目名称：收到甲方汇报时间快点放开</p>
                    <p>授权端口数：3</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'personmanagedetail',
    components: {

    },
    data () {
      return {
        personshow:true,
        usermsg:[],
        certmsg:[],
        single:'',
        moveallowshow:true,
        removeallowshow:true,
        moves:false,
        devicelist:[],
        checklist:[],
      }
    },
    watch:{
      devicelist:{
        handler: function(val,odlval) {
          let Num = 0;
          for (let i = 0; i< val.length;i++){
            if(val[i].isCheck){
              this.$set(this,"moves",true)
            }else {
              Num++;
            }
          }
          if(Num == val.length){
            this.$set(this,"moves",false)
          }
        },
        deep:true
      }
    },
    created(){
    },
    mounted(){
      this.$http.get("oauth/certificate/getCertInfo",{userId:this.$route.query.uesrid},res=>{
          this.usermsg = res.data[0].userInfo
          this.certmsg = res.data[0].certInfo
      },err=>{});
      this.shebei();
    },
    methods: {
      shebei(){
        this.personshow = false
        this.$http.get("oauth/certificate/findAllBycertNo?certificate",{userId:this.$route.query.uesrid},res=>{
          console.log(res.data);
          this.devicelist = res.data;
          for (let i=0; i< this.devicelist.length; i++){
            this.$set(this.devicelist[i],'isCheck',false)
          }
        },err=>{})
      },
      renyuan(){
        this.personshow = true
      },
      move(){
        if(this.moveallowshow == true&&this.removeallowshow == true){
          this.moveallowshow = false
          this.removeallowshow = true
        }else if(this.moveallowshow == false){
          this.moveallowshow = true
        }else{
          this.removeallowshow = true
        }
      },
      moveallow(){
        this.devicelist.forEach (el=>{ if(el.isCheck == true){this.checklist.push(el.id)}})
        this.$http.delete("oauth/certificate/unboundCert",{userId:this.$route.query.uesrid,gatewayIds:JSON.stringify(this.checklist)},res=>{
          this.checklist = []
        },err=>{
        })
      },
      removeallow(){
        if( this.removeallowshow == true){
          this.removeallowshow = false
          this.moveallowshow = true
        }
      },
      checkAllGroupChange(){
        // this.devicelist.forEach (el=>{ if(el.isCheck == true){this.moves = true }})
      }
    }
  }
</script>
<style scoped>
.checkperson{
  color: #1D60FE;
  font-size: 16px;
  position: relative;
}
.detailbox p{
  margin-bottom: 5px
}
.detailbox img{
  border: 10px solid #D4E1FF;
  border-radius: 50%;
}
  .detailbox{
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
  }
  .lines{
    width: 45%;
    margin: 0 20px;
  }
.lines div:first-child{
   border-bottom: 1px solid #1D60FE;
 }
.lines div:last-child{
  border-bottom: 2px solid #1D60FE;
  margin-top: 1px;
}
  .personbox{
    /*background: red;*/
    margin: 20px 10% 5% 5%;
    position: relative;
  }
  .topline{
    border-bottom: 1px solid #1D60FE;
  }
  .msgtitle{
    font-size: 20px;
    border-left: 5px solid #1D60FE;
    text-align: left;
    margin-top: 20px;
    padding-left: 10px;
  }
.ivu-btn-primary{
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background: #3C7FEE;
  border: none;
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 40px;
}
  .content{
    margin: 1% 10% 0 12%;
    display: flex;
    justify-content: space-between;
    text-align: left;
    flex-wrap:wrap;
  }
.content div{
  width: 30%;
  min-width: 200px;
  margin-top: 5%;
}
.content div p{
  font-size: 14px;
}
.content div span{
  color: #3C7FEE;
}
  .contents{
    margin: 1% 10% 0 12%;
  }
.contents p{
  text-align: left;
  font-size: 14px;
}
  .morecontent{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .forbox{
    border-bottom:2px dashed #3C7FEE;
    position: relative;
    margin-top: 20px;
  }
  #checkone{
    position: absolute;
    bottom: -21px;
    left: 50px;
    right: 0;
    border: none;
    z-index:22;
  }
  #checkone2{
    position: absolute;
    bottom: -21px;
    left: 50px;
    border: none;
    z-index:22;
  }
  .timego{
    position: absolute;
    right: 0;
    top:-5px;
  }
  .buttons{
    position: absolute;
    right: 20px;
    top:20px;
  }
  .zhuanyixuke{
    margin: 0;
    padding: 5px 10px;
    border: 1px solid #2666FE;  //自定义边框
    outline: none;
    background: #fff;
    border-radius: 5px;
    font-size: 14px;
    color: #2666FE;
    margin-right: 20px;
  }
  .zhuanyixukes{
      margin: 0;
      padding: 5px 10px;
      border: 1px solid #1D60FE;  //自定义边框
  outline: none;
      background: #1D60FE;
      border-radius: 5px;
      font-size: 14px;
      color: #fff;
      margin-right: 20px;
  }
  .yichuxuke{
  margin: 0;
  padding: 5px 10px;
  border: 1px solid #F14855;  //自定义边框
  outline: none;
  background: #fff;
  border-radius: 5px;
  font-size: 14px;
  color: #F14855;
    }
    .yichuxukes{
        margin: 0;
        padding: 5px 10px;
        border: 1px solid #EF3543;  //自定义边框
        outline: none;
        background: #EF3543;
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
    }
</style>