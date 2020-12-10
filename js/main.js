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

function initHeaderTilt() {
    document.querySelector('header').addEventListener('mousemove', moveImages)
}

function moveImages(e) {
    const { offsetX, offsetY, target } = e
    const { clientWidth, clientHeight } = target

    // 0,0 in the center
    const xPos = (offsetX / clientWidth) - 0.5
    const yPos = (offsetY / clientHeight) - 0.5


    const modifier = index => index * 1.8 * 0.5

    const leftImages = gsap.utils.toArray('.hg__left .hg__image')
    const rightImages = gsap.utils.toArray('.hg__right .hg__image')
    

    tiltTweenImages(leftImages, 1)
    tiltTweenImages(rightImages, -1)
    tiltTweenImages(['.decor__circle'], 1)

    function tiltTweenImages(images, direction) {
        return images.map((image, index) => {
            gsap.to(image, {
                duration: 0.8,
                x: xPos * 20 * modifier(index),
                y: direction * yPos * 30 * modifier(index),
                rotationX: yPos * 10,
                rotationY: xPos * 30,
            })
        })
    }
}

function initGallery() {
    initHoverReveal()
}

function initHoverReveal() {
    const sections = document.querySelectorAll('.rg__column')
    sections.forEach(section => {
        section.imageBlock = section.querySelector('.rg__image')
        section.mask = section.querySelector('.rg__image--mask')
        section.text = section.querySelector('.rg__text')
        section.textCopy = section.querySelector('.rg__text--copy')

        // reset initial position on page load
        gsap.set(section.imageBlock, { yPercent: -101 })
        gsap.set(section.mask, { yPercent: 100 })
    
        section.addEventListener('mouseenter', createHoverReveal)
        section.addEventListener('mouseleave', createHoverReveal)

    })
}

function createHoverReveal(e) {
    const { type, target: { imageBlock, mask, text, textCopy } } = e

    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'power4.out'
        }
    })

    if(type === 'mouseenter') {
        tl
            // .to([mask, imageBlock], {
            //     duration: 1,
            //     yPercent: 0,
            // })
            .to(text, {
                y: -textCopy.clientHeight / 2
            })
    } 
    else if(type === 'mouseleave') {
        tl
            // .to(mask, { yPercent: 100 })
            // .to(imageBlock, { yPercent: -101 }, 0)
            .to(text, { y: 0 })
    }

    return tl
}

function init(){

    initNavigation()
    initHeaderTilt()
    initGallery()
}

window.addEventListener('load', function(){
    init()
})
