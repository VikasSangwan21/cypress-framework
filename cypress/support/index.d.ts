declare namespace Cypress {
  // tslint:disable-next-line:class-name interface-name
  interface cy {
    stubInitialRequests(): void;
    stubNotificenterRequests(): void;
    // stubMarketRequests(): void;
    createDictionaryStubs(): void;
    restoreLocalStorage(): void;

    // loginStub(): void;
    // login(): void;

    // integration Test
    loginAsPlannerStub(): void;
    loginAsMediaOwnerStub(): void;
    // setUserNoPermissions(): void;

    // e2e test
    loginAsPlanner(): void;
    loginAsMoClearChannelUS(): void;
    loginAsMoLamarUS(): void;
    loginAsMoOutFrontUS(): void;
    loginAsMoBrandedCitiesUS(): void;
    loginAsMoOrangeBarrelUS(): void;
  }

  // tslint:disable-next-line:interface-name
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    getByDataAutomation(value: string): Chainable<Element>;

    clickButton(buttonText: string): Chainable<Element>;
  }

  // tslint:disable-next-line:class-name interface-name
  interface globalThis {
    Report: Report;
  }
}
