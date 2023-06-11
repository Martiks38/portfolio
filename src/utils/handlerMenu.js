import { $, $$ } from './selectors'

const header = $('.headerPage')
const menuBtns = $$('.menuBtn')
const itemsMenu = $$('.navMenu__item')

/** Cambie los atributos de aria y modifique el botón de menú y muestre u oculte la lista de menú */
const changeMenuView = () => {
	const visibleMenu = menuBtns[0].classList.contains('collapse')

	menuBtns.forEach((menuBtn) => {
		menuBtn.setAttribute('aria-expanded', visibleMenu ? 'false' : 'true')
		menuBtn.classList.toggle('collapse')
	})

	header.setAttribute('aria-hidden', visibleMenu ? 'true' : 'false')
	header.classList.toggle('menu-view')
}

/** Al elegir una de las secciones de la página, ejecuta la función changeMenuView */
itemsMenu.forEach((itemMenu) => itemMenu.addEventListener('click', changeMenuView))

menuBtns.forEach((menuBtn) => menuBtn.addEventListener('click', changeMenuView))

/** Llama a la función changeMenuView() al hacer clic fuera del menú de navegación o del botón de menú */
document.addEventListener('click', (e) => {
	const target = e.target
	const isHeaderOrMenu = target.closest('.headerPage') || target.closest('.menuBtn')
	const isCollapse = menuBtns[0].classList.contains('collapse')

	if (!isHeaderOrMenu && isCollapse) changeMenuView()
})

/** Establece los atributos de aria según las dimensiones iniciales */
document.addEventListener('DOMContentLoaded', () => {
	const width = window.innerWidth

	if (width < 776) {
		menuBtns.forEach((menuBtn) => menuBtn.setAttribute('aria-hidden', 'false'))
		header.setAttribute('aria-hidden', 'true')
	}
})

/** Modifies the aria attributes according to the new dimensions */
window.addEventListener('resize', () => {
	const width = window.innerWidth

	if (width < 776) {
		menuBtns.forEach((menuBtn) => menuBtn.setAttribute('aria-hidden', 'false'))
		header.setAttribute('aria-hidden', 'true')
		return
	}

	header.removeAttribute('aria-hidden')
	header.classList.remove('menu-view')
	menuBtns.forEach((menuBtn) => menuBtn.classList.remove('collapse'))
})
