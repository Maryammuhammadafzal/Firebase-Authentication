//--------------- Importing -----------------------------//
import {auth , createUserWithEmailAndPassword,db, collection, Timestamp, onAuthStateChanged} from "../firebase.js"


//--------------- Dom Inputs-----------------------------//
let signupFullName = document.getElementById('signupFullName')
let signupEmail = document.getElementById('signupEmail')
let signupPassword = document.getElementById('signupPassword')
let signupPhoneNo = document.getElementById('signupPhoneNo')
let signupAddress = document.getElementById('signupAddress')
let signupGender = document.getElementsByName("gender");



//-----------------Signup Button ---------------------//
let signupBtn = document.getElementById('signupBtn')


//------------------signup Finction --------------------//
let signup = async() => {


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
          //  redirect to dashboard
          onAuthStateChanged(auth, async(user) => {
            if (user) {
              const uid = user.uid;
                   ///---------------------Firestore work ----------------//
    
            //Add data
              try {
                const docRef = await setDoc(doc(db, "user", uid), {
                  fullName: `${signupFullName.value}`,
                  phoneNo : signupPhoneNo.value,
                  address : signupAddress.value,
                  genderCondition : `${signupGender[0].isChecked ? "Male" : "Female"}`,
                  dateExample: Timestamp.fromDate(new Date())
                });
                console.log(docRef);
                
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              // page redirection
              setTimeout (()=>{
                location.href = "../Dashboard/dashboard.html"
              },500)
              // ...
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
      
      
     
      