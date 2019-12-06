<template>
  <div class="login">
    <navbar  />
    <h1 class="title">Inicio de Sesión</h1>
    <!-- <li v-for="message in messages" :key="message.name"><p class="title">{{message.name}}</p></li> -->
    <b-row align-h="center">
      <b-col cols="4">
        <b-form @submit.prevent="login" @reset="onReset">
          <div class="form">

            <b-form-group id="input-group-1" label="Correo:" label-for="input-1" required>
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
              <!-- <router-link to="/dashboard-Admin"> -->
              Enviar
              <!-- </router-link> -->
            </b-button>
            <b-button type="reset" variant="danger">Borrar</b-button>
          </div>
        </b-form>
        <pre> {{$data}} </pre>
        <!-- <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import navbar from './navbar'
import firebase from 'firebase/app'

import { app } from '../firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore(app)

export default {
  components: {
    navbar
  },
  data () {
    return {
      form: {
        email: '',
        pass: ''
      },
      type: ''
    }
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
      firebase.auth()
        .signInWithEmailAndPassword(this.form.email, this.form.pass)
        .then((user) => this.$router.replace('Adm'),
          (error) => console.log(error))
      // db.collection("cities").where("capital", "==", true)
      //   .get()
      //   .then(function(querySnapshot) {
      //       querySnapshot.forEach(function(doc) {
      //           // doc.data() is never undefined for query doc snapshots
      //           console.log(doc.id, " => ", doc.data());
      //       });
      //   })
      //   .catch(function(error) {
      //       console.log("Error getting documents: ", error);
      //   });
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
