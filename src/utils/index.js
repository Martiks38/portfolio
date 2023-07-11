import { startDecryptingText } from '@utils/encrypted'
import { COLOR_ASPECT, NAME_COOKIE_COLOR } from '@/consts'

const { dark, textColors } = COLOR_ASPECT

const cookies = window.document.cookie
let valuePrefersColor = dark

if (cookies.includes(NAME_COOKIE_COLOR)) {
	valuePrefersColor = cookies
		.split(';')
		.find((cookie) => cookie.includes(NAME_COOKIE_COLOR))
		.split('=')[1]
}

const color = valuePrefersColor === dark ? textColors.dark : textColors.light

startDecryptingText(color)
