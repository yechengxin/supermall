import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入toast插件
import Toast from 'components/common/toast'
//导入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
//使用swiper插件
Vue.use(VueAwesomeSwiper)
//使用toast插件
Vue.use(Toast)


Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
