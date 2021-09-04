const {
  chargeCompaniesUrlMap,
  chargeCompaniesBodyRequests,
  expirationDateFormats
} = require('./chargeCompaniesConfig');

module.exports = { buildGenericChargeCompanyRequest };


function buildGenericChargeCompanyRequest(creditCompany, bodyDetails) {

  const getChargeCompaniesUrl = (creditCompany) => {
    return chargeCompaniesUrlMap[creditCompany];
  };

  const buildChargeCompaniesBodyRequest = (creditCompany, bodyDetails) => {
    const requestBodyObject = {};

    Object.keys(chargeCompaniesBodyRequests[creditCompany]).forEach((key) => {
      requestBodyObject[key] = bodyDetails[chargeCompaniesBodyRequests[creditCompany][key]];
    });

    requestBodyObject.expiration = dateFormatAccordingToCreditCompany(requestBodyObject.expiration, creditCompany);
    return requestBodyObject;
  };


  const dateFormatAccordingToCreditCompany = (expirationDate, creditCompany) => {
    const dateFormatChar = expirationDateFormats[creditCompany];
    return expirationDate.split(/[-/]/).join(dateFormatChar);
  };

  return {
    url: getChargeCompaniesUrl(creditCompany),
    body: buildChargeCompaniesBodyRequest(creditCompany, bodyDetails)
  };
}

