module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "plugin:prettier/recommended"
  ],
  plugins: ["simple-import-sort"],
  rules: {
    "no-shadow": "off",
    "simple-import-sort/sort": "error",
  }
};
