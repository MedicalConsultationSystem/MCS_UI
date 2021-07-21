import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import axios from "axios";
import "./axios-adapter.js"
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$axios=axios;

const app = new Vue({
    ...App,
	axios
})
app.$mount()
