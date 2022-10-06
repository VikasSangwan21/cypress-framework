import { PageAction } from '../../../../support/PageAction';

let epicName = 'Campaigns Sort';
let featureName = 'Campaigns sort Option';
let tag = '';

import dayjs from 'dayjs';

let testDataPath = '';
let startDateFrom: string[] = [];
let startDateTo: string[] = [];
let endDateFrom: string[] = [];
let endDateTo: string[] = [];
let status: string[] = [];
let client: string[] = [];
let loopCount = '';

declare global {
  interface Date {
    getWeek(start?: number): [Date, Date]
  }
}

describe(featureName, () => {

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);

    cy.loginAsPlanner();
  });

  it('read filter configuration file', () => {
    cy.fixture('ooh/campaigns/campaign_filter_config.json').then((config) => {
      testDataPath = config.testDataPath;
      startDateFrom = config.startDateFrom;
      startDateTo = config.startDateTo;
      endDateFrom = config.endDateFrom;
      endDateTo = config.endDateTo;
      status = config.status;
      client = config.client;
      loopCount = config.loopCount;
    })
  })

  it('Validate filter button enabled and button click', () => {
    cy.get(PageAction.CampaignFilterPage().filterBtn)
      .should('not.be.disabled');
    cy.get(PageAction.CampaignFilterPage().filterBtn).contains('Filter');
    cy.get(PageAction.CampaignFilterPage().filterBtn)
      .click();

    cy.get(PageAction.CampaignFilterPage().clearAllBtn)
      .should('be.disabled');
    cy.get(PageAction.CampaignFilterPage().cancelBtn)
      .should('not.be.disabled');
    cy.get(PageAction.CampaignFilterPage().applyBtn)
      .should('not.be.disabled');

    var filterDateStartFrom = new Date();
    filterDateStartFrom.setMonth(filterDateStartFrom.getMonth() - 4);
    filterDateStartFrom.setHours(0, 0, 0, 0);

    const startFrom = filterDateStartFrom.toLocaleString('default', { month: 'short' }) + " " +
      filterDateStartFrom.toLocaleString('default', { day: 'numeric' }) + ", " +
      filterDateStartFrom.toLocaleString('default', { year: 'numeric' });

    var filterDateStartTo = new Date();
    filterDateStartTo.setMonth(filterDateStartTo.getMonth() - 2);
    filterDateStartTo.setHours(0, 0, 0, 0);

    const startTo = filterDateStartTo.toLocaleString('default', { month: 'short' }) + " " +
      filterDateStartTo.toLocaleString('default', { day: 'numeric' }) + ", " +
      filterDateStartTo.toLocaleString('default', { year: 'numeric' });

    var filterDateEndFrom = new Date();
    filterDateEndFrom.setMonth(filterDateEndFrom.getMonth() - 2);
    filterDateEndFrom.setHours(0, 0, 0, 0);

    const endFrom = filterDateEndFrom.toLocaleString('default', { month: 'short' }) + " " +
      filterDateEndFrom.toLocaleString('default', { day: 'numeric' }) + ", " +
      filterDateEndFrom.toLocaleString('default', { year: 'numeric' });

    var filterDateEndTo = new Date();
    filterDateEndTo.setMonth(filterDateEndTo.getMonth() - 0);
    filterDateEndTo.setHours(0, 0, 0, 0);

    const endTo = filterDateEndTo.toLocaleString('default', { month: 'short' }) + " " +
      filterDateEndTo.toLocaleString('default', { day: 'numeric' }) + ", " +
      filterDateEndTo.toLocaleString('default', { year: 'numeric' });

    cy.get(PageAction.CampaignFilterPage().campaignDateFromStart)
      .type(startFrom).click();
    cy.get(PageAction.CampaignFilterPage().campaignDateToStart)
      .type(startTo).click();

    cy.get(PageAction.CampaignFilterPage().campaignDateFromEnd)
      .type(endFrom).click();
    cy.get(PageAction.CampaignFilterPage().campaignDateToEnd)
      .type(endTo).click();

    PageAction.CampaignFilterPage().selectFilterStatus('Draft');
    cy.contains('Apply').first().click();
    PageAction.CampaignFilterPage().selectFilterClient('Amazon.com, Inc.');
    // it('Apply button click', () => {

    cy.get(PageAction.CampaignFilterPage().applyBtn)
      .click();

    cy.get(PageAction.CampaignFilterPage().total).wait(2000)
      .then(($span) => {
        var count = $span.text().trim();
        var pattern = /[0-9]+/g;
        var number: any = 0;
        number = (count.match(pattern));
        if (number > 10) {
          for (var i = 1; i < (number / 10); i++) {
            cy.scrollTo('bottom').wait(1000);
          }
        }

        cy.get('campaign-list.ng-star-inserted > .center .table > tbody').should('have.length', number);

        // it('Should load campaign list with Amazon.com, Inc. filtered data', () => {
        for (var i = 1; i <= number; i++) {
          cy.get(':nth-child(' + (i + 1) + ') > tr > :nth-child(3) > span').should(
            'contain', 'Amazon.com, Inc.');
        }
        // });

        // it('Should load campaign list with Draft filtered data', () => {
        for (var i = 1; i <= number; i++) {
          cy.get('campaign-list table :nth-child(' + (i + 1) + ') > tr > :nth-child(6)')
            .should('contain', 'Draft');
        }
        // });

        // it('Validate filtered start date and end date', () => {

        var isBetween: any = require('dayjs/plugin/isBetween')
        dayjs.extend(isBetween)

        for (var i = 1; i <= number; i++) {
          cy.get(':nth-child(' + (i + 1) + ') > tr > .table__col-100')
            .then(($span) => {
              const dates = $span.text().split(' - ');

              var resultDateFrom = new Date(dayjs(dates[0].toString().replace(',', '')).format('MMM DD YYYY'));
            //  expect(dayjs(resultDateFrom).isBetween(filterDateStartFrom, filterDateStartTo, null, '[]')).to.be.true;

              var resultDateTo = new Date(dayjs(dates[1].toString().replace(',', '')).format('MMM DD YYYY'));
            //  expect(dayjs(resultDateTo).isBetween(filterDateEndFrom, filterDateEndTo, null, '[]')).to.be.true;

            });
        }

        cy.get('.ooh-header__total-count')
          .should('contain', 'Total ' + number);

      });
    // // });

    // it('Validate Clear All button once entered/selected values', () => {

    cy.get(PageAction.CampaignFilterPage().filterBtn)
      .click();
    cy.get(PageAction.CampaignFilterPage().clearAllBtn)
      .should('not.be.disabled');

    cy.get(PageAction.CampaignFilterPage().clearAllBtn)
      .click();

    cy.get(PageAction.CampaignFilterPage().campaignDateFromStart)
      .should('have.value', '');
    cy.get(PageAction.CampaignFilterPage().campaignDateToStart)
      .should('have.value', '');
    cy.get(PageAction.CampaignFilterPage().campaignDateFromEnd)
      .should('have.value', '');
    cy.get(PageAction.CampaignFilterPage().campaignDateToEnd)
      .should('have.value', '');

    cy.get(PageAction.CampaignFilterPage().status)
      .should('contain', 'All');
    cy.get(PageAction.CampaignFilterPage().client)
      .should('contain', 'All');

    cy.get(PageAction.CampaignFilterPage().clearAllBtn)
      .should('be.disabled');

    cy.get(PageAction.CampaignFilterPage().cancelBtn)
      .should('not.be.disabled');

    cy.get(PageAction.CampaignFilterPage().applyBtn)
      .should('not.be.disabled');

    cy.get(PageAction.CampaignFilterPage().applyBtn)
      .click();
    // })

  });
});
