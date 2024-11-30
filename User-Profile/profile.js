import {
  auth,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  signOut,
  db,
  onSnapshot,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  deleteDoc,
  deleteField,
  query,
  where,
} from "../firebase.js";

let uid = localStorage.getItem("uid");
let data;
// DOM elements ka reference
let profileImage = document.getElementById("profileImage")
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userVerify = document.getElementById("userVerify");
const userAddress = document.getElementById("userAddress");
const userFullName = document.getElementById("userFullName");
const userDis = document.getElementById("userDis");
console.log(userFullName);

// contact link
let instagramLink = document.getElementById("instagramLink");
let facebookLink = document.getElementById("facebookLink");
let twitterLink = document.getElementById("twitterLink");

// ------------Firestore--------------------//
//Read data
const getUserByUIDField = async () => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      data = docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }

  localStorage.setItem("email", data.email);
  localStorage.setItem("phone", data.phone);
  localStorage.setItem("address", data.address);
  localStorage.setItem("fullName", data.fullName);
  localStorage.setItem("userName", data.fullName);

  // Update DOM elements
  userEmail.innerText = localStorage.getItem('email')
  userPhone.innerText = localStorage.getItem('phone')
  userAddress.innerText = localStorage.getItem('address')
  userFullName.innerText = localStorage.getItem('fullName')
  userName.innerText = localStorage.getItem('userName')
};
getUserByUIDField();

//   verifyEmail
document.getElementById("verifyEmail").addEventListener("click", async () => {
  sendEmailVerification(auth.currentUser).then(() => {
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
      title: "Email Has Been Sent",
    });
    userVerify.innerHTML = "Yes";
  });
});

//   update profile

document.getElementById("updateBtn").addEventListener("click", async () => {
  let updatedName;
  let updatedDis;
  const { value: formValues } = await Swal.fire({
    title: "Update profile",
    html: `
    <input id="swal-input1" class="swal2-input" placeholder="${userName.innerText}" >
    <input id="swal-input2" class="swal2-input" placeholder="${userDis.innerText}">
  `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (updatedName = localStorage.setItem(
          "userName",
          document.getElementById("swal-input1").value
        )),
        (updatedDis = localStorage.setItem(
          "updatedDis",
          document.getElementById("swal-input2").value
        )),
      ];
    },
  });
  if (formValues) {
    Swal.fire(JSON.stringify(formValues));
    userName.innerText = localStorage.getItem("updatedName");
    userDis.innerText = localStorage.getItem("updatedDis");
  }
});

// update image

profileImage && profileImage.addEventListener("click" , async()=>{
  const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: "Image URL",
    inputPlaceholder: "Enter the image URL"
  });

updateProfile(auth.currentUser, {

          photoURL: `${url}`
        })
        .then(() => {
      localStorage.setItem('profile-img' , url)
      profileImage.src =  localStorage.getItem('profile-img');
    })
    .catch(error => {
      console.log(error)
    })
})




//  -------facebook url-------------//
facebookLink.addEventListener( 'click' ,async(event)=>{
  event.preventDefault()
  const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: "Facebook Profile URL",
    inputPlaceholder: "Enter the URL"
  });

   // facebook url pattern
   const facebookUrlPattern = /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/;

   if (!facebookUrlPattern.test(url)) {
    // Show error if the URL is invalid
    Swal.fire({
      icon: "error",
      title: "Invalid URL",
      text: "Please enter a valid Facebook profile URL.",
    });
    return; 
  }

updateProfile(auth.currentUser, {

          photoURL: `${url}`
        })
        .then(() => {
      localStorage.setItem('facebookLink' , url)
      let linkTag = document.getElementsByClassName('link')[0];
      linkTag.href =  localStorage.getItem('facebookLink');
      linkTag.title =  localStorage.getItem('facebookLink');
    })
    .catch(error => {
      console.log(error)
    })
})
// ----------twtter url----------//
twitterLink.addEventListener( 'click' ,async(event)=>{
  event.preventDefault()
  const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: "URL",
    inputPlaceholder: "Enter the URL"
  });
 // twitter url pattern
  const twitterUrlPattern = /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/;

  if (!twitterUrlPattern.test(url)) {
    // Show error if the URL is invalid
    Swal.fire({
      icon: "error",
      title: "Invalid URL",
      text: "Please enter a valid Facebook profile URL.",
    });
    return; 
  }

updateProfile(auth.currentUser, {

          photoURL: `${url}`
        })
        .then(() => {
      localStorage.setItem('twitterLink' , url)
      let linkTag = document.getElementsByClassName('link')[1];
      linkTag.href =  localStorage.getItem('twitterLink');
      linkTag.title =  localStorage.getItem('twitterLink');
    })
    .catch(error => {
      console.log(error)
    })
})
// ----- Instagram url --------//
instagramLink.addEventListener( 'click' ,async(event)=>{
  event.preventDefault()
  const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: "URL",
    inputPlaceholder: "Enter the URL"
  });

 // Instagram url pattern
  const instagramUrlPattern = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/;
  
  if (!instagramUrlPattern.test(url)) {
    // Show error if the URL is invalid
    Swal.fire({
      icon: "error",
      title: "Invalid URL",
      text: "Please enter a valid Facebook profile URL.",
    });
    return; 
  }

updateProfile(auth.currentUser, {

          photoURL: `${url}`
        })
        .then(() => {
      localStorage.setItem('instagramLink' , url)
      let linkTag = document.getElementsByClassName('link')[2];
      linkTag.href =  localStorage.getItem('instagramLink');
      linkTag.title =  localStorage.getItem('instagramLink');
    })
    .catch(error => {
      console.log(error)
    })
})

// sigh out
let logoutBtn = document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        window.location.href = '../Login-form/login.html'
        console.log("user has been log out");
      })
      .catch((error) => {
        console.log(error);
      });
  });
  // Swal.fire({

  //   title: "PopOutTitle",
  //     text: "Your Name:",
  //     input: "text",
  //     inputValue: userName.innerText,
  //     inputPlaceholder: "Enter your name",
  //     text: "Your Name:",
  //     input: "text",
  //     inputValue: userName.innerText,
  //     inputPlaceholder: "Enter your name",
  //    showCancelButton: true

  
  // })
  // .then((result) => {
  //   if (result.isDismissed) return;
  //   if (result.value === "") {
  //     Swal.showValidationMessage("You need to write something!");
  //     return false;
  //   }
  //     let userName = document.getElementById("userName");
  //     userName.innerText = result.value || "Unknown";

  //     updateProfile(auth.currentUser, {
  //       displayName: `${userName.innerText}`,
  //     })
  //       .then(() => {
  //         console.log("update");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });