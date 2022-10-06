import { SmartSearchList } from './smart-search-list';

export class ManageMarketPopup {
  setMarkets(popupButtonLocator: string, popupLocator: string, options: string[], isOpened?: boolean) {
    if (!isOpened) this.openPopup(popupButtonLocator);
  
    options.forEach(option => {
      new SmartSearchList().selectOption(popupLocator, option);
    });
  }
  
  removeMarkets(popupButtonLocator: string, popupLocator: string, options: string[], isOpened?: boolean) {
    if (!isOpened) this.openPopup(popupButtonLocator);
  
    options.forEach(option => {
      new SmartSearchList().deselectOption(popupLocator, option);
    });
  }
  
  clearSelection(popupButtonLocator: string, popupLocator: string, isOpened?: boolean) {
    if (!isOpened) this.openPopup(popupButtonLocator);
    cy.get(`${ popupLocator } [value="global.clear_all"]`).click();
    return true;
  }
  
  openPopup(popupButtonLocator: string) {
    cy.get(`${ popupButtonLocator }`).click();
  }
  
  apply() {
    cy.clickButton('Apply');
  }
  
  cancel() {
    cy.clickButton('Cancel');
  }
  
}
