
//--------------- Importing -----------------------------//
import {auth , signInWithEmailAndPassword, onAuthStateChanged } from "../firebase.js"

//--------------- Dom Inputs-----------------------------//
let loginEmail = document.getElementById('loginEmail')
let loginPassword = document.getElementById('loginPassword')

//-----------------login Button ---------------------//
let loginBtn = document.getElementById('loginBtn')


//------------------login Finction --------------------//
let login = () => {


  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
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
            title: "Login successfully",
          });

          // page redirection
        setTimeout (()=>{
          location.href = "../Dashboard/dashboard.html"
        },2000)

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


    signupEmail.classList += ' border-red';
        
        break;
    
        case 'auth/missing-password':
          //  if passwordis empty 
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password is required",
      });


      signupPassword.classList += ' border-red';
          
          break;

      default:
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${errorCode}`,
        });
        break;
    }

    
  });

}
    
//---------------------Event Listener -----------------//
loginBtn.addEventListener('click' , login)

// If user is already login so change the state

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

    console.log(uid);
    setTimeout (()=>{
      location.href = "../Dashboard/dashboard.html"
    },3000)
    
  } 
});
