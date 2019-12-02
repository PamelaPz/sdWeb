/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import LoginFam from '../components/LoginFam'
import Dashboard from '../components/infoFam'

// const Header = { template: '<div>component header</div>' }

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Login
    },
    {
      path: '/doctor',
      name: 'Doctor',
      component: Login
    },
    {
      path: '/family',
      name: 'Familia',
      component: LoginFam
    },
    {
      path: '/dashboard',
      name: 'Familia',
      component: Dashboard
    }
  ]
})
