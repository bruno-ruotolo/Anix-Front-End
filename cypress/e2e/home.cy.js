/// <reference types="cypress" />
/* eslint-disable no-undef */

import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.resetAllData();
});

const URI = "http://localhost:3000";

describe("Home Test Suite", () => {
  it("should navigate through home page", () => {
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

    cy.get("#for-you-anime").click();
    cy.url().should("contain", "/anime");

    cy.intercept("GET", "/home/foryou").as("getForYou");
    cy.intercept("GET", "/home/season").as("getSeason");
    cy.intercept("GET", "/home/popular").as("getPopular");
    cy.visit(`${URI}/home`);
    cy.wait("@getForYou");
    cy.wait("@getSeason");
    cy.wait("@getPopular");
  });
});
