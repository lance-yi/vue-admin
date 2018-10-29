<template>
  <div style="padding-left: 260px;min-width: 1000px;padding-top: 60px">
    <div class="centerbox">
      <div class="title" style="display:flex;">
        <p style="padding-right: 5px" @click="back">外场维护人员</p>
        <div><img src="../../public/img/big.png"/><span>页面详情</span></div>
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
      <div  class="msgtitle"><img src="../../public/img/sss.png"/>人员信息</div>
      <!-- <i-button type="primary">修改</i-button> -->
      <div class="content">
        <div>
          <p>姓名：</p>
          <span>{{usermsg.userName}}</span>
        </div>
        <div>
          <p>APP ID：</p>
          <span>{{usermsg.appId}}</span>
        </div>
        <div>
          <p>单位名称：</p>
          <span>{{usermsg.company}}</span>
        </div>
        <div>
          <p>性别：</p>
          <span style="color: #696C6F" v-if="usermsg.sex == 0">男</span>
          <span style="color: #696C6F" v-if="usermsg.sex == 1">女</span>
        </div>
        <div>
          <p>手机号：</p>
          <span>{{usermsg.mobile}}</span>
        </div>
        <div>
          <p>单位地址：</p>
          <span>{{usermsg.companyAddress}}</span>
        </div>
        <div>
          <p>年龄：</p>
          <span>{{usermsg.age}}</span>
        </div>
        <div>
          <p>邮箱号码：</p>
          <span>{{usermsg.email}}</span>
        </div>
        <div>
          <p>所属单位电话：</p>
          <span>{{usermsg.companyPhone}}</span>
        </div>
        <div>
          <p>身份证号：</p>
          <span>{{usermsg.idCard}}</span>
        </div>
      </div>
    </div>



    <div class="personbox" v-if="personshow">
      <div  class="msgtitle"><img src="../../public/img/mmm.png"/>证书信息</div>
      <div class="contents">
        <div v-for="(certlist,index) in certmsg" class="forbox" :key="index">
          <p style="font-size: 16px">证书编号：
            <span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.certificateNo}}</span>
            <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.certificateNo}}</span>
            <span v-if="certlist.certificateStatus == 1" style="color:#F15F69;">{{certlist.certificateNo}}</span>
          </p>
          <div class="morecontent">
            <p style="min-width: 60px">发证类型：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.certificateType}}</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.certificateType}}</span>
              <span v-if="certlist.certificateStatus == 1" style="color:#F15F69;">{{certlist.certificateType}}</span>
            </p>
            <p style="min-width: 180px">授权设备类型：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.installType}}</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.installType}}</span>
              <span v-if="certlist.certificateStatus == 1" style="color:#F15F69;">{{certlist.installType}}</span>
            </p>
            <p>发证日期：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.applyTime}}</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.applyTime}}</span>
              <span v-if="certlist.certificateStatus == 1" style="color:#F15F69;">{{certlist.applyTime}}</span>
            </p>
            <p>证书失效日期：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">{{certlist.endTime}}</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">{{certlist.endTime}}</span>
              <span v-if="certlist.certificateStatus == 1" style="color: #F15F69;">{{certlist.endTime}}</span></p>
            <p>证书状态：<span v-if="certlist.certificateStatus == 0" style="color: #3C7FEE;">正常</span>
              <span v-if="certlist.certificateStatus == 2" style="color: #ccc;">过期</span>
              <span v-if="certlist.certificateStatus == 1" style="color: #F15F69;">停用({{certlist.updateTime}})</span></p>
          </div>
          <img src="../../public/img/timego.png" class="timego" v-if="certlist.certificateStatus == 2"/>
          <button   class="qiyong" v-if="certlist.certificateStatus == 1"  @click="set(0,certlist.certificateNo)">启用</button>
          <button   class="tingyong" v-if="certlist.certificateStatus == 0" @click="set(1,certlist.certificateNo)">停用</button>
        </div>
      </div>
    </div>



    <div class="personbox" v-if="!personshow">
      <div class="topline"></div>
      <div  class="msgtitle" style="margin-top: 25px;min-width: 300px;width:30%;" v-if="moveallowshow"><img src="../../public/img/uuu.png"/>当前责任人信息</div>
      <div  class="msgtitle" style="margin-top: 25px" v-if="!moveallowshow">当前责任人管理设备共<p>{{total.total}}</p>台</div>
      <div class="buttons">
        <button   class="zhuanyixuke" v-if="moveallowshow" @click="move">转移许可</button>
          <button   class="zhuanyixukes" v-if="!moveallowshow" @click="move">返回</button>
        <button  @click="removeallow"   :class="removeallowshow ? 'yichuxuke' : 'yichuxukes'" v-if="!moves">移除许可</button>
          <button  @click="moveallow"   class='yichuxukes' v-if="moves">确认移除</button>
      </div>
      <div style="display: flex;align-items: center;" v-if="!moveallowshow">
        <div  class="movebox">
          <div style="width: 90%">
            <div class="morecontent">
              <p>姓名：<span style="color:#1D60FE">{{usermsg.userName}}</span></p>
              <p>单位名称：<span style="color:#1D60FE">{{usermsg.company}}</span></p>
              <p>手机号：<span style="color:#1D60FE">{{usermsg.mobile}}</span></p>
              <p>单位地址：<span style="color:#1D60FE">{{usermsg.companyAddress}}</span></p>
            </div>
          </div>
          <div class="left-box">
            <div  class="forbox" v-for="(list,index) in devicelist" :key="index" style="min-width:700px;margin-right:20px">
              <div class="morecontent" style="width: 50%">
                <div style="display: flex">
                  <Checkbox v-model="list.isChecks"   @on-change="checkAllGroupChange()"></Checkbox>
                  <p style="min-width:140px">设备IP：<span>{{list.gatewayIp}}</span></p>
                  <!-- <p style="min-width:140px">设备IP：<span>1234567891</span></p> -->
                </div>

                <div style="display: flex;min-width:200px;margin-left: 10px">
                  <p>安装地址：</p>
                  <!-- <span style="text-align:left;flex: 1">按时间大数据看多了就暗水电费健康了时代峰峻示阿斯加</span> -->
                  <span style="text-align:left;flex: 1">{{list.installAddress}}</span>
                </div>
                 <div style="display: flex;min-width:200px;margin-left: 10px">
                <p >项目名称：</p>
                <span style="text-align:left;flex: 1">{{list.projectName}}</span>
                 </div>
                <p style="min-width:120px;margin-left: 5px">授权端口：{{list.ifPort}}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src="../../public/img/12.png" style="margin:0 10px;"/>
        </div>
        <div style="width:30%;min-width:300px;margin-top:20px">
          <div style="display:flex; align-items: center;">
            <i-input v-model="serachvalue" placeholder="请输入..." style="width: 220px" class="sousuo"></i-input>
            <button type="primary" class="sure"  @click="serach">搜索</button>
          </div>
        <div >
          <div class="companybox">
              <div v-for="(commsg,index) in companylist" @click="checkcompany(index)" :key="index">
                <span :class="commsg.more?'companybox-span':'companybox-spans'">姓名：</span>
                <span :class="commsg.more?'companybox-span':'companybox-spans'">{{commsg.userName}}</span>
                <span :class="commsg.more?'companybox-span':'companybox-spans'" style="margin-left:10px">单位名称：</span>
                <span :class="commsg.more?'companybox-span':'companybox-spans'">{{commsg.company}}</span>
              </div>
          </div>
          <div style="border:1px solid #1D60FE;border-top:none;padding:20px 0 ;"><button   class="zhuanyixukes" style="padding:4px 10px;margin-right:0;" @click="macksure">确定</button></div>
        </div>
        </div>
      </div>
      
        <div class="left-msgbpx" v-if="moveallowshow">
          <img src="../../public/img/rens.png"/>
            <div>
                <p><span style="font-size:25px">{{usermsg.userName}}</span></p>
                <p>单位名称：<span>{{usermsg.company}}</span></p>
                <p>单位地址：<span>{{usermsg.companyAddress}}</span></p>
                <p>手机号：<span>{{usermsg.mobile}}</span></p>
                <div  class="msgtitle" style="border:none;min-width:220px;padding-left:0;font-size:14px;margin-top:0;" v-if="moveallowshow">当前责任人管理设备共<p style="padding:2px 5px;">{{total.total}}</p>台</div>   
            </div>
        </div>
        <div class="rightbox-remove" v-if="moveallowshow">
          <div  class="msgtitle" style="margin-top: 10px;width:100%;min-width:600px" v-if="moveallowshow"><img src="../../public/img/yyy.png"/>当前责任人管理设备</div>
            <div  class="forbox" v-for="(list,index) in devicelist" :key="index" v-if="moveallowshow" style="min-width:700px;width:100%;text-align:left;">
                <div class="morecontent">
                   <div style="display: flex">
                       <Checkbox v-model="list.isCheck" v-if="!removeallowshow"  @on-change="checkAllGroupChange()"></Checkbox>
                       <p style="min-width:140px">设备IP：<span>{{list.gatewayIp}}</span></p>
                   </div>
                  <div style="display: flex;min-width:200px;margin-left: 10px">
                  <p>安装地址：</p>
                  <!-- <span style="text-align:left;flex: 1">按时间大数据看多了就暗水电费健康了时代峰峻示阿斯加</span> -->
                  <span style="text-align:left;flex: 1">{{list.installAddress}}</span>
                </div>
                 <div style="display: flex;min-width:200px;margin-left: 10px">
                    <p>项目名称：</p>
                    <span style="text-align:left;flex: 1">{{list.projectName}}</span>
                 </div>
                    <p style="min-width:120px;margin-left: 5px">授权端口：{{list.ifPort}}</p>
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
        serachvalue:'',
        value:'',
        personshow:true,
        usermsg:[],
        certmsg:[],
        single:'',
        moveallowshow:true,
        removeallowshow:true,
        moves:false,
        devicelist:[],
        checklist:[],
        total:[],
        companylist:[],
        checkone:'',
        makelist:[],
        oldcertificateNo:'',
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
          if(res.data[0].certInfo[0] !== null){
            this.certmsg = res.data[0].certInfo
            this.certmsg.forEach (el=>{ if(el.certificateStatus == 0) {this.oldcertificateNo = el.certificateNo}})
          }
          this.personshow = true
      },err=>{});
      this.$http.get("oauth/certificate/findUser",{},res=>{
          this.companylist = res.data
           this.companylist.forEach (el=>{ el.more = 'true'})
      },err=>{});
      this.shebei();
    },
    methods: {
      shebei(){
        this.personshow = false
        this.$http.get("oauth/certificate/findAllBycertNo?certificate",{userId:this.$route.query.uesrid},res=>{
          if( res.data[1].total !== 0){
            this.devicelist = res.data[0];
            this.total = res.data[1];
            for (let i=0; i< this.devicelist.length; i++){
              this.$set(this.devicelist[i],'isCheck',false)
              this.$set(this.devicelist[i],'isChecks',false)
            }
          }else{
            this.total.total = 0
            this.devicelist =[]
          }
         
        },err=>{})
      },
      renyuan(){
        this.personshow = true
      },
      move(){
        if(this.devicelist.length == 0){
          this.$Message.info('目前没有设备可以转移');
        }
        this.moves = false
        this.devicelist.forEach (el=>{ {el.isCheck = false}})
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
        this.checklist = []
        this.devicelist.forEach (el=>{ if(el.isCheck == true){this.checklist.push(el.id)}})
        this.$http.delete("oauth/certificate/unboundCert",{userId:this.$route.query.uesrid,gatewayIds:JSON.stringify(this.checklist)},res=>{
          this.$Message.info(res.message);
          this.moves = false
          this.shebei()
        },err=>{
        })
      },
      removeallow(){
        if(this.devicelist.length == 0){
          this.$Message.info('目前没有设备可以转移');
        }
        if( this.removeallowshow == true){
          this.removeallowshow = false
          this.moveallowshow = true
        }
      },
      checkAllGroupChange(){
        // this.devicelist.forEach (el=>{ if(el.isCheck == true){this.moves = true }})
      },
      back(){
        this.$router.push({path: '/personmanage'});
      },
      set(status,cardno){
        if(status == 0){
          this.$Modal.confirm({
            title: '您确定要启用吗',
            // class-name："vertical-center-modal"，
            onOk: () => {
              this.$http.put("oauth/certificate/isDisable",{certificateNo:cardno,certificateStatus:status},res=>{
                this.$http.get("oauth/certificate/getCertInfo",{userId:this.$route.query.uesrid},res=>{
                  this.certmsg = res.data[0].certInfo
                  this.personshow = true
                },err=>{});
              },err=>{
              })
            },
            onCancel: () => {
            }
          });
        }else if(status == 1){
          this.$Modal.confirm({
            title: '您确定要停用吗',
            onOk: () => {
              this.$http.put("oauth/certificate/isDisable",{certificateNo:cardno,certificateStatus:status},res=>{
                this.$http.get("oauth/certificate/getCertInfo",{userId:this.$route.query.uesrid},res=>{
                  this.certmsg = res.data[0].certInfo
                  this.personshow = true
                },err=>{});
              },err=>{
              })
            },
            onCancel: () => {
            }
          });
        }
      },
      serach(){
        this.$http.get("oauth/certificate/findUser",{value:this.serachvalue},res=>{
          this.companylist = res.data
        },err=>{
        })
      },
      checkcompany(index){
          this.checkone = this.companylist[index].certificateNo
       for (let i = 0; i<this.companylist.length;i++){
        //  this.companylist[index].more = true
            if(i == index){
              this.companylist[index].more = false
            }else{
              this.companylist[i].more = true
            }
          }
      },
      macksure(){
        this.makelist=[]
         this.devicelist.forEach (el=>{ if(el.isChecks == true) {this.makelist.push(el.id)}})
        //  console.log(this.makelist)
        //  console.log(this.checkone)
        //  console.log(this.usermsg.certificateNo)
         if(this.makelist == ''){
           this.$Modal.info({
                title:'您还没有选择需要转移的设备' ,
                content: '',
            });
         }else if(this.checkone == ''){
            this.$Modal.info({
                title:'您还没有选择转移的设备人员' ,
                content: '',
            });
         }else{
           this.$Modal.confirm({
          title: '您确定要转移吗',
        // content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
         onOk: () => {
           this.$http.put("oauth/certificate/gatewayChangeUser",{certificateNo:this.checkone,gatewayIds:this.makelist,oldCertificateNo:this.oldcertificateNo},res=>{
          
          // location.reload();
          this.$Message.info(res.message);
          this.shebei()
            },err=>{
            })
        },
        onCancel: () => {
        }
      });
          
         }
      }
    }
  }
</script>
<style scoped>
.checkperson{
  color: #1D60FE;
  font-size: 16px;
  position: relative;
  cursor:pointer;

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
    margin: 20px 5% 3% 5%;
    position: relative;
    min-width: 1100px;
  }
  .topline{
    border-bottom: 1px solid #1D60FE;
    min-width:900px;
  }
  .msgtitle{
    font-size: 16px;
    border-bottom: 1px solid #DDDDDD;
    text-align: left;
    height: 40px;
    padding-left: 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    min-width:900px;
  }
.msgtitle p{
  background: #1D60FE;
  font-size: 18px;
  color: #fff;
  padding: 1px 4px;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  margin-right: 5px;
  margin-left: 5px;
}
.msgtitle img{
  margin-right: 5px;
}
.ivu-btn-primary{
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background: #3C7FEE;
  border: none;
  font-size: 14px;
  position: absolute;
  right: 20px;
  top: 65px;
}
  .content{
    margin: 1% 10% 0 8%;
    display: flex;
    justify-content: space-between;
    text-align: left;
    flex-wrap:wrap;
    min-width:800px;
  }
.content div{
  width: 30%;
  min-width: 200px;
  margin-top: 25px;
  display: flex;
  align-items: center;
}
.content div p{
  font-size: 14px;
  min-width: 100px;
  max-width: 120px;
  text-align: right;
}
.content div span{
  color: #3C7FEE;
  font-size: 14px;
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
    font-size: 14px;
  }
  .forbox{
    border-bottom:2px dashed #3C7FEE;
    position: relative;
    margin-top: 20px;
    min-width: 1000px;
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
    z-index:222;
  }
  
    .yichuxuke{
      margin: 0;
      padding: 5px 10px;
      border: 1px solid #F14855; 
      outline: none;
      background: #fff;
      border-radius: 5px;
      font-size: 14px;
      color: #F14855;
      cursor:pointer;
    }
    .yichuxukes{
        margin: 0;
        padding: 5px 10px;
        border: 1px solid #EF3543;  
        outline: none;
        background: #EF3543;
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
        cursor:pointer;
    }
  .qiyong{
    right:0;
    top:0;
    position: absolute;
    margin: 0;
    padding: 2px 10px;
    border: 1px solid #2666FE;  
    outline: none;
    background:#fff;
    border-radius:5px;
    font-size:14px;
    color:#2666FE;
    cursor:pointer;
  }
  .tingyong{
    right:0;
    top:0;
    position: absolute;
    margin: 0;
    padding: 2px 10px;
    border: 1px solid #F14855;  
    outline: none;
    background: #fff;
    border-radius: 5px;
    font-size: 14px;
    color:#F14855;
    cursor:pointer;
  }
  .movebox{
    padding: 30px 0px 30px 1%;
    padding-right:0;
    width: 70%;
  }
  .sure{
        height: 32px;
        border-radius: 0;
        background: #1D60FE;
        width: 50px;
        padding: 0;
        border-radius: 0 4px 4px 0;
        line-height: 32px;
         outline: none;
         border: none;
         color: #fff;
    }
    .companybox{
      border: 1px solid #1D60FE;
      margin-top: 15px;
      height: 400px;
      overflow:auto;
      border-bottom: none;
    }
    .companybox-span{
      font-size: 14px;
    }
    .companybox-spans{
      font-size: 18px;
      color: #1D60FE;
    }
    .companybox div{
      border-bottom: 1px solid #ddd;
      line-height: 50px;
      margin: 0 10px;
    }
    .companybox div:last-child{
      margin-bottom: 20px;
    }
    .left-box{
      border:1px solid #1D60FE;
      /* width: 62%; */
      min-width: 750px;
      padding-left: 20px;
      padding-bottom: 20px;
      /* margin-left:-50px; */
      height:400px;
      overflow: auto;
    }
    .left-msgbpx{
      min-width: 300px;
      width: 30%;
      display: flex;
      justify-content: center;
      padding: 100px 0 0 10px;
    }
    .left-msgbpx img{
      margin-right: 30px;
      height: 120px;
    }
    .left-msgbpx p {
      font-size: 14px;
      padding: 10px 0;
      text-align: left
    }
    .rightbox-remove{
      border-left:1px solid #1D60FE;
      padding-left:20px;
      height:500px;
      overflow:auto;
      min-width:750px;
      width:65%;
      padding-bottom:40px;
      position:absolute;
      right:0;
      top:16px;
      left:32%;
    }
</style>