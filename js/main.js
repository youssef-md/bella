gsap.registerPlugin(ScrollTrigger)

function initNavigation() {
    const mainNavLinks = gsap.utils.toArray('.main-nav a')
    const mainNavLinksRev = gsap.utils.toArray('.main-nav a').reverse()

    mainNavLinks.map(link => {
        link.addEventListener('mouseleave', e => {
            link.classList.add('animate-out')
            setTimeout(() => link.classList.remove('animate-out'), 300)
        })
    })

    function navAnimation(direction) {
        const scrollingDown = direction === 1
        const links = scrollingDown ? mainNavLinks : mainNavLinksRev

        return gsap.to(links, {
            duration: 0.3,
            stagger: 0.1,
            autoAlpha: scrollingDown ? 0 : 1,
            y: scrollingDown ? 20 : 0,
            ease: 'power4.out'
        })
    }

    ScrollTrigger.create({
        start: 100,
        // by default, when hitting at the end o the page the trigger ends
        end: 'bottom bottom-=50',
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        onEnter: ({ direction }) => navAnimation(direction),
        onLeaveBack: ({ direction }) => navAnimation(direction)
    })

   
}

function init(){
    
    initNavigation()
}

window.addEventListener('load', function(){
    init()
})
