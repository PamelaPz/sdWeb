<template>
<div id="app">
  <b-container fluid>
    <h1>Familiar</h1>
    <div id="nav">
      <router-link to="/">Datos</router-link> |
      <router-link to="/doctor">Estatus</router-link> |
      <router-link to="/family">Fecha de Visita</router-link>
      <hr>
    </div>
    <router-view/>
  </b-container>
</div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'app'
}
</script>

<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  hr {
    border: 1px solid rgba(44, 62, 80, 0.8);
  }
}
</style>
