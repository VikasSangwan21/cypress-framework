import { PageAction } from '../../../support/PageAction';
let epicName = 'Campaigns Sort';
let featureName = 'Campaigns Sort Option';
let tag = '';

declare global {
  interface Date {
    getWeek(start?: number): [Date, Date]
  }
}

describe(featureName, () => {

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
    cy.loginAsPlannerStub();

    cy.exec('npm cache clear --force');

    PageAction.CampaignFilterPage()
      .loadCampaignsWithData()
      .visit();

    cy.get(PageAction.CampaignFilterPage().filterBtn)
      .click();
  });

  it('Validate filter button enabled and button click', () => {
    cy.wait(1000);
    cy.get(PageAction.CampaignFilterPage().filterBtn).should('not.be.disabled');
    cy.get(PageAction.CampaignFilterPage().filterBtn).contains('Filter');
    cy.get(PageAction.CampaignFilterPage().filterBtn).click();
  });

  it('Validate filter buttons before enter values', () => {
    cy.wait(1000);
    cy.get(PageAction.CampaignFilterPage().clearAllBtn).should('be.disabled');
    cy.get(PageAction.CampaignFilterPage().cancelBtn).should('not.be.disabled');
    cy.get(PageAction.CampaignFilterPage().applyBtn).should('not.be.disabled');
  })

  it('Validate Select Start date filter', () => {
    cy.get(PageAction.CampaignFilterPage().campaignDateFromStart)
      .type('Jun 1, 2020').click;
    cy.get(PageAction.CampaignFilterPage().campaignDateFromStartInput)
      .should('have.value', 'Jun 1, 2020');

    cy.get(PageAction.CampaignFilterPage().campaignDateToStart)
      .type('Sep 1, 2020').click;
    cy.get(PageAction.CampaignFilterPage().campaignDateToStartInput)
      .should('have.value', 'Sep 1, 2020');
  })

  it('Validate Select End date filter', () => {
    cy.get(PageAction.CampaignFilterPage().campaignDateFromEnd)
      .type('Jun 30, 2020').click;
    cy.get(PageAction.CampaignFilterPage().campaignDateFromEndInput)
      .should('have.value', 'Jun 30, 2020');

    cy.get(PageAction.CampaignFilterPage().campaignDateToEnd)
      .type('Sep 30, 2020').click;
    cy.get(PageAction.CampaignFilterPage().campaignDateToEndInput)
      .should('have.value', 'Sep 30, 2020');
  })

  it('Validate Select Status and Client filter', () => {
    PageAction.CampaignFilterPage().loadCampaignsFilteredClientData();

    cy.get(PageAction.CampaignFilterPage().client).click();
    cy.get('ooh-client-filter > cad-dropdown > div > div > div > div > cad-smart-search-list > div > div > cad-search-input > div').type('Amazon.com');
    cy.get('.list-item').contains('Amazon.com, Inc.').click();
    cy.get(PageAction.CampaignFilterPage().clientApplyBtn).click();
    cy.get('ooh-client-filter.ng-star-inserted > .display-inline > .cad-dropdown > .dropdown__head > .dropdown__head__content').should('have.text', ' Amazon.com, Inc. ');

    cy.get(PageAction.CampaignFilterPage().status).click();
    cy.contains('Draft').click();
    cy.get(PageAction.CampaignFilterPage().statusApplyBtn).click();
    cy.get('ooh-campaign-status-filter.ng-star-inserted > .display-inline > .cad-dropdown > .dropdown__head > .dropdown__head__content').should('have.text', ' Draft ');
  })

  tag = "C77027477";
  it(`${tag} - Media Owner filter no longer exist'`, () => {
    Report.Issue("OOH-1671").Tag("C77027477").Feature('Campaign');

    cy.get('cad-smart-filter > div > span').should('not.contain.text', 'Media Owner');
  })

  it.skip('Should load campaign list with Amazon.com, Inc. filtered data', () => {
    PageAction.CampaignFilterPage().loadCampaignsWithFilterData().visit();

    cy.get(PageAction.CampaignFilterPage().cancelBtn).click();


    for (var i = 2; i < 7; i++) {
      cy.get(':nth-child(' + i + ') > tr > :nth-child(3) > span').should(
        'contain', 'Amazon.com, Inc.');
    }
  });

  it.skip('Should load campaign list with Draft filtered data', () => {
    PageAction.CampaignFilterPage().loadCampaignsWithFilterData().visit();

    for (var i = 2; i < 7; i++) {
      cy.get('campaign-list table :nth-child(' + i + ') > tr > :nth-child(6)')
        .should('contain', 'Draft');
    }
  });

  it('Validate Clear All button once entered/selected values', () => {
    cy.get(PageAction.CampaignFilterPage().clearAllBtn)
      .should('be.disabled');

    cy.get(PageAction.CampaignFilterPage().campaignDateFromStart)
      .type('Jun 1, 2020').click();


    cy.get(PageAction.CampaignFilterPage().campaignDateToStart)
      .type('Sep 1, 2020').click();

    cy.get(PageAction.CampaignFilterPage().campaignDateFromEnd)
      .type('Jun 30, 2020').click();


    cy.get(PageAction.CampaignFilterPage().campaignDateToEnd)
      .type('Sep 30, 2020').click();

    cy.get(PageAction.CampaignFilterPage().client).click();
    cy.get('ooh-client-filter > cad-dropdown > div > div > div > div > cad-smart-search-list > div > div > cad-search-input > div').type('Amazon.com');
    cy.get('.list-item').contains('Amazon.com, Inc.').click();
    cy.get(PageAction.CampaignFilterPage().clientApplyBtn).click();
    cy.get('ooh-client-filter.ng-star-inserted > .display-inline > .cad-dropdown > .dropdown__head > .dropdown__head__content').should('have.text', ' Amazon.com, Inc. ');

    cy.get(PageAction.CampaignFilterPage().status).click();
    cy.contains('Draft').click();
    cy.get(PageAction.CampaignFilterPage().statusApplyBtn).click();
    cy.get('ooh-campaign-status-filter.ng-star-inserted > .display-inline > .cad-dropdown > .dropdown__head > .dropdown__head__content').should('have.text', ' Draft ');

    cy.get(PageAction.CampaignFilterPage().clearAllBtn)
      .click();

    cy.get(PageAction.CampaignFilterPage().campaignDateFromStartInput)
      .should('have.value', '');
    cy.get(PageAction.CampaignFilterPage().campaignDateToStartInput)
      .should('have.value', '');
    cy.get(PageAction.CampaignFilterPage().campaignDateFromEndInput)
      .should('have.value', '');
    cy.get(PageAction.CampaignFilterPage().campaignDateToEndInput)
      .should('have.value', '');

    cy.get(PageAction.CampaignFilterPage().status)
      .should('contain', ' All ');
    cy.get(PageAction.CampaignFilterPage().client)
      .should('contain', ' All ');

    cy.get(PageAction.CampaignFilterPage().clearAllBtn)
      .should('be.disabled');

    cy.get(PageAction.CampaignFilterPage().cancelBtn)
      .should('not.be.disabled');

    cy.get(PageAction.CampaignFilterPage().applyBtn)
      .should('not.be.disabled');
  })

});
