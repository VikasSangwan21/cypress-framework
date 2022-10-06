import { contains } from 'cypress/types/jquery';
import { PageAction } from '../../../../support/PageAction';
import 'cypress-file-upload';
import { keys } from 'cypress/types/lodash';

let epicName = 'Sandbox Create';
let featureName = 'Sandbox Create Page';
let tag = '';

let testDataPath = '';
let fileNameUnits: string[] = [];
let fileNamePOI: string[] = [];
let sandboxName = '';
let sandboxList: string[] = [];

describe(featureName, () => {

    beforeEach(() => {
        Report.testDetails(epicName, featureName, tag);

        cy.loginAsPlanner();
        sandboxName = `e2e test - ${PageAction.campaignCreatePage().campaignNameSuffix()}`;
        sandboxList.push(sandboxName);
    });

    it('read sandbox configuration file', () => {
        cy.fixture('ooh/campaigns/sandbox_config.json').then((config) => {
            testDataPath = config.testDataPath;
            fileNameUnits = config.fileNameUnits;
            fileNamePOI = config.fileNamePOI;
        })
    })

    it('Create sandbox with units and POIs', () => {
        cy.get('.dropdown__head__content__title').click();
        cy.get('[href="#/ooh/campaign-mapping"]').click().wait(2000);

        cy.get('.cad-button').should('not.be.disabled')
        cy.get('.cad-button').click();

        //Units process
        cy.get('[value="Frames"] > .button-toggle').should('not.be.disabled');
        cy.get('[value="Frames"] > .button-toggle').click();

        cy.get('.uploader > .title_2').should('contain', 'Drop your file here')
        cy.get('.title_6').should('contain', 'Supported file formats: .xls,.xlsx,.csv');
        cy.get('.mt-5').should('contain', 'Template (campaign-mapping-template.xls)');

        cy.get(PageAction.SandboxCreatePage().uploader).should('not.be.disabled');

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('be.disabled');

        //import units from file
        for (var i = 0; i < 1; i++) {
            const yourFixturePath = testDataPath + fileNameUnits[i];
            cy.get("input[type='file']").attachFile(yourFixturePath).wait(2000);
        }

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');

        cy.get('.poi-imported__header-title-count')
            .then(($span) => {
                var count = $span.text().trim();
                cy.wrap(parseInt(count)).should('be.gt', 0)
                cy.get('.poi-imported__table__body').find('tr').should('have.length', count);
            });

        cy.get('.cad-link').should('not.be.disabled');

        for (var j = 1; j <= 1; j++) {
            const yourFixturePath = testDataPath + fileNameUnits[j];
            cy.get("input[type='file']").attachFile(yourFixturePath).wait(2000);
        }

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');

        cy.get('.poi-imported__header-title-count').wait(2000)
            .then(($span) => {
                var count = $span.text().trim();
                cy.wrap(parseInt(count)).should('be.gt', 0)
                cy.get('.poi-imported__table__body').find('tr').should('have.length', count);
            });

        //POI process
        cy.get('[value="POI"] > .button-toggle').should('not.be.disabled');
        cy.get('[value="POI"] > .button-toggle').click();

        cy.get('.uploader > .title_2').should('contain', 'Drop your file here')
        cy.get('.title_6').should('contain', 'Supported file formats: .xls,.xlsx,.csv');
        cy.get('.mt-5').should('contain', 'Template (poi-template.xls)');

        cy.get(PageAction.SandboxCreatePage().uploader).should('not.be.disabled');

        //import POI from file
        for (var k = 0; k < 1; k++) {
            const yourFixturePath = testDataPath + fileNamePOI[k];
            cy.get("input[type='file']").attachFile(yourFixturePath).wait(2000);
        }

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');

        cy.get('.poi-imported__header-title-count')
            .then(($span) => {
                var count = $span.text().trim();
                cy.wrap(parseInt(count)).should('be.gt', 0)
                cy.get('.poi-imported__table__body').find('tr').should('have.length', count);
            });

        cy.get('.cad-link').should('not.be.disabled');

        for (var l = 1; l <= 1; l++) {
            const yourFixturePath = testDataPath + fileNamePOI[l];
            cy.get("input[type='file']").attachFile(yourFixturePath).wait(2000);
        }

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');

        cy.get('.poi-imported__header-title-count').wait(2000)
            .then(($span) => {
                var count = $span.text().trim();
                cy.wrap(parseInt(count)).should('be.gt', 0)
                cy.get('.poi-imported__table__body').find('tr').should('have.length', count);
            });

        //save imported units and POI
        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).click().wait(2000);

        cy.get(PageAction.SandboxCreatePage().cancelBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().submitBtn).should('be.disabled');

        cy.get('.mb-10 > .input').type(sandboxList[0]);

        cy.get(PageAction.SandboxCreatePage().cancelBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().submitBtn).should('be.disabled');

        cy.get(PageAction.SandboxCreatePage().clientDdl).click();
        cy.get('.cad-search > .cad-search__input > .ng-untouched').type('Starbucks Corporation').wait(1000)
        // cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').click();
        cy.get('.list-item').click()
        cy.get(PageAction.SandboxCreatePage().clientDdl).click();

        cy.get(PageAction.SandboxCreatePage().cancelBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().submitBtn).should('not.be.disabled');

        cy.get(PageAction.SandboxCreatePage().submitBtn).click().wait(2000);

        cy.get('.cad-toast__title').should('contain', 'Campaign Mapping Saved');
    })

    it('Create sandbox with units', () => {
        cy.get('.dropdown__head__content__title').click();
        cy.get('[href="#/ooh/campaign-mapping"]').click().wait(2000);

        cy.get('.cad-button').should('not.be.disabled')
        cy.get('.cad-button').click();

        //Units process
        cy.get('[value="Frames"] > .button-toggle').should('not.be.disabled');
        cy.get('[value="Frames"] > .button-toggle').click();

        cy.get('.uploader > .title_2').should('contain', 'Drop your file here')
        cy.get('.title_6').should('contain', 'Supported file formats: .xls,.xlsx,.csv');
        cy.get('.mt-5').should('contain', 'Template (campaign-mapping-template.xls)');

        cy.get(PageAction.SandboxCreatePage().uploader).should('not.be.disabled');

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('be.disabled');

        //import units from file
        for (var i = 1; i < 2; i++) {
            const yourFixturePath = testDataPath + fileNameUnits[i];
            cy.get("input[type='file']").attachFile(yourFixturePath).wait(2000);
        }

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');

        cy.get('.poi-imported__header-title-count')
            .then(($span) => {
                var count = $span.text().trim();
                cy.wrap(parseInt(count)).should('be.gt', 0)
                cy.get('.poi-imported__table__body').find('tr').should('have.length', count);
            });

        cy.get('.cad-link').should('not.be.disabled');

        for (var j = 2; j <= 2; j++) {
            const yourFixturePath = testDataPath + fileNameUnits[j];
            cy.get("input[type='file']").attachFile(yourFixturePath).wait(2000);
        }

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');

        cy.get('.poi-imported__header-title-count').wait(2000)
            .then(($span) => {
                var count = $span.text().trim();
                cy.wrap(parseInt(count)).should('be.gt', 0)
                cy.get('.poi-imported__table__body').find('tr').should('have.length', count);
            });

        //save imported units and POI
        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).click().wait(2000);

        cy.get(PageAction.SandboxCreatePage().cancelBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().submitBtn).should('be.disabled');

        cy.get('.mb-10 > .input').type(sandboxList[1]);

        cy.get(PageAction.SandboxCreatePage().cancelBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().submitBtn).should('be.disabled');

        cy.get(PageAction.SandboxCreatePage().clientDdl).click();
        cy.get('.cad-search > .cad-search__input > .ng-untouched').type('Starbucks Corporation').wait(1000)
        // cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').click();
        cy.get('.list-item').click()
        cy.get(PageAction.SandboxCreatePage().clientDdl).click();

        cy.get(PageAction.SandboxCreatePage().cancelBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().submitBtn).should('not.be.disabled');

        cy.get(PageAction.SandboxCreatePage().submitBtn).click().wait(2000);

        cy.get('.cad-toast__title').should('contain', 'Campaign Mapping Saved');
    })

    it('Create sandbox with POI', () => {
        cy.get('.dropdown__head__content__title').click();
        cy.get('[href="#/ooh/campaign-mapping"]').click().wait(2000);

        cy.get('.cad-button').should('not.be.disabled')
        cy.get('.cad-button').click();

        //POI process
        cy.get('[value="POI"] > .button-toggle').should('not.be.disabled');
        cy.get('[value="POI"] > .button-toggle').click();

        cy.get('.uploader > .title_2').should('contain', 'Drop your file here')
        cy.get('.title_6').should('contain', 'Supported file formats: .xls,.xlsx,.csv');
        cy.get('.mt-5').should('contain', 'Template (poi-template.xls)');

        cy.get(PageAction.SandboxCreatePage().uploader).should('not.be.disabled');

        //import POI from file
        for (var k = 1; k < 2; k++) {
            const yourFixturePath = testDataPath + fileNamePOI[k];
            cy.get("input[type='file']").attachFile(yourFixturePath).wait(2000);
        }

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');

        cy.get('.poi-imported__header-title-count')
            .then(($span) => {
                var count = $span.text().trim();
                cy.wrap(parseInt(count)).should('be.gt', 0)
                cy.get('.poi-imported__table__body').find('tr').should('have.length', count);
            });

        cy.get('.cad-link').should('not.be.disabled');

        for (var l = 2; l <= 2; l++) {
            const yourFixturePath = testDataPath + fileNamePOI[l];
            cy.get("input[type='file']").attachFile(yourFixturePath).wait(2000);
        }

        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');

        cy.get('.poi-imported__header-title-count').wait(2000)
            .then(($span) => {
                var count = $span.text().trim();
                cy.wrap(parseInt(count)).should('be.gt', 0)
                cy.get('.poi-imported__table__body').find('tr').should('have.length', count);
            });

        //save imported units and POI
        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().saveSandboxBtn).click().wait(2000);

        cy.get(PageAction.SandboxCreatePage().cancelBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().submitBtn).should('be.disabled');

        cy.get('.mb-10 > .input').type(sandboxList[2]);

        cy.get(PageAction.SandboxCreatePage().cancelBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().submitBtn).should('be.disabled');

        cy.get(PageAction.SandboxCreatePage().clientDdl).click();
        cy.get('.cad-search > .cad-search__input > .ng-untouched').type('Starbucks Corporation').wait(1000)
        // cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').click();
        cy.get('.list-item').click()
        cy.get(PageAction.SandboxCreatePage().clientDdl).click();

        cy.get(PageAction.SandboxCreatePage().cancelBtn).should('not.be.disabled');
        cy.get(PageAction.SandboxCreatePage().submitBtn).should('not.be.disabled');

        cy.get(PageAction.SandboxCreatePage().submitBtn).click().wait(2000);

        cy.get('.cad-toast__title').should('contain', 'Campaign Mapping Saved');
    })

});
