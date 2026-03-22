const NAME = "Priyanka";

const yes = document.getElementById("yes-button");
const no = document.getElementById("no-button");
const main = document.getElementById("main");
const success = document.getElementById("success");
const heartsContainer = document.getElementById("hearts-container");

let textIndex = 0;

const noTexts = [
  "No 😭",
  `${NAME} please 🥺`,
  `Think again ${NAME} 😢`,
  `Don't do this ${NAME} 💔`,
  `You're breaking my heart 😭`,
  `${NAME} last chance 😤`,
  `Say YES ${NAME} ❤️`,
  `I’ll cry fr ${NAME} 😭`,
  `Okay now you're being mean 😤`,
  `You know you want to say YES 😏`,
  "Are you serious? 😭",
  "System hang ho gaya 😵",
  "गलत बटन दबा दिया 😭",
  "This option is disabled 🚫"
];

function vibrate(pattern = [50]) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

function createHeart(x, y) {
  const heart = document.createElement("img");
  heart.src = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";

  heart.style.position = "absolute";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.width = "35px";

  heartsContainer.appendChild(heart);

  let i = 0;
  const anim = setInterval(() => {
    i += 2;
    heart.style.top = (y - i) + "px";
    heart.style.opacity = 1 - i / 150;

    if (i > 150) {
      clearInterval(anim);
      heart.remove();
    }
  }, 16);
}

function explosion(x, y) {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("img");
    heart.src = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";

    heart.style.position = "absolute";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.width = "25px";

    heartsContainer.appendChild(heart);

    const angle = Math.random() * 2 * Math.PI;
    let dist = 0;

    const anim = setInterval(() => {
      dist += 1;
      heart.style.left = x + Math.cos(angle) * dist + "px";
      heart.style.top = y + Math.sin(angle) * dist + "px";
      heart.style.opacity = 1 - dist / 120;

      if (dist > 120) {
        clearInterval(anim);
        heart.remove();
      }
    }, 25);
  }
}

yes.onclick = (e) => {
  vibrate([100, 50, 100]);
  explosion(e.clientX, e.clientY);

  main.style.display = "none";
  success.style.display = "block";
};
function moveNo() {
  textIndex = (textIndex + 1) % noTexts.length;
  no.innerText = noTexts[textIndex];

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const padding = 20;

  // SAFE ZONE (center-based)
  const minX = padding;
  const maxX = vw - padding;

  const minY = padding;
  const maxY = vh - padding;

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  no.style.left = `${x}px`;
  no.style.top = `${y}px`;
}
no.addEventListener("mouseenter", moveNo);
no.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNo();
});