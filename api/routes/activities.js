const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const objActivitie = require('../models/activities')

route.get('/', (req, res, next) => {
    objActivitie.find()
        .exec()
        .then(doc=>{
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
})

route.get('/:activitieId', (req, res, next) => {
    const id = req.params.activitieId
    objActivitie.findById(id)
        .exec()
        .then(doc => {
            doc ? res.status(200).json(doc) : res.status(404).json({message: 'No valid entry found for provided ID'})
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
})

route.post('/', (req, res, next) => {
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
                createdActivitie: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

route.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'patch its ok'
    })
})

route.delete('/:activitieId', (req, res, next) => {
    const id = req.params.activitieId
    objActivitie.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = route