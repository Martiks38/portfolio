class EffectDecryptingText {
  constructor(selector, stagger = 100, staggerPerLetter = 50) {
    this.element = document.querySelector(selector)
    this.letters = this.element.innerText.split('')
    this.stagger = stagger
    this.staggerPerLetter = staggerPerLetter

    this.animate()
  }

  animate() {
    let fragment = document.createDocumentFragment()
    let encryptedText = (this.element.innerText = this.encryptText())

    let lettersEncryptedText = encryptedText.split('')
    this.element.innerText = ''

    this.letters.forEach((letter, index) => {
      let span = document.createElement('span')

      span.innerText = lettersEncryptedText.at(index)

      fragment.appendChild(span)

      setTimeout(() => {
        this.decryptLetter({ elementLetter: span, letter })
      }, this.stagger)
    })

    this.element.appendChild(fragment)
  }

  decryptLetter(options, count = 0) {
    if (count > 25) {
      let subtitle = document.querySelector('.introduction-subtitle')
      subtitle.style.color = '#75eff8'

      return (options.elementLetter.innerText = options.letter)
    }

    count++

    setTimeout(() => {
      options.elementLetter.innerText = this.generateRandomLetter()

      this.decryptLetter(options, count)
    }, this.staggerPerLetter)
  }

  encryptText() {
    let encryptedText = ''

    this.letters.forEach(() => {
      let randomLetter = this.generateRandomLetter()

      encryptedText += randomLetter
    })

    return encryptedText
  }

  generateRandomLetter() {
    return Math.random().toString(36).substring(2, 3)
  }
}

export const startDecryptingText = () => {
  const selectors = ['.introduction-subtitle']

  selectors.forEach((selector) => new EffectDecryptingText(selector))
}
