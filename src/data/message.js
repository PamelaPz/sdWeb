import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { Observable } from 'rxjs/Observable'

export function all () {
  const db = firebase.firestore()
  return Observable.create(function (observer) {
    db.collection('personal').where('name', '==', true)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data())
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
  })
}
