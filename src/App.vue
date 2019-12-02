<template>
<div id="app">
  <b-container fluid>
    <div id="nav">
      <router-link to="/">Administrador</router-link> |
      <router-link to="/doctor">Doctor</router-link> |
      <router-link to="/family">Familia</router-link>
      <hr>
    </div>
    <router-view/>
    <!-- <login /> -->
  </b-container>
</div>
</template>

<script>
// @ is an alias to /src
// import login from '../components/logins'
export default {
  // components: { login }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
