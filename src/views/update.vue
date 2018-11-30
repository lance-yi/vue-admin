<template>
    <div style="min-width: 1000px;padding-top: 70px;display:flex">
          <div class="leftmain">
               <div class="control-top">
                 <p>网关状态：</p>
                     <Radio-group v-model="wgstate" @on-change="changewgstate($event)" >
                      <Radio label="nomal">
                          <span>正常</span>
                      </Radio>
                      <Radio label="abnormal">
                          <span>异常</span>
                      </Radio>
                  </Radio-group>
               </div>
               <div class="control-top">
                 <p>升级描述：</p>
                     <Radio-group v-model="updatedetail" @on-change="changeupdatedetail($event)" >
                      <Radio label="updateing">
                          <span>升级中</span>
                      </Radio>
                      <Radio label="hadupdate">
                          <span>可升级</span>
                      </Radio>
                      <Radio label="noupdate">
                          <span>无需升级</span>
                      </Radio>
                  </Radio-group>
               </div>
               <div class="control-top">
                 <p style="margin-left:31px">其他：</p>
                 <i-input v-model="valuetable" placeholder="安装地址、IP、版本号、路口名称" style="width: 252px" ></i-input>
                 <i-button type="primary" class="sure" @click="serachtable" style="border-radius:4px">搜索</i-button>  
               </div>
               <div class="control-top" style="margin-top:30px">
                 <div class="butlist" style="border:1px solid #1d60fe;margin-right:10px;">
                   <img src="../../public/img/someup.png"/>
                   <span style="color:#1d60fe;">批量升级</span>
                 </div>
                 <div class="butlist">
                   <img src="../../public/img/allup.png"/>
                   <span style="color:#5CCEDD;">全量升级</span>
                 </div>
               </div>
               <Table border ref="selection" :columns="columns4" :data="data1"></Table>
          </div>
          <div class="righttmain">
               <div class="control-top">
                 <p>升级包列表</p>
               </div>
               <div class="control-top" style="float:right">
                 <div class="butlist" style="border:1px solid #1d60fe;margin-right:10px;" @click="addupdatebag">
                   <img src="../../public/img/add.png"/>&nbsp;&nbsp;
                   <span style="color:#1d60fe;" >新增</span>
                 </div>
                 <div class="butlist" style="border:1px solid red;">
                   <img src="../../public/img/de.png" />&nbsp;&nbsp;
                   <span style="color:red;">删除</span>
                 </div>
               </div>
          </div>

          <div v-if="dailogshow" class="dailogbox">
              <p class="detailpage">新增</p>
              <img src="../../public/img/xxx.png" style="position:absolute;right:30px;top:20px" @click.stop="closebright" />
              <div style="padding:30px 0">
                <span>附件：</span>
                <label id="realBtn" class="btn btn-info">
                <input type="file" id="fileInput1" name="file" class="mFileInput" style="left:-9999px;position:absolute;" @change="confirmupload()">
                    <img src="../../public/img/89.png" style="cursor:pointer;vertical-align:middle"/>
                </label>
              </div>
              <div style="padding:0 20%;display:flex;justify-content:space-between">
                <Button type="primary" style="background:#3C7FEE;border:none;padding-left: 30px;padding-right: 30px;">确认</Button>
                <Button type="primary" style="background:#B5B5B5;border:none;padding-left: 30px;padding-right: 30px;" @click="closebright">关闭</Button>
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
         columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '安装地址',
                        key: 'name'
                    },
                    {
                        title: 'IP地址',
                        key: 'age'
                    },
                    {
                        title: '路口/小区',
                        key: 'address'
                    },
                    {
                        title: '版本号',
                        key: 'address'
                    },
                    {
                        title: '升级状态',
                        key: 'address'
                    }
                ],
         data1:[],
         wgstate:'',
         updatedetail:'',
         valuetable:'',
         dailogshow:false,
      }
    },
    created(){
    },
    mounted(){
    //   console.log(window.g.ApiUrl)
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

       },
       //新增升级包
       addupdatebag(){
         this.dailogshow = true
       },
       closebright(){
         this.dailogshow = false
       },
       //上传升级包
       confirmupload(){
         var files = document.getElementById('fileInput1').files
         console.log(files)
       }
    }
  }
</script>
<style scoped>
   .leftmain{
     width: 70%;
     min-height: 700px;
     box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
     padding: 20px;
     color: #696C6F;
   }
   .righttmain{
     width: 30%;
     height: 100%;
     min-height: 700px;
     box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
     margin-right: 20px;
     margin-left: 20px;
     padding: 20px;
     color: #696C6F;
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
      top:20%;
      width: 20%;
      height: 50%;
      box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
    }
    .detailpage{
      margin: 0px 20px;
      border-bottom: 1px solid #C7C7C7;
      font-size:16px;
      text-align: left;
      padding: 10px 0;
    }
</style>
