const usernameInput = document.getElementById('login-username');
const usernameDisplay = document.getElementById('username-display');
let gamesTable = document.getElementById('game-table');

// Model
const screens = document.getElementsByClassName('screen');
let currectScreen = document.getElementById('login');
let username;
let db = getFirestoreDb();
let games;

db.collection('games').orderBy('host', 'desc').onSnapshot(updateGames);

changeScreen('lobby');

// View
function show() {
    for (screen of screens) {
        screen.style.display = 'none';
    }
    currectScreen.style.display = 'block';
    usernameDisplay.innerHTML = username;

    if (currectScreen.id === 'lobby') {
        showGames();
    }
}

function showGames() {
    let html = '<tr><th>Vert</th><th>Gjest</th><th>Status</th></tr>';
    for (id in games) {
        html += createGameListItem(games[id]);
    }
    gamesTable.innerHTML = html;
}

function createGameListItem(game) {
    const status = game.open ? '<span class="openGame">Åpen</span>' : '<span class="closedGame">Stengt</span>';
    const guest = game.guest ? game.guest : '';
    let html = '';
    // html += `<td>${id}</td>`;
    html += `<td>${game.host}</td>`;
    html += `<td>${guest}</td>`;
    html += `<td>${status}</td>`;
    return `<tr onclick="joinGame('${id}')">${html}</tr>`;
}

// Controller
function changeScreen(screenId) {
    currectScreen = document.getElementById(screenId);
    show();
}

function login() {
    let value = usernameInput.value;
    if (value == '') return;
    username = value;
    changeScreen('lobby');
}

function joinGame(id) {
    console.log('Join game: ', id);
}

function updateGames(dbSnapshot) {
    games = {};
    dbSnapshot.forEach(function (doc) {
        games[doc.id] = doc.data();
    });
    show();
}

// Annet
function getFirestoreDb() {
    firebase.initializeApp({
        apiKey: "AIzaSyCyWJqmnIHSQ1YNECDw2K4qHHW1wSIdYxc",
        authDomain: "multiplayer-stein-saks-papir.firebaseapp.com",
        databaseURL: "https://multiplayer-stein-saks-papir.firebaseio.com",
        projectId: "multiplayer-stein-saks-papir",
        storageBucket: "multiplayer-stein-saks-papir.appspot.com",
        messagingSenderId: "892985711225",
        appId: "1:892985711225:web:07e2a263cdb6051b7c92a8"
    });
    return firebase.firestore();
}