const mongoose = require('mongoose')
const activitieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, 
        required: true,
        minlength: [5,"El nombre de la actividad debe ser más grande"],
        maxlength: [30,"El nombre de la actividad debe ser más corto"]
    },
    price: {
        type: Number,
        required: true
    },
    description: {type: String, 
        required: true,
        maxlength: [200,"Debe ingresar una descripción más corta"],
        minlength: [10,"Por favor ingrese una descripción mas completa"],
    },
    date: { 
        type: Date, 
        default: Date.now, 
        required: true
    },
    active: {
        type: Boolean, 
        require: true, 
        default: true
    }
})
module.exports = mongoose.model('activitie', activitieSchema)