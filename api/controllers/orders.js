const mongoose = require('mongoose')
const objOrder = require('../models/orders')


exports.orders_get_all = async (req, res, next) => {
    const activitie = await objOrder.find()
        .limit(10) //El limit debe ir en dashboard
        .sort({date: -1})
        .select("totalPrice date _id activitie room")
        .populate('activitie')
        .populate('room') 
    res.json(activitie)
}

/* 
exports.orders_get_all = (req, res, next) => {
    objOrder.find()
        .select("totalPrice date _id activitie room")
        .populate('activitie')
        .populate('room')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                order: docs.map(map => {
                    return {
                        orderID: map._id,
                        activitie: map.activitie,
                        room: map.room,
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

}
*/

exports.order_by_id = (req, res, next) => {
    const id = req.params.orderId
    objOrder.findById(id)
        .select("totalPrice date _id")
        .populate('activitie')
        .populate('room')
    res.json(activitie)
}

exports.order_post = (req, res, next) => {
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
}
/* 
exports.order_patch_id = (req, res, next)=>{
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

}
*/

exports.order_patch_id = async (req, res, next) =>{
    const id = req.params.orderId
    await objOrder.findByIdAndUpdate(id, res.body)
    res.json({status: "OK UPDATE"})
}

 exports.order_delete_id = async (req, res, next)=>{
    await objOrder.findByIdAndRemove(req.params.orderId)
    res.json({status:"OK DELETE"})
}
