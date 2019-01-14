<template>
    <div >
        
        <div style="padding:0 20px;text-align:left" >
                  
                  <button   class="zhuanyixuke" style="border:1px solid #5ECEDD;color:#5ECEDD" @click="addrole">新增</button>
                  <!-- <button   class="zhuanyixuke" @click="changerole">修改</button> -->
                  <button   class="zhuanyixuke" style="border:1px solid #E15C5C;color:#E15C5C;margin-bottom:20px" @click="detelerole">删除</button>
                   <!-- <button   class="zhuanyixukes" @click="power">分配权限</button>
                  <button   class="zhuanyixukes" @click="allotuser">分配用户</button> -->
                      <Row>
                       <Col span="7" style="margin-right: 20px;">
                           <div class="head-left">告警类型管理</div>
                           <div style="border:1px solid  #e8eaec;padding-left:20px">
                              <Tree :data="data3"  show-checkbox @on-select-change="checkrole" :scheck-strictly="true" @on-check-change="getCheckedNodes"></Tree>
                           </div>
                       </Col>
                        <Col span="16">
                           <!-- <i-table border  :columns="roletablehead" :data="roletabledata" id="wordbook" @on-selection-change="checkbookchange" ></i-table>
                           <Page :total="totals" show-total @on-change="changemodal6page" :current.sync="pages"/> -->
                       </Col>
                      </Row>
                 </div>
         
                 
          <Modal
            v-model="modal4"
            :title="titledata"
            @on-ok="okrole('formrole')"
            >
             <Form ref="formrole" :model="formrole" :rules="rulerole" :label-width="100" >
                <p style="padding-left: 16px;font-size: 13px;margin-bottom: 10px;" v-if="this.clickarea.length>0&&this.addrolenum == 0">父节点 ：<span style="margin-left: 29px;" v-if="modal4 == true">{{clickarea[0].areaName}}</span></p>
                <FormItem label="行政区划名称" prop="name" >
                    <Input v-model="formrole.name" />
                </FormItem>
                <FormItem label="行政区划编码" prop="num" >
                    <Input v-model="formrole.num" />
                </FormItem>
             </Form>
        </Modal>       
          

        <Modal
            v-model="modal5"
            :title="formrole.name"
            @on-ok="okuser()"
            >
            <Tree :data="data2" show-checkbox @on-check-change="treechange"></Tree>
        </Modal>


        <Modal
            v-model="modal6"
            :title="formrole.name"
            width='800'
            @on-ok="okallotuser()"
            >
            <div style="text-align:center;margin-bottom:20px">
                <i-input v-model="value" placeholder="请输入" style="width: 200px" class="sousuo"></i-input>
                <i-button type="primary" class="sure" @click="serachuser">搜索</i-button>
            </div>
            <i-table highlight-row stripe border :columns="columns1" :data="data1" @on-selection-change="checkuserchange"></i-table>
              <Page :total='searchUsertotla' show-total  ></Page>
        </Modal>


       




       
       
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
            rulerole:{
              name: [
                    { required: true, message: '行政区划名称不能为空', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '行政区划编码不能为空', trigger: 'blur' }
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
      }
    },
    created(){
    },
    mounted(){
        // this.$http.get("oauth/baseArea/getAllArea",{},res=>{
        //     console.log(res)
        //     },err=>{});
        axios({
            method: 'get',
            url: 'oauth/baseArea/getAllArea',
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
                if(this.addrolenum == 0){
                    var aa = 0
                    if(this.clickarea.length == 1){
                        var aa = this.clickarea[0].areaCode
                    }
                    this.$http.post("oauth/baseArea/addArea",{
                    areaCode:this.formrole.num,
                    areaName:this.formrole.name,
                    parentCode:aa,
                    },res=>{
                        this.$Message.info(res.message);
                        axios({
                            method: 'get',
                            url: 'oauth/baseArea/getAllArea',
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
                }else if(this.addrolenum == 1){
                      this.$http.put("oauth/baseArea/editArea",{areaCode:this.formrole.num,areaName:this.formrole.name,id:this.clickarea[0].id},res=>{
                        this.$Message.info(res.message);
                        axios({
                            method: 'get',
                            url: 'oauth/baseArea/getAllArea',
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
          }else{
              this.titledata="新增告警类型"
          }
          this.formrole.name = ''
          this.formrole.num = ''
          this.roledata = []
          this.modal4 = true
          this.addrolenum = 0
      },
      detelerole(){
          if(this.detelearealist.length == 0){
             this.$Message.error('请选择想要删除的行政区划！');
          }else{
              var datalist = []
              this.detelearealist.forEach(data => { datalist = datalist.concat(data.id);})
              this.$http.delete("oauth/baseArea/deleteArea",datalist,res => {
                      this.$Message.info(res.message);
                        axios({
                            method: 'get',
                            url: 'oauth/baseArea/getAllArea',
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
           this.$http.get("oauth/baseArea/selectrMaintainUserByCodes",{areaCodes:this.clickarea[0].areaCode},res=>{
                        this.roletabledata = res.data.list
                        this.totals = res.data.total
                        },err=>{});
          }
        
      },
      power(){
          this.treevalue = 0
          this.treelist = []
          if(this.roledata.length == 0){
              this.$Message.error('请选择条目！');
          }else if(this.roledata.length > 1){
              this.$Message.error('请勿选择多条数据！');
          }else{
             this.$http.get("oauth/group/"+this.roledata,{},res=>{
                  this.modal5 = true
                  this.formrole.name = res.data.name
                  this.$http.get("oauth/menu/user/authorityTree?",{parentId:-1},res=>{
                      this.data2 = res.data
                      this.$http.get("oauth/group/"+this.roledata+"/authority/menu?",{},res=>{
                          var list = res.data
                       for(var i=0;i<this.data2.length;i++){
                           if(this.data2[i].children.length == 0){
                               list.forEach(el=>{if(this.data2[i].id==el.id&&el.parentId == -1){this.$set(this.data2[i],'checked',true)}})
                           }else{
                               list.forEach(el=>{if(this.data2[i].id==el.id&&el.parentId == -1){this.$set(this.data2[i],'expand',true)}})
                                for(var j=0;j<this.data2[i].children.length;j++){
                                        list.forEach(el=>{if(this.data2[i].children[j].id==el.id&&el.parentId != -1){this.$set(this.data2[i].children[j],'checked',true)}})
                                }
                           }
                           
                       }
                        },err=>{});
                        
                        },err=>{});
                  
                },err=>{
                })
          }
      },
      allotuser(){
          this.data1=[]
          this.value = ''
          this.bb = 0
           if(this.roledata.length == 0){
              this.$Message.error('请选择条目！');
          }else if(this.roledata.length > 1){
              this.$Message.error('请勿选择多条数据！');
          }else{
             this.$http.get("oauth/group/"+this.roledata,{},res=>{
                  this.modal6 = true
                  this.formrole.name = res.data.name
                   this.$http.get("oauth/user/searchUser?",{param:'',current:1},res=>{
                          this.searchUsertotla = res[0].total
                          this.data1 = res[0].user
                           this.$http.get("oauth/group/"+this.roledata+"/user",{},res=>{
                               for(var i=0;i<res.data.length;i++){    
                                     this.data1.forEach (el=>{if(res.data[i].id==el.id){this.$set(el,'_checked',true)}})
                                } 
                            },err=>{});
                        },err=>{});
                  
                },err=>{
                })
          }
      },
      checkbookchange(val){
           this.detelebook = val
        },
       okallotuser(){
          var userlistid = []
          if(this.bb = 2&&this.userlist.length != 0){
              this.userlist.forEach (el=>{userlistid.push(el.id)})
          }
           this.$http.put("oauth/group/"+this.roledata+"/user",userlistid,res=>{
                if(res.rel == true){
                    this.$Message.info('分配用户成功！');
                }
            },err=>{});
      },
      okuser(){
          if(this.treevalue == 1){
              this.$http.put("oauth/group/"+this.roledata+"/authority/menu",this.treelist,res=>{
                 if(res.rel == true){
                        this.$Message.info('分配权限成功！');
                        this.$http.get("oauth/group/all",{},res=>{
                        this.rolelist = res.data
                        this.roledata = []
                        },err=>{});
                 }
            },err=>{});
          }
      },
     checkuserchange(val){
            this.userlist = val
            this.bb = 2
        },
       treechange(val){
          this.treevalue = 1
          var list = val
          list.forEach (el=>{this.treelist.push(el.id)})
      },
      changemodal6page(i){
          this.$http.get("oauth/baseArea/selectrMaintainUserByCodes",{areaCodes:this.clickarea[0].areaCode,current:i},res=>{
                        this.roletabledata = res.data.list
             
                        },err=>{});
      },
      serachuser(){
          this.$http.get("oauth/user/searchUser?",{param:this.value,current:1},res=>{
              this.searchUsertotla = res[0].total
                this.data1 = res[0].user
                this.$http.get("oauth/group/"+this.roledata+"/user",{},res=>{
                    for(var i=0;i<res.data.length;i++){    
                            this.data1.forEach (el=>{if(res.data[i].id==el.id){this.$set(el,'_checked',true)}})
                    } 
                },err=>{});
          },err=>{});
      },
      getCheckedNodes(val){
        this.detelearealist = val
      }
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
