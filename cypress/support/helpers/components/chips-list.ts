export class ChipsList {
  closeIconLocator = '.cad-chip__close .icon';
  chipLocator = '.cad-chip';

  clearChipByName(chipsListLocator: string, chipText: string) {
    return this.getChipByName(chipsListLocator, chipText).find(this.closeIconLocator).click();
  }

  getChipByName(chipsListLocator: string, chipText: string) {
    return cy.get(`${chipsListLocator}`)
      .find(this.chipLocator).contains(chipText)
      .parent('.cad-chip__content');
  }

  getListOfChips(chipsListLocator: string) {
    return cy.get(`${chipsListLocator}`)
      .find(this.chipLocator);
  }

}
