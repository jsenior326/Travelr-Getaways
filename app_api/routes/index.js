const express = require('express'); // Express app
const router = express.Router(); // Router logic
const { expressjwt: expressJwt } = require('express-jwt');
const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"]
});

// Import the controller for authentication
const authController = require('../controllers/authentication');
// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// define routes for authentication
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;