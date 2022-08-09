/* eslint-disable no-undef */

import { faker } from "@faker-js/faker";

Cypress.Commands.add("resetAllData", () => {
  cy.log("Reseting Data");
  cy.request("POST", `http://localhost:5000/reset-data`).then((res) => {
    cy.log("Data Cleared");
  });
});

Cypress.Commands.add("createUser", (userInformations, userFavoriteGenres) => {
  cy.log("Creating User");
  cy.request("POST", `http://localhost:5000/signup`, {
    ...userInformations,
    ...userFavoriteGenres,
  }).then((res) => {
    cy.log("User Created");
  });
});
