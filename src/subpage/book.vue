<template>
    <div >
                 <div style="padding:0 20px;text-align:left" >
                      <button   class="zhuanyixuke" style="border:1px solid #5ECEDD;color:#5ECEDD" @click="addbook">新增</button>
                      <button   class="zhuanyixuke" style="border:1px solid #E15C5C;color:#E15C5C;margin-bottom:20px" @click="detele">删除</button>
                 <i-table border stripe :columns="wordbookhead" :data="wordbookdata" id="wordbook" @on-selection-change="checkbookchange" class="bigtable"></i-table>
                 </div>
                 
        <Modal
        v-model="modal1"
        :title="edittile"
        @on-ok="ok('formValidate')">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
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
// import TreeGrid from '@/components/treeGrid2.0'
  export default {
    name: 'book',
    components: {
        // TreeGrid
    },
    data () {
      return {
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
          formValidate: {
                    name: '',
                    attrlist:[],
          },
          formrole:{
              name: '',
              num:'',
          },
          ruleValidate: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '编码不能为空', trigger: 'blur' }
                ],
            },
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
      }
    },
    created(){
    },
    mounted(){
       this.$http.get("oauth/dict/select",{},res=>{
             this.wordbookdata = res.data
             this.showpage = false
            },err=>{});
    },
    methods: {
      wordbook(name){
         if(name == '字典配置'){
            this.$http.get("oauth/dict/select",{},res=>{
             this.wordbookdata = res.data
             this.showpage = false
            },err=>{});
         }else if(name == '人员配置'){
             this.pages = 1
             this.$http.get("oauth/user/searchUser",{param:'',current: 1},res=>{
                 this.persondata = res[0].user
                 this.showpage = true
            //  console.log(res[0].user)
            },err=>{});
         }else if(name == '角色管理'){
             this.$http.get("oauth/group/all",{},res=>{
              this.rolelist = res.data
            },err=>{});
         }else if(name == '菜单管理'){
             this.$http.get("oauth/menu/user/authorityTree?",{parentId:-1},res=>{
                  this.data = res.data      
             },err=>{});
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
