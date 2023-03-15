module.exports ={
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/indent": ["warn", 2],
    "@typescript-eslint/object-curly-spacing": ["warn", "always"],
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-const": "off",
    "arrow-parens": "off",
    "jsx-quotes": [2, "prefer-single"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "semi": [2, "never"],
    "import/no-anonymous-default-export": "off",
    "react/jsx-uses-react": "off"
  }
}