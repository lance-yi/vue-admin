<template>
    <div >
       <div style="padding:0 20px;text-align:left" >
            <button   class="zhuanyixuke" style="border:1px solid #5ECEDD;color:#5ECEDD" @click="addmenu">新增</button>
            <button   class="zhuanyixuke" style="border:1px solid #E15C5C;color:#E15C5C;margin-bottom:20px" >删除</button>
        </div>
        <tree-grid 
            :items='data' 
            :columns='columns'
            @on-row-click='rowClick'
            @on-selection-change='selectionClick'
            @on-sort-change='sortClick'
        ></tree-grid> 
       
       <Modal
        v-model="modal1"
        title="新增菜单"
        @on-ok="ok('formValidate')">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
            <FormItem label="标题" prop="title" >
                <Input v-model="formValidate.title" />
            </FormItem>
             <FormItem label="父节点" prop="parentId" >
                <Input v-model="formValidate.parentId" />
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
          formValidate: {
                    title: '',
                    parentId:'',
                    icon:'',
                    sort:'',
                    description:'',
                    code:'',
                    href:'',
          },
          ruleValidate: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                parentId: [
                    { required: true, message: '父节点不能为空', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '图标不能为空', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '排序不能为空', trigger: 'blur' }
                ],
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
           columns: [{
                    type: 'selection',
                    width: '50',
                }, {
                    title: '标题',
                    key: 'code',
                    sortable: true,
                    width: '100',
                }, {
                    title: '父节点',
                    key: 'code',
                    width: '100',
                }, {
                    title: '图标名称',
                    key: 'code',
                    width: '80',
                }, {
                    title: '排序编号',
                    key: 'code',
                    width: '80',
                }, {
                    title: '描述',
                    key: 'code',
                    width: '100',
                }, {
                    title: '编码',
                    key: 'code',
                    width: '80',
                }, {
                    title: '路径',
                    key: 'code',
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
      }
    },
    created(){
    },
    mounted(){
        this.$http.get("oauth/menu/user/authorityTree?",{parentId:-1},res=>{
                  this.data = res.data      
             },err=>{});
    },
    methods: {
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
        },
        addmenu(){
          this.modal1 = true
        },
        ok(name){
             this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post("oauth/menu/add",this.formValidate,res=>{
                       
                        },err=>{});
                    } else {
                        this.$Message.error('请填写完整');
                    }
                })
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
