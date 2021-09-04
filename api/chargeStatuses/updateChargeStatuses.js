const chargeStatusesListDB = require('./chargeStatusesListDB');

module.exports = { updateChargeStatuses };


function updateChargeStatuses(firstNameId, reason) {

  if (chargeStatusesListDB[firstNameId]) {
    if (chargeStatusesListDB[firstNameId][reason]) { // if we have the firstNameId and reason exists we will update the counter of that reason
      chargeStatusesListDB[firstNameId][reason].count++;
    } else {
      // if we have the firstNameId and reason doesnt exists we will add that reason for firstNameId
      chargeStatusesListDB[firstNameId] = { ...chargeStatusesListDB[firstNameId], [reason]: { reason, count: 1 } };
    }
  } else {
    chargeStatusesListDB[firstNameId] = { [reason]: { reason, count: 1 } };
  }
}
