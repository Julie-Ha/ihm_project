import Vue from 'vue'
import App from './App.vue'
import { store } from "./store";
import DateFilter from './filter/date'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './custom.scss'
import JwPagination from 'jw-vue-pagination'
import router from './router'




Vue.config.productionTip = false
Vue.filter('date', DateFilter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('jw-pagination', JwPagination);




new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
