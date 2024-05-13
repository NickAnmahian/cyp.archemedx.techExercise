const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
  
  defaultCommandTimeout: 10000 // 10 seconds in milliseconds
});
