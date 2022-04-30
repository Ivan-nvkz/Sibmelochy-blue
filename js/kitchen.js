'use strict';

document.addEventListener('DOMContentLoaded', () => {

   // Пагинация ==========================
   // const paginationItems = document.querySelectorAll('.pagination-list-item');

   // paginationItems.forEach(elem => {

   //    elem.addEventListener('click', function (e) {

   //       e.preventDefault();

   // if (elem.classList.contains('pagination-list-item--active')) {

   //    elem.classList.remove('pagination-list-item--active');
   //    elem.elem.classList.add('pagination-list-item');

   // }
   // else if (elem.classList.contains('pagination-list-item')) {

   //    elem.classList.add('pagination-list-item--active');
   //    elem.elem.classList.remove('pagination-list-item');
   // }



   //    });

   // });

   // console.log(paginationItems);
   // Пагинация ==========================


   // Фильтр ==========================
   const btnGrid = document.querySelector('.catalog__filter-btngrid ');
   const btnLine = document.querySelector('.catalog__filter-btnline ');
   let catologSlides = document.querySelectorAll('.catolog__slide');
   let popularSlideItems = document.querySelectorAll('.popular__slide-item');
   let popularItemTitles = document.querySelectorAll('.popular-item__title');
   let popularItemImages = document.querySelectorAll('.popular-item__img');
   let catologBody = document.querySelector('.catolog__body');
   let catalogFilter = document.querySelector('.catalog__filter');

   const catologBodytWidth = catologBody.clientWidth;
   console.log();
   console.log();
   // const catologBodyWidth = catologBody.getBoundingClientRect().width;

   if (catologBodytWidth >= 475) {

      catalogFilter.classList.add('catalog__filter');
      catalogFilter.classList.remove('catalog__filter--none');

      btnGrid.addEventListener('click', function () {

         btnGrid.classList.add('catalog__filter-button--active');
         btnLine.classList.remove('catalog__filter-button--active');

         catologSlides.forEach(elem => {
            // elem.style.maxWidth = '235px';
            elem.style.width = '235px';
         });

         popularSlideItems.forEach(elem => {
            // elem.style.maxWidth = '235px';
            elem.style.width = '235px';
            elem.style.display = 'flex';
            elem.style.justifyContent = 'space-between';
         });

         popularItemTitles.forEach(elem => {
            elem.style.maxWidth = '178px';
         });

         popularItemImages.forEach(elem => {
            elem.style.minWidth = '208px';
         });

      });

      btnLine.addEventListener('click', function () {

         btnGrid.classList.remove('catalog__filter-button--active');
         btnLine.classList.add('catalog__filter-button--active');

         catologSlides.forEach(elem => {
            elem.style.width = '100%';
         });

         popularSlideItems.forEach(elem => {
            elem.style.width = '100%';
         });

         popularItemTitles.forEach(elem => {
            elem.style.minWidth = '100%';
         });

         popularItemImages.forEach(elem => {
            elem.style.marginLeft = 'auto';
            elem.style.marginRight = 'auto';
         });

      });

   } else if (catologBodytWidth <= 475) {
      catalogFilter.classList.remove('catalog__filter');
      catalogFilter.classList.add('catalog__filter--none');
   }

   console.log();
   console.log();
   // Фильтр ==========================


});