<template>
<div id="app">
  <b-container fluid>
    <div id="nav">
      <div class="nav">
        <div>
          <router-link to="/">Administrador</router-link> |
          <router-link to="/doctor">Doctor</router-link> |
          <router-link to="/family">Familia</router-link>
        </div>
        <router-link to="/registro">Registro</router-link>
      </div>
      <hr>
    </div>
    <router-view/>
  </b-container>
</div>
</template>

<style lang="scss">
#nav {
  // padding: 30px;
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
    justify-content: space-between;
  }
}
</style>
