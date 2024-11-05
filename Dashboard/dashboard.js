
import {auth , signOut, onAuthStateChanged } from "../firebase.js"

// document.querySelector('.edit-btn').addEventListener('click', () => {
//       alert('Edit profile feature coming soon!');
//     });
    

let logoutBtn = document.getElementById("logout")

const logout = ()  => {

signOut(auth).then(() => {
  
  
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
    title: "log out successfully",
  });

}).catch((error) => {
  console.log(errorrror);
  
});

}

logoutBtn.addEventListener('click' , logout);

let profileimage = document.getElementById("profile-img");
let dropdownBox = document.getElementById('dropdown-box')
const showProfileBox = ()=> {
  
  dropdownBox.style.display = "block"
  dropdownBox.innerHTML = `
  <ul>
              <li type="button" id="id"> <i class="fa-duotone fa-solid fa-user"></i> User Name</li>
              

              <li type="button" id="user-profile">Profile</li>
              <li type="button">Setting</li>
              <li type="button">Privacy&Security</li>
              <li type="button">Logout</li>
            </ul>`

            let userProfile = document.getElementById("user-profile");
            let profilePage = ()=>{
              window.location.href = "../User-Profile/profile.html"
              console.log(userProfile);
               
            }
            userProfile && userProfile.addEventListener('click' ,profilePage);
}
profileimage.addEventListener('click' , showProfileBox);


onAuthStateChanged(auth, (user) => {
  if (!user) {
    
    window.location.href = "../Login-Form/login.html"

    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});