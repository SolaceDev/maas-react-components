module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset'), "@babel/preset-react"],
  plugins: ["@babel/plugin-transform-react-display-name"]
};
