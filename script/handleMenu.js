import { $ } from './utils/index.js'

const handleMenu = () => {
  const $button = $('.menu')
  const $menu = $('.headerPage')

  $menu.classList.toggle('view')
  $button.classList.toggle('collapse')
}

/* 
    Solution to:
    Using a[href="#..."] puts the element at the top of the screen being hidden by the header.
*/
const toSection = (target) => {
  let titleSection = target.dataset.section

  if (titleSection) {
    const $titleSection = document.getElementById(titleSection)
    let topElement = $titleSection.offsetTop

    const $sectionTheme = $('.section__theme')

    let marginBottom = window
      .getComputedStyle($sectionTheme)
      .marginBottom.slice(0, -2)

    window.scrollTo(0, topElement - Number(marginBottom))
  }
}

document.addEventListener('click', (event) => {
  let { target } = event

  let eventsOutsideMenu = !target.closest('.barData') && $('.menu.collapse')

  toSection(target)

  if (window.innerWidth > 680.99) return

  let toggleMenu =
    target.closest('.menu') ||
    target.closest('.navbar__section') ||
    eventsOutsideMenu

  if (toggleMenu) handleMenu()
})
