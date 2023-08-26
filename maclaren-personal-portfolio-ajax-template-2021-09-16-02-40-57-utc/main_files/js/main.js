"use strict";

function ajaxload() {
    pageslider();
    pagemenu();
    page_anim();
    mobile();
    lightbox();
    parallax ();
    mobiletouch();
    hasTouch();
}

function mobile(){
  if ( $(window).width() >= 1024 ){   
    smooth_scroll();
  }  
}

ajaxload();


$('main').waitForImages(function() {
    $('#preloader').delay(500).fadeOut('slow');
});  


// AJAX LOAD    
$("main").on('click','[data-type="ajax-load"]', function(e) {
    TweenLite.to(".page-loader", .9, {css:{display:"block"}, delay:.1, easy: Quad.easeInOut });
    TweenLite.to(".page-menu", .3, {css:{opacity:"0"}, delay:.1, easy: Quad.easeInOut });
    $('.page-loader').addClass('in');
      setTimeout(function() {
        $('.page-loader').removeClass('in');
        },1000);


    var href = $(this).attr("href");

    loadHtml();
    function loadHtml() {
        setTimeout(function() {
            loadContent(href);            
            history.pushState('', 'new URL: '+href, href);        
        },1500);

    }
    e.preventDefault();
});

window.onpopstate = function(event) {
    location.reload();
};
function loadContent(url) {
    var getData = $.get(url, function(response) {
        var markup = $("<main>" + response + "</main>");
        var fragment = markup.find("main").html();
        var title = markup.find("title").html();
        $('head title').html( title );

        $("main").html(fragment);
        ajaxload();
        if($('.page-view').length){
            location.reload();
        }

      $('.page-loader').addClass('out');
        $('.page-loader').delay(400).fadeOut('slow');
          setTimeout(function() {
        $('.page-loader').removeClass('out');
        },1000);

    });
}

function pageslider() {
    $('.project .text').addClass('tamam');

$(".project .text").hover(function(){
    $('.project .image').toggleClass('color');

    });

var Core;
(function (Core) {
    var Slider = (function () {
        function Slider() {
            // Durations
            this.durations = {
                auto: 10000,
                slide: 1000
            };
            // DOM
            this.dom = {
                wrapper: null,
                container: null,
                project: null,
                current: null,
                next: null,
                arrow: null
            };
            // Misc stuff
            this.length = 0;
            this.current = 0;
            this.next = 0;
            this.isAuto = true;
            this.working = false;
            this.dom.wrapper = $('.page-view');
            this.dom.project = this.dom.wrapper.find('.project');
            this.dom.arrow = $('body').find('.arrow');
            this.length = this.dom.project.length;
            this.init();
            this.events();
            this.auto = setInterval(this.updateNext.bind(this), this.durations.auto);
        }

        /**
         * Set initial z-indexes & get current project
         */
        
        Slider.prototype.init = function () {
            this.dom.current = $(this.dom.project[this.current]);
            this.dom.next = $(this.dom.project[this.current + 1]);
            this.dom.current.css('z-index', 30);
            this.dom.next.css('z-index', 20);
        };

        Slider.prototype.clear = function () {
            this.dom.arrow.off('click');
            if (this.isAuto)
                clearInterval(this.auto);
        };
        /**
         * Initialize events
         */
        Slider.prototype.events = function () {
            var self = this;
            this.dom.arrow.on('click', function () {
                if (self.working)
                    return;
                self.processBtn($(this));
            });
        };
        Slider.prototype.processBtn = function (btn) {
            if (this.isAuto) {
                this.isAuto = false;
                clearInterval(this.auto);
            }
            if (btn.hasClass('next'))
                this.updateNext();
            if (btn.hasClass('previous'))
                this.updatePrevious();
        };

        /**
         * Update next global index
         */
         var mainWheel;

            mainWheel = true;

        Slider.prototype.updateNext = function () {
            mainWheel = false;
            this.next = (this.current + 1) % this.length;
            this.process();
            
        };
        /**
         * Update next global index
         */
        Slider.prototype.updatePrevious = function () {
            
            this.next--;
            if (this.next < 0)
                this.next = this.length - 1;
            this.process();
        };

           

       $(document).on("mousewheel DOMMouseScroll", function(e) {
            console.log(mainWheel);
            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                if(mainWheel == true) {
                    mainWheel = false;
                    $('.previous').trigger('click');
                }
            } else { 
                if(mainWheel == true) {
                    mainWheel = false;
                    $('.next').trigger('click');
                }
            }
        });

        /**
         * Process, calculate and switch beetween slides
         */
        Slider.prototype.process = function () {
            var self = this;
            this.working = true;
            this.dom.next = $(this.dom.project[this.next]);
            this.dom.current.css('z-index', 30);
            self.dom.next.css('z-index', 20);
            // Hide current
            setTimeout(function(){ self.dom.current.addClass('hide'); }, 500);
             TweenMax.to(this.dom.current.children('.text'), 0.6, {force3D:true, opacity:0, y:'-100%', delay:0.1, ease:Power2.easeOut});
             TweenMax.to(this.dom.next.children('.text'), 0.6, {force3D:true, opacity:1, y:'-50%', delay:1.7, ease:Power2.easeOut});
            setTimeout(function () {
                self.dom.current.css('z-index', 10);
                self.dom.next.css('z-index', 30);
                self.dom.current.removeClass('hide');
                self.dom.current = self.dom.next;
                self.current = self.next;
                self.working = false;
                setTimeout(function() {
                    mainWheel = true;
                },800);
            }, this.durations.slide);
        };
        return Slider;
    }());
    Core.Slider = Slider;
})(Core || (Core = {}));
document.addEventListener('DOMContentLoaded', function () {
    var imgLoad0 = imagesLoaded( '.page-view', { background: true }, function() {
      
    });
    imgLoad0.on( 'done', function( instance ) {
      new Core.Slider();
        page_open();
    });
});

}


function page_open() {          
      setTimeout(function() {
        $('.page-loader').addClass('out');
        },600);
        //$('.page-loader').delay(1200).fadeOut('slow');
          setTimeout(function() {
        $('.page-loader').removeClass('out show');
        },1200);
}

function pagemenu() {

    $('.menu').on('click', function() {
        $('.right-menu').addClass('active invert');
             setTimeout(function () {
        $('.right-menu').removeClass('active');
        }, 1000);
            tl.play();
    });

   
    $('.menu-close').on('click', function() {
            tl.reversed(true); 
        setTimeout( function() {
        $('.right-menu').addClass('passive');
        }, 1000);
             setTimeout(function () {
        $('.right-menu').removeClass('invert passive');
                }, 1800);
    });

    var box = $(".page-menu ul>li");
    var tl = new TimelineMax({
      yoyo: false,
      reversed: true
    });

    tl.staggerFrom(box, .5, {
        y: "50",
        opacity: 0,
        delay: 1,
        ease: Back.easeOut
    },0.1);

}


// animate each

function page_anim() { 

    var controller = new ScrollMagic.Controller();
    $('.box-animation').each(function(){
      var $this = $(this);
      var $thisHeight = $(this).height();
        
      var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
      .addTo(controller);
        
      
      scene.triggerHook(1)
      
      scene.on('enter', function(){
        $this.delay($this.attr('data-delay')).queue(function(next){
          TweenMax.to($this, 0.6, {force3D:true, opacity:1, y:0, scale:1, delay:0.1, ease:Power2.easeOut});
          next();
        });
      });
      
      scene.on('leave', function(event){
        $this.removeClass('active');
      });
      
      if ($("body").hasClass("smooth-scroll")) {
        scrollbar.addListener(() => {
          scene.refresh()
        });
      }
    })
}


function smooth_scroll() {
    if ($('#smooth-scroll').length){
        var elem = document.querySelector("#smooth-scroll");
            var scrollbar = Scrollbar.init(elem,
            {
              renderByPixels: true,
              damping:0.05
            }); 
              $(".back-top").on('click', function() {
                TweenLite.to(scrollbar, 1.5, {scrollTop:0, ease:Power4.easeInOut});
          }); 
    }
}


    //  parallax image 

function parallax () {
$(".parallax").each( function () {
var controller = new ScrollMagic.Controller();
    var $this = $(this);
    var $thisHeight = $(this).height();
    var bg = $this.find("img");
    
    // Add tweenmax for backgroundParallax
    var parallax = TweenMax.fromTo( bg, 1, {y: '-20%'}, {y: '30%',ease:Linear.easeNone});
    
    // Create scrollmagic scene
    var parallaxScene = new ScrollMagic.Scene({
        triggerElement: this, // <-- Use this to select current element
        triggerHook: 1,
        duration:'300%'
    })
    .setTween(parallax)
    .addTo(controller);
}); 
}



        // LIGHTBOX
function lightbox() {
  $('.lightbox').magnificPopup({
        type:'image',
        gallery:{enabled:true},
        zoom:{enabled: true, duration: 300}
    });
}


function mobiletouch() {
    $('body').swipe({
        swipe: function (event, direction){
            if (direction == 'up'){
                $('.next').trigger('click');
            }else if(direction == 'down'){
                $('.previous').trigger('click');
            }
        }
    });  
}




function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}




$(document).ready( function() {



}); // document read end 














