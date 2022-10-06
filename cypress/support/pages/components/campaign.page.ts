import { Component } from '../../helpers/component';
import { campaigns, campaignSearch, proposal } from '../../../fixtures/ooh/campaigns/';

export class CampaignPage {
  pageName = 'CampaignPage';
  url = 'ooh/campaign';
  campaignsGetApiUrl = '**/ooh/v1.0/api/campaigns?name=*';
  campgainsGetResponseApiUrl = '**/ooh/v1.0/api/campaigns/*/proposal*';
  campaignsGetSearchApiUrl = '';
  responseGetApiUrl = '**/ooh/v1.0/api/response?*';

  // DATA AUTOMATION TAGS
  SearchCampaign = 'input[data-automation="cad-search-global__input"]';
  responseAccordionBtn = 'button[data-automation="ooh-proposal-accordion-btn"]';
  viewResponse = '[data-automation="cad-link"]';
  frameCount = '[data-automation="ooh-proposal-FrameCount"]';
  campaignStatus = 'ooh-status[data-automation="ooh-campaign-list-status"]';
  proposalStatus = 'ooh-status[data-automation="ooh-proposal-status"]';
  client = '[data-automation="ooh-campaign-list-advertiser"]';
  proposalStatusView = '.cad-status__text';
  proposalUnitsCount = '[data-automation="ooh-proposal-frames-table_data"] .frames__body__header .frames__body__header-title > span';
  unitsSort = '.ag-pinned-left-header > .ag-header-row > .ag-header-cell > .ag-cell-label-container > .ag-header-cell-label';
  headers = ' > .ag-cell-label-container > .ag-header-cell-label > .ag-header-cell-text';
  nextPage = '[data-automation="cad-pagination__btn_next"]';
  prevPage = '[data-automation="cad-pagination__btn_prev"]';
  UnitsRowCount = `[data-automation="rfp-proposal__body__sections__section-table"] > ag-grid-angular 
    > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper 
    > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`
  agGridScroll = `ng-table.ng-star-inserted > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root 
    > .ag-body-horizontal-scroll > .ag-body-horizontal-scroll-viewport`
  agGridVerScorll = `ng-table.ng-star-inserted > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root > .ag-body-viewport`
  backBtnCampList = '[data-automation="ooh-campaign-detail-action-back"] .cad-button'
  campaignTotal = '[data-automation="total"]';
  toggleUI = 'cad-navigation-switch.cad-navigation-header__control > .ng-untouched > .toggle > .toggle__el > small';

  // // HEAD CONTENTS
  // private contentDropDown = '.dropdown__head__content__title'
  // private  discover = '[href="#/ooh/discover"]'

  // selectContentDropDpwn(option: 'discover'|'campaigns'|'campaign mapping') {
  //   cy.get(this.contentDropDown).click();
  //   switch(option) {
  //     case 'discover':
  //       cy.get(this.discover).click().wait(1000);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // HEAD CONTENTS
  private contentDropDown = '.dropdown__head__content__title'
  private discover = '[href="#/ooh/discover"]'

  selectContentDropDpwn(option: 'discover' | 'campaigns' | 'campaign mapping') {
    cy.get(this.contentDropDown).click();
    switch (option) {
      case 'discover':
        cy.get(this.discover).click().wait(1000);
        break;
      default:
        break;
    }
  }

  clickResponseAccordion(): any {
    cy.get(this.responseAccordionBtn).first().click();
  }

  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

  selectMyCampaignFilter() {
    Component.ButtonToggle('cad-button-toggle-group[data-automation="ooh-campaign-filters-user"]').selectTabByTitle('My Campaigns');
    return this;
  }

  // Mocks
  loadCampaignsWithData() {
    cy.intercept(
      'GET', this.campaignsGetApiUrl,
      { body: campaigns }
    ).as('loadCampaignsWithData');
    return this;
  }

  loadCampaignsWithSearchData() {
    cy.intercept(
      'GET', this.campaignsGetApiUrl,
      { body: campaignSearch }
    ).as('loadCampaignsWithSearchData');
    return this;
  }

  loadCampaignsWithEmptyData() {
    cy.intercept(
      'GET', this.campaignsGetApiUrl,
      { 'content': [] }
    ).as('loadCampaignsEmptyData');
    return this;
  }

  loadCampaignResponse() {
    cy.intercept(
      'GET', this.campgainsGetResponseApiUrl,
      { body: proposal }
    ).as('loadCampaignResponse');
    return this;
  }

}
