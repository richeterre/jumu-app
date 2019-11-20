module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "plugin:prettier/recommended"
  ],
  plugins: ["simple-import-sort"],
  rules: {
    "no-shadow": "off",
    "react/jsx-sort-props": ["error", {
      "callbacksLast": true,
      "ignoreCase": true,
      "reservedFirst": true
    }],
    "simple-import-sort/sort": "error",
  }
};
