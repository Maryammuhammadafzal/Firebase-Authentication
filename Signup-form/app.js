
// //---------------- Replace the location to local host ----------------------- //
// location.href.replace("http://localhost:5500/index.html");

//--------------------------- importing ---------------------------------//
import { auth, createUserWithEmailAndPassword } from "../firebase.js";

// Dom Elements
let signupbtn = document.getElementById("signup-btn");
let backtosignupbtn = document.querySelector(".back-btn");
let body = document.querySelector(".body");

  // get all inputs from Dom
  let firstName = document.getElementById("firstname");
  let lastName = document.getElementById("lastname");
  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let birthdate = document.getElementById("birth-date");
  let address = document.getElementById("address");



const signupUser = ()=>{

   if (email.value.trim() && password.value.trim()){
     
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;  
      console.log(user);
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      
      // ..
    });

    }

 

}

signupbtn && signupbtn.addEventListener('click' , signupUser);

// // Event listener at signup button
// signupbtn && signupbtn.addEventListener("click", () => {

  
//   email = email.value.toString();
//   password = password.value.toString();

//   //  Make an array of all inputs
//   let allInputs = [firstName, lastName, email, password, birthdate, address];

//   // promise of getAuth function and it's values
//   createUserWithEmailAndPassword(auth, 'example@gmail.com', 'password#123')
//     //then start
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;

//       //if inside the else statement start...
//       if (allInputs[i].value.trim() && email.value.toLowerCase()) {
//         //slide the signup page to login
//         body.classList.add("slide");

//         //sweet alert start.....
//         // fire an alert if successfully login
//         const Toast = Swal.mixin({
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//           },
//         });
//         Toast.fire({
//           icon: "success",
//           title: "Signed up successfully",
//         });
//         //sweet alert end.....
//       }
//       //if inside the else statement ...
//     })
//     //then end .....

//     //Catch start ....
//     .catch((error) => {

//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode);
//       console.log(errorMessage);


//       //for loop start....
//       // iterate the loop over inputs values
//       for (let i = 0; i < allInputs.length; i++) {
//         //if statement start.....
//         // check if input values are empty
//         if (allInputs[i].value == "") {
//           //Sweet alert start....
//           Swal.fire({
//             icon: "error",
//             title: "Null",
//             text: `${allInputs[i].getAttribute('name')} is required`,
//           });
//           //sweet alert end...

//           allInputs[i].classList.add = " border-red";
//         }
//         //if statement end.....

//         //else statement start.....
//         else {
//         }
//         //ielse statement end.....
//       }
//       //for loop end....

//       //if statement start....
//       // checkiing email error
//       if (errorCode == "auth/invalid-email") {
//         //if email is empty Email
//         Swal.fire({
//           icon: "error",
//           title: "Null",
//           text: "Email is required",
//         });

//         email.classList.add = " border-red";
//       }
//       // 1st nested if start....
//       // Invalid Password
//       else if (errorCode == "auth/missing-password") {
//         Swal.fire({
//           icon: "error",
//           title: "Null",
//           text: "password is required",
//         });
//         password.classList.add = " border-red";
//       }
//       // 1st nested if end....

//       let passwordValue = password.value;
//       for (let j = 0; j < passwordValue; j++) {
//         // 2nd nested if start....
//         //If password has not special character
//         let specialChar = Array.from(`!@#$%^&*()-_=+~:;",.'/?><.}{[]|+*}`);
//         for (let i = 0; i < specialChar.length; i++) {
//           if (passwordValue[i] != specialChar[i]) {
//             Swal.fire({
//               icon: "error",
//               title: "Weak Password",
//               text: "PLease make a strong password",
//             });
//           }
//         }
//         // 2nd nested if end....

//         // 3rd nested if start....
//         //If password doesnot contain numbers
//         let numbers = Array.from(`1234567890`);
//         for (let i = 0; i < numbers.length; i++) {
//           if (passwordValue[i] != numbers[i]) {
//             Swal.fire({
//               icon: "error",
//               title: "Weak Password",
//               text: "PLease add numbers in your password",
//             });
//           }
//         }
//         // 3rd nested if end....

//         // 4th nested if start....
//         //If password doesnot contain Capital lettors
//         let capitalChar = Array.from(
//           `abcdefghigklmnopqrstuvwxyz`.toUpperCase()
//         );
//         for (let i = 0; i < capitalChar.length; i++) {
//           if (passwordValue[i] != capitalChar[i]) {
//             Swal.fire({
//               icon: "error",
//               title: "Weak Password",
//               text: "Password must contain capital letters",
//             });
//           }
//         }
//         // 4th nested if end....
//       }
//       //password loop end....
//     });
//   // catch end....

//   // backtosignupbtn.onclick = function(){
//   //     body.classList.remove('slide');
//   // }
// });

// // console.log(firstName)
// // signupbtn.onclick = function userInformation(){

// // }
