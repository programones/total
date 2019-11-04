import Vue from 'vue'
import App from './App.vue'
//导入elemnet UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon-font.css'
import axios from 'axios'
Vue.prototype.$axios = axios;
//样式初始化
import './assets/base.css'
//注册中间件
Vue.use(ElementUI);
// window.axios = require('axios');

// window.axios.defaults.headers.common = {
//     'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//     'X-Requested-With': 'XMLHttpRequest'
// };
 //导入自定义路由模块
import router from './router/router.js'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
