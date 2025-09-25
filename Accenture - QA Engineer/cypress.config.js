const { defineConfig } = require("cypress");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const createBuilder = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://demoqa.com',
        supportFile: './cypress/support/e2e.js',
        specPattern: "**/*.feature",

        async setupNodeEvents(on, config) {
            await addCucumberPreprocessorPlugin(on, config);

            on(
                "file:preprocessor",
                createBuilder({
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            return config;
        },
    },
});