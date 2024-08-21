const express = require('express');
const router = express.Router();
const restRoutes = require('./admin');

// Example route
router.get('/health', (req, res) => {
  res.send('Health is good');
});

router.use(
    '/api',
    // validateAuthToken.validateAdminUserAuthToken,
    // multerStore.multerHandler,
    restRoutes.closeRoutes,
  );

module.exports = router;