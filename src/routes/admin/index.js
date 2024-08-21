const { Router } = require('express');
const closeRoutes = Router();

const createCohorts = require('../../controller/cohourts/createCohorts');
const getCohortsById = require('../../controller/cohourts/getCohortByCohortId');
const getAllCohorts = require('../../controller/cohourts/getAllCohorts');
const createCohortCalender = require('../../controller/cohourts/buildCohortCalender');
const createCohourt = require('../../controller/cohourts/createCohourt');//testing
const getCohortEventsByCohortId = require('../../controller/cohortEvents/getCohortEventsByCohortId');



closeRoutes.post('/createCohort', createCohorts);
closeRoutes.get('/getCohourt/:id', getCohortsById);
closeRoutes.get('/getAllCohourt', getAllCohorts);
closeRoutes.post('/buildCohortCalender/:id', createCohortCalender);

closeRoutes.post('/createCohourt', createCohourt);//testing

closeRoutes.get('/getCohortEventsByCohortId/:id', getCohortEventsByCohortId);


exports.closeRoutes = closeRoutes;