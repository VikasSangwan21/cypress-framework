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
    cy.log('Loaded RFP List');
  });
});
