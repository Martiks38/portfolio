import { startDecryptingText } from './crypt.js'
import { defineCustomElements } from './Components/defineCustomElements.js'

document.addEventListener('DOMContentLoaded', () => {
  startDecryptingText()
  defineCustomElements()
})
