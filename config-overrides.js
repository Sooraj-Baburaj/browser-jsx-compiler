const path = require("path");

module.exports = function override(config, env) {
  // Add fallback configuration
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve("path-browserify"),
    assert: require.resolve("assert/"),
    fs: false,
    stream: false,
    http: false,
    crypto: false,
    os: false,
  };

  return config;
};
