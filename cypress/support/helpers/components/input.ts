export class Input {
  
  locator: string;
  
  constructor(locator: string) {
    this.locator = locator;
  }

  validation = {
    [BasicInputValidation.Empty]: {value: ' ', message: 'This field is required.'},
    [BasicInputValidation.String]: {value: 'autotests', message: 'This is not a valid number.'},
    [BasicInputValidation.Zero]: {value: '0', message: 'The value must not be less than 0.01.'},
    [BasicInputValidation.Decimals]: {value: '12,111', message: 'The number must have a maximum of 2 decimals.'},
    [BasicInputValidation.Maximum]: {value: '100000000', message: 'The value must not be greater than 99999999.99.'},
    [BasicInputValidation.Maximum_clicks]: {
      value: '1000000000',
      message: 'The value must not be greater than 999999999.99.'
    },
    [BasicInputValidation.Percent_max]: {value: '101', message: 'The value must not be greater than 100.'}
  };
  
  public validateInput(fieldLocator: string, validationType: BasicInputValidation) {
    cy.get(`${fieldLocator}`).clear().type(this.validation[validationType].value);
    cy.get(`${fieldLocator}`)
      .parents('cad-input-group')
      .parent()
      .siblings('cad-validation-errors')
      .should('contain', (this.validation[validationType].message));
  }
  
  public commonNumberValidation(valueLocator: string) {
    const COMMON_VALIDATION_TYPES = [
      BasicInputValidation.Empty, BasicInputValidation.String, BasicInputValidation.Zero, BasicInputValidation.Decimals
    ];
    COMMON_VALIDATION_TYPES.forEach(type => {
      this.validateInput(valueLocator, type);
    });
  }
  
  public verifyPlaceholder(fieldLocator: string, placeholderValue: string) {
    cy.get(`${fieldLocator}`).should('have.attr', 'placeholder', placeholderValue);
  }
  
  public static setInput(locator: string, value: string) {
    cy.get(locator).type(value);
  }

  public setInput(value: string) {
    cy.get(this.locator).type(value);
  }
}

export enum BasicInputValidation {
  Empty,
  String,
  Zero,
  Decimals,
  Maximum,
  Percent_max,
  Maximum_clicks
}