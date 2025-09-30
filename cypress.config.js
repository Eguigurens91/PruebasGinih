const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureResultsPath: "cypress/reports/results",
    },
  },
  video: true,
  screenshots: "/cypress/screenshots",
  videos: "/cypress/videos",
});
