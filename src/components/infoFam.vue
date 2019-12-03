<template>
  <div>
    <div id="nav">
      <router-link to="/">Datos</router-link> |
      <router-link to="/doctor">Estatus</router-link> |
      <router-link to="/family">Fecha de Visita</router-link>
      <hr>
    </div>
    <h1>Información del Familiar</h1>
    <MyVuetable></MyVuetable>
  </div>
</template>

<script>
import MyVuetable from './table'
export default {
  name: 'app',
  components: {
    MyVuetable
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
