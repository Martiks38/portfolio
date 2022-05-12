import { $ } from './utils/index.js'

export const handleMenu = () => {
  const $button = $('.menu')
  const $menu = $('.barData')

  $menu.classList.toggle('view')
  $button.classList.toggle('collapse')
}
