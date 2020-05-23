import { Plugin } from '@nuxt/types'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB1882i5LDnK1BfzLc9cy_JkOsIYDONPCM',
  authDomain: 'el4s-01-a580f.firebaseapp.com',
  databaseURL: 'https://el4s-01-a580f.firebaseio.com',
  projectId: 'el4s-01-a580f',
  storageBucket: 'el4s-01-a580f.appspot.com',
  messagingSenderId: '529254943975',
  appId: '1:529254943975:web:05c8eeb8eb141b9dffe642'
}
firebase.initializeApp(firebaseConfig)

const myPlugin: Plugin = (_, inject) => {
  inject('firebase', firebase)
}

export default myPlugin
