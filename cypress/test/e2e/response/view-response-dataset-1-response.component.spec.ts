import { contains } from 'cypress/types/jquery';
import { PageAction } from '../../../support/PageAction';
import 'cypress-file-upload';
import { keys } from 'cypress/types/lodash';

let epicName = 'view response';
let featureName = 'view response Page';
let tag = '';

let testDataPath = '';
let campaignName = '';
let loopCount: any;
let mo: string[] = [];
let customColumns: string[] = [];
let multi_Client: string = "multi_Client";

describe(featureName, () => {

    before(() => {
        cy.fixture('ooh/campaigns/rfp_config.json').then((config) => {
            testDataPath = config.testDataPath;
            loopCount = config.loopCount;
            mo = config.mo.slice().sort();;
        })
        cy.fixture('ooh/campaigns/campaign_config.json').then((config) => {
            campaignName = config.campaignName[0].name;
        })
    })

    beforeEach(() => {
        Report.testDetails(epicName, featureName, tag);
        cy.loginAsPlanner();

        cy.get('cad-icon.icon-search > .icon').wait(2000).click();
        cy.get(PageAction.ViewResponsePage().globalSearch).type(campaignName.toString());

        cy.get("campaign-list.ng-star-inserted > .center").then($body => {
            if ($body.find('tbody.ng-star-inserted').length > 0) {

                cy.get('.table__col-160 > .title').should('contain', campaignName)
                cy.get(':nth-child(6) > ooh-status > .status > .cad-status__text').should('not.contain', 'RFP Sent')
                cy.get(':nth-child(6) > ooh-status > .status > .cad-status__text').should('not.contain', 'Proposal Sent')
                cy.get(PageAction.campaignPage().campaignStatus).should('contain', 'Proposal Received') //Proposal Sent, RFP Sent
            }
        })
        cy.wait(2000).get('.col-05 > .ng-star-inserted').click();
        cy.get('.cad-link__text').click().wait(3000);
    });

    it('campaign view response', () => {
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
                        // cy.get(':nth-child(' + i + ') > :nth-child(1) > ooh-status > .status > .cad-status__text').should('contain', 'Proposal Sent'); //Proposal Sent
                        cy.get(':nth-child(' + i + ') > [data-automation="ooh-proposal-mediaOwnerName"]').then(($span) => {
                            const mOwner = $span.text().trim().toLowerCase().toString();
                            expect(mOwner).to.eq(Owner);
                        });
                        // cy.get(':nth-child(' + i + ') > [data-automation="ooh-proposal-cost"]').should('contain', '$');
                    }
                });
                cy.get('.cad-link__text').click().wait(2000);

                //cy.get('.campaign-container__title--holder > .title').should('have.', campaignName)
                //cy.get('.campaign-container__title--holder > .title').contains(campaignName);
                //cy.get('.cad-status__text').should('contain', 'RFP Sent');
                cy.get('.cad-status__text').should('contain', 'Proposal Received');

                cy.get(PageAction.ViewResponsePage().openInMap).should('not.be.disabled');
                cy.get(PageAction.ViewResponsePage().openInMap).should('contain', 'OPEN IN MAP');

                cy.get(PageAction.ViewResponsePage().contextMenu).should('not.be.disabled');
                cy.get(PageAction.ViewResponsePage().contextMenu).first().click();

                cy.get(PageAction.ViewResponsePage().exportToxls).should('not.be.disabled');
                cy.get(PageAction.ViewResponsePage().exportToppt).should('not.be.disabled');

                cy.get('.content__header-title').should('contain', 'Media Owners');
                cy.get('.content__header-title > span').then(($span) => {
                    var count = $span.text().trim();
                    cy.wrap(parseInt(count)).should('be.gte', loopCount)
                    // if (parseInt(count) > 10)
                    //     cy.get(PageAction.ViewResponsePage().paging).should('not.be.disabled');
                    // else
                    //     cy.get(PageAction.ViewResponsePage().paging).should('not.not.be.disabled');
                });

                // for (var i = 1; i <= loopCount; i++) {
                // const Owner = mo[i - 1].toLowerCase().toString()
                // cy.get(':nth-child(' + (i + 1) + ') > .three-dots > .pl-10')..then(($span) => {
                //     const mo = $span.text().trim().toLowerCase();
                //     expect(mo).to.eq(Owner);
                // });

                // cy.get('.col-12 > :nth-child(' + (i + 1) + ') > :nth-child(4)').should('contain', '$');
                // }

                cy.get('.frames__body__header-title').should('contain', 'Units');
                cy.get('.frames__body__header-title > span').then(($span) => {
                    var count = $span.text().trim();
                    // cy.wrap(parseInt(count)).should('be.gt', 0)
                    // if (parseInt(count) > 10)
                    //     cy.get(PageAction.ViewResponsePage().paging).should('not.be.disabled');
                    // else
                    //     cy.get(PageAction.ViewResponsePage().paging).should('not.not.be.disabled');
                });

                cy.get('.proposal-container__body__header-title').should('contain', 'Packages');
                cy.get('.proposal-container__body__header-title > span').then(($span) => {
                    var count = $span.text().trim();
                    cy.wrap(parseInt(count)).should('be.gte', 0)
                    // if (parseInt(count) > 10)
                    //     cy.get(PageAction.ViewResponsePage().paging).should('not.be.disabled');
                    // else
                    //     cy.get(PageAction.ViewResponsePage().paging).should('not.not.be.disabled');
                });

                //open in map
                cy.get(PageAction.ViewResponsePage().openInMap).should('not.be.disabled');
                cy.get(PageAction.ViewResponsePage().openInMap).click().wait(2000);
                cy.get('.nav-arrow').should('not.be.disabled');

                cy.get(`.global-links__multiple-items > .cad-dropdown > .dropdown__head 
                > .dropdown__head__content > .dropdown__head__content__title`).should('contain', 'Discover')
                cy.get('.three-dots > :nth-child(2) > span').should('contain', campaignName)

                cy.get(PageAction.ViewResponsePage().openInTable).should('not.be.disabled');
                cy.get(PageAction.ViewResponsePage().openInTable).should('contain', 'Open in Table');

                cy.get('.pt-10 > span').should('contain', 'Markets:')

                cy.get('.proposalResponseSide__proposal-details__header-title').should('contain', 'Media Owners');
                cy.get('.proposalResponseSide__proposal-details__header-count').then(($span) => {
                    var count = $span.text().trim();
                    cy.wrap(parseInt(count)).should('be.gte', loopCount)
                });

                for (var i = 1; i <= loopCount; i++) {
                    const Owner = mo[i - 1].toLowerCase().toString()
                    cy.get(':nth-child(' + i + ') > :nth-child(2) > div > a').then(($span) => {
                        const mo = $span.text().trim().toLowerCase();
                        expect(mo).to.eq(Owner);
                    });

                    cy.get(':nth-child(' + i + ') > .proposalResponseSide__table__body__row-last').then(($span) => {
                        var count = $span.text().trim();
                        cy.wrap(parseInt(count)).should('be.gt', 0)
                    });
                }

                cy.get('.gm-svpc').should('not.be.disabled');
                cy.get('.ooh-controls__zoom-in > .icon-fill > .icon').should('not.be.disabled');
                cy.get('.ooh-controls__zoom-out > .icon-fill > .icon').should('not.be.disabled');
                cy.get('.ooh-controls__legend-icon > cad-icon > .icon > use').should('not.be.disabled');

                cy.get(PageAction.ViewResponsePage().openInTable).click().wait(2000)

            }

        });

    })

    it('view response - Verify custom columns for multi client', () => {
        cy.fixture('ooh/campaigns/custom_template.json').then((templates) => {
            cy.log("fixture - " + 'fixture')
            templates = JSON.stringify(templates);
            const jsonData = JSON.parse(templates);

            cy.get(PageAction.campaignPage().unitsSort).click();
            cy.get(PageAction.campaignPage().unitsSort).click();

            customColumns = jsonData.Templates[multi_Client]
            let scrollRight: number = 6050;

            for (var j = 0; j <= (customColumns.length - 1); j++) {
                scrollRight = (scrollRight) + parseInt("200")
                let scroll: any = scrollRight + 'px';
                cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll);

                cy.get("[aria-colindex=" + (j + 39) + "]" + PageAction.campaignPage().headers)
                    .should('be.visible')
                    .should('contain', customColumns[j]);

                for (var z = 0; z < 5; z++) {
                    cy.log(customColumns[j])
                    cy.get('[row-index=' + z + '] > [aria-colindex=' + (j + 39) + ']')
                        .should('be.visible')
                        .should('contain', customColumns[j] + " " + (z + 1))
                }

            }
        })
    })

});
