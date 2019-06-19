const mongoose = require('mongoose')
const userShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        require: true,
        //match: /^[A-Z]+$/
        //AL FINAL DE LA EXPRESION PUEDE IR UN i REVISAR SI ES IMPORTANTE
    },
    last_name:{
        type: String,
        require: true,
      //  match: /^[A-Z]+$/
        //AL FINAL DE LA EXPRESION PUEDE IR UN i REVISAR SI ES IMPORTANTE
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        //match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String, 
        require: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

module.exports = mongoose.model('User', userShema)