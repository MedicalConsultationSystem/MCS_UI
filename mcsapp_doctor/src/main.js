import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import axios from "axios";
import "@/axios-adapter.js"
import globalConsultId from './common/common'

Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$globalConsultId = globalConsultId;
Vue.prototype.$axios = axios;
App.mpType = 'app'

const app = new Vue({
  ...App,
  axios
})
app.$mount()
