import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

CustomEase.create('custom', '.135,.9,.15,1')

const mediaQuery = window.matchMedia("(min-width: 1024px)")
let backdrop = null

function createBackdrop(parent) {
    if (!backdrop) {
        backdrop = document.createElement('div')
        backdrop.classList.add('fixed', 'top-0', 'inset-x-0', 'h-full', 'bg-dark-900/80', 'opacity-0', 'z-50')
        parent.appendChild(backdrop)
    }
}

function showModal(modal) {
    console.log('Showing modal:', modal.id) // Debug output

    document.documentElement.classList.add('is-open-modal')

    modal.classList.remove('hidden')
    modal.classList.add('flex')

    createBackdrop(document.body) // Changed to document.body for backdrop parent

    gsap.to(backdrop, {
        opacity: 1,
        duration: 0.7,
        ease: 'custom'
    })

    if (mediaQuery.matches) {
        gsap.to(modal.querySelector('[data-modal-content]'), {
            clipPath: 'inset(0% round 1.5rem)',
            duration: 0.7,
            ease: 'custom'
        })
    } else {
        gsap.to(modal.querySelector('[data-modal-content]'), {
            opacity: 1,
            yPercent: 0,
            duration: 0.7,
            ease: 'custom'
        })
    }
}

function hideModal(modal) {
    console.log('Hiding modal:', modal.id) // Debug output

    function hideModalEl() {
        modal.classList.remove('flex')
        modal.classList.add('hidden')
    }

    document.documentElement.classList.remove('is-open-modal')

    if (mediaQuery.matches) {
        gsap.to(modal.querySelector('[data-modal-content]'), {
            clipPath: 'inset(50% round 1.5rem)',
            duration: 0.7,
            ease: 'custom',
            onComplete: () => {
                hideModalEl()
                gsap.to(backdrop, {
                    opacity: 0,
                    onComplete: () => {
                        backdrop.remove()
                        backdrop = null
                    }
                })
            }
        })
    } else {
        gsap.to(modal.querySelector('[data-modal-content]'), {
            opacity: 0,
            yPercent: 25,
            duration: 0.7,
            ease: 'custom',
            onComplete: () => {
                hideModalEl()
                gsap.to(backdrop, {
                    opacity: 0,
                    onComplete: () => {
                        backdrop.remove()
                        backdrop = null
                    }
                })
            }
        })
    }
}

function closeModalOnEscape() {
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('[data-modal]')
            modals.forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    hideModal(modal)
                }
            })
        }
    })
}

export function initializeModals() {
    const modals = document.querySelectorAll('[data-modal]')

    modals.forEach(modal => {
        if (mediaQuery.matches) {
            gsap.set(modal.querySelector('[data-modal-content]'), {
                clipPath: 'inset(50% round 1.5rem)'
            })
        } else {
            gsap.set(modal.querySelector('[data-modal-content]'), {
                opacity: 0,
                yPercent: 25
            })
        }
    })

    const modalToggle = document.querySelectorAll('[data-modal-target]')

    modalToggle.forEach(modalToggleEl => {
        modalToggleEl.addEventListener('click', (event) => {
            event.preventDefault() // Prevent default behavior of anchor tags

            const modalTargetId = modalToggleEl.getAttribute('data-modal-target')
            const modalTarget = document.getElementById(modalTargetId)

            if (modalTarget) {
                if (modalTarget.classList.contains('hidden')) {
                    showModal(modalTarget)
                }
            }
        })
    })

    const modalHideElements = document.querySelectorAll('[data-modal-hide]')

    modalHideElements.forEach(modalHideEl => {
        modalHideEl.addEventListener('click', (event) => {
            event.preventDefault() // Prevent default behavior of anchor tags

            const modal = modalHideEl.closest('[data-modal]')
            if (modal) {
                hideModal(modal)
            }
        })
    })

    closeModalOnEscape()
}

// Initialize modals on page load
initializeModals()

function modal() {
    const modals = document.querySelectorAll('[data-modal]')

    modals.forEach(modal => {
        if (!modal.hasAttribute('data-auto-modal')) {
            modal.classList.add('hidden')
        } else {
            modal.classList.remove('hidden')
            modal.classList.add('flex')
            showModal(modal)
        }
    })
}

window.addEventListener('DOMContentLoaded', () => [
    setTimeout(() => {
        modal()
    }, 1000)
])