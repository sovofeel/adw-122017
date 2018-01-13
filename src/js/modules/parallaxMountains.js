module.exports = () => {
  //////////////////
  const parallaxContainer = document.getElementById("parallax");
  if (parallaxContainer) {
    let layers = parallaxContainer.children;
    window.addEventListener("mousemove", moveLayers);
  }
  const moveLayers = event => {
    let initialX = window.innerWidth / 2 - event.pageX;
    let initialY = window.innerHeight / 2 - event.pageY;
    let i = 0;
    for (let layer of layers) {
      let divider = i / 80,
        positionX = initialX * divider,
        positionY = initialY * divider,
        bottomPosition = window.innerHeight / 2 * divider,
        image = layer.firstElementChild;
      image.style.bottom = "-" + bottomPosition + "px";
      if (event.pageY <= window.innerHeight) {
        layer.style.transform =
          "translate(" + positionX + "px, " + positionY + "px)";
      }
      i++;
    }
  };

  /////////////////
};
