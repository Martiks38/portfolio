/**
 * Class representing a web component
 * Represents technology icon and name.
 *
 * @extends HTMLElement
 */
export class TechItem extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    const template = document.getElementById('tech')
    const templateContent = template.content

    let img = templateContent.querySelector('img')
    let figcaption = templateContent.querySelector('figcaption')

    let nameTech = this.getAttribute('tech')

    img.src = this.getAttribute('src-icon')
    img.alt = nameTech

    figcaption.textContent = nameTech

    this.shadowRoot.appendChild(templateContent.cloneNode(true))
  }
}
