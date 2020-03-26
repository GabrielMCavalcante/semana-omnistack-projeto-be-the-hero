const express = require('express');
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

/* Registers a new ong */
routes.post('/ongs', ongController.create);

/* Lists all registered ongs */
routes.get('/ongs', ongController.index);

/* Deletes all ongs (only use for development tests) */
//routes.delete('/ongs/del', ongController.delete);

/* Registers a new incident */
routes.post('/incident', incidentController.create);

/* Lists all registered incidents */
routes.get('/incident', incidentController.index);

/* Deletes a incident */
routes.delete('/incident/:incident_id', incidentController.delete);

/* Lists all ong-related incidents */
routes.get('/profile', profileController.index);
module.exports = routes;