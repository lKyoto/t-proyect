const mongoose = require('mongoose')
const objActivitie = require('../models/activities')

exports.activities_get_all = (req, res, next) => {
    objActivitie.find()
        .select("name price description date")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                activitie: docs.map(map => {
                    return {
                        name: map.name,
                        price: map.price,
                        description: map.description,
                        date: map.date,
                        request: {
                            type: 'GET_ALL_ACT',
                            url: `http://localhost:3000/activities/${map._id}`
                        }
                    }
                })
            }
            docs.length >= 1 ? res.status(200).json(response) : res.status(404).json({ message: 'No entries found' })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.activitie_by_id =  (req, res, next) => {
    const id = req.params.activitieId
    objActivitie.findById(id)
        .select("name price description date")
        .exec()
        .then(doc => {
            doc ? res.status(200).json({
                activitie: doc,
                request: {
                    type: 'GET_UNIQUE_ACT',
                    url: `http://localhost:3000/activities/${doc._id}`
                }
            })
                : res.status(404).json({ message: 'No valid entry found for provided ID' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.activitie_post = (req, res, next) => {
    const activities = new objActivitie({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        date: req.body.date
    })
    activities
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Handling POST request to /activities",
                createdActivitie: {
                    name: result.name,
                    price: result.price,
                    description: result.description,
                    date: result.date,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/activities/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.activitie_patch = (req, res, next) => {
    const id = req.params.activitieId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    objActivitie.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Activitie updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/activities/${id}`
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.activitie_delete =  (req, res, next) => {
    const id = req.params.activitieId
    objActivitie.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Activitie deleted',
                request: {
                    type: 'DELETE',
                    url: 'http://localhost:3000/activities'
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}