import clickToggleClass from "./clickToggleClass";
import doFnElemVisible from "./doFnElemVisible";
import jump from "jump.js";
import moveSideBar from "./moveSideBar";
import activateSideBarLink from "./activateSideBarLink";

module.exports = (sideBarClass, buttonClass) => {
  ////////////
  let sideBar = document.querySelector("." + sideBarClass);
  let button = document.querySelector("." + buttonClass);
  let touchEvent = () => {
    var initialPoint;
    var finalPoint;
    document.addEventListener(
      "touchstart",
      function(event) {
        // event.preventDefault();
        event.stopPropagation();
        initialPoint = event.changedTouches[0];
      },
      false
    );
    document.addEventListener(
      "touchend",
      function(event) {
        // event.preventDefault();
        event.stopPropagation();
        finalPoint = event.changedTouches[0];
        var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
          if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX) {
              /*СВАЙП ВЛЕВО*/
              sideBar.classList.remove(sideBarClass + "--active");
            } else {
              /*СВАЙП ВПРАВО*/
              sideBar.classList.add(sideBarClass + "--active");
            }
          } else {
            if (finalPoint.pageY < initialPoint.pageY) {
              /*СВАЙП ВВЕРХ*/
            } else {
              /*СВАЙП ВНИЗ*/
            }
          }
        }
      },
      false
    );
  };

  let sideBarJumpFn = () => {
    console.log("in sideBarJumpFn");
    sideBar.addEventListener("click", event => {
      let targetLink = event.target;
      // targetLink.children('.articles__item').classList.add('articles__item--active')
      let anchorNum = targetLink.getAttribute("href");
      if (anchorNum) {
        anchorNum = anchorNum.slice(1);
        let targetArticle = document.querySelector("#article" + anchorNum);
        if (targetArticle) {
          let offsetArticle;
          document.body.clientWidth >= 1025
            ? (offsetArticle = -50)
            : (offsetArticle = -20);
          jump("#article" + anchorNum, {
            duration: 1000,
            offset: offsetArticle,
            callback: undefined,
            easing: easeInOutQuad,
            a11y: false
          });
          sideBar.classList.remove(sideBarClass + "--active");
        }
      }
    });
  };

  if (sideBar && button) {
    ////////////
    console.log("in blogSideBar");
    activateSideBarLink();
    let startLeftPos = window.getComputedStyle(button).left;
    button.style.left = -100 + "px";

    let sideBarVisible = function() {
      button.style.left = startLeftPos;
      touchEvent();
    };

    clickToggleClass(sideBarClass, buttonClass);
    sideBarJumpFn();

    activateSideBarLink();

    if (document.body.clientWidth <= 1024)
      doFnElemVisible({
        elemClass: "articles",
        fn: sideBarVisible
      });
    else moveSideBar(sideBar);
    window.addEventListener("resize", () => {
      activateSideBarLink();

      if (document.body.clientWidth <= 1024) {
        button.style.left = -30 + "px";
        sideBar.style.top = -5 + "vh";

        touchEvent();
      } else moveSideBar(sideBar);
    });

    ////////////
  }

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };
  ////////////
};
