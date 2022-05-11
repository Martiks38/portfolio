import { $, $$ } from './utils/index.js'

export const observerPage = () => {
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  }

  const handleActive = (entry) => {
    let tab = entry.target.dataset.targetValue

    if (entry.isIntersecting) {
      $(`[href="#${tab}"]`).classList.add('isActive')
    } else {
      $(`[href="#${tab}"]`).classList.remove('isActive')
    }
  }

  let targets = $$('[data-target]')

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => handleActive(entry))
  }, options)

  targets.forEach((target) => observer.observe(target))
}
