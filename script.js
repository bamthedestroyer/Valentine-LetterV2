/* ========================================= */
/* ELEMENTS                                  */
/* ========================================= */

// Envelope & Letter
const envelope = document.getElementById("envelope-container");
const letterContainer = document.getElementById("letter-container");
const letterWindow = document.querySelector("#letter-container .letter-window");

// Message Page
const messageContainer = document.getElementById("message-container");
const messageWindow = document.querySelector("#message-container .letter-window");

// Yes / No Buttons
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

// Letter Elements
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Navigation Buttons
const readLetterBtn = document.getElementById("read-letter-btn");
const openGiftsBtn = document.getElementById("open-gifts-btn");

// Gift Shop
const giftContainer = document.getElementById("gift-container");
const giftWindow = document.getElementById("gift-window");

// Gift Reveal
const revealContainer = document.getElementById("gift-reveal-container");
const revealWindow = document.querySelector("#gift-reveal-container .letter-window");
const revealTitle = document.getElementById("reveal-title");
const revealImg = document.getElementById("reveal-img");
const revealText = document.getElementById("reveal-text");
const backBtn = document.getElementById("back-btn");

// Album
const albumContainer = document.getElementById("album-container");
const albumWindow = document.querySelector("#album-container .letter-window");

// Music + QR
const musicBtn = document.getElementById("music-btn");
const qrContainer = document.getElementById("qr-container");
const qrWindow = document.querySelector("#qr-container .letter-window");
const restartBtn = document.getElementById("restart-btn");

// Memories Button
const memoriesBtn = document.getElementById("memories-btn");


/* ========================================= */
/* INITIAL STATES                            */
/* ========================================= */

if (memoriesBtn) memoriesBtn.style.display = "none";


/* ========================================= */
/* MUSIC PLAYER                              */
/* ========================================= */

const bgMusic = document.getElementById("bg-music");
const musicIcon = document.getElementById("music-icon");

let isPlaying = false;
bgMusic.volume = 0.5;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.textContent = "🔇";
        isPlaying = false;
    } else {
        bgMusic.play();
        musicIcon.textContent = "🎵";
        isPlaying = true;
    }
}


/* ========================================= */
/* GIFT DATA                                 */
/* ========================================= */

const giftsData = [
    {
        inside: "inside1.png",
        title: "For You! 🌸",
        text: "Flowers for my <b>Valentine!</b><br><small>(Real flowers die, my love won't)</small>"
    },
    {
        inside: "inside2.png",
        title: "Yum! 🍫",
        text: "You're <b>sweeter</b> than chocolate!<br><small>(Zero calories and zero like my bank account!)</small>"
    },
    {
        inside: "inside3.png",
        title: "Cuddles! 🧸",
        text: "I can't <b>bear</b> to be apart!<br><small>(Would've got you that bear if I wasn't such a brokie sorry... here's a photo tho haha)</small>"
    },
    {
        inside: "inside4.png",
        title: "Sparkle! 💎",
        text: "You are <b>precious</b> to me!<br><small>(I'm broke, so here's a png)</small>"
    }
];

let giftsOpenedCount = 0;


/* ========================================= */
/* ENVELOPE OPEN                             */
/* ========================================= */

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letterContainer.style.display = "flex";

    bgMusic.play()
        .then(() => {
            isPlaying = true;
            musicIcon.textContent = "🎵";
        })
        .catch(() => console.log("Autoplay blocked"));

    setTimeout(() => letterWindow.classList.add("open"), 50);
});


/* ========================================= */
/* NO BUTTON (RUN AWAY)                      */
/* ========================================= */

noBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const min = 100;
    const max = 300;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * (max - min) + min;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});


/* ========================================= */
/* YES BUTTON                                */
/* ========================================= */

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";

    letterWindow.classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
});


/* ========================================= */
/* PAGE NAVIGATION                           */
/* ========================================= */

readLetterBtn.addEventListener("click", () => {
    letterContainer.style.display = "none";
    messageContainer.style.display = "flex";

    setTimeout(() => messageWindow.classList.add("open"), 50);
});

openGiftsBtn.addEventListener("click", () => {
    messageContainer.style.display = "none";
    giftContainer.style.display = "flex";

    setTimeout(() => giftWindow.classList.add("open"), 50);
});


/* ========================================= */
/* GIFT SYSTEM                               */
/* ========================================= */

function openSpecificGift(index, element) {

    const gift = giftsData[index];

    element.style.opacity = "0";
    element.style.pointerEvents = "none";

    giftsOpenedCount++;

    giftContainer.style.display = "none";
    revealContainer.style.display = "flex";

    setTimeout(() => revealWindow.classList.add("open"), 50);

    revealTitle.textContent = gift.title;
    revealImg.src = gift.inside;
    revealText.innerHTML = gift.text;
}

backBtn.addEventListener("click", () => {
    revealContainer.style.display = "none";
    revealWindow.classList.remove("open");

    giftContainer.style.display = "flex";

    if (giftsOpenedCount === 4 && memoriesBtn) {
        memoriesBtn.style.display = "inline-block";
        memoriesBtn.style.animation = "bounce 2s infinite";
    }
});


/* ========================================= */
/* BACK BUTTONS                              */
/* ========================================= */

const backToLetter = document.getElementById("back-to-letter");
if (backToLetter) {
    backToLetter.addEventListener("click", () => {
        messageContainer.style.display = "none";
        messageWindow.classList.remove("open");
        letterContainer.style.display = "flex";
    });
}

const backToMessage = document.getElementById("back-to-message");
if (backToMessage) {
    backToMessage.addEventListener("click", () => {
        giftContainer.style.display = "none";
        giftWindow.classList.remove("open");

        messageContainer.style.display = "flex";
        setTimeout(() => messageWindow.classList.add("open"), 50);
    });
}

const backToGifts = document.getElementById("back-to-gifts");
if (backToGifts) {
    backToGifts.addEventListener("click", () => {
        albumContainer.style.display = "none";
        albumWindow.classList.remove("open");

        giftContainer.style.display = "flex";
        setTimeout(() => giftWindow.classList.add("open"), 50);
    });
}

const backToAlbum = document.getElementById("back-to-album");
if (backToAlbum) {
    backToAlbum.addEventListener("click", () => {
        qrContainer.style.display = "none";
        qrWindow.classList.remove("open");

        albumContainer.style.display = "flex";
        setTimeout(() => albumWindow.classList.add("open"), 50);
    });
}


/* ========================================= */
/* ALBUM & QR                                */
/* ========================================= */

if (memoriesBtn) {
    memoriesBtn.addEventListener("click", () => {
        giftContainer.style.display = "none";
        albumContainer.style.display = "flex";

        setTimeout(() => albumWindow.classList.add("open"), 50);
    });
}

musicBtn.addEventListener("click", () => {
    albumContainer.style.display = "none";
    giftContainer.style.display = "none";

    qrContainer.style.display = "flex";
    setTimeout(() => qrWindow.classList.add("open"), 50);
});


/* ========================================= */
/* RESTART                                   */
/* ========================================= */

if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        location.reload();
    });
}
