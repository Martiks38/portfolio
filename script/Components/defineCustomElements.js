import { ProjectCard } from './ProjectCard.js'
import { TechItem } from './TechItem.js'

const customElmentsList = {
  'project-card': ProjectCard,
  'tech-item': TechItem,
}

export const defineCustomElements = () => {
  Object.entries(customElmentsList).forEach((customElem) => {
    const [element, elemClass] = customElem

    let isDefined = window.customElements.get(element)

    if (isDefined) {
      console.log(`El custom element: ${element} ya se encuentra definido`)
      return
    }

    window.customElements.define(element, elemClass)
  })
}
