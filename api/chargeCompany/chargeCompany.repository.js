const fetch = require('node-fetch');
const { buildGenericChargeCompanyRequest } = require('./buildGenericChargeCompanyRequest');
const { statusCodes } = require('../statusCodes');
const { updateChargeStatuses } = require('../chargeStatuses/updateChargeStatuses');

module.exports = { chargeCompanyRepository };

async function chargeCompanyRepository(req, creditCardCompany, merchantDetails) {
  const chargeCompanyResponse = { error: null, statusCode: 200 };
  try {
    const fullNameArray = merchantDetails.fullName && merchantDetails.fullName.split(' ');
    const firstName = fullNameArray[0];
    const lastName = fullNameArray[1];
    const requestObject = buildGenericChargeCompanyRequest(creditCardCompany, { ...merchantDetails, firstName, lastName });

    const options = {
      method: 'post',
      body: JSON.stringify(requestObject.body),
      headers: {
        'identifier': firstName,
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(requestObject.url, options);
    const res = await response.json();

    if (res['decline_reason']) {
      chargeCompanyResponse.error = res['decline_reason'];
      chargeCompanyResponse.statusCode = statusCodes['businessErrors'];

      // Update charge status and reason for this merchant
      updateChargeStatuses(firstName, chargeCompanyResponse.error);
    }

    return chargeCompanyResponse;
  } catch (e) {
    console.error(`Error during chargeCompanyRepository: ${e}`);
    chargeCompanyResponse.error = 'technical error';
    chargeCompanyResponse.statusCode = statusCodes['technicalErrors'];
    return chargeCompanyResponse;
  }
}