module.exports = function (api) {
    api.cache(false);
  
    const presets = ["@babel/preset-env",  "@babel/preset-react"];
    const plugins = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import"
    ];
  
    return {
      presets,
      plugins
    };
  }