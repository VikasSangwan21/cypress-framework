class Report {
    static testDetails(epic: string, feature: string, tag: string) {
      cy.allure().epic(epic).feature(feature).tag(tag);
    }
  
    static Step(stepName: string) {
      cy.allure().step(`${stepName}`, true);
    }
  
    static Background() {
      cy.allure().step('Background : ', true);
    }
  
    static Given(stepName: string) {
      cy.allure().step(`Given - ${stepName}`, true);
    }
  
    static When(stepName: string) {
      cy.allure().step(`When - ${stepName}`, true);
    }

    static Then(stepName: string) {
      cy.allure().step(`Then - ${stepName}`, true);
    }

    static And(stepName: string) {
      cy.allure().step(`And - ${stepName}`, true);
    }
  
    static Setup() {
      cy.allure().step(`Set up`, true);
      return this;
    }
  
    static TearDown() {
      cy.allure().endStep();
      cy.allure().step(`Tear down`, true);
    }
  
    static Issue(issueNumber: string) {
      cy.allure().issue(issueNumber, `https://projects.mbww.com/browse/${issueNumber}`);
      return this;
    }
  
    static Owner(owner: string) {
      cy.allure().owner(owner);
      return this;
    }
  
    // tslint:disable-next-line:no-shadowed-variable
    static Severity(severity: severity) {
      cy.allure().severity(severity);
      return this;
    }
  
    static Tag(testCaseId: Tags | string) {
      this.TMS(testCaseId);
      cy.allure().tag(testCaseId);
      return this;
    }
  
    static Feature(feature: Feature) {
      cy.allure().feature(feature);
      return this;
    }
  
    static TMS(testCaseId: string) {
      let testCaseNumber = testCaseId.replace('C', '');
      cy.allure().tms(testCaseId, `http://testrail.cadreon.com/testrail/index.php?/cases/view/${testCaseNumber}`);
      return this;
    }
  }
  
  type Tags = 'Integration Test' | 'E2E Test';
  type severity = 'blocker' | 'critical' | 'minor' | 'normal' | 'trivial';
  type Feature = 'Campaign' | 'RFP' | 'Response';
  
  // @ts-ignore
  globalThis.Report = Report;
  