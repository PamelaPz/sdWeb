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
        <b-button @click="clickDatos" variant="success">Ver Información</b-button>
        <hr>
        <table style="width:100%" >
          <tr>
            <th>Nombre</th>
            <th>Internado</th>
            <th>Estatus</th>
            <th colspan="3">HISTORIAL</th>
          </tr>
          <tr id="inforPacientes">
            <td id="nombrePA"></td>
            <td id="internado"></td>
            <td id="estatus"></td>
            <td id="dosis"></td>
            <td id="medicina"></td>
            <td id="observa"></td>
          </tr>
        </table>
        <hr>
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
      typeUser: this.$route.params.type,
      key: false
    }
  },
  mounted () {
    const type = this.typeUser
    db.collection('personal').where('id_personaltype', '==', type)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var name = doc.data().name // Nombre de quién inicia sesión
          document.getElementById('nameUser').innerHTML = name
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
    },
    clickDatos () {
      const id = this.userid
      const type = this.typeUser

      console.log(id)
      db.collection('personal').where('id_personaltype', '==', type)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var idDoc = doc.id
            if (idDoc === id) { // Si el id del usuario coincide
              db.collection('status').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  var idStatus = doc.id
                  var infoSta = doc.data().stage // Extraemos información de estatus
                  db.collection('patients').where('id_personal', '==', id) // Existen coincidencias entre doctor y paciente
                    .get()
                    .then(function (querySnapshot) {
                      querySnapshot.forEach(function (doc) {
                        var datoPA = doc.id // Id del paciente asignado
                        var status = doc.data().id_status
                        var inter = doc.data().intership
                        if (idStatus === status) {
                          db.collection('record').where('id_patients', '==', datoPA)
                            .get()
                            .then(function (querySnapshot) {
                              querySnapshot.forEach(function (doc) {
                                console.log(datoPA)
                                var dosis = doc.data().dose
                                var medicina = doc.data().medicine
                                var observa = doc.data().observations
                                db.collection('entry').where('id_patients', '==', datoPA)
                                  .get()
                                  .then(function (querySnapshot) {
                                    querySnapshot.forEach(function (doc) {
                                      var internado = 'Sí'
                                      if (!inter) {
                                        internado = 'No'
                                      }
                                      var namePaci = (doc.id, ' => ', doc.data().name)
                                      var tr = document.createElement('tr')
                                      tr.innerText = namePaci
                                      document.getElementById('nombrePA').appendChild(tr)
                                      // ---------------------------------------------------------
                                      var t2 = document.createElement('tr')
                                      t2.innerText = internado
                                      document.getElementById('internado').appendChild(t2)
                                      // ---------------------------------------------------------
                                      var t3 = document.createElement('tr')
                                      t3.innerText = infoSta
                                      document.getElementById('estatus').appendChild(t3)
                                      // ---------------------------------------------------------
                                      var t4 = document.createElement('tr')
                                      t4.innerText = 'Dosis: ' + dosis
                                      document.getElementById('dosis').appendChild(t4)
                                      // ---------------------------------------------------------
                                      var t5 = document.createElement('tr')
                                      t5.innerText = 'Medicina: ' + medicina
                                      document.getElementById('medicina').appendChild(t5)
                                      // ---------------------------------------------------------
                                      var t6 = document.createElement('tr')
                                      t6.innerText = 'Observaciones: ' + observa
                                      document.getElementById('observa').appendChild(t6)
                                    })
                                  }) // Entry
                              })
                            }) // Record
                        } // End IF
                      })
                    }) // Patients
                })
              }) // Status
            } // End IF
          })
        }) // Personal
        .catch(function (error) {
          console.log('Error getting document:', error)
        })
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
