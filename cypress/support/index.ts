// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getBySel('greeting')
     */
    dataCy(value: string): Chainable<Element>
  }
}

Cypress.on('uncaught:exception', () => false)
Cypress.Commands.add('dataCy', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})

// Alternatively you can use CommonJS syntax:
// require('./commands')
