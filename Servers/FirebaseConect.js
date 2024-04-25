import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDW3JgrUjaKKyuPP_E18NGJh0bI6V_nwYw",
  authDomain: "listbsk.firebaseapp.com",
  projectId: "listbsk",
  storageBucket: "listbsk.appspot.com",
  messagingSenderId: "474448125167",
  appId: "1:474448125167:web:0e2c6e72c2a26d89138f1a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
