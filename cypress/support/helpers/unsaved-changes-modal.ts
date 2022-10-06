export function leavePage() {
  cy.getByDataAutomation('unsaved-popup-leave-btn').click();
}

export function stayOnPage() {
  cy.getByDataAutomation('unsaved-popup-stay-btn').click();
}
