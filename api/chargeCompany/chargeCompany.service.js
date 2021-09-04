const { chargeCompanyRepository } = require('./chargeCompany.repository');
const { timeout } = require('../../utils/retriesMangement/retriesUtils');
const config = require('../../config');
const { statusCodes } = require('../statusCodes');

module.exports = { chargeCompanyService };


async function chargeCompanyService(req, creditCardCompany, merchantDetails) {
  try {
    let counter = 1;
    let chargeCompanyRepositoryResponse = await chargeCompanyRepository(req, creditCardCompany, merchantDetails);

    // Retries mechanism
    while (counter <= config.RETRIES_NUMBER) {
      if (chargeCompanyRepositoryResponse.statusCode === statusCodes['technicalErrors']) {
        await timeout(Math.pow(counter, 2) * 1000);
        chargeCompanyRepositoryResponse = await chargeCompanyRepository(req, creditCardCompany, merchantDetails);
        counter++;
      } else { // in case we got status code 200 or 400 -- break
        counter = config.RETRIES_NUMBER + 1;
      }
    }

    return chargeCompanyRepositoryResponse;
  } catch (e) {
    console.error(`Error during chargeCompanyService: ${e}`);
    throw e;
  }
}