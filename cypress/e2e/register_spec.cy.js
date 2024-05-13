/// <reference types="Cypress" />


// requires updating 'email' in loginInfo.json with a new Sharklaser email each time

describe('Register Using Predetermined Email', () => {
  beforeEach(() => {
    // Clear browser state before each test
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies()
  });
  it('Registers from Sharklaser and logs in', () => {
  
   cy.register();
    
})
})
