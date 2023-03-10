# vite-plugin-ftl

vite FreeMarker support

[简体中文](./README-cn.md)

How to use

- Make sure your development environment has Java installed and that JAVA_HOME is configured correctly
- The installation depends on `pnpm i vite-plugin-ftl -D`
- Configure in `vite.config.ts`

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

## The converted js module

The converted js module like this.

```ts
declare module '*.ftl' {
  const ftl: string
  const html: string
  const data: string
  export { html, data, ftl }
  export default ftl
}
```

All templates are exported as String, and converted characters can be processed in the project as needed.

## AutoLoadData

If you need to separate the template from the data, you can enable the `autoLoadData` option and it will load the data according to the following rules.

```text
path/to/template.ftl # template file
path/to/template.ftl.json # template data file
```

[demo](./packages/demo)

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
