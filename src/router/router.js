// 导入VUe
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 准备规则
import order from '../views/Livetv.vue'
import search from '../views/serachAll.vue'
const routes= [
    {
        path:"/",
        name:"order",
        component:order
     },
    {
        path:"/search",
        name:"search",
        component:search
     }
]
// 实例化路由
const router = new VueRouter({
    routes
  })
  //导出路由
  export default router;