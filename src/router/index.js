/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
// Logins
import LoginFam from '../components/LoginFam'
import LoginDoc from '../components/LoginDoc'
import LoginAdm from '../components/LoginAdm'
// Página principal
import DashboardFm from '../components/infoFam'
import DashboardAd from '../components/infoAdm'
import DashboardDo from '../components/infoDoc'
// Registro
import Registro from '../components/Registro'

Vue.use(Router)

const router = new Router({
  routes: [
    // Redireccionamiento
    { path: '*', redirect: '/login' },
    { path: '/', redirect: '/login' },
    // Registro
    { path: '/registro', name: 'Registro', component: Registro },
    // Logins
    { path: '/login', name: 'Login', component: LoginAdm },
    { path: '/doctor', name: 'LoginDoctor', component: LoginDoc },
    { path: '/family', name: 'LoginFamilia', component: LoginFam },
    // Páginas principales
    { path: '/Fam', name: 'Familia', component: DashboardFm, meta: { autentificado: true } },
    { path: '/Adm', name: 'Administrador', component: DashboardAd, meta: { autentificado: true } },
    { path: '/Doc', name: 'Doctor', component: DashboardDo, meta: { autentificado: true } }
  ]
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser
  let autorizacion = to.matched.some(record => record.meta.autentificado)

  if (autorizacion && !usuario) {
    next('login')
  } else if (!autorizacion && usuario) {
    next('Adm')
  } else {
    next()
  }
})

export default router
