import path from 'path'
import fs from 'fs-extra'
import { defineConfig } from 'vite'
import Freemarker from 'freemarker.js'

const templateRoot = path.join(__dirname, './template/')

const fm = new Freemarker({
  viewRoot: templateRoot,
  options: {}
});

function renderFTL(ftl, data) {
  return new Promise((resolve, reject) => {
    fm.render(ftl, data, function (err, html, output) {
      if (err) {
        reject(err)
      }
      resolve(html)
    });
  })
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@tpl': path.resolve(__dirname, 'template'),
    },
  },
  plugins: [
    {
      name: 'vite-plugin-ftl',
      async transform(content, file) {
        if (!/\.ftl$/.test(file)) {
          return
        }
        const ftlDataFilePath = `${file}.json`
        if (!fs.existsSync(ftlDataFilePath)) {
          throw new Error(`${ftlDataFilePath}.json is not found`)
        }
        const ftlData = JSON.parse(fs.readFileSync(`${file}.json`, { encoding: 'utf-8' }))
        const result = await renderFTL(file.replace(templateRoot, ''), ftlData)
        return `const ftl = ${JSON.stringify(result)};export default ftl`
      },
    },
  ]
})
