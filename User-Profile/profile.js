import {
  auth,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  signOut,
  db,
collection,
addDoc,
getDocs,
doc,
setDoc,
Timestamp,
deleteDoc,
deleteField 
} from '../firebase.js'

// DOM elements ka reference
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const userVerify = document.getElementById('userVerify');
const userAddress = document.getElementById('userAddress');
const userFullName = document.getElementById('userFullName');


// Firebase Auth state change listener
 onAuthStateChanged(auth, user => {
  if (user) {
    // User logged in
    const uid = user.uid;
    console.log(uid);

    // DOM elements ko update karna
    userEmail.innerText = user.email ? user.email : 'No Email';
    userPhone.innerText = user.phoneNumber ? user.phoneNumber : 'No Phone Number';  // phone.value ka use mat karo, agar phone number firebase se aa raha ho toh
    userVerify.innerText = user.emailVerified ? 'Yes' : 'No'; 
    userAddress.innerText = user.address ? user.address : 'No Address'; // Agar address hai toh use karen, warna 'No Address'
    userFullName.innerText = user.displayName ? user.displayName : 'No Full Name';
  
    let getUserDetails = async()=>{

      // ------------Firestore--------------------//
      //Read data
try {
  const querySnapshot = await getDocs(collection(db, "users" ));
querySnapshot.forEach((doc) => {
  console.log(doc.id);
  
  console.log(`${doc.id} => ${doc.data()}`);
});
} catch (e) {
  console.error("Error getting document: ", e);
}

    }

    getUserDetails()
  
  } else {
    // User logged out
    location.href = "../Login-form/login.html";
    console.log('User is logged out');
    // Yahan aap kuch action le sakte hain jaise user ko login page par redirect karna
  }
});

 //   verifyEmail
 document.getElementById('verifyEmail').addEventListener('click', async() => {
  sendEmailVerification(auth.currentUser).then(() => {
    //Succesfully signed in
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Email Has Been Sent'
    })
  })



})

 //   update profile

 document.getElementById('updateBtn').addEventListener('click', () => {
   
   Swal.fire({
          title: 'PopOutTitle',
          text: 'Your Name:',
          input: 'text', // 'input' in SweetAlert2
          showCancelButton: true,
          inputValue: userName.innerText, // Default value for input field
          inputPlaceholder: 'Enter your name',
          animation: 'slide-from-top'
        }).then((result) => {
          if (result.isDismissed) return; // If the user pressed 'Cancel'
          if (result.value === '') {
            Swal.showValidationMessage('You need to write something!');
            return false;
          }
          let userName = document.getElementById('userName')
          userName.innerText = result.value || 'Unknown';
          
          updateProfile(auth.currentUser, {

            displayName: `${userName.innerText}`
    })
      .then(() => {
        console.log('update')
      })
      .catch(error => {
        console.log(error)
      })
  })
  
        });

// document.getElementById("profileImg").addEventListener("click" , async()=>{
//   const { value: url } = await Swal.fire({
//     input: "url",
//     inputLabel: "URL address",
//     inputPlaceholder: "Enter the URL"
//   });
 

// updateProfile(auth.currentUser, {

//           photoURL: `${url}`
//   })
//     .then(() => {
//       console.log('update')
//     })
//     .catch(error => {
//       console.log(error)
//     })
// })

    // sigh out
    let logoutBtn = document
      .getElementById('logoutBtn')
      .addEventListener('click', () => {
        signOut(auth)
          .then(() => {
            console.log('user has been signed out')
          })
          .catch(error => {
            console.log(error)
          })
      })