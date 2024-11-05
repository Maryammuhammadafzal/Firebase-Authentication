
// //---------------- Replace the location to local host ----------------------- //
// location.href.replace("http://localhost:5500/index.html");

//--------------------------- importing ---------------------------------//
import { auth, createUserWithEmailAndPassword, onAuthStateChanged } from "../firebase.js";

//-------------------------- Get Dom Elements ---------------------------//
let signupbtn = document.getElementById("signup-btn");
let backtosignupbtn = document.querySelector(".back-btn");
<<<<<<< HEAD
let loginBtn = document.getElementById('login-btn')
=======
let loginBtn = document.getElementById('login')
>>>>>>> a2cd1ff12fc3879ebcf41561d9fa7a5b56b11a8b
let body = document.querySelector(".body");

  // get all inputs from Dom
  let firstName = document.getElementById("firstname");
  let lastName = document.getElementById("lastname");
  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let birthdate = document.getElementById("birth-date");
  let address = document.getElementById("address");
  
  // ----------------------- add a slide in pages ---------------------------//
 // move to login page
const login = () => {
    body.classList.add("slide"); 
}
loginBtn && loginBtn.addEventListener('click' , login);

//Function of back button 
const back = ()=> {
    body.classList.remove('slide');
}
backtosignupbtn && backtosignupbtn.addEventListener('click' , back);

// ---------------------------Add a loader -----------------------//
const loader = ()=> {
    body.innerHTML= `<div class="three col">
    <div class="loader" id="loader-4">
      <span></span>
      <span></span>
      <span></span>
    </div>`
}

<<<<<<< HEAD
//--------------------------- SignUp user-----------------------------//
const signupUser = ()=>{

   
    // if (email.value.trim() && password.value.trim()){
=======
const back = ()=> {
    body.classList.remove('slide');
}

const login = () => {
    body.classList.add("slide"); 
}

const signup = () => {
    body.classList.add("slide");
}

// SignUp user
const signupUser = ()=>{

    
    if (email.value.trim() && password.value.trim()){
>>>>>>> a2cd1ff12fc3879ebcf41561d9fa7a5b56b11a8b
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
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
                  title: "Signed up successfully",
                });

                setTimeout (()=>{
                    body.classList.add("slide"); 
                  },2000)
      
      console.log(user);
      
      // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
<<<<<<< HEAD

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

          case 'auth/email-already-in-use':
            //  if email is empty Email
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email is already registered",
        });


        email.classList += ' border-red';
            
            break;
        
            case 'auth/missing-password':
              //  if email is empty Email
          Swal.fire({
            icon: "error",
            title: "Null",
            text: "Password is required",
          });
  
  
          password.classList += ' border-red';
              
              break;

          default:
            console.log(errorCode);
            break;
        }
    });
    
// }

}
signupbtn && signupbtn.addEventListener('click' , signupUser);

//If user is currently signed in
const user = auth.currentUser;
=======
        console.log(errorMessage);
        
        // ..
    });
    
}

}



signupbtn && signupbtn.addEventListener('click' , signupUser);
signupbtn && signupbtn.addEventListener('click' , signup);
backtosignupbtn && backtosignupbtn.addEventListener('click' , back);
loginBtn && loginBtn.addEventListener('click' , login);
// // Event listener at signup button
// signupbtn && signupbtn.addEventListener("click", () => {
>>>>>>> a2cd1ff12fc3879ebcf41561d9fa7a5b56b11a8b

if (user) {
  console.log("User is signed in");
  
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/auth.user
  // ...
} else {
  console.log('No user is signed in');
  
  // No user is signed in.
}

//

onAuthStateChanged(auth, (user) => {
  if (user) {
    
    window.location.href = "../Dashboard/dashboard.html"

    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});




export {firstName , lastName , email , address}