// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo60oeFhp84AZmMTzAcoynuN8rNfGBi3o",
  authDomain: "feriowala-be71d.firebaseapp.com",
  projectId: "feriowala-be71d",
  storageBucket: "feriowala-be71d.appspot.com",
  messagingSenderId: "144556879580",
  appId: "1:144556879580:web:0382a3d1972f8955940e19",
  measurementId: "G-2MJEJKHP38"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth