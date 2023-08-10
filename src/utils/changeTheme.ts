import i18n from '@assets/translations/i18n.json'
import { COLOR_ASPECT, MAX_AGE_COOKIE, NAME_COOKIE_COLOR } from '@/consts'

const { dark, light } = COLOR_ASPECT
const btnsPrefersColor = document.querySelectorAll<HTMLButtonElement>('.btnColorScheme')

/**
 *	Busca si existe un estado del modo de pantalla por previo ingreso a la página. En el caso que sea el primer ingreso, establece una cookie con el tema de página en modo oscuro y a los botones data-color con el mismo modo.
 */
const cookieStorage = window.document.cookie
const hasNotPrefersColor = !cookieStorage.includes(NAME_COOKIE_COLOR)

if (hasNotPrefersColor) {
	btnsPrefersColor.forEach((btnPrefersColor) => btnPrefersColor.setAttribute('data-color', dark))

	window.document.cookie = `${NAME_COOKIE_COLOR}=${dark};max-age=${MAX_AGE_COOKIE}`
}

/**
 * Dado que hacer toggle de una clase que rote el ícono del sol o la luna hará efecto de que vuelva a la posición.
 * Para dar efecto siempre de giro en un mismo sentido el ángulo de rotación debe ir aumentando.
 */
const addTurns = () => {
	let turns = 0

	return () => ++turns
}

const nextTurn = addTurns()

const changeColorScheme = (currentColor: string, turns: string) => {
	const currentColorIsDark = currentColor === dark

	const newCurrentColor = currentColorIsDark ? light : dark
	const newChangeColor = currentColorIsDark ? dark : light

	const prevTurn = Number(turns)
	const bodyClassList = document.body.classList

	currentColorIsDark ? bodyClassList.add('light') : bodyClassList.remove('light')

	const currentTurn = nextTurn()
	const totalTurn = currentTurn + prevTurn

	btnsPrefersColor.forEach((btnPrefersColor) => {
		btnPrefersColor.style.transform = `rotate(${totalTurn * 0.5}turn)`
		btnPrefersColor.setAttribute('data-color', newCurrentColor)
		btnPrefersColor.setAttribute(
			'aria-label',
			`${i18n.es.BUTTON_CHANGE_PAGE_SCHEME} ${newChangeColor}`
		)
	})

	document.cookie = `${NAME_COOKIE_COLOR}=${newCurrentColor};max-age=${MAX_AGE_COOKIE}`
}

// Añade la acción de cambiar el aspecto de la página a los respectivos botones
btnsPrefersColor.forEach((btnPrefersColor) =>
	btnPrefersColor.addEventListener(
		'click',
		(ev) => {
			const btn = ev.currentTarget

			if (btn instanceof HTMLButtonElement) {
				const currentColor = btn.dataset.color
				const turns = btn.dataset.turns

				if (currentColor && turns) changeColorScheme(currentColor, turns)
			}
		},
		false
	)
)
