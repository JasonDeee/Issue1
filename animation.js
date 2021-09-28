//
//
// Hi There, Have a good day

// Grab All the Elements - DOM Elements
const body = document.body;
const main = document.getElementById("main_scroll");
const return_button = document.querySelector(".return_button");
const main_picH1 = document.querySelector(".main_pic h1"); // Secondary Title - i Guessssss :)

const title = document.querySelector("#title");

let sx = 0, // For scroll positions
  sy = 0;
let dx = sx, // For container positions And Force (Percentage 70% Recommended)
  dy = sy,
  Force = 70;

// Onpage Load And Refresh Events

body.style.height = main.clientHeight + "px";

ResetPage();

window.addEventListener("beforeunload", (e) => {
  ResetPage();
});

function ResetPage() {
  window.scrollTo(0, 0);

  body.scrollTo(0, 0);
  main.style = ``;
}

// Title OnAnimate Out
const titleArray = title.innerText.split("");
title.innerHTML = ``;

for (let index = 0; index < titleArray.length; index++) {
  if (titleArray[index] == " ") {
    titleArray[index] = "&nbsp";
  }
  title.innerHTML += `<span class="pending" style="transition: all 0.8s ${
    index * 0.025
  }s cubic-bezier(0.25, 0, 0, 1);">${titleArray[index]}</span>`;

  if (index == titleArray.length - 1) {
    break;
  }
}

const TitleSpan = document.querySelectorAll("#title span");
const Titleline = document.querySelector(".header_contents .line");

function TitleAnimate() {
  var TitleAnimateWait = setInterval(() => {
    if (
      title.getBoundingClientRect().top +
        title.getBoundingClientRect().height * 1.2 -
        window.innerHeight <
      0
    ) {
      Titleline.style.width = `90px`;
      TitleSpan.forEach((Element) => {
        Element.classList.remove("pending");
      });
    } else if (
      title.getBoundingClientRect().top +
        title.getBoundingClientRect().height * 1.2 -
        window.innerHeight >
      0
    ) {
      Titleline.style.width = `0`;
      TitleSpan.forEach((Element) => {
        Element.classList.add("pending");
      });
    }
  }, 700);
}

window.addEventListener("resize", (e) => {
  var resizetime = setTimeout(() => {
    let bodyHeight = main.getBoundingClientRect().height;
    body.style.height = `${bodyHeight}px`;
    easeScroll();

    clearTimeout(resizetime);
  }, 1200);
});

//
// Momentum Scrolling

// Scroll Functions
window.addEventListener("scroll", (e) => {
  easeScroll(); // Momentium
  ReturnButton(); // Return Button OnPopUp
  TitleAnimate(); // Title Animate In
});

var lastScrollTop = 0;
function ReturnButton() {
  if (window.scrollY == 0) {
    return_button.style.boxShadow = `0 0 1vw #00000000`;
  } else if (window.scrollY > 0) {
    return_button.style.boxShadow = `0 0 1vw #00000080`;
  }
  // Check the Scroll Directions
  var st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > lastScrollTop) {
    // downscroll code
    return_button.style.top = `-5vw`;
  } else {
    // upscroll code
    return_button.style.top = `2vw`;
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}

function easeScroll() {
  sx = window.pageXOffset;
  sy = window.pageYOffset;
}

window.requestAnimationFrame(render);

function render() {
  //We calculate our container position by linear interpolation method
  dx = li(dx, sx, Force / 1000);
  dy = li(dy, sy, Force / 1000);

  dx = Math.floor(dx * 100) / 100;
  dy = Math.floor(dy * 100) / 100;

  main.style.transform = `translate(-${dx}px, -${dy}px)`;

  if (
    main_picH1.getBoundingClientRect().top +
      main_picH1.getBoundingClientRect().height * 3 >
    0
  ) {
    main_picH1.style.transform = `translateY(${dy / 7}px)`;
  }

  window.requestAnimationFrame(render);
}

function li(a, b, n) {
  return (1 - n) * a + n * b;
}
