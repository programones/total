<template>
  <div class="container">
    <!-- 栅格布局 -->
    <!-- <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"> -->
          <!-- 面包屑 -->
          <!-- <span id="toreturn">◀返回</span> -->
          <!-- <span class="title">{{getProgramIfo.title}}</span>
        </div>
      </el-col>
    </el-row> -->
    <div class="navbox">
      <el-tabs :tab-position="tabPosition" style="height:600px;" v-model="active1">
        <el-tab-pane label="预约学生" name="1">
          <div class="aboutDescription">
            <h3>特色介绍</h3>
            <div class="content">{{getProgramIfo.description}}</div>
            </div>
             <el-divider></el-divider>
                <el-alert
                v-if="showTips"
              title="您已选择学生信息"
              type="success"
              center
              show-icon>
            </el-alert>
          <!-- 点击显示抽屉栏 -->
          <div class="queryChoose">选择查询方式:</div>
          <div class="queryButton">
            <el-button type="success" @click="queryExaTable = true" size="small">精确查询</el-button>
            <el-button type="success" @click="querytable = true" size="small">选择查询</el-button>
            <!-- <el-button type="danger" @click="toSearch" size="small">详细查询</el-button> -->
          </div>
          <!-- 1.输入姓名查找 -->
          <el-drawer title="精确查询" :visible.sync="queryExaTable" direction="rtl" size="100%" :show-close="showClose">
            <div class="accurateQueryBox">
              <div class="inputQueryBOx">
                <el-input
                  placeholder="请输入名字"
                  v-model.trim="accurateInputValue"
                  clearable
                  maxlength=5
                  style="width:60%"
                  @clear="resetinput"
                ></el-input>
                <el-button icon="el-icon-search" @click="findByNanme">查找</el-button>
              </div>
              <div class="tableContent">
                <!-- 表格显示 -->
                <el-table :data="QueryRuesult" border style="width: 100%" v-loading="loading"  highlight-current-row  @current-change="handleChangeName">
                  <el-table-column prop="name" label="姓名"></el-table-column>

                  <el-table-column prop="sex" label="性别"></el-table-column>
                  <el-table-column prop="school" label="学校"></el-table-column>
                  <el-table-column prop="class" label="班级"></el-table-column>
                </el-table>
              </div>
               <div class="close-btn">
                 <el-button size="small" type="danger" @click="PersonIfoNameToback">返回</el-button>
                  <el-button size="small" type="success" @click="PersonIfoName">完成</el-button>
                </div>
               
            </div>
          </el-drawer>

          <!--2. 按条件查找 -->
          <el-drawer title="选择查询" :visible.sync="querytable" direction="rtl" size="100%" :show-close="showClose">
            <div class="queryByCondition">
              <p class="atips">请从上而下选择查询：</p>
              <div class="chioeseQuery">
                <el-select
                  v-model="choeseprovince"
                  placeholder="请选择省份"
                  @change="gethttpProvince(choeseprovince)"
                  size="small"
                >
                  <el-option
                    v-for="item in provinces"
                    :key="item.ask_data"
                    :label="item.ask_data"
                    :value="item.ask_data"
                  ></el-option>
                </el-select>
              </div>
              <!-- <p class="atips">2.选择市</p> -->
              <div class="chioeseQuery">
                <el-select
                  v-model="choesecities"
                  placeholder="请选择市"
                  @change="gethttpCities(choesecities)"
                  size="small"
                >
                  <el-option
                    v-for="item in cities"
                    :key="item.ask_data"
                    :label="item.ask_data"
                    :value="item.ask_data"
                  ></el-option>
                </el-select>
              </div>
              <!-- <p class="atips">3.选择区</p> -->
              <div class="chioeseQuery">
                <el-select
                  v-model="choeseArea"
                  placeholder="请选择市区"
                  @change="gethttpAreas(choeseArea)"
                  size="small"
                >
                  <el-option
                    v-for="item in areas"
                    :key="item.ask_data"
                    :label="item.ask_data"
                    :value="item.ask_data"
                  ></el-option>
                </el-select>
              </div>
              <!-- <p class="atips">4.选择学校</p> -->
              <div class="chioeseQuery">
                <el-select
                  v-model="choeseSchool"
                  placeholder="请选择学校"
                  @change="gethttpSchool(choeseSchool)"
                  size="small"
                >
                  <el-option
                    v-for="item in schools"
                    :key="item.ask_data"
                    :label="item.ask_data"
                    :value="item.ask_data"
                  ></el-option>
                </el-select>
              </div>
              <!-- <p class="atips">5.选择班级</p> -->
              <div class="chioeseQuery">
                <el-select
                  v-model="choeseClass"
                  placeholder="请选择班级"
                  size="small"
                  @change="gethttpClass(choeseClass)"
                >
                  <el-option
                    v-for="item in classes"
                    :key="item.ask_data"
                    :label="item.ask_data"
                    :value="item.ask_data"
                  ></el-option>
                </el-select>
                <!-- <p class="atips">6.选择姓名</p> -->
                <div class="chioeseQuery">
                  <el-select
                    v-model="choeseName"
                    placeholder="请选择姓名"
                    size="small"
                    @change="lastchangeName(choeseName)"
                  >
                    <el-option
                      v-for="item in names"
                      :key="item.ask_data"
                      :label="item.ask_data"
                      :value="item.ask_data"
                    ></el-option>
                  </el-select>
                </div>
              </div>
             
            </div>
            <!-- 查询结果表格显示 -->
                 <div class="choiceQuery-result">
                  <el-table
                   :data="querytableData"
                   border
                   style="width: 100%"
                    highlight-current-row
                   @current-change="handleCurrentChange">
                   <el-table-column
                     prop="name"
                     label="姓名"
                     width="100">
                   </el-table-column>
                   <el-table-column
                     prop="school"
                     label="学校"
                     width="100">
                   </el-table-column>
                   <el-table-column
                     prop="class"
                     label="班级">
                   </el-table-column>
                   <el-table-column
                     prop="sex"
                     label="性别">
                   </el-table-column>
                 </el-table>
               </div>
                <div class="close-btn">
                <el-button size="small" type="danger" @click="PersonIfoToback">返回</el-button>
                <el-button size="small" type="success" @click="PersonIfo">完成</el-button>
              </div>
          </el-drawer>
          <!-- <div class="nextStep">
            <el-button size="small" @click="next" :disabled="btndisabled_one">下一步</el-button>
          </div> -->
        </el-tab-pane>

        <!-- 预约table栏 -->
        <el-tab-pane label="家长验证" name="2" :disabled="orderForbid" lazy>
          <div class="order-phone">
            <div class="phoneNumber">
              <!-- input手机号码输入框 -->
              <!-- <el-input
                v-model.trim="inputphoneNumber"
                maxlength="11"
                placeholder="请输入手机号"
                style="width:60%"
                suffix-icon="el-icon-phone"
              ></el-input> -->
                 <el-autocomplete
                  clearable
                    class="inline-input"
                    v-model="inputphoneNumber"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入手机号码"
                    @select="handleSelect"
                    suffix-icon="el-icon-phone"
                  ></el-autocomplete> <el-button type="text" @click="changePhoneNumber" v-if="changeBtn">更换号码</el-button>
            </div>
            <div class="check-number" v-if="codeShow">
              <el-input
                v-model="inputcheckNumber"
                maxlength="4"
                placeholder="请输入验证码"
                style="width:50%"
              ></el-input>
              <el-button type="text" @click="changeCheckCode">{{statusCode?('重新获取('+residueTime+'s)'):'点击获取验证码'}}</el-button>
              <!-- <img src="../assets/yzm.jpg" alt width="82px" height="32px" @click="changeCheckImg"/>                                                 -->
            </div>

            <!-- <el-button type="success" round size="small">确认</el-button> -->

            <!-- 点击弹出框 -->
            <!-- <el-button type="text" @click="dialogVisible = true" id="caluse">相关条款</el-button> -->
            <div class="provision">
              <!-- 单选框 -->
              <el-checkbox v-model="checkedAgreement" @click.native="cliscksure">我已阅读并同意《预约直播服务内容》</el-checkbox>
            
            </div>
            <div class="ordersteps">
              <el-divider></el-divider>
              <el-button size="small" @click="top">返 回</el-button>
                <div class="agreeButton">
                <el-button :type="buttonType" size="small" @click="checkPhone">确认</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 三、选择时间 -->
        <el-tab-pane label="时间选择" name="3" lazy :disabled="timechoice">
          <div class="timeChoese">
            <!-- 卡片区域 -->
            <!-- （1）上午卡片区域 -->
            <div class="timeChoese-btn">
              <el-button type="text" @click="upDay" :disabled="upDays">前一天</el-button>
              <el-button >{{orderTimeDay}}</el-button>
               <el-button type="text" @click="nextDay" :disabled="nextDays">后一天</el-button>
              </div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="cardMoring">预约上午</span>
                <div class="check-all">
                  <!-- <el-checkbox v-model="checked" @change="checkAll">全 选</el-checkbox> -->
                </div>
              </div>
              <!-- 上午时间选择卡片区域 -->
              <div class="switchs-left">
                <div v-for="(item,i) in switchioes" :key="item.id" class="text item">
                  <el-button
                   :disabled="item.checked"
                    :type="item.type"
                    round
                    size="mini"
                    @click="timechoese(item,i)"
                    icon="el-icon-time"
                  >{{item.value}}</el-button>
                </div>
              </div>
            </el-card>

            <!-- （2）下午卡片区域 -->
            <div class="timeChoeseAfernoon">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="cardafternoom">预约下午</span>
                </div>
                <!-- 下午时间选择区域 -->
                <div class="card-afternoon">
                  <div v-for="(item,j) in switchioesTwo" :key="item.id" class="text item">
                    <!-- {{item.value}} -->
                    <el-button
                       :disabled="item.checked"
                      :type="item.type"
                      round
                      size="mini"
                      @click="timechoeseAfernoon(item,j)"
                      icon="el-icon-time"
                    >{{item.value}}</el-button>
                  </div>
                </div>
              </el-card>
            </div>
            <!-- （3）晚上卡片区域 -->
            <div class="timeChoeseAfernoon">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="cardafternoom">预约晚上</span>
                </div>
                <!-- 下午时间选择区域 -->
                <div class="card-afternoon">
                  <div v-for="(item,f) in switchioesThree" :key="item.id" class="text item">
                    <!-- {{item.value}} -->
                    <el-button
                     :disabled="item.checked"
                      :type="item.type"
                      round
                      size="mini"
                      @click="timechoeseNeight(item,f)"
                      icon="el-icon-time"
                    >{{item.value}}</el-button>
                  </div>
                </div>
              </el-card>
            </div>
            <div class="totalprice">
              <el-divider content-position="center">
                价格：
                <span class="price">{{totalprice}}</span> 元
              </el-divider>
            </div>
           
            <el-button size="small" @click="top">返回</el-button>
            <el-button type="warning" size="small" @click="orderSubmit">确认预约时间</el-button>
          </div>
        </el-tab-pane>

        <!-- 五、预订单 -->
        <el-tab-pane label="预订单" name="4" lazy :disabled="yudingdan">
          <div class="beforehandOrder">
            预订单
            <div class="tableIfo">
              <!-- 预订单处表格 -->
              <el-table :data="beforehandTable" border size="mini">
                <el-table-column prop="name" label="姓名" width="60px" fixed></el-table-column>
                <el-table-column prop="class" label="班级"></el-table-column>
                <el-table-column prop="school" label="学校"></el-table-column>
                <el-table-column prop="sex" label="性别">                                        
                </el-table-column>
               
              </el-table>
            </div>
            <div class="timechice-show">
               <el-collapse v-model="activeArr">
                <el-collapse-item title="预约时段信息" name="4">
               <!-- <div class="orderTag">
                <el-tag
                  v-for="item in orderTimeArr"
                 :key="item.value"
                 type="warning"
                 size="mini"          
               >{{item.value}}</el-tag>
               </div> -->

                  <el-table :data="orderTimeArr" border size="mini">
                <el-table-column label="预约日期" fixed>
                  {{orderTimeDay}}
                </el-table-column>
                <el-table-column prop="title" label="预约时段"></el-table-column>
         
               
              </el-table>
              </el-collapse-item>
               </el-collapse>
                 <el-divider content-position="center">价格: <span class="price_bef">￥</span><span class="price_to">{{totalprice}}</span> </el-divider>
            </div>
            <div class="payWays">
              请选择支付方式：
              <el-button type="success" plain size="mini" @click="wechatPay">
                <i class="iconfont icon-weixin"></i> 微 信
              </el-button>
              <!-- <el-button type="primary" plain size="mini">
                <i class="iconfont icon-zhifubao"></i>支付宝
              </el-button>
              <el-button plain size="small" icon="el-icon-more">其他</el-button> -->
            </div>
            <el-divider></el-divider>
            <el-button size="small" @click="top">返回</el-button>
     
          </div>
        </el-tab-pane>
        <!-- 六、订单回执 -->
        <el-tab-pane label="订单列表" name="5" lazy :disabled="huizi"
         element-loading-text="回执生成中..."  
        v-loading.fullscreen.lock="fullscreenLoading">
            <div class="order-table">
                <el-table
                   
                  :data="tableDataOrdrList"                  
                  style="width: 100%">
                  <el-table-column
                    property="order_sn"
                    label="订单号"
                   >
                  </el-table-column>
                  <el-table-column
                    property="orderTime"
                    label="下单时间"
                   >
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="50">
                <template slot-scope="scope">
              <el-button @click="orderListId(scope.row)" type="text" size="small">查看</el-button>      
            </template>
                  </el-table-column>
                </el-table>
            </div>
          <!-- <el-button size="small" @click="top">返回</el-button> -->
        </el-tab-pane>
      </el-tabs>
      <!-- 弹出条框内容 -->
      <el-dialog  :visible.sync="dialogVisible" width="95%" fullscreen>
        <agrement @setAgreement="setAgreement"></agrement>

        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <div>
            <el-button type="primary" @click="dialogVisible = false">同 意</el-button>
          </div>
        </span>
      </el-dialog>
    </div>
    <!-- 二维码抽屉 -->
    <el-drawer title="二维码" :visible.sync="QRcode" direction="rtl" size="100%">
      <div class="drawerImg">
        <!-- <div class="qrcode" ref="qrCodeUrl"></div> -->
        <div class="btnClose">
          <el-button @click="showDrawer">关 闭</el-button>
        </div>
      </div>
    </el-drawer>
     <!-- 进入页面的遮罩层 -->
      <div class="cover">  
    <el-dialog
           :visible.sync="firstSeeImg"
            fullscreen
           >
           <p class="countdownTime">还有{{ImgCloseTime}}秒关闭</p>
           <img :src="baseUrl+getProgramIfo.pic" alt="" width="100%" height="100%">
      </el-dialog>
      </div> 
      <!-- 点击进入订单详细页面 -->
       <el-drawer title="订单详细" :visible.sync="orderDetlies" direction="rtl" size="100%" :show-close="showClose">
        <div class="orderSuccess">
            <!-- <p class="orderTitle">预约回执</p> -->
            <el-collapse v-model="activeNames">
              <el-collapse-item title="学生信息" name="1">
                <el-table :data="orderPersoalIfo" border size="mini">
                  <el-table-column prop="name" label="姓名" width="60px" fixed></el-table-column>
                  <el-table-column prop="sex" label="性别"></el-table-column>
                  <el-table-column prop="class" label="班级"></el-table-column>
                  <el-table-column prop="school" label="学校"></el-table-column>             
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="时段信息" name="2">
                <div class="orderTag">
                  <el-tag
                    type="success"
                    size="mini"
                    v-for="item in orderPersoalIfo"
                    :key="item.value"
                  >{{item.value}}</el-tag>
                </div>
              </el-collapse-item>
              <el-collapse-item title="二维码入口及连接" name="3">
                <el-table :data="orderPersoalIfo" border size="mini">
                  <el-table-column >
                    <div class="thatcode" @click.once="showDrawer">
                      <!-- <img :src="returnImg[0].url" alt width="130" height="130" /> -->
                      <div class="qrcode" ref="qrCodeUrl"></div>
                      <p>点击生成二维码</p>
                    </div>
                  </el-table-column>
                  <el-table-column prop="room_url" label="地址连接"></el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
            <el-button type="warning" size="small" @click="OrderToBack">返回</el-button>
          </div>   
          </el-drawer>
 </div>
</template>

<script>
import { log } from "util";
import { http} from "../http/http.js";
import { getsixstring } from "../api/randomstr";
import agrement from "../components/agrement";
import timeformate from "../api/timeFormat";
import QRCode from 'qrcodejs2'
export default {
  name: "appointment",
  components: { agrement },
  data() {
    return {
      // active: 0,
      fullscreenLoading:false,//加载动画
      baseUrl:'https://bi.psvideo.cn/',//进入加载图片基地址
      active1: "1",
      checkedAgreement: false,
      checked: false,
      loading: false,
      showClose:false,
      switchioes: [
        {
          checked: false,
          value: "09:00-09:30",
          type: "success",
          price: 0.01
        },
        {
          checked: true,
          value: "09:30-10:00",
          type: "info",
          price: 0.01
        },
        {
          checked: false,
          value: "10:00-10:30",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "10:30-11:00",
          type: "success",
          price: 0.01
        },
        {
          checked: true,
          value: "11:00-11:30",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "11:30-12:00",
          type: "success",
          price: 0.01
        }
      ],
      switchioesTwo: [
        {
          checked: false,
          value: "14:00-14:30",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "14:30-15:00",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "15:00-15:30",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "15:30-16:00",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "16:00-16:30",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "16:30-14:00",
          type: "success",
          price: 0.01
        }
      ],
      switchioesThree: [
        {
          checked: false,
          value: "18:00-18:30",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "18:30-19:00",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "19:00-19:30",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "19:30-20:00",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "21:00-21:30",
          type: "success",
          price: 0.01
        },
        {
          checked: false,
          value: "21:30-22:00",
          type: "success",
          price: 0.01
        }
      ],
      tabPosition: "top",
      dialogVisible: false,
      inputphoneNumber: "",
      inputcheckNumber: "",
      queryExaTable: false,
      querytable: false,//选择查询的显示隐藏
      accurateInputValue: "",
      activeArr:['4'],
      activeNames: ["1", "2", "3"],//预约回执处展开的行
      QueryRuesult: [],//人名查找处表格数据的储存
      choeseprovince: "",
      choesecities: "",
      choeseArea: "",
      choeseSchool: "",
      choeseClass: "",
      choeseName: "",
      buttonType: "",
      provinces: [],
      cities: [],
      areas: [],
      schools: [],
      classes: [],
      names: [],
      totalprice: 0.0,
      querytableData:[],//选择查询处的表格数组
      saveNameQueryData:null,//存储点击人名选中后的个人信息
      savePersonData:null,//储存条件筛选后的个人信息
      getProgramIfo:{},//获取项目的详细信息
      ifSearch:false,//保存是否已经查询的字段
      shareData:{},//保存微信分享的数据
      signData:{},//创建订单传回的数据
      showTips:false,
      beforehandTable: [
        {
          name: "小明明",
          class: "初三（2）班",
          school: "实验中学",
          price: 0.01,
          time: ""
        }
      ],
      orderPersoalIfo: [
        {
          name: "小明明",
          class: "初三（2）班",
          school: "实验中学",
          orderNum: "2019101915179175376",
          time: "11:00-12:00"
        }
      ],
      returnImg: [
        {
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571219823125&di=c59af7041a911b6bdb8b26dd892c41be&imgtype=0&src=http%3A%2F%2Fimg3.cache.netease.com%2Fgame%2F2013%2F11%2F26%2F20131126143638f53f4.png",
          passworld: "15fsf5163515ad"
        }
      ],
      codeShow:false,//验证码区域的显示隐藏
      changeBtn:true,
       restaurants: //存储输入的电话号码
        [{ "value": "15179175377"},
                    { "value": ""},
                    { "value": ""},               
       ],//电话号码显示的数组
      uid:'',//用户ID
      timekeys:[],//预约时间的日期集合数组
      orderTimeDay:'',//预约时间日期
      timekeysIndex:0,//预约时间的日期集合数组的下标
      upDays:true,//上一天按钮的是否禁用状态
      nextDays:false,//下一天按钮的是否禁用状态
      orderTimeArrs:[],//预约时间的数组集合
      allOrderTimeArr:[],//所以天数预约时间的集合
      goodsidArr:[],//储存预约时间段的ID数组
      localUrl:window.location.href,//获取微信接口用到的本地url
      orderTimeArr: [],//一天的预约时间数组
      wechatData:{},//微信用户信息
      isWeixin:false,//判断是否在微信浏览器
      obtainCode:'',//存储微信返回的code
      QRcode: false, //二维码抽屉
      huizi: true, //回执处的禁止选择
      yudingdan: true, //预订单禁止选择
      timechoice: true, //时间选择禁止选择
      orderForbid:true,//预约处禁止选择
      btndisabled_three: true, //下一步按钮禁用状态
      // btndisabled_four: true, //下一步按钮禁用状态
      statusCode: false,//控制验证码是否显示
      residueTime:30,//多少秒后重新获取
      firstSeeImg:true,//控制进入页面的遮罩层图片是否显示
      ImgCloseTime:5,//进入页面图片关闭倒计时
      orderDetlies:false,//订单详细页的显示隐藏
      tableDataOrdrList:[
        {id:"118",order_sn:154165456451,order_name:'上午9:00-9:30',price:0.01},
        {id:"124",order_sn:154141654165,order_name:'上午10:00-10:20',price:0.01},
      ],//订单列表的展示
      
    };
  },

  methods: {
    // next() {
    //   //点击上下页
    //   // if (this.active++ > 2) this.active = 0;
    //   //先转为数字类型然后再转为字符串类型赋值
    //   let nextNumber = +this.active1;
    //   this.active1 = nextNumber + 1 + "";
    //   document.documentElement.scrollTop = 0;
    // },
    top() {
      let topNumber = +this.active1;
      this.active1 = topNumber - 1 + "";
      document.documentElement.scrollTop = 0;
    },
    //输入手机号码和验证码完成后向后台发送数据请求返回
    checkPhone() {
         if(this.getCookie('cookies')){
         this.timechoice=false;
         this.active1='3';
         }else{
         if(this.inputcheckNumber.length!=4){
          this.$message({
          showClose: true,
          message: "验证码为空或格式错误!",
          duration: 1000
        });
       }else if(this.inputcheckNumber.length==4 && this.checkedAgreement){ 
          this.sendPhoneAndIfo();//登陆验证
       }
     }
    },
      sendPhoneAndIfo(){ 
        //手机验证码获取后登陆参数
     let iuid= this.$route.query.iuid || '';
     let timeshare_id=this.$route.query.timeshare_id || '';
      let params = {
        iuid:iuid,
        timeshare_id:timeshare_id,
        mobile:this.inputphoneNumber,
        mobile_code:this.inputcheckNumber,
        openid:this.wechatData.openid || ''
       }
       http.loginIfo(params).then(res=>{
         console.log(res);
         if(res.data.code==200) {
              this.$message({
          showClose: true,
          message: "预约注册成功!",
          duration: 1000,
          type:"success"
        });
        console.log(res.data.data.token);
        let cookies = res.data.data.token;
         this.uid = res.data.data.uid;
        this.setCookie('cookies',cookies,1);//设置后台获取的cookies 有效时间为1天
        this.setCookie('phone1',this.inputphoneNumber,1);
        window.localStorage.setItem('uid', JSON.stringify(this.uid));
         this.timechoice=false;
         this.active1='3';
         }else {
       this.$message({
          showClose: true,
          message: "验证码错误!",
          duration: 1000,     
        });  
         }
       })
      console.log(iuid,timeshare_id);
      
      },
     //预约处验证码的发送
     getCode(){
            if(!this.statusCode){
            this.sendPhoneCode()//发送验证码
         }
        	var vm = this;
					if(vm.statusCode) return;					
					vm.statusCode = true;				
					var time = setInterval(() => {
					  var residueTime = vm.residueTime;
					  residueTime--;
					  vm.residueTime = residueTime;
					  if (residueTime == 0) {
						clearInterval(time);
						vm.residueTime = 30
						vm.statusCode = false;
					  }
					}, 1000);
     },
     //预约处手机号码的发送方法
     sendPhoneCode(){
       let number = this.inputphoneNumber
      //  http.getCPhoneode(number).then(res=>{
       this.$axios({
         method:'post',
         url:'https://bi.psvideo.cn/api/send_code',
         data:{
           'mobile':number
         }
       }).then(res=>{
          console.log(res);
          if(res.data.code==200){
           this.$message({
          showClose: true,
          type:'success',
          message: "验证码已发送",
          duration: 2500
           });
          }else {
             this.$message({
              message: "两分钟内请勿重复发送!",
              type: "warning",
              duration: 2500,
              showClose: true
             });
          }
        })
     },
    cliscksure() {
       //点击同意相关条款
      this.dialogVisible = true;
    },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
        createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
       handleSelect(item) {
        console.log(item,this.inputphoneNumber);
        if(this.inputphoneNumber=="请先输入手机号码"){
          this.inputphoneNumber="";
          this.codeShow=true;
        }
      },
      changePhoneNumber(){ //点击更换号码显示获取短信的相关按钮
        this.codeShow=true;
        this.inputphoneNumber='';
        this.clearCookie("cookies");
      },
    timechoese(value, i) {
      //按钮改变的规则方法
      this.changrColor(value);
      this.changeRules(i, this.switchioes);
      // this.checkAllChoice(this.switchioes);
    },
    timechoeseAfernoon(value, i) {
      this.changrColor(value);
      this.changeRules(i, this.switchioesTwo);
    },
    timechoeseNeight(value, i) {
      this.changrColor(value);
      this.changeRules(i, this.switchioesThree);
    },
    //时间选中状态的改变的规则
    changeRules(i, timegrop) {
      // let storearr = [];
      let choeseindex = timegrop.findIndex((value, index, arr) => {
        return value.type == "primary";
      });
      if (choeseindex == -1) {
        timegrop[i].type = "success";
      } else {
        //  console.log("选中的第一个下标为----"+choeseindex,'第多次选中的下标为---'+i,'第一个有选中的下标为---'+unchoeseindex,this.switchioes.length);
        for (let k = 0; k < timegrop.length; k++) { 
          //重置按钮
          if (k != choeseindex && timegrop[k].checked==true) {
            timegrop[k].type = "success";
          }
        }
        for (let j = choeseindex; j <= i; j++) {
           //将第一次选择的到第二次选择的之间的遍历
          if(timegrop[j].checked!=true){
              timegrop[j].type = "primary";
          }
          
        }
      }
      this.calcPrice();
    },
    //时间选择确定后计算总价格
    calcPrice() {
      //总价的计算
      let priceArr = [];
      let priceAll = 0;
      let goodsidArr=[];
      this.switchioes.forEach(item => {
        if (item.type == "primary" && item.checked==false) {
          priceArr.push(item);
          goodsidArr.push(item.id);
        }
      });
      this.switchioesTwo.forEach(item => {
        if (item.type == "primary" && item.checked==false) {
          priceArr.push(item);
           goodsidArr.push(item.id);
        }
      });
      this.switchioesThree.forEach(item => {
        if (item.type == "primary" && item.checked==false) {
          priceArr.push(item);
           goodsidArr.push(item.id);
        }
      });
      priceArr.forEach(item => {
        priceAll += item.price * 100;
      });
      this.goodsidArr = goodsidArr;
      // console.log(goodsidArr);
      
      
      //将选中的信息赋值给data中的数组
      this.orderTimeArr = priceArr;
      console.log(priceArr);
      
      // this.beforehandTable[0].time = "未选中";
      //选中时间后的价格的计算
      this.totalprice = (priceAll / 100).toFixed(2);
      this.beforehandTable[0].price = this.totalprice;
   
    },
    //关联全选按钮
    checkAllChoice(timegrop) {
      if (timegrop[0].type == "success" || timegrop[5].type == "success") {
        this.checked = false;
      } else {
        this.checked = true;
      }
    },
    //改变的选中颜色
    changrColor(value) {
      
      if (value.type == "success") {
        value.type = "primary";
        
      } else if(value.type == "primary"){
        value.type = "success";
      }
    },
    //人名查询选择查找
    findByNanme() {
      if (this.accurateInputValue == "") {
        this.$message({
          message: "输入名字不能为空哦~",
          type: "warning",
          duration: 1000,
          showClose: true
        });
      } else {
        this.loading = true;
        this.QueryRuesult = [];
        let param = {
          timeshare_id:1,
          ask: 1,
          ask_word: "name",
          ask_content: this.accurateInputValue
        };
        http.findName(param).then(res => {
          //人名查找请求
          console.log(res);
          console.log(res.data.data[0].infos[0]);

          let findres = res.data.data[0].infos;
          if (findres == null) {
            this.$message({
              message: "暂无数据！",
              duration: 1000
            });
            this.loading = false;
          } else {
            this.QueryRuesult = findres;
            this.loading = false;
            // console.log(res);
            this.$message({
              message: "查询成功！",
              type: "success",
              duration: 1000
            });
          }
        });
      }
    },
    resetinput() {
      // console.log('你输入了名字！');
      this.QueryRuesult = [];
    },
    // 条件选择查找省后返回市区
    gethttpProvince(thisvalue) {
      //选择中的市返回查询
      var choisecity = {
        timeshare_id:1,
        ask: 2,
        ask_word: "province",
        ask_content: thisvalue
      };
      //初始化其子选项
      this.choesecities = "";
      this.choeseArea = "";
      this.choeseSchool = "";
      this.choeseClass = "";
      this.choeseName = "";
      this.querytableData=[];
      http.findcitys(choisecity).then(res => {
          console.log(res);
          
        this.cities =  res.data.data[0].infos;
      });
    },
    //条件选择查找市后返回区域
    gethttpCities(value) {
      // console.log(value);
      //按条件查找区域的返回
      var choioseareas = {
        timeshare_id:1,
        ask: 2,
        ask_word: "city",
        ask_content: value,
        province: this.choeseprovince
      };
      //初始化其子选项
      this.choeseArea = "";
      this.choeseSchool = "";
      this.choeseClass = "";
      this.choeseName = "";
      this.querytableData=[];
      http.findareas(choioseareas).then(res => {
        console.log(res);
        this.areas = res.data.data[0].infos;
      });
    },
    //按条件查找区域后返回学校
    gethttpAreas(value) {
      // console.log(value);
      //按条件查找学校返回值
      var schoolFind = {
        timeshare_id:1,
        ask: 2,
        ask_word: "district",
        ask_content: value,
        city: this.choesecities,
        province: this.choeseprovince
      };
      //初始化其子选项
      this.choeseSchool = "";
      this.choeseClass = "";
      this.choeseName = "";
      this.querytableData=[];
      http.findSchool(schoolFind).then(res => {
        //  console.log(res);
        this.schools = res.data.data[0].infos;
      });
    },
    //按条件查询学校后返回班级
    gethttpSchool(value) {
      // console.log(value);
      //按条件查找班级返回值
      var classFind = {
        timeshare_id:1,
        ask: 2,
        ask_word: "school",
        ask_content: value,
        city: this.choesecities,
        province: this.choeseprovince,
        district: this.choeseArea
      };
      //初始化其子选项
      this.choeseClass = "";
      this.choeseName = "";
      this.querytableData=[];
      http.findClass(classFind).then(res => {
        this.classes = res.data.data[0].infos;
      });
    },
    //按条件查询班级后返回的姓名
    gethttpClass(value) {
      var classFind = {
        timeshare_id:1,
        ask: 2,
        ask_word: "class",
        ask_content: value,
        city: this.choesecities,
        province: this.choeseprovince,
        district: this.choeseArea,
        school: this.choeseSchool,    
      };
      //初始化其子选项
      this.choeseName = "";
       this.querytableData=[];
      http.findPerson(classFind).then(res => {
        this.names =res.data.data[0].infos;
        console.log(res);
      });
    },
    //条件查询后最终人名确定后触发的事件
    lastchangeName(value) {
      console.log("你的名字是=>", value);
       var param = {
          timeshare_id:1,
          ask: 2,
          ask_word: "name",
          ask_content: value,
          city: this.choesecities,
          province: this.choeseprovince,
          district: this.choeseArea,
          school: this.choeseSchool,
          ts_class:this.choeseClass
        };
      http.pesonalInfo(param).then(res=>{
        console.log(res);
        this.querytableData = res.data.data[0].infos;
      })  
      
    },
    //点击放大二维码
    showDrawer() {
      // this.QRcode = !this.QRcode;

      //  this.creatQrCode(this.orderPersoalIfo[0].room_url)
      console.log(this.orderPersoalIfo[0]);
    },
    //点击发送或更换验证码
    changeCheckCode() {
               let regExp = /^(\+?0?86\-?)?1[345789]\d{9}$/;  
             if (this.inputphoneNumber == "") {
          this.$message({
               showClose: true,
               message: "手机号码不能为空!",
               duration: 1000
             });
         } else if(!regExp.test(this.inputphoneNumber)){
                  
        this.$message({
          showClose: true,
          message: "请输入正确的手机号码！",
          type: "error",
          duration: 1000
        });         
           }else{
              this.getCode() //倒计时方法           
           }
     
    },
    //点击全选按钮
    checkAll() {
      if (this.checked) {
        this.switchioes.forEach(item => {
          item.type = "primary";
        });
      } else {
        this.switchioes.forEach(item => {
          item.type = "success";
        });
      }
      this.calcPrice();
    },
    //条件选择后点击完成 信息是否选择完整
    PersonIfo() {
      // console.log(this.savePersonData);
      // console.log(this.savePersonData!=null);
      
      if(this.savePersonData==null){
         this.$message({
              message: "请点击表格中名字确认选择",
              type: "warning",
              duration: 1000
            });
           
      }else{
           this.orderForbid=false; 
           this.querytable=false;
           this.active1="2"
      }
      
    },
    PersonIfoToback(){
      this.querytable=false;
     
    },
    handleChangeName(val){
      //人名查找后点击选中表格中的数据
      console.log(val);
      this.saveNameQueryData=val;
      if(val!=null){
       this.$message({
         message: "选择成功!",
         type: "success",
         duration: 2000
       });
      this.beforehandTable[0]=val;
     window.localStorage.setItem('personIfo',JSON.stringify(val));
     this.showTips=true;
      }
   
    },
    handleCurrentChange(val){ 
      //条件筛选后点击选中表格中的数据
      console.log(val);
      this.savePersonData=val;
      this.beforehandTable[0]=val;
       window.localStorage.setItem('personIfo',JSON.stringify(val));
        this.showTips=true;
    },
    PersonIfoName(){ 
      //人名查找信息后点击完成按钮
    //  let keyItemsArr = Object.keys(this.saveNameQueryData)
      // console.log(keyItemsArr);
      if(this.saveNameQueryData!=null){
      this.orderForbid=false; 
      this.queryExaTable=false;
      this.active1="2";
      }else {
      this.$message({
       message: "请点击表格确认学生信息",
      type: "warning",
      duration: 1000
      })
      }  
    },
    PersonIfoNameToback(){
      this.queryExaTable=false;
    },
    setAgreement(eve) {
      //协议栏同意是否
      // console.log(eve);
      this.dialogVisible = false;
      if (eve) {
        this.checkedAgreement = true;
        this.buttonType = "success";
      } else {
        this.checkedAgreement = false;
        this.buttonType = "";
      }
    }, 
    orderSubmit(){ 
      //点击时间确认选择按钮向后台发送用户订单数据
      if(this.goodsidArr.length!=0) {
        //点亮下一步按钮和预订单
        this.yudingdan=false;
        this.btndisabled_three=false;
        this.active1='4';
      }else{
            this.$message({
             message: "请选择先预约时间哦~",
             type: "warning",
             duration: 1000
            })
      }              
    },
   upDay(){
      //预约时间选择处的上一天 
       this.nextDays=false;   
      if(this.timekeysIndex==0){
        this.upDays=true;
        console.log('前进失败');
        
      }else if(0<this.timekeysIndex){
         this.orderTimeDay=this.timekeys[this.timekeysIndex-1];
         this.timekeysIndex= this.timekeysIndex-1
      }
      console.log(this.timekeysIndex);
         let newTimearr=[];
         let objvalues=this.orderTimeArrs[this.timekeysIndex]
         for(let i in objvalues){
          newTimearr= objvalues[i];  
         }
         this.formateOrderTime(newTimearr) //处理时间的方法
    },
    nextDay(){
      //预约时间选择处的下一天
      
      if(this.timekeysIndex==this.timekeys.length-1){
      this.$message({
      message: "到最后一天的预约时间了哦~",
      type: "warning",
       duration: 1000
       })
       this.nextDays=true;
      }else if(this.timekeysIndex<this.timekeys.length-1){
        this.orderTimeDay=this.timekeys[this.timekeysIndex+1];
      this.timekeysIndex= this.timekeysIndex+1
      }
      this.upDays=false;
      console.log(this.timekeysIndex); 
         let newTimearr=[];
         let objvalues=this.orderTimeArrs[this.timekeysIndex]
         for(let i in objvalues){
          newTimearr= objvalues[i];  
         }
        this.formateOrderTime(newTimearr) //处理时间的方法
    //  this.allOrderTimeArr=this.allOrderTimeArr.concat(this.orderTimeArr);
    //  console.log(this.allOrderTimeArr);
     
    },
    formateOrderTime(tiemArrs){
            
      //处理按钮是否可以选择
      tiemArrs.forEach(item=>{
        item.storage-item.sold >0?item.checked=false : item.checked=true;
        // item.storage-item.sold >0?item.type="success" : item.type="info";
      })
       tiemArrs.forEach(item=>{
         item.checked?item.type="info":item.type="success"
       })
      //处理显示时间的格式问题 
      tiemArrs.forEach(item=>{
        let continuedTime= timeformate((parseInt(item.timepoint)+parseInt(item.timehold))*1000,'h:m')
        let finalTime= timeformate(item.timepoint*1000,'h:m-')+continuedTime;
        item.value=finalTime
      })
      //判断上午下午或是晚上
       this.switchioes=[];
         this.switchioesTwo=[]; this.switchioesThree=[];
       tiemArrs.forEach(item=>{
        let tiemH= timeformate(item.timepoint*1000,'h')
         if(0<tiemH && tiemH<13) {
           this.switchioes.push(item)
         }else if(13<tiemH && tiemH<18) {
           this.switchioesTwo.push(item)
         }else if(18<=tiemH && tiemH<=24){
          this.switchioesThree.push(item) 
         }
         
       })
      //  console.log(tiemArrs);
    },
    callpay(){
    if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
          }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', this.jsApiCall); 
              document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
          }
      }else{
          this.jsApiCall();
      }
    },
    jsApiCall(){ 
      //支付请求
       WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            {
                'appId': this.signData.appId,
                "timeStamp": this.signData.timeStamp,
                "nonceStr": this.signData.nonceStr,
                "package": this.signData.package,
                "signType": this.signData.signType,
                "paySign": this.signData.paySign,
            },
        function(res){
        //  alert("取消才到这支付j断点"+res);
         WeixinJSBridge.log(res);
         if (res.err_msg == "get_brand_wcpay_request：ok") {
           //支付成功的回调
           alert("支付成功~~");
             this.huizi=false;  
              this.fullscreenLoading=true;
              this.active1="5";
              var vvm =this
              setTimeout(() => {
                vvm.fullscreenLoading=false
              }, 5000);
         }else if (res.err_msg == "get_brand_wcpay_request:cancel") {  
     // message: "已取消微信支付!"
    }
          console.log(res.code+ '\n' +res.desc+ '\n' +res.msg);
   }
     );
    },
    wechatPay(){
      //微信支付
      let postparm = {
        goods_id:(this.goodsidArr).toString(),
        anchor_id: this.beforehandTable[0].anchor_id,
        mobile:this.inputphoneNumber,
        openid:this.wechatData.openid,
        amount:this.totalprice,
        pay_way:"WXBROWSER",
        money:this.totalprice  
      }
       if(this.isWeixin){ 
         //判断是否在微信浏览器
       http.getGoodsOrder(postparm).then(res=>{
          //在微信浏览器
        console.log(res);
        if(res.data.code==200) { 
          //订单创建成功
           this.signData = JSON.parse(res.data.data); 
           console.log(this.signData);
           this.getOrderListFn(this.inputphoneNumber);
             //发起支付
            this.callpay();
        }else { 
          //订单创建失败
          this.$message({
              message: "订单创建失败",
               type: "warning",
               duration: 2000,
          })
        }
      })
     }else { 
       //不在微信浏览器
          let postparm1 ={
            goods_id:(this.goodsidArr).toString(),
            anchor_id:this.beforehandTable[0].anchor_id,
            mobile:this.inputphoneNumber,
            openid:'',
            amount:this.totalprice,
            pay_way:'H5WX',
            money:this.totalprice*1,
          }
          http.getGoodsOrder(postparm1).then(res=>{
             console.log(res);
            if(res.data.code==200){
              window.location.href = "https://bi.psvideo.cn/timeshare/manage"
            }else {
              this.$message({
               message: "订单创建失败",
               type: "warning",
               duration: 2000,
              })
            }
          })
     }
      console.log(postparm);

      // this.btndisabled_four=false;
    },
    //支付完成后获取订单列表的
     getOrderListFn(mobile) {
       http.getOrderList(mobile).then(res=>{
         console.log(res,"这是订单列表");
         let orderList = res.data.data;
          let newArr = []
         orderList.forEach(item=>{
           if(item!=""){
             item.orderTime=timeformate(item.timepoint*1000,'Y-M-D-h-m');
             newArr.push(item)
           }
         })
         this.tableDataOrdrList=newArr
         console.log(newArr);
         
       })
    },
    getOrderDetileFn(orderId){
      http.getOrderDtile(orderId).then(res=>{
        console.log(res,"这是订单详细");
        let orderDetile = res.data.data;
         orderDetile.forEach(item=>{ 
           //格式化时间段
        let continuedTime= timeformate((parseInt(item.timepoint)+parseInt(item.timehold))*1000,'h:m')
        let finalTime= timeformate(item.timepoint*1000,'M月D日 h:m-')+continuedTime;
        item.value=finalTime
      })
         orderDetile.forEach(item=>{ 
           //处理性别问题
              item.sex==1?item.sexes="男":item.sexes="女";
      })
        this.orderPersoalIfo=orderDetile;   
        this.creatQrCode(orderDetile[0].room_url);
       
      })
    },
    creatQrCode(QRurl) {
  var qrcode = new QRCode(this.$refs.qrCodeUrl, {
      text: QRurl,
      width: 160,
      height: 160,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
 })
},
    ImgClosed(){ //图片关闭倒计时的方法
      	var vm = this;	
					var timeId = setInterval(() => {
					  var ImgCloseTime = vm.ImgCloseTime;
					  ImgCloseTime--;
					  vm.ImgCloseTime = ImgCloseTime;
				
					  if (ImgCloseTime == 0) {
						clearInterval(timeId);
            vm.ImgCloseTime = 5;
            vm.firstSeeImg=false
					  }
					}, 1000);
    },
    // 设置cookie方法
  setCookie(name, value, seconds) {
     seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。
      var expires = "";
      if (seconds != 0 ) {      //设置cookie生存时间
     var date = new Date();
     date.setTime(date.getTime()+(seconds*1000*60*60*24));//天为单位
     expires = "; expires="+date.toGMTString();
     }
     document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
    },
    // 清除cookie
    clearCookie(name) {
    this.setCookie(name, "", -1);
    },
    // 取得cookie
    getCookie(name) {
  var nameEQ = name + '='
  var ca = document.cookie.split(';') // 把cookie分割成组
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i] // 取得字符串
    while (c.charAt(0) == ' ') { // 判断一下字符串有没有前导空格
      c = c.substring(1, c.length) // 有的话，从第二位开始取
    }
    if (c.indexOf(nameEQ) == 0) { // 如果含有我们要的name
      return unescape(c.substring(nameEQ.length, c.length)) // 解码并截取我们要值
    }
  }
  return false
    },
    //获取微信授权的方法
    getwxReq(){
      //this.isWeixin && !this.getCookie("token") && !this.obtainCode
      if( this.isWeixin && !this.obtainCode ){
         //首次登陆没有token的情况下
            http.getwxIfo(this.localUrl).then(res=>{
        console.log(res);
        window.location.href= res.data.data
      })
      }
    },
      // 获取微信授权的code
   getQueryString(name) {  
       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
       var r = window.location.search.substr(1).match(reg);  
       if (r != null) return unescape(r[2]);  
       return null;  
   },
    //微信分享
    wxshareFn(){
      if(this.isWeixin){
          http.weixinshare().then(res=>{
           console.log(res);
            if(res.data.code==200) {
                        this.shareData = res.data.data;
                        let config = this.shareData.config;
                        // console.log(this.shareData);                      
                        wx.config({
                            // debug: true,
                            appId: config.appId,
                            nonceStr: config.nonceStr,
                            timestamp: config.timestamp,
                            signature: config.signature,
                            jsApiList: [
                                "onMenuShareTimeline",
                                "onMenuShareAppMessage",
                                "onMenuShareQQ",
                                "onMenuShareWeibo",
                                "onMenuShareQZone"
                            ]
                        });
                        let url = window.location.href;
                        // if(url.indexOf("?iuid=''") != -1){
                        //    url=url.replace(/iuid=''/)
                        // }
                        wx.ready(() => {
                          // alert(this.shareData.title)             
                            wx.onMenuShareTimeline({
                                title:  this.getProgramIfo.title, // 分享标题
                                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl:'https://bi.psvideo.cn'+'https://bi.psvideo.cn'+this.getProgramIfo.logo, // 分享图标
                                success: function () {
                                    // 用户点击了分享后执行的回调函数
                                }
                            });

                            wx.onMenuShareAppMessage({
                                title:  this.getProgramIfo.title, // 分享标题
                                desc:  this.getProgramIfo.description, // 分享描述
                                link:  url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl:   'https://bi.psvideo.cn'+this.getProgramIfo.logo, // 分享图标
                                type: 'link', // 分享类型,music、video或link，不填默认为link
                                success: function () {
                                    // 用户点击了分享后执行的回调函数
                                }
                            });

                            wx.onMenuShareQQ({
                                title:  this.getProgramIfo.title, // 分享标题
                                desc:   this.getProgramIfo.description, // 分享描述
                                link: url, // 分享链接
                                imgUrl:  'https://bi.psvideo.cn'+this.getProgramIfo.logo, // 分享图标
                                success: function () {
                                // 用户确认分享后执行的回调
                                },
                                cancel: function () {
                                // 用户取消分享后执行的回调函数
                                }
                            });

                            wx.onMenuShareWeibo({
                                title:  this.getProgramIfo.title, // 分享标题
                                desc:   this.getProgramIfo.description, // 分享描述
                                link: url, // 分享链接
                                imgUrl:  'https://bi.psvideo.cn'+this.getProgramIfo.logo, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        });
                    }
           
      })
      }             
    },
  
 
    OrderToBack(){ //订单详细页的显示
      this.orderDetlies=false; 
    },
    orderListId(value){
        //选择订单列表的展示
       this.orderDetlies=true;
      this.getOrderDetileFn(value.id);
    }

  },
  created() {
    //选择中的省份返回查询
    var choiseFind = {
      timeshare_id:1,
      ask: 2,
      ask_word: "all",
      ask_content:1
    };
    http.findprocince(choiseFind).then(res => {
      //  console.log(res);
      this.provinces = res.data.data[0].infos;
    });
     http.getProIfo({id:1}).then(res =>{//获取标题封面图片路径等信息
      
       this.getProgramIfo=res.data.data[0].infos[0];
          document.title = this.getProgramIfo.title;
        console.log( this.getProgramIfo);
     });
     //获取显示预约时间列表
      http.getTimeArr(1).then(res=>{
        console.log(res, timeformate(1573522200000,'h:m'));
       this.orderTimeArrs=res.data.data;
       let thatTimearr=res.data.data;
       thatTimearr.forEach((item,i)=>{
        this.timekeys=  this.timekeys.concat(Object.keys(item)) 
       })
        this.orderTimeDay=this.timekeys[0];//对预约时间处的初始时间进行赋值
        // console.log(this.timekeys);
         let objvalues=thatTimearr[0]
         for(let i in objvalues){
          thatTimearr= objvalues[i];
           
         }
          this.formateOrderTime(thatTimearr)
       
      })
    this.restaurants[0].value=this.getCookie('phone1') ||'';
    if(this.getCookie('cookies')){
      //判断是否已经获取到cookies
      this.codeShow=false;
       this.checkedAgreement = true;
       this.inputphoneNumber=this.getCookie('phone1');
       this.restaurants[2].value="";
       this.changeBtn=true;
    }else{
     this.codeShow=true;
     this.restaurants[2].value="请先输入手机号码";
     this.changeBtn=false;
    }
    // 生成6为随机码
    // window.console.log(getsixstring());
    
        //  this.getOrderDetileFn(118);
  },
  mounted(){
        // 判断是否是微信浏览器
     let ua = navigator.userAgent.toLowerCase();
     this.isWeixin = ua.indexOf('micromessenger') != -1;

     this.ImgClosed();//进入页面前图片关闭的方法

     this.obtainCode = this.getQueryString('code');
     console.log(this.obtainCode);
     this.setCookie('code', this.obtainCode, 7);//7天有效
     
    this.getwxReq();//获取微信接口的方法

      if(this.isWeixin && this.obtainCode){//获取微信用户信息的回调
        http.getwxUserIfo(this.obtainCode).then(res=>{
          console.log(res);
          console.log('上面是打印OpenID');
          
          this.wechatData = res.data.data;
          this.setCookie('openid', this.wechatData.openid, 7); //openId 七天有效时间
        })
      }
    
     this.wxshareFn()//微信分享
     this.uid=JSON.parse(window.localStorage.getItem("uid")) ||'' ; //获取分享的uid
  },
  watch: {
    // queryExaTable: {
    //   //关闭详细查询时初始化相关数值
    //   handler(newName, oldName) {
    //     // console.log(newName);
    //     if (!newName) {
    //       this.accurateInputValue = "";
    //       this.QueryRuesult = [];
    //       this.loading = false;
    //     }
    //   },

    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style >
.title {
  font-size: 15px;
}

.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row > td {
  background-color: rgb(173, 219, 198);
  color: #e91390;
  font-weight: 900;
}
.container{
  position: relative;
}
.container .cover {
  width: 100%;
  height: 100%;
}
 .container .cover .el-dialog__header {
   padding: 0;
 }
   .container .cover .el-dialog__body {
    padding: 0; 
     }
.navbox {
  padding: 0 0 5px 5px;
}
.cover {
  position: relative;
}
.cover .countdownTime{
    position: absolute;
    top: 22px;
    right: 34px;
}
.navbox .aboutDescription {
      background-size: cover;
    background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572517853412&di=c4137845626e08aa5ff8271f51c910ad&imgtype=0&src=http%3A%2F%2Fimg1.template.cache.wps.cn%2Fwps%2Fcdnwps%2Fupload%2Fofficial%2Ftemplate%2F2012-12-13%2F50c99e56adee2.png);
    padding: 10px;
}
.navbox .aboutDescription h3 {
  color:pink;
}
.navbox .aboutDescription .content {
    color: #fff;
    font-size: 16px;
    line-height: 25px;
    text-indent: 30px;
    margin-top: 10px;
    padding: 10px;
}
.queryChoose {
  line-height: 50px;
}
.queryButton {
  padding-left: 90px;
}
.nextStep {
  margin-left: 140px;
  margin-top: 30px;
}
.accurateQueryBox {
  padding: 10px;
}
/* .accurateQueryBox .inputQueryBOx {
} */
.accurateQueryBox .tableContent {
  margin-top: 10px;
}
.accurateQueryBox .close-btn {
  margin-top: 20px;
}
.queryByCondition {
  padding-left: 20px;
  /* height: 600px; */
}
 .choiceQuery-result {
  margin-top: 20px;
}
 .close-btn {
  margin-top: 30px;
  margin-left: 30%;
}
.queryByCondition .chioeseQuery {
  margin-top: 10px;
}
.queryByCondition .atips {
  line-height: 30px;
}
.el-drawer.ltr, .el-drawer.rtl, .el-drawer__container {
  height: 150%;
}
.order-phone {
  padding-left: 20px;
}
.order-phone .check-number {
  margin-top: 20px;
}
.order-phone .provision{
  margin-top: 20px;
}
/* .order-phone .check-number .check-img-box{
 display: inline-block;
} */
/* .order-phone .check-number img {
  margin-left: 10px;
  margin-bottom: 20px;
} */
.order-phone .agreeButton {
  margin-left: 20px;
  display: inline-block;
}
.order-phone .ordersteps {
  margin-top: 20px;
}
/* 卡片区域 */
.timeChoese {
  padding: 10px;
}
.timeChoese .clearfix {
  position: relative;
}
.timeChoese .timeChoese-btn{
  margin-left: 15%;
  margin-bottom: 20px;
}

.box-card .timeChoeseMoring {
  float: left;
  margin-left: 150px;
}
.timeChoese .check-all {
  position: absolute;
  right: 0;
  top: 0;
}
.switchs-left {
  width: 95%;
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.switchs-left div {
  margin-bottom: 10px;
}
/* 下午时间选择卡片区域 */
.timeChoeseAfernoon {
  margin-top: 10px;
  margin-bottom: 10px;
}
.timeChoeseAfernoon .card-afternoon {
  width: 95%;
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.timeChoeseAfernoon .card-afternoon div {
  margin-bottom: 10px;
}
#toreturn {
  margin-left: 5px;
}

/* 精确查找处表格字体大小 */
.el-table div {
  font-size: 12px;
}
/* 价格颜色 */
.timeChoese .price {
  color: #f92658;
  font-weight: 600;
}

/* 预支付订单表格 */
.beforehandOrder .tableIfo {
  margin-top: 10px;
  margin-bottom: 10px;
}
.beforehandOrder .payWays {
  margin: 0 0 10px 10px;
}
.beforehandOrder .timechice-show {
  margin-bottom: 20px;
}
/* .beforehandOrder .timechice-show .orderTag {
    display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.beforehandOrder .timechice-show .orderTag span {
    margin-bottom: 10px;
} */
.beforehandOrder .timechice-show .price_bef{
  color: red;
  font-size: 10px;
}
.beforehandOrder .timechice-show .price_to {
    color: red;
    font-weight: 900;
}
/* 订单回执处时间排列 */
.orderSuccess {
  margin-bottom: 10px;
}
.orderSuccess .orderTag {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.orderSuccess .orderTitle {
  line-height: 20px;
}
.orderSuccess .orderTag span {
  margin-bottom: 10px;
}
.orderSuccess .thatcode  {
  width: 160px;
  height: 160px;
  overflow: hidden;
  display: block;
  margin: 0 auto;
}
.orderSuccess .thatcode p {
  text-align: center;
}
/* 抽屉二维码定位 */
.drawerImg img {
  margin: 0 auto;
  display: block;
}
.drawerImg .btnClose {
  margin-top: 10%;
  margin-left: 40%;
}
.el-row {
  margin-bottom: 20px;
  line-height: 33px;
  text-align: center;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #fbfbfb;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/* 禁用按钮的样式 */
.el-button--success.is-disabled {
    color: #FFF;
    background-color: #CCC;
    border-color: #CCC;
}
.el-tabs__nav-scroll .el-tabs__header .el-tabs__nav .el-tabs__item,div{
  padding-right: 5px;
}
</style>
