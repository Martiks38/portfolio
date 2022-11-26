import { $, $$ } from './selectors.js'

const header = $('.header')
const menu = $('.menu')
const itemsMenu = $$('.navMenu__item')

/** Change the aria attributes and modify the menu button and show or hide the menu list */
const changeMenuView = () => {
  let visibleMenu = menu.classList.contains('collapse')

  if (visibleMenu) {
    menu.setAttribute('aria-expanded', 'false')
    header.setAttribute('aria-hidden', 'true')
  } else {
    menu.setAttribute('aria-expanded', 'true')
    header.setAttribute('aria-hidden', 'false')
  }

  header.classList.toggle('menu-view')
  menu.classList.toggle('collapse')
}

/** When choosing one of the sections of the page, it executes the changeMenuView function */
itemsMenu.forEach((itemMenu) =>
  itemMenu.addEventListener('click', changeMenuView)
)

menu.addEventListener('click', changeMenuView)

/** Calls the changeMenuView() function on click outside of the navigation menu or menu button */
document.addEventListener('click', (e) => {
  const target = e.target
  const isHeaderOrMenu = target.closest('.header') || target.closest('.menu')
  const isCollapse = menu.classList.contains('collapse')

  if (!isHeaderOrMenu && isCollapse) changeMenuView()
})

/** Sets the aria attributes according to the initial dimensions */
document.addEventListener('DOMContentLoaded', () => {
  const width = window.innerWidth

  if (width < 776) {
    menu.setAttribute('aria-hidden', 'false')
    header.setAttribute('aria-hidden', 'true')
  }
})

/** Modifies the aria attributes according to the new dimensions */
window.addEventListener('resize', () => {
  const width = window.innerWidth

  if (width < 776) {
    menu.setAttribute('aria-hidden', 'false')
    header.setAttribute('aria-hidden', 'true')
    return
  }

  header.removeAttribute('aria-hidden')
  header.classList.remove('menu-view')
  menu.classList.remove('collapse')
})
