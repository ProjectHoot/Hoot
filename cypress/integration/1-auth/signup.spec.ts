let username: string
beforeEach(() => {
  //creating a random username
  username = `testUser${
    Math.round(Math.random() * 1000) + Math.round(Math.random() * 1000)
  }`
})
describe('Can signup as a new user', () => {
  it('can signup without an email', () => {
    cy.visit('/')
    cy.dataCy('login').click()
    cy.dataCy('signupTab').click()
    cy.dataCy('signupUsername').type(username)
    cy.dataCy('signupPassword').type('testPassword')
    cy.dataCy('signupRepeatPassword').type('testPassword')
    cy.dataCy('signupSubmit').click()
    cy.dataCy('authUsername').should('include.text', username)
  })
  it('can signup with an email', () => {
    cy.visit('/')
    cy.dataCy('login').click()
    cy.dataCy('signupTab').click()
    cy.dataCy('signupUsername').type(username)
    cy.dataCy('signupPassword').type('testPassword')
    cy.dataCy('signupRepeatPassword').type('testPassword')
    cy.dataCy('signupEmail').type(`${username}@testmail.com`)
    cy.dataCy('signupSubmit').click()
    cy.dataCy('authUsername').should('include.text', username)
  })
})
