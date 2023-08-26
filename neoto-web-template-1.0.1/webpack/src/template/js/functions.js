import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import { Lightbox } from './lightbox'
import { Slider } from './slider'
import { Cursor } from './cursor'
import VanillaTilt from 'vanilla-tilt'
import Typed from 'typed.js'

var iso

var Main = () => {

    Cursor()
    Slider()

    document.body.classList.add('loading')

    var grid = document.querySelector('.grid');

    if(grid){
        imagesLoaded( grid ).on( 'done', function() {
        
            iso = new Isotope(grid, {
                itemSelector: '.grid-item',
                masonry: {
                  columnWidth: '.grid-sizer'
                }
            });

            
            iso.reloadItems();
            iso.layout();
            
        })
    }

    VanillaTilt.init(document.querySelectorAll('.tilt'), {
        speed: 1000,
        max: 5
    });

    VanillaTilt.init(document.querySelectorAll('.btn'), {
        speed: 2000,
        max: 2,
        "max-glare": 1,
        glare: true
    });
    
    var scrollObject = {
        y: window.pageYOffset
    }

    var getScrollPosition = (e) => {

        var prevY = scrollObject.y

        scrollObject = {
           y: window.pageYOffset
        }

        if(scrollObject.y > 5) {
            document.body.classList.add('scrolled')
            if(prevY >= scrollObject.y) {
                document.body.classList.add('scrolled-up')
            }
            else {
                document.body.classList.remove('scrolled-up')
            }
        } else {
            document.body.classList.remove('scrolled','scrolled-up')
        }
    }

    window.onscroll = getScrollPosition

    var slide = document.querySelectorAll('.carousel-item.active')

    slide.forEach((e) => {
        var target = e
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.attributeName == "class"){
                    var currentClassState = mutation.target.classList.contains('active');
                    if(prevClassState !== currentClassState)    {
                        prevClassState = currentClassState;
                        if(currentClassState)
                            console.log("class added!");
                        else
                            console.log("class removed!");
                    }
                }
            });
        });
        observer.observe(target, {attributes: true});
    });

    imagesLoaded(document.body, { background: true }, (e) => {
        document.body.classList.add('loaded')
        document.body.classList.remove('loading')
        if(document.querySelector('.lightbox'))
            Lightbox()
    })
    
    window.onbeforeunload = (e) => {
        document.body.classList.remove('loaded')
        document.body.classList.add('loading')
    }

    var dropdowns = document.querySelectorAll('.dropdown')

    dropdowns.forEach((el,i) => {
        el.addEventListener('mouseenter', (e) => {
            el.querySelector('.dropdown-menu').classList.add('show')
        })
        el.addEventListener('mouseleave', (e) => {
            el.querySelector('.dropdown-menu').classList.remove('show')
        })
    })

    document.querySelector('.navbar-toggler').addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        document.body.classList.toggle('nav-open')
    })

    var typedEl = document.querySelector('#typed')

    if(typedEl){

        var options = {
            stringsElement: '#typed-strings',
            typeSpeed: 100,
            loop: true,
            backSpeed: 50,
            cursorChar: '|'
        };
          
        var typed = new Typed('#typed', options);

    }

    var anchorLinks = document.querySelectorAll('.anchor-link')

    anchorLinks.forEach((el,i) => {
        el.addEventListener('click', (e) => {
            document.body.classList.remove('nav-open')
            e.preventDefault()
            var id = el.getAttribute('href')
            var scrollEl = document.querySelector(id)
            var pos = scrollEl.getBoundingClientRect().top + window.scrollY
            window.scroll({top: pos, left: 0, behavior: 'smooth' });
        })
    })
    
}

window.addEventListener('DOMContentLoaded', Main)