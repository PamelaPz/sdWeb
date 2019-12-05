/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import LoginDoc from '../components/LoginDoc'
import LoginFam from '../components/LoginFam'
import DashboardF from '../components/infoFam'
import DashboardAd from '../components/infoAdm'
import DashboardDo from '../components/infoDoc'

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
      component: LoginDoc
    },
    {
      path: '/family',
      name: 'Familia',
      component: LoginFam
    },
    {
      path: '/dashboard',
      name: 'Familia',
      component: DashboardF
    },
    {
      path: '/dashboard-Admin',
      name: 'Administrador',
      component: DashboardAd
    },
    {
      path: '/dashboard-Doct',
      name: 'Doctor',
      component: DashboardDo
    }
  ]
})
