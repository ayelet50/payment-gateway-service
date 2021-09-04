const { chargeRequestValidation } = require('./chargeRequestValidation');
const { chargeCompanyService } = require('../chargeCompany/chargeCompany.service');
const { statusCodes } = require('../statusCodes');


module.exports = { chargeMerchantService };

async function chargeMerchantService(req) {
  try {
    const merchantIdentifier = req.headers['merchant-identifier'];
    const response = { error: null, statusCode: 200 };
    const merchantDetails = req.body;

    // Checking valid request
    const ifRequestValid = chargeRequestValidation(merchantIdentifier, merchantDetails);
    if (!ifRequestValid) {
      response.error = 'request is not valid';
      response.statusCode = statusCodes['clientErrors'];
      return response;
    }

    // Calling credit card company and getting their responses
    const creditCardCompany = req.body.creditCardCompany.toLowerCase();
    const chargeCompanyResponse = await chargeCompanyService(req, creditCardCompany, merchantDetails);
    if (chargeCompanyResponse.error) {
      response.error = chargeCompanyResponse.error;
      response.statusCode = chargeCompanyResponse.statusCode;
    }

    return response;
  } catch (e) {
    console.error(`Error during chargeMerchantService: ${e}`);
    throw e;
  }
}

