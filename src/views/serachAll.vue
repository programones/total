<template>
  <div class="container">
     <!-- 页头 -->
     <div class="head">
        <el-row>
       <el-col :span="24"><div class="grid-content bg-purple-dark">
          <div class="btn-back">
              <el-button type="text" icon="el-icon-arrow-left" @click="goBack">返回</el-button>
          </div>
            <span class="title">详细查询</span>   
          </div></el-col>
        </el-row>
      </div>
      <!-- 标签页导航栏 -->
      <div class="tab-nav">
        <el-tabs ref="table"  v-model="activeName"  @tab-click="handleClick" width="100%">
           <el-tab-pane label="按天查询" name="first">
              <p class="choicetitle-day">请选择查询日期：</p>
                <div class="block">
                   <!-- 按天查询 -->
                  <el-date-picker
                    v-model="choiceDay"
                    type="date"
                     format="MM月dd日"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    @change="choiceaDay">
                  </el-date-picker>
                </div>
                 <div class="tab-table">
                     <el-table
                        :data="tableDataDays"
                        style="width: 100%"
                        border>
                            <el-table-column type="expand">
                              <template slot-scope="">
                                <el-form label-position="left" inline class="demo-table-expand">
                                <p>相关详细信息</p>
                                </el-form>
                              </template>
                            </el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                         >
                        </el-table-column>
                        <el-table-column
                          prop="school"
                          label="学校"
                         >
                        </el-table-column>
                        <el-table-column
                          prop="class"
                          label="班级"
                         >
                        </el-table-column>
                        <el-table-column
                          prop="price"
                          label="支付金额">
                        </el-table-column>
                      </el-table>
                   </div>

           </el-tab-pane>
           <!-- 按星期查询 -->
           <el-tab-pane label="按周查询" name="second">
              <p class="choicetitle-day">请选择查询日期：</p>
                <div class="block">
                   <el-date-picker
                     v-model="choiceWeek"
                     type="week"
                     format="yyyy 第 WW 周"                 
                     placeholder="请选择周"
                     @change="choiceaWeek"
                     >
                   </el-date-picker>
                 </div>
                  <!-- 按月查询表格信息展示-->
                   <div class="tab-table">
                     <el-table
                        :data="tableDataMouths"
                        style="width: 100%"
                        border>
                            <el-table-column type="expand">
                              <template slot-scope="">
                                <el-form label-position="left" inline class="demo-table-expand">
                                <p>相关详细信息</p>
                                </el-form>
                              </template>
                            </el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                         >
                        </el-table-column>
                        <el-table-column
                          prop="school"
                          label="学校"
                         >
                        </el-table-column>
                        <el-table-column
                          prop="class"
                          label="班级"
                         >
                        </el-table-column>
                        <el-table-column
                          label="支付金额"
                          prop="price"
                          >
                        </el-table-column>
                      </el-table>
                   </div>
           </el-tab-pane>
         </el-tabs>
      </div>
 
   </div>
</template>

<script>

export default {
   data(){
      return {
          activeName: 'first',
          choiceDay:'',
          choiceWeek:'',
             tableDataDays: [{
            name: '王小明',
            school: '某某中学',
            class:'初三（1）班',
            price: 0.69
          }, {
            name: '王大虎',
            school: '某某中学',
            class:'初三（2）班',
            price: 0.55
          }, {
            name: '小东',
            school: '某某中学',
            class:'初三（3）班',
            price: 0.13
          }, {
            name: '小芳',
            school: '某某中学',
            class:'初三（1）班',
            price: 0.15
          }],
          tableDataMouths:[{
            name: '佚名',
            school: '某某中学',
            class:'初三（1）班',
            price: 0.01
          }, {
            name: '王小虎',
            school: '某某中学',
            class:'初三（2）班',
            price: 0.03
          }, {
            name: '王小虎',
            school: '某某中学',
            class:'初三（3）班',
            price: 0.05
          }, {
            name: '王小虎',
            school: '某某中学',
            class:'初三（1）班',
            price: 0.15
          }],
      }
   },
   methods:{
      //点击反回页面返回上一级页面
     goBack(){
        this.$router.push('/')
     },
       handleClick() {
        console.log('切换了TAB栏');
      },
      //选择天数后确定的时间
       choiceaDay(){
          console.log(this.choiceDay.replace(/-/g,''));
          
       }, 
       //选择周后确定的返回周数数据
       choiceaWeek(){
        let b=this.parseTime(this.choiceWeek)
        console.log(b);
        
       },
       //返回这周的星期一的日期
       parseTime(d) {
    const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()  
                   
    return newDate;
}


   }
}
</script>

<style>
   .container .head{
      position: relative;
   }
    .container .head .btn-back{
      position: absolute;
      left: 10px;
    }
    .container .head .title {
       font-size: 15px;
    }
    .container .tab-nav{
       padding-left: 5px;
    }
    .container .tab-nav .choicetitle-day{
       font-size: 14px;
    }
    .container .tab-nav .block{
       margin-top: 10px;
    }

</style>
