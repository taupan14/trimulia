import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.css'

function setupSelect() {
    document.querySelectorAll('.js-select').forEach((jsSelect) => {
        new TomSelect(jsSelect)
    })
}

window.addEventListener('DOMContentLoaded', setupSelect)