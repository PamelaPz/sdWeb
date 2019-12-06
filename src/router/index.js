/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import LoginFam from '../components/LoginFam'
import LoginDoc from '../components/LoginDoc'
import LoginAdm from '../components/LoginAdm'
import DashboardFm from '../components/infoFam'
import DashboardAd from '../components/infoAdm'
import DashboardDo from '../components/infoDoc'
import Registro from '../components/Registro'

Vue.use(Router)

const router = new Router({
  routes: [
    // Refireccionamiento
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    // Registro
    {
      path: '/login',
      name: 'Login',
      component: LoginAdm
    },
    // Inicios de Sesión
    {
      path: '/registro',
      name: 'Registro',
      component: Registro
    },
    {
      path: '/doctor',
      name: 'LoginDoctor',
      component: LoginDoc
    },
    {
      path: '/family',
      name: 'LoginFamilia',
      component: LoginFam
    },
    // Página principal
    {
      path: '/Fam',
      name: 'Familia',
      component: DashboardFm,
      meta: {
        autentificado: true
      }
    },
    {
      path: '/Adm',
      name: 'Administrador',
      component: DashboardAd,
      meta: {
        autentificado: true
      }
    },
    {
      path: '/Doc',
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
    next('registro')
  } else if (!autorizacion && usuario) {
    next('Adm')
    next('Fam')
    next('Doc')
  } else {
    next()
  }
})

export default router
