import * as firebase from 'firebase/app'
import 'firebase/firestore'

// import { Observable } from 'rxjs/Observable'

export function all () {
  var db = firebase.firestore()
  db.collection('personal').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var email = `${doc.id} => ${doc.data().email}`
      var password = `${doc.id} => ${doc.data().password}`
      console.log(email + ' ' + password)
    })
  })
}
