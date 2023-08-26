jQuery.noConflict()(function ($) {

'use strict';

gsap.to(".container, .swiper-container",{ opacity:1, ease: "power2.inOut", duration:.7, delay:.1 });

$.exists = function(selector) {
    return ($(selector).length > 0);
}

if ($(window).width() < 1023) {
    ms_mobile_menu();
}

$(window).resize(function() {
    if ($(window).width() < 1023) {
        ms_mobile_menu();
    }
});

// Detect Browser
var MADJS = {
  window: jQuery(window),
  document: jQuery(document),
  html: jQuery('html'),
  body: jQuery('body'),
  is_safari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  is_firefox: navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
  is_chrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
  is_ie10: navigator.appVersion.indexOf('MSIE 10') !== -1,
  transitionEnd: 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
  animIteration: 'animationiteration webkitAnimationIteration oAnimationIteration MSAnimationIteration',
  animationEnd: 'animationend webkitAnimationEnd'
};

// Template Functions
ms_isotope_grid();
ms_header_menu();
ms_stickyheader();
ms_portfolio_fiter();
ms_full_slider();
ms_carousel();
ms_lightbox();

// Isotope
function ms_isotope_grid() {

    if ($.exists('.grid-content')) {

        var $grid = $('.grid-content');

        $grid.imagesLoaded( function() {

            $grid.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }

            });

            $grid.isotope('layout');
        });
    }

}

// Header menu
function ms_header_menu() {

    if ($.exists('.js-main-header')) {
        var mainHeader = document.getElementsByClassName('js-main-header')[0];
        if( mainHeader ) {
            var trigger = mainHeader.getElementsByClassName('js-main-header__nav-trigger')[0],
                nav = mainHeader.getElementsByClassName('js-main-header__nav')[0];
                //detect click on nav trigger
                trigger.addEventListener("click", function(event) {
                    event.preventDefault();
                    var ariaExpanded = !Util.hasClass(nav, 'main-header__nav--is-visible');
                    //show nav and update button aria value
                    Util.toggleClass(nav, 'main-header__nav--is-visible', ariaExpanded);
                    trigger.setAttribute('aria-expanded', ariaExpanded);
                    if(ariaExpanded) { //opening menu -> move focus to first element inside nav
                        nav.querySelectorAll('[href], input:not([disabled]), button:not([disabled])')[0].focus();
                    }
                });
        }
    }

}

function ms_stickyheader() {

  if ($.exists('.auto-hide-header')) {
    
    var mainHeader = $('.auto-hide-header'),
    belowNavHeroContent = $('.sub-nav-hero'),
    headerHeight = mainHeader.height();
    var scrolling = false,
    previousTop = 0,
    currentTop = 0,
    scrollDelta = 10,
    scrollOffset = 150;
    $(window).on('scroll', function(){
    if( !scrolling ) {
      scrolling = true;
        (!window.requestAnimationFrame)
        ? setTimeout(autoHideHeader, 300)
        : requestAnimationFrame(autoHideHeader);
    }
    });
    $(window).on('resize', function(){
        headerHeight = mainHeader.height();
    });
    function autoHideHeader() {
        var currentTop = $(window).scrollTop();
        ( belowNavHeroContent.length > 0 ) 
        ? checkStickyNavigation(currentTop) : checkSimpleNavigation(currentTop);
        previousTop = currentTop;
        scrolling = false;
    }
    function checkSimpleNavigation(currentTop) {
        if (previousTop - currentTop > scrollDelta) {
            mainHeader.removeClass('is-hide');
        } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            mainHeader.addClass('is-hide');
        }
    }

    if ($.exists('.transparent-bg')) {
        var topofDiv = $(".hero").offset().top; //gets offset hero
        var height = $(".hero").outerHeight(); //gets height of hero
        var nav_height = $(".main-header").outerHeight(); //gets height of nav
        var nav_height = nav_height * -.85;
        $(window).scroll(function(){
            if($(window).scrollTop() > (topofDiv + height + nav_height)){
                $('.main-header').removeClass('transparent-bg');
            } else {
                $('.main-header').addClass('transparent-bg');
            }
        });
    }
  }

}

/*------------------
Portfolio Filter
-------------------*/
function ms_portfolio_fiter() {

    if ($.exists('.filtr-btn')) {
        $('.filtr-btn').on( 'click', '.filter-nav__item:not(.active)', function(e) {
            e.preventDefault();
            var filterValue = $(this).attr('data-filter'),
                $container = $('.grid-content');
            $container.isotope({ filter: filterValue });

            $('.filtr-btn li .subnav__link').attr('aria-current', 'none');
            $(this).find('.subnav__link').attr('aria-current', 'page');
            $('.load_filter').addClass('show');

        });
    }
}

/*------------------
Mobile Menu
-------------------*/
function ms_mobile_menu() {
    $('.menu-item-has-children > a').on( 'click', function(e) {
        e.preventDefault();
        $(this).next('ul.sub-menu').toggleClass('sub-menu---visible');
    });

}

/*------------------
Full Page Slider
-------------------*/
function ms_full_slider() {
    // Fulp Page Carousel
    if ($.exists('.swiper-carousel')) {
        
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            slidesPerColumnFill: 'column',
            loop: false,
            speed: 700,
            freeMode: false,
            grabCursor: true,
            watchOverflow: 1,
            mousewheel: {
                enabled: true,
                releaseOnEdges: true,
            },
            hashNavigation: {
                watchState: true,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            on: {
                transitionStart: function () {
                    gsap.to('.swiper-slide.swiper-slide-active .slide-image', {x: '6%', duration: 0.7, ease: Power0.ease, delay: 0.1});
                    gsap.to('.swiper-slide.swiper-slide-prev .slide-image', {x: '15%', duration: 0.7, ease: Power0.ease, delay: 0.1});
                    gsap.to('.swiper-slide.swiper-slide-next .slide-image', {x: '0%', duration: 0.7, ease: Power0.ease, delay: 0.1});
                    gsap.to('.swiper-slide ~ .swiper-slide.swiper-slide-prev .slide-image', {x: '15%', duration: 0.7, ease: Power0.ease, delay: 0.1});
                    gsap.to('.swiper-slide.swiper-slide-next ~ .swiper-slide .slide-image', {x: '-6%', duration: 0.7, ease: Power0.ease, delay: 0.1});
                    gsap.to('.swiper-slide.swiper-slide-next ~ .swiper-slide.swiper-slide-next .slide-image', {x: '-6%', duration: 0.7, ease: Power0.ease, delay: 0.1});
                    gsap.to('.swiper-slide.swiper-slide-next ~ .swiper-slide ~ *.swiper-slide .slide-image', {x: '-15%', duration: 0.7, ease: Power0.ease, delay: 0.1});
                },
                slideNextTransitionStart: function () {
                    $('.swiper-wrapper').find('.swiper-slide-next').next('.swiper-slide').addClass('swiper-slide-next');
                },
                slidePrevTransitionStart: function () {
                    $('.swiper-wrapper').find('.swiper-slide-prev').prev('.swiper-slide').addClass('swiper-slide-prev');
                }
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                  slidesPerView: 1,
                },
                // when window width is >= 480px
                480: {
                  slidesPerView: 1,
                },
                // when window width is >= 640px
                640: {
                  slidesPerView: 1,
                }
            }

        }); 
    }

    // Full Page Fade Effect
    if ($.exists('.swiper-full-page')) {
        var total_count = $('.swiper-counter').data('counter'),
            l = $('.swiper-slide').data('autoplay');
        $('.total-count').html(total_count);
        var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: l,
        speed: 700,
        effect: 'fade',
            fadeEffect: {
            crossFade: true
        },
        freeMode: false,
        grabCursor: true,
        mousewheel: {
            enabled: true,
            releaseOnEdges: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        });
    }

    // Full Page Parallax Effect
    if ($.exists('.swiper-full-parallax')) {

        var total_count = $('.swiper-counter').data('counter'),
            l = $('.swiper-slide').data('autoplay');
        $('.total-count').html(total_count);

        if (MADJS.is_chrome || MADJS.is_firefox) {
            parallax_skew();
        } else {
            parallax_default();
        }

        function parallax_skew() {
            $('.swiper-slide .slide-image').removeAttr('data-swiper-parallax', '100%');
            $('.swiper-slide .slide-image').removeAttr('data-swiper-parallax-scale', 1.15);
            $('.slide-title-container').removeAttr('data-swiper-parallax', '100%');
            $('.slide-title-container').removeAttr('data-swiper-parallax', '100%');
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                autoplay: l,
                loop: true,
                cssMode: true,
                speed: 0,
                parallax: true,
                direction: 'vertical',
                effect: 'fade',
                watchOverflow: 1,
                simulateTouch: false,
                mousewheel: true,
                keyboard: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    slideChange: function () {
                        $('.swiper-slide').removeClass('swiper-slide-nth-next-2');
                    },

                    slidePrevTransitionStart: function () {
                        $('.scroll-lock').css({'display' : 'block'});
                        var activeIndex = this.activeIndex;
                        var realIndex = this.slides.eq(activeIndex).attr('data-swiper-slide-index');
                        $('.swiper-slide').removeClass('swiper-slide-nth-next-2');

                        $('.swiper-slide[data-swiper-slide-index="'+realIndex+'"]').next().addClass('swiper-slide-nth-next-2');
                        $('.swiper-slide-nth-next-2').css({'opacity' : '1'});
                        TweenMax.to('.swiper-slide-nth-next-2', 1.2, {
                            clipPath:"polygon(0 100%, 100% 140%, 100% 140%, 0 100%)",
                            delay: 0.1,
                            ease: Power1.easeOut
                        });
                        TweenMax.to('.swiper-slide-nth-next-2', .6, {
                            clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                            onComplete:onCompleteUp,
                            delay: 0.4,
                            ease: Power1.easeOut
                        });
                        function onCompleteUp() {
                            $('.scroll-lock').css({'display' : 'none'});
                            $('.swiper-slide-active').focus();
                            $('.swiper-slide').css({'clip-path' : ''});
                            $('.swiper-slide-nth-next-2').css({'opacity' : '0'});
                        }
                    },

                    slideNextTransitionStart: function () {
                        $('.scroll-lock').css({'display' : 'block'});
                        $('.swiper-slide').removeClass('swiper-slide-nth-prev-2 swiper-slide-nth-next-2');
                        $('.swiper-slide-prev').css({'clip-path' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'});
                        TweenMax.from(".swiper-slide-active", 1, {clipPath:"polygon(0 130%, 100% 100%, 100% 100%, 0 100%)", onComplete:onCompleteDown, delay: 0.1});
                        function onCompleteDown() {
                            $('.swiper-slide').css({'clip-path' : ''});
                            $('.scroll-lock').css({'display' : 'none'});
                            $('.swiper-slide-active').focus();
                        }
                    },

                    slideChangeTransitionStart: function () {
                        $('.swiper-slide').css({'clip-path' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'});
                        gsap.fromTo(".swiper-slide-duplicate-active .slide-image, .swiper-slide-active .slide-image", 1.6, {scale:1.15}, {scale:1, ease: Power4.easeOut, delay: 0.15});
                        
                    },
                },
            });           
        }

        function parallax_default() {

            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                loop: true,
                cssMode: true,
                speed: 1000,
                autoplay: l,
                parallax: true,
                direction: 'vertical',
                parallax: true,
                effect: 'slide',
                watchOverflow: 1,
                simulateTouch: false,
                mousewheel: true,
                keyboard: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }

    
        $('.arrow-down').on('click', function(e) {
            e.preventDefault();
            swiper.slideNext();
        });
    }
}

/*------------------
Carousel full image
-------------------*/
function ms_carousel() {
    if ($.exists('.wp-block-blockgallery-carousel.alignfull')) {

        $('.blockgallery--item').imagesLoaded().done( function( instance ) {
            $('.blockgallery--figure img').attr('sizes', '(max-width: 1920px) 100vw, 1920px');
        });
    
    }
}
/*------------------
Light box gallery
-------------------*/
function ms_lightbox() {
    if ($.exists('.blockgallery')) {

        $('a.has-img[href*=".jpg"], a.has-img[href*=".jpeg"], a.has-img[href*=".png"], a.has-img[href*=".gif"]').addClass('mfp-img');
        $('.blockgallery').magnificPopup({
            delegate: '.mfp-img',
            mainClass: 'mfp-fade',
            tClose: 'Fechar (Esc)',
            tLoading: '',
            type: 'image',
            image: {
               titleSrc: function(item) {
                  return item.el.next('.blocks-gallery-item__caption').text();
               }
           },
            gallery: {
                enabled:true,
                preload: [0,2],
            },

        mainClass: 'mfp-zoom-in',
        removalDelay: 300, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function() {
                $('#portfolio a').each(function(){
                    $(this).attr('alt', $(this).find('img').attr('alt'));
                }); 
            },
            open: function() {
                //overwrite default prev + next function. Add timeout for css3 crossfade animation
                $.magnificPopup.instance.next = function() {
                    var self = this;
                    self.wrap.removeClass('mfp-image-loaded');
                    setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
                }
                $.magnificPopup.instance.prev = function() {
                    var self = this;
                    self.wrap.removeClass('mfp-image-loaded');
                    setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
                }
            },
            imageLoadComplete: function() { 
                var self = this;
                setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
            }
        }

        });
    }

}

});