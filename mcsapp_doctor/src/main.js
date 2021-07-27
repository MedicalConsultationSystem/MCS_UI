<<<<<<< HEAD
<<<<<<< HEAD
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";

Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
=======
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
>>>>>>> master
=======
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import axios from "axios";
import "@/axios-adapter.js"


Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
App.mpType = 'app'

const app = new Vue({
  ...App,
  axios
})
app.$mount()
>>>>>>> mcsapp_doctor
