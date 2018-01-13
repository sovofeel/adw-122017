import fullMenu from "./modules/fullMenu";
import mapInit from "./modules/maps.js";
import flipLoginForm from "./modules/flipLoginForm";
import skillProgressInit from "./modules/skillProgressInit";
import blogSideBar from "./modules/blogSideBar";
import svg4everybody from "svg4everybody";
import blurForm from "./modules/blurForm";
import parallaxBg from "./modules/parallaxMountains";
import smoothScrollClick from "./modules/smothScrollClick.js";
import animatePreloader from "./modules/animatePreloader";
import admin from "./modules/admin";
import slider from "./modules/slider";

let domready = function() {
  //DOM дерево загрузилось
  svg4everybody(); //запуск скрипта чтобы все внешние подключения svg были кроссбраузерными

  animatePreloader();

  parallaxBg(); //запуск скрипта инициализации паралакса

  flipLoginForm(
    "welcome__login-button",
    "login__buttons-main",
    "flip__container"
  ); //flip container need to be a class

  smoothScrollClick("header__arrow-img", "content");
  smoothScrollClick("footer__arrow", "wrapper");

  fullMenu("hamburger", "menu");

  blurForm();

  mapInit("map");
  skillProgressInit("skill", "skill__bar", "data-pct"); //классы без .
  slider();
  blogSideBar("article__list", "article__list-circle");

  admin();
  ///////
};

//////////domready/////////////
if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  domready();
} else {
  document.addEventListener("DOMContentLoaded", domready);
}
/////////////////////////////
