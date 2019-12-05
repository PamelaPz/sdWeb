<template>
  <div>
    <div id="nav">
      <router-link to="/">{{msg1}}</router-link> |
      <router-link to="/doctor">{{msg2}}</router-link> |
      <router-link to="/family">{{msg3}}</router-link> |
      <router-link to="/family">{{msg4}}</router-link>
      <hr>
    </div>
    <h1>Doctor</h1>
    <MyVuetable></MyVuetable>
  </div>
</template>

<script>
import MyVuetable from './table'
export default {
  name: 'app',
  components: {
    MyVuetable
  },
  data () {
    return {
      msg1: 'Pacientes',
      msg2: 'Historial',
      msg3: 'Familiares',
      msg4: 'Datos Personales'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
