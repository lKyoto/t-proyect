const mongoose = require('mongoose')
const activitieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, 
        required: true,
        minlength: [5,"El nombre de la actividad debe ser más grande"]
    },
    price: {
        type: Number,
        required: true
    },
    description: {type: String, 
        required: true,
        maxlength: [200,"Debe ingresar una descripción más corta"]
    },
    date: { type: Date, 
        default: Date.now, 
        required: true
    },
    active: {type: Boolean, 
        require: true, default: true
    }
})
module.exports = mongoose.model('Activitie', activitieSchema)