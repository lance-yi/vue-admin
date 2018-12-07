<template>
    <div style="min-width: 1000px;padding-top: 70px;display:flex" class="divbox">
          <div  :class="righttmainshow?'leftmains':'leftmain'">
               <div class="control-top">
                 <p>网关状态：</p>
                     <!-- <Radio-group v-model="wgstate" @on-change="changewgstate($event)" >
                      <Radio label="nomal">
                          <span>正常</span>
                      </Radio>
                      <Radio label="abnormal">
                          <span>异常</span>
                      </Radio>
                  </Radio-group> -->
                  <CheckboxGroup v-model="wgstate">
                    <Checkbox label="1">
                        <span>正常</span>
                    </Checkbox>
                    <Checkbox label="0">
                        <span>异常</span>
                    </Checkbox>
                  </CheckboxGroup>
               </div>
               <div class="control-top">
                 <p>升级描述：</p>
                     <!-- <Radio-group v-model="updatedetail" @on-change="changeupdatedetail($event)" >
                      <Radio label="updateing">
                          <span>升级中</span>
                      </Radio>
                      <Radio label="hadupdate">
                          <span>可升级</span>
                      </Radio>
                      <Radio label="noupdate">
                          <span>无需升级</span>
                      </Radio>
                  </Radio-group> -->
                  <CheckboxGroup v-model="updatedetail">
                    <Checkbox label="1">
                        <span>升级中</span>
                    </Checkbox>
                    <Checkbox label="0">
                        <span>可升级</span>
                    </Checkbox>
                    <Checkbox label="2">
                        <span>无需升级</span>
                    </Checkbox>
                  </CheckboxGroup>
               </div>
               <div class="control-top">
                 <p style="margin-left:31px">其他：</p>
                 <i-input v-model="valuetable" placeholder="安装地址、IP、版本号、路口名称" style="width: 252px" ></i-input>
                 <i-button type="primary" class="sure" @click="serachtable" style="border-radius:4px">搜索</i-button>  
               </div>
               <div class="control-top" style="margin-top:30px">
                 <div class="butlist" style="border:1px solid #1d60fe;margin-right:10px;" @click="someup">
                   <img src="../../public/img/someup.png"/>
                   <span style="color:#1d60fe;">批量升级</span>
                 </div>
                 <div class="butlist" @click="allup">
                   <img src="../../public/img/allup.png"/>
                   <span style="color:#5CCEDD;">全量升级</span>
                 </div>
               </div>
               <Table border ref="selection" :columns="columns4" :data="data1" @on-selection-change="setupdate"></Table>
               <Page :total='totals' show-total class="fullpage" @on-change="changeliebiaopage"></Page>
          </div>
          <div :class="righttmainshow?'righttmain':'righttmains'">
               <img src="../../public/img/r1.png" style="position:absolute;left:0;top:30%;cursor:pointer" @click="righttmainshow = !righttmainshow" v-if="!righttmainshow"/>
               <img src="../../public/img/r2.png" style="position:absolute;left:0;top:30%;cursor:pointer" @click="righttmainshow = !righttmainshow" v-if="righttmainshow"/>
               <div class="control-top" @click="righttmainshow = !righttmainshow" style="cursor:pointer">
                 <p >升级包列表</p>
                 
               </div>
               <div class="control-top" style="float:right">
                 <div class="butlist" style="border:1px solid #1d60fe;margin-right:10px;" @click="addupdatebag">
                   <img src="../../public/img/add.png"/>&nbsp;&nbsp;
                   <span style="color:#1d60fe;" >新增</span>
                 </div>
                 <div class="butlist" style="border:1px solid red;" @click="deteleupdatebag" v-if="!allowdetele">
                   <img src="../../public/img/de.png" />&nbsp;&nbsp;
                   <span style="color:red;">删除</span>
                 </div>
                 <div class="butlist" style="border:1px solid red;" @click="allowdeteleupdatebag" v-if="allowdetele">
                   <img src="../../public/img/de.png" />&nbsp;&nbsp;
                   <span style="color:red;">确认删除</span>
                 </div>
               </div>
              <div class="timelinebox">
               <Timeline>
                <Timeline-item v-for="(list,index) in timelinedata" :key="index">
                <p class="time">{{list.upload_date}}</p>
                <p class="hour">{{list.upload_time}}</p>
                  <img src="../../public/img/z1.png" slot="dot" v-if="nomalshow"/>
                  <img src="../../public/img/nono.png" slot="dot" v-if="list.nono"  @click="checknono(list.id)"/>
                  <img src="../../public/img/19.png" slot="dot" v-if="list.isAlert == 4"  @click="checkicon(list.id)"/>
                
                   
                   <div class="timelinecont">
                      <p style="min-width:140px">版本号：<span >{{list.version}}</span></p>
                      <p style="min-width:240px">文件名：<span>{{list.file_name}}</span></p>
                      <p style="min-width:120px">上传人：<span>{{list.uploader}}</span></p>
                      
                   </div>
                   <p class="wgnum" style="min-width:200px">该版本网关数共：<span style="cursor:pointer" @click="versions(list.version)">{{list.versionCnt}}个</span></p>
                  
              </Timeline-item>
                
              </Timeline>
            </div>
            <div style="margin-top:10px;cursor:pointer" v-if="hadmore" @click="addmore">
              <span style="color:#1d60fe;font-size:14px">加载更多</span><img src="../../public/img/88.png"/>
            </div>
          </div>

          <div v-if="dailogshow" class="dailogbox">
              <p class="detailpage">新增</p>
              <img src="../../public/img/xxx.png" style="position:absolute;right:30px;top:20px" @click.stop="closebright" />
              <div style="padding:50px 30px">
                <div v-if="updatedatashow" style="margin-bottom:50px">
                  <span>附件：</span>
                  <label id="realBtn" class="btn btn-info">
                  <input type="file" id="fileInput1" name="file" class="mFileInput" style="left:-9999px;position:absolute;" @change="confirmupload()">
                      <img src="../../public/img/89.png" style="cursor:pointer;vertical-align:middle"/>
                  </label>
                  &nbsp;&nbsp;
                  <span >{{filesname}}</span>
                </div>
                <div class="uploadmsg" v-if="!updatedatashow">
                  <p>文件名：{{addlist.filename}}</p>
                  <p>版本号：{{addlist.version}}</p>
                  <p>上传人：{{addlist.userId}}</p>
                  <p>上传时间：{{addlist.uploadTime}}</p>
                </div>
                
              </div>
              <div style="padding:0 20%;display:flex;justify-content:space-between">
                <Button type="primary" style="background:#3C7FEE;border:none;padding-left: 30px;padding-right: 30px;" @click="allowadd" v-if="updatedatashow">确认</Button>
                <Button type="primary" style="background:#B5B5B5;border:none;padding-left: 30px;padding-right: 30px;" @click="closebright" v-if="updatedatashow">关闭</Button>
              </div>
          </div>
    </div>
</template>
<script>
// import ArcgisMaplog from "@/components/ArcgisMaplog";
  export default {
    name: 'update',
    components: {
        // ArcgisMaplog
    },
    data () {
      return {
        nomalshow:true,
        timelinedata:[],
        hadmore:false,
        righttmainshow:false,
        updatedatashow:true,
         columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '安装地址',
                        key: 'install_address'
                    },
                    {
                        title: 'IP地址',
                        key: 'gateway_ip',
                        width:120,
                    },
                    {
                        title: '路口/小区',
                        key: 'cross_village'
                    },
                    {
                        title: '版本号',
                        key: 'gateway_version',
                        width:100,
                    },
                    {
                        title: '升级状态',
                        key: 'state_name',
                        width:80,
                        render:(h,params)=>{
                          return h('span',{
                              style:{
                                color: (params.row.state_name=="升级中")?"#EC626B":(params.row.state_name=='可升级'?"#9CD875":"#7C7C7C"),
                                //  color:'#696C6F',
                            
                              }
                          },params.row.state_name)
                        }
                    }
                ],
         data1:[],
         wgstate:[],
         updatedetail:[],
         valuetable:'',
         dailogshow:false,
         filesname:'',
         files:[],
         addlist:[],
         allowdetele:false,
         totals:0,
         checkdata:[],
         checklist:[],
      }
    },
    created(){
    },
    mounted(){
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      console.log(h)
      document.getElementsByClassName("divbox")[0].style.height = (h-20)+'px'
        this.$http.post("res/upgrade/selectGatewayState",{current:1},res=>{
            this.data1 = res.data.list
            this.totals = res.data.total
            this.data1.forEach ((el,index)=>{
              if(el.state_name == '升级中' || el.state_name == '无需升级'){
                this.$set(this.data1[index],'_disabled',true)
              }
            })
          },err=>{});

          this.$http.get("res/upgrade/selectUpgradeList",{},res=>{
             this.timelinedata = res.data
          },err=>{});
    },
    methods: {
      //选择网关状态
       changewgstate(val){
         console.log(val)
       },
       //选择升级描述
       changeupdatedetail(val){
         console.log(val)
       },
       //关键字搜索
       serachtable(){
         console.log(this.valuetable)
         console.log(this.updatedetail)
         console.log(this.wgstate)
          this.$http.post("res/upgrade/selectGatewayState",{state:this.updatedetail,param:this.valuetable,current:1,gatewayState:this.wgstate},res=>{
             this.data1 = res.data.list
            this.totals = res.data.total
            this.data1.forEach ((el,index)=>{
              if(el.state_name == '升级中' || el.state_name == '无需升级'){
                this.$set(this.data1[index],'_disabled',true)
              }
            })
          },err=>{});
       },
       //新增升级包
       addupdatebag(){
         this.timelinedata.forEach ((el,index)=>{
           this.$set(this.timelinedata[index],'nono',false)
           this.$set(this.timelinedata[index],'isAlert',5)
           })
         this.allowdetele = false
         this.nomalshow = true
         this.dailogshow = true
         this.updatedatashow = true
         this.filesname = ''
       },
       closebright(){
         this.dailogshow = false
       },
       //上传升级包
       confirmupload(){
         this.files = document.getElementById('fileInput1').files
         var name = this.files[0].name
         var text =  this.files[0].name.substring(name.length-6,name.length)
         if(text == 'tar.gz'){
            this.filesname = this.files[0].name
         }else{
           this.filesname = ''
           this.$Message.error('升级包文件类型错误，请重新选择');
         }
       },
       //确认新增升级包
       allowadd(){
          if( this.filesname != ''){
             var formData = new FormData();
            formData.append('file',this.files[0],this.files[0].name);  
             this.$http.post("res/upgrade/addUpgradeJar",formData,res=>{
                if(res.rel == true){
                   this.$Message.info(res.message);
                   this.updatedatashow = false
                   this.addlist = res.data
                   this.$http.get("res/upgrade/selectUpgradeList",{},res=>{
                      this.timelinedata = res.data
                    },err=>{});
                }else{
                  this.$Message.error(res.message);
                }
            },err=>{});
            
          }else{
            this.$Message.error('请选择需要上传的升级包文件');
          }
          
       },
       setupdate(val){
         this.checkdata = val
       },
       //批量升级
       someup(){
         this.checklist = []
         this.checkdata.forEach ((el,index)=>{
           var obj = {'resid':el.id,'gateway_ip':el.gateway_ip}
             this.checklist.push(obj)
         })
         if(this.checklist.length > 0){
           this.$Modal.confirm({
              title: '您确定要批量升级吗',
              // content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
              onOk: () => {
                this.$http.post("res/upgrade/upgradeBatch",{param:this.checklist,upgradeType:0},res=>{
                    if(res.rel = true){
                       this.$Message.info(res.message);
                        this.$http.post("res/upgrade/selectGatewayState",{state:this.updatedetail,param:this.valuetable,current:1,gatewayState:this.wgstate},res=>{
                          this.data1 = res.data.list
                          this.totals = res.data.total
                          this.data1.forEach ((el,index)=>{
                            if(el.state_name == '升级中' || el.state_name == '无需升级'){
                              this.$set(this.data1[index],'_disabled',true)
                            }
                          })
                        },err=>{});
                    }else{
                       this.$Message.error(res.message);
                    }
                },err=>{});
              },
              onCancel: () => {
                  this.checkdata = []
                  this.data1.forEach ((el,index)=>{this.$set(this.data1[index],'_checked',false);}) 
              }
          });
         }else{
           this.$Message.error('请选择需要升级的网关');
         }
            
       },
       //全量升级
       allup(){
         this.data1.forEach ((el,index)=>{
            if(!el._disabled){
                this.$set(this.data1[index],'_checked',true)
            }
           })
            this.$Modal.confirm({
              title: '您确定要全量升级吗',
              // content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
              onOk: () => {
                this.$http.post("res/upgrade/upgradeBatch",{upgradeType:'all',state:["0"],gatewayState:this.wgstate,param:this.valuetable},res=>{
                    if(res.rel = true){
                       this.$Message.info(res.message);
                        this.$http.post("res/upgrade/selectGatewayState",{state:this.updatedetail,param:this.valuetable,current:1,gatewayState:this.wgstate},res=>{
                          this.data1 = res.data.list
                          this.totals = res.data.total
                          this.data1.forEach ((el,index)=>{
                            if(el.state_name == '升级中' || el.state_name == '无需升级'){
                              this.$set(this.data1[index],'_disabled',true)
                            }
                          })
                        },err=>{});
                    }else{
                       this.$Message.error(res.message);
                    }
                },err=>{});
              },
              onCancel: () => {
                  this.data1.forEach ((el,index)=>{this.$delete(this.data1[index],'_checked');}) 
              }
          });
       },
       changeliebiaopage(i){
             this.$http.post("res/upgrade/selectGatewayState",{current:i,state:this.updatedetail,param:this.valuetable,gatewayState:this.wgstate},res=>{
            this.data1 = res.data.list
            this.totals = res.data.total
            this.data1.forEach ((el,index)=>{
              if(el.state_name == '升级中' || el.state_name == '无需升级'){
                this.$set(this.data1[index],'_disabled',true)
              }
            })
          },err=>{});
       },
       deteleupdatebag(){
         this.timelinedata.forEach ((el,index)=>{this.$set(this.timelinedata[index],'nono',true);})
         this.nomalshow = false
         this.allowdetele = true
       },
       allowdeteleupdatebag(){
         var idlist = []
           this.timelinedata.forEach ((el,index)=>{
             if(el.isAlert == 4){
               var obj = {'id':el.id}
               idlist.push(obj);
             }
           })
           if(idlist.length > 0){
            this.$Modal.confirm({
              title: '您确定要删除吗',
              // content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
              onOk: () => {
                 this.$http.post("res/upgrade/deleteUpgrade",{param:idlist},res=>{
                     if(res.rel == true){
                       this.$Message.info('删除成功');
                       this.$http.get("res/upgrade/selectUpgradeList",{},res=>{
                        this.timelinedata = res.data
                        this.nomalshow = true
                        this.allowdetele = false
                      },err=>{});
                     }else{
                       this.$Message.error('删除失败');
                     }
                  },err=>{});
              },
              onCancel: () => {
                  this.allowdetele = false
                  this.timelinedata.forEach ((el,index)=>{this.$set(this.timelinedata[index],'nono',false);})
                  this.timelinedata.forEach ((el,index)=>{this.$set(this.timelinedata[index],'isAlert',5);})
                  this.nomalshow = true
              }
          });


           }else{
             this.allowdetele = false
             this.timelinedata.forEach ((el,index)=>{this.$set(this.timelinedata[index],'nono',false);})
             this.nomalshow = true

           }
       },
       checkicon(name, imgcheck, status) {
          this.timelinedata.forEach(el => {
            if (el.id == name) {
              (el.nono = true), (el.isAlert = 5);
            }
          });
        },
        checknono(name) {
          this.timelinedata.forEach(el => {
            if (el.id == name) {
              (el.nono = false), (el.isAlert = 4);
            }
          });
        },
       addmore(){

       },
       versions(id){
          this.$http.post("res/upgrade/selectGatewayState",{gatewayVersion:id,current:1,state:this.updatedetail,param:this.valuetable,gatewayState:this.wgstate},res=>{
             this.data1 = res.data.list
            this.totals = res.data.total
            this.data1.forEach ((el,index)=>{
              if(el.state_name == '升级中' || el.state_name == '无需升级'){
                this.$set(this.data1[index],'_disabled',true)
              }
            })
          },err=>{});
       }
    }
  }
</script>
<style scoped>
   .leftmain{
     width: 80%;
     min-height: 700px;
     box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
     padding: 20px;
     color: #696C6F;
   }
   .leftmains{
     width: 50%;
     min-height: 700px;
     box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
     padding: 20px;
     color: #696C6F;
   }
   .righttmains{
     width: 20%;
     height: 100%;
     min-height: 700px;
     box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
     margin-right: 20px;
     margin-left: 20px;
     padding: 20px;
     color: #696C6F;
     overflow: hidden;
     position: relative;
   }
   .righttmain{
     width: 50%;
     height: 100%;
     min-height: 700px;
     box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
     margin-right: 20px;
     margin-left: 20px;
     padding: 20px;
     color: #696C6F;
     position: relative;
   }
   .control-top{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .control-top p {
      font-size: 15px;
    }
    .butlist{
      padding: 5px 8px;
      border:1px solid #5CCEDD;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .sure {
      height: 32px;
      border-radius: 0;
      background: #1d60fe;
      width: 60px;
      padding: 0;
      border-radius: 0 4px 4px 0;
      margin-left: 10px;
    }
    .dailogbox{
      position: absolute;
      right: 3%;
      top: 220px;
      width: 20%;
      height: 50%;
      box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
      z-index: 22222;
      background: #fff;
    }
    .detailpage{
      margin: 0px 20px;
      border-bottom: 1px solid #C7C7C7;
      font-size:16px;
      text-align: left;
      padding: 10px 0;
    }
    .uploadmsg{
      text-align:left;
      margin-top: 30px;
    }
    .uploadmsg p{
      margin-bottom: 10px;
      font-size:14px;
    }
    .timelinecont {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
    .timelinecont p {
      text-align: left;
    }
    .time {
      position: absolute;
      left: -90px;
      top: -4px;
      font-size: 12px;
      color: #1d60fe;
    }
    .hour {
      position: absolute;
      left: -83px;
      top: 20px;
      font-size: 12px;
      color: #1d60fe;
    }
    .wgnum{
      text-align: left;
      font-size: 12px;
      margin-bottom: 30px;
      margin-top: 10px;
    }
    .wgnum span{
      display: inline-block;
      padding: 2px 5px;
      background: #1d60fe;
      color: #fff;
      border-radius: 4px;
    }
    .timelinebox{
      margin-top: 60px;
      padding-left: 90px;
      overflow-y: auto;
      padding-top: 7px;
      height: 80%;
    }
</style>
