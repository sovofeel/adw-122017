"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const groupMediaQueries = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-cleancss");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const replace = require("gulp-replace");
const del = require("del");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const pug = require("gulp-pug");
const svgSprite = require("gulp-svg-sprites");
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const gulpWebpack = require("gulp-webpack");
const webpack = require("webpack");
const sftp = require("gulp-sftp");
const webpackConfig = require("./webpack.config.js");

var isDev = true;

const paths = {
  src: {
    self: "src/",
    sass: "./src/sass/",
    pug: "./src/pug/",
    img: "./src/img/",
    js: "./src/js/",
    fonts: "./src/fonts/",
    php: "./src/php/"
  },
  build: {
    self: "build/",
    css: "./build/css/",
    js: "./build/js/",
    html: "./build/",
    img: "./build/img/",
    fonts: "./build/fonts/",
    php: "./build/php/"
  },
  not: ["!./src/img/mountains/**/*.{jpg,png,jpeg}"],
  all: "**/*.*",
  project: "advanced-loftblog/" // paths.project - name of project
};

/*------------------------------------------------*/

var onError = function(error) {
  gutil.beep();
  console.log(error);
};

/*------------------------------------------------*/

////////////////////////////////////
////////////BUILD///////////////////
////////////////////////////////////

////Обработка jpg,png,jpeg
function imgBuild() {
  if (isDev) {
    return gulp
      .src([paths.src.img + "**/*.{jpg,png,jpeg}"])
      .pipe(plumber())
      .pipe(gulp.dest(paths.build.img))
      .pipe(
        browserSync.reload({
          stream: true
        })
      ); //перезагрузка браузера
  } else {
    return gulp
      .src([
        paths.src.img + "**/*.{jpg,png,jpeg}",
        "!" + paths.src.img + "mountains/original/*.*"
      ])
      .pipe(plumber())
      .pipe(
        imagemin({
          // скудное сжатие
          progressive: true,
          interlaced: true
        })
      )
      .pipe(gulp.dest(paths.build.img));
  }
}

//Просто перетаскивание шрифтов( потом добавлю их обработку )
function fontsBuild() {
  return gulp
    .src(paths.src.fonts + "*.*")
    .pipe(plumber())
    .pipe(gulp.dest(paths.build.fonts))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

//Просто перетаскивание favicon
function rootFilesBuild() {
  return gulp
    .src([
      paths.src.self + "favicon.ico",
      paths.src.self + ".htaccess",
      paths.src.js + "vue.min.js",
      paths.src.img + "**/*.gif"
    ])
    .pipe(plumber())
    .pipe(gulp.dest(paths.build.self))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

//Пока что только перетаскивание php шрифтов
function phpBuild() {
  return gulp
    .src(paths.src.php + "**/*.php")
    .pipe(plumber())
    .pipe(gulp.dest(paths.build.php))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

// Создание спрайта из иконок
function spriteBuild() {
  return gulp
    .src(paths.src.img + "icons/*.svg")
    .pipe(
      cheerio({
        run: function($) {
          $("[fill]").removeAttr("fill"); // удаляем инлайновое назначение цвета чтобы в css задать
        }
      })
    )
    .pipe(
      svgSprite({
        mode: "symbols",
        preview: false
      })
    ) //к иконке теперь можно обращаться img/svg/symbols.svg#icon
    .pipe(gulp.dest(paths.build.img))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

// Компиляция препроцессора SASS
function sassBuild() {
  if (isDev) {
    return gulp
      .src(paths.src.sass + "*.sass")
      .pipe(plumber())
      .pipe(sassGlob())
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          includePaths: require("node-normalize-scss").includePaths
        })
      ) // компиляция
      .pipe(
        autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
          cascade: true
        })
      )
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.build.css))
      .pipe(
        browserSync.reload({
          stream: true
        })
      );
  } else {
    return gulp
      .src(paths.src.sass + "*.sass")
      .pipe(plumber())
      .pipe(sassGlob())
      .pipe(
        sass({
          includePaths: require("node-normalize-scss").includePaths
        })
      ) // компиляция
      .pipe(
        autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
          cascade: true
        })
      )
      .pipe(groupMediaQueries()) // группировка медиазапросов
      .pipe(cleanCSS()) //минификация
      .pipe(gulp.dest(paths.build.css));
  }
}

// Webpack
function scriptsBuild() {
  // run webpack
  return gulp
    .src(paths.src.js + "app.js")
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.build.js))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

// Компиляция Pug
function htmlBuild() {
  return gulp
    .src(paths.src.pug + "pages/*.pug")
    .pipe(plumber())
    .pipe(pug()) //
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, "")) //удаление коммнтариев вида <!--DEV * -->
    .pipe(gulp.dest(paths.build.self))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}
// Удаление build
function clean() {
  return del(paths.build.self);
}

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

exports.imgBuild = imgBuild;
exports.fontsBuild = fontsBuild;
exports.rootFilesBuild = rootFilesBuild;
exports.phpBuild = phpBuild;
exports.sassBuild = sassBuild;
exports.spriteBuild = spriteBuild;
exports.scriptsBuild = scriptsBuild;
exports.htmlBuild = htmlBuild;

exports.clean = clean;

gulp.task(
  "preBuild",
  gulp.series(
    imgBuild,
    fontsBuild,
    rootFilesBuild,
    phpBuild,
    sassBuild,
    spriteBuild,
    scriptsBuild,
    htmlBuild
  )
);

// Наблюдение за файлами
function watch() {
  gulp.watch(paths.src.sass + paths.all, gulp.series(sassBuild));
  gulp.watch(paths.src.js + paths.all, gulp.series(scriptsBuild));
  gulp.watch(paths.src.pug + paths.all, gulp.series(htmlBuild));
  gulp.watch(
    [
      paths.src.img + paths.all,
      paths.src.fonts + paths.all,
      paths.src + "favicon.ico",
      paths.src.js + "**/*.json",
      paths.src.php + paths.all
    ],
    gulp.series("preBuild")
  );
}

// Запуск сервера
function serve() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}
///////////////////////////////////////////////////////////
// Просто сборка
gulp.task("build", gulp.series(clean, "preBuild"));

exports.watch = watch;
exports.serve = serve;
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// Сборка и наблюдение и сервак
gulp.task("default", gulp.series("build", gulp.parallel(watch, serve)));
