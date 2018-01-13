module.exports = sideBarElem => {
  ///////////////////
  let sideBarOffset = sideBarElem.offsetTop;
  let sideBarPos = window.getComputedStyle(sideBarElem).position;
  window.addEventListener("scroll", function() {
    let scrollTopDoc = window.scrollY + 100;
    let moveSideBarVal = scrollTopDoc - sideBarOffset;

    if (moveSideBarVal >= 0) {
      sideBarElem.style.position = "fixed";
    } else {
      sideBarElem.style.position = "static";
    }
  });
};
