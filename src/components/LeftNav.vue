<template>
  <div class="nav-center">
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
        <li tag="li"  v-for="(x,index) in lists" class="clearfix main-item" :key="index" :class="navindex == index ? 'checknav' : ''"   @click="gotopage(x,index)" >
          <img :src="require('../../public/img/'+x.icon+'.png')" class="icon">
          <div class="inner">
            <a class="title" >
              {{ x.title }}
            </a>
            <img src="../../public/img/x.png" class="imgbottom" v-if="x.children.length > 0&&openindex != index"/>
            <img src="../../public/img/s.png" class="imgbottom" v-if="openindex == index"/>
            <ul class="item" v-if="openindex == index" >
              <li v-for="(y,i) in x.children" :key="i" @click.stop="gotochildren(y,i)" :class="childrenindex == i ? 'checknav' : ''">
                <a class="title" style="padding:0">
                  <img :src="require('../../public/img/'+y.icon+'.png')" class="icon" style="margin-right:20px;margin-top: 10px;" v-if="y.icon">
                  {{ y.title }}
                </a>
                <!-- <img src="../../public/img/x.png" class="imgbottom" v-if="y.children.length > 0"/> -->
              </li>
            </ul>
          </div>
        </li>
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
      navindex:-1,
      openindex:-1,
      childrenindex:-1,
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
    this.lists.forEach (el=>{ if(el.path == '/bigscreenshow') { el.path = '#' }})
    // console.log(this.lists)
    this.navindex = localStorage.getItem('num')
    this.childrenindex = localStorage.getItem('nums')
  },
  methods: {
    changeSide(bl){
      this.$store.commit("changeSide",bl);
    },
    gotopage(data,index){
      if(data.children.length == 0){
        this.navindex = index
        this.childrenindex = -1
        this.openindex = -1
        if(data.path == this.$route.path){
          this.$router.go(0)
          localStorage.setItem('num', index)
        }else if(data.path == '#'){
          window.open(window.g.bigscreenUrl+"#/bigscreenshow")
        }else{
          this.$router.push(data.path)
        }
      }else{
        if(this.openindex == index){
          this.openindex = -1
        }else{
          this.openindex = index
        }
      }
    },
    gotochildren(data,index){
      this.childrenindex = index
      this.navindex = -1
      if(data.children.length == 0){
        // this.childrenindex = index
        // this.openindex = -1
        if(data.path == this.$route.path){
          this.$router.go(0)
        }else if(data.path == '#'){
          window.open(window.g.bigscreenUrl+"#/bigscreenshow")
        }else{
          this.$router.push(data.href)
        }
      }else{
          this.$router.push(data.href)
          if(data.href == '/system'){
            console.log(1111)
          this.$router.go(0)
          localStorage.setItem('nums', index)
          }
      }
      // else{
      //   if(this.openindex == index){
      //     this.openindex = -1
      //   }else{
      //     this.openindex = index
      //   }
      // }
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
      // padding: 10px 16px;
      line-height: 40px;
      cursor: pointer;
      border-left: 8px solid #F8F9FA;
      // &.router-link-active,&.on{
      //   border-left: 8px solid #1D60FE;
      //   background: #fff;
      // }
      .icon{
        display: block;
        float: left;
        margin-top: 20px;
        padding-left: 16px;
      }
    }
    .title {
      display: block;
      padding-left: 50px;
      text-align: left;
      cursor: pointer;
      font-size: 17px;
      margin-top: 8px;
    }
    .titles{
      display: block;
      padding-left: 50px;
      text-align: left;
      cursor: pointer;
      font-size: 17px;
      margin-top: 8px;
      color: #1D60FE;
    }
  }
}
 .nav-center ul .checknav{
     border-left: 8px solid #1D60FE;
     background: #fff;
   }
   .imgbottom{
     position: absolute;
     right: 25px;
     top: 25px;
   }
</style>
