// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCaCmVSZaDrCOt4WxIhDWxwF7xGae-X2o",
  authDomain: "uploadfile-92b82.firebaseapp.com",
  databaseURL: "https://uploadfile-92b82-default-rtdb.firebaseio.com",
  projectId: "uploadfile-92b82",
  storageBucket: "uploadfile-92b82.appspot.com",
  messagingSenderId: "143182469488",
  appId: "1:143182469488:web:1801d8d62bb670faab17b5",
  measurementId: "G-B17MCTSFZD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);
