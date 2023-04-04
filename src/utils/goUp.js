import { $ } from './selectors'

// eslint-disable-next-line
;(() => {
	const handlerElement = $('#viewBtnToTop')
	const buttonToTop = $('.buttonToTop')
	const classListBtnToTop = buttonToTop.classList

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
