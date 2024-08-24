import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import Splide from '@splidejs/splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

import '@splidejs/splide/dist/css/splide.min.css'

CustomEase.create("custom", "0.76, 0, 0.24, 1")

let timer
function handleDrag(slideEl) {
    return function(event) {
        if (!event || event.button !== 0) return

        timer = setTimeout(() => {
            slideEl.Components.Elements.slides.forEach((slide) => {
                slide.classList.add('is-dragging');
                gsap.to(slide.querySelector('&>*'), {
                    scale: 0.9,
                    duration: 0.5,
                    ease: 'custom'
                });
            });
        }, 200)
    }
}
function handleDragEnd(slideEl) {
    return function(event) {
        if (!event || event.button !== 0) return

        clearTimeout(timer)

        slideEl.Components.Elements.slides.forEach((slide) => {
            slide.classList.remove('is-dragging')
            gsap.to(slide.querySelector('&>*'), {
                scale: 1,
                duration: 0.5,
                ease: 'custom'
            })
        })
    }
}

document.querySelectorAll('[data-slide-facilities]').forEach((slideEl) => {
    const slideFacilites = new Splide(slideEl, {
        type: 'loop',
        autoWidth: true,
        gap: 16*3,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        breakpoints: {
            640: {
                perPage: 1
            }
        },
        autoScroll: {
            pauseOnFocus: false,
        },
    })
    slideFacilites.mount({AutoScroll})
})

document.querySelectorAll('[data-slide-footer]').forEach((slideEl) => {
    const slideFooter = new Splide(slideEl, {
        type: 'loop',
        autoWidth: true,
        gap: 16*2,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        breakpoints: {
            640: {
                perPage: 1
            }
        },
        autoScroll: {
            pauseOnFocus: false,
            pauseOnHover: false
        },
    })
    slideFooter.mount({AutoScroll})
})

document.querySelectorAll('[data-slide-about]').forEach((slideEl) => {
    const slideAbout = new Splide(slideEl, {
        type: 'loop',
        perPage: 5,
        gap: 16*2,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        autoScroll: {
            pauseOnFocus: false,
            pauseOnHover: false
        },
        breakpoints: {
            640: {
                focus: 'center',
                perPage: 1.5,
                gap: 12,
            }
        },
    })
    slideAbout.mount({AutoScroll})
})

document.querySelectorAll('[data-slide-study]').forEach((slideEl) => {
    const slideStudy = new Splide(slideEl, {
        // type: 'loop',
        perPage: 5,
        gap: 16,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        breakpoints: {
            640: {
                focus: 'center',
                perPage: 1.5,
                gap: 12,
            }
        },
    })
    slideStudy.mount()

    slideStudy.on('drag', handleDrag(slideStudy))
    slideStudy.on('dragged', handleDragEnd(slideStudy))

    slideStudy.Components.Elements.slides.forEach((slide) => {
        slide.addEventListener('mousedown', handleDrag(slideStudy))
        slide.addEventListener('mouseup', handleDragEnd(slideStudy))
        slide.addEventListener('mouseleave', handleDragEnd(slideStudy))
    })

    let parent = slideEl;
    while (parent.parentElement !== null) {
        parent = parent.parentElement
    }
})

document.querySelectorAll('[data-slide-gallery]').forEach((slideEl) => {
    const slideGallery = new Splide(slideEl, {
        type: 'loop',
        perPage: 4,
        gap: 16,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        autoScroll: {
            pauseOnFocus: false,
        },
        breakpoints: {
            640: {
                focus: 'center',
                perPage: 1.5,
                gap: 12,
            }
        },
    })
    slideGallery.mount({AutoScroll})
})

document.querySelectorAll('[data-slide-staff]').forEach((slideEl) => {
    const slideStaff = new Splide(slideEl, {
        perPage: 5,
        gap: 16,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        breakpoints: {
            640: {
                focus: 'center',
                perPage: 1.5,
                gap: 12,
            }
        },
    })
    slideStaff.mount()

    slideStaff.on('drag', handleDrag(slideStaff))
    slideStaff.on('dragged', handleDragEnd(slideStaff))

    slideStaff.Components.Elements.slides.forEach((slide) => {
        slide.addEventListener('mousedown', handleDrag(slideStaff))
        slide.addEventListener('mouseup', handleDragEnd(slideStaff))
        slide.addEventListener('mouseleave', handleDragEnd(slideStaff))
    })

    let parent = slideEl;
    while (parent.parentElement !== null) {
        parent = parent.parentElement
    }
})

document.querySelectorAll('[data-slide-quotes]').forEach((slideEl) => {
    const slideQuoteImg = slideEl.querySelector('[data-slide-quote-img]')
    const slideQuoteText = slideEl.querySelector('[data-slide-quote-text]')

    const slideThumbnail = new Splide(slideQuoteImg, {
        type: 'loop',
        focus: 'center',
        // trimSpace: false,
        perPage: 5,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        isNavigation: true,
        breakpoints: {
            640: {
                focus: 'center',
                perPage: 1.5,
                gap: 12,
            }
        },
    }).mount()
    const updateActiveSlideClass = (newIndex) => {
        slideThumbnail.Components.Elements.slides.forEach((slide) => {
            slide.classList.remove('active-slide')
        })

        const currentSlide = slideThumbnail.Components.Elements.slides[newIndex]
        currentSlide.classList.add('active-slide')
    }
    updateActiveSlideClass(slideThumbnail.index);
    slideThumbnail.on('move', (newIndex) => {
        updateActiveSlideClass(newIndex)
    })
    
    const slideMain = new Splide(slideQuoteText, {
        type: 'loop',
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        // autoplay: true,
        // interval: 5000,
        autoHeight: true,
    }).mount()


    slideMain.sync(slideThumbnail)
})