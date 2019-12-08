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
      <p>Pacientes asignados</p>
      <b>Nombre</b><p id="nombrePA"> </p>
      <b>Internado</b><p id="internado"> </p>
      <b>Estatus</b><p id="estatus"> </p>
      <div>
        <b> <i> HISTORIAL</i> </b> <br>
        <b>Dosis: </b><p id="dosis"> </p>
        <b>Medicina:</b><p id="medicina"> </p>
        <b>Observaciones: </b><p id="observa"> </p>
      </div>
      <hr>
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
          if (idDoc === id) {
            db.collection('status').get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                var idStatus = doc.id
                var infoSta = doc.data().stage
                // console.log(infoSta + idStatus)
                db.collection('patients').where('id_personal', '==', id)
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      let datoPA = doc.id // Id del paciente asignado
                      var status = doc.data().id_status
                      var inter = doc.data().intership
                      if (idStatus === status) {
                        db.collection('record').where('id_patients', '==', datoPA)
                          .get()
                          .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
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
                                    document.getElementById('nombrePA').innerHTML = namePaci
                                    document.getElementById('internado').innerHTML = internado
                                    document.getElementById('estatus').innerHTML = infoSta
                                    document.getElementById('dosis').innerHTML = dosis
                                    document.getElementById('medicina').innerHTML = medicina
                                    document.getElementById('observa').innerHTML = observa
                                  })
                                }) // Entry
                            })
                          }) // Record
                      }
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
}
.contenido {
  padding: 10rem 2rem;
}
</style>
