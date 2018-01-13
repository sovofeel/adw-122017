module.exports = options => {
  options = {
    elemClass: options.elemClass || "undefined",
    fn: options.fn || function() {},
    divider: options.divider || 2,
    loop: options.loop || false
  };
  ////////////
  let elemClass = options.elemClass,
    fn = options.fn,
    divider = options.divider,
    loop = options.loop,
    fnDone = false;

  let elem = document.querySelector("." + elemClass);
  if (!elem) elem = document.querySelector("#" + elemClass);

  let checkDistance = (scrollTop, elem) => {
    let offset = elem.offsetTop;
    let windowMargin = Math.ceil(window.innerHeight / divider);
    let topBorder = offset - scrollTop - windowMargin;
    let bottomEdge = elem.clientHeight + offset;
    let bottomBorder = scrollTop + windowMargin - bottomEdge;
    return {
      top: topBorder,
      bottom: bottomBorder
    };
  };
  let scrollFn = () => {
    let scrollTop = window.scrollY;
    if (fnDone) {
      return 0;
    }
    if (
      checkDistance(scrollTop, elem).top <= 0 &&
      checkDistance(scrollTop, elem).bottom <= 0
    ) {
      fn();
      // (loop) ? fnDone = false : fnDone = true
      loop ? (fnDone = false) : (fnDone = true);
    }
  };

  if (elem) {
    window.addEventListener("scroll", scrollFn);
  }
  /////////////
};
