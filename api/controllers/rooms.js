const mongoose = require('mongoose')
const objRoom = require('../models/rooms')

exports.rooms_get_all = async (req, res, next) => {

    const room = await objRoom.find()
    console.log(room )
    res.json(room)
    /*
    objRoom.find()
        .select("name price description individual active")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                room: docs.map(map => {
                    return {
                        id: map._id,
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
        
        */
    }


exports.room_by_id = (req, res, next) => {
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
        
}


exports.room_post = async (req, res, next) => {
    const room = new objRoom({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        individual: req.body.individual,
        active: req.body.active
    });
    await room.save()
    console.log(room)
    res.json({status: 'OK'})
       
    /* 
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
        */
}

exports.room_patch_id = async (req, res, next) => {
    await objRoom.findByIdAndUpdate(req.params.roomId, req.body)
    res.json({status: 'OK UPDATE'})
    /*
    const id = req.params.roomId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    objRoom.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Room updated',
                request: {
                    type: 'UPDATE',
                    url: `http://localhost:3000/rooms/${id}`
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
        */
}
/*
exports.room_delete_id =  (req, res, next) => {
    const id = req.params.roomId
    objRoom.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Room deleted',
                request: {
                    type: 'DELETE',
                    url: 'http://localhost:3000/rooms'
                }
            })
        })
        .catch(err =>{
            console.log(err)
            res.status(200).json({
                error: err
            })
        })
}
*/
exports.room_delete_id = async (req, res, next) => {
    await objRoom.findByIdAndRemove(req.params.roomId)
    res.json({status: 'OK DELETE'})
}