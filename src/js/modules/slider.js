module.exports = () => {
  let sliderBlock = document.querySelector("#slider");
  let currentSliderImg = document.querySelector(".work__current-img");

  let sliderInit = () => {
    let workNum = 0;
    let slider = new Vue({
      el: "#slider",
      data: {
        showCurrent: true,
        showNext: true,
        showPrevious: true,
        works: [
          {
            title: "Сайт школы онлайн образования",
            tech: "HTML, CSS, Javascript",
            href: "https://loftschool.com",
            linkText: "Посмотреть сайт",
            img: "img/work-1.png"
          },
          {
            title: "Статичный сайт",
            tech: "HTML, CSS",
            href: "#",
            linkText: "Заценить",
            img: "img/work-2.png"
          },
          {
            title: "Лэндинг",
            tech: "HTML, CSS, Javascriptб jQuery",
            href: "#",
            linkText: "Вкусить",
            img: "img/work-3.png"
          },
          {
            title: "Сайт-визитка",
            tech: "HTML, CSS, Javascript",
            href: "#",
            linkText: "Изумиться",
            img: "loremGif.gif"
          }
        ],
        currentProject: {},
        previousProject: {},
        previousProject2: {},
        nextProject: {},
        nextProject2: {}
      },
      methods: {
        nextproject: function() {
          workNum < this.works.length - 1 ? workNum++ : (workNum = 0);
          let changeNext = new Promise((resolve, reject) => {
            resolve();
          })
            .then(() => {
              changeOthers(workNum, this);
            })
            .then(() => {
              this.showCurrent = !this.showCurrent;
              this.showNext = !this.showNext;
              this.showPrevious = !this.showPrevious;
            });
        },
        previousproject: function() {
          workNum > 0 ? workNum-- : (workNum = this.works.length - 1);
          let changePrevious = new Promise((resolve, reject) => {
            resolve();
          })
            .then(() => {
              changeOthers(workNum, this);
            })
            .then(() => {
              this.showCurrent = !this.showCurrent;
              this.showNext = !this.showNext;
              this.showPrevious = !this.showPrevious;
            });
        },
        afterLeaveCurrent: function() {
          this.showCurrent = !this.showCurrent;
          changeCurrent(workNum, this);
        },
        afterLeaveNext: function() {
          this.showNext = !this.showNext;
        },
        afterLeavePrevious: function() {
          this.showPrevious = !this.showPrevious;
        }
      }
    });

    /////////инициализация слайдов/////
    slider.currentProject = slider.works[workNum];
    slider.nextProject = slider.works[workNum + 1];
    slider.nextProject2 = slider.works[workNum + 2];
    slider.previousProject = slider.works[slider.works.length - 1];
    slider.previousProject2 = slider.works[slider.works.length - 2];
    //////функции по замене слайдов//////
    let changeCurrent = (workNum, $this) => {
      $this.currentProject = $this.works[workNum];
      workNum < $this.works.length - 1
        ? ($this.nextProject = $this.works[workNum + 1])
        : ($this.nextProject = $this.works[0]);
      workNum > 0
        ? ($this.previousProject = $this.works[workNum - 1])
        : ($this.previousProject = $this.works[$this.works.length - 1]);
    };
    let changeOthers = (workNum, $this) => {
      workNum < $this.works.length - 1
        ? ($this.nextProject2 = $this.works[workNum + 1])
        : ($this.nextProject2 = $this.works[0]);
      workNum > 0
        ? ($this.previousProject2 = $this.works[workNum - 1])
        : ($this.previousProject2 = $this.works[$this.works.length - 1]);
    };
  };

  if (sliderBlock) {
    sliderInit();
  }
};
