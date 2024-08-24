import lightGallery from 'lightgallery'
import lgVideo from 'lightgallery/plugins/video'

import 'lightgallery/css/lightgallery-bundle.css'


document.querySelectorAll('[data-gallery]').forEach((galleryEl) => {
    lightGallery(galleryEl, {
        plugins: [lgVideo],
        selector: '[data-gallery-item]',
        //licenseKey: 'your_license_key',
        zoomFromOrigin: false,
        download: false,
    })
})


// Custom SVG icons
const closeIcon = `<svg class="icon icon-stroke" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const downloadIcon = `<svg class="icon icon-stroke" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 21C9.20998 16.2487 13.9412 9.9475 21 14.6734" stroke="#141B34" stroke-width="1.5"/>
    <path d="M14 3.00231C13.5299 3 12.0307 3 11.5 3C7.02166 3 4.78249 3 3.39124 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39124 20.6088C4.78249 22 7.02166 22 11.5 22C15.9783 22 18.2175 22 19.6088 20.6088C20.9472 19.2703 20.998 17.147 20.9999 13" stroke="#141B34" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M17 7.5C17.4915 8.0057 18.7998 10 19.5 10M22 7.5C21.5085 8.0057 20.2002 10 19.5 10M19.5 10V2" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const prevIcon = `<svg class="icon icon-stroke" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12L4.44345 12M8.99996 17L4 12L9 7" stroke="#141B34" stroke-width="1.5"/>
</svg>`
const nextIcon = `<svg class="icon icon-stroke" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12L19.5715 12M15.0001 17L20 12L15 7" stroke="#141B34" stroke-width="1.5"/>
</svg>`
                        
let iconsInserted = false
window.addEventListener('load', () => {
    if (!iconsInserted) {
        const lgCloseIcon = document.querySelectorAll('.lg-close')
        const lgDownloadIcon = document.querySelectorAll('.lg-download')
        const lgPrevIcon = document.querySelectorAll('.lg-prev')
        const lgNextIcon = document.querySelectorAll('.lg-next')
        lgCloseIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', closeIcon)
        })
        lgDownloadIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', downloadIcon)
        })
        lgPrevIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', prevIcon)
        })
        lgNextIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', nextIcon)
        })
        iconsInserted = true
    }
})
