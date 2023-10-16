import Vue from 'vue'
import App from './App.vue'
// 引入store
import store from './store'
// 引入element-ui
import ElementUI from 'element-ui';
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入vue-router
import VueRouter from 'vue-router';
// 引入路由配置
import router from './router';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
}).$mount('#app')
