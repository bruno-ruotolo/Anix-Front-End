/// <reference types="cypress" />
/* eslint-disable no-undef */

import { faker } from "@faker-js/faker";
import { wait } from "@testing-library/user-event/dist/utils";

beforeEach(() => {
  cy.resetAllData();
});

const URI = "http://localhost:3000";

describe("Anime Test Suite", () => {
  it("should check anime page", () => {
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

    cy.get("#for-you-anime").click();

    cy.url().should("contains", `${URI}/anime`);

    cy.get("#demo-simple-select").click();
    cy.get("[data-value*='2']").click();

    cy.get(".favorite-star").click();
    wait(1000);
    cy.get(".favorite-star").click();

    cy.get(".moon-rate").click({ multiple: true });
  });
});
