document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("page-loaded");

});

/* =========================
   ELEMENTS
========================= */

const loadingScreen = document.getElementById("loadingScreen");

const loadingProgress = document.querySelector(".loading-progress");

const loadingText = document.getElementById("loadingText");

const passwordPage = document.getElementById("passwordPage");
const timerPage = document.getElementById("timerPage");
const mainWebsite = document.getElementById("mainWebsite");

const unlockBtn = document.getElementById("unlockBtn");
const enterWebsiteBtn = document.getElementById("enterWebsiteBtn");

const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

const bgMusic = document.getElementById("bgMusic");

/* =========================
   PASSWORD
========================= */

unlockBtn.addEventListener("click", () => {

  const password = passwordInput.value.trim();

if(password === "240710"){

    startBirthdayLoading(() => {

        passwordPage.classList.remove("active-page");

        timerPage.classList.add("active-page");

        bgMusic.play().catch(() => {});

    });

}else{
        errorMessage.textContent =
            "❌ Wrong password. 💖 Hint: The secret code is a day you'll never forget...";

        passwordInput.value = "";
    }

});

/* =========================
   TIMER
========================= */

const birthDate = new Date("2010-07-24T00:00:00");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const totalSecondsEl = document.getElementById("totalSeconds");

function updateTimer(){

    const now = new Date();

    let years =
        now.getFullYear() - birthDate.getFullYear();

    let months =
        now.getMonth() - birthDate.getMonth();

    let days =
        now.getDate() - birthDate.getDate();

    if(days < 0){

        months--;

        const previousMonthDays =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            ).getDate();

        days += previousMonthDays;
    }

    if(months < 0){

        years--;
        months += 12;
    }

    const diff = now - birthDate;

    const totalSeconds =
        Math.floor(diff / 1000);

    const hours =
        Math.floor(diff / (1000 * 60 * 60)) % 24;

    const minutes =
        Math.floor(diff / (1000 * 60)) % 60;

    const seconds =
        Math.floor(diff / 1000) % 60;

    yearsEl.textContent = years;
    monthsEl.textContent = months;
    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2,"0");
    minutesEl.textContent = String(minutes).padStart(2,"0");
    secondsEl.textContent = String(seconds).padStart(2,"0");

    totalSecondsEl.textContent =
        totalSeconds.toLocaleString();

}

setInterval(updateTimer,1000);
updateTimer();

/* =========================
   ENTER WEBSITE
========================= */

enterWebsiteBtn.addEventListener("click", () => {

    timerPage.classList.remove("active-page");

    mainWebsite.style.display = "block";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

/* =========================
   FLOATING HEARTS
========================= */

function createHeart(){

    const container =
        document.getElementById("hearts-container");

    const heart =
        document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (20 + Math.random() * 25) + "px";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    },10000);

}

setInterval(createHeart,600);

/* =========================
   LETTER REVEAL
========================= */

const envelope =
    document.getElementById("envelope");

const letterContent =
    document.getElementById("letterContent");

const typedLetter =
    document.getElementById("typedLetter");

const birthdayLetter = `
Happy Birthday, Swasty ❤️

Today is all about celebrating you.

Every smile you've shared,
every dream you've dreamed,
every memory you've created
has made this world a more beautiful place.

May your life always be filled with happiness,
laughter, success, and unforgettable moments.

Never stop believing in yourself,
because you are capable of amazing things.

Thank you for being exactly who you are.

Happy Birthday once again,
and may this year be your best one yet. 🎂✨❤️
`;

let letterOpened = false;

envelope.addEventListener("click", () => {

    if(letterOpened) return;

    letterOpened = true;

    letterContent.style.display = "block";

    let i = 0;

    function typeLetter(){

        if(i < birthdayLetter.length){

            typedLetter.innerHTML +=
                birthdayLetter.charAt(i);

            i++;

            setTimeout(typeLetter,25);
        }

    }

    typeLetter();

});

/* =========================
   MEMORY STARS
========================= */

const stars =
    document.querySelectorAll(".star");

const starMessage =
    document.getElementById("starMessage");

stars.forEach(star => {

    star.addEventListener("click", () => {

        starMessage.textContent =
            star.dataset.message;

    });

});

/* =========================
   WISH COUNTER
========================= */

const wishCounter =
    document.getElementById("wishCounter");

let currentWish = 0;

const targetWish = 1247893;

function animateWishCounter(){

    const increment =
        Math.ceil(targetWish / 250);

    const counter = setInterval(() => {

        currentWish += increment;

        if(currentWish >= targetWish){

            currentWish = targetWish;

            clearInterval(counter);
        }

        wishCounter.textContent =
            currentWish.toLocaleString();

    },15);

}

const wishObserver =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            animateWishCounter();

            wishObserver.unobserve(
                wishCounter
            );

        }

    });

});

wishObserver.observe(wishCounter);

/* =========================
   BIRTHDAY WISH
========================= */

const wishBtn = document.getElementById("wishBtn");
const wishOverlay = document.getElementById("wishOverlay");
const shootingStar = document.getElementById("shootingStar");
const countdownEl = document.getElementById("countdown");

wishBtn.addEventListener("click", () => {

    wishOverlay.style.display = "flex";

    createNightStars();

    launchShootingStars();

    let count = 10;

    countdownEl.textContent = count;

    const timer = setInterval(() => {

        count--;

        countdownEl.textContent = count;

        if(count <= 0){

            clearInterval(timer);

            wishOverlay.style.display = "none";

        }

    },1000);

});

function createNightStars(){

    document
        .querySelectorAll(".twinkle-star")
        .forEach(star => star.remove());

    for(let i=0;i<250;i++){

        const star =
            document.createElement("div");

        star.classList.add("twinkle-star");

        star.style.left =
            Math.random()*100 + "%";

        star.style.top =
            Math.random()*100 + "%";

        star.style.animationDelay =
            Math.random()*2 + "s";

        wishOverlay.appendChild(star);

    }

}

function launchShootingStars(){

    function shoot(){

        shootingStar.style.opacity = "1";

        shootingStar.style.left = "-200px";

        shootingStar.style.top =
            (20 + Math.random()*40) + "%";

        shootingStar.animate([
            {
                transform:
                "translateX(0) translateY(0) rotate(-25deg)"
            },
            {
                transform:
                "translateX(1600px) translateY(300px) rotate(-25deg)"
            }
        ],{
            duration:1200,
            easing:"linear"
        });

        setTimeout(()=>{
            shootingStar.style.opacity = "0";
        },1200);

        if(wishOverlay.style.display === "flex"){

            setTimeout(
                shoot,
                1000 + Math.random()*2000
            );

        }

    }

    shoot();
}
/* =========================
   CONFETTI
========================= */

const confettiBtn =
    document.getElementById("confettiBtn");

confettiBtn.addEventListener("click", () => {

    createConfetti();

});

function createConfetti(){

    for(let i=0;i<200;i++){

        const confetti =
            document.createElement("div");

        confetti.classList.add("confetti");

        confetti.style.left =
            Math.random() * 100 + "%";

        confetti.style.background =
            `hsl(${Math.random()*360},100%,60%)`;

        confetti.style.animationDelay =
            Math.random() * 2 + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        },7000);

    }

}

/* =========================
   PHOTO ANIMATION
========================= */

const photos =
    document.querySelectorAll(".photo-grid img");

photos.forEach((photo,index) => {

    photo.style.animation =
        `floatPhoto ${4 + index}s ease-in-out infinite`;

});

/* =========================
   SECRET EASTER EGG
========================= */

let clickCount = 0;

document.querySelector(".birthday-name")
?.addEventListener("click", () => {

    clickCount++;

    if(clickCount === 5){

        alert(
            "🎂 Secret Message:\n\nYou are loved more than you know ❤️"
        );

        clickCount = 0;
    }

});

/* =========================
   AUTO CONFETTI ON FINALE
========================= */

const finale =
    document.querySelector(".finale-section");

const finaleObserver =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            createConfetti();

            finaleObserver.unobserve(finale);

        }

    });

},{
    threshold:0.5
});

if(finale){
    finaleObserver.observe(finale);
}

const form = document.getElementById("messageForm");
const successMessage = document.getElementById("successMessage");

if(form){

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = new FormData(form);

        const response = await fetch(
            "https://formspree.io/f/meebqvgj",
            {
                method: "POST",
                body: formData,
                headers:{
                    Accept:"application/json"
                }
            }
        );

        if(response.ok){

            successMessage.textContent =
                "❤️ Thank you for sharing your feelings.";

            form.reset();

        }else{

            successMessage.textContent =
                "❌ Message could not be sent.";
        }

    });

}

const openChatBtn = document.getElementById("openChatBtn");
const chatModal = document.getElementById("chatModal");
const chatUnlockBtn = document.getElementById("chatUnlockBtn");

if(openChatBtn){

    openChatBtn.addEventListener("click", () => {

        chatModal.style.display = "flex";

    });

}

if(chatUnlockBtn){

    chatUnlockBtn.addEventListener("click", () => {

        const password =
            document.getElementById("chatPassword").value;

       if(password === "swasty2407"){

    // Save current scroll position
    localStorage.setItem(
        "scrollPosition",
        window.scrollY
    );

    document.body.classList.add("page-exit");

setTimeout(() => {

    window.location.href = "chat.html";

},600);

}
        else{

            alert("Wrong password ❤️");

        }

    });

}

/* ===========================
   3D PHOTO EFFECT
=========================== */

const galleryPhotos = document.querySelectorAll(".photo-grid img");

galleryPhotos.forEach(photo=>{

    photo.addEventListener("mousemove",(e)=>{

        const rect = photo.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const centerX = rect.width/2;
        const centerY = rect.height/2;

        const rotateY = (x-centerX)/15;

        const rotateX = -(y-centerY)/15;

        photo.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.08)
        `;

    });

    photo.addEventListener("mouseleave",()=>{

        photo.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;

    });

});

/* ===========================
   RESTORE SCROLL POSITION
=========================== */

window.addEventListener("load", () => {

    const savedPosition = localStorage.getItem("scrollPosition");

    if(savedPosition){

        window.scrollTo({

            top: Number(savedPosition),
            behavior: "auto"

        });

        localStorage.removeItem("scrollPosition");

    }

});

document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function(e){

        const href = this.getAttribute("href");

        if(!href || href.startsWith("#")) return;

        e.preventDefault();

        document.body.classList.add("page-exit");

        setTimeout(() => {

            window.location.href = href;

        }, 600);

    });

});

/* ============================
   Voice Card Player
============================ */

const voicePlayer = document.getElementById("voicePlayer");

const voiceButtons = document.querySelectorAll(".voice-btn");

voiceButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".voice-card");

        const audioName = card.dataset.audio;

        playVoice(card, audioName);

    });

});

function fadeVolume(audio, targetVolume, duration){

    const startVolume = audio.volume;
    const difference = targetVolume - startVolume;

    const steps = 30;
    const stepTime = duration / steps;

    let currentStep = 0;

    const fade = setInterval(() => {

        currentStep++;

        audio.volume = startVolume + (difference * currentStep / steps);

        if(currentStep >= steps){

            audio.volume = targetVolume;
            clearInterval(fade);

        }

    }, stepTime);

}

function playVoice(card, audioName){

    // Stop previous voice
    voicePlayer.pause();

voicePlayer.currentTime = 0;

// Reset all buttons
document.querySelectorAll(".voice-btn").forEach(btn => {

    btn.innerHTML = "▶ Listen to My Voice";

    btn.disabled = false;

});

    // Remove glow from all cards
    document.querySelectorAll(".voice-card").forEach(c => {
        c.classList.remove("playing");
    });

    // Glow the selected card
    card.classList.add("playing");

    const button = card.querySelector(".voice-btn");

    button.innerHTML = "🔊 Playing...";

    button.disabled = true;

    // Lower the background music
    fadeVolume(bgMusic, 0.2, 700);

    // Load the correct voice file
    voicePlayer.src = `audio/${audioName}.mp3`;

    voicePlayer.load();

    voicePlayer.play().catch(err => console.log(err));

    // Restore music when voice ends
   voicePlayer.onended = () => {

    fadeVolume(bgMusic,1,700);

    card.classList.remove("playing");

    button.innerHTML = "🔁 Listen Again";

    button.disabled = false;

   };
}

function startBirthdayLoading(callback){

    loadingScreen.style.display = "flex";

    loadingProgress.style.width = "0%";

    loadingText.innerHTML = "🎁 Preparing Your Surprise...";

    setTimeout(() => {

        loadingProgress.style.transition = "width 3s linear";

        loadingProgress.style.width = "100%";

    },100);

    setTimeout(() => {

        loadingText.innerHTML = "✨ Opening Your Birthday Surprise...";

    },1500);

    setTimeout(() => {

        loadingScreen.style.opacity = "0";

        setTimeout(()=>{

            loadingScreen.style.display="none";

            loadingScreen.style.opacity="1";

            callback();

        },700);

    },3200);

}
