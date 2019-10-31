const postNameInput = document.getElementById('postNameInput');
const postUrlInput = document.getElementById('postUrlInput');
const postTextInput = document.getElementById('postTextInput');
const errorMsg = document.getElementById('errorMsg');
const postList = document.getElementById('post-list');

// Model
let posts = {};
let postCollection = initDbCollection();

postCollection.orderBy('time', 'desc').onSnapshot(function (snap) {
    posts = {};
    snap.forEach(function (doc) {
        posts[doc.id] = doc.data();
    });
    showPosts();
});

function showPosts() {
    postList.innerHTML = '';
    for (id in posts) {
        postList.innerHTML += createPostHTML(posts[id]);
    }
}

function createPostHTML(post) {
    let postHTML = '<div class="post">';
    postHTML += post.text ? `<p>${post.text}</p>` : '';
    postHTML += post.url ? `<img src="${post.url}">` : '';
    postHTML += `<p class="nameText">Lots of love, ${post.name}.</p>`;
    postHTML += `</div>`;
    return postHTML;
}

function submitPost() {
    const text = postTextInput.value;
    const url = postUrlInput.value;
    const name = postNameInput.value;

    errorMsg.innerHTML = '';
    if (text == '' && url == '') {
        errorMsg.innerHTML = 'Feil';
        return;
    }

    let post = {};
    post.name = name != '' ? name : 'GET Anonym';
    post.text = text != '' ? text : '';
    post.url = url != '' ? url : '';
    post.time = new Date();

    postCollection.add(post).catch(function (error) {
        errorMsg.innerHTML = 'Det skjedde en feil ved innsendingen.';
        console.log(error);
    });

    postTextInput.value = '';
    postUrlInput.value = '';
    postNameInput.value = '';
}

function initDbCollection() {
    firebase.initializeApp({
        apiKey: "AIzaSyCF4wq59fMWsWq8D7OfaajhHbSPB0SkcWA",
        authDomain: "get-modul1.firebaseapp.com",
        databaseURL: "https://get-modul1.firebaseio.com",
        projectId: "get-modul1",
        storageBucket: "get-modul1.appspot.com",
        messagingSenderId: "326106033490",
        appId: "1:326106033490:web:e26956a0b4693dd5659e8b"
    });
    return firebase.firestore().collection('postList');
}