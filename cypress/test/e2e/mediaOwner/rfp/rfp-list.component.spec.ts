import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';

let epicName = 'RFP List';
let featureName = 'List Down All Related FRP\'s';
let tag = '';

describe(featureName, () => {

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);

    cy.loginAsMoLamarUS();
    PageAction.rfpListPage()
      .visit();
  });
  it('should Load RFP list', () => {
    cy.get('.global-links > .title').contains('RFPs');
    cy.get('.ooh-rfp > :nth-child(1)').contains('RFPs');
    cy.log('Loaded RFP List');
  });

  it('Should enable pagenation arrow when more than 10 item', () => {

    cy.get('.cad-pagination__info__total').wait(2000)
      .then(($span) => {
        var count = $span.text().trim();
        var pattern = /[0-9]+/g;
        var number: any = 0;
        number = (count.match(pattern));

        cy.get('tbody > tr').should('not.have.length.lessThan', 1);

        if (number > 0) {
          for (var i = 1; i < number; i++) {
            cy.scrollTo('bottom').wait(1000);
            cy.get('tbody > tr').should('have.length', 10);
            cy.get(PageAction.rfpListPage().nextPage).click()
          }
        }
       
      });

  });

});
