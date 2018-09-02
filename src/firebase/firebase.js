
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyAs27TN7n2mRxQD5hTo5zUsNW-cxfPpjac",
    authDomain: "fir-login-7620f.firebaseapp.com",
    databaseURL: "https://fir-login-7620f.firebaseio.com",
    projectId: "fir-login-7620f",
    storageBucket: "fir-login-7620f.appspot.com",
    messagingSenderId: "1046287014535"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export {
  auth,
  db,
  firebase
};