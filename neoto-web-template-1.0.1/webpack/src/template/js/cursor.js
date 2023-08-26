var Cursor = () => {

    var existingCursor = document.getElementById('cursor')
    var cursor = document.createElement('div')
    var activeElements = document.querySelectorAll('a:not(.lightbox), .btn, .burger, button, accordion-trigger')
    var inputElements = document.querySelectorAll('input[type=text], input[type=email], textarea')
    
    cursor.setAttribute('id', 'cursor')
    
    if(!document.body.contains(existingCursor))
        document.body.appendChild(cursor)

    cursor = document.getElementById('cursor')

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = 'translate('+e.clientX+'px,'+e.clientY+'px)'
    })

    Array.prototype.forEach.call(activeElements, function(activeElement, i){

        activeElement.addEventListener('mouseenter', (e) => {
            document.body.classList.add('cursor-active')
        })
        
        activeElement.addEventListener('mouseleave', (e) => {
            document.body.classList.remove('cursor-active')
        })

    })

    Array.prototype.forEach.call(inputElements, function(inputElement, i){

        inputElement.addEventListener('mouseenter', (e) => {
            document.body.classList.add('cursor-text')
        })
        
        inputElement.addEventListener('mouseleave', (e) => {
            document.body.classList.remove('cursor-text')
        })

    })

}

export { Cursor }