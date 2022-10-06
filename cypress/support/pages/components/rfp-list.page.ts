import { oohRfpDetails, oohRfp, oohRfpDetailsPackage } from '../../../fixtures/ooh/rfp';
import { oohCampaignsRfp } from '../../../fixtures/ooh/campaigns';

export class RfpListPage {
  pageName = 'RfpListPage';
  url = 'ooh/rfp';

  nextPage = '[data-automation="cad-pagination__btn_next"]';
  viewResponse = '[data-automation="ooh-rfp-list-view-response"]';
  rfpStatus = '[data-automation="ooh-mediaowner-status"]';
  rfpName = '[data-automation="ooh-rfp-list--name"]';
  locationList = '[data-automation="global-filter-market-item"]';
  locationNavBar = '[data-automation="markets-filter-dropdown-title"]';
  searchLocation = 'div.cad-search__input input';
  location = 'div.list-item__market';
  locationApply = '[data-automation="cad-button"]';
  pageTitle = '.global-links > .title';
  noOfPages = '[data-automation="cad-pagination_total_pages"]';
  campaignName = '[data-automation="ooh-rfp-list--name"]';
  nextPageArrow = 'cad-pagination__btn_next';
  searchIcon = '[name="search"]';
  searchCampaign = 'cad-search-global__input';
  rfpListStatus = '.cad-status__text';
  expandDetails = '.icon.icon-arrow-right ';
  campaignStatus =':nth-child(1) > ooh-status > .status > .cad-status__text';
  campaignMO = '[data-automation="ooh-proposal-mediaOwnerName"]';
  campaignEmail = '[data-automation="ooh-proposal-list-mediaOwnerEmail"] > div';
  CampaignProposedUnits = '[data-automation="ooh-proposal-FrameCount"]';
  CampaignCost = '[data-automation="ooh-proposal-cost"]';
  viewResponseLink = '.cad-link__text';

  rfpListGetApiUrl = '**/ooh/v1.0/api/rfp/?*';
  rfpCampaignListGetApiUrl = '**/ooh/v1.0/api/campaigns?*';
  rfpDetailsGetApiUrl = '**/ooh/v1.0/api/rfp/*';
  rfpDetailsPackageGetApiUrl = '**/ooh/v1.0/api/rfp-items/*/package?*';

  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

  loadCampaignRFP() {
    cy.intercept('GET', this.rfpCampaignListGetApiUrl, {
      body: oohCampaignsRfp,
    }).as('loadCampaignRFP');
    return this;
  }

  loadListRFP() {
    cy.intercept('GET', this.rfpListGetApiUrl, {
      body: oohRfp,
    }).as('loadListRFP');
    return this;
  }

  loadDetailsRFP() {
    cy.intercept('GET', this.rfpDetailsGetApiUrl, {
      body: oohRfpDetails,
    }).as('loadDetailsRFP');
    return this;
  }

  loadPackageDetailsRFP() {
    cy.intercept('GET', this.rfpDetailsPackageGetApiUrl, {
      body: oohRfpDetailsPackage
    }).as('loadPackageDetailsRFP');
    return this;
  }

  changeLocation(location: string) {
    cy.get(this.locationNavBar).click();
    cy.get(this.locationList).click();
    cy.get(this.searchLocation).type(location);
    cy.wait(1000);
    cy.get(this.location).eq(0).click();
    cy.get(this.locationApply).eq(1).click();
  }

  getNavBarTitle() {
    return cy.get(this.pageTitle);
  }
/*
  searchAndSelectRfp1(campaignName: string) {
    cy.get(this.noOfPages).invoke('text').then((text) => {
      let campFound = 0;
       for(let i=1; i<=Number(text.trim()); i++) {

          cy.get(this.campaignName).each($ele => {
            if ($ele.text() === campaignName) {
              campFound = campFound+1;
              cy.log(campFound.toString());
              cy.contains(campaignName).click();
              return false;
            }
          });
          
          cy.log(campFound.toString());
          cy.getByDataAutomation(this.nextPageArrow).click();
      }
    })
  }*/

  searchAndSelectRfp(campaignName: string) {
    cy.get(this.searchIcon).click();
    cy.getByDataAutomation(this.searchCampaign).type(campaignName).wait(1000);
    cy.contains(campaignName).click();
  }

}
