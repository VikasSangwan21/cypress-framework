export class HomePage {

  // DATA AUTOMATION TAGS
  profileIcon = '.profile-dropdown__title--icon > .icon > use';
  logoutBtn = '.profile-dropdown__content > :nth-child(5)';
 

  logout() {
    cy.get(this.profileIcon).click();
    cy.get(this.logoutBtn).click().wait(2000);
  }

}
