/// <reference types="cypress" />
/* eslint-disable no-undef */

import { faker } from "@faker-js/faker";
import { click } from "@testing-library/user-event/dist/click";

const URI = "http://localhost:3000";

beforeEach(() => {
  cy.resetAllData();
});

describe("Create User Test Suite", () => {
  it("should navigate to signUp page", () => {
    cy.visit(`${URI}/`);
    cy.get("#navigate-signup").click();

    cy.url().should("equal", `${URI}/signup`);
  });

  it("should create a user", () => {
    const GENDER_QUANTITY = 5;

    const userInformations = {
      email: faker.internet.email(),
      password: "123456Nix$",
      username: faker.internet.userName(),
      image: faker.image.animals(),
      genderId: Math.ceil(Math.random() * GENDER_QUANTITY),
    };

    cy.visit(`${URI}/`);
    cy.get("#navigate-signup").click();

    cy.get("#signup-email").type(userInformations.email);
    cy.get("#signup-password").type(userInformations.password);
    cy.get("#signup-confirm-password").type(userInformations.password);

    cy.intercept("GET", "/genders").as("getAllGenders");
    cy.get("#signup-credential-button").click();
    cy.wait("@getAllGenders");

    cy.url().should("equal", `${URI}/signup/infos`);

    cy.get("#signup-username").type(userInformations.username);
    cy.get("#signup-image").type(userInformations.image);

    cy.get("#select-box-infos").click();
    cy.get("[data-value*='2']").click();

    cy.intercept("GET", "/genres").as("getAllGenres");
    cy.get("#signup-info-button").click();
    cy.wait("@getAllGenres");

    cy.url().should("equal", `${URI}/signup/genres`);

    cy.get("#select-box-first-genre").click();
    cy.get("[data-value*='5']").click({ multiple: true });

    cy.get("#select-box-second-genre").click();
    cy.get("[data-value*='28']").click({ multiple: true });

    cy.get("#select-box-third-genre").click();
    cy.get("[data-value*='15']").click({ multiple: true });

    cy.intercept("POST", "/signup").as("createUser");
    cy.get("#signup-genre-button").click();
    cy.wait("@createUser");

    cy.url().should("equal", `${URI}/`);

    it("navigate throw pages", () => {
      cy.visit(`${URI}/`);
      cy.get("#navigate-signup").click();
      cy.url().should("equal", `${URI}/signup`);
      cy.get("#navigate-signin").click();

      cy.url().should("equal", `${URI}/`);
    });
  });
});

describe("Login User Test Suite", () => {
  it("should login user", () => {
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

    cy.get("#signin-email").type(userInformations.email);
    cy.get("#signin-password").type(userInformations.password);

    cy.intercept("POST", "/").as("loginUser");
    cy.intercept("GET", "/home/foryou").as("getHome");
    cy.get("#signin-button").click();
    cy.wait("@loginUser");
    cy.wait("@getHome");

    cy.url().should("equal", `${URI}/home`);
  });
});
