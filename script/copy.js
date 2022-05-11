import { $ } from './utils/index.js'

const saveMessage = (msg, hasError = false) => {
  let $msg = document.createElement('p')

  $msg.innerHTML = msg.value

  if (!hasError) {
    let $main = $('main')

    $msg.classList.add('modalCopyMsg')
    $main.appendChild($msg)
    setTimeout(() => $main.removeChild($msg), 1200)

    return
  }

  let $paragraph = $('.msgContact')
  $msg.classList.add('msgContact')

  let isThereEmail = !$('[data-email]')
  let isThereDiscord = !$('[data-discord]')

  if (isThereEmail && msg.is === 'email') {
    $msg.setAttribute('data-email', '')
    $paragraph.insertAdjacentElement('afterend', $msg)
  }

  if (isThereDiscord && msg.is === 'discord') {
    $msg.setAttribute('data-discord', '')
    $paragraph.insertAdjacentElement('afterend', $msg)
  }
}

const saveData = (element) => {
  let dataValue = element.dataset['copyValue']
  let isMail = dataValue.includes('@')

  navigator.clipboard
    .writeText(dataValue)
    .then(() => {
      let value = isMail ? 'Email guardado' : 'User ID guardado'
      let msg = { value }

      saveMessage(msg)
    })
    .catch(() => {
      let value = isMail ? `${dataValue}` : `User ID: ${dataValue}`
      let is = isMail ? 'email' : 'discord'

      let msg = { value, is }

      saveMessage(msg, isMail, true)
    })
}

export const copyData = (target) => {
  const $button = target.closest('button')

  let socialButton =
    $button && Array.from($button.classList).includes('socialCard__button')

  if (socialButton) saveData($button)
}
