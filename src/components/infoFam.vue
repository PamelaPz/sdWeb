<template>
  <div class="app">
    <b-container>
        <MyVuetable></MyVuetable>
    </b-container>
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
