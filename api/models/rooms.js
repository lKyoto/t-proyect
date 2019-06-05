const mongoose = require('mongoose')
const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        //match: /^[a-zA-Z]+$/
    },
    price: {
        type: Number, 
        required: true
    },
    description: {
        type: String,
        maxlength: [200,"Por favor ingrese una descripción más corta"],
        minlength: [10,"Por favor ingrese una descripción mas larga"]
    },
    typeRoom: {
        type: String,
        enum: ["Individual", "Familiar"],
        default: "Individual"
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    active: {
        type: Boolean, 
        default: true
    }
})

module.exports = mongoose.model('Room', roomSchema)