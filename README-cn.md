# vite-plugin-ftl

vite FreeMarker 支持

## 如何使用

- 确保你的开发环境安装了[Java](https://dev.java/download/)，并且正确配置了JAVA_HOME
- 安装依赖 `pnpm i vite-plugin-ftl -D`
- 在 `vite.config.ts` 中配置插件

```ts
import { defineConfig } from 'vite'
import ftl from 'vite-plugin-ftl'

export default defineConfig({
  // ...
  plugins: [
    ftl(),
  ],
})
```

## 转换后的js模块

转换后的格式

```ts
declare module '*.ftl' {
  const ftl: string
  const html: string
  const data: string
  export { html, data, ftl }
  export default { html, data, ftl }
}
```

所有模版会以字符创的形式导出，可以根据需要再项目里对转换后的字符进行处理

## AutoLoadData

如果你需要将模版与数据分开，可以开启 `autoLoadData` 选项，他会按照下面的规则加载数据

```text
path/to/template.ftl # 模版文件
path/to/template.ftl.json # 自动加载模版数据
```

一个简单的[例子](./packages/demo)

## Options

```ts
/**
 * https://github.com/ijse/freemarker.js#configurations
 */
export interface FtlOptions {
  /**
   * The encoding of textual sources (templates). Use the special value "host"(-E host)
   * if the default encoding of the host machine should be used. The default is "ISO-8859-1".
   */
  sourceEncoding: string
  /**
   * Sets the tag syntax for templates that doesn't start with the ftl directive.
   * Possible values are: angleBracket, squareBracket, autoDetect.
   */
  tagSyntax: 'angleBracket' | 'squareBracket' | 'autoDetect'
  /**
   * Sets the time zone in which date/time/date-time values are shown.
   * The default is the time zone of the host machine. Example: GMT+02
   */
  timeFormat: string
  /**
   * The number format used to show numerical values. The default is 0.############
   */
  numberFormat: string
  /**
   * The format used to show date (year+month+day) values. The default is locale dependent.
   */
  dateFormat: string
  /**
   * The boolean format used to show boolean values, like "Yes,No". Not "true,false"; use {myBool}.
   */
  booleanFormat: string
  /**
   * The format used to show date-time values. The default is locale dependent.
   */
  datetimeFormat: string
  /**
   * The locale (as ar_SA). Use the special value "host" (-A host) if the default
   * locale of the host machine should be used. The default value of the option is en_US.
   */
  locale: string
}

interface Options {
  ftlOptions?: FtlOptions
  autoLoadData?: boolean
}
```
