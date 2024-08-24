import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.6.0/countUp.min.js";
// import { Odometer } from 'odometer_countup'

document.querySelectorAll('[data-counter-up]').forEach((counterEl) => {
    const counterVal = counterEl.innerHTML

    const counter = new CountUp(counterEl, counterVal, {
        enableScrollSpy: true,
        scrollSpyOnce: false,
        separator: '.',
        // plugin: new Odometer({ duration: 1, lastDigitDelay: 0 }),
        duration: 3
    })

    counter.start()
})