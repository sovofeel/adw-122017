//функция разрешения/запрета скролла//
let prevDef = event => {
  event.preventDefault();
};
module.exports = bool => {
  console.log("in isScroll.js");
  document.onmousewheel = document.onwheel = function() {
    return !bool ? false : true;
  };
  if (bool == false) {
    document.addEventListener("touchmove", prevDef, false);
  } else {
    document.removeEventListener("touchmove", prevDef, false);
  }
  document.addEventListener(
    "MozMousePixelScroll",
    function() {
      return !bool ? false : true;
    },
    false
  );
  document.onkeydown = function(e) {
    if (e.keyCode >= 33 && e.keyCode <= 40) {
      return !bool ? false : true;
    }
  };
};
