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

  render() {
    const template = document.getElementById('projectCard').content
    let cloneTemplate = template.cloneNode(true)

    const buttons = cloneTemplate.querySelectorAll('.button-link')

    const urlSite = this.getAttribute('url-site')
    const urlGitHub = this.getAttribute('url-github')

    let urls = [urlSite, urlGitHub]

    urls.forEach((url, index) => {
      if (!url) buttons[index].remove()
      else buttons[index].setAttribute('href', url)
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

    this.intervalSlider = setInterval(this.nextImage, 2500)
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
