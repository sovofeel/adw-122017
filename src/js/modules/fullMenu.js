import isScroll from "./isScroll";
import clickToggleClass from "./clickToggleClass";
module.exports = (buttonClass, viewClass) => {
  /////
  let view = document.querySelector("." + viewClass);
  if (view) {
    console.log("in fullMenu");
    let scrollYes = () => {
      isScroll(true);
    };
    let scrollNo = () => {
      isScroll(false);
    };
    clickToggleClass(viewClass, buttonClass, scrollNo, scrollYes);
  }
};
