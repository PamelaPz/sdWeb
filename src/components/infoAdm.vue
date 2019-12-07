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
                <div id="infoPacientes"></div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.accordion-3 variant="info">Familiares</b-button>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.accordion-4 variant="info">Farmacia</b-button>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.accordion-5 variant="info">Talleres</b-button>
          </b-card-header>
          <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ text }}</b-card-text>
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
      text: `
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
        richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
        brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
        tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
        wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
        vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
        synth nesciunt you probably haven't heard of them accusamus labore VHS.
      `,
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
        db.collection('patients').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var internado = 'Sí'
            if (!doc.data().intership) {
              internado = 'No'
            }
            var fecha = Date.parse(doc.data().date_egress)
            var x = document.createElement('p')
            var t = document.createTextNode(fecha + ' | ' + ' INTERNADO: ' + internado)
            x.appendChild(t)
            document.getElementById('infoPacientes').appendChild(x)
          })
        })
          .catch(function (error) {
            console.log('Error getting document:', error)
          })
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
