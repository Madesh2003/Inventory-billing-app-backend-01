const mongoose = require('mongoose')

const AuthSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required:  true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Array,
        default: ['customer']
    },
})

module.exports = mongoose.model('users',AuthSchema);