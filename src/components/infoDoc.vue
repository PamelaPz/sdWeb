<template>
  <div>
    <div id="navInside">
      <div class="nav">
        <div>
          <h2>Bienvenido</h2>
          <p id="nameUser"></p>
        </div>
        <div>
          <router-link to="/registro" class="router"> Registrar paciente </router-link>
          <a href="#" @click="logout">Salir</a>
        </div>
      </div>
      <hr>
    </div>
    <div class="contenido">
      <b-container>
        <h1 class="title">Información de Pacientes</h1>
        <p>Pacientes asignados</p>
        <hr>
        <table style="width:100%">
          <tr>
            <th>Nombre</th>
            <th>Internado</th>
            <th>Estatus</th>
            <th colspan="3">HISTORIAL</th>
          </tr>
          <tr>
            <td id="nombrePA"></td>
            <td id="internado"></td>
            <td id="estatus"></td>
            <td>Dosis<p id="dosis"></p></td>
            <td>Medicina<p id="medicina"></p></td>
            <td>Observaciones<p id="observa"></p></td>
          </tr>
          <tr>
          </tr>
        </table>
        <hr>
        <b-button type="button primary" onclick="javascript:window.print()">Imprimir</b-button>
      </b-container>
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
      userid: this.$route.params.id,
      typeUser: this.$route.params.type
    }
  },
  mounted () {
    const id = this.userid
    const type = this.typeUser

    console.log(id)
    db.collection('personal').where('id_personaltype', '==', type)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var name = doc.data().name // Nombre de quién inicia sesión
          var idDoc = doc.id
          document.getElementById('nameUser').innerHTML = name
          if (idDoc === id) { // Si el id del usuario coincide
            db.collection('status').get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                // var idStatus = doc.id
                // var infoSta = doc.data().stage // Extraemos información de estatus
                db.collection('patients').where('id_personal', '==', id) // Existen coincidencias entre doctor y paciente
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      let datoPA = doc.id // Id del paciente asignado
                      var idpersonal = doc.data().id_personal
                      // var status = doc.data().id_status
                      // var inter = doc.data().intership
                      console.log(idpersonal + datoPA)
                    })
                  }) // Patients
              })
            }) // Status
          }
        })
      }) // Personal
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
  .router {
    padding: 0 5rem;
  }
}
.contenido {
  padding: 10rem 2rem;
}
</style>
