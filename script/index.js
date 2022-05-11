import { observerPage } from './observer.js'
import { copyData } from './copy.js'
import { handleMenu } from './handleMenu.js'
import { $ } from './utils/index.js'

document.addEventListener('DOMContentLoaded', observerPage)
document.addEventListener('click', (event) => {
  let target = event.target

  if (target.closest('[data-copy-value]')) {
    copyData(target)
    return
  }

  if (
    target.closest('.menu') ||
    ($('.menu.collapse') &&
      Array.from(target.classList).includes('navbar__section'))
  ) {
    handleMenu()
    return
  }
})
