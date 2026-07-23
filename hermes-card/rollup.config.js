import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/hermes-card.ts",
  output: {
    file: "../custom_components/hermes/www/hermes-card.js",
    format: "es",
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    terser({ format: { comments: false } }),
  ],
};
