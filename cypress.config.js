const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 30000,
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,

  env: {
    sizes: [
      [360, 640],
      [414, 896],
      [768, 1024],
      [1000, 660],
    ],
  },

  e2e: {
    baseUrl: "https://serverest.dev",
    specPattern: "cypress/e2e/**/*.{js,ts}",

    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
  },
});
