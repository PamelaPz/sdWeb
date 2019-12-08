<template>
  <div>
    <div id="navInside">
      <div class="nav">
        <h1>Bienvenido</h1>
        <a href="#" @click="logout">Salir</a>
      </div>
      <hr>
    </div>
    <header>
    </header>
    <div class="contenido">
      <div role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.accordion-1 variant="info">Personal de Hospital</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>Selecciona una de las opciones a continuación para mostrar información necesaria</b-card-text>
              <!-- <b-card-text>{{ text }}</b-card-text> -->

              <b-button @click="clickToogle('Doctor')" v-b-toggle.collapse-1-inner size="sm" class="btn_inside" variant="outline-danger">Doctores</b-button>
              <b-button @click="clickToogle('Enfermera')" v-b-toggle.collapse-2-inner size="sm" class="btn_inside" variant="outline-success">Enfermeras</b-button>
              <b-button @click="clickToogle('Seguridad')" v-b-toggle.collapse-3-inner size="sm" class="btn_inside" variant="outline-dark">Seguridad</b-button>
              <b-collapse id="collapse-1-inner" class="mt-2">
                <b-card>
                  <h5>Infomación de Doctores</h5>
                  <div id="infoDoctores"></div>
                </b-card>
              </b-collapse>
              <b-collapse id="collapse-2-inner" class="mt-2">
                <b-card>
                  <h5>Infomación de Enfermeras</h5>
                  <div id="infoEnfermeras"></div>
                </b-card>
              </b-collapse>
              <b-collapse id="collapse-3-inner" class="mt-2">
                <b-card>
                  <h5>Infomación de Seguridad</h5>
                  <div id="infoSeguridad"></div>
                </b-card>
              </b-collapse>

            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button @click="clickToogle('Pacientes')" block href="#" v-b-toggle.accordion-2 variant="info">Pacientes</b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <h5>Lista de Pacientes</h5>
                <div id="infoPaciente"></div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button @click="clickToogle('Familia')" block href="#" v-b-toggle.accordion-3 variant="info">Familiares</b-button>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <h5>Lista de familiares registrados</h5>
                <div id="familia"></div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button @click="clickToogle('Farmacia')" block href="#" v-b-toggle.accordion-4 variant="info">Farmacia</b-button>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <h5>La Farmacia cuenta con los siguientes medicamentos y su respectiva información de retiro y abastecimiento.</h5>
                <div id="farmacia"></div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button @click="clickToogle('Talleres')" block href="#" v-b-toggle.accordion-5 variant="info">Talleres</b-button>
          </b-card-header>
          <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <h5>Talleres en existencia</h5>
                <div id="talleres"></div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// import MyVuetable from './table'
// import router from '../router'
import { app } from '../firebase'
import firebase from 'firebase/app'

const db = firebase.firestore(app)

export default {
  name: 'app',
  components: {
    // MyVuetable
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
  mounted () {
    // const data = this.$route.params.id
    // console.log(data)
    // var docRef = db.collection('personal').doc(data)

    // docRef.get().then(function (doc) {
    //   if (doc.exists) {
    //     // console.log('Document data:', doc.data().)
    //     console.log('Document data:', doc.data().name)
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log('No such document!')
    //   }
    // }).catch(function (error) {
    //   console.log('Error getting document:', error)
    // })
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => this.$router.replace('login'))
    },
    clickToogle (x) {
      if (x === 'Doctor') {
        const id = 'GPcuJQB3DMzUODMv1r6D'
        db.collection('personal').where('id_personaltype', '==', id)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              var name = doc.data().name
              var email = doc.data().email
              var x = document.createElement('p')
              var t = document.createTextNode(name + ' | ' + email)
              x.appendChild(t)
              document.getElementById('infoDoctores').appendChild(x)
            })
          })
          .catch(function (error) {
            console.log('Error getting document:', error)
          })
      } else if (x === 'Enfermera') {
        const id = 'aGjQmNHJvvIXmtQBRETA'
        db.collection('personal').where('id_personaltype', '==', id)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              var name = doc.data().name
              var email = doc.data().email
              var x = document.createElement('p')
              var t = document.createTextNode(name + ' | ' + email)
              x.appendChild(t)
              document.getElementById('infoEnfermeras').appendChild(x)
            })
          })
          .catch(function (error) {
            console.log('Error getting document:', error)
          })
      } else if (x === 'Seguridad') {
        const id = 'JJsDydl3krEA6UDZm676'
        db.collection('personal').where('id_personaltype', '==', id)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              var name = doc.data().name
              var email = doc.data().email
              var x = document.createElement('p')
              var t = document.createTextNode(name + ' | ' + email)
              x.appendChild(t)
              document.getElementById('infoSeguridad').appendChild(x)
            })
          })
          .catch(function (error) {
            console.log('Error getting document:', error)
          })
      } else if (x === 'Pacientes') {
        db.collection('entry').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var data = (doc.id, ' => ', doc.data())
            // var name = (doc.id, ' => ', doc.data().name)
            var idPaciente = (doc.id, ' => ', doc.data().id_patients)
            // var idDoctor = (doc.id, ' => ', doc.data().id_personal)
            // var idFamilia = (doc.id, ' => ', doc.data().id_family)
            console.log(data)
            // console.log('Nombre: ' + name)
            // console.log(idPaciente)
            // console.log(idDoctor)
            // console.log(idFamilia)
            // var x = document.createElement('p')
            // var t = document.createTextNode(name)
            // x.appendChild(t)
            // document.getElementById('infoPaciente').appendChild(x)
            db.collection('patients').get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                var estatus = (doc.id, ' => ', doc.data())
                console.log(estatus)
                // var x = document.createElement('p')
                // var t = document.createTextNode(internado)
                // x.appendChild(t)
                // document.getElementById('infoPaciente').appendChild(x)
              })
            }) // Record
            db.collection('record').where('id_patients', '==', idPaciente).get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                var medicina = (doc.id, ' => ', doc.data())
                console.log(medicina)
                // var x = document.createElement('p')
                // var t = document.createTextNode(internado)
                // x.appendChild(t)
                // document.getElementById('infoPaciente').appendChild(x)
              })
            }) // Record
          })
        }) // Entry
        // db.collection('patients').get().then(function (querySnapshot) {
        //   querySnapshot.forEach(function (doc) {
        //     var IDPaciente = (doc.id)
        //     var doctor = doc.data().id_personal
        //     var estatus = doc.data().id_status
        //     var internado = 'Sí'
        //     console.log(IDPaciente + '/' + doctor + '/' + estatus)
        //     if (!doc.data().intership) {
        //       internado = 'No'
        //     }
        //     // Imprimir si está internado
        //     var x = document.createElement('p')
        //     var t = document.createTextNode(' ' + internado)
        //     x.appendChild(t)
        //     document.getElementById('infoPaciente').appendChild(x)
        //   })
        // })
      } else if (x === 'Familia') {
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

                var x = document.createElement('tr')
                var t = document.createTextNode('Nombre de tutor: ' + name)
                x.appendChild(t)
                document.getElementById('familia').appendChild(x)
                // --------------------------------------------------
                var a = document.createElement('tr')
                var b = document.createTextNode('Dirección: ' + direccion)
                a.appendChild(b)
                document.getElementById('familia').appendChild(a)
                // --------------------------------------------------
                var c = document.createElement('tr')
                var d = document.createTextNode('Correo: ' + email)
                c.appendChild(d)
                document.getElementById('familia').appendChild(c)
                // --------------------------------------------------
                namep = namePaciente(idpaciente)
                var e = document.createElement('tr')
                var f = document.createTextNode('Paciente a quien visita: ' + namep)
                e.appendChild(f)
                document.getElementById('familia').appendChild(e)
                // --------------------------------------------------
                var k = document.createElement('br')
                document.getElementById('familia').appendChild(k)

                function namePaciente (x) {
                  db.collection('entry').where('id_patients', '==', x).get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      namep = doc.data().name
                      return namep
                    })
                  }) // Entry
                }
              })
            }) // Family
          })
        }) // Patients
      } else if (x === 'Talleres') {
        db.collection('workshop').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // var data = (doc.id, ' => ', doc.data())
            var name = (doc.id, ' => ', doc.data().name)
            var orador = (doc.id, ' => ', doc.data().speaker)
            var ubicacion = (doc.id, ' => ', doc.data().location)
            var capacidad = (doc.id, ' => ', doc.data().capacity)
            var cantidad = (doc.id, ' => ', doc.data().quantity)
            var publico = (doc.id, ' => ', doc.data().public)
            var x = document.createElement('tr')
            var t = document.createTextNode('Título: ' + name)
            x.appendChild(t)
            document.getElementById('talleres').appendChild(x)
            // --------------------------------------------------
            var a = document.createElement('tr')
            var b = document.createTextNode('Conferencista: ' + orador)
            a.appendChild(b)
            document.getElementById('talleres').appendChild(a)
            // --------------------------------------------------
            var c = document.createElement('tr')
            var d = document.createTextNode('Ubicación: ' + ubicacion)
            c.appendChild(d)
            document.getElementById('talleres').appendChild(c)
            // --------------------------------------------------
            var e = document.createElement('tr')
            var f = document.createTextNode('Capacidad para ' + capacidad + ' personas')
            e.appendChild(f)
            document.getElementById('talleres').appendChild(e)
            // --------------------------------------------------
            var g = document.createElement('tr')
            var h = document.createTextNode('Cantidad: ' + cantidad)
            g.appendChild(h)
            document.getElementById('talleres').appendChild(g)
            // --------------------------------------------------
            var i = document.createElement('tr')
            var j = document.createTextNode('Público diriguido: ' + publico)
            i.appendChild(j)
            document.getElementById('talleres').appendChild(i)
            // --------------------------------------------------
            var k = document.createElement('br')
            document.getElementById('talleres').appendChild(k)
          })
        }) // Talleres
      } else if (x === 'Farmacia') {
        db.collection('drugstore').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // var data = (doc.id, ' => ', doc.data())
            var name = (doc.id, ' => ', doc.data().name)
            var existencia = (doc.id, ' => ', doc.data().stock)
            var retiro = (doc.id, ' => ', doc.data().catering)
            var abastecer = (doc.id, ' => ', doc.data().retirement)

            var x = document.createElement('tr')
            var t = document.createTextNode('Nombre: ' + name)
            x.appendChild(t)
            document.getElementById('farmacia').appendChild(x)
            // --------------------------------------------------
            var a = document.createElement('tr')
            var b = document.createTextNode('Existencias: ' + existencia)
            a.appendChild(b)
            document.getElementById('farmacia').appendChild(a)
            // --------------------------------------------------
            var c = document.createElement('tr')
            var d = document.createTextNode('Retiro: ' + retiro)
            c.appendChild(d)
            document.getElementById('farmacia').appendChild(c)
            // --------------------------------------------------
            var e = document.createElement('tr')
            var f = document.createTextNode('Abastecimiento de ' + abastecer)
            e.appendChild(f)
            document.getElementById('farmacia').appendChild(e)
            // --------------------------------------------------
            var k = document.createElement('br')
            document.getElementById('farmacia').appendChild(k)
          })
        }) // Talleres
      }
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
  padding: 8rem 2rem;
  text-align: left;
  .btn_inside {
    margin-right: 1rem;
  }
  h5 {
    padding-bottom: 10px;
  }
}
</style>
