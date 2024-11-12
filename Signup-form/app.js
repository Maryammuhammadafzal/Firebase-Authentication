//--------------- Importing -----------------------------//
import {auth , createUserWithEmailAndPassword, deleteDoc, deleteField ,db, collection, addDoc, getDocs, doc, setDoc, Timestamp} from "../firebase.js"


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


        ///---------------------Firestore work ----------------//

        //Add data
try {
  const docRef = await addDoc(collection(db, "users"), {
    fullName: `${signupFullName.value}`,
    phoneNo : signupPhoneNo.value,
    address : signupAddress.value
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

//Read data
try {
  const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
} catch (e) {
  console.error("Error getting document: ", e);
}

//Set data
try {
  await setDoc(doc(db, "user", doc.id), {
   genderCondition : `${signupGender[0].isChecked ? "Male" : "Female"}`
  });
  
} catch (e) {
  console.error("Error setting document: ", e);
}


//Set data
try {
  const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date()),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
};
await setDoc(doc(db, "user", doc.id), docData);
  
} catch (e) {
  console.error("Error setting document: ", e);
}

//Delete Data
try {
  await deleteDoc(doc(db, "cities", "DC"));
  
} catch (e) {
  console.error("Error setting document: ", e);
}

//Delete Data feild
const docRef = doc(db, 'user', doc.id);

try {

// Remove the 'capital' field from the document
await updateDoc(docRef, {
  fullName: deleteField()
});
  
} catch (e) {
  console.error("Error setting document: ", e);
}


}


//---------------------Event Listener -----------------//
signupBtn && signupBtn.addEventListener('click' , signup)



