/**
 * @author      Cyprille <cyprille.chauvry@gmail.com>
 * @copyright   Copyright (c) MIT
 * @license     Proprietary
 */

describe('Fight workflow', function () {
  Cypress.Cookies.defaults({
    preserve: 'token'
  })

  before(() => {
    cy.clearCookies()

    cy.loginCheck().then((logged) => {
      if (logged === false) {
        cy.log('Not logged in')
        cy.login()
      } else {
        cy.log('Already logged')
      }
    })
  })

  it('Inits results', function () {
    cy.wrap(0).as('win')
    cy.wrap(0).as('lost')
  })

  it('Launches the fight...', function () {
    cy.fight()
  })
})

Cypress.Commands.add('waitForFightToGenerate', (time) => {
  cy.wait(time)

  // Wait for the fight to really start
  it('Quit the simulation mode', () => {
    if (cy.get('.fight-actions').find('div').length === 0) {
      cy.waitForFightToGenerate(1000)
    }
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
    (winner == ('/leek/' + Cypress.env('leek_id'))) ? cy.wrap(this.win + 1).as('win') : cy.wrap(this.lost + 1).as('lost')
  })

  it('Launches a new fight', () => {
    cy.fight()
  })

  cy.fight()
})

/*
 * Fight random leek 
 * Only if there are sufficient remaining fights for the day...
 */
Cypress.Commands.add('fight', () => {
  cy.visit("https://leekwars.com/garden/solo/" + Cypress.env('garden_id'))
  cy.closeWhatsNewPopup()
  
  // Checks if there are sufficient remaining fights for the day
  cy.get('.page-header.page-bar > div.tabs > div > span').then(function($number) {
    if ($number.text() < 1) {
      // @TODO: Send an email with the daily results
      it('No more fights for today, stopping...', () => {
        return
      })
    } else {
      // Click on a random opponent from 1 to 5
      cy.get('.opponents .leek').eq(Math.floor(Math.random() * (5 - 1 + 1) + 1)).click()

      cy.waitForFightToGenerate(1000)
    }
  })
})
