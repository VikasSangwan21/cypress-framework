export class DropDown {

  locator:string;
  
  option:string;

  subTextOption:string;

  constructor(locator:string) {
    this.locator = locator;
    this.option = this.locator + ' cad-smart-search-list-item div.list-item';
    this.subTextOption = this.locator + ' cad-smart-search-list-item-subtext div.list-item__texts__sub';
  }

  public selectOptionByLabel(option: string) {
    cy.get(this.locator).click();
    cy.get(this.option).contains(option).click();
  }

  public selectOptionBySubText(option: string) {
    cy.get(this.locator).click();
    cy.get(this.subTextOption).contains(option).click();
  }

  public getOptions() {
    // This code still have bug. Need to understand javascript scope on callback function
    cy.get(this.locator).click();
    let lblOption: string[] = [];
    cy.get(this.option).each(($el, index, $list) => {
      lblOption.push($el.text());
      cy.log($el.text());
    });
    return lblOption;
  }
}