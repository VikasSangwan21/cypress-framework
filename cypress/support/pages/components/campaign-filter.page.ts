import { Component } from '../../helpers/component';
import { verify } from 'cypress/types/sinon';
import { DropDownWithSmartSearch } from '../../helpers';
import { campaigns, filterContent, filterClient } from '../../../fixtures/ooh/campaigns';

export class CampaignFilterPage {
  pageName = 'CampaignFilterResult';
  url = 'ooh/campaign';
  campaignsGetApiUrl = '**/ooh/v1.0/api/campaigns?*';
  campaignsFilteredGetApiUrl = '**/ooh/v1.0/api/campaigns?*statuses=DRAFT*';
  campaignsFilteredClientApiUrl = '**/ooh/v1.0/api/clients?sort=name,asc&page=0&size=20&name=Amazon.com,%20Inc.&markets=';

  ooh_campaign_filter_status = 'ooh-campaign-filter-status';
  ooh_campaign_filter_client = 'ooh-campaign-filter-client';

  dropdownSmartSearch = new DropDownWithSmartSearch();

  // DATA AUTOMATION TAGS
  filterBtn = '[data-automation="smart-filter-open-button"] :button';

  campaignDateFromStart = '[data-automation="ooh-filter-date-range-from-start"]';
  campaignDateFromStartInput = 'cad-datepicker[data-automation="ooh-filter-date-range-from-start"] > div > cad-dropdown > div > div > div > div > div > input';

  campaignDateToStart = '[data-automation="ooh-filter-date-range-to-start"]';
  campaignDateToStartInput = 'cad-datepicker[data-automation="ooh-filter-date-range-to-start"] > div > cad-dropdown > div > div > div > div > div > input';


  campaignDateFromEnd = '[data-automation="ooh-filter-date-range-from-end"]';
  campaignDateFromEndInput = 'cad-datepicker[data-automation="ooh-filter-date-range-from-end"] > div > cad-dropdown > div > div > div > div > div > input';

  campaignDateToEnd = '[data-automation="ooh-filter-date-range-to-end"]';
  campaignDateToEndInput = 'cad-datepicker[data-automation="ooh-filter-date-range-to-end"] > div > cad-dropdown > div > div > div > div > div > input';

  statusApplyBtn = 'ooh-campaign-status-filter > cad-dropdown > div > div > div > div > div > div > cad-button > button.cad-button--primary'
  statusClearAllBtn = 'ooh-campaign-status-filter > cad-dropdown > div > div > div > div > div > div > cad-button > button.cad-button--secondary'

  clientApplyBtn = 'ooh-client-filter > cad-dropdown > div > div > div > div > div > div > cad-button > button.cad-button--primary';
  clientClearAllBtn = 'ooh-client-filter > cad-dropdown > div > div > div > div > div > div > cad-button > button.cad-button--secondary'

  status = '[data-automation="ooh-campaign-filter-status"]';
  client = '[data-automation="ooh-campaign-filter-client"]';
  mediaOwner = '[data-automation="ooh-proposal-mediaOwnerName"]';

  statusCol = '[data-automation="ooh-campaign-list-status"]';

  clearAllBtn = '[data-automation="filter_group_clear_all"] :button';
  cancelBtn = '[data-automation="filter_group_cancel"] :button'
  applyBtn = '[data-automation="filter_group_apply"] :button';
  total = '[data-automation="total"]';

  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

  selectStatus(value: string) {
    Component.DropDown('[data-automation="ooh-campaign-filter-status"]').selectOptionByLabel(value);
    return this;
  }

  selectClient(value: string) {
    Component.DropDown('[data-automation="ooh-campaign-filter-client"]').selectOptionByLabel(value);
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

  loadCampaignsWithFilteredData() {
    cy.intercept(
      'GET', this.campaignsFilteredGetApiUrl,
      { 'content': filterContent }
    ).as('loadCampaignsWithFilteredData');
    return this;
  }


  loadCampaignsFilteredClientData() {
    cy.intercept(
      'GET', this.campaignsFilteredClientApiUrl,
      { 'content': filterClient }
    ).as('loadCampaignsWithFilteredData');
    return this;
  }

  selectFilterStatus(option: string) {
    this.dropdownSmartSearch.selectOption(`[data-automation="${this.ooh_campaign_filter_status}"]`, option)
    return this;
  }

  selectFilterClient(option: string) {
    this.dropdownSmartSearch.selectOption(`[data-automation="${this.ooh_campaign_filter_client}"]`, option)
    return this;
  }
}
