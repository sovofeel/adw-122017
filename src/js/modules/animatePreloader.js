import { setTimeout } from "timers";
import isScroll from "./isScroll.js";

module.exports = () => {
  const preloader = document.querySelector(".preloader");
  const preloaderSvg = document.querySelector(".preloader__svg");

  const circleOne = document.querySelector(".preloader__circle-one");
  const circleTwo = document.querySelector(".preloader__circle-two");
  const circleThree = document.querySelector(".preloader__circle-three");
  const preloaderText = document.querySelector(".preloader__text");
  let currentPercent = 0;

  let delayOfCircleOne = 30;
  let delayOfCircleTwo = 20;

  let animateInterval;

  let animatePreloader = () => {
    currentPercent += 5; // изменяется в зависимости от загрузки картинок

    if (currentPercent >= 100) {
      preloaderText.innerHTML = 100;
      currentPercent = 100;
      clearInterval(animateInterval);
      setTimeout(() => {
        preloaderSvg.style.opacity = 0;
        preloaderText.style.opacity = 0;
      }, 500);
      setTimeout(() => {
        preloader.style.opacity = 0;
        setTimeout(() => {
          preloader.style.display = "none";
          isScroll(true);
        }, 1500);
      }, 1000);
    }
    if (currentPercent > delayOfCircleOne) {
      circleOne.style.strokeDashoffset =
        440 -
        440 /
          100 *
          (currentPercent * (delayOfCircleOne / 100 + 1) - delayOfCircleOne);
    }
    if (currentPercent > delayOfCircleTwo) {
      circleTwo.style.strokeDashoffset =
        350 -
        350 /
          100 *
          (currentPercent * (delayOfCircleTwo / 100 + 1) - delayOfCircleTwo);
    }
    circleThree.style.strokeDashoffset = 260 - 260 / 100 * currentPercent;
    preloaderText.innerHTML = currentPercent;
  };

  if (preloaderSvg) {
    isScroll(false);
    animateInterval = setInterval(animatePreloader, 100);
  }
};
