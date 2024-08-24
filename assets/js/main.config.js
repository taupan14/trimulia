import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(CustomEase,ScrollTrigger)



let mediaScreen = gsap.matchMedia()



CustomEase.create("custom", "0.76, 0, 0.24, 1")



const links = document.querySelectorAll('a:not([href="#"], [href="#!"], [href="javascript:;"], [target="_blank"], [href="javascript:void(0)"], [data-toggle])')
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault()

        document.body.style.cursor = 'wait'
        document.body.style.overflow = 'hidden'
        
        const preloaderDiv = document.createElement('div')
        preloaderDiv.id = 'preloader'
        document.querySelector('#app').appendChild(preloaderDiv)
        
        gsap.fromTo(preloaderDiv, {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.7,
            ease: 'custom'
        });

        setTimeout(() => {
            window.location.href = link.href
        }, 700)
    })
})
window.addEventListener('pageshow', (e) => {
    const historyTraversal = e.persisted || (typeof window.performance !== "undefined" && window.performance.navigation.type === 2)
    if (historyTraversal) {
        window.location.reload()
    }
})



document.querySelectorAll('[data-cursor-grab]').forEach((cursorGrab) => {
    cursorGrab.style.cursor = 'grab'
    cursorGrab.addEventListener('mousedown', function() {
        cursorGrab.style.cursor = 'grabbing'
    })

    cursorGrab.addEventListener('mouseup', function() {
        cursorGrab.style.cursor = 'grab'
    })

    cursorGrab.addEventListener('mouseout', function(event) {
        if (event.buttons === 1) {
            cursorGrab.style.cursor = 'grab'
        }
    })
})



document.querySelectorAll('#btn-language').forEach((btnLang) => [
    btnLang.addEventListener('click', () => {
        document.documentElement.classList.toggle('is-show-language')
    })
])



function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('#mobile-menu-toggle');
    const mobileMenu = document.querySelector('#mobile-menu');

    gsap.set(mobileMenu, {
        clipPath: 'rect(0% 100% 0% 0%)',
        display: 'none'
    })

    mobileMenuToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('is-active-menu')

        const isActiveMenu = document.documentElement.classList.contains('is-active-menu')

        if (isActiveMenu) {
            gsap.to(mobileMenu, {
                clipPath: 'rect(0% 100% 100% 0%)',
                display: 'block',
                duration: 0.7,
                ease: 'custom'
            })
        } else {
            gsap.to(mobileMenu, {
                clipPath: 'rect(0% 100% 0% 0%)',
                duration: 0.7,
                ease: 'custom',
                onComplete: () => {
                    mobileMenu.style.display = 'none'
                }
            })
        }
    })
}



function setupHeader() {
    document.querySelectorAll('#section-header').forEach((sectionHeader) => {
        const spaceHeader = sectionHeader.clientHeight
        document.documentElement.style.setProperty('--space-header', `${spaceHeader}px`)

        gsap.fromTo('#nav-header', { 
            yPercent: -100,
        }, {
            yPercent: 0,
            duration: 0.7,
            ease: 'custom',
        })

        const showAnim = gsap.from('#section-header', { 
            yPercent: -100,
            paused: true,
            duration: 0.7,
            ease: 'custom',
        }).progress(1)
          
        ScrollTrigger.create({
            start: `top -${spaceHeader}`,
            end: 'max',
            onUpdate: (self) => {
                if (self.direction === -1) {
                    showAnim.play(); // Play animation if scrolling down
                    sectionHeader.style.pointerEvents = 'auto'; // Enable pointer events
                } else {
                    showAnim.reverse(); // Reverse animation if scrolling up
                    sectionHeader.style.pointerEvents = 'none'; // Disable pointer events
                }
            }
        })

        let isAnyMenuHovered = false
        document.querySelectorAll('.nav-header-menu').forEach((navHeaderMenu) => {
            const navHeaderWrapper = navHeaderMenu.querySelector('.nav-header-wrapper')
            const navSubMenu = navHeaderMenu.querySelector('.nav-header-submenu')
            const navMenuContent = navHeaderMenu.querySelector('.nav-menu-content')
            const backdrop = document.querySelector('#backdrop')

            gsap.set(backdrop, {
                opacity: 0
            })

            if (navSubMenu) {
                navHeaderWrapper.style.zIndex = '-1'
                navHeaderWrapper.style.pointerEvents = 'none'

                gsap.set(navSubMenu, {
                    clipPath: 'rect(0% 100% 0% 0%)',
                    display: 'none'
                })
                gsap.set(navMenuContent, {
                    opacity: 0,
                    yPercent: 25
                })

                navHeaderMenu.addEventListener('mouseenter', () => {
                    isAnyMenuHovered = true
                    navHeaderWrapper.style.zIndex = 'auto'
                    navHeaderWrapper.style.pointerEvents = 'auto'

                    document.documentElement.classList.add('is-hover-menu')

                    gsap.to(navSubMenu, {
                        clipPath: 'rect(0% 100% 100% 0%)',
                        display: 'block',
                        duration: 0.7,
                        ease: 'custom',
                    })
                    gsap.to(navMenuContent, {
                        opacity: 1,
                        yPercent: 0,
                        duration: 0.7,
                        ease: 'custom'
                    })

                    gsap.to(backdrop, {
                        opacity: 1,
                        duration: 0.5,
                        ease: 'custom'
                    })
                })

                navHeaderMenu.addEventListener('mouseleave', () => {
                    isAnyMenuHovered = false
                    navHeaderWrapper.style.zIndex = '-1'
                    navHeaderWrapper.style.pointerEvents = 'none'

                    gsap.to(navSubMenu, {
                        clipPath: 'rect(0% 100% 0% 0%)',
                        duration: 0.7,
                        ease: 'custom',
                        onComplete: () => {
                            navSubMenu.style.display = 'none'
                            
                        },
                        onUpdate: () => {
                            if (!isAnyMenuHovered) {
                                setTimeout(() => {
                                    document.documentElement.classList.remove('is-hover-menu')
                                }, 350)
                            }
                        }
                    })
                    gsap.to(navMenuContent, {
                        opacity: 0,
                        yPercent: 25,
                        duration: 0.7,
                        ease: 'custom'
                    })

                    gsap.to(backdrop, {
                        opacity: 0,
                        duration: 0.5,
                        ease: 'custom'
                    })
                })
            }
        })
    })
}



function setupBtnHoverEffect() {
    const navHover = document.querySelectorAll('[data-hover-effect]')
    navHover.forEach((navEl) => {
        const circleIcons = navEl.querySelectorAll('.circle-icon')
        const arrowIcons = navEl.querySelectorAll('.arrow-icon')

        circleIcons.forEach(function(circleIcon) {
            var wrapperDiv = document.createElement('div')
            wrapperDiv.classList.add('btn-circle')
            wrapperDiv.appendChild(circleIcon.cloneNode(true))
            circleIcon.parentElement.replaceChild(wrapperDiv, circleIcon)
        })

        arrowIcons.forEach(arrowEl => {
            const icon = arrowEl.querySelector('i')
            if (icon) {
                const btnDiv = document.createElement('div')
                btnDiv.className = 'inline-flex overflow-clip'
                btnDiv.appendChild(icon.cloneNode(true))
                arrowEl.replaceChild(btnDiv, icon)
            }
        })
        
        navEl.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
                const btnDiv = document.createElement('div')
                const btnSpan = document.createElement('span')
                btnDiv.className = 'inline-flex overflow-clip'
                btnSpan.appendChild(node.cloneNode(true))
                btnDiv.appendChild(btnSpan)
                navEl.replaceChild(btnDiv, node)

            } else if (node.tagName === 'svg') {
                const btnDiv = document.createElement('div')
                btnDiv.className = 'inline-flex overflow-clip'
                btnDiv.appendChild(node.cloneNode(true))
                navEl.insertBefore(btnDiv, node.nextSibling)
                node.parentNode.removeChild(node)

            } else if (node.tagName === 'I') {
                const btnDiv = document.createElement('div')
                btnDiv.className = 'inline-flex overflow-clip'
                btnDiv.appendChild(node.cloneNode(true))
                navEl.insertBefore(btnDiv, node.nextSibling)
                node.parentNode.removeChild(node)
            }
        })
    })
}



function setupComputedSVG() {
    document.querySelectorAll('.icon-stroke > *').forEach((iconStroke) => {
        iconStroke.setAttribute('vector-effect','non-scaling-stroke')
        iconStroke.setAttribute('stroke-linecap','round')
        iconStroke.setAttribute('stroke-linejoin','round')
    })

    document.querySelectorAll('.icon').forEach((iconSize) => {
        const computedStyle = window.getComputedStyle(iconSize)
        const getSize = computedStyle.getPropertyValue('font-size')
        
        iconSize.style.width = getSize
        iconSize.style.height = getSize
    })
}



function setupSplits() {
    const dataSplit = document.querySelectorAll('[data-split-text]')
    dataSplit.forEach(splitEl => {
        // Reset if needed
        if(splitEl.anim) {
            splitEl.anim.progress(1).kill()
            splitEl.split.revert()
        }

        splitEl.split = new SplitType(splitEl, { 
            // type: "lines,words,chars",
            type: 'lines,words',
            lineClass: 'overflow-hidden',
            wordClass: ''
        })

        // Set up the anim
        splitEl.anim = gsap.from(splitEl.split.words, {
            scrollTrigger: {
                trigger: splitEl,
                toggleActions: 'play complete',
                start: "top bottom",
            },
            yPercent: 100,
            duration: 1, 
            ease: 'custom', 
            stagger: 0.02,
        })

        splitEl.anim = gsap.fromTo(splitEl.split.words, { 
            y: 100,
        }, {
            scrollTrigger: {
                trigger: splitEl,
                toggleActions: 'play complete',
                start: "top 80%",
            },
            y: 0,
            stagger: 0.02,
            duration: 1,
            ease: 'custom',
        })
    })
}



function setupFadeUp() {
    document.querySelectorAll('[data-fade-up]').forEach(element => {
        let delay = parseFloat(element.getAttribute('data-delay')) || 0; // Get dynamic delay attribute value or default to 0
        gsap.fromTo(element, {
            opacity: 0,
            willChange: 'opacity, transform',
            yPercent: 100,
        }, {
            scrollTrigger: {
                trigger: element,
                toggleActions: 'play complete',
                start: 'top bottom'
            },
            opacity: 1,
            yPercent: 0,
            duration: 0.7,
            ease: 'custom.out',
            delay: delay // Set the delay obtained from the dynamic attribute
        });
    });
}



function setupImageReveal() {
    document.querySelectorAll('[data-image-reveal]').forEach(element => {
        let delay = parseFloat(element.getAttribute('data-delay')) || 0;
        gsap.fromTo(element, {
            clipPath: 'inset(20% round 1.5rem)'
        }, {
            scrollTrigger: {
                trigger: element,
                toggleActions: 'play complete',
                start: 'top bottom'
            },
            clipPath: 'inset(0% round 1.5rem)',
            duration: 0.7,
            ease: 'custom.out',
            delay: delay
        })
    })
}



gsap.set(gsap.utils.toArray('[data-fade-in]'), {
    opacity: 0,
    willChange: 'opacity'
})
function setupFadeIn() {
    document.querySelectorAll('[data-fade-in]').forEach(element => {
        let delay = parseFloat(element.getAttribute('data-delay')) || 0 // Get dynamic delay attribute value or default to 0
        gsap.fromTo(element, {
            opacity: 0,
            willChange: 'opacity'
        }, {
            scrollTrigger: {
                trigger: element,
                toggleActions: 'play complete',
                start: 'top bottom'
            },
            opacity: 1,
            duration: 0.7,
            ease: 'custom',
            delay: delay // Set the delay obtained from the dynamic attribute
        })
    })
}



// const tlHeroImg = gsap.timeline({
//     scrollTrigger: {
//         trigger: '#section-hero',
//         start: 'top top',
//         scrub: true
//     }
// })

// tlHeroImg.to('#hero-image', {
//     marginLeft: '2rem',
//     marginRight: '2rem'
// })



function handleInput(event) {
    const inputElement = event.target;
    if (inputElement.value.length > 0) {
        inputElement.parentNode.classList.add('is-focus')
    } else {
        inputElement.parentNode.classList.remove('is-focus')
    }
}

function setupInput() {
    document.querySelectorAll('.js-textarea').forEach((textareaEl) => {
        textareaEl.addEventListener('input', () => {
            textareaEl.style.height = 'auto';
            textareaEl.style.height = textareaEl.scrollHeight + 'px';
        });
    });

    document.querySelectorAll('.c-input').forEach((inputElement) => {
        if (inputElement && inputElement.value) {
            if (inputElement.value.length > 0) {
                inputElement.parentNode.classList.add('is-focus');
            } else {
                inputElement.parentNode.classList.remove('is-focus');
            }
        }

        function handleInput(event) {
            const el = event.target;
            if (el && el.value) {
                if (el.value.length > 0) {
                    el.parentNode.classList.add('is-focus');
                } else {
                    el.parentNode.classList.remove('is-focus');
                }
            }
        }

        inputElement.addEventListener('focus', () => {
            inputElement.parentNode.classList.add('is-focus');
        });

        inputElement.addEventListener('focusout', handleInput);
        inputElement.addEventListener('input', handleInput);
        inputElement.addEventListener('change', handleInput);
    })
}



// Accordion /////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setupAccordion(){
    const accordions = document.querySelectorAll('.accordion')
    accordions.forEach(accordion => {
        const accordionItems = accordion.querySelectorAll('.accordion-item')
        const isParentAccordion = accordion.hasAttribute('data-parent')

        accordionItems.forEach((item, index) => {
            const header = item.querySelector('[data-target]')
            const contentId = header.getAttribute('data-target')
            const content = document.getElementById(contentId)

            const contentWrapper = content.closest('.accordion-content')

            const maxHeight = content.scrollHeight + 'px';

            // Initialize the accordion state based on aria-hidden attribute
            const isHidden = contentWrapper.getAttribute('aria-hidden') === 'true'
            if (isHidden) {
                gsap.set(content, { maxHeight: 0 })
            } else {
                gsap.set(content, { maxHeight: maxHeight })
                item.classList.add('is-active')
            }

            header.addEventListener('click', () => {
                // If it's a parent accordion, close all other items
                if (isParentAccordion) {
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('is-active')) {
                            const otherContentId = otherItem.querySelector('[data-target]').getAttribute('data-target')
                            const otherContent = document.getElementById(otherContentId)
                            gsap.to(otherContent, {
                                maxHeight: 0,
                                duration: 0.7,
                                ease: 'custom',
                                onComplete: () => {
                                    otherItem.classList.remove('is-active');
                                    otherContent.closest('.accordion-content').setAttribute('aria-hidden', 'true')
                                }
                            })
                        }
                    })
                } else {
                    // If it's not a parent accordion, close the is-active item
                    if (item.classList.contains('is-active')) {
                        gsap.to(content, {
                            maxHeight: 0,
                            duration: 0.7,
                            ease: 'custom',
                            onComplete: () => {
                                item.classList.remove('is-active')
                                contentWrapper.setAttribute('aria-hidden', 'true')
                            }
                        })
                        return // Stop here to prevent opening the item again
                    }
                }

                // Toggle the is-active class and aria-hidden attribute
                item.classList.toggle('is-active')
                const isActive = item.classList.contains('is-active')
                contentWrapper.setAttribute('aria-hidden', !isActive)

                // Toggle the max-height of the content using GSAP
                if (isActive) {
                    const maxHeight = content.scrollHeight
                    gsap.fromTo(content, {
                        maxHeight: 0,
                        duration: 0.7,
                        ease: 'custom',
                    }, {
                        maxHeight: maxHeight,
                        duration: 0.7,
                        ease: 'custom',
                    })
                } else {
                    gsap.to(content, {
                        maxHeight: 0,
                        duration: 0.7,
                        ease: 'custom',
                    })
                }
            })
        })
    })
}



function setupImageFollow() {
    mediaScreen.add("(min-width: 1024px)", () => {
        const imageFollowElements = document.querySelectorAll('[data-hover-image]');
        imageFollowElements.forEach((hoverImage) => {
            const image = hoverImage.querySelector('[data-image]');
            gsap.set(image, { scale: 0.75, opacity: 1 });
    
            document.addEventListener('mousemove', (e) => {
                gsap.to(image, {
                    left: e.clientX,
                    top: e.clientY,
                    duration: 0.3
                });
            });
    
            hoverImage.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'custom'
                });
                image.classList.remove('is-show');
            });
    
            hoverImage.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'custom'
                });
                image.classList.add('is-show');
            });
        });
    })
}



// function setupCircularSlide() {
//     document.querySelectorAll('[data-circular-slide]').forEach((circularSlide) => {
//         const slideItems = circularSlide.querySelectorAll('[data-slide-item]')
//         const currentItemCount = slideItems.length
//         const itemsNeeded = 36 - currentItemCount

//         for (let i = 0; i < itemsNeeded; i++) {
//             const clone = slideItems[i % currentItemCount].cloneNode(true);
//             circularSlide.appendChild(clone)
//         }

//         const updatedSlideItems = circularSlide.querySelectorAll('[data-slide-item]')

//         updatedSlideItems.forEach((slideItem, index) => {
//             const slideWidth = slideItem.clientWidth
//             const rotationAngle = index * 10
//             slideItem.parentNode.parentNode.style.transformOrigin = `${slideWidth / 2}px 160vmax`
//             slideItem.style.transformOrigin = `${slideWidth / 2}px 160vmax`
//             slideItem.style.transform = `rotate(${rotationAngle}deg)`

//             gsap.to(slideItem, {
//                 rotation: "-=360",
//                 transformOrigin: `${slideWidth / 2}px 160vmax`,
//                 ease: "none",
//                 repeat: -1,
//                 duration: 200
//             })
//         })
//     })
// }



function setupFloatingBtn() {
    gsap.set('#floating-btn', {
        yPercent: 0
    })

    gsap.to('#floating-btn', {
        yPercent: 0,
        duration: '0.5',
        ease: 'power3',
        scrollTrigger: {
            trigger: 'body',
            start: 'top -=10%',
            toggleActions: 'play none none reverse'
        }
    })

    ScrollTrigger.create({
        trigger: '#footer-bottom',
        endTrigger: 'body',
        end: 'bottom 20%',
        onToggle: self => {
            gsap.to('#floating-btn', {
                yPercent: self.isActive ? 100 : 0,
                duration: 0.5,
                ease: 'power3'
            })
        }
    })
}



window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.documentElement.classList.add('is-load')
        const isLoad = document.documentElement.classList.contains('is-load')
        
        if(isLoad) {
            gsap.to('#preloader', {
                opacity: 0,
                duration: 0.7,
                ease: 'custom',
                onComplete: () => {
                    document.querySelector('#preloader').remove()
                }
            })
        }

        setupBtnHoverEffect()
        setupComputedSVG()
        setupMobileMenu()
        setupHeader()
        setupSplits()
        setupFadeUp()
        setupFadeIn()
        setupImageReveal()
        setupInput()
        setupAccordion()
        setupImageFollow()
        setupFloatingBtn()
        
    }, 500)
})