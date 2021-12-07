/**
 * @author      Cyprille <cyprille.chauvry@gmail.com>
 * @copyright   Copyright (c) MIT
 * @license     Proprietary
 */

describe('Fight', () => {
  it('Connect', () => {
    // Go to login page
    cy.visit('https://leekwars.com/login')

    // Type login
    cy.get('input[name="login"]')
      .type('cyprille.chauvry@gmail.com')
      .should('have.value', 'cyprille.chauvry@gmail.com')

    // Type password
    cy.get('input[name="password"]')
      .type('De3p#Ouse1987$')
      .should('have.value', 'De3p#Ouse1987$')

    // Tick the remember me box
    cy.get('.v-input--selection-controls__ripple').click({ multiple: true, force: true })

    // Submit
    cy.get('button.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--large.primary').click({ multiple: true, force: true })

    // Go to the garden
    cy.visit('https://leekwars.com/garden/solo/81711')

    // Closes the what's new popup
    cy.get('.actions>div>div').click({ multiple: true, force: true })

    // Closes the tchat box
    cy.get('.v-icon.notranslate.close.v-icon--link.mdi.mdi-close.theme--light').click({ multiple: true, force: true })

    // Inits results
    cy.wrap(0).as('win')
    cy.wrap(0).as('lost')

    // Launches the fight
    cy.fight()
  })
})

// Fight random leek if there is sufficient remaining credits
Cypress.Commands.add('fight', (email, pw) => { 
  // Go to the garden
  cy.visit('https://leekwars.com/garden/solo/81711')

  cy.get('.page-header.page-bar > div.tabs > div > span').then(function($number) {
    if ($number.text() < 1) {
      // @TODO: Send an email with the daily results

      return
    } else {
      // Click on a random opponent from 1 to 5
      cy.get('.opponents .leek').eq((Math.floor(Math.random() * 10)) + 1).click()

      // Wait for the fight to launch
      cy.wait(20000);

      // @TODO: Wait for the fight to really start
      
      // Quit the simulation mode
      cy.get('body').trigger('keyup', { keyCode: 81});

      // @TODO: Loop retry for the fight to really finish
      // Clicks on the retry button to access the fight's results if it's not finished yet
      cy.get('body').then($body => {
        if ($body.find('.v-icon.notranslate.mdi.mdi-refresh.theme--light').length > 0) {   
          cy.get('.v-icon.notranslate.mdi.mdi-refresh.theme--light').click({ multiple: true, force: true })
        }
      });

      // Retrieves the winner leek
      let winner = Cypress.$('.report-general > div > div > div > div.scroll-x > table > tr > td > a').attr('href')

      console.log(winner)

      // Logs the fight's results
      (winner == '/leek/81711') ? cy.wrap(this.win + 1).as('win') : cy.wrap(this.lost + 1).as('lost')

      // Launches a new fight
      cy.fight()
    }
  })
})
