import { PageAction } from '../../../support/PageAction';
import moment from 'moment';

let epicName = 'Maps';
let featureName = 'Maps Page';
let tag = '';

describe.skip(featureName, () => {
  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
    cy.loginAsPlannerStub();
  });

  describe('Should create a campaign from map and fill campaign date from next Monday till next Sunday', () => {
    beforeEach(() => {
      PageAction.mapsPage()
      .loadMapsWithData()
      .loadFramesListWithData()
      .loadMediaOwnersWithData()
//      .createCampaignfromMap

      PageAction.mapsPage().createCampaignfromMap();
    });

    it('the autocomplete should be visible when something typed in input box', () => {
      PageAction.mapsPage().visit();
      cy.get('.input').click().type('new');
      cy.get('.pac-container.pac-logo').should('be.visible');
    })

    it('the "my selection" should be visible when any media frame is selected', () => {
      cy.get('.pac-container.pac-logo').first().click();
      cy.get(`:nth-child(1) > .sideSlidePanel__types__table__body__row-last > .sideSlidePanel__types__table__body__row-spacer > .bg-icon > .icon`).click();
      cy.get('.ooh-header__button').should('be.visible');
    });

    it('submit button should be visible when campaign name is entered', () => {
      cy.get('.ooh-header__button').click();
      cy.get('.cad-button__text').click();
      cy.get('.input').type('Dummy Campaign');
      cy.get('[data-automation="ooh-map-campaign-modal_submit"]').should('be.visible');
    });

    it('should send a post request with campaign date set to next monda and next sunday', () => {
      cy.get('[data-automation="ooh-map-campaign-modal_submit"]').click();
      cy.get('@createCampaignfromMap')
        .its('requestBody')
        .should('deep.equal', {
          name: 'Dummy Campaign',
          endDate: moment().add(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'),
          startDate: moment().add(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD')
        });
    });
  });

  describe('Auto-populate Media Formats when Frame(s) has been Selected ', () => {
    beforeEach(() => {
        PageAction.mapsPage()
        .loadMapsWithData()
        .loadFramesListWithData()
        .loadMediaOwnersWithData()
        
        PageAction.mapsPage().createCampaignfromMap()
        .createInventoryfromMap()
        .getCampaignEditData()
        .getInventoryfromMap()
    });

    it('the autocomplete should be visible when something typed in input box', () => {
        PageAction.mapsPage().visit();
        cy.get('.input').click().type('newyork');
        cy.get('.pac-container.pac-logo').should('be.visible');
    });

    it('the "my selection" should be visible when any media frame is selected', () => {
        cy.get('.pac-container.pac-logo').first().click();
        cy.get('[value="Frames"] > .button-toggle > a').click();
        cy.get(`:nth-child(1) > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon`).click();
        cy.get(`:nth-child(2) > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon`).click();
        cy.get('.ooh-header__button').should('be.visible');
    });

    it('submit button should be visible when campaign name is entered', () => {
        cy.get('.ooh-header__button').click();
        cy.get('.cad-button__text').click();
        cy.get('.input').type('Dummy Campaign');
        cy.get('[data-automation="ooh-map-campaign-modal_submit"]').should('be.visible');
    });

    it('should create a campaign and route to edit campaign page', () => {
      cy.get('[data-automation="ooh-map-campaign-modal_submit"]').click();
      cy.get('.title__align-center').should('contain', 'Dummy Campaign');
    })

    it.skip('should fill mandatory field so that the continue button is visible', () => {
      cy.get(PageAction.campaignCreatePage().campaignDesc).type('test').blur();
      PageAction.campaignCreatePage()
      .selectObjective('Brand Launch')
      .selectAgency('Deutsch')
      .selectClient('Amazon.com, Inc.');
      cy.get(PageAction.campaignCreatePage().campaignBudget).type('50000').blur();
      cy.get('.campaign-container__actions--alignRight > .button__submit > .cad-button > .cad-button__content-wrapper > .cad-button__text').should('be.visible');
    });

    it.skip('should verify the frames is poulated based on selection in map', () => {
      cy.get('.campaign-container__actions--alignRight > .button__submit > .cad-button > .cad-button__content-wrapper > .cad-button__text').click();
      cy.get('section.ng-star-inserted > :nth-child(2) > .col-md-12 > .row > .col-7').should('contain', 'Panel');
      cy.get('section.ng-star-inserted > :nth-child(2) > .col-md-12 > .row > .col-3 > .input').should('have.value', 2);
    });
  });
});
