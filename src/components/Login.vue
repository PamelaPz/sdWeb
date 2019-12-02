<template>
  <div class="login">
    <h1 class="title">Inicio de Sesión</h1>
    <b-row align-h="center">
      <b-col cols="6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <div class="form">

            <b-form-group id="input-group-1" label="Matrícula:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.matricula"
                type="text"
                required
                placeholder="JPPP021598"
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
export default {
  data () {
    return {
      form: {
        matricula: '',
        pass: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.matricula = ''
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
