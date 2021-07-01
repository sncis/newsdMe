/* eslint-disable */


import React from "react";

describe('App e2e', () => {
  it("should fetch articles and render witout errors", () => {
    cy.visit('/');
    cy.get('h2').should('have.text', 'Top daily Headlines');
    cy.get('.article-list').find('.article_container').should('have.length',5)
  });

  it("should render login component after dashboard clicked", () => {
    cy.visit('/');
    cy.get('[data-cy=dashboard-link]').click();
    cy.get('.auth-dialog').find('.auth-title').should('have.text', 'Login')
  })

  it("should login user", () => {
    cy.visit('/')
    cy.get('.header-right').find('.login-btn').click();
    cy.get('.auth-dialog').find('.auth-title').should('have.text', 'Login')

    cy.get("#username").type("nantis")
    cy.get('#password').type('somePass1234!')
    cy.get('[data-cy=login-btn]').click()

    cy.get('h2').should('have.text',"Your bookmarked Articles");
  })

  it("should not be able to go to admin side", () => {
    cy.visit('/');
    cy.get('.header-right').find('.login-btn').click();
    cy.get('.auth-dialog').find('.auth-title').should('have.text', 'Login');

    cy.get("#username").type("nantis");
    cy.get('#password').type('somePass1234!');
    cy.get('[data-cy=login-btn]').click();

    cy.get('h2').should('have.text',"Your bookmarked Articles");

    cy.get('[data-cy=admin-link]').click();

    cy.get("p").should('have.text', 'Sorry you are not allowed to access this resource');

  })
});