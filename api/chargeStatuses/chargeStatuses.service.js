const { chargeStatusesRepository } = require('./chargeStatuses.repository');


module.exports = { chargeStatusesService };

async function chargeStatusesService(req) {
  const response = { error: true, data: [] };
  try {
    const merchantIdentifier = req.headers['merchant-identifier'];
    if (merchantIdentifier) {
      const chargeStatusesList = await chargeStatusesRepository(req);
      if (chargeStatusesList[merchantIdentifier]) {
        const chargeStatusesByMerchantId = chargeStatusesList[merchantIdentifier];
        response.data = Object.values(chargeStatusesByMerchantId);
      }
    }

    return response;
  } catch (e) {
    console.error(`Error during chargeStatusesService route: ${e}`);
    throw e;
  }
}