import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: `dist/TimeHash.js`,
      format: 'cjs'
    },
    {
      file: `dist/TimeHash.es.js`,
      format: 'esm'
    },
    {
      name: 'TimeHash',
      file: `dist/TimeHash.umd.js`,
      format: 'umd'
    }
  ],
  plugins: [
     resolve(),
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/env',
            {
              modules: 'false',
              targets: {
                browsers: '> 1%, IE 11, not op_mini all, not dead',
                node: 8
              },
              useBuiltIns: 'usage'
            }
          ]
        ]
      }),
      commonjs(),
      terser()
  ]
};
