<template>
    <div style="padding-left: 260px;min-width: 1000px;padding-top: 60px">
        <div class="centerbox">
            <div class="title">
                <p>外场维护人员</p>
            </div>
            <div>
                <i-input v-model="value" placeholder="姓名、公司名称" style="width: 200px" class="sousuo"></i-input>
                <i-button type="primary" class="sure" @click="serach">搜索</i-button>
            </div>
            <div class="rightbox">
                <div class="exj1" @click="update">
                    <img src="../../public/img/lie5.png"/>
                    同步
                </div>
                <div class="exj2" @click="upload">
                    <img src="../../public/img/lie6.png"/>
                    导入
                </div>
                <div class="exj3" @click="daochu" >
                    <img src="../../public/img/lie7.png"/>
                    导出
                </div>
                <div class="exj4" @click="kapian" style="color:#1D60FE" v-if="acardshow">
                    <img src="../../public/img/lie4.png"/>
                    卡片模式
                </div>
                <div class="exj4" v-if="!acardshow" @click="kapian">
                    <img src="../../public/img/lie2.png"/>
                    卡片模式
                </div>
                <div class="exj4" @click="liebiao" v-if="acardshow">
                    <img src="../../public/img/lie1.png"/>
                    列表模式
                </div>
                <div class="exj4" style="color:#1D60FE" v-if="!acardshow">
                    <img src="../../public/img/lie3.png"/>
                    列表模式
                </div>
            </div>
        </div>
        <!--卡片模式-->
        <div class="cardbox" v-if="acardshow">
            <div class="rightshow">
                <div>
                    <img src="../../public/img/green.png"/>
                    <p>正常</p>
                </div>
                <div>
                    <img src="../../public/img/red.png"/>
                    <p>停用</p>
                </div>
            </div>

           <div class="cardcontent">
                <div v-for="(cards,index) in list" @click="gotodetail(index)" :key="index">
                    <img src="../../public/img/green.png" class="statuds" v-if="cards.certificateStatus==0"/>
                    <img src="../../public/img/red.png" class="statuds" v-if="cards.certificateStatus==1"/>
                    <img src="../../public/img/logo2.png" class="cardicon"/>
                    <p style="font-size: 18px">{{cards.userName}}</p>
                    <p style="font-size: 18px">{{cards.company}}</p>
                    <p>证书编号：<span>{{cards.certificateNo}}</span></p>
                    <p>身份证号：<span>{{cards.idCard | hideMiddle}}</span></p>
                    <p>手机号：<span>{{cards.mobile}}</span></p>
                </div>

           </div>
            <Page :total='totals' show-total class="fullpage" @on-change="changepage"></Page>
        </div>

        <!--列表模式-->
        <div v-if="!acardshow" class="tablebox">
            <i-table highlight-row stripe border :columns="columns1" :data="data1" ></i-table>
            <Page :total='totals' show-total class="fullpage" @on-change="changeliebiaopage"></Page>
        </div>

        <!-- 弹窗 -->
        <div v-if="modal1" class="dialog">
            <div class="dialogbox">
                <div style="text-align:left;margin-top:20px;display:flex">
                    <p style="margin-bottom:20px;margin-right:20px">请选择导入的文件</p>
                    <input type="file" name="file" ref="file"/> 
                </div>
                <div class="iconlist">
                    <p @click="closedialog">取消</p>
                    <div class="exj1" style="margin-left:20px;background:#15b2f4;color:#fff;height:30px;border:1px solid #15b2f4" @click="confirmupload">确定上传</div>
                </div>
                <div class="downwrod">
                    <p>下载 导入文件模板</p>
                    <div  style="margin-left:10px;color:#1D60FE;border-bottom:1px solid #1D60FE;cursor:pointer" @click="xiazai">下载</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'personmanage',
    components: {

    },
    data () {
      return {
          headers: {
    'Authorization' : localStorage.token
    },
        actionaddress:'//jsonplaceholder.typicode.com/posts/',
        modal1:false,
        userdata:[],
        value: '',
        totals:0,
        list:[],
        acardshow:true,
        boolsousuo:'',
        current:1,
        columns1: [
          {
            title: '姓名',
            key: 'userName',
            className:'centers',
            width:80,
          },
          {
            title: '项目名称',
            key: 'projectName',
            className:'address',
          },
          {
            title: '证书编号',
            key: 'certificateNo',
            className:'centers',
            // width:95,
          },
          {
            title: '单位名称',
            key: 'company',
            className:'centers',
          },
          {
            title: '单位地址',
            key: 'companyAddress',
            className:'address',
            width:200,
          },
          {
            title: '联系方式',
            key: 'mobile',
            className:'centers',
            width:120,
          },
          {
            title: '所属单位联系方式',
            key: 'companyPhone',
            className:'centers',
            width:150,
          },
          {
            title: '证书状态',
            className:'centers',
            key: 'status',
            width:95,
            render:(h,params)=>{
                return h('span',{
                    style:{
                        color:(params.row.status=="在用")?"#EC626B":"#6FC833",
                    }
                },params.row.status)
            }
          },
          {
            title: '邮箱账号',
            className:'centers',
            key: 'email',
            // width:170,
          },
          {
            title: '更多',
            className:'centers',
            key:'more',
            width:65,
            render: (h, params) => {
                    return h('div', [
                        h('div', {
                            on: {
                                click: () => {
                                  this.handleRowChange(params.row)
                                }
                            }
                        }, '更多')
                    ]);
                  }
          }
        ],
        data1: [],
        uploadFile:[],
      }
    },
    filters: {
        hideMiddle(val) {
            return `${val.substring(0,6)}********${val.substring(val.length-4)}`
        }
     },
    created(){
    },
    mounted(){
      this.$http.get("oauth/certificate/findAllforApp",{},res=>{
        this.totals = res.data.total
        this.list = res.data.list
        this.data1 = res.data.list
        this.data1.forEach (el=>{ if(el.certificateStatus == 0) { el.status = '正常' }else{el.status = '停用'}})
      },err=>{
      })
    },
    methods: {
        update(){
            this.$http.put("oauth/userMaintain/userSynchronize",{},res=>{
              this.$Message.info(res.message);
              this.$http.get("oauth/certificate/findAllforApp",{},res=>{
                this.totals = res.data.total
                this.list = res.data.list
                this.data1 = res.data.list
                this.data1.forEach (el=>{ if(el.certificateStatus == 0) { el.status = '正常' }else{el.status = '停用'}})
            },err=>{
            })
          },err=>{
          })
        },
      liebiao(){
        this.acardshow = false
        if(this.boolsousuo){
          this.$http.get("oauth/certificate/findAllforApp",{value:this.value},res=>{
            this.totals = res.data.total
            this.data1 = res.data.list
            this.list = res.data.list
            this.data1.forEach (el=>{ if(el.certificateStatus == 0) { el.status = '在用' }else{el.status = '停用'}})
          },err=>{
          })
        }else{
          this.$http.get("oauth/certificate/findAllforApp",{page:this.current},res=>{
            this.totals = res.data.total
            this.data1 = res.data.list
            this.data1.forEach (el=>{ if(el.certificateStatus == 0) { el.status = '在用' }else{el.status = '停用'}})
          },err=>{
          })
        }
      },
      kapian(){
        this.acardshow = true
        if(this.boolsousuo){
          this.$http.get("oauth/certificate/findAllforApp",{value:this.value},res=>{
            this.totals = res.data.total
            this.list = res.data.list
            
          },err=>{
          })

        }else{
          this.$http.get("oauth/certificate/findAllforApp",{page:this.current},res=>{
            this.totals = res.data.total
            this.list = res.data.list
          },err=>{
          })
        }
      },
      changepage(i){
        this.$http.get("oauth/certificate/findAllforApp",{page:i},res=>{
          this.totals = res.data.total
          this.list = res.data.list
          this.current = i
        },err=>{
        })
      },
      changeliebiaopage(i){
        this.$http.get("oauth/certificate/findAllforApp",{page:i},res=>{
          this.totals = res.data.total
          this.data1 = res.data.list
          this.current = i
          this.data1.forEach (el=>{ if(el.certificateStatus == 0) { el.status = '在用' }else{el.status = '停用'}})
        },err=>{
        })
      },
      serach(){
        this.$http.get("oauth/certificate/findAllforApp",{value:this.value},res=>{
          this.boolsousuo = this.value
          this.totals = res.data.total
          this.data1 = res.data.list
          this.list = res.data.list
          this.data1.forEach (el=>{ if(el.certificateStatus == 0) { el.status = '在用' }else{el.status = '停用'}})
        },err=>{
        })
      },
      daochu(){
        window.location.href=this.$http.root+'/oauth/userMaintain/downloadExcle';
      },
      upload(){
          this.modal1 = true
      },
      gotodetail(index){
        this.$router.push({path: '/personmanagedetail',query:{uesrid:this.list[index].userId}});
      },
      handleRowChange(currentRow){
        console.log(currentRow)
        this.$router.push({path: '/personmanagedetail',query:{uesrid:currentRow.userId}});
      },
      xiazai(){
           window.location.href=this.$http.root+'/oauth/userMaintain/excleDownload';
      },
      closedialog(){
          this.modal1 = false
      },
      confirmupload(){
          let file = this.$refs.file.files[0]
          let parms = new FormData()
          parms.append('file',file,file.name)
          this.$http.post("oauth/userMaintain/userExcleImport",parms,res=>{
            if(res.rel == false){
                this.$Message.info('上传失败');
            }else{
                this.$Message.info('上传成功');
                this.modal1 = false
            }
        },err=>{
        })
      },
    }
  }
</script>
<style scoped>
    .aaa{
        font-size:20px;
    }
    .sousuo{
        margin-top: 20px;
    }
    .sure{
        margin-top: 21px;
        height: 32px;
        border-radius: 0;
        background: #1D60FE;
        width: 40px;
        padding: 0;
        border-radius: 0 4px 4px 0;
        /* line-height: 32px; */
    }
    .rightbox{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        margin-top: 20px;
        font-size: 14px;
        align-items: center;
        margin-right: 60px;
    }
    .rightbox img{
        margin-right: 10px;
    }
    .exj1{
        border: 1px solid #1D60FE;
        color: #1D60FE;
        border-radius: 4px;
        padding: 0 8px;
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        height: 25px;
        margin-right: 20px;
        cursor:pointer;
    }
    .exj2{
        border: 1px solid #26BDD2;
        color: #26BDD2;
        border-radius: 4px;
        padding: 0 8px;
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        height: 25px;
        margin-right: 20px;
        cursor:pointer;
    }
    .exj3{
        border: 1px solid #EF3543;
        color: #EF3543;
        border-radius: 4px;
        padding: 0 8px;
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        height: 25px;
        margin-right: 20px;
        cursor:pointer;
    }
    .exj4{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        margin-right: 20px;
        color: #717578;
        cursor:pointer;
    }
    .exj4 img{
        margin-right: 5px;
    }
    .cardbox{
        margin-top: 30px;
        position: relative;
    }
    .rightshow{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        color: #717578;
        position: absolute;
        right: 40px;
    }
    .rightshow div{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        margin-right: 40px;
    }
    .rightshow div img{
        margin-right: 5px;
    }
    .cardcontent {
        display: flex;
        width: 100%;
        flex-wrap:wrap;
    }
    .cardcontent div{
        margin-top: 2%;
        width: 15%;
        padding: 0px 0px 3% 1.5%;
        text-align: left;
        color: #717578;
        box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
        position: relative;
        min-width: 200px;
        margin-right: 1.5%;
        cursor:pointer;
    }
    .cardcontent div:hover{
        transform: scale(1.1);
    }
    .cardcontent div p{
        margin-top: 10%;
    }
    .cardicon{
        position: absolute;
        right: 30px;
        top:20px;
        width: 30px;
        height: 35px;
    }
    .statuds{
        position: absolute;
        top:0;
        left: 0;
        width: 25px;
        height: 25px;
    }
    .tablebox{
        margin-top: 30px;
        padding-right: 50px;
    }
    .dialog{
        position:fixed;
        width:100%;
        height:100%;
        left:0;
        top:0px;
        background-color: rgba(55, 55, 55, 0.6);
        z-index:1012;
    }
    .dialogbox{
        width: 485px;
        height: 250px;
        position: relative;
        margin: 0 auto;
        top:35%;
        background:#fff;
        border-radius: 5px;
        padding: 20px;
        font-size: 15px;
    }
    .ivu-btn-ghost{
        color: #717578;
    }
    .iconlist{
        position: absolute;
        bottom: 100px;
        right: 162px;
        display: flex;
        align-items:center;
    }
    .downwrod{
        position: absolute;
        bottom: 20px;
        right: 30px;
        display: flex;
    }
    .address{
    text-align:left ;
    }
    .centers{
    text-align:center;
    }
</style>
