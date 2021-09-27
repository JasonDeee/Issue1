//
//
// Hi There, Have a good day

const body = document.body;
const main = document.getElementById("main_scroll");
const return_button = document.querySelector(".return_button");

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

  window.requestAnimationFrame(render);
}

function li(a, b, n) {
  return (1 - n) * a + n * b;
}
