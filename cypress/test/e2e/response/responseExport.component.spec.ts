import { PageAction } from '../../../support/PageAction';
import 'cypress-file-upload';
import { first } from 'cypress/types/lodash';

let epicName = 'View Response';
let featureName = 'Export Response Inventory';
let tag = '';

let testDataPath = '';
let campaignName = '';
let loopCount: any;
let mo: string[] = [];
let selectedUnitsBefore: string;
let selectedUnitsAfter: string;

describe(featureName, () => {

    beforeEach(() => {
        Report.testDetails(epicName, featureName, tag);

        cy.fixture('ooh/campaigns/rfp_config.json').then((config) => {
            testDataPath = config.testDataPath;
            // loopCount = config.loopCount;
            loopCount = 1;
            mo = config.mo.slice().sort();
        })

        cy.loginAsPlanner();
        // campaignName = `e2e test - ${PageAction.campaignCreatePage().campaignNameSuffix()}`;
        //campaignName = `e2e test - 08765`;
        campaignName = 'Regression_Release_2.76_001_MK';

        cy.get('cad-icon.icon-search > .icon').wait(2000).click();
        cy.get(PageAction.ViewResponsePage().globalSearch).type(campaignName.toString());

        cy.get("campaign-list.ng-star-inserted > .center").then($body => {
            if ($body.find('tbody.ng-star-inserted').length > 0) {

                cy.get('.table__col-160 > .title').should('contain', campaignName)
                cy.get(':nth-child(6) > ooh-status > .status > .cad-status__text').should('not.contain', 'RFP Sent')
                cy.get(':nth-child(6) > ooh-status > .status > .cad-status__text').should('not.contain', 'Proposal Sent')
                cy.get(PageAction.campaignPage().campaignStatus).should('contain', 'Proposal Received') //Proposal Sent, RFP Sent

                cy.wait(2000).get('.col-05 > .ng-star-inserted').click();
                cy.get('.pd_10_48 > :nth-child(1) > .title').then(($span) => {
                    var count = $span.text().trim();
                    cy.wrap(parseInt(count)).should('be.gte', loopCount)
                    for (var i = 1; i <= loopCount; i++) {
                        const Owner = mo[i - 1].toLowerCase().toString()
                        cy.get(':nth-child(' + i + ') > [data-automation="ooh-proposal-mediaOwnerName"]').then(($span) => {
                            const mOwner = $span.text().trim().toLowerCase().toString();
                            expect(mOwner).to.eq(Owner);
                        });
                    }
                });
                cy.get('.cad-link__text').click().wait(2000);

                cy.get('.cad-status__text').should('contain', 'Proposal Received').wait(4000);
            }
        });
    });

    it('should display Excel and PPT export button', () => {
        //validate buttons state enable or disable
        cy.get(PageAction.ViewResponsePage().SelectedUnitsCount).wait(1000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.get(PageAction.ViewResponsePage().SelectedPackCount).wait(1000)
                    .then(($span) => {
                        count = count + parseInt($span.text().trim());
                        if (count > 0) {
                            cy.wrap(count).should('be.gte', 1)

                            cy.get(PageAction.ViewResponsePage().buttonExportExcel)
                                .should('be.visible')
                                .should('be.enabled')
                                .click()
                                .should('be.disabled')
                                .wait(1000)

                            cy.get(PageAction.ViewResponsePage().toastMessage)
                                .should('be.visible')
                                .should('have.text', ' Proposal units downloaded ');

                            cy.get(PageAction.ViewResponsePage().buttonExportPPT)
                                .should('be.visible')
                                .should('be.enabled')
                                .click()
                                .should('be.disabled')
                                .wait(5000)

                            cy.get(PageAction.ViewResponsePage().toastMessage)
                                .should('be.visible')
                                .should('have.text', ' PPT will be sent via Email ');
                        }
                        else {
                            cy.wrap(count).should('be.lte', 0)

                            cy.get(PageAction.ViewResponsePage().buttonExportExcel)
                                .should('be.visible')
                                .should('be.disabled')

                            cy.get(PageAction.ViewResponsePage().buttonExportPPT)
                                .should('be.visible')
                                .should('be.disabled')
                        }
                    });
            });

    });

    it('should export all units to Excel and PPT', () => {
        cy.get(PageAction.ViewResponsePage().selectAllUnits).click();

        cy.get(PageAction.ViewResponsePage().SelectedUnitsCount).should('have.text', ' 410 ')

        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')
            .wait(8000);

        cy.get(PageAction.ViewResponsePage().toastMessage).wait(1000)
            .should('be.visible')
            .should('have.text', ' Proposal units downloaded ');

        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')
            .wait(8000);;

        cy.get(PageAction.ViewResponsePage().toastMessage)
            .should('be.visible')
            .should('have.text', ' PPT will be sent via Email ');

    });

    it('should export all package to Excel and PPT', () => {
        cy.get(PageAction.ViewResponsePage().selectAllUnits).click();

        cy.get(PageAction.ViewResponsePage().selectAllpack).click();

        cy.get(PageAction.ViewResponsePage().SelectedPackCount).should('have.text', ' 5 ')

        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')

        cy.get(PageAction.ViewResponsePage().toastMessage).wait(1000)
            .should('be.visible')
            .should('have.text', ' Proposal units downloaded ');

        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')
            .wait(5000)

        cy.get(PageAction.ViewResponsePage().toastMessage)
            .should('be.visible')
            .should('have.text', ' PPT will be sent via Email ');

    });

    it('should export multiple package details to Excel and PPT', () => {
        cy.get(PageAction.ViewResponsePage().selectAllpack).click();

        //select packages checkbox one by one
        for (var i = 0; i < 3; i++) {
            cy.get(PageAction.ViewResponsePage().packgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().checkbox).click();
        }
        cy.get(PageAction.ViewResponsePage().SelectedPackCount).should('have.text', ' 3 ')

        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')

        cy.get(PageAction.ViewResponsePage().toastMessage).wait(1000)
            .should('be.visible')
            .should('have.text', ' Proposal units downloaded ');

        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')
            .wait(5000)

        cy.get(PageAction.ViewResponsePage().toastMessage)
            .should('be.visible')
            .should('have.text', ' PPT will be sent via Email ');

    });

    it('should export single package details to Excel and PPT', () => {
        for (var i = 0; i < 1; i++) {
            cy.get(PageAction.ViewResponsePage().packgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().checkbox).click();
        }

        cy.get(PageAction.ViewResponsePage().SelectedPackCount).should('have.text', ' 2 ')

        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')

        cy.get(PageAction.ViewResponsePage().toastMessage).wait(1000)
            .should('be.visible')
            .should('have.text', ' Proposal units downloaded ');

        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')
            .wait(5000)

        cy.get(PageAction.ViewResponsePage().toastMessage)
            .should('be.visible')
            .should('have.text', ' PPT will be sent via Email ');
    });

    it('should export details from selection of package and units to Excel and PPT', () => {
        cy.get(PageAction.ViewResponsePage().selectAllUnits).click();

        cy.get(PageAction.ViewResponsePage().SelectedUnitsCount).should('have.text', ' 410 ')

        cy.get(PageAction.ViewResponsePage().selectAllpack).click();

        cy.get(PageAction.ViewResponsePage().SelectedPackCount).should('have.text', ' 5 ')

        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')

        cy.get(PageAction.ViewResponsePage().toastMessage).wait(1000)
            .should('be.visible')
            .should('have.text', ' Proposal units downloaded ');

        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')

        cy.get(PageAction.ViewResponsePage().toastMessage).wait(1000)
            .should('be.visible')
            .should('have.text', ' Proposal units downloaded ');

        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
            .should('be.visible')
            .should('be.enabled')
            .click()
            .should('be.disabled')
            .wait(10000)

        cy.get(PageAction.ViewResponsePage().toastMessage)
            .should('be.visible')
            .should('have.text', ' PPT will be sent via Email ');

    });

    //Check state with save and export action
    it('check state with select all units and packages', () => {
        //select All units checkbox
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().unitsgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().selectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked')
        }

        //select All package checkbox
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().packgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().selectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked')
        }
    })

    it('clear all units and packages selection to check state', () => {
        //clear All  units checkbox selection
        cy.get(PageAction.ViewResponsePage().selectAllUnits).click();
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().unitsgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().unselectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper')
        }

        //clear All packages checkbox selection
        cy.get(PageAction.ViewResponsePage().selectAllpack).click();
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().packgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().unselectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper')
        }

        //validate buttons state enable or disable
        cy.get(PageAction.ViewResponsePage().SelectedUnitsCount).wait(1000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.get(PageAction.ViewResponsePage().SelectedPackCount).wait(1000)
                    .then(($span) => {
                        count = count + parseInt($span.text().trim());

                        cy.get(PageAction.ViewResponsePage().SelectedUnitsCount)
                            .then(($span) => {
                                count = parseInt($span.text().trim());
                                cy.wrap(count).should('be.lte', 0)
                            });

                        cy.get(PageAction.ViewResponsePage().SelectedPackCount)
                            .then(($span) => {
                                count = parseInt($span.text().trim());
                                cy.wrap(count).should('be.lte', 0)
                            });

                        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
                            .should('be.visible')
                            .should('be.disabled')

                        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
                            .should('be.visible')
                            .should('be.disabled')

                    });
            });
    })

    it('Select few units and packages to check state', () => {

        //Clear selection units and packages to continue next scenarios
        cy.get(PageAction.ViewResponsePage().selectAllUnits).click();
        cy.get(PageAction.ViewResponsePage().selectAllpack).click();

        //select units checkbox one by one
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().unitsgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().checkbox).click();
        }

        //select packages checkbox one by one
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().packgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().checkbox).click();
        }

        //validate buttons state enable or disable
        cy.get(PageAction.ViewResponsePage().SelectedUnitsCount).wait(1000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.get(PageAction.ViewResponsePage().SelectedPackCount).wait(1000)
                    .then(($span) => {
                        count = count + parseInt($span.text().trim());

                        cy.wrap(count).should('be.gte', 1)

                        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
                            .should('be.visible')
                            .should('be.enabled')
                            .click()
                            .should('be.disabled')
                            .wait(1000)

                        cy.get(PageAction.ViewResponsePage().toastMessage)
                            .should('be.visible')
                            .should('have.text', ' Proposal units downloaded ');

                        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
                            .should('be.visible')
                            .should('be.enabled')
                            .click()
                            .should('be.disabled')
                            .wait(4000)

                        cy.get(PageAction.ViewResponsePage().toastMessage)
                            .should('be.visible')
                            .should('have.text', ' PPT will be sent via Email ');
                    });
            });
    });

    it('check state with select few units and packages', () => {
        //validate units checkbox state
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().unitsgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().selectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked')
        }

        //validate packages checkbox state
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().packgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().selectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked')
        }
    })

    it('Select only packages to check state', () => {

        //Clear selection units and packages to continue next scenarios
        cy.get(PageAction.ViewResponsePage().selectAllUnits).click();
        cy.get(PageAction.ViewResponsePage().selectAllUnits).click();
        cy.get(PageAction.ViewResponsePage().selectAllpack).click();
        cy.get(PageAction.ViewResponsePage().selectAllpack).click();

        //select packages checkbox one by one
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().packgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().checkbox).click();
        }

        //validate buttons state enable or disable
        cy.get(PageAction.ViewResponsePage().SelectedUnitsCount).wait(1000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.get(PageAction.ViewResponsePage().SelectedPackCount).wait(1000)
                    .then(($span) => {
                        count = count + parseInt($span.text().trim());

                        cy.wrap(count).should('be.gte', 1)

                        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
                            .should('be.visible')
                            .should('be.enabled')
                            .click()
                            .should('be.disabled')
                            .wait(1000)

                        cy.get(PageAction.ViewResponsePage().toastMessage)
                            .should('be.visible')
                            .should('have.text', ' Proposal units downloaded ');

                        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
                            .should('be.visible')
                            .should('be.enabled')
                            .click()
                            .should('be.disabled')
                            .wait(4000)

                        cy.get(PageAction.ViewResponsePage().toastMessage)
                            .should('be.visible')
                            .should('have.text', ' PPT will be sent via Email ');
                    });
            });
    });

    it('check state with select only packages', () => {
        //validate units checkbox state
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().unitsgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().unselectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper')
        }

        //validate packages checkbox state
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().packgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().selectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked')
        }
    })

    it('Select only units to check state', () => {

        //Clear selection units and packages to continue next scenarios
        cy.get(PageAction.ViewResponsePage().selectAllUnits).click();
        cy.get(PageAction.ViewResponsePage().selectAllUnits).click();
        cy.get(PageAction.ViewResponsePage().selectAllpack).click();
        cy.get(PageAction.ViewResponsePage().selectAllpack).click();

        //select units checkbox one by one
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().unitsgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().checkbox).click();
        }

        //validate buttons state enable or disable
        cy.get(PageAction.ViewResponsePage().SelectedUnitsCount).wait(1000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.get(PageAction.ViewResponsePage().SelectedPackCount).wait(1000)
                    .then(($span) => {
                        count = count + parseInt($span.text().trim());

                        cy.wrap(count).should('be.gte', 1)

                        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
                            .should('be.visible')
                            .should('be.enabled')
                            .click()
                            .should('be.disabled')
                            .wait(1000)

                        cy.get(PageAction.ViewResponsePage().toastMessage)
                            .should('be.visible')
                            .should('have.text', ' Proposal units downloaded ');

                        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
                            .should('be.visible')
                            .should('be.enabled')
                            .click()
                            .should('be.disabled')
                            .wait(4000)

                        cy.get(PageAction.ViewResponsePage().toastMessage)
                            .should('be.visible')
                            .should('have.text', ' PPT will be sent via Email ');
                    });
            });
    });

    it('check state with select only units', () => {
        //validate units checkbox state
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().unitsgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().selectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked')
        }

        //validate packages checkbox state
        for (var i = 0; i < loopCount; i++) {
            cy.get(PageAction.ViewResponsePage().packgrid
                + `[row-index=` + i + `]`
                + PageAction.ViewResponsePage().unselectedClass)
                .should('have.class', 'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper')
        }
    })

    //Filter units with selected filter
    it('Filter Units with selected Face', () => {
        //search result for Face E
        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().unitsFaceFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('SE');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('E').click();
        cy.get(PageAction.ViewResponsePage().FaceFilterApply).click()
        cy.get(PageAction.ViewResponsePage().FilterApply).click();

        cy.get(PageAction.ViewResponsePage().unitsTotalCount).wait(4000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 5)
            });

        cy.get(PageAction.campaignPage().agGridScroll).scrollTo(0, 1100);

        for (var i = 0; i < 5; i++) {
            cy.get(PageAction.ViewResponsePage().MediaFormatCells +
                '[row-index=' + i + '] > [aria-colindex="12"]')
                .should('contain', 'SE');
        }

        //search result for Face W
        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().unitsFaceFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().FaceFilterClear).click()
        cy.get(PageAction.ViewResponsePage().clearSearchText).click()

        cy.get(PageAction.ViewResponsePage().SearchByText).type('SW');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('W').click();
        cy.get(PageAction.ViewResponsePage().FaceFilterApply).click()
        cy.get(PageAction.ViewResponsePage().FilterApply).click();

        cy.get(PageAction.ViewResponsePage().unitsTotalCount).wait(4000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 5)
            });

        cy.get(PageAction.campaignPage().agGridScroll).scrollTo(0, 1100);

        for (var i = 0; i < 5; i++) {
            cy.get(PageAction.ViewResponsePage().MediaFormatCells +
                '[row-index=' + i + '] > [aria-colindex="12"]')
                .should('contain', 'SW');
        }

        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(5000);

        cy.get(PageAction.ViewResponsePage().unitsTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 410)
            });

    })

    it('Filter Units with selected Media owner', () => {
        //search result for Lamar MO
        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().unitsMediaOwnerFilter)
            .click();

        cy.get(PageAction.ViewResponsePage().SearchByText).type('Lamar');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('Lamar').click();
        cy.get(PageAction.ViewResponsePage().MediaOwnerFilterApply).click()
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().unitsTotalCount).wait(2000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 210)
            });

        //search result for OUTFRONT MO
        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().unitsMediaOwnerFilter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().MediaOwnerFilterClear).click()
        cy.get(PageAction.ViewResponsePage().clearSearchText).click()

        cy.get(PageAction.ViewResponsePage().SearchByText).type('OUTFRONT');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('OUTFRONT').click();
        cy.get(PageAction.ViewResponsePage().MediaOwnerFilterApply).click()
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().unitsTotalCount).wait(2000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 200)
            });

        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(5000);

        cy.get(PageAction.ViewResponsePage().unitsTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 410)
            });
    })

    it('Filter Units with selected Media Format', () => {
        //search result for Urban Panels Media Format
        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().unitsMediaFormatFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('Urban Panels');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('Urban Panels').click();
        cy.get(PageAction.ViewResponsePage().MediaFormatFilterApply).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click();

        cy.get(PageAction.ViewResponsePage().unitsTotalCount).wait(2000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 10)
            });

        for (var i = 0; i < 10; i++) {
            cy.get(PageAction.ViewResponsePage().MediaFormatCells +
                '[row-index=' + i + '] > [aria-colindex="5"]')
                .should('contain', 'Urban Panels');
        }

        //search result for Posters Media Format
        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().unitsMediaFormatFilter)
            .click();

        cy.get(PageAction.ViewResponsePage().MediaFormatFilterClear).click()
        cy.get(PageAction.ViewResponsePage().clearSearchText).click()

        cy.get(PageAction.ViewResponsePage().SearchByText).type('Bulletins');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('Bulletins').click();
        cy.get(PageAction.ViewResponsePage().MediaFormatFilterApply).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click().wait(2000);

        cy.get(PageAction.ViewResponsePage().unitsAuditSort).click();

        cy.get(PageAction.ViewResponsePage().unitsTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 10)
            });

        for (var i = 0; i < 10; i++) {
            cy.get(PageAction.ViewResponsePage().MediaFormatCells +
                '[row-index=' + i + '] > [aria-colindex="3"]')
                .should('contain', 'No');
        }

        for (var i = 0; i < 10; i++) {
            cy.get(PageAction.ViewResponsePage().MediaFormatCells +
                '[row-index=' + i + '] > [aria-colindex="5"]')
                .should('contain', 'Bulletins');
        }

        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(3000);

        cy.get(PageAction.ViewResponsePage().unitsTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 410)
            });

    })

    it('Filter Units with All available filters', () => {
        //search result for Face N
        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().unitsFaceFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('E');
        cy.get(PageAction.ViewResponsePage().listItem).click();
        cy.get(PageAction.ViewResponsePage().FaceFilterApply).click()

        //search result for Lamar MO
        cy.get(PageAction.ViewResponsePage().unitsMediaOwnerFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('Lamar');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('Lamar').click();
        cy.get(PageAction.ViewResponsePage().MediaOwnerFilterApply).click()

        //search result for Urban Panels Media Format
        cy.get(PageAction.ViewResponsePage().unitsMediaFormatFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('Bulletins');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('Bulletins').click();
        cy.get(PageAction.ViewResponsePage().MediaFormatFilterApply).click();

        cy.get(PageAction.ViewResponsePage().FilterApply).click();

        cy.get(PageAction.ViewResponsePage().unitsTotalCount).wait(3000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 10)
            });

        for (var i = 0; i < 10; i++) {
            cy.get(PageAction.ViewResponsePage().MediaFormatCells +
                '[row-index=' + i + '] > [aria-colindex="5"]')
                .should('contain', 'Bulletins');
        }

        cy.get(PageAction.campaignPage().agGridScroll).scrollTo(0, 1100);

        for (var i = 0; i < 10; i++) {
            cy.get(PageAction.ViewResponsePage().MediaFormatCells +
                '[row-index=' + i + '] > [aria-colindex="12"]')
                .should('contain', 'E');
        }

        cy.get(PageAction.ViewResponsePage().Filter)
            .first().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(4000);

        cy.get(PageAction.ViewResponsePage().unitsTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 410)
            });

    })

    //Filter packages with selected filter
    it('Filter packages with selected Media owner', () => {
        //search result for OUTFRONT MO
        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().packMOFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('OUTFRONT');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('OUTFRONT').click();

        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 2)
            });

        //search result for Lamar MO
        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click()

        cy.get(PageAction.ViewResponsePage().packMOFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().clearSearchText)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('Lamar');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('Lamar').click();

        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount).wait(2000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 3)
            });

        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 5)
            });

    })

    it('Filter packages with selected Market', () => {
        //search result for New York, NY Market
        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().packMarketFilter)
            .click();

        cy.get(PageAction.ViewResponsePage().SearchByText).type('New York, NY');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('New York, NY').click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 1)
            });

        cy.get(PageAction.ViewResponsePage().packMarketCell)
            .should('contain', 'New York, NY');

        //search result for Los Angeles, CA Market
        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click()
        cy.get(PageAction.ViewResponsePage().packMarketFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().clearSearchText)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('Los Angeles, CA');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('Los Angeles, CA').click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 1)
            });

        cy.get(PageAction.ViewResponsePage().packMarketCell)
            .should('contain', 'Los Angeles, CA');

        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 2)
            });
    })

    it('Filter packages with selected package type', () => {
        //search result for package type 1-Sheet Rail Poster
        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().packTypeFilter)
            .click();

        cy.get(PageAction.ViewResponsePage().SearchByText).type('1-Sheet Rail Poster');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('1-Sheet Rail Poster').click();
        cy.get(PageAction.ViewResponsePage().packTypeFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 1)
            });

        cy.get(PageAction.ViewResponsePage().packTypeCell)
            .should('contain', '1-sheet Rail Poster');

        //search result for package type 1-Sheet Subway Poster
        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click()
        cy.get(PageAction.ViewResponsePage().packTypeFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().clearSearchText)
            .click();

        cy.get(PageAction.ViewResponsePage().SearchByText).type('1-Sheet Subway Poster');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('1-Sheet Subway Poster').click();
        cy.get(PageAction.ViewResponsePage().packTypeFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 1)
            });

        cy.get(PageAction.ViewResponsePage().packTypeCell)
            .should('contain', '1-sheet Subway Poster')


        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 2)
            });

    })

    it('Filter Units with All available filters', () => {
        //search result for OUTFRONT MO
        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();

        cy.get(PageAction.ViewResponsePage().packMOFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('OUTFRONT');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('OUTFRONT').click();
        cy.get(PageAction.ViewResponsePage().packMOFilter)
            .click();

        cy.get(PageAction.ViewResponsePage().packMarketFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchByText).type('New York, NY');
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('New York, NY').click();
        cy.get(PageAction.ViewResponsePage().packMarketFilter)
            .click();

        //search result for package type 1-Sheet Rail Poster
        cy.get(PageAction.ViewResponsePage().packTypeFilter)
            .click();
        cy.get(PageAction.ViewResponsePage().SearchResult)
            .contains('1-Sheet Rail Poster').click();
        cy.get(PageAction.ViewResponsePage().packTypeFilter)
            .click();

        cy.get(PageAction.ViewResponsePage().FilterApply).click().wait(2000)

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 1)
            });

        cy.get(PageAction.ViewResponsePage().packMarketCell)
            .should('contain', 'New York, NY');

        cy.get(PageAction.ViewResponsePage().packTypeCell)
            .should('contain', '1-sheet Rail Poster')

        cy.get(PageAction.ViewResponsePage().Filter)
            .last().click();
        cy.get(PageAction.ViewResponsePage().FilterClear).click();
        cy.get(PageAction.ViewResponsePage().FilterApply).click()
            .wait(2000);

        cy.get(PageAction.ViewResponsePage().packTotalCount)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.wrap(count).should('be.gte', 2)
            });

    })

    it('Map View - should display Excel and PPT export button', () => {
        //validate buttons state enable or disable

        cy.get(PageAction.ViewResponsePage().SelectedUnitsCount).wait(1000)
            .then(($span) => {
                let count = parseInt($span.text().trim());
                cy.get(PageAction.ViewResponsePage().SelectedPackCount).wait(1000)
                    .then(($span) => {
                        count = count + parseInt($span.text().trim());
                        if (count > 0) {
                            cy.wrap(count).should('be.gte', 1)

                            cy.get(PageAction.ViewResponsePage().openInMap).click();

                            cy.get(PageAction.ViewResponsePage().buttonExportExcel)
                                .should('be.visible')
                                .should('be.enabled')
                                .click()
                                .should('be.disabled')
                                .wait(1000)

                            cy.get(PageAction.ViewResponsePage().toastMessage)
                                .should('be.visible')
                                .should('have.text', ' Proposal units downloaded ');

                            cy.get(PageAction.ViewResponsePage().buttonExportPPT)
                                .should('be.visible')
                                .should('be.enabled')
                                .click()
                                .should('be.disabled')
                                .wait(5000)

                            cy.get(PageAction.ViewResponsePage().toastMessage)
                                .should('be.visible')
                                .should('have.text', ' PPT will be sent via Email ');
                        }
                        else {
                            cy.wrap(count).should('be.lte', 0)

                            cy.get(PageAction.ViewResponsePage().openInMap).click();

                            cy.get(PageAction.ViewResponsePage().buttonExportExcel)
                                .should('be.visible')
                                .should('be.disabled')

                            cy.get(PageAction.ViewResponsePage().buttonExportPPT)
                                .should('be.visible')
                                .should('be.disabled')
                        }
                    });
            });

    });

    it('Map View - Select units and export selected units to Excel and PPT', () => {
        
        cy.get('.frames__body__header-title > :nth-child(3)')
        .then(($span) => {
            selectedUnitsBefore = $span.text().trim();

            cy.log(selectedUnitsBefore);
          })

        cy.get(PageAction.ViewResponsePage().openInMap).click(); 
        
        cy.get(':nth-child(2) > :nth-child(2) > div > a').click();

        cy.get('[data-automation="ooh-map_select_frame"]').first().click();

        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
            .click()
            .should('be.disabled')
            .wait(1000);

        cy.get(PageAction.ViewResponsePage().toastMessage)
            .should('be.visible')
            .should('have.text', ' Proposal units downloaded ');

        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
            .click()
            .should('be.disabled')
            .wait(1000);

        cy.get(PageAction.ViewResponsePage().toastMessage)
            .should('be.visible')
            .should('have.text', ' PPT will be sent via Email ');
            
        cy.get('[data-automation="ooh-rfp-response-open-in-table"]').click();

        cy.get('.frames__body__header-title > :nth-child(3)')
        .wait(10000)
        .then(($span) => {
            selectedUnitsBefore = $span.text().trim();

            expect(selectedUnitsBefore).not.equal(selectedUnitsAfter)
          })
        
    });

    it('Map View - Select package and export selected package to Excel and PPT', () => {
        
        cy.get('consolidated-packages > div > div:nth-child(1) > div > span:nth-child(3)')
        .then(($span) => {
            selectedUnitsBefore = $span.text().trim();

            cy.log(selectedUnitsBefore);
          })
        
        cy.get(PageAction.ViewResponsePage().openInMap).click();

        cy.get(':nth-child(2) > :nth-child(2) > div > a').click();

        cy.get(PageAction.ViewResponsePage().packageToggle)
            .click({force: true});

        cy.get('[data-automation="ooh-map_select_package"]').first().click().wait(10000);

        cy.get(PageAction.ViewResponsePage().buttonExportExcel)
            .click()
            .should('be.disabled')
            .wait(1000);

        cy.get(PageAction.ViewResponsePage().toastMessage)
            .should('be.visible')
            .should('have.text', ' Proposal units downloaded ');

        cy.get(PageAction.ViewResponsePage().buttonExportPPT)
            .click()
            .should('be.disabled')
            .wait(1000);

        cy.get(PageAction.ViewResponsePage().toastMessage)
            .should('be.visible')
            .should('have.text', ' PPT will be sent via Email ');
            
        cy.get('[data-automation="ooh-rfp-response-open-in-table"]').click();

        cy.get('consolidated-packages > div > div:nth-child(1) > div > span:nth-child(3)')
        .wait(10000)
        .then(($span) => {
            selectedUnitsAfter = $span.text().trim();

            expect(selectedUnitsBefore).not.equal(selectedUnitsAfter)
          })

        
    });

});
