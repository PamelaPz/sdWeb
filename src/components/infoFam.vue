<template>
  <div>
    <div id="navInside">
      <div class="nav">
        <div>
          <h1>Bienvenido</h1>
          <p id="nameUser"></p>
        </div>
        <a href="#" @click="logout">Salir</a>
      </div>
      <hr>
    </div>
    <div class="contenido">
      <div id="familia">
        <b-container>
          <h1 class="title">Información del Familiar</h1>
          <hr>
          <table style="width:100%">
            <tr>
              <th>Nombre tutor</th>
              <th>Dirección</th>
              <th>Correo</th>
              <th>Visita a</th>
            </tr>
            <tr>
              <td id="name"></td>
              <td id="address"></td>
              <td id="email"></td>
              <td id="patient"></td>
            </tr>
          </table>
          <hr>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { app } from '../firebase'
import firebase from 'firebase/app'

const db = firebase.firestore(app)

export default {
  data () {
    return {
      msg1: 'Datos personales',
      msg2: 'Estatus',
      msg3: 'Fechas de Visita',
      userName: this.$route.params.name
    }
  },
  mounted () {
    var name = this.userName
    document.getElementById('nameUser').innerHTML = name
    console.log(name)

    db.collection('patients').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var id = (doc.id)
        db.collection('family').where('id_patients', '==', id).get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var datos = (doc.id, ' => ', doc.data())
            console.log(datos)
            var namep = ''
            var name = (doc.id, ' => ', doc.data().family_name)
            var direccion = (doc.id, ' => ', doc.data().address)
            var email = (doc.id, ' => ', doc.data().email)
            var idpaciente = (doc.id, ' => ', doc.data().id_patients)

            document.getElementById('name').innerHTML = name
            document.getElementById('address').innerHTML = direccion
            document.getElementById('email').innerHTML = email
            namePaciente(idpaciente)
            function namePaciente (x) {
              db.collection('entry').where('id_patients', '==', x).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  namep = (doc.id, ' => ', doc.data().name)
                  document.getElementById('patient').innerHTML = namep
                })
              }) // Entry
            }
          })
        }) // Family
      })
    }) // Patients
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
#navInside {
  position: fixed;
  width: 97%;
  padding: 30px 30px 0 30px;
  background-color: white;
  z-index: 5;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content-nav {
      display: flex;
      justify-content: space-between;
    }
  }
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
.contenido {
  padding: 10rem 2rem;
  .title {
    padding: 1rem 0;
  }
}
</style>
