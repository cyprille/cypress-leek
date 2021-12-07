/**
 * @author      Cyprille <cyprille.chauvry@gmail.com>
 * @copyright   Copyright (c) MIT
 * @license     Proprietary
 */

describe('Fight workflow', () => {
  before(() => {
      cy.login()
      cy.init()
  })

  it('Inits results', () => {
    cy.wrap(0).as('win')
    cy.wrap(0).as('lost')
  })

  it('Launches the fight...', () => {
    cy.fight()
  })
})

/*
 * Fight random leek 
 * Only if there are sufficient remaining fights for the day...
 */
Cypress.Commands.add('fight', (email, pw) => { 
  it('Go to the garden', () => {
    cy.visit('https://leekwars.com/garden/solo/81711')
  })
  
  it('Checks if there are sufficient remaining fights for the day', () => {
    cy.get('.page-header.page-bar > div.tabs > div > span').then(function($number) {
      if ($number.text() < 1) {
        // @TODO: Send an email with the daily results
        it('No more fights for today, stopping...', () => {
          return
        })
      } else {
        it('Click on a random opponent from 1 to 5', () => {
          cy.get('.opponents .leek').eq((Math.floor(Math.random() * 10)) + 1).click()
        })

        it('Wait for the fight to launch', () => {
          cy.wait(20000);
        })

        // @TODO: Wait for the fight to really start      
        it('Quit the simulation mode', () => {
          cy.get('body').trigger('keyup', { keyCode: 81});
        })

        // @TODO: Loop retry for the fight to really finish
        it('Clicks on the retry button to access the fight\'s results if it\'s not finished yet', () => {
          cy.get('body').then($body => {
            if ($body.find('.v-icon.notranslate.mdi.mdi-refresh.theme--light').length > 0) {   
              cy.get('.v-icon.notranslate.mdi.mdi-refresh.theme--light').click({ multiple: true, force: true })
            }
          });
        })

        it('Retrieves the winner leek', () => {
          let winner = Cypress.$('.report-general > div > div > div > div.scroll-x > table > tr > td > a').attr('href')
        })

        it('Displays the winner =)', () => {
          console.log(winner)
        })

        it('Logs the fight\'s results', () => {
          (winner == '/leek/81711') ? cy.wrap(this.win + 1).as('win') : cy.wrap(this.lost + 1).as('lost')
        })

        it('Launches a new fight', () => {
          cy.fight()
        })
      }
    })
  })
})
