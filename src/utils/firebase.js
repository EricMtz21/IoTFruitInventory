// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7vBSWKALNNaeAv6Zw1lyBy9yhd8boX9w",
  authDomain: "iot-firebasepy.firebaseapp.com",
  databaseURL: "https://iot-firebasepy-default-rtdb.firebaseio.com",
  projectId: "iot-firebasepy",
  storageBucket: "iot-firebasepy.appspot.com",
  messagingSenderId: "453805725875",
  appId: "1:453805725875:web:679644da7caef36be9f8c6"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export const db = getDatabase(appFirebase);