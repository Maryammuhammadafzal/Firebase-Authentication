import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  Timestamp,
  deleteDoc,
  deleteField,
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  update,
  remove
} from '../firebase.js'

let uid = localStorage.getItem('uid')

let postTitle = document.getElementById('postTitle')
let postDis = document.getElementById('postDis')
let postImage = document.getElementById('postImage')

let createPost = document.getElementById('createPost')
let editContainer = document.getElementById('editContainer')
let allPosts = document.getElementById('allPosts')
let modal = document.getElementById('modal')
let modalTitle = document.getElementById('modalTitle')
let modalDis = document.getElementById('modalDis')
let modalFile = document.getElementById('modalFile')
let postCount = 1
console.log(allPosts)

// Close Modal When Clicking Outside of Modal Content
window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none' // Hide modal
  }
})
// Close Modal When Clicking on close button
window.closeModal = document.getElementById('closeModal').addEventListener('click', () => {
  modal.style.display = 'none' // Hide modal
})

let uploadImage = () =>{
  let imageFile = modalFile.files[0] 
  console.log(imageFile);
}
modalFile && modalFile.addEventListener('change' , uploadImage)

// Add the post
let createdPost = async () => {
  modal.style.display = 'flex'

  ///---------------------Firebase Database work ----------------//
  let addData = () => {
    window.submitPost = document.getElementById('submitPost')
    window.submitPost.addEventListener('click', () => {
      const db = getDatabase()
      set(ref(db, 'posts/' + uid), {
        usertitle: modalTitle.value,
        discription: modalDis.value,
        post_picture: uploadImage()
      })
        .then(() => {
          //Succesfully creat post
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
            title: 'Post Created Successfully'
          })

          modal.style.display = 'none'
          // loader
          // window.location.reload()
          showAllPosts()
        })
        .catch(error => {
          console.log(error)
          Swal.fire({
            title: 'Error',
            text: 'Unsuccessful',
            icon: 'error'
          })
        })
      // window.location.reload()
    })
  }

  addData()
 
}
createPost && createPost.addEventListener('click', createdPost);

// Show All Posts
let showAllPosts = () => { 

  const dbRef = ref(getDatabase())
  get(child(dbRef, `posts/${uid}`)).then(snapshot => {
      if (snapshot.exists()) {
        let getPostTitle = snapshot.child('usertitle').val();
        let getPostDiscription = snapshot.child('discription').val();
        let getPostImage = snapshot.child('post_picture').val();
      
        
          allPosts.innerHTML += `<div class="row">
      <div class="col-lg-12">
          <div class="card mb-4">
              <div class="card-body">
                  <img src="${getPostImage}"
                      id="postImage" alt="image" class="img-fluid"
                      style="width: 100%; height: 250px; object-fit: cover;">
                      <div class="d-flex justify-content-center my-2 py-1 w-100">
                      <div class="postContent w-75">
                          <h5 class="my-3" id="postTitle">${getPostTitle}</h5>
                          <p class="text-muted mb-1" id="postDis">${getPostDiscription}</p>
                      </div>

                      <div class="postbuttons">
                          <button type="button" data-mdb-button-init data-mdb-ripple-init
                          class="btn btn-outline-primary ms-1" onclick="editPost(this)" id="editBtn">Edit</button>
                      <button type="button" data-mdb-button-init data-mdb-ripple-init
                          class="btn btn-outline-primary ms-1" onclick="deletePost(this)" id="deleteBtn">Delete</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`
     
      } else {
        allPosts.innerHTML = 'No data available'
      }
    })
    .catch(error => {
      console.error(error)
    })
}

showAllPosts()
