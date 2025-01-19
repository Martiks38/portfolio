import { $, $$ } from './selectors'
import i18n from '@assets/translations/i18n.json'

const header = $('.headerPage')
const menuBtn = $('.menuBtn')
const itemsMenu = $$('.navMenu__item')
const backdropMenu = $('.backdropMenu')

const { open, close } = i18n.es.LABEL_CHANGE_PAGE_THEME

/** Cambie los atributos de aria y modifique el botón de menú y muestre u oculte la lista de menú */
const changeMenuView = () => {
	if (!(menuBtn instanceof HTMLButtonElement)) return

	if (!(header instanceof HTMLElement)) return

	const visibleMenu = header.classList.contains('menu-view')
	console.log(visibleMenu)
	if (!visibleMenu) {
		menuBtn.setAttribute('aria-expanded', 'false')
		menuBtn.setAttribute('aria-label', close)
		menuBtn.setAttribute('aria-expanded', 'true')

		// Establece el foco en el primer elemento del menú de navegación
		setTimeout(() => {
			const firstItem = $('.navMenu__item')

			if (firstItem instanceof HTMLAnchorElement) firstItem.focus()
		}, 0)
	} else {
		menuBtn.setAttribute('aria-label', open)
		menuBtn.setAttribute('aria-expanded', 'false')
	}

	menuBtn.classList.toggle('collapse')
	header.classList.toggle('menu-view')
}

/** Al elegir una de las secciones de la página, ejecuta la función changeMenuView */
itemsMenu.forEach((itemMenu) =>
	itemMenu.addEventListener('click', () => {
		const isDesktopView = window.innerWidth >= 776

		if (isDesktopView) return

		changeMenuView()
	})
)

if (menuBtn instanceof HTMLButtonElement && header instanceof HTMLElement) {
	menuBtn.addEventListener('click', changeMenuView)

	/** Modifies the aria attributes according to the new dimensions */
	window.addEventListener('resize', () => {
		const isDesktopView = window.innerWidth >= 776

		if (isDesktopView) {
			menuBtn.setAttribute('aria-label', open)
			header.classList.remove('menu-view')
			menuBtn.classList.remove('collapse')
		}
	})
}

/** Llama a la función changeMenuView() al hacer clic fuera del menú de navegación o del botón de menú */
if (backdropMenu instanceof HTMLDivElement) backdropMenu.addEventListener('click', changeMenuView)
