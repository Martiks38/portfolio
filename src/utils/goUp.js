import { $ } from './selectors'
;(() => {
	const handlerElement = $('#viewBtnToTop')
	const buttonToTop = $('.buttonToTop')
	const classListBtnToTop = buttonToTop.classList

	// 	Show the button to the top of the page.
	// If when you open it you already have a scroll.
	window.addEventListener('DOMContentLoaded', () => {
		setTimeout(() => {
			if (window.scrollY > 1200) buttonToTop.classList.add('visible')
		}, 400)
	})

	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 0.05
	}

	// Manages the display of the button according to its position with respect to the reference element.
	const handlerViewButtonToTop = (entries) => {
		let entry = entries[0]

		if (entry.isIntersecting) {
			classListBtnToTop.add('visible')
		} else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
			classListBtnToTop.remove('visible')
		}
	}

	const observer = new IntersectionObserver(handlerViewButtonToTop, options)
	observer.observe(handlerElement)

	buttonToTop.addEventListener('click', () => window.scroll({ top: 0, left: 0, behavior: 'auto' }))
})()
