<template>
    <div style="min-width: 1000px;padding-top: 70px;display:flex">
          <div class="leftmain">
               <div class="control-top">
                 <p>网关状态：</p>
                     <Radio-group v-model="wgstate" @on-change="changetypes($event)" >
                      <Radio label="nomal">
                          <span>正常</span>
                      </Radio>
                      <Radio label="abnormal">
                          <span>异常</span>
                      </Radio>
                  </Radio-group>
               </div>
               <div class="control-top">
                 <p>网关状态：</p>
                     <Radio-group v-model="wgstate" @on-change="changetypes($event)" >
                      <Radio label="nomal">
                          <span>正常</span>
                      </Radio>
                      <Radio label="abnormal">
                          <span>异常</span>
                      </Radio>
                  </Radio-group>
               </div>
          </div>
          <div class="righttmain">
               123
          </div>
    </div>
</template>
<script>
// import ArcgisMaplog from "@/components/ArcgisMaplog";
  export default {
    name: 'update',
    components: {
        // ArcgisMaplog
    },
    data () {
      return {
         wgstate:'',
      }
    },
    created(){
    },
    mounted(){
    //   console.log(window.g.ApiUrl)
    },
    methods: {
       
    }
  }
</script>
<style scoped>
   .leftmain{
     width: 60%;
     height: 100%;
     box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
     padding: 20px;
   }
   .righttmain{
     width: 40%;
     height: 100%;
     box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
     margin-right: 20px;
     margin-left: 20px;
     padding: 20px;
   }
   .control-top{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .control-top p {
      font-size: 16px;
    }
</style>
