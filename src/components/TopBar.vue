<template>
  <div class="top-bar">

    <!--<div class="logo">-->
      <!--<img src="../../public/img/logo2.png"/>-->
    <!--</div>-->
    <img src="../../public/img/6.png" style="margin-left: 20px"/>
    <div class="userbox">
      <Dropdown>
      <div class="user-item">
        <img src="../../public/img/7.png"/><span>{{userInfo.userName}}</span>
      </div>
      <DropdownMenu slot="list">
            <DropdownItem style="font-size:12px" @click.native="usermsg">用户信息</DropdownItem>
            <DropdownItem style="font-size:12px" @click.native="changepass">密码修改</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div class="user-item edit" @click="confirm">
        <img src="../../public/img/15.png" /><span>退出</span>
      </div>
    </div>

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

        <div id="personbox">
        <Modal
        v-model="modal2"
        title="编辑用户"
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
                <!-- <Col span="7">
                    <FormItem label="登录账号" prop="account" v-if="passworkshow">
                        <Input v-model="formpersondate.account" />
                    </FormItem>
                </Col> -->
                <Col span="7">
                    <FormItem label="登录账号" >
                        <Input v-model="formpersondate.account" disabled/>
                    </FormItem>
                </Col>
                 <!-- <Col span="7">
                    <FormItem label="密码" prop="password" v-if="passworkshow">
                        <Input v-model="formpersondate.password" type="password" />
                    </FormItem>
                </Col> -->
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


  </div>


  
</template>

<script>
import {mapState } from 'vuex';
export default {
  name: 'LeftNav',
  props: {
    msg: String
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
      modal2:false,
      modal3:false,
      formpaddword: {
                    oldpass: '',
                    newpass:'',
                    twopass:''
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
    }
  },
  computed:{
    ...mapState({
      userInfo: "userInfo"
    })
  },
  methods:{
    confirm () {
      this.$Modal.confirm({
        title: '您确定要退出吗',
        // content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
        onOk: () => {
          localStorage.removeItem('token')
          localStorage.removeItem('navlist')
          this.$router.push({path: '/'});
        },
        onCancel: () => {
        }
      });
    },
    changepass(){
      this.modal3 = true
    },
    okpaddword(name){
          this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.put("oauth/user/changePassword",{
                            oldPassword:this.formpaddword.oldpass,
                            password:this.formpaddword.newpass,
                            userId:this.userInfo.userId
                            },res=>{
                              this.$Message.info(res.message);
                            },err=>{
                        })
                    } else {
                        this.$Message.error('请填写完整');
                    }
                })
    },
    usermsg(){
        this.modal2 = true
        this.$http.get("oauth/user/getUserById?",{userId:this.userInfo.userId},res=>{
             this.formpersondate = res.data
              this.formpersondate.deptName = res.data.department.deptName
            },err=>{});
    },
    personok(name){
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
        },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.top-bar{
  box-sizing: border-box;
  height: 60px;
  padding: 10px 0;
  background: #fff;
  text-align: left;
  position: fixed;
  border-bottom: 1px solid #eee;
  width: 100%;
  min-width: 1000px;
  z-index: 1000;
  .logo{
    float: left;
    width: 260px;
    img{
      display: block;
      margin: 0 auto;
      height: 40px;
    }
  }
}
.userbox{
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    position: absolute;
    height: 100%;
    right: 20px;
    top:50%;
    transform: translateY(-50%);
    bottom: 0;
    align-items: center;
  .user-item{
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    border-right: 1px solid #ededed;
    padding-right: 20px;
    padding-left: 20px;
    height: 100%;
    align-items: center; 
    cursor: pointer;
    img{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    } 
    span{
      font-size:15px;
    }
  }
  .edit{
    border-right: none;
    cursor:pointer;
  }
}
.ivu-btn-primary {
  width: 70px;
  height: 33px;
}
</style>
