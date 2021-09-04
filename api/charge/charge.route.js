const express = require('express');
const router = express.Router();
const { chargeMerchantService } = require('./charge.service');


router.post('', chargeMerchantRoute);

async function chargeMerchantRoute(req, res) {
  try {
    console.log('started chargeMerchantRoute');
    const chargeServiceResponse = await chargeMerchantService(req);

    if (chargeServiceResponse.error) {
      res.status(chargeServiceResponse.statusCode).json({ error: chargeServiceResponse.error });
    } else res.status(200).json({});

  } catch (e) {
    console.error(`Error during chargeMerchant route: ${e}`);
    res.status(500).json({ error: true, data: null });
  }
}

module.exports = router;