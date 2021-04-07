var firebase = require('firebase');
require('firebase/auth');

//Conexion a Firebase
const config = {
  apiKey: "AIzaSyAFyghYpUuvhCd2e1p8U59kdFmyPE4JPsQ",
  authDomain: "bogota-cf976.firebaseapp.com",
  databaseURL: "https://bogota-cf976.firebaseio.com",
  projectId: "bogota-cf976",
  storageBucket: "bogota-cf976.appspot.com",
  messagingSenderId: "1023739623592",
  appId: "1:1023739623592:web:278cf89f064d430be92a9d",
  measurementId: "G-BK6SS7LRWJ"
}

//if(!firebase.apps.length){
var firebaseConnect = firebase.initializeApp(config);

//}else{
//    firebase.app();  
//}

module.exports = firebaseConnect;