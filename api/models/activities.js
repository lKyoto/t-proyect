const mongoose = require('mongoose')

const activitieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    description: String,
    date: Date
})

module.exports = mongoose.model('Activities', activitieSchema)