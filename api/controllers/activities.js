const mongoose = require('mongoose')
const objActivitie = require('../models/activities')

exports.activities_get_all = async (req, res, next) => {
    const activitie = await objActivitie.find().limit(8).sort({date: -1}) //El limit debe ir en dashboard
    res.json(activitie)
}

exports.activitie_by_id = async (req, res, next) => {
    const id = req.params.activitieId
    const activitie = await objActivitie.findById(id)
    res.json(activitie)
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
exports.activitie_patch_id = async (req, res, next) => {
    const id = req.params.activitieId
    await objActivitie.findByIdAndUpdate(id , req.body)
    res.json({status: 'OK UPDATE'})
}

exports.activitie_delete_id = async (req, res, next) => {
    await objActivitie.findByIdAndRemove(req.params.activitieId)
    res.json({status: "OK DELETE"})
}