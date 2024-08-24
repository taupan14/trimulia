function setupTab() {
    document.querySelectorAll('[data-tabs]').forEach((tabs) => {
        const navTab = tabs.querySelectorAll('[data-tab-target]')
        const contentTab = tabs.querySelectorAll('[data-tab-content]')

        navTab.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tabTarget

                navTab.forEach(t => t.classList.remove('is-active'))
                contentTab.forEach(content => {
                    content.classList.remove('is-active')
                    content.setAttribute('aria-hidden', 'true')
                })

                tab.classList.add('is-active')
                contentTab.forEach(content => {
                    if (content.id === target) {
                        content.classList.add('is-active')
                        content.setAttribute('aria-hidden', 'false')
                    }
                })
            })
        })
    })
}

window.addEventListener('DOMContentLoaded', setupTab)