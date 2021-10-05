//
//
// Hi There, Have a good day

// Grab All the Elements - DOM Elements
const body = document.body;
const main = document.getElementById("main_scroll");
const return_button = document.querySelector(".return_button");

// Section 1
const main_pic = document.querySelector(".main_pic"); // Secondary Title - i Guessssss :)
const main_picH1 = document.querySelector(".main_pic h1"); // Secondary Title - i Guessssss :)

const title = document.querySelector("#title");

const side_pic = document.querySelectorAll(".side_pic");
const side_picH2 = document.querySelectorAll(".side_pic h2");

const side_picCircle = document.querySelectorAll(".side_pic #circle");

// Section 2
const sec2 = document.querySelector("#sec2");
const main_block = document.querySelector("#sec2 .main_block");

const BottomBlockL = document.querySelector("#sec2 .BottomBlock .leftBlock");
const BottomBlockR = document.querySelector("#sec2 .BottomBlock .question");
const sec2Video = document.querySelector("#sec2 video");

// Section 3

const sec3 = document.querySelector("#sec3");
const sec3LeftSide = document.querySelector("#sec3 #left_col");

let sx = 0, // For scroll positions
  sy = 0;
let dx = sx, // For container positions And Force (Percentage 70% Recommended)
  dy = sy,
  Force = 80;

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

// Title OnAnimate Out - Section 1
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
  var TitleAnimateWait = setTimeout(() => {
    if (
      title.getBoundingClientRect().top +
        title.getBoundingClientRect().height * 1.2 -
        window.innerHeight <
      0
    ) {
      Titleline.style = ``;
      Titleline.style.width = `90px`;
      TitleSpan.forEach((Element) => {
        Element.classList.remove("pending");
        // Element.style -= `transition:none`;
      });
    } else if (
      title.getBoundingClientRect().top -
        title.getBoundingClientRect().height * 0.05 -
        window.innerHeight >
      0
    ) {
      Titleline.style.transition = `none`;
      Titleline.style.width = `0`;
      TitleSpan.forEach((Element) => {
        Element.classList.add("pending");
        // Element.style += `transition:none`;
      });
    }
    clearTimeout(TitleAnimateWait);
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

//// SceneTitle Animate In - Sec 2

function SceneAnimate() {
  var Sec2Time = setTimeout(() => {
    // Trigger On 75% Windows Height
    if (
      main_block.getBoundingClientRect().top - window.innerHeight * 0.65 <
      0
    ) {
      main_block.style.transform = `skewY(-15deg)`;

      BottomBlockL.style.transform = `none`;
      BottomBlockR.style.transform = `none`;

      sec2Video.play();
    } else {
      main_block.style = ``;

      BottomBlockL.style = ``;
      BottomBlockR.style = ``;

      sec2Video.pause();
    }

    clearTimeout(Sec2Time);
  }, 700);
}

//
// Momentum Scrolling

// Scroll Functions
window.addEventListener("scroll", (e) => {
  easeScroll(); // Momentium
  ReturnButton(); // Return Button OnPopUp

  TitleAnimate(); // Title Animate In - Sec 1

  SceneAnimate(); // SceneTitle Animate In - Sec 2
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
  // sx = window.pageXOffset;
  sy = window.pageYOffset;
  console.log(sy);
}

window.requestAnimationFrame(render);

function render() {
  //We calculate our container position by linear interpolation method
  // dx = li(dx, sx, Force / 1000);
  dy = li(dy, sy, Force / 1000);

  // dx = Math.floor(dx * 100) / 100;
  dy = Math.round(dy * 100) / 100;

  // if (Math.abs(sy - dy) < 0.1) {
  //   dy = sy;
  // }

  main.style.transform = `translateY(-${dy}px)`; // Main Momentium Scroll
  //

  //
  // // // Header Scroll Events
  if (
    side_pic[0].getBoundingClientRect().top +
      side_pic[0].getBoundingClientRect().height >
    0
  ) {
    // Main/Center Picture
    main_pic.style.backgroundPositionY = `${
      -10 + (150 * dy) / side_pic[0].getBoundingClientRect().height
    }%`;
    main_picH1.style.transform = `translateY(${dy / 150}px)`;

    //
    // Side Picture
    side_picCircle[0].style.marginBottom = `${dy / 6}px`;
    side_picCircle[1].style.marginBottom = `${dy / 6}px`;

    side_pic[0].style.backgroundPositionY = `${
      -10 + (120 * dy) / side_pic[0].getBoundingClientRect().height
    }%`;
    side_pic[1].style.backgroundPositionY = `${
      -10 + (120 * dy) / side_pic[0].getBoundingClientRect().height
    }%`;
    side_picH2[0].style.letterSpacing = `${
      4 + (10 * dy) / side_pic[0].getBoundingClientRect().height
    }px`;
    side_picH2[1].style.letterSpacing = `${
      4 + (10 * dy) / side_pic[0].getBoundingClientRect().height
    }px`;
  }

  //sec 2
  if (
    sec3.getBoundingClientRect().top - window.innerHeight <= 0 &&
    sec3.getBoundingClientRect().top >= 0
  ) {
    sec2.style.transition = `none`;
    sec2.style.transform = `translateY(${
      (-sec3.getBoundingClientRect().top + window.innerHeight) / 2
    }px)`;
  } else if (sec3.getBoundingClientRect().top - window.innerHeight > 0) {
    sec2.style = ``;
  }

  // sec 3
  if (
    sec3.getBoundingClientRect().top <= 0 &&
    sec3.getBoundingClientRect().top +
      sec3.getBoundingClientRect().height -
      window.innerHeight >
      0
  ) {
    sec3LeftSide.style.transition = `none`;
    sec3LeftSide.style.transform = `translateY(${-sec3.getBoundingClientRect()
      .top}px)`;
  } else if (sec3.getBoundingClientRect().top > 0) {
    sec3LeftSide.style = ``;
  } else if (
    sec3.getBoundingClientRect().top +
      sec3.getBoundingClientRect().height -
      window.innerHeight <
    0
  ) {
    sec3LeftSide.style.transform = `translateY(${
      sec3.getBoundingClientRect().height - window.innerHeight
    }px)`;
  }

  window.requestAnimationFrame(render);
}

function li(a, b, n) {
  return (1 - n) * a + n * b;
}
