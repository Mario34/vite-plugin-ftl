declare module '*.ftl' {
  const ftl: string
  const html: string
  const data: string
  export { html, data, ftl }
  export default { html, data, ftl }
}
