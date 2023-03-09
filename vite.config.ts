import path from 'path'
import fs from 'fs-extra'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Freemarker from 'freemarker.js'

const templateRoot = path.join(__dirname, './template/')

const fm = new Freemarker({
  viewRoot: templateRoot,
  options: {}
});

function renderFtl(ftl, data) {
  return new Promise((resolve, reject) => {
    fm.render(ftl, data, function (err, html, output) {
      if (err) {
        reject(err)
      }
      resolve(html)
    });
  })
}

async function transformFtl(file) {
  const ftlDataFilePath = `${file}.json`
  if (!fs.existsSync(ftlDataFilePath)) {
    throw new Error(`${ftlDataFilePath}.json is not found`)
  }
  const timeName = file.replace(templateRoot, '')
  const ftlData = JSON.parse(fs.readFileSync(`${file}.json`, { encoding: 'utf-8' }))
  const result = await renderFtl(timeName, ftlData)
  return `
    import json from './${timeName}.json'
    const ftl = ${JSON.stringify(result)}
    export default ftl
  `
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
    vue(),
    {
      name: 'vite-plugin-ftl',
      enforce: "pre",
      async transform(content, file) {
        if (!/\.ftl$/.test(file)) {
          return
        }
        return await transformFtl(file)
      },
    },
  ]
})
