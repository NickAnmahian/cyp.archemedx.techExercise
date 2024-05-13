//Login command
Cypress.Commands.add('login', () => {
  //clear browser state before registering again, so visiting the login page can be successful
  //consequence of having to set testIsolation: false in the config for the activity_spec to work
  //See README
  cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies()

    cy.visit('https://kyber.arche.services/api/v1/learner/curricula/4a2a1540-bb68-4d2b-94b2-ce0349cacc7b/activities/4b1c3fcc-599f-4efc-a325-82eb7c066137/authorize?identity-provider=kyber-staging')
    cy.url().should('include', '/u/login');
  
    cy.fixture('/loginInfo.json').then((loginInfo) => {
      const { email, pass } = loginInfo;
      cy.get('#username').type(email);
      cy.get('#password').type(pass);
    });
  
    cy.contains('button', 'Continue').click();

    // waits to get into the activity area before checking for correct url
    // slow load times were causing this to fail without a wait
    cy.intercept('GET', '**/curriculum/*').as('redirect');
    cy.wait('@redirect');
      cy.origin('https://kyber.arche.services', () => {
      cy.url().should('contain', '/curriculum/');
    });
  });

//Register Command
Cypress.Commands.add('register', () => {
  //clear browser state before registering again, so visiting the login page can be successful
  //consequence of having to set testIsolation: false in the config for the activity_spec to work
  //See README
  cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies()
    
  cy.visit('https://www.sharklasers.com/')
  cy.get('span[data-step="2"]').invoke('text').then((emailAddress) => {
    // Update the email fixture in loginInfo.json with the extracted email address
    cy.readFile('cypress/fixtures/loginInfo.json').then((loginInfo) => {
      loginInfo.email = emailAddress; // Update the email property with the extracted email address
      cy.writeFile('cypress/fixtures/loginInfo.json', loginInfo); // Write the updated loginInfo back to the file
    });
  });

  cy.origin('https://kyber-staging.auth0.com', () => {
    cy.visit('https://kyber.arche.services/api/v1/learner/curricula/4a2a1540-bb68-4d2b-94b2-ce0349cacc7b/activities/4b1c3fcc-599f-4efc-a325-82eb7c066137/authorize?identity-provider=kyber-staging')
    cy.contains('Sign up').click()
    cy.url().should('include', '/u/signup')  

  cy.fixture('/loginInfo.json').then((loginInfo) => {
    const { email, pass } = loginInfo;
    cy.get('#email').type(email);
    cy.get('#password').type(pass);
  });

  cy.contains('button', 'Continue').click();
})

// waits to get into the activity area before checking for correct url
  // slow load times were causing this to fail without a wait
  
    cy.origin('https://kyber.arche.services', () => {
    cy.url({timeout: 20000}).should('contain', '/curriculum/');
  });
  
});