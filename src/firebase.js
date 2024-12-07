import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.FIREBASE-API-KEY,
    authDomain: process.env.FIREBASE-AUTH-DOMAIN,
    projectId: process.env.FIREBASE-PROJECT-ID,
    storageBucket: process.env.FIREBASE-STORAGE-BUCKET,
    messagingSenderId: process.env.FIREBASE-MESSAGING-SENDER-ID,
    appId: process.env.FIREBASE-APP-ID,
    measurementId: process.env.FIREBASE-MEASUREMENT-ID
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export default firebaseApp;
