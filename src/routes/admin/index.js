const { Router } = require('express');

const createCohourt = require('../../controller/cohourts/createCohourt');
const closeRoutes = Router();


closeRoutes.post('/createCohourt', createCohourt);


exports.closeRoutes = closeRoutes;