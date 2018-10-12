<template>
  <div class="navbox">
    <div class="headcom">
      <div>
        <img src="../../public/img/logo2.png" class="logo"/>
      </div>
    </div>
    <ul class="nav">
      <li @click="checknav(1)" ref="one">
        <img src="../../public/img/1.png" class="navicon"/>
        <p>安全管理</p>
      </li>
      <li @click="checknav(2)"  ref="two">
        <img src="../../public/img/2.png" class="navicon"/>
        <p>人员设备管理</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.navbox{
  position: absolute;
  top: 0;
  width: 250px;
  height: 100%;
  font-size: 14px;
  text-align: left;
}
.headcom div{
  text-align: center;
  width: 250px;
  background:#F8F9FA ;
  height: 100%;
  display: flex;
  align-items: center;
}
.logo{
  background-size: 100% 100%;
  width: 40px;
  height: 80px;
  align-items: center;
  margin: 0 auto;
}
.textlog{
  height: 50px;
  margin-left: 4%;
}
.nav{
  width: 250px;
  background: #F8F9FA;
  height: 100%;
  position: fixed;
  top:10%;
}
.nav li{
  padding: 10px 0;
  display:-webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  border-left: 5px solid #F8F9FA;
}
/*.nav li:hover{*/
  /*border-left: 5px solid #15b2f4;*/
/*}*/
.navicon{
  width: 20px;
  height: 20px;
  margin-left: 40px;
}
.nav li p{
  font-size: #000;
  font-size: 18px;
  margin-left: 30px;
  color: #7E8184;
}
</style>
