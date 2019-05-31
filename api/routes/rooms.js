const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const objRoom = require('../models/rooms')

router.get('/', (req, res, next) => {
    objRoom.find()
        .select("name price description individual active")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                room: docs.map(map => {
                    return {
                        name: map.name,
                        price: map.price,
                        description: map.description,
                        individual: map.individual,
                        active: map.active,
                        request: {
                            type: 'GET_ALL_ROOMS',
                            url: 'http://localhost:3000/rooms/' + map._id
                        }
                    }
                })
            }
            docs.length >= 1 ? res.status(200).json(response) : res.status(404).json({ message: 'Not entries found' })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const room = new objRoom({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        individual: req.body.individual,
        active: req.body.active
    })
    room
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handling POST request to /rooms",
                createdRoom: {
                    name: result.name,
                    price: result.price,
                    description: result.description,
                    individual: result.individual,
                    active: result.active,
                    request: {
                        type: 'POST',
                        url: `http://localhost:3000/rooms/${result._id}`
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
})

router.get('/:roomId', (req, res, next) => {
    const id = req.params.roomId
    objRoom.findById(id)
        .select("name price description individual active")
        .exec()
        .then(doc => {
            doc ? res.status(200).json({
                room: doc,
                request: {
                    type: 'GET_ID',
                    url: `http://localhost:3000/rooms/${doc._id}` 
                }
            })
                : res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

/*
    router.patch('/:roomId', (req, res, next) => {
        res.status(200).json({
            message: 'metodo patch'
        })
    })


    router.delete('/:roomId', (req, res, next) => {
        res.status(200).json({
            message: 'Delete'
        })
    })
*/

module.exports = router