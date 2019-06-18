const mongoose = require('mongoose')
const objRoom = require('../models/rooms')

exports.rooms_get_all = async (req, res, next) => {
    const room = await objRoom.find()
    console.log('consulta con 8 documentos')
    res.json(room)
}

exports.room_by_id = async (req, res, next) => {
    const id = req.params.roomId
    const room = await objRoom.findById(id)
    res.json(room)
}

exports.room_post = async (req, res, next) => {     
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
        
}

exports.room_patch_id = async (req, res, next) => {
    const id = req.params.roomId
    const room = await objRoom.findByIdAndUpdate(id, req.body)
    res.json({status: 'OK UPDATE'})
}
exports.room_delete_id = async (req, res, next) => {
    await objRoom.findByIdAndRemove(req.params.roomId)
    res.json({status: 'OK DELETE'})
}