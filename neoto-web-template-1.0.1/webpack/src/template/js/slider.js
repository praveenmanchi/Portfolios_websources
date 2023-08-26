import Glide from '@glidejs/glide'

var Slider = () => {

  var slider = document.querySelector('.glide.slider')

  if(slider){

    var glideSlider = new Glide('.glide.slider', {
      gap: 0,
      animationTimingFunc: 'cubic-bezier(0.770,  0.000, 0.175, 1.000)',
      animationDuration: 1000,
      autoplay: 5000,
      dragThreshold: false,
      rewindDuration: 1000
    }).mount()

    slider.addEventListener('mousemove', (e) => {
      document.body.classList.add('slider-hover')
      if(e.clientX > window.innerWidth/2) 
        document.body.classList.add('to-right')
      else
        document.body.classList.remove('to-right')
    })

    slider.addEventListener('mouseleave', (e) => {
      document.body.classList.remove('slider-hover')
    })

    slider.addEventListener('click', (e) => {
      if(!e.target.classList.contains('enlarge')){
        if(document.body.classList.contains('to-right'))
          glideSlider.go('>')
        else
          glideSlider.go('<')
      }
    })

    glideSlider.on('run.before', function(e) {

      var animatedSlide = slider.querySelector('.glide__slide--animate')
      var curSlide = slider.querySelector('.glide__slide--active')

      if(e.direction == '>')
        curSlide = slider.querySelector('.glide__slide--active').nextElementSibling
        if(!curSlide)
          curSlide = slider.querySelector('.glide__slide:first-child')
      if(e.direction == '<')
        curSlide = slider.querySelector('.glide__slide--active').previousElementSibling
        if(!curSlide)
          curSlide = slider.querySelector('.glide__slide:last-child')
      if(animatedSlide)
        animatedSlide.classList.remove('glide__slide--animate')
      if(curSlide.classList.contains('invert'))
        document.body.classList.add('dark-slide')
      else
        document.body.classList.remove('dark-slide')
      
      curSlide.classList.add('glide__slide--animate')
    })

    if(slider.querySelector('.glide__slide--active').classList.contains('invert')){
      document.body.classList.add('dark-slide')
    }

    slider.querySelector('.glide__slide:first-child').classList.add('glide__slide--animate')

  }

  var toTop = document.querySelector('.to-top')

  if(toTop){
    toTop.addEventListener('click', (e) => {
      e.preventDefault()
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    })
  }
    
}

export { Slider }
