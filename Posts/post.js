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
    getDatabase, ref, set
    ,child , get , update , remove

} from "../firebase.js";

let uid = localStorage.getItem("uid")

let postTitle = document.getElementById('postTitle');
let postDis = document.getElementById('postDis');
let postImage = document.getElementById('postImage');

let createPost = document.getElementById('createPost')
let editContainer = document.getElementById('editContainer')
let allPosts = document.getElementById('allPosts')
let modal = document.getElementById('modal')
let modalTitle = document.getElementById('modalTitle')
let modalDis = document.getElementById('modalDis')
let modalFile = document.getElementById('modalFile')

console.log(allPosts);

// Close Modal When Clicking Outside of Modal Content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"; // Hide modal
    }
  });

// // show and close the posts
// let createPost = document.getElementById('createPost')
// createPost.addEventListener('click', () => {
//     postContainer.style.display = 'block'

// })

// let closePost = document.getElementById('closePost')
// closePost.addEventListener('click', () => {
//     postContainer.style.display = 'none'

// })

// Show All Posts
let showAllPosts = ()=>{

    allPosts.innerHTML = 
    `<div class="row">
                    <div class="col-lg-12">
                        <div class="card mb-4">
                            <div class="card-body">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    id="postImage" alt="image" class="img-fluid"
                                    style="width: 100%; height: 250px; object-fit: cover;">
                                    <div class="d-flex justify-content-center my-2 py-1 w-100">
                                    <div class="postContent w-75">
                                        <h5 class="my-3" id="postTitle">John Smith</h5>
                                        <p class="text-muted mb-1" id="postDis">Full Stack Developer</p>
                                    </div>

                                    <div class="postbuttons">
                                        <button type="button" data-mdb-button-init data-mdb-ripple-init
                                        class="btn btn-outline-primary ms-1" id="editBtn">Edit</button>
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                                        class="btn btn-outline-primary ms-1" id="deleteBtn">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
}

showAllPosts()

// Add the post
let createdPost =  async() => {
    
    modal.style.display = "flex" 
    

     ///---------------------Firestore work ----------------//
         let AddData = ()=>{
            try{
         
                let writeUserData = (uid, title, discription, imageUrl) => {
                 let title =  modalTitle.value 
                 let discription =  modalDis.value 
                 let imageUrl =  modalFile.value 
               const db = getDatabase();
               set(ref(db, 'posts/' + uid), {
                 usertitle: title,
                 discription: discription,
                 post_picture : imageUrl
               });
             }
            }
            catch(error){
               console.log(error)
            }
         }    
    
      
              //Add data
            //   try {
            //     await setDoc(doc(db, "posts", uid), {
                 
            //     });

            //     //Succesfully signed in
            //     const Toast = Swal.mixin({
            //       toast: true,
            //       position: "top-end",
            //       showConfirmButton: false,
            //       timer: 3000,
            //       timerProgressBar: true,
            //       didOpen: (toast) => {
            //         toast.onmouseenter = Swal.stopTimer;
            //         toast.onmouseleave = Swal.resumeTimer;
            //       },
            //     });
            //     Toast.fire({
            //       icon: "success",
            //       title: "Register successfully",
            //     });

            //     console.log("Document written with ID: ", uid);
            //   } catch (e) {
            //     console.error("Error adding document: ", e);
            //   }
              
              
}
createPost && createPost.addEventListener('click', createdPost)


// try{
//     let postTitle = document.getElementById('post-title');
//     let postDiscription = document.getElementById('post-discription');

//     let posts = document.getElementById('posts');

  
// if (true){
//         posts.innerHTML += `<div class="card  mt-3" id="post-card">
//         <div class="card-header fontStyle">
//         @Posts
//         </div>
//         <div class="card-body ">
//         <h5 class="card-title fontStyle">${postTitle.value}</h5>
//         <p class="card-text fontStyle">${postDiscription.value}</p>
//         </div>
//         <div class="p-3">
//         <button type="button" id="editpostBtn" class="btn btn-secondary mt-4 fontStyle ">Edit</button>
//         <button type="button" id="remove" class="btn btn-danger mt-4 fontStyle ">Delete</button>
//         </div>
//         </div>`

//         posts.className += ' border-green';
        
//         postTitle.value = "";
//         postDiscription.value = "";
// }  
  
//     else {
//         Swal.fire({
//             title: "Write something?",
//             text: "Please enter something",
//             icon: "question"
//         });
//     }
  

// }
// document.innerHTML =`<div class="modal-dialog modal-dialog-centered">...</div>`
// catch(err){
//     console.log(err);
//     }
    
    //-----------------Firestore --------------------//
    
    // try {
    //     const docRef = await addDoc(collection(db, "userposts"), {
    //         postTitle: "${postTitle.value}",
    //         postDiscrption: "${postDiscription.value",
    //         time: Timestamp.fromDate(new Date())
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //     console.error("Error adding document: ", e);
    // }
    


// let editPostBtn = document.getElementById('editpostBtn')
// let removePostBtn = document.getElementById('remove')
// console.log(editPostBtn); 

// let editPost = async () => {

//     let card = event.target.closest('.card');
//     let titleElement = card.querySelector('.card-title');
//     let descriptionElement = card.querySelector('.card-text');


//     let submitPost = document.getElementById('submitPost')
//     submitPost.addEventListener('click', () => {
//         editContainer.style.display = 'none'

//     })
//     let closePost = document.getElementById('closePost')
//     closePost.addEventListener('click', () => {
//         editContainer.style.display = 'none'

//     })

//     //---------------Firestore--------------------//
//     try {
//         // Add a new document in collection "cities"
//         await setDoc(doc(db, "cities", docRef.id), {
//             title: `${titleElement.innerHTML}`,
//             discription: `${descriptionElement.innerHTML}`,
//             time: Timestamp.fromDate(new Date())
//         });

//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }

// }
// editPostBtn && editPostBtn.addEventListener('click', () => {
//     editContainer.style.display = 'block';
//     editPost()
//     console.log('edit');

// })


// function remove(event) {
//     event.target.parentNode.parentNode.remove();

//     posts.className -= ' border-green';
// }


// function addBg1() {
//     let postCard = document.getElementById('post-card');
//     postCard.className += " add-bg-1"
// }


// function addBg2() {
//     let postCard = document.getElementById('post-card');
//     postCard.className += " add-bg-2"
// }


// function addBg3() {
//     let postCard = document.getElementById('post-card');
//     postCard.className += " add-bg-3"
// }


// function addBg4() {
//     let postCard = document.getElementById('post-card');
//     postCard.className += " add-bg-4"
// }


// function addBg5() {
//     let postCard = document.getElementById('post-card');
//     postCard.className += " add-bg-5"
// }


