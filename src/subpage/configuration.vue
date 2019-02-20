<template>
    <div>
        <div style="padding:0 40px 0 20px;text-align:left" >
                  
                  <button   class="zhuanyixuke" style="border:1px solid #5ECEDD;color:#5ECEDD" @click="adddevice">新增</button>
                  <button   class="zhuanyixuke" @click="modifydevice" v-if="!deteleshow">修改</button>
                  <button   class="zhuanyixuke" style="border:1px solid #E15C5C;color:#E15C5C;margin-bottom:20px" @click="deteledevice" v-if="!deteleshow">删除</button>
                  <button   class="zhuanyixuke" style="border:1px solid #E15C5C;color:#E15C5C;margin-bottom:20px" v-if="deteleshow" @click="allowdetele">确定删除</button>
                  <button   class="zhuanyixuke"  v-if="deteleshow" @click="deteleshow = false">返回</button>
                      <Row>
                       <Col span="5" style="margin-right: 20px;">
                           <div class="head-left">设备类型名称</div>
                           <div style="border:1px solid  #e8eaec;padding-left:20px;padding-bottom:10px" v-if="deteleshow">
                              <CheckboxGroup v-model="devicecheckdata" >
                                <Checkbox :label="list.id" v-for="(list,index) in devicelist" :key="index" style="width:100%;padding: 10px 0 0 10px;">
                                    <span>{{list.deviceName}}</span>
                                </Checkbox>
                            </CheckboxGroup>
                           </div>
                            <div style="border:1px solid  #e8eaec;padding-left:20px;padding-bottom:10px" v-if="!deteleshow">
                              <p v-for="(list,index) in devicelist" :key="index" style="padding: 10px 0 0 10px;cursor:pointer" @click="chekcdecive(list,index)" :class="deviceindex == index?'check':''">{{list.deviceName}}</p>
                           </div> 
                       </Col>
                       <Col span="18">
                           <Tabs value="属性详情" @on-click="wordbook">
                              <TabPane label="属性详情" name="属性详情">
                                <div style="position:relative">
                                  <button   class="zhuanyixuke" style="position:absolute;right:70px;top:-40px;border:1px solid #E15C5C;color:#E15C5C;" @click="deteleproperty">删除</button>
                                  <button   class="zhuanyixuke" style="position:absolute;right:0;top:-40px" @click="addproperty">添加</button>
                                  <Table stripe :columns="columns2" :data="data2" style="margin-top:35px" @on-selection-change="checkproperty"></Table>
                                  <div style="text-align:center;margin-top:10px">
                                      <Page :total="detailtotal" show-total @on-change="changedetailpage"  :current.sync="pagesdata"/>
                                  </div>
                                </div>
                              </TabPane>
                              <TabPane label="环境指标" name="环境指标">
                                  <Row>
                                    <Col span="5" style="margin-right: 20px;">
                                        <div class="head-left" style="position:relative">组名称
                                            <img src="../../public/img/167.png" style="position:absolute;right:10px;top:12px;cursor:pointer" @click="deteleenvironment"/>
                                            <img src="../../public/img/166.png" style="position:absolute;right:35px;top:12px;cursor:pointer" @click="addenvironment"/>
                                        </div>
                                        <div style="border:1px solid  #e8eaec;padding-left:20px;padding-bottom:10px" v-if="deteleshows">
                                            <CheckboxGroup v-model="environmentdata" >
                                                <Checkbox :label="list.id" v-for="(list,index) in environmentlist" :key="index" style="width:100%;padding: 10px 0 0 10px;">
                                                    <span>{{list.name}}</span>
                                                </Checkbox>
                                            </CheckboxGroup>
                                        </div>
                                            <div style="border:1px solid  #e8eaec;padding-left:20px;padding-bottom:10px" v-if="!deteleshows">
                                            <p v-for="(list,index) in environmentlist" :key="index" style="padding: 10px 0 0 10px;cursor:pointer" @click="chekcdecives(list,index)" :class="deviceindexs == index?'check':''">{{list.name}}</p>
                                        </div> 
                                    </Col>
                                    <Col span="18" v-if="environmentdatalist.groupCode">
                                       <div style="position:relative">
                                           <button   class="zhuanyixuke" style="position:absolute;right:0;top:12px" @click="editingroup" v-if="bianji2">编辑</button>
                                           <button   class="zhuanyixukes" style="position:absolute;right:0;top:12px"  v-if="!bianji2" @click="savegroup">保存</button>
                                           <button   class="zhuanyixuke" style="position:absolute;right:70px;top:12px" @click="backgroup" v-if="!bianji2">返回</button>
                                           <button   class="zhuanyixuke" style="position:absolute;right:0;top:65px" @click="editingmode" v-if="bianji1">编辑</button>
                                           <button   class="zhuanyixukes" style="position:absolute;right:0;top:65px"  v-if="!bianji1">编辑</button>
                                           <button   class="zhuanyixuke" style="position:absolute;right:70px;top:65px" @click="backenvironment" v-if="!bianji1">返回</button>
                                           <div class="mainbox" >
                                                <div >
                                                    环境组编码
                                                    <span v-if="bianji2">{{environmentdatalist.groupCode}}</span>
                                                    <Input v-model="environmentdatalist.groupCode" disabled  style="width: 150px;border:none;margin:0;padding:0" v-if="!bianji2"/>
                                                </div>
                                                <div >
                                                    环境组名称
                                                    <span v-if="bianji2">{{environmentdatalist.groupName}}</span>
                                                    <Input v-model="environmentdatalist.groupName"   style="width: 150px;border:none;margin:0;padding:0" v-if="!bianji2"/>
                                                </div>
                                           </div>
                                           <div class="detail-title">
                                                <img src="../../public/img/66.png"/>
                                                <p>环境编码详情</p>
                                            </div>
                                           <div class="mainboxs" v-for="(list,index) in environmentdatalist.evnAttrList" :key="index">
                                                <div v-if="list.code">
                                                    编码
                                                    <span v-if="bianji1">{{list.code}}</span>
                                                    <Input v-model="list.code" disabled  style="width: 150px;border:none;margin:0;padding:0" v-if="!bianji1"/>
                                                </div>
                                                <div v-if="!list.code">
                                                    编码
                                                    <Input v-model="list.codes" style="width: 150px;border:none;margin:0;padding:0" v-if="!bianji1"/>
                                                </div>
                                                <div >
                                                    名称
                                                    <span v-if="bianji1">{{list.name}}</span>
                                                    <Input v-model="list.name"  style="width: 150px;border:none;margin:0;padding:0" v-if="!bianji1"/>
                                                </div>
                                                <Button @click="handenRemove(index)" v-if="!bianji1">删除</Button>
                                           </div>
                                           <button   class="zhuanyixuke" style="border:1px solid #5ECEDD;color:#5ECEDD" v-if="!bianji1" @click="handenAdd">添加</button>
                                       </div>
                                       <button   class="zhuanyixuke"  v-if="!bianji1" style="margin-top:40px;margin-left:30%" @click="allowenvironment">确认</button>
                                       <div class="detail-title" style="position:relative">
                                                <img src="../../public/img/num2.png"/>
                                                <p>环境编码详情</p>
                                                <button   class="zhuanyixuke" style="position:absolute;right:0;top:0px" @click="addgroupbottom">添加</button>
                                        </div>
                                        <Row v-for="(list,indexs) in environmentdatalist.evnAttrExtendList" :key="indexs" class="bottombox">
                                            <img src="../../public/img/xxx.png"  class="rightimg"   style="right:40px" @click="groupbottomRemove(list.id)"/>
                                            <img src="../../public/img/bj1.png" class="rightimg" style="right:20px" @click="editgroupbottom(list)"/>
                                            <img src="../../public/img/x.png"  class="rightimg" @click="open($event,list.isCreate)" />
                                            <img src="../../public/img/s.png"  class="rightimg" style="display:none" @click="drawback($event)"/>
                                            <Col span="7">
                                                <div>
                                                    <span>编码：</span>{{list.name}}
                                                </div>
                                            </Col>
                                            <Col span="7" >
                                               <div>
                                                    <span>名称：</span>{{list.notes}}
                                                </div>
                                            </Col>
                                            <Col span="7" >
                                               <div>
                                                    <span>类型：</span>{{list.type}}
                                                </div>
                                            </Col>
                                            <Col span="7">
                                                <div v-if="list.isShow == 0">
                                                    <span>是否显示：</span>否
                                                </div>
                                                <div v-if="list.isShow == 1">
                                                    <span>是否显示：</span>是
                                                </div>
                                            </Col>
                                            <Col span="7">
                                                <div v-if="list.isCreate == 0">
                                                    <span>是否创建：</span>否
                                                </div>
                                                <div v-if="list.isCreate == 1">
                                                    <span>是否创建：</span>是
                                                </div>
                                            </Col>
                                            <Col span="7" v-if="list.isCreate == 1">
                                                <div>
                                                    <span>字段长度：</span>{{list.length}}
                                                </div>
                                            </Col>
                                            <Col span="7" v-if="list.isCreate == 1">
                                                    <span>小数点长度：</span>{{list.decimalLength}}
                                            </Col>
                                            <Col span="7" v-if="list.isCreate == 1">
                                                <div v-if="list.isNull == 0">
                                                    <span>是否为空：</span>否
                                                </div>
                                                <div v-if="list.isNull == 1">
                                                    <span>是否为空：</span>是
                                                </div>
                                            </Col>
                                            <Col span="7" v-if="list.isCreate == 1">
                                                <div v-if="list.iskey == 0">
                                                    <span>是否为主键：</span>否
                                                </div>
                                                <div v-if="list.iskey == 1">
                                                    <span>是否为主键：</span>是
                                                </div>
                                            </Col>
                                            <Col span="7" v-if="list.isCreate == 1">
                                                <div v-if="list.isAutoIncrement == 0">
                                                    <span>是否自增长：</span>否
                                                </div>
                                                <div v-if="list.isAutoIncrement == 1">
                                                    <span>是否自增长：</span>是
                                                </div>
                                            </Col>
                                            <Col span="7" v-if="list.isCreate == 1">
                                                <div>
                                                   <span>默认值：</span>{{list.defaultValue}}
                                                </div>
                                            </Col>
                                            <Col span="7" v-if="list.isCreate == 1">
                                                <div v-if="list.isUnique == 0">
                                                    <span>是否是唯一：</span>否
                                                </div>
                                                <div v-if="list.isUnique == 1">
                                                    <span>是否是唯一：</span>是
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                  </Row>
                              </TabPane>
                              <TabPane label="阈值状态" name="阈值状态">
                                  <div style="position:relative">
                                  <button   class="zhuanyixuke" style="position:absolute;right:70px;top:-40px;border:1px solid #E15C5C;color:#E15C5C;" @click="detelethreshold">删除</button>
                                  <button   class="zhuanyixuke" style="position:absolute;right:0;top:-40px" @click="addthreshold">添加</button>
                                 <Table stripe :columns="columns1" :data="data1" style="margin-top:35px" @on-selection-change="checkthreshold"></Table>
                                 <div style="text-align:center;margin-top:10px">
                                      <Page :total="thresholdtotal" show-total @on-change="changethresholdlpage"  :current.sync="pagesthreshold"/>
                                  </div>
                                 </div>
                              </TabPane>
                               <TabPane label="状态" name="状态">
                                    <div style="position:relative;padding-left: 20px;">
                                        <button   class="zhuanyixuke" style="position:absolute;right:0;top:-40px" @click="editingmode" v-if="bianji1">编辑</button>
                                        <button   class="zhuanyixukes" style="position:absolute;right:0;top:-40px"  v-if="!bianji1">编辑</button>
                                        <button   class="zhuanyixuke" style="position:absolute;right:70px;top:-40px" @click="backstate" v-if="!bianji1">返回</button>
                                        <div style="margin-top:35px">
                                            <div class="mainbox" v-for="(list,index) in statelist" :key="index">
                                                <!-- <div>
                                                    状态
                                                    <span v-if="mainboxshow">{{list.code}}</span>
                                                    <Input v-model="list.code" style="width: 150px;border:none;margin:0;padding:0" v-if="!mainboxshow"/>
                                                </div> -->
                                                <div v-if="list.code">
                                                    编码
                                                    <span v-if="mainboxshow">{{list.code}}</span>
                                                    <Input v-model="list.code" disabled  style="width: 150px;border:none;margin:0;padding:0" v-if="!mainboxshow&&list.code != ''"/>
                                                </div>
                                                <div v-if="!mainboxshow&&!list.code">
                                                    编码
                                                    <Input v-model="list.codes"   style="width: 150px;border:none;margin:0;padding:0" />
                                                </div>
                                                <div>
                                                    名称
                                                    <span v-if="mainboxshow">{{list.name}}</span>
                                                    <Input v-model="list.name" style="width: 150px;border:none;margin:0;padding:0" v-if="!mainboxshow"/>
                                                </div>
                                                 <Button @click="handleRemove(index)" v-if="!mainboxshow">删除</Button>
                                            </div>
                                            <button   class="zhuanyixuke" style="border:1px solid #5ECEDD;color:#5ECEDD" v-if="!mainboxshow" @click="handleAdd">添加</button>
                                        </div>
                                        <button   class="zhuanyixuke"  v-if="!mainboxshow" style="margin-top:40px;margin-left:30%" @click="allowstate">确认</button>
                                    </div>
                               </TabPane>
                          </Tabs>
                       </Col>
                      </Row>
                 </div>



        
        <Modal
            v-model="modal1"
            :title=modal1title
            @on-ok="okrole('formrole')"
            >
             <Form ref="formrole" :model="formrole" :rules="rulerole" :label-width="100" >
                <FormItem label="设备编码" prop="num" >
                    <Input v-model="formrole.num" v-if="this.addrolenum == 0"/>
                    <Input v-model="formrole.num" v-if="this.addrolenum == 1" disabled/>
                </FormItem>
                <FormItem label="设备名称" prop="name" >
                    <Input v-model="formrole.name" />
                </FormItem>
             </Form>
        </Modal>  


        <Modal
            v-model="modal2"
            width="800"
            :title=modal1title
            @on-ok="okproperty('formproperty')"
            >
             <Form ref="formproperty" :model="formproperty" :rules="ruleproperty" :label-width="100" >
              <Row>
                <Col span="7">
                    <FormItem label="属性编码" prop="name" >
                        <Input v-model="formproperty.name" v-if="this.addrolenum == 0"/>
                        <Input v-model="formproperty.name" v-if="this.addrolenum == 1" disabled/>
                    </FormItem>
                </Col>
                <Col span="7" >
                    <FormItem label="属性名称" prop="notes" >
                        <Input v-model="formproperty.notes" />
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="类型" prop="type" >
                        <Select v-model="formproperty.type" >
                        <Option :value="list.label" v-for="(list,indexs) in typelist" :key="indexs">{{list.value}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="是否显示" prop="isShow" >
                        <Select v-model="formproperty.isShow" >
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="是否创建" prop="isCreate" >
                        <Select v-model="formproperty.isCreate" @on-change="isCreatechange">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7" v-if="!shows">
                    <FormItem label="字段长度" prop="length" >
                        <!-- <Input  v-model="formproperty.length" type="number"/> -->
                        <InputNumber v-model="formproperty.length" :precision="0"></InputNumber>
                    </FormItem>
                </Col>
                <Col span="7" v-if="!shows">
                    <FormItem label="小数点长度" prop="decimalLength" >
                        <!-- <Input  v-model="formproperty.decimallength" type="number"/> -->
                        <InputNumber v-model="formproperty.decimalLength" :precision="0"></InputNumber>
                    </FormItem>
                </Col>
                <Col span="7" v-if="!shows">
                    <FormItem label="是否为空" prop="isNull" >
                        <Select v-model="formproperty.isNull" >
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7" v-if="!shows">
                    <FormItem label="是否为主键" prop="iskey" >
                        <Select v-model="formproperty.isKey" >
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7" v-if="!shows">
                    <FormItem label="是否自增长" prop="isAutoIncrement" >
                        <Select v-model="formproperty.isAutoIncrement" >
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7" v-if="!shows">
                    <FormItem label="默认值" prop="defaultValue" >
                        <Input v-model="formproperty.defaultValue" />
                    </FormItem>
                </Col>
                <Col span="7" v-if="!shows">
                    <FormItem label="是否是唯一" prop="isUnique" >
                        <Select v-model="formproperty.isUnique" >
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
             </Form>
        </Modal>


         <Modal
            v-model="modal3"
            width="800"
            :title=modal3title
            @on-ok="okthreshold('formthreshold')"
            >
             <Form ref="formthreshold" :model="formthreshold" :rules="rulethreshold" :label-width="100" >
              <Row>
                  <Col span="7">
                    <FormItem label="编码指标" prop="indication" >
                       <Select v-model="formthreshold.indication" v-if="this.addrolenum == 0" >
                        <Option :value="list.label" v-for="(list,indexs) in indicationlist" :key="indexs">{{list.value}}</Option>
                        </Select>
                        <Input v-model="formthreshold.indicationName"  disabled  v-if="this.addrolenum == 1"/>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="编码名称" prop="indicationName" >
                       <!-- <Select v-model="formthreshold.indication" v-if="this.addrolenum == 0" >
                        <Option :value="list.label" v-for="(list,indexs) in indicationlist" :key="indexs">{{list.value}}</Option>
                        </Select> -->
                        <Input v-model="formthreshold.indicationName" />
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="阈值" prop="threshold" >
                        <InputNumber v-model="formthreshold.threshold" :precision="0"></InputNumber>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="符号" prop="judgeSymbol" >
                        <Select v-model="formthreshold.judgeSymbol" >
                        <Option :value="list.label" v-for="(list,indexs) in judgeSymbollist" :key="indexs">{{list.value}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="告警类型" prop="alertType" >
                        <Select v-model="formthreshold.alertType" >
                        <Option :value="list.label" v-for="(list,indexs) in alertlist" :key="indexs">{{list.value}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="21">
                    <FormItem label="告警描述" prop="alertDesc" >
                        <Input v-model="formthreshold.alertDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="当前流量为:${value},超过流量阈值:${threshold}"/>
                    </FormItem>
                </Col>
                <Col span="21">
                    <FormItem label="恢复告警描述" prop="recoverDesc" >
                        <Input v-model="formthreshold.recoverDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="流量恢复正常，当前流量为:${value}"/>
                    </FormItem>
                </Col>         
            </Row>
             </Form>
        </Modal>  


        <Modal
            v-model="modal4"
            title='新增环境组'
            @on-ok="okenvironment('formenvironment')"
            >
             <Form ref="formenvironment" :model="formenvironment" :rules="ruleenvironment" :label-width="100" >
                <FormItem label="环境组编码" prop="code" >
                    <Input v-model="formenvironment.code" />
                </FormItem>
                <FormItem label="环境组名称" prop="name" >
                    <Input v-model="formenvironment.name" />
                </FormItem>
             </Form>
        </Modal> 
        
    </div>
</template>
<script>
// import TreeGrid from '@/components/treeGrid2.0'
// import axios from 'axios'
  export default {
    name: 'configuration',
    components: {
        // TreeGrid
    },
    data () {
      return {
        bianji2:true,
        modal4:false,
        deviceindexs:0,
        deteleshows:false,
        environmentlist:[],
        environmentdata:[],
        modal3:false,
        pagesthreshold:1,
        thresholdtotal:0,
        shows:true,
        checkpropertydata:[],
        modal2:false,
        modal1:false,
        pagesdata:1,
        deviceindex:0,
        chekcdecivedata:{},
        modal1title:'',
        modal3title:'',
        addrolenum:0,
        deteleshow:false,
        modal1:false,
        detailtotal:0,
        formenvironment:{
              name: '',
              code:'',
          },
        ruleenvironment:{
              name: [
                    { required: true, message: '环境组名称不能为空', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '环境组编码不能为空', trigger: 'blur' }
                ],
        },
        formrole:{
              name: '',
              num:'',
          },
        rulerole:{
              name: [
                    { required: true, message: '设备名称不能为空', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '设备编码不能为空', trigger: 'blur' }
                ],
        },
        formproperty:{
            notes:'',
            name: '',
            type:'',
            length:0,
            decimalLength:0,
            isNull:'',
            isKey:'',
            isAutoIncrement:'',
            defaultValue:'',
            isUnique:'',
            isCreate:'0',
            deviceCode:'',
            isShow:'',
        },
        ruleproperty:{
              notes: [
                    { required: true, message: '属性名称不能为空', trigger: 'blur' }
                ],
              name: [
                    { required: true, message: '属性名称不能为空', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '属性类型不能为空', trigger: 'blur' }
                ],
                length: [
                    { required: true, message: '字段长度不能为空', trigger: 'blur', type: 'number' }
                ],
                decimalLength: [
                    { required: true, message: '小数点长度不能为空', trigger: 'blur', type: 'number' }
                ],
                isNull: [
                    { required: true, message: '是否为空不能为空', trigger: 'blur' }
                ],
                isKey: [
                    { required: true, message: '是否为主键不能为空', trigger: 'blur' }
                ],
                isAutoIncrement: [
                    { required: true, message: '是否自增长不能为空', trigger: 'blur' }
                ],
                isUnique: [
                    { required: true, message: '是否是唯一不能为空', trigger: 'blur' }
                ],
                isCreate: [
                    { required: true, message: '是否显示不能为空', trigger: 'blur' }
                ],
                isShow: [
                    { required: true, message: '是否显示不能为空', trigger: 'blur' }
                ],
        },
        formthreshold:{
            indication:'',
            indicationName:'',
            threshold:'',
            judgeSymbol:'',
            alertType:'',
            alertDesc:'',
            recoverDesc:'',
        },
        rulethreshold:{
                indication: [
                    { required: true, message: '编码指标不能为空', trigger: 'blur' }
                ],
                indicationName: [
                    { required: true, message: '编码名称不能为空', trigger: 'blur' }
                ],
                threshold: [
                    { required: true, message: '阈值不能为空', trigger: 'blur', type: 'number' }
                ],
                judgeSymbol: [
                    { required: true, message: '编符号不能为空', trigger: 'blur' }
                ],
                alertType: [
                    { required: true, message: '告警类型不能为空', trigger: 'blur' }
                ],
                alertDesc: [
                    { required: true, message: '告警描述不能为空', trigger: 'blur' }
                ],
                recoverDesc: [
                    { required: true, message: '恢复告警描述不能为空', trigger: 'blur' }
                ],
        },
        bianji1:true,
        mainboxshow:true,
        devicelist:[],
        devicecheckdata:[],
        columns2:[ {
                        type: 'selection',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: '编码',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '名称',
                        key: 'notes'
                    },
                    {
                        title: '是否显示',
                        key: 'isCreate',
                        render:(h,params)=>{
                          let tmpStr = "";
                          if(params.row.isShow == '0'){
                            tmpStr="否";
                          }else if(params.row.isShow == '1'){
                            tmpStr="是";
                          }
                          return h('span',{
                          },tmpStr)
                        }
                    },
                     {
                      title: '操作',
                      className:'centers',
                      key:'more',
                      width:65,
                      render: (h, params) => {
                              return h('div', [
                                  h('div', {
                                      on: {
                                          click: () => {
                                            this.handleRowedit(params.row)
                                          }
                                      }
                                  }, '编辑')
                              ]);
                            }
                    }
                ],
         columns1: [ {
                        type: 'selection',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'indicationName',
                        width:100
                    },
                    {
                        title: '阈值',
                        key: 'threshold',
                        width:80
                    },
                    {
                        title: '符号',
                        key: 'judgeSymbol',
                        width:60
                    },
                    {
                        title: '告警类型',
                        key: 'alertTypeName'
                    },
                    {
                        title: '告警描述',
                        key: 'alertDesc'
                    },
                    {
                        title: '恢复告警描述',
                        key: 'recoverDesc'
                    },{
                      title: '操作',
                      className:'centers',
                      key:'more',
                      width:65,
                      render: (h, params) => {
                              return h('div', [
                                  h('div', {
                                      on: {
                                          click: () => {
                                            this.handlethresholdChange(params.row)
                                          }
                                      }
                                  }, '编辑')
                              ]);
                            }
                    }
                ],
                data1: [],
                data2: [],
                typelist:[],
                statelist:[],
                judgeSymbollist:[],
                alertlist:[],
                indicationlist:[],
                checkthresholddata:[],
                environmentdatalist:[],
                checkendata:[],
      }
    },
    created(){
    },
    mounted(){
        this.$http.get("res/resDevice/all",{},res=>{
              this.devicelist = res.data
              this.chekcdecivedata = this.devicelist[0]
              this.$http.get("res/resDeviceAttr/page",{deviceCode:this.devicelist[0].deviceCode,page:1,limit:10},res=>{
                this.data2 = res.data.rows
                this.detailtotal = res.data.total
                },err=>{});
            },err=>{});
        this.$http.get("res/resDeviceAttr/getType",{},res=>{
                this.typelist = res.data
                },err=>{});
        
    },
    methods: {
       //编辑状态
       editingmode(){
           this.bianji1 = false
           this.mainboxshow = false
       },
       editingroup(){
           this.bianji2 = false
       },
       //新增设备
       adddevice(){
          this.modal1 = true
          this.addrolenum = 0
          this.modal1title = '新增设备'
          this.formrole.num = ''
          this.formrole.name = ''
       },
       //确定新增设备
       okrole(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                if(this.addrolenum == 0){
                    this.$http.post("res/resDevice/add",{
                    deviceCode:this.formrole.num,
                    deviceName:this.formrole.name,
                    },res=>{
                        this.$Message.info(res.message);
                        this.$http.get("res/resDevice/all",{},res=>{
                        this.devicelist = res.data
                        },err=>{});
                    },err=>{
                    })
                }else if(this.addrolenum == 1){
                    this.$http.put("res/resDevice/edit",{
                    deviceCode:this.formrole.num,
                    deviceName:this.formrole.name,
                    id:this.devicecheckdata[0]
                    },res=>{
                        this.$Message.info(res.message);
                        this.devicecheckdata = []
                        this.$http.get("res/resDevice/all",{},res=>{
                        this.devicelist = res.data
                        },err=>{});
                    },err=>{
                    })
                }
            } else {
                this.$Message.error('请填写完整');
            }
        })
      },
      //修改设备
      modifydevice(){
                this.formrole.name = this.chekcdecivedata.deviceName
                this.formrole.num =this.chekcdecivedata.deviceCode
                this.modal1 = true
                this.addrolenum = 1
                this.modal1title = '修改设备'
      },
      //删除设备
      deteledevice(){
          this.deteleshow = true
      },
      //确定删除设备
      allowdetele(){
            if(this.devicecheckdata.length == 0){
             this.$Message.error('请选择条目！');
          }else{
              this.$Modal.confirm({
                  title: '您确定要删除吗',
                  onOk: () => {
                     this.$http.delete("res/resDevice/delete",
                        this.devicecheckdata,res=>{
                        this.$Message.info(res.message);
                        this.devicecheckdata = []
                        this.$http.get("res/resDevice/all",{},res=>{
                                this.devicelist = res.data
                        },err=>{});
                    },err=>{});
                  }})
          }
      },
      wordbook(name){
          if(name == '属性详情'){
              this.pagesdata = 1
              this.$http.get("res/resDeviceAttr/page",{deviceCode:this.chekcdecivedata.deviceCode,page:1,limit:10},res=>{
                this.data2 = res.data.rows
                this.detailtotal = res.data.total
                },err=>{});
          }else if(name == '环境指标'){
            this.$http.get("res/resEvnGroup/selectEvnGroup",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
                this.environmentlist = res.data
                this.deviceindexs = 0
                if(this.environmentlist.length == 0){
                    this.environmentdatalist = []
                }
                    this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.environmentlist[0].code},res=>{
                        this.environmentdatalist = res.data
                         this.checkendata = this.environmentlist[0]
                    },err=>{});
                },err=>{});
          }else if(name == '阈值状态'){
            this.$http.get("res/rerfThreshold/selectAttrPage",{page:1,limit:10,deviceCode:this.chekcdecivedata.deviceCode},res=>{
                this.data1 = res.data.list
              this.thresholdtotal = res.data.total
                },err=>{});
            //符号下拉框
            this.$http.get("res/rerfThreshold/getJudgeSymbol",{},res=>{
               this.judgeSymbollist = res.data
                },err=>{});
            //告警类型下拉框
            this.$http.get("res/rerfThreshold/getAlertType",{resType:this.chekcdecivedata.deviceCode},res=>{
               this.alertlist = res.data
                },err=>{});
            //编码下拉框
            this.$http.get("res/resEvnGroup/evnSelect",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
               this.indicationlist = res.data
                },err=>{});
                
          }else if(name == '状态'){
              this.bianji1 = true
              this.mainboxshow = true
             this.$http.get("res/resStateAttr/selectStateAttr",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
                this.statelist = res.data
                },err=>{}); 
              
          }
      },
      //选择设备
      chekcdecive(list,index){
         this.deviceindex = index 
         this.chekcdecivedata = list
         this.$http.get("res/resDeviceAttr/page",{deviceCode:list.deviceCode,page:1,limit:10},res=>{
                this.data2 = res.data.rows
                this.detailtotal = res.data.total
                },err=>{});

         this.$http.get("res/resStateAttr/selectStateAttr",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
                this.statelist = res.data
                },err=>{}); 
          this.$http.get("res/resEvnGroup/selectEvnGroup",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
                this.environmentlist = res.data
                this.deviceindexs = 0
                if(this.environmentlist.length == 0){
                    this.environmentdatalist = []
                }
                this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.environmentlist[0].code},res=>{
                        this.environmentdatalist = res.data
                         this.checkendata = this.environmentlist[0]
                    },err=>{});
                },err=>{});
         //告警类型下拉框
            this.$http.get("res/rerfThreshold/getAlertType",{resType:this.chekcdecivedata.deviceCode},res=>{
               this.alertlist = res.data
                },err=>{});
         //编码下拉框
            this.$http.get("res/resEvnGroup/evnSelect",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
               this.indicationlist = res.data
                },err=>{});

        this.$http.get("res/rerfThreshold/selectAttrPage",{page:1,limit:10,deviceCode:this.chekcdecivedata.deviceCode},res=>{
                this.data1 = res.data.list
              this.thresholdtotal = res.data.total
                },err=>{});
      },
      //属相详情分页
      changedetailpage(i){
        this.$http.get("res/resDeviceAttr/page",{deviceCode:this.chekcdecivedata.deviceCode,page:i,limit:10},res=>{
                this.data2 = res.data.rows
                },err=>{});
      },
      //删除状态
      handleRemove (index) {
                if(this.statelist.length > 0){
                    this.statelist.splice(index,1)  
                }
        },
      //添加状态
       handleAdd() {
                this.statelist.push({
                    name:'',
                    codes:'',
                    deviceCode:this.chekcdecivedata.deviceCode
                });
        },
        //修改状态
        allowstate(){
          var aa = 1
          this.statelist.forEach(data => { if(data.name == ''){
                  aa++
                }else if(data.codes == ''){
                   aa++
                }})
           if(aa == 1){
             this.$http.put("res/resStateAttr/edit", this.statelist,res=>{
                        this.$Message.info(res.message);
                        this.$http.get("res/resStateAttr/selectStateAttr",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
                        this.statelist = res.data
                        },err=>{}); 
                    },err=>{
                    })
           }else{
               this.$Message.error('请填写完整');
           }
       },
       //返回状态
        backstate(){
            this.bianji1 = true
            this.mainboxshow = true
            this.$http.get("res/resStateAttr/selectStateAttr",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
                this.statelist = res.data
                },err=>{}); 
        },
        //添加属性
        addproperty(){
          this.modal2 = true
          this.shows = true
          this.modal1title = '新增属性'
          this.addrolenum = 0
            this.formproperty.notes=''
            this.formproperty.name=''
            this.formproperty.type=''
            this.formproperty.length=''
            this.formproperty.decimalLength=''
            this.formproperty.isNull=''
            this.formproperty.isKey=''
            this.formproperty.isAutoIncrement=''
            this.formproperty.defaultValue=''
            this.formproperty.isUnique=''
            this.formproperty.isCreate='0'
            this.formproperty.isShow=''
            this.formproperty.id=''
        },
        //新增属性
       okproperty(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.formproperty.deviceCode=this.chekcdecivedata.deviceCode
                if(this.modal1title == '添加环境属性'){
                   this.formproperty.id = this.environmentdatalist.id
                   this.formproperty.groupName = this.environmentdatalist.groupName
                   this.formproperty.groupCode = this.environmentdatalist.groupCode
                   this.$http.post("res/resEvnAttrExtend/add",this.formproperty,res=>{
                        this.$Message.info(res.message);
                        this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.checkendata.code},res=>{
                        this.environmentdatalist = res.data
                            },err=>{})
                        },err=>{
                        })
                }else if(this.modal1title == '编辑环境属性'){
                   this.formproperty.groupName = this.environmentdatalist.groupName
                   this.formproperty.groupCode = this.environmentdatalist.groupCode
                   this.$http.put("res/resEvnAttrExtend/edit",this.formproperty,res=>{
                        this.$Message.info(res.message);
                        this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.checkendata.code},res=>{
                        this.environmentdatalist = res.data
                            },err=>{})
                        },err=>{
                        })
                }else{
                  if(this.addrolenum == 0){
                    this.$http.post("res/resDeviceAttr/add",this.formproperty,res=>{
                        this.$Message.info(res.message);
                        this.pagesdata = 1
                        this.$http.get("res/resDeviceAttr/page",{deviceCode:this.chekcdecivedata.deviceCode,page:1,limit:10},res=>{
                            this.data2 = res.data.rows
                            this.detailtotal = res.data.total
                            },err=>{});
                        },err=>{
                        })
                    }else if(this.addrolenum == 1){
                    this.$http.put("res/resDeviceAttr/edit",this.formproperty,res=>{
                            this.$Message.info(res.message);
                            this.pagesdata = 1
                            this.$http.get("res/resDeviceAttr/page",{deviceCode:this.chekcdecivedata.deviceCode,page:1,limit:10},res=>{
                                this.data2 = res.data.rows
                                this.detailtotal = res.data.total
                                },err=>{});
                        },err=>{
                        })
                    }
                }
            } else {
                this.$Message.error('请填写完整');
            }
        })
      },
      //属性编辑
      handleRowedit(data){
            this.formproperty.notes=data.notes
            this.formproperty.name=data.name
            this.formproperty.type=data.type
            this.formproperty.isNull=data.isNull
            this.formproperty.isKey=data.isKey
            this.formproperty.isAutoIncrement=data.isAutoIncrement
            this.formproperty.defaultValue=data.defaultValue
            this.formproperty.isUnique=data.isUnique
            this.formproperty.isCreate=data.isCreate
            this.formproperty.isShow=data.isShow
            this.formproperty.id=data.id
            this.modal2 = true
            this.modal1title = '编辑属性'
            this.addrolenum = 1
            if(data.isCreate == '0'){
                this.shows = true
            }else if(data.isCreate == '1'){
                this.shows = false
                this.formproperty.length=data.length
                this.formproperty.decimalLength=data.decimalLength
            }
      },
     //删除属性
      deteleproperty(){
        if(this.checkpropertydata.length == 0){
            this.$Message.error('请选择需要删除的属性');
        }else{
            var list = []
             this.checkpropertydata.forEach(data => { list.push(data.id);})
             this.$Modal.confirm({
                  title: '您确定要删除吗',
                  onOk: () => {
                     this.$http.delete("res/resDeviceAttr/delete",
                        list,res=>{
                        this.$Message.info(res.message);
                        this.checkpropertydata = []
                        this.pagesdata = 1
                        this.$http.get("res/resDeviceAttr/page",{deviceCode:this.chekcdecivedata.deviceCode,page:1,limit:10},res=>{
                            this.data2 = res.data.rows
                            this.detailtotal = res.data.total
                            },err=>{});
                    },err=>{});
                  }})
        }
      },
      checkproperty(val){
        this.checkpropertydata = val
      },
      checkthreshold(val){
        this.checkthresholddata = val
      },
      isCreatechange(val){
       if(val == 1){
         this.shows = false
       }else{
          this.shows = true 
       }
      },
      //阈值分页
      changethresholdlpage(i){
        this.$http.get("res/rerfThreshold/selectAttrPage",{page:i,limit:10,deviceCode:this.chekcdecivedata.deviceCode},res=>{
                this.data1 = res.data.list
                },err=>{});
      },
      //添加阈值
      addthreshold(){
            this.modal3 = true
            this.modal3title = '新增阈值'
            this.addrolenum = 0
            this.formthreshold.indication=''
            this.formthreshold.threshold=''
            this.formthreshold.judgeSymbol=''
            this.formthreshold.alertType=''
            this.formthreshold.alertDesc=''
            this.formthreshold.recoverDesc=''
       
      },
      //确定添加阈值
      okthreshold(name){
         this.$refs[name].validate((valid) => {
            if (valid) {
                // this.indicationlist.forEach(data => { if(this.formthreshold.indication == data.label){
                //     this.formthreshold.indicationName = data.value
                // }})
                if(this.addrolenum == 0){
                    this.$http.post("res/rerfThreshold/add",this.formthreshold,res=>{
                        this.$Message.info(res.message);
                        this.$http.get("res/rerfThreshold/selectAttrPage",{page:1,limit:10,deviceCode:this.chekcdecivedata.deviceCode},res=>{
                        this.data1 = res.data.list
                        this.pagesthreshold = 1
                        this.thresholdtotal = res.data.total
                        },err=>{});
                    },err=>{
                    })
                }else if(this.addrolenum == 1){
                   this.$http.put("res/rerfThreshold/edit",this.formthreshold,res=>{
                        this.$Message.info(res.message);
                        this.$http.get("res/rerfThreshold/selectAttrPage",{page:1,limit:10,deviceCode:this.chekcdecivedata.deviceCode},res=>{
                        this.data1 = res.data.list
                        this.pagesthreshold = 1
                        this.thresholdtotal = res.data.total
                        },err=>{});
                    },err=>{
                    })
                }
            } else {
                this.$Message.error('请填写完整');
            }
        })
      },
      //编辑阈值
      handlethresholdChange(data){
            this.modal3 = true
            this.addrolenum = 1
            this.modal3title = '编辑阈值'
            this.formthreshold.indication=data.indication
            this.formthreshold.threshold=data.threshold
            this.formthreshold.judgeSymbol=data.judgeSymbol
            this.formthreshold.alertType=data.alertType
            this.formthreshold.alertDesc=data.alertDesc
            this.formthreshold.recoverDesc=data.recoverDesc
            this.formthreshold.indicationName = data.indicationName
            this.formthreshold.id=data.id
      },
      //删除阈值
      detelethreshold(){
        if(this.checkthresholddata.length == 0){
            this.$Message.error('请选择需要删除的阈值状态');
        }else{
            var list = []
             this.checkthresholddata.forEach(data => { list.push(data.id);})
             this.$Modal.confirm({
                  title: '您确定要删除吗',
                  onOk: () => {
                     this.$http.delete("res/rerfThreshold/delete",
                        list,res=>{
                        this.$Message.info(res.message);
                        this.checkthresholddata=[]
                        this.$http.get("res/rerfThreshold/selectAttrPage",{page:1,limit:10,deviceCode:this.chekcdecivedata.deviceCode},res=>{
                        this.data1 = res.data.list
                        this.pagesthreshold = 1
                        this.thresholdtotal = res.data.total
                        },err=>{});
                    },err=>{});
                  }})
        }
      },
      //选择环境指标组
      chekcdecives(list,index){
         this.deviceindexs = index
         this.checkendata = list
         this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:list.code},res=>{
                this.environmentdatalist = res.data
                    },err=>{});
      },
      //新增环境组
      addenvironment(){
         this.deteleshows = false
         this.modal4 = true
         this.formenvironment.deviceCode = this.chekcdecivedata.deviceCode
         this.formenvironment.name = ''
         this.formenvironment.code = ''
      },
      //确定新增环境组
      okenvironment(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.$http.post("res/resEvnGroup/add",this.formenvironment,res=>{
                        this.$Message.info(res.message);
                        this.$http.get("res/resEvnGroup/selectEvnGroup",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
                        this.environmentlist = res.data
                        this.deviceindexs = 0
                        this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.environmentlist[0].code},res=>{
                            this.environmentdatalist = res.data
                            this.checkendata = this.environmentlist[0]
                        },err=>{});
                        },err=>{});
                    },err=>{
                    })
            }else{
               this.$Message.error('请填写完整'); 
            }
        })
      },
      //删除环境组
      deteleenvironment(){
        if(this.deteleshows == true){
           if(this.environmentdata.length == 0){
               this.$Message.error('请选择需要删除的环境组'); 
           }else{
              this.$http.delete("res/resEvnGroup/delete",this.environmentdata,res=>{
                this.$Message.info(res.message);
                this.deteleshows = false
                this.environmentdata=[]
                        this.$http.get("res/resEvnGroup/selectEvnGroup",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
                        this.environmentlist = res.data
                        this.deviceindexs = 0
                          this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.environmentlist[0].code},res=>{
                        this.environmentdatalist = res.data
                         this.checkendata = this.environmentlist[0]
                    },err=>{});
                        },err=>{});
                        },err=>{}); 
           }
        }
        this.deteleshows = true
      },
      backenvironment(){
         this.bianji1 = true
         this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.checkendata.code},res=>{
                this.environmentdatalist = res.data
                    },err=>{});
      },
      backgroup(){
        this.bianji2 = true
         this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.checkendata.code},res=>{
                this.environmentdatalist = res.data
                    },err=>{});
      },
      //删除环境组下面
      handenRemove (index) {
                if(this.environmentdatalist.evnAttrList.length > 0){
                    this.environmentdatalist.evnAttrList.splice(index,1)  
                }
        },
      //添加环境组下面
       handenAdd() {
                this.environmentdatalist.evnAttrList.push({
                    name:'',
                    codes:'',
                });
        },
        savegroup(){
            if(this.environmentdatalist.groupName == ''){
              this.$Message.error('请填写完整');
           }else{
               this.$http.put("res/resEvnGroup/editEvnGroup", this.environmentdatalist,res=>{
                        this.$Message.info(res.message);
                        this.bianji2 = true
                        this.$http.get("res/resEvnGroup/selectEvnGroup",{deviceCode:this.chekcdecivedata.deviceCode},res=>{
                        this.environmentlist = res.data
                        },err=>{});
                        this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.checkendata.code},res=>{
                        this.environmentdatalist = res.data
                            },err=>{});
                    },err=>{
                    })
           }
        },
        allowenvironment(){
            var aa = 1
          this.environmentdatalist.evnAttrList.forEach(data => { if(data.name == ''){
                  aa++
                }else if(data.codes == ''){
                   aa++
                }})
           if(this.environmentdatalist.groupName == ''){
               aa++
           }
           if(aa == 1){
             this.$http.put("res/resEvnGroup/edit", this.environmentdatalist,res=>{
                        this.$Message.info(res.message);
                        this.bianji1 = true
                        this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.checkendata.code},res=>{
                        this.environmentdatalist = res.data
                            },err=>{});
                    },err=>{
                    })
           }else{
               this.$Message.error('请填写完整');
           }
        },
        open(event,isCreate){
            event.currentTarget.style = "display:none"
            event.currentTarget.nextElementSibling.style = "display:block"
            if(isCreate == 1){
                event.currentTarget.parentElement.style.height = 117 +'px';
            }else if(isCreate == 0){
                event.currentTarget.parentElement.style.height = 50 +'px';
            }
        },
        drawback(event){
            event.currentTarget.previousElementSibling.style = "display:block"
            event.currentTarget.style = "display:none"
            event.currentTarget.parentElement.style.height = 23 +'px';
        },
        addgroupbottom(){
            this.modal2 = true
            this.modal1title = '添加环境属性'
            this.formproperty.notes=''
            this.formproperty.name=''
            this.formproperty.type=''
            this.formproperty.isNull=''
            this.formproperty.isKey=''
            this.formproperty.isAutoIncrement=''
            this.formproperty.defaultValue=''
            this.formproperty.isUnique=''
            this.formproperty.isCreate=''
            this.formproperty.isShow=''
        },
        editgroupbottom(list){
            this.modal2 = true
            this.modal1title = '编辑环境属性'
            this.formproperty.notes=list.notes
            this.formproperty.name=list.name
            this.formproperty.type=list.type
            this.formproperty.isNull=list.isNull
            this.formproperty.isKey=list.isKey
            this.formproperty.isAutoIncrement=list.isAutoIncrement
            this.formproperty.defaultValue=list.defaultValue
            this.formproperty.isUnique=list.isUnique
            this.formproperty.isCreate=list.isCreate
            this.formproperty.isShow=list.isShow
            this.formproperty.id = list.id
            if(list.isCreate == '0'){
                this.shows = true
            }else if(list.isCreate == '1'){
                this.shows = false
            }
        },
        groupbottomRemove(ids){
            this.$Modal.confirm({
                  title: '您确定要删除吗',
                  onOk: () => {
                     this.$http.delete("res/resEvnAttrExtend/delete",{id:ids},res=>{
                        this.$Message.info(res.message);
                        this.$http.get("res/resEvnGroup/selectEvnAttr",{groupCode:this.checkendata.code},res=>{
                        this.environmentdatalist = res.data
                            },err=>{})
                    },err=>{});
                  }})
        }
    }
    
  }
</script>
<style scoped>
 .head-left{
    text-align: center;
    line-height: 40px;
    background: #5285FE;
    color: #fff;
    font-size: 14px;
}
.mainbox{
   display:flex;
   margin-bottom: 10px;
   align-items: center;
   border: 1px solid #E0E0E0;
   padding: 10px;
   height: 54px;
}
.mainbox div{
    margin-right: 40px;
    /* border-bottom: 1px solid #D9D9D9; */
    padding-bottom: 5px;
}
.mainbox div span{
    display: inline-block;
    width:150px;
    text-align: right;
}
.check{
    color: #5285FE;
}
.mainboxs{
   display:flex;
   margin-bottom: 20px;
   align-items: center;
}
.mainboxs div{
    margin-right: 40px;
    padding-bottom: 5px;
}
.mainboxs div span{
    display: inline-block;
    width:150px;
    text-align: right;
    background: #EEEEEE;
}
.detail-title{
  display: flex;
  font-size: 15px;
  border-bottom: 1px solid #E5E5E5;
  height: 40px;
  align-items: center;
  margin-bottom: 20px;
}
.detail-title p{
  margin-left: 10px;
}
.bottombox div span{
    display: inline-block;
    width: 80px;
    text-align: right;
}
.bottombox div{
    margin-bottom: 5px;
}
.bottombox{
    margin-bottom: 10px;
    position: relative;
    height: 23px;
    overflow: hidden;
}
.rightimg{
    position: absolute;
    right: 0;
    top:0;
}
</style>
