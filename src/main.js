import Vue from 'vue'
// import Vuex from "vuex"
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import VueChart from 'vue-chartjs'
// import Button from 'ant-design-vue/lib/button';
// import 'ant-design-vue/dist/antd.css';
// import chart from '../src/plugins/chart';
// import chartStream from '../src/plugins/chart-streaming';
// import moment from '../src/plugins/moment'

// Vue.component(Button.name, Button);

Vue.config.productionTip = false
new Vue({
  vuetify,
  VueChart,
  store,
  render: h => h(App)
}).$mount('#app')
