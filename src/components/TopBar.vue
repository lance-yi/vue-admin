<template>
  <div class="top-bar">
    <div class="logo">
      <img src="../../public/img/logo2.png"/>
    </div>
    <img src="../../public/img/6.png"/>
    <div class="userbox">
      <div class="user-item">
        <img src="../../public/img/7.png"/><span>管理员</span>
      </div>
      <div class="user-item edit" @click="confirm">
        <img src="../../public/img/15.png" /><span>退出</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  props: {
    msg: String
  },
  data () {
    return {
    }
  },
  methods:{
    confirm () {
      this.$Modal.confirm({
        title: '您确定要退出吗',
        // content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
        onOk: () => {
          localStorage.removeItem('token')
          this.$router.push({path: '/'});
        },
        onCancel: () => {
        }
      });
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
  position: relative;
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
  }
}
.ivu-btn-primary {
  width: 70px;
  height: 33px;
}
</style>
