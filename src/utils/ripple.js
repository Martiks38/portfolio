/**
 * Detects the mouse input position to the element.
 * Generating an element and expanding it to cover said element.
 * @param {MouseEvent} ev
 */
export function ripple(ev) {
  const target = ev.target

  const elements = target.querySelectorAll('.button-link > *')

  if (elements.length > 2) return

  const { x, y } = ev

  const { width, left, top } = target.getBoundingClientRect()

  const ripple = document.createElement('span')

  const styles = `
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
    ripple.style.opacity = '1'
  }, 50)

  target.style.color = '#000'

  target.insertAdjacentElement('afterbegin', ripple)
}

/**
 * Detect the exit position of the mouse.
 * Moving the effect element to that position reduces its size and removes it.
 * @param {MouseEvent} ev
 */
export function removeRipple(ev) {
  const target = ev.target
  const ripple = target.firstChild

  const { x, y } = ev
  const { width, left, top } = target.getBoundingClientRect()

  target.removeAttribute('style')

  ripple.style.transform = 'scale(0)'
  ripple.style.top = `${y - top - 1.25 * width}px`
  ripple.style.left = `${x - left - 1.25 * width}px`

  setTimeout(() => {
    ripple.remove()
  }, 350)
}
