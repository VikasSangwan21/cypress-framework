import { SmartSearchList } from './smart-search-list';

export class DropDownWithSmartSearch {  
  selectOption(dropdownLocator: string, option: string, isOpened?: boolean) {
    if (!isOpened) {
      this.openDropdown(dropdownLocator);
    }
    new SmartSearchList().selectOption(dropdownLocator, option);
  }
  
  openDropdown(dropdownLocator: string) {
    cy.get(`${dropdownLocator}`).click();
  }
}
