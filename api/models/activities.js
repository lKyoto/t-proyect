const mongoose = require('mongoose')

const activitieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    date: Date,
    active: {type: Boolean, require: true, default: true}
})

module.exports = mongoose.model('Activitie', activitieSchema)

//active: {type: Boolean, default: true}