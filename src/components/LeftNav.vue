<template>
  <div class="nav-center">
    <!-- <span class="switch" @click="changeSide(!noSide)">{{ noSide ? '显示导航' : '隐藏导航'}}</span> -->
    <div style="background:#F8F9FA;padding-top:10px">
       <div @click="changeSide(!noSide)" v-if="!noSide">
         <img src="../../public/img/ss1.png" />
      </div>
      <div @click="changeSide(!noSide)" v-if="noSide">
        <img src="../../public/img/ss2.png" />
      </div>
    </div>
    <div class="menu" :class="{ noSide: noSide }">
      <ul class="item">
        <router-link tag="li" :to="x.path" v-for="(x,index) in lists" class="clearfix main-item" :key="index" :class="x.path == '/'+$route.name ? 'on' : ''"   @click.native="gotopage(x.path)">
          <img :src="require('../../public/img/'+x.icon+'.png')" class="icon">
          <div class="inner">
            <!-- <a :class="x.path == '/'+$route.name?'titles':'title'" @click.stop="x._show = !x._show" >
              {{ x.title }}
            </a> -->
            <a class="title" @click.stop="x._show = !x._show" >
              {{ x.title }}
            </a>
            <ul class="item" v-if="x._show && x.children.length">
              <li v-for="(y,i) in x.children" :key="i">
                <a class="title">
                  <i>图标</i>
                  {{ y.title }}
                </a>
              </li>
            </ul>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'LeftNav',
  props: {
    msg: String
  },
  data(){
    return {
      lists:JSON.parse(localStorage.getItem('navlist')),

      // lists: [
      //   {
      //     url: '/safemanage',
      //     title: "安全管理", 
      //     icon: require('../../public/img/1.png'), 
      //     _show: false, 
      //     children:[
      //       // {
      //       //   title: "测试11",
      //       //   icon: '',
      //       //   _show: false
      //       // }
      //     ]
      //   },{
      //     url: '/operation',
      //     title: "运维管理", 
      //     icon: require('../../public/img/2.png'), 
      //     _show: false, 
      //     children:[]
      //   },
      //   {
      //     url: '/personmanage',
      //     title: "人员管理", 
      //     icon: require('../../public/img/gl.png'), 
      //     _show: false, 
      //     children:[]
      //   },
      //   {
      //     url: '/log',
      //     title: "日志管理", 
      //     icon: require('../../public/img/gz.png'), 
      //     _show: true, 
      //     children:[
      //     ]
      //   },
      //   {
      //     url: '/system',
      //     title: "系统管理", 
      //     icon: require('../../public/img/sz.png'), 
      //     _show: true, 
      //     children:[
      //       // {
      //       //   title: "测试11",
      //       //   icon: '',
      //       //   _show: false
      //       // }
      //     ]
      //   }
      // ]
    }
  },
  computed:{
    ...mapState({
      noSide: "noSide"
    })
  },
  mounted() {
    // console.log(this.$route.name)

  },
  methods: {
    changeSide(bl){
      this.$store.commit("changeSide",bl);
    },
    gotopage(url){
      if(url == this.$route.path){
        this.$router.go(0)
      }
    },
    asyncList: function (num) {
      var that = this
      setTimeout(function () {
        for(var i =0; i < num; i++) {
          that.lists.push({
            title: '测试' + (i + 1),
            icon: '',
            _show: false,
            children: [{
              title: '测试' + (i + 1) + (i + 1),
              icon: '',
               _show: false
            }]
          })
        }
      }, 2000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
*{
  padding: 0;
  margin: 0;
}
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
    clear: both;
}
.nav-center {
  font-size: 14px;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding-top: 60px;
  height: 100%;
  background: #fff;
  .switch {
    display: inline-block;
    padding: 8px;
    color: green;
  }
  .menu {
    width: 240px;
    height: 100%;
    box-sizing: border-box;
    overflow: scroll;
    padding: 10px 0;
    border-right: 1px solid #eee;
    background-color: #F8F9FA;
    font-size: 14px;
    color: #000;
    transition: all 300ms;
    &::-webkit-scrollbar {
      display: none;
    }
    &.noSide {
      width: 60px;
      .inner {
        display: none;
        position: absolute;
        top: 0;
        left: 110%;
        width: 240px;
        padding: 24px 16px;
        background-color: #F8F9FA;
        border-radius: 4px;
        height: auto;
      }
      .main-item:hover {
        .inner {
          display: block;
        }
      }
    }
  }
  ul {
    list-style: none;
    li {
      position: relative;
      padding: 10px 16px;
      cursor: pointer;
      border-left: 8px solid #F8F9FA;
      &.router-link-active,&.on{
        border-left: 8px solid #1D60FE;
        background: #fff;
      }
      .icon{
        display: block;
        float: left;
        margin-top: 5px;
      }
    }
    .title {
      display: block;
      padding-left: 50px;
      text-align: left;
      cursor: pointer;
      font-size: 17px;
      margin-top: 0;
    }
    .titles{
      display: block;
      padding-left: 50px;
      text-align: left;
      cursor: pointer;
      font-size: 17px;
      margin-top: 0;
      color: #1D60FE;
    }
  }
}
// .navbox{
//   position: absolute;
//   top: 0;
//   width: 15%;
//   height: 100%;
//   font-size: 14px;
//   text-align: left;
//   min-width: 220px;
// }
// .headcom div{
//   text-align: center;
//   width: 15%;
//   background:#F8F9FA ;
//   height: 100%;
//   display: flex;
//   align-items: center;
// }
// .headcom .logobox{
//   /*height: 100px;*/
//   text-align: center;
// }
// .logo{
//   background-size: 100% 100%;
//   width: 40px;
//   align-items: center;
//   margin: 0 auto;
// }
// .textlog{
//   height: 50px;
//   margin-left: 4%;
// }
// .nav{
//   width: 15%;
//   background: #F8F9FA;
//   height: 100%;
//   position: fixed;
//   top:10%;
//   min-width: 220px;
// }
// .nav li{
//   min-width: 220px;
//   padding: 10px 0;
//   display:-webkit-box;
//   display: -moz-box;
//   display: -ms-flexbox;
//   display: -webkit-flex;
//   display: flex;
//   align-items: center;
//   border-left: 5px solid #F8F9FA;
// }
// .nav .check{
//   border-left: 5px solid #1D60FE;
//   background: #fff;
// }
// .navicon{
//   width: 20px;
//   height: 20px;
//   margin-left: 40px;
// }
// .nav li p{
//   font-size: #000;
//   font-size: 18px;
//   margin-left: 30px;
//   color: #7E8184;
// }
</style>
