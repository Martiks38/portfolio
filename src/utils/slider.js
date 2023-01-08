class Slider {
  constructor(elem) {
    this.currentIndex = 0
    this.elem = elem
    this.imgs = elem.querySelectorAll('.card-img')

    this.activeImg = null
    this.intervalSlider = null
    this.timeoutStartOut = null

    this.bindEvents()
  }

  bindEvents() {
    this.elem.addEventListener('mouseenter', this.start)
    this.elem.addEventListener('mouseleave', this.reset)
  }

  start = () => {
    if (window.innerWidth < 991) return

    this.intervalSlider = setInterval(this.nextImage, 1800)
  }

  moveActive = () => {
    this.activeImg.classList.remove('active')
    this.activeImg.classList.remove('start-out')
  }

  nextImage = () => {
    this.activeImg = this.elem.querySelector('.card-img.active')

    this.activeImg.classList.add('start-out')

    this.timeoutStartOut = setTimeout(this.moveActive, 500)

    this.currentIndex++

    if (this.currentIndex >= this.imgs.length) this.currentIndex = 0

    let img = this.imgs[this.currentIndex]

    img.classList.add('active')
  }

  reset = () => {
    if (this.intervalSlider) window.clearInterval(this.intervalSlider)
    if (this.timeoutStartOut) window.clearTimeout(this.timeoutStartOut)

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
}

export function createSliders(selector) {
  document.querySelectorAll(selector).forEach((elem) => {
    new Slider(elem)
  })
}
