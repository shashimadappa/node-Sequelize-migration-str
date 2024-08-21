const { Router } = require('express');
const closeRoutes = Router();

const createCohorts = require('../../controller/cohourts/createCohorts');
const getCohortsById = require('../../controller/cohourts/getCohortByCohortId');




closeRoutes.post('/createCohourt', createCohorts);
closeRoutes.get('/getCohourt/:id', getCohortsById);

exports.closeRoutes = closeRoutes;