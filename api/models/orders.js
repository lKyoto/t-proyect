const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    totalPrice: {
        type: Number, 
        required: true
    },
    date: {
        type: Date, 
        default: Date.now 
    },
    activitie: {type: mongoose.Schema.Types.ObjectId, ref: 'activitie', required: true},
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'room',required: true}
    //active: {type: Boolean, required: true}
})

module.exports = mongoose.model('Order', orderSchema) 