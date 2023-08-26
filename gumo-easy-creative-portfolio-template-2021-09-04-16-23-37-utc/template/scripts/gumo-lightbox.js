/*

Gumo Lightbox
Version 1.0
by ThemeVillain

*/

"use strict"; 

function isYoutube(url) {
  const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return url.match(p) ? RegExp.$1 : false;
}

function isVimeo(url) {
  const p = /player\.vimeo\.com\/video\/([0-9]*)/;
  return url.match(p) ? RegExp.$1 : false;
}

var getNextSibling = function (elem, selector) {

	// Get the next sibling element
	var sibling = elem.nextElementSibling;

	// If there's no selector, return the first sibling
	if (!selector) return sibling;

	// If the sibling matches our selector, use it
	// If not, jump to the next sibling and continue the loop
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}

};

var getPreviousSibling = function (elem, selector) {

	// Get the next sibling element
	var sibling = elem.previousElementSibling;

	// If there's no selector, return the first sibling
	if (!selector) return sibling;

	// If the sibling matches our selector, use it
	// If not, jump to the next sibling and continue the loop
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.previousElementSibling;
	}

};

function gumoLightbox(options) {

  // The lightbox HTML component
  document.body.insertAdjacentHTML(
    'beforeend',
    '<div id="lightbox"><div class="lb-img"><img/></div><div class="bg"><div class="loader"></div></div><div class="close-lightbox"></div><div class="prev-lightbox-item"></div><div class="next-lightbox-item"></div></div>'
  );

  // Assign constants
  const lbItem    = document.querySelectorAll('.lightbox');
  const lb        = document.getElementById('lightbox');
  const closeBtn  = document.querySelector('.close-lightbox');
  const nextBtn   = document.querySelector('.next-lightbox-item');
  const prevBtn   = document.querySelector('.prev-lightbox-item');

  // Assign changeable vars
  let curItem     = null;
  let prevItem    = null;
  let nextItem    = null;
  let firstItem   = null;
  let lastItem    = null;

  // Loop through all lightbox items
  Array.prototype.forEach.call(lbItem, (el, i) => {

    el.addEventListener('click', event => {

      event.preventDefault();
      event.stopImmediatePropagation();
      
      curItem     = el;
      firstItem   = curItem.parentNode.childNodes[1]; // Exclude grid sizer, so we take the 2nd child
      lastItem    = curItem.parentNode.lastChild;

      showLightbox(); // We only do this when a thumb is clicked

      loadImage(curItem);

    });

  });

  // Load the image
  function loadImage(el){
    
    curItem     = el; // This element
    prevItem    = getPreviousSibling(curItem, '.lightbox'); // Previous element
    nextItem    = getNextSibling(curItem, '.lightbox'); // Next element

    if(prevItem == null)
      prevItem = lastItem;

    if(nextItem == null)
      nextItem = firstItem;

    const url   = curItem.getAttribute('href');
    const img   = lb.querySelector('img');

    img.setAttribute('src',url);

  }

  function showLightbox(){
    lb.classList.add('show');
    document.body.addEventListener("keyup", onEscPress);
  }

  function hideLightbox(){
    lb.classList.remove('show');
    document.body.removeEventListener("keyup", onEscPress);
  }

  // Adds accessibility
  function onEscPress(event){
    if (event.key === "Escape")
      hideLightbox();
  }

  // Go to the previous image
  prevBtn.addEventListener('click', event => {

    event.preventDefault();
    event.stopImmediatePropagation();

    

    loadImage(prevItem);

  });

  // Go to the next image
  nextBtn.addEventListener('click', event => {

    event.preventDefault();
    event.stopImmediatePropagation();

    if(nextItem == null)
      nextItem = firstItem;

    loadImage(nextItem);

  });

  // Closing the curtains
  lb.addEventListener('click', event => {

    event.preventDefault();
    event.stopImmediatePropagation();

    hideLightbox();

  });

  return this;
};