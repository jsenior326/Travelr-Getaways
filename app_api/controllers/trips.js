const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');
//require('../models/travlr');
const User = mongoose.model('users');
const getUser = (req) => {
    return new Promise((res, rej) => {
        if (req.auth && req.auth.email) {
            User
            .findOne({ email : req.auth.email })
            .then(user => {
                if (!user) {
                    rej({ status: 404, message: "User not found"});
                } else {
                    res(user.name);
                }
            })
            .catch(err => {
                console.error(err);
                rej({ status: 500, message: "Server error"});
            });
        } else {
            rej({ status: 404, message: "Payload invalid"});
        }
    });
};

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // no filter, return all records
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

// GET: /trips:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // return single record
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    try {
        await getUser(req, res);
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res
            .status(201) // created
            .json(trip);
    } catch (err) {
        return res
            .status(400) // bad request
            .json(err);
    }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    try {
        await getUser(req, res);
        const trip = await Trip.findOneAndUpdate(
            {'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true });
        if (!trip) {
            return res
                .status(404)
                .send({
                    message: "Trip not found with code" + req.params.tripCode
                });
        }
        return res
                .status(200)
                .json(trip);
    } catch (err) {
        return res
            .status(500) // server error
            .json(err);
    };
}
    

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};