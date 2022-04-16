'use strict';

document.addEventListener('DOMContentLoaded', () => {

   // В момент достижения блока шапка отлипает. Вариант №1 Тима start Работает ===================
   let lastScroll = 0;
   const defaultOffset = 1000;
   const header = document.querySelector('.header');
   //  И offsetWidth  и  clientWidth , оба варианта работают.
   // const headerWidth = header.clientWidth;
   const headerWidth = header.offsetWidth;
   // console.log(headerWidth);

   const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
   const containHide = () => header.classList.contains('hide');

   window.addEventListener('scroll', () => {
      if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset && headerWidth >= 700) {
         //scroll down
         header.classList.add('hide');
      }
      else if (scrollPosition() < lastScroll && containHide()) {
         //scroll up
         header.classList.remove('hide');
      }

      lastScroll = scrollPosition();
   });
   // В момент достижения блока шапка отлипает. Вариант №1 end  ==================================


   // Каталог ========================================================
   const catalogBtn = document.querySelector('.catalog__btn-push');
   const catalogBody = document.querySelector('.catalog__body');

   catalogBtn.addEventListener('click', function () {
      catalogBody.classList.toggle('catalog__body--active');
   });

   // Каталог ========================================================

   // Карта ==========================================================
   const map = L.map('map',
      {
         scrollWheelZoom: false
      })
      .setView({
         lat: 53.799322,
         lng: 87.154358,
      }, 15);
   // Add OSM tile leayer to the Leaflet map.
   L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
   ).addTo(map);

   const points = [
      {
         title: `  ООО «Сибмелочи»
         Кемеровская область,
         г. Новокузнецк,
         ул.
         25 лет Октября, д.11
                   `,
         lat: 53.799316,
         lng: 87.153153,
      },
   ];

   points.forEach(({ lat, lng, title }) => {
      const icon = L.icon({
         iconUrl: "images/map-img-blue.svg",
         iconSize: [165, 38],
         iconAnchor: [30, 0],
      });

      const marker = L.marker(
         {
            lat,
            lng,
            title,
         },
         {
            icon,
         },
      );
      marker.addTo(map)
         .bindPopup(title);
   });

   // Карта ==========================================================

   // Slider news-slider start =====================================================================================
   const news = new Swiper('.news-slider', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 4,
      spaceBetween: 30,
      slidesPerGroup: 1,
      speed: 800,
      // Responsive breakpoints
      breakpoints: {
         // when window width is >= 320px
         320: {
            slidesPerView: 1,
            spaceBetween: 10
         },
         // when window width is >= 480px
         480: {
            slidesPerView: 2,
            spaceBetween: 30
         },
         // when window width is >= 640px
         640: {
            slidesPerView: 3,
            spaceBetween: 30
         },
         800: {
            slidesPerView: 4,
            spaceBetween: 30
         },
         1000: {
            slidesPerView: 4,
            spaceBetween: 30
         },
         1200: {
            slidesPerView: 4,
            spaceBetween: 30
         }
      },

      // Navigation arrows
      navigation: {
         nextEl: '.news__button-next',
         prevEl: '.news__button-prev',
      },
   });
   // Slider news-slider end =======================================================================================

   // ======================================================================================

   // ======================================================================================
   // Slider new-products start =====================================================================================
   const newProducts = new Swiper('.new-slider', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 6,
      spaceBetween: 30,
      slidesPerGroup: 6,
      speed: 800,
      // Responsive breakpoints
      breakpoints: {
         // when window width is >= 320px
         320: {
            slidesPerView: 1,
            spaceBetween: 10,
            slidesPerGroup: 1,
         },
         // when window width is >= 480px
         480: {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesPerGroup: 2,
         },
         // when window width is >= 640px
         640: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
         },
         800: {
            slidesPerView: 4,
            spaceBetween: 30,
            slidesPerGroup: 4,
         },
         1000: {
            slidesPerView: 5,
            spaceBetween: 30,
            slidesPerGroup: 5,
         },
         1200: {
            slidesPerView: 6,
            spaceBetween: 30,
            slidesPerGroup: 6,
         }
      },

      // Navigation arrows
      navigation: {
         nextEl: '.new-products__button-next',
         prevEl: '.new-products__button-prev',
      },
   });
   // Slider new-products end =======================================================================================

   // Slider popular__slider start =====================================================================================
   const popular = new Swiper('.popular__slider', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 6,
      spaceBetween: 30,
      slidesPerGroup: 6,
      speed: 800,
      // Responsive breakpoints
      breakpoints: {
         // when window width is >= 320px
         320: {
            slidesPerView: 1,
            spaceBetween: 10,
            slidesPerGroup: 1,
         },
         // when window width is >= 480px
         480: {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesPerGroup: 2,
         },
         // when window width is >= 640px
         640: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
         },
         800: {
            slidesPerView: 4,
            spaceBetween: 30,
            slidesPerGroup: 4,
         },
         1000: {
            slidesPerView: 5,
            spaceBetween: 30,
            slidesPerGroup: 5,
         },
         1200: {
            slidesPerView: 6,
            spaceBetween: 30,
            slidesPerGroup: 6,
         }
      },

      // Navigation arrows
      navigation: {
         nextEl: '.products__button-next',
         prevEl: '.products__button-prev',
      },

   });
   // Slider popular__slider end =======================================================================================

   // Slider banner-slider start =====================================================================================
   const banner = new Swiper('.banner-slider', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
         el: '.swiper-pagination , .swiper-pagination-one',
         clickable: true,
      },

      // Navigation arrows
      navigation: {
         nextEl: '.swiper-button-next , .banner-button-next',
         prevEl: '.swiper-button-prev , .banner-button-prev',
      },

   });
   // Slider banner-slider end =======================================================================================
   // Меню бургер ======================================================================================
   //Burger start   ====================================================================================
   const iconMenu = document.querySelector(".icon-menu");
   const menuBody = document.querySelector(".menu__list");

   if (iconMenu) {
      iconMenu.addEventListener("click", function (e) {
         document.body.classList.toggle("_lock");
         iconMenu.classList.toggle("menu-open");
         // menuBody.classList.toggle("menu-open");
         menuBody.classList.toggle('menu__list--active');
      });
   }
   //Burger  end  ==========================================================================================

   //DYNAMIC ADAPT  start ===================================================================================
   // Dynamic Adapt v.1
   // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
   // e.x. data-da=".item,992,2"
   // Andrikanych Yevhen 2020
   // https://www.youtube.com/c/freelancerlifestyle

   // "use strict";

   function DynamicAdapt(type) {
      this.type = type;
   }

   DynamicAdapt.prototype.init = function () {
      const _this = this;
      // массив объектов
      this.оbjects = [];
      this.daClassname = "_dynamic_adapt_";
      // массив DOM-элементов
      this.nodes = document.querySelectorAll("[data-da]");

      // наполнение оbjects объктами
      for (let i = 0; i < this.nodes.length; i++) {
         const node = this.nodes[i];
         const data = node.dataset.da.trim();
         const dataArray = data.split(",");
         const оbject = {};
         оbject.element = node;
         оbject.parent = node.parentNode;
         оbject.destination = document.querySelector(dataArray[0].trim());
         оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
         оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.оbjects.push(оbject);
      }

      this.arraySort(this.оbjects);

      // массив уникальных медиа-запросов
      this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
         return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
      }, this);
      this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
         return Array.prototype.indexOf.call(self, item) === index;
      });

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      for (let i = 0; i < this.mediaQueries.length; i++) {
         const media = this.mediaQueries[i];
         const mediaSplit = String.prototype.split.call(media, ',');
         const matchMedia = window.matchMedia(mediaSplit[0]);
         const mediaBreakpoint = mediaSplit[1];

         // массив объектов с подходящим брейкпоинтом
         const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
         });
         matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
         });
         this.mediaHandler(matchMedia, оbjectsFilter);
      }
   };

   DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
      if (matchMedia.matches) {
         for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
         }
      } else {
         for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
               this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
         }
      }
   };

   // Функция перемещения
   DynamicAdapt.prototype.moveTo = function (place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
         destination.insertAdjacentElement('beforeend', element);
         return;
      }
      if (place === 'first') {
         destination.insertAdjacentElement('afterbegin', element);
         return;
      }
      destination.children[place].insertAdjacentElement('beforebegin', element);
   }

   // Функция возврата
   DynamicAdapt.prototype.moveBack = function (parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
         parent.children[index].insertAdjacentElement('beforebegin', element);
      } else {
         parent.insertAdjacentElement('beforeend', element);
      }
   }

   // Функция получения индекса внутри родителя
   DynamicAdapt.prototype.indexInParent = function (parent, element) {
      const array = Array.prototype.slice.call(parent.children);
      return Array.prototype.indexOf.call(array, element);
   };

   // Функция сортировки массива по breakpoint и place 
   // по возрастанию для this.type = min
   // по убыванию для this.type = max
   DynamicAdapt.prototype.arraySort = function (arr) {
      if (this.type === "min") {
         Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }

               if (a.place === "first" || b.place === "last") {
                  return -1;
               }

               if (a.place === "last" || b.place === "first") {
                  return 1;
               }

               return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
         });
      } else {
         Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }

               if (a.place === "first" || b.place === "last") {
                  return 1;
               }

               if (a.place === "last" || b.place === "first") {
                  return -1;
               }

               return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
         });
         return;
      }
   };

   const da = new DynamicAdapt("max");
   da.init();


   // DYNAMIC ADAPT  end =====================================================================================

});

//=====  JQuery  start  =============================================================

$(document).ready(function () {
   $("form").submit(function () { // Событие отправки с формы
      var form_data = $(this).serialize(); // Собираем данные из полей
      $.ajax({
         type: "POST", // Метод отправки
         url: "send.php", // Путь к PHP обработчику sendform.php
         data: form_data,
         success: function () {
            $('.overley').addClass('overley-visible');
            $('.modal').addClass('modal__visible');
         }
      }).done(function () {
         $(this).find('input').val('');
         $('form').trigger('reset');
      });
      event.preventDefault();
   });
});


// Slick slider start ====================================================================
$(function () {
   $('.popular-item__favorite').on('click', function () {
      $(this).toggleClass('popular-item__favorite--active');
   });
});


// Slick slider finish ====================================================================

//=====  JQuery  finish ===================================================================
