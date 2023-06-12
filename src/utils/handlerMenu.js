import { $, $$ } from './selectors'

const header = $('.headerPage')
const menuBtn = $('.menuBtn')
const itemsMenu = $$('.navMenu__item')
const backdropMenu = $('.backdropMenu')

const isDesktopView = window.innerWidth >= 776

/** Cambie los atributos de aria y modifique el botón de menú y muestre u oculte la lista de menú */
const changeMenuView = () => {
	const visibleMenu = menuBtn.classList.contains('collapse')
	menuBtn.setAttribute('aria-expanded', visibleMenu ? 'false' : 'true')
	menuBtn.classList.toggle('collapse')

	header.setAttribute('aria-hidden', visibleMenu ? 'true' : 'false')
	header.classList.toggle('menu-view')
}

/** Al elegir una de las secciones de la página, ejecuta la función changeMenuView */
itemsMenu.forEach((itemMenu) =>
	itemMenu.addEventListener('click', () => {
		if (isDesktopView) return

		changeMenuView()
	})
)

menuBtn.addEventListener('click', changeMenuView)

/** Llama a la función changeMenuView() al hacer clic fuera del menú de navegación o del botón de menú */
backdropMenu.addEventListener('click', changeMenuView)

/** Establece los atributos de aria según las dimensiones iniciales */
document.addEventListener('DOMContentLoaded', () => {
	if (isDesktopView) return

	menuBtn.setAttribute('aria-hidden', 'falsez')
	header.setAttribute('aria-hidden', 'true')
})

/** Modifies the aria attributes according to the new dimensions */
window.addEventListener('resize', () => {
	if (!isDesktopView) {
		menuBtn.setAttribute('aria-hidden', 'false')
		header.setAttribute('aria-hidden', 'true')
		return
	}

	header.removeAttribute('aria-hidden')
	header.classList.remove('menu-view')
	menuBtn.classList.remove('collapse')
})
