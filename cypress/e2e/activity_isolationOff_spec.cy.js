

describe('Complete Activity Workflow', () => {

    
    it('Logs In', () => {
        //Login command
        //Requires running register_spec.cy.js beforehand
        //Ensures account has not yet been used to complete activity
        cy.login();
    });

    it('Fills in firstname, lastname, and selects role', () => {
        cy.origin('https://kyber.arche.services', () => {

        //Fill in firstname, lastname, and select role
            cy.get('input[type="text"]').eq(0).type('Firstname');
            cy.get('input[type="text"]').eq(1).type('Lastname');
            cy.get('button.c0067').click();
            cy.contains('button', 'Role A').click();

            cy.contains('Continue').click();

            });
    })
      
    it('Performs the Pre-Test', () => {
        cy.origin('https://kyber.arche.services', () => {

        //Begin Pre-Test
        cy.get('[data-test="smart-card-cta"]').click();
        cy.get('[data-test="questionnaire-cta"]').click();
       

    //Pre-Test
        //Question 1
        cy.url().should('include', '/q/f3f95e9a-8de2-4bdd-b74c-7891e24926e7');
        cy.contains('correct').click();
        cy.contains('I\'m Sure').click();

        //Question 2
        cy.url().should('include', '/q/b5ec3731-7ed3-418e-8bed-e4ea7883651a');
        cy.contains('correct').click();
        cy.contains('I\'m Sure').click();

        //Question 3
        cy.url().should('include', '/q/92bd652f-457a-4a69-856b-734ef3f95fe1');
        cy.get('.c00174 [type="checkbox"]').check({ force: true });
        cy.contains('I\'m Sure').click();

        //Submit
        cy.get('[data-test="questionnaire-submit-button"]').click();

         });
    })

    it('Performs the Video Activity', () => {
        cy.origin('https://kyber.arche.services', () => {
            //Video Activity
            cy.get('[data-test="continue-to-activity-button"]').click();
            cy.get('[data-test="play-video-button"]').click();

            //confirm String pop-up
            // Timeout stops the command from failing 
            cy.contains('Please confirm this STRING shows up', { timeout: 30000 }).should('be.visible');
            //close pop-up, confirm disappeared
            cy.get('[data-test="close-whisper"]').click();
            cy.contains('Please confirm this STRING shows up').should('not.exist');

            // Learning moment pop-up 2 (pause)
            cy.contains('correct', { timeout: 40000 }).click();
            cy.contains('I\'m Sure').click();
            cy.get('[data-test="continue-button-moment"]').click();

            //Learning moment pop-up 3 (pause)
            cy.get('[data-test="active-moment-type-note', {timeout: 45000}).should('be.visible');
            cy.contains('Continue').click()

        });
    }) 

    it('Performs the Post-Test', () => {
        cy.origin('https://kyber.arche.services', () => {
            //Begin Post-Test
            cy.contains('Take Post-Test', { timeout: 40000}).click();
            cy.get('[data-test="questionnaire-cta"]').click();

        //Post-Test
             //Question 1
             cy.url().should('include', '/q/f3f95e9a-8de2-4bdd-b74c-7891e24926e7');
             cy.contains('correct').click();
             cy.contains('I\'m Sure').click();
 
             //Question 2
             cy.url().should('include', '/q/b5ec3731-7ed3-418e-8bed-e4ea7883651a');
             cy.contains('correct').click();
             cy.contains('I\'m Sure').click();
 
             //Question 3
             cy.url().should('include', '/q/92bd652f-457a-4a69-856b-734ef3f95fe1');
             cy.get('.c00174 [type="checkbox"]').check({ force: true });
             cy.contains('I\'m Sure').click();
 
             //Submit
             cy.get('[data-test="questionnaire-submit-button"]').click();

        });
    })    

    it('Performs the Evaluation', () => {
        cy.origin('https://kyber.arche.services', () => {
             //Begin Evaluation
             cy.contains('Take Evaluation').click();
             cy.get('[data-test="questionnaire-cta"]').click();
 
             //Question 1
             cy.url().should('include', '/q/1576ceae-cd32-44a7-8b30-7c4cf5d7c764');
             cy.contains('Amazing').click();
             cy.get('[data-test="confidence-button"]').click();
 
             //Submit
             cy.get('[data-test="questionnaire-submit-button"]').click();
 
         //Complete
             cy.contains('Go Home').click();
             cy.contains('h1', 'Curriculum').should('be.visible');

        });
    })
});