import { fail } from 'assert';
import { first } from 'cypress/types/lodash';
import { FORMERR } from 'dns';
import { exists } from 'fs';
import { PageAction } from '../../../support/PageAction';

// let templates: any[] = [];
let clientSpotify: string = "Spotify";
let clientDefault: string = "Default";
let clientCoke: string = "CocaCola";
// let Client: string[] = ["Spotify", "ABC", "Coca Cola"];
let customColumns: string[] = [];
let campaignList: string[] = [];
let loopCount: number = 5;

let epicName = 'Campaigns List';
let featureName = 'Campaigns List Page';
let tag = '';


describe(featureName, () => {
  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
    cy.loginAsPlannerStub();

    cy.exec('npm cache clear --force');

    PageAction.campaignPage()
      .loadCampaignsWithData()
      .loadCampaignResponse()
      .visit();
  });

  // it('Should load campaign page with empty campaign list', () => {
  //   PageAction.campaignPage()
  //     .loadCampaignsWithEmptyData()
  //     .visit();
  //   cy.get('.ooh-header__total-count').should('contain', 'Total');
  // });

  it('Should load campaign list with data', () => {
    PageAction.campaignPage()
      .selectMyCampaignFilter();

    cy.get('campaign-list table :nth-child(2) > tr > .table__col-160 > .title').should('contain', 'Spotify Test');
    cy.get('.ooh-header__total-count').should('contain', 'Total 21');
  });

  it('Search campaign by name and load result', () => {
    cy.get('cad-icon.icon-search > .icon').click();
    cy.get(PageAction.campaignPage().SearchCampaign).type('Demo Lamar - Nationwide');

    PageAction.campaignPage()
      .loadCampaignsWithSearchData();

    cy.get('.table__col-160 > .title').should('contain', 'Demo Lamar - Nationwide');

  });

  it('Should show status "Proposal Received" for campaign response(s) - Spotify', () => {
    // cy.pause();
    PageAction.ViewResponsePage()
      .loadProposalCampaignData()
      .loadProposalCustomFrameHeaderspotifyData()
      .loadProposalFramesSpotifyData()
      .loadProposalRFPData()
      .loadProposalRFPPackageData()
      .loadProposalRFPMediaOwnerData()
      .loadProposalRFPMarketRegionData()
      .loadProposalRFPPackageTypeData()
      .loadProposalCampaignFacingData()
      .loadProposalCampaignMediaOwnerData()
      .loadProposalCampaignMediaFormatData();
    // custom columns from configuration
    cy.fixture('ooh/campaigns/custom_template.json').then((templates) => {
      cy.log("fixture - " + 'fixture')
      templates = JSON.stringify(templates);
      const jsonData = JSON.parse(templates);
      campaignList = jsonData.CampaignList['CampaignNames'];

      cy.get(PageAction.campaignPage().responseAccordionBtn).eq(0).click();
      cy.get(PageAction.campaignPage().campaignStatus).eq(0).contains('Proposal Received').should('exist');
      // .then(() => {

      cy.get(PageAction.campaignPage().frameCount).eq(0).should('have.length.greaterThan', 0);
      cy.get(PageAction.campaignPage().proposalStatus).eq(0).should('have.text', ' Proposal Received ');

      cy.get(PageAction.campaignPage().viewResponse).eq(0).click().wait(1000);
      cy.get(PageAction.campaignPage().proposalStatusView).should('contain', 'Proposal Received');

      customColumns = jsonData.Templates[clientSpotify]
      let scrollRight: number = 6000;

      //When it loop 2nd time we are getting error like Cannot read property 'length' of undefined 
      cy.get(PageAction.campaignPage().unitsSort).click().wait(1000)
      for (var j = 0; j <= (customColumns.length - 1); j++) {
        // cy.log('customColumns -', customColumns[j])
        scrollRight = (scrollRight) + parseInt("180")
        if (j == 0) {
          if (cy.get(PageAction.campaignPage().headers + "[aria-colindex=" + (j + 39) + "]").should('not.exist')) {
            
            let scroll: any = scrollRight + 'px';
            cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll);
          }
        }
        else {
          let scroll: any = scrollRight + 'px';
          cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll).waitUntil(() => {
            return cy.get('.ag-pinned-left-header > .ag-header-row > .ag-header-cell > .ag-cell-label-container > .ag-header-cell-label').should('exist');
          }).then(() => {
            // 
          });
        }

        cy.get(PageAction.campaignPage().headers + "[aria-colindex=" + (j + 39) + "]")
          .should('be.visible')
          .should('contain', customColumns[j]);

        for (var z = 0; z < loopCount; z++) {
          cy.log(customColumns[j])
          cy.get('[row-index=' + z + '] > [aria-colindex=' + (j + 39) + ']')
            .should('be.visible')
            // cy.log('contain', 'Row' + (z + 1) + '_Column' + (j + 1))
            .should('contain', 'Row' + (z + 1) + '_Column' + (j + 1))
        }
      }

      cy.get(PageAction.campaignPage().proposalUnitsCount).wait(1000)
        .then(($span) => {
          var count = $span.text().trim();
          cy.wrap(parseInt(count)).should('be.gt', 0)
          if (parseInt(count) > 10)
            cy.get(PageAction.campaignPage().nextPage).should('not.be.disabled');
          else
            cy.get(PageAction.campaignPage().UnitsRowCount).should('have.length', count);
        });

      cy.get(PageAction.campaignPage().backBtnCampList).click();

    })
    // cy.scrollTo('top');

    // cy.get(':nth-child(2) > .three-dots > ooh-status > div.status_proposal_received').first().should('exist');
    // });
  });

  it('Should show status "Proposal Received" for campaign response(s) - Default', () => {

    PageAction.ViewResponsePage()
      .loadProposalCampaignData()
      .loadProposalCustomFrameHeaderDefaultData()
      .loadProposalFramesDefaultData()
      .loadProposalRFPData()
      .loadProposalRFPPackageData()
      .loadProposalRFPMediaOwnerData()
      .loadProposalRFPMarketRegionData()
      .loadProposalRFPPackageTypeData()
      .loadProposalCampaignFacingData()
      .loadProposalCampaignMediaOwnerData()
      .loadProposalCampaignMediaFormatData();

    // custom columns from configuration
    cy.fixture('ooh/campaigns/custom_template.json').then((templates) => {
      cy.log("fixture - " + 'fixture')
      templates = JSON.stringify(templates);
      const jsonData = JSON.parse(templates);
      campaignList = jsonData.CampaignList['CampaignNames'];

      cy.get(PageAction.campaignPage().responseAccordionBtn).eq(1).click();
      cy.get(PageAction.campaignPage().campaignStatus).eq(1).contains('Proposal Received').should('exist')//.then(condition => {

      cy.get(PageAction.campaignPage().frameCount).eq(0).should('have.length.greaterThan', 0);
      cy.get(PageAction.campaignPage().proposalStatus).eq(0).should('have.text', ' Proposal Received ');

      cy.get(PageAction.campaignPage().viewResponse).eq(0).click();
      cy.get(PageAction.campaignPage().proposalStatusView).should('contain', 'Proposal Received');

      customColumns = jsonData.Templates[clientDefault]
      let scrollRight: number = 6000;

      //When it loop 2nd time we are getting error like Cannot read property 'length' of undefined 
      cy.get(PageAction.campaignPage().unitsSort).click().wait(1000)
      for (var j = 0; j <= (customColumns.length - 1); j++) {
        // cy.log('customColumns -', customColumns[j])
        scrollRight = (scrollRight) + parseInt("160")
        if (j == 0) {
          if (cy.get(PageAction.campaignPage().headers + "[aria-colindex=" + (j + 39) + "]").should('not.exist')) {
            let scroll: any = scrollRight + 'px';
            cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll);
          }
        }
        else {
          let scroll: any = scrollRight + 'px';
          cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll);
        }

        cy.get(PageAction.campaignPage().headers + "[aria-colindex=" + (j + 39) + "]")
          .should('be.visible')
          .should('contain', customColumns[j]);

        for (var z = 0; z < loopCount; z++) {
          cy.get('[row-index=' + z + '] > [aria-colindex=' + (j + 39) + ']')
            .should('be.visible')
            // cy.log('contain', 'Row' + (z + 1) + '_Column' + (j + 1))
            .should('contain', 'Row' + (z + 1) + '_Column' + (j + 1))
        }
      }

      cy.get(PageAction.campaignPage().proposalUnitsCount).wait(1000)
        .then(($span) => {
          var count = $span.text().trim();
          cy.wrap(parseInt(count)).should('be.gt', 0)
          if (parseInt(count) > 10)
            cy.get(PageAction.campaignPage().nextPage).should('not.be.disabled');
          else
            cy.get(PageAction.campaignPage().UnitsRowCount).should('have.length', count);

        });

      cy.get(PageAction.campaignPage().backBtnCampList).click();

    })
    // cy.scrollTo('top');

    // cy.get(':nth-child(2) > .three-dots > ooh-status > div.status_proposal_received').first().should('exist');

  });

  it('Should show status "Proposal Received" for campaign response(s) - Coke', () => {

    PageAction.ViewResponsePage()
      .loadProposalCampaignData()
      .loadProposalCustomFrameHeaderCokeData()
      .loadProposalFramesCokeData()
      .loadProposalRFPData()
      .loadProposalRFPPackageData()
      .loadProposalRFPMediaOwnerData()
      .loadProposalRFPMarketRegionData()
      .loadProposalRFPPackageTypeData()
      .loadProposalCampaignFacingData()
      .loadProposalCampaignMediaOwnerData()
      .loadProposalCampaignMediaFormatData();

    // custom columns from configuration
    cy.fixture('ooh/campaigns/custom_template.json').then((templates) => {
      cy.log("fixture - " + 'fixture')
      templates = JSON.stringify(templates);
      const jsonData = JSON.parse(templates);
      campaignList = jsonData.CampaignList['CampaignNames'];

      cy.get(PageAction.campaignPage().responseAccordionBtn).eq(2).click();
      cy.get(PageAction.campaignPage().campaignStatus).eq(2).contains('Proposal Received').should('exist')//.then(condition => {

      cy.get(PageAction.campaignPage().frameCount).eq(0).should('have.length.greaterThan', 0);
      cy.get(PageAction.campaignPage().proposalStatus).eq(0).should('have.text', ' Proposal Received ');

      cy.get(PageAction.campaignPage().viewResponse).eq(0).click();
      cy.get(PageAction.campaignPage().proposalStatusView).should('contain', 'Proposal Received');

      customColumns = jsonData.Templates[clientCoke]
      let scrollRight: number = 6000;

      //When it loop 2nd time we are getting error like Cannot read property 'length' of undefined 
      cy.get(PageAction.campaignPage().unitsSort).click().wait(1000)
      for (var j = 0; j <= (customColumns.length - 1); j++) {
        // cy.log('customColumns -', customColumns[j])
        scrollRight = (scrollRight) + parseInt("120")
        if (j == 0) {
          if (cy.get(PageAction.campaignPage().headers + "[aria-colindex=" + (j + 39) + "]").should('not.exist')) {
            let scroll: any = scrollRight + 'px';
            cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll);
          }
        }
        else {
          let scroll: any = scrollRight + 'px';
          cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll);
        }

        cy.get(PageAction.campaignPage().headers + "[aria-colindex=" + (j + 39) + "]")
          .should('be.visible')
          .should('contain', customColumns[j]);

        for (var z = 0; z < loopCount; z++) {
          cy.get('[row-index=' + z + '] > [aria-colindex=' + (j + 39) + ']')
            .should('be.visible')
            // cy.log('contain', 'Row' + (z + 1) + '_Column' + (j + 1))
            .should('contain', 'Row' + (z + 1) + '_Column' + (j + 1))
        }
      }

      cy.get(PageAction.campaignPage().proposalUnitsCount).wait(1000)
        .then(($span) => {
          var count = $span.text().trim();
          cy.wrap(parseInt(count)).should('be.gt', 0)
          if (parseInt(count) > 10)
            cy.get(PageAction.campaignPage().nextPage).should('not.be.disabled');
          else
            cy.get(PageAction.campaignPage().UnitsRowCount).should('have.length', count);

        });

      cy.get(PageAction.campaignPage().backBtnCampList).click();

    })
    // cy.scrollTo('top');

    // cy.get(':nth-child(2) > .three-dots > ooh-status > div.status_proposal_received').first().should('exist');

  });

  it('Should show list of campaign response(s)', () => {
    PageAction.campaignPage()
      .loadCampaignsWithData()
      .loadCampaignResponse()
      .visit();

    cy.get(PageAction.campaignPage().responseAccordionBtn).first().click();

    cy.get(PageAction.campaignPage().viewResponse).click();
  });

});
