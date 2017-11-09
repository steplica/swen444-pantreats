import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCFr2V5mjFFDLFcuK3ODv-ek64zeC77qAg',
  authDomain: 'pantreats-test.firebaseapp.com',
  databaseURL: 'https://pantreats-test.firebaseio.com',
  projectId: 'pantreats-test',
  storageBucket: 'pantreats-test.appspot.com',
  messagingSenderId: '26263586970',
};

const app = Firebase.initializeApp(config);
const db = app.database();

export default db;
