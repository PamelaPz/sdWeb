<template>
  <div>
    <div id="nav">
      <div class="nav">
        <b-col cols="6" class="content-nav">
          <router-link to="/">{{msg1}}</router-link> |
          <router-link to="/doctor">{{msg2}}</router-link> |
          <router-link to="/family">{{msg3}}</router-link>
        </b-col>
      <a href="#" @click="logout">Salir</a>
      </div>
      <hr>
    </div>
    <h1>Información del Familiar</h1>
    <MyVuetable></MyVuetable>
  </div>
</template>

<script>
import MyVuetable from './table'
import firebase from 'firebase'
export default {
  name: 'app',
  components: {
    MyVuetable
  },
  data () {
    return {
      msg1: 'Datos personales',
      msg2: 'Estatus',
      msg3: 'Fechas de Visita'
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => this.$router.replace('login'))
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.nav {
  display: flex;
  justify-content: space-around;
  .content-nav {
    display: flex;
    justify-content: space-between;
  }
}
</style>
