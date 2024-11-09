//--------------- Importing -----------------------------//
import {auth , createUserWithEmailAndPassword } from "../firebase.js"

//--------------- Dom Inputs-----------------------------//
let signupEmail = document.getElementById('signupEmail')
let signupPassword = document.getElementById('signupPassword')

//-----------------Signup Button ---------------------//
let signupBtn = document.getElementById('signupBtn')


//------------------signup Finction --------------------//
let signup = () => {


      createUserWithEmailAndPassword(auth, signupEmail.value , signupPassword.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);
          
          //Succesfully signed in
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
            title: "Register successfully",
          });

          // page redirection
        setTimeout (()=>{
          location.href = "../Login-form/login.html"
        },3000)

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          
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


      signupEmail.classList += ' border-red';
          
          break;
      
          case 'auth/missing-password':
            //  if password is empty 
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Password is required",
        });


        signupPassword.classList += ' border-red';
            
            break;

        default:
          console.log(errorCode);
          break;
      }

        });

}
    
//---------------------Event Listener -----------------//
signupBtn.addEventListener('click' , signup)