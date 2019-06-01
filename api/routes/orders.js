const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const objOrder = require('../models/orders')

router.get('/', (req, res, next) => {
    objOrder.find()
        .select("totalPrice date _id activitie room")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                order: docs.map(map => {
                    return {
                        orderID: map._id,
                        activitieID: map.activitie,
                        roomID: map.room,
                        totalPrice: map.totalPrice,
                        date: map.date,
                        request: {
                            type: 'GET_ID',
                            url: `http://localhost:3000/orders/${map._id}`
                        }
                    }
                })
            }
            docs.length >= 1 ? res.status(200).json(response) : res.status(404).json({ message: 'No orders found' })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID
    objOrder.findById(id)
        .select("totalPrice date _id activitie room")
        .exec()
        .then(doc => {
            doc ? res.status(200).json({
                order: doc,
                request: {
                    type: 'GET_ORDER_BY_ID',
                    url: `http://localhost:3000/order/${doc._id}`
                }
            })
                : res.status(404).json({ message: 'No valid entry found for provided ID' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.post('/', (req, res, next) => {
    const order = new objOrder({
        _id: mongoose.Types.ObjectId(),
        totalPrice: req.body.totalPrice,
        date: req.body.date,
        activitie: req.body.activitieID,
        room: req.body.roomID
    })
    order
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.patch('/:orderID',(req, res, next)=>{
    const id = req.params.orderID
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    objOrder.update({_id: id},{$set: updateOps})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'Order updated',
                request: {
                    type: 'UPDATE',
                    url: `http://localhost:3000/orders/${id}`
                }
            })
        })
        .catch(err =>{
            res.status(500).json({error: err})
        })

})

router.delete('/:orderID', (req, res, next)=>{
    const id = req.params.orderID
    objOrder.remove({_id: id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'DELETE',
                    url: 'http://localhost:3000/orders'
                }
            })
        })
        .catch(err =>{
            res.status(500).json({error: err})
        })
})

module.exports = router