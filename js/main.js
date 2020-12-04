gsap.registerPlugin(ScrollTrigger)

function initNavigation() {
    const mainNavLinks = gsap.utils.toArray('.main-nav a')
    console.log(mainNavLinks)
    mainNavLinks.map(link => {
        link.addEventListener('mouseleave', e => {
            link.classList.add('animate-out')
            setTimeout(() => link.classList.remove('animate-out'), 300)
        })
    })

    ScrollTrigger.create({
        start: 100,
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        markers: true
    })
}

function init(){
    
    initNavigation()
}

window.addEventListener('load', function(){
    init()
})
