const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //totalPrice: {Type: Number, required: true},
    date: Date,
    activitie: {type: mongoose.Schema.Types.ObjectId, ref: 'Activitie'},
    //active: {type: Boolean, required: true}
})

module.exports = mongoose.model('Order', orderSchema)