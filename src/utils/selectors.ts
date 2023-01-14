const $ = (selector: string) => document.querySelector<HTMLElement>(selector)
const $$ = (selector: string) => document.querySelectorAll<HTMLElement>(selector)

export { $, $$ }
