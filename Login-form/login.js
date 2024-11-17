
//--------------- Importing -----------------------------//
import {auth,
signInWithEmailAndPassword, 
onAuthStateChanged,
provider,
signInWithPopup } from "../firebase.js"

//--------------- Dom Inputs-----------------------------//
let loginEmail = document.getElementById('loginEmail')
let loginPassword = document.getElementById('loginPassword')
//-----------------login Button ---------------------//
let loginBtn = document.getElementById('loginBtn')
let signupLink = document.getElementById("signupLink")
let googleBtn = document.getElementById('googleBtn')

//------------------GO To Sinup page Finction --------------------//
let gotoSinupPage = () => {
  location.href = '../Signup-form/index.html'
}

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

        if(loginEmail.value,loginPassword.value){
            // page redirection
        setTimeout (()=>{
          location.href = "../Dashboard/dashboard.html"
        },500)
        }

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
    

//---------------------Signin with popup -----------------//

let googleSignIn = ()=> {

  signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

}


  //---------------------Event Listener -----------------//
  loginBtn.addEventListener('click' , login)
  signupLink.addEventListener('click'  , gotoSinupPage)
  googleBtn.addEventListener('click'  , googleSignIn)

 
