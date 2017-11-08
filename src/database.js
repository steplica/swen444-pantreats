import Firebase from 'firebase'

let config = {
  apiKey: "AIzaSyCFr2V5mjFFDLFcuK3ODv-ek64zeC77qAg",
  authDomain: "pantreats-test.firebaseapp.com",
  databaseURL: "https://pantreats-test.firebaseio.com",
  projectId: "pantreats-test",
  storageBucket: "pantreats-test.appspot.com",
  messagingSenderId: "262635869705"
};

const app = Firebase.initializeApp(config);
const db = app.database();

export default db
