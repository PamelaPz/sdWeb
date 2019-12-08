<template>
  <div>
    <div id="navInside">
      <div class="nav">
        <div>
          <h2>Bienvenido</h2>
          <p id="nameUser"></p>
        </div>
        <a href="#" @click="logout">Salir</a>
      </div>
      <hr>
    </div>
    <div class="contenido">
      <h1>Doctor</h1>
    </div>
  </div>
</template>

<script>
import { app } from '../firebase'
import firebase from 'firebase/app'

const db = firebase.firestore(app)

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      msg1: 'Pacientes',
      msg2: 'Historial',
      msg3: 'Familiares',
      msg4: 'Datos Personales',
      userid: this.$route.params.id
    }
  },
  mounted () {
    var id = this.userid
    console.log(id)
    db.collection('personal').where('id_personaltype', '==', id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var name = doc.data().name
          document.getElementById('nameUser').innerHTML = name
          console.log(name)
        })
      })
      .catch(function (error) {
        console.log('Error getting document:', error)
      })
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
.contenido {
  padding: 10rem 2rem;
}
</style>
