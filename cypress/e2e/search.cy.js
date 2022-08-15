/// <reference types="cypress" />
/* eslint-disable no-undef */

import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.resetAllData();
});

const URI = "http://localhost:3000";
describe("Search Test Suite", () => {
  it("should check search page", () => {
    const GENDER_QUANTITY = 5;
    const GENRE_QUANTITY = 30;
    const userInformations = {
      email: faker.internet.email(),
      password: "123456Nix$",
      username: faker.internet.userName(),
      image: faker.image.animals(),
      genderId: Math.ceil(Math.random() * GENDER_QUANTITY),
    };
    const userFavoriteGenres = {
      firstGenreId: Math.ceil(Math.random() * GENRE_QUANTITY),
      secondGenreId: Math.ceil(Math.random() * GENRE_QUANTITY),
      thirdGenreId: Math.ceil(Math.random() * GENRE_QUANTITY),
    };

    cy.createUser(userInformations, userFavoriteGenres);
    cy.loginUser(userInformations, URI);

    cy.intercept("GET", "/home/foryou").as("getForYou");
    cy.intercept("GET", "/home/season").as("getSeason");
    cy.intercept("GET", "/home/popular").as("getPopular");
    cy.visit(`${URI}/home`);
    cy.wait("@getForYou");
    cy.wait("@getSeason");
    cy.wait("@getPopular");

    cy.intercept("GET", "/search").as("getSearch");
    cy.get(".browser-icon").click({ force: true });
    cy.wait("@getSearch");

    cy.url().should("contains", `${URI}/search`);

    cy.get("#select-box-genre").type("Action");
    cy.get("#1").click({ force: true });
  });
});
