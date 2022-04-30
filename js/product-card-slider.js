'use strict';

document.addEventListener('DOMContentLoaded', () => {


   var smallSwiper = new Swiper(".product-card__slider-small", {
      spaceBetween: 10,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,


   });
   var bigSwiper = new Swiper(".product-card__slider-big", {
      spaceBetween: 10,
      speed: 800,
      navigation: {
         nextEl: ".product-card__button-next ",
         prevEl: ".product-card__button-prev",
      },
      thumbs: {
         swiper: smallSwiper,
         // breakpoints: {
         //    // when window width is >= 320px
         //    320: {
         //       slidesPerView: 1,
         //       spaceBetween: 10,
         //       slidesPerGroup: 1,
         //    },
         //    // when window width is >= 480px
         //    480: {
         //       slidesPerView: 1,
         //       spaceBetween: 10,
         //       slidesPerGroup: 2,
         //    },
         //    // when window width is >= 640px
         //    640: {
         //       slidesPerView: 1,
         //       spaceBetween: 10,
         //       slidesPerGroup: 3,
         //    },
         //    800: {
         //       slidesPerView: 1,
         //       spaceBetween: 10,
         //       slidesPerGroup: 3,
         //    },
         //    1000: {
         //       slidesPerView: 1,
         //       spaceBetween: 10,
         //       slidesPerGroup: 3,
         //    },
         //    1200: {
         //       slidesPerView: 1,
         //       spaceBetween: 10,
         //       slidesPerGroup: 4,
         //    },
         //    1400: {
         //       slidesPerView: 5,
         //       spaceBetween: 10,
         //       slidesPerGroup: 5,
         //    },
         // },
      },


   });


   // Счетчик ===================
   const counterInput = document.querySelector('.counter__input');
   const btnMinus = document.querySelector('.btn-counter__minus');
   const btnPlus = document.querySelector('.btn-counter__plus');

   btnMinus.addEventListener('click', function () {
      if (counterInput.value > 1) {
         let counterInputValue = --counterInput.value;
      }
   });

   btnPlus.addEventListener('click', function () {
      let counterInputValue = ++counterInput.value;
   });






   console.log();

   // Счетчик ===================











   // Каталог дублирование  ========================================================
   // const catalogBtn = document.querySelector('.catalog__btn-push ');
   // const catalogBody = document.querySelector('.catalog__body');

   // catalogBtn.addEventListener('click', function () {
   //    catalogBody.classList.toggle('catalog__body--active');
   // });

   // const catalogBtn2 = document.querySelector('.catalog__btn ');


   // catalogBtn2.addEventListener('click', function () {
   //    catalogBody.classList.toggle('catalog__body--active');
   // });


   // Каталог дублирование  ========================================================






});
