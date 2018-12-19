<template>
    <div style="padding-left: 260px;min-width: 1000px;padding-top: 60px">
        <div class="detail-title" >
                  <p>配置服务</p>
         </div>
         <Tabs active-key="key1" @on-click="wordbook">
            <Tab-pane :label="list.title" key="key1" :name="list.title" v-for="(list,index) in navlist" :key="index">
                <div style="padding:0 20px;text-align:left" v-if="list.path == '/system/userdeploy'">
                      <button   class="zhuanyixuke" style="border:1px solid #5ECEDD;color:#5ECEDD" @click="addperson">新增</button>
                      <button   class="zhuanyixuke" style="border:1px solid #E15C5C;color:#E15C5C;margin-bottom:20px" @click="detelepersons">删除</button>
                      <i-input  v-model="serachvalue" placeholder="" style="width: 200px;margin-left:30%" class="sousuo"></i-input>
                      <i-button type="primary" class="sure" @click="serachroad">搜索</i-button>
                 <i-table border stripe :columns="persondatahead" :data="persondata" id="wordbook" @on-selection-change="checkpersonchange" class="bigtable"></i-table>
                </div>
                <Page :total='total' show-total style="margin-top:10px" :current.sync="pages" @on-change="changeliebiaopage" v-if="list.path == '/system/userdeploy'"></Page>
                <router-view v-if="bookname == list.title"></router-view>
            </Tab-pane>
            <!-- <Tab-pane label="字典配置" key="key2" name="字典配置">

                 <router-view v-if="bookname == '字典配置'"></router-view>
            </Tab-pane>
             <Tab-pane label="角色管理" key="key3" name="角色管理">
                 <router-view v-if="bookname == '角色管理'"></router-view>
            </Tab-pane>
            <Tab-pane label="菜单管理" key="key4" name="菜单管理">
                <router-view v-if="bookname == '菜单管理'"></router-view>
            </Tab-pane> -->
        </Tabs>
        <div id="personbox">
        <Modal
        v-model="modal2"
        :title="persontitle"
        width='800'
        @on-ok="personok('formpersondate')"
        >
       <Form ref="formpersondate" :model="formpersondate" :rules="rulepersondate" :label-width="100">
            <Row>
                <Col span="7">
                    <FormItem label="姓名" prop="personName">
                        <Input v-model="formpersondate.personName" />
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="登录账号" prop="account" v-if="passworkshow">
                        <Input v-model="formpersondate.account" />
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="登录账号" v-if="!passworkshow">
                        <Input v-model="formpersondate.account" disabled/>
                    </FormItem>
                </Col>
                 <Col span="7">
                    <FormItem label="密码" prop="password" v-if="passworkshow">
                        <Input v-model="formpersondate.password" type="password" />
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="身份证号" prop="cardId">
                        <Input v-model="formpersondate.cardId" />
                    </FormItem>
                </Col>
                 <Col span="7">
                    <FormItem label="部门">
                        <Input v-model="formpersondate.deptName"/>
                    </FormItem>
                </Col>
                 <Col span="7">
                    <FormItem label="公司名称" >
                        <Input v-model="formpersondate.company" />
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="邮箱" >
                        <Input v-model="formpersondate.email" />
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="联系电话" >
                        <Input v-model="formpersondate.phone" />
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="类别" >
                        <Input v-model="formpersondate.persType" />
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="职务" >
                        <Input v-model="formpersondate.persJob" />
                    </FormItem>
                 </Col>
                <Col span="7">
                    <FormItem label="备注" >
                        <Input v-model="formpersondate.remark" type="textarea"/>
                    </FormItem>
                </Col>
            </Row>
           
       </Form>
    </Modal>
    </div>
       <Modal
            v-model="modal4"
            title="编辑角色"
            @on-ok="okrole('formrole')"
            >
             <Form ref="formrole" :model="formrole" :rules="rulerole" :label-width="100" >
                <FormItem label="名称" prop="name" >
                    <Input v-model="formrole.name" />
                </FormItem>
                <FormItem label="编码" prop="num" >
                    <Input v-model="formrole.num" />
                </FormItem>
             </Form>
        </Modal>

        <Modal
            v-model="modal3"
            title="修改密码"
            @on-ok="okpaddword('formpaddword')"
            >
             <Form ref="formpaddword" :model="formpaddword" :rules="rulepaddword" :label-width="100" >
                <FormItem label="旧密码" prop="oldpass" >
                    <Input v-model="formpaddword.oldpass" type="password"/>
                </FormItem>
                <FormItem label="新密码" prop="newpass" >
                    <Input v-model="formpaddword.newpass" type="password"/>
                </FormItem>
                <FormItem label="再次输入密码" prop="twopass" >
                    <Input v-model="formpaddword.twopass" type="password"/>
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
            <Page :total='searchUsertotla' show-total style="text-align:center;margin-top:20px" @on-change="changemodal6page"></Page>
        </Modal>




        <Modal
        v-model="modal1"
        :title="edittile"
        @on-ok="ok('formValidate')">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" id="ss">
            <FormItem label="编码" prop="num" v-if="addbookshow">
                <Input v-model="formValidate.num" />
            </FormItem>
             <FormItem label="名称" prop="name" >
                <Input v-model="formValidate.name" />
            </FormItem>
            <FormItem
                v-for="(item, index) in formValidate.attrlist"
                v-if="formValidate.attrlist[index] !== 2"
                :key="index"
                label="属性名称"
                :prop="item.name"
                >
                 <!-- :rules="{required: true, message:'不能为空', trigger: 'blur'}" -->
            <Row>
                <Col span="18">
                    <Input type="text" v-model="item.name" placeholder="" />
                </Col>
                <Col span="4" offset="1">
                    <Button @click="handleRemove(index)">删除</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Row>
                <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
                </Col>
            </Row>
        </FormItem>
        </Form>
    </Modal>
       
    </div>
</template>
<script>
import TreeGrid from '@/components/treeGrid2.0'
  export default {
    name: 'system',
    components: {
        TreeGrid
    },
    data () {
        const pwdCheckValidate = (rule, value, callback) => {
            if (this.formpaddword.twopass == '') {
                callback(new Error('确认密码不能为空'));
            } else if (this.formpaddword.twopass != this.formpaddword.newpass) {
                callback(new Error('新密码和确认密码应相同'));
            } else {
                callback();
            }
        };
      return {
          columns: [{
                    type: 'selection',
                    width: '50',
                }, {
                    title: '标题',
                    key: 'title',
                    sortable: true,
                    width: '100',
                }, {
                    title: '父节点',
                    key: 'parentId',
                    width: '100',
                }, {
                    title: '图标名称',
                    key: 'icon',
                    width: '80',
                }, {
                    title: '排序编号',
                    key: 'id',
                    width: '80',
                }, {
                    title: '描述',
                    key: 'href',
                    width: '100',
                }, {
                    title: '编码',
                    key: 'code',
                    width: '80',
                }, {
                    title: '路径',
                    key: 'path',
                    width: '80',
                },{
                    title: '操作',
                    type: 'action',
                    actions: [{
                        type: 'primary',
                        text: '编辑'
                    }],
                    width: '80',
                }],
                // data: [{
                //     id: '1',
                //     code: '0001',
                //     name: '测试数据1',
                //     status: '启用',
                //     remark: '测试数据测试数据',
                //     _checked: true
                // }, {
                //     id: '2',
                //     code: '0002',
                //     name: '测试数据2',
                //     status: '启用',
                //     remark: '测试数据测试数据',
                //     children: [{
                //         id: '01',
                //         code: '00001',
                //         name: '测试数据01',
                //         status: '启用',
                //         remark: '测试数据测试数据',
                //     }, {
                //         id: '02',
                //         code: '00002',
                //         name: '测试数据02',
                //         status: '启用',
                //         remark: '测试数据测试数据',
                //     }]
                // }, {
                //     id: '3',
                //     code: '0003',
                //     name: '测试数据3',
                //     status: '启用',
                //     remark: '测试数据测试数据'
                // }, {
                //     id: '4',
                //     code: '0004',
                //     name: '测试数据4',
                //     status: '启用',
                //     remark: '测试数据测试数据'
                // }],
          data:[],  
          data1:[],
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
          formpaddword: {
                    oldpass: '',
                    newpass:'',
                    twopass:''
          },
          formValidate: {
                    name: '',
                    attrlist:[],
          },
          formrole:{
              name: '',
              num:'',
          },
          rulerole:{
              name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '编码不能为空', trigger: 'blur' }
                ],
          },
          rulepaddword:{
                oldpass: [
                    { required: true, message: '旧密码不能为空', trigger: 'blur' }
                ],
                newpass: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' }
                ],
                twopass: [
                    { required: true, validator: pwdCheckValidate, trigger: 'blur',}
                ],
          },
          formpersondate: {
                    personName:'',
                    account:'',
                    password:'',
                    email:'',
                    phone:'',
                    remark:'',
                    company:'',
                    persJob:'',
                    persType:'',
                    deptId:'',
                    cardId:'',
                    deptName:''
          },
          rulepersondate: {
                personName: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                cardId: [
                    { required: true, message: '身份证号不能为空', trigger: 'blur' }
                ],
                account: [
                    { required: true, message: '登录账号不能为空', trigger: 'blur' }
                ],
            },
          ruleValidate: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '编码不能为空', trigger: 'blur' }
                ],
            },
            roletablehead:[{title: '用户名',key: 'account',align: 'center'},
            {title: '姓名',key: 'person_name',align: 'center'},
            {title: '菜单',key: 'titile',align: 'center',
               render:(h,params)=>{
                          return h('div', {
                                 style:{
                                 'color':'#696C6F',
                                 'cursor':'default'
                                },
                           },params.row.titile)
                          }
            }
            ],
          persondatahead:[{type: 'selection',width: 60,align: 'center',},
                     {title: '姓名',key: 'personName',width:150,align: 'center',width:60},
                     {title: '登录账号',key: 'account',width:120,align: 'center',},
                     {title: '密码',key: 'dictCode',width:80,align: 'center',
                       render:(h,params)=>{
                          return h('div', [
                          h('img',{
                              attrs: {
                                    src: require('../../public/img/pass.png')
                                },
                                style:{
                                 'vertical-align':'middle'
                                },
                                on: {
                                        click: () => {
                                           this.paddowdchange(params.row)
                                        }
                                    }
                          },'img'),
                          ]
                          )
                        }
                     },
                     {title: '部门',key:"department",width:100,align: 'center',
                        render:function(h,params){
                                return h('span',params.row.department?params.row.department.deptName:''); 
                            }  
                     },
                     {title: '公司名称',key: 'company',align: 'center',},
                     {title: '邮箱',key: 'email',width:150,align: 'center',},
                     {title: '联系电话',key: 'phone',width:120,align: 'center',},
                     {title: '类别',key: 'persType',width:90,align: 'center',},
                     {title: '职务',key: 'persJob',width:80,align: 'center',},
                     {title: '备注',key: 'remark',width:100,align: 'center',},
                     {title: '编辑',key: 'dictCode',width:80,align: 'center',
                     render:(h,params)=>{
                          return h('div', [
                          h('img',{
                              attrs: {
                                    src: require('../../public/img/bianji.png')
                                },
                                style:{
                                 'vertical-align':'middle'
                                },
                                on: {
                                        click: () => {
                                           this.checkperson(params.row)
                                        }
                                    }
                          },'img'),
                          h('span',{
                              style:{
                                 padding:'0 10px',
                                 display:'inline-block',
                              },
                              on: {
                                        click: () => {
                                            this.checkperson(params.row)
                                        }
                                    }
                          },'编辑'),
                          ]
                          )
                        }
                     },
          ],
          wordbookhead:[{type: 'selection',width: 60,align: 'center'},
                  {title: '编码',key: 'dictCode',width:150,align: 'center',},
                  {title: '字典项',key: 'dictName',width:150,align: 'center'},
                  {title: '字典属性',key: 'attrName',align: 'center'},
                   {title: '编辑',key: 'deviceIp',width:80,
                   render:(h,params)=>{
                          return h('div', [
                          h('img',{
                              attrs: {
                                    src: require('../../public/img/bianji.png')
                                },
                                style:{
                                 'vertical-align':'middle'
                                },
                                on: {
                                        click: () => {
                                           this.checkbook(params.row)
                                        }
                                    }
                          },'img'),
                          h('span',{
                              style:{
                                 padding:'0 10px',
                                 display:'inline-block',
                              },
                              on: {
                                        click: () => {
                                            this.checkbook(params.row)
                                        }
                                    }
                          },'编辑'),
                          ]
                          )
                        }
                  }],
          wordbookdata:[{}],
          bookonedata:[],
          detelebook:[],
          addbookshow:false,
          deteleperson:[],
          personolddata:[],
          chenckname:'人员配置',
          passid:'',
          bookname:'',
          navlist:[],
      }
    },
    created(){
    },
    mounted(){
    //    this.personolddata = this.formpersondate
    //    this.$http.get("oauth/user/searchUser",{param:'',current: 1},res=>{
    //              this.persondata = res[0].user
    //              this.total = res[0].total
    //         //  console.log(res[0].user)
    //         },err=>{});
    this.$http.get("oauth/menu/menuTreeByPath?path=/system",{},res=>{
                this.navlist = res.data
                this.$router.push({path:res.data[0].path})
                this.bookname = res.data[0].title
            },err=>{});
    },
    methods: {
      wordbook(name){
         this.bookname = name
         if(name == '字典配置'){
            this.$router.push({path:'/system/book'})
         }else if(name == '人员配置'){
             this.$router.push({path:'/system'})
             this.pages = 1
             this.$http.get("oauth/user/searchUser",{param:'',current: 1},res=>{
                 this.persondata = res[0].user
                 this.showpage = true
            //  console.log(res[0].user)
            },err=>{});
         }else if(name == '角色管理'){
             this.$router.push({path:'/system/role'})
            //  this.$http.get("oauth/group/all",{},res=>{
            //   this.rolelist = res.data
            // },err=>{});
         }else if(name == '菜单管理'){
             this.$router.push({path:'/system/menu'})
            //  this.$http.get("oauth/menu/user/authorityTree?",{parentId:-1},res=>{
            //       this.data = res.data      
            //  },err=>{});
         }
      },
      checkbook(list){
        this.edittile = '编辑字典'
        this.modal1 = true
        this.addbookshow = false
        this.$http.get("oauth/dict/selectByDictId?",{dictId:list.dictId},res=>{
             this.formValidate.name = res.data.dictName
             this.formValidate.attrlist = res.data.dictAttrs
             this.bookonedata = res.data
            },err=>{});
        
        // console.log(list)
        
      },
      ok(name){
         if(this.addbookshow == true){
             this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post("oauth/dict/add",{
                        dictCode:this.formValidate.num,
                        dictName:this.formValidate.name,
                        dictAttrs:this.formValidate.attrlist,
                        },res=>{
                            this.$Message.info(res.message);
                            this.$http.get("oauth/dict/select",{},res=>{
                            this.wordbookdata = res.data
                            },err=>{});
            },err=>{});
                    } else {
                        this.$Message.error('请填写完整');
                    }
                })
         }else{
             this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.put("oauth/dict/update",{
                        dictCode:this.bookonedata.dictCode,
                        dictId:this.bookonedata.dictId,
                        dictName:this.formValidate.name,
                        dictAttrs:this.formValidate.attrlist,
                        },res=>{
                            this.$Message.info(res.message);
                            this.$http.get("oauth/dict/select",{},res=>{
                            this.wordbookdata = res.data
                            },err=>{});
            },err=>{});
                    } else {
                        this.$Message.error('请输入名称');
                    }
                })    
         } 
      },
      handleAdd() {
                this.formValidate.attrlist.push({
                    name:''
                });
            },
    handleRemove (index) {
                if(this.formValidate.attrlist.length > 1){
                    this.formValidate.attrlist.splice(index,1)  
                }
        },
        checkbookchange(val){
           this.detelebook = val
        },
        checkpersonchange(val){
           this.deteleperson = val
        },
        checkuserchange(val){
            this.userlist = val
            this.bb = 2
        },
        detele(){
          var deletedata = []
          this.detelebook.forEach (el=>{deletedata.push(el.dictId)})
          if(this.detelebook.length == 0){
              this.$Message.error('请先选择需要删除的字典项');
          }else{
              this.$http.delete("oauth/dict/deleteByIds",
                deletedata,res=>{
             this.$Message.info(res.message);
                this.$http.get("oauth/dict/select",{},res=>{
                this.wordbookdata = res.data
                },err=>{});
            },err=>{});
          }
          
        },
        addbook(){
             this.edittile = '新增字典'
             this.modal1 = true
             this.addbookshow = true
             this.formValidate.name = ''
             this.formValidate.attrlist = []
             this.formValidate.attrlist.push({
                    name:''
             });
        },
        detelepersons(){
            var deletedata = []
            this.aa = 0
             this.deteleperson.forEach (el=>{if(el.account == 'admin'||  el.account == 'sys'){
                 this.aa++
             }})
             if(this.deteleperson.length == 0){
                 this.$Message.error('请先选择需要删除的人员');
             }else{
                 if(this.aa == 0){
                     this.deteleperson.forEach (el=>{deletedata.push(el.id)})
                     this.$http.delete("oauth/user/deleteUser",
                     deletedata,res=>{
                        this.$Message.info(res.message);
                            this.$http.get("oauth/user/searchUser",{param:'',current: 1},res=>{
                            this.persondata = res[0].user
                            this.total = res[0].total
                            },err=>{});
                        },err=>{});
                }else{
                    this.$Message.error('系统管理员不允许删除');
                }
             }
             

        
        },
        addperson(){
            this.persontitle = '新增人员'
            this.formpersondate = this.personolddata
            this.modal2= true
            this.nopersonadd = 0
            this.passworkshow = true
        },
        checkperson(list){
            this.persontitle = '编辑人员'
            this.passworkshow = false
            this.modal2= true
            this.nopersonadd = 1
            this.formpersondate = list
            this.formpersondate.deptName = list.department.deptName
        },
        personok(name){
            if(this.nopersonadd == 0){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post("oauth/user/addUser",
                        this.formpersondate
                        ,res=>{
                            this.$Message.info(res.message);
                            this.$http.get("oauth/user/searchUser",{param:'',current: 1},res=>{
                            this.persondata = res[0].user
                            this.total = res[0].total
                            //  console.log(res[0].user)
                            },err=>{});
                },err=>{});
                    } else {
                        this.$Message.error('请填写完整');
                    }
                })   
            }else{
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.put("oauth/user/editUser",
                        this.formpersondate
                        ,res=>{
                            this.$Message.info(res.message);
                            this.$http.get("oauth/user/searchUser",{param:'',current: 1},res=>{
                            this.persondata = res[0].user
                            this.total = res[0].total
                            //  console.log(res[0].user)
                            },err=>{});
                },err=>{});
                    } else {
                        this.$Message.error('请填写完整');
                    }
                }) 
            }
        },
        serachroad(){
           this.$http.get("oauth/user/searchUser?",{param:this.serachvalue,current: 1},res=>{
               if(res[0].user.length == 0){
                   this.persondata = []
                   this.total = 0
               }else{
                   this.persondata = res[0].user
                   this.total = res[0].total
               }
                
                },err=>{});
        },
        changeliebiaopage(i){
            if(this.chenckname == '人员配置'){
                this.showpage = true
                this.$http.get("oauth/user/searchUser",{current:i,pageSize:10,param:this.serachvalue},res=>{
                this.persondata = res[0].user
                },err=>{
                })
            }
            
      },
      paddowdchange(list){
         this.modal3 = true
         this.passid = list.id
         this.formpaddword.oldpass = ''
         this.formpaddword.newpass = ''
         this.formpaddword.twopass = ''
      },
      okpaddword(name){
          this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.put("oauth/user/changePassword",{
                            oldPassword:this.formpaddword.oldpass,
                            password:this.formpaddword.newpass,
                            passwordConfirm:this.formpaddword.twopass,
                            userId:this.passid
                            },res=>{
                              this.$Message.info(res.message);
                            },err=>{
                        })
                    } else {
                        this.$Message.error('请填写完整');
                    }
                })
      },
      changerole(){
          this.addrolenum = 1
          if(this.roledata.length == 0){
              this.$Message.error('请选择条目！');
          }else if(this.roledata.length == 1){
              this.$http.get("oauth/group/"+this.roledata,{},res=>{
                  this.modal4 = true
                   this.formrole.name = res.data.name
                   this.formrole.num = res.data.code
                },err=>{
                })
          }else{
             this.$Message.error('只能选择一个条目修改'); 
          }
      },
      okrole(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                if(this.addrolenum == 0){
                    this.$http.post("oauth/group/add",{
                    code:this.formrole.num,
                    name:this.formrole.name,
                    id:''
                    },res=>{
                        this.$Message.info(res.message);
                        this.$http.get("oauth/group/all",{},res=>{
                        this.rolelist = res.data
                        this.roledata = []
                        },err=>{});
                    },err=>{
                    })
                }else if(this.addrolenum == 1){
                      this.$http.put("oauth/group/"+this.roledata,{
                    code:this.formrole.num,
                    name:this.formrole.name,
                    id:this.roledata.toString()
                    },res=>{
                        this.$Message.info('修改成功');
                        this.$http.get("oauth/group/all",{},res=>{
                        this.rolelist = res.data
                        this.roledata = []
                        },err=>{});
                    },err=>{
                    })
                }
               
            } else {
                this.$Message.error('请填写完整');
            }
        })
      },
      addrole(){
          this.formrole.name = ''
          this.formrole.num = ''
          this.roledata = []
          this.modal4 = true
          this.addrolenum = 0
      },
      detelerole(){
          if(this.roledata.length == 0){
             this.$Message.error('请选择条目！');
          }else{
              this.$http.delete("oauth/group",
                this.roledata,res=>{
                   this.$Message.info('删除成功');
                        this.$http.get("oauth/group/all",{},res=>{
                        this.rolelist = res.data
                        this.roledata = []
                        },err=>{});
            },err=>{});
          }
      },
      checkrole(list,index){
        this.colornum = index
        this.$http.get("oauth/group/"+list.id+'/UserAndAuthorityByGroupId',{},res=>{
                        this.roletabledata = res.data
                        if(this.roletabledata.length == 0){
                            this.$Message.info('该角色下没有用户！');
                        }
                        },err=>{});
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
      changemodal6page(i){
          this.$http.get("oauth/user/searchUser?",{param:this.value,current:i},res=>{
                this.searchUsertotla = res[0].total
                this.data1 = res[0].user
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
      okallotuser(){
          var userlistid = []
          if(this.bb = 2&&this.userlist.length != 0){
              this.userlist.forEach (el=>{userlistid.push(el.id)})
          }
           this.$http.put("oauth/group/"+this.roledata+"/user",userlistid,res=>{
                
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
      treechange(val){
          this.treevalue = 1
          var list = val
          list.forEach (el=>{this.treelist.push(el.id)})
      },
      rowClick(data, index, event) {
                console.log('当前行数据:' + data)
                console.log('点击行号:' + index)
                console.log('点击事件:' + event)
            },
            selectionClick(arr) {
                console.log('选中数据id数组:' + arr)
            },
            sortClick(key, type) {
                console.log('排序字段:' + key)
                console.log('排序规则:' + type)
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
</style>
