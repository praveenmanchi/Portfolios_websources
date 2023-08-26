/*
* VICTOR - A premium template from Designova
* Author: Designova, http://www.designova.net
* Copyright (C) 2017 Designova
* This is a premium product. For licensing queries please contact info@designova.net
*/

/*global $:false */
/*global window: false */
(function() {
    "use strict";
    $(function($) {

        //Detecting viewpot dimension
        var vH = $(window).height();
        var vW = $(window).width();
        //Adjusting Intro Components Spacing based on detected screen resolution
        $('.fullwidth').css('width', vW);
        $('.fullheight').css('height', vH);
        $('.halfwidth').css('width', vW / 2);
        $('.halfheight').css('height', vH / 2);


        $(".menu-toggle input").removeAttr('checked');
        
        //PRELOADER
        $('body, html').addClass('preloader-running');
        $('#mastwrap').css('visibility', 'hidden');
        $(window).load(function() {
            $("#status").fadeOut();
            $("#preloader").delay(1000).fadeOut(1000);
            $('body, html').removeClass('preloader-running');
            $('body, html').addClass('preloader-done');
            $("#mastwrap").delay(1000).css('visibility',
                'visible');
        });
        $('.menu-holder a').on('click',function(){
            $("#status").show();
            $("#preloader").show();
            $('body, html').addClass('preloader-running');
        });

        //Common UX/UI
        if ( $( "#works-container" ).length ) {
            $( ".works-filter-wrap" ).fadeIn(3000);
        }

        //Navigation
        $('.menu-toggle > div.btn-open').on('click',function(){
            $('.menu-toggle > div').removeClass('btn-open').addClass('btn-close');
            $(".menu-holder").show( "explode", {pieces: 9 }, 700, function(){
                $('.menu-holder-close-mask').show();
            });
        });
        $('.menu-holder').on('click',function(){
                $(this).hide( "explode", {pieces: 9 }, 1000, function(){
                    $('.menu-holder-close-mask').hide();
                });
                $(".menu-toggle input").removeAttr('checked');
                $('.menu-toggle > div').addClass('btn-open').removeClass('btn-close');
        });
        $('.menu-holder-close-mask').on('click',function(){
               $('.menu-holder').hide( "explode", {pieces: 9 }, 1000, function(){
                    $('.menu-holder-close-mask').hide();
                });
                $(".menu-toggle input").removeAttr('checked');
                $('.  > div').addClass('btn-open').removeClass('btn-close');
        });

        $('.menu-holder li').on('click',function(e){
                window.location = $(this).find('a').attr("href");
        });
        $('.menu-holder li a').on('click',function(e){
                window.location = $(this).attr("href");
        });

        $(".intro-section .floater, .header-section .floater").on('click',function(){
               $('html,body').animate({ scrollTop:$(this).parent().next().offset().top}, 2000, 'easeInOutQuint');

        });
        $('.floating-header-section .floater').on('click',function(){
               $('html,body').animate({ scrollTop:$(this).parent().parent().next().offset().top}, 2000, 'easeInOutQuint');

        });


        $('.highlights-section').waypoint(function() {
            $('.count-number').css('opacity','1');
                $('.count-number').each(function () {
                    $(this).prop('Counter',0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
        });

        //INTRO TEXT TRICKER
        (function($) {
          var duration = 2500;  // change this to change rotation time in milliseconds
          var current = 1;
          var tricker = $(".tricker");
          var height = tricker.height();
          var number = tricker.children().length;
          var first = tricker.children().first();

          setInterval(function() {
            var interv = current * -1 * height;
            first.css("margin-top", interv + "px");
            if (current == number) {
              first.css("margin-top", "0px");
              current = 1;
            } else {
              current++;
            }
          }, duration);
        })(jQuery); 

        //Mobile Only Navigation (SLIMMENU JS with multi level menu support)
                // $('ul.slimmenu').slimmenu({
                //     resizeWidth: '992',
                //     collapserTitle: '',
                //     easingEffect: 'easeInOutQuint',
                //     animSpeed: 'medium',
                // });

                // $('.slimmenu li a:not(.sub-collapser)').on('click',function(){
                //             $('ul.slimmenu').removeClass('expanded').slideUp();
                // });

        //Sub Menu Trigger
        $('.main-menu li a.sub-menu-trigger').on('mouseenter', function(){
            $(this).next('.sub-menu').stop().slideDown(1000);
        });
        $('.main-menu li').on('mouseleave', function(){
            $('.sub-menu').stop().slideUp(1000);
        });


        //CAROUSEL
        $(".featured-carousel, .content-carousel").owlCarousel({
            autoWidth: false,
            items: 3,
            loop: true,
            nav: false,
            dots: true,
            navText: false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                }
            }
        });
        $(".intro-carousel").owlCarousel({
            autoWidth: false,
            autoplay: true,
            autoplayTimeout: 30,
            autoplaySpeed: 1500,
            items: 6,
            loop: true,
            nav: false,
            dots: false,
            navText: false,
            responsive:{
                0:{
                    items:4
                },
                600:{
                    items:5
                },
                1000:{
                    items:6
                }
            }
        });

        //Mobile device gets non-css3 carousel 

          if (!device.tablet() && !device.mobile()) {

                    //if non-mobile device is detected
                    
                       $('.intro-carousel').removeClass('no-css3-anim');
                       $('.inner-high-wrapper').removeClass('non-floating');

                } else {

                    //if mobile device is detected
                    
                       $('.intro-carousel').addClass('no-css3-anim');
                       $('.inner-high-wrapper').addClass('non-floating');

                }   
        

        //ISOTOPE
                //ISOTOPE GLOBALS
                var $container1 = $('.works-container');


                //ISOTOPE INIT
                $(window).load(function() {

                   //checking if all images are loaded
                    $container1.imagesLoaded( function() {

                        //init isotope once all images are loaded
                        $container1.isotope({
                            // options
                            itemSelector: '.works-item',
                            layoutMode: 'masonry',
                            transitionDuration: '0.8s'
                        });


                        //forcing a perfect masonry layout after initial load
                        setTimeout(function() {
                        $container1.isotope('layout');
                        }, 100);


                        // triggering filtering
                        $('.works-filter li a').on('click', function() {
                            $('.works-filter li a').removeClass('active');
                            $(this).addClass('active');

                            var selector = $(this).attr('data-filter');
                            $('.works-container').isotope({
                                filter: selector
                            });
                            setTimeout(function() {
                                $container1.isotope('layout');
                            }, 700);
                            return false;
                        });


                        //Isotope ReLayout on Window Resize event.
                        $(window).on('resize', function() {
                            $container1.isotope('layout');
                        });

                        //Isotope ReLayout on device orientation changes
                        window.addEventListener("orientationchange", function() {
                            $container1.isotope('layout');
                        }, false);

                    });

                });


        //VENOBOX
        $('.venobox, .image-lightbox-link').venobox({
            numeratio: true
        });

        //BX SLIDER
        $(document).ready(function(){
          $('.bxslider').bxSlider({
            adaptiveHeight:true
          });
        });


        //MEDIA BACKGROUND
        // $('.project-video-bg').umbg({
        //     'mediaPlayerType': 'YouTube', // YouTube, Vimeo, Dailymotion, Wistia, HTML5, Image, or Color.
        //     'mediaId': 'k7dEsMCFfFw' // Use the video id . For HTML5 use the location and video filename.
        // });

        //RESPONSIVE VIDEO EMBED
        $(document).ready(function(){
            // Target your .container, .wrapper, .post, etc.
            $(".project-video").fitVids();
        });


        //PARALLAX
        //Initialize Each Parallax Layer  
        function parallaxInit() {
            $.stellar({
                positionProperty: 'transform'
            });
        }

        if (!device.tablet() && !device.mobile()) {

            //Activating Parallax effect if non-mobile device is detected
            $(window).on('load', function() {
                parallaxInit();
            });


        } else {

            //Dectivate Parallax effect if mobile device is detected (bg image is displayed)
            $('.parallax, .parallax-layer').addClass('no-parallax');

        }   
        

        

    });
    // $(function ($)  : ends
})();
//  JSHint wrapper $(function ($)  : ends