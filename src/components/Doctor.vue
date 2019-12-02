<template>
  <div class="doctor">
    <b-container>
      <Login />
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from './components/Login.vue' +

export default {
  name: 'doctor',
  components: {
    Login: () => import(/* webpackChunkName: 'hello-world' */ '../components/Login.vue')
  }
}
</script>
