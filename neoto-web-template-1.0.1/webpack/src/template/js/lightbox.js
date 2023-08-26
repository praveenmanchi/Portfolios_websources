import imagesLoaded from 'imagesloaded'
import {TimelineMax, TweenMax} from 'gsap'
import {Cursor} from './cursor.js'

var Lightbox = () => {

  var wrap = document.querySelector('main')
  var lbContainerEl = 
      '<div id="lightbox"><div class="inner"><div class="lightbox-loader"></div><img src=""/><button class="prev-lightbox-item"></button><button class="next-lightbox-item"></button><button class="close-lightbox"></button><div class="lightbox-caption"></div><div class="lightbox-counter"><div class="lightbox-count">0</div><hr/><div class="lightbox-total">0</div></div></div></div>'
      wrap.innerHTML += lbContainerEl // Add Lightbox to DOM
 
  var lbContainer = document.getElementById('lightbox'),
      lbItem = document.querySelectorAll('.lightbox'),
      lbImg = lbContainer.querySelector('img'),
      lbImgDimensions,
      lbCounter = lbContainer.querySelector('.lightbox-counter'),
      lbCounterCount = lbCounter.querySelector('.lightbox-count'),
      lbCounterTotal = lbCounter.querySelector('.lightbox-total'),
      lbGallery,
      curLbItem,
      lbItemClone,
      thumbDimensions,
      lbTl = new TimelineMax(),
      speed = .5,
      lbImgSrc,
      maxItems,
      curLbIndex,
      direction,
      clickedImg,
      easeType = Power3.easeInOut,
      originalWidth,
      originalHeight

  // Controls
  var nextBtn = lbContainer.querySelector('.next-lightbox-item'),
      prevBtn = lbContainer.querySelector('.prev-lightbox-item'),
      closeBtn = lbContainer.querySelector('.close-lightbox, #lightbox .inner')

  Array.prototype.forEach.call(lbItem, function(el, i){

    el.addEventListener('mouseenter', function(e){
      document.body.classList.add('cursor-lightbox-item')
    })
    
    el.addEventListener('mouseleave', function(e){
      document.body.classList.remove('cursor-lightbox-item')
    })

    el.addEventListener('click', function(e){

      document.body.classList.add('loading')

      e.preventDefault()
      e.stopPropagation()

      curLbItem = el
      lbGallery = curLbItem.closest('.gallery')

      lightboxSetCounter()
      lightboxSetDimensions(el)
      lightboxEnlarge()

      document.addEventListener('keydown', function(e) {
        if(e.code == 37 || e.code == 38)
          lightboxPrev()
        if(e.code == 39 || e.code == 40)
          lightboxNext()
      })

      nextBtn.addEventListener('click', lightboxNext)
      prevBtn.addEventListener('click', lightboxPrev)
      closeBtn.addEventListener('click', lightboxHide)

    })
  })

  const lightboxSetDimensions = (e) => {

    clickedImg = e.querySelector('img')
    thumbDimensions = clickedImg.getBoundingClientRect()
    lbItemClone = clickedImg.cloneNode(true)
    
    lbTl
    .set(clickedImg, {
      autoAlpha : 0
    })
    .set(lbItemClone, {
      top : thumbDimensions.top + 'px',
      left : thumbDimensions.left + 'px',
      width : thumbDimensions.width + 'px',
      height : thumbDimensions.height + 'px',
      borderRadius : '5px',
      position: 'fixed',
      zIndex : 999
    })

    wrap.appendChild(lbItemClone)

  }

  const lightboxEnlarge = () => {

    lbImgSrc = curLbItem.getAttribute('href')
    lbImg.setAttribute('src', lbImgSrc)
    
    imagesLoaded(lbContainer, function() {
      
      lbImgDimensions = lbImg.getBoundingClientRect()

      originalWidth = lbImgDimensions.width,
      originalHeight = lbImgDimensions.height
      lbTl
      .to(lbItemClone, speed, {
        top : lbImgDimensions.top + 'px',
        left : lbImgDimensions.left + 'px',
        width : originalWidth,
        height : originalHeight,
        ease: easeType
      })
      .set('#lightbox', { autoAlpha : 1 })
      .to('#lightbox .inner', speed, {autoAlpha : 1, onComplete: function(){ 
        lbItemClone.parentNode.removeChild(lbItemClone)
        document.documentElement.style.position = 'fixed'
        document.documentElement.style.overflowY = 'scroll'
        document.body.classList.remove('loading')
        Cursor()
      }})
      .set('#lightbox img', {
        width : originalWidth,
        height : originalHeight,
        maxWidth : '10000%',
        maxHeight : '10000%',
      })
      .to('.close-lightbox, .lightbox-counter', speed/2, {transform : 'translate(0,0)'})
      .to('.prev-lightbox-item', speed/2, {transform : 'rotate(180deg) translate(0,-5px)'})
      .to('.next-lightbox-item', speed/2, {transform : 'translate(0,5px)'})
    })

  }

  const lightboxSetCounter = () => {

    // Set vars
    var lbItems = lbGallery.querySelectorAll('.lightbox')
    maxItems = lbItems.length
    curLbIndex = Array.prototype.indexOf.call(lbItems, curLbItem)

    // Show data
    lbCounterCount.innerHTML = curLbIndex+1
    lbCounterTotal.innerHTML = maxItems

  }

  const lightboxHide = () => {
    document.documentElement.style.position = ''
    document.documentElement.style.overflowY = ''
    document.documentElement.style.top = ''
    lbTl
    .set(clickedImg, { autoAlpha : 1 })
    .to(lbContainer, speed/5, { 
      autoAlpha : 0, 
      onComplete: function(){
        lbTl.set('#lightbox, #lightbox .inner, .close-lightbox, .lightbox-counter, .prev-lightbox-item, .next-lightbox-item', { clearProps:"all" })
      }
    })
    nextBtn.removeEventListener('click', lightboxNext)
    prevBtn.removeEventListener('click', lightboxPrev)
    closeBtn.removeEventListener('click', lightboxHide)
  }

  const lightboxNext = (e) => {

    e.preventDefault()
    e.stopPropagation()

    document.body.classList.add('loading')

    if(curLbIndex < maxItems-1)
      curLbIndex++
    else
      curLbIndex = 0
    
    direction = 'next'

    navigateLb()

  }

  const lightboxPrev = (e) => {

    e.preventDefault()
    e.stopPropagation()

    document.body.classList.add('loading')
    
    if(curLbIndex > 0)
      curLbIndex--
    else
      curLbIndex = maxItems-1

    direction = 'prev'
      
    navigateLb()

  }

  const navigateLb = () => {

    curLbItem = lbGallery.querySelectorAll('.lightbox')[curLbIndex]
    lbImgSrc = curLbItem.getAttribute('href')

    lightboxSetCounter()

    var start = 48,
        end = 52
    
    if(direction == 'prev')
      start = 52, end = 48

    TweenMax.to(lbImg, speed, { autoAlpha : 0, left: start+'%', onComplete: function(){

      lbImg.setAttribute('src', lbImgSrc)
      imagesLoaded(lbContainer, function(){
        TweenMax.set(lbImg, { left: end+'%' })
        TweenMax.to(lbImg, speed, { autoAlpha : 1,  left: '50%' })
        document.body.classList.remove('loading')
      })
      
    }})
    
  }

  const isYoutube = (url) => {
    const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    return (url.match(p)) ? RegExp.$1 : false
  }

  const isVimeo = (url) => {
    const p = /player\.vimeo\.com\/video\/([0-9]*)/
    return (url.match(p)) ? RegExp.$1 : false
  }

}

export {Lightbox}
