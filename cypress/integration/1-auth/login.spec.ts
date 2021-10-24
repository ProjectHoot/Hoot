let user1
before(() => {
  //creating a random username
  user1 = `testUser${
    Math.round(Math.random() * 1000) + Math.round(Math.random() * 1000)
  }`
  cy.request('POST', 'http://localhost:3000/api/users', {
    username: user1,
    password: 'testPassword',
  })
})
describe('Can login', () => {
  it('can login', () => {
    cy.visit('/')
    cy.dataCy('login').click()
    cy.dataCy('loginTab').click()
    cy.dataCy('loginUsername').type(user1)
    cy.dataCy('loginPassword').type('testPassword')
    cy.dataCy('loginSubmit').click()
    cy.dataCy('authUsername').should('include.text', user1)
  })
})
