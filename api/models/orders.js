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
    activitie: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Activitie', 
        required: false
    },
    room: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room',
        required: false
    }
    //active: {type: Boolean, required: true}
})

module.exports = mongoose.model('Order', orderSchema)