const STORAGE_KEY = "vantix_online_users";

// give each browser a unique ID
let userId = localStorage.getItem("user_id");

if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("user_id", userId);
}

// load current users object
function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// mark user as online with timestamp
function setOnline() {
    const users = getUsers();
    users[userId] = Date.now();
    saveUsers(users);
}

// clean users not active in last 30 seconds
function cleanUsers() {
    const users = getUsers();
    const now = Date.now();

    for (const id in users) {
        if (now - users[id] > 30000) {
            delete users[id];
        }
    }

    saveUsers(users);
}

// update UI
function updateCount() {
    cleanUsers();
    const users = getUsers();

    document.getElementById("listenerCount").textContent =
        Object.keys(users).length;
}

// run loop
function start() {
    setOnline();
    updateCount();

    setInterval(() => {
        setOnline();
        updateCount();
    }, 5000);
}

start();
