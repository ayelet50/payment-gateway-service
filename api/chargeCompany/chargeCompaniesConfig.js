const config = require('../../config');

const chargeCompaniesUrlMap = {
  'mastercard': `${config.MOCK_SERVER_URL}/mastercard/capture_card`,
  'visa': `${config.MOCK_SERVER_URL}/visa/api/chargeCard`
};

// Should be manged in mongodb..
const chargeCompaniesBodyRequests = {
  'visa': {
    'fullName': 'fullName',
    'number': 'creditCardNumber',
    'expiration': 'expirationDate',
    'cvv':'cvv',
    'totalAmount':'amount'
  },
  'mastercard': {
    'first_name': 'firstName',
    'last_name': 'lastName',
    'card_number': 'creditCardNumber',
    'expiration': 'expirationDate',
    'cvv':'cvv',
    'charge_amount':'amount'
  }
};

const expirationDateFormats = {
  'visa':'/',
  'mastercard':'-'
}

module.exports = {
  chargeCompaniesUrlMap,
  chargeCompaniesBodyRequests,
  expirationDateFormats
}