import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB99PXO0Rz0oogEJK01u12A2xdTX--4S_E",
  authDomain: "recommend-me-5df42.firebaseapp.com",
  databaseURL: "https://recommend-me-5df42-default-rtdb.firebaseio.com",
  projectId: "recommend-me-5df42",
  storageBucket: "recommend-me-5df42.appspot.com",
  messagingSenderId: "640992015187",
  appId: "1:640992015187:web:79b4c23935898dc6ef27a6",
  measurementId: "G-KP86MF124R"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
