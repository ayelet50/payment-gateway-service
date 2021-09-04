const express = require('express');
const router = express.Router();
const chargeRouter = require('../api/charge/charge.route');
const chargeStatusesRoute = require('../api/chargeStatuses/chargeStatuses.route');

const routes = () => {

  /*  APPLICATION API  */
  router.use('/charge', chargeRouter);
  router.use('/chargeStatuses', chargeStatusesRoute);
  /*  APPLICATION API  */

  return router;
};

module.exports = routes;