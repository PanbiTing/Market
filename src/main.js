import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'


Vue.config.productionTip = false
Vue.component('TabBar',TabBar)
Vue.component('TabBarItem',TabBarItem)

// 创建$bus原型
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
