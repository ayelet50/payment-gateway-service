const validateString = (string) => {
  return string !== '' && string != null;
};

const validateNumber = (numberString) => {
  return !!Number(numberString);
};

const validateDate = (dateString) => {
  let date;
  let isValid = false;

  if (dateString) {
    date = new Date(dateString);
    if (date !== 'Invalid Date') isValid = true;
  }

  return isValid;
};

const validateNumberInSpecificLength = (numberString, lengthRequired) => {
  const creditCardStringWithoutSpaces = numberString.split(' ').join('');
  const creditCardLength = creditCardStringWithoutSpaces.length;
  const creditCardNumber = Number(creditCardStringWithoutSpaces);

  // if its a number && lengthRequired digits
  return creditCardNumber && creditCardLength === lengthRequired;
};


module.exports = {
  validateString,
  validateNumber,
  validateDate,
  validateNumberInSpecificLength
}