/// <reference types="Cypress" />


// requires running register_spec.cy.js before 
// to make sure account has not yet been used to complete activity

describe('Login Using Predetermined Email', () => {
    before(() => {
      cy.visit('https://kyber.arche.services/api/v1/learner/curricula/4a2a1540-bb68-4d2b-94b2-ce0349cacc7b/activities/4b1c3fcc-599f-4efc-a325-82eb7c066137/authorize?identity-provider=kyber-staging')
      cy.url().should('include', '/u/login')  
    })
  
    it('Logs in the account', () => {
        cy.visit('https://kyber.arche.services/api/v1/learner/curricula/4a2a1540-bb68-4d2b-94b2-ce0349cacc7b/activities/4b1c3fcc-599f-4efc-a325-82eb7c066137/authorize?identity-provider=kyber-staging')
        cy.url().should('include', '/u/login')  

        cy.fixture('/loginInfo.json').then((loginInfo) => {
            const { email, pass } = loginInfo;
            cy.get('#username').type(email);
            cy.get('#password').type(pass);
          });
      cy.contains('button', 'Continue').click()

      cy.origin('https://kyber.arche.services', () => {
        cy.url().should('contain','/curriculum/')
        })
  }) 
  }) 
  