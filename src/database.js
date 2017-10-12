import Firebase from 'firebase'

let config = {
  apiKey: "AIzaSyBG96HNJ0xZfFDlsdhYoUV41MzSZ8vrfmQ",
  authDomain: "use-it-or-lose-it.firebaseapp.com",
  databaseURL: "https://use-it-or-lose-it.firebaseio.com",
  projectId: "use-it-or-lose-it",
  storageBucket: "",
  messagingSenderId: "3349860187"
}

const app = Firebase.initializeApp(config)
const db = app.database()

export default db
