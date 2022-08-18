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
  cy.log(userInformations.email);
  cy.log(userInformations.password);
  cy.request("POST", `http://localhost:5000/signup`, {
    ...userInformations,
    ...userFavoriteGenres,
  }).then((res) => {
    cy.log("User Created");
  });
});

Cypress.Commands.add("loginUser", (userInformations, URI) => {
  cy.log("Login User");
  cy.visit(`${URI}/signin`);
  cy.get("#signin-email").type(userInformations.email);
  cy.get("#signin-password").type(userInformations.password);

  cy.intercept("POST", "/").as("loginUser");
  cy.intercept("GET", "/home/foryou").as("getForYou");
  cy.intercept("GET", "/home/season").as("getSeason");
  cy.intercept("GET", "/home/popular").as("getPopular");
  cy.get("#signin-button").click();
  cy.wait("@loginUser");
  cy.wait("@getForYou");
  cy.wait("@getSeason");
  cy.wait("@getPopular");
});
