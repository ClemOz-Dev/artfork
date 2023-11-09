module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["plugin:vue/vue3-essential", "airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue", "prettier"],
  rules: {
    semi: [2, "never"],
    "prettier/prettier": ["error", { semi: false, endOfLine: "auto" }],
    "no-console": "off",
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": "off",
    "no-shadow": ["error", { allow: ["state"] }],
    "no-param-reassign": ["error", { props: false }],
    "import/no-cycle": "off",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"]
        ],
        extensions: [".js", ".vue", ".json"]
      }
    }
  }
}
