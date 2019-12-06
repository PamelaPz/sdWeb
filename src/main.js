/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import firebase from 'firebase/app'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user){
  
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')

 })
