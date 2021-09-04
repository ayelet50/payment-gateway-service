const {
  validateString,
  validateNumber,
  validateDate,
  validateNumberInSpecificLength
} = require('./validatorsFunctions');


const validator = {
  'string': validateString,
  'number': validateNumber,
  'dateFormat': validateDate,
  'validateNumberInSpecificLength': validateNumberInSpecificLength
};

const creditCardCompanies = {
  'mastercard': true,
  'visa': true
};

module.exports = {
  validator,
  creditCardCompanies
};


