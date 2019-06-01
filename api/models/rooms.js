const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: {type: Number, required: true},
    description: String,
    individual: {type: Boolean, default: true},
    active: {type: Boolean, default: true}
})

module.exports = mongoose.model('Room', roomSchema)

