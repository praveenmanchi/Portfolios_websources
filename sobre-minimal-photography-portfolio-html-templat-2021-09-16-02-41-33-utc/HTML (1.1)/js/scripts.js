(function($){

  "use strict"; 

  $(window).on('load', function() {

    // Preloader
    $('.loader').fadeOut();
    $('.loader-mask').delay(350).fadeOut('slow');
   
    initCollagePlus();
    thumbs_height_init();
    initFlickity();
    $(window).trigger("resize");
  });


  // Init
  initMasonry();
  initFlexSlider();
  initFullpage();

  $(window).resize(function(){

    container_full_height_init();
    initCollagePlus();
    thumbs_height_init();
    imgFull();
    
    var windowWidth = $(window).width();
    var $dropdownToggle = $('.dropdown-toggle');
    if (windowWidth <= 974) {
      $dropdownToggle.attr('data-toggle', 'dropdown');
      $('.navigation').removeClass('sticky');
      $(".container-full-height").height($(window).height() - 60 );
      $('#gallery-main .flickity-viewport').height($(window).height() - $('.gallery-thumbs').height() - 60 );
    }
    if (windowWidth > 974) {
      $dropdownToggle.removeAttr('data-toggle', 'dropdown');
      $('.dropdown').removeClass('open');
    }
  });


  /* Sidenav
  -------------------------------------------------------*/
  var $navOpened = $(".nav-type-1, #nav-icon");

  $("#nav-trigger").on('click', function() {
    $navOpened.toggleClass('opened');
  });

  $('.main-wrapper').on('click', function() {
    $navOpened.removeClass('opened');
  });


  /* Mobile Detect
  -------------------------------------------------------*/
  if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
     $("html").addClass("mobile");
     $('.dropdown-toggle').attr('data-toggle', 'dropdown');
  }
  else {
    $("html").removeClass("mobile");
  }

  /* IE Detect
  -------------------------------------------------------*/
  if(Function('/*@cc_on return document.documentMode===10@*/')()){ $("html").addClass("ie"); }


  /* Full Page
  -------------------------------------------------------*/
  function initFullpage(){

    $('#fullpage').fullpage({
      lockAnchors: false,
      navigation: true,
      navigationPosition: 'right',
      showActiveTooltip: false,
      slidesNavigation: true,
      slidesNavPosition: 'bottom'
    });
  }


  /* Hero FlexSlider
  -------------------------------------------------------*/

  function initFlexSlider() {
    $('#flexslider-hero').flexslider({
      animation: "fade",
      controlNav: true,
      directionNav: false,
      touch: true,
      slideshow: true,
      slideshowSpeed: 4500,
      animationSpeed: 2000,
      prevText: ["<i class='fa fa-angle-left'></i>"],
      nextText: ["<i class='fa fa-angle-right'></i>"]
    });

    // Flexslider
    $('#flexslider').flexslider({
      animation: "slide",
      directionNav: true,
      controlNav: false,
      touch: true,
      slideshow: false,
      prevText: ["<i class='fa fa-angle-left'></i>"],
      nextText: ["<i class='fa fa-angle-right'></i>"]
    });
  }


  /* Flickity Slider
  -------------------------------------------------------*/

  function initFlickity() {

    if ($('.flickity-slider-wrap').data('autoplay')) {
      var dataAutoPlay = true;
    } else {
      var dataAutoPlay = false;
    }

    if ($('.flickity-slider-wrap').data('arrows')) {
      var dataArrows = true;
    } else {
      var dataArrows = false;
    }

    if ($('.flickity-slider-wrap').data('slidedots')) {
      var dataSlideDots = true;
    } else {
      var dataSlideDots = false;
    }


    // Photography slider
    $('#photography-slider').flickity({
      cellAlign: 'center',
      wrapAround: true,
      autoPlay: dataAutoPlay,
      prevNextButtons: dataArrows,
      percentPosition: false,
      imagesLoaded: true,
      lazyLoad: 1,
      pageDots: dataSlideDots,
      draggable: true,
      selectedAttraction : 0.1,
      friction: 0.6,
      rightToLeft: false,
      arrowShape: 'M 15,50 L 60,95 L 65,90 L 25,50  L 65,10 L 60,5 Z'
    });


    // Thumbnails Slider
    var a = $('#gallery-main');

    $(a).flickity({
      cellAlign: 'center',
      wrapAround: true,
      autoPlay: false,
      prevNextButtons: true,
      percentPosition: true,
      imagesLoaded: true,
      lazyLoad: 8,
      bgLazyLoad: 8,
      pageDots: false,
      selectedAttraction : 0.1,
      friction: 0.6,
      rightToLeft: false,
      arrowShape: 'M 10,50 L 60,100 L 65,95 L 20,50  L 65,5 L 60,0 Z'
    });

    $(a).flickity('resize');  


    // thumbs
    $('.gallery-thumbs').flickity({
      asNavFor: '#gallery-main',
      contain: true,
      autoPlay: false,
      prevNextButtons: false,
      percentPosition: true,
      imagesLoaded: true,
      pageDots: false,
      selectedAttraction : 0.1,
      friction: 0.6,
      rightToLeft: false
    });

    // Related Photos
    $('#related-photos').flickity({
      cellAlign: 'left',
      wrapAround: true,
      autoPlay: false,
      prevNextButtons: true,
      percentPosition: false,
      imagesLoaded: true,
      lazyLoad: 1,
      pageDots: false,
      draggable: true,
      selectedAttraction : 0.1,
      friction: 0.6,
      rightToLeft: false,
      arrowShape: 'M 15,50 L 60,95 L 65,90 L 25,50  L 65,10 L 60,5 Z'
    });

    // Single item
    $('#slider-single').flickity({
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      autoPlay: dataAutoPlay,
      prevNextButtons: dataArrows,
      percentPosition: true,
      imagesLoaded: true,
      lazyLoad: 1,
      pageDots: dataSlideDots,
      selectedAttraction : 0.1,
      friction: 0.6,
      rightToLeft: false,
      arrowShape: 'M 10,50 L 60,100 L 65,100 L 15,50  L 65,0 L 60,0 Z'
    });

    var $gallery = $('.mfp-hover');

    $gallery.on( 'dragStart.flickity', function( event, pointer ) {
      $(this).addClass('is-dragging');
    })

    $gallery.on( 'dragEnd.flickity', function( event, pointer ) {
      $(this).removeClass('is-dragging');
    })

    $gallery.magnificPopup({
      delegate: '.lightbox-img, .lightbox-video',
      callbacks: {
        elementParse: function(item) {
        if(item.el.context.className == 'lightbox-video') {
            item.type = 'iframe';
          } else {
            item.type = 'image';
          }
        }
      },    
      type: 'image',
      closeBtnInside:false,
      gallery:{
        enabled:true
      }
    });
  }


  /* Post Img Fullwidth
  -------------------------------------------------------*/
  function imgFull() {

    var mainWrapper = $('.main-wrapper');
    var imgFull = mainWrapper.width();
    var imgOffset = mainWrapper.width() - $('.entry').width();

    $('.post-fullwidth-img').css(
      "margin-left", "-" + imgOffset / 2 + "px"
    ).width(imgFull);
  }


  /* Thumbs Height
  -------------------------------------------------------*/
  function thumbs_height_init(){
    $('#gallery-main .flickity-viewport').height($(window).height() - $('.gallery-thumbs').height() );
  }


  /* Lightbox popup
  -------------------------------------------------------*/
  $('.lightbox-img, .lightbox-video').magnificPopup({
    callbacks: {
      elementParse: function(item) {
      if(item.el.context.className == 'lightbox-video') {
          item.type = 'iframe';
        } else {
          item.type = 'image';
        }
      }
    },
    type: 'image',
    closeBtnInside:false,
    gallery: {
      enabled:true
    },
    image: {
      titleSrc: 'title',
      verticalFit: true
    }
  });

  // Single video lightbox
  $('.single-video-lightbox').magnificPopup({
    type: 'iframe',
    closeBtnInside:false,
    tLoading: 'Loading image #%curr%...'
  });


  /* Background Image Hover
  -------------------------------------------------------*/

  var $imgHolder = $('#hover-bg-img .img-holder');
  var $headerList = $('.headers-list');

  $imgHolder.fadeOut();
  $imgHolder + $(".active").fadeIn();

  $headerList.find("a").on('mouseover', function() {
    var e = $(this).parents("h2").index();
    $headerList.find("h2").removeClass("hover"),
    $(this).parents("h2").addClass("hover"),
    $(".img-holder").stop().fadeOut().eq(e).stop().fadeIn()
  }).on('mouseout', function() {});


  /* Collage Plus
  -------------------------------------------------------*/
  function initCollagePlus() {
    $('.collage').removeWhitespace().collagePlus({
      'fadeSpeed': 5000,
      'targetHeight': 400,
      'direction': 'vertical',
      'allowPartialLastRow': true
    });
  }


  /* Play Btn
  -------------------------------------------------------*/
  $('.play-btn').on("click", function() {

    $('.btn-play').toggleClass('hidden');
    $('.btn-pause').toggleClass('show');

    var bgVideo = $(".bg-video video");

    if ($(bgVideo).get(0).paused) {
      $(bgVideo).get(0).play();
    } else {
      $(bgVideo).get(0).pause();
    }
  });



  /* Full Height Container
  -------------------------------------------------------*/
  function container_full_height_init(){
    (function($){
      $(".container-full-height").height($(window).height());
    })(jQuery);
  }


  /* Nav Toggles
  -------------------------------------------------------*/
  $(".nav-item-submenu").hide();
  $(".nav-item-toggle").on('click', "> a", function(e){
    e.preventDefault();
    if ($(this).hasClass("active")) {
      $(this).next().slideUp("easeOutExpo");
      $(this).removeClass("active");
    }

    else {
      $(this).next(".nav-item-submenu");
      $(this).addClass("active");
      $(this).next().slideDown("easeOutExpo");
    }

  });



  /* Portfolio Isotope
  -------------------------------------------------------*/

  var $portfolio = $('#isotope-grid');
  $portfolio.imagesLoaded( function() {     
    $portfolio.isotope({
      isOriginLeft: true,
      stagger: 30
    });
    $portfolio.isotope();
  });


  /* Masonry
  -------------------------------------------------------*/
  function initMasonry(){

    var $masonry = $('#masonry-grid');
    $masonry.imagesLoaded( function() {
      $masonry.isotope({
        itemSelector: '.work-item',
        layoutMode: 'masonry',
        percentPosition: true,
        resizable: false,
        isResizeBound: false,
        masonry: { columnWidth: '.work-item.quarter' }
      });
    });

    $masonry.isotope();
  }

  // Isotope filter
  var $portfolioFilter = $('#isotope-grid, #masonry-grid');
  $('.portfolio-filter').on( 'click', 'a', function(e) {
    e.preventDefault();
    var filterValue = $(this).attr('data-filter');
    $portfolioFilter.isotope({ filter: filterValue });
    $('.portfolio-filter a').removeClass('active');
    $(this).closest('a').addClass('active');
  });

  /* Contact Form
  -------------------------------------------------------*/

  var submitContact = $('#submit-message'),
  message = $('#msg');

  submitContact.on('click', function(e){
    e.preventDefault();

    var $this = $(this);
    
    $.ajax({
      type: "POST",
      url: 'contact.php',
      dataType: 'json',
      cache: false,
      data: $('#contact-form').serialize(),
      success: function(data) {

        if(data.info !== 'error'){
          $this.parents('form').find('input[type=text],input[type=email],textarea,select').filter(':visible').val('');
          message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
        } else {
          message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
        }
      }
    });
  });


})(jQuery);