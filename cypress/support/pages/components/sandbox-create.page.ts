import { Component } from '../../helpers/component';
import { verify } from 'cypress/types/sinon';

export class SandboxCreatePage {
    pageName = 'SandboxCreatePage';
    url = 'ooh/campaign-mapping/';
    // url = 'ooh/campaign/';

    uploader = '.uploader > :nth-child(3) > cad-button > .cad-button';
    saveSandboxBtn = '.ooh-header--right > cad-button > .cad-button';
    cancelBtn = '[data-automation="ooh-map-sandbox-modal_cancel"] > .cad-button';
    submitBtn = '[data-automation="ooh-map-sandbox-modal_submit"] > .cad-button';
    clientDdl = '[data-automation="ooh-map-sandbox-client"]';
    search = '[data-automation="ooh-sandbox-map-typeahead"]';

    visit() {
        Report.Step(this.pageName);
        cy.visit(this.url);
        return this;
    }
}
