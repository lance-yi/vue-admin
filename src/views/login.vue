<template>
  <div class="bigbox">
      <div class="posibox">
          <div class="flexbox">
              <div class="textbox">
                  <img src="../../public/img/logologo.png" style="width:80px;height:80px"/>
                  <p class="text">武汉公安综合安全运维系统</p>
              </div>
          </div>

          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-left:40px">
              <FormItem label="账号" prop="name">
                  <Input v-model="formValidate.name" placeholder="请输入账号" />
              </FormItem>
              <FormItem prop="password" label="密码">
                  <Input type="password" v-model="formValidate.password" placeholder="请输入密码" />
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')" @on-enter.stop="handleSubmit('formValidate')">登 陆</Button>
              </FormItem>
          </Form>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      formValidate: {
        name: 'admin',
        password: '123456'
      },
      ruleValidate: {
        name: [
          { required: true, message: '登录账号不能为空，请输入密码!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空，请输入密码！', trigger: 'blur' },
          // { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!');
          axios({
            method: 'post',
            url: '/auth/jwt/token',
            baseURL: 'http://192.168.8.176:8888/api',
            dataType: 'json',
            data:{"username":this.formValidate.name,"password":this.formValidate.password}
          }).then(res=>{
            localStorage.setItem('token',res.data.token);
            // this.$router.push({path: '/personmanage'})
            this.$http.get("oauth/userfront/currentUser",{},response=>{
              console.log(response.data)
              this.$store.commit("userSignin",response.data);
              this.$router.push({path: '/personmanage'})
            });
          })
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .ivu-btn-primary{
        width: 150px;
        height: 48px;
        border-radius: 30px;
        background: #15b2f4;
        border: none;
        font-size: 14px;
    }
    .bigbox{
        width: 100%;
        height: 100%;
        background: url("../../public/img/bj.png")no-repeat;
        background-size: 100% 100%;
        position: fixed;
    }
    .flexbox{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex-direction:column;
        margin-bottom: 40px;
        text-align: center;
    }
    .posibox{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 400px;
        height: 400px;
        padding: 30px;
    }
    .textbox{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items:center;
        margin-bottom: 20px;
        padding: 0 18px;
        width: 500px;
        padding-left: 0px;
    }
    .text{
        font-size: 28px;
        margin-left: 20px;
        color: #fff;
    }

</style>
