/// <reference types="cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />


//const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const xlsx = require("xlsx");

/**
 * @type {Cypress.PluginConfig}
 */


module.exports = (on, config) => {
  //on('file:preprocessor', cypressTypeScriptPreprocessor);
  allureWriter(on, config);

  let campaignName;
  on('task', {
    setCampaignName(val) { return (campaignName = val); },
    getCampaignName() { return campaignName; },
    //writeAllureResults() { return null; },
    generateJSONFromExcel: generateJSONFromExcel,
  })

  return config;
}

// Excel to JSON
function generateJSONFromExcel(args) {
  const wb = xlsx.readFile(args.FixturePath);
 // const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const ws = wb.Sheets[args.sheet];
  return xlsx.utils.sheet_to_json(ws, { raw:false});

}


