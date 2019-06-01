const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //totalPrice: {Type: Number, required: true},
    date: Date,
    activitie: {type: mongoose.Schema.Types.ObjectId, ref: 'Activitie', required: true},
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true}
    //active: {type: Boolean, required: true}
})

module.exports = mongoose.model('Order', orderSchema)