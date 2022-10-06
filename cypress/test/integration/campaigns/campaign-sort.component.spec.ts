import { PageAction } from "../../../support/PageAction";
import _ from "cypress/types/lodash";

let epicName = 'Campaigns Sort';
let featureName = 'Campaigns sort Option';
let tag = '';

declare global {
  interface Date {
      getWeek (start?: number) : [Date, Date]
  }
}


// C68470349 - [FE] Verify columns in the campaign list can be sorted
describe(featureName, () => {

    beforeEach(() => {
        Report.testDetails(epicName, featureName, tag);
        cy.loginAsPlannerStub();
    });

    it('Should load campaign create page', () => {
        PageAction.CampaignSortPage()
        .loadCampaignsWithData()
        .visit();
    });

    // function getCellTextAsArray() {
    //     let cellContents = [];
    //     return new Cypress.Promise(resolve => {
    //         for(var i = 2; i < 7; i++){
    //             cy.get(':nth-child('+i+') > tr > .pl_0')
    //                 .children()
    //                 .each(($el, $index) => {
    //                     //some logic to select the elements you want
    //                     //like $index % 4 == 0
    //                     // if (...) {
    //                 cellContents.push($el.text());
    //                     // cy.log(i + ' ' + $el.text());
    //                     // }
    //             })
    //             .then(() => resolve(cellContents));
    //         }
    //     });
    // }

    function getCellTextAsArray() {
        let cellContents: any[];
        return new Cypress.Promise(resolve => {
            for(var i = 2; i < 7; i++){
                cy.get(':nth-child('+i+') > tr > .pl_0')
                .children()
                .each(($el, $index) => {
                    cellContents.push($el.text());
                })
                .then(() => resolve(cellContents));
            }
        });
    };
    

    it('Validate name column sort', () =>{
        // getCellTextAsArray().then(cellContents => {
        //     let actual = cellContents.slice();
        //     cy.wrap(actual).should("deep.eq", cellContents.sort());
        // });


        // let actual = cellContents.slice();

        // expect(elsText).to.deep.eq(filetypes)

    });



});
