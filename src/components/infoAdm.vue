<template>
  <div>
    <div id="nav">
      <div class="nav">
        <b-col cols="6" class="content-nav">
          <router-link to="/">{{msg1}}</router-link> |
          <router-link to="/doctor">{{msg2}}</router-link> |
          <router-link to="/family">{{msg3}}</router-link> |
          <router-link to="/family">{{msg4}}</router-link> |
          <router-link to="/family">{{msg5}}</router-link>
          </b-col>
      <a href="#" @click="logout">Salir</a>
      </div>
      <hr>
    </div>
    <h1>Administrador</h1>
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
      msg1: 'Personal del Hospital',
      msg2: 'Familia de pacientes',
      msg3: 'Pacientes',
      msg4: 'Farmacia',
      msg5: 'Talleres'
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
