/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase/app'
import Rx from 'rxjs'
import VueRx from 'vue-rx'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var config = ({
  apiKey: 'AIzaSyC7vXbBoC4KLhavr0z4TP0AexVA4cqRwpI',
  authDomain: 'sdproject-24db5.firebaseapp.com',
  databaseURL: 'https://sdproject-24db5.firebaseio.com',
  projectId: 'sdproject-24db5',
  storageBucket: 'sdproject-24db5.appspot.com',
  messagingSenderId: '808394124067',
  appId: '1:808394124067:web:a07311d1341a45994f7a96',
  measurementId: 'G-FWT0E0BVCH'
})
firebase.initializeApp(config)

Vue.use(BootstrapVue)
Vue.use(VueRx, Rx)
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user){
  
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')

 })
