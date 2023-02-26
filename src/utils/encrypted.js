/**
 * La clase genera un efecto de desencriptación.
 *
 * Genera letras alfanuméricas aleatoriamente hasta alcanzar la cantidad de iteraciones indicada.
 */
class EffectDecryptingText {
	word = 'Desarrollador Front End'

	constructor(selector, stagger = 100, staggerPerLetter = 50) {
		this.element = document.querySelector(selector)
		this.letters = this.word.split('')
		this.stagger = stagger
		this.staggerPerLetter = staggerPerLetter

		this.animate()
	}

	/**
	 * Start the decryption animation.
	 * Creates the container for each letter and inserts them.
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
	 * Assign random characters until the desired number of iterations is reached.
	 * Once the number of iterations is reached, it changes the color style and assigns the correct letter.
	 *
	 * @param {object} options
	 * @property {string} options.letter - Letter of the correct word.
	 * @property {HTMLElement} options.elementLetter - One letter container.
	 * @param {number} count - Number of iterations.
	 * @returns
	 */
	decryptLetter(options, count = 0) {
		if (count > 10) {
			const subtitle = document.querySelector('.introduction-subtitle')

			subtitle.style.color = '#75eff8'
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
	 * Generates a string of random characters whose length is equal to the true string.
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
	 * Returns the third character of the number returned by Math.random()
	 */
	generateRandomLetter() {
		return Math.random().toString(36).substring(2, 3)
	}
}

export const startDecryptingText = (stagger = 1000) => {
	const selectors = ['.introduction-subtitle']

	setTimeout(() => {
		selectors.forEach((selector) => new EffectDecryptingText(selector))
	}, stagger)
}
