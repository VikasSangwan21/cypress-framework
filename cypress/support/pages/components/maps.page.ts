
import { Component } from '../../helpers/component';
import { verify } from 'cypress/types/sinon';
import {
  oohMapMarkets,
  oohMapMediaFormat,
  oohMapsMediaOwner,
  oohMapsFrameTypes,
  oohMapsFramesList,
  oohMapsCampaignCreate,
  oohMapsInventoryRFP
} from './../../../fixtures/ooh/maps';

export class MapsPage {

  pageName = 'MapsPage';
  url = 'ooh/discover';
  marketsGetApiUrl = '**/shell/v1.0/api/markets/**';
  campaignPostApiUrl = '**/ooh/v1.0/api/campaigns';
  campaignGetApiUrl = '**/ooh/v1.0/api/campaigns/74c62f6b-6077-465c-9d9a-033b9c34aa63**';
  inventoryPutApiUrl =' **/ooh/v1.0/api/campaigns/74c62f6b-6077-465c-9d9a-033b9c34aa63/inventoryRfp';
  inventoryGetApiUrl =' **/ooh/v1.0/api/campaigns/74c62f6b-6077-465c-9d9a-033b9c34aa63/inventoryRfp**';
  mediaOwnerMapGetApiUrl = '**/ooh/v1.0/api/mediaOwner';
  framesListGetApiUrl = '**/ooh/v1.0/api/frames?**';
  mediaFormatMapGetApiUrl = '**/ooh/v1.0/api/frames/configs/mediaformats**';
  frameTypesMapGetApiUrl = '**/ooh/v1.0//api/frames/configs/frameTypes**';

  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

   // Mocks
  loadMapsWithData() {
    cy.intercept(
      'GET', this.marketsGetApiUrl,
      { body: oohMapMarkets }
    ).as('loadMapsWithData');
    return this;
  }

  loadMediaOwnersWithData() {
    cy.intercept(
      'GET', this.mediaOwnerMapGetApiUrl,
      'fx:ooh/maps/mediaOwner.json'
    ).as('loadMediaOwnersWithData');
  }

  loadMediaFormatMap() {
    cy.intercept(
      'GET', this.mediaFormatMapGetApiUrl,
      { body: oohMapMediaFormat }
    ).as('loadMediaFormatMap');
    return this;
  }

  loadMediaOwnersMap() {
    cy.intercept(
      'GET', this.mediaOwnerMapGetApiUrl,
      { body: oohMapsMediaOwner }
    ).as('loadMediaOwnersMap');
    return this;
  }

  loadFrameTypesMap() {
    cy.intercept(
      'GET', this.frameTypesMapGetApiUrl,
      { body: oohMapsFrameTypes }
    ).as('loadFrameTypesMap');
    return this;
  }

  loadFramesListWithData() {
    cy.intercept(
      'GET', this.framesListGetApiUrl,
      { body: oohMapsFramesList }
    ).as('loadMediaOwnersWithData');
    return this;
  }

  createCampaignfromMap() {
    cy.intercept(
      'POST', this.campaignPostApiUrl,
      { body: oohMapsCampaignCreate }
    ).as('createCampaignfromMap');
    return this;
  }

  createInventoryfromMap() {
    cy.intercept(
      'PUT', this.inventoryPutApiUrl,
      { body: oohMapsInventoryRFP }
    ).as('createInventoryfromMap');
    return this;
  }

  getCampaignEditData() {
    cy.intercept(
      'GET', this.campaignGetApiUrl,
      { body: oohMapsCampaignCreate }
    ).as('getCampaignEditData');
    return this;
  }

  getInventoryfromMap() {
    cy.intercept(
      'GET', this.inventoryGetApiUrl,
      { body: oohMapsInventoryRFP }
    ).as('getInventoryfromMap');
    return this;
  }
}
