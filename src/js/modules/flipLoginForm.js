module.exports = (loginButton, mainButton, flipContainer) => {
  ///////////////
  let flip = document.querySelector("." + flipContainer);
  let login = document.querySelector("." + loginButton);
  let main = document.querySelector("." + mainButton);
  if (flip && login && main) {
    login.addEventListener("click", () => {
      flip.classList.add(flipContainer + "--active");
      login.style.opacity = "0";
      login.style.cursor = "default";
    });
    main.addEventListener("click", () => {
      flip.classList.remove(flipContainer + "--active");
      login.style.opacity = "1";
      login.style.cursor = "pointer";
    });
  }
  ////////////////////////
};
