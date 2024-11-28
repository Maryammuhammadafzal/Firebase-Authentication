//--------------- Importing -----------------------------//
import {auth , createUserWithEmailAndPassword,db, collection, Timestamp, onAuthStateChanged , setDoc, doc} from "../firebase.js"

let uid = null;
//--------------- Dom Inputs-----------------------------//
let signupFullName = document.getElementById('signupFullName')
let signupEmail = document.getElementById('signupEmail')
let signupPassword = document.getElementById('signupPassword')
let signupPhoneNo = document.getElementById('signupPhoneNo')
let signupAddress = document.getElementById('signupAddress')
let signupGender = document.getElementsByName("gender");
let signinLink = document.getElementById('signinLink')

//------------------GO To Sinup page Finction --------------------//
let gotoSigninPage = () => {
  window.location.href = '../Login-form/login.html'
}
signinLink && signinLink.addEventListener('click'  , gotoSigninPage)

//-----------------Signup Button ---------------------//
let signupBtn = document.getElementById('signupBtn')


//------------------signup Finction --------------------//
let signup = async() => {


      createUserWithEmailAndPassword(auth, signupEmail.value , signupPassword.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);
          
          
          //  redirect to dashboard
          onAuthStateChanged(auth, async(user) => {
            if (user) {
               uid = user.uid;
                 
              ///---------------------Firestore work ----------------//
              
              //Add data
              try {
                await setDoc(doc(db, "users", uid), {
                  email : signupEmail.value,
                  fullName: `${signupFullName.value}`,
                  phoneNo : signupPhoneNo.value,
                  address : signupAddress.value,
                  genderCondition : `${signupGender[0].isChecked ? "Male" : "Female"}`,
                  dateExample: Timestamp.fromDate(new Date())
                });
                localStorage.setItem("uid" , uid)
                console.log("Document written with ID: ", uid);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              
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

              // redirect to dashboard
              setTimeout (()=>{
                location.href = "../Dashboard/dashboard.html"
              },3000)
            }
           
          });
          

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
      signupBtn && signupBtn.addEventListener('click' , signup)
     export {uid}
      