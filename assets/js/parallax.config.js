import Ukiyo from 'ukiyojs'

const parallax = document.querySelectorAll('[data-parallax]')

parallax.forEach(el => {
    const instance = new Ukiyo(el, {
        // scale: 1.5, // 1~2 is recommended
        // speed: 1.5, // 1~2 is recommended
        // willChange: true,
        // wrapperClass: "ukiyo-wrapper",
        // externalRAF: false
    })
    window.addEventListener('DOMContentLoaded', () => {
        instance.reset()
    })
})