/// <reference types="Cypress" />


// requires running register_spec.cy.js before 
// to make sure account has not yet been used to complete activity

describe('Login Using Predetermined Email', () => {
      beforeEach(() => {
        // Clear browser state before each test
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.clearAllCookies()
      });  
    })
  
    it('Logs in the account', () => {
        cy.login();
  }) 
 
  