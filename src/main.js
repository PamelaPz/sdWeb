/* eslint-disable */
useEslint: false
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
require('firebase/auth')

Vue.use(BootstrapVue)
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user){
  
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')

 })
