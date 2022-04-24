'use strict';

document.addEventListener('DOMContentLoaded', () => {


   // АККОРДЕОН start ==========================================================================
   // let btns = document.querySelectorAll('.accordeon-btn');

   // btns.forEach(elem => {
   //    elem.addEventListener('click', function () {
   //       this.classList.toggle("active");
   //       let panel = this.nextElementSibling;
   //       if (panel.style.maxHeight) {
   //          panel.style.maxHeight = null;
   //       } else {
   //          panel.style.maxHeight = panel.scrollHeight + "px";
   //       }
   //    });
   // });
   // АККОРДЕОН end ==============================================================================


   //==== Модуь работы со спойлерами  start =======================================================================================================================================================================================================================
   /*
   Для родителя слойлеров пишем атрибут data-spollers
   Для заголовков слойлеров пишем атрибут data-spoller
   Если нужно включать\выключать работу спойлеров на разных размерах экранов
   пишем параметры ширины и типа брейкпоинта.
   
   Например: 
   data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
   data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px
   
   Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
   */

   const spollersArray = document.querySelectorAll('[data-spollers]');
   if (spollersArray.length > 0) {
      // Получение обычных слойлеров
      const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
         return !item.dataset.spollers.split(",")[0];
      });
      // Инициализация обычных слойлеров
      if (spollersRegular.length > 0) {
         initSpollers(spollersRegular);
      }
      // Получение слойлеров с медиа запросами
      const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
         return item.dataset.spollers.split(",")[0];
      });
      // Инициализация слойлеров с медиа запросами
      if (spollersMedia.length > 0) {
         const breakpointsArray = [];
         spollersMedia.forEach(item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
         });
         // Получаем уникальные брейкпоинты
         let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
         });
         mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
         });
         // Работаем с каждым брейкпоинтом
         mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
            // Объекты с нужными условиями
            const spollersArray = breakpointsArray.filter(function (item) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true;
               }
            });
            // Событие
            matchMedia.addEventListener("change", function () {
               initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
         });
      }
      // Инициализация
      function initSpollers(spollersArray, matchMedia = false) {
         spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
               spollersBlock.classList.add('_spoller-init');
               initSpollerBody(spollersBlock);
               spollersBlock.addEventListener("click", setSpollerAction);
            } else {
               spollersBlock.classList.remove('_spoller-init');
               initSpollerBody(spollersBlock, false);
               spollersBlock.removeEventListener("click", setSpollerAction);
            }
         });
      }
      // Работа с контентом
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
         const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
         if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
               if (hideSpollerBody) {
                  spollerTitle.removeAttribute('tabindex');
                  if (!spollerTitle.classList.contains('_spoller-active')) {
                     spollerTitle.nextElementSibling.hidden = true;
                  }
               } else {
                  spollerTitle.setAttribute('tabindex', '-1');
                  spollerTitle.nextElementSibling.hidden = false;
               }
            });
         }
      }
      function setSpollerAction(e) {
         const el = e.target;
         if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
               if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
                  hideSpollersBody(spollersBlock);
               }
               spollerTitle.classList.toggle('_spoller-active');
               _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
         }
      }
      function hideSpollersBody(spollersBlock) {
         const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
         if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_spoller-active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
         }
      }
   }

   //==== 
   //==== Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
   let _slideUp = (target, duration = 500, showmore = 0) => {
      if (!target.classList.contains('_slide')) {
         target.classList.add('_slide');
         target.style.transitionProperty = 'height, margin, padding';
         target.style.transitionDuration = duration + 'ms';
         target.style.height = `${target.offsetHeight}px`;
         target.offsetHeight;
         target.style.overflow = 'hidden';
         target.style.height = showmore ? `${showmore}px` : `0px`;
         target.style.paddingTop = 0;
         target.style.paddingBottom = 0;
         target.style.marginTop = 0;
         target.style.marginBottom = 0;
         window.setTimeout(() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty('height') : null;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            !showmore ? target.style.removeProperty('overflow') : null;
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
         }, duration);
      }
   }
   let _slideDown = (target, duration = 500, showmore = 0) => {
      if (!target.classList.contains('_slide')) {
         target.classList.add('_slide');
         target.hidden = target.hidden ? false : null;
         showmore ? target.style.removeProperty('height') : null;
         let height = target.offsetHeight;
         target.style.overflow = 'hidden';
         target.style.height = showmore ? `${showmore}px` : `0px`;
         target.style.paddingTop = 0;
         target.style.paddingBottom = 0;
         target.style.marginTop = 0;
         target.style.marginBottom = 0;
         target.offsetHeight;
         target.style.transitionProperty = "height, margin, padding";
         target.style.transitionDuration = duration + 'ms';
         target.style.height = height + 'px';
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
         }, duration);
      }
   }
   let _slideToggle = (target, duration = 500) => {
      if (target.hidden) {
         return _slideDown(target, duration);
      } else {
         return _slideUp(target, duration);
      }
   }
   //===
   //==== Модуь работы со спойлерами  end    ===============================================================


   //==== Модуь работы с табами ============================================================================
   /*
   Для родителя табов пишем атрибут data-tabs
   Для родителя заголовков табов пишем атрибут data-tabs-titles
   Для родителя блоков табов пишем атрибут data-tabs-body
   
   Если нужно чтобы табы открывались с анимацией 
   добавляем к data-tabs data-tabs-animate
   По умолчанию, скорость анимации 500ms, 
   указать свою скорость можно так: data-tabs-animate="1000"
   
   Если нужно чтобы табы превращались в "спойлеры" на неком размере экранов пишем параметры ширины.
   Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
   */

   const tabs = document.querySelectorAll('[data-tabs]');
   let tabsActiveHash = [];

   if (tabs.length > 0) {
      const hash = location.hash.replace('#', '');
      if (hash.startsWith('tab-')) {
         tabsActiveHash = hash.replace('tab-', '').split('-');
      }
      tabs.forEach((tabsBlock, index) => {
         tabsBlock.classList.add('_tab-init');
         tabsBlock.setAttribute('data-tabs-index', index);
         tabsBlock.addEventListener("click", setTabsAction);
         initTabs(tabsBlock);
      });

      // Получение табов с медиа запросами
      const tabsMedia = Array.from(tabs).filter(function (item, index, self) {
         return item.dataset.tabs;
      });
      // Инициализация табов с медиа запросами
      if (tabsMedia.length > 0) {
         initMediaTabs(tabsMedia);
      }
   }
   // Инициализация табов с медиа запросами
   function initMediaTabs(tabsMedia) {
      const breakpointsArray = [];
      tabsMedia.forEach(item => {
         const breakpointValue = item.dataset.tabs;

         const tabsBreakpointsObject = {};
         tabsBreakpointsObject.value = breakpointValue;
         tabsBreakpointsObject.item = item;

         breakpointsArray.push(tabsBreakpointsObject);
      });

      // Получаем уникальные брейкпоинты
      let mediaQueries = breakpointsArray.map(function (item) {
         return `(max-width:${item.value}px),${item.value}`;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
         return self.indexOf(item) === index;
      });

      // Работаем с каждым брейкпоинтом
      mediaQueries.forEach(breakpoint => {
         const paramsArray = breakpoint.split(",");
         const matchMedia = window.matchMedia(paramsArray[0]);
         const mediaBreakpoint = paramsArray[1];

         // Объекты с нужными условиями
         const tabsMediaArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint) {
               return true;
            }
         });

         // Событие
         matchMedia.addEventListener("change", function () {
            setTitlePosition(tabsMediaArray, matchMedia);
         });
         setTitlePosition(tabsMediaArray, matchMedia);
      });
   }
   // Установка позиций заголовков
   function setTitlePosition(tabsMediaArray, matchMedia) {
      tabsMediaArray.forEach(tabsMediaItem => {
         tabsMediaItem = tabsMediaItem.item;
         const tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
         const tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
         const tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
         const tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
         tabsContentItems.forEach((tabsContentItem, index) => {
            if (matchMedia.matches) {
               tabsContent.append(tabsTitleItems[index]);
               tabsContent.append(tabsContentItem);
               tabsMediaItem.classList.add('_tab-spoller');
            } else {
               tabsTitles.append(tabsTitleItems[index]);
               tabsMediaItem.classList.remove('_tab-spoller');
            }
         });
      });
   }
   // Работа с контентом
   function initTabs(tabsBlock) {
      const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
      const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

      if (tabsActiveHashBlock) {
         const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
         tabsActiveTitle.classList.remove('_tab-active');
      }
      if (tabsContent.length > 0) {
         tabsContent.forEach((tabsContentItem, index) => {
            tabsTitles[index].setAttribute('data-tabs-title', '');
            tabsContentItem.setAttribute('data-tabs-item', '');

            if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
               tabsTitles[index].classList.add('_tab-active');
            }
            tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
         });
      }
   }
   function setTabsStatus(tabsBlock) {
      const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
      const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

      function isTabsAnamate(tabsBlock) {
         if (tabsBlock.hasAttribute('data-tabs-animate')) {
            return tabsBlock.dataset.tabsAnimate > 0 ? tabsBlock.dataset.tabsAnimate : 500;
         }
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);

      if (tabsContent.length > 0) {
         tabsContent.forEach((tabsContentItem, index) => {
            if (tabsTitles[index].classList.contains('_tab-active')) {
               if (tabsBlockAnimate) {
                  _slideDown(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = false;
               }
               location.hash = `tab-${tabsBlockIndex}-${index}`;
            } else {
               if (tabsBlockAnimate) {
                  _slideUp(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = true;
               }
            }
         });
      }
   }
   function setTabsAction(e) {
      const el = e.target;
      if (el.closest('[data-tabs-title]')) {
         const tabTitle = el.closest('[data-tabs-title]');
         const tabsBlock = tabTitle.closest('[data-tabs]');
         if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelectorAll('._slide').length) {

            const tabActiveTitle = tabsBlock.querySelector('[data-tabs-title]._tab-active');
            if (tabActiveTitle) {
               tabActiveTitle.classList.remove('_tab-active');
            }

            tabTitle.classList.add('_tab-active');
            setTabsStatus(tabsBlock);
         }
         e.preventDefault();
      }
   }

   //==== Модуь работы с табами end   ========================================================================



   // Скрыть/показать "ВСЕ КАТЕГОРИИ"  ====================================================
   const categoriesItemsAllBtn = document.querySelector('.categories__box-all');
   const categoriesBoxHiddens = document.querySelectorAll('.categories__box-hidden');
   const categoriesItemText = document.querySelector('.categories__item-text--white');

   categoriesItemsAllBtn.addEventListener('click', function (e) {
      e.preventDefault();
      categoriesBoxHiddens.forEach(elem => {

         if (elem.classList.contains('categories__box-hidden--active')) {
            elem.classList.toggle('categories__box-hidden--active');
            categoriesItemText.innerText = 'Все категории ';
         }
         else if (elem.classList.contains('categories__box-hidden')) {
            elem.classList.toggle('categories__box-hidden--active');
            categoriesItemText.innerText = 'Свернуть';

         }
      });
   });




   // Скрыть/показать "ВСЕ КАТЕГОРИИ"  ====================================================

   // Плавный скролл кнопки наверх  ====================================================
   let btnUp = document.querySelector('.btn__up');

   btnUp.addEventListener('click', function (e) {
      scrollToY(0);
   });

   let scrolls = 0;
   window.addEventListener('scroll', function (e) {
      // console.log(++scrolls);
      let pos = window.pageYOffset;

      if (pos > window.innerHeight) {
         btnUp.classList.add('btn__up-open');
      }
      else {
         btnUp.classList.remove('btn__up-open');
      }

   });

   function scrollToY(pos) {
      window.scrollTo({
         top: pos,
         behavior: "smooth"
      });
   }
   // Плавный скролл кнопки наверх  ====================================================

   // Плавный скролл к пунктам ======================================================
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
         });

         // вставил код Жеки , чтобы бургер меню закрывалось само при клике на пункт меню , в оригинале Дмитрия не работает start  =====
         if (iconMenu.classList.contains("menu-open")) {
            document.body.classList.remove("_lock");
            iconMenu.classList.remove("menu-open");
            // menuBody.classList.toggle("menu-open");
            menuBody.classList.remove('menu__list--active');
         }
         // вставил код Жеки , чтобы бургер меню закрывалось само при клике на пункт меню , в оригинале Дмитрия не работает end  =====
      });
   });

   // Плавный скролл ======================================================

   // В момент достижения блока шапка отлипает.  start  ===================
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
   // В момент достижения блока шапка отлипает. end  ==================================


   // Каталог ========================================================
   const catalogBtn = document.querySelector('.catalog__btn-push ');
   const catalogBody = document.querySelector('.catalog__body');

   catalogBtn.addEventListener('click', function () {
      catalogBody.classList.toggle('catalog__body--active');
   });

   const catalogBtn2 = document.querySelector('.catalog__btn ');


   catalogBtn2.addEventListener('click', function () {
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
            slidesPerView: 3,
            spaceBetween: 30
         },
         1200: {
            slidesPerView: 4,
            spaceBetween: 30
         },
         1600: {
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
      speed: 1000,
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
            slidesPerView: 5,
            spaceBetween: 30,
            slidesPerGroup: 5,
         },
         1400: {
            slidesPerView: 6,
            spaceBetween: 30,
            slidesPerGroup: 6,
         },

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
      speed: 1000,
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
            slidesPerView: 5,
            spaceBetween: 30,
            slidesPerGroup: 5,
         },
         1400: {
            slidesPerView: 6,
            spaceBetween: 30,
            slidesPerGroup: 6,
         },
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
      speed: 1000,
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
