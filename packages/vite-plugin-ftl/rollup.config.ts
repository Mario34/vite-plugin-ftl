import { defineConfig } from 'rollup'
import tsPlugin from '@rollup/plugin-typescript'

export default defineConfig([
  {
    input: 'index.ts',
    output: [
      {
        format: 'esm',
        file: 'lib/index.js',
      },
      {
        format: 'cjs',
        file: 'lib/index.cjs',
      },
    ],
    plugins: [
      tsPlugin({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
])
