

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
getAuth, 
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged, 
signOut, 
sendPasswordResetEmail, 
sendEmailVerification, 
updateProfile,
GoogleAuthProvider,
signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";




// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBkI7amBzoGhI_AyBru41GGnAHH8-UIhdY",
   authDomain: "authentication-a5523.firebaseapp.com",
   projectId: "authentication-a5523",
   storageBucket: "authentication-a5523.firebasestorage.app",
   messagingSenderId: "17556133047",
   appId: "1:17556133047:web:8af2cdf0f5fad4e832a932"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);



export { auth, 
createUserWithEmailAndPassword, 
signInWithEmailAndPassword, 
onAuthStateChanged, 
signOut, 
sendPasswordResetEmail, 
sendEmailVerification, 
updateProfile,
provider,
signInWithPopup,

 } 