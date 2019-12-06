/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import Vue from 'vue'
import Router from 'vue-router'
import * as firebase from 'firebase/app'
import LoginFam from '../components/LoginFam'
import LoginDoc from '../components/LoginDoc'
import LoginAdm from '../components/LoginAdm'
import DashboardF from '../components/infoFam'
import DashboardAd from '../components/infoAdm'
import DashboardDo from '../components/infoDoc'
import Registro from '../components/Registro'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginAdm
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Registro
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
      component: DashboardF,
      meta: {
        autentificado: true
      }
    },
    {
      path: '/dashboardAdmin',
      name: 'Administrador',
      component: DashboardAd,
      meta: {
        autentificado: true
      }
    },
    {
      path: '/dashboardDoct',
      name: 'Doctor',
      component: DashboardDo,
      meta: {
        autentificado: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser
  let autorizacion = to.matched.some(record => record.meta.autentificado)

  if (autorizacion && !usuario) {
    next('login')
    // next('registro')
  } else if (!autorizacion && usuario) {
    next('dashboardAdmin')
  } else {
    next()
  }
})

export default router
