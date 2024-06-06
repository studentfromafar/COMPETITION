// script.js

let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop === 0) {
    // If at the top of the page, show the navbar
    navbar.style.top = "0";
  } else if (scrollTop > lastScrollTop) {
    // Downscroll
    navbar.style.top = "-90px"; // Adjust this value based on your navbar height
  } else {
    // Upscroll
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];
let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};
const sections = document.querySelectorAll("section");
let isScrolling = false;

// Function to handle scroll
function scrollToSection() {
  isScrolling = true;
  const currentScroll = window.scrollY;

  let targetSection = sections[0];
  let minDistance = Math.abs(currentScroll - targetSection.offsetTop);

  // Find the section closest to the current scroll position
  sections.forEach((section) => {
    const distance = Math.abs(currentScroll - section.offsetTop);
    if (distance < minDistance) {
      minDistance = distance;
      targetSection = section;
    }
  });

  // Scroll to the target section
  window.scrollTo({
    top: targetSection.offsetTop,
    behavior: "smooth",
  });

  // Reset scrolling flag after a short delay
  setTimeout(() => {
    isScrolling = false;
  }, 100);
}

// Event listener for scroll
window.addEventListener("scroll", () => {
  if (!isScrolling) {
    scrollToSection();
  }
});

