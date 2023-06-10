import { COLOR_ASPECT, NAME_COOKIE_COLOR } from '@/consts'

/**
 * La clase genera un efecto de desencriptación.
 *
 * Genera letras alfanuméricas aleatoriamente hasta alcanzar la cantidad de iteraciones indicada.
 */
class EffectDecryptingText {
	word = 'Desarrollador Front End'

	constructor(selector, colorModes, stagger = 100, staggerPerLetter = 50) {
		this.colorModes = colorModes
		this.element = document.querySelector(selector)
		this.letters = this.word.split('')
		this.stagger = stagger
		this.staggerPerLetter = staggerPerLetter

		this.animate()
	}

	/**
	 * Inicia la animación de descifrado.
	 * Crea el contenedor para cada letra y los inserta.
	 */
	animate() {
		const encryptedText = this.element.innerText
		const fragment = document.createDocumentFragment()

		const lettersEncryptedText = encryptedText.split('')
		this.element.innerText = ''

		this.letters.forEach((letter, index) => {
			const span = document.createElement('span')

			span.innerText = lettersEncryptedText.at(index)

			fragment.appendChild(span)

			setTimeout(() => {
				this.decryptLetter({ elementLetter: span, letter })
			}, this.stagger)
		})

		this.element.appendChild(fragment)
	}

	/**
	 * Asigna caracteres aleatorios hasta alcanzar el número deseado de iteraciones.
	 * Una vez que se alcanza el número de iteraciones, cambia el estilo de color y asigna la letra correcta.
	 *
	 * @param {object} options
	 * @property {string} options.letter - Letra de la palabra correcta.
	 * @property {HTMLElement} options.elementLetter - Contenedor de una letra.
	 * @param {number} count - Número de iteraciones
	 * @returns
	 */
	decryptLetter(options, count = 0) {
		if (count > 10) {
			const subtitle = document.querySelector('.introduction__subtitle')

			const cookies = window.document.cookie
			let valuePrefersColor = ''

			if (cookies.includes(NAME_COOKIE_COLOR)) {
				valuePrefersColor = cookies
					.split(';')
					.find((cookie) => cookie.includes(NAME_COOKIE_COLOR))
					.split('=')[1]
			}

			subtitle.style.color = valuePrefersColor === this.colorModes.dark ? '#75eff8' : '#006970'
			options.elementLetter.innerText = options.letter

			return
		}

		count++

		setTimeout(() => {
			options.elementLetter.innerText = this.generateRandomLetter()

			this.decryptLetter(options, count)
		}, this.staggerPerLetter)
	}

	/**
	 * Genera una cadena de caracteres aleatorios cuya longitud es igual a la cadena verdadera.
	 */
	encryptText() {
		let encryptedText = ''

		this.letters.forEach(() => {
			const randomLetter = this.generateRandomLetter()

			encryptedText += randomLetter
		})

		return encryptedText
	}

	/**
	 * Devuelve el tercer carácter del número devuelto por Math.random()
	 */
	generateRandomLetter() {
		return Math.random().toString(36).substring(2, 3)
	}
}

export const startDecryptingText = (stagger = 1000) => {
	const selectors = ['.introduction__subtitle']

	setTimeout(() => {
		selectors.forEach((selector) => new EffectDecryptingText(selector, COLOR_ASPECT))
	}, stagger)
}
