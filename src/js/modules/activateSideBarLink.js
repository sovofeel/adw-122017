import doFnElemVisible from "./doFnElemVisible";
module.exports = () => {
  ///////////
  console.log("in activateSideBarLink");
  let sideBarItems = document.querySelectorAll(".article__item");
  let articles = document.querySelectorAll(".article");
  let sideBarLinks = [];
  let offsetArticles = [];

  sideBarItems.forEach(sideBarLink => {
    sideBarLinks.push(sideBarLink);
  });
  // for(let i = 0; i < sideBarLinks.length; i++){
  //     console.log(sideBarLinks[i])
  // }
  articles.forEach(article => {
    offsetArticles.push(article.offsetTop);
  });

  for (let i = 0; i < sideBarLinks.length; i++) {
    // console.log('в цикле')
    var func = () => {
      for (let j = 0; j < sideBarLinks.length; j++) {
        sideBarLinks[j].classList.remove("article__item--active");
      }
      sideBarLinks[i].classList.add("article__item--active");
      // console.log(i+1)
    };
    doFnElemVisible({
      elemClass: "article" + (i + 1),
      fn: func,
      divider: 3,
      loop: true
    });
  }
};
