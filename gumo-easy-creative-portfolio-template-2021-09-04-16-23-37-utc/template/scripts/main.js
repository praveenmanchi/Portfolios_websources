/*

Main.js - All the Gumo JS goodies
Version 1.0
by ThemeVillain

*/

'use strict'; 

const filters = document.querySelector('.filters');
const navigation = document.querySelector('.nav-items');
const navItem = document.querySelectorAll('.nav-item');
const filter = document.querySelectorAll('.filter');
const filterTrigger = document.querySelector('.filter-trigger');
const navTrigger = document.querySelector('.nav-trigger');

let elem = document.querySelector('.masonry');
let iso;
let scrolled = 0;

/*
 ** Portfolio scripts
 */

if (elem) {
  imagesLoaded(elem, function() {
    iso = new Isotope(elem, {
      itemSelector: '.item',
      masonry: {
        columnWidth: '.item-sizer'
      }
    });

    gumoLightbox({
      transition: 'trans1'
    });

    // Filter functionality
    Array.prototype.forEach.call(filter, el => {
      el.addEventListener('click', event => {
        event.stopPropagation();
        event.preventDefault();

        const thisFilter = el.getAttribute('href');

        iso.arrange({
          // item element provided as argument
          filter: thisFilter
        });

        Array.prototype.forEach.call(filter, el => {
          el.classList.remove('active');
        });

        el.classList.add('active');
      });
    });

    filterTrigger.addEventListener('click', event => {
      document.body.classList.toggle('filters-open'); // Toggle filter triggers on mobile
    });
  });
}

navTrigger.addEventListener('click', event => {
  document.body.classList.toggle('nav-open'); // Toggle filter triggers on mobile
});

Array.prototype.forEach.call(navItem, el => {
  el.addEventListener('click', event => {
    Array.prototype.forEach.call(navItem, el => {
      el.classList.remove('active');
    });
    document.body.classList.remove('nav-open');
    el.classList.add('active');
  });
});

// Scroll events Desktop
document.addEventListener('scroll', scrollEvents, false);

// Scroll events iOS
document.addEventListener('touchmove', scrollEvents, false);

function scrollEvents(event){
  scrolled = window.pageYOffset;
  if (scrolled > 0) document.body.classList.add('scrolled');
  else document.body.classList.remove('scrolled');
}

// On resize
window.addEventListener('resize', event => {
  iso.reloadItems();
  iso.layout();
});