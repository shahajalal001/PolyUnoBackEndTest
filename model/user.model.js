const {model, Schema} = require('mongoose')
const User = model('Users', new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    }
}, {
    timestamps: true
}))
module.exports = User