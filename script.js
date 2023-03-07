"use strict";
// ***********************************
// DESC Dom elements
// ***********************************
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const slider = document.querySelector(".slider");
const slide = [...document.querySelectorAll(".slider__content")];
const sliderDotContainer = document.querySelector(".slider__dots");
const sections = [...document.querySelectorAll("section")];
const news = document.querySelector(".section-news");
const main = document.querySelector(".main");
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".close");
const navContainer = document.querySelector(".navigation-container");
const navList = document.querySelector(".navigation__list");
const btnNext = document.querySelector(".cart__traverse--next");
const btnPrev = document.querySelector(".cart__traverse--perv");
// ***********************************
// DESC Scroll animations
// ***********************************
// sticky navigation
main.style.paddingTop = `${
  Number.parseFloat(getComputedStyle(header).height) + 40
}px`;
const newsObserver = new IntersectionObserver(
  function (e) {
    e.forEach((el) => {
      if (!el.isIntersecting) {
        header.classList.add("js-poz-fixed");
      } else {
        header.classList.remove("js-poz-fixed");
      }
    });
  },
  { root: null, rootMargin: `-${getComputedStyle(header).height}` }
);
newsObserver.observe(news);

// fade in animation on scroll

const sectionObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((e) => {
      if (!e.isIntersecting || e.target.classList.contains("section-news")) {
        return;
      }
      e.target.classList.remove("js-fadein");
      observer.unobserve(e.target);
    });
  },
  { root: null, rootMargin: "-30%" }
);
sections.forEach((sec) => {
  if (sec.classList.contains("section-news")) {
    return;
  }
  sec.classList.add("js-fadein");
  sectionObserver.observe(sec);
});
// scroll event for footer
footer.querySelector(".footer__information").classList.add("js-fadein-left");
footer.querySelector(".footer__newsletter").classList.add("js-fadein-right");
const footerObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target
      .querySelector(".footer__information")
      .classList.remove("js-fadein-left");
    entry.target
      .querySelector(".footer__newsletter")
      .classList.remove("js-fadein-right");
  },
  { rootMargin: "-30%" }
);
footerObserver.observe(footer);
// ***********************************
// DESC Slider
// ***********************************
const sliderRun = function () {
  let currentSlide = 0;

  const activeSlide = function (curSlide) {
    slide.forEach((sl, i) => {
      // sl.setAttribute(`data-slide`, i);
      sl.style.setProperty("transform", `translateX(${100 * (i - curSlide)}%)`);
    });
  };

  const sliderInit = function () {
    sliderDotContainer.innerHTML = "";
    slide.forEach((sl, i) => {
      // sl.setAttribute(`data-slide`, i);
      // creating new dots per slide
      const newDot = document.createElement("span");
      newDot.classList.add("slider__dot");
      newDot.setAttribute(`data-slide`, i);
      sliderDotContainer.append(newDot);
    });
    sliderDotContainer.firstChild.classList.add("slider__dot--active");
  };
  sliderInit();
  activeSlide(0);

  // click event for dots
  sliderDotContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("slider__dot")) return;
    document.querySelectorAll(".slider__dot").forEach((sl) => {
      sl.classList.remove("slider__dot--active");
    });
    e.target.classList.add("slider__dot--active");
    currentSlide = e.target.dataset.slide;
    activeSlide(currentSlide);
  });

  setInterval(function () {
    currentSlide++;
    if (currentSlide === 3) {
      currentSlide = 0;
    }
    document.querySelectorAll(".slider__dot").forEach((sl) => {
      sl.classList.remove("slider__dot--active");
    });
    document
      .querySelector(`.slider__dot[data-slide="${currentSlide}"]`)
      .classList.add("slider__dot--active");

    activeSlide(currentSlide);
  }, 5000);
};
sliderRun();
// ***********************************
// DESC cart navigation
// ***********************************
// let currentSlide = 0;
// const carts = document.querySelectorAll(".cart");
// btnNext.addEventListener("click", function () {
//   carts.forEach((cart, i) => {
//     cart.style.transform = `translate(-${100 * i}%)`;
//   });
// });
// ***********************************
// DESC navigation
// ***********************************

const navIcon = document.querySelector("#nav-icon");
const navOpen = function () {
  overlay.classList.remove("js-hidden");
  navContainer.classList.remove("js-hidden");
};
const navClose = function () {
  overlay.classList.add("js-hidden");
  navContainer.classList.add("js-hidden");
};
navIcon.addEventListener("click", navOpen);
overlay.addEventListener("click", navClose);
btnClose.addEventListener("click", navClose);
