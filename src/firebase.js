import firebase from 'firebase/app';
import 'firebase/firestore'; 

// referencing configuration values from .env.development
var firebaseConfig = {
  apiKey: 'AIzaSyB5ES6QZySm8LCY8qwMGlDgqOPLXwPxxLM',
  authDomain: 'mbensan-vue.firebaseapp.com',
  databaseURL: 'https://mbensan-vue.firebaseio.com',
  projectId: 'mbensan-vue',
  storageBucket: 'mbensan-vue.appspot.com',
  messagingSenderId: '402087768721',
  appId: '1:402087768721:web:5dd5b24f85a46ae48c0530',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
