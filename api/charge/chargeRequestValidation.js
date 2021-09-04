const { validator, creditCardCompanies } = require('../../utils/validations/validator');

const chargeRequestValidation = (merchantIdentifier, merchantDetails) => {
  let isValidReq = false;

  // Checking headers first
  if (merchantIdentifier === 'revolve') {
    const isFullNameValid = validator.string(merchantDetails.fullName);
    const isCreditCardNumberValid = validator.validateNumberInSpecificLength(merchantDetails.creditCardNumber, 16);
    const isCreditCardCompanyValid = creditCardCompanies[(merchantDetails.creditCardCompany).toLowerCase()];
    const isExpirationDateValid = validator.dateFormat(merchantDetails.expirationDate);
    const isCvvValid = validator.validateNumberInSpecificLength(merchantDetails.cvv, 3);
    const isAmountValid = validator.number(merchantDetails.amount);

    // if all body fields are valid
    if (isFullNameValid && isCreditCardNumberValid && isCreditCardCompanyValid && isExpirationDateValid && isCvvValid && isAmountValid) {
      isValidReq = true;
    }
  }

  return isValidReq;
};


module.exports = { chargeRequestValidation };

