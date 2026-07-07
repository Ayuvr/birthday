import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onChildAdded,
    remove
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCfeX0CNFBh9HFeXuMPhqplUT31fKT-PyA",
    authDomain: "swasty-birthday.firebaseapp.com",
    databaseURL: "https://swasty-birthday-default-rtdb.firebaseio.com",
    projectId: "swasty-birthday",
    storageBucket: "swasty-birthday.firebasestorage.app",
    messagingSenderId: "963260966026",
    appId: "1:963260966026:web:9d259180c96a32af2a7973",
    measurementId: "G-834S9HRQN3"
};

let replyTo = "";
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const joinBtn = document.getElementById("joinBtn");
const nameScreen = document.getElementById("nameScreen");
const chatApp = document.getElementById("chatApp");

const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

let currentUser = "";

/* JOIN CHAT */

joinBtn.addEventListener("click", () => {

    console.log("Username Input Element:", usernameInput);

    console.log("Input Value:", usernameInput.value);

    const name = usernameInput.value.trim();

    console.log("After trim:", name);

    if(name === ""){
        alert("Please enter your name ❤️");
        return;
    }

    currentUser = name;

    localStorage.setItem("birthdayChatUser", name);

    nameScreen.style.display = "none";
    chatApp.style.display = "flex";

});

/* AUTO LOGIN */

const savedName = localStorage.getItem("birthdayChatUser");

if(savedName){

    currentUser = savedName;

    nameScreen.style.display = "none";
    chatApp.style.display = "flex";
}

/* SEND MESSAGE */

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){
        sendMessage();
    }

});

function sendMessage(){

    const text = messageInput.value.trim();

    if(text === "") return;

   push(ref(db, "birthdayChat/messages"), {

    sender: currentUser,

    text: text,

    replyTo: replyTo,

    timestamp: Date.now()

});

   messageInput.value = "";

replyTo = "";

messageInput.placeholder =
    "Type a message...";
}

/* RECEIVE MESSAGES */

onChildAdded(
    ref(db, "birthdayChat/messages"),
    (snapshot) => {

        const messageId = snapshot.key;

        const data = snapshot.val();

        const msg = document.createElement("div");

        const isMine =
            data.sender === currentUser;

        msg.className =
            `message ${
                isMine
                ? "my-message"
                : "other-message"
            }`;

        const time =
            new Date(
                data.timestamp
            ).toLocaleTimeString([],{
                hour:"2-digit",
                minute:"2-digit"
            });

        msg.innerHTML = `

<div class="message-row">

    <div class="message-content">

        <div class="sender">
            ${data.sender}
        </div>

       <div>

    ${
        data.replyTo
        ?
        `
        <div class="reply-box">
            ${data.replyTo}
        </div>
        `
        :
        ""
    }

    ${data.text}

</div>

        <div class="time">
            ${time}
        </div>

    </div>

    <div class="message-menu-container">

        <button class="menu-btn">
            ⋮
        </button>

        <div class="message-menu">

    <button class="reply-btn">
        ↩️ Reply
    </button>

    <button class="copy-btn">
        📋 Copy
    </button>

    ${
        data.sender === currentUser
        ?
        `<button class="delete-btn"
            data-id="${messageId}">
            🗑️ Delete
        </button>`
        :
        ""
    }

</div>

        

    </div>

</div>

`;
        messagesDiv.appendChild(msg);
        const menuBtn =
    msg.querySelector(".menu-btn");

const menu =
    msg.querySelector(".message-menu");

if(menuBtn){

    menuBtn.addEventListener("click",(e)=>{

        e.stopPropagation();

        document
            .querySelectorAll(".message-menu")
            .forEach(m=>{

                if(m !== menu){
                    m.style.display="none";
                }

            });

        menu.style.display =
            menu.style.display === "flex"
            ? "none"
            : "flex";

    });

}
        const deleteBtn =
    msg.querySelector(".delete-btn");

if(deleteBtn){

    deleteBtn.addEventListener("click", () => {

        if(confirm("Delete this message?")){

            remove(
                ref(
                    db,
                    "birthdayChat/messages/" +
                    deleteBtn.dataset.id
                )
            );

            msg.remove();
        }

    });

}
const replyBtn =
    msg.querySelector(".reply-btn");

if(replyBtn){

    replyBtn.addEventListener("click", () => {

        replyTo =
            data.sender + ": " +
            data.text;

        messageInput.placeholder =
            "Replying to " +
            data.sender;

        messageInput.focus();

    });

}
const copyBtn =
    msg.querySelector(".copy-btn");

if(copyBtn){

    copyBtn.addEventListener("click", () => {

        navigator.clipboard.writeText(
            data.text
        );

        alert("Message copied ❤️");

    });

}
        messagesDiv.scrollTop =
            messagesDiv.scrollHeight;
    }
);

const backBtn = document.getElementById("backBtn");

if(backBtn){

    backBtn.addEventListener("click", () => {

        window.location.href = "index.html";

    });

}