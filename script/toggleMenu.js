import { $, $$ } from './selectors.js'

const header = $('.header')
const menu = $('.menu')
const itemsMenu = $$('.navMenu__item')

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

menu.addEventListener('click', changeMenuView)
itemsMenu.forEach((itemMenu) =>
  itemMenu.addEventListener('click', changeMenuView)
)

document.addEventListener('DOMContentLoaded', () => {
  const width = window.innerWidth

  if (width < 680) {
    menu.setAttribute('aria-hidden', 'false')
    header.setAttribute('aria-hidden', 'true')
  }
})

window.addEventListener('resize', () => {
  const width = window.innerWidth

  if (width < 680) {
    menu.setAttribute('aria-hidden', 'false')
    header.setAttribute('aria-hidden', 'true')
    return
  }

  header.removeAttribute('aria-hidden')
  header.classList.remove('menu-view')
  menu.classList.remove('collapse')
})
