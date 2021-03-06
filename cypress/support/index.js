// Import commands.js using ES2015 syntax:
import './commands'

Cypress.Commands.add('login', () => {
  cy.visit('https://leekwars.com/login')
  
  cy.get('input[name="login"]')
  .type('cyprille.chauvry@gmail.com')
  .should('have.value', 'cyprille.chauvry@gmail.com')
  
  cy.get('input[name="password"]')
  .type('De3p#Ouse1987$')
  .should('have.value', 'De3p#Ouse1987$')
  
  cy.get('.v-input--selection-controls__ripple')
  .click({ multiple: true, force: true })
  
  cy.get('button.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--large.primary')
  .click({ multiple: true, force: true })
})

Cypress.Commands.add('init', () => {
  cy.visit('https://leekwars.com/garden/solo/81711')

  cy.get('.actions>div>div')
    .click({ multiple: true, force: true })

  cy.get('.v-icon.notranslate.close.v-icon--link.mdi.mdi-close.theme--light')
    .click({ multiple: true, force: true })
})
