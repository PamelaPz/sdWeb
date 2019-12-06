<template>
  <div class="app">
    <div id="header">
      <div class="nav">
        <router-link to="/login">Log In</router-link>
      </div>
      <hr>
    </div>
    <h1 class="title">Registro</h1>
    <formulario />
  </div>
</template>

<script>
import formulario from './form_registro'
export default {
  components: {
    formulario
  }
}
</script>

<style lang="scss">
#header {
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
  .nav {
    display: flex;
    justify-content: flex-end;
  }
}
h1.title {
  padding: 1rem 0 2rem;
}
</style>
