<template>
    <div >
       <div style="padding:0 20px;text-align:left" >
            <button   class="zhuanyixuke" style="border:1px solid #5ECEDD;color:#5ECEDD" @click="addmenu">新增</button>
            <button   class="zhuanyixuke" style="border:1px solid #E15C5C;color:#E15C5C;margin-bottom:20px" @click="deletemenu">删除</button>
        </div>
        <tree-grid 
            :items='data' 
            :columns='columns'
            @on-row-click='rowClick'
            @on-selection-change='selectionClick'
            @on-sort-change='sortClick'
        ></tree-grid> 
        <div style="height:20px"></div>
       
       <Modal
        v-model="modal1"
        :title="toptitle"
        @on-ok="ok('formValidate')">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
            <p style="margin-left: 39px;margin-bottom: 10px;" v-if="parentdata != ''">父节点<span style="margin-left:10px">{{parentdata}}</span></p>
            <FormItem label="父节点" prop="parentId" v-if="selectnum == 2">
                 <Cascader :data="data1" v-model="formValidate.parentId" change-on-select @on-change="changeselect"></Cascader>
            </FormItem>
            <FormItem label="标题" prop="title" >
                <Input v-model="formValidate.title" />
            </FormItem>
            <FormItem label="图标" prop="icon" >
                <Input v-model="formValidate.icon" />
            </FormItem>
            <FormItem label="排序" prop="sort" >
                <Input v-model="formValidate.sort" />
            </FormItem>
            <FormItem label="描述" prop="description" >
                <Input v-model="formValidate.description" />
            </FormItem>
            <FormItem label="编码" prop="code" >
                <Input v-model="formValidate.code" />
            </FormItem>
            <FormItem label="地址" prop="href" >
                <Input v-model="formValidate.href" />
            </FormItem>
        </Form>
    </Modal>



 
    </div> 


    
      
</template>
<script>
import TreeGrid from '@/components/treeGrid2.0'
  export default {
    name: 'menus',
    components: {
        TreeGrid
    },
    data () {
      return {
          parentdata:'',
          formValidate: {
                    title: '',
                    parentId:'',
                    icon:'',
                    sort:'',
                    description:'',
                    id:'',
                    href:'',
          },
          ruleValidate: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                // parentId: [
                //     { required: true, message: '父节点不能为空', trigger: 'change' }
                // ],
                // icon: [
                //     { required: true, message: '图标不能为空', trigger: 'blur' }
                // ],
                // sort: [
                //     { required: true, message: '排序不能为空', trigger: 'blur' }
                // ],
                description: [
                    { required: true, message: '描述不能为空', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '编码不能为空', trigger: 'blur' }
                ],
                href: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
            },
           columns: [
               {
                    type: 'selection',
                    width: '50',
                }, 
                {
                    title: '标题',
                    key: 'text',
                    sortable: true,
                    width: '100',
                }, 
                // {
                //     title: '父节点',
                //     key: 'parentId',
                //     width: '10',
                // }, 
                {
                    title: '图标名称',
                    key: 'icon',
                    width: '80',
                }, {
                    title: '排序编号',
                    key: 'sort',
                    width: '80',
                }, {
                    title: '描述',
                    key: 'description',
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
                //     // _checked: true
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
          deteleperson:[],
          personolddata:[],
          chenckname:'人员配置',
          passid:'',
          selectlist:[],
          selectnum:0,
          toptitle:'',

      }
    },
    created(){
    },
    mounted(){
        this.$http.get("oauth/menu/user/authorityTree?",{parentId:-1},res=>{
                  this.data = res.data      
             },err=>{});
        this.$http.get("oauth/menu/user/authorityullDownTree",{parentId:-1,level:2},res=>{
                this.data1 = res.data    
             },err=>{});
    },
    methods: {
        rowClick(data, index, event) {
                // console.log('点击行号:' + index)
                // console.log('点击事件:' + event)
                this.selectnum = 2
                this.formValidate.title = data.text
                this.parentdata=''
                this.formValidate.description = data.description
                this.formValidate.parentId=[data.parentId]
                this.formValidate.icon = data.icon
                this.formValidate.sort = data.sort
                this.formValidate.href = data.path
                this.formValidate.id = data.id
                this.formValidate.code = data.code
                this.modal1 = true
                this.toptitle = '编辑菜单'
            },
        selectionClick(arr) {
            console.log(arr)
            this.selectlist = arr
        },
        sortClick(key, type) {
            console.log('排序字段:' + key)
            console.log('排序规则:' + type)
        },
        addmenu(){
            this.toptitle = '新增菜单'
            if(this.selectlist.length == 0){
                this.selectnum = 1
                this.parentdata = '-1'
                this.formValidate.title = ''
                this.formValidate.parentId= '-1'
                this.formValidate.icon= ''
                this.formValidate.sort= ''
                this.formValidate.description= ''
                this.formValidate.code= ''
                this.formValidate.href= ''
                this.formValidate.id= ''
                this.modal1 = true
            }else if(this.selectlist.length == 1){
                this.selectnum = 1
                this.formValidate.title = ''
                this.parentdata =this.selectlist[0].text
                this.formValidate.parentId= this.selectlist[0].id
                this.formValidate.icon= ''
                this.formValidate.sort= ''
                this.formValidate.description= ''
                this.formValidate.code= ''
                this.formValidate.href= ''
                this.formValidate.id= ''
                this.modal1 = true
            }else if(this.selectlist.length > 1){
                this.$Message.error('只能选择一个节点新增');
            }
            
        },
        ok(name){
             this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.selectnum == 1){
                            this.$http.post("oauth/menu/add",this.formValidate,res=>{
                               this.$Message.info(res.message);
                                this.$http.get("oauth/menu/user/authorityTree?",{parentId:-1},res=>{
                                this.data = res.data      
                                },err=>{});
                            },err=>{});
                        }else if(this.selectnum == 2){
                            this.$http.put("oauth/menu/update",this.formValidate,res=>{
                                 this.$Message.info(res.message);
                                 this.$http.get("oauth/menu/user/authorityTree?",{parentId:-1},res=>{
                                this.data = res.data      
                                },err=>{});
                            },err=>{});
                        }
                        
                    } else {
                        this.$Message.error('请填写完整');
                    }
                })
        },
        deletemenu(){
             if(this.selectlist.length == 0){
                 this.$Message.error('请选择需要删除的条目！');
             }else if(this.selectlist.length > 0){
                 this.$Modal.confirm({
                  title: '您确定要删除吗',
                  onOk: () => {
                  var aa = 1
                 this.selectlist.forEach(data => { if(data.children.length >0){
                    aa = 2
                 }})
                 if(aa == 1){
                     var list = []
                     this.selectlist.forEach(data => {list.push(data.id) })
                     this.$http.delete("oauth/menu/deleteByIds",list,res=>{
                        this.$http.get("oauth/menu/user/authorityTree?",{parentId:-1},res=>{
                                this.data = res.data      
                            },err=>{});
                        },err=>{});
                 }else{
                     this.$Message.error('请先删除子节点菜单');
                 }
              },
          });
                
                 
             }
             
        },
        changeselect(value){
            this.formValidate.parentId=value[value.length-1]
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

</style>
