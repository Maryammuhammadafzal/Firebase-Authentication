
import { auth, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail  } from "../firebase.js";


let loginEmail = document.getElementById("login-email")
let loginPassword = document.getElementById("login-password")

let signinBtn = document.querySelector('.login-btn')
let forgetPassword = document.getElementById('forgot-password')

const loginUser = ()=> {
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Login successfully",
      });
    setTimeout (()=>{
      location.href = "../Dashboard/profile.html"
    },3000)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

      // Switch statements on error
      switch (errorCode) {
        case 'auth/missing-email':
          //  if email is empty Email
      Swal.fire({
        icon: "error",
        title: "Null",
        text: "Email is required",
      });

      break;

        case 'auth/invalid-email':
          //  if email is empty Email
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email is Incorrect",
      });


      email.classList += ' border-red';
          
          break;
      
          case 'auth/missing-password':
            //  if email is empty Email
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Password is required",
        });


        password.classList += ' border-red';
            
            break;

        default:
          console.log(errorCode);
          break;
      }
  });


}
signinBtn && signinBtn.addEventListener('click' , loginUser);


const forgotPassword = ()=>{

  sendPasswordResetEmail(auth, loginEmail.value)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `${errorCode}`,
    });
  });
}

forgetPassword.addEventListener('click', forgotPassword)
//


onAuthStateChanged(auth, (user) => {
  if (user) {
    
    window.location.href = "../Dashboard/dashboard.html"

   // const uid = user.uid;
    // ...
  } //else {
  //   // User is signed out
  //   // ...
  // }
});
