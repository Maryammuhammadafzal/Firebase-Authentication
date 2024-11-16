import {
    db,
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    Timestamp,
    deleteDoc,
    deleteField
} from "../firebase.js";


let postTitle = document.getElementById('post-title');
let postDiscription = document.getElementById('post-discription');
let postCard = document.getElementById('post-card');
let postContainer = document.getElementById('postContainer')
let editContainer = document.getElementById('editContainer')

// show and close the posts
let createPost = document.getElementById('createPost')
createPost.addEventListener('click', () => {
    postContainer.style.display = 'block'

})
let submitPost = document.getElementById('submitPost')
submitPost.addEventListener('click', () => {
    postContainer.style.display = 'none'

})
let closePost = document.getElementById('closePost')
closePost.addEventListener('click', () => {
    postContainer.style.display = 'none'

})


// Add the post
let addPosts = async () => {
    let postTitle = document.getElementById('post-title');
    let postDiscription = document.getElementById('post-discription');

    let posts = document.getElementById('posts');

    if (postTitle.value.trim() && postDiscription.value.trim()) {

        posts.innerHTML += `<div class="card  mt-3" id="post-card">
    <div class="card-header fontStyle">
@Posts
</div>
<div class="card-body ">
<h5 class="card-title fontStyle">${postTitle.value}</h5>
<p class="card-text fontStyle">${postDiscription.value}</p>
</div>
<div class="p-3">
<button type="button" id="editpostBtn" class="btn btn-secondary mt-4 fontStyle ">Edit</button>
<button type="button" id="remove" class="btn btn-danger mt-4 fontStyle ">Delete</button>
</div>
</div>`

        posts.className += ' border-green';

        postTitle.value = "";
        postDiscription.value = "";

    }

    else {
        Swal.fire({
            title: "Write something?",
            text: "Please enter something",
            icon: "question"
        });
    }

    //-----------------Firestore --------------------//

    try {
        const docRef = await addDoc(collection(db, "userposts"), {
            postTitle: "${postTitle.value}",
            postDiscrption: "${postDiscription.value",
            time: Timestamp.fromDate(new Date())
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}
//Add posts
submitPost.addEventListener('click', () => {
    addPosts()
})


let editPostBtn = document.getElementById('editpostBtn')
let removePostBtn = document.getElementById('remove')
console.log(editPostBtn); 

let editPost = async () => {

    let card = event.target.closest('.card');
    let titleElement = card.querySelector('.card-title');
    let descriptionElement = card.querySelector('.card-text');


    let submitPost = document.getElementById('submitPost')
    submitPost.addEventListener('click', () => {
        editContainer.style.display = 'none'

    })
    let closePost = document.getElementById('closePost')
    closePost.addEventListener('click', () => {
        editContainer.style.display = 'none'

    })

    //---------------Firestore--------------------//
    try {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "cities", docRef.id), {
            title: `${titleElement.innerHTML}`,
            discription: `${descriptionElement.innerHTML}`,
            time: Timestamp.fromDate(new Date())
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}
editPostBtn && editPostBtn.addEventListener('click', () => {
    editContainer.style.display = 'block';
    editPost()
    console.log('edit');

})


function remove(event) {
    event.target.parentNode.parentNode.remove();

    posts.className -= ' border-green';
}


function addBg1() {
    let postCard = document.getElementById('post-card');
    postCard.className += " add-bg-1"
}


function addBg2() {
    let postCard = document.getElementById('post-card');
    postCard.className += " add-bg-2"
}


function addBg3() {
    let postCard = document.getElementById('post-card');
    postCard.className += " add-bg-3"
}


function addBg4() {
    let postCard = document.getElementById('post-card');
    postCard.className += " add-bg-4"
}


function addBg5() {
    let postCard = document.getElementById('post-card');
    postCard.className += " add-bg-5"
}


