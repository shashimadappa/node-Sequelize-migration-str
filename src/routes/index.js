const express = require('express');
const router = express.Router();
const restRoutes = require('./admin');

// Example route
// router.get('/example', (req, res) => {
//   res.send('You are at the example route');
// });

router.use(
    '/api',
    // validateAuthToken.validateAdminUserAuthToken,
    // multerStore.multerHandler,
    restRoutes.closeRoutes,
  );

module.exports = router;