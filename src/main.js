import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//以上三个文件为根目录为入口文件
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import base from '../public/config/baseUrl'
//公共Axios请求
import http from './assets/js/httpApi'
//引入ElementUI
Vue.use(ElementUI)
//axios全局使用
Vue.prototype.$axios = axios
//放入全局公共AXios与上面差不多
Vue.prototype.http = http
//往状态管理里添加地址路劲和端口
store.state.baseUrl = base.baseUrl
Vue.config.productionTip = false
//路由判断登录
router.beforeEach((to, from, next) => {

    if (to.path == '/login') {
        localStorage.removeItem('userName');
    }
    let user = localStorage.getItem('userName');
    if (!user  && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
