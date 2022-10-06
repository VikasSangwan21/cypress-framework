import { PageAction } from '../../../support/PageAction';
import { start } from 'repl';
import { campaigns, filterContent } from '../../../fixtures/ooh/campaigns/';

export class CampaignSortPage {
  pageName = 'CampaignSortResult';
  url = 'ooh/campaign';
  campaignsGetApiUrl = '**/ooh/v1.0/api/campaigns?*';

  // DATA AUTOMATION TAGS
  filterBtn = '[data-automation="smart-filter-open-button"] :button';

  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

  // Mocks
  loadCampaignsWithFilterData() {
    cy.intercept(
      'GET', this.campaignsGetApiUrl,
      { body: filterContent }
    ).as('loadCampaignsWithFilterData');
    return this;
  }

  loadCampaignsWithData() {
    cy.intercept(
      'GET', this.campaignsGetApiUrl,
      { body: campaigns }
    ).as('loadCampaignsWithData');
    return this;
  }

  loadCampaignsWithEmptyData() {
    cy.intercept(
      'GET', this.campaignsGetApiUrl,
      { 'content': [] }
    ).as('loadCampaignsEmptyData');
    return this;
  }
}
