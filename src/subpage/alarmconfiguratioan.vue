<template>
    <div >
        
        <div style="padding:0 20px;text-align:left" >
                  
                  <button   class="zhuanyixuke" style="border:1px solid #5ECEDD;color:#5ECEDD" @click="addrole">新增组</button>
                  <button   class="zhuanyixuke" style="border:1px solid #1D60FE;color:#1D60FE" @click="addalert">新增告警类型</button>
                  <!-- <button   class="zhuanyixuke" @click="changerole">修改</button> -->
                  <button   class="zhuanyixuke" style="border:1px solid #E15C5C;color:#E15C5C;margin-bottom:20px" @click="detelerole">删除</button>
                   <!-- <button   class="zhuanyixukes" @click="power">分配权限</button>
                  <button   class="zhuanyixukes" @click="allotuser">分配用户</button> -->
                      <Row>
                       <Col span="7" style="margin-right: 20px;">
                           <div class="head-left">告警类型管理</div>
                           <div style="border:1px solid  #e8eaec;padding-left:20px">
                              <Tree :data="data3"  show-checkbox @on-select-change="checkrole" :scheck-strictly="true" @on-check-change="getCheckedNodes" ></Tree>
                           </div>
                       </Col>
                        <Col span="16">
                         <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:-55px;right:0%"  @click="edit" v-if="gruopdata.length>0||alertdata.length > 0">编辑</button>
                      <button   class="zhuanyixuke"  style="padding:5px 30px;position:absolute;top:-55px;right:105px"   v-if="!editorshow" @click="backeditor">返回</button>
                       <button   class="zhuanyixukes"  style="padding:5px 30px;position:absolute;top:-55px;right:0%"   v-if="!editorshow" @click="saveeditor">保存</button>
                           <div style="display:flex;" v-if="gruopdata.length>0">
                               <div style="display:flex;min-width:50%">
                                  <p>告警分组编码：</p>
                                  <span >{{gruopdata[0].code}}</span>
                              </div>
                              <div style="display:flex">
                                  <p>告警分组名称：</p>
                                  <span v-if="editorshow">{{gruopdata[0].name}}</span>
                                  <Input v-if="!editorshow"  v-model="gruopdata[0].name" style="width: 160px;margin-top: 0" />
                              </div>
                           </div>
                           <div style="display:flex;margin-top:30px" v-if="alertdata.length > 0">
                               <div style="display:flex;min-width:50%">
                                  <p>告警类型编码：</p>
                                  <span >{{alertdata[0].code}}</span>
                              </div>
                              <div style="display:flex">
                                  <p>告警类型名称：</p>
                                  <span v-if="editorshow">{{alertdata[0].name}}</span>
                                  <Input v-if="!editorshow"  v-model="alertdata[0].name" style="width: 160px;margin-top: 0" />
                              </div>
                           </div>
                           <div style="display:flex;;margin-top:30px" v-if="alertdata.length > 0">
                              <div style="display:flex;min-width:50%">
                                  <p>告警类型等级：</p>
                                  <span v-if="editorshow">{{alertdata[0].levelName}}</span>
                                  <Select v-model="alertdata[0].level" filterable  v-if="!editorshow" style="width:170px">
                                    <Option v-for="item in levellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                              </div>
                              <div style="display:flex">
                                  <p>告警所属资源：</p>
                                  <span v-if="editorshow">{{alertdata[0].diviceName}}</span>
                                  <Select v-model="alertdata[0].resType" filterable  v-if="!editorshow" style="width:170px">
                                    <Option v-for="item in citylist" :value="item.label" :key="item.value">{{ item.value }}</Option>
                                </Select>
                              </div>
                           </div>
                           <div style="display:flex;margin-top:30px" v-if="alertdata.length > 0">
                               <div style="display:flex;min-width:50%">
                                  <p>告警分组：</p>
                                  <span v-if="editorshow">{{alertdata[0].groupName}}</span>
                                  <Input v-if="!editorshow"  v-model="alertdata[0].groupName" style="width: 160px;margin-top: 0"  @on-focus="jwmap"/>
                              </div>
                           </div>
                       </Col>
                      </Row>
                 </div>
         
                 
          <Modal
            v-model="modal4"
            :title="titledata"
            @on-ok="okrole('formrole')"
            >
             <Form ref="formrole" :model="formrole" :rules="rulerole" :label-width="100" >
                <p style="padding-left: 16px;font-size: 13px;margin-bottom: 10px;" v-if="this.clickarea.length>0">父组 ：<span style="margin-left: 29px;" >{{clickarea[0].name}}</span></p>
                <FormItem label="告警分组编码" prop="num" >
                    <Input v-model="formrole.num" />
                </FormItem>
                <FormItem label="告警分组名称" prop="name" >
                    <Input v-model="formrole.name" />
                </FormItem>
             </Form>
        </Modal>       
          

        <Modal
            v-model="modal5"
            title="新增告警类型"
            @on-ok="okuser('formroles')"
            >
            <Form ref="formroles" :model="formroles" :rules="ruleroles" :label-width="100" >
                <p style="padding-left: 16px;font-size: 13px;margin-bottom: 10px;" v-if="this.clickarea.length>0">告警分组名称 ：<span style="margin-left: 29px;" >{{clickarea[0].name}}</span></p>
                <FormItem label="告警类型编码" prop="num" >
                    <Input v-model="formroles.num" />
                </FormItem>
                <FormItem label="告警类型名称" prop="names" >
                    <Input v-model="formroles.names" />
                </FormItem>
                <FormItem label="告警类型等级" prop="lever" >
                    <Select v-model="formroles.lever" placeholder="请选择">
                    <Option :value="list.value" v-for="(list,index) in levellist" :key="index">{{list.label}}</Option>
                </Select>
                </FormItem>
                <FormItem label="告警所属资源" prop="city">
                <Select v-model="formroles.city" placeholder="请选择">
                    <Option :value="list.label" v-for="(list,index) in citylist" :key="index">{{list.value}}</Option>
                </Select>
            </FormItem>
             </Form>
        </Modal>


        


       
        <div v-if="modal6" style="min-height: 100px;background: #fff;position:absolute; right: 33%;top: 24%;min-width: 300px;border: 1px solid #999;z-index: 555;text-align: left;padding: 10px;" >
         <img src="../../public/img/xxx.png" @click.stop="modal6 = false" style="position:absolute;top:8%;left: 90%;z-index: 555;"/>
          <Tree :data="data1" @on-select-change="checkdata"></Tree>
       </div>



       
       
    </div>
</template>
<script>
// import TreeGrid from '@/components/treeGrid2.0'
import axios from 'axios'
  export default {
    name: 'alarmconfiguratioan',
    components: {
        // TreeGrid
    },
    data () {
      return {
          citylist:[],
          model12: 'Canberra',
          editorshow:true,
          titledata:"新增告警类型分组",
          totals:0,
          data1:[],
          data2:[],
          userlist:[],
          bb:0,
          treevalue:0,
          treelist:[],
          value:'',
          searchUsertotla:0,
          modal6:false,
          modal5:false,
          colornum:'xx',
          roletabledata:[],
          addrolenum:0,
          modal4:false,
          roledata:[],
          rolelist:[],
          aa:0,
          modal3:false,
          edittile:'',
          persontitle:'',
          passworkshow:true,
          showpage:true,
          pages:1,
          total:0,
          serachvalue:'',
          nopersonadd:0,
          persondata:[],
          attrlist:[],
          modal1:false,
          modal2:false,
          roletablehead:[{title: '用户名',key: 'personName',align: 'center'},
            // {title: '姓名',key: 'person_name',align: 'center'},
            {title: '部门',key: 'titile',align: 'center',
               render:(h,params)=>{
                          return h('div', {
                                 style:{
                                 'color':'#696C6F',
                                 'cursor':'default'
                                },
                           },params.row.department.deptName)
                          }
            }
            ],
            formrole:{
              name: '',
              num:'',
          },
          formroles:{
              names: '',
              num:'',
              lever:'',

          },
            rulerole:{
              name: [
                    { required: true, message: '告警分组名称不能为空', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '告警分组编码不能为空', trigger: 'blur' }
                ],
          },
          ruleroles:{
               names: [
                    { required: true, message: '告警分组名称不能为空', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '告警分组编码不能为空', trigger: 'blur' }
                ],
                lever: [
                    { required: true, message: '告警分组编码不能为空', trigger: 'blur' }
                ],
                city: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
          },
          columns1:[
              {type: 'selection',width: 60,align: 'center',},
              {title: '姓名',key: 'personName',width:150,align: 'center',},
              {title: '登录账号',key: 'account',align: 'center'},
              {title: '部门',key: 'department',width:150,align: 'center',
              render:function(h,params){
                                return h('span',params.row.department?params.row.department.deptName:''); 
                            }  
              },
              {title: '公司名称',key: 'company',align: 'center'},
          ],
          deteleperson:[],
          personolddata:[],
          chenckname:'人员配置',
          passid:'',
          clickarea:[],
          detelearealist:[],
          data3:[],
          gruopdata:[],
          alertdata:[],
          levellist:[],
      }
    },
    created(){
    },
    mounted(){
        this.$http.get("alert/baseAlert/getResDevice",{},res=>{
            this.citylist = res.data
            },err=>{});
        axios({
            method: 'get',
            url: 'alert/baseAlert/getAllAlertGroup',
            baseURL: window.g.ApiUrl,
            dataType: 'json',
            headers:{
             Authorization:localStorage.getItem('token'),
            },
            data:{}
          }).then(res=>{
             this.data3 = res.data
          })
       this.$http.get("/oauth/dict/selectDictCommon?",{dictCodes:'alertTypeLevel'},res=>{
              this.levellist = res.data
            },err=>{});
       axios({
            method: 'get',
            url: 'alert/baseAlert/getGroup',
            baseURL: window.g.ApiUrl,
            dataType: 'json',
            headers:{
             Authorization:localStorage.getItem('token'),
            },
            data:{}
          }).then(res=>{
             this.data1 = res.data
          })
     
    },
    methods: {
       changerole(){
          this.addrolenum = 1
          if(this.clickarea.length == 0){
              this.$Message.error('请选择想要修改的行政区划！');
          }else{
              this.modal4 = true
              this.formrole.name = this.clickarea[0].areaName
              this.formrole.num = this.clickarea[0].areaCode
          }
      },
      okrole(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                if(this.clickarea.length == 1){
                  this.$http.post("alert/baseAlert/addAlertGroup",{
                    code:this.formrole.num,
                    name:this.formrole.name,
                    parentId:this.clickarea[0].id,
                    },res=>{
                        this.$Message.info(res.message);
                        axios({
                            method: 'get',
                            url: 'alert/baseAlert/getAllAlertGroup',
                            baseURL: window.g.ApiUrl,
                            dataType: 'json',
                            headers:{
                            Authorization:localStorage.getItem('token'),
                            },
                            data:{}
                        }).then(res=>{
                            this.data3 = res.data
                            this.clickarea = []
                        })
                    },err=>{
                    })
                }else{
                    this.$http.post("alert/baseAlert/addAlertGroup",{
                    code:this.formrole.num,
                    name:this.formrole.name,
                    parentId:'',
                    },res=>{
                        this.$Message.info(res.message);
                        axios({
                            method: 'get',
                            url: 'alert/baseAlert/getAllAlertGroup',
                            baseURL: window.g.ApiUrl,
                            dataType: 'json',
                            headers:{
                            Authorization:localStorage.getItem('token'),
                            },
                            data:{}
                        }).then(res=>{
                            this.data3 = res.data
                            this.clickarea = []
                        })
                    },err=>{
                    })
                }
                    
               
            } else {
                this.$Message.error('请填写完整');
            }
        })
      },
      addrole(){
          if(this.clickarea.length == 0){
            this.titledata="新增告警类型分组"
            this.modal4 = true
            this.formrole.name = ''
            this.formrole.num = ''
            this.roledata = []
          }else if(this.clickarea.length == 1&&this.clickarea[0].type == 'group'){
            this.titledata="新增告警类型分组"
            this.modal4 = true
            this.formrole.name = ''
            this.formrole.num = ''
            this.roledata = []
          }else{
             this.$Message.error('不能在告警类型下面新增组');
          }
          
      },
      detelerole(){
          if(this.detelearealist.length == 0){
             this.$Message.error('请选择想要删除的条项！');
          }else{
              var list = []
             this.detelearealist.forEach (el=>{list.push({id:el.id,type:el.type,code:el.code})})

              this.$http.delete("alert/baseAlert/deleteAlertType",list,res => {
                      this.$Message.info(res.message);
                        axios({
                            method: 'get',
                            url: 'alert/baseAlert/getAllAlertGroup',
                            baseURL: window.g.ApiUrl,
                            dataType: 'json',
                            headers:{
                            Authorization:localStorage.getItem('token'),
                            },
                            data:{}
                        }).then(res=>{
                            this.data3 = res.data
                        })
                    },
                    err => {}
                    );
          }
      },
      checkrole(val){
          this.pages = 1
          this.clickarea = val
          if(val.length != 0){
            if(val[0].type == 'group'){
                this.$http.get("alert/baseAlert/selectAlertGroupMsg",{id:val[0].id},res=>{
                   this.gruopdata = res.data
                   this.alertdata = []
                },err=>{});
            }else if(val[0].type == ''){
                this.$http.get("alert/baseAlert/selectAllAlertMsg",{id:val[0].id},res=>{
                   this.gruopdata = []
                   this.alertdata = res.data
                },err=>{});
            }
          }else{
            this.alertdata = []
            this.gruopdata = [] 
          }
        
      },
      okuser(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                  this.$http.post("alert/baseAlert/addAlertType",{
                    code:this.formroles.num,
                    name:this.formroles.names,
                    groupCode:this.clickarea[0].code,
                    level:this.formroles.lever,
                    resType:this.formroles.city
                    },res=>{
                        this.$Message.info(res.message);
                        axios({
                            method: 'get',
                            url: 'alert/baseAlert/getAllAlertGroup',
                            baseURL: window.g.ApiUrl,
                            dataType: 'json',
                            headers:{
                            Authorization:localStorage.getItem('token'),
                            },
                            data:{}
                        }).then(res=>{
                            this.data3 = res.data
                            this.clickarea = []
                        })
                    },err=>{
                    })
                
                    
               
            } else {
                this.$Message.error('请填写完整');
            }
        })  
      },
      getCheckedNodes(val){
        this.detelearealist = val
      },
      edit(){
          this.editorshow = false
      },
      backeditor(){
          this.editorshow = true
          if(this.clickarea.length != 0){
            if(this.clickarea[0].type == 'group'){
                this.$http.get("alert/baseAlert/selectAlertGroupMsg",{id:this.clickarea[0].id},res=>{
                   this.gruopdata = res.data
                   this.alertdata = []
                },err=>{});
            }else if(this.clickarea[0].type == ''){
                this.$http.get("alert/baseAlert/selectAllAlertMsg",{id:this.clickarea[0].id},res=>{
                   this.gruopdata = []
                   this.alertdata = res.data
                },err=>{});
            }
          }
      },
      saveeditor(){
         if(this.gruopdata.length >0){
            this.$http.put("alert/baseAlert/editAlert",{id:this.gruopdata[0].id,name:this.gruopdata[0].name,code:this.gruopdata[0].code,type:'group'},res=>{
                  this.$Message.info(res.message);
                  this.editorshow = true
                  this.$http.get("alert/baseAlert/selectAlertGroupMsg",{id:this.clickarea[0].id},res=>{
                   this.gruopdata = res.data
                   this.alertdata = []
                },err=>{});
                axios({
            method: 'get',
            url: 'alert/baseAlert/getAllAlertGroup',
            baseURL: window.g.ApiUrl,
            dataType: 'json',
            headers:{
             Authorization:localStorage.getItem('token'),
            },
            data:{}
          }).then(res=>{
             this.data3 = res.data
          })
                },err=>{});
         }else if(this.alertdata.length >0){
            this.$http.put("alert/baseAlert/editAlert",this.alertdata[0],res=>{
                  this.$Message.info(res.message);
                  this.editorshow = true
                  this.$http.get("alert/baseAlert/selectAllAlertMsg",{id:this.clickarea[0].id},res=>{
                   this.alertdata = res.data
                   this.gruopdata = []
                },err=>{});
                axios({
            method: 'get',
            url: 'alert/baseAlert/getAllAlertGroup',
            baseURL: window.g.ApiUrl,
            dataType: 'json',
            headers:{
             Authorization:localStorage.getItem('token'),
            },
            data:{}
          }).then(res=>{
             this.data3 = res.data
          })
                },err=>{});
         }
      },
      addalert(){
          if(this.clickarea.length == 1&&this.clickarea[0].type == ''){
              this.$Message.error('不能在告警类型下面新增告警类型！');
          }else{
              this.modal5 = true
              this.formroles.names = ''
              this.formroles.num = ''
              this.formroles.lever = ''
              this.formroles.city = ''
          }
      },
      jwmap(){
          this.modal6 = true
      },
      checkdata(data){
        if(data.length >0){
            this.alertdata[0].groupName = data[0].title
            this.alertdata[0].groupCode = data[0].code
            this.modal6 = false
        }
      },
      


    }
  }
</script>
<style scoped>
  .detail-title p{
  margin-left: 10px;
  font-size: 15px;
  text-align: left;
  color: #1D60FE;
  padding: 20px 0;
}
.sure {
  height: 32px;
  border-radius: 0;
  background: #1d60fe;
  width: 60px;
  padding: 0;
  border-radius: 0 4px 4px 0;
}
#wordbook{
    margin-bottom: 20px;
}
.head-left{
    text-align: center;
    line-height: 40px;
    background: #5285FE;
    color: #fff;
    font-size: 14px;
}
.pointbox{
    padding: 10px  0 10px 20px;
    /* width: calc(100% - 40px); */
}
.ivu-checkbox-group{
    border:1px solid #999;
}
.rolespan{
    cursor: pointer;
    background:#fff;
}
.rolespan:hover{
   background: #CAE8ED;
}
.rolespans{
    cursor: pointer;
    background: #CAE8ED;
}
.ivu-checkbox-wrapper + span, .ivu-checkbox + span{
    margin-right: 0px;
}
ivu-icon ivu-icon-plus-circled{
    width: 12px;
    height: 12px;
}
.ivu-page{
   text-align: center;
}
</style>
