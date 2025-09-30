import './commands'
import '@shelex/cypress-allure-plugin' ;
import Ajv from "ajv";
import addFormats from "ajv-formats";

Cypress.Commands.add("validateSchema", (schema, data) => {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    const pretty = JSON.stringify(validate.errors, null, 2);
    throw new Error("Error en la validacion del Schema:\n" + pretty);
  }
});

// informacion adicional de las pruebas
after(() => {
  const lines = [
    `ENV=Local`,
    `Node utilizado=${Cypress.version} `,
    `Cypress Version=${Cypress.version} `].join("\n");
  cy.writeFile("allure-results/enviroment.properties", lines);
});