
gsap.registerPlugin(ScrollTrigger)
const sections = document.querySelectorAll('.rg__column')

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
    sections.forEach(section => {
        section.imageBlock = section.querySelector('.rg__image')
        section.image = section.querySelector('.rg__image img')
        section.mask = section.querySelector('.rg__image--mask')
        section.text = section.querySelector('.rg__text')
        section.textCopy = section.querySelector('.rg__text--copy')
        section.textMask = section.querySelector('.rg__text--mask')
        section.textP = section.querySelector('.rg__text--copy p')

        // reset initial position on page load
        gsap.set([section.imageBlock, section.textMask], { yPercent: -101 })
        gsap.set([section.mask, section.textP], { yPercent: 100 })
        gsap.set(section.image, { scale: 1.4 })

        section.addEventListener('mouseenter', createHoverReveal)
        section.addEventListener('mouseleave', createHoverReveal)

    })
}

function createHoverReveal(e) {
    const { type, target: { imageBlock, mask, text, textCopy, textMask, textP, image } } = e

    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'power4.out'
        }
    })

    if(type === 'mouseenter') {
        tl
            .to([mask, imageBlock, textMask, textP], {
                duration: 1,
                yPercent: 0,
            }, 0)
            .to(text, { y: -textCopy.clientHeight / 2 }, 0)
            .to(image, { duration: 1, scale: 1 }, 0)
    } 
    else if(type === 'mouseleave') {
        tl
            .to([mask, textP], { yPercent: 100 }, 0)
            .to([imageBlock, textMask], { yPercent: -101 }, 0)
            .to(text, { y: 0 }, 0)
            .to(image, { duration: 1, scale: 1.4 }, 0)
    }

    return tl
}


const allLinks = gsap.utils.toArray('.portfolio__categories a')
const pageBackground = document.querySelector('.fill-background')
const largeImage = document.querySelector('.portfolio__image--l')
const smallImage = document.querySelector('.portfolio__image--s')
const lInside = document.querySelector('.portfolio__image--l .image_inside')
const sInside = document.querySelector('.portfolio__image--s .image_inside')

function initPortfolioHover(){
    const allLinks = gsap.utils.toArray('.portfolio__categories a')

    allLinks.forEach(link => {
        link.addEventListener('mouseenter', createPortfolioHover)
        link.addEventListener('mouseleave', createPortfolioHover)
        link.addEventListener('mousemove', createPortfolioMove)
    });
}

function createPortfolioHover(e) {    
    const { color, imagelarge, imagesmall } = e.target.dataset
    const allSiblings = allLinks.filter(item => item != e.target)
    
    const tl = gsap.timeline()
    if(e.type === 'mouseenter') {
        tl
            .set(lInside, { backgroundImage: `url(${imagelarge})` })
            .set(sInside, { backgroundImage: `url(${imagesmall})` })
            .to([largeImage, smallImage], { duration: 1, autoAlpha: 1 })
            .to(allSiblings, { color: '#fff', autoAlpha: 0.2 }, 0)
            .to(e.target, { color: '#fff', autoAlpha: 1 }, 0)
            .to(pageBackground, { backgroundColor: color, ease: 'none' }, 0)

    } else if(e.type === 'mouseleave'){
        tl
            .to([largeImage, smallImage], { autoAlpha: 0 })
            .to(allLinks, { color: "#000", autoAlpha: 1 }, 0)
            .to(pageBackground, { backgroundColor: "#ACB7AE", ease: 'none' }, 0)

    }
}
 
function createPortfolioMove(e) {
    const { clientY } = e
    const offset = -(document.querySelector('.portfolio__categories').clientHeight - clientY)

    gsap.to(largeImage, { duration: 1.2, y: offset/ 4, ease: 'power4.out' })
    gsap.to(smallImage, { duration: 1.5, y: offset / 2, ease: 'power4.out' })
}

function initImageParallax() {
    gsap.utils.toArray('.with-parallax').forEach(section => {
        const image = section.querySelector('img')

        gsap.to(image, {
            yPercent: 27,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom', // when the top of que image is at the bottom of the page...
                scrub: true // 
            }
        })
    })
}

function initPinSteps() {
    ScrollTrigger.create({
        trigger: '.fixed-nav',
        pin: true,
        start: 'top center',
        endTrigger: '#stage4',
        end: 'center center',
    })

    // get viewport height
    const getVh = () => {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return vh;
    }
    
    const updateBodyColor = (color) => {
        document.documentElement.style.setProperty('--bcg-fill-color', color)
    }

    gsap.utils.toArray('.stage').forEach((stage, index) => {
        const navLinks = gsap.utils.toArray('.fixed-nav li')

        ScrollTrigger.create({
            trigger: stage,
            start: 'top center',
            end: () =>  `+=${stage.clientHeight + getVh() / 10}`,
            toggleClass: {
                targets: navLinks[index],
                className: 'is-active'
            },
            onEnter: () => updateBodyColor(stage.dataset.color),
            onEnterBack: () => updateBodyColor(stage.dataset.color),
        })
    })
}

function initScrollTo() {
    gsap.utils.toArray('.fixed-nav a').forEach(link => {
        const target = link.getAttribute('href')

        link.addEventListener('click', (e) => {
            e.preventDefault()

            gsap.to(window, { duration: 1, scrollTo: target, ease: 'power2.out'})
        })
    })
}

function init(){
    initNavigation()
    initGallery()
    initHeaderTilt()
    initPortfolioHover()
    initImageParallax()
    initPinSteps()
    initScrollTo()
}

window.addEventListener('load', function(){
    init()
})


const mq = window.matchMedia('(max-width: 768px)')

mq.addEventListener('change', handleWidthChange)

handleWidthChange()

function resetProps(elements) {
    if(elements.length) {
        gsap.killTweensOf('*')
        elements.forEach(el => {
            el && gsap.set(el, { clear: 'all' })
        })
    }
}

function handleWidthChange(e) {
    
    if(mq.matches) {
        sections.forEach(section => {
            section.removeEventListener('mouseenter', createHoverReveal)
            section.removeEventListener('mouseleave', createHoverReveal)

            const { imageBlock, mask, text, textCopy, textMask, textP, image } = section
            resetProps([imageBlock, mask, text, textCopy, textMask, textP, image])

        })
    }
    else {
        initGallery()
    }
}