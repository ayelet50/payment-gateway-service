const express = require('express');
const router = express.Router();
const { chargeStatusesService } = require('./chargeStatuses.service');


router.get('', chargeStatusesRoute);

async function chargeStatusesRoute(req, res) {
  try {
    console.log('started chargeStatusesRoute');
    const chargeStatusesResponse = await chargeStatusesService(req);
    res.status(200).json(chargeStatusesResponse);
  } catch (e) {
    console.error(`Error during chargeStatusesRoute route: ${e}`);
    res.status(500).json({ error: true, data: [] });
  }
}

module.exports = router;