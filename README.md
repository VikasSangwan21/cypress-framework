# Setup

### How to run locally

Create a settings file `cypress.env.json` in root with following content:
````javascript
{
  "tokenBasic": ""
}
````
Note: `tokenBasic` will be shared internally by the team

# Execute

## Built-in tasks for QA Environment
* Use `yarn open:e2e:qa` to run all e2e testing in browser `/cypress/test/e2e/*`
* Use `yarn open:integration:qa` to run all integartion testing in browser `/cypress/test/integartion/*`
* Use `yarn test:e2e:qa` execute e2e Tests as headless
* Use `yarn test:integration:qa` execute integartion Tests as headless

## Built-in tasks for Local Environment
* Use `yarn open:e2e:local` to run all e2e testing in browser `/cypress/test/e2e/*`
* Use `yarn open:integration:local` to run all integartion testing in browser `/cypress/test/integartion/*`
* Use `yarn test:e2e:local` execute e2e Tests as headless
* Use `yarn test:integration:local` execute integartion Tests as headless

# File Structure

* Test file
    * Integration Tests
            `cypress/test/integration/*`
    * E2E Tests
            `cypress/test/e2e/*`

* Support
    * Unity component library
        ```
        cypress/support/helpers/component
        ```

    * OOH pages library        
        ```
        cypress/support/pages
        ```

    * Custom Cypress Command
        ```
        cypress/support/command
        ```

    * Test Global Hook
        ```
        cypress/support/hook
        ```


