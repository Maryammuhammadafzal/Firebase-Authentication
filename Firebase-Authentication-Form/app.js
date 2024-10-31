
// import Swal from './sweetalert2.min.js'
// importing
import { getAuth,createUserWithEmailAndPassword } from "./firebase.js";

const auth = getAuth();


let signupbtn = document.getElementById('signup-btn');
let backtosignupbtn = document.querySelector('.back-btn');
let body = document.querySelector('.body');

signupbtn && signupbtn.addEventListener('click' , ()=>{

    let firstName = document.getElementById('firstname');
    let lastName = document.getElementById('lastname');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let birthdate = document.getElementById('birth-date');
    let address = document.getElementById("address")

   let allInputs = [firstName, lastName, email, password, birthdate, address];

   const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    
    for(let i = 0; i < allInputs.length; i++){
            
        if(allInputs[i].value == ""){
            Swal.fire({
                icon: "error",
                title: "Null",
                text: "PLease fill the input ",
              });

              console.log(allInputs[i].value);
              
            
        }
        else{
            body.classList.add('slide');
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Signed up successfully"
              });
        }
    }


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    
    Swal.fire({
        icon: "error",
        title: "Error",
        text: `${errorMessage}`,
      });
  });

   

})





backtosignupbtn.onclick = function(){
    body.classList.remove('slide');
}



// console.log(firstName)
// signupbtn.onclick = function userInformation(){
   
    
// }    