const mongoose = require('mongoose')

const activitieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    date: Date
})

module.exports = mongoose.model('Activities', activitieSchema)