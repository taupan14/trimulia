import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
    lerp: 0.125,
    duration: 1,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    // wheelMultiplier: 1,
    // touchMultiplier: 1,
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

document.querySelectorAll('.nav-header-menu').forEach((navHeaderMenu) => {
    navHeaderMenu.addEventListener('mouseenter', () => {
        lenis.stop()
    })
    navHeaderMenu.addEventListener('mouseleave', () => {
        lenis.start()
    })
})

document.querySelectorAll('#mobile-menu-toggle').forEach((mobileMenuToggle) => {
    mobileMenuToggle.addEventListener('click', () => {
        const isActiveMenu = document.documentElement.classList.contains('is-active-menu')
        if(!isActiveMenu) {
            lenis.stop()
        } else {
            lenis.start()
        }
    })
})

function setupScrollAnchor() {
    document.querySelectorAll('[data-scroll-to]').forEach((scrollToEl) => {
        const scrollToId = scrollToEl.getAttribute('data-scroll-to');
        const targetElement = document.getElementById(scrollToId);

        const padding = document.querySelector('#section-header').clientHeight;

        scrollToEl.addEventListener('click', () => {
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const adjustedPosition = targetPosition - padding;

            lenis.scrollTo(adjustedPosition);
        })
    })
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        setupScrollAnchor()
    }, 500)
})