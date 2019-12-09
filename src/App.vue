<template>
<div id="app">
  <b-container fluid>
    <router-view/>
  </b-container>
</div>
</template>
<script>
// @ is an alias to /src
export default {}
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
