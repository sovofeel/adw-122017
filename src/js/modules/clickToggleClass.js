module.exports = (elemClass, buttonClass, fnActive, fn) => {
  ////////////
  fn =
    fn ||
    function() {
      console.log("empty fn in clickToggleClass");
    };
  fnActive =
    fnActive ||
    function() {
      console.log("empty fnActive in clickToggleClass");
    };

  let elem = document.querySelector("." + elemClass);
  let button = document.querySelector("." + buttonClass);
  let containerToggle = () => {
    elem.classList.toggle(elemClass + "--active");
    elem.classList.contains(elemClass + "--active") ? fnActive() : fn();
  };
  if (elem && button) {
    console.log("in clickToggleClass");
    button.addEventListener("click", containerToggle);
  }
  ///////////////
};
