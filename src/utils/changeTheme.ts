import {$$} from "./selectors"
import i18n from '@assets/translations/i18n.json'
import { COLOR_ASPECT, COLOR_SCHEME } from '@/consts'

const { dark, light } = COLOR_ASPECT
const btnsPrefersColor = $$('.btnColorScheme')

// Ángulo de giro de botón de tema
const addTurns = () => {
	let turns = 0

	return () => {
		turns ^= 1
		return turns
	}
}

const nextTurn = addTurns()

const changeColorScheme = (currentColor: string, turns: number) => {
	const prevTurn = turns
	const currentTurn = nextTurn()
	const totalTurn = currentTurn + prevTurn
	const schemes = currentColor === dark ? [light, dark] : [dark, light]
	
	document.body.classList.toggle("light", currentColor === dark)

	btnsPrefersColor.forEach((btnPrefersColor) => {
		btnPrefersColor.style.transform = `rotate(${totalTurn * 0.5}turn)`
		btnPrefersColor.setAttribute('data-color', schemes[0])
		btnPrefersColor.setAttribute(
			'aria-label',
			`${i18n.es.BUTTON_CHANGE_PAGE_SCHEME} ${schemes[1]}`
		)
	})

	window.localStorage.setItem(COLOR_SCHEME, schemes[1])
}

// Añade la acción de cambiar el aspecto de la página a los respectivos botones
btnsPrefersColor.forEach((btn) =>
	btn.addEventListener(
		'click',
		(ev) => {
			const btn = ev.currentTarget

			if (btn instanceof HTMLButtonElement) {
				const currentColor = btn.dataset.color
				const turns = btn.dataset.turns ?? "0"

				if (currentColor && turns) changeColorScheme(currentColor, Number(turns))
			}
		},
		false
	)
)
