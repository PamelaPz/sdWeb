<template>
<div class="logout">
  <b-row align-h="center">
    <b-col cols="4">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="form">
        <b-form-group id="input-group-2" label="Nombre Completo:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.name" required placeholder="Jessica Pamela Pérez Pérez"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Correo:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.email" type="email" required placeholder="pamela15pz@gmail.com"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Contraseña:" label-for="input-4">
          <b-form-input id="input-4" v-model="form.pass" type="password" required placeholder="Mínimo 6 caracteres"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Tipo de personal:" label-for="input-3">
          <b-form-select id="input-3" v-model="form.selected" :options="options" required></b-form-select>
        </b-form-group>

        <div class="cont-btn">
          <b-button type="submit" variant="primary">Enviar</b-button>
          <b-button type="reset" variant="danger">Borrar</b-button>
        </div>
      </b-form>
      <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card> -->
    </b-col>
  </b-row>
</div>
</template>

<script>
import { app } from '../firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore(app)

export default {
  data () {
    return {
      form: { email: '', pass: '', name: '', selected: null },
      options: [
        { value: 'GPcuJQB3DMzUODMv1r6D', text: 'Doctor' },
        { value: 'aGjQmNHJvvIXmtQBRETA', text: 'Enfermera(o)' },
        { value: 'JJsDydl3krEA6UDZm676', text: 'Seguridad' },
        { value: 'oEz3LEWd3PAQzghOeVcs', text: 'Administrador' }
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      var docData = {
        email: this.form.email,
        password: this.form.pass,
        name: this.form.name,
        id_personaltype: this.form.selected
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.pass)
        .then(response => {
          db.collection('personal').doc(response.user.uid).set(docData, { merge: true })
        })
        .catch(errors => console.log(errors))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.pass = ''
      this.form.selected = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style lang="scss">
.logout {
  margin: 1rem auto;
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
