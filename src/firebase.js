import * as firebase from 'firebase/app'

var config = ({
  apiKey: 'AIzaSyC7vXbBoC4KLhavr0z4TP0AexVA4cqRwpI',
  authDomain: 'sdproject-24db5.firebaseapp.com',
  databaseURL: 'https://sdproject-24db5.firebaseio.com',
  projectId: 'sdproject-24db5',
  storageBucket: 'sdproject-24db5.appspot.com',
  messagingSenderId: '808394124067',
  appId: '1:808394124067:web:a07311d1341a45994f7a96',
  measurementId: 'G-FWT0E0BVCH'
})
export const app = firebase.initializeApp(config)
