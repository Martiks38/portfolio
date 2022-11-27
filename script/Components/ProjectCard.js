/**
 * @typedef {object} MouseEvent
 */

/**
 * Class representing a web component
 * Represents the card of a project
 *
 * @extends HTMLElement
 */
export class ProjectCard extends HTMLElement {
  constructor() {
    super()

    this.currentIndex = 0
    this.imgs = this.querySelectorAll('.card-img')

    this.activeImg = null
    this.intervalSlider = null
    this.timeoutStartOut = null

    this.attachShadow({ mode: 'open' })
    this.render()
  }

  bindEvents() {
    this.addEventListener('mouseenter', this.start)
    this.addEventListener('mouseleave', this.reset)
  }

  /**
   * Detects the mouse input position to the element.
   * Generating an element and expanding it to cover said element.
   * @param {MouseEvent} ev
   */
  ripple(ev) {
    const target = ev.target

    let elements = target.querySelectorAll('.button-link > *')

    if (elements.length > 2) return

    const { x, y } = ev

    let { width, left, top } = target.getBoundingClientRect()

    let ripple = document.createElement('span')

    let styles = `
      position: absolute;
      display: block; 
      width: ${2.5 * width}px;
      height: ${2.5 * width}px;
      top: ${y - top - 1.25 * width}px;
      left: ${x - left - 1.25 * width}px;
      background-color: var(--color-primary);
      border-radius: 50%;
      z-index: 1;
      transform: scale(0);
      transition-property: transform opacity;
      transition: 0.3s cubic-bezier(0.3, 0, 0.2, 1);
    `

    ripple.style.cssText = styles

    setTimeout(() => {
      ripple.style.transform = 'scale(1)'
      ripple.style.opacity = 1
    }, 50)

    target.style.color = '#000'

    target.insertAdjacentElement('afterbegin', ripple)
  }

  /**
   * Detect the exit position of the mouse.
   * Moving the effect element to that position reduces its size and removes it.
   * @param {MouseEvent} ev
   */
  removeRipple(ev) {
    const target = ev.target
    let ripple = target.firstChild

    let { x, y } = ev
    let { width, left, top } = target.getBoundingClientRect()

    target.removeAttribute('style')

    ripple.style.transform = 'scale(0)'
    ripple.style.top = `${y - top - 1.25 * width}px`
    ripple.style.left = `${x - left - 1.25 * width}px`

    setTimeout(() => {
      ripple.remove()
    }, 350)
  }

  render() {
    const template = document.getElementById('projectCard').content
    let cloneTemplate = template.cloneNode(true)

    const buttons = cloneTemplate.querySelectorAll('.button-link')

    const urlSite = this.getAttribute('url-site')
    const urlGitHub = this.getAttribute('url-github')

    let urls = [urlSite, urlGitHub]

    urls.forEach((url, index) => {
      if (!url) {
        buttons[index].remove()
      } else {
        buttons[index].setAttribute('href', url)
        buttons[index].addEventListener('mouseenter', this.ripple)
        buttons[index].addEventListener('mouseleave', this.removeRipple)
      }
    })

    this.shadowRoot.appendChild(cloneTemplate)
  }

  /**
   * Starts the slider scrolling.
   * For smaller widths the images are presented in a slider with scroll snap.
   * @returns {void}
   */
  start = () => {
    if (window.innerWidth < 991) return

    this.intervalSlider = setInterval(this.nextImage, 1800)
  }

  /** Hides the image by returning to its starting position. */
  moveActive = () => {
    this.activeImg.classList.remove('active')
    this.activeImg.classList.remove('start-out')
  }

  /** Scroll to the next image. */
  nextImage = () => {
    this.activeImg = this.querySelector('.card-img.active')

    this.activeImg.classList.add('start-out')

    this.timeoutStartOut = setTimeout(this.moveActive, 500)

    this.currentIndex++

    if (this.currentIndex >= this.imgs.length) this.currentIndex = 0

    let img = this.imgs[this.currentIndex]

    img.classList.add('active')
  }

  /**
   * Stops scrolling images
   * Resets the presentation image to the first one and resets the currentIndex value.
   *
   * @returns {void}
   */
  reset = () => {
    if (this.intervalSlider) window.clearInterval(this.intervalSlider)
    if (this.timeoutStartOut) window.clearTimeout(this.timeoutStartOut)

    // There are no values to reset as it is the first image.
    if (this.currentIndex === 0) return

    let imgActive = this.imgs[this.currentIndex]

    imgActive.classList.add('start-out')

    this.currentIndex = 0
    this.imgs[0].classList.add('active')

    setTimeout(() => {
      imgActive.classList.remove('start-out')

      this.imgs.forEach((img, ind) => {
        let imgClassList = img.classList

        let isActive = imgClassList.contains('active')

        if (isActive && ind !== 0) imgClassList.remove('active')
      })
    }, 500)
  }

  connectedCallback() {
    this.bindEvents()
  }
}
