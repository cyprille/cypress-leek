// Import commands.js using ES2015 syntax:
import './commands'

Cypress.Commands.add('loginCheck', () => {
  cy.visit('https://leekwars.com/login')
  cy.closeWhatsNewPopup()

  cy.get('.header-right').then(($e) => {
    return $e.find('.header-farmer').length > 0
  })
})

Cypress.Commands.add('login', () => {
  cy.log('Go to the login page')

  cy.visit('https://leekwars.com/login')
  cy.closeWhatsNewPopup()
  
  cy.get('input[name="login"]')
  .type(Cypress.env('login'))
  .should('have.value', Cypress.env('login'))
  
  cy.get('input[name="password"]')
  .type(Cypress.env('password'))
  .should('have.value', Cypress.env('password'))
  
  cy.get('.v-input--selection-controls__ripple')
  .click({ multiple: true, force: true })
  
  cy.get('button.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--large.primary')
  .click({ multiple: true, force: true })

  cy.wait(1000)

  cy.closeWhatsNewPopup()
})

Cypress.Commands.add('closeWhatsNewPopup', () => {
  cy.wait(1000)

  cy.get('body').then((body) => {
    if (body.find('.v-dialog--active').length > 0) {
      cy.get('.v-dialog--active > .actions > div').click();
    }
  })
})
