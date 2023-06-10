/**
 * La clase genera un efecto de desencriptación.
 * Genera letras alfanuméricas aleatoriamente hasta alcanzar la cantidad de iteraciones indicada.
 */
class EffectDecryptingText {
	/**
	 * @param { Object } EffectDecryptingTextProps
	 * @param { string } EffectDecryptingTextProps.textColor - Color del texto desencriptado
	 * @param { string } EffectDecryptingTextProps.selector - Selector CSS
	 * @param { number } [EffectDecryptingTextProps.stagger=100] - Retraso para que se empiece a desencriptar la letra
	 * @param { number } [EffectDecryptingTextProps.staggerPerLetter=50] - Tiempo en que el caracter cambia. milisegundos.
	 * @param { string } EffectDecryptingTextProps.correctWord
	 * */
	constructor({ textColor, selector, stagger = 100, staggerPerLetter = 50, correctWord }) {
		this.correctWord = correctWord
		this.textColor = textColor
		this.element = document.querySelector(selector)
		this.letters = correctWord.split('')
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

			// Al multiplicar por el índice empieza a desencriptar letra por letra de izquierda a derecha
			// En caso contrario, el efecto es desencriptar toda la palabra al mismo tiempo
			setTimeout(() => {
				this.decryptLetter({ elementLetter: span, letter })
			}, this.stagger)
		})

		this.element.appendChild(fragment)
	}

	/**
	 * Asigna caracteres aleatorios hasta alcanzar el número deseado de iteraciones
	 * Una vez que se alcanza el número de iteraciones, cambia el estilo de color y asigna la letra correcta
	 *
	 * @param {object} options
	 * @property {string} options.letter - Letra de la palabra correcta
	 * @property {HTMLElement} options.elementLetter - Contenedor de una letra
	 * @param {number} count - Número de iteraciones
	 * @returns
	 */
	decryptLetter(options, count = 0) {
		if (count > 10) {
			const subtitle = document.querySelector('.introduction__subtitle')

			subtitle.style.color = this.textColor
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
	 * Genera una cadena de caracteres aleatorios cuya longitud es igual a la cadena verdadera
	 * @returns { string } Devuelve un cadena de carácteres aleatoria a partir de la cadena letters
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
	 * @returns { string } Devuelve un caracter aleatorio
	 */
	generateRandomLetter() {
		return Math.random().toString(36).substring(2, 3)
	}
}

/**
 *  Inicia el desencriptado del texto
 * @param { string } color - Color del texto
 * @param { number } [stagger=1000] - Delay en milisegundos para que inicie el desecriptado
 */
export const startDecryptingText = (color, stagger = 1000) => {
	const selector = '.introduction__subtitle'
	const correctWord = 'Desarrollador Front End'

	setTimeout(() => {
		new EffectDecryptingText({ selector, textColor: color, correctWord })
	}, stagger)
}
