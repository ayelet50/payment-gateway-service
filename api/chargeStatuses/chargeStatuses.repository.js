const chargeStatusesListDB = require('./chargeStatusesListDB');

module.exports = { chargeStatusesRepository };

// this repository is for getting our list from db..(this is why i left it async..)
async function chargeStatusesRepository(req) {
  try {
    return chargeStatusesListDB || {};
  } catch (e) {
    console.error(`Error during chargeStatusesRepository route: ${e}`);
    throw e;
  }
}