import Firebase from 'firebase'

let config = {
  apiKey: "AIzaSyDfxRhV6rSmLkL4VQrLaBFrZfDLhC5rX9E",
  authDomain: "pantreats.firebaseapp.com",
  databaseURL: "https://pantreats.firebaseio.com",
  projectId: "pantreats",
  storageBucket: "",
  messagingSenderId: "3349860187"
}

const app = Firebase.initializeApp(config)
const db = app.database()

export default db
