<template>
  <div class="login">
    <navbar />
    <h1 class="title">Doctor</h1>
    <b-row align-h="center">
      <b-col cols="4">
        <b-form @submit.prevent="login" @reset="onReset">
          <div class="form">

            <b-form-group id="input-group-1" label="Correo:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="jesy.15@gmail.com"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Contraseña:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="form.pass"
                type="password"
                required
                placeholder="•••••••••••"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="cont-btn">
            <b-button type="submit" variant="primary">
              Enviar
            </b-button>
            <b-button type="reset" variant="danger">Borrar</b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import 'firebase/firestore'
import navbar from './navbar'
import router from '../router'
import { app } from '../firebase'
import firebase from 'firebase/app'

const db = firebase.firestore(app)

export default {
  components: { navbar },
  data () { return { form: { email: '', pass: '', type: 'GPcuJQB3DMzUODMv1r6D' }}
  },
  methods: {
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.pass = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    login () {
      var email = this.form.email
      var pass = this.form.pass
      var tipo = this.form.type
      db.collection('personal').where('email', '==', email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            var valid = (doc.id, ' => ', doc.data().id_personaltype)
            if (valid === tipo) {
              console.log('Match exacto')
              firebase.auth()
                .signInWithEmailAndPassword(email, pass)
                .then(response => router.push({ name: 'Doctor', params: { id: response.user.uid, type: valid } }),
                  (error) => alert('Datos incorrectos ', error))
            } else {
              alert('Datos incorrectos o perfil iválido')
            }
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    }
  }
}
</script>

<style lang="scss">
.login {
  padding: 1rem auto;
  .title {
    padding: 1rem 0 2rem;
  }
  .form {
    padding-bottom: 2rem;
  }
  .cont-btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
