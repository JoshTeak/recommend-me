import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/firestore";
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB99PXO0Rz0oogEJK01u12A2xdTX--4S_E",
	appId: "1:640992015187:web:79b4c23935898dc6ef27a6",
	authDomain: "recommend-me-5df42.firebaseapp.com",
	databaseURL: "https://recommend-me-5df42-default-rtdb.firebaseio.com",
	measurementId: "G-KP86MF124R",
	messagingSenderId: "640992015187",
	projectId: "recommend-me-5df42",
	storageBucket: "recommend-me-5df42.appspot.com"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
