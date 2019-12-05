<template>
  <div class="login">
    <navbar  />
    <h1 class="title">Inicio de Sesión</h1>
    <b-row align-h="center">
      <b-col cols="6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <div class="form">
            <b-form-group id="input-group-1" label="Nombre Completo:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.name"
                required
                placeholder="Juan Rivera de la Cruz"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Correo Electrónico:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.email"
                type="email"
                required
                placeholder="ejemplo@gmail.com"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Contraseña:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="form.pass"
                type="password"
                required
                placeholder="••••••••"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="cont-btn">
            <b-button type="submit" variant="primary">
              <router-link to="/dashboard">
              Enviar
              </router-link>
            </b-button>
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
import navbar from './navbar'

export default {
  components: {
    navbar
  },
  data () {
    return {
      form: {
        email: '',
        name: '',
        pass: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      if (this.form.name && this.form.email) {
        return '<router-link to="/dashboard"><router-link>'
      }
      this.errors = []
      if (!this.name && this.form.email) {
        this.errors.push('El nombre es obligatorio.')
      }
      // alert(JSON.stringify(this.form))
      evt.preventDefault()
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.pass = ''
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
