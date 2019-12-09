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
    <b-container class="contenido">
      <div class="section personal" id="doctores">
        <h3>Personal</h3>
        <p>Selecciona una de las opciones a continuación para mostrar información necesaria</p>
        <h5>Infomación de Doctores</h5>
        <b-button @click="clickToogle('Doctor')" variant="info">Ver Doctores</b-button>
        <hr>
        <table style="width:100%" >
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
          <tr>
            <td id="nombreD"></td>
            <td id="correoD"></td>
          </tr>
        </table>
        <hr>
        <b-button type="button primary" @click="print('reporteDoctores', 'doctores')">Imprimir</b-button>
      </div>
      <div class="section personal" id="enfermeras">
        <h5>Infomación de Enfermeras</h5>
        <b-button @click="clickToogle('Enfermera')" variant="warning">Ver Enfermeras</b-button>
        <hr>
        <table style="width:100%" >
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
          <tr>
            <td id="nombreE"></td>
            <td id="correoE"></td>
          </tr>
        </table>
        <hr>
        <b-button type="button primary" @click="print('reporteEnfermeras', 'enfermeras')">Imprimir</b-button>
      </div>
      <div class="section" id="seguridad">
        <h5>Infomación de Seguridad</h5>
        <b-button @click="clickToogle('Seguridad')" variant="dark">Ver Seguridad</b-button>
        <hr>
        <table style="width:100%" >
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
          <tr>
            <td id="nombreS"></td>
            <td id="correoS"></td>
          </tr>
        </table>
        <hr>
        <b-button type="button primary" @click="print('reporteSeguridad', 'seguridad')">Imprimir</b-button>
      </div>
      <div class="section" id="pacientes">
        <h5>Información de Pacientes</h5>
        <b-button @click="clickToogle('Pacientes')" variant="success">Pacientes</b-button>
        <hr>
        <table style="width:100%" >
          <tr>
            <th>Nombre</th>
            <th>Internado</th>
            <th>Estatus</th>
            <th>Doctor asignado</th>
            <th>Egreso</th>
            <th colspan="4">Historial</th>
          </tr>
          <tr>
            <td id="nombreP"></td>
            <td id="internadoP"></td>
            <td id="statusP"></td>
            <td id="doctorP"></td>
            <td id="egresoP"></td>
            <td id="historialP"></td>
            <td id="medicina"></td>
            <td id="dosis"></td>
            <td id="horario"></td>
          </tr>
        </table>
        <hr>
        <b-button type="button primary" @click="print('reportePacientes','pacientes')">Imprimir</b-button>
      </div>
      <div class="section">
        <h3>Familiares</h3>
        <b-button @click="clickToogle('Familia')" variant="primary">Ver Familiares</b-button>
        <hr>
        <table style="width:100%" >
          <tr>
            <th>Nombre tutor</th>
            <th>Dirección</th>
            <th>Correo</th>
            <th>Proxima Visita</th>
            <th>Visita a</th>
          </tr>
          <tr>
            <td id="nombreFm"></td>
            <td id="addressFm"></td>
            <td id="emailFm"></td>
            <td id="fechaFm"></td>
            <td id="visitaFm"></td>
          </tr>
        </table>
        <hr>
      </div>
      <div class="section">
        <h3>Farmacia</h3>
        <p>Los siguientes medicamentos se presentan con su respectiva información de retiro y abastecimiento.</p>
        <b-button @click="clickToogle('Farmacia')" variant="danger">Ver Medicamentos</b-button>
        <hr>
        <table style="width:100%" >
          <tr>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Retiro</th>
            <th>Abastecimiento</th>
          </tr>
          <tr>
            <td id="nombreFr"></td>
            <td id="stockFr"></td>
            <td id="retiroFr"></td>
            <td id="abasteFr"></td>
          </tr>
        </table>
        <hr>
      </div>
      <div class="section">
        <h3>Talleres</h3>
        <p>Historial de talleres registrados</p>
        <b-button @click="clickToogle('Talleres')" variant="light">Ver Talleres</b-button>
        <hr>
        <table style="width:100%" >
          <tr>
            <th>Nombre</th>
            <th>Conferencista</th>
            <th>Ubicación o Área</th>
            <th>Capacidad</th>
            <th>Cantidad</th>
            <th>Diriguido a</th>
          </tr>
          <tr>
            <td id="nombreT"></td>
            <td id="speakerT"></td>
            <td id="locationT"></td>
            <td id="capacidadT"></td>
            <td id="cantidadT"></td>
            <td id="publicT"></td>
          </tr>
        </table>
        <hr>
      </div>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { app } from '../firebase'
import firebase from 'firebase/app'

const db = firebase.firestore(app)

export default {
  data () {
    return {
      msg1: 'Personal del Hospital',
      msg2: 'Familia de pacientes',
      msg3: 'Pacientes',
      msg4: 'Farmacia',
      msg5: 'Talleres',
      userid: this.$route.params.id
    }
  },
  mounted () {
    var id = this.userid
    db.collection('personal').where('id_personaltype', '==', id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var name = doc.data().name
          document.getElementById('nameUser').innerHTML = name
        })
      })
      .catch(function (error) {
        console.log('Error getting document:', error)
      })
  },
  methods: {
    print (n, id) {
      var name = n
      var doc = new jsPDF('p', 'pt', 'a4')
      html2canvas(document.getElementById(id), { scale: 8 }).then(canvas => {
        var x = canvas.toDataURL('image/jpeg', 1)
        doc.addImage(x, 'JPEG', 50, 50, 500, 400)
        doc.save(n + '.pdf')
      })
    },
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
              // -------------------------------------------------------
              var x = document.createElement('td')
              x.innerHTML = name
              document.getElementById('nombreD').appendChild(x)
              var z = document.createElement('tr')
              document.getElementById('nombreD').appendChild(z)
              // -------------------------------------------------------
              var y = document.createElement('td')
              y.innerHTML = email
              document.getElementById('correoD').appendChild(y)
              var w = document.createElement('tr')
              document.getElementById('correoD').appendChild(w)
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
              // -------------------------------------------------------
              var x = document.createElement('td')
              x.innerHTML = name
              document.getElementById('nombreE').appendChild(x)
              var z = document.createElement('tr')
              document.getElementById('nombreE').appendChild(z)
              // -------------------------------------------------------
              var y = document.createElement('td')
              y.innerHTML = email
              document.getElementById('correoE').appendChild(y)
              var w = document.createElement('tr')
              document.getElementById('correoE').appendChild(w)
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
              var x = document.createElement('td')
              x.innerHTML = name
              document.getElementById('nombreS').appendChild(x)
              var z = document.createElement('tr')
              document.getElementById('nombreS').appendChild(z)
              // -------------------------------------------------------
              var y = document.createElement('td')
              y.innerHTML = email
              document.getElementById('correoS').appendChild(y)
              var w = document.createElement('tr')
              document.getElementById('correoS').appendChild(w)
            })
          })
          .catch(function (error) {
            console.log('Error getting document:', error)
          })
      } else if (x === 'Pacientes') {
        db.collection('personal').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var idPersonal = doc.id
            var personalName = doc.data().name
            db.collection('status').get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                var idStatus = doc.id
                var infoSta = doc.data().stage // Extraemos información de estatus
                db.collection('patients').get() // Existen coincidencias entre doctor y paciente
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      var datoPA = doc.id // Id del paciente asignado
                      var status = doc.data().id_status
                      var inter = doc.data().intership
                      var egress = doc.data().date_egress
                      var personal = doc.data().id_personal // Id de Doctor Asignado
                      if (idStatus === status) {
                        if (idPersonal === personal) {
                          db.collection('record').where('id_patients', '==', datoPA)
                            .get()
                            .then(function (querySnapshot) {
                              querySnapshot.forEach(function (doc) {
                                console.log('Id Paciente: ' + datoPA)
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
                                      console.log(namePaci)
                                      var a = document.createElement('td')
                                      a.innerHTML = namePaci
                                      document.getElementById('nombreP').appendChild(a)
                                      var b = document.createElement('tr')
                                      document.getElementById('nombreP').appendChild(b)
                                      // -------------------------------------------------------
                                      var c = document.createElement('td')
                                      c.innerHTML = internado
                                      document.getElementById('internadoP').appendChild(c)
                                      var d = document.createElement('tr')
                                      document.getElementById('internadoP').appendChild(d)
                                      // --------------------------------------------------
                                      var m = document.createElement('td')
                                      m.innerHTML = personalName
                                      document.getElementById('doctorP').appendChild(m)
                                      var n = document.createElement('tr')
                                      document.getElementById('doctorP').appendChild(n)
                                      // --------------------------------------------------
                                      var o = document.createElement('td')
                                      o.innerHTML = egress
                                      document.getElementById('egresoP').appendChild(o)
                                      var p = document.createElement('tr')
                                      document.getElementById('egresoP').appendChild(p)
                                      // --------------------------------------------------
                                      var e = document.createElement('td')
                                      e.innerHTML = infoSta
                                      document.getElementById('statusP').appendChild(e)
                                      var f = document.createElement('tr')
                                      document.getElementById('statusP').appendChild(f)
                                      // --------------------------------------------------
                                      var g = document.createElement('td')
                                      g.innerHTML = 'Dosis: ' + dosis
                                      document.getElementById('dosis').appendChild(g)
                                      var h = document.createElement('tr')
                                      document.getElementById('dosis').appendChild(h)
                                      // --------------------------------------------------
                                      var i = document.createElement('td')
                                      i.innerHTML = 'Medicina: ' + medicina
                                      document.getElementById('medicina').appendChild(i)
                                      var j = document.createElement('tr')
                                      document.getElementById('medicina').appendChild(j)
                                      // --------------------------------------------------
                                      var k = document.createElement('td')
                                      k.innerHTML = 'Observaciones: ' + '<br>' + observa
                                      document.getElementById('horario').appendChild(k)
                                      var l = document.createElement('tr')
                                      document.getElementById('horario').appendChild(l)
                                    })
                                  }) // Entry
                              })
                            }) // Record
                        } // En d IF Personal
                      } // End IF Status
                    })
                  }) // Patients
              })
            }) // Status
          }) // Personal
        })
      } else if (x === 'Familia') {
        db.collection('patients').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var idPac = (doc.id)
            db.collection('family').where('id_patients', '==', idPac).get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                var datos = (doc.id, ' => ', doc.data())
                var name = (doc.id, ' => ', doc.data().family_name)
                var direccion = (doc.id, ' => ', doc.data().address)
                var email = (doc.id, ' => ', doc.data().email)
                console.log(datos)
                db.collection('entry').where('id_patients', '==', idPac).get().then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    var nameP = doc.data().name
                    var a = document.createElement('td')
                    a.innerHTML = name
                    document.getElementById('nombreFm').appendChild(a)
                    var b = document.createElement('tr')
                    document.getElementById('nombreFm').appendChild(b)
                    // -------------------------------------------------------
                    var c = document.createElement('td')
                    c.innerHTML = direccion
                    document.getElementById('addressFm').appendChild(c)
                    var d = document.createElement('tr')
                    document.getElementById('addressFm').appendChild(d)
                    // --------------------------------------------------
                    var e = document.createElement('td')
                    e.innerHTML = email
                    document.getElementById('emailFm').appendChild(e)
                    var f = document.createElement('tr')
                    document.getElementById('emailFm').appendChild(f)
                    // --------------------------------------------------
                    var g = document.createElement('td')
                    g.innerHTML = nameP
                    document.getElementById('visitaFm').appendChild(g)
                    var h = document.createElement('tr')
                    document.getElementById('visitaFm').appendChild(h)
                    // --------------------------------------------------
                  })
                }) // Entry
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

            var a = document.createElement('td')
            a.innerHTML = name
            document.getElementById('nombreT').appendChild(a)
            var b = document.createElement('tr')
            document.getElementById('nombreT').appendChild(b)
            // -------------------------------------------------------
            var c = document.createElement('td')
            c.innerHTML = orador
            document.getElementById('speakerT').appendChild(c)
            var d = document.createElement('tr')
            document.getElementById('speakerT').appendChild(d)
            // --------------------------------------------------
            var e = document.createElement('td')
            e.innerHTML = ubicacion
            document.getElementById('locationT').appendChild(e)
            var f = document.createElement('tr')
            document.getElementById('locationT').appendChild(f)
            // --------------------------------------------------
            var g = document.createElement('td')
            g.innerHTML = capacidad
            document.getElementById('capacidadT').appendChild(g)
            var h = document.createElement('tr')
            document.getElementById('capacidadT').appendChild(h)
            // --------------------------------------------------
            var i = document.createElement('td')
            i.innerHTML = cantidad
            document.getElementById('cantidadT').appendChild(i)
            var j = document.createElement('tr')
            document.getElementById('cantidadT').appendChild(j)
            // --------------------------------------------------
            var k = document.createElement('td')
            k.innerHTML = publico
            document.getElementById('publicT').appendChild(k)
            var l = document.createElement('tr')
            document.getElementById('publicT').appendChild(l)
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

            var a = document.createElement('tr')
            a.innerHTML = name
            document.getElementById('nombreFr').appendChild(a)
            var b = document.createElement('tr')
            document.getElementById('nombreFr').appendChild(b)
            // -------------------------------------------------------
            var c = document.createElement('tr')
            c.innerHTML = existencia
            document.getElementById('stockFr').appendChild(c)
            var d = document.createElement('tr')
            document.getElementById('stockFr').appendChild(d)
            // --------------------------------------------------
            var e = document.createElement('tr')
            e.innerHTML = retiro
            document.getElementById('retiroFr').appendChild(e)
            var f = document.createElement('tr')
            document.getElementById('retiroFr').appendChild(f)
            // --------------------------------------------------
            var g = document.createElement('tr')
            g.innerHTML = abastecer
            document.getElementById('abasteFr').appendChild(g)
            var h = document.createElement('tr')
            document.getElementById('abasteFr').appendChild(h)
          })
        }) // Farmacia
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
  padding: 10rem 2rem;
  text-align: left;
  .btn_inside {
    margin-right: 1rem;
  }
  h5 {
    padding-bottom: 10px;
  }
  .section {
    margin-bottom: 8rem;
  }
}
</style>
