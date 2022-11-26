import { startDecryptingText } from './crypt.js'
import { defineCustomElements } from './customElements.js'

document.addEventListener('DOMContentLoaded', () => {
  startDecryptingText()
  defineCustomElements()
})
