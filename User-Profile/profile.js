
import {auth } from '../firebase.js'
import {firstName, lastName , email , address } from '../Signup-Form/app.js';

//Dom elements
let profileName = document.getElementById('profile-name');
let profileEmail = document.getElementById('profile-email');

let profileGender = document.getElementById('profile-phone');
let profileAddress = document.getElementById('profile-address');

const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}
