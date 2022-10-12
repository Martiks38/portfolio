import { $, $$ } from './utils/index.js'

const handleActive = (entry) => {
  let tab = entry.target.dataset.targetSection

  if (entry.isIntersecting) {
    $(`[data-section="${tab}"]`).classList.add('isActive')
  } else {
    $(`[data-section="${tab}"]`).classList.remove('isActive')
  }
}

const observerPage = () => {
  const options = {
    root: null,
    rootMargin: '-50%',
    threshold: 0,
  }

  let targets = $$('[data-target-section]')

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => handleActive(entry))
  }, options)

  targets.forEach((target) => observer.observe(target))
}

document.addEventListener('DOMContentLoaded', observerPage)
