import { COLOR_ASPECT, MAX_AGE_COOKIE, NAME_COOKIE_COLOR } from '@/consts'

const { dark, light, textColors } = COLOR_ASPECT
const btnsPrefersColor = document.querySelectorAll<HTMLButtonElement>('.btnColorScheme')
const btnPrefersColor = btnsPrefersColor[0] ?? null

/**
 * Dado que hacer toggle de una clase que rote el ícono del sol o la luna hará efecto de que vuelva a la posición.
 * Para dar efecto siempre de giro en un mismo sentido el ángulo de rotación debe ir aumentando.
 */
const addTurns = () => {
	let turns = 0

	return () => ++turns
}

const nextTurn = addTurns()

const changeColorScheme = () => {
	if (btnPrefersColor === null) return

	const currentColorIsDark = btnPrefersColor?.dataset.color === dark

	const currentColor = currentColorIsDark ? light : dark
	const changeColor = currentColorIsDark ? dark : light

	const prevTurn = Number(btnPrefersColor.dataset.turns)

	const subtitle = document.querySelector<HTMLHeadingElement>('.introduction__subtitle')

	if (subtitle) subtitle.style.color = currentColorIsDark ? textColors.light : textColors.dark

	if (currentColorIsDark) {
		document.body.classList.add('light')
	} else {
		document.body.classList.remove('light')
	}

	const currentTurn = nextTurn()
	const totalTurn = currentTurn + prevTurn

	btnsPrefersColor.forEach((btnPrefersColor) => {
		btnPrefersColor.style.transform = `rotate(${totalTurn * 0.5}turn)`
		btnPrefersColor.setAttribute('data-color', currentColor)
		btnPrefersColor.setAttribute('aria-label', `Cambiar aspecto a modo ${changeColor}`)
	})

	document.cookie = `${NAME_COOKIE_COLOR}=${currentColor};max-age=${MAX_AGE_COOKIE}`
}

const cookieStorage = window.document.cookie
const hasNotPrefersColor = !cookieStorage.includes(NAME_COOKIE_COLOR)

if (hasNotPrefersColor) {
	btnsPrefersColor.forEach((btnPrefersColor) => btnPrefersColor?.setAttribute('data-color', dark))

	window.document.cookie = `${NAME_COOKIE_COLOR}=${dark};max-age=${MAX_AGE_COOKIE}`
}

btnsPrefersColor.forEach((btnPrefersColor) =>
	btnPrefersColor.addEventListener('click', changeColorScheme, false)
)
